/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  useDeleteDoctorMutation,
  useGetAllDoctorsQuery,
} from "@/redux/api/doctorsApi";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import {
  alpha,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const DoctorsDataTable = ({ query }: Record<string, any>) => {
  const { data, isLoading } = useGetAllDoctorsQuery({ ...query });
  const rows = data?.doctors || [];

  const [deleteDoctor, { isLoading: deleting }] = useDeleteDoctorMutation();
  const [open, setOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);

  const columns: GridColDef<any>[] = useMemo(
    () => [
      {
        field: "name",
        headerName: "Doctor",
        flex: 1.2,
        minWidth: 220,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1.2,
        minWidth: 220,
      },
      {
        field: "contactNumber",
        headerName: "Contact Number",
        flex: 1,
        minWidth: 160,
      },
      {
        field: "gender",
        headerName: "Gender",
        width: 120,
      },
      {
        field: "appointmentFee",
        headerName: "Appointment Fee",
        width: 160,
        renderCell: ({ row }) => (
          <Typography variant="body2">
            ৳{row.appointmentFee ?? row.apointmentFee ?? 0}
          </Typography>
        ),
      },
      {
        field: "action",
        headerName: "Actions",
        width: 160,
        headerAlign: "center",
        align: "center",
        sortable: false,
        filterable: false,
        renderCell: ({ row }) => (
          <Stack direction="row" spacing={1}>
            <TooltipAction
              title="Edit doctor"
              component={Link}
              href={`/dashboard/admin/doctors/edit/${row.id}`}
            >
              <EditOutlinedIcon fontSize="small" />
            </TooltipAction>
            <TooltipAction
              title="Delete doctor"
              onClick={() => {
                setSelectedDoctorId(row.id);
                setOpen(true);
              }}
            >
              <DeleteRoundedIcon color="error" fontSize="small" />
            </TooltipAction>
          </Stack>
        ),
      },
    ],
    []
  );

  const handleDelete = async () => {
    if (!selectedDoctorId) return;
    try {
      const res: any = await deleteDoctor(selectedDoctorId).unwrap();
      if (res?.id || res?.data?.id) {
        toast.success("Doctor deleted successfully");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete doctor");
    } finally {
      setOpen(false);
      setSelectedDoctorId(null);
    }
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="delete-doctor-dialog"
      >
        <DialogTitle
          id="delete-doctor-dialog"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <WarningAmberRoundedIcon color="warning" />
          Confirm Deletion
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to delete this doctor&apos;s profile? This
            action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            color="primary"
            variant="outlined"
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            disabled={deleting}
            sx={{ textTransform: "none" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <PaperTableWrapper>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={isLoading}
          disableRowSelectionOnClick
          autoHeight
          getRowId={(row) => row.id}
          pageSizeOptions={[8, 16, 32]}
          initialState={{
            pagination: { paginationModel: { pageSize: 8 } },
          }}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: alpha("#1586FD", 0.08),
              color: "text.primary",
              fontWeight: 600,
            },
            "& .MuiDataGrid-cell": { fontSize: "0.95rem" },
            "& .MuiDataGrid-row:hover": {
              bgcolor: alpha("#1586FD", 0.05),
            },
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
              outline: "none",
            },
          }}
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
                  No doctors found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search or add a new doctor.
                </Typography>
              </Stack>
            ),
          }}
        />
      </PaperTableWrapper>
    </Box>
  );
};

const TooltipAction = ({
  title,
  children,
  ...rest
}: {
  title: string;
  children: React.ReactNode;
} & Record<string, any>) => (
  <Tooltip title={title}>
    <IconButton
      size="small"
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        "&:hover": {
          borderColor: "primary.main",
          bgcolor: alpha("#1586FD", 0.08),
        },
      }}
      {...rest}
    >
      {children}
    </IconButton>
  </Tooltip>
);

const PaperTableWrapper = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      mt: 3,
      borderRadius: 4,
      border: "1px solid",
      borderColor: "divider",
      boxShadow: "0 18px 45px rgba(21,134,253,0.08)",
      overflow: "hidden",
    }}
  >
    {children}
  </Box>
);

export default DoctorsDataTable;
