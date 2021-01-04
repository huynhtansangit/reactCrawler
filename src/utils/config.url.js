const BASE_URL = 'https://dacnhk1.herokuapp.com';

const REGISTER_URL = BASE_URL + "/register";
const VERIFY_REGISTER_URL = REGISTER_URL + "/verify";

const TOKEN_URL = BASE_URL+"/user/token";

const ADMIN_URL = BASE_URL + "/admin";
const ADMIN_TOKEN_URL = ADMIN_URL +"/token";
const ADMIN_USER_URL = ADMIN_URL + "/users";
const ADMIN_LOG_URL = ADMIN_URL + "/logs";
const ADMIN_STATISTIC_URL = ADMIN_URL + "/statistics";


const RESET_PASSWORD_URL = BASE_URL + "/user/reset-password";
const VERIFY_RESET_PASSWORD_URL = RESET_PASSWORD_URL + "/verify";

const DOWNLOAD_URL = BASE_URL + "/download";

const MY_ACCOUNT_INFO_URL = BASE_URL + "/me";
const UPDATE_MY_ACCOUNT_INFO_URL = MY_ACCOUNT_INFO_URL + "/update";
const MY_AVATAR_URL = MY_ACCOUNT_INFO_URL + "/avatar";
const COLLECTIONS_URL = MY_ACCOUNT_INFO_URL + "/collections";
const HISTORY_URL = MY_ACCOUNT_INFO_URL + "/logs";

export { 
    BASE_URL,
    REGISTER_URL,
    VERIFY_REGISTER_URL, 
    TOKEN_URL,
    RESET_PASSWORD_URL,
    VERIFY_RESET_PASSWORD_URL,
    DOWNLOAD_URL,
    MY_ACCOUNT_INFO_URL,
    UPDATE_MY_ACCOUNT_INFO_URL,
    MY_AVATAR_URL,
    ADMIN_TOKEN_URL,
    ADMIN_USER_URL,
    ADMIN_LOG_URL,
    ADMIN_STATISTIC_URL,
    COLLECTIONS_URL,
    HISTORY_URL,
};