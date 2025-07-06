import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import HowItworks from "../../../../assets/how-it-works-img.png";
import appointment from "../../../../assets/icons/appointment-icon.png";
import charity from "../../../../assets/icons/charity-icon.png";
import checkDoctorProfile from "../../../../assets/icons/doctor-icon.png";
import seachDoctor from "../../../../assets/icons/search-icon.png";
const HowItWorks = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: { xs: 4, md: 6, lg: 8 }, px: { xs: 1, md: 2 } }}>
        {/* heading */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h6"
            color="primary"
            sx={{
              fontSize: { xs: "1rem", md: "1.125rem" },
              mb: 1,
            }}
          >
            How it Works
          </Typography>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            4 Easy Steps for get your solution
          </Typography>
          <Typography
            variant="body1"
            color="primary.body1"
            sx={{
              maxWidth: { xs: "100%", sm: "600px" },
              mx: "auto",
              fontSize: { xs: "0.875rem", md: "1rem" },
              lineHeight: 1.6,
            }}
          >
            Access to expert physicians and surgeons, advanced technologies and
            top-quality surgery facilities right here.
          </Typography>
        </Box>

        {/* main content */}
        <Grid container spacing={{ xs: 3, md: 5 }} alignItems="center">
          {/* Image Section */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: { xs: 3, lg: 0 },
              }}
            >
              <Image
                src={HowItworks || "/default-Image"}
                alt="How it works illustration"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </Box>
          </Grid>

          {/* Steps Section */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {/* Step 1 */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box
                  sx={{
                    border: "2px solid #ddd",
                    borderRadius: "10px",
                    p: { xs: 2, md: 3 },
                    height: { xs: "auto", sm: "200px", md: "220px" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Image
                    src={checkDoctorProfile}
                    alt="Search Doctor"
                    width={50}
                    height={50}
                    style={{ margin: "0 auto 12px" }}
                  />
                  <Typography
                    variant="h5"
                    fontWeight={500}
                    sx={{
                      fontSize: { xs: "1.125rem", md: "1.25rem" },
                      mb: 1,
                    }}
                  >
                    Search Doctor
                  </Typography>
                  <Typography
                    fontWeight={300}
                    variant="body2"
                    color="primary.body1"
                    sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                  >
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur nisi.
                  </Typography>
                </Box>
              </Grid>

              {/* Step 2 */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box
                  sx={{
                    border: "2px solid #ddd",
                    borderRadius: "10px",
                    p: { xs: 2, md: 3 },
                    height: { xs: "auto", sm: "200px", md: "220px" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Image
                    src={seachDoctor}
                    alt="Check Doctor Profile"
                    width={50}
                    height={50}
                    style={{ margin: "0 auto 12px" }}
                  />
                  <Typography
                    variant="h5"
                    fontWeight={500}
                    sx={{
                      fontSize: { xs: "1.125rem", md: "1.25rem" },
                      mb: 1,
                    }}
                  >
                    Check Doctor Profile
                  </Typography>
                  <Typography
                    fontWeight={300}
                    variant="body2"
                    color="primary.body1"
                    sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                  >
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur nisi.
                  </Typography>
                </Box>
              </Grid>

              {/* Step 3 */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box
                  sx={{
                    border: "2px solid #ddd",
                    borderRadius: "10px",
                    p: { xs: 2, md: 3 },
                    height: { xs: "auto", sm: "200px", md: "220px" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Image
                    src={appointment}
                    alt="Schedule Appointment"
                    width={50}
                    height={50}
                    style={{ margin: "0 auto 12px" }}
                  />
                  <Typography
                    variant="h5"
                    fontWeight={500}
                    sx={{
                      fontSize: { xs: "1.125rem", md: "1.25rem" },
                      mb: 1,
                    }}
                  >
                    Schedule Appointment
                  </Typography>
                  <Typography
                    fontWeight={300}
                    variant="body2"
                    color="primary.body1"
                    sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                  >
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur nisi.
                  </Typography>
                </Box>
              </Grid>

              {/* Step 4 */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box
                  sx={{
                    border: "2px solid #ddd",
                    borderRadius: "10px",
                    p: { xs: 2, md: 3 },
                    height: { xs: "auto", sm: "200px", md: "220px" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Image
                    src={charity}
                    alt="Get Your Solution"
                    width={50}
                    height={50}
                    style={{ margin: "0 auto 12px" }}
                  />
                  <Typography
                    variant="h5"
                    fontWeight={500}
                    sx={{
                      fontSize: { xs: "1.125rem", md: "1.25rem" },
                      mb: 1,
                    }}
                  >
                    Get Your Solution
                  </Typography>
                  <Typography
                    fontWeight={300}
                    variant="body2"
                    color="primary.body1"
                    sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                  >
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur nisi.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HowItWorks;
