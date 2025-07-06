"use client";
import AuthButton from "@/components/UI/AuthButton/AuthButton";
import { getUserInfo } from "@/services/auth.services";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const userInfo = getUserInfo() as any;
  const userId = userInfo?.userId;
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: "All Doctors", href: "/doctors" },
    { label: "Health Plans", href: "/consultation" },
    { label: "Medicine", href: "/consultation" },
    { label: "Diagnostics", href: "/consultation" },
    { label: "Contact us", href: "/contact-us" },
    ...(userId ? [{ label: "Dashboard", href: "/dashboard" }] : []),
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Link href="/">
        <Typography
          variant="h6"
          sx={{
            my: 2,
            fontWeight: 700,
            fontSize: "1.5rem",
            color: "#1565C0",
          }}
        >
          MediSync
        </Typography>
      </Link>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} component={Link} href={item.href}>
            <ListItemText
              primary={item.label}
              sx={{
                textAlign: "center",
                "& .MuiListItemText-primary": {
                  fontSize: "1rem",
                  fontWeight: 500,
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: { xs: 2, md: 3 },
            px: { xs: 1, md: 2 },
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                color: "#1565C0",
                cursor: "pointer",
              }}
            >
              MediSync
            </Typography>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { md: 3, lg: 4 },
              }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      color: "text.primary",
                      fontSize: { md: "0.875rem", lg: "1rem" },
                      fontWeight: 500,
                      "&:hover": {
                        color: "primary.main",
                      },
                      transition: "color 0.2s ease",
                    }}
                  >
                    {item.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          )}

          {/* Auth Button */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AuthButton />

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navbar;
