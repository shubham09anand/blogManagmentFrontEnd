import axios from "axios";
// const API = axios.create({baseURL: 'http://13.127.165.62:4000/'});
const API = axios.create({baseURL: 'http://13.200.187.11:4000/'});

API.interceptors.request.use((req)=>{
     return req;
});

export default API;