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
  console.log(leagues);

  return (
    <div className="w-full p-4 md:w-11/12">
      {leagues && leagues.length > 0 ? (
        leagues.map((league): any => {
          if (league.matches.length > 0) {
            return (
              <div key={league.competition.id}>
                <Link
                  href={`/standings/${league.competition.id}`}
                  className="mt-4 shadow-md rounded-t-md border border-gray-300 flex items-center gap-2 p-1"
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
                <div className="shadow-md rounded-b-md border border-gray-300">
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
        <div>Yükleniyor...</div>
      )}
    </div>
  );
};

export default Live_matches;
