import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-white/50 p-3 shadow-md dark:bg-gray-700 text-black dark:text-white dark:shadow-lg shadow-top">
      <div className="p-1 flex justify-center items-center gap-5">
        <img src="/logo.png" alt="Logo" className="w-16" />
      </div>
      <div className="flex justify-center items-center my-2">
        <div className="lg:w-1/2 w-3/4 bg-red-400 h-[1px]"></div>
      </div>
      <p className="text-center mt-5 ">Pellucid Football © 2024</p>
    </div>
  );
};

export default Footer;
