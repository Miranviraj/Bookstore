import axios from 'axios';

const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = "AIzaSyCoXKb0Uo_AAe_lsW-IW7D9zZg3vW3SF90"; // Replace with your actual API key

export const searchGoogleBooks = async (query) => {
  try {
    const res = await axios.get(`${GOOGLE_BOOKS_API}`, {
      params: {
        q: query,
        printType: "books",
        projection: "full",
        maxResults: 10,
        key: API_KEY,
        country: "US", 
      },
    });
    return res.data.items;
  } catch (error) {
    console.error("Google Books API Error:", error);
    return [];
  }
};
