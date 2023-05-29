import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import PageTitle from "../layouts/PageTitle";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../common/Spinner";
import { postPolicy } from "../../services/Policy/PolicyService";

export default function Policies() {
  const notifyTopRight = () => {
    toast.success("✅ success !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  const notifyError = () => {
    toast.error("❌ Error !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const [policyText, setpolicyText] = useState("");
  const [type, setType] = useState("");
  const [loader, setLoader] = useState("");
  let errorsObj = {
    policyText: "",
    type: "",
  };
  const [errors, setErrors] = useState(errorsObj);

  const handleChangeContent = (content) => {
    setpolicyText(content);
  };

  async function onSubmit(e) {
    e.preventDefault();

    let error = false;
    const errorObj = { ...errorsObj };

    if (policyText === "") {
      errorObj.policyText = "This Field is Required !";
      error = true;
    }
    if (type === "") {
      errorObj.type = "Please select an type!";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }

    setLoader(true);
    console.log(policyText, type, "body data");
    postPolicy(policyText, type)
      .then((response) => {
        console.log(response, "post response");
        setLoader(false);
        setpolicyText("");
        notifyTopRight("");
      })
      .catch((error) => {
        setLoader(false);
        notifyError(error.response.data.message);
        console.log(error.response, "error");
      });
  }
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
      <PageTitle activeMenu="Upload Policy" motherMenu="Policies" />
      <div className="d-flex justify-content-end mb-3">
        <div>
          <select
            style={{
              color: "#7e7e7e",
              padding: " 10px",
              borderColor: "lightgrey",
              borderRadius: "6px",
            }}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option hidden>Select policy</option>
            <option value="policy">Privacy Policy</option>
            <option value="termAndCondition">Terms & Conditions</option>
          </select>
          {errors.type && (
            <div className="text-danger fs-12">{errors.type}</div>
          )}
        </div>
      </div>

      <Editor
        //initialValue={prescription}
        init={{
          height: 500,
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
        value={policyText}
      />
      {errors.policyText && (
        <div className="text-danger fs-12">{errors.policyText}</div>
      )}
      <div className="d-flex justify-content-end mt-4">
        <button
          className="btn btn-primary btn-sm sharp"
          type="submit"
          onClick={(e) => {
            onSubmit(e);
          }}
        >
          Send
        </button>
      </div>
      {loader && <Spinner />}
    </div>
  );
}
