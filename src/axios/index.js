import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  // headers: {
  //     Authorization: {
  //         toString() {
  //             return `Bearer ${localStorage.getItem('token')}`
  //         }
  //     }
  // }
});
