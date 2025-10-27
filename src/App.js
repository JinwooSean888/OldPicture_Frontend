import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import FunctionPage from "./FunctionPage";
import SecPage from "./SecPage";
import testPage from "./testPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/function" element={<FunctionPage />} />
        <Route path="/aaa" element={<testPage />} />
        <Route path="/bbb" element={<SecPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
