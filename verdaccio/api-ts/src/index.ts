import express, { Request, Response } from "express";

import { getHelloMsg, getGoodbyeMsg, getWords } from "@dnw/messages-package";

const port = 5001;
const app = express();

app.use("/:name", async (req: Request, res: Response) => {
  const { name } = req.params;
  const words = await getWords();
  const msg = `${getHelloMsg()} and ${getGoodbyeMsg()} ${name}. ${
    words.length
  } words available.`;
  res.status(200).send(msg);
});

app.listen(port, () => {
  console.log(`Started listening on port ${port}`);
});
