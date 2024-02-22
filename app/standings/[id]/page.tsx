"use client";
import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import FootballContext from "@/app/routing/football_context";
import { IStandings, Table } from "@/app/interfaces/Standings";
import Image from "next/image";
import StandingsTable from "@/app/components/standingsTable";
const Standings = (params: any) => {
  const { standings, getStandings, getPerson, getTeam }: any =
    useContext(FootballContext);
  useEffect(() => {
    getStandings(params.params.id);
    // getPerson(7867);
    // getTeam(64);
  }, []);

  console.log(standings);

  return (
    <div className="flex justify-center">
      <div className="shadow-md border border-gray-200 my-4 p-3 lg:w-3/4 w-11/12 bg-white/50 rounded-md">
        <div className="flex items-center gap-1">
          <p>Season</p>
          <select name="" id="" className="bg-gray-300/50 rounded-md">
            <option value="24">2023-24</option>
            <option value="23">2022-23</option>
            <option value="22">2021-22</option>
          </select>
        </div>
        {standings && standings?.standings?.length > 0
          ? standings?.standings.map((group, index): any => {
              return <StandingsTable data={group} key={index} />;
            })
          : null}
      </div>
    </div>
  );
};

export default Standings;
