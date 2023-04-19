import axios from "axios";
import React from "react";

const Telephony = () => {

  const clientId = "16934225";
  const clientSecret = "ug8gw0jvvjtson18s8k99jbjed6snptb";

  axios
    .post("https://cors-anywhere.herokuapp.com/https://app.mango-office.ru/vpbx/v1/token", {
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    })
    .then((response) => {
      const accessToken = response.data.access_token;
      console.log(accessToken);
    })
    .catch((error) => {
      console.error(error);
    });

  return <div></div>;
};

export default Telephony;
