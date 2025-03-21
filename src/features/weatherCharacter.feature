Feature: Obtener información combinada de personaje y clima

  Scenario: Consultar clima para un personaje de Star Wars
    Given un personaje con ID 1
    When consulto el clima en la ubicación (40.7128, -74.006)
    Then obtengo la información del personaje y el clima combinado
