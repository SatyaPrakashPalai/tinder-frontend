import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import "./Header.css";
function Header({ backButton }) {
  return (
    <div className="header">
      {backButton ? (
        <Link to="/">
          <IconButton>
            <ArrowBackIosNewIcon fontSize="large" />
          </IconButton>
        </Link>
      ) : (
        <IconButton>
          <PersonIcon fontSize="large" />
        </IconButton>
      )}

      <Link to="/">
        <img className="logo" src="tinder_logo.png" alt="" />
      </Link>

      <Link to="/chat">
        <IconButton>
          <QuestionAnswerIcon fontSize="large" />
        </IconButton>
      </Link>
    </div>
  );
}

export default Header;
