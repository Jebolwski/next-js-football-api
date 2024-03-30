import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      <main class="h-[70vh] w-full flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-800">
        <h1 class="lg:text-9xl text-7xl font-extrabold dark:text-white tracking-widest text-gray-600">
          404
        </h1>
        <div class="bg-gray-300 dark:bg-gray-600 px-2 text-sm rounded rotate-12 dark:text-white absolute">
          Page Not Found
        </div>
        <button class="mt-5">
          <a class="relative inline-block text-sm font-medium text-gray-600 dark:text-gray-200 group active:text-gray-500 focus:outline-none focus:ring">
            <span class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-gray-300 dark:bg-gray-600 group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span class="relative block px-8 py-3  bg-gray-100 dark:bg-gray-700 border border-current">
              <Link href="/">Go Home</Link>
            </span>
          </a>
        </button>
      </main>
    </div>
  );
};

export default Page;
