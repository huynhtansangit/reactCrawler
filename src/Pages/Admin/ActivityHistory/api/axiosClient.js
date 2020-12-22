import axios from 'axios';
import queryString from 'query-string';
import {BASE_URL} from '../../../../utils/config.url'

const strAccessToken="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWRtaW4iLCJwaG9uZSI6IjA1Njg4OTk4ODEiLCJlbWFpbCI6bnVsbCwiZmlyc3RuYW1lIjoiTWFpIiwibGFzdG5hbWUiOiJIdW5nIiwic3RhcnRfYXQiOjE2MDg2MzAzMzYsImV4cCI6MTYwODYzMzkzNn0.0wSY7eChtO9RCdkWhlzWr-zx0TJ4902TSvUigGEt1V8";
// set up default config for http requests here
// ???? base url làm gì?
const axiosClient =axios.create({
    baseURL: BASE_URL,
    headers:{
        
        'Authorization': `Bearer ${strAccessToken}`,
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