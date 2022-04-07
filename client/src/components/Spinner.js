import React from "react";

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-info m-5" role="status" style={{width: "3rem", height: "3rem"}}></div>
    </div>
  );
};

export default Spinner;
