import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Table,
} from "react-bootstrap";
import { Link,  } from "react-router-dom";
import Switch from "react-switch";
import { toast, ToastContainer } from "react-toastify";
import {
  actionAdvertise,
  deleteAdvertise,
  getAdvertise,
} from "../../services/Advertise/AdvertiseService";
import Pagination from "../common/Pagination";
import Spinner from "../common/Spinner";
import SwitchBotton from "../components/ReactSwitch";
import PageTitle from "../layouts/PageTitle";
import AddArtical from "../modal/AddArtical";
import Advertisement from "../modal/Advertisement";

export default function AddsManagement(props) {
  const svg1 = (
    <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect x="0" y="0" width="24" height="24"></rect>
        <circle fill="#000000" cx="5" cy="12" r="2"></circle>
        <circle fill="#000000" cx="12" cy="12" r="2"></circle>
        <circle fill="#000000" cx="19" cy="12" r="2"></circle>
      </g>
    </svg>
  );

  const notifyTopRight = (success) => {
    toast.success(`✅ ${success}`, {
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
  const [postModal, setPostModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [apiError, setApiError] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const limit = 10;
  function getTableData() {
    setLoader(true);
    getAdvertise(currentPage, limit, search)
      .then((response) => {
        setData(response.data.data.Advertisements);
        const total = response.data.data.countAdvertisements;
        setLoader(false);
        setPageCount(Math.ceil(total / limit));
        console.log(response.data, " table data ");
      })
      .catch((error) => {
        console.log(error, "helooooooooo");
        setLoader(false);
        if (error.response.data.statusCode === 401) {
          localStorage.clear("tokenDetails");
          props.history.push("/login");
        }
      });
  }
  function onDelete(id) {
    setLoader(true);
    deleteAdvertise(id)
      .then((response) => {
        getTableData();
        notifyTopRight(response.data.message);

        console.log(response);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error.response, "helooooooooo");
        setLoader(false);
        notifyError(error.response.data.data);
        if (error.response.data.statusCode === 401) {
          localStorage.clear("authDetails");
          props.history.push("/login");
        }
      });
  }
  function onAction(id) {
    setLoader(true);
    actionAdvertise(id)
      .then((response) => {
        notifyTopRight(response.data.data.updateAds);
        getTableData();
        setLoader(false);

        console.log(response);
      })
      .catch((error) => {
        console.log(error.response, "helooooooooo");
        setLoader(false);
        notifyError(error.response.data.data);
        if (error.response.data.statusCode === 401) {
          localStorage.clear("authDetails");
          props.history.push("/login");
        }
      });
  }
  useEffect(() => {
    getTableData();
    console.log(currentPage, " new 111");
  }, [currentPage]);


 
  return (
    <div>
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
      <PageTitle activeMenu="Advertisement List" motherMenu="Advertisement" />

      <Col>
        <Card>
          <Card.Header className="d-block">
            <div className="d-flex justify-content-between align-items-center">
              <div className="col-6" style={{ flexGrow: 1 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    className="input-group border bg-white input-group-sm"
                    style={{ borderRadius: "8px" }}
                  >
                    <input
                      style={{
                        paddingBottom: "25px",
                        paddingTop: "25px",
                        borderRadius: "10px",
                        fontSize: "14px",
                      }}
                      type="text"
                      name="table_search"
                      className="form-control float-right border-0"
                      placeholder="Search"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="btn btn-default"
                        onClick={getTableData}
                      >
                        <i className="fa fa-search" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          <SwitchBotton/>
              <div className="">
                <Button
                  className="btn btn-primary"
                  onClick={() => setPostModal(true)}
                >
                  Add New +
                </Button>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <Table>
              <thead style={{ color: "black" }}>
                <tr>
                  <th>
                    <strong>IMAGE</strong>
                  </th>
                  <th>
                    <strong>COUPON TITLE</strong>
                  </th>
                  <th>
                    <strong>COUPON CODE</strong>
                  </th>
                  <th>
                    <strong>OFFER</strong>
                  </th>
                  <th>
                    <strong>STATUS</strong>
                  </th>
                  <th>
                    <strong>ACTION</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item,i) => (
                  <tr key={i}>
                    <td>
                      <img src={item.image} width={70} height={70} />
                    </td>
                    <td>{item.couponTitle}</td>
                    <td>{item.couponCode}</td>
                    <td>{item.offer}</td>
                    <td>
                      {item.isDisable ? (
                        <Badge variant="danger light">Deactive</Badge>
                      ) : (
                        <Badge variant="success light">Active</Badge>
                      )}
                    </td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="info light"
                          className="light sharp btn btn-info i-false"
                        >
                          {svg1}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item></Dropdown.Item>
                          {item.isDisable ? (
                            <Dropdown.Item onClick={() => onAction(item._id)}>
                              Enable
                            </Dropdown.Item>
                          ) : (
                            <Dropdown.Item onClick={() => onAction(item._id)}>
                              Disable
                            </Dropdown.Item>
                          )}

                          <Dropdown.Item onClick={() => onDelete(item._id)}>
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {data?.length === 0 && !loader ? (
              <div className="justify-content-center d-flex my-5 ">
                Sorry, Data Not Found!
              </div>
            ) : (
              ""
            )}
            <Pagination
              pageCount={pageCount}
              pageValue={currentPage}
              setPage={setCurrentPage}
            />
          </Card.Body>
        </Card>
      </Col>
      <Advertisement
        show={postModal}
        table={getTableData}
        onHide={() => setPostModal(false)}
      />
      {loader && <Spinner />}
    </div>
  );
}
