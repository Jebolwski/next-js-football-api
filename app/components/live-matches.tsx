import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import FootballContext from "../routing/football_context";

const Live_matches = () => {
  const { leagues, getLeagues }: any = useContext(FootballContext);

  useEffect(() => {
    const fetchData = async () => {
      await getLeagues().then(() => {
        console.log(leagues);
      });
    };
    fetchData();
  }, []);

  return (
    <>
      {leagues && leagues.matches && leagues.matches.length > 0 ? (
        leagues?.matches?.map((league): any => {
          return (
            <div
              key={league.id}
              className="my-4 shadow-md border border-gray-300"
            >
              <img
                src={league.competition.emblem}
                alt={league.competition.name}
                className="w-8"
              />
              <p>{league.competition.name}</p>
            </div>
          );
        })
      ) : (
        <div>Yükleniyor...</div>
      )}
    </>
  );
};

export default Live_matches;
