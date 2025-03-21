import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getCharacterData, getPlanetData } from "../starwars.service";

const mock = new MockAdapter(axios);

describe("StarWars Service", () => {
  afterEach(() => {
    mock.reset();
  });

  it("debería obtener datos de un personaje", async () => {
    const mockCharacter = { name: "Luke Skywalker", homeworld: "https://swapi.dev/api/planets/1/" };
    mock.onGet("https://swapi.dev/api/people/1").reply(200, mockCharacter);

    const result = await getCharacterData(1);
    expect(result).toEqual(mockCharacter);
  });

  it("debería obtener datos de un planeta", async () => {
    const mockPlanet = { name: "Tatooine", climate: "arid", terrain: "desert" };
    mock.onGet("https://swapi.dev/api/planets/1/").reply(200, mockPlanet);

    const result = await getPlanetData("https://swapi.dev/api/planets/1/");
    expect(result).toEqual(mockPlanet);
  });
});
