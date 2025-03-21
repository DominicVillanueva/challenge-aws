export interface WeatherCharacter {
  characterName: string;
  planet: string;
  planetClimate: string;
  planetTerrain: string;
  weather: {
    temperature: number;
    humidity: number;
    description: string;
    windSpeed: number;
  };
}