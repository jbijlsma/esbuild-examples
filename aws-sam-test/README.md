# Intro

Check to see if we can do a manual esbuild by following this aws example:

https://docs.aws.amazon.com/lambda/latest/dg/typescript-package.html

# Running locally

```
sam local start-api [OPTIONS]
```

Not sure if the works with all custom build stuff we do here. I haven't tested it.

# Building

"pnpm run build" executes the ./scripts/build.sh script. I had a lot of issues with finding the correct esbuild settings. These in particular are important:

```
platform: "node",
format: "esm",
target: "es2020",
```

Publishing the bundle as a module by using the "esm" format seems to work best in aws. It also allows the use of top-level await. Since we are not running in the browser we don't need to support older browsers and using a modern format works best as long as the version of node we use in aws supports it.

# Deploying

For the aws cli deploy:

```
pnpm i
pnpm run build
pnpm run publish
pnpm run deploy
```

And for the sam cli deploy:

```
pnpm i
pnpm run build
pnpm run sam-publish
pnpm run sam-deploy
```

To cleanup:

```
pnpm run uninstall
pnpm run clean
```

# Sam build issues

Unfortunately the 'sam build' command does not work when you need esbuild plugins. If you want to use typescript references and npm / yarn / pnpm workspaces you will need the esbuild-plugin-ts-references plugin to make it work. The external: ["./node_modules/*"] setting in ./scripts/build.js is necessary to exclude npm packages from the generated bundle, but it also excludes workspace references and those you do want to end up in the bundle.

So, here we just do the esbuild part ourselves and create / update the aws lambda function by deploying our zipfile. The commands are all in the package.json scripts section.

In short it works like this:

1. build executes ./scripts/build.js which uses esbuild to create a bundle that excludes packages in the dependencies and devDependencies sections. Note that it creates a bundle in the root directory (.index.js). If you specify ./dist/index.js the require() paths for the non-bundled dependencies point to ../node_modules which should be ./node_modules. It might be possible to fix, but I haven't found any way until now.

2. publish gathers all the assets that aws sam needs and generates a zip file for them that can be uploaded. The zip file contains: the generated bundle (./dist/index.js) and a node_modules folder with only the prod dependencies (generated with pnpm -P). Actually the package.json file is copied to the publish directory and pnpm i -P is run in ./publish to prevent issues with lock-files.

3. deploy uses the aws cli to update the code of an existing function. It is the imperative way to create / update functions. I think the declarative way using the sam cli using CloudFormation is much better.

4. sam-publish creates a .aws-sam folder with the exact same structure as what "sam build" creates. But by doing everything ourselves we can use esbuild plugins. We can also use a later version of esbuild if we want and don't have to wait until the sam cli tools are updated.

5. sam-deploy just uses the sam cli to deploy to aws.

# External dependencies

With external dependencies (dependencies in package.json) you basically have 2 options:

1. include them in the generated bundle
2. point to the proper import in node_modules and deploy node_modules

Both approaches have their pros and cons. Including packages in the bundle often causes errors during the bundling and it can increase the build time significantly.

Keeping the packages separately in node_modules gets problematic if you have local references packages that have dependencies that you don't want to package. First of all the import paths are often incorrect. Also, the node_modules that gets published does not contain the dependency.

Obviously both approaches have issues. For now I think its easiest to just bundle everything in the references local packages. But I lean towards just publishing local packages as proper npm packages to a local private registry such as verdaccio (https://verdaccio.org/).

# Further reading

https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html

https://aws.amazon.com/blogs/compute/using-node-js-es-modules-and-top-level-await-in-aws-lambda/

https://github.com/evanw/esbuild/issues/1944

```
{
    entryPoints: ['./ulid.js'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile: './ulid.bundle.mjs',
    banner: {
        js: [
            `import { createRequire as topLevelCreateRequire } from 'module'`,
            `const require = topLevelCreateRequire(import.meta.url)`
        ].join('\n')
    }
}
```

https://divriots.com/blog/switching-to-pnpm

https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-function.html#sam-function-codeuri
