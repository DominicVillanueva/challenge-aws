import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { getHistoryFromDynamoDB } from "../repositories/dynamo.repository";

export const getHistory: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const limit = event.queryStringParameters?.limit || 10;
    const lastKey = event.queryStringParameters?.lastKey ? JSON.parse(decodeURIComponent(event.queryStringParameters?.lastKey)) : undefined;
    const { items, lastEvaluatedKey } = await getHistoryFromDynamoDB(+limit, lastKey);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: items,
        lastKey: lastEvaluatedKey ? encodeURIComponent(JSON.stringify(lastEvaluatedKey)) : null,
      }),
    };
  } catch (error) {
    console.error("Error en el handler /historial:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error interno del servidor" }),
    };
  }
};
