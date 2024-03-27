import React from "react";
import {
  Typography,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { Controller } from "react-hook-form";

const MRadioInput = (props) => {
  const { control, errors, name, label, options , watch } = props;
console.log(options);
console.log(watch);
  return (
    <div style={{ display: "flex", flexDirection: "column", marginBottom: 20, flex:1 }}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              {label}
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name={name}
              value={value}
              onChange={(event)=>{onChange(event.target.value)}}
              onBlur={onBlur}
            >
              {options.map((ele) => (
                <FormControlLabel
                  value={ele.value}
                  disabled={ele.disabled}
                  control={<Radio />}
                  label={ele.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
        name={name}
      />
      {errors[name] && (
        <Typography variant="overline" color="red" display="block" gutterBottom>
          {errors[name].message}
        </Typography>
      )}
    </div>
  );
};

export default MRadioInput;
