import React, { useEffect } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import Loading from "../component/inputs/Loading";
import {
  useAddShippingContractsMutation,
  useShippingContractsGetEditQuery,
  useUpdateShippingContractsMutation,
} from "../api/services/ShippingContracts";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import MTextInput from "../component/inputs/TextInput";
import MRadioInput from "../component/inputs/Radio";
import MTextAreaInput from "../component/inputs/TextAreaInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddEditForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const datas = useShippingContractsGetEditQuery(params.id, {
    skip: !params.id,
  });
  const [addFn, addResult] = useAddShippingContractsMutation();
  const [updateFn, updateResult] = useUpdateShippingContractsMutation();

  const radioOption = [
    {
      label: "بله",
      value: true,
    },
    {
      label: "خیر",
      value: false,
    },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  useEffect(() => {
    if (datas.isSuccess) {
      const values = {
        name: datas.data.data.name,
        number: datas.data.data.number,
        description: datas.data.data.description,
        isActive: datas.data.data.isActive,
        isDefault: datas.data.data.isDefault,
      };
      console.log("values", values);
      reset({ ...values });
    }
    console.log(datas.isUninitialized);
  }, [datas, params, reset]);

  const OnFinish = (values) => {
    const parameters = {
      ...values,
      isDefault: values.isDefault === "true" ? true : false,
      isActive: values.isActive === "true" ? true : false,
    };
    console.log("formData: ", parameters);
    params.id
      ? updateFn({ id: params.id, ...parameters })
      : addFn({ id: "", ...parameters });
  };

  useEffect(() => {
    if (addResult.isError) {
      toast("خطا در ثبت اطلاعات", {
        type: "error",
      });
    } else if (addResult.isSuccess) {
      if (addResult.data.success) {
        toast(addResult.data.message, {
          type: "success",
        });
        addResult.reset();
        navigate("/home");
      } else {
        toast(addResult.data.message, {
          type: "error",
        });
      }
    }
  }, [addResult]);

  useEffect(() => {
    if (updateResult.isError) {
      toast("خطا در ثبت اطلاعات", {
        type: "error",
      });
    } else if (updateResult.isSuccess) {
      if (updateResult.data.success) {
        toast(updateResult.data.message, {
          type: "success",
        });
        updateResult.reset();
        navigate("/home");
      } else {
        toast(updateResult.data.message, {
          type: "error",
        });
      }
    }
  }, [updateResult]);

  return (
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
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "600px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <MTextInput
                control={control}
                errors={errors}
                name="name"
                label="عنوان قرارداد"
              />
              <MTextInput
                control={control}
                errors={errors}
                name="number"
                label="شماره قرارداد"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                gap: 3,
              }}
            >
              <MRadioInput
                control={control}
                errors={errors}
                name="isActive"
                label="وضعیت فعالیت"
                options={[
                  {
                    label: "فعال",
                    value: true,
                  },
                  {
                    label: "غیرفعال",
                    value: false,
                  },
                ]}
              />
              <MRadioInput
                control={control}
                errors={errors}
                watch={watch()}
                name="isDefault"
                label="آیا پیشفرض است؟"
                options={[
                  {
                    label: "بله",
                    value: true,
                  },
                  {
                    label: "خیر",
                    value: false,
                  },
                ]}
              />
            </Box>
            <MTextAreaInput
              control={control}
              errors={errors}
              name="description"
              label="توضیحات"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              gap: 3,
            }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                navigate("/home");
              }}
            >
              انصراف
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit((values) => OnFinish(values))}
            >
              ثبت
            </Button>
          </Box>
        </Box>
      }
    />
  );
};

export default AddEditForm;
