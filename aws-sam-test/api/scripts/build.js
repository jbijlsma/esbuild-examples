#!/usr/bin/env node

// original package.json script:
// esbuild index.ts --bundle --sourcemap --platform=node --target=es2020 --outfile=dist/index.js

import * as esbuild from "esbuild";
import tsReferences from "esbuild-plugin-ts-references";

// Try how to handle external dependencies in referenced packages (../packages/messages_package in this case)
// ../packages/messages_package depends on the "csv" package.
//
// We can either bundle it in our bundle (index.mjs) or we can refer to ./node_modules package
// using import ./node_modules/csv/lib/index.js.
//
// If we don't bundle it (by using this plugn) we need to add prd dependency "csv": "^6.2.0" to package.json.
// Otherwise the csv package will be missing from the node_modules folder we publish
//
// For more discussion see the README.md.
let externalPlugin = {
  name: "external-plugin",
  setup(build) {
    build.onResolve({ filter: /^csv/ }, (args) => {
      console.log(`test-plugin: ${JSON.stringify(args)}`);
      return { path: "./node_modules/csv/lib/index.js", external: true };
    });
  },
};

esbuild
  .build({
    entryPoints: ["./src/index.ts"],
    bundle: true,
    platform: "node",
    format: "esm",
    target: "es2020",
    minify: false,
    sourcemap: false,
    outfile: "./.index.mjs",
    mainFields: ["main"],
    preserveSymlinks: false,
    external: [
      "./node_modules/*",
      "../packages/messages-package/node_modules/*",
      // "../packages/*", //this does not work, so for now we
    ],
    plugins: [tsReferences, externalPlugin],
    banner: {
      js: [
        `import { createRequire as topLevelCreateRequire } from 'module'`,
        `const require = topLevelCreateRequire(import.meta.url)`,
      ].join("\n"),
    },
  })
  .catch((reason) => {
    console.log(reason);
    process.exit(1);
  });
