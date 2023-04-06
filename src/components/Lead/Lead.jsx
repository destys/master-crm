import React from "react";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import CorrectInfo from "./EditLead";
import Tracking from "./Tracking";
import Actions from "./Actions";
import Attachments from "./Attachments";
import Parts from "./Parts";
import Estimate from "./Estimate";
import Telephony from "./Telephony";
import Chat from "./Chat";

const Lead = () => {
  const data = [
    {
      label: "Редактирование",
      value: "correct",
      component: <CorrectInfo />,
    },
    {
      label: "Трекинг",
      value: "tracking",
      component: <Tracking />,
    },
    {
      label: "Вложения",
      value: "attachments",
      component: <Attachments />,
    },
    {
      label: "Запчасти",
      value: "spare-parts",
      component: <Parts />,
    },
    {
      label: "Готовность",
      value: "readiness",
      component: <Estimate />,
    },
    {
      label: "Связь",
      value: "connection",
      component: <Telephony />,
    },
    {
      label: "Чат",
      value: "chat",
      component: <Chat />,
    },
  ];

  return (
    <div className="container px-5 mx-auto py-10 md:w-4/5 w-11/12 basis-3/4 overflow-hidden overflow-y-scroll max-h-screen">
      <div className="col-span-full mb-4">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Наряд №Z230124B-02
        </h1>
      </div>
      <Actions />
      <Tabs value="correct">
        <TabsHeader>
          {data.map(({ label, value, index }) => (
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
          {data.map(({ value, component }) => (
            <TabPanel key={value} value={value} className="p-0">
              {component}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default Lead;
