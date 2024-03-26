"use client";
import React, { useEffect, useLayoutEffect, useState, useContext } from "react";
import FootballContext from "@/app/routing/football_context";
import Context from "@/app/routing/context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { query, where, getDocs } from "firebase/firestore";
import { and, collection, onSnapshot } from "firebase/firestore";

const Page = (params) => {
  const [time, setTime] = useState("");
  const [one, setOne] = useState(0);
  const [future, setFuture] = useState(true);
  const [two, setTwo] = useState(0);
  const [zero, setZero] = useState(0);
  const [show, setShow] = useState(false);
  const [match, setMatch] = useState();
  const [picks, setPicks] = useState();
  const { pick, db } = useContext(FootballContext);
  const { user } = useContext(Context);

  const router = useRouter();

  const pickMatch = (match_id, user_id, side) => {
    pick(match_id, user_id, side);
    console.log("pickmatch");
    setShow(true);
  };

  const getMatchFunction = async () => {
    await fetch(`/api/get-match/${params.params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        await response.json().then((data) => {
          if (data == null) {
            router.back();
          }
          setMatch(data);
          getPicks(data.id);

          let number = Date.parse(data.utcDate);
          var date = new Date(number);
          if (date < new Date()) {
            console.log("yes");
            setFuture(false);
          }
          if (date.getMinutes().toString() == "0") {
            setTime(date.getHours().toString() + ":" + "00");
          } else {
            setTime(
              date.getHours().toString() + ":" + date.getMinutes().toString()
            );
          }
          setWidth();
        });
      })
      .catch((error) => console.error(error));
  };

  const setPicksByPick = () => {
    if (picks) {
      let pick_two = picks.filter((pick) => {
        return pick.pick == 2;
      });
      let pick_one = picks.filter((pick) => {
        return pick.pick == 1;
      });
      let pick_zero = picks.filter((pick) => {
        return pick.pick == 0;
      });
      setOne(pick_one.length);
      setTwo(pick_two.length);
      setZero(pick_zero.length);
    }
  };

  const checkIfVoted = () => {
    if (picks) {
      let arr = picks.filter((pick) => {
        return pick["user-id"] == user.user_id;
      });
      if (arr.length > 0) {
        console.log("voted");
        setShow(true);
      }
    }
  };

  const setWidth = () => {
    let one_div = document.querySelector(".one_w");
    let draw_div = document.querySelector(".draw_w");
    let two_div = document.querySelector(".two_w");
    if (one_div && two_div && draw_div) {
      one_div.style.width = ((one / (one + two + zero)) * 100).toFixed(2) + "%";
      two_div.style.width = ((two / (one + two + zero)) * 100).toFixed(2) + "%";
      draw_div.style.width =
        ((zero / (one + two + zero)) * 100).toFixed(2) + "%";
    }
  };

  const getPicks = (match_id) => {
    const q0 = query(
      collection(db, "pick"),
      where("match-id", "==", match_id || 0)
    );
    const unsubscribe = onSnapshot(q0, (snapshot) => {
      setPicks(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  useEffect(() => {
    setPicksByPick();
    checkIfVoted();
  }, [picks]);

  useEffect(() => {
    if (future == false) {
      setShow(true);
    }
  }, [future]);

  useEffect(() => {
    getMatchFunction();
  }, []);

  useEffect(() => {
    if (show == true) {
      setWidth();
    }
  }, [one, zero, two, show]);

  return (
    <div className="dark:bg-gray-800 bg-gray-50 dark:text-white text-black lg:p-4 py-4 px-2 flex justify-center">
      <div className="dark:bg-gray-700 bg-gray-100 rounded-md border border-gray-300 dark:border-gray-600 px-2 pb-3 shadow-lg lg:w-3/4 w-full">
        {match != null && match.score != null ? (
          <>
            <div className="flex justify-center">
              <Link
                href={"/standings/" + match?.competition?.id}
                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 h-min border-b border-l border-r border-gray-300 dark:border-gray-600 p-1 rounded-b-lg shadow-md"
              >
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
              </Link>
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
            <div className="flex justify-center gap-2 rounded-md sm:gap-6 md:gap-10 flex-wrap">
              <div className="dark:bg-gray-800 bg-gray-200 rounded-md border mt-4 border-gray-300 dark:border-gray-600 shadow-lg">
                <h2 className="font-semibold text-lg px-2 border rounded-t-md border-gray-300 dark:border-gray-600">
                  Your Pick
                </h2>
                <div
                  className={`flex lg:w-96 w-80 h-max ${
                    show ? "" : "gap-1"
                  } dark:bg-gray-800 bg-gray-200 rounded-b-md border-t dark:border-gray-600 border-gray-300 p-1
                  `}
                >
                  {picks ? (
                    <>
                      {future == false && picks.length == 0 ? (
                        <div className="text-center font-semibold w-full mt-2 text-lg">
                          Nobody picked this match.
                        </div>
                      ) : (
                        <>
                          <div className="w-[33%] one_w duration-200">
                            <div>
                              <div
                                className={`bg-red-500 h-6 duration-300 px-2 ${
                                  show
                                    ? ""
                                    : "rounded-sm cursor-pointer hover:bg-red-700 "
                                } text-center`}
                                onClick={() => {
                                  if (show == false) {
                                    pickMatch(match.id, user.user_id, 1);
                                  }
                                }}
                              >
                                {show &&
                                ((one / (one + two + zero)) * 100).toFixed(1) >
                                  8 ? (
                                  <p className="text-xs pt-[3px]">
                                    {((one / (one + two + zero)) * 100).toFixed(
                                      1
                                    )}
                                    %
                                  </p>
                                ) : (
                                  <p className={`${show ? "hidden" : ""}`}>1</p>
                                )}
                              </div>
                              {show == false ? (
                                <p className="text-sm text-center">
                                  {match.homeTeam.shortName} wins
                                </p>
                              ) : ((one / (one + two + zero)) * 100).toFixed(
                                  1
                                ) > 8 ? (
                                <p className="text-sm italic font-semibold">
                                  {one}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <div className="w-[33%] draw_w duration-200">
                            <div>
                              <div
                                className={`bg-gray-500 h-6 duration-300 ${
                                  show
                                    ? ""
                                    : "rounded-sm px-2 cursor-pointer hover:bg-gray-700 "
                                } text-center`}
                                onClick={() => {
                                  if (show == false)
                                    pickMatch(match.id, user.user_id, 0);
                                }}
                              >
                                {show &&
                                ((zero / (one + two + zero)) * 100).toFixed(1) >
                                  8 ? (
                                  <p className="text-xs pt-[3px]">
                                    {(
                                      (zero / (one + two + zero)) *
                                      100
                                    ).toFixed(1)}
                                    %
                                  </p>
                                ) : (
                                  <p className={`${show ? "hidden" : ""}`}>X</p>
                                )}
                              </div>
                              {show == false ? (
                                <p className="text-sm text-center">Draw</p>
                              ) : ((zero / (one + two + zero)) * 100).toFixed(
                                  1
                                ) > 8 ? (
                                <p className="text-sm italic font-semibold">
                                  {zero}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <div className="w-[33%] two_w duration-200">
                            <div>
                              <div
                                className={`bg-blue-500 h-6 duration-300 ${
                                  show
                                    ? ""
                                    : "rounded-sm px-2 cursor-pointer hover:bg-blue-700"
                                } text-center`}
                                onClick={() => {
                                  if (show == false) {
                                    pickMatch(match.id, user.user_id, 2);
                                  }
                                }}
                              >
                                {show &&
                                ((two / (one + two + zero)) * 100).toFixed(1) >
                                  8 ? (
                                  <p className="text-xs pt-[3px]">
                                    {((two / (one + two + zero)) * 100).toFixed(
                                      1
                                    )}
                                    %
                                  </p>
                                ) : (
                                  <p className={`${show ? "hidden" : ""}`}>2</p>
                                )}
                              </div>
                              {show == false ? (
                                <p className="text-sm text-center">
                                  {match.awayTeam.shortName} wins
                                </p>
                              ) : ((two / (one + two + zero)) * 100).toFixed(
                                  1
                                ) > 8 ? (
                                <p className="text-sm italic font-semibold">
                                  {two}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <p className="text-lg font-semibold text-center w-full">
                      Loading...
                    </p>
                  )}
                </div>
              </div>
              <div className="dark:bg-gray-800 bg-gray-200 rounded-md w-fit mt-4 border border-gray-300 dark:border-gray-600 shadow-lg">
                <h2 className="font-semibold text-lg px-2">Odds</h2>
                {match.odds.homeWin ? (
                  <div
                    className={
                      "flex items-center justify-center gap-2 dark:bg-gray-800 bg-gray-200 rounded-b-md border-t dark:border-gray-600 border-gray-300 p-1"
                    }
                  >
                    <div>
                      <p
                        className={`text-center italic ${
                          match?.score.fullTime?.home >
                          match?.score.fullTime?.away
                            ? "text-green-500"
                            : ""
                        }`}
                      >
                        1
                      </p>
                      <p
                        className={`text-center font-semibold dark:bg-gray-600 rounded-md border bg-gray-300 px-2 dark:border-gray-800 border-gray-200 ${
                          match?.score.fullTime?.home >
                          match?.score.fullTime?.away
                            ? "border-green-500 text-green-500"
                            : ""
                        }`}
                      >
                        {match.odds.homeWin}
                      </p>
                    </div>
                    <div>
                      <p
                        className={`text-center italic ${
                          match?.score.fullTime?.home ==
                          match?.score.fullTime?.away
                            ? "text-green-500"
                            : ""
                        }`}
                      >
                        X
                      </p>
                      <p
                        className={`text-center font-semibold dark:bg-gray-600 rounded-md border bg-gray-300 px-2 dark:border-gray-800 border-gray-200 ${
                          match?.score.fullTime?.home ==
                          match?.score.fullTime?.away
                            ? "border-green-500 text-green-500"
                            : ""
                        }`}
                      >
                        {match.odds.draw}
                      </p>
                    </div>
                    <div>
                      <p
                        className={`text-center italic ${
                          match?.score.fullTime?.away >
                          match?.score.fullTime?.home
                            ? "text-green-500"
                            : ""
                        }`}
                      >
                        2
                      </p>
                      <p
                        className={`text-center font-semibold dark:bg-gray-600 rounded-md border bg-gray-300 px-2 dark:border-gray-800 border-gray-200 ${
                          match?.score.fullTime?.away >
                          match?.score.fullTime?.home
                            ? "border-green-500 text-green-500"
                            : ""
                        }`}
                      >
                        {match.odds.awayWin || "-"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="border-t dark:border-gray-600 border-gray-300 p-2">
                    <p>Not determined</p>
                  </div>
                )}
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
