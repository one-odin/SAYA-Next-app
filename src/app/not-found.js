import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-gray-100 h-screen">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center py-20">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-sky-400">404</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">اتفاقی افتاده</p>
          <p className="mb-4 text-lg font-light text-gray-500">متاسفیم، این صفحه یافت نشد !</p>
          <Link href="/" className="inline-flex font-medium items-center text-pink-500 hover:underline hover:transform hover:-translate-x-2 transition duration-300">
            ادامه
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
