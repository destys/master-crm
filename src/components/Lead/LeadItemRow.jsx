import React from "react";
import { Link } from "react-router-dom";

const LeadItemRow = ({ item }) => {
  const id = item.id;

  return (
    <>
      <tr
        className={`h-24 border border-gray-100 ${
          item.attributes.order_status === "Новый"
            ? "bg-white-100 hover:bg-white-200"
            : item.attributes.order_status === "Принят"
            ? "bg-pink-50 hover:bg-pink-100"
            : item.attributes.order_status === "Согласовано"
            ? "bg-orange-400 hover:bg-orange-500"
            : item.attributes.order_status === "В работе"
            ? "bg-orange-100 hover:bg-orange-200"
            : item.attributes.order_status === "Готов"
            ? "bg-green-100 hover:bg-green-200"
            : item.attributes.order_status === "Отказ"
            ? "bg-red-100 hover:bg-red-200"
            : item.attributes.order_status === "У Борисыча"
            ? "bg-blue-50 hover:bg-blue-100"
            : item.attributes.order_status === "Выдан"
            ? "bg-gray-100 hover:bg-gray-200"
            : "bg-red-100 hover:bg-red-200"
        }`}
      >
        <td>
          <Link to={`/lead/${id}`} className="flex items-center pl-5">
            <p className="text-base font-medium leading-none text-gray-700 mr-2">
              {item.attributes.order_number}
            </p>
          </Link>
        </td>
        <td className="pl-5">
          <div className="flex items-center">
            <p className="text-sm leading-none text-gray-600 py-3 px-5  rounded  focus:outline-none">
              {item.attributes.order_status}
            </p>
          </div>
        </td>
        <td className="pl-5">
          <div className="flex items-center">
            <p className="text-sm leading-none text-gray-600 ml-2">
              {item.attributes.correct_info?.order_place}
            </p>
          </div>
        </td>
        <td className="pl-5">
          <div className="flex items-center">
            <p className="text-sm leading-none text-gray-600 ml-2">
              {`${item.attributes.correct_info?.sold_date} ${item.attributes.correct_info?.sold_time}`}
            </p>
          </div>
        </td>
        <td className="pl-5">
          <div className="flex flex-col">
            {item.attributes.correct_info?.device && (
              <p className="text-sm leading-none text-gray-600 ml-2 mb-2 truncate ... w-[200px]">
                {item.attributes.correct_info.device}
              </p>
            )}

            {item.attributes.correct_info?.brand && (
              <p className="text-sm leading-none text-gray-600 ml-2 mb-2">
                {item.attributes.correct_info.brand}
              </p>
            )}
            {item.attributes.correct_info?.model_code && (
              <p className="text-sm leading-none text-gray-600 ml-2 mb-2">
                {item.attributes.correct_info.model_code}
              </p>
            )}
          </div>
        </td>
        <td className="pl-5">
          <div className="flex items-center">
            <p className="text-sm leading-none text-gray-600 ml-2">
              {item.attributes?.users_permissions_user.data?.attributes?.name}{" "}
              {
                item.attributes?.users_permissions_user.data?.attributes
                  ?.last_name
              }
            </p>
          </div>
        </td>
        <td className="pl-5">
          <div className="flex items-center">
            <p className="text-sm leading-none text-gray-600 ml-2">
              <Link
                to={`tel:${item.attributes.client?.data?.attributes.phone}`}
              >
                {item.attributes.client?.data?.attributes.phone}
              </Link>
            </p>
          </div>
        </td>
        <td className="pl-4">
          <Link to={`/lead/${id}`}>
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
