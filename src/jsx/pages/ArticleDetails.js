import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PageTitle from "../layouts/PageTitle";
import dummy from "../../images/user-icon3.png";
import ViewImage from "../modal/ViewImage";
import { connect } from "react-redux";
import parse from "html-react-parser";
function ArticleDetails(props) {
  const [modal, setModal] = useState(false);
  const articleData = props.currentData;
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
        <h4>Article Details</h4>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="article-management">Article Management</Link>
          </li>
          <li className="breadcrumb-item active">
            <Link>Article Details</Link>
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
                src={articleData.image}
                width={100}
                height={100}
                className="text-center"
              />
            </div>
            <div className="text-right">
              <h3 className="text-black ">{articleData.title}</h3>
              <p className="text-black ">{articleData.category}</p>
              <p className="text-black ">{articleData.subCategory}</p>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="text-black">
            <div className="d-flex justify-content-between align-items-center pb-3">
              {/* <h5>Date of Birth</h5> */}
              <p className="">{parse(articleData.description)}</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentData: state.ArticleData.currentData,
  };
};
export default connect(mapStateToProps)(ArticleDetails);
