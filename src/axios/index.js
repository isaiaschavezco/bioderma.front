import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'https://bioderma-desarrollo.herokuapp.com/', 
  // 'http://localhost:3000/',
  // baseURL:'http://localhost:3500/',
  // headers: {
  //     Authorization: {
  //         toString() {
  //             return `Bearer ${localStorage.getItem('token')}`
  //         }
  //     }
  // }
});
