import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import AWSXRay from "aws-xray-sdk";

import './config/load-env.config';

import { weatherCharacter } from './api/services/weather-character.service';

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const segment = AWSXRay.getSegment();

  if (!segment) console.warn("No active X-Ray segment found.");

  const subsegment = segment?.addNewSubsegment("Procesando petición");

  const characterId = event.queryStringParameters?.character_id || 0;
  const latitude = event.queryStringParameters?.lat  || 0;
  const longitude = event.queryStringParameters?.lon || 0;

  if (!characterId || !latitude || !longitude) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: '¡Faltan parámetros requeridos!' }),
    };
  }

  try {
    const data = await weatherCharacter(+characterId, +latitude, +longitude);
    subsegment?.addAnnotation("status", "success");
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data fetched successfully', data }),
    };
  } catch (error) {
    subsegment?.addAnnotation("status", "error");
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching data', error }),
    };
  }
};
