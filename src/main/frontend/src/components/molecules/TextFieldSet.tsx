import { Checkbox, Stack, TextField } from "@mui/material";
import React from "react";
import { splitToUnderBar, upperCase } from "../../tools/utils";

export interface TextFieldItem {
  name: string;
  type: "text" | "email" | "password" | string;
  placeholder?: string;
  hidden?: boolean;
  value?: any;
  required?: boolean;
}

interface TextFieldSetProps {
  fields: TextFieldItem[];
  size?: "small" | "medium" | undefined;
}

function TextFieldSet({ fields, size = "medium" }: TextFieldSetProps) {
  return (
    <Stack gap={3}>
      {fields.map(
        ({ name, type, placeholder, required, value, hidden = false }, idx) =>
          type === "checkbox" ? (
            <Checkbox
              key={idx}
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
          ) : (
            <TextField
              key={idx}
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
          )
      )}
    </Stack>
  );
}

export default TextFieldSet;
