import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";
//import logo from '../../images/logo-full.png'
import { ToastContainer, toast } from "react-toastify";
import {changePasswoard} from "../../services/AuthService";
function ChangePassword({ password, onHide,props }) {
  //Modal box
  let errorsObj = {oldPassword : "", newPassword: "", confirmPassword: ""};
  const [errors, setErrors] = useState(errorsObj);
  const [apiError, setApiError] = useState();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 
  const notifyTopRight = () => {
    toast.success("✅ Password Updated successfully !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  const notifyError = (error) => {
    toast.error(`❌${error}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  function onChangePassword(e) {
    console.log("ffffffff")
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (oldPassword === "") {
      errorObj.oldPassword = "Old Password is Required";
      error = true;
    }
    if (newPassword === "") {
      errorObj.newPassword = "New Password is Required";
      error = true;
    }
    if (confirmPassword === "") {
      errorObj.confirmPassword = "Confirm Password is Required";
      error = true;
    }
    if(oldPassword == newPassword && oldPassword !== ""){
      errorObj.newPassword = "Please create new password";
      error = true;
    }
    if(newPassword !== confirmPassword){
      errorObj.confirmPassword = "Password is not matched";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }

    changePasswoard(oldPassword, newPassword)
      .then((response) => {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        onHide();
        notifyTopRight("Updated Successfully.");
      })
      .catch((error) => {
        console.log(error.response, "change password error");
        // setApiError(error.response.data.message);
        notifyError(error.response.data.message);
        if(error.response.data.statusCode === 401){
          localStorage.clear("tokenDetails");
          props.history.push("/login");
        } 
      });
  }
  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <Modal className="modal fade" show={password}>
      <div className="" role="document">
        <div className="">
          <form onSubmit={onChangePassword}>
            <div className="modal-header">
              <h4 className="modal-title fs-20">Change Password</h4>
              {/* <button type="button" className="btn-close"  data-dismiss="modal"><span></span></button> */}
            </div>
            <div className="modal-body">
              <i className="flaticon-cancel-12 close" data-dismiss="modal"></i>
              <div className="add-contact-box">
                <div className="add-contact-content">
                {apiError && (
                <div role="alert" className="fade alert-dismissible fade show alert alert-danger show">
                  {apiError}
                </div>
              )}
                  <div className="form-group mb-3">
                    <label className="text-black font-w500">Old Password</label>
                    <div className="contact-name">
                      <input
                        type="password"
                        className="form-control"
                        autocomplete="off"
                        name="name"
                      
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Enter your old password"
                      />
                      <span className="validation-text"></span>
                      {errors.oldPassword && (
                    <div className="text-danger fs-12">{errors.oldPassword}</div>
                  )}
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label className="text-black font-w500">New Password</label>
                    <div className="contact-name">
                      <input
                        type="password"
                        className="form-control"
                        autocomplete="off"
                        name="department"
                        
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                      />
                      <span className="validation-text"></span>
                      {errors.newPassword && (
                    <div className="text-danger fs-12">{errors.newPassword}</div>
                  )}
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label className="text-black font-w500">
                      Confirm New Password
                    </label>
                    <div className="contact-name">
                      <input
                        type="password"
                        className="form-control"
                        autocomplete="off"
                        name="department"
                        
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter new password"
                      />
                      <span className="validation-text"></span>
                      {errors.confirmPassword && (
                    <div className="text-danger fs-12">{errors.confirmPassword}</div>
                  )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-primary"
                // onClick={onChangePassword}
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => onHide()}
                className="btn btn-danger"
              >
                {" "}
                <i className="flaticon-delete-1"></i> Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};

export default connect(mapStateToProps)(ChangePassword);
