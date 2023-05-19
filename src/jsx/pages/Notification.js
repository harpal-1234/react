import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PageTitle from "../layouts/PageTitle";
import { Tab, Nav } from "react-bootstrap";
import { Dropdown, Card, Table, Badge, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { MultiSelect } from "./MultiSelect";
import crossIcon from "../../images/FAB.svg";
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
                  <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h3>New User Resisterd!</h3>
                        <p>Description: Ram Resisterd on 07/05/2023.</p>
                      </div>
                      <div>
                        <img src={crossIcon} width={40} />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
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




