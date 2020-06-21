import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import style from "../styles/Post.module.scss";

const Post: React.FC = () => {
  const postsArray = useCollectionData(
    db.collection("posts").orderBy("createdAt").limit(15)
  )[0];
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => setCurrentUser(user));
  }, []);

  const posts = postsArray?.map((item: any, index) => {
    const avatar = item.avatar;
    const name = item.name;
    const postUid = item.uid;

    return (
      <div key={index} className={style.post__gifWrap}>
        <img className={style.post__gif} src={item.url} alt="post" />
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
