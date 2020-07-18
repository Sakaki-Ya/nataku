import React, { useState, useEffect } from "react";
import { db } from "./Functions/Firebase";
import style from "../styles/Post.module.scss";
import Post from "./Post";

type PostType = {
  url: string;
  uid: string | undefined;
};

const Posts: React.FC = () => {
  const [postsArray, setPostArray] = useState<any>([]);
  useEffect(() => {
    db.collection("posts").onSnapshot((querySnapShot) => {
      const dataArray = querySnapShot.docs.map((doc) => doc.data());
      setPostArray(dataArray);
    });
  }, []);

  const posts = postsArray?.map(
    (postObj: PostType, index: string | number | undefined) => (
      <Post postsArray={postsArray} postObj={postObj} key={index} />
    )
  );

  return <main className={style.post__wrap}>{posts}</main>;
};

export default Posts;
