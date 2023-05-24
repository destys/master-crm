import React, { Fragment, useEffect, useRef, useState } from "react";
import TableRow from "./TableRow";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  Switch,
} from "@material-tailwind/react";
import axios from "axios";
import { getToken } from "../../../helpers";

const Accounting = ({ id, data }) => {
  const userToken = getToken();
  const [income, setIncome] = useState([]); // приход
  const [consumption, setConsumption] = useState([]); // расход

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const partsRef = useRef(false);

  useEffect(() => {
    setIncome(data?.attributes?.income);
    setConsumption(data?.attributes?.consumption);
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newFormData = []; // создаем копию массива данных формы
    const formElements = event.target.elements; // получаем элементы формы
    const formDataObject = {}; // создаем объект для хранения данных формы

    // перебираем элементы формы и добавляем их значения в объект formDataObject
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];
      if (element.name) {
        formDataObject[element.name] = element.value;
      }
    }

    newFormData.push(formDataObject); // добавляем объект с данными формы в массив

    if (partsRef.current.checked === false) {
      income.unshift(newFormData[0]);
      axios
        .put(
          `https://snurinoothe.beget.app/api/orders/${id}?populate=income`,
          {
            data: {
              id: id,
              income: income,
            },
          },
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        )
        .then((response) => {
          console.log("response: ", response);
          setIncome(response.data.data.attributes.income);
          setOpen(!open);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      consumption.unshift(newFormData[0]);
      axios
        .put(
          `https://snurinoothe.beget.app/api/orders/${id}?populate=consumption`,
          {
            data: {
              id: id,
              consumption: consumption,
            },
          },
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        )
        .then((response) => {
          setConsumption(response.data.data.attributes.consumption);
          setOpen(!open);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="grid grid-cols-6 gap-6 mt-8">
      <div className="bg-white mb-6 col-span-6">
        <h3 className="mb-4 text-xl font-bold">Приход:</h3>

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
          <Dialog open={open} size={"sm"}>
            <DialogHeader>Добавить приход/расход</DialogHeader>
            <DialogBody divider>
              <form
                className="mt-8 mb-2 w-full max-w-screen-lg"
                onSubmit={(event) => handleSubmit(event)}
              >
                <div className="mb-4 flex  flex-col gap-6">
                  <div className="flex justify-center gap-3 mb-4">
                    <span>Приход</span>
                    <Switch inputRef={partsRef}  />
                    <span>Расход</span>
                  </div>

                  <Input
                    name="amount"
                    defaultValue={""}
                    type="number"
                    size="lg"
                    label="Сумма"
                    required
                  />
                  <Input
                    name="title"
                    defaultValue={""}
                    type="text"
                    size="lg"
                    label="Услуга"
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <Button className="mt-6" type="submit">
                    Отправить
                  </Button>
                  <Button
                    className="mt-6"
                    type="button"
                    color="red"
                    onClick={() => setOpen(false)}
                  >
                    Закрыть
                  </Button>
                </div>
              </form>
            </DialogBody>
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
                  Сумма
                </th>
                <th scope="col" className="px-6 py-4">
                  Комментарий
                </th>
              </tr>
            </thead>
            <tbody>
              {income?.map((item, index) => (
                <TableRow
                  key={item.id}
                  amount={item.amount}
                  title={item.title}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white mb-6 col-span-6">
        <h3 className="mb-4 text-xl font-bold">Расход:</h3>
        <div className="rounded-lg border">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-4">
                  #
                </th>
                <th scope="col" className="px-6 py-4">
                  Сумма
                </th>
                <th scope="col" className="px-6 py-4">
                  Комментарий
                </th>
              </tr>
            </thead>
            <tbody>
              {consumption?.map((item, index) => (
                <TableRow
                  key={item.id}
                  amount={item.amount}
                  title={item.title}
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

export default Accounting;
