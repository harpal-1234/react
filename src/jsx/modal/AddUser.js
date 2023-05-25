import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { uploadFile } from "react-s3";
import { MultiSelect } from "../pages/MultiSelect";
export default function AddUser({ show, table, onHide }) {
  const config = {
    bucketName: "traintab",
    region: "us-west-2",
    accessKeyId: "AKIAWTWYHC4USCNNQDXK",
    secretAccessKey: "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",
  };
  let responseImage = {};
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [phNumber, setPhNumber] = useState("");
  const [typeOfTrainer, setTypeOfTrainer] = useState([]);
  const [trainingLocation, setTrainingLocation] = useState([]);
  const [services, setServices] = useState([]);
  const [years, setYears] = useState([]);
  const [clients, setClients] = useState([]);
  const [noOfCertificate, setNoOfCertificate] = useState("");
  const [certificate, setCertificate] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [apiError, setApiError] = useState("");
  
  let errorsObj = {
    image: "",
    fname: "",
    lname: "",
    email: "",
    dob: "",
    address: "",
    phNumber: "",
    typeOfTrainer: "",
    trainingLocation: "",
    services: "",
    years: "",
    clients: "",
    noOfCertificate: "",
    certificate: "",
    password: "",
    verifyPassword: "",
  };
  const [errors, setErrors] = useState(errorsObj);

  const options = [
    { value: "Personal Trainer",label: "Personal Trainer",},
    { value: "Group Fitness Instructor", label: "Group Fitness Instructor" },
    { value: "Sports Coach ", label: "Sports Coach " },
    { value: "Lifestyle Coach", label: "Lifestyle Coach" },
    { value: "Athletic Trainer", label: "Athletic Trainer" },
    { value: "Bodybuilding Coach", label: "Bodybuilding Coach" },
  ];
  const locationOptions = [
    { value: "Outdoor/Park",label: "Outdoor/Park",},
    { value: "Gym Owner", label: "Gym Owner" },
    { value: "Boutique Gym", label: "Boutique Gym" },
    { value: "University", label: "University" },
    { value: "CF Gym", label: "CF Gym" },
    { value: "Personal Training Gym", label: "Personal Training Gym" },
  ];
  const serviceOptions = [
    { value: "In Person",label: "In Person",},
    { value: "Virtual", label: "Virtual" },
    { value: "1-0n-1 Personal Training ", label: "1-0n-1 Personal Training " },
    { value: "Partner Personal Training", label: "Partner Personal Training" },
    { value: "Group Training", label: "Group Training" },
    { value: "Educational Classes/Seminars", label: "Educational Classes/Seminars" },
  ];
  const yearsOptions = [
    { value: "0-1",label: "0-1",},
    { value: "1-3", label: "1-3" },
    { value: "3-5", label: "3-5" },
    { value: "5-10", label: "5-10" },
    { value: "10+", label: "10+" },
    
  ];
  const clientOptions = [
    { value: "0-10",label: "0-10",},
    { value: "11-25", label: "11-25" },
    { value: "26-40", label: "26-40" },
    { value: "41-60", label: "41-60" },
    { value: "61+", label: "61+" },
  ];
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
    if (fname === "") {
      errorObj.fname = "Title is Required !";
      error = true;
    }

    if (lname === "") {
      errorObj.lname = "This Field is Required !";
      error = true;
    }
    if (email === "") {
      errorObj.email = "Image is Required !";
      error = true;
    }
    if (dob === "") {
      errorObj.dob = "Title is Required !";
      error = true;
    }

    if (address === "") {
      errorObj.address = "This Field is Required !";
      error = true;
    }
    if (phNumber === "") {
      errorObj.phNumber = "Image is Required !";
      error = true;
    }
    if (typeOfTrainer === "") {
      errorObj.typeOfTrainer = "Title is Required !";
      error = true;
    }

    if (trainingLocation === "") {
      errorObj.trainingLocation = "This Field is Required !";
      error = true;
    }
    if (services === "") {
      errorObj.services = "Image is Required !";
      error = true;
    }
    if (years === "") {
      errorObj.years = "Title is Required !";
      error = true;
    }

    if (clients === "") {
      errorObj.clients = "This Field is Required !";
      error = true;
    }
    if (noOfCertificate === "") {
      errorObj.noOfCertificate = "This Field is Required !";
      error = true;
    }
    if (certificate === "") {
      errorObj.certificate = "Image is Required !";
      error = true;
    }
    if (password === "") {
      errorObj.password = "Title is Required !";
      error = true;
    }

    if (verifyPassword === "") {
      errorObj.verifyPassword = "This Field is Required !";
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

    // postArticle(responseImage.location, title, category, description)
    //   .then((response) => {
    //     console.log(response, "vgvfdfhjvhfvhg");
    //     setLoader(false);
    //     notifyTopRight("");
    //     setImage("");
    //     setTitle("");
    //     setCategory("");
    //     setDescription("");
    //     onHide();
    //     table();
    //   })
    //   .catch((error) => {
    //     setLoader(false);
    //     // notifyError(error.response.data.message);
    //     console.log(error.response, "error");
    //     setApiError(error.response.data.data);
    //   });
  }
  return (
    <Modal className="modal fade" show={show} centered>
      <div className="">
        <div className="">
          <form>
            <div className="modal-header">
              <h4 className="modal-title fs-20">Add User Details</h4>
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
                  <div className="form-group">
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
                  <div className="form-group">
                    <label className="text-black font-w500">First Name</label>
                    <div className="contact-name">
                      <input
                        type="text"
                        className="form-control"
                        required="required"
                        onChange={(e) => setFname(e.target.value)}
                        placeholder="First name"
                      />
                      {errors.fname && (
                        <div className="text-danger fs-12">{errors.fname}</div>
                      )}
                    </div>
                  </div>
                  <div className="form-group ">
                    <label className="text-black font-w500">Last Name</label>
                    <div className="contact-name">
                      <input
                        type="text"
                        className="form-control"
                        required="required"
                        onChange={(e) => setLname(e.target.value)}
                        placeholder="Last name"
                      />
                      {errors.lname && (
                        <div className="text-danger fs-12">{errors.lname}</div>
                      )}
                    </div>
                  </div>
                  <div className="form-group ">
                    <label className="text-black font-w500">Email</label>
                    <div className="contact-name">
                      <input
                        type="text"
                        className="form-control"
                        name="Date_Join"
                        required="required"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                      />
                    </div>
                    {errors.email && (
                      <div className="text-danger fs-12">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="text-black font-w500">
                      Date Of Birth
                    </label>
                    <div className="contact-name">
                      <input
                        type="text"
                        className="form-control"
                        required="required"
                        onChange={(e) => setDob(e.target.value)}
                        placeholder="Date of birth"
                      />
                    </div>
                    {errors.dob && (
                      <div className="text-danger fs-12">{errors.dob}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="text-black font-w500">Phone Number</label>
                    <div className="contact-name">
                      <input
                        type="number"
                        className="form-control"
                        name="Date_Join"
                        required="required"
                        onChange={(e) => setPhNumber(e.target.value)}
                        placeholder="Phone number"
                      />
                    </div>
                    {errors.phNumber && (
                      <div className="text-danger fs-12">{errors.phNumber}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="text-black font-w500">Address</label>
                    <div className="contact-name">
                      <input
                        type="text"
                        className="form-control"
                        name="Date_Join"
                        required="required"
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                      />
                    </div>
                    {errors.address && (
                      <div className="text-danger fs-12">{errors.address}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="text-black font-w500">
                      Type Of Trainer
                    </label>
                    <MultiSelect
                      className="form-control"
                      options={options}
                      value={typeOfTrainer}
                      onChange={setTypeOfTrainer}
                      required
                    />
                   
                    {errors.typeOfTrainer && (
                      <div className="text-danger fs-12">
                        {errors.typeOfTrainer}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="text-black font-w500">
                      Training Location
                    </label>
                    <div className="contact-name">
                    <MultiSelect
                      className="form-control"
                      options={locationOptions}
                      value={trainingLocation}
                      onChange={setTrainingLocation}
                      required
                    />
                     
                    </div>
                    {errors.trainingLocation && (
                      <div className="text-danger fs-12">
                        {errors.trainingLocation}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="text-black font-w500">Services</label>
                    <div className="contact-name">
                    <MultiSelect
                      className="form-control"
                      options={serviceOptions}
                      value={services}
                      onChange={setServices}
                      required
                    />
                     
                    </div>
                    {errors.services && (
                      <div className="text-danger fs-12">{errors.services}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="text-black font-w500">
                      Years In Business
                    </label>
                    <div className="contact-name">
                    <MultiSelect
                      className="form-control"
                      options={yearsOptions}
                      value={years}
                      onChange={setYears}
                      required
                    />
                    </div>
                    {errors.years && (
                      <div className="text-danger fs-12">{errors.years}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="text-black font-w500">Clients</label>
                    <div className="contact-name">
                    <MultiSelect
                      className="form-control"
                      options={clientOptions}
                      value={clients}
                      onChange={setClients}
                      required
                    />
                    </div>
                    {errors.clients && (
                      <div className="text-danger fs-12">{errors.clients}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="text-black font-w500">
                      Number of Certification
                    </label>
                    <div className="contact-name">
                      <input
                        type="number"
                        className="form-control"
                        name="Date_Join"
                        required="required"
                        onChange={(e) => setNoOfCertificate(e.target.value)}
                        placeholder="Number of certification"
                      />
                    </div>
                    {errors.noOfCertificate && (
                      <div className="text-danger fs-12">
                        {errors.noOfCertificate}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="text-black font-w500">
                      Fitness Certificate
                    </label>
                    <div className="contact-name">
                      <input
                        type="file"
                        className="form-control"
                        name="Date_Join"
                        required="required"
                        onChange={(e) => setCertificate(e.target.value)}
                        placeholder="Certificate"
                      />
                    </div>
                    {errors.certificate && (
                      <div className="text-danger fs-12">
                        {errors.certificate}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="text-black font-w500">Password</label>
                    <div className="contact-name">
                      <input
                        type="text"
                        className="form-control"
                        name="Date_Join"
                        required="required"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                      />
                    </div>
                    {errors.password && (
                      <div className="text-danger fs-12">{errors.password}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="text-black font-w500">
                      Verify Password
                    </label>
                    <div className="contact-name">
                      <input
                        type="text"
                        className="form-control"
                        name="Date_Join"
                        required="required"
                        onChange={(e) => setVerifyPassword(e.target.value)}
                        placeholder="Confirm password"
                      />
                    </div>
                    {errors.verifyPassword && (
                      <div className="text-danger fs-12">
                        {errors.verifyPassword}
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
      </div>
    </Modal>
  );
}
