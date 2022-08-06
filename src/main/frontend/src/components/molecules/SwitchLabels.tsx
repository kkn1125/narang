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
        label={"공유 여부 설정"}
      />
    </FormGroup>
  );
}

export default SwitchLabels;
