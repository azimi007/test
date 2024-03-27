import React from "react";
import { Typography, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const MTextInput = (props) => {
  const { control, errors, name, label, type } = props;

  return (
    <div style={{ display: "flex", flexDirection: "column", marginBottom: 20, flex:1 }}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label={label}
            variant="outlined"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            type={type}
          />
        )}
      />
      {errors[name] && (
        <Typography variant="overline" color="red" display="block" gutterBottom>
          {errors[name].message}
        </Typography>
      )}
    </div>
  );
};

export default MTextInput;
