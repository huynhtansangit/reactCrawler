const BASE_URL = 'https://dacnhk1.herokuapp.com';

const TOKEN_URL = BASE_URL+"/token";
const RESET_PASSWORD_URL = BASE_URL+"/user/reset-password";
const VERIFY_RESET_PASSWORD_URL = BASE_URL+"/user/reset-password/verify";
const MY_ACCOUNT_URL = BASE_URL + "/me"

export { 
    BASE_URL, 
    TOKEN_URL,
    RESET_PASSWORD_URL,
    VERIFY_RESET_PASSWORD_URL,
    MY_ACCOUNT_URL
};