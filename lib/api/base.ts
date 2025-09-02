import axios, { AxiosInstance } from "axios";

export const axiosPrivate: AxiosInstance = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1',
});
