import assets from "@/assets";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

const HeroSection = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, rgba(21,134,253,0.06) 0%, rgba(21,134,253,0) 60%)",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            minHeight: { xs: "auto", md: "88vh" },
            py: { xs: 6, md: 8 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.1fr 0.9fr" },
            alignItems: "center",
            gap: { xs: 6, md: 8 },
          }}
        >
          {/* Left: Content */}
          <Box sx={{ order: { xs: 2, lg: 1 } }}>
            <Box
              sx={{
                backgroundImage: `url(${assets.svgs.grid.src})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
              }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Chip
                  label="Transform Healthcare Delivery"
                  color="primary"
                  variant="outlined"
                  sx={{ borderRadius: "999px", fontWeight: 600, px: 1 }}
                />
              </Stack>

              <Typography
                component="h1"
                sx={{
                  fontSize: {
                    xs: "2rem",
                    sm: "2.75rem",
                    md: "3.5rem",
                    lg: "4rem",
                  },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                Better Care,
              </Typography>
              <Typography
                component="h1"
                sx={{
                  display: "block",
                  fontSize: {
                    xs: "2rem",
                    sm: "2.75rem",
                    md: "3.5rem",
                    lg: "4rem",
                  },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 2.5,
                  color: "primary.main",
                }}
              >
                Better Connected
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  lineHeight: 1.75,
                  color: "text.secondary",
                  mb: 4,
                  maxWidth: 700,
                }}
              >
                Streamline patient‑doctor communication, manage appointments
                seamlessly, and deliver exceptional healthcare outcomes with our
                comprehensive platform.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 2.5 }}
                sx={{ mb: 4 }}
              >
                <Link href="/doctors">
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      fontSize: { xs: "0.95rem", md: "1rem" },
                      px: { xs: 3.5, md: 4 },
                      py: { xs: 1.75, md: 2 },
                      boxShadow: 1,
                    }}
                  >
                    Book Appointment
                  </Button>
                </Link>
                <Link href="/contact-us">
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      fontSize: { xs: "0.95rem", md: "1rem" },
                      px: { xs: 3.5, md: 4 },
                      py: { xs: 1.75, md: 2 },
                      borderWidth: 2,
                    }}
                  >
                    Learn More
                  </Button>
                </Link>
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 4 }}
              >
                <Stack>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: "1.4rem", md: "1.6rem" },
                      color: "primary.main",
                    }}
                  >
                    10K+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Patients
                  </Typography>
                </Stack>
                <Stack>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: "1.4rem", md: "1.6rem" },
                      color: "primary.main",
                    }}
                  >
                    500+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Doctors
                  </Typography>
                </Stack>
                <Stack>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: "1.4rem", md: "1.6rem" },
                      color: "primary.main",
                    }}
                  >
                    99%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Uptime
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Box>

          {/* Right: Visuals */}
          <Box
            sx={{
              order: { xs: 1, lg: 2 },
              position: "relative",
              minHeight: { xs: 360, sm: 420, md: 520, lg: 600 },
            }}
          >
            {/* Appointment Preview Card */}
            <Paper
              elevation={0}
              sx={{
                position: "absolute",
                inset: { xs: 16, sm: 24 },
                borderRadius: 3,
                p: { xs: 2, sm: 3 },
                border: "1px solid",
                borderColor: "divider",
                boxShadow:
                  "0 10px 30px rgba(21,134,253,0.12), 0 6px 12px rgba(0,0,0,0.04)",
                bgcolor: "background.paper",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 700 }}>
                    Today&apos;s Appointments
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    5 scheduled consultations
                  </Typography>
                </Box>
                <Chip size="small" label="👥" sx={{ borderRadius: 2 }} />
              </Stack>
              <Divider sx={{ my: 1.5 }} />

              {/* Item 1 */}
              <Box
                sx={{
                  p: 1.25,
                  borderRadius: 2,
                  bgcolor: "action.hover",
                  mb: 1,
                }}
              >
                <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
                  John Doe
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2" color="text.secondary">
                    Consultation · 09:00 AM
                  </Typography>
                  <Chip
                    size="small"
                    color="success"
                    label="Confirmed"
                    sx={{ height: 22 }}
                  />
                </Stack>
              </Box>

              {/* Item 2 */}
              <Box
                sx={{
                  p: 1.25,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  mb: 1,
                }}
              >
                <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
                  Jane Smith
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2" color="text.secondary">
                    Follow‑up · 10:30 AM
                  </Typography>
                  <Chip
                    size="small"
                    label="In Progress"
                    sx={{
                      height: 22,
                      bgcolor: "warning.light",
                      color: "warning.dark",
                    }}
                  />
                </Stack>
              </Box>

              {/* Item 3 */}
              <Box
                sx={{
                  p: 1.25,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  mb: 2,
                }}
              >
                <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
                  Mike Johnson
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2" color="text.secondary">
                    Check‑up · 02:00 PM
                  </Typography>
                  <Chip
                    size="small"
                    label="Pending"
                    sx={{
                      height: 22,
                      bgcolor: "info.light",
                      color: "info.dark",
                    }}
                  />
                </Stack>
              </Box>

              <Button
                fullWidth
                variant="contained"
                sx={{ textTransform: "none" }}
              >
                View All Appointments
              </Button>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
