import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  loadingToggleAction,
  loginAction,
} from "../../store/actions/AuthActions";

import logo from "../../images/logo.png";
import logotext from "../../images/Group 626086.svg";
import { login, saveTokenInLocalStorage } from "../../services/AuthService";

function Login(props) {
  const [email, setEmail] = useState("");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState();

  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === "") {
      errorObj.email = "Email is Required";
      error = true;
    }
    if (password === "") {
      errorObj.password = "Password is Required";
      error = true;
    }
    if (password.length < 6) {
      errorObj.password = "Password length must be at least 6 characters long!";
      error = true;
    }
    if (password.length > 15) {
      errorObj.password =
        "Password length must be less than or equal to 15 characters long!";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }

    login(email, password)
      .then((response) => {
        saveTokenInLocalStorage(response.data.data.token);
        console.log(response, "login reponse");
        props.history.push("/");
      })
      .catch((error) => {
        console.log(error, "Login error");
        setApiError(error.response.data.message);
      });
  }

  return (
    <div className="login-form-bx">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 col-md-7 box-skew d-flex">
            <div className="authincation-content">
              <div className="mb-4">
                <h3 className="mb-1 font-w600">Welcome to TrainTab</h3>
                <p className="">Sign in by entering information below</p>
              </div>
              {apiError && (
                <div
                  role="alert"
                  className="fade alert-dismissible fade show alert alert-danger show"
                >
                  {apiError}
                </div>
              )}
              
              <form onSubmit={onLogin}>
                <div className="form-group">
                  <label className="mb-2 ">
                    <strong className="">Email</strong>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <div className="text-danger fs-12">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <label className="mb-2 ">
                    <strong className="">Password</strong>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <div className="text-danger fs-12">{errors.password}</div>
                  )}
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={() => props.history.push("/dashboard")}
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-6 col-md-5 d-flex box-skew1">
            <div className="inner-content align-self-center">
              <Link className="login-logo">
                {/* <img src={logo} alt="" className="logo-icon mr-2"/> */}
                <img src={logotext} alt="" className="logo-text ml-1" />
              </Link>
              {/* <h2 className="m-b10 text-white">Login To You Now</h2>
							<p className="m-b40 text-white">User Experience & Interface Design Strategy SaaS Solutions</p>
							<ul className="social-icons mt-4">
								<li><Link to={"#"}><i className="fa fa-facebook"></i></Link></li>
								<li><Link to={"#"}><i className="fa fa-twitter"></i></Link></li>
								<li><Link to={"#"}><i className="fa fa-linkedin"></i></Link></li>
							</ul> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Login);
