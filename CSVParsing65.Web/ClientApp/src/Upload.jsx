import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Upload = () => {

  const fileRef = useRef(null);

  const navigate = useNavigate();



  const toBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const onUpload = async () => {
    const file = fileRef.current.files[0]
    const base64 = await toBase64(file)
    console.log(file)
    await axios.post('/api/people/upload', { base64 })
    navigate("/");

  }




  return (
    <div className="container" style={{ marginTop: 60 }}>
      <div className="d-flex vh-100" style={{ marginTop: "-70px" }}>
        <div className="d-flex w-100 justify-content-center align-self-center">
          <div className="row">
            <div className="col-md-10">
              <input type="file" ref={fileRef} className="form-control" />
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary" onClick={onUpload}>Upload</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
export default Upload;