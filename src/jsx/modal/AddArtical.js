import React, { useState } from "react";
import { Dropdown, Modal } from "react-bootstrap";
import swal from "sweetalert";
import { nanoid } from "nanoid";
import user from "../../images/task/user.jpg";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { uploadFile } from "react-s3";
import { postArticle } from "../../services/ArticleService/ArticleService";
export default function AddArtical({ show, onHide,table }) {
  const config = {
    bucketName: "pushyy-app",
    region: "us-west-2",
    accessKeyId: "AKIA2OS2KQJKGLET7ZE5",
    secretAccessKey: "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",
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
  const handleChangeClinical = (content) => {
    setDescription(content);
  };
  async function onSubmit(e) {
    setLoader(true);
    e.preventDefault();

    let error = false;
    const errorObj = { ...errorsObj };
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
    const file = new File([image], new Date().getTime());
    console.log(file, "after file creation");
    if (file.size > 0) {
      responseImage = await uploadFile(file, config);
      console.log(responseImage, "after upload");
    }
   
    postArticle(responseImage.location, title,category, description)
      .then((response) => {
        console.log(response, "vgvfdfhjvhfvhg");
        setLoader(false);
        notifyTopRight("");
        setImage("");
        setTitle("");
        setCategory("")
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
    <Modal className="modal fade" show={show}>
      <div className="">
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
                <div className="contact-name">
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      autocomplete="off"
                      onChange={(e) => setImage(e.target.files[0])}
                      multiple
                      style={{ paddingTop: "14px" }}
                    />
                    {errors.image && (
                      <div className="text-danger fs-12">{errors.image}</div>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <label className="text-black font-w500">Title</label>
                    <div className="contact-name">
                      <input
                        type="text"
                        className="form-control"
                        autocomplete="off"
                        name="Cust_Id"
                        required="required"
                        value={title}
                      onChange={(e) => setTitle(e.target.value)}
                        placeholder="title"
                      />
                      <span className="validation-text"></span>
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label className="text-black font-w500">Category</label>
                    <div className="contact-name">
                      <input
                        type="text"
                        className="form-control"
                        autocomplete="off"
                        name="Date_Join"
                        required="required"
                        value={category}
                      onChange={(e) => setCategory(e.target.value)}
                        placeholder="category"
                      />
                      <span className="validation-text"></span>
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
                      onEditorChange={handleChangeClinical}
                      name="prescription"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-info"
                onClick={onSubmit}
              >
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
      </div>
    </Modal>
  );
}
