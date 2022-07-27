import { Stack, TextField } from "@mui/material";
import React from "react";
import { splitToUnderBar, upperCase } from "../../tools/utils";

export interface TextFieldItem {
  name: string;
  type: "text" | "email" | "password" | string;
  placeholder?: string;
  required?: boolean;
}

interface TextFieldSetProps {
  fields: TextFieldItem[];
  size?: "small" | "medium" | undefined;
}

function TextFieldSet({ fields, size = "medium" }: TextFieldSetProps) {
  return (
    <Stack gap={3}>
      {fields.map(({ name, type, placeholder, required }, idx) => (
        <TextField
          key={idx}
          type={type}
          required={required}
          id={splitToUnderBar(name)}
          name={splitToUnderBar(name)}
          label={upperCase(name)}
          placeholder={placeholder}
          size={size}
        />
      ))}
    </Stack>
  );
}

export default TextFieldSet;
