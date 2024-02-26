"use client";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import FootballContext from "../routing/football_context";
import Image from "next/image";
import LiveMatch from "./live-match";
import Link from "next/link";
const Live_matches = () => {
  const { leagues, getLeagues, getStandings }: any =
    useContext(FootballContext);

  useLayoutEffect(() => {
    getLeagues();
  }, []);

  return (
    <div className="w-full p-2 md:p-4 md:w-11/12">
      {leagues && leagues.length > 0 ? (
        leagues.map((league): any => {
          if (league.matches.length > 0) {
            return (
              <div
                key={league.competition.id}
                className="dark:text-white text-black shadow-lg hover:shadow-xl duration-200"
              >
                <Link
                  href={`/standings/${league.competition.id}`}
                  className="mt-4 shadow-md rounded-t-md border dark:bg-gray-500 bg-gray-200 border-gray-300 dark:border-gray-900 flex items-center gap-2 p-1"
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
                <div className="shadow-md rounded-b-md border dark:bg-gray-700 bg-gray-100 border-gray-300 dark:border-gray-900">
                  {league?.matches?.length > 0 ? (
                    league?.matches?.map((match, index): any => {
                      return <LiveMatch match={match} key={index} />;
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
      ) : (
        <div className="text-center font-semibold text-lg text-black dark:text-white">
          Loading...
        </div>
      )}
    </div>
  );
};

export default Live_matches;
