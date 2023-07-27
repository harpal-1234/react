import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import dummyImage from "../../images/1.jpg"
import { saveAs } from 'file-saver'
export default function ViewImage({ show,image, onHide, }) {
// console.log(image,"image")

  const downloadImage = () => {
    saveAs(image, 'image.jpg') // Put your image url here.
  }

  useEffect(() => {
    if(show) {
    }
   },[show]);
  return (
    <Modal className="modal fade" show={show} centered>
        <div className='w-100'>
        <img src={image?image:dummyImage}  style={{width:"inherit"}}/>
        <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-info"
                onClick={downloadImage}
              >
                Download
              </button>
              <button
                type="button"
                onClick={() => onHide()}
                className="btn btn-danger"
              >
                {" "}
                <i className="flaticon-delete-1"></i> Close
              </button>
            </div>
        </div>
  
  </Modal>
  )
}
