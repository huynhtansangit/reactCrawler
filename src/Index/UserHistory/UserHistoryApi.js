import axiosClient from "../../utils/axiosClientForUser";
import {HISTORY_URL} from "../../utils/config.url";
import { axiosRequestErrorHandler } from "../../utils/axiosRequestErrorHandler"

class DashboardApi{
    getCrawlHistory = (params)=>{
        params['type']='crawl';
        return axiosRequestErrorHandler(()=>axiosClient.get(HISTORY_URL,{params}));
    }


}
export default new DashboardApi();