import React from "react";
import Preloader from "../../Common/Preloader/Preloader";
import pim from "./ProfileInfo.module.css";
import ProfileStatusHooks from "./ProfileStatusHooks";
import avaUser from "../../../assets/images/avaFriendsDefault.jpg";

const ProfileInfo = React.memo(
  ({ profile, status, updateStatus, isOwner, savePhoto, ...props }) => {
    if (!profile) {
      return <Preloader />;
    } else {
      const onMainPhotoSelected = (e) => {
        if(e.target.files.length) {
          savePhoto(e.target.files[0])
        }
      }

      return (
        <div>
          <div className={pim.description}>            
            <img
              src={
                profile.photos.large != null ? profile.photos.large : avaUser
              }
              alt="your face"
              className={pim.mainPhoto}
            />
            <div>
              {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
            </div>
            <ProfileStatusHooks status={status} updateStatus={updateStatus} isOwner={isOwner} />
            <div>NAME: {profile.fullName}</div>
            <div>VK: {profile.contacts.vk}</div>
          </div>
        </div>
      );
    }
  }
);

export default ProfileInfo;
