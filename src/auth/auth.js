import cookies from '../utils/cookie'
import axios from 'axios'
import qs from 'querystring'

const TOKEN_ENDPOINT = "https://dacnhk1.herokuapp.com/token";


class Auth {
    constructor() {
        this.authenticated = false;
    }

    async verifyAccessToken(){
        const refreshToken = cookies.get('refreshToken');

        if(cookies.get('accessToken') && Math.floor(Date.now() / 1000) <= cookies.get('expireAt')){
            return true
        }
        // If refreshToken are available => Do refresh
        else if(refreshToken){
            let refreshResult = await this.refreshAccessToken(refreshToken);
            return refreshResult;
        }
        else{
            return false;
        }
    }

    async refreshAccessToken(token){
        const refreshForm = {
            'refresh_token': token,
            'grant_type': 'refresh_token'
        };

        const config = {
            url: TOKEN_ENDPOINT,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(refreshForm)
        };
        try {
            const res = await axios.request(config);
            
            if(res.data){
                cookies.set('accessToken', res.data['accessToken'], { path: '/'});
                cookies.set('expireAt', res.data['expireAt'], { path: '/'});
                return true;
            }
        } catch(error){
            if (error.response) {
                console.log("Refresh token failed.");
                console.log(error.response.data);
            }
        }
        return false;
    }
}

export default new Auth();
