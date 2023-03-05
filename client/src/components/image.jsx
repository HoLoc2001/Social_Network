import React from "react";
import axios from "axios";

const image = () => {
  const API_URL = "http://localhost:5000/v1/api";

  const cloudinaryUpload = (fileToUpload) => {
    return axios
      .post(API_URL + "/uploads/cloudinary-upload", fileToUpload)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    if (e.target.files.length < 100) {
      for (let i = 0; i < e.target.files.length; i++) {
        uploadData.append("file", e.target.files[i], "file");
      }
      cloudinaryUpload(uploadData);
    }
  };

  return (
    <div>
      <div style={{ margin: 10 }}>
        <label style={{ margin: 10 }}>Cloudinary:</label>
        <input type="file" onChange={(e) => handleFileUpload(e)} multiple />
      </div>
    </div>
  );
};

export default image;
