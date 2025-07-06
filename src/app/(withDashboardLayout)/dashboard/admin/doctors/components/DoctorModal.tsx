import InputForm from "@/components/Form/InputForm";
import PHFileUploader from "@/components/Form/PHFileUpload";
import PHForm from "@/components/Form/PHForm";
import MultiChipField from "@/components/Form/PHMultiChipSelect";
import SelectField from "@/components/Form/SelectField";
import FullScreenModal from "@/components/Shared/PHModal/PHFullScreenModal";
import { useCreateDoctorsMutation } from "@/redux/api/doctorsApi";
import { useGetSpecialistsQuery } from "@/redux/api/specialistsApi";
import { modifyData } from "@/utils/modifyData";
import { Box, Button, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
};

const DoctorModal = ({ open, setOpen }: TProps) => {
  const [createDoctors, { data, isLoading: uploadImage }] =
    useCreateDoctorsMutation();
  console.log("create doctor data", data);
  const { data: specialitiesData } = useGetSpecialistsQuery(undefined);

  const handleSubmit = async (values: FieldValues) => {
    console.log("Form Values:", values);

    // Convert numeric fields
    values.doctor.experience = Number(values.doctor.experience);
    values.doctor.apointmentFee = Number(values.doctor.apointmentFee);

    // Transform specialties to the backend format
    const specialties = (values.doctor.doctorSpecialties || []).map(
      (specialtyId: string) => ({
        specialtiesId: specialtyId,
        isDeleted: false,
      })
    );

    // Create the data structure for the backend
    const doctorData = {
      password: values.password,
      doctor: {
        email: values.doctor.email,
        name: values.doctor.name,
        contactNumber: values.doctor.contactNumber,
        address: values.doctor.address,
        registrationNumber: values.doctor.registrationNumber,
        experience: values.doctor.experience,
        gender: values.doctor.gender,
        apointmentFee: values.doctor.apointmentFee,
        qualification: values.doctor.qualification,
        currentWorkingPlace: values.doctor.currentWorkingPlace,
        designation: values.doctor.designation,
        specialties: specialties,
      },
    };

    console.log("Specialties being sent:", specialties);

    // Use the modifyData utility function
    const formData = modifyData(doctorData);
    console.log("FormData being sent:", formData);

    try {
      const res = await createDoctors(formData).unwrap();
      console.log("API Response:", res);
      if (res?.data?.id) {
        toast.success("Doctor Created Successfully");
        setOpen(false);
      }
    } catch (error: any) {
      console.error("API Error:", error);
      toast.error(
        "Failed to create doctor: " + (error.message || "Unknown error")
      );
    }
  };

  const defaultValues = {
    password: "123456",
    doctor: {
      email: "doctor356@gmail.com",
      name: "Dr. Fahim",
      contactNumber: "+1234567890",
      address: "123 Medical Street, Cityville",
      registrationNumber: "12345",
      experience: 5,
      gender: "MALE",
      apointmentFee: 100,
      qualification: "MD, PhD",
      currentWorkingPlace: "City Hospital",
      designation: "Senior Consultant",
      doctorSpecialties: [],
    },
  };

  return (
    <FullScreenModal open={open} setOpen={setOpen} title="Create a New Doctor">
      <PHForm onSubmit={handleSubmit} defaultValues={defaultValues}>
        <Box>
          <Stack spacing={4}>
            <Box my={3}>
              {uploadImage ? (
                <p>Uploading...</p>
              ) : (
                <PHFileUploader name="file" label="Choose Your Profile Photo" />
              )}
            </Box>
            {/* grid - 1 */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 4 }}>
                <InputForm fullWidth name="doctor.name" label="Name" />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <InputForm
                  fullWidth
                  name="doctor.email"
                  label="Email"
                  type="email"
                />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <InputForm
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                />
              </Grid>
            </Grid>
            {/* grid - 2  */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 4 }}>
                <InputForm
                  fullWidth
                  name="doctor.contactNumber"
                  label="Contact Number"
                />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <InputForm fullWidth name="doctor.address" label="Address" />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <InputForm
                  fullWidth
                  name="doctor.registrationNumber"
                  label="Registration Number"
                />
              </Grid>
            </Grid>
            {/* grid - 3  */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 4 }}>
                <InputForm
                  fullWidth
                  name="doctor.experience"
                  label="Experience"
                />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <SelectField
                  name="doctor.gender"
                  label="Gender"
                  size="small"
                  options={[
                    { value: "MALE", label: "MALE" },
                    { value: "FEMALE", label: "FEMALE" },
                    { value: "OTHERS", label: "OTHERS" },
                  ]}
                />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <InputForm
                  fullWidth
                  name="doctor.apointmentFee"
                  label="Appointment Fee"
                />
              </Grid>
            </Grid>
            {/* grid - 4  */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 4 }}>
                <InputForm
                  fullWidth
                  name="doctor.qualification"
                  label="Qualification"
                />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <InputForm
                  fullWidth
                  name="doctor.currentWorkingPlace"
                  label="Current Working Place"
                />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <InputForm
                  fullWidth
                  name="doctor.designation"
                  label="Designation"
                />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <MultiChipField
                  name="doctor.doctorSpecialties"
                  label="Select Specialties"
                  options={
                    specialitiesData?.map((item) => ({
                      value: item.id,
                      label: item.title,
                    })) || []
                  }
                  size="medium"
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Create Doctor
            </Button>
          </Stack>
        </Box>
      </PHForm>
    </FullScreenModal>
  );
};

export default DoctorModal;
