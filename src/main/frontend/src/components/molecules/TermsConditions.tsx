import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function TermsConditions() {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox />}
        label={
          <Typography>
            I have read the
            <Link to='/'>Terms and Conditions</Link>
          </Typography>
        }
      />
    </FormGroup>
  );
}

export default TermsConditions;
