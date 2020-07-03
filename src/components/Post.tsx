import React, { useEffect, useState, memo, useContext } from "react";
import { db } from "./Functions/Firebase";
import style from "../styles/Post.module.scss";
import { AuthContext } from "./AuthContext";

type PostType = {
  url: string;
  uid: string | undefined;
};

type PostPartsType = {
  postsArray: PostType[] | undefined;
  postObj: PostType;
};

const Post: React.FC<PostPartsType> = memo(({ postsArray, postObj }) => {
  const { user } = useContext(AuthContext);
  if (postsArray && postObj === postsArray[postsArray.length - 1]) {
    const element = document.documentElement;
    setTimeout(() => element.scrollIntoView(false), 500);
  }

  const isSignedInUser = user?.uid === postObj.uid;

  const [
    userData,
    setUserData,
  ] = useState<firebase.firestore.DocumentData | null>();
  useEffect(() => {
    if (!postObj.uid) return;
    db.collection("users")
      .doc(postObj.uid)
      .onSnapshot(async (doc) => {
        setUserData(doc.data());
      });
  }, [postObj.uid]);

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
