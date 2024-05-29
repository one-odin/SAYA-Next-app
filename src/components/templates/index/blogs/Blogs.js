"use client";
import {useState, useEffect} from "react";
import Card from "@/components/modules/CardBlog/Card";

export default function Blogs() {
  const [allPosts, setAllPosts] = useState([]);

  const getAllPostData = async () => {
    await fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setAllPosts(data));
  };

  useEffect(() => {
    getAllPostData();
  }, []);

  return (
    <div className="mx-auto px-3">
      {/* header */}
      <h1 className="mb-4 mt-20 text-center text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-4xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-sky-400">مقالات</span>
      </h1>
      <p className="text-center font-normal text-gray-500 dark:text-gray-400">لیست آخرین مقالات</p>

      {/* loading */}
      {allPosts.length === 0 && (
        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <div class="max-w-sm p-10 text-center bg-gray-100 rounded-3xl mx-auto h-96 w-72 animate-pulse"></div>
          <div class="max-w-sm p-10 text-center bg-gray-100 rounded-3xl mx-auto h-96 w-72 animate-pulse"></div>
          <div class="max-w-sm p-10 text-center bg-gray-100 rounded-3xl mx-auto h-96 w-72 animate-pulse"></div>
          <div class="max-w-sm p-10 text-center bg-gray-100 rounded-3xl mx-auto h-96 w-72 animate-pulse"></div>
        </div>
      )}
      {/* posts */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 justify-items-center">
        {allPosts
          .filter((item) => item.publish === true)
          .map((item) => (
            <Card key={item._id} {...item} />
          ))}
      </div>
    </div>
  );
}
