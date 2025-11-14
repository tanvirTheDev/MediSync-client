import DoctorCard from "@/components/UI/HomePage/TopRatedDoctors/DoctorCard";
import { TDoctor } from "@/types";
import { Box, Chip, Container, Grid, Stack, Typography } from "@mui/material";

const SpecialtyDoctorsPage = async ({ params }: any) => {
  const { id } = await params;

  const doctorsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/specialities/${id}`
  );
  const doctorsData = await doctorsRes.json();
  const doctors = doctorsData?.data || [];
  console.log(doctors);

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8, lg: 10 },
        background:
          "linear-gradient(180deg, rgba(21,134,253,0.04) 0%, rgba(255,255,255,1) 100%)",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={{ xs: 4, md: 6 }}>
          {/* Header Section with Specialty Info */}
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Chip
              label="Specialty Doctors"
              color="primary"
              variant="outlined"
              sx={{ borderRadius: "999px", fontWeight: 600 }}
            />
          </Stack>

          {/* Doctors Grid */}
          {doctors && doctors.length > 0 ? (
            <Grid container spacing={{ xs: 3, md: 4 }}>
              {doctors.map((doctor: TDoctor) => (
                <Grid key={doctor.id} item xs={12} sm={6} lg={3}>
                  <DoctorCard doctor={doctor} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box
              sx={{
                textAlign: "center",
                py: { xs: 8, md: 12 },
                px: { xs: 2, md: 4 },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "text.secondary",
                  mb: 1.5,
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                  fontWeight: 600,
                }}
              >
                No doctors found for this specialty
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  maxWidth: "500px",
                  mx: "auto",
                }}
              >
                We don't have any doctors available for this specialty at the
                moment. Please check back later or explore other specialties.
              </Typography>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default SpecialtyDoctorsPage;
