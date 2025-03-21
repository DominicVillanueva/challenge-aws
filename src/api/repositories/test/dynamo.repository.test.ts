import { dynamoConfig } from "../../../config/dynamo.config";
import { storeDataDynamoDB, getHistoryFromDynamoDB } from "../dynamo.repository";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

jest.mock("@aws-sdk/lib-dynamodb");
jest.mock("../../config/dynamo.config");

describe("DynamoDB Repository", () => {
  it("debería almacenar datos en DynamoDB", async () => {
    (dynamoConfig.send as jest.Mock).mockResolvedValue({});
    
    const mockData = {
      characterName: "Luke Skywalker",
      planet: "Tatooine",
      planetClimate: "arid",
      planetTerrain: "desert",
      weather: { temperature: 25, humidity: 80, description: "clear sky", windSpeed: 5 }
    };

    await expect(storeDataDynamoDB(mockData)).resolves.not.toThrow();
    expect(dynamoConfig.send).toHaveBeenCalledWith(expect.any(PutCommand));
  });

  it("debería obtener historial de DynamoDB", async () => {
    (dynamoConfig.send as jest.Mock).mockResolvedValue({
      Items: [{ id: "123", characterName: "Luke Skywalker" }]
    });

    const result = await getHistoryFromDynamoDB(5);
    expect(result.items).toHaveLength(1);
    expect(result.items[0].characterName).toBe("Luke Skywalker");
  });
});
