import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import style from "../styles/Post.module.scss";

type PostType = {
  url: string;
  avatar: string | null;
  name: string | null;
  uid: string | undefined;
};

const Post: React.FC = () => {
  const postsArray = useCollectionData<PostType>(
    db.collection("posts").orderBy("createdAt").limit(15)
  )[0];

  const posts = postsArray?.map((postObj, index) => {
    return <PostParts postsArray={postsArray} postObj={postObj} key={index} />;
  });

  return (
    <main className={style.post__wrap}>
      <div>{posts}</div>
    </main>
  );
};

type PostPartsType = {
  postsArray: PostType[] | undefined;
  postObj: PostType;
};

const PostParts = ({ postsArray, postObj }: PostPartsType) => {
  console.log("hoge");
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => setCurrentUser(user));
  }, []);

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
    (async () => {
      const userDoc = await db.collection("users").doc(postObj.uid).get();
      const userDataRef = userDoc.data();
      setUserData(userDataRef);
    })();
  }, [postObj.uid]);

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
};

export default Post;
