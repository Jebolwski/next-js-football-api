"use client";
import React, { useEffect, useState, useContext } from "react";
import FootballContext from "@/app/routing/football_context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
const Page = () => {
  const [time, setTime] = useState("");
  const { match } = useContext(FootballContext);
  console.log(match);
  const router = useRouter();
  useEffect(() => {
    if (match == null) {
      router.back();
    } else {
      let number = Date.parse(match.utcDate);
      var date = new Date(number);
      if (date.getMinutes().toString() == "0") {
        setTime(date.getHours().toString() + ":" + "00");
      } else {
        setTime(
          date.getHours().toString() + ":" + date.getMinutes().toString()
        );
      }
    }
  }, [match]);
  return (
    <div className="dark:bg-gray-800 bg-gray-50 dark:text-white text-black p-4 flex justify-center">
      <div className="dark:bg-gray-700 bg-gray-100 rounded-md border border-gray-300 dark:border-gray-600 p-2 shadow-lg lg:w-3/4 w-full">
        {match != null ? (
          <>
            <div className="flex justify-center">
              <Image
                src={match?.area?.flag}
                alt={"League Country"}
                width={100}
                height={100}
                className="w-8"
              />
            </div>
            <div className="flex justify-evenly lg:p-3 mt-2">
              <Link
                href={"/team/" + match.awayTeam.id}
                className="flex flex-col items-center justify-center lg:w-40 w-32"
              >
                <Image
                  src={match?.homeTeam?.crest}
                  alt={"League Country"}
                  width={100}
                  height={100}
                  className="w-16"
                />
                <p className="text-center text-xl font-semibold">
                  {match?.homeTeam?.name}
                </p>
              </Link>
              <>
                {match.score.fullTime.home != null ? (
                  <div className="flex items-center">
                    <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 h-min border border-gray-300 dark:border-gray-600 p-1 rounded-md shadow-md">
                      <p className="text-2xl font-semibold">
                        {match.score?.fullTime?.home}
                      </p>
                      <p className="text-xl font-semibold">-</p>
                      <p className="text-2xl font-semibold">
                        {match.score?.fullTime?.away}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="bg-gray-200 dark:bg-gray-800 h-min border border-gray-300 dark:border-gray-600 p-1 rounded-md shadow-md">
                      <p className="text-xl font-semibold">{time}</p>
                    </div>
                  </div>
                )}
              </>
              <Link
                href={"/team/" + match.awayTeam.id}
                className="flex flex-col items-center lg:w-40 w-32"
              >
                <Image
                  src={match?.awayTeam?.crest}
                  alt={"League Country"}
                  width={100}
                  height={100}
                  className="w-16"
                />
                <p className="text-center text-xl font-semibold">
                  {match?.awayTeam?.name}
                </p>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-lg font-semibold text-center">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Page;
