import React, { useEffect, useState } from "react";
import LeadItemRow from "../../components/Lead/LeadItemRow";

import axios from "axios";
import { getToken } from "../../helpers";
import { Input } from "@material-tailwind/react";

const NewOrders = ({ isAdmin, userId }) => {
  const userToken = getToken();
  const [leads, setLeads] = useState([]);
  /* const [meta, setMeta] = useState([]); */
  const [error, setError] = useState("");

  useEffect(() => {
    const queryParams =
      "/orders?pagination[pageSize]=2000&populate=*&sort=order_number:desc" +
      (isAdmin ? "" : `&filters[users_permissions_user][id]=${userId}`) +
      `&filters[order_status]=${"Новый"}`;

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
  }, [userToken, isAdmin, userId]);
  const searchLeads = (e) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/orders?populate=*&filters[$or][0][order_number][$contains]=${e.target.value}&filters[$or][1][client][phone][$contains]=${e.target.value}`,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      )
      .then((response) => {
        setLeads(response.data.data);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  };

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
                  <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                    <Input label="Поиск" onChange={searchLeads} />
                  </div>
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
                      {error !== "" ? (
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
