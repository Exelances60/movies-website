import { Route, Routes, useParams } from "react-router-dom";
import "./App.css";
import Login from "./pages/Signin/Login";
import Home from "./pages/Home/Home";
import Movie from "./pages/Movie/Movie";
import MoviesAll from "./pages/MoviesAll/MoviesAll";
import TvSeries from "./pages/TvSeries/TvSeries";

function App() {
  let { id } = useParams();

  return (
    <Routes>
      <Route index path="/" element={<Login />}></Route>
      <Route path="/home" element={<Home></Home>}></Route>
      <Route path="/Movie/:id" element={<Movie></Movie>}></Route>
      <Route path="/moviesAll" element={<MoviesAll></MoviesAll>}></Route>
      <Route path="/tvSeries" element={<TvSeries></TvSeries>}></Route>
    </Routes>
  );
}

export default App;
