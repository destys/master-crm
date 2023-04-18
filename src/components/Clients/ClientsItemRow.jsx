import React from "react";

const ClientsItemRow = ({ item }) => {
  return (
    <tr className="h-24 border border-gray-100 ">
      <td className="pl-5">{item.attributes.name}</td>
      <td className="pl-5">{item.attributes.phone}</td>
      <td className="pl-5">{item.attributes.address}</td>
    </tr>
  );
};

export default ClientsItemRow;
