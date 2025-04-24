import React, { useState, useEffect } from "react";
import { createPost, updatePost } from "../services/postService";

export default function PostForm({
  posts,
  setPosts,
  editingPost,
  setEditingPost,
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setBody(editingPost.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [editingPost]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingPost) {
      editPost();
    } else {
      Addpost();
    }
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

  const editPost = () => {
    updatePost(editingPost.id, { title, body })
      .then((rsponse) => {
        setPosts(
          posts.map((post) =>
            post.id === editingPost.id ? rsponse.data : post
          )
        );
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
        <button type="submit">{editingPost ? "Edit Post" : "Add Post"}</button>
      </div>
    </form>
  );
}
