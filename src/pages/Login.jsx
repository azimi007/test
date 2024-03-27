import React, { useEffect } from "react";
import MTextInput from "../component/inputs/TextInput";
import { useForm } from "react-hook-form";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useLoginMutation } from "../api/services/Login";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"

const Login = () => {
  const [loginFn, loginRes] = useLoginMutation();
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const OnFinish = (values) => {
    loginFn(values);
  };

  useEffect(() => {
    if (loginRes.isSuccess) {
      toast("خوش آمدید", {
        type: "success",
      });
      localStorage.setItem("token", loginRes.data.token);
      navigate("/home")
    } else if (loginRes.isError) {
      toast("نام کابری یا رمز عبور اشتباه می باشد", {
        type: "error",
      });
    }
  }, [loginRes]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          padding: "15px",
          border: "1px solid gray",
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <Typography variant="h6" gutterBottom textAlign="center">
          خوش آمدید
        </Typography>
        <div>
          <MTextInput
            control={control}
            errors={errors}
            name="username"
            label="نام کاربری"
          />
          <MTextInput
            control={control}
            errors={errors}
            name="password"
            label="رمز عبور"
            type="password"
          />
        </div>

        <Button
          onClick={handleSubmit((values) => OnFinish(values))}
          variant="contained"
          disabled={loginRes.isLoading}
        >
          {loginRes.isLoading ? (
            <CircularProgress size={20} sx={{ width: 10 }} />
          ) : (
            "ورود"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
