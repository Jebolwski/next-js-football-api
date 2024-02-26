import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect, cache } from "react";
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

export const FootballProvider = ({ children }) => {
  const [leagues, setLeagues] = useState({});
  const [standings, setStandings] = useState({});
  const [age, setAge] = useState();
  const [team, setTeam] = useState({});
  const [person, setPerson] = useState({});

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

  const getLeagues = () => {
    const myHeaders = new Headers();
    myHeaders.append("X-Auth-Token", apiKey);
    const raw = "";
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch("https://api.football-data.org/v4/matches", requestOptions)
      .then(async (response) => {
        let data = await response.json();
        let res = createResult(data);
        setLeagues(res);
      })
      .catch((error) => console.error(error));
  };

  const getStandings = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("X-Auth-Token", apiKey);
    const raw = "";
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://api.football-data.org/v4/competitions/${id}/standings`,
      requestOptions
    )
      .then(async (response) => {
        let data = await response.json();
        setStandings(data);
      })
      .catch((error) => console.error(error));
  };

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

  const getTeam = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("X-Auth-Token", apiKey);
    const raw = "";
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://api.football-data.org/v4/teams/${id}`, requestOptions)
      .then(async (response) => {
        let data = await response.json();
        setTeam(data);
      })
      .catch((error) => console.error(error));
  };

  const getPerson = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("X-Auth-Token", apiKey);
    const raw = "";
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://api.football-data.org/v4/persons/${id}`, requestOptions)
      .then(async (response) => {
        let data = await response.json();
        setPerson(data);
        setAge(calculateAge(data.dateOfBirth));
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
  };

  return (
    <FootballContext.Provider value={contextData}>
      {children}
    </FootballContext.Provider>
  );
};
