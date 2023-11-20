const key = import.meta.env.VITE_TOKEN;
const API_URL = `http://api.weatherapi.com/v1/search.json?key=${key}&q=`;

export const searchCities = async (term) => {
  try {
    const response = await fetch(API_URL + term);
    const data = await response.json();
    if (data.length === 0) alert('Nenhuma cidade encontrada');
    return data;
  } catch (error) {
    alert('Nenhuma cidade encontrada');
  }
};

export const getWeatherByCity = (/* cityURL */) => {
  //   seu código aqui
};
