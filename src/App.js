import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Signin/Login";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Login />}></Route>
      <Route path="/home" element={<Home></Home>}></Route>
    </Routes>
  );
}

export default App;
