import assets from "@/assets";
import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";

const HeroSection = () => {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          minHeight: { xs: "auto", md: "100vh" },
          py: { xs: 4, md: 6, lg: 8 },
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: "center",
          gap: { xs: 4, md: 6, lg: 8 },
        }}
      >
        {/* Content Section */}
        <Box
          sx={{
            flex: { lg: 1 },
            order: { xs: 2, lg: 1 },
            width: "100%",
            maxWidth: { lg: "50%" },
          }}
        >
          <Box
            sx={{
              backgroundImage: `url(${assets.svgs.grid.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              p: { xs: 3, md: 4, lg: 5 },
              borderRadius: 2,
            }}
          >
            <Box sx={{ space: 3 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: "2.5rem",
                    sm: "3rem",
                    md: "4rem",
                    lg: "5rem",
                  },
                  fontWeight: 700,
                  lineHeight: 1.1,
                  mb: 1,
                }}
              >
                Healthier Hearts
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: "2.5rem",
                    sm: "3rem",
                    md: "4rem",
                    lg: "5rem",
                  },
                  fontWeight: 700,
                  lineHeight: 1.1,
                  mb: 1,
                }}
              >
                Come From
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: "2.5rem",
                    sm: "3rem",
                    md: "4rem",
                    lg: "5rem",
                  },
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: "primary.main",
                  mb: 3,
                }}
              >
                Preventive Care
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "0.875rem", md: "1rem", lg: "1.125rem" },
                  lineHeight: 1.6,
                  color: "text.secondary",
                  mb: 4,
                  maxWidth: "600px",
                }}
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea
                consequatur quisquam, iste minima magnam asperiores quia fugit
                possimus, sit laborum, expedita voluptate! Inventore placeat
                illum corporis dicta officiis? Totam, earum!
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 2, sm: 3 },
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    px: { xs: 3, md: 4 },
                    py: { xs: 1.5, md: 2 },
                  }}
                >
                  Make Appointment
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    px: { xs: 3, md: 4 },
                    py: { xs: 1.5, md: 2 },
                  }}
                >
                  Contact Us
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Images Section */}
        <Box
          sx={{
            flex: { lg: 1 },
            order: { xs: 1, lg: 2 },
            width: "100%",
            maxWidth: { lg: "50%" },
            position: "relative",
            minHeight: { xs: "400px", md: "500px", lg: "600px" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Arrow */}
          <Box
            sx={{
              position: "absolute",
              top: { xs: "5%", md: "10%" },
              left: { xs: "20%", md: "30%" },
              zIndex: 2,
            }}
          >
            <Image
              src={assets.svgs.arrow || "/default-Image"}
              width={60}
              height={60}
              alt="arrow"
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "60px",
              }}
            />
          </Box>

          {/* Doctor 1 */}
          <Box
            sx={{
              position: "absolute",
              left: { xs: "5%", md: "10%" },
              top: { xs: "15%", md: "20%" },
              zIndex: 1,
            }}
          >
            <Image
              src={assets.images.doctor1 || "/default-Image"}
              alt="doctor1"
              width={200}
              height={400}
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "200px",
              }}
            />
          </Box>

          {/* Doctor 2 */}
          <Box
            sx={{
              position: "absolute",
              right: { xs: "5%", md: "10%" },
              top: { xs: "5%", md: "10%" },
              zIndex: 1,
            }}
          >
            <Image
              src={assets.images.doctor2 || "/default-Image"}
              alt="doctor2"
              width={250}
              height={500}
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "250px",
              }}
            />
          </Box>

          {/* Doctor 3 */}
          <Box
            sx={{
              position: "absolute",
              left: { xs: "10%", md: "15%" },
              bottom: { xs: "5%", md: "10%" },
              zIndex: 1,
            }}
          >
            <Image
              src={assets.images.doctor3 || "/default-Image"}
              alt="doctor3"
              width={220}
              height={400}
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "220px",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;
