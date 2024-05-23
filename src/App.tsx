import React from "react";
import { Route, Routes } from "react-router-dom";

import Users from "./app/work/Users";
import Timesheets from "./app/work/Timesheets";

function App() {
  return (
    <div className="container mx-auto">
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/Work" element={<Users />} />
        <Route path="/Work/:pId" element={<Timesheets />} />
      </Routes>
    </div>
  );
}

export default App;
