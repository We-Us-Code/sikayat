import React from "react";
import "../styles/Login.css";

const Login = () => {
  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img 
            src="./Sikayat2.png"
            className="img-fluid"
            alt ="brand logo"
            />
            <img
              src="./logohome.webp"
              className="img-fluid"
              alt="Sample"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <div className="text-center text-lg-start mt-4 pt-2">
              <button
                type="button"
                className="btn btn-light"
                style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
              >
                <img src="/google_login.svg" alt = "Login Button" height={32} width={32} className="mx-2"/>
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-column text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-dark">
        <div className="text-white text-center mb-3 mb-md-0">IIT BBS | Sikayat Portal</div>
      </div>
    </section>
  );
};

export default Login;
