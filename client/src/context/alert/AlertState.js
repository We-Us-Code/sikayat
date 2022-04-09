import { useState } from "react";
import AlertContext from "./alertContext";

const LoginState = (props) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <AlertContext.Provider value={{ showAlert, alert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default LoginState;
