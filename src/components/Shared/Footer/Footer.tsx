import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import facebook from "../../../assets/landing_page/facebook.png";
import instragram from "../../../assets/landing_page/instagram.png";
import linkdin from "../../../assets/landing_page/linkedin.png";
import twitter from "../../../assets/landing_page/twitter.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { label: "All Doctors", href: "/doctors" },
      { label: "Specialties", href: "/specialities" },
      { label: "Contact Us", href: "/contact-us" },
    ],
    services: [
      { label: "Health Plans", href: "/consultation" },
      { label: "Medicine", href: "/consultation" },
      { label: "Diagnostics", href: "/consultation" },
    ],
  };

  const socialLinks = [
    { icon: facebook, alt: "Facebook", href: "/facebook" },
    { icon: instragram, alt: "Instagram", href: "/instagram" },
    { icon: twitter, alt: "Twitter", href: "/twitter" },
    { icon: linkdin, alt: "LinkedIn", href: "/linkedin" },
  ];

  return (
    <Box
      sx={{
        bgcolor: "grey.900",
        color: "white",
        pt: { xs: 6, md: 8, lg: 10 },
        pb: { xs: 3, md: 4 },
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Link href="/" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.75rem", md: "2.25rem", lg: "2.75rem" },
                    color: "white",
                    "&:hover": { color: "primary.main" },
                    transition: "color 0.2s ease",
                    mb: 1,
                  }}
                >
                  MediSync
                </Typography>
              </Link>
              <Typography
                sx={{
                  fontSize: { xs: "0.875rem", md: "0.95rem" },
                  color: "grey.400",
                  lineHeight: 1.7,
                  maxWidth: "300px",
                }}
              >
                Your trusted partner in healthcare. Connecting patients with
                expert medical professionals for better health outcomes.
              </Typography>
              {/* Social Media Icons */}
              <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
                {socialLinks.map((social, index) => (
                  <Link key={index} href={social.href}>
                    <IconButton
                      sx={{
                        bgcolor: "rgba(255,255,255,0.1)",
                        color: "white",
                        width: { xs: 36, md: 40 },
                        height: { xs: 36, md: 40 },
                        "&:hover": {
                          bgcolor: "primary.main",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Image
                        src={social.icon}
                        alt={social.alt}
                        width={20}
                        height={20}
                      />
                    </IconButton>
                  </Link>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={4}>
            <Stack spacing={2}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  mb: 1,
                }}
              >
                Quick Links
              </Typography>
              <Stack spacing={1.5}>
                {footerLinks.quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      sx={{
                        color: "grey.400",
                        fontSize: { xs: "0.875rem", md: "0.95rem" },
                        "&:hover": { color: "primary.main" },
                        transition: "color 0.2s ease",
                      }}
                    >
                      {link.label}
                    </Typography>
                  </Link>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Services */}
          <Grid item xs={6} md={4}>
            <Stack spacing={2}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  mb: 1,
                }}
              >
                Services
              </Typography>
              <Stack spacing={1.5}>
                {footerLinks.services.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      sx={{
                        color: "grey.400",
                        fontSize: { xs: "0.875rem", md: "0.95rem" },
                        "&:hover": { color: "primary.main" },
                        transition: "color 0.2s ease",
                      }}
                    >
                      {link.label}
                    </Typography>
                  </Link>
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: { xs: 4, md: 5 },
            borderColor: "rgba(255,255,255,0.1)",
          }}
        />

        {/* Bottom Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: { xs: 2, md: 3 },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              color: "grey.500",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            © {currentYear} MediSync. All Rights Reserved
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
            }}
          >
            <Link href="/termsAndConditions" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  color: "grey.400",
                  "&:hover": { color: "primary.main" },
                  transition: "color 0.2s ease",
                }}
              >
                Privacy Policy
              </Typography>
            </Link>
            <Box
              sx={{
                display: { xs: "none", sm: "block" },
                width: "1px",
                height: "16px",
                bgcolor: "grey.600",
              }}
            />
            <Link href="/termsAndConditions" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  color: "grey.400",
                  "&:hover": { color: "primary.main" },
                  transition: "color 0.2s ease",
                }}
              >
                Terms and Conditions
              </Typography>
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
