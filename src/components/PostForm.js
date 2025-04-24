import React, { useState } from "react";
import { createPost } from "../services/postService";

export default function PostForm({ posts, setPosts }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    Addpost();
    setTitle("");
    setBody("");
  };

  const Addpost = () => {
    createPost({ title, body })
      .then((rsponse) => {
        setPosts([...posts, rsponse.data]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>title</div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
      ></input>
      <div>body</div>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Enter body"
      ></textarea>
      <div>
        <button type="submit">Add Post</button>
      </div>
    </form>
  );
}
