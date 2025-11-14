/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import asssets from "@/assets";
import { USER_ROLE } from "@/constants/role";
import { getUserInfo } from "@/services/auth.services";
import { drawerItems } from "@/utils/drawerItems";
import {
  Avatar,
  Box,
  Divider,
  Link,
  List,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>("User");
  const [roleLabel, setRoleLabel] = useState<string>("");

  useEffect(() => {
    const user = getUserInfo() as {
      role?: string;
      email?: string;
      name?: string;
    } | null;
    if (user?.role) {
      const roleKey = user.role.toUpperCase() as keyof typeof USER_ROLE;
      const normalizedRole =
        USER_ROLE[roleKey]?.toLowerCase() ?? user.role.toLowerCase();
      setUserRole(normalizedRole);
      const readable =
        roleKey && USER_ROLE[roleKey]
          ? roleKey
              .toLowerCase()
              .replace(/_/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())
          : user.role;
      setRoleLabel(readable);
    }
    if (user?.name || user?.email) {
      const source = user.name?.trim() || user.email?.split("@")[0] || "User";
      setDisplayName(source);
    }
  }, []);

  const items = useMemo(() => {
    if (!userRole) {
      return [];
    }
    return drawerItems(userRole as any);
  }, [userRole]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "rgba(21,134,253,0.04)",
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack spacing={2.5} sx={{ px: 3, pt: 3 }}>
        <Stack
          direction="row"
          alignItems="center"
          component={Link}
          href="/"
          gap={1.5}
          sx={{ textDecoration: "none" }}
        >
          <Image
            src={asssets.svgs.logo}
            width={38}
            height={38}
            alt="MediSync logo"
          />
          <Typography
            variant="h6"
            component="h1"
            sx={{
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            MediSync
          </Typography>
        </Stack>

        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 3,
            px: 2.5,
            py: 2,
            boxShadow: "0 8px 24px rgba(21,134,253,0.12)",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt="User avatar"
              sx={{
                width: 44,
                height: 44,
                bgcolor: "primary.main",
                fontWeight: 600,
              }}
            >
              {displayName.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: "text.primary",
                  maxWidth: 148,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {displayName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  textTransform: "capitalize",
                }}
              >
                {roleLabel || "Loading"}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>

      <Divider sx={{ mt: 3 }} />

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          py: 2,
        }}
      >
        <List sx={{ px: 1 }}>
          {items.map((item) => (
            <SidebarItem key={item.title} item={item} />
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
