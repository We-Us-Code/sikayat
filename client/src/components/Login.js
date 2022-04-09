import React, {useContext} from "react";
import "../styles/Login.css";
import { GoogleLogin } from "react-google-login";
import { HOST } from "../constants";
import axios from "axios";
import loginContext from "./../context/login/loginContext";

const Login = () => {
  const contextLogin = useContext(loginContext);
  const { setIsLoggedIn } = contextLogin;

  const responseSuccessGoogle = (response) => {

    axios({
      method: "POST",
      url: `${HOST}/api/v1/users/googlelogin`,
      withCredentials: true,
      credentials: "include",
      data: {
        tokenId: response.tokenId,
      },
    }).then((res) => {
      if(res.status===200){
          setIsLoggedIn("loggedin")
          localStorage.setItem("loggedInUserId", res.data.data.user._id);
      }
    });;
  };

  const responseErrorGoogle = (response) => {
    console.log(response);
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
                clientId="212605746801-9n19oa0qd07gguojn69t9ubhn0njhjis.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseErrorGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
