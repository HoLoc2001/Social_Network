import { Alert, Snackbar } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const AlertErr = ({ err, setErr, severity }) => {
  return (
    <Stack sx={{ width: "60%" }} spacing={2}>
      <Snackbar
        open={err}
        autoHideDuration={4000}
        onClose={() => setErr(false)}
      >
        <Alert severity={severity}>Vui lòng nhập đầy đủ!!!</Alert>
      </Snackbar>
    </Stack>
  );
};

export default AlertErr;
