import React, { useState } from "react";
import { Dropdown, Modal } from "react-bootstrap";
import { uploadFile } from "react-s3";
import { toast } from "react-toastify";
import { postAdvertise } from "../../services/Advertise/AdvertiseService";
window.Buffer = window.Buffer || require("buffer").Buffer;
export default function Advertisement({ show,table, onHide }) {
 
  
 
  const config = {
    bucketName: "traintab",
    region: "us-west-2",
    accessKeyId: "AKIAWTWYHC4USCNNQDXK",
    secretAccessKey: "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",
  };
  let responseImage = {};
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState("");
  const [couponTitle, setCouponTitle] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [offer, setOffer] = useState("");
  const [apiError, setApiError] = useState("");

  let errorsObj = {
    image: "",
    couponTitle: "",
    couponCode: "",
    offer: "",
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
 
  async function onSubmit(e) {
    setLoader(true);
    e.preventDefault();

    let error = false;
    const errorObj = { ...errorsObj };
    if (image === "") {
      errorObj.image = "Image is Required !";
      error = true;
    }
    if (couponTitle === "") {
      errorObj.couponTitle = "Title is Required !";
      error = true;
    }

    if (couponCode === "") {
      errorObj.couponCode = "This Field is Required !";
      error = true;
    }
    if (offer === "") {
      errorObj.offer = "This Field is Required !";
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
    setLoader(true);
    postAdvertise(responseImage.location, couponTitle,couponCode, offer)
      .then((response) => {
        console.log(response, "post response");
        setLoader(false);
        notifyTopRight("");
        setImage("");
        setCouponTitle("");
        setCouponCode("")
        setOffer("");
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
                <div className="form-group mb-3">
                    <label className="text-black font-w500">Image</label>
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
                  </div>
                  <div className="form-group mb-3">
                    <label className="text-black font-w500">Coupon Title</label>
                    <div className="contact-name">
                      <input
                        type="text"
                        className="form-control"
                        autocomplete="off"
                        
                        required="required"
                        onChange={(e)=>setCouponTitle(e.target.value)}
                        placeholder="title"
                      />
                       {errors.couponTitle && (
                      <div className="text-danger fs-12">{errors.couponTitle}</div>
                    )}
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label className="text-black font-w500">Coupon Code</label>
                    <div className="contact-name">
                      <input
                        type="text"
                        className="form-control"
                        autocomplete="off"
                     
                        required="required"
                        onChange={(e)=>setCouponCode(e.target.value)}
                        placeholder="code"
                      />
                       {errors.couponCode && (
                      <div className="text-danger fs-12">{errors.couponCode}</div>
                    )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="text-black font-w500">Offer</label>
                    <input
                        type="text"
                        className="form-control"
                        autocomplete="off"
                       
                        required="required"
                        onChange={(e)=>setOffer(e.target.value)}
                        placeholder="offer"
                      />
                      {errors.offer && (
                      <div className="text-danger fs-12">{errors.offer}</div>
                    )}
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
