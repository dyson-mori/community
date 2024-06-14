import axios from 'axios';

export const api = axios.create({
  // baseURL: 'http://192.168.18.10:3333/api'
  baseURL: 'http://192.168.18.19:3333/'
  // baseURL: 'http://192.168.18.19:3333/api'
})