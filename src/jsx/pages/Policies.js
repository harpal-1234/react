import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import PageTitle from "../layouts/PageTitle";
import { ToastContainer, toast } from "react-toastify";
// import { sendPolicy } from "../../services/AuthService";
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
  const handleChangeClinical = (content) => {
    setpolicyText(content);
  };
  
//   const handleClinicalSubmit = (e) => {
//     console.log(typeof policyText, "kkkkkkkkkjg");
//     // if (clinical == "") {
//     //   setClinicalErr("This field should not be empty");
//     //   return;
//     // }
//     // setClinicalErr("");
//     // const myForm = new FormData();
//     // myForm.set("type", "clinicalDetails");
//     // myForm.set("text", clinical);
//     const myForm = {
//       type: "privacy",
//       data: policyText
//     }
//     console.log(myForm, "myform data editor");
//     sendPolicy(myForm)
//     .then((response) => {
// console.log(response,"policy api responce")
//       setpolicyText("");
//       notifyTopRight();
//     })
//     .catch((error) => {
//       console.log(error.response, "policy error");
//       notifyError();
//       if(error.response.data.statusCode === 401){
//         localStorage.clear("userDetails");
//         props.history.push("/login");
//       }
      
//     });
//     // dispatch(updateAppointmentAction(myForm, id, auth.idToken));
//   };
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
  <select
 
   style={{
     color: "#7e7e7e",
     padding: " 10px",
     borderColor: "lightgrey",
     borderRadius: "6px"}}
  >
  <option hidden>Select policy</option>
    <option>Privacy Policy</option>
    <option>Cookie Policy</option>
  </select>
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
    // onEditorChange={handleChangeClinical}
    name="prescription"
  />
  <div className="d-flex justify-content-end mt-4">
    <button
      className="btn btn-primary btn-sm sharp"
      type="submit"
    //   onClick={(e) => {
    //     handleClinicalSubmit(e);
    //   }}
    >
      Send
    </button>
  </div>
</div>
  )
}

