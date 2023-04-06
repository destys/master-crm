import React, { Fragment, useState } from "react";
import TableRow from "./TableRow";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";

const Estimate = () => {
  const data = [
    {
      date: "27.03.2023",
      service: "Замена подшипника",
      price: "1300",
    },
    {
      date: "27.03.2023",
      service: "Замена подшипника",
      price: "2300",
    },
    {
      date: "27.03.2023",
      service: "Замена подшипника",
      price: "2000",
    },
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <div className="grid grid-cols-6 gap-6 mt-8">
      <div className="bg-white mb-6 col-span-6">
        <h3 className="mb-4 text-xl font-bold">Заказы запчастей :</h3>

        <Fragment>
          <Button
            onClick={handleOpen}
            variant="gradient"
            className="flex items-center gap-3 mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Добавить
          </Button>
          <Dialog open={open} size={"sm"} handler={handleOpen}>
            <DialogHeader>Добавить заказ запчасти</DialogHeader>
            <DialogBody divider>
              <form className="mt-8 mb-2 w-full max-w-screen-lg">
                <div className="mb-4 flex flex-col gap-6">
                  <Select label="Работа">
                    <Option>Работа</Option>
                    <Option>Замена платы</Option>
                    <Option>Пайка</Option>
                  </Select>
                  <Input type={'number'} size="lg" label="Цена" required />
                </div>
                <Button className="mt-6" fullWidth>
                  Отправить
                </Button>
              </form>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Отменить</span>
              </Button>
              <Button variant="gradient" color="green" onClick={handleOpen}>
                <span>Готово</span>
              </Button>
            </DialogFooter>
          </Dialog>
        </Fragment>

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
                  Услуга
                </th>
                <th scope="col" className="px-6 py-4">
                  Цена
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <TableRow
                  key={index}
                  date={item.date}
                  service={item.service}
                  price={item.price}
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

export default Estimate;
