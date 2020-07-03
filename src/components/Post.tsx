import React, { useEffect, useState, memo, useContext } from "react";
import { db } from "./Functions/Firebase";
import style from "../styles/Post.module.scss";
import { AuthContext } from "./AuthContext";

type PostObjType = {
  url: string;
  uid: string | undefined;
};

type PostPropsType = {
  postsArray: PostObjType[] | undefined;
  postObj: PostObjType;
};

const Post: React.FC<PostPropsType> = memo(({ postsArray, postObj }) => {
  if (postsArray && postObj === postsArray[postsArray.length - 1]) {
    const element = document.documentElement;
    setTimeout(() => element.scrollIntoView(false), 500);
  }

  const [
    userData,
    setUserData,
  ] = useState<firebase.firestore.DocumentData | null>();
  useEffect(() => {
    if (!postObj.uid) return;
    db.collection("users")
      .doc(postObj.uid)
      .onSnapshot((doc) => setUserData(doc.data()));
  }, [postObj.uid]);

  const { user } = useContext(AuthContext);
  const isSignedInUser = user?.uid === postObj.uid;

  return (
    <div className={style.post__gifWrap}>
      <img className={style.post__gif} src={postObj.url} alt="post" />
      {userData && (
        <div
          className={isSignedInUser ? style.post__user : style.post__notUser}
        >
          <img src={userData.avatar} className={style.post__avatar} alt="" />
          <span className={style.post__name}>{userData.name}</span>
        </div>
      )}
    </div>
  );
});

export default Post;
