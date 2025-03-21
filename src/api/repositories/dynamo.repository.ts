import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoConfig } from '../../config/dynamo.config';
import { WeatherCharacter } from '../models/weather-character';
import { TABLE_NAME } from "../../commons/constants/global";

export const storeDataDynamoDB = async(data: WeatherCharacter) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      ...data,
    },
  };

  try {
    await dynamoConfig.send(new PutCommand(params));
    console.log('Se registro correctamente');
  } catch (error) {
    console.error('Error dynamo: ', error);
    throw new Error(`Error data: ${error}`);
  }
}

export const getHistoryFromDynamoDB = async (limit: number, lastKey?: any) => {
  const params: any = {
    TableName: TABLE_NAME,
    Limit: limit,
    KeyConditionExpression: "id <> :empty",
    ExpressionAttributeValues: {
      ":empty": " ",
    },
    ScanIndexForward: false,
  };

  if (lastKey) {
    params.ExclusiveStartKey = lastKey;
  }

  const result = await dynamoConfig.send(new QueryCommand(params));
  return {
    items: result.Items || [],
    lastEvaluatedKey: result.LastEvaluatedKey || null,
  };
};
