import { Alert } from "@material-tailwind/react";
import React from "react";

const AlertItem = ({ title, author, date }) => {
  return (
    <>
      <Alert className="mb-4 flex justify-between">
        <div className="mb-2">{date}</div>
        <div className="w-full">{title}</div>
        <div className="mt-4 p-2 bg-gray-50/20 w-fit rounded">{author}</div>
      </Alert>
    </>
  );
};

export default AlertItem;
