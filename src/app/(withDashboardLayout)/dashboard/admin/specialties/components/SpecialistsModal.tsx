/* eslint-disable @typescript-eslint/no-explicit-any */

import InputForm from "@/components/Form/InputForm";
import PHFileUpload from "@/components/Form/PHFileUpload";
import PHForm from "@/components/Form/PHForm";
import PHModal from "@/components/Shared/PHModal/PHModal";
import { useCreateSpecialistsMutation } from "@/redux/api/specialistsApi";
import { modifyData } from "@/utils/modifyData";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialistsModal = ({ open, setOpen }: TProps) => {
  const [createSpecialitis, { isLoading }] = useCreateSpecialistsMutation();

  const handleSubmit = async (values: FieldValues) => {
    if (!values.file) {
      toast.error("Please select an icon for the specialty.");
      return;
    }

    if (!values.file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file (PNG, JPG, SVG).");
      return;
    }

    const specialtyData = { title: values.title };
    const formData = modifyData({ ...specialtyData, file: values.file });

    try {
      const res = await createSpecialitis(formData).unwrap();
      if (res?.id) {
        toast.success("Specialty created successfully");
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to create specialty. Please try again."
      );
    }
  };

  return (
    <PHModal open={open} setOpen={setOpen} title="Create a New Specialty">
      <PHForm onSubmit={handleSubmit} defaultValues={{ title: "", file: "" }}>
        <Stack spacing={3}>
          <Typography variant="body2" color="text.secondary">
            Provide the specialty title and an icon that represents it. Icons
            help patients quickly identify the medical category.
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <InputForm
                fullWidth
                name="title"
                label="Specialty Title"
                required
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <PHFileUpload name="file" label="Upload Icon" />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 0.75 }}
              >
                Supported formats: PNG, JPG, SVG. Max size 2MB.
              </Typography>
            </Grid>
          </Grid>

          <Box>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                px: 4,
                py: 1.25,
              }}
            >
              Create Specialty
            </LoadingButton>
          </Box>
        </Stack>
      </PHForm>
    </PHModal>
  );
};

export default SpecialistsModal;
