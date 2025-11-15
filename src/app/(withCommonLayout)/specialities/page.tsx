import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

type TSpecilistiesProps = {
  id: string;
  title: string;
  icon: string;
};

const AllSpecialitiesPage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/specialities`
  );
  const { data: specialists } = await res.json();

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12, lg: 16 },
        background:
          "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(21,134,253,0.04) 100%)",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={{ xs: 4, md: 6 }}>
          {/* Header Section */}
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Chip
              label="All Medical Specialties"
              color="primary"
              variant="outlined"
              sx={{ borderRadius: "999px", fontWeight: 600 }}
            />
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "text.primary",
              }}
            >
              All Medical Specialists
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.95rem", md: "1.05rem", lg: "1.15rem" },
                color: "text.secondary",
                maxWidth: "700px",
                lineHeight: 1.7,
              }}
            >
              Explore all available medical specialties and find the right
              doctor for your needs. Click on any specialty to view available
              healthcare providers.
            </Typography>
          </Stack>

          {/* Specialists Grid */}
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {specialists?.map((specialist: TSpecilistiesProps) => (
              <Grid key={specialist.id} item xs={6} sm={4} md={3} lg={2}>
                <Link
                  href={`/specialities/${specialist.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                      boxShadow:
                        "0 4px 20px rgba(21,134,253,0.08), 0 2px 8px rgba(8,17,52,0.04)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow:
                          "0 8px 30px rgba(21,134,253,0.15), 0 4px 12px rgba(8,17,52,0.08)",
                        borderColor: "primary.main",
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: { xs: 2, sm: 2.5, md: 3 },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: { xs: 140, sm: 160, md: 180 },
                        textAlign: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 50, sm: 60, md: 70 },
                          height: { xs: 50, sm: 60, md: 70 },
                          mb: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "primary.light",
                          borderRadius: 2,
                          p: 1,
                        }}
                      >
                        <Image
                          src={specialist.icon || "/default-Image"}
                          alt={specialist.title}
                          width={50}
                          height={50}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </Box>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: {
                            xs: "0.875rem",
                            sm: "0.95rem",
                            md: "1rem",
                          },
                          color: "text.primary",
                          mt: 1,
                          lineHeight: 1.3,
                        }}
                      >
                        {specialist.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default AllSpecialitiesPage;
