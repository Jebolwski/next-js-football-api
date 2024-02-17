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
  const [leagues, setLeagues] = useState<any>([]);

  const getLeagues = async () => {
    let res = createResult(data);
    console.log(res, "jlkcehvbaw");
    setLeagues(res);
    return res;
    // const myHeaders = new Headers();
    // myHeaders.append("X-Auth-Token", apiKey);
    // const raw = "";
    // const requestOptions: any = {
    //   method: "GET",
    //   headers: myHeaders,
    //   redirect: "follow",
    // };
    // await fetch("https://api.football-data.org/v4/matches", requestOptions)
    //   .then(async (response) => {
    //     let data = await response.json();
    //     let res = createResult(data);
    //     console.log(res);
    //     setLeagues(res);
    //   })
    //   .catch((error) => console.error(error));
  };

  function createResult(data: any) {
    let res = {
      matches: {
        EPL: { competition: {}, matches: [] },
        SerieA: { competition: {}, matches: [] },
        Bundesliga: { competition: {}, matches: [] },
        Ligue1: { competition: {}, matches: [] },
        LaLiga: { competition: {}, matches: [] },
        Championship: { competition: {}, matches: [] },
        PrimeiraLiga: { competition: {}, matches: [] },
      },
    };
    //setting up res data
    res.matches.SerieA.matches = data.matches.filter((match) => {
      return match.competition.name == "Serie A";
    });
    res.matches.SerieA.competition = data.matches.filter((match) => {
      return match.competition.name == "Serie A";
    })[0]?.competition;
    //-----------
    res.matches.EPL.matches = data.matches.filter((match) => {
      return match.competition.name == "Premier League";
    });
    res.matches.EPL.competition = data.matches.filter((match) => {
      return match.competition.name == "Premier League";
    })[0]?.competition;
    //-----------
    res.matches.Bundesliga.matches = data.matches.filter((match) => {
      return match.competition.name == "Bundesliga";
    });
    res.matches.Bundesliga.competition = data.matches.filter((match) => {
      return match.competition.name == "Bundesliga";
    })[0]?.competition;
    //-----------
    res.matches.Ligue1.matches = data.matches.filter((match) => {
      return match.competition.name == "Ligue 1";
    });
    res.matches.Ligue1.competition = data.matches.filter((match) => {
      return match.competition.name == "Ligue 1";
    })[0]?.competition;
    //-----------
    res.matches.PrimeiraLiga.matches = data.matches.filter((match) => {
      return match.competition.name == "Primeira Liga";
    });
    res.matches.PrimeiraLiga.competition = data.matches.filter((match) => {
      return match.competition.name == "Primeira Liga";
    })[0]?.competition;
    //-----------
    res.matches.LaLiga.matches = data.matches.filter((match) => {
      return match.competition.name == "Primera Division";
    });
    res.matches.LaLiga.competition = data.matches.filter((match) => {
      return match.competition.name == "Primera Division";
    })[0]?.competition;
    //-----------
    res.matches.Championship.matches = data.matches.filter((match) => {
      return match.competition.name == "Championship";
    });
    res.matches.Championship.competition = data.matches.filter((match) => {
      return match.competition.name == "Championship";
    })[0]?.competition;

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
