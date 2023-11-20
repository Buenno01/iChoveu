const key = `key=${import.meta.env.VITE_TOKEN}`;
const BASE_URL = 'http://api.weatherapi.com/v1/';
const SEARCH_URL = `${BASE_URL}search.json?${key}&q=`;
const CURRENT_URL = `${BASE_URL}current.json?${key}&q=`;

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
    console.log(data);
    console.log(condition.icon);
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
