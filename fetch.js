const myHeaders = new Headers();
myHeaders.append("X-Auth-Token", "8ff3077b063f40219063f504b7b543cb");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch("https://api.football-data.org/v4/matches", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
