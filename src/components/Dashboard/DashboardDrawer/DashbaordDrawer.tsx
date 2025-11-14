"use client";

import { useGetMyProfileQuery } from "@/redux/api/myProfileApi";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
  AppBar,
  Box,
  CircularProgress,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import * as React from "react";
import AccountMenu from "../AccountMenu/AccountMenu";
import Sidebar from "../Sidebar/Sidebar";

const drawerWidth = 280;

export default function DashboardDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const { data: userData, isLoading } = useGetMyProfileQuery(undefined);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f7f9fc" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "white",
          borderBottom: "1px solid",
          borderColor: "divider",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar sx={{ minHeight: 72, px: { xs: 2, md: 4 } }}>
          <Stack direction="row" alignItems="center" spacing={2} flexGrow={1}>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Stack spacing={0.5}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                Welcome back, {userData?.name || "User"}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {dayjs().format("dddd, MMMM D, YYYY")}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Tooltip title="Notifications">
              <IconButton
                size="large"
                sx={{
                  bgcolor: "rgba(21,134,253,0.08)",
                  color: "primary.main",
                  "&:hover": { bgcolor: "rgba(21,134,253,0.15)" },
                }}
              >
                <NotificationsNoneIcon />
              </IconButton>
            </Tooltip>
            {isLoading ? (
              <CircularProgress size={32} />
            ) : (
              <AccountMenu profilePhoto={userData?.profilePhoto} />
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="dashboard navigation"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "1px solid",
              borderColor: "divider",
            },
          }}
        >
          <Sidebar />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "1px solid",
              borderColor: "divider",
            },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          px: { xs: 2, md: 4 },
          py: { xs: 2, md: 4 },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            minHeight: "calc(100vh - 120px)",
            bgcolor: "white",
            borderRadius: 4,
            boxShadow: "0 12px 35px rgba(21,134,253,0.12)",
            p: { xs: 2.5, md: 4 },
          }}
        >
          {isLoading ? (
            <Stack
              minHeight={320}
              alignItems="center"
              justifyContent="center"
              spacing={2}
            >
              <CircularProgress />
              <Typography variant="body2" color="text.secondary">
                Loading your dashboard...
              </Typography>
            </Stack>
          ) : (
            children
          )}
        </Box>
        <Divider sx={{ mt: 4 }} />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1.5}
          sx={{ color: "text.secondary", fontSize: "0.8rem", mt: 2 }}
        >
          <Typography>
            © {dayjs().year()} MediSync. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Typography sx={{ cursor: "pointer" }}>Help Center</Typography>
            <Typography sx={{ cursor: "pointer" }}>Support</Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
