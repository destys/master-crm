import React, { useState } from "react";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import CorrectInfo from "./CorrectInfo";
import Tracking from "./Tracking";
import Actions from "./Actions";
import Attachments from "./Attachments";
import Parts from "./Parts";
import Estimate from "./Estimate";
import Telephony from "./Telephony";
import Chat from "./Chat";
import { useParams } from "react-router";
import UseFetch from "../../hooks/useFetch";
import { getToken } from "../../helpers";
import axios from "axios";

const Lead = () => {
  const leadId = parseInt(useParams().id);
  const [userId, setUserid] = useState(0);

  const { data, loading, error } = UseFetch(
    `/orders/${leadId}?populate=users_permissions_user`
  );
  console.log("data: ", data);

  const userToken = getToken();
  axios
    .get(`${process.env.REACT_APP_API_URL}/users/me`, {
      headers: {
        Authorization: "Bearer " + userToken,
      },
    })
    .then((response) => {
      setUserid(response.data.id);
    })
    .catch((error) => {
      console.log(error);
    });

  const tabs = [
    {
      label: "Редактирование",
      value: "correct",
      component: <CorrectInfo id={leadId} />,
    },
    {
      label: "Трекинг",
      value: "tracking",
      component: <Tracking id={leadId} />,
    },
    {
      label: "Вложения",
      value: "attachments",
      component: <Attachments id={leadId} />,
    },
    {
      label: "Запчасти",
      value: "spare-parts",
      component: <Parts id={leadId} />,
    },
    {
      label: "Готовность",
      value: "readiness",
      component: <Estimate id={leadId} />,
    },
    {
      label: "Связь",
      value: "connection",
      component: <Telephony id={leadId} />,
    },
    {
      label: "Чат",
      value: "chat",
      component: <Chat id={leadId} />,
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
          {data?.attributes.users_permissions_user.data.id === userId ? (
            <Actions />
          ) : (
            "У вас нет доступа к данному заказу"
          )}
          {data?.attributes.users_permissions_user.data.id === userId && (
            <Tabs value="correct">
              <TabsHeader>
                {tabs?.map(({ label, value, index }) => (
                  <Tab
                    key={value}
                    value={value}
                    className="text-gray-600"
                    active={index === 0 ? "active" : ""}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {tabs?.map(({ value, component }) => (
                  <TabPanel key={value} value={value} className="p-0">
                    {component}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          )}
        </div>
      )}
    </>
  );
};

export default Lead;
