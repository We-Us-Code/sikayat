import React from "react";
import "../styles/Login.css";

const Login = () => {
  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="./Sikayat2.png" className="img-fluid" alt="brand logo" />
            <img src="./logohome.webp" className="img-fluid" alt="Sample" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 ">
            <button type="button" className="google-button">
              <span className="google-button__icon"><img src="./logo.svg" alt="signIn Logo"></img></span>
              <span className="google-button__text">Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-column text-center text-md-start justify-content-between py-4 px-4 px-xl-1 bg-dark">
        <div className="text-white text-center mb-3 mb-md-0">
          IIT BBS | Sikayat Portal
        </div>
      </div>
    </section>
  );
};

export default Login;
