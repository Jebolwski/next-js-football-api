"use client";
import React, { useEffect } from "react";
const Page = () => {
  useEffect(() => {
    console.log();
  }, []);
  return (
    <div className="dark:bg-gray-800 bg-gray-50 dark:text-white text-black p-4 flex justify-center">
      <div className="dark:bg-gray-700 bg-gray-100 rounded-md border border-gray-300 dark:border-gray-600 p-2 bg-gray-100 shadow-lg lg:w-3/4 w-full">
        <p>messi</p>
      </div>
    </div>
  );
};

export default Page;
