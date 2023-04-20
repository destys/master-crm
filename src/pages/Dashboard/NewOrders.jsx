import React, { useEffect, useState } from "react";
import LeadItemRow from "../../components/Lead/LeadItemRow";

import axios from "axios";
import { getToken } from "../../helpers";

const NewOrders = () => {
  const userToken = getToken();
  const [userId, setUserid] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [leads, setLeads] = useState([]);
  /* const [meta, setMeta] = useState([]); */
  const [error, setError] = useState("");

  const queryParams =
    "/orders?pagination[pageSize]=2000&populate=*&sort=order_number:desc" +
    (isAdmin ? "" : `&filters[users_permissions_user][id]=${userId}`) +
    `&filters[order_status]=${"Новый"}`;

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + queryParams, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      })
      .then((response) => {
        setLeads(response.data.data);
        /* setMeta(response.data.meta); */
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }, [queryParams, userToken]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/me?populate=role`, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      })
      .then((response) => {
        console.log("responseUser: ", response.data.role.type);
        response.data.role.type === "admin"
          ? setIsAdmin(true)
          : setIsAdmin(false);

        setUserid(response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userToken]);

  return (
    <>
      {error ? (
        error
      ) : (
        <div className="px-5 mx-auto py-10 md:w-4/5 w-11/12 basis-3/4 overscroll-contain max-h-screen">
          <div className="w-full h-full rounded ">
            <div className="w-full">
              <div className="px-4 py-0 md:py-7">
                <div className="flex items-center justify-between">
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                    Наряды
                  </p>
                  {/* <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                    <p>Сортировать по:</p>
                    <select className="focus:outline-none bg-transparent ml-1">
                      <option className="text-sm text-indigo-800">
                        Сначала новые
                      </option>
                      <option className="text-sm text-indigo-800">
                        Сначала старые
                      </option>
                      <option className="text-sm text-indigo-800">
                        Просроченные
                      </option>
                    </select>
                  </div> */}
                </div>
              </div>
              <div className="bg-white">
                <div className="mt-7 overflow-x-auto">
                  <table className="w-full whitespace-nowrap">
                    <thead>
                      <tr className="rounded-t-md border border-gray-100 border-b-0">
                        <td className="pl-5 py-3">
                          <p className="text-sm leading-none text-gray-600 ml-2">
                            Номер наряда
                          </p>
                        </td>
                        <td className="pl-5 py-3">
                          <p className="text-sm leading-none text-gray-600 ml-2">
                            Статус
                          </p>
                        </td>
                        <td className="pl-5 py-3">
                          <p className="text-sm leading-none text-gray-600 ml-2">
                            Место
                          </p>
                        </td>
                        <td className="pl-5 py-3">
                          <p className="text-sm leading-none text-gray-600 ml-2">
                            Об устройстве
                          </p>
                        </td>
                        <td className="pl-5 py-3">
                          <p className="text-sm leading-none text-gray-600 ml-2">
                            Мастер
                          </p>
                        </td>
                        <td className="pl-5 py-3">
                          <p className="text-sm leading-none text-gray-600 ml-2">
                            Телефон клиента
                          </p>
                        </td>
                        <td className="pl-5 py-3"></td>
                      </tr>
                    </thead>
                    <tbody>
                      {error ? (
                        <tr>
                          <td>error</td>
                        </tr>
                      ) : (
                        leads?.map((item) => (
                          <LeadItemRow key={item.id} id={item.id} item={item} />
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewOrders;
