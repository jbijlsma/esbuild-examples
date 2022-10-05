#!/usr/bin/env node

require("esbuild")
  .build({
    entryPoints: ["./src/app.jsx"],
    bundle: true,
    platform: "node",
    target: "node16",
    minify: true,
    external: ["./node_modules/*"],
    outfile: "./dist/out.js",
  })
  .catch(() => process.exit(1));
