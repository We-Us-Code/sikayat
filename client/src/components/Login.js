import React from "react";
import "../styles/Login.css";

const Login = () => {
  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-sm-8 col-md-6 col-lg-5">
            <img src="./Sikayat2.png" className="img-fluid" alt="brand logo" />
            <img src="./logohome.webp" className="img-fluid" alt="Sample" />
          </div>
          <div className="col-sm-8 col-md-6 col-lg-4">
          <div class="d-flex justify-content-center">
            <button type="button" className="google-button">
              <span className="google-button__icon"><img src="./logo.svg" alt="signIn Logo"></img></span>
              <span className="google-button__text">Sign in with Google</span>
            </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
