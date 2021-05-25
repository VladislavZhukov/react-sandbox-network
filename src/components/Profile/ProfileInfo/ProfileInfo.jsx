import React from "react";
import Preloader from "../../Common/Preloader/Preloader";
import pim from "./ProfileInfo.module.css";
//import ProfileStatus from "./ProfileStatus";
import ProfileStatusHooks from "./ProfileStatusHooks";

const ProfileInfo = React.memo(
  ({ profile, status, updateStatus, ...props }) => {
    if (!profile) {
      return <Preloader />;
    } else {
      return (
        <div>
          <div className={pim.wallpaper}>
            <img
              src="https://www.meme-arsenal.com/memes/b5ec78ef88097e4d8f4c0ea87962ee9b.jpg"
              alt="anime background 0_0"
            />
          </div>
          <div className={pim.description}>
            <img src={profile.photos.large} alt="you face" />
            <ProfileStatusHooks status={status} updateStatus={updateStatus} />
            <div>NAME: {profile.fullName}</div>
            <div>VK: {profile.contacts.vk}</div>
          </div>
        </div>
      );
    }
  }
);

export default ProfileInfo;
