import React, { memo } from "react";
import { db } from "./Functions/Firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import style from "../styles/Post.module.scss";
import Post from "./Post";

type PostType = {
  url: string;
  uid: string | undefined;
};

const Posts: React.FC = memo(() => {
  const postsArray = useCollectionData<PostType>(
    db.collection("posts").orderBy("createdAt", "desc").limit(15)
  )[0];

  const posts = postsArray
    ?.reverse()
    .map((postObj, index) => (
      <Post postsArray={postsArray} postObj={postObj} key={index} />
    ));

  return <main className={style.post__wrap}>{posts}</main>;
});

export default Posts;
