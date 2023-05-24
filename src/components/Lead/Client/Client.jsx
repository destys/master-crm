import { Alert, Button, Input } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getToken } from "../../../helpers";
import { Link } from "react-router-dom";

const Client = ({ id }) => {
  const userToken = getToken();
  const [client, setClient] = useState(null);
  const [formData, setFormData] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [formValues, setFormValues] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const newFormData = [...formData]; // создаем копию массива данных формы
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
    setFormData(newFormData); // обновляем состояние компонента с новым массивом данных формы

    if (client !== null) {
      axios
        .put(`https://snurinoothe.beget.app/api/clients/${client.id}`, {
          headers: {
            Authorization: "Bearer " + userToken,
          },
          data: {
            id: client.id,
            name: formValues.name,
            phone: formValues.phone,
            address: formValues.address,
          },
        })
        .then((response) => {
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 3000); // выводим ответ сервера в консоль
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(
          `https://snurinoothe.beget.app/api/clients?poplate=orders`,
          {
            data: {
              name: formValues.name,
              phone: formValues.phone,
              address: formValues.address,
              orders: id,
            },
          },
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        )
        .then((response) => {
          console.log(userToken);
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 3000); // выводим ответ сервера в консоль
        })
        .catch((error) => {
          console.log(userToken);
          console.log(error);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`https://snurinoothe.beget.app/api/orders/${id}?populate=*`, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      })
      .then((response) => {
        setClient(response.data.data.attributes.client.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userToken, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const formatedPhone = client?.attributes.phone.replace(/\D/g, "").replace(/^./g, '7');

  return (
    <div className="mt-8">
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-1">
            <Input
              label="Имя"
              name="name"
              defaultValue={client?.attributes.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-1">
            <Input
              label="Телефон"
              name="phone"
              defaultValue={client?.attributes.phone}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div className="col-span-2">
            <Input
              label="Адрес"
              name="address"
              defaultValue={client?.attributes.address}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex gap-5 mt-5 mb-5">
          <Button>
            <Link to={`https://wa.me/${formatedPhone}`} target="_blank">
              WhatsApp
            </Link>
          </Button>
          <Button>
            <Link to={`https://t.me/+${formatedPhone}`} target="_blank">
              Telegram
            </Link>
          </Button>
          <Button>
            <Link to={`viber://chat?number=${formatedPhone}`} target="_blank">
              Viber
            </Link>
          </Button>
        </div>

        <Alert variant="filled" className={`${!showMessage && "hidden"} mt-5`}>
          Изменения успешно сохранены
        </Alert>
        <Button type="submit" className="mt-6">
          Сохранить
        </Button>
      </form>
    </div>
  );
};

export default Client;
