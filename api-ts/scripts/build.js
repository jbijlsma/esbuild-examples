#!/usr/bin/env node

require("esbuild")
  .build({
    entryPoints: ["./src/index.ts"],
    bundle: true,
    platform: "node",
    target: "node16",
    minify: false,
    sourcemap: false,
    external: ["./node_modules/*"],
    outfile: "./dist/index.js",
  })
  .catch(() => process.exit(1));
