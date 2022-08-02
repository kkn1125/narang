import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

function SwitchLabels({ name, formik }: { name: string; formik?: any }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            name={name}
            checked={formik.values[name]}
            onChange={formik.handleChange}
          />
        }
        label={name}
      />
    </FormGroup>
  );
}

export default SwitchLabels;
