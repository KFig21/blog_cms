import React, { useEffect, useState } from "react";
import Post from "../../components/post/Post";
import "./Home.scss";
import Loader from "../../components/loader/Loader";

export default function Home() {
  const [posts, setPosts] = useState();
  useEffect(() => {
    const getPosts = async () => {
      try {
        const req = await fetch(
          "https://still-atoll-78147.herokuapp.com/api/posts"
          // "http://localhost:3000/api/posts"
        );
        if (req.status !== 200) {
        }
        const reqJson = await req.json();
        setPosts(reqJson.posts);
      } catch (err) {}
    };
    getPosts();
  }, []);

  return (
    <div className="posts-holder">
      {posts ? (
        <div className="posts-container">
          {posts &&
            posts.map((post) => {
              return <Post key={post._id} post={post} />;
            })}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
