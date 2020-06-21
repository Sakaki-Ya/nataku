import React, { useState } from "react";
import { auth, db, storage } from "../Firebase";
import style from "../styles/User.module.scss";
import temp from "../styles/Template.module.scss";
import defaultAvatar from "../img/logo.svg";

let inputName: string;

const User: React.FC<{
  setUserSide: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setUserSide }) => {
  const currentUser = auth.currentUser;

  const [avatar, setAvatar] = useState(currentUser?.photoURL);
  const changeAvatar = async (file: FileList | null) => {
    if (!file || !currentUser) return;
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
    setAvatar(currentUser.photoURL);
  };

  const saveName = async () => {
    if (!currentUser) return;
    const currentUserDoc = await db.collection("users").doc(currentUser.uid);
    await currentUserDoc.update({
      name: inputName,
    });
    currentUser.updateProfile({
      displayName: inputName,
    });
  };

  const signOut = () => {
    if (!currentUser) return;
    auth.signOut();
    setUserSide(false);
  };

  const deleteUser = async () => {
    if (!currentUser) return;
    await db.collection("users").doc(currentUser.uid).delete();
    currentUser.delete();
    auth.signOut();
    setUserSide(false);
  };

  const name = currentUser?.displayName;

  return (
    <>
      <div
        onClick={() => setUserSide(false)}
        className={style.user__background}
      />
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
