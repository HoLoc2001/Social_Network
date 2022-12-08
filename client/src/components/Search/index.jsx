import {
  Box,
  Collapse,
  IconButton,
  InputBase,
  Modal,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useState } from "react";

const Filters = () => {
  const [openSearch, setOpenSearch] = useState(false);
  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "700px",
            height: "40px",
            borderRadius: "20px",
            backgroundColor: "#AFEEEE",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Tìm kiếm trên Social"
            onFocus={() => setOpenSearch(true)}
            onBlur={() => setOpenSearch(false)}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Modal
          open={openSearch}
          onClose={false}
          sx={{ position: "absolute", left: 0, right: 0 }}
        >
          <div
            style={{
              // width: "1000px",
              height: "300px",
              backgroundColor: "gray",
              borderRadius: "10px",
            }}
          ></div>
        </Modal>
      </Box>
    </>
  );
};

export default Filters;
