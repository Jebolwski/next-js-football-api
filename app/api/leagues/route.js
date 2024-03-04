import { apiKey } from "@/app/firebase";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const myHeaders = new Headers();
  myHeaders.append("X-Auth-Token", apiKey);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
    credentials: "same-origin",
  };
  let response = await fetch(
    "https://api.football-data.org/v4/matches",
    requestOptions
  );
  if (response.status == 200) {
    let data = await response.json();
    let res = createResult(data);
    return NextResponse.json(res);
  } else {
    return NextResponse.json("messi");
  }
}

function createResult(data) {
  let arr = {};

  data.matches.forEach((element) => {
    if (arr[element.competition.id] == null) {
      arr[element.competition.id] = [element];
    } else {
      arr[element.competition.id] = [element, ...arr[element.competition.id]];
    }
  });

  let result = [];

  for (const [key, value] of Object.entries(arr)) {
    result.push({ competition: value[0].competition, matches: value });
  }

  return result;
}
