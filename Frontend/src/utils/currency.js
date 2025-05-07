import axios from 'axios';

export const fetchExchangeRate = async () => {
  try {
    const res = await axios.get("https://api.frankfurter.app/latest", {
      params: {
        from: "USD",
        to: "LKR"
      }
    });
    return res.data.rates.LKR;
  } catch (error) {
    console.error("Exchange rate error:", error);
    return null;
  }
};
