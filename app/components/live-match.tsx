import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdOutlineStarOutline } from "react-icons/md";
const LiveMatch = ({ match }: any) => {
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
    <div className="flex items-center justify-between gap-3 p-2">
      <div>
        <MdOutlineStarOutline size={20} color="#dad775" />
      </div>
      <div className="flex items-center gap-3 w-full justify-between">
        <div className="flex items-center justify-end gap-1 w-full">
          <h3>{match.homeTeam.shortName}</h3>
          <Image
            src={match.homeTeam.crest}
            alt={match.homeTeam.shortName}
            className="w-5"
            width={100}
            height={100}
          />
        </div>
        <div>-</div>
        <div className="flex items-center justify-start gap-1 w-full">
          <Image
            src={match.awayTeam.crest}
            alt={match.awayTeam.shortName}
            className="w-5"
            width={100}
            height={100}
          />
          <h3>{match.awayTeam.shortName}</h3>
        </div>
      </div>
      <p className="italic text-sm text-gray-500">{time}</p>
    </div>
  );
};

export default LiveMatch;
