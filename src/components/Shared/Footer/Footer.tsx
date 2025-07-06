import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import facebook from "../../../assets/landing_page/facebook.png";
import instragram from "../../../assets/landing_page/instagram.png";
import linkdin from "../../../assets/landing_page/linkedin.png";
import twitter from "../../../assets/landing_page/twitter.png";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "grey.900",
        color: "white",
        py: { xs: 4, md: 6, lg: 8 },
      }}
    >
      <Container maxWidth="xl">
        {/* Navigation Links */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: 2, sm: 3, md: 4, lg: 5 },
            mb: { xs: 3, md: 4 },
            flexWrap: "wrap",
          }}
        >
          <Link href="/doctors" style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: "0.875rem", md: "1rem" },
                "&:hover": { color: "primary.main" },
                transition: "color 0.2s ease",
              }}
            >
              All Doctors
            </Typography>
          </Link>
          <Link href="/consultation" style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: "0.875rem", md: "1rem" },
                "&:hover": { color: "primary.main" },
                transition: "color 0.2s ease",
              }}
            >
              Health Plans
            </Typography>
          </Link>
          <Link href="/consultation" style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: "0.875rem", md: "1rem" },
                "&:hover": { color: "primary.main" },
                transition: "color 0.2s ease",
              }}
            >
              Medicine
            </Typography>
          </Link>
          <Link href="/consultation" style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: "0.875rem", md: "1rem" },
                "&:hover": { color: "primary.main" },
                transition: "color 0.2s ease",
              }}
            >
              Diagnostics
            </Typography>
          </Link>
          <Link href="/contact-us" style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: "0.875rem", md: "1rem" },
                "&:hover": { color: "primary.main" },
                transition: "color 0.2s ease",
              }}
            >
              Contact us
            </Typography>
          </Link>
        </Box>

        {/* Social Media Links */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: 2, md: 3 },
            py: { xs: 3, md: 4 },
            borderBottom: "1px dashed",
            borderColor: "grey.700",
            mb: { xs: 3, md: 4 },
          }}
        >
          <Link href="/facebook">
            <Image
              src={facebook}
              height={30}
              width={30}
              alt="facebook"
              style={{ cursor: "pointer" }}
            />
          </Link>
          <Link href="/instagram">
            <Image
              src={instragram}
              height={30}
              width={30}
              alt="instagram"
              style={{ cursor: "pointer" }}
            />
          </Link>
          <Link href="/twitter">
            <Image
              src={twitter}
              height={30}
              width={30}
              alt="twitter"
              style={{ cursor: "pointer" }}
            />
          </Link>
          <Link href="/linkedin">
            <Image
              src={linkdin}
              height={30}
              width={30}
              alt="linkedin"
              style={{ cursor: "pointer" }}
            />
          </Link>
        </Box>

        {/* Bottom Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: { xs: 2, md: 3 },
            pt: { xs: 2, md: 3 },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
              textAlign: { xs: "center", md: "left" },
              order: { xs: 2, md: 1 },
            }}
          >
            ©2024 MediSync. All Rights Reserved
          </Typography>

          <Link href="/" style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: {
                  xs: "1.5rem",
                  sm: "2rem",
                  md: "2.5rem",
                  lg: "3rem",
                },
                color: "white",
                order: { xs: 1, md: 2 },
                "&:hover": { color: "primary.main" },
                transition: "color 0.2s ease",
              }}
            >
              MediSync
            </Typography>
          </Link>

          <Link href="/termsAndConditions" style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                color: "white",
                textAlign: { xs: "center", md: "right" },
                order: { xs: 3, md: 3 },
                "&:hover": { color: "primary.main" },
                transition: "color 0.2s ease",
              }}
            >
              Privacy Policy | Terms and Conditions
            </Typography>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
