import { Button, Textarea } from "@material-tailwind/react";
import React from "react";
import AlertItem from "./AlertItem";

const Chat = () => {
  const data = [
    {
      date: "27.03.2023 15:40",
      title: "A simple alert for showing message.",
      author: "Егор Беляев",
    },
    {
      date: "27.03.2023 15:40",
      title: "A simple alert for showing message.",
      author: "Егор Беляев",
    },
    {
      date: "27.03.2023 15:40",
      title: "A simple alert for showing message.",
      author: "Егор Беляев",
    },
    {
      date: "27.03.2023 15:40",
      title:
        "A simple alert for showing message.A simple alert for showing message.A simple alert for showing message.A simple alert for showing message.A simple alert for showing message.A simple alert for showing message.A simple alert for showing message.A simple alert for showing message.A simple alert for showing message.A simple alert for showing message.A simple alert for showing message.A simple alert for showing message.",
      author: "Егор Беляев",
    },
  ];
  return (
    <div className="mt-8">
      <form className="w-full mb-8 p-4 border rounded">
        <Textarea size="lg" label="Сообщение" />
        <Button className="mt-6">
          Отправить
        </Button>
      </form>
      <div className="bg-white mb-6 col-span-6">
        {data.map((item, index) => (
          <AlertItem
            key={index}
            title={item.title}
            author={item.author}
            date={item.date}
          />
        ))}
      </div>
    </div>
  );
};

export default Chat;
