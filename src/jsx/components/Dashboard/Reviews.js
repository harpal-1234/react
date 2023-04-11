import { Link } from "react-router-dom";
import React from "react";
import { Dropdown } from "react-bootstrap";

// Slider
import HomeSlider from "../Slider/HomeSlider/HomeSlider";
import SideBarSlider from "../Slider/HomeSlider/SideBarSlider";

// Images
import profileImg00 from "../../../images/avatar/1.jpg";
import profileImg01 from "../../../images/avatar/2.jpg";
import profileImg02 from "../../../images/avatar/3.jpg";
import profileImg03 from "../../../images/avatar/4.jpg";
import profileImg05 from "../../../images/avatar/5.jpg";

const Reviews = () => {
  return (
    <>
      <div className="form-head d-flex mb-3 mb-md-4 align-items-start">
        <div className="mr-auto d-none d-lg-block">
          <h2 className="text-black font-w600 mb-1">Reviews</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="" className="text-primary">
                Dashboard
              </Link>
            </li>
            <li className="breadcrumb-item active">
              <Link to="">Customer Reviews</Link>
            </li>
          </ol>
        </div>
        <Dropdown className="dropdown custom-dropdown">
          <Dropdown.Toggle
            variant=""
            className="btn i-false btn-sm btn-primary light d-flex align-items-center svg-btn"
            data-toggle="dropdown"
          >
            <svg
              width={28}
              height={28}
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M22.4281 2.856H21.8681V1.428C21.8681 0.56 21.2801 0 20.4401 0C19.6001 0 19.0121 0.56 19.0121 1.428V2.856H9.71606V1.428C9.71606 0.56 9.15606 0 8.28806 0C7.42006 0 6.86006 0.56 6.86006 1.428V2.856H5.57206C2.85606 2.856 0.560059 5.152 0.560059 7.868V23.016C0.560059 25.732 2.85606 28.028 5.57206 28.028H22.4281C25.1441 28.028 27.4401 25.732 27.4401 23.016V7.868C27.4401 5.152 25.1441 2.856 22.4281 2.856ZM5.57206 5.712H22.4281C23.5761 5.712 24.5841 6.72 24.5841 7.868V9.856H3.41606V7.868C3.41606 6.72 4.42406 5.712 5.57206 5.712ZM22.4281 25.144H5.57206C4.42406 25.144 3.41606 24.136 3.41606 22.988V12.712H24.5561V22.988C24.5841 24.136 23.5761 25.144 22.4281 25.144Z"
                  fill="#2F4CDD"
                />
              </g>
            </svg>
            <div className="text-left ml-3">
              <span className="d-block fs-16">Filter Periode</span>
              <small className="d-block fs-13">4 June 2020 - 4 July 2020</small>
            </div>
            <i className="fa fa-angle-down scale5 ml-3" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
            <Link className="dropdown-item" to="#">
              4 June 2020 - 4 July 2020
            </Link>
            <Link className="dropdown-item" to="#">
              5 july 2020 - 4 Aug 2020
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="widget-carousel owl-carousel">
            <HomeSlider />
          </div>
        </div>

        <div className="col-lg-8 col-xl-9 col-xxl-8">
          <div className="card">
            <div className="card-header border-0 pb-0 d-sm-flex d-block">
              <div>
                <h4 className="card-title mb-1 fs-28 font-w600">
                  Recent Review
                </h4>
                <p className="mb-0">
                  Here is customer review about your restaurant{" "}
                </p>
              </div>
              <Dropdown className="dropdown">
                <Dropdown.Toggle
                  variant=""
                  type="button"
                  className="btn btn-primary i-false dropdown-toggle light fs-14"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  Latest
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu">
                  <Link className="dropdown-item" to="#">
                    Latest
                  </Link>
                  <Link className="dropdown-item" to="#">
                    OLD
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="card-body p-0">
              <div className="media review-box">
                <img
                  className="mr-3 img-fluid btn-rounded"
                  width={55}
                  src={profileImg00}
                  alt="DexignZone"
                />
                <div className="media-body">
                  <h4 className="mt-0 mb-0 text-black">Glee Smiley</h4>
                  <ul className="review-meta mb-3 d-block d-sm-flex align-items-center">
                    <li className="mr-3">
                      <small>Head Marketing</small>
                    </li>
                    <li className="mr-3">
                      <small>24 June 2020</small>
                    </li>
                    <li className="ml-auto">
                      <span className="badge badge-rounded mb-1 badge-warning light font-w500">
                        Excelent
                      </span>
                    </li>
                  </ul>
                  <p className="mb-3 text-secondary">
                    We recently had dinner with friends at David CC and we all
                    walked away with a great experience. Good food, pleasant
                    environment, personal attention through all the evening.
                    Thanks to the team and we will be back!
                  </p>
                </div>
                <div className="media-footer align-self-center">
                  <div className="star-review text-md-center">
                    <span className="text-secondary">4.5</span>
                    <i className="fa fa-star ml-1 text-primary" />
                    <i className="fa fa-star ml-1 text-primary" />
                    <i className="fa fa-star ml-1 text-primary" />
                    <i className="fa fa-star ml-1 text-primary" />
                    <i className="fa fa-star ml-1 text-gray" />
                  </div>
                </div>
              </div>
              <div className="media review-box">
                <img
                  className="mr-3 img-fluid btn-rounded"
                  width={55}
                  src={profileImg01}
                  alt="DexignZone"
                />
                <div className="media-body">
                  <h4 className="mt-0 mb-0 text-black">Samuel Hawkins</h4>
                  <ul className="review-meta mb-3 d-block d-sm-flex align-items-center">
                    <li className="mr-3">
                      <small>Head Marketing</small>
                    </li>
                    <li className="mr-3">
                      <small>24 June 2020</small>
                    </li>
                    <li className="ml-auto">
                      <span className="badge badge-rounded mb-1 badge-warning light font-w500">
                        Recomended
                      </span>
                      <span className="badge badge-rounded mb-1 badge-warning light font-w500 ml-1">
                        Great
                      </span>
                    </li>
                  </ul>
                  <p className="mb-3 text-secondary">
                    We recently had dinner with friends at David CC and we all
                    walked away with a great experience. Good food, pleasant
                    environment, personal attention through all the evening.
                    Thanks to the team and we will be back!
                  </p>
                </div>
                <div className="media-footer align-self-center">
                  <div className="star-review text-md-center">
                    <span className="text-secondary">4.8</span>
                    <i className="fa fa-star ml-1 text-primary" />
                    <i className="fa fa-star ml-1 text-primary" />
                    <i className="fa fa-star ml-1 text-primary" />
                    <i className="fa fa-star ml-1 text-primary" />
                    <i className="fa fa-star ml-1 text-gray" />
                  </div>
                </div>
              </div>
              <div className="media review-box">
                <img
                  className="mr-3 img-fluid btn-rounded"
                  width={55}
                  src={profileImg02}
                  alt="DexignZone"
                />
                <div className="media-body">
                  <h4 className="mt-0 mb-0 text-black">Dicky Sitompul</h4>
                  <ul className="review-meta mb-3 d-block d-sm-flex align-items-center">
                    <li className="mr-3">
                      <small>Head Marketing</small>
                    </li>
                    <li className="mr-3">
                      <small>24 June 2020</small>
                    </li>
                    <li className="ml-auto">
                      <span className="badge badge-rounded mb-1 badge-warning light font-w500">
                        Excelent
                      </span>
                    </li>
                  </ul>
                  <p className="mb-3 text-secondary">
                    We recently had dinner with friends at David CC and we all
                    walked away with a great experience. Good food, pleasant
                    environment, personal attention through all the evening.
                    Thanks to the team and we will be back!
                  </p>
                </div>
                <div className="media-footer align-self-center">
                  <div className="star-review text-md-center">
                    <span className="text-secondary">4.0</span>
                    <i className="fa fa-star ml-1 text-primary" />
                    <i className="fa fa-star ml-1 text-primary" />
                    <i className="fa fa-star ml-1 text-primary" />
                    <i className="fa fa-star ml-1 text-primary" />
                    <i className="fa fa-star ml-1 text-gray" />
                  </div>
                </div>
              </div>
              <div className="media review-box">
                <img
                  className="mr-3 img-fluid btn-rounded"
                  width={55}
                  src={profileImg03}
                  alt="DexignZone"
                />
                <div className="media-body">
                  <h4 className="mt-0 mb-0 text-black">Dracule Mihawk</h4>
                  <ul className="review-meta mb-3 d-block d-sm-flex align-items-center">
                    <li className="mr-3">
                      <small>Head Marketing</small>
                    </li>
                    <li className="mr-3">
                      <small>24 June 2020</small>
                    </li>
                  </ul>
                  <p className="mb-3 text-secondary">
                    We recently had dinner with friends at David CC and we all
                    walked away with a great experience. Good food, pleasant
                    environment, personal attention through all the evening.
                    Thanks to the team and we will be back!
                  </p>
                </div>
                <div className="media-footer align-self-center">
                  <div className="star-review text-md-center">
                    <span className="text-secondary">2.0</span>
                    <i className="fa fa-star ml-1 text-primary" />
                    <i className="fa fa-star ml-1 text-primary" />
                    <i className="fa fa-star ml-1 text-gray" />
                    <i className="fa fa-star ml-1 text-gray" />
                    <i className="fa fa-star ml-1 text-gray" />
                  </div>
                </div>
              </div>
              <div className="media review-box">
                <img
                  className="mr-3 img-fluid btn-rounded"
                  width={55}
                  src={profileImg05}
                  alt="DexignZone"
                />
                <div className="media-body">
                  <h4 className="mt-0 mb-0 text-black">Samuel Hawkins</h4>
                  <ul className="review-meta mb-3 d-block d-sm-flex align-items-center">
                    <li className="mr-3">
                      <small>Head Marketing</small>
                    </li>
                    <li className="mr-3">
                      <small>24 June 2020</small>
                    </li>
                    <li className="ml-auto">
                      <span className="badge badge-rounded mb-1 badge-warning light font-w500">
                        Delcious
                      </span>
                      <span className="badge badge-rounded mb-1 badge-warning light font-w500 ml-1">
                        Excelent
                      </span>
                      <span className="badge badge-rounded mb-1 badge-warning light font-w500 ml-1">
                        Good Services
                      </span>
                    </li>
                  </ul>
                  <p className="mb-3 text-secondary">
                    We recently had dinner with friends at David CC and we all
                    walked away with a great experience. Good food, pleasant
                    environment, personal attention through all the evening.
                    Thanks to the team and we will be back!
                  </p>
                </div>
                <div className="media-footer align-self-center">
                  <div className="star-review text-md-center">
                    <span className="text-secondary">3.0</span>
                    <i className="fa fa-star ml-1 text-primary" />
                    <i className="fa fa-star ml-1 text-primary" />
                    <i className="fa fa-star ml-1 text-primary" />
                    <i className="fa fa-star ml-1 text-gray" />
                    <i className="fa fa-star ml-1 text-gray" />
                  </div>
                </div>
              </div>
              <div className="media review-box">
                <img
                  className="mr-3 img-fluid btn-rounded"
                  width={55}
                  src={profileImg00}
                  alt="DexignZone"
                />
                <div className="media-body">
                  <h4 className="mt-0 mb-0 text-black">Sanji Lee</h4>
                  <ul className="review-meta mb-3 d-block d-sm-flex align-items-center">
                    <li className="mr-3">
                      <small>Head Marketing</small>
                    </li>
                    <li className="mr-3">
                      <small>24 June 2020</small>
                    </li>
                    <li className="ml-auto">
                      <span className="badge badge-rounded mb-1 badge-warning light font-w500">
                        Excelent
                      </span>
                    </li>
                  </ul>
                  <p className="mb-3 text-secondary">
                    We recently had dinner with friends at David CC and we all
                    walked away with a great experience. Good food, pleasant
                    environment, personal attention through all the evening.
                    Thanks to the team and we will be back!
                  </p>
                </div>
                <div className="media-footer align-self-center">
                  <div className="star-review text-md-center">
                    <span className="text-secondary">1.0</span>
                    <i className="fa fa-star ml-1 text-primary" />
                    <i className="fa fa-star ml-1 text-gray" />
                    <i className="fa fa-star ml-1 text-gray" />
                    <i className="fa fa-star ml-1 text-gray" />
                    <i className="fa fa-star ml-1 text-gray" />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer border-0 text-center py-4">
              <Link to="/reviews" className="btn btn-primary">
                Read More <i className="fa fa-angle-double-down scale2 ml-2" />
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-xl-3 col-xxl-4">
          <div className="card bg-secondary h-auto sticky">
            <SideBarSlider />

            <div className="card-footer border-0 text-center py-4 bg-warning rounded-xl">
              <div className="star-review text-md-center d-flex justify-content-center align-items-center">
                <span className="text-white fs-32 font-w600 mr-3">4.0</span>
                <i className="fa fa-star ml-1 fs-22 mx-1 text-white" />
                <i className="fa fa-star ml-1 fs-22 mx-1 text-white" />
                <i className="fa fa-star ml-1 fs-22 mx-1 text-white" />
                <i className="fa fa-star ml-1 fs-22 mx-1 text-white" />
                <i className="fa fa-star ml-1 fs-22 mx-1 text-white op3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
