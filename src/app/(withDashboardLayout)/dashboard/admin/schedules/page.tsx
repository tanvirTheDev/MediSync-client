"use client";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import ScheduleModal from "./components/ScheduleModal";

import { useGetAllSchedulesQuery } from "@/redux/api/scheduleApi";
import { ISchedule } from "@/types";
import { formatDate } from "@/utils/formatDate";
import dayjs from "dayjs";
import ScheduleTable from "./components/ScheduleTable";

const SchedulesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [, setAllSchedule] = useState<any>([]);
  const { data } = useGetAllSchedulesQuery({});

  const schedules = data?.schedules;

  console.log(schedules);

  useEffect(() => {
    const updateData = schedules?.map((schedule: ISchedule, index: number) => {
      return {
        sl: index + 1,
        id: schedule?.id,
        startDate: formatDate(schedule.startDate),
        endDate: formatDate(schedule.endDate),
        startTime: dayjs(schedule?.startDate).format("hh:mm a"),
        endTime: dayjs(schedule?.endDate).format("hh:mm a"),
      };
    });
    setAllSchedule(updateData);
  }, [schedules]);

  return (
    <Box>
      <Button onClick={() => setIsModalOpen(true)}>Create Schedule</Button>
      <ScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />

      <Box my={2}>
        <ScheduleTable />
      </Box>
    </Box>
  );
};

export default SchedulesPage;
