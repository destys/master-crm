import React, { useEffect, useState } from "react";
import Login from "./pages/Login/Login";
import { Route, Routes } from "react-router";

import { getToken } from "./helpers";

import Dashboard from "./pages/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import CreateLead from "./components/CreateLead/CreateLead";
import Lead from "./components/Lead/Lead";
import Clients from "./pages/Clients/Clients";
import Phone from "./pages/Phone/Phone";
import NewOrders from "./pages/Dashboard/NewOrders";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    getToken() ? setIsLogged(true) : setIsLogged(false);
  }, [isLogged]);
  return (
    <>
      {isLogged ? (
        <div className="flex flex-no-wrap min-h-screen">
          <Sidebar />
          <div className="w-80 min-w-[320px] hidden sm:block"></div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new" element={<NewOrders />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/telephony" element={<Phone />} />
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
