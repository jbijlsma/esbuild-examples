# Intro

Check to see if we can do a manual esbuild by following this aws example:

https://docs.aws.amazon.com/lambda/latest/dg/typescript-package.html

# Deploying

Build first:

```bash
npm run build
```

And then upload it using:

```bash
aws lambda create-function \
  --function-name aws-sam-test \
  --runtime "nodejs16.x" \
  --role arn:aws:iam::334920449303:role/jbijlsma \
  --zip-file "fileb://dist/index.zip" \
  --handler index.lambdaHandler
```

You can create a new role in the IAM manager in the aws console and note down the arn.

To update:

```bash
aws lambda update-function-code \
  --function-name aws-sam-test \
  --zip-file "fileb://dist/index.zip"
```

# Caveats

Unfortunately the 'sam build' command does not work when you need esbuild plugins. If you want to use typescript references and npm / yarn / pnpm workspaces you will need the esbuild-plugin-ts-references plugin to make it work. The external: ["./node_modules/*"] setting in ./scripts/build.js is necessary to exclude npm packages from the generated bundle, but it also excludes workspace references and those you do want to end up in the bundle.

So, here we just do the esbuild part ourselves and create / update the aws lambda function by deploying our zipfile. The commands are all in the package.json scripts section.

In short it works like this:

1. build executes ./scripts/build.js which uses esbuild to create a bundle that excludes packages in the dependencies and devDependencies sections. Note that it creates a bundle in the root directory (.index.js). If you specify ./dist/index.js the require() paths for the non-bundled dependencies point to ../node_modules which should be ./node_modules. It might be possible to fix, but I haven't found any way until now.

2. publish gathers all the assets that aws sam needs and generates a zip file for them that can be uploaded. The zip file contains: the generated bundle (./dist/index.js) and a node_modules folder with only the prod dependencies (generated with pnpm -P). Actually the package.json file is copied to the publish directory and pnpm i -P is run in ./publish to prevent issues with lock-files.
