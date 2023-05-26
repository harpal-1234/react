import React, { useEffect, useState } from "react";
import { Dropdown, Card, Table, Badge, Col, Button } from "react-bootstrap";
import PageTitle from "../layouts/PageTitle";
import Spinner from "../common/Spinner";
import ViewImage from "../modal/ViewImage";
import AddUser from "../modal/AddUser";
import Pagination from "../common/Pagination";
import { toast, ToastContainer } from "react-toastify";
import {
  approveUser,
  blockUser,
  deleteUser,
  getAllUsers,
} from "../../services/User/UserService";
import { useDispatch } from "react-redux";
import { setCurrentUserAction } from "../../store/actions/UserDetailsAction";

export default function UserManagement(props) {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState([]);
  const [apiError, setApiError] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [image, setImage] = useState("");
  const limit = 10;
  const imgUrl = "https://traintab.s3.amazonaws.com/";
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
        console.log(response.data.data.Users);
        setUsers(response.data.data.Users);
        setImage(response.data.data.Users?.fitnessCertificate);
        const total = response.data.data.countUser;
        setLoader(false);
        setPageCount(Math.ceil(total / limit));
      })
      .catch((error) => {
        console.log(error, "error");
        setLoader(false);
        if (error.response.data.statusCode === 401) {
          localStorage.clear("tokenDetails");
          props.history.push("/login");
        }
      });
  }

  function onDelete(id) {
    setLoader(true);
    deleteUser(id)
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
    blockUser(id)
      .then((response) => {
        notifyTopRight(response.data.data.updateUser);
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
  function onApprove(id) {
    setLoader(true);
    approveUser(id)
      .then((response) => {
        notifyTopRight("Approved successfully.");
        getTableData();
        setLoader(false);

        console.log(response);
      })
      .catch((error) => {
        console.log(error.response, "helooooooooo");
        setLoader(false);
        notifyError("Something went wrong!");
        if (error.response.data.statusCode === 401) {
          localStorage.clear("authDetails");
          props.history.push("/login");
        }
      });
  }

  useEffect(() => {
    getTableData();
  }, [currentPage, search]);

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
          <Card.Header className="d-block">
            <div className="d-flex justify-content-between align-items-center">
              <div className="col-8" style={{ flexGrow: 1 }}>
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
              <div className="d-flex justify-content-end mb-3">
                <Button
                  className="btn btn-primary"
                  onClick={() => setUserModal(true)}
                >
                  Add New +
                </Button>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <Table responsive>
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
                    <strong>CERTIFICATE</strong>
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
                {users.map((item, i) => (
                  <tr key={i}>
                    <td>
                      <img src={item.profile} width={70} height={70} />
                    </td>
                    <td
                      onClick={() => (
                        dispatch(setCurrentUserAction(item)),
                        props.history.push("/user-details")
                      )}
                      style={{ cursor: "pointer" }}
                    >
                      {item.fName}
                    </td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.typeOfTrainer}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-info py-2"
                        onClick={() => setModal(true)}
                      >
                        View
                      </button>
                    </td>
                    <td>
                      {item.isApproved ? (
                        <Badge variant="success light">Approved</Badge>
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
                          {!item.isApproved && (
                            <Dropdown.Item onClick={() => onApprove(item._id)}>
                              Approve Profile
                            </Dropdown.Item>
                          )}

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
            {users?.length === 0 && !loader ? (
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
      <ViewImage
        show={modal}
        image={image}
        onHide={() => setModal(false)}
      />
      <AddUser
        show={userModal}
        table={getTableData}
        onHide={() => setUserModal(false)}
      />
      {loader && <Spinner />}
    </div>
  );
}
