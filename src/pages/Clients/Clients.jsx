import axios from "axios";
import React, { useEffect, useState } from "react";
import { getToken } from "../../helpers";
import ClientsItemRow from "../../components/Clients/ClientsItemRow";

const Clients = () => {
  const userToken = getToken();
  const [isAdmin, setIsAdmin] = useState(false);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/me?populate=role`, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      })
      .then((response) => {
        response.data.role.type === "admin"
          ? setIsAdmin(true)
          : setIsAdmin(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userToken]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/clients`, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      })
      .then((response) => {
        setClients(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userToken]);

  return (
    <>
      <div className="px-5 mx-auto py-10 md:w-4/5 w-11/12 basis-3/4 overscroll-contain max-h-screen">
        <div className="w-full h-full rounded ">
          <div className="w-full">
            <div className="px-4 py-0 md:py-7">
              <div className="flex items-center justify-between">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                  Клиенты
                </p>
              </div>
            </div>
            <div className="bg-white">
              <div className="mt-7 overflow-x-auto">
                {isAdmin ? (
                  <table className="w-full whitespace-nowrap">
                    <thead>
                      <tr className="rounded-t-md border border-gray-100 border-b-0">
                        <td className="pl-5 py-3">
                          <p className="text-sm leading-none text-gray-600 ml-2">
                            ФИО
                          </p>
                        </td>
                        <td className="pl-5 py-3">
                          <p className="text-sm leading-none text-gray-600 ml-2">
                            Телефон
                          </p>
                        </td>
                        <td className="pl-5 py-3">
                          <p className="text-sm leading-none text-gray-600 ml-2">
                            Адрес
                          </p>
                        </td>
                        <td className="pl-5 py-3"></td>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((item) => (
                        <ClientsItemRow
                          key={item.id}
                          id={item.id}
                          item={item}
                        />
                      ))}
                    </tbody>
                  </table>
                ) : (
                  "У вас нет доступа к этом разделу"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clients;
