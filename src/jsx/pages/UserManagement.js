import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Card, Table, Badge, Col } from "react-bootstrap";
import PageTitle from "../layouts/PageTitle";

import swal from "sweetalert";
// import Spinner from "../reusable/Spinner";
// import ReactPaginate from "react-paginate";
import { toast, ToastContainer } from "react-toastify";
import {
  blockUser,
  deleteUser,
  getAllUsers,
} from "../../services/User/UserService";
import Spinner from "../common/Spinner";
export default function UserManagement(props) {
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState([]);
  const [apiError, setApiError] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  console.log(startDate, endDate, "date");
  const limit = 10;
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

  function getTableData() {
    setLoader(true);
    getAllUsers(currentPage, limit, search)
      .then((response) => {
        setUsers(response.data.data.Users);
        const total = response.data.data.countUser;
        setLoader(false);
        setPageCount(Math.ceil(total / limit));
        console.log(response.data.data.users, " table data ");
      })
      .catch((error) => {
        console.log(error.response, "helooooooooo");
        if (error.response.data.statusCode === 401) {
          localStorage.clear("tokenDetails");
          props.history.push("/login");
        }
      });
  }

  function onDelete(userId) {
    setLoader(true);
    deleteUser(userId)
      .then((response) => {
        getTableData();
        notifyTopRight(response.data.data);

        console.log(response);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error.response, "helooooooooo");
        setLoader(false);
        notifyError(error.response.data.data);
        if (error.response.data.statusCode === 404) {
          localStorage.clear("authDetails");
          props.history.push("/login");
        }
      });
  }
  function onAction(userId) {
    setLoader(true);
    blockUser(userId)
      .then((response) => {
        notifyTopRight(response.data.data);
        getTableData();
        setLoader(false);

        console.log(response);
      })
      .catch((error) => {
        console.log(error.response, "helooooooooo");
        setLoader(false);
        notifyError(error.response.data.data);
        if (error.response.data.statusCode === 404) {
          localStorage.clear("authDetails");
          props.history.push("/login");
        }
      });
  }
  useEffect(() => {
    getTableData();
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
      <PageTitle activeMenu="Users List" motherMenu="Users" />
      <Col>
        <Card>
          {/* <Card.Header className="">
              <div className="row d-flex justify-content-between ">
                <div className="col-4" style={{ flexGrow: 1 }}>
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
                        // onKeyDown={(e) => {
                        //   console.log(e.key);
                        //   if (e.key === "Enter") {
                        //     handleFetch();
                        //     // setCurrentPage(0);
                        //   }
                        // }}
                        // onChange={(e) => setSearch(e.target.value.trimEnd())}
                      />
                      <div className="input-group-append">
                        <button
                          type="button"
                          className="btn btn-default"
                        //   onClick={handleFetch}
                        >
                          <i className="fa fa-search" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
           
              </div>
            
          </Card.Header> */}
          <Card.Body>
            <Table>
              <thead style={{ color: "black" }}>
                <tr>
                  <th>
                    <strong>IMAGE</strong>
                  </th>
                  <th>
                    <strong>NAME</strong>
                  </th>
                  <th>
                    <strong>EMAIL</strong>
                  </th>
                  <th>
                    <strong>PHONE NUMBER</strong>
                  </th>
                  <th>
                    <strong>CATEGORY</strong>
                  </th>
                  <th>
                    <strong>APPROVAL STATUS</strong>
                  </th>
                  <th>
                    <strong>ACTIVITY STATUS</strong>
                  </th>
                  <th>
                    <strong>ACTION</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((item) => (
                  <tr>
                    <td>
                      <img src={item.profile} width={70} height={70} />
                    </td>
                    <td
                    // onClick={() => (
                    //   props.history.push("/users-order-listing"),
                    //   saveUserIdInLocalStorage(item._id)
                    // )}
                    >
                      {item.fName}
                    </td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.typeOfTrainer}</td>
                    <td>
                      {item.isApproved ? (
                        <Badge variant=" success light">Approved</Badge>
                      ) : (
                        <Badge variant="danger light">Pending</Badge>
                      )}
                    </td>
                    <td>
                      {item.isBlocked ? (
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
                          <Dropdown.Item>Approve Profile</Dropdown.Item>
                          <Dropdown.Item>Download</Dropdown.Item>

                          {item.isBlocked ? (
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
            {/* {users?.length === 0 && !loader ? (
              <div className="justify-content-center d-flex my-5 ">
                Sorry, Data Not Found!
              </div>
            ) : (
              ""
            )}
            {pageCount > 1 && (
              <ReactPaginate
                pageCount={pageCount}
                forcePage={currentPage}
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"....."}
                marginPagesDisplayed={2}
                containerClassName={"pagination "}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"page-item active"}
                onPageChange={(selected) => {
                  setCurrentPage(selected.selected);
                }}
              />
            )} */}
          </Card.Body>
        </Card>
      </Col>
      {loader && <Spinner />}
    </div>
  );
}
