import React from "react";
import Pagination from "../Common/Pagination/Pagination";
import Friend from "./Friend";

let Friends = ({
  currentPage,
  friendsData,
  onPageChanged,
  totalFriendsCount,
  ...props
}) => {  
  return (
    <div>
      <div>
        <Pagination
          totalFriendsCount={totalFriendsCount}
          currentPage={currentPage}
          onPageChanged={onPageChanged}
          pageSize={props.pageSize}
        />
      </div>
      <div>
        {/* {pages.map((p) => {
          return (
            <span
              className={
                props.currentPage === p ? fm.selectedPage : fm.noSelectedPage
              }
              onClick={() => {
                props.onPageChanged(p);
              }}
            >
              {p}
            </span>
          );
        })} */}
      </div>
      {friendsData.map((f) => (
        <Friend
          friend={f}
          key={f.id}
          id={f.id}
          followingInProgress={props.followingInProgress}
          follow={props.follow}
          unfollow={props.unfollow}
        />
      ))}
    </div>
  );
};

export default Friends;
