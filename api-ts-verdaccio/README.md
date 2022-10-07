# Intro

Example of using esbuild in combination with verdaccio for publishing local packages.

# Local testing

In one (vscode) terminal window start the local verdaccio registry:

```bash
cd ./verdaccio
./start.sh
```

In another (vscode) terminal build and publish the npm package (@dnw/messages-package):

```bash
cd ./packages/messages-package
rm package-lock
npm install
npm run build
npm publish
```

In yet another (vscode) terminal run the consumer (api):

Move into the api folder:

```bash
cd ./api
```

Reference the correct version of the @dnw/message-package in the package.json:

```json
"dependencies": {
  "@dnw/messages-package": "^0.0.5",
},
```

And install the dependencies:

```bash
rm package-lock
npm install
npm run build
npm start
```

This should start express on port 5001.

Lets test the api using curl:

```bash
curl http://localhost:5001/Jeroen
```

It should print something like this in the terminal:

```bash
Goede morgen and tot ziens Jeroen. 3 words available
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
