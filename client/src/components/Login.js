import React, { useContext, useEffect } from "react";
import "../styles/Login.css";
import { GoogleLogin } from "@react-oauth/google";
import { HOST } from "../constants";
import axios from "axios";
import loginContext from "./../context/login/loginContext";
import alertContext from "./../context/alert/alertContext";
import loadingBarContext from "./../context/loadingBar/loadingBarContext";

const Login = () => {
  const contextLogin = useContext(loginContext);
  const { setIsLoggedIn } = contextLogin;
  const contextAlert = useContext(alertContext);
  const { showAlert } = contextAlert;
  const contextLoadingBar = useContext(loadingBarContext);
  const { setProgress } = contextLoadingBar;

  useEffect(() => {
    document.title = "Sikayat - Login";
  }, []);

  const responseSuccessGoogle = (response) => {
    setProgress(30);
    try {
      axios({
        method: "POST",
        url: `${HOST}/api/v1/users/googlelogin`,
        withCredentials: true,
        credentials: "include",
        data: {
          tokenId: response.credential,
        },
      }).then((res) => {
        if (res.status === 200) {
          setIsLoggedIn("loggedin");
          localStorage.setItem("loggedInUserId", res.data.data.user._id);
          localStorage.setItem("role", res.data.data.user.role);
          showAlert("success", "Logged-In Successfully");
        } else {
          showAlert("danger", "Something went wrong");
        }
        setProgress(100);
      });
    } catch (error) {
      console.log(error);
      showAlert("danger", "Something went wrong");
      setProgress(100);
    }
  };

  const responseErrorGoogle = (response) => {
    console.log(response);
    showAlert("danger", "Something went wrong");
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-sm-8 col-md-6 col-lg-5">
            <img src="./Sikayat2.png" className="img-fluid" alt="brand logo" />
            <img src="./logohome.webp" className="img-fluid" alt="Sample" />
          </div>
          <div className="col-sm-8 col-md-6 col-lg-4">
            <div className="d-flex justify-content-center">
              <GoogleLogin
                theme="filled_blue"
                useOneTap={true}
                onSuccess={(credentialResponse) => {
                  responseSuccessGoogle(credentialResponse);
                }}
                onError={(error) => {
                  responseErrorGoogle(error);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
