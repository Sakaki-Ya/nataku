import React, { useState, useEffect } from "react";
import { firebase, auth, db, storage } from "../Functions/Firebase";
import style from "../../styles/FooterStyle/UploadImg.module.scss";

const UploadeImg: React.FC<{
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setUploading }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => setCurrentUser(user));
  }, []);

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
    </>
  );
};

export default UploadeImg;
