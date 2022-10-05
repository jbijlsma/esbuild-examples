#!/usr/bin/env node

// original package.json script:
// esbuild index.ts --bundle --sourcemap --platform=node --target=es2020 --outfile=dist/index.js

const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["./src/index.ts"],
    bundle: true,
    platform: "node",
    target: "es2020",
    minify: false,
    sourcemap: false,
    outfile: "./.index.js",
  })
  .catch(() => process.exit(1));
