import { Button } from "@material-tailwind/react";
import axios from "axios";
import React from "react";

const Telephony = () => {
  const urlPostBalance = "https://app.mango-office.ru/vpbx/stats/request";
  const apiKey = "ug8gw0jvvjtson18s8k99jbjed6snptb";
  const apiSalt = "crwyja1jy42t9gjkz3yenyhzi5xvczrb";

  const getSHA256Hash = async (input) => {
    const textAsBuffer = new TextEncoder().encode(input);

    const hashBuffer = await window.crypto.subtle.digest(
      "SHA-256",
      textAsBuffer
    );

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hash = hashArray

      .map((item) => item.toString(16).padStart(2, "0"))

      .join("");

    return hash;
  };

  async function fetchData() {
    const date = new Date("2023-04-27");
    console.log("date: ", date);
    /* const dataToPost = {
      command_id: "stat",
      text: "Ваш заказ принят и находится в обработке",
      from_extension: "5",
      to_number: "79936283859", // MDeveloper
      sms_sender: "ООО Гарант"
    }; */

    const dataToPost = {
      date_from: "1072915200",
      date_to: date,
    };

    const json = JSON.stringify(dataToPost);

    const signHash = await getSHA256Hash(apiKey + json + apiSalt);

    const response = await axios.post(
      urlPostBalance,

      {
        vpbx_api_key: apiKey,

        sign: signHash,

        json: json,
      },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const data = await response.data;
    console.log("data: ", data);

    return await data;
  }

  return (
    <div>
      <Button onClick={fetchData}>КНОПКААА (Не нажимать)</Button>
    </div>
  );
};

export default Telephony;
