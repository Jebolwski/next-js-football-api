"use client";
import React, { useState, useContext, useLayoutEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import Link from "next/link";
import { auth } from "@/app/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { CheckIfNotAuthenticated } from "../routing/conditions";
import useAppContext from "../routing/context";
import Context from "../routing/context";

function Page() {
  const { handleLogin, user, checkIfNotAuthenticated, loginWithGoogle } =
    useContext(Context);
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useLayoutEffect(() => {
    if (user != null) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="text-black dark:bg-gray-800 flex justify-center p-5">
      <div className="p-4 shadow-lg xl:w-1/2 lg:2/3 w-5/6 rounded-md border dark:text-white text-black border-black/5 dark:bg-gray-600 bg-white/50">
        <h3 className="text-2xl font-bold">Login</h3>
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
            className="p-2 outline-none dark:bg-gray-700 bg-gray-100 border shadow-md  dark:border-gray-500 border-stone-300 rounded-md my-1 flex-1 w-full"
          />
        </div>
        <div className="flex justify-between items-center mt-3">
          <button
            onClick={() => {
              handleLogin(email, password);
            }}
            className="bg-red-500 text-white px-4 py-1 text-lg shadow-lg border border-red-400 rounded-md"
          >
            Login
          </button>
          <div>
            Dont have an account?{" "}
            <Link
              href={"/register"}
              className="text-blue-600 dark:text-blue-400 underline"
            >
              Register
            </Link>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="bg-gray-300 h-[2px] w-full"></div>
          <p className="font-semibold">or</p>
          <div className="bg-gray-300 h-[2px] w-full"></div>
        </div>
        <button
          onClick={loginWithGoogle}
          className="flex items-center justify-center gap-1 bg-gradient-to-br from-sky-500 to-sky-300 border
           border-sky-400 text-white rounded-md p-1 shadow-lg font-semibold mt-3"
        >
          <img src="/google_logo.png" className="w-8" />
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default Page;
