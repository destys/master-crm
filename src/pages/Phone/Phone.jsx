import axios from "axios";
import React from "react";

const Telephony = () => {
  const apiKey = "ug8gw0jvvjtson18s8k99jbjed6snptb";
  const apiEndpoint =
    "https://cors-anywhere.herokuapp.com/https://app.mango-office.ru/vpbx/stats/v1/calls?from=2023-04-19&to=2023-04-19";

  axios
    .get(apiEndpoint, {
      headers: {
        "X-API-KEY": apiKey,
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

  return <div></div>;
};

export default Telephony;
