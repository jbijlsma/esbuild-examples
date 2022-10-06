#!/usr/bin/env node

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import packageJson from "../package.json" assert { type: "json" };
delete packageJson["devDependencies"];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const copiedPackageJsonPath = path.resolve(
  __dirname,
  "../publish/package.json"
);

fs.writeFile(
  copiedPackageJsonPath,
  JSON.stringify(packageJson, null, 2),
  "utf8",
  function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
  }
);
