import axios from "axios";
// const API = axios.create({baseURL: 'http://13.202.160.2:4000/'});
const API = axios.create({baseURL: 'https://apiinsider.shubham09anand.in/'});
// const API = axios.create({baseURL: 'http://192.168.1.6:4000/'});

API.interceptors.request.use((req)=>{
     return req;
});

export default API;