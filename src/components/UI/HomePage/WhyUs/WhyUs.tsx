import assets from "@/assets";
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

const WhyUs = () => {
  const servicesData = [
    {
      imageSrc: assets.svgs.award,
      title: "Award Winning Service",
      description:
        "Recognized for excellence in healthcare delivery with multiple industry awards and patient satisfaction ratings that exceed national averages.",
    },
    {
      imageSrc: assets.svgs.care,
      title: "Best Quality Pregnancy Care",
      description:
        "Comprehensive maternal health services with personalized care plans, advanced monitoring, and dedicated support throughout your journey.",
    },
    {
      imageSrc: assets.svgs.equipment,
      title: "Complete Medical Equipments",
      description:
        "State-of-the-art medical technology and equipment ensuring accurate diagnoses and effective treatments for all patient needs.",
    },
    {
      imageSrc: assets.svgs.call,
      title: "Dedicated Emergency Care",
      description:
        "24/7 emergency response team ready to provide immediate medical attention when you need it most, with rapid response times.",
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12, lg: 16 },
        background:
          "linear-gradient(180deg, rgba(21,134,253,0.04) 0%, rgba(255,255,255,1) 100%)",
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={{ xs: 4, md: 6 }}>
          {/* Header Section */}
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Chip
              label="Why Choose Us"
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
              Excellence in Healthcare Delivery
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.95rem", md: "1.05rem", lg: "1.15rem" },
                color: "text.secondary",
                maxWidth: "700px",
                lineHeight: 1.7,
              }}
            >
              We combine cutting-edge medical technology with compassionate care
              to deliver exceptional healthcare experiences tailored to your
              unique needs.
            </Typography>
          </Stack>

          {/* Services Grid */}
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {servicesData.map((service, index) => (
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
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow:
                        "0 8px 30px rgba(21,134,253,0.15), 0 4px 12px rgba(8,17,52,0.08)",
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                    <Stack spacing={2}>
                      <Box
                        sx={{
                          width: { xs: 60, md: 70 },
                          height: { xs: 60, md: 70 },
                          borderRadius: 2,
                          bgcolor: "primary.light",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          p: 1.5,
                        }}
                      >
                        <Image
                          src={service.imageSrc}
                          alt={service.title}
                          width={50}
                          height={50}
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
                            mb: 1,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {service.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            fontSize: { xs: "0.875rem", md: "0.95rem" },
                            lineHeight: 1.7,
                          }}
                        >
                          {service.description}
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

export default WhyUs;
