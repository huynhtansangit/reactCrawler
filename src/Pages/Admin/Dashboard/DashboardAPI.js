import axiosClient from "../../../utils/axiosClient";
import {ADMIN_STATISTIC_URL} from "../../../utils/config.url";

class DashboardApi{
    getStatistic = (params)=>{
        return axiosClient.get(ADMIN_STATISTIC_URL,{params});
    }


}
export default new DashboardApi();