import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PageTitle from "../layouts/PageTitle";
import dummy from "../../images/user-icon3.png";
export default function UserDetails() {
  return (
    <div>
      {" "}
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
      <div className="page-titles">
        <h4>User Details</h4>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="user-management">User Management</Link>
          </li>
          <li className="breadcrumb-item active">
            <Link>User Details</Link>
          </li>
        </ol>
      </div>
      <Card style={{ width: "70%" }}>
        <Card.Header className="d-block">
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ gap: "1rem" }}
          >
            <div>
              <img
                src={dummy}
                width={100}
                height={100}
                className="text-center"
              />
            </div>
            <div className="text-left">
              <h3 className="text-black ">User Name</h3>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="text-black">
            <div className="d-flex justify-content-between align-items-center pb-3">
              <h5>Date of Birth</h5>
              <p className="">23/5/1999</p>
            </div>
            <div className="d-flex justify-content-between align-items-center pb-3">
              <h5>Address</h5>
              <p className="">Londan,NewYork</p>
            </div>
            <div className="d-flex justify-content-between align-items-center pb-3">
              <h5>Number Of Certification</h5>
              <p className="">4</p>
            </div>

            <div className="d-flex justify-content-between align-items-center pb-3">
              <h5>Client</h5>
              <p className="">5</p>
            </div>
            <div className="d-flex justify-content-between align-items-center pb-3">
              <h5>Training Location</h5>
              <p className="">Londan,NewYork</p>
            </div>
            <div className="d-flex justify-content-between align-items-center pb-3">
              <h5>Services</h5>
              <p className="">Something</p>
            </div>
            <div className="d-flex justify-content-between align-items-center pb-3">
              <h5>Years In Business</h5>
              <p className="">5</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
