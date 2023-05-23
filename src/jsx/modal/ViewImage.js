import React from 'react'
import { Modal } from 'react-bootstrap'
import dummyImage from "../../images/1.jpg"
export default function ViewImage({ show,image, onHide, table }) {
  return (
    <Modal className="modal fade" show={show} centered>
        <div className='w-100'>
        <img src={dummyImage}  style={{width:"inherit"}}/>
        <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-info"
                // onClick={onSubmit}
              >
                Download
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
        </div>
  
  </Modal>
  )
}
