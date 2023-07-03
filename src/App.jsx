import React, { useEffect, useState } from "react";
import Login from "./pages/Login/Login";
import { Route, Routes } from "react-router";

import { getToken } from "./helpers";

import Dashboard from "./pages/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import CreateLead from "./components/CreateLead/CreateLead";
import Lead from "./components/Lead/Lead";
import Clients from "./pages/Clients/Clients";
import axios from "axios";

function App() {
  const userToken = getToken();
  const [isLogged, setIsLogged] = useState(false);
  const [userId, setUserid] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/me?populate=role`, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      })
      .then((response) => {
        console.log("response: ", response);
        setUserBalance(response.data.balance);
        setUserName(response.data.name + " " + response.data.last_name);

        response.data?.role?.type === "admin"
          ? setIsAdmin(true)
          : setIsAdmin(false);

        setIsLogged(true);
        setUserid(response.data.id);
      })
      .catch((error) => {
        setIsLogged(false);
        console.log(error);
      });
  }, [isLogged, userToken]);

  return (
    <>
      {isLogged ? (
        <div className="flex flex-no-wrap min-h-screen">
          <Sidebar isAdmin={isAdmin} />
          <div className="w-80 min-w-[320px] hidden sm:block"></div>
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  isAdmin={isAdmin}
                  userId={userId}
                  userBalance={userBalance}
                  filterRow="[0][order_status][$ne]=Готов[1][order_status][$ne]=Отказ"
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  isAdmin={isAdmin}
                  userId={userId}
                  userBalance={userBalance}
                  filterRow="[0][order_status][$ne]=Готов[1][order_status][$ne]=Отказ"
                />
              }
            />
            <Route
              path="/new"
              element={
                <Dashboard
                  isAdmin={isAdmin}
                  userId={userId}
                  userBalance={userBalance}
                  filterRow="[0][order_status][$eq]=Новый"
                />
              }
            />
            <Route
              path="/check"
              element={
                <Dashboard
                  isAdmin={isAdmin}
                  userId={userId}
                  userBalance={userBalance}
                  filterRow="[0][order_status][$eq]=Выдан"
                />
              }
            />
            <Route path="/clients" element={<Clients />} />
            {/* <Route path="/telephony" element={<Telephony />} /> */}
            <Route path="/createlead" element={<CreateLead />} />
            <Route
              path="/lead/:id"
              element={
                <Lead isAdmin={isAdmin} userId={userId} userName={userName} />
              }
            />
          </Routes>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
