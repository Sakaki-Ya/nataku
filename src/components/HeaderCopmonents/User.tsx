import React, { useState } from "react";
import { useSetUpdate } from "../../App";
import { auth, db, storage } from "../Functions/Firebase";
import { blueAlert, blackAlert, redAlert } from "../Functions/Alert";
import style from "../../styles/HeaderStyle/User.module.scss";
import temp from "../../styles/ConfigStyle/Template.module.scss";
import defaultAvatar from "../../img/defaultAvatar.svg";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";

let inputName: string;

const loaderStyle = css`
  margin-top: 1rem;
`;

const User: React.FC<{
  setUserSide: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setUserSide }) => {
  const currentUser = auth.currentUser;

  const setUpdate = useSetUpdate();

  const [uploading, setUploading] = useState(false);
  const changeAvatar = async (file: FileList | null) => {
    if (!file || !currentUser) return;
    setUploading(true);
    const avatarRef = await storage.ref().child("avatar/" + currentUser.uid);
    const newAvatar = file[0];
    await avatarRef.put(newAvatar);
    const newAvatarURL = await avatarRef.getDownloadURL();
    const currentUserDoc = await db.collection("users").doc(currentUser.uid);
    await currentUserDoc.update({
      avatar: newAvatarURL,
    });
    await currentUser.updateProfile({
      photoURL: newAvatarURL,
    });
    setUploading(false);
    setUpdate("avatar");
    blueAlert("Update");
  };

  const saveName = async () => {
    if (!currentUser || !inputName) return;
    const currentUserDoc = await db.collection("users").doc(currentUser.uid);
    await currentUserDoc.update({
      name: inputName,
    });
    currentUser.updateProfile({
      displayName: inputName,
    });
    setUpdate("name");
    blueAlert("Update");
  };

  const signOut = () => {
    if (!currentUser) return;
    auth.signOut();
    blackAlert("Sign Out");
  };

  const deleteUser = async () => {
    if (!currentUser) return;
    await db.collection("users").doc(currentUser.uid).delete();
    currentUser.delete();
    auth.signOut();
    redAlert("Delete Account");
  };

  const avatar = currentUser?.photoURL;
  const name = currentUser?.displayName;

  return (
    <>
      <div className={style.user__contents}>
        <div className={style.user__avatarSection}>
          <img
            className={style.user__avatar}
            src={avatar ? avatar : defaultAvatar}
            alt="Avatar"
          />
          <input
            onChange={(e) => changeAvatar(e.target.files)}
            accept="image/*"
            type="file"
            id="changeImage"
            aria-label="change image"
            hidden
          />
          <label className={style.user__upload} htmlFor="changeImage">
            &#x2b06;Change Image
          </label>
          <BarLoader
            css={loaderStyle}
            height={8}
            color={"#3ab549"}
            loading={uploading}
          />
        </div>
        <div className={style.user__name}>
          <p>&#x1f58a; Name</p>
          <input
            onChange={(e) => (inputName = e.target.value)}
            className={temp.input}
            defaultValue={name ? name : "Anonymous"}
            type="text"
            placeholder="Your name"
          />
        </div>
        <div className={style.user__buttons}>
          <div className={style.user__saveClose}>
            <button onClick={saveName} className={style.user__save}>
              Save
            </button>
            <button
              onClick={() => setUserSide(false)}
              className={style.user__close}
            >
              Close
            </button>
          </div>
          <div>
            <button onClick={signOut} className={style.user__signOut}>
              Sign Out
            </button>
          </div>
          <div>
            <button onClick={deleteUser} className={style.user__delete}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
