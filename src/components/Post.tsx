import React, { useEffect, useState, memo } from "react";
import { auth, db } from "./Functions/Firebase";
import { useUpdate } from "../App";
import style from "../styles/Post.module.scss";

type PostType = {
  url: string;
  uid: string | undefined;
};

type PostPartsType = {
  postsArray: PostType[] | undefined;
  postObj: PostType;
};

const Post: React.FC<PostPartsType> = memo(({ postsArray, postObj }) => {
  if (postsArray && postObj === postsArray[postsArray.length - 1]) {
    const element = document.documentElement;
    setTimeout(() => element.scrollIntoView(false), 500);
  }

  const [
    userData,
    setUserData,
  ] = useState<firebase.firestore.DocumentData | null>();
  const update = useUpdate()[0];
  useEffect(() => {
    if (!postObj.uid) return;
    (async () => {
      const userDoc = await db.collection("users").doc(postObj.uid).get();
      const userDataRef = userDoc.data();
      setUserData(userDataRef);
    })();
  }, [postObj.uid, update]);

  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  useEffect(() => {
    auth.onAuthStateChanged((user) => setCurrentUser(user));
  }, []);

  return (
    <div className={style.post__gifWrap}>
      <img className={style.post__gif} src={postObj.url} alt="post" />
      {userData && (
        <div
          className={
            currentUser?.uid === userData.uid
              ? style.post__user
              : style.post__notUser
          }
        >
          <img src={userData.avatar} className={style.post__avatar} alt="" />
          <span className={style.post__name}>{userData.name}</span>
        </div>
      )}
    </div>
  );
});

export default Post;
