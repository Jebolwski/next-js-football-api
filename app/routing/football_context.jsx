import { createContext, useState } from "react";
import { and, collection } from "firebase/firestore";
import { addDoc, getFirestore } from "firebase/firestore";
import { app } from "../firebase.js";
import { query, where, getDocs } from "firebase/firestore";

const FootballContext = createContext({});

export default FootballContext;

export const FootballProvider = ({ children }) => {
  const db = getFirestore(app);

  const [leagues, setLeagues] = useState({});
  const [standings, setStandings] = useState();
  const [age, setAge] = useState();
  const [team, setTeam] = useState({});
  const [matches, setMatches] = useState({});
  const [match, setMatch] = useState();
  const [person, setPerson] = useState({});
  const [picks, setPicks] = useState({ 0: [], 1: [], 2: [] });
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

  const getMatch = (id) => {
    setMatch();
    fetch(`/api/get-match/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        let data = await response.json();
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
    console.log(x);
  };

  const getPicks = async () => {
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

    let querySnapshot = await getDocs(q0);
    querySnapshot.forEach((doc) => {
      let dp = picks;
      dp[0].push({ id: doc.id, ...doc.data() });
      setPicks(dp);
    });

    querySnapshot = await getDocs(q1);
    querySnapshot.forEach((doc) => {
      let dp = picks;
      dp[1].push({ id: doc.id, ...doc.data() });
      setPicks(dp);
    });

    querySnapshot = await getDocs(q2);
    querySnapshot.forEach((doc) => {
      let dp = picks;
      dp[2].push({ id: doc.id, ...doc.data() });
      setPicks(dp);
    });

    console.log(picks);
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
    getPicks: getPicks,
    picks: picks,
  };

  return (
    <FootballContext.Provider value={contextData}>
      {children}
    </FootballContext.Provider>
  );
};
