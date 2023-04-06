import React from "react";
import { Link } from "react-router-dom";

const LeadItemRow = (attributes) => {
  const attr = attributes.attributes;
  const leadDate = new Date(attr.createdAt);
  const nowDate = new Date();

  return (
    <>
      <tr className="h-24 border border-gray-100 ">
        <td>
          <Link to={"/lead"} className="flex items-center pl-5">
            <p className="text-base font-medium leading-none text-gray-700 mr-2">
              {attr.order_number}
            </p>
          </Link>
        </td>
        <td className="pl-5">
          <div className="flex items-center">
            <p
              className={`text-sm leading-none text-gray-600 py-3 px-5  rounded  focus:outline-none ${
                attr.order_status === "Новый"
                  ? "bg-green-100 hover:bg-green-200"
                  : attr.order_status === "Принят"
                  ? "bg-yellow-100 hover:bg-yellow-200"
                  : attr.order_status === "В работе"
                  ? "bg-yellow-100 hover:bg-yellow-200"
                  : attr.order_status === "Согласовано"
                  ? "bg-yellow-100 hover:bg-yellow-200"
                  : attr.order_status === "Готов"
                  ? "bg-gray-100 hover:bg-gray-200"
                  : "bg-red-100 hover:bg-red-200"
              }`}
            >
              {attr.order_status}
            </p>
          </div>
        </td>
        <td className="pl-5">
          <div className="flex items-center">
            <p className="text-sm leading-none text-gray-600 ml-2">
              {attr.order_location}
            </p>
          </div>
        </td>
        <td className="pl-5">
          <div className="flex flex-col">
            <p className="text-sm leading-none text-gray-600 ml-2 mb-2">
              Электродвигатель
            </p>
            <p className="text-sm leading-none text-gray-600 ml-2 mb-2">
              NoName Китай
            </p>
            <p className="text-sm leading-none text-gray-600 ml-2 mb-2">
              Code 60119522
            </p>
          </div>
        </td>
        <td className="pl-5">
          <div className="flex items-center">
            <p className="text-sm leading-none text-gray-600 ml-2">Беляев Е.</p>
          </div>
        </td>
        <td className="pl-4">
          <button
            className={`${
              attr.status !== "ready" && nowDate > leadDate ? "bg-red-200" : ""
            } py-3 px-3 text-sm focus:outline-none leading-none text-gray-600 rounded`}
          >
            {leadDate.toLocaleString("ru", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }) + ""}
          </button>
        </td>
        <td className="pl-5">
          <div className="flex items-center">
            <p className="text-sm leading-none text-gray-600 ml-2">2 000</p>
          </div>
        </td>
        <td className="pl-4">
          <Link to={"/lead"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mx-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Link>
        </td>
      </tr>
      <tr className="h-3" />
    </>
  );
};

export default LeadItemRow;
