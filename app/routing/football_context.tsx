import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";
import { useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { User } from "../interfaces/User";
import { toast } from "sonner";
import data from "../data/example_matches_data.json";
import { apiKey } from "@/app/firebase";

const FootballContext = createContext({});

export default FootballContext;

export const FootballProvider = ({ children }: any) => {
  const [leagues, setLeagues] = useState<any>({});

  const getLeagues = () => {
    const myHeaders = new Headers();
    myHeaders.append("X-Auth-Token", apiKey);
    const raw = "";
    const requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch("https://api.football-data.org/v4/matches", requestOptions)
      .then(async (response) => {
        let data = await response.json();
        let res = createResult(data);
        console.log(res);
        setLeagues(res);
      })
      .catch((error) => console.error(error));
  };

  function createResult(data: any) {
    let res = [
      {
        competition: {
          id: 2021,
          name: "Premier League",
          code: "PL",
          type: "LEAGUE",
          emblem: "https://crests.football-data.org/PL.png",
        },
        matches: [],
      },
      {
        competition: {
          id: 2019,
          name: "Serie A",
          code: "SA",
          type: "LEAGUE",
          emblem: "https://crests.football-data.org/SA.png",
        },
        matches: [],
      },
      {
        competition: {
          id: 2002,
          name: "Bundesliga",
          code: "BL1",
          type: "LEAGUE",
          emblem: "https://crests.football-data.org/BL1.png",
        },
        matches: [],
      },
      {
        competition: {
          id: 2015,
          name: "Ligue 1",
          code: "FL1",
          type: "LEAGUE",
          emblem: "https://crests.football-data.org/FL1.png",
        },
        matches: [],
      },
      {
        competition: {
          id: 2014,
          name: "Primera Division",
          code: "PD",
          type: "LEAGUE",
          emblem: "https://crests.football-data.org/PD.png",
        },
        matches: [],
      },
      {
        competition: {
          id: 2014,
          name: "Primera Division",
          code: "PD",
          type: "LEAGUE",
          emblem: "https://crests.football-data.org/PD.png",
        },
        matches: [],
      },
      {
        competition: {
          id: 2016,
          name: "Championship",
          code: "ELC",
          type: "LEAGUE",
          emblem: "https://crests.football-data.org/ELC.png",
        },
        matches: [],
      },
    ];
    //setting up res data
    res[0].matches = data.matches.filter((match) => {
      return match.competition.name == "Premier League";
    });

    //-----------

    res[1].matches = data.matches.filter((match) => {
      return match.competition.name == "Serie A";
    });

    //-----------

    res[2].matches = data.matches.filter((match) => {
      return match.competition.name == "Bundesliga";
    });

    //-----------

    res[3].matches = data.matches.filter((match) => {
      return match.competition.name == "Ligue 1";
    });

    //-----------

    res[4].matches = data.matches.filter((match) => {
      return match.competition.name == "Primeira Liga";
    });

    //-----------

    res[5].matches = data.matches.filter((match) => {
      return match.competition.name == "Primera Division";
    });

    //-----------

    res[6].matches = data.matches.filter((match) => {
      return match.competition.name == "Championship";
    });

    return res;
  }

  let contextData = {
    leagues: leagues,
    getLeagues: getLeagues,
  };

  return (
    <FootballContext.Provider value={contextData}>
      {children}
    </FootballContext.Provider>
  );
};
