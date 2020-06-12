import React from "react";
import { auth, db, storage } from "../Firebase";
import { useSetSide, useUser, useSetUser } from "../index";
import style from "../styles/User.module.scss";
import temp from "../styles/Template.module.scss";
import logo from "../img/logo.svg";

let inputName: string;

const User: React.FC = () => {
  const setSide = useSetSide();
  const user = useUser();
  const setUser = useSetUser();

  const changeAvatar = async (files: FileList | null) => {
    if (!files) return;
    const newAvatar = files[0];
    const currentUser = auth.currentUser;
    if (!currentUser || user === undefined) return alert("please sign in.");
    const profile = currentUser.providerData[0];
    if (!profile) return alert("can't use this account");
    const avatarRef = await storage
      .ref()
      .child("avatar/" + profile.displayName);
    await avatarRef.put(newAvatar).catch((error) => alert(error));
    const currentUserDoc = await db.collection("users").doc(profile.uid);
    const newAvatarURL = await avatarRef.getDownloadURL();
    await currentUserDoc
      .update({
        avatar: newAvatarURL,
      })
      .catch((error) => alert(error));
    const doc = await currentUserDoc.get();
    const data = doc.data();
    setUser(data);
  };

  const saveName = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return alert("error");
    const profile = currentUser.providerData[0];
    if (!profile) return alert("error");
    const currentUserDoc = await db.collection("users").doc(profile.uid);
    await currentUserDoc
      .update({
        name: inputName,
      })
      .catch((error) => alert(error));
    const doc = await currentUserDoc.get();
    const data = doc.data();
    setUser(data);
  };

  const signOut = () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return alert("error");
    currentUser.delete();
    setUser(undefined);
    setSide("");
  };

  const deleteUser = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser || user === undefined) return alert("error");
    const profile = currentUser.providerData[0];
    if (!profile) return alert("error");
    db.collection("users")
      .doc(profile.uid)
      .delete()
      .catch((error) => alert(error));
    const deleteStorage = await storage
      .ref()
      .child("avatar/" + profile.displayName);
    deleteStorage.delete().catch(() => {});
    currentUser.delete().catch((error) => alert(error));
    setUser(undefined);
    setSide("");
  };

  return (
    <>
      <div onClick={() => setSide("")} className={style.user__background} />
      <div className={style.user__contents}>
        <div className={style.user__avatarSection}>
          <img
            className={style.user__avatar}
            src={user?.avatar === null ? logo : user?.avatar}
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
            defaultValue={user?.name === null ? "Anonymous" : user?.name}
            type="text"
            placeholder="Your name"
          />
        </div>
        <div className={style.user__buttons}>
          <div className={style.user__saveClose}>
            <button onClick={saveName} className={style.user__save}>
              Save
            </button>
            <button onClick={() => setSide("")} className={style.user__close}>
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
