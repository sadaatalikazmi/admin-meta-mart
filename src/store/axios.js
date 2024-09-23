import axios from 'axios';
import { ApiUrl } from './config';

const { REACT_APP_PRIVATE_KEY } = process['env'];

axios.defaults.baseURL = ApiUrl;
axios.defaults.headers.common['Content-Type'] = `applicationl/json`;
let token = null;

try {
  token = JSON.parse(localStorage.getItem('token'));
} catch (e) { }

if (token) axios.defaults.headers.common['Authorization'] = `bearer ${token}`;

export const setToken = token => {
  if (token) axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
  else delete axios.defaults.headers.common['Authorization'];
};

export const setHash = hash => {
  if (hash) axios.defaults.headers.common['hash'] = hash;
  else delete axios.defaults.headers.common['hash'];
};
