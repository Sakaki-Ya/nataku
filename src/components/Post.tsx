import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import style from "../styles/Post.module.scss";

type PostType = {
  url: string;
  avatar: string | null;
  name: string | null;
  uid: string | null;
};

const Post: React.FC = () => {
  const postsArray = useCollectionData<PostType>(
    db.collection("posts").orderBy("createdAt").limit(15)
  )[0];
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => setCurrentUser(user));
  }, []);

  const posts = postsArray?.map((postObj, index) => {
    if (postObj === postsArray[postsArray.length - 1]) {
      const element = document.documentElement;
      setTimeout(() => element.scrollIntoView(false), 500);
    }
    const avatar = postObj.avatar;
    const name = postObj.name;
    const postUid = postObj.uid;

    return (
      <div key={index} className={style.post__gifWrap}>
        <img className={style.post__gif} src={postObj.url} alt="post" />
        {avatar && name && (
          <div
            className={
              currentUser?.uid === postUid
                ? style.post__user
                : style.post__notUser
            }
          >
            <img src={avatar} className={style.post__avatar} alt="" />
            <span className={style.post__name}>{name}</span>
          </div>
        )}
      </div>
    );
  });

  return (
    <main className={style.post__wrap}>
      <div>{posts}</div>
    </main>
  );
};

export default Post;
