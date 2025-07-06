import { Box, Button, Container } from "@mui/material";
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
        py: { xs: 8, md: 12, lg: 16, xl: 20 },
        backgroundColor: "rgba(20,20,20, 0.1)",
        clipPath: {
          xs: "none",
          lg: "polygon(0 0, 100% 15%, 100% 100%, 0 85%)",
        },
      }}
    >
      <Container>
        <Box sx={{ py: { xs: 3, md: 4, lg: 5 } }}>
          <Box sx={{ textAlign: "center", px: 2 }}>
            <Box
              component="h2"
              sx={{
                fontSize: { xs: "1.5rem", md: "1.875rem", lg: "2.25rem" },
                fontWeight: 700,
                mb: 2,
              }}
            >
              Our Top Rated Doctors
            </Box>
            <Box
              component="p"
              sx={{
                fontSize: { xs: "0.875rem", md: "1rem", lg: "1.125rem" },
                color: "text.secondary",
                maxWidth: "800px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Access to expert physicians and surgeons, advanced technologies
              and top-quality surgery facilities right here.
            </Box>
          </Box>
          <Box sx={{ mt: { xs: 4, md: 6, lg: 8 } }}>
            {doctorsData?.map((doctor: any) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </Box>
        </Box>
      </Container>
      <Box sx={{ textAlign: "center", mt: { xs: 4, md: 6 } }}>
        <Link href="/doctors">
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              fontSize: { xs: "0.875rem", md: "1rem" },
              px: { xs: 3, md: 4 },
              py: { xs: 1, md: 1.5 },
            }}
          >
            View All Doctors
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default TopRatedDoctors;
