# Intro

Example of using esbuild in combination with verdaccio for publishing local packages.

# Local testing

In one (vscode) terminal window start the local verdaccio registry:

```bash
cd ./registry
./start.sh
```

Open another (vscode) terminal window. In the root folder (verdaccio) install the packages and build for all workspaces:

```bash
pnpm i
pnpm run build
```

To publish a new version of the npm package (@dnw/messages-package):

```bash
cd ./packages/messages-package
npm publish
```

## The api-ts consumer

To run the api consumer (./api-ts) of the package:

```bash
cd ./api-ts
npm start
```

This should start express on port 5001. Test the api using curl:

```bash
curl http://localhost:5001/Jeroen
```

It should print something like this in the terminal:

```bash
Goede morgen and tot ziens Jeroen. 3 words available
```

## The aws-sam-api-ts consumer

## Consumer package reference

Remember to reference the correct version of the @dnw/message-package in the package.json of the package consumer:

```json
"dependencies": {
  "@dnw/messages-package": "^0.0.5",
},
```

# Good to know

I had quite some issues with choosing the most suitable output module format for the package (@dnw/message-package). The modern format seems to be esm, so I finally chose that one. Since we control both the package- and the consumer code we can freely choose the format. If that's not the case you probably want to publish the library in multiple output formats (esm, CommonJs, etc).

Another struggle was to get the import paths of the imported node_modules that are not bundled correct. Finally I read somewhere that this is not working correctly at the moment and will be fixed in a future esbuild release. The creator of esbuild supplied us with a workaround:

```js
let makeAllPackagesExternalPlugin = {
  name: "make-all-packages-external",
  setup(build) {
    let filter = /^[^.\/]|^\.[^.\/]|^\.\.[^\/]/; // Must not start with "/" or "./" or "../"
    build.onResolve({ filter }, (args) => ({
      path: args.path,
      external: true,
    }));
  },
};
```

A custom plugin that does not rewrite the imports that do not specify any absolute of relative path. You use the plugin like this:

```js
esbuild
  .build({
    ...
    plugins: [makeAllPackagesExternalPlugin],
    ...
  })
```

Note that this also means the option to NOT include all the node_modules in the bundle is no longer needed (returning an object with external: true in the custom plugin does that already):

```js
esbuild
  .build({
    ...
    external: ["./node_modules/*"],
    ...
  })
```
