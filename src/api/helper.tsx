
import axios from 'axios';

const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

export const fetchExchangeRates = async (fromCurrency: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${fromCurrency}`);
        console.log(response.data.rates);
        return response.data.rates;
    } catch (error) {
        console.error("Error fetching exchange rates: ", error);
        throw error;
    }
};

export const fetchCurrencyList = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/USD`);
        return Object.keys(response.data.rates);
    } catch (error) {
        console.error("Error fetching currency list: ", error);
        throw error;
    }
};