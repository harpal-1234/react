import React, { useState } from "react";
import { Dropdown, Modal } from "react-bootstrap";
import swal from "sweetalert";
import { nanoid } from "nanoid";
import user from "../../images/task/user.jpg";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { uploadFile } from "react-s3";
import { postArticle } from "../../services/ArticleService/ArticleService";
import Spinner from "../common/Spinner";
window.Buffer = window.Buffer || require("buffer").Buffer;
export default function AddArtical({ show, onHide, table }) {
  const config = {
    bucketName: "traintab",
    region: "us-west-2",
    accessKeyId: "AKIAWTWYHC4UXKAFO6WZ",
    secretAccessKey: "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",
    // successActionstatus: 201,
  };
  let responseImage = {};
  const [loader, setLoader] = useState(false);
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [apiError, setApiError] = useState("");

  let errorsObj = {
    image: "",
    title: "",
    description: "",
  };
  const [errors, setErrors] = useState(errorsObj);

  const notifyTopRight = () => {
    toast.success(`✅ Created Successfully.`, {
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
  const handleChangeContent = (content) => {
    setDescription(content);
  };
  async function onSubmit(e) {
    
    e.preventDefault();

    let error = false;
    const errorObj = { ...errorsObj };
    if (type === "") {
      errorObj.type = "Image is Required !";
      error = true;
    }
    if (image === "") {
      errorObj.image = "Image is Required !";
      error = true;
    }
    if (title === "") {
      errorObj.title = "Title is Required !";
      error = true;
    }

    if (description === "") {
      errorObj.description = "This Field is Required !";
      error = true;
    }

    setErrors(errorObj);
    if (error) {
      return;
    }
    setLoader(true);
    responseImage = await uploadFile(image, config);
    postArticle(responseImage.location, title, category, description,type,tag)
      .then((response) => {
        console.log(response, "vgvfdfhjvhfvhg");
        setLoader(false);
        notifyTopRight("");
        setType("");
        setImage("");
        setTitle("");
        setCategory("");
        setDescription("");
        onHide();
        table();
      })
      .catch((error) => {
        setLoader(false);
        // notifyError(error.response.data.message);
        console.log(error.response, "error");
        setApiError(error.response.data.data);
      });
  }
  return (
    <Modal className="modal fade" show={show} centered size="lg" >
      <div className="">
        <form>
          <div className="modal-header">
            <h4 className="modal-title fs-20">Add Article Details</h4>
            <button
              type="button"
              className="btn close"
              onClick={() => onHide()}
            >
              <span>×</span>
            </button>
          </div>
          <div className="modal-body">
            <i className="flaticon-cancel-12 close"></i>
            <div className="add-contact-box">
              <div className="add-contact-content">
                <div className="form-group mb-3">
                  <label className="text-black font-w500">Article Type</label>
                  <div className="contact-name">
                    <select className="form-control"   value={type}
                      onChange={(e) => setType(e.target.value)}>
                      <option hidden>Select..</option>
                      <option>Program</option>
                      <option>Tips</option>
                    </select>
                    {errors.type && (
                      <div className="text-danger fs-12">{errors.type}</div>
                    )}
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label className="text-black font-w500">Image</label>
                  <div className="contact-name">
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      onChange={(e) => setImage(e.target.files[0])}
                      multiple
                      style={{ paddingTop: "14px" }}
                    />
                    {errors.image && (
                      <div className="text-danger fs-12">{errors.image}</div>
                    )}
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label className="text-black font-w500">Title</label>
                  <div className="contact-name">
                    <input
                      type="text"
                      className="form-control"
                      name="Cust_Id"
                      required="required"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="title"
                    />
                    {errors.title && (
                      <div className="text-danger fs-12">{errors.title}</div>
                    )}
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label className="text-black font-w500">Category</label>
                  <div className="contact-name">
                    <select
                      className="form-control"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option hidden>Select..</option>
                      <option>Yoga</option>
                      <option>Workout</option>
                      <option>Strength</option>
                      <option>Cardio</option>
                      <option>Aerobic</option>
                      <option>Core Training</option>
                      <option>Happiness</option>
                      <option>Wellness</option>
                    </select>
                    {errors.category && (
                      <div className="text-danger fs-12">{errors.category}</div>
                    )}
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label className="text-black font-w500">Tag</label>

                  <div className="contact-name">
                    <input
                      type="text"
                      className="form-control"
                      required="required"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      placeholder="Subcategory"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="text-black font-w500">Description</label>
                  <Editor
                    init={{
                      height: 200,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image code charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code textcolor wordcount",
                        "textarea",
                        "textcolor",
                        "forecolor backcolor",
                      ],
                      toolbar:
                        "undo redo | formatselect | code |link | image | bold italic backcolor | alignleft aligncenter alignright alignjustify |  \n" +
                        "bullist numlist outdent indent | textcolor | textarea | forecolor backcolor",
                      content_style: "body { color: #000 }",
                    }}
                    onEditorChange={handleChangeContent}
                    name="prescription"
                  />
                  {errors.description && (
                    <div className="text-danger fs-12">
                      {errors.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-info" onClick={onSubmit}>
              Add
            </button>
            <button
              type="button"
              onClick={() => onHide()}
              className="btn btn-danger"
            >
              {" "}
              <i className="flaticon-delete-1"></i> Discard
            </button>
          </div>
        </form>
      </div>
      {loader && <Spinner />}
    </Modal>
  );
}
