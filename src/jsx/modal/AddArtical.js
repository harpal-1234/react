import React, { useState } from "react";
import { Dropdown, Modal } from "react-bootstrap";
import swal from "sweetalert";
import { nanoid } from "nanoid";
import user from "../../images/task/user.jpg";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { uploadFile } from "react-s3";
import { postArticle } from "../../services/ArticleService/ArticleService";
window.Buffer = window.Buffer || require("buffer").Buffer;
export default function AddArtical({ show, onHide, table }) {
  const config = {
    bucketName: "traintab",
    region: "us-west-2",
    accessKeyId: "AKIAWTWYHC4USCNNQDXK",
    secretAccessKey: "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",
    // successActionstatus: 201,
  };
  let responseImage = {};
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
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
    setLoader(true);
    e.preventDefault();

    let error = false;
    const errorObj = { ...errorsObj };
    // if (image === "") {
    //   errorObj.image = "Image is Required !";
    //   error = true;
    // }
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
    // const file = new File([image], new Date().getTime());
    // console.log(file, "after file creation");
    // if (file.size > 0) {
    responseImage = await uploadFile(image, config);
    // responseImage = await uploadFile(file, config);
    // console.log(responseImage, "after upload");
    // }

    postArticle(responseImage.location, title, category, description)
      .then((response) => {
        console.log(response, "vgvfdfhjvhfvhg");
        setLoader(false);
        notifyTopRight("");
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
    <Modal className="modal fade" show={show} centered>
      <div className="">
        <form>
          <div className="modal-header">
            <h4 className="modal-title fs-20">Add Artical Details</h4>
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
                    <select
                    className="form-control"
                    
                    >
                      <option hidden>Select..</option>
                      <option>Program</option>
                      <option>Tips</option>
                    </select>
                    {/* {errors.title && (
                      <div className="text-danger fs-12">{errors.title}</div>
                    )} */}
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
                    
                    >
                      <option hidden>Select..</option>
                      <option>Yoga</option>
                      <option>Workout</option>
                      <option>Strength</option>
                      <option>Cardio</option>
                    </select>
                    {errors.category && (
                      <div className="text-danger fs-12">{errors.category}</div>
                    )}
                  </div>
                 
                </div>
                <div className="form-group mb-3">
                  <label className="text-black font-w500">SubCategory</label>
                
                  <div className="contact-name">
                    <input
                      type="text"
                      className="form-control"
                    
                      required="required"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Subcategory"
                    />
                    {/* {errors.category && (
                      <div className="text-danger fs-12">{errors.category}</div>
                    )} */}
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
    </Modal>
  );
}
