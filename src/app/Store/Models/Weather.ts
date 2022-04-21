export interface Weather {
  temp: number;
  description: string;
  iconNumber: number;
  cityName: string;
  currentDateTime: Date;
  sunriseDateTime: Date;
  sunsetDateTime: Date;
  windDeg: number;
  windDirection: string;
  windSpeed_kmh: number;
  humidity: number;
  uvi: number;
  pressure_mmHg: number;
}
