import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdOutlineStarOutline } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { FaRegCalendarTimes } from "react-icons/fa";
import Link from "next/link";

const LiveMatch = ({ match }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    let number = Date.parse(match.utcDate);
    var date = new Date(number);
    if (date.getMinutes().toString() == "0") {
      setTime(date.getHours().toString() + ":" + "00");
    } else {
      setTime(date.getHours().toString() + ":" + date.getMinutes().toString());
    }
  }, []);

  return (
    <div className="flex items-center justify-between gap-3 p-2 text-sm md:text-base">
      <div className="flex items-center gap-1">
        <MdOutlineStarOutline size={20} color="#dad775" />
        {match.status == "POSTPONED" ? (
          <FaRegCalendarTimes title="Postponed" size={16} />
        ) : (
          <FaRegCalendarTimes title="Postponed" className="invisible" />
        )}
      </div>
      <div className="flex items-center gap-2 w-full justify-between">
        <div className="flex items-center justify-end gap-1 w-full">
          <Link href={"/team/" + match.homeTeam.id}>
            <h3>{match.homeTeam.shortName}</h3>
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
        <div>-</div>
        <div className="flex items-center justify-start gap-1 w-full">
          <Link href={"/team/" + match.awayTeam.id}>
            <h3>{match.awayTeam.shortName}</h3>
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
      <div className="flex items-center gap-1 w-20 justify-end">
        <p className="italic text-sm text-gray-500">{time}</p>
        <IoTimeOutline />
      </div>
    </div>
  );
};

export default LiveMatch;
