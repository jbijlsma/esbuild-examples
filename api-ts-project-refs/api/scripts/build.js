#!/usr/bin/env node

const esbuild = require("esbuild");
const tsReferences = require("esbuild-plugin-ts-references");

esbuild
  .build({
    entryPoints: ["./src/index.ts"],
    bundle: true,
    platform: "node",
    target: "node16",
    minify: false,
    sourcemap: false,
    external: ["./node_modules/*"],
    outfile: "./dist/index.js",
    plugins: [tsReferences],
  })
  .catch(() => process.exit(1));
