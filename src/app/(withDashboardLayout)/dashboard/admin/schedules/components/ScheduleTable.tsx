"use client";
import {
  useDeleteScheduleMutation,
  useGetAllSchedulesQuery,
} from "@/redux/api/scheduleApi";
import { ISchedule } from "@/types";
import { formatDate } from "@/utils/formatDate";
import { formatTime } from "@/utils/formetTime";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { toast } from "sonner";

const ScheduleTable = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState(1);
  const limit = 5;
  query["page"] = page;
  query["limit"] = limit;

  const { data, isLoading } = useGetAllSchedulesQuery({
    ...query,
  });
  console.log(data, "data from schedule table");

  const meta = data?.meta;
  const pageCount = meta?.total ? Math.ceil(meta.total / limit) : 0;

  const [deleteSchedule] = useDeleteScheduleMutation();

  const handleDeleteSchedule = async (id: string) => {
    try {
      const res = await deleteSchedule(id).unwrap();
      if (res?.id) {
        toast.success("Schedule deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete the schedule", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Transform data with proper error handling
  const allSchedule =
    data?.schedules?.map((item: ISchedule, index: number) => ({
      sl: index + 1,
      id: item.id,
      startDate: item.startDate ? formatDate(item.startDate) : "N/A",
      endDate: item.endDate ? formatDate(item.endDate) : "N/A",
      startTime: item.startDate ? formatTime(item.startDate) : "N/A",
      endTime: item.endDate ? formatTime(item.endDate) : "N/A",
    })) || [];
  console.log(allSchedule, "all schedule");

  const columns: GridColDef[] = [
    { field: "sl", headerName: "SL" },
    { field: "startDate", headerName: "Start Date", flex: 1 },
    { field: "endDate", headerName: "End Date", flex: 1 },
    { field: "startTime", headerName: "Start Time", flex: 1 },
    { field: "endTime", headerName: "End Time", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => (
        <IconButton onClick={() => handleDeleteSchedule(row.id)}>
          <DeleteIcon sx={{ color: "red" }} />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={allSchedule}
        autoHeight
        columns={columns}
        hideFooter
        loading={isLoading}
        disableColumnMenu
        disableRowSelectionOnClick
        getRowId={(row) => row.id}
      />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handleChange}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
};

export default ScheduleTable;
