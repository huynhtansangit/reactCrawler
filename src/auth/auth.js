import cookies from '../utils/cookie'

class Auth {
    constructor() {
        this.authenticated = false;
    }

    login(callback) {
        this.authenticated = true;
        callback();
    }

    logout(callback) {
        this.authenticated = false;
        callback();
    }

    verifyAccessToken(){
        if(cookies.get('accessToken') && Math.floor(Date.now() / 1000) <= cookies.get('expireAt')){
            return true
        }
        else{
            return this.refreshAccessToken();
            // return false;
        }
    }

    refreshAccessToken(){
        console.log("Refreshing");
        if(true){
            // Call API refresh here
            return true;
        }
        else{
            // check if response from api not success => return false, else success: true
            return false;
        }
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();
