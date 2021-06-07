import { stopSubmit } from "redux-form";
import { authAPI, securityApi } from "../api/api";

const SET_USER_DATA = "sandbox_network/auth/SET_USER_DATA";
const SET_CAPTCHA_URL_SUCCESS = "sandbox_network/auth/SET_CAPTCHA_URL_SUCCESS";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
};

let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
};
//ActionCreator
export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    data: { userId, email, login, isAuth }
});
export const setCaptchaUrlSuccess = (captchaUrl) => ({
    type: SET_CAPTCHA_URL_SUCCESS,
    data: { captchaUrl }
});
//ThunkCreator
export const getAuthUserData = () => async (dispatch) => {
    const response = await authAPI.auth();
    if (response.resultCode === 0) {
        let auth = response.data;
        dispatch(setAuthUserData(auth.id, auth.email, auth.login, true));
    }
};
export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        if (response.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let errorMessage = response.messages.length > 0 ? response.messages[0] : "Some error";
        dispatch(stopSubmit("login", { _error: errorMessage }));
    }
};
export const logout = () => async (dispatch) => {
    const response = await authAPI.logout();
    if (response.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};
export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityApi.getCaptchaUrl();
    dispatch(setCaptchaUrlSuccess(response.data.url))
};

export default authReducer;
