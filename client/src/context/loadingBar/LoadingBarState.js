import { useState } from "react";
import LoadingBarContext from "./loadingBarContext";

const LoadingBarState = (props) => {
  const [progress, setProgress] = useState(0);

  return (
    <LoadingBarContext.Provider value={{ progress, setProgress }}>
      {props.children}
    </LoadingBarContext.Provider>
  );
};

export default LoadingBarState;
