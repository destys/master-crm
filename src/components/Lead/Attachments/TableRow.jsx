import React from "react";
import { Link } from "react-router-dom";

const TableRow = ({ filename, user, link, index }) => {
  return (
    <>
      <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
        <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
        <td className="whitespace-nowrap px-6 py-4">{filename}</td>
        <td className="whitespace-nowrap px-6 py-4">{user}</td>
        <td className="whitespace-nowrap px-6 py-4">
          <Link to={link} download>
            Скачать
          </Link>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
