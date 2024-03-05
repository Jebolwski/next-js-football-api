import { createContext, useState } from "react";
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

  const getStandings = (id) => {
    setStandings();
    fetch(`/api/standings/${id}`, {
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

  const getTeam = async (id) => {
    setTeam();
    fetch(`/api/team-data/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        console.log(response);
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
