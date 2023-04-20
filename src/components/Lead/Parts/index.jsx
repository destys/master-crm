import React, { Fragment, useEffect, useRef, useState } from "react";
import TableRow from "./TableRow";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Switch,
} from "@material-tailwind/react";
import axios from "axios";
import { getToken } from "../../../helpers";

const Parts = ({ id, data }) => {
  const userToken = getToken();
  const [partsCompany, setPartsCompany] = useState([]);
  const [partsMaster, setPartsMaster] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const partsRef = useRef(false);

  useEffect(() => {
    setPartsMaster(data?.attributes?.parts_master);
    setPartsCompany(data?.attributes?.parts_company);
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
      partsMaster.unshift(newFormData[0]);
      axios
        .put(
          `https://snurinoothe.beget.app/api/orders/${id}?populate=parts_master`,
          {
            data: {
              id: id,
              parts_master: partsMaster,
            },
          },
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        )
        .then((response) => {
          console.log("responseMaster: ", response);
          setPartsMaster(response.data.data.attributes.parts_master);
          setOpen(!open);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      partsCompany.unshift(newFormData[0]);
      axios
        .put(
          `https://snurinoothe.beget.app/api/orders/${id}?populate=parts_company`,
          {
            data: {
              id: id,
              parts_company: partsCompany,
            },
          },
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        )
        .then((response) => {
          console.log("responseCompany: ", response);
          setPartsCompany(response.data.data.attributes.parts_company);
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
          <Dialog open={open} size={"sm"}>
            <DialogHeader>Добавить заказ запчасти</DialogHeader>
            <DialogBody divider>
              <form
                className="mt-8 mb-2 w-full max-w-screen-lg"
                onSubmit={(event) => handleSubmit(event)}
              >
                <div className="mb-4 flex  flex-col gap-6">
                  <div className="flex justify-center gap-3 mb-4">
                    <span>Запчасть мастера</span>
                    <Switch inputRef={partsRef} defaultChecked />
                    <span>Заказ запчасти</span>
                  </div>

                  <Input
                    name="part_number"
                    defaultValue={""}
                    size="lg"
                    label="Номер детали"
                    required
                  />
                  <Input
                    name="price"
                    defaultValue={""}
                    type="number"
                    size="lg"
                    label="Цена"
                    required
                  />
                  <Input
                    name="price_client"
                    defaultValue={""}
                    type="number"
                    size="lg"
                    label="Цена для клиента"
                    required
                  />
                  <Textarea
                    name="comment"
                    defaultValue={""}
                    label="Комментарий"
                  ></Textarea>
                </div>
                <Button className="mt-6" type="submit">
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
                  Номер детали
                </th>
                <th scope="col" className="px-6 py-4">
                  Цена
                </th>
                <th scope="col" className="px-6 py-4">
                  Цена для клиента
                </th>
                <th scope="col" className="px-6 py-4">
                  Комментарий
                </th>
              </tr>
            </thead>
            <tbody>
              {partsCompany?.map((item, index) => (
                <TableRow
                  key={item.id}
                  partnumber={item.part_number}
                  price={item.price}
                  clientPrice={item.price_client}
                  comment={item.comment}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white mb-6 col-span-6">
        <h3 className="mb-4 text-xl font-bold">Запчасти мастера:</h3>
        <div className="rounded-lg border">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-4">
                  #
                </th>
                <th scope="col" className="px-6 py-4">
                  Номер детали
                </th>
                <th scope="col" className="px-6 py-4">
                  Цена
                </th>
                <th scope="col" className="px-6 py-4">
                  Цена для клиента
                </th>
                <th scope="col" className="px-6 py-4">
                  Комментарий
                </th>
              </tr>
            </thead>
            <tbody>
              {partsMaster?.map((item, index) => (
                <TableRow
                  key={item.id}
                  partnumber={item.part_number}
                  price={item.price}
                  clientPrice={item.price_client}
                  comment={item.comment}
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

export default Parts;
