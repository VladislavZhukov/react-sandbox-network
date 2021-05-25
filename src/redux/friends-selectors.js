import { createSelector } from "reselect";


const getAllFriendsDataSelector = (state) => {
    return state.friendsPage.friendsData;
};
export const getAllFriendsData = createSelector(getAllFriendsDataSelector,
    (friends) => {
        return friends.filter(f => true);
    });
export const getPageSize = (state) => { return state.friendsPage.pageSize };
export const getTotalFriendsCount = (state) => { return state.friendsPage.totalFriendsCount };
export const getCurrentPage = (state) => { return state.friendsPage.currentPage };
export const getIsFetching = (state) => { return state.friendsPage.isFetching };
export const getFollowingInProgress = (state) => { return state.friendsPage.followingInProgress };