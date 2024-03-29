import { createContext, useState } from "react";
import { and, collection } from "firebase/firestore";
import { addDoc, getFirestore } from "firebase/firestore";
import { app } from "../firebase.js";

const FootballContext = createContext({});

export default FootballContext;

export const FootballProvider = ({ children }) => {
  const db = getFirestore(app);

  const [leagues, setLeagues] = useState();
  const [standings, setStandings] = useState();
  const [age, setAge] = useState();
  const [team, setTeam] = useState({});
  const [matches, setMatches] = useState({});
  const [match, setMatch] = useState();
  const [person, setPerson] = useState({});

  const [showOdds, setShowOdds] = useState(false);

  const setMatchF = (match) => {
    setMatch(match);
  };

  function calculateAge(birthDate) {
    // Parse the birthDate string to a Date object
    const birthDateObject = new Date(birthDate);

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in years
    const age = currentDate.getFullYear() - birthDateObject.getFullYear();

    // Adjust the age if the birthday hasn't occurred yet this year
    if (
      currentDate.getMonth() < birthDateObject.getMonth() ||
      (currentDate.getMonth() === birthDateObject.getMonth() &&
        currentDate.getDate() < birthDateObject.getDate())
    ) {
      return age - 1;
    }

    return age;
  }

  const getLeagues = async () => {
    fetch("/api/leagues", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (response.status == 200) {
          let data = await response.json();
          setLeagues(data);
        }
      })
      .catch((error) => console.error(error), "!!!!!!!!!!!!!");
  };

  const getStandings = (id, year) => {
    setStandings();
    fetch(`/api/standings/${id}/${year}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        let data = await response.json();
        setStandings(data);
      })
      .catch((error) => console.error(error));
  };

  const getMatch = async (id) => {
    setMatch();
    await fetch(`/api/get-match/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        let data = await response.json();
        if (data == null) {
          router.back();
        }
        setMatch(data);
      })
      .catch((error) => console.error(error));
  };

  const getTeam = async (id) => {
    setTeam();
    fetch(`/api/team-data/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (response.status == 200) {
          let data = await response.json();
          setTeam(data);
        }
      })
      .catch((error) => console.error(error), "!!!!!!!!!!!!!");
  };

  const getPerson = (id) => {
    setPerson();
    fetch(`/api/persons/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        let data = await response.json();
        setPerson(data);
        setAge(calculateAge(data.dateOfBirth));
      })
      .catch((error) => console.error(error));
  };

  const getTeamsMatches = (id) => {
    fetch(`/api/team-matches/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        let data = await response.json();
        setMatches(data);
      })
      .catch((error) => console.error(error));
  };

  const toggleShowOdds = (toggle = "a") => {
    if (toggle == "a") {
      setShowOdds(toggle);
    } else {
      setShowOdds(!showOdds);
    }
  };

  const pick = async (match_id, user_id, pick) => {
    let x = await addDoc(collection(db, "pick"), {
      "match-id": match_id,
      "user-id": user_id,
      pick: pick,
    });
  };

  const followPlayer = async (player_id, user_id) => {
    console.log(player_id, user_id);
    let x = await addDoc(collection(db, "follow-player"), {
      "player-id": player_id,
      "user-id": user_id,
    });
  };

  const getPlayerMatches = (id) => {
    fetch(`/api/player-matches/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        let data = await response.json();
        console.log(data);
        setMatches(data);
      })
      .catch((error) => console.error(error));
  };

  let contextData = {
    leagues: leagues,
    getLeagues: getLeagues,
    getStandings: getStandings,
    standings: standings,
    getTeam: getTeam,
    getPerson: getPerson,
    team: team,
    person: person,
    age: age,
    matches: matches,
    getPlayerMatches: getPlayerMatches,
    getTeamsMatches: getTeamsMatches,
    toggleShowOdds: toggleShowOdds,
    showOdds: showOdds,
    match: match,
    setMatchF: setMatchF,
    getMatch: getMatch,
    pick: pick,
    db: db,
    setShowOdds: setShowOdds,
    followPlayer: followPlayer,
  };

  return (
    <FootballContext.Provider value={contextData}>
      {children}
    </FootballContext.Provider>
  );
};
