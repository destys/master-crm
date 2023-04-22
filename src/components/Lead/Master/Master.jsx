import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { getToken } from "../../../helpers";
import { Alert, Button, Radio } from "@material-tailwind/react";

const Master = ({ isAdmin, id }) => {
  const userToken = getToken();
  const [allMasters, setAllMasters] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      })
      .then((response) => {
        setAllMasters(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userToken]);

  const setMaster = (e) => {
    e.preventDefault();
    let enterId = null;
    e.target.querySelectorAll("input[name=master]").forEach((item) => {
      if (item.checked) {
        enterId = item.dataset.id;
      }
    });
    console.log("enterId: ", enterId);

    if (enterId !== null) {
      axios
        .put(`https://snurinoothe.beget.app/api/orders/${id}`, {
          headers: {
            Authorization: "Bearer " + userToken,
          },
          data: {
            users_permissions_user: {
              id: enterId,
            },
          },
        })
        .then((response) => {
          console.log("response: ", response);
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 3000); // выводим ответ сервера в консоль
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="mt-8">
        <div className="bg-white mb-6">
          <h3 className="mb-4 text-xl font-bold">Назначить ответственного</h3>
          {isAdmin ? (
            <form onSubmit={setMaster}>
              <div className="mb-4 grid grid-cols-4 gap-3">
                {allMasters?.map((item) => (
                  <Radio
                    key={item.id}
                    id={item.id}
                    data-id={item.id}
                    name="master"
                    label={`${item.name} ${item.last_name}`}
                    value={`${item.name} ${item.last_name}`}
                  />
                ))}
              </div>
              <Alert
                variant="filled"
                className={`${!showMessage && "hidden"} mt-5`}
              >
                Изменения успешно сохранены
              </Alert>
              <Button type="submit">Сохранить</Button>
            </form>
          ) : (
            "У вас нет доступа к этому разделу"
          )}
        </div>
      </div>
    </>
  );
};

export default Master;
