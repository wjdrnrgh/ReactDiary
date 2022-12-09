import React from "react";
import { Link } from "react-router-dom";
import style from "./Nav.module.css";

const Nav = () => {
  return (
    <nav>
      <Link to="/" className={style.logo}>
        <i className="fa-brands fa-react"></i>
        ReactDiary
      </Link>
    </nav>
  );
};

export default Nav;
