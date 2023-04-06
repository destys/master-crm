import { Button } from "@material-tailwind/react";
import React from "react";
import TableRow from "./TableRow";

const Attachments = () => {
  const data = [
    {
      filename: "Счет",
      user: "Башарин Андрей",
      link: "/files/s4et.pdf",
    },
  ];
  return (
    <div className="mt-8">
      <div className="bg-white mb-6">
        <Button variant="gradient" className="flex items-center gap-3">
          Вложить файл
        </Button>
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
                      Название файла
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Пользователь
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Скачать файл
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <TableRow
                      key={index}
                      filename={item.filename}
                      user={item.user}
                      link={item.link}
                      index={index}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attachments;
