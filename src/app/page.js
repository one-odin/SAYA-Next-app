import React from "react";
import Blogs from "@/components/templates/index/blogs/Blogs";

export default function Home() {
  return (
    <>
      {/* main content */}
      <main className="container m-auto">
        {/* Blogs section */}
        <Blogs />
      </main>
    </>
  );
}
