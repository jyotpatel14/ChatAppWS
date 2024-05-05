import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./screens/Landing";



const root = createRoot(document.getElementById("root"));

root.render(

);

function App() {
  return (
    <>
      {/* <BrowserRouter basename="/app">
        <Routes>
          <Route path="/home" element={<Landing />}/>
        </Routes>
      </BrowserRouter> */}
      <Landing />
    </>
  );
}

export default App;
