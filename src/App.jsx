import React, { useEffect, useState } from "react";
import Login from "./pages/Login/Login";
import { Route, Routes } from "react-router";

import { getToken } from "./helpers";

import Dashboard from "./pages/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import CreateLead from "./components/CreateLead/CreateLead";
import Lead from "./components/Lead/Lead";

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
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
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
