import * as React from "react";
import { FC } from "react";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { fetchPopularMovies } from "../../store/movieData/movie.reducer";
import { CircularProgress } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { deepPurple } from "@mui/material/colors";
import {
  signInWithEmail,
  signInWithGooglePopup,
} from "../../utils/firebase.utils";
import {
  HomePageContainerProps,
  setPhotoURL,
  setUser,
  userResults,
} from "../../store/user/user.reducer";
import { useNavigate } from "react-router";
import GoogleIcon from "@mui/icons-material/Google";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { HTMLAttributes, FormEvent, MouseEvent } from "react";
import { getUsersWithFirebase } from "../../utils/firebase.utils";
import { DocumentData } from "firebase/firestore";

function Copyright(props: HTMLAttributes<HTMLElement>) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

type responseType = HomePageContainerProps & string;
type LoginProps = {
  user: userResults | null;
  photoURL: string;
};

const Login: FC<LoginProps> = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const distpatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const popularMovies = useAppSelector((state) => state.movie.popularMovies);
  const { results } = popularMovies;

  const [counter, setCounter] = useState(2);
  useEffect(() => {
    distpatch(fetchPopularMovies());
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const response: responseType = (await signInWithEmail(
      email,
      password
    )) as responseType;

    if (response === "FirebaseError: Firebase: Error (auth/user-not-found).") {
      alert("Böyle bir kullanıcı bulunamadı.");
    } else {
      distpatch(setUser(response));
      const { user } = response;
      setLoading(false);

      if (response && response.operationType === "signIn") {
        navigate("/home");
      } else {
        alert("Böyle bir kullanıcı bulunamadı.");
      }
    }
  };
  const handleSubmitGoogle = async (event: MouseEvent<HTMLButtonElement>) => {
    const response: responseType =
      (await signInWithGooglePopup()) as responseType;
    if (response === "Firebase: Error (auth/user-not-found).") {
      alert("Böyle bir kullanıcı bulunamadı.");
    } else {
      distpatch(setUser(response));
      if (response && response.operationType === "signIn") {
        setLoading(false);
        navigate("/home");
      } else {
        alert("Böyle bir kullanıcı bulunamadı.");
      }
    }
  };

  if (results === undefined || loading === true) {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    return (
      <div className="w-full h-[100vh] flex justify-center items-center bg-[#191919]">
        {loading ? <CircularProgress color="success" /> : null}
      </div>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          key={counter} // Bu satırı ekledik
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${results[counter].poster_path})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: "black",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backdropFilter: "blur(10px)",
            textShadow: "0px 0px 10px black",
          }}
          className={`flex w-full  transition-opacity duration-500 ease-in animate-waving-hand`}
        >
          <div className="w-[150%] h-full text-white font-extrabold flex items-end p-10 box-border">
            <div className="flex-col">
              <p className="border-b-2">{results[counter].original_title}</p>
              <p>{results[counter].release_date}</p>
              <p>{results[counter].vote_average} ✨</p>
            </div>
          </div>
          <div className="flex justify-end items-end p-3 h-full w-[100%] box-border">
            <ArrowBackIosIcon
              className="text-white cursor-pointer hover:scale-125"
              sx={{
                transition: " 0.3s ease-in-out",
              }}
              fontSize="large"
              onClick={(e) => {
                counter > 0 ? setCounter(counter - 1) : setCounter(2);
              }}
            ></ArrowBackIosIcon>
            <ArrowForwardIosIcon
              fontSize="large"
              className="text-white cursor-pointer  hover:scale-125"
              sx={{
                transition: " 0.3s ease-in-out",
              }}
              onClick={(e) => {
                setCounter(counter + 1);
              }}
            ></ArrowForwardIosIcon>
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          sx={{
            color: "#FEFEFE",
            backgroundColor: "#191919",
          }}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: deepPurple[500] }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              onSubmit={handleSubmit}
              noValidate
              component="form"
              autoComplete="off"
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                className="text-white bg-[#4D4B4B] border-white"
                label="Email Address"
                name="email"
                variant="filled"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-white bg-[#4D4B4B]"
                label="Password"
                type="password"
                variant="filled"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                className="text-white border-white"
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                data-testid="submit"
                sx={{ mt: 3, mb: 2, backgroundColor: "white", color: "black" }}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                onClick={handleSubmitGoogle}
                sx={{
                  mt: 3,
                  mb: 2,
                  border: "1px solid black",
                  padding: "15px",
                  color: "white",
                }}
              >
                <GoogleIcon /> Sign In With Google
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
