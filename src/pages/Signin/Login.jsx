import * as React from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPopularMovies,
  selectPopularMovie,
} from "../../store/movieData/movie.reducer";
import { CircularProgress } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { deepPurple } from "@mui/material/colors";
import { signInWithEmail } from "../../utils/firebase.utils";
import { selectUser, setUser } from "../../store/user/user.reducer";
import { useNavigate } from "react-router";

function Copyright(props) {
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

export default function Login() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const distpatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const popularMovies = useSelector(selectPopularMovie);
  const { results } = popularMovies;

  const [counter, setCounter] = useState(2);
  useEffect(() => {
    distpatch(fetchPopularMovies());
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const response = await signInWithEmail(email, password);
    if (response === "Firebase: Error (auth/user-not-found).") {
      alert("Böyle bir kullanıcı bulunamadı.");
    } else {
      distpatch(setUser(response));
      if (response && response.operationType === "signIn") {
        navigate("/home");
      } else {
        alert("Böyle bir kullanıcı bulunamadı.");
      }
    }
  };

  if (results === undefined) {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    return <div>{loading ? <CircularProgress /> : null}</div>;
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
          }}
          className={`flex  transition-opacity duration-500 ease-in animate-waving-hand `}
        >
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
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, color: "#FEFEFE" }}
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
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
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
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
