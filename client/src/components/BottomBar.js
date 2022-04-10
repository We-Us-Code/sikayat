import React from "react";

const BottomBar = () => {
  return (
    <div className="d-flex flex-column flex-md-column text-center text-md-start justify-content-between py-4 px-4 px-xl-1 bg-dark" style={{ marginTop: "20px" }}>
      <div className="text-white text-center mb-3 mb-md-0">
        IIT BBS 
        <a className="align-items-center mx-3" href="https://github.com/harshsingh-24/cmp" style={{ color:"inherit", textDecoration:"inherit" }}>
          <i class="bi bi-github" />
        </a> 
        Sikayat Portal
      </div>
    </div>
  );
};

export default BottomBar;
