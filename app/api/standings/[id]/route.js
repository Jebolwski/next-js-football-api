import { NextResponse } from "next/server";
import { apiKey } from "@/app/firebase";

export async function GET(req, context) {
  let id = context.params.id;
  const myHeaders = new Headers();
  myHeaders.append("X-Auth-Token", apiKey);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
    credentials: "same-origin",
  };
  let response = await fetch(
    `https://api.football-data.org/v4/competitions/${id}/standings`,
    requestOptions
  );
  if (response.status == 200) {
    let data = await response.json();
    return NextResponse.json(data);
  } else {
    return NextResponse.json(response.status);
  }
}
