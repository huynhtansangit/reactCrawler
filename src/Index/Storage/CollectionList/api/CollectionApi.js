import axios from 'axios';
import {COLLECTIONS_URL} from "../../../../utils/config.url";
import cookies from "../../../../utils/cookie";

class CollectionApi{
    getCollectionById =async (param)=>{
        const accessToken = cookies.get("accessToken");
        const config = {
            url: `${COLLECTIONS_URL}/${param}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${accessToken}`
            },
        };
        const result =[];
        await axios.request(config)
                .then(res => res.data)
                .then(data => {
                    if (data) {
                         data["items"].forEach(element => {
                            result.push(element);
                        });
                    }
                })
                .catch(error => {
                    console.log("Error occurred when trying to get your collection.");
                    if (error.response) {
                        alert(error.response.data.message);
                    }
                    else {
                        alert("Something went wrong. Please check your internet connection.");
                    }
                })
        return result;
    }
}
export default new CollectionApi();