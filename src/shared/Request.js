import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    "Content-Type": `application/json;charset=UTF-8`,
    "Accept": "application/json",
  
    // Cors  
    "Access-Control-Allow-Origin": `http://localhost:3000`,
    'Access-Control-Allow-Credentials':"true",
}
});

export default instance;