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
import appointment from "../../../../assets/icons/appointment-icon.png";
import charity from "../../../../assets/icons/charity-icon.png";
import checkDoctorProfile from "../../../../assets/icons/doctor-icon.png";
import seachDoctor from "../../../../assets/icons/search-icon.png";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: seachDoctor,
      title: "Search Doctor",
      description:
        "Browse through our extensive network of qualified healthcare professionals. Filter by specialty, location, availability, and ratings to find the perfect match for your needs.",
    },
    {
      number: "02",
      icon: checkDoctorProfile,
      title: "Check Doctor Profile",
      description:
        "Review detailed profiles including qualifications, experience, specialties, patient reviews, and consultation fees. Make an informed decision before booking your appointment.",
    },
    {
      number: "03",
      icon: appointment,
      title: "Schedule Appointment",
      description:
        "Select your preferred date and time slot from the doctor's available schedule. Complete the booking process with secure payment and receive instant confirmation.",
    },
    {
      number: "04",
      icon: charity,
      title: "Get Your Solution",
      description:
        "Attend your virtual or in-person consultation, receive expert medical advice, and get the care you need. Access your medical records and follow-up appointments all in one place.",
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12, lg: 16 },
        background:
          "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(21,134,253,0.04) 100%)",
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={{ xs: 4, md: 6 }}>
          {/* Header Section */}
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Chip
              label="How It Works"
              color="primary"
              variant="outlined"
              sx={{ borderRadius: "999px", fontWeight: 600 }}
            />
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "text.primary",
              }}
            >
              4 Easy Steps to Get Your Solution
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.95rem", md: "1.05rem", lg: "1.15rem" },
                color: "text.secondary",
                maxWidth: "700px",
                lineHeight: 1.7,
              }}
            >
              Access expert physicians and surgeons, advanced technologies, and
              top-quality healthcare facilities through our streamlined booking
              process.
            </Typography>
          </Stack>

          {/* Steps Grid */}
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {steps.map((step, index) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
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
                    position: "relative",
                    overflow: "visible",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow:
                        "0 8px 30px rgba(21,134,253,0.15), 0 4px 12px rgba(8,17,52,0.08)",
                      borderColor: "primary.main",
                    },
                  }}
                >
                  {/* Step Number Badge */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: -12,
                      right: 16,
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      boxShadow: "0 4px 12px rgba(21,134,253,0.3)",
                    }}
                  >
                    {step.number}
                  </Box>

                  <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                    <Stack spacing={2.5} alignItems="center" textAlign="center">
                      <Box
                        sx={{
                          width: { xs: 70, md: 80 },
                          height: { xs: 70, md: 80 },
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mt: 1,
                        }}
                      >
                        <Image
                          src={step.icon}
                          alt={step.title}
                          width={60}
                          height={60}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            fontSize: { xs: "1.1rem", md: "1.25rem" },
                            mb: 1.5,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {step.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            fontSize: { xs: "0.875rem", md: "0.95rem" },
                            lineHeight: 1.7,
                          }}
                        >
                          {step.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default HowItWorks;
