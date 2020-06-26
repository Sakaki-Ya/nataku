import React from "react";
import { db } from "../Firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import style from "../styles/Post.module.scss";
import Post from "./Post";

type PostType = {
  url: string;
  avatar: string | null;
  name: string | null;
  uid: string | undefined;
};

const Posts: React.FC = () => {
  const postsArray = useCollectionData<PostType>(
    db.collection("posts").orderBy("createdAt").limit(15)
  )[0];

  const posts = postsArray?.map((postObj, index) => {
    return <Post postsArray={postsArray} postObj={postObj} key={index} />;
  });

  return (
    <main className={style.post__wrap}>
      <div>{posts}</div>
    </main>
  );
};

export default Posts;
