const key = `key=${import.meta.env.VITE_TOKEN}`;
const BASE_URL = 'http://api.weatherapi.com/v1/';
const SEARCH_URL = `${BASE_URL}search.json?${key}&q=`;
const CURRENT_URL = `${BASE_URL}current.json?${key}&q=`;
const FORECAST_URL = `${BASE_URL}forecast.json?${key}&alerts=no&aqi=no&days=7&q=`;

export const searchCities = async (term) => {
  try {
    const response = await fetch(SEARCH_URL + term);
    const data = await response.json();
    if (data.length === 0) {
      alert('Nenhuma cidade encontrada');
      return [];
    }
    return data;
  } catch (error) {
    alert('Nenhuma cidade encontrada');
  }
};

export const getWeatherByCity = async (cityURL) => {
  try {
    const response = await fetch(CURRENT_URL + cityURL);
    const data = await response.json();
    const { current: { temp_c: temp, condition }, location: { country, name } } = data;
    return ({
      temp,
      condition: condition.text,
      icon: condition.icon,
      country,
      name,
      url: cityURL,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getForecast = async (cityURL) => {
  try {
    const response = await fetch(FORECAST_URL + cityURL);
    const data = await response.json();
    const { forecast: { forecastday } } = data;

    return forecastday.map(({ date, day }) => ({
      date,
      maxTemp: day.maxtemp_c,
      minTemp: day.mintemp_c,
      condition: day.condition.text,
      icon: day.condition.icon,
    }));
  } catch (error) {
    console.log(error.message);
  }
};
