"use client";
import React, { useEffect, useState, useContext } from "react";
import FootballContext from "@/app/routing/football_context";
import Context from "@/app/routing/context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { query, where, getDocs } from "firebase/firestore";
import { and, collection } from "firebase/firestore";
import { app } from "../../firebase.js";
import { addDoc, getFirestore } from "firebase/firestore";

const Page = (params) => {
  const [time, setTime] = useState("");
  const [one, setOne] = useState(0);
  const [two, setTwo] = useState(0);
  const [zero, setZero] = useState(0);
  const [show, setShow] = useState(false);
  const [picks, setPicks] = useState({ 0: [], 1: [], 2: [] });
  const { match, getMatch, pick, getPicks, db } = useContext(FootballContext);
  const { user } = useContext(Context);

  const router = useRouter();

  const pickMatch = (match_id, user_id, side) => {
    pick(match_id, user_id, side);
    setShow(true);
  };

  useEffect(() => {
    getMatch(params.params.id).then(() => {
      if (match != null) {
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
    });
  }, []);

  useEffect(() => {
    const q0 = query(
      collection(db, "pick"),
      and(where("pick", "==", 0), where("match-id", "==", match?.id || 0))
    );
    const q1 = query(
      collection(db, "pick"),
      and(where("pick", "==", 1), where("match-id", "==", match?.id || 0))
    );
    const q2 = query(
      collection(db, "pick"),
      and(where("pick", "==", 2), where("match-id", "==", match?.id || 0))
    );

    getDocs(q0).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let dp = picks;
        dp[0].push({ id: doc.id, ...doc.data() });
        setPicks(dp);
        setZero(dp[0].length);
      });
    });

    getDocs(q1).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let dp = picks;
        dp[1].push({ id: doc.id, ...doc.data() });
        setPicks(dp);
        setOne(dp[1].length);
      });
    });

    getDocs(q2).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let dp = picks;
        dp[2].push({ id: doc.id, ...doc.data() });
        setPicks(dp);
        setTwo(dp[2].length);
      });
    });
  }, [picks]);

  // className={`w-[${(one / (one + two + zero)) * 100}%]`}

  return (
    <div className="dark:bg-gray-800 bg-gray-50 dark:text-white text-black lg:p-4 py-4 px-2 flex justify-center">
      <div className="dark:bg-gray-700 bg-gray-100 rounded-md border border-gray-300 dark:border-gray-600 px-2 pb-3 shadow-lg lg:w-3/4 w-full">
        {match != null && match.score != null ? (
          <>
            <div className="flex justify-center">
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 h-min border-b border-l border-r border-gray-300 dark:border-gray-600 p-1 rounded-b-lg shadow-md">
                <Image
                  src={match?.competition?.emblem}
                  alt={"League Country"}
                  width={100}
                  height={100}
                  className="w-9"
                />
                <p className="font-semibold text-lg">
                  {match?.competition?.name}
                </p>
              </div>
            </div>
            <div className="text-center">
              <p className="italic mt-1">Week {match.matchday}</p>
            </div>
            <div className="flex justify-evenly lg:p-3 mt-2">
              <Link
                href={"/team/" + match.awayTeam?.id}
                className="flex flex-col items-center justify-center lg:w-40 md:w-32 w-28"
              >
                <Image
                  src={match?.homeTeam?.crest}
                  alt={"League Country"}
                  width={100}
                  height={100}
                  className="w-12 md:w-16"
                />
                <p className="text-center text-xl font-semibold">
                  {match?.homeTeam?.name}
                </p>
              </Link>
              <>
                {match?.score?.fullTime?.home != null ? (
                  <div className="flex items-center justify-center">
                    <div className="bg-gray-200 dark:bg-gray-800 h-min border border-gray-300 dark:border-gray-600 p-1 rounded-md shadow-md">
                      <div className="flex items-center text-lg md:text-xl justify-center gap-2 ">
                        <p className="font-semibold">
                          {match.score?.fullTime?.home}
                        </p>
                        <p className="font-semibold">-</p>
                        <p className="font-semibold">
                          {match.score?.fullTime?.away}
                        </p>
                      </div>
                      <div className="flex text-sm md:text-base items-center justify-center gap-2">
                        <p>HT ({match.score?.halfTime?.home}</p>
                        <p>-</p>
                        <p>{match.score?.halfTime?.away})</p>
                      </div>
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
                href={"/team/" + match.awayTeam?.id}
                className="flex flex-col items-center lg:w-40 md:w-32 w-28"
              >
                <Image
                  src={match?.awayTeam?.crest}
                  alt={"League Country"}
                  width={100}
                  height={100}
                  className="w-12 md:w-16"
                />
                <p className="text-center text-xl font-semibold">
                  {match?.awayTeam?.name}
                </p>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-1 mt-3">
              <p>Refeere :</p>
              {match?.referees.map((ref, index) => {
                return (
                  <p key={index}>
                    {ref.name} ({ref.nationality})
                  </p>
                );
              })}
            </div>
            <div className="flex justify-center gap-2 sm:gap-6 md:gap-10 flex-wrap">
              <div className="dark:bg-gray-800 bg-gray-200 rounded-md border mt-4 border-gray-300 dark:border-gray-600 shadow-lg">
                <h2 className="font-semibold text-lg px-2">Your Pick</h2>
                <div
                  className={
                    "flex h-max justify-center gap-1 content-center dark:bg-gray-800 bg-gray-200 rounded-b-md border-t dark:border-gray-600 border-gray-300 p-1"
                  }
                >
                  <div
                    className={
                      show
                        ? `w-[${(one / (one + two + zero)) * 100}%]`
                        : `w-full rounded-sm`
                    }
                  >
                    <div className="w-full">
                      <div
                        className="bg-red-500 px-2 rounded-sm text-center h-max"
                        onClick={() => {
                          pickMatch(match.id, user.user_id, 1);
                        }}
                      >
                        <p>1</p>
                      </div>
                      <p className="text-sm text-center">
                        {match.homeTeam.shortName} wins
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      show
                        ? `w-[${(zero / (one + two + zero)) * 100}%]`
                        : `w-full rounded-sm`
                    }
                  >
                    <div className="w-full">
                      <div
                        className="bg-gray-500 px-2 rounded-sm text-center"
                        onClick={() => {
                          pickMatch(match.id, user.user_id, 0);
                        }}
                      >
                        <p>X</p>
                      </div>
                      <p className="text-sm text-center">Draw</p>
                    </div>
                  </div>
                  <div
                    className={
                      show
                        ? `w-[${(two / (one + two + zero)) * 100}%]`
                        : `w-full rounded-sm`
                    }
                  >
                    <div className="w-full">
                      <div
                        className="bg-blue-500 px-2 rounded-sm text-center"
                        onClick={() => {
                          pickMatch(match.id, user.user_id, 2);
                        }}
                      >
                        <p>2</p>
                      </div>
                      <p className="text-sm text-center">
                        {match.awayTeam.shortName} wins
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dark:bg-gray-800 bg-gray-200 rounded-md border w-fit mt-4 border-gray-300 dark:border-gray-600 shadow-lg">
                <h2 className="font-semibold text-lg px-2">Odds</h2>
                <div
                  className={
                    "flex items-center justify-center gap-2 dark:bg-gray-800 bg-gray-200 rounded-b-md border-t dark:border-gray-600 border-gray-300 p-1"
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
              </div>
            </div>
          </>
        ) : (
          <div className="text-lg font-semibold text-center p-3">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
