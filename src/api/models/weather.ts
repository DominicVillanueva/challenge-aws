export interface WeatherData {
  weather: { description: string }[];
  main: {
    temp: number;
    humidity: number;
  },
  wind: {
    speed: number;
  };
}