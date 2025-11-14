import { logoutUser } from "@/services/actions/logoutUser";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

interface AccountMenuProps {
  profilePhoto?: string;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ profilePhoto }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logoutUser(router as any);
  };

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        size="large"
        sx={{
          p: 0.5,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          "&:hover": {
            borderColor: "primary.main",
          },
        }}
      >
        <Avatar
          src={profilePhoto || "/default-profile.png"}
          alt="Profile photo"
          sx={{ width: 40, height: 40 }}
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 220,
            borderRadius: 3,
            boxShadow: "0 12px 30px rgba(21,134,253,0.12)",
            "& .MuiMenuItem-root": {
              borderRadius: 2,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your profile settings
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonOutlineRoundedIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SettingsRoundedIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" color="error" />
          </ListItemIcon>
          <Typography color="error.main" fontWeight={600}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AccountMenu;
