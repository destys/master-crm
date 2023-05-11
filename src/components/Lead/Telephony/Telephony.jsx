import React from "react";
import TableRow from "./TableRow";

const Telephony = ({ data }) => {
  const smsList = data?.attributes.sms_list;

  return (
    <div className="grid grid-cols-6 gap-6 mt-8">
      <div className="bg-white mb-6 col-span-6">
        <h3 className="mb-4 text-xl font-bold">Сообщения:</h3>
        <div className="rounded-lg border">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-4">
                  #
                </th>
                <th scope="col" className="px-6 py-4">
                  Дата
                </th>
                <th scope="col" className="px-6 py-4">
                  Пользователь
                </th>
                <th scope="col" className="px-6 py-4">
                  Текст сообщения
                </th>
              </tr>
            </thead>
            <tbody>
              {smsList?.map((item, index) => (
                <TableRow
                  key={item.id}
                  date={item.date}
                  user={item.sender}
                  text={item.text}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Telephony;
