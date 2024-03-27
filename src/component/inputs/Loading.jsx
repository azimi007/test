import React, { useCallback } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const Loading = (props) => {
  const { isLoading, isSuccess, isError, refetch, children, isUninitialized } =
    props;

  const handle = useCallback(() => {
    if (isUninitialized) {
      return children;
    } else {
      if (isSuccess) {
        return children;
      } else if (isError) {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
              height: "100vh",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <Typography>خطا در دریافت اطلاعات</Typography>
            <Button
              onClick={() => {
                refetch();
              }}
              variant="contained"
              startIcon={<RefreshIcon />}
            >
              تلاش مجدد
            </Button>
          </Box>
        );
      } else if (isLoading) {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        );
      }
    }
  }, [isUninitialized, isError, isSuccess, isLoading, children, refetch]);

  return (
    <>
      {/* {!isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {isError && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <Typography>خطا در دریافت اطلاعات</Typography>
          <Button
            onClick={() => {
              refetch();
            }}
            variant="contained"
            startIcon={<RefreshIcon />}
          >
            تلاش مجدد
          </Button>
        </Box>
      )}
      {isSuccess && children} */}
      {handle()}
    </>
  );
};

export default Loading;
