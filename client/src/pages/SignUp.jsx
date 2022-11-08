import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const SignUp = () => {
  const [city, setCity] = useState([]);

  useEffect(() => {
    (async () => {
      await axios
        .get("https://provinces.open-api.vn/api/?depth=1")
        .then(function (response) {
          let cites = [];
          response.data.forEach((e) => {
            cites.push(e.name);
          });
          setCity(cites);
        })
        .catch(function (error) {
          console.log(error);
        });
    })();
  }, []);

  return (
    <>
      <Box
        component="form"
        sx={{
          width: "60%",
          height: "1000px",
          backgroundColor: "#E7E9EB",
          margin: "100px auto",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <Typography component="h2">Đăng ký</Typography>
        <FormControl
          sx={{
            width: "300px",
          }}
        >
          <InputLabel id="demo-simple-select-label">Thành phố</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Thành phố"
            // onChange={handleChange}
          >
            {city.map((e) => (
              <MenuItem value={e}>{e}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Link to="/signin">
          <Button>Đăng nhập</Button>
        </Link>
      </Box>
    </>
  );
};

export default SignUp;
