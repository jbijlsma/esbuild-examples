import express, { Request, Response } from "express";

const port = 5001;
const app = express();

app.use("/", (req: Request, res: Response) => {
  res.status(200).send("Hello world");
});

app.listen(port, () => {
  console.log(`Started listening on port ${port}`);
});
