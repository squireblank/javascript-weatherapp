import axios from "axios";

const meteoAPI =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime&timezone=Asia%2FSingapore";

const baseURI = "https://api.open-meteo.com/v1/forecast";

const getweather = (
  latitude = 52.52,
  longitude = 13.41,
  timezone = "Asia/Singapore"
) => {
  return axios
    .get(baseURI, {
      params: {
        latitude,
        longitude,
        timezone,
        hourly: [
          "temperature_2m",
          "apparent_temperature",
          "precipitation",
          "weathercode",
          "windspeed_10m",
        ],
        daily: [
          "weathercode",
          "temperature_2m_max",
          "temperature_2m_min",
          "apparent_temperature_max",
          "apparent_temperature_min",
          "precipitation_sum",
        ],
        current_weather: "true",
        timeformat: "unixtime",
      },
    })
    .then(({ data }) => {
      // return data;
      return {
        current: getCurrentWeather(data),
        hourly: getHourlyWeather(data),
        daily: getDailyWeather(data),
      };
    });
};

const getCurrentWeather = ({ current_weather, daily }) => {
  const { temperature: currentTemp, windspeed, weathercode } = current_weather;
  const {
    temperature_2m_max: [highTemp],
    temperature_2m_min: [lowTemp],
    apparent_temperature_max: [highFeelsLike],
    apparent_temperature_min: [lowFeelsLike],
    precipitation_sum: [precip],
  } = daily;
  return {
    currentTemp: Math.round(currentTemp),
    highTemp: Math.round(highTemp),
    highFeelsLike: Math.round(highFeelsLike),
    lowTemp: Math.round(lowTemp),
    lowFeelsLike: Math.round(lowFeelsLike),
    windspeed: Math.round(windspeed),
    precip: Math.round(precip * 100) / 100,
    iconCode: weathercode,
  };
};

const getDailyWeather = ({ daily }) => {
  return daily.time.map((time, index) => {
    return {
      timestamp: time * 1000,
      iconCode: daily.weathercode[index],
      maxTemp: Math.round(daily.temperature_2m_max[index]),
    };
  });
};

const getHourlyWeather = ({ hourly, current_weather }) => {
  return hourly.time
    .map((time, index) => {
      return {
        timestamp: time * 1000,
        iconCode: hourly.weathercode[index],
        temp: Math.round(hourly.temperature_2m[index]),
        feelsLike: Math.round(hourly.apparent_temperature[index]),
        windspeed: Math.round(hourly.windspeed_10m[index]),
        precip: Math.round(hourly.precipitation[index] * 100) / 100,
      };
    })
    .filter(({ timestamp }) => timestamp >= current_weather.time * 1000);
};

export default getweather;
