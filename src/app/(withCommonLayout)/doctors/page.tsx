import ScrollSpecialities from "@/components/UI/Doctor/ScrollSpecialities";
import DoctorCard from "@/components/UI/HomePage/TopRatedDoctors/DoctorCard";
import { TDoctor } from "@/types";
import { Box, Chip, Container, Grid, Stack, Typography } from "@mui/material";

// Assuming you have a type for the expected structure of searchParams
interface SearchParams {
  specialties: string;
}

// Update TSearchProps to reflect that searchParams is a Promise
type TSearchProps = {
  searchParams: Promise<SearchParams>; // Change to Promise
};

const Doctors = async ({ searchParams }: TSearchProps) => {
  const params = await searchParams;
  let res;

  if (params.specialties) {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/doctor?specialties=${params.specialties}`
    );
  } else {
    res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/doctor`);
  }

  const { data } = await res.json();

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
          {/* Header Section */}
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Chip
              label="Find Your Perfect Doctor"
              color="primary"
              variant="outlined"
              sx={{ borderRadius: "999px", fontWeight: 600 }}
            />
            <Typography
              component="h1"
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2.5rem",
                  md: "3rem",
                  lg: "3.5rem",
                },
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "text.primary",
              }}
            >
              Browse Our Expert Physicians
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.95rem", md: "1.05rem", lg: "1.15rem" },
                color: "text.secondary",
                maxWidth: "700px",
                lineHeight: 1.7,
              }}
            >
              Connect with board-certified specialists who are committed to
              delivering personalized, compassionate care tailored to your
              unique health needs.
            </Typography>
          </Stack>

          {/* Specialties Section */}
          <Box>
            <ScrollSpecialities specialities={params.specialties} />
          </Box>

          {/* Doctors Grid */}
          {data && data.length > 0 ? (
            <Grid container spacing={{ xs: 3, md: 4 }}>
              {data.map((doctor: TDoctor) => (
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
                No doctors found
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  maxWidth: "500px",
                  mx: "auto",
                }}
              >
                Try selecting a different specialty or check back later for new
                additions to our network.
              </Typography>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Doctors;
