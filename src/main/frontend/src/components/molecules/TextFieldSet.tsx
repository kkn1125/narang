import { Checkbox, FormHelperText, Stack, TextField } from "@mui/material";
import React from "react";
import { splitToUnderBar, upperCase } from "../../tools/utils";

export interface TextFieldItem {
  name: string;
  type: "text" | "email" | "password" | string;
  placeholder?: string;
  hidden?: boolean;
  value?: any;
  required?: boolean;
  pattern?: string;
}

interface TextFieldSetProps {
  fields: TextFieldItem[];
  size?: "small" | "medium" | undefined;
  formik?: any;
}

function TextFieldSet({ fields, size = "medium", formik }: TextFieldSetProps) {
  return (
    <Stack gap={3}>
      {fields.map(
        (
          { name, type, placeholder, required, value, pattern, hidden = false },
          idx
        ) =>
          type === "checkbox" ? (
            <Stack key={idx}>
              <Checkbox
                checked={formik.values[splitToUnderBar(name)]}
                onChange={formik.handleChange}
                required={required}
                id={splitToUnderBar(name)}
                name={splitToUnderBar(name)}
                placeholder={placeholder}
                {...(value && { value: value })}
                size={size}
                sx={
                  hidden && {
                    opacity: 0,
                    position: "absolute",
                    left: "-999999px",
                  }
                }
              />
            </Stack>
          ) : (
            <Stack key={idx}>
              <TextField
                value={formik.values[splitToUnderBar(name)]}
                onChange={formik.handleChange}
                type={type}
                required={required}
                id={splitToUnderBar(name)}
                name={splitToUnderBar(name)}
                label={upperCase(name)}
                placeholder={placeholder}
                {...(value && { value: value })}
                size={size}
                sx={{
                  opacity: hidden ? 0 : 1,
                }}
              />
              {formik.errors[splitToUnderBar(name)] && (
                <FormHelperText error={!!formik.values[splitToUnderBar(name)]}>
                  {formik.errors[splitToUnderBar(name)]}
                </FormHelperText>
              )}
            </Stack>
          )
      )}
    </Stack>
  );
}

export default TextFieldSet;
