import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import middy from "@middy/core";

import {
  getHelloMsg,
  getGoodbyeMsg,
  getWords,
} from "@myscope/messages-package";

export const lambdaHandler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Context: ${JSON.stringify(context, null, 2)}`);

  const { name } = event.pathParameters;

  const words = await getWords();
  const msg = `${getHelloMsg()} and ${getGoodbyeMsg()} ${name}. ${
    words.length
  } words available.`;

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: msg,
    }),
  };
};

export const handler = middy(lambdaHandler);
