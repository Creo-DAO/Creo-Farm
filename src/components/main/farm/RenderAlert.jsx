import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import AutorenewIcon from "@mui/icons-material/Autorenew";

function RenderAlert(props) {
  const { action, hash, status, type , explorer} = props;
  return action === null ? null : action ? (
    <Alert
      icon={<AutorenewIcon fontSize="inherit" />}
      severity="warning"
      className="ms-auto mt-1 me-1"
      style={{
        width: "330px",
        zIndex: "10",
        boxShadow: "4px 4px 4px 0px #00000040",
      }}
    >
      <AlertTitle>{type} in progress</AlertTitle>

      <strong> Please wait for confirmation </strong>
    </Alert>
  ) : status === "success" ? (
    <Alert
      onClose={(e) => {
        e.target.closest(".MuiPaper-root").classList.add("d-none");
      }}
      severity="success"
      className="ms-auto mt-1 me-1"
      style={{
        width: "330px",
        zIndex: "10",
        boxShadow: "4px 4px 4px 0px #00000040",
      }}
    >
      <AlertTitle>Transaction completed</AlertTitle>
      <a
        href={`${explorer}tx/${hash}`}
        target="_blank"
        rel="noreferrer"
        style={{ color: "inherit" }}
      >
        <strong> check here</strong>
      </a>{" "}
      for transaction details
    </Alert>
  ) : status === "toolong" ? (
    <Alert
      onClose={(e) => {
        e.target.closest(".MuiPaper-root").classList.add("d-none");
      }}
      severity="error"
      className="ms-auto mt-1 me-1"
      style={{
        width: "330px",
        zIndex: "10",
        boxShadow: "4px 4px 4px 0px #00000040",
      }}
    >
      <AlertTitle>Transaction unconfirmed</AlertTitle>
      <a
        href={`${explorer}tx/${hash}`}
        target="_blank"
        rel="noreferrer"
        style={{ color: "inherit" }}
      >
        <strong> check here</strong>
      </a>{" "}
      for transaction details
    </Alert>
  ) : (
    <Alert
      onClose={(e) => {
        e.target.closest(".MuiPaper-root").classList.add("d-none");
      }}
      severity="error"
      className="ms-auto mt-1 me-1"
      style={{
        width: "330px",
        zIndex: "10",
        boxShadow: "4px 4px 4px 0px #00000040",
      }}
    >
      <AlertTitle>Transaction Failed</AlertTitle>
      <a
        href={`${explorer}tx/${hash}`}
        target="_blank"
        rel="noreferrer"
        style={{ color: "inherit" }}
      >
        <strong> check here</strong>
      </a>{" "}
      for transaction details
    </Alert>
  );
}

export default RenderAlert;
