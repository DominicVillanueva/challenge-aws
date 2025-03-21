import axios from "axios"
import { SWAPI_API_PUBLIC } from "../../commons/constants/api-public"
import { Character, Planet } from "../models/starwars";

export const getCharacterData = async (id: number): Promise<Character> => {
  try {
    const response = await axios.get(`${SWAPI_API_PUBLIC}/people/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error data: ', error);
    throw new Error(`Error data: ${error}`);
  }
}

export const getPlanetData = async (planet: string): Promise<Planet> => {
  try {
    const response = await axios.get(planet);
    return response.data;
  } catch (error) {
    console.error('Error data: ', error);
    throw new Error(`Error data: ${error}`);
  }
}
