import React, { useEffect, useState } from "react";
import {
  useDelteteShippingContractsMutation,
  useShippingContractsListQuery,
} from "../api/services/ShippingContracts";
import {
  Box,
  Typography,
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Loading from "../component/inputs/Loading";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Main = () => {
  const datas = useShippingContractsListQuery();
  const [deleteFn, deleteRes] = useDelteteShippingContractsMutation();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const navigate = useNavigate();

  const columns = [
    { id: "name", label: "نام", minWidth: 170, align: "right" },
    {
      id: "number",
      label: "شماره قرارداد",
      minWidth: 170,
      align: "right",
    },
    {
      id: "isActive",
      label: "وضعیت فعالیت",
      minWidth: 100,
      align: "right",
      render: (data) => {
        if (data.isActive) {
          return "فعال";
        } else {
          return "غیرفعال";
        }
      },
    },
    {
      id: "isDefault",
      label: "پیشفرض",
      minWidth: 170,
      align: "right",
      render: (data) => {
        if (data.isDefault) {
          return "فعال";
        } else {
          return "غیرفعال";
        }
      },
    },

    {
      id: "action",
      label: <SettingsIcon />,
      minWidth: 170,
      align: "right",
    },
  ];

  const DeleteFunction = (id) => {
    setSelectedId(id);
    setShowDeleteConfirm(true);
  };

  useEffect(() => {
    if (deleteRes.isError) {
      toast("خطا در ثبت اطلاعات", {
        type: "error",
      });
    } else if (deleteRes.isSuccess) {
      if (deleteRes.data.success) {
        toast(deleteRes.data.message, {
          type: "success",
        });
        deleteRes.reset();
      } else {
        toast(deleteRes.data.message, {
          type: "error",
        });
      }
    }
  }, [deleteRes]);

  return (
    <>
      <Loading
        isUninitialized={datas.isUninitialized}
        isLoading={datas.isLoading}
        isSuccess={datas.isSuccess}
        isError={datas.isError}
        refetch={datas.refetch}
        children={
          <Box
            sx={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Box
                sx={{
                  marginBlock: 10,
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  startIcon={<AddIcon />}
                  color="success"
                  variant="contained"
                  onClick={() => {
                    navigate("/form");
                  }}
                >
                  افزودن
                </Button>
                <Typography variant="h5">لیست قراردادها</Typography>
              </Box>

              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 440, direction: "rtl" }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {datas.data &&
                        datas.data.data.data.map((items) => (
                          <TableRow>
                            {columns.map((ele) => (
                              <TableCell
                                key={ele.id}
                                align={ele.align}
                                style={{ minWidth: ele.minWidth }}
                              >
                                {ele.id !== "action" ? (
                                  ele.render ? (
                                    ele.render(items)
                                  ) : (
                                    items[ele.id]
                                  )
                                ) : (
                                  <Box sx={{ display: "flex" }}>
                                    <IconButton
                                      aria-label="delete"
                                      color="error"
                                      onClick={() => {
                                        DeleteFunction(items.id);
                                      }}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                    <IconButton
                                      aria-label="delete"
                                      color="warning"
                                      onClick={() => {
                                        navigate("/form/" + items.id);
                                      }}
                                    >
                                      <EditIcon />
                                    </IconButton>
                                  </Box>
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* <TablePagination
                component="div"
                count={10}
                onPageChange={() => {}}
                onRowsPerPageChange={() => {}}
              /> */}
              </Paper>
            </Box>
          </Box>
        }
      />

      <Dialog
        onClose={() => {
          setShowDeleteConfirm(false);
        }}
        open={showDeleteConfirm}
      >
        <DialogTitle>آیا میخواهید این مورد را حذف کنید؟</DialogTitle>
        <Box
          sx={{ display: "flex", gap: 2, justifyContent: "center", padding: 1 }}
        >
          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              setShowDeleteConfirm(false);
            }}
          >
            خیر
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              deleteFn(selectedId);
            }}
            disabled={deleteRes.isLoading}
          >
            {deleteRes.isLoading ? (
              <CircularProgress size={20} sx={{ width: 10 }} />
            ) : (
              "بله"
            )}
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default Main;
