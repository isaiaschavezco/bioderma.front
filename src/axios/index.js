import axios from "axios";

export const axiosInstance = axios.create({
  //baseURL: 'https://bioderma-dev.herokuapp.com/',
  //  baseURL: 'https://bioderma-api-inmersys.herokuapp.com/',
  baseURL: "http://inmersys.xyz:4005/"
  // baseURL:'http://localhost:3500/',
  // headers: {
  //     Authorization: {
  //         toString() {
  //             return `Bearer ${localStorage.getItem('token')}`
  //         }
  //     }
  // }
});
