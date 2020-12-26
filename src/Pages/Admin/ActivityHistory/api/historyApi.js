import axiosClient from "../../../../utils/axiosClient";
import {ADMIN_LOG_URL} from "../../../../utils/config.url";

class HistoryApi{
    getLogs =(params)=>{
        return axiosClient.get(ADMIN_LOG_URL,{params});
    }
}
export default new HistoryApi();