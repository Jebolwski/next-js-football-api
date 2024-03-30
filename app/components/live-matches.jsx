"use client";
import React, { useContext, useLayoutEffect } from "react";
import FootballContext from "../routing/football_context";
import Image from "next/image";
import LiveMatch from "./live-match";
import { FaMoneyCheckAlt } from "react-icons/fa";
import Link from "next/link";
const Live_matches = () => {
  const { leagues, getLeagues, toggleShowOdds, showOdds, setShowOdds } =
    useContext(FootballContext);

  useLayoutEffect(() => {
    getLeagues();
    setShowOdds(true);
  }, []);

  return (
    <div className="w-full p-2 md:p-4 md:w-11/12">
      {leagues && leagues.length > 0 ? (
        leagues.map((league) => {
          if (league.matches.length > 0) {
            return (
              <div
                key={league.competition.id}
                className="dark:text-white text-black shadow-lg hover:shadow-xl duration-200"
              >
                <div className="mt-4 shadow-md rounded-t-md border dark:bg-gray-500 bg-gray-200 border-gray-300 dark:border-gray-900 flex items-center gap-2 p-1">
                  <Link
                    href={`/standings/${league.competition.id}`}
                    className="rounded-t-md flex items-center gap-2"
                  >
                    <Image
                      src={league.competition?.emblem}
                      alt={league.competition?.name}
                      className="w-6"
                      width={100}
                      height={100}
                    />
                    <p>{league.competition?.name}</p>
                  </Link>
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
                <div className="shadow-md rounded-b-md border dark:bg-gray-700 bg-gray-100 border-gray-300 dark:border-gray-900">
                  {league?.matches?.length > 0 ? (
                    league?.matches?.map((match, index) => {
                      return (
                        <div className="m-1">
                          <LiveMatch match={match} key={index} />
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-2 text-center">
                      There is no {league.competition?.name} games today.
                    </div>
                  )}
                </div>
              </div>
            );
          }
        })
      ) : leagues && leagues.length == 0 ? (
        <div className="text-center font-semibold text-lg text-black dark:text-white">
          There are no matches today.
        </div>
      ) : (
        <div className="text-center font-semibold text-lg text-black dark:text-white">
          Loading...
        </div>
      )}
    </div>
  );
};

export default Live_matches;
