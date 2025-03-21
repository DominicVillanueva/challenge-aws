import { APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerResult } from "aws-lambda";
import jwt from "jsonwebtoken";

const SECRET_KEY = "test_key_secret_token";

export const handler = async (event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> => {
  if (!event.authorizationToken) throw new Error("Unauthorized");

  try {
    const token = event.authorizationToken.replace("Bearer ", "");
    const decoded = jwt.verify(token, SECRET_KEY) as { sub: string };

    return {
      principalId: decoded.sub,
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: event.methodArn,
          },
        ],
      },
    };
  } catch (error) {
    throw new Error("Unauthorized");
  }
};
