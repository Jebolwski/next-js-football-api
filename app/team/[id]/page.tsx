"use client";
import FootballContext from "@/app/routing/football_context";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import { FaShieldAlt } from "react-icons/fa";
import { IoIosFootball } from "react-icons/io";
import { TbPlayFootball } from "react-icons/tb";
const Page = (params: any) => {
  const { getTeam, team }: any = useContext(FootballContext);

  useEffect(() => {
    getTeam(params.params.id);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="shadow-md border border-gray-200 my-4 p-3 lg:w-3/4 w-11/12 bg-white/50 rounded-md">
        {team && team.area ? (
          <div>
            <div className="flex justify-between">
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
                <div className="coach bg-gray-100 border border-gray-200 shadow-md rounded-md p-2">
                  <p className="font-semibold">{team.coach.name}</p>
                  <p className="text-sm italic">
                    {team.coach.contract.start} - {team.coach.contract.until}
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
              </div>
            </div>

            <div className="mt-6">
              <h2 className="font-semibold mb-2">Squad</h2>
              <div className="flex items-center flex-wrap gap-2">
                {team.squad.map((player): any => {
                  return (
                    <div
                      key={player.id}
                      className="bg-gray-100 shadow-md border border-gray-200 p-2 rounded-md"
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
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-lg font-semibold">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Page;
