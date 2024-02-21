import React from "react";
import Image from "next/image";
const StandingsTable = ({ data }: any) => {
  console.log(data);

  return (
    <div className="my-2">
      <p className="mb-2 font-bold">{data.group}</p>
      <table className="w-full">
        <thead>
          <tr>
            <td className="text-center">Takım</td>
            <td></td>
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
          {data.table.map((team): any => {
            return (
              <tr key={team.position}>
                <td className="text-center">{team.position}</td>
                <td>
                  <Image
                    src={team.team.crest}
                    className="w-5"
                    width={100}
                    height={100}
                    alt={team.team.name}
                  />
                </td>
                <td className="text-center">{team.team.shortName}</td>
                <td className="text-center">{team.playedGames}</td>
                <td className="text-center">{team.won}</td>
                <td className="text-center">{team.draw}</td>
                <td className="text-center">{team.lost}</td>
                <td className="text-center">{team.goalsFor}</td>
                <td className="text-center">{team.goalsAgainst}</td>
                <td className="text-center">{team.goalDifference}</td>
                <td className="text-center">{team.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;
