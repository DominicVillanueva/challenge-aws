import { defineFeature, loadFeature } from "jest-cucumber";
import { weatherCharacter } from "../api/services/weather-character.service";

const feature = loadFeature("./src/features/weatherCharacter.feature");

defineFeature(feature, test => {
  let result: any;
  
  test("Consultar clima para un personaje de Star Wars", ({ given, when, then }) => {
    given("un personaje con ID 1", async () => {});

    when("consulto el clima en la ubicación (40.7128, -74.006)", async () => {
      result = await weatherCharacter(1, 40.7128, -74.006);
    });

    then("obtengo la información del personaje y el clima combinado", () => {
      expect(result).toHaveProperty("characterName", "Luke Skywalker");
      expect(result.weather).toHaveProperty("temperature");
    });
  });
});
