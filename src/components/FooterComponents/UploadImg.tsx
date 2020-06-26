import React, { useState, useEffect } from "react";
import { firebase, auth, db, storage } from "../Functions/Firebase";
import BarLoader from "react-spinners/BarLoader";
import style from "../../styles/FooterStyle/UploadImg.module.scss";
import { css } from "@emotion/core";

const loaderStyle = css`
  margin: auto;
`;

const UploadeImg: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => setCurrentUser(user));
  }, []);

  const [uploading, setUploading] = useState(false);
  const uploadImg = async (file: FileList | null) => {
    if (!file) return;
    setUploading(true);
    const date = new Date().getTime().toString();
    const uploadRef = await storage.ref().child("posts/" + date);
    const uploadPost = file[0];
    await uploadRef.put(uploadPost);
    const uploadURL = await uploadRef.getDownloadURL();
    const postsRef = await db.collection("posts").doc(date);
    await postsRef.set({
      url: uploadURL,
      avatar: currentUser ? currentUser.photoURL : null,
      name: currentUser ? currentUser.displayName : null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setUploading(false);
  };

  return (
    <>
      <input
        onChange={(e) => uploadImg(e.target.files)}
        type="file"
        id="upload"
        hidden
      />
      <label className={style.uploadImg__inputBtn} htmlFor="upload">
        <p>&#x2b06;</p>
        <span>Upload</span>
      </label>
      <BarLoader
        css={loaderStyle}
        width={200}
        height={12}
        color={"#3ab549"}
        loading={uploading}
      />
    </>
  );
};

export default UploadeImg;
