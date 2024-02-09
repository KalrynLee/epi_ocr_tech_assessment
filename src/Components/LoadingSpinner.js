import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const LoadingSpinner = (props) => {
  return (

    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.open}
      className="backdrop-loading-color"
      data-testid="circular-loader-backdrop"
    >
      <CircularProgress data-testid="circular-loader" style={{height: "60px", width: "60px"}} color="inherit" />
    </Backdrop>
  );
};

export default LoadingSpinner;
