import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Alert,
} from "@material-tailwind/react";
import axios from "axios";
import { getToken } from "../../../helpers";

const SendMessage = ({ client, userName, leadId }) => {
  var currentDate = new Date();
  var formattedDate =
    ("0" + currentDate.getDate()).slice(-2) +
    "." +
    ("0" + (currentDate.getMonth() + 1)).slice(-2) +
    "." +
    currentDate.getFullYear() +
    " " +
    ("0" + currentDate.getHours()).slice(-2) +
    ":" +
    ("0" + currentDate.getMinutes()).slice(-2) +
    ":" +
    ("0" + currentDate.getSeconds()).slice(-2);

  const userToken = getToken();
  const [open, setOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [msgContent, setMsgContent] = useState("");
  const [smsText, setSmsText] = useState("");
  const [smsList, setSmsList] = useState([]);

  const handleOpen = () => setOpen(!open);

  const urlPostBalance = "https://app.mango-office.ru/vpbx/commands/sms";
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

  async function fetchData(e) {
    e.preventDefault();
    const dataToPost = {
      command_id: "stat",
      text: smsText,
      from_extension: 1,
      to_number: client.data?.attributes.phone.replace(/\D/g, ""), // MDeveloper
      sms_sender: "ООО Гарант",
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
    if (data.result === 1000) {
      setShowMessage(true);
      setMsgContent("Сообщение успешно отправлено");

      const sms_list = {
        date: formattedDate,
        text: smsText,
        sender: userName,
      };
      
      axios
        .put(
          `https://snurinoothe.beget.app/api/orders/${leadId}?populate=sms_list`,
          {
            data: {
              sms_list: [...smsList, sms_list],
            },
          },
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        )
        .then((response) => {
          setSmsList(data?.data?.attributes.sms_list);
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
        });

      setTimeout(() => {
        setShowMessage(false);
        setOpen(false);
      }, 3000);
    } else {
      setShowMessage(true);
      setMsgContent(`Ошибка при отправке сообщения. Код ошибки ${data.result}`);
    }

    return await data;
  }

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/orders/${leadId}?populate=sms_list`,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      )
      .then((response) => {
        setSmsList(response.data?.data?.attributes.sms_list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userToken, leadId]);

  return (
    <div>
      <Fragment>
        <Button onClick={handleOpen} variant="gradient">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </Button>
        <Dialog open={open} size={"sm"} handler={handleOpen}>
          <DialogHeader>Отправить сообщение клиенту.</DialogHeader>
          <DialogBody divider>
            <form
              className="mt-8 mb-2 w-full max-w-screen-lg"
              onSubmit={fetchData}
            >
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  size="lg"
                  label="Телефон"
                  defaultValue={client?.data?.attributes.phone}
                  disabled
                />
                <Textarea
                  size="lg"
                  label="Сообщение"
                  onChange={(e) => setSmsText(e.target.value)}
                />
              </div>
              <Alert
                variant="filled"
                className={`${!showMessage && "hidden"} mb-5`}
              >
                {msgContent}
              </Alert>
              <Button className="mt-6" fullWidth type="submit">
                Отправить
              </Button>
            </form>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Отменить</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleOpen}>
              <span>Готово</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment>
    </div>
  );
};

export default SendMessage;
