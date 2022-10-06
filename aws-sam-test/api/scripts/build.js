#!/usr/bin/env node

// original package.json script:
// esbuild index.ts --bundle --sourcemap --platform=node --target=es2020 --outfile=dist/index.js

import * as esbuild from "esbuild";
import tsReferences from "esbuild-plugin-ts-references";

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
    external: ["./node_modules/*"],
    plugins: [tsReferences],
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
