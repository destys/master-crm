import React, { useEffect, useState } from "react";
import Login from "./pages/Login/Login";
import { Route, Routes } from "react-router";

import { getToken } from "./helpers";

import Dashboard from "./pages/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import CreateLead from "./components/CreateLead/CreateLead";
import Lead from "./components/Lead/Lead";
import Clients from "./pages/Clients/Clients";
import NewOrders from "./pages/Dashboard/NewOrders";
import axios from "axios";
import Telephony from "./pages/Telephony/Telephony";

function App() {
  const userToken = getToken();
  const [isLogged, setIsLogged] = useState(false);
  const [userId, setUserid] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

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
              element={<Dashboard isAdmin={isAdmin} userId={userId} />}
            />
            <Route
              path="/dashboard"
              element={<Dashboard isAdmin={isAdmin} userId={userId} />}
            />
            <Route
              path="/new"
              element={<NewOrders isAdmin={isAdmin} userId={userId} />}
            />
            <Route path="/clients" element={<Clients />} />
            <Route path="/telephony" element={<Telephony />} />
            <Route path="/createlead" element={<CreateLead />} />
            <Route path="/lead/:id" element={<Lead />} />
          </Routes>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
