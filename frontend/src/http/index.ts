import axios from "axios";

const govno = process.env.REACT_APP_API_URL

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// const $host = axios.create({
//   baseURL: 'http://localhost:5000/',
// });

export { $host };
