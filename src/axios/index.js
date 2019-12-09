import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://bioderma-api-inmersys.herokuapp.com/"
  // headers: {
  //     Authorization: {
  //         toString() {
  //             return `Bearer ${localStorage.getItem('token')}`
  //         }
  //     }
  // }
});
