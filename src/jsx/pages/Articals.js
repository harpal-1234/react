import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Dropdown, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { actionArticle, deleteArticle, getArticle } from "../../services/ArticleService/ArticleService";
import Pagination from "../common/Pagination";
import Spinner from "../common/Spinner";
import PageTitle from "../layouts/PageTitle";
import AddArtical from "../modal/AddArtical";

export default function Articals(props) {
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
  const [articles, setArticles] = useState([]);
  const [apiError, setApiError] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
 
  const limit = 5;
  function getTableData() {
    setLoader(true);
    getArticle(currentPage, limit)
      .then((response) => {
        setArticles(response.data.data.Articles);
        const total = response.data.data.countArticles;
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
    deleteArticle(id)
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
        if (error.response.data.statusCode === 401) {
          localStorage.clear("authDetails");
          props.history.push("/login");
        }
      });
  }
  function onAction(id) {
    setLoader(true);
    actionArticle(id)
      .then((response) => {
        notifyTopRight(response.data.data.updateArticle);
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
    console.log(currentPage," new 111")
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
      <PageTitle activeMenu="Artical List" motherMenu="Artical" />
      <div className="d-flex justify-content-end mb-3">
        <Button className="btn btn-primary" onClick={() => setPostModal(true)}>
          Add New +
        </Button>
      </div>
      <Col>
        <Card>
          <Card.Header className="d-block">
            <div className="d-flex justify-content-between ">
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
          </Card.Header>
          <Card.Body>
            <Table>
              <thead style={{ color: "black" }}>
                <tr>
                  <th>
                    <strong>IMAGE</strong>
                  </th>
                  <th>
                    <strong>TITLE</strong>
                  </th>
                  <th>
                    <strong>CATEGORY</strong>
                  </th>
                  <th>
                    <strong>DESCRIPTION</strong>
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
                {articles.map((item) => (
                  <tr>
                    <td><img src={item.profile} width={70} height={70}/></td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.description}</td>
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
             {articles?.length === 0 && !loader ? (
              <div className="justify-content-center d-flex my-5 ">
                Sorry, Data Not Found!
              </div>
            ) : (
              ""
            )}
           <Pagination pageCount={pageCount} pageValue={currentPage} setPage={setCurrentPage}/>
          </Card.Body>
        </Card>
      </Col>
      <AddArtical show={postModal} table={getTableData}  onHide={() => setPostModal(false)} />
      {loader && <Spinner />}
    </div>
  );
}
