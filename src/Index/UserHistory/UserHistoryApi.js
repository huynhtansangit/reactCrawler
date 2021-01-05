import axiosClient from "../../utils/axiosClientForUser";
import {HISTORY_URL, COLLECTIONS_URL} from "../../utils/config.url";
import { axiosRequestErrorHandler } from "../../utils/axiosRequestErrorHandler"

class UserHistoryApi{
    getCrawlHistory = (params)=>{
        params['type']='crawl';
        return axiosRequestErrorHandler(()=>axiosClient.get(HISTORY_URL,{params}));
    }

    getAddItemHistory = (params)=>{
        params['type']='add_item';
        return axiosRequestErrorHandler(()=>axiosClient.get(HISTORY_URL,{params}));
    }

    getCollectionById = (id, params)=>{
        return axiosRequestErrorHandler(()=>axiosClient.get(COLLECTIONS_URL+`/${id}`,{params}));
    }
}
export default new UserHistoryApi();