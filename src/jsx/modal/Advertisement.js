import React, { useState } from "react";
import { Dropdown, Modal } from "react-bootstrap";
import swal from "sweetalert";
import { nanoid } from "nanoid";
import user from "../../images/task/user.jpg";
import { Editor } from "@tinymce/tinymce-react";
export default function Advertisement({ show, onHide }) {
  const [postModal, setPostModal] = useState(false);
  const [contacts, setContacts] = useState();
  const [selected, setSelected] = useState("Standard");
  // delete data
  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === contactId);
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };

  //Add data
  const [addFormData, setAddFormData] = useState({
    Cust_Id: "",
    Date_Join: "",
    Cust_Name: "",
    Location: "",
    image: "",
  });

  // Add contact function
  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };
  //Add Submit data
  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    var error = false;
    var errorMsg = "";
    if (addFormData.Date_Join === "") {
      error = true;
      errorMsg = "Please fill date";
    } else if (addFormData.Cust_Name === "") {
      error = true;
      errorMsg = "Please fill name.";
    } else if (addFormData.Location === "") {
      error = true;
      errorMsg = "Please fill location";
    }
    if (!error) {
      const newContact = {
        id: nanoid(),
        Cust_Id: addFormData.Cust_Id,
        Date_Join: addFormData.Date_Join,
        Cust_Name: addFormData.Cust_Name,
        Location: addFormData.Location,
        image: addFormData.image,
      };
      const newContacts = [...contacts, newContact];
      setContacts(newContacts);
      setPostModal(false);
      swal("Good job!", "Successfully Added", "success");
      addFormData.Cust_Name = addFormData.Location = addFormData.Date_Join = "";
    } else {
      swal("Oops", errorMsg, "error");
    }
  };
  const [file, setFile] = useState(null);
  const fileHandler = (e) => {
    setFile(e.target.files[0]);
    setTimeout(function () {
      var src = document.getElementById("saveImageFile").getAttribute("src");
      addFormData.image = src;
    }, 200);
  };
  return (
    <Modal className="modal fade" show={show}>
      <div className="">
        <div className="">
          <form>
            <div className="modal-header">
              <h4 className="modal-title fs-20">Add Advertisement Details</h4>
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
                  <div className="image-placeholder">
                    <div className="avatar-edit">
                      <input
                        type="file"
                        onChange={fileHandler}
                        id="imageUpload"
                        onClick={(event) => setFile(event.target.value)}
                      />
                      <label htmlFor="imageUpload" name=""></label>
                    </div>
                    <div className="avatar-preview">
                      <div id="imagePreview">
                        <img
                          style={{ objectFit: "contain" }}
                          id="saveImageFile"
                          src={file ? URL.createObjectURL(file) : user}
                          alt={file ? file.name : null}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label className="text-black font-w500">Coupon Title</label>
                    <div className="contact-name">
                      <input
                        type="text"
                        className="form-control"
                        autocomplete="off"
                        name="Cust_Id"
                        required="required"
                        onChange={handleAddFormChange}
                        placeholder="title"
                      />
                      <span className="validation-text"></span>
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label className="text-black font-w500">Coupon Code</label>
                    <div className="contact-name">
                      <input
                        type="text"
                        className="form-control"
                        autocomplete="off"
                        name="Date_Join"
                        required="required"
                        onChange={handleAddFormChange}
                        placeholder="code"
                      />
                      <span className="validation-text"></span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="text-black font-w500">Offer</label>
                    <input
                        type="text"
                        className="form-control"
                        autocomplete="off"
                        name="Date_Join"
                        required="required"
                        onChange={handleAddFormChange}
                        placeholder="offer"
                      />
                      <span className="validation-text"></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-info"
                onClick={handleAddFormSubmit}
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