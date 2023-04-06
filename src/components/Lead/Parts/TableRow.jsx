import React from "react";

const TableRow = ({ date, partnumber, price, clientPrice, comment, index }) => {
  return (
    <>
      <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
        <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
        <td className="whitespace-nowrap px-6 py-4">{date}</td>
        <td className="whitespace-nowrap px-6 py-4">{partnumber}</td>
        <td className="whitespace-nowrap px-6 py-4">{price}</td>
        <td className="whitespace-nowrap px-6 py-4">{clientPrice}</td>
        <td className="whitespace-nowrap px-6 py-4">{comment}</td>
      </tr>
    </>
  );
};

export default TableRow;
