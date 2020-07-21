import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'https://bioderma-api-inmersys.herokuapp.com/', // 'http://localhost:3000/', 
  // headers: {
  //     Authorization: {
  //         toString() {
  //             return `Bearer ${localStorage.getItem('token')}`
  //         }
  //     }
  // }
});
