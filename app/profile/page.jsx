"use client";
import Context from "@/app/routing/context";
import Image from "next/image";
import React, { useContext } from "react";

const Page = () => {
  const { user } = useContext(Context);
  console.log(user);
  return (
    <div className="dark:bg-gray-800 bg-gray-50 dark:text-white text-black p-4 flex justify-center">
      {user ? (
        <div className="dark:bg-gray-700 p-2 bg-gray-100 rounded-md border border-gray-300 dark:border-gray-600 shadow-lg lg:w-3/4 w-full">
          <div className="flex gap-2">
            <Image
              src={user?.picture}
              width={100}
              height={100}
              className="w-16 rounded-md border border-gray-400 dark:border-gray-500"
            />
            <div>
              <p className="text-2xl">{user?.name}</p>
              <p className="text-sm">{user?.email}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-xl">Loading...</p>
      )}
    </div>
  );
};

export default Page;
