import axiosClient from "./axiosClient";

class HistoryApi{
    get10Elements =(params)=>{
        const url='/admin/logs'
        return axiosClient.get(url,{params});
    }
}
const historyApi=new HistoryApi();
export default historyApi;