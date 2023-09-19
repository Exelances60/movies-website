import { Route, Routes, useParams } from "react-router-dom";
import "./App.css";
import { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";
const Login = lazy(() => import("./pages/Signin/Login"));
const Home = lazy(() => import("./pages/Home/Home"));
const Movie = lazy(() => import("./pages/Movie/Movie"));
const MoviesAll = lazy(() => import("./pages/MoviesAll/MoviesAll"));
const TvSeries = lazy(() => import("./pages/TvSeries/TvSeries"));
const Profil = lazy(() => import("./pages/Profile/Profil"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
function App() {
  let { id } = useParams();

  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-[#191919]">
          <CircularProgress></CircularProgress>
        </div>
      }
    >
      <Routes>
        <Route index path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/Movie/:id" element={<Movie></Movie>}></Route>
        <Route path="/moviesAll" element={<MoviesAll></MoviesAll>}></Route>
        <Route path="/tvSeries" element={<TvSeries></TvSeries>}></Route>
        <Route path="/profile" element={<Profil></Profil>}></Route>
        <Route path="/signUp" element={<SignUp></SignUp>}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
