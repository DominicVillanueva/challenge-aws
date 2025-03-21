import axios from "axios";
import { WeatherData } from "../../models/weather";
import { getWeatherData } from "../weather.service";
import { WEATHER_API_PUBLIC } from "../../../commons/constants/api-public";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Weather Service", () => {
  const latitude = 40.7128;
  const longitude = -74.006;
  const mockWeatherData: WeatherData = {
    main: { temp: 300, humidity: 60 },
    weather: [{ description: "clear sky" }],
    wind: { speed: 5 },
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Debe obtener los datos del clima correctamente", async () => {
    process.env.OPENWEATHER_API_KEY = "2cfe9edbf7dd8dc7b43fbe70db577907";

    mockedAxios.get.mockResolvedValue({ data: mockWeatherData });

    const result = await getWeatherData(latitude, longitude);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${WEATHER_API_PUBLIC}?lat=${latitude}&lon=${longitude}&appid=fake_api_key`
    );
    expect(result).toEqual(mockWeatherData);
  });

  test("Debe lanzar error si la API Key no está configurada", async () => {
    delete process.env.OPENWEATHER_API_KEY;

    await expect(getWeatherData(latitude, longitude)).rejects.toThrow(
      "API Key no configurado"
    );
  });

  test("Debe manejar errores cuando la API falla", async () => {
    process.env.OPENWEATHER_API_KEY = "fake_api_key";

    mockedAxios.get.mockRejectedValue(new Error("Error en la API"));

    await expect(getWeatherData(latitude, longitude)).rejects.toThrow(
      "Error data: Error: Error en la API"
    );
  });
});
