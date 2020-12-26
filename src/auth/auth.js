import cookies from '../utils/cookie'
import axios from 'axios'
import qs from 'querystring'
import {TOKEN_URL, ADMIN_TOKEN_URL} from '../utils/config.url'



class Auth {
    constructor() {
        this.authenticated = false;
        this.isAdmin = false;
    }

    async verifyAccessToken(isAdmin){
        if(isAdmin){
            this.isAdmin = true;
        }
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

        let config = {
            url: "",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(refreshForm)
        };
        if(this.isAdmin)
            config['url']= ADMIN_TOKEN_URL;
        else
            config['url']= TOKEN_URL;

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

    logout = (callback)=>{
        localStorage.removeItem('firstname');
        localStorage.removeItem('lastname');

        cookies.set('accessToken', '', { path: '/'});
        cookies.set('refreshToken', '', { path: '/'});
        cookies.set('expireAt', '', { path: '/'});

        callback();
    }
}

export default new Auth();
