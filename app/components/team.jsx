"use client";
import React, { useContext, useEffect } from "react";
import FootballContext from "@/app/routing/football_context";
import Image from "next/image";
import Link from "next/link";
import { FaShieldAlt } from "react-icons/fa";
import { IoIosFootball } from "react-icons/io";
import { TbPlayFootball } from "react-icons/tb";
import LiveMatch from "./live-match";
import { FaMoneyCheckAlt } from "react-icons/fa";

const Team = (params) => {
  const {
    getTeam,
    team,
    getPerson,
    getTeamsMatches,
    matches,
    showOdds,
    toggleShowOdds,
  } = useContext(FootballContext);
  useEffect(() => {
    getTeam(params.params.id);
    getTeamsMatches(params.params.id);
  }, []);

  return (
    <div>
      <div className="flex justify-center dark:bg-gray-800 dark:text-white text-black bg-white/50">
        {team && team.area ? (
          <>
            <div className="shadow-md border dark:border-gray-700  border-gray-200 my-4 p-3 lg:w-3/4 w-11/12 dark:bg-gray-700 bg-white/50 rounded-md">
              <div>
                <div className="flex justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-lg font-semibold">{team.name}</p>
                    <Image
                      src={team.crest}
                      className="w-28 mt-2"
                      width={100}
                      height={100}
                      alt={team.name}
                    />
                  </div>
                  <div>
                    <div className="coach dark:border-gray-600 dark:bg-gray-800 bg-gray-200 border border-gray-200 shadow-md rounded-md p-2">
                      <p className="font-semibold">{team.coach.name}</p>
                      <p className="text-sm italic">
                        {team.coach.contract.start} -{" "}
                        {team.coach.contract.until}
                      </p>
                      <p className="text-xs">{team.coach.nationality}</p>
                    </div>
                    <div className="flex justify-end items-center gap-1 mt-2">
                      <Image
                        src={team.area.flag}
                        className="w-7 border border-gray-200 shadow-md rounded-sm"
                        width={20}
                        height={20}
                        alt={team.area.name}
                      />
                      <p className="font-semibold text-end">{team.venue}</p>
                    </div>
                    <div className="dark:border-gray-600 dark:bg-gray-800 bg-gray-200 border border-gray-200 shadow-md rounded-md p-2 mt-2">
                      <p className="italic text-sm">Running competitions</p>
                      <div className="flex items-center gap-2 justify-evenly mt-2">
                        {team.runningCompetitions.map((competition) => {
                          return (
                            <Link
                              href={"/standings/" + competition.id}
                              key={competition.id}
                            >
                              {competition.emblem ? (
                                <Image
                                  src={competition.emblem}
                                  className="w-7"
                                  height={100}
                                  width={100}
                                  alt={competition.code}
                                  title={competition.name}
                                />
                              ) : null}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="font-semibold mb-2">Squad</h2>
                  <div className="flex items-center flex-wrap gap-2">
                    {team.squad.map((player) => {
                      return (
                        <Link
                          href={"/person/" + player.id}
                          key={player.id}
                          className="bg-gray-200 dark:bg-gray-800 shadow-md border dark:border-gray-700 border-gray-200 p-2 rounded-md"
                        >
                          <p className="text-sm font-semibold">{player.name}</p>
                          <div className="text-xs italic flex items-center gap-1">
                            <p>{player.position}</p>
                            {player.position == "Defence" ? (
                              <FaShieldAlt size={13} />
                            ) : player.position == "Midfield" ? (
                              <TbPlayFootball size={17} />
                            ) : (
                              <IoIosFootball size={15} />
                            )}
                          </div>
                          <p className="text-xs">{player.nationality}</p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="mt-5 w-full shadow-md border dark:border-gray-700  border-gray-300 my-4 p-3 dark:bg-gray-800 bg-white/50 rounded-md">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">Matches</h3>
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
                        <LiveMatch match={match} key={index} team={team} />
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-lg font-semibold text-black dark:text-white p-3">
            Loading...
          </p>
        )}
      </div>
    </div>
  );
};

export default Team;
