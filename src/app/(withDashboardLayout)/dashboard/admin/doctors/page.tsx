/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useDebounced } from "@/redux/hooks";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  alpha,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import DoctorModal from "./components/DoctorModal";
import DoctorsDataTable from "./components/DoctorsDataTable";

const AdminDoctorPage = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 500,
  });

  const query = useMemo(() => {
    const q: Record<string, any> = {};
    if (debouncedTerm) {
      q.searchTerm = debouncedTerm;
    }
    return q;
  }, [debouncedTerm]);

  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", md: "center" }}
        justifyContent="space-between"
      >
        <Box>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "1.75rem", md: "2rem" },
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: "text.primary",
            }}
          >
            Doctors Directory
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your doctors, update their profiles and keep their
            specialties up to date.
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            placeholder="Search doctors..."
            size="small"
            value={searchTerm}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(event.target.value)
            }
            sx={{
              minWidth: { xs: "100%", md: 240 },
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => setOpen(true)}
            sx={{
              textTransform: "none",
              borderRadius: 3,
              fontWeight: 600,
              px: 3,
              bgcolor: "primary.main",
            }}
          >
            New Doctor
          </Button>
        </Stack>
      </Stack>

      <Box
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: alpha("#1586FD", 0.03),
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Tip: Use the search field to find doctors by name, email or
          designation.
        </Typography>
      </Box>

      <DoctorModal open={open} setOpen={setOpen} />

      <DoctorsDataTable query={query} />
    </Box>
  );
};

export default AdminDoctorPage;
