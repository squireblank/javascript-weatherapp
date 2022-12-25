import { ICON_MAP } from "./iconMap";
import "./style.css";
import getweather from "./weather";

getweather(23.73, 90.37, Intl.DateTimeFormat().resolvedOptions().timeZone)
  .then((data) => {
    console.log(data);
    renderWether(data);
  })
  .catch((err) => {
    console.log(err.message);
    alert("Error getting data");
  });

const renderWether = ({ current, daily, hourly }) => {
  renderCurrentWeather(current);
  renderDailyWeather(daily);
  renderHourlyWeather(hourly);
  document.body.classList.remove("blurred");
};

const setValue = (selector, value, { parent = document } = {}) => {
  parent.querySelector(`[data-${selector}]`).textContent = value;
};

const getIconCode = (iconCode) => {
  return `icons/${ICON_MAP.get(iconCode)}.svg`;
};

const renderCurrentWeather = (current) => {
  document.querySelector("[data-current-icon]").src = getIconCode(
    current.iconCode
  );
  setValue("current-temp", current.currentTemp);
  setValue("current-high", current.highTemp);
  setValue("current-low", current.lowTemp);
  setValue("current-fl-high", current.highFeelsLike);
  setValue("current-fl-low", current.lowFeelsLike);
  setValue("current-wind", current.windspeed);
  setValue("current-precip", current.precip);
};

const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday: "long" });
const dailySection = document.querySelector("[data-day-section]");
const dayCardTemplate = document.getElementById("day-card-template");
const renderDailyWeather = (daily) => {
  dailySection.innerHTML = "";
  daily.forEach((day) => {
    const element = dayCardTemplate.content.cloneNode(true);
    setValue("temp", day.maxTemp, { parent: element });
    setValue("date", DAY_FORMATTER.format(day.timestamp), { parent: element });
    element.querySelector("[data-icon]").src = getIconCode(day.iconCode);
    dailySection.append(element);
  });
};

const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, { hour: "numeric" });
const hourlySection = document.querySelector("[data-hour-section]");
const hourRowTemplate = document.getElementById("hour-row-template");
const renderHourlyWeather = (hourly) => {
  hourlySection.innerHTML = "";
  hourly.forEach((hour) => {
    const element = hourRowTemplate.content.cloneNode(true);
    setValue("temp", hour.temp, { parent: element });
    setValue("fl-temp", hour.feelsLike, { parent: element });
    setValue("wind", hour.windspeed, { parent: element });
    setValue("precip", hour.precip, { parent: element });
    setValue("day", DAY_FORMATTER.format(hour.timestamp), {
      parent: element,
    });
    setValue("time", HOUR_FORMATTER.format(hour.timestamp), {
      parent: element,
    });
    element.querySelector("[data-icon]").src = getIconCode(hour.iconCode);
    hourlySection.append(element);
  });
};
