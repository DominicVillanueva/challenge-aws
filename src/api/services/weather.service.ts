import axios from "axios"
import { WEATHER_API_PUBLIC } from "../../commons/constants/api-public"
import { WeatherData } from "../models/weather";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

export const getWeatherData = async (latitude: number, longitude: number): Promise<WeatherData> => {
  try {
    if(!OPENWEATHER_API_KEY) throw new Error('API Key no configurado');
    const response = await axios.get(`${WEATHER_API_PUBLIC}?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error data: ', error);
    throw new Error(`Error data: ${error}`);
  }
}