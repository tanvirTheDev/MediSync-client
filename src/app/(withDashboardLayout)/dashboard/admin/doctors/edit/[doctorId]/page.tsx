/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-async-client-component */
"use client";

import InputForm from "@/components/Form/InputForm";
import PHFileUploader from "@/components/Form/PHFileUpload";
import PHForm from "@/components/Form/PHForm";
import MultiChipField from "@/components/Form/PHMultiChipSelect";
import SelectField from "@/components/Form/SelectField";
import {
  useGetSingleDoctorQuery,
  useUpdateDoctorMutation,
} from "@/redux/api/doctorsApi";
import { useGetSpecialistsQuery } from "@/redux/api/specialistsApi";
import { TDoctorSpeciality } from "@/types/doctor";
import { LoadingButton } from "@mui/lab";
import { Box, Divider, Grid, Stack, Typography, alpha } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useMemo } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import DoctorUpdateSkeleton from "./DoctorUpdateSkelton";

const DoctorUpdatePage = ({
  params,
}: {
  params: Promise<{ doctorId: string }>;
}) => {
  const router = useRouter();
  const { doctorId } = use(params as Promise<{ doctorId: string }>);
  const { data: specialtiesData } = useGetSpecialistsQuery(undefined);

  const { data, isLoading } = useGetSingleDoctorQuery(doctorId || "", {
    skip: !doctorId,
  });

  const [updateDoctor, { isLoading: updating }] = useUpdateDoctorMutation();

  const defaultValues = useMemo(
    () => ({
      name: data?.name || "",
      contactNumber: data?.contactNumber || "",
      address: data?.address || "",
      registrationNumber: data?.registrationNumber || "",
      experience: data?.experience || 0,
      gender: (data?.gender as "MALE" | "FEMALE" | "OTHER") || "MALE",
      appointmentFee: data?.appointmentFee || 0,
      qualification: data?.qualification || "",
      currentWorkingPlace: data?.currentWorkingPlace || "",
      designation: data?.designation || "",
      specialties:
        data?.doctorSpecialities?.map(
          (speciality: TDoctorSpeciality) => speciality.specialities?.id
        ) || [],
    }),
    [data]
  );

  const specialtyOptions = useMemo(
    () =>
      specialtiesData?.map((item) => ({
        value: item.id,
        label: item.title,
      })) || [],
    [specialtiesData]
  );

  const handleSubmit = async (values: FieldValues) => {
    const formattedSpecialties =
      (values.specialties || []).map((id: string) => ({
        specialtiesId: id,
        isDeleted: false,
      })) || [];

    console.log("formattedSpecialties", formattedSpecialties);

    const payload = {
      ...values,
      experience: Number(values.experience),
      appointmentFee: Number(values.appointmentFee),
      specialties: formattedSpecialties,
    };

    try {
      const res = await updateDoctor({ id: doctorId, body: payload }).unwrap();
      console.log("res", res);
      if (res?.data?.id) {
        toast.success("Doctor profile updated successfully");
        router.push(`/dashboard/admin/doctors`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update doctor");
    }
  };

  return (
    <Box>
      {isLoading ? (
        <DoctorUpdateSkeleton />
      ) : (
        <PHForm onSubmit={handleSubmit} defaultValues={defaultValues}>
          <Stack spacing={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: 3,
                p: 3,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: alpha("#1586FD", 0.03),
              }}
            >
              <Box
                sx={{
                  height: 160,
                  width: 160,
                  borderRadius: 3,
                  overflow: "hidden",
                  bgcolor: "grey.100",
                }}
              >
                <Image
                  src={data?.profilePhoto || ""}
                  alt="Doctor profile"
                  width={160}
                  height={160}
                />
              </Box>
              <Stack spacing={1.5}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Profile Photo
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upload a professional photo to keep the doctor profile
                  current.
                </Typography>
                <PHFileUploader name="file" label="Upload new photo" />
              </Stack>
            </Box>

            <Grid container spacing={2.5}>
              <Grid item xs={12} md={4}>
                <InputForm name="name" label="Full Name" fullWidth />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputForm
                  name="contactNumber"
                  label="Contact Number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputForm name="address" label="Address" fullWidth />
              </Grid>

              <Grid item xs={12} md={4}>
                <InputForm
                  name="registrationNumber"
                  label="Registration Number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputForm
                  name="experience"
                  label="Years of Experience"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <SelectField
                  name="gender"
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
                  name="appointmentFee"
                  label="Appointment Fee (৳)"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputForm
                  name="qualification"
                  label="Qualification"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputForm
                  name="currentWorkingPlace"
                  label="Current Workplace"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <InputForm name="designation" label="Designation" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <MultiChipField
                  name="specialties"
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
                loading={updating}
                sx={{
                  textTransform: "none",
                  borderRadius: 3,
                  px: 4,
                  py: 1.3,
                  fontWeight: 600,
                }}
              >
                Save Changes
              </LoadingButton>
            </Stack>
          </Stack>
        </PHForm>
      )}
    </Box>
  );
};

export default DoctorUpdatePage;
