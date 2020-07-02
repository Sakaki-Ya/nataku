import React, { memo, useEffect, useState } from "react";
import { db } from "./Functions/Firebase";
import { useUpdate } from "../App";
import style from "../styles/Post.module.scss";
import Post from "./Post";

type PostType = {
  url: string;
  uid: string | undefined;
};

const Posts: React.FC = memo(() => {
  const update = useUpdate()[0];
  const [postsArray, setPostsArray] = useState<any>();
  useEffect(() => {
    (async () => {
      const querySnapshot = await db
        .collection("posts")
        .orderBy("createdAt", "desc")
        .limit(15)
        .get();
      const docArray = querySnapshot.docs;
      const dataArray = docArray.map((doc) => doc.data());
      setPostsArray(dataArray);
    })();
  }, [update]);

  const posts = postsArray
    ?.reverse()
    .map(
      (
        postObj: { url: string; uid: string | undefined },
        index: string | number | undefined
      ) => <Post postsArray={postsArray} postObj={postObj} key={index} />
    );

  return <main className={style.post__wrap}>{posts}</main>;
});

export default Posts;
