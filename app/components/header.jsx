import React, { useContext } from "react";
import Context from "../routing/context";
import Link from "next/link";
import Image from "next/image";
import { LuCloudMoon } from "react-icons/lu";
const Header = () => {
  const { user, logout, toggleDarkMode, darkMode } = useContext(Context);
  return (
    <div className={user != null ? "shadow-lg" : ""}>
      <div
        className={
          (user == null
            ? "shadow-lg border dark:bg-gray-700 dark:text-white text-black border-black/5 bg-gray-200"
            : "") +
          "p-3 flex justify-center dark:bg-gray-700 dark:text-white text-black items-center gap-5 bg-gray-200"
        }
      >
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            alt={"Logo"}
            className="w-16"
            width={100}
            height={100}
          />
        </Link>
        <Link href={"/"}>
          <p className="text-xl">Pellucid Football</p>
        </Link>
      </div>
      <div
        className={
          "flex items-center justify-between flex-wrap gap-3 border dark:bg-gray-700 bg-gray-200 border-black/5 dark:text-white shadow-lg text-black p-2"
        }
      >
        {user != null ? (
          <>
            <p>{user.email}</p>

            <button
              className="bg-sky-400 dark:bg-sky-950 text-white rounded-md px-4 py-1 text-sm shadow-md border border-sky-300 dark:border-sky-900"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <p>Welcome, stranger!</p>
            <Link href={"/login"}>
              <button className="bg-sky-400 dark:bg-sky-950 text-white rounded-md px-4 py-1 text-sm shadow-md border border-sky-300 dark:border-sky-900">
                Login
              </button>
            </Link>
          </>
        )}
      </div>
      <div
        onClick={toggleDarkMode}
        className="dark:bg-gray-500 cursor-pointer shadow-lg bg-gray-200 border rounded-full p-2 dark:border-gray-700 border-gray-300 absolute right-1 top-1"
      >
        <LuCloudMoon className=" dark:text-white text-black" />
      </div>
    </div>
  );
};

export default Header;
