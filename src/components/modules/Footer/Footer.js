import React from "react";

export default function Footer() {
  return (
    <div className="p-6 mt-12 border-t border-gray-300">
      <div className="text-center sm:flex sm:justify-between sm:text-left">
        <p className="text-sm leading-6 text-gray-900">
          <span className="block sm:inline">تمامی حقوق محفوظ است.</span>
        </p>

        <p className="text-sm leading-6 text-gray-900">&copy; 2024 SAYA Next App</p>
      </div>
    </div>
  );
}
