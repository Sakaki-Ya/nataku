import React, { useState } from "react";
import { useSetUpdate } from "../../App";
import { auth, db, storage } from "../Functions/Firebase";
import { blueAlert, blackAlert, redAlert } from "../Functions/Alert";
import style from "../../styles/HeaderStyle/User.module.scss";
import temp from "../../styles/ConfigStyle/Template.module.scss";
import defaultAvatar from "../../img/defaultAvatar.svg";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";
import Resizer from "react-image-file-resizer";

let inputName: string;

const loaderStyle = css`
  margin-top: 1rem;
`;

const checkType = (url: any) => {
  const type = url.slice(((url.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();
  if (type === "png") return "PNG";
  return "JPEG";
};

const User: React.FC<{
  setUserSide: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setUserSide }) => {
  const currentUser = auth.currentUser;

  const setUpdate = useSetUpdate();

  const [uploading, setUploading] = useState(false);
  const uploadAvatar = async (blob: any) => {
    if (!blob || !currentUser) return;
    setUploading(true);
    const avatarRef = await storage.ref().child("avatar/" + currentUser.uid);
    await avatarRef.put(blob);
    const newAvatarURL = await avatarRef.getDownloadURL();
    const currentUserDoc = await db.collection("users").doc(currentUser.uid);
    await currentUserDoc.update({
      avatar: newAvatarURL,
    });
    await currentUser.updateProfile({
      photoURL: newAvatarURL,
    });
    setUploading(false);
    setUpdate(Math.random());
    blueAlert("Update");
  };
  const resizeAvatar = async (file: FileList | null) => {
    if (!file) return;
    const img = file[0];
    Resizer.imageFileResizer(
      img,
      300,
      300,
      checkType(img.name),
      100,
      0,
      (uri) => {
        uploadAvatar(uri);
      },
      "blob"
    );
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
    setUpdate(Math.random());
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
            onChange={(e) => resizeAvatar(e.target.files)}
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
            aria-label="change name"
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
