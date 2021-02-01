import axios from "axios";
import { ulid } from "ulid";
import app from '../main';

var ts = Math.round(+new Date() / 1000);

const baseURL = process.env.VUE_APP_BASEURL;

export const publicClient = axios.create({
    baseURL,
    withCredentials: false, // This is the default
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Channel": "web",
        "X-Timestamp": ts,
        "X-Clid": ulid(),
    },
});

export const apiClient = axios.create({
    baseURL,
    withCredentials: false, // This is the default
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Channel": "web",
        "X-Clid": ulid(),
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
    },
});
apiClient.interceptors.response.use(res => {
    return res
}, err =>{
    return Promise.reject(err)
})
publicClient.interceptors.response.use((res) =>{
    return res

}, err => {
   
    console.log('public client error')
    if(!err.request.response){
        app.$store.commit('SET_OFFLINE', true)
        throw new Error('connection failed')
      }
    return Promise.reject(err); 
})

// apiClient.interceptors.response.use( (res) =>{
//     return res

// }, err => {
//     if (err.response) {
//         if(err.response.data.message === 'access denied'){
//             app.$store.dispatch("logout");
//         }        
//     }

//     return Promise.reject(err); 
// })