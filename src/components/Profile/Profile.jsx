import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer.jsx";
import ProfileInfo from "./ProfileInfo/ProfileInfo.jsx";

const Profile = React.memo((props) => {
  return (
    <div>
      <ProfileInfo {...props} />
      <MyPostsContainer />
    </div>
  );
});

export default Profile;
