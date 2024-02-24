import React from "react";
import Image from "next/image";
import Link from "next/link";
const StandingsTable = ({ data }: any) => {
  return (
    <div className="my-3 dark:bg-gray-800/75 bg-gray-100 rounded-md border shadow-md dark:border-gray-600 border-gray-200 p-1">
      <p className="mb-2 font-bold text-blue-400">{data.group}</p>
      <table className="w-full text-xs sm:text-sm md:text-base">
        <thead>
          <tr>
            <td className="pl-2">Takım</td>
            <td></td>
            <td className="text-center">M</td>
            <td className="text-center">W</td>
            <td className="text-center">D</td>
            <td className="text-center">L</td>
            <td className="text-center">S</td>
            <td className="text-center">C</td>
            <td className="text-center">A</td>
            <td className="text-center">P</td>
          </tr>
        </thead>
        <tbody>
          {data.table.map((team, index): any => {
            return (
              <tr
                key={team.position}
                className={
                  index == data.table.length - 1
                    ? ""
                    : "border-b border-gray-300"
                }
              >
                <td className="text-center max-w-32">
                  <div className="flex items-center gap-2">
                    <p className="w-6 text-center">{team.position}</p>
                    <Link href={"/team/" + team.team.id}>
                      <Image
                        src={team.team.crest}
                        className="w-5 hidden sm:block"
                        width={100}
                        height={100}
                        alt={team.team.name}
                      />
                    </Link>
                    <Link href={"/team/" + team.team.id}>
                      <p>{team.team.shortName}</p>
                    </Link>
                  </div>
                </td>
                <td></td>
                <td className="text-center w-4 sm:w-6 md:w-9">
                  {team.playedGames}
                </td>
                <td className="text-center w-4 sm:w-6 md:w-9">{team.won}</td>
                <td className="text-center w-4 sm:w-6 md:w-9">{team.draw}</td>
                <td className="text-center w-4 sm:w-6 md:w-9">{team.lost}</td>
                <td className="text-center w-4 sm:w-6 md:w-9">
                  {team.goalsFor}
                </td>
                <td className="text-center w-4 sm:w-6 md:w-9">
                  {team.goalsAgainst}
                </td>
                <td className="text-center w-4 sm:w-6 md:w-9">
                  {team.goalDifference}
                </td>
                <td className="text-center w-4 sm:w-6 md:w-9">{team.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;
