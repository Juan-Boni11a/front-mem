import "./App.css";
import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

import { useSetRecoilState } from "recoil";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Home from "./commons/Home";
import AutoLoginCheck from "./components/auth/AutoLoginCheck";
import PrivateRouteRedirect from "./auth/PrivateRouteRedirect";
import Bye from "./commons/Bye";

import axios from "axios";

import { errorMessageAtom } from "./state/atoms/generalAtom";
import Test from "./components/test/Test";
import AllNews from "./components/Hemeroteca/AllNews";
import AllMaintenance from "./components/Transport/maintenance/AllMaintenance";
import AllMovilization from "./components/Transport/movilization/AllMovilization";
import AllSupply from "./components/Transport/supply/AllSupply";
import AllTransportation from "./components/Transport/transportation/AllTransportation";
import Hello from "./commons/Hello";


const redirectNotAuth = () => {
  const redirectUrl = process.env.REACT_APP_IDENTITY_REDIRECT;
  const nounce = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substring(0, 10);
  sessionStorage.setItem("token", "");
  window.location.replace(redirectUrl + nounce);
};

function App() {
  const setErrorMessage = useSetRecoilState(errorMessageAtom);

  useEffect(() => {
    const errorInterceptor = axios.interceptors.response.use(
      (response) => {
        if (response.status === 401) {
          redirectNotAuth();
          return;
        }

        if (response.headers["refresh-token"]) {
          const refreshToken = response.headers["refresh-token"];
          const newToken = response.headers["updated-token"];

          sessionStorage.setItem("token", newToken);
          sessionStorage.setItem("refresh-token", refreshToken);

          axios.defaults.headers.common["Authorization"] = "Bearer " + newToken;
          axios.defaults.headers.common["RefreshToken"] = refreshToken;
        }

        return response;
      },
      (error) => {
        if (
          (error.response && error.response.status === 401) ||
          (error.response && error.response.status === 403)
        ) {
          redirectNotAuth();
          return;
        } else if (error.response && error.response.status === 400) {
          setErrorMessage(error?.response?.data?.messageResult);
        } else if (error.code === "ERR_NETWORK") {
          setErrorMessage(
            "Tenemos problemas conectandonos al servidor, por favor vuelva a intentar en unos minutos o comuníquese con el servicio de ayuda"
          );
        }

        return Promise.reject(error);
      }
    );

    return () => {
      if (errorInterceptor) {
        axios.interceptors.request.eject(errorInterceptor);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRouteRedirect routeName="home">
                <Home />
              </PrivateRouteRedirect>
            }
          />
          <Route exact path="/login" element={<Hello />} />
          <Route exact path="/logout" element={<Bye />} />
          <Route exact path="/signin-oidc" element={<AutoLoginCheck />} />
        

          <Route
            exact path="/maintenance"
            element={
              <PrivateRouteRedirect
                routeName="maintenance"
                allowedRoles={["test"]}
              >
                <AllMaintenance />
              </PrivateRouteRedirect>
            }
          />

<Route
            exact path="/movilization"
            element={
              <PrivateRouteRedirect
                routeName="movilization"
                allowedRoles={["test"]}
              >
                <AllMovilization />
              </PrivateRouteRedirect>
            }
          />


<Route
            exact path="/supply"
            element={
              <PrivateRouteRedirect
                routeName="supply"
                allowedRoles={["test"]}
              >
                <AllSupply />
              </PrivateRouteRedirect>
            }
          />

<Route
            exact path="/transportation"
            element={
              <PrivateRouteRedirect
                routeName="supply"
                allowedRoles={["test"]}
              >
                <AllTransportation />
              </PrivateRouteRedirect>
            }
          />


<Route
            exact path="/hemeroteca"
            element={
              <PrivateRouteRedirect
                routeName="hemeroteca"
                allowedRoles={["test"]}
              >
                <AllNews />
              </PrivateRouteRedirect>
            }
          />

         
          
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
