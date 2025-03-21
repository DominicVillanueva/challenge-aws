import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";

import { storeDataDynamoDB } from "../repositories/dynamo.repository";

export const storeData: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body || "{}");
    if (!body || Object.keys(body).length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "El cuerpo de la solicitud no puede estar vacío" }),
      };
    }

    await storeDataDynamoDB(body);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Datos almacenados correctamente" }),
    };
  } catch (error) {
    console.error("Error en el handler:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error interno del servidor" }),
    };
  }
};
