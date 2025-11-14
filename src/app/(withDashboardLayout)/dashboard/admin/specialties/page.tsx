/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import SpecialistsModal from "@/app/(withDashboardLayout)/dashboard/admin/specialties/components/SpecialistsModal";
import {
  useDeleteSpecialistsMutation,
  useGetSpecialistsQuery,
} from "@/redux/api/specialistsApi";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import {
  alpha,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const AdminSpecialtiesPage = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: specialties = [], isLoading } = useGetSpecialistsQuery({});
  const [deleteSpecialist, { isLoading: deleting }] =
    useDeleteSpecialistsMutation();

  const filteredRows = useMemo(() => {
    if (!searchTerm) {
      return specialties;
    }
    return specialties.filter((item: any) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, specialties]);

  const handleDelete = async (id: string) => {
    try {
      await deleteSpecialist(id).unwrap();
      toast.success("Specialty deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete specialty");
    }
  };

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Specialty",
      flex: 1,
      minWidth: 220,
    },
    {
      field: "icon",
      headerName: "Icon",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            src={row.icon || "/default-file.svg"}
            width={26}
            height={26}
            alt={`${row.title} icon`}
            unoptimized
          />
        </Box>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => (
        <Tooltip title="Delete specialty">
          <IconButton
            color="error"
            onClick={() => handleDelete(row.id)}
            disabled={deleting}
          >
            <DeleteOutlineRoundedIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
        justifyContent="space-between"
      >
        <Box>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "1.75rem", md: "2rem" },
              fontWeight: 700,
              color: "text.primary",
              letterSpacing: "-0.01em",
            }}
          >
            Manage Specialties
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              maxWidth: 520,
            }}
          >
            Add, search, and maintain medical specialties to ensure patients can
            discover the right care categories quickly.
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            size="small"
            placeholder="Search specialties..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            sx={{
              minWidth: { xs: "100%", sm: 220 },
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
            }}
          >
            New Specialty
          </Button>
        </Stack>
      </Stack>

      <SpecialistsModal open={open} setOpen={setOpen} />

      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 18px 45px rgba(21,134,253,0.08)",
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={columns}
          loading={isLoading}
          disableRowSelectionOnClick
          autoHeight
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: alpha("#1586FD", 0.08),
              color: "text.primary",
              fontWeight: 600,
            },
            "& .MuiDataGrid-cell": {
              fontSize: "0.95rem",
            },
            "& .MuiDataGrid-row": {
              "&:hover": {
                bgcolor: alpha("#1586FD", 0.04),
              },
            },
            "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus":
              {
                outline: "none",
              },
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          pageSizeOptions={[8, 16, 32]}
          getRowId={(row) => row.id}
          slots={{
            noRowsOverlay: () => (
              <Stack
                height="100%"
                alignItems="center"
                justifyContent="center"
                spacing={1}
                sx={{ py: 6 }}
              >
                <Typography variant="h6" fontWeight={600}>
                  No specialties found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create a new specialty to get started.
                </Typography>
              </Stack>
            ),
          }}
        />
      </Paper>
    </Box>
  );
};

export default AdminSpecialtiesPage;
