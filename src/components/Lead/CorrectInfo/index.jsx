import {
  Option,
  Select,
  Input,
  Textarea,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import React, { useState } from "react";
import UseFetch from "../../../hooks/useFetch";

const CorrectInfo = ({ id }) => {
  const { data, loading, error } = UseFetch(`/orders/${id}?populate=*`);
  const [selectedOption, setSelectedOption] = useState(0);

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
            <form action="#">
              <div className="grid grid-cols-6 gap-3">
                <div className="col-span-6 sm:col-span-3">
                  <div className="w-full mb-4">
                    <Select
                      label="Площадка"
                      value={data?.attributes.correct_info.order_place}
                    >
                      <Option>Выездная</Option>
                    </Select>
                  </div>
                  <div className="w-full mb-4">
                    <Select
                      label="Тип ремонта"
                      variant={data?.attributes.correct_info.type_of_repair}
                    >
                      <Option>Платный</Option>
                      <Option>Гарантийный</Option>
                      <Option>Гарантия СЦ</Option>
                      <Option>На продажу</Option>
                    </Select>
                  </div>
                  <div className="w-full mb-4">
                    <Select
                      label="Вид ремонта"
                      value={data?.attributes.correct_info.kind_of_repair}
                    >
                      <Option>Выездной</Option>
                      <Option>Платный</Option>
                      <Option>Платный</Option>
                      <Option>Платный</Option>
                      <Option>Платный</Option>
                    </Select>
                  </div>
                  <div className="w-full mb-4">
                    <Input label="Производитель" required />
                  </div>
                  <div className="w-full mb-4">
                    <Input label="Модель" required />
                  </div>
                  <div className="w-full mb-4">
                    <Input label="Код модели" />
                  </div>
                  <div className="w-full mb-4">
                    <Input label="Сер. номер" required />
                  </div>
                  <div className="w-full mb-4">
                    <Input label="Альтернативный номер" />
                  </div>
                  <div className="w-full mb-4">
                    <Textarea label="Неисправность" />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <div className="w-full mb-4">
                    <Input label="Тэг дефекта" required />
                  </div>
                  <div className="grid grid-cols-6 gap-3 mb-3">
                    <div className="col-span-6 sm:col-span-3">
                      <Checkbox
                        id="coordination"
                        label="Требуется согласование"
                        ripple={true}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <Checkbox id="seamless" label="Безнал" ripple={true} />
                    </div>
                  </div>
                  <div className="w-full mb-4">
                    <Input type={"date"} label="Дата продажи" />
                  </div>
                  <div className="w-full mb-4">
                    <Input label="Магазин" />
                  </div>
                  <div className="w-full mb-4">
                    <Input label="Номер карты" />
                  </div>
                  <div className="w-full mb-1">
                    <Textarea label="Комплектация" size="lg" />
                  </div>
                  <div className="w-full mb-4">
                    <Input type={"date"} label="Дата диагностики" />
                  </div>
                  <div className="w-full mb-4">
                    <Input label="Предоплата" />
                  </div>
                  <div className="w-full mb-4">
                    <Input label="Не согласовывать до" />
                  </div>
                </div>
              </div>
              <div className="col-span-6 sm:col-full">
                <Button>Сохранить</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CorrectInfo;
