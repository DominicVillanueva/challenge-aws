import { fahrenheitToCelsius } from "../../commons/constants/convertion-temperature";
import { WeatherCharacter } from "../models/weather-character"
import { storeDataDynamoDB } from "../repositories/dynamo.repository";
import { getCharacterData, getPlanetData } from "./starwars.service"
import { getWeatherData } from "./weather.service";

export const weatherCharacter = async (id: number, lat: number, lon: number): Promise<WeatherCharacter> => {
  const characterData = await getCharacterData(id);
  const planetData = await getPlanetData(characterData.homeworld);
  const weatherData = await getWeatherData(lat, lon);

  const joinData: WeatherCharacter = {
    characterName: characterData.name,
    planet: planetData.name,
    planetClimate: planetData.climate,
    planetTerrain: planetData.terrain,
    weather: {
      temperature: fahrenheitToCelsius(weatherData.main.temp),
      humidity: weatherData.main.humidity,
      description: weatherData.weather[0].description,
      windSpeed: weatherData.wind.speed,
    },
  };

  /**
   * @description insertar registro en DynamoDB por cada peticion
   */
  await storeDataDynamoDB(joinData);

  return joinData;
}