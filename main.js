import { ICON_MAP } from "./iconMap";
import "./style.css";
import getweather from "./weather";

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
getweather(23.71, 90.41, timezone)
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
  document.body.classList.remove("blurred");
};

const setValue = (selector, value) => {
  document.querySelector(`[data-${selector}]`).textContent = value;
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
