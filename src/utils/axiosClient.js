import axios from 'axios';
import queryString from 'query-string';
import Cookies from './cookie'


const accessToken=Cookies.get('accessToken');

// set up default config for http requests here
const axiosClient = axios.create({
    // baseURL: BASE_URL,
    headers:{
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'content-type':'application/x-www-form-urlencoded',

    },
    paramsSerializer: params =>queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config)=>{
    //Handle token here ...
    return config;
})

axiosClient.interceptors.response.use((response)=>{
    if(response&& response.data){
        return response.data;
    }
    
    return response;
},(error)=>{
    //Handle error here
    throw error;
});

export default axiosClient;