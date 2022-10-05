import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import middy from "@middy/core";

export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const msg = event.pathParameters?.message;
  const response = { message: "Hello World, says hi " + msg };

  const result: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(response),
  };

  return result;
};

export const handler = middy(lambdaHandler);
