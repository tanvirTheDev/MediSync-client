import { IDrawerItem } from "@/types";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

type SidebarItemProps = {
  item: IDrawerItem;
};

const SidebarItem = ({ item }: SidebarItemProps) => {
  const linkPath = `/dashboard/${item.path}`;
  const pathname = usePathname();
  const isActive = pathname === linkPath;

  return (
    <ListItem disablePadding sx={{ mb: 0.5 }}>
      <ListItemButton
        component={Link}
        href={linkPath}
        selected={isActive}
        sx={{
          mx: 1,
          borderRadius: 2,
          px: 2,
          py: 1.25,
          gap: 1.5,
          ...(isActive
            ? {
                bgcolor: "rgba(21,134,253,0.12)",
                "& .MuiListItemIcon-root": {
                  color: "primary.main",
                },
              }
            : {
                "&:hover": {
                  bgcolor: "rgba(21,134,253,0.08)",
                },
              }),
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 36,
            color: isActive ? "primary.main" : "text.secondary",
            "& svg": {
              fontSize: "1.25rem",
            },
          }}
        >
          {item.icon && <item.icon />}
        </ListItemIcon>
        <ListItemText
          primary={item.title}
          primaryTypographyProps={{
            fontWeight: isActive ? 600 : 500,
            fontSize: { xs: "0.875rem", md: "0.95rem" },
            color: isActive ? "primary.main" : "text.secondary",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default memo(SidebarItem);
