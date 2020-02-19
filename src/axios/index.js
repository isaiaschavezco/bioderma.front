import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',// 'https://bioderma-api-inmersys.herokuapp.com/',
  // headers: {
  //     Authorization: {
  //         toString() {
  //             return `Bearer ${localStorage.getItem('token')}`
  //         }
  //     }
  // }
});
