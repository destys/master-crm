import { Button, Textarea } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import AlertItem from "./AlertItem";
import axios from "axios";
import { getToken } from "../../../helpers";

const Chat = ({ id }) => {
  const userToken = getToken();
  const [user, setUser] = useState();
  const [chat, setChat] = useState();

  const sentMessage = (e) => {
    e.preventDefault();
    let yourDate = new Date();

    const offset = yourDate.getTimezoneOffset();
    yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);

    const data = {
      author: user,
      message: e.target[0].value,
      create_date: yourDate.toISOString().split("T")[0],
    };

    chat.unshift(data);

    axios
      .put(
        `https://snurinoothe.beget.app/api/orders/${id}?populate=chat`,
        {
          data: {
            id: id,
            chat: chat,
          },
        },
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      )
      .then((response) => {
        setChat(response.data.data.attributes.chat);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/me`, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      })
      .then((response) => {
        setUser(response.data.name + " " + response.data.last_name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userToken]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/orders/${id}?populate=chat`, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      })
      .then((response) => {
        setChat(response.data.data.attributes.chat);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userToken, id]);

  return (
    <div className="mt-8">
      <form
        className="w-full mb-8 p-4 border rounded"
        onSubmit={(event) => sentMessage(event)}
      >
        <Textarea size="lg" label="Сообщение" required />
        <Button className="mt-6" type="submit">
          Отправить
        </Button>
      </form>
      <div className="bg-white mb-6 col-span-6">
        {chat?.map((item, index) => (
          <AlertItem
            key={index}
            text={item.message}
            author={item.author}
            date={item.create_date}
          />
        ))}
      </div>
    </div>
  );
};

export default Chat;
