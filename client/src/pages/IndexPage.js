import { useEffect, useState } from "react";
import Post from "../components/Post";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4040/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <div className="mt-16">
      {posts.length > 0 ? (
        posts.map((post) => <Post {...post} />)
      ) : (
        <div>
          <p className="empty">No posts available</p>
        </div>
      )}
    </div>
  );
}
