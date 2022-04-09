import React, { useContext } from "react";
import alertContext from "../context/alert/alertContext";

export default function Alert() {
  const contextAlert = useContext(alertContext);
  const { alert } = contextAlert;

  if (alert)
    return (
      <div
        className={`alert alert-${alert.type} alert-dismissible fade show`}
        role="alert"
      >
        {alert.message}
      </div>
    );
  else return <div></div>;
}
