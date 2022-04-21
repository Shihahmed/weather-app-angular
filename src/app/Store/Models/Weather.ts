export interface Weather {
  temp?: number;
  tempMax?: number;
  tempMin?: number;
  description?: string;
  iconCode?: string;

  cityName?: string;
  lat?: number;
  lon?: number;

  date?: Date;
  sunriseDateTime?: Date;
  sunsetDateTime?: Date;

  windDeg?: number;
  windDirection?: string;
  windSpeed_kmh?: number;

  humidity?: number;
  uvi?: number;
  pressure_mmHg?: number;

  dailyWeather?: Weather[];
}
