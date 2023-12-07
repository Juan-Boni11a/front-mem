import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  currentUserAtom,
  isLoadingGeneralAtom,
} from "../../state/atoms/generalAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Loading from "../../commons/Loading";

function getHashQueryStringParam(paramName) {
  const params = new URLSearchParams(window.location.hash.substring(1));
  return params.get(paramName);
}

function AutoLoginCheck() {
  const navigate = useNavigate();

  const isLoading = useRecoilValue(isLoadingGeneralAtom);
  const setCurrentUser = useSetRecoilState(currentUserAtom);
  const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);

  useEffect(() => {
    const loadInitialData = async () => {
      /*
      TODO: corregir nombre de aplicación o buscar parametros en backend
      */
      sessionStorage.setItem("logo-header", "/gobiernoWhite.svg");
      sessionStorage.setItem("logo-footer", "/inversion.svg");
      sessionStorage.setItem("main-home", "/gobiernoColor.svg");
      sessionStorage.setItem("secondary-home", "/masInversionBlue.svg");
      sessionStorage.setItem(
          "message-home",
          "Bienvenid@ a (nombre de aplicación)"
        );
      sessionStorage.setItem(
          "platform-name",
          "(Nombre de aplicación)"
        );
      
      sessionStorage.setItem("file-size", 10000);
      sessionStorage.setItem("certificate-logo", "/certificadoLogo.png");
    };

    setIsLoading(true);
    loadInitialData()
      .then()
      .finally((_) => {
        setIsLoading(false);

        const token = getHashQueryStringParam("access_token");
        const refreshToken = getHashQueryStringParam("refresh_token");
        if (token) {
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("refresh-token", refreshToken);

          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          axios.defaults.headers.common["RefreshToken"] = refreshToken;

          /*
          TODO: obtener información de usuario
          getMyInfo()
            .then((data) => {
              const roles = data.roles.map((r) => r.normalizedName);

              getPermissionsByUserRols({
                rolesNames: roles,
              })
                .then((permissions) => {
                  let userData = { ...data };
                  userData.rolesPermissions = permissions;

                  setCurrentUser(userData);
                })
                .finally((_) => {
                  navigate("/");
                });
            });
          */
        }
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div>{isLoading ? <Loading /> : <></>}</div>;
}

export default AutoLoginCheck;
