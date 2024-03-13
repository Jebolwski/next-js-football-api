"use client";
import FootballContext from "@/app/routing/football_context";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import LiveMatch from "@/app/components/live-match";
import { FaMoneyCheckAlt } from "react-icons/fa";

const Page = (params) => {
  const {
    getPerson,
    person,
    age,
    getPlayerMatches,
    matches,
    showOdds,
    toggleShowOdds,
  } = useContext(FootballContext);
  useEffect(() => {
    getPerson(params.params.id);
    getPlayerMatches(params.params.id);
  }, []);

  return (
    <div className="dark:bg-gray-800 bg-gray-50 dark:text-white text-black p-4 flex justify-center">
      <div className="dark:bg-gray-700 bg-gray-100 rounded-md border border-gray-300 dark:border-gray-600 shadow-lg lg:w-3/4 w-full">
        {person && person.currentTeam ? (
          <>
            <div className=" dark:text-white text-black flex justify-between items-start rounded-md flex-wrap p-4">
              <div className="p-3 dark:bg-gray-600 rounded-md bg-gray-200 shadow-md">
                <p className="text-xl font-semibold">
                  #{person?.shirtNumber} {person?.name}
                </p>
              </div>
              <Link
                href={"/team/" + person?.currentTeam?.id}
                className="dark:bg-gray-600 bg-gray-200 p-2 rounded-md shadow-md"
              >
                {person?.currentTeam ? (
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
                <p className="text-center mt-2">
                  {person?.currentTeam?.shortName}
                </p>
              </Link>
            </div>
            <div className="flex items-center justify-between mt-4 dark:bg-gray-600 dark:border-gray-800 border-gray-300 bg-gray-200 border-t p-2">
              <p>Position : {person?.position}</p>
              <p>
                Birthdate : {person?.dateOfBirth} ({age})
              </p>
            </div>
            <div className="p-3">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">Players Matches</h3>
                <div
                  onClick={toggleShowOdds}
                  className={
                    "dark:bg-gray-500 bg-gray-200 cursor-pointer shadow-lg border rounded-full p-1 " +
                    (showOdds == true ? "border-green-500" : "border-red-500")
                  }
                >
                  <FaMoneyCheckAlt
                    title="Show/Hide Odds"
                    className="dark:text-white text-black"
                    size={12}
                  />
                </div>
              </div>
              {matches &&
                matches.matches &&
                matches?.matches.map((match, index) => {
                  return (
                    <div className="my-2" key={index}>
                      <LiveMatch
                        match={match}
                        key={index}
                        team={person.currentTeam}
                      />
                    </div>
                  );
                })}
            </div>
          </>
        ) : (
          <p className="text-lg font-semibold text-center p-2">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Page;
