import React, { useContext } from "react";
import Context from "../routing/context";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const { user, logout }: any = useContext(Context);
  return (
    <div className={user != null ? "shadow-lg" : ""}>
      <div
        className={
          (user == null ? "shadow-lg border border-black/5" : "") +
          "p-3 flex justify-center items-center gap-5 bg-white/50"
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
      {user != null ? (
        <div
          className={
            "flex items-center justify-between border border-black/5 bg-white/50 p-2"
          }
        >
          <p>{user.email}</p>
          <button
            className="bg-sky-400 text-white rounded-md px-4 py-1 text-sm shadow-md border border-sky-300"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
