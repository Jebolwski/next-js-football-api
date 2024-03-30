import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { MdOutlineStarOutline } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { FaRegCalendarTimes } from "react-icons/fa";
import Link from "next/link";
import FootballContext from "../routing/football_context";

const LiveMatch = ({ match, team }) => {
  const [time, setTime] = useState("");
  const { showOdds, setMatchF } = useContext(FootballContext);

  useEffect(() => {
    let number = Date.parse(match.utcDate);
    var date = new Date(number);
    if (date.getMinutes().toString() == "0") {
      setTime(date.getHours().toString() + ":" + "00");
    } else {
      setTime(date.getHours().toString() + ":" + date.getMinutes().toString());
    }
  }, []);
  console.log(match.odds);
  return (
    <>
      <div
        className={
          "flex items-center justify-between gap-3 dark:bg-gray-600 bg-gray-300 border dark:border-gray-500 border-gray-400 shadow-md p-2 duration-200 text-sm md:text-base " +
          (showOdds ? "rounded-t-md" : "rounded-md")
        }
      >
        <div className="items-center gap-1 hidden md:flex">
          <MdOutlineStarOutline size={20} color="#00b609" />
          {match.status == "POSTPONED" ? (
            <FaRegCalendarTimes title="Postponed" size={16} />
          ) : (
            <FaRegCalendarTimes title="Postponed" className="invisible" />
          )}
        </div>
        <div className="flex items-center gap-2 w-full justify-between">
          <div className="flex items-center justify-end gap-1 w-full">
            <Link href={"/team/" + match.homeTeam.id}>
              {team &&
              match?.score?.fullTime &&
              team.id == match.homeTeam.id &&
              match?.score?.fullTime.home > match?.score?.fullTime.away ? (
                <h3 className="text-green-500">{match.homeTeam.shortName}</h3>
              ) : team &&
                match?.score?.fullTime &&
                team.id == match.homeTeam.id &&
                match?.score?.fullTime.home < match?.score?.fullTime.away ? (
                <h3 className="text-red-500">{match.homeTeam.shortName}</h3>
              ) : (
                <h3>{match.homeTeam.shortName}</h3>
              )}
            </Link>
            <Link href={"/team/" + match.homeTeam.id}>
              <Image
                src={match.homeTeam.crest}
                alt={match.homeTeam.shortName}
                className="w-4 md:w-5"
                width={100}
                height={100}
              />
            </Link>
          </div>
          <Link
            href={{
              pathname: "/match/" + match.id,
            }}
          >
            <div className="flex items-center gap-2">
              <p>{match?.score?.fullTime?.home}</p>
              <p>-</p>
              <p>{match?.score?.fullTime?.away}</p>
            </div>
          </Link>
          <div className="flex items-center justify-start gap-1 w-full">
            <Link href={"/team/" + match.awayTeam.id}>
              {team &&
              match?.score?.fullTime &&
              team.id == match.awayTeam.id &&
              match?.score?.fullTime.home > match?.score?.fullTime.away ? (
                <h3 className="text-red-500">{match.awayTeam.shortName}</h3>
              ) : team &&
                match?.score?.fullTime &&
                team.id == match.awayTeam.id &&
                match?.score?.fullTime.home < match?.score?.fullTime.away ? (
                <h3 className="text-green-500">{match.awayTeam.shortName}</h3>
              ) : (
                <h3>{match.awayTeam.shortName}</h3>
              )}
            </Link>
            <Link href={"/team/" + match.awayTeam.id}>
              <Image
                src={match.awayTeam.crest}
                alt={match.awayTeam.shortName}
                className="w-4 md:w-5"
                width={100}
                height={100}
              />
            </Link>
          </div>
        </div>
        <div className="items-center gap-1 w-20 justify-end hidden md:flex">
          <p className="italic text-sm text-gray-500">{time}</p>
          <IoTimeOutline />
        </div>
      </div>
      <div
        className={
          "flex items-center justify-center  gap-2 dark:bg-gray-600 bg-gray-300  border-l border-r border-b rounded-b-md dark:border-gray-500 border-gray-400 p-1 " +
          (showOdds && match?.odds?.homeWin ? "" : "")
        }
      >
        <div>
          <p className="text-center italic">1</p>
          <p className="text-center font-semibold dark:bg-gray-600 rounded-md border bg-gray-300 px-2 dark:border-gray-800 border-gray-200">
            {match.odds.homeWin}
          </p>
        </div>
        <div>
          <p className="text-center italic">X</p>
          <p className="text-center font-semibold dark:bg-gray-600 rounded-md border bg-gray-300 px-2 dark:border-gray-800 border-gray-200">
            {match.odds.draw}
          </p>
        </div>
        <div>
          <p className="text-center italic">2</p>
          <p className="text-center font-semibold dark:bg-gray-600 rounded-md border bg-gray-300 px-2 dark:border-gray-800 border-gray-200">
            {match.odds.awayWin}
          </p>
        </div>
      </div>
    </>
  );
};

export default LiveMatch;
