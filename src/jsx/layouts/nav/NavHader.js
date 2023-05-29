import React, { useState } from "react";

/// React router dom
import { Link } from "react-router-dom";

/// images
import logo from "../../../images/Group 626075.svg";
import logoText from "../../../images/TRAIN TAB.svg";

const NavHader = () => {
   const [toggle, setToggle] = useState(false);
   return (
      <div className="nav-header" style={{zIndex: "12"}}>
         <Link to="/" className="brand-logo">
            <img className="logo-abbr" src={logo} alt="" />
            <img className="logo-compact ml-5" src={logoText} alt="" />
            <img className="brand-title ml-5" src={logoText} alt="" />
         </Link>

         <div className="nav-control" onClick={() => setToggle(!toggle)}>
            <div className={`hamburger ${toggle ? "is-active" : ""}`}>
               <span className="line"></span>
               <span className="line"></span>
               <span className="line"></span>
            </div>
         </div>
      </div>
   );
};

export default NavHader;
