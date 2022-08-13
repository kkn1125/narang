import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import React from "react";

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
