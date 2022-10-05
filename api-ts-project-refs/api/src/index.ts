import express, { Request, Response } from "express";

import { getHelloMsg } from "@myscope/messages-package";

const port = 5001;
const app = express();

app.use("/", (req: Request, res: Response) => {
  res.status(200).send(getHelloMsg());
});

app.listen(port, () => {
  console.log(`Started listening on port ${port}`);
});
