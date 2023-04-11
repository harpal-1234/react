import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PageTitle from "../layouts/PageTitle";
import { Tab, Nav } from "react-bootstrap";
import { Dropdown, Card, Table, Badge, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { MultiSelect } from "./MultiSelect";
export default function Notification(props) {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const limit = 10;
  const [dealSoled, setDealSoled] = useState("");
  const [type, setType] = useState("all");
  console.log(type);

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

  // function handleFetch() {
  //   setLoader(true);
  //   getVendorDetails(currentPage, limit, search, type).then((response) => {
  //     console.log(response, "response");
  //     setDealSoled(response.data.data.totalDealsPurchesed);
  //     setData(response.data.data.dealData);
  //     setLoader(false);
  //     const total = response.data.data.total;
  //     setPageCount(Math.ceil(total / limit));
  //     console.log(response.data.data, " table data ");
  //   }).catch((error)=>{
  //     if (error.response.data.statusCode === 401) {
  //       localStorage.clear("userDetails");
  //       props.history.push("/login");
  //     }
  //   });
  // }

  // useEffect(() => {
  //   handleFetch();
  // }, [currentPage, type]);

  const [apiError, setApiError] = useState();
  let errorsObj = { title: "", body: "",type:"", selected: [] };
  const [errors, setErrors] = useState(errorsObj);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  // const [type, setType] = useState("");
  const [selected, setSelected] = useState([]);
  const [hostSelected, setHostSelected] = useState([]);
  const [userList, setUserList] = useState([]);
  const [hostList, setHostList] = useState([]);
  const options = [
    ...userList?.map((item, i) => {
      return { value: item?._id, label: item?.name };
    }),
  ];
  const hostOptions = [
    ...hostList?.map((item, i) => {
      return { value: item?._id, label: item?.name };
    }),
  ];
  const totalIds = [...selected ,...hostSelected];
  // console.log(totalIds, "all ids")
  const ids = totalIds?.map((item, i) => {
    console.log(item?.value, "id...............");
    return item?.value;
  });

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
    // pushNotification(title,body,ids).then(()=>{
    //   swal("Done!", "Notification Sent Successfully.", "success");
    //   setTitle("");
    //   setBody("");
    //   setType("");
    //   setSelected("");
    //   setHostSelected("");
    //   setLoader(false);
    // })
    // .catch((error)=>{
    //   console.log(error.response,"helooooooooo")
    //   if(error.response.data.statusCode === 400){
    //       localStorage.clear("userDetails");
    //       props.history.push("/login");
    //     }
    //       })

  }

  // useEffect(() => {
  //   setLoader(true);
  //   getUsers().then((response) => {
  //     console.log(response, "user data response");
  //     setUserList(response.data.data.users);
  //     setLoader(false);
  //     console.log(response.data.data.users, " table data ");
  //   })
  //   .catch((error)=>{
  //     console.log(error.response,"helooooooooo")
  //     if(error.response.data.statusCode === 400){
  //         localStorage.clear("userDetails");
  //         props.history.push("/login");
  //       }
  //         });

  //   getHosts().then((response) => {
  //     console.log(response, "host data response");
  //     setHostList(response.data.data.users);
  //     setLoader(false);
  //     console.log(response.data.data.users, " host data ");
  //   })
  //   .catch((error)=>{
  //     console.log(error.response,"helooooooooo")
  //     if(error.response.data.statusCode === 400){
  //         localStorage.clear("userDetails");
  //         props.history.push("/login");
  //       }
  //         });
  // }, []);
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
                <Card>
                  {/* <Card.Header className="">
                    <div className="orders-filter">
                      <div className="row flex-grow-1">
                        <div className="col-4" style={{ flexGrow: 1 }}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
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
                                onKeyDown={(e) => {
                                  console.log(e.key);
                                  if (e.key === "Enter") {
                                    handleFetch();
                                    setCurrentPage(0);
                                  }
                                }}
                                onChange={(e) =>
                                  setSearch(e.target.value.trimEnd())
                                }
                              />
                              <div className="input-group-append">
                                <button
                                  type="button"
                                  className="btn btn-default"
                                  onClick={handleFetch}
                                >
                                  <i className="fa fa-search" />
                                </button>
                              </div>
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
                            <strong>TITLE</strong>
                          </th>
                          <th className="width80">
                            <strong>VALID FROM</strong>
                          </th>
                          <th>
                            <strong>VALID TILL</strong>
                          </th>
                          <th>
                            <strong>TOTAL PRICE</strong>
                          </th>
                          <th>
                            <strong>DISCOUNTED PRICE</strong>
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
                        {/* {data.map((item, i) => (
                          <tr key={i}>
                            <td>{item.title}</td>
                            <td>
                              {moment(item.validFrom).format("DD/MM/YYYY")}
                            </td>
                            <td>{moment(item.validTo).format("DD/MM/YYYY")}</td>
                            <td style={{ textAlign: "center" }}>${item.totalPrice}</td>
                            <td style={{ textAlign: "center" }}>${item.discountPrice}</td>
                            {item.status === "deactivate" ? (
                              <td>
                                <Badge variant="danger light">
                                  {item.status}
                                </Badge>
                              </td>
                            ) : (
                              <td>
                                <Badge variant="success light">
                                  {item.status}
                                </Badge>
                              </td>
                            )}

                            <td>
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="info light"
                                  className="i-false btn btn-info light sharp"
                                >
                                  <svg
                                    width="18px"
                                    height="18px"
                                    viewBox="0 0 24 24"
                                    version="1.1"
                                  >
                                    <g
                                      stroke="none"
                                      strokeWidth="1"
                                      fill="none"
                                      fillRule="evenodd"
                                    >
                                      <rect
                                        x="0"
                                        y="0"
                                        width={24}
                                        height={24}
                                      />
                                      <circle
                                        fill="#000000"
                                        cx="5"
                                        cy="12"
                                        r="2"
                                      />
                                      <circle
                                        fill="#000000"
                                        cx="12"
                                        cy="12"
                                        r="2"
                                      />
                                      <circle
                                        fill="#000000"
                                        cx="19"
                                        cy="12"
                                        r="2"
                                      />
                                    </g>
                                  </svg>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  {item.isBlocked ? (
                                    <Dropdown.Item
                                      onClick={() => onDisable(item._id)}
                                    >
                                      Enable
                                    </Dropdown.Item>
                                  ) : (
                                    <Dropdown.Item
                                      onClick={() => onDisable(item._id)}
                                    >
                                      Disable
                                    </Dropdown.Item>
                                  )}
                                  <Dropdown.Item
                                    onClick={() => onDelete(item._id)}
                                  >
                                    Delete
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))} */}
                      </tbody>
                    </Table>
                    {/* {data?.length === 0 && !loader ? (
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
            </Tab.Pane>
          </Tab.Content>
          <Tab.Content>
            <Tab.Pane eventKey="second">
            <div className="col-lg-8 col-md-7 ">
        <div className="authincation-content text-black notification">
          <div className="mb-4">
            <h3 className="mb-1 font-w600 text-black ">Add Details</h3>
          </div>
          {apiError && (
            <div
              role="alert"
              className="fade alert-dismissible fade show alert alert-danger show"
            >
              {apiError}
            </div>
          )}
           <form onSubmit={""}>
            <div className="form-group">
              <label className="mb-2 ">
                <strong className="">Title</strong>
              </label>
              <input
                type="text"
                className="form-control"
                // value={title}
                // onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
              />
              {/* {errors.title && (
                <div className="text-danger fs-12">{errors.title}</div>
              )} */}
            </div>
            <div className="form-group">
              <label className="mb-2 ">
                <strong className="">Body</strong>
              </label>
              <input
                type="text"
                className="form-control"
                // value={body}
                // onChange={(e) => setBody(e.target.value)}
                placeholder="Write something here.."
              />
              {/* {errors.body && (
                <div className="text-danger fs-12">{errors.body}</div>
              )} */}
            </div>
            <div className="form-group">
              <label className="mb-2 ">
                <strong className="">Send To</strong>
              </label>
              <select
                name="type"
                className="user-select w-100 p-2"
                required
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value="" >
                  Select Option..
                </option>
                <option>Users</option>
                <option>Event Hosts</option>
                <option>Both</option>
              </select>
              {errors.type && (
                <div className="text-danger fs-12">{errors.type}</div>
              )}
            </div>
            {type ==="Users"?( <div className="form-group">
              <label className="mb-2 ">
                <strong className="">Users</strong>
              </label>
              <MultiSelect
                className="user-select"
                options={options}
                value={selected}
                onChange={setSelected}
                required
              />
              {errors.selected && (
                <div className="text-danger fs-12">{errors.selected}</div>
              )}
            </div>):("")}
             {type ==="Event Hosts"?( <div className="form-group">
              <label className="mb-2 ">
                <strong className="">Event Hosts</strong>
              </label>
              <MultiSelect
                className="user-select"
                options={hostOptions}
                value={hostSelected}
                onChange={setHostSelected}
                required
              />
              {errors.selected && (
                <div className="text-danger fs-12">{errors.selected}</div>
              )}
            </div>):("")}
            {type ==="Both"?(<div> <div className="form-group">
              <label className="mb-2 ">
                <strong className="">Users</strong>
              </label>
              <MultiSelect
                className="user-select"
                options={options}
                value={selected}
                onChange={setSelected}
                required
              />
              {errors.selected && (
                <div className="text-danger fs-12">{errors.selected}</div>
              )}
            </div>
            <div className="form-group">
            <label className="mb-2 ">
              <strong className="">Event Hosts</strong>
            </label>
            <MultiSelect
              className="user-select"
              options={hostOptions}
              value={hostSelected}
              onChange={setHostSelected}
              required
            />
            {errors.selected && (
              <div className="text-danger fs-12">{errors.selected}</div>
            )}
          </div>
          </div>
            ):("")} 
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-block">
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
      {/* {loader && <Spinner />} */}
    </div>
  );
}




