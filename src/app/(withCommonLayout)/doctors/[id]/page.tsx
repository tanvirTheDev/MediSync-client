import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import DoctorsScheduleSlots from "../comoponents/DoctorsScheduleSlots";

const Page = async ({ params }: any) => {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/doctor/${id}`
  );
  const { data: doctor } = await res.json();

  const specialties =
    doctor.doctorSpecialities?.map((ds: any) => ds.specialities.title) || [];
  const photo =
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop";

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6, lg: 8 },
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
              label="Doctor Profile"
              color="primary"
              variant="outlined"
              sx={{ borderRadius: "999px", fontWeight: 600 }}
            />
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Meet Your Healthcare Provider
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                color: "text.secondary",
                maxWidth: "700px",
                lineHeight: 1.7,
              }}
            >
              Compassionate and dedicated professional committed to delivering
              high-quality care through evidence-based diagnosis, personalized
              treatment, and patient-centered approaches.
            </Typography>
          </Stack>

          {/* Main Doctor Info Card */}
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                "0 12px 35px rgba(21,134,253,0.08), 0 4px 18px rgba(8,17,52,0.04)",
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4, lg: 5 } }}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 3, md: 4 }}
              >
                {/* Doctor Image */}
                <Box
                  sx={{
                    width: { xs: "100%", md: 280 },
                    height: { xs: 300, md: 280 },
                    borderRadius: 3,
                    overflow: "hidden",
                    flexShrink: 0,
                    position: "relative",
                    bgcolor: "grey.100",
                  }}
                >
                  <Image
                    src={doctor?.profilePhoto || photo}
                    alt={doctor?.name || "Doctor"}
                    fill
                    sizes="(max-width: 600px) 100vw, 280px"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </Box>

                {/* Doctor Details */}
                <Stack flex={1} spacing={3}>
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: "1.5rem", md: "2rem" },
                        mb: 0.5,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {doctor?.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: "secondary.main",
                        fontSize: { xs: "1rem", md: "1.125rem" },
                        mb: 2,
                      }}
                    >
                      {doctor?.designation}
                    </Typography>

                    {specialties.length > 0 && (
                      <Stack direction="row" flexWrap="wrap" gap={1}>
                        {specialties.map((sp: string) => (
                          <Chip
                            key={sp}
                            label={sp}
                            color="primary"
                            variant="outlined"
                            sx={{ borderRadius: 2, fontWeight: 500 }}
                          />
                        ))}
                      </Stack>
                    )}
                  </Box>

                  <Divider />

                  <Stack spacing={2}>
                    {doctor?.currentWorkingPlace && (
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            fontSize: { xs: "0.875rem", md: "0.95rem" },
                            mb: 0.5,
                          }}
                        >
                          Working at
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: { xs: "1rem", md: "1.125rem" },
                          }}
                        >
                          {doctor.currentWorkingPlace}
                        </Typography>
                      </Box>
                    )}

                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontSize: { xs: "0.875rem", md: "0.95rem" },
                          mb: 0.5,
                        }}
                      >
                        Consultation Fee
                      </Typography>
                      <Stack direction="row" alignItems="baseline" spacing={1}>
                        <Typography
                          sx={{
                            color: "primary.main",
                            fontWeight: 700,
                            fontSize: { xs: "1.25rem", md: "1.5rem" },
                          }}
                        >
                          ৳ {doctor?.apointmentFee || doctor?.appointmentFee}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          (incl. VAT) · Per consultation
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={6} sm={3}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  background:
                    "linear-gradient(135deg, rgba(21,134,253,0.08) 0%, rgba(21,134,253,0.02) 100%)",
                  p: 2.5,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "primary.main",
                    fontWeight: 700,
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                    mb: 0.5,
                  }}
                >
                  {doctor?.experience}+
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "0.875rem", md: "0.95rem" },
                  }}
                >
                  Years Experience
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  background:
                    "linear-gradient(135deg, rgba(21,134,253,0.08) 0%, rgba(21,134,253,0.02) 100%)",
                  p: 2.5,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "primary.main",
                    fontWeight: 700,
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                    mb: 0.5,
                  }}
                >
                  {doctor?.qualification || "N/A"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "0.875rem", md: "0.95rem" },
                  }}
                >
                  Qualification
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  background:
                    "linear-gradient(135deg, rgba(21,134,253,0.08) 0%, rgba(21,134,253,0.02) 100%)",
                  p: 2.5,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "primary.main",
                    fontWeight: 700,
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                    mb: 0.5,
                  }}
                >
                  {doctor?.averageRating || "N/A"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "0.875rem", md: "0.95rem" },
                  }}
                >
                  Average Rating
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  background:
                    "linear-gradient(135deg, rgba(21,134,253,0.08) 0%, rgba(21,134,253,0.02) 100%)",
                  p: 2.5,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "primary.main",
                    fontWeight: 700,
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                    mb: 0.5,
                  }}
                >
                  {doctor?.contactNumber || "N/A"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "0.875rem", md: "0.95rem" },
                  }}
                >
                  Contact Number
                </Typography>
              </Card>
            </Grid>
          </Grid>

          {/* Schedule Slots */}
          <DoctorsScheduleSlots id={doctor.id} />
        </Stack>
      </Container>
    </Box>
  );
};

export default Page;
