"use client";
import React from "react";
import Link from "next/link";

function Card(props) {
  return (
    <div className="max-w-sm p-10 text-center bg-white border border-gray-200 rounded-3xl mx-auto break-words">
      <Link href={`/blog/${props._id}`}>
        <h5 className="mb-8 text-xl font-semibold tracking-tight text-gray-900">{props.title}</h5>
      </Link>
      <p className="mb-5 font-normal text-gray-500 break-words">{props.description}</p>
      <Link href={`/blog/${props._id}`} className="inline-flex font-medium items-center group text-pink-500 hover:underline">
        مشاهده
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2 group-hover:transform group-hover:-translate-x-2 transition duration-300" aria-hidden="true" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
      </Link>
    </div>
  );
}

export default Card;
