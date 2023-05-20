import { useEffect, useState } from "react";
import Input from "./Input.component";
import { useRecoilState } from "recoil";

import { handlePostState, useSSRPostsState } from "@/atoms/postAtom";
import Post from "./Post.component";

const Feed = ({ posts }) => {

  const [realTimePosts, setRealTimePosts] = useState([]);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const responseData = await response.json();
      setRealTimePosts(responseData);
      setHandlePost(false);
      setUseSSRPosts(false);
    }

    fetchPosts()
  }, [handlePost])

  return (
    <div className="space-y-6 pb-24 max-w-xl">
      <Input />

      {
        /**
         * on first login get the post data from the SSR, on new posts get the post data from realtime post 
         * so no unnecessary rerender
         * if useSSRPosts is false display realtime post
         * else render the ssr posts 
         */

        useSSRPosts ? (
          posts.map(post => (
            <Post key={post._id} post={post} />
          ))
        ) : (
          realTimePosts.map(post => (
            <Post key={post._id} post={post} />
          ))
        )
      }
    </div>
  )
}

export default Feed