import ScrollSpecialities from "@/components/UI/Doctor/ScrollSpecialities";
import DoctorCard from "@/components/UI/HomePage/TopRatedDoctors/DoctorCard";
import { TDoctor } from "@/types";
import { Box, Container, Typography } from "@mui/material";

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
    <Container maxWidth="xl">
      <Box sx={{ py: { xs: 2, md: 4 }, px: { xs: 1, md: 2 } }}>
        {/* Header Section */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
              fontWeight: 700,
              textAlign: "center",
              color: "primary.main",
              mb: 1,
            }}
          >
            Find Your Doctor
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "0.875rem", md: "1rem" },
              textAlign: "center",
              color: "text.secondary",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Browse through our network of qualified healthcare professionals
          </Typography>
        </Box>

        {/* Specialties Section */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <ScrollSpecialities specialities={(await searchParams).specialties} />
        </Box>

        {/* Doctors Grid */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, md: 3 },
            mt: { xs: 2, md: 3 },
          }}
        >
          {data?.map((doctor: TDoctor) => (
            <Box key={doctor.id} sx={{ width: "100%" }}>
              <DoctorCard doctor={doctor} />
            </Box>
          ))}
        </Box>

        {/* No Results Message */}
        {(!data || data.length === 0) && (
          <Box
            sx={{
              textAlign: "center",
              py: { xs: 4, md: 6 },
              px: { xs: 2, md: 4 },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                mb: 1,
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
            >
              No doctors found
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.875rem", md: "1rem" },
              }}
            >
              Try selecting a different specialty or check back later
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Doctors;
