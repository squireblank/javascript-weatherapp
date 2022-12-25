export const ICON_MAP = new Map();

const setMapping = (values, icon) => {
  values.forEach((value) => {
    ICON_MAP.set(value, icon);
  });
};

setMapping([0, 1], "sun");
setMapping([2], "cloud-sun");
setMapping([3], "cloud");
setMapping([45, 48], "smog");
setMapping(
  [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
  "cloud-showers-heavy"
);
setMapping([71, 73, 75, 77, 85, 86], "snowflake");
setMapping([95, 96, 99], "cloudbolt");
