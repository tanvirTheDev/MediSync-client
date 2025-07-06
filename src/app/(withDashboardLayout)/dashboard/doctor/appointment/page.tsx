"use client";

import { useGetMyAppointmentsQuery } from "@/redux/api/appoinmentApi";
import { formatDate } from "@/utils/formatDate";
import { getTimeIn12HourFormat } from "@/utils/getTimeIn12HoursForment";
import VideocamIcon from "@mui/icons-material/Videocam";
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";

const PatientAppointmentsPage = () => {
  const { data, isLoading } = useGetMyAppointmentsQuery({});
  const appointments = data?.appointments;
  // const meta : TMeta = data?.meta;
  // console.log(appointments);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Patient Name",
      flex: 1,
      renderCell: ({ row }) => {
        return row?.patient?.name;
      },
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      flex: 1,
      renderCell: ({ row }) => {
        return row?.patient?.contactNumber;
      },
    },
    {
      field: "appointmentDate",
      headerName: "Appointment Date",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row }) => {
        return formatDate(row.schedule.startDate);
      },
    },
    {
      field: "appointmentTime",
      headerName: "Appointment Time",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row }) => {
        return getTimeIn12HourFormat(row?.schedule?.startDate);
      },
    },

    {
      field: "paymentStatus",
      headerName: "Payment Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Join",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Link href={`/video?videoCallingId=${row?.videoCallingId}`}>
            <IconButton>
              <VideocamIcon />
            </IconButton>
          </Link>
        );
      },
    },
  ];

  return (
    <Box>
      {!isLoading ? (
        <Box my={2}>
          <DataGrid
            rows={appointments ?? []}
            columns={columns}
            loading={isLoading}
          />
        </Box>
      ) : (
        <h1>Loading.....</h1>
      )}
    </Box>
  );
};

export default PatientAppointmentsPage;
