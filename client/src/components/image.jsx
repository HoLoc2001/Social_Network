import React from "react";
import axios from "axios";

const image = () => {
  const API_URL = "http://localhost:5000";

  const cloudinaryUpload = (fileToUpload) => {
    return axios
      .post(API_URL + "/uploads/cloudinary-upload", fileToUpload)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("file", e.target.files[0], "file");
    cloudinaryUpload(uploadData);
  };

  return (
    <div>
      <div style={{ margin: 10 }}>
        <label style={{ margin: 10 }}>Cloudinary:</label>
        <input type="file" onChange={(e) => handleFileUpload(e)} />
      </div>
    </div>
  );
};

export default image;
