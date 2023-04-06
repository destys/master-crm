import React from "react";
import TableRow from "./TableRow";

const Tracking = () => {
  const data = [
    {
      date: "10.01.2023 10:19:25",
      user: "Башарин Андрей",
      status: "Принят",
    },
    {
      date: "10.01.2023 12:19:25",
      user: "Башарин Андрей",
      status: "В работе",
    },
    {
      date: "10.01.2023 14:19:25",
      user: "Башарин Андрей",
      status: "Согласовано",
    },
    {
      date: "10.01.2023 17:19:25",
      user: "Башарин Андрей",
      status: "Готов",
    },
    {
      date: "10.01.2023 18:19:25",
      user: "Башарин Андрей",
      status: "Выдан",
    },
  ];
  return (
    <div className="grid grid-cols-6 gap-6 mt-8">
      <div className="bg-white mb-6 col-span-6">
        <h3 className="mb-4 text-xl font-bold">Статусы:</h3>
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
                  Статус
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <TableRow
                  key={index}
                  date={item.date}
                  user={item.user}
                  status={item.status}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white mb-6 col-span-6">
        <h3 className="mb-4 text-xl font-bold">Перемещения:</h3>
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
                  Статус
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <TableRow
                  key={index}
                  date={item.date}
                  user={item.user}
                  status={item.status}
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

export default Tracking;
