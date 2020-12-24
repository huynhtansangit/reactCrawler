import axiosClient from "../../../utils/axiosClient";
import {ADMIN_USER_URL} from "../../../utils/config.url";

class ListUserApi{
    getUsers = (params)=>{
        return axiosClient.get(ADMIN_USER_URL,{params});
    }

    activateUser = (phone, params) => {
        return axiosClient.post(`${ADMIN_USER_URL}/${phone}/activate`,{params});
    }

    deactivateUser = (phone, params) => {
        return axiosClient.post(`${ADMIN_USER_URL}/${phone}/deactivate`,{params});
    }

    getUser = (phone, params) => {
        return axiosClient.get(`${ADMIN_USER_URL}/${phone}`,{params});
    }
}
export default new ListUserApi();