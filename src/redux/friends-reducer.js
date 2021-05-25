import { friendsAPI } from "../api/api";
import { updateObjectArray } from "../utils/object-helpers";

const FOLLOW = "sandbox_network/friends/FOLLOW";
const UNFOLLOW = "sandbox_network/friends/UNFOLLOW";
const SET_FRIENDS = "sandbox_network/friends/SET_FRIENDS";
const SET_CURRENT_PAGE = "sandbox_network/friends/SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "sandbox_network/friends/SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "sandbox_network/friends/TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_IN_PROGRESS = "sandbox_network/friends/TOGGLE_FOLLOWING_IN_PROGRESS";

let initialState = {
    friendsData: [],
    pageSize: 10,
    totalFriendsCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                friendsData: updateObjectArray(state.friendsData, action.userId, "id", { followed: true })
            };
        case UNFOLLOW:
            return {
                ...state,
                friendsData: updateObjectArray(state.friendsData, action.userId, "id", { followed: false })
            };
        case SET_FRIENDS:
            return {
                ...state,
                friendsData: action.friendsData
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalFriendsCount: action.totalFriendsCount
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
};
//ActionCreator
export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unFollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setFriends = (friendsData) => ({ type: SET_FRIENDS, friendsData });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalCount = (totalFriendsCount) => ({ type: SET_TOTAL_COUNT, totalFriendsCount });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingInProgress = (followingInProgress, userId) => ({ type: TOGGLE_FOLLOWING_IN_PROGRESS, followingInProgress, userId });
//ThunkCreator
export const getFriends = (page, pageSize) => async (dispatch) => {
    dispatch(setCurrentPage(page));
    dispatch(toggleIsFetching(true));
    const response = await friendsAPI.getUsers(page, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setFriends(response.items));
    dispatch(setTotalCount(response.totalCount));
};
export const follow = (id) => async (dispatch) => {
    followUnfollowFlow(dispatch, id, friendsAPI.follow.bind(friendsAPI), followSuccess);
};
export const unfollow = (id) => async (dispatch) => {
    followUnfollowFlow(dispatch, id, friendsAPI.unfollow.bind(friendsAPI), unFollowSuccess);
};

export default friendsReducer;

const followUnfollowFlow = async (dispatch, id, apiMethod, actionCreator) => {
    dispatch(toggleFollowingInProgress(true, id));
    const response = await apiMethod(id)
    if (response.resultCode === 0) {
        dispatch(toggleFollowingInProgress(false, id));
        dispatch(actionCreator(id));
    }
}
