import axios from "axios";
import React from "react";
import sha256 from "crypto-js/sha256";

const Telephony = () => {
  const vpbx_api_key = "ug8gw0jvvjtson18s8k99jbjed6snptb";
  const vpbx_api_salt = "crwyja1jy42t9gjkz3yenyhzi5xvczrb";
  const json = {};
  const sign = sha256(vpbx_api_key + json + vpbx_api_salt).toString();
  console.log("sign: ", sign);

  const apiEndpoint =
    "https://app.mango-office.ru/vpbx/account/balance";

  axios
    .post(apiEndpoint, sign)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

  return <div></div>;
};

export default Telephony;
