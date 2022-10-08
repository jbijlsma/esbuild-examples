import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as csv from "csv-parse";

export const getWords = (): Promise<String[]> => {
  return new Promise((resolve, reject) => {
    const resourcesPath = path.dirname(fileURLToPath(import.meta.url));

    const words: String[] = [];

    fs.createReadStream(`${path.resolve(resourcesPath, "words.csv")}`)
      .pipe(csv.parse({ delimiter: ";", from_line: 1, trim: true }))
      .on("data", (data: any) => {
        words.push(data.word);
      })
      .on("end", () => {
        resolve(words);
      });
  });
};
