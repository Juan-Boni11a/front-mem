import React, { useState, useEffect } from "react";
import { currentUserAtom } from "../state/atoms/generalAtom";

import { useRecoilState } from "recoil";
import axios from "axios";
import Loading from "../commons/Loading";

const redirectUrl = process.env.REACT_APP_IDENTITY_REDIRECT;

function PrivateRouteRedirect({ children, allowedRoles, routeName }) {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  const [passValidation, setPassValidation] = useState({
    isLoading: false,
    valid: false,
  });

  useEffect(() => {
    const redirectToLogin = () => {
      const nounce = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 10);
      sessionStorage.setItem("token", "");
      window.location.replace(
        redirectUrl + nounce
      );
    };

    const checkAuth = async () => {

      /*
      TODO: Eliminar cuando se tenga funcionalidad de sso
      */
      if(true){
        loadDummy();
        setPassValidation({
          isLoading: false,
          valid: true,
        });
        return;
      }

      const token = sessionStorage.getItem("token");
      const refreshToken = sessionStorage.getItem("refresh-token");

      if (!token) {
        setPassValidation({
          isLoading: false,
          valid: false,
        });

        redirectToLogin();

        return;
      }

      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.common["RefreshToken"] = refreshToken;

      if (!currentUser) {
        try {
          const data = [];
          const permissions = [];
          const userData = { ...data };
          /*
          TODO: buscar permisos en backend u obtener del usuario logueado
          const data = await getMyInfo();

          const roles = data.roles.map(r => r.normalizedName);
          const permissions = await getPermissionsByUserRols({
            rolesNames: roles
          });
          */

          userData.rolesPermissions = permissions;

          setCurrentUser(userData);
          if (checkRoles(userData)) {
            setPassValidation({
              isLoading: false,
              valid: true,
            });
          } else {
            redirectToLogin();
          }
        } catch (ex) {
          redirectToLogin();
        }
      } else {
        if (checkRoles(currentUser)) {
          setPassValidation({
            isLoading: false,
            valid: true,
          });
        } else {
          redirectToLogin();
        }
      }
    };

    const checkRoles = (userData) => {
      if (!userData) return false;
      if (!allowedRoles) return true;

      const allRoles = userData.rolesPermissions;

      for (let rol of allRoles) {
        for (let permission of rol.permissions) {
          if (allowedRoles.includes(permission)) return true;
        }
      }

      return false;
    };

    /*
    TODO: solo para desarrollo, agregar menu nuevo hasta
    que se tenga la funcionalidad de sso
    */
    const loadDummy = () => {
      const user = {
        username: 'test',
        name: 'Test',
        rolesPermissions: [{
          rol:'test',
          permissions: [
            'test'
          ]
        }]
      }
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
      setCurrentUser(user);
      
    }

    checkAuth()
      .then((_) => { })
  }, [routeName]); // eslint-disable-line react-hooks/exhaustive-deps

  return !passValidation.isLoading ? (
    passValidation.valid ? (
      children
    ) : (
      <Loading />
    )
  ) : (
    <div>Is Loading Auth</div>
  );
}

export default PrivateRouteRedirect;
