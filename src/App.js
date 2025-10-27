import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Header from "./components/Header";
// import Footer from "./components/Footer";
import FunctionPage from "./FunctionPage";
import SecPage from "./SecPage";
import testPage from "./testPage";
import "./App.css";
function App() {
  return (
    <>
      {/* <Header userInfo={userInfo} setUserInfo={setUserInfo} /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FunctionPage />} />
          <Route path="/aaa" element={<testPage />} />
          <Route path="/bbb" element={<SecPage />} />
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </>
  );
}

export default App;
