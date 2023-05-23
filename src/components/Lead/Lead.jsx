import React, { useEffect, useState } from "react";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import CorrectInfo from "./CorrectInfo";
import Actions from "./Actions";
import Attachments from "./Attachments";
import Parts from "./Parts";
import Telephony from "./Telephony/Telephony";
import Chat from "./Chat";
import { useParams } from "react-router";
import UseFetch from "../../hooks/useFetch";
import { getToken } from "../../helpers";
import axios from "axios";
import Client from "./Client/Client";
import Master from "./Master/Master";

const Lead = () => {
  const leadId = parseInt(useParams().id);
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { data } = UseFetch(`/orders/${leadId}?populate=*`);

  useEffect(() => {
    const userToken = getToken();
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/me?populate=role`, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      })
      .then((response) => {
        setLoading(true);
        setUserId(response.data.id);
        setUserName(`${response.data?.name} ${response.data?.last_name}`);
        response.data.role.type === "admin"
          ? setIsAdmin(true)
          : setIsAdmin(false);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }, []);

  const tabs = [
    {
      label: "Редактирование",
      onlyAdmin: false,
      value: "correct",
      component: <CorrectInfo id={leadId} data={data} />,
    },
    {
      label: "Клиент",
      onlyAdmin: false,
      value: "client",
      component: <Client id={leadId} data={data} />,
    },
    {
      label: "Вложения",
      onlyAdmin: false,
      value: "attachments",
      component: <Attachments id={leadId} data={data} />,
    },
    {
      label: "Запчасти",
      onlyAdmin: false,
      value: "spare-parts",
      component: <Parts id={leadId} data={data} />,
    },
    {
      label: "Связь",
      onlyAdmin: false,
      value: "connection",
      component: <Telephony id={leadId} data={data} />,
    },
    {
      label: "Чат",
      onlyAdmin: false,
      value: "chat",
      component: <Chat id={leadId} />,
    },
    {
      label: "Мастер",
      onlyAdmin: true,
      value: "master",
      component: <Master id={leadId} isAdmin={isAdmin} />,
    },
  ];

  return (
    <>
      {error ? (
        error
      ) : loading ? (
        "Loading…"
      ) : (
        <div className="container px-5 mx-auto py-10 md:w-4/5 w-11/12 basis-3/4 overflow-hidden overflow-y-scroll max-h-screen">
          <div className="col-span-full mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Наряд №{data?.attributes.order_number}
            </h1>
          </div>
          {data?.attributes.users_permissions_user?.data?.id === userId ||
          isAdmin ? (
            <Actions
              client={data?.attributes.client}
              leadId={leadId}
              userName={userName}
              lead={data}
            />
          ) : (
            "У вас нет доступа к данному заказу"
          )}
          {data?.attributes.users_permissions_user?.data?.id === userId ||
          isAdmin ? (
            <Tabs value="correct">
              <TabsHeader>
                {tabs?.map(({ label, value, index, onlyAdmin }) =>
                  isAdmin || !onlyAdmin ? (
                    <Tab
                      key={value}
                      value={value}
                      className="text-gray-600"
                      active={index === 0 ? "active" : ""}
                    >
                      {label}
                    </Tab>
                  ) : (
                    ""
                  )
                )}
              </TabsHeader>
              <TabsBody>
                {tabs?.map(({ value, component, onlyAdmin }) =>
                  isAdmin || !onlyAdmin ? (
                    <TabPanel key={value} value={value} className="p-0">
                      {component}
                    </TabPanel>
                  ) : (
                    ""
                  )
                )}
              </TabsBody>
            </Tabs>
          ) : (
            "У вас нет доступа к данному заказу. Пожалуйста, обратитесь к администратору"
          )}
        </div>
      )}
    </>
  );
};

export default Lead;
