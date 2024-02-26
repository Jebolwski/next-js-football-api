"use client";
import React, { useState, useContext } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { auth } from "@/app/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Context from "../routing/context";

const Page = () => {
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { handleSignUp } = useContext(Context);
  const SignUp = async () => {
    handleSignUp(email, password);
    setEmail("");
    setEmail("");
  };
  return (
    <div className="text-black flex justify-center p-5 dark:bg-gray-800 bg-gray-50 dark:text-white text-black">
      <div className="p-4 shadow-lg xl:w-1/2 lg:2/3 w-5/6 rounded-md border border-black/5 dark:bg-gray-600 bg-white/50">
        <h3 className="text-2xl font-bold">Register</h3>
        <p className="text-sky-500 mt-3">Get into pellucid football</p>
        <div>
          <div className="flex gap-1 items-center mt-4">
            <FaUser />
            <p>Username</p>
          </div>
          <input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="p-2 outline-none border shadow-md dark:bg-gray-700 bg-gray-100 dark:border-gray-500 border-stone-300 rounded-md my-1 flex-1 w-full"
          />
        </div>
        <div>
          <div className="flex gap-1 items-center mt-4">
            <FaLock />
            <p>Password</p>
          </div>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="p-2 outline-none border shadow-md dark:bg-gray-700 bg-gray-100 dark:border-gray-500 border-stone-300 rounded-md my-1 flex-1 w-full"
          />
        </div>
        <div className="flex justify-between items-center mt-3">
          <button
            onClick={SignUp}
            className="bg-red-500 text-white px-4 py-1 text-lg shadow-lg border border-red-400 rounded-md"
          >
            Login
          </button>
          <div>
            Already have an account?{" "}
            <Link
              href={"/login"}
              className="text-blue-600 dark:text-blue-400  underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
