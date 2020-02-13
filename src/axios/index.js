import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'http://192.168.15.22:3000/',
  // headers: {
  //     Authorization: {
  //         toString() {
  //             return `Bearer ${localStorage.getItem('token')}`
  //         }
  //     }
  // }
});
