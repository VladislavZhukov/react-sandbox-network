import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";

const ADD_POST = "sandbox_network/profile/ADD_POST";
const SET_USER_PROFILE = "sandbox_network/profile/SET_USER_PROFILE";
const SET_USER_STATUS = "sandbox_network/profile/SET_USER_STATUS";
const DELETE_POST = "sandbox_network/profile/DELETE_POST";
const SET_PHOTO_SUCCESS = "sandbox_network/profile/SET_PHOTO_SUCCESS";

let initialState = {
    postsData: [
        { id: 1, message: "JOJO like PlayStation XD", likeCounter: 10 },
        { id: 2, message: "I need apple", likeCounter: 20 },
    ],
    profile: null,
    status: null
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPostForm = {
                id: state.postsData.length + 1,
                message: action.newPostText,
                likeCounter: 0,
            };
            return {
                ...state,
                postsData: [...state.postsData, newPostForm]
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id !== action.postId)
            };
        case SET_PHOTO_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos }
            };
        default:
            return state;
    }
};
//ActionCreator
export const addPost = (newPostText) => ({ type: ADD_POST, newPostText });
export const deletePost = (postId) => ({ type: DELETE_POST, postId });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile: profile });
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status: status });
export const setPhotoSuccess = (photos) => ({ type: SET_PHOTO_SUCCESS, photos: photos });

//ThunkCreator
export const getProfile = (userId) => async (dispatch) => {
    const response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response));
};
export const getStatus = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(response));
};
export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status);
    if (response.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
};
export const savePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file);
    if (response.resultCode === 0) {
        dispatch(setPhotoSuccess(response.data.photos));
    }
};
export const saveProfile = (updatedProfile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(updatedProfile);
    if (response.resultCode === 0) {
        dispatch(getProfile(userId));
    } else {
        dispatch(stopSubmit("editProfile", { _error: response.messages[0] }));
        //modify on --> dispatch(stopSubmit("editProfile", { "contacts": {"facebook": response.messages[0] } }));
        return Promise.reject(response.messages[0]);
    }
};

export default profileReducer;
