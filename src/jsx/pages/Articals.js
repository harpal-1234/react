import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Dropdown, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  actionArticle,
  deleteArticle,
  getArticle,
} from "../../services/ArticleService/ArticleService";
import { setCurrentArticleAction } from "../../store/actions/ArticleDetailsAction";
import Pagination from "../common/Pagination";
import Spinner from "../common/Spinner";
import PageTitle from "../layouts/PageTitle";
import AddArtical from "../modal/AddArtical";
import parse from "html-react-parser";
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
  const [filterType, setFilterType] = useState("Default");
  const [search, setSearch] = useState("");
  const limit = 10;
  const dispatch = useDispatch();
  function MyComponent(content) {
    const htmlContent = content;
    const maxCharacters = 100; // Maximum number of characters to display

    // Create a temporary container to parse the HTML content
    const container = document.createElement("div");
    container.innerHTML = htmlContent;

    // Get the text content of the container
    const textContent = container.textContent || container.innerText;

    // Apply the character limit to the text content
    var slicedContent = textContent.slice(0, maxCharacters);

    // Check if the sliced content is shorter than the text content
    const displayContent =
      slicedContent.length < textContent.length
        ? { slicedContent }
        : htmlContent;
    // console.log(displayContent, "hello");
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: displayContent.slicedContent + "...",
        }}
      />
    );
  }
  function getTableData() {
    setLoader(true);
    getArticle(currentPage, limit, search, filterType)
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
        notifyTopRight(response.data.data.message);

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
    console.log(currentPage, " new 111");
  }, [currentPage, search, filterType]);
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
      <PageTitle activeMenu="Article List" motherMenu="Article" />

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
                <div>
                  <label className="fs-18 text-black pr-2">Filter:</label>
                  <select
                    style={{
                      color: "#7e7e7e",
                      padding: " 10px",
                      borderColor: "lightgrey",
                      borderRadius: "6px",
                    }}
                    onChange={(e) => setFilterType(e.target.value)}
                    required
                  >
                    <option>Default</option>
                    <option value="Program">Program</option>
                    <option value="Tips">Tips</option>
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-end mb-3">
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
                    <strong>TITLE</strong>
                  </th>
                  <th>
                    <strong>CATEGORY</strong>
                  </th>
                  <th>
                    <strong>TAG</strong>
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
                {articles.map((item, i) => (
                  <tr key={i}>
                    <td
                      onClick={() => (
                        dispatch(setCurrentArticleAction(item)),
                        props.history.push("/article-details")
                      )}
                      style={{ cursor: "pointer" }}
                    >
                      <img src={item.image} width={70} height={70} />
                    </td>
                    <td
                      onClick={() => (
                        dispatch(setCurrentArticleAction(item)),
                        props.history.push("/article-details")
                      )}
                      style={{ cursor: "pointer" }}
                    >
                      {item.title}
                    </td>
                    <td
                      onClick={() => (
                        dispatch(setCurrentArticleAction(item)),
                        props.history.push("/article-details")
                      )}
                      style={{ cursor: "pointer" }}
                    >
                      {item.category}
                    </td>
                    <td
                      onClick={() => (
                        dispatch(setCurrentArticleAction(item)),
                        props.history.push("/article-details")
                      )}
                      style={{ cursor: "pointer" }}
                    >
                      {item.subCategory}
                    </td>
                    <td
                      onClick={() => (
                        dispatch(setCurrentArticleAction(item)),
                        props.history.push("/article-details")
                      )}
                      style={{ cursor: "pointer" }}
                    >
                      {item.description.length > 100
                        ? MyComponent(item.description)
                        : parse(item.description)}
                    </td>
                    <td
                      onClick={() => (
                        dispatch(setCurrentArticleAction(item)),
                        props.history.push("/article-details")
                      )}
                      style={{ cursor: "pointer" }}
                    >
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
            <Pagination
              pageCount={pageCount}
              pageValue={currentPage}
              setPage={setCurrentPage}
            />
          </Card.Body>
        </Card>
      </Col>
      <AddArtical
        show={postModal}
        table={getTableData}
        onHide={() => setPostModal(false)}
      />
      {loader && <Spinner />}
    </div>
  );
}
