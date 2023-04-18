import axios from "axios";
import React, { useState } from "react";

const Phone = () => {
  const [calls, setCalls] = useState([]);

  const apiKey = "usvl5a86gil6y6sxfkg8nuyifrfl96ms";
  const apiEndpoint =
    "https://app.mango-office.ru/vpbx/stats/v1/calls?from=2021-03-01&to=2023-04-18";

  axios
    .get(apiEndpoint, {
      headers: {
        "X-API-KEY": apiKey,
      },
    })
    .then((response) => {
      setCalls(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

  return <div>{calls}</div>;
};

export default Phone;
