import InputForm from "@/components/Form/InputForm";
import PHFileUploader from "@/components/Form/PHFileUpload";
import PHForm from "@/components/Form/PHForm";
import MultiChipField from "@/components/Form/PHMultiChipSelect";
import SelectField from "@/components/Form/SelectField";
import FullScreenModal from "@/components/Shared/PHModal/PHFullScreenModal";
import { useCreateDoctorsMutation } from "@/redux/api/doctorsApi";
import { useGetSpecialistsQuery } from "@/redux/api/specialistsApi";
import { modifyData } from "@/utils/modifyData";
import { LoadingButton } from "@mui/lab";
import { Box, Divider, Grid, Stack, Typography, alpha } from "@mui/material";
import { useMemo } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoctorModal = ({ open, setOpen }: TProps) => {
  const [createDoctor, { isLoading }] = useCreateDoctorsMutation();
  const { data: specialtiesData } = useGetSpecialistsQuery(undefined);

  const specialtyOptions = useMemo(
    () =>
      specialtiesData?.map((item) => ({
        value: item.id,
        label: item.title,
      })) || [],
    [specialtiesData]
  );

  const handleSubmit = async (values: FieldValues) => {
    if (!values.file) {
      toast.error("Please select an icon for the specialty.");
      return;
    }

    if (!values.file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file (PNG, JPG, SVG).");
      return;
    }
    const formattedSpecialties = (values.doctor.specialties || []).map(
      (specialtyId: string) => ({
        specialtiesId: specialtyId,
        isDeleted: false,
      })
    );

    const payload = {
      password: values.password,
      doctor: {
        ...values.doctor,
        experience: Number(values.doctor.experience),
        appointmentFee: Number(values.doctor.appointmentFee),
        specialties: formattedSpecialties,
      },
    };

    const formData = modifyData({ payload, file: values.file });

    try {
      const res = await createDoctor(formData).unwrap();
      console.log("res", res);
      if (res?.data?.id) {
        toast.success("Doctor created successfully");
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create doctor");
    }
  };

  const defaultValues = {
    password: "",
    doctor: {
      email: "",
      name: "",
      contactNumber: "",
      address: "",
      registrationNumber: "",
      experience: 0,
      gender: "MALE",
      appointmentFee: 0,
      qualification: "",
      currentWorkingPlace: "",
      designation: "",
      specialties: [],
    },
  };

  return (
    <FullScreenModal open={open} setOpen={setOpen} title="Create a New Doctor">
      <PHForm onSubmit={handleSubmit} defaultValues={defaultValues}>
        <Stack spacing={4}>
          <Typography variant="body2" color="text.secondary">
            Fill out the doctor’s profile details below. Required fields are
            marked with an asterisk.
          </Typography>

          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: alpha("#1586FD", 0.03),
            }}
          >
            <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
              <PHFileUploader name="file" label="Upload Profile Photo" />
              <Stack spacing={1}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Profile Photo
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upload a clear, professional photo. Supported formats: PNG,
                  JPG. Max size 5MB.
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Grid container spacing={2.5}>
            <Grid item xs={12} md={4}>
              <InputForm name="doctor.name" label="Full Name *" fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputForm
                name="doctor.email"
                label="Email Address *"
                type="email"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputForm
                name="password"
                label="Temporary Password *"
                type="password"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <InputForm
                name="doctor.contactNumber"
                label="Contact Number *"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputForm name="doctor.address" label="Address" fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputForm
                name="doctor.registrationNumber"
                label="Registration Number *"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <InputForm
                name="doctor.experience"
                label="Years of Experience *"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <SelectField
                name="doctor.gender"
                label="Gender"
                size="small"
                options={[
                  { value: "MALE", label: "Male" },
                  { value: "FEMALE", label: "Female" },
                  { value: "OTHER", label: "Other" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputForm
                name="doctor.appointmentFee"
                label="Appointment Fee (৳)"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <InputForm
                name="doctor.qualification"
                label="Qualification"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputForm
                name="doctor.currentWorkingPlace"
                label="Current Workplace"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputForm
                name="doctor.designation"
                label="Designation"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <MultiChipField
                name="doctor.specialties"
                label="Select Specialties"
                options={specialtyOptions}
                size="medium"
              />
            </Grid>
          </Grid>

          <Divider />

          <Stack direction="row" justifyContent="flex-end">
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
              sx={{
                textTransform: "none",
                borderRadius: 3,
                px: 4,
                py: 1.25,
                fontWeight: 600,
              }}
            >
              Create Doctor
            </LoadingButton>
          </Stack>
        </Stack>
      </PHForm>
    </FullScreenModal>
  );
};

export default DoctorModal;
