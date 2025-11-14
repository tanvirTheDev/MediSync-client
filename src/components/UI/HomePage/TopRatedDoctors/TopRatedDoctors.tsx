import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import DoctorCard from "./DoctorCard";

const TopRatedDoctors = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/doctor?page=1&limit=4`
  );
  const { data: doctorsData } = await res.json();
  // console.log(doctorsData);

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12, lg: 16 },
        background:
          "linear-gradient(180deg, rgba(21,134,253,0.06) 0%, rgba(21,134,253,0.02) 100%)",
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={{ xs: 4, md: 6 }}>
          <Stack
            spacing={2}
            alignItems="center"
            textAlign="center"
            sx={{ px: { xs: 2, md: 6 } }}
          >
            <Chip
              label="Meet Our Experts"
              color="primary"
              variant="outlined"
              sx={{ borderRadius: "999px", fontWeight: 600 }}
            />
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "1.75rem", md: "2.25rem", lg: "2.75rem" },
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              Our Top Rated Doctors
            </Typography>
            <Typography
              component="p"
              sx={{
                fontSize: { xs: "0.95rem", md: "1.05rem", lg: "1.15rem" },
                color: "text.secondary",
                maxWidth: "760px",
                lineHeight: 1.7,
              }}
            >
              Access board-certified specialists, advanced treatment plans, and
              seamless care coordination designed to keep every patient on the
              right path to better health.
            </Typography>
          </Stack>

          <Grid container spacing={{ xs: 3, md: 4 }}>
            {doctorsData?.map((doctor: any) => (
              <Grid key={doctor.id} item xs={12} sm={6} lg={3}>
                <DoctorCard doctor={doctor} />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: { xs: 2, md: 4 } }}>
            <Link href="/doctors">
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  borderRadius: 999,
                  fontSize: { xs: "0.95rem", md: "1rem" },
                  px: { xs: 3.5, md: 4.5 },
                  py: { xs: 1.25, md: 1.5 },
                }}
              >
                View All Doctors
              </Button>
            </Link>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default TopRatedDoctors;
