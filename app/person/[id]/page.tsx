"use client";
import FootballContext from "@/app/routing/football_context";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
const Page = (params: any) => {
  const { getPerson, person, age }: any = useContext(FootballContext);
  useEffect(() => {
    getPerson(params.params.id);
  }, []);
  console.log(person);

  return (
    <div className="dark:bg-gray-800 bg-gray-50 dark:text-white text-black p-4 flex justify-center">
      <div className="dark:bg-gray-700 bg-gray-100 rounded-md shadow-lg lg:w-3/4 w-full">
        <div className=" dark:text-white text-black flex justify-between items-start rounded-md flex-wrap p-4">
          <div className="p-3 dark:bg-gray-600 rounded-md bg-gray-200 shadow-md">
            <p className="text-xl font-semibold">
              #{person.shirtNumber} {person.name}
            </p>
          </div>
          <Link
            href={"/team/" + person?.currentTeam?.id}
            className="dark:bg-gray-600 bg-gray-200 p-2 rounded-md shadow-md"
          >
            {person.currentTeam ? (
              <div className="flex justify-center">
                <Image
                  src={person?.currentTeam?.crest}
                  alt={person?.currentTeam?.name}
                  width={100}
                  height={100}
                  className="w-16"
                />
              </div>
            ) : null}
            <p className="text-center mt-2">{person?.currentTeam?.shortName}</p>
          </Link>
        </div>
        <div className="flex items-center justify-between mt-4 dark:bg-gray-600 dark:border-gray-800 border-gray-300 bg-gray-200 border-t rounded-b-md p-2">
          <p>Position : {person.position}</p>
          <p>
            Birthdate : {person.dateOfBirth} ({age})
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
