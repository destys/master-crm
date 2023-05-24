import React from "react";

const TableRow = ({ title, amount, index }) => {
  return (
    <>
      <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
        <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
        <td className="whitespace-nowrap px-6 py-4">{amount}</td>
        <td className="whitespace-nowrap px-6 py-4">{title}</td>
      </tr>
    </>
  );
};

export default TableRow;
