"use client";
import React, { useEffect, useContext, useState } from "react";
import FootballContext from "@/app/routing/football_context";
import StandingsTable from "@/app/components/standingsTable";
const Standings = (params) => {
  const { standings, getStandings, getPerson, getTeam } =
    useContext(FootballContext);
  const [year, setYear] = useState(2023);
  const [which, setWhich] = useState("All");
  useEffect(() => {
    getStandings(params.params.id, year);
  }, [year]);

  return (
    <div className="flex justify-center dark:bg-gray-600 bg-gray-100 dark:text-white lg:p-0 p-1 text-black">
      <div className="shadow-md border dark:border-gray-600 border-gray-200 my-4 p-2 lg:w-3/4 w-full dark:bg-gray-700 bg-white/50 rounded-md">
        <div className="flex items-center flex-wrap gap-2">
          <p>Season</p>
          <select
            className="bg-gray-300/50 rounded-md"
            onChange={(e) => {
              setYear(e.target.value);
            }}
          >
            <option value="2023" selected>
              2023-24
            </option>
            <option value="2022">2022-23</option>
            <option value="2021">2021-22</option>
            <option value="2020">2020-21</option>
          </select>
          <div className="flex items-center flex-wrap gap-4 md:text-base">
            <div
              className="bg-gray-300 cursor-pointer dark:bg-gray-800 w-14 text-center rounded-md shadow-md border border-gray-400 dark:border-gray-600"
              onClick={() => {
                setWhich("All");
              }}
            >
              All
            </div>
            <div
              className="bg-gray-300 cursor-pointer dark:bg-gray-800 w-14 text-center rounded-md shadow-md border border-gray-400 dark:border-gray-600"
              onClick={() => {
                setWhich("Home");
              }}
            >
              Home
            </div>
            <div
              className="bg-gray-300 cursor-pointer dark:bg-gray-800 w-14 text-center rounded-md shadow-md border border-gray-400 dark:border-gray-600"
              onClick={() => {
                setWhich("Away");
              }}
            >
              Away
            </div>
          </div>
        </div>
        {standings == null ? (
          <p className="text-center text-lg font-semibold text-black dark:text-white mt-5">
            Loading...
          </p>
        ) : which == "All" ? (
          <StandingsTable data={standings?.standings[0]} />
        ) : which == "Home" ? (
          <StandingsTable data={standings?.standings[1]} />
        ) : (
          <StandingsTable data={standings?.standings[2]} />
        )}
      </div>
    </div>
  );
};

export default Standings;
