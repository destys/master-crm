import {
  Option,
  Select,
  Input,
  Textarea,
  Button,
  Alert,
} from "@material-tailwind/react";
import React, { useState } from "react";
import UseFetch from "../../../hooks/useFetch";
import axios from "axios";
import { getToken } from "../../../helpers";

const CorrectInfo = ({ id }) => {
  const { data, loading, error } = UseFetch(`/orders/${id}?populate=*`);

  const [valueStatus, setValueStatus] = useState(data?.attributes.order_status);
  const [value2, setValue2] = useState(false);
  const [value3, setValue3] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (event) => {
    const userToken = getToken();
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

    axios
      .put(
        `https://snurinoothe.beget.app/api/orders/${id}?populate=correct_info`,
        {
          data: {
            id: id,
            order_status: valueStatus,
            correct_info: newFormData[0],
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
        console.log(error);
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
      {error ? (
        error
      ) : loading ? (
        "Loading…"
      ) : (
        <div className="mt-8">
          <div className="bg-white mb-6">
            <h3 className="mb-4 text-xl font-bold">
              Редактирование информации о наряде
            </h3>
            <form onSubmit={(event) => handleSubmit(event)}>
              <div className="grid grid-cols-6 gap-3">
                <div className="col-span-6 sm:col-span-3">
                  <div className="w-full mb-4">
                    <Select
                      label="Статус заказа"
                      value={valueStatus || data?.attributes.order_status}
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
                      value={
                        value2 || data?.attributes.correct_info.type_of_repair
                      }
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
                      value={
                        value3 || data?.attributes.correct_info.kind_of_repair
                      }
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
                      value={valueStatus || data?.attributes.order_status}
                    />
                    <Input
                      name="type_of_repair"
                      className="h-0"
                      variant="standard"
                      type={"hidden"}
                      value={
                        value2 || data?.attributes.correct_info.type_of_repair
                      }
                    />
                    <Input
                      name="kind_of_repair"
                      className="h-0"
                      variant="standard"
                      type={"hidden"}
                      value={
                        value3 || data?.attributes.correct_info.kind_of_repair
                      }
                    />
                  </div>
                  <div className="w-full mb-4">
                    <Input
                      name="brand"
                      value={
                        formValues.brand || data?.attributes.correct_info.brand
                      }
                      onChange={handleInputChange}
                      label="Производитель"
                      required
                    />
                  </div>
                  <div className="w-full mb-4">
                    <Input
                      name="model"
                      value={
                        formValues.model !== ""
                          ? data?.attributes.correct_info.model
                          : ""
                      }
                      onChange={handleInputChange}
                      label="Модель"
                      required
                    />
                  </div>
                  <div className="w-full mb-4">
                    <Input
                      name="model_code"
                      value={
                        formValues.model_code ||
                        data?.attributes.correct_info.model_code
                      }
                      onChange={handleInputChange}
                      label="Код модели"
                    />
                  </div>
                  <div className="w-full mb-4">
                    <Input
                      name="serial_number"
                      value={
                        formValues.serial_number ||
                        data?.attributes.correct_info.serial_number
                      }
                      onChange={handleInputChange}
                      label="Сер. номер"
                      required
                    />
                  </div>
                  <div className="w-full mb-4">
                    <Input
                      name="alt_code"
                      value={
                        formValues.alt_code ||
                        data?.attributes.correct_info.alt_code
                      }
                      onChange={handleInputChange}
                      label="Альтернативный номер"
                    />
                  </div>
                  <div className="w-full mb-4">
                    <Textarea
                      name="defect"
                      value={
                        formValues.defect ||
                        data?.attributes.correct_info.defect
                      }
                      onChange={handleInputChange}
                      label="Неисправность"
                    />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <div className="w-full mb-4">
                    <Input
                      name="device"
                      value={
                        formValues.device ||
                        data?.attributes.correct_info.device
                      }
                      onChange={handleInputChange}
                      label="Тип устройства"
                      required
                    />
                  </div>
                  <div className="w-full mb-4">
                    <Input
                      name="defect_tag"
                      value={
                        formValues.defect_tag ||
                        data?.attributes.correct_info.defect_tag
                      }
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
                      value={
                        formValues.sold_date ||
                        data?.attributes.correct_info.sold_date ||
                        ""
                      }
                      onChange={handleInputChange}
                      type={"date"}
                      label="Дата продажи"
                    />
                  </div>
                  <div className="w-full mb-4">
                    <Input
                      name="sold_shop"
                      value={
                        formValues.sold_shop ||
                        data?.attributes.correct_info.sold_shop
                      }
                      onChange={handleInputChange}
                      label="Магазин"
                    />
                  </div>
                  <div className="w-full mb-4">
                    <Input
                      name="card_number"
                      value={
                        formValues.card_number ||
                        data?.attributes.correct_info.card_number
                      }
                      onChange={handleInputChange}
                      label="Номер карты"
                    />
                  </div>
                  <div className="w-full mb-1">
                    <Textarea
                      name="equipment"
                      value={
                        formValues.equipment ||
                        data?.attributes.correct_info.equipment
                      }
                      onChange={handleInputChange}
                      label="Комплектация"
                      size="lg"
                    />
                  </div>
                  <div className="w-full mb-4">
                    <Input
                      name="diagnostics_date"
                      value={
                        formValues.diagnostics_date ||
                        data?.attributes.correct_info.diagnostics_date
                      }
                      onChange={handleInputChange}
                      type={"date"}
                      label="Дата диагностики"
                    />
                  </div>
                  <div className="w-full mb-4">
                    <Input
                      name="prepayment"
                      value={
                        formValues.prepayment ||
                        data?.attributes.correct_info.prepayment
                      }
                      onChange={handleInputChange}
                      label="Предоплата"
                    />
                  </div>
                  <div className="w-full mb-4">
                    <Input
                      name="not_coordinate"
                      value={
                        formValues.not_coordinate ||
                        data?.attributes.correct_info.not_coordinate
                      }
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
      )}
    </>
  );
};

export default CorrectInfo;
