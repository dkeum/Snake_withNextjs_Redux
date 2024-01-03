"use client";

import { useDispatch } from "react-redux";

import { AppDispatch, useAppSelector } from "../redux/store";
import { useState } from "react";
import { postAdded} from "../redux/features/post/postSlice";


export default function PostList() {
  const posts = useAppSelector((state) => state.posts);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  return (
    <section>
      <form>
        <label>input title:</label>
        <input
          type="text"
          placeholder="your title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>input content:</label>
        <input
          type="text"
          placeholder="your content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button

        className = "border border-white mx-5 p-4"
          onClick={ (e) => {
            e.preventDefault()
            dispatch(postAdded(title,content));
            setTitle("")
            setContent("")
          }}
        >
          add Post
        </button>
      </form>

      <h1>Posts</h1>
      {posts.map((post) => (
        <article
          className="border border-fuchsia-500 hover:bg-slate-200 mx-4 mt-5"
          key={post.id}
        >
          <h2>{post.id}</h2>
          <h3>{post.title}</h3>
          <p>{post.content.substring(0, 100)}</p>
        </article>
      ))}
    </section>
  );
}
