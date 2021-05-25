import { profileAPI } from "../api/api";

const ADD_POST = "sandbox_network/profile/ADD_POST";
const SET_USER_PROFILE = "sandbox_network/profile/SET_USER_PROFILE";
const SET_USER_STATUS = "sandbox_network/profile/SET_USER_STATUS";
const DELETE_POST = "sandbox_network/profile/DELETE_POST";

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
        default:
            return state;
    }
};
//ActionCreator
export const addPost = (newPostText) => ({ type: ADD_POST, newPostText });
export const deletePost = (postId) => ({ type: DELETE_POST, postId });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile: profile });
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status: status });

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

export default profileReducer;
