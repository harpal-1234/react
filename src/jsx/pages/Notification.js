import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PageTitle from "../layouts/PageTitle";
import { Tab, Nav } from "react-bootstrap";
import { Dropdown, Card, Table, Badge, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { MultiSelect } from "./MultiSelect";
import crossIcon from "../../images/FAB.svg";
import {
  getNotification,
  getUsers,
  pushNotification,
  rejectNotification,
} from "../../services/Notification/NotificationService";
import Spinner from "../common/Spinner";
import { approveUser } from "../../services/User/UserService";
import Pagination from "../common/Pagination";
import { setCurrentUserAction } from "../../store/actions/UserDetailsAction";
import { useDispatch } from "react-redux";
export default function Notification(props) {
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
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const limit = 10;
  const [notification, setNotification] = useState([]);
  const [type, setType] = useState("all");
  let errorsObj = { title: "", body: "", type: "", selected: [] };
  const [errors, setErrors] = useState(errorsObj);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selected, setSelected] = useState([]);

  const [userList, setUserList] = useState([]);

  const options = [
    ...userList?.map((item, i) => {
      return { value: item?._id, label: item?.fName };
    }),
  ];

  const totalIds = [...selected];
  // console.log(totalIds, "all ids")
  const ids = totalIds?.map((item, i) => {
    console.log(item?.value, "id...............");
    return item?.value;
  });

  function getNotificationData() {
    setLoader(true);
    getNotification(currentPage, limit)
      .then((response) => {
        console.log(response.data.data.notification);
        setNotification(response.data.data.notification);
        setLoader(false);
        const total = response.data.data.countNotification;
        setPageCount(Math.ceil(total / limit));
      })
      .catch((error) => {
        console.log(error, "error");
        notifyError(error.response.data.message);
        setLoader(false);
        if (error.response.data.statusCode === 401) {
          localStorage.clear("tokenDetails");
          props.history.push("/login");
        }
      });
  }
  function onApprove(id) {
    setLoader(true);
    approveUser(id)
      .then((response) => {
        notifyTopRight("Approved successfully.");
        getNotificationData();
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
  function onReject(id) {
    console.log(id)
    setLoader(true);
    rejectNotification(id)
      .then((response) => {
        notifyTopRight("Rejected successfully.");
        getNotificationData();
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
  function onSubmit(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (title === "") {
      errorObj.title = "Title is Required";
      error = true;
    }
    if (body === "") {
      errorObj.body = "Body is Required";
      error = true;
    }
    if (type === "") {
      errorObj.type = "Type is Required";
      error = true;
    }
    if (selected === []) {
      errorObj.selected = "Please select an user";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }
    setLoader(true);
    pushNotification(title, body, ids)
      .then(() => {
        notifyTopRight("Sent Successfully.");
        setTitle("");
        setBody("");
        setType("");
        setSelected([]);
        setLoader(false);
      })
      .catch((error) => {
        // notifyError(error.response.data.data)
        console.log(error.response, "helooooooooo");
        if (error.response.data.statusCode === 401) {
          localStorage.clear("tokenDetails");
          props.history.push("/login");
        }
      });
  }

  useEffect(() => {
    setLoader(true);
    getUsers()
      .then((response) => {
        console.log(response, "user data response");
        setUserList(response.data.data.Users);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error, "error");
        if (error.response.data.statusCode === 401) {
          localStorage.clear("tokenDetails");
          props.history.push("/login");
        }
      });

    getNotificationData();
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
      <PageTitle activeMenu="Notificatons" motherMenu="Notifications" />
      <div className="custom-tab-1">
        <Tab.Container defaultActiveKey="home">
          <Nav as="ul" className="nav-tabs">
            <Nav.Item as="li">
              <Nav.Link eventKey="home" onClick={() => setType("all")}>
                Notifications
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link eventKey="second" onClick={() => setType("active")}>
                Push Notifications
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content className="pt-4">
            <Tab.Pane eventKey="home">
              <Col>
                {notification?.map((item, i) => (
                  <Card key={i}>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h3 className="text-muted">New User Resisterd!</h3>
                          <p className="fs-14">
                            Description:{" "}
                            <span
                              // onClick={() => (
                              //   dispatch(setCurrentUserAction(item)),
                              //   props.history.push("/user-details")
                              // )}
                            >
                              <b className="text-primary">{item.userName} </b>
                            </span>
                             Resisterd on{" "}
                            {moment(item.createdAt).format("DD/MM/YYYY")}.
                          </p>
                        </div>
                        <div className="d-flex" style={{ gap: "1.5rem" }}>
                          {/* <img src={crossIcon} width={40} /> */}
                          <button
                            className="btn btn-success fs-12 py-2"
                            onClick={() => onApprove(item.userId._id)}
                          >
                            Approve
                          </button>
                          <button className="btn btn-danger fs-12 py-2" onClick={() => onReject(item._id)}>
                            Reject
                          </button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
                {notification?.length === 0 && !loader ? (
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
              </Col>
            </Tab.Pane>
          </Tab.Content>
          <Tab.Content>
            <Tab.Pane eventKey="second">
              <div className="col-lg-8 col-md-7 ">
                <div className="authincation-content text-black p-5">
                  <div className="mb-4">
                    <h3 className="mb-1 font-w600 text-black ">Add Details</h3>
                  </div>

                  <form onSubmit={onSubmit}>
                    <div className="form-group">
                      <label className="mb-2 ">
                        <strong className="">Title</strong>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title"
                      />
                      {errors.title && (
                        <div className="text-danger fs-12">{errors.title}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="mb-2 ">
                        <strong className="">Body</strong>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Write something here.."
                      />
                      {errors.body && (
                        <div className="text-danger fs-12">{errors.body}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="mb-2 ">
                        <strong className="">Send To</strong>
                      </label>

                      <MultiSelect
                        className="form-control"
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        required
                      />
                      {errors.selected && (
                        <div className="text-danger fs-12">
                          {errors.selected}
                        </div>
                      )}
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
      {loader && <Spinner />}
    </div>
  );
}
