import {
  Option,
  Select,
  Input,
  Textarea,
  Button,
  Alert,
} from "@material-tailwind/react";
import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../../helpers";

const CreateLead = () => {
  const [valueStatus, setValueStatus] = useState("Новый");
  const [value2, setValue2] = useState("Платный");
  const [value3, setValue3] = useState("Выездной");
  const [formValues, setFormValues] = useState({});
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (event) => {
    const userToken = getToken();
    const nowDate = new Date();
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
    console.log("formDataObject: ", formDataObject);

    axios
      .post(
        `https://snurinoothe.beget.app/api/clients/`,
        {
          data: {
            name: formValues.client_name,
            phone: formValues.client_phone,
            address: formValues.client_address,
          },
        },
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      )
      .then((response) => {
        axios
          .post(
            `https://snurinoothe.beget.app/api/orders/`,
            {
              data: {
                order_number:
                  "HM-" +
                  nowDate.getDate() +
                  (nowDate.getMonth() + 1) +
                  nowDate.getYear() +
                  "-" +
                  nowDate.getHours() +
                  nowDate.getMinutes() +
                  nowDate.getSeconds(),
                order_status: valueStatus,
                correct_info: newFormData[0],
                client: {
                  id: response.data.data.id,
                },
              },
            },
            {
              headers: {
                Authorization: "Bearer " + userToken,
              },
            }
          )
          .then((response) => {
            setShowMessage(true);
            setTimeout(() => {
              setShowMessage(false);
            }, 3000);
          })
          .catch((error) => {
            console.log("error orders:", error);
          });
      })
      .catch((error) => {
        console.log("error client:", error);
      });
  };

  const handleChange = (e) => {
    setValueStatus(e);
  };
  const handleChange2 = (e) => {
    setValue2(e);
  };
  const handleChange3 = (e) => {
    setValue3(e);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="container px-5 mx-auto py-10 md:w-4/5 w-11/12 basis-3/4 overflow-hidden overflow-y-scroll max-h-screen">
        <div className="block w-full relative bg-transparent overflow-hidden">
          <div className="mt-8">
            <div className="bg-white mb-6">
              <h3 className="mb-4 text-xl font-bold">Создать новый заказ</h3>
              <form onSubmit={(event) => handleSubmit(event)}>
                <div className="grid grid-cols-6 gap-3">
                  <div className="col-span-6 mb-6 p-3 border rounded">
                    <h4 className="mb-4">Информация о клиенте</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-1">
                        <Input
                          name="client_name"
                          value={formValues.client_name}
                          onChange={handleInputChange}
                          label="Имя клиента"
                        />
                      </div>
                      <div className="col-span-1">
                        <Input
                          name="client_phone"
                          value={formValues.client_phone}
                          onChange={handleInputChange}
                          label="Телефон клиента"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          name="client_address"
                          value={formValues.client_address}
                          onChange={handleInputChange}
                          label="Адрес клиента"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 sm:col-span-3">
                    <div className="w-full mb-4">
                      <Select
                        label="Статус заказа"
                        value={valueStatus}
                        onChange={handleChange}
                      >
                        <Option value="Новый">Новый</Option>
                        <Option value="Принят">Принят</Option>
                        <Option value="Согласовано">Согласовано</Option>
                        <Option value="В работе">В работе</Option>
                        <Option value="Готов">Готов</Option>
                        <Option value="Отказ">Отказ</Option>
                      </Select>
                    </div>
                    <div className="w-full mb-4">
                      <Select
                        required
                        label="Тип ремонта"
                        value={value2}
                        onChange={handleChange2}
                      >
                        <Option value="Платный">Платный</Option>
                        <Option value="Гарантийный">Гарантийный</Option>
                        <Option value="Гарантия СЦ">Гарантия СЦ</Option>
                        <Option value="На продажу">На продажу</Option>
                      </Select>
                    </div>
                    <div className="w-full mb-4">
                      <Select
                        name="kind_of_repair"
                        label="Вид ремонта"
                        value={value3}
                        onChange={handleChange3}
                      >
                        <Option value="Выездной">Выездной</Option>
                        <Option value="Доставка">Доставка</Option>
                      </Select>
                    </div>
                    <div className="absolute">
                      <Input
                        name="order_status"
                        className="h-0"
                        variant="standard"
                        type={"hidden"}
                        value={valueStatus}
                      />
                      <Input
                        name="type_of_repair"
                        className="h-0"
                        variant="standard"
                        type={"hidden"}
                        value={value2}
                      />
                      <Input
                        name="kind_of_repair"
                        className="h-0"
                        variant="standard"
                        type={"hidden"}
                        value={value3}
                      />
                    </div>
                    <div className="w-full mb-4">
                      <Input
                        name="brand"
                        value={formValues.brand}
                        onChange={handleInputChange}
                        label="Производитель"
                        required
                      />
                    </div>
                    <div className="w-full mb-4">
                      <Input
                        name="model"
                        value={formValues.model}
                        onChange={handleInputChange}
                        label="Модель"
                        required
                      />
                    </div>
                    <div className="w-full mb-4">
                      <Input
                        name="model_code"
                        value={formValues.model_code}
                        onChange={handleInputChange}
                        label="Код модели"
                      />
                    </div>
                    <div className="w-full mb-4">
                      <Input
                        name="serial_number"
                        value={formValues.serial_number}
                        onChange={handleInputChange}
                        label="Сер. номер"
                        required
                      />
                    </div>
                    <div className="w-full mb-4">
                      <Input
                        name="alt_code"
                        value={formValues.alt_code}
                        onChange={handleInputChange}
                        label="Альтернативный номер"
                      />
                    </div>
                    <div className="w-full mb-4">
                      <Textarea
                        name="defect"
                        value={formValues.defect}
                        onChange={handleInputChange}
                        label="Неисправность"
                      />
                    </div>
                  </div>
                  <div className="col-span-3 sm:col-span-3">
                    <div className="w-full mb-4">
                      <Input
                        name="device"
                        value={formValues.device}
                        onChange={handleInputChange}
                        label="Тип устройства"
                        required
                      />
                    </div>
                    <div className="w-full mb-4">
                      <Input
                        name="defect_tag"
                        value={formValues.defect_tag}
                        onChange={handleInputChange}
                        label="Тэг дефекта"
                        required
                      />
                    </div>
                    {/* <div className="grid grid-cols-6 gap-3 mb-3">
                    <div className="col-span-6 sm:col-span-3">
                      <Checkbox
                        name="need_agreement"
                        success={data?.attributes.correct_info.need_agreement}
                        id="coordination"
                        label="Требуется согласование"
                        ripple={true}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <Checkbox
                        name="bank_transfer"
                        defaultChecked={
                          data?.attributes.correct_info.bank_transfer
                        }
                        id="seamless"
                        label="Безнал"
                        ripple={true}
                      />
                    </div> 
                  </div>*/}
                    <div className="w-full mb-4">
                      <Input
                        name="sold_date"
                        value={formValues.sold_date || "1823-01-01"}
                        onChange={handleInputChange}
                        type={"date"}
                        label="Дата продажи"
                      />
                    </div>
                    <div className="w-full mb-4">
                      <Input
                        name="sold_shop"
                        value={formValues.sold_shop}
                        onChange={handleInputChange}
                        label="Магазин"
                      />
                    </div>
                    <div className="w-full mb-4">
                      <Input
                        name="card_number"
                        value={formValues.card_number}
                        onChange={handleInputChange}
                        label="Номер карты"
                      />
                    </div>
                    <div className="w-full mb-1">
                      <Textarea
                        name="equipment"
                        value={formValues.equipment}
                        onChange={handleInputChange}
                        label="Комплектация"
                        size="lg"
                      />
                    </div>
                    <div className="w-full mb-4">
                      <Input
                        name="diagnostics_date"
                        value={formValues.diagnostics_date || "1823-01-01"}
                        onChange={handleInputChange}
                        type={"date"}
                        label="Дата диагностики"
                      />
                    </div>
                    <div className="w-full mb-4">
                      <Input
                        name="prepayment"
                        value={formValues.prepayment}
                        onChange={handleInputChange}
                        label="Предоплата"
                      />
                    </div>
                    <div className="w-full mb-4">
                      <Input
                        name="not_coordinate"
                        value={formValues.not_coordinate}
                        onChange={handleInputChange}
                        label="Не согласовывать до"
                      />
                    </div>
                  </div>
                </div>
                <Alert
                  variant="filled"
                  className={`${!showMessage && "hidden"} mb-5`}
                >
                  Изменения успешно сохранены
                </Alert>
                <div className="col-span-6 sm:col-full">
                  <Button type="submit">Сохранить</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateLead;
