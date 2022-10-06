import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import middy from "@middy/core";

import { getHelloMsg } from "@myscope/messages-package";

export const lambdaHandler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Context: ${JSON.stringify(context, null, 2)}`);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: getHelloMsg(),
    }),
  };
};

export const handler = middy(lambdaHandler);
