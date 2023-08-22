import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Signin/Login";
import Home from "./pages/Home/Home";
import { useSelector } from "react-redux";
import { selectUser } from "./store/user/user.reducer";

function App() {
  const user = useSelector(selectUser);
  return (
    <Routes>
      <Route index path="/" element={<Login />}></Route>
      <Route path="/home" element={<Home></Home>}></Route>
    </Routes>
  );
}

export default App;
