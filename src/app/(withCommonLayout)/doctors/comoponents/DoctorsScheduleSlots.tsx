"use client";

import { useCreateAppointmentMutation } from "@/redux/api/appoinmentApi";
import { useInitialPaymentMutation } from "@/redux/api/payment";
import { useGetAllSchedulesQuery } from "@/redux/api/scheduleApi";
import { formatDate } from "@/utils/formatDate";
import { getTimeIn12HourFormat } from "@/utils/getTimeIn12HoursForment";
import { Box, Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useRouter } from "next/navigation";
import { useState } from "react";
dayjs.extend(utc);

const DoctorScheduleSlots = ({ id }: { id: string }) => {
  const [scheduleId, setScheduleId] = useState("");
  const router = useRouter();
  const query: Record<string, any> = {};

  // Create proper DateTime strings for today
  const todayDate = new Date();
  const startOfDay = dayjs(todayDate)
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
    .toISOString();

  const endOfDay = dayjs(todayDate)
    .hour(23)
    .minute(59)
    .second(59)
    .millisecond(999)
    .toISOString();

  query["startDate"] = startOfDay;
  query["endDate"] = endOfDay;
  query["doctorId"] = id; // Add doctor ID to query

  const { data, isLoading } = useGetAllSchedulesQuery({ ...query });

  const schedules = data?.schedules;

  // Query for tomorrow's schedules
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);

  const tomorrowQuery: Record<string, any> = {
    startDate: dayjs(tomorrowDate)
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
      .toISOString(),
    endDate: dayjs(tomorrowDate)
      .hour(23)
      .minute(59)
      .second(59)
      .millisecond(999)
      .toISOString(),
    doctorId: id,
  };

  const { data: tomorrowData, isLoading: tomorrowLoading } =
    useGetAllSchedulesQuery(tomorrowQuery);
  const tomorrowSchedules = tomorrowData?.schedules;

  // Query for day after tomorrow's schedules
  const dayAfterTomorrowDate = new Date();
  dayAfterTomorrowDate.setDate(dayAfterTomorrowDate.getDate() + 2);

  const dayAfterTomorrowQuery: Record<string, any> = {
    startDate: dayjs(dayAfterTomorrowDate)
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
      .toISOString(),
    endDate: dayjs(dayAfterTomorrowDate)
      .hour(23)
      .minute(59)
      .second(59)
      .millisecond(999)
      .toISOString(),
    doctorId: id,
  };

  const { data: dayAfterTomorrowData, isLoading: dayAfterTomorrowLoading } =
    useGetAllSchedulesQuery(dayAfterTomorrowQuery);
  const dayAfterTomorrowSchedules = dayAfterTomorrowData?.schedules;

  const currentDate = new Date();
  const today = currentDate.toLocaleDateString("en-US", { weekday: "long" });
  const tomorrow = tomorrowDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const dayAfterTomorrow = dayAfterTomorrowDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  // For now, show all schedules as available (we'll need to filter by doctor later)
  const availableSlots = schedules;
  const availableTomorrowSlots = tomorrowSchedules;
  const availableDayAfterTomorrowSlots = dayAfterTomorrowSchedules;

  console.log("Today Available Slots:", availableSlots);
  console.log("Tomorrow Available Slots:", availableTomorrowSlots);
  console.log(
    "Day After Tomorrow Available Slots:",
    availableDayAfterTomorrowSlots
  );

  const [createAppointment] = useCreateAppointmentMutation();
  const [initialPayment] = useInitialPaymentMutation();
  const handleBookAppoinment = async () => {
    try {
      if (id && scheduleId) {
        const res = await createAppointment({
          doctorId: id,
          scheduleId,
        }).unwrap();
        console.log(res);
        if (res.id) {
          const response = await initialPayment(res.id).unwrap();
          if (response.paymentUrl && typeof response.paymentUrl === "string") {
            router.push(response.paymentUrl);
          } else {
            console.error("Invalid paymentUrl:", response.paymentUrl);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box mb={5}>
      <Box sx={{ bgcolor: "white", p: 3, mt: 1 }}>
        <Typography variant="h4" mb={3} color="primary.main">
          Availability
        </Typography>
        <Typography variant="h6" fontSize={16}>
          <b>Today: {formatDate(currentDate.toISOString()) + " " + today}</b>
        </Typography>
        <Box sx={{ borderBottom: "2px dashed #d0d0d0", mt: 2, mb: 3 }} />

        {isLoading ? (
          <Typography>Loading schedules...</Typography>
        ) : (
          <Stack direction="row" alignItems="center" flexWrap="wrap" gap={2}>
            {availableSlots && availableSlots.length > 0 ? (
              availableSlots.map((schedule: any) => {
                console.log("Processing today schedule:", schedule);

                const formattedTimeSlot = `${getTimeIn12HourFormat(
                  schedule?.startDate
                )} - ${getTimeIn12HourFormat(schedule?.endDate)}`;

                return (
                  <Button
                    key={schedule?.id}
                    color="primary"
                    onClick={() => setScheduleId(schedule?.id)}
                    variant={
                      schedule?.id === scheduleId ? "contained" : "outlined"
                    }
                  >
                    {formattedTimeSlot}
                  </Button>
                );
              })
            ) : (
              <Typography color="error.main">
                No Schedule is Available Today!
              </Typography>
            )}
          </Stack>
        )}

        {/* Tomorrow's Schedule Section */}
        <Typography variant="h6" fontSize={16} mt={5}>
          <b>
            Tomorrow: {formatDate(tomorrowDate.toISOString()) + " " + tomorrow}
          </b>
        </Typography>
        <Box sx={{ borderBottom: "2px dashed #d0d0d0", mt: 2, mb: 3 }} />

        {tomorrowLoading ? (
          <Typography>Loading tomorrow schedules...</Typography>
        ) : (
          <Stack direction="row" alignItems="center" flexWrap="wrap" gap={2}>
            {availableTomorrowSlots && availableTomorrowSlots.length > 0 ? (
              availableTomorrowSlots.map((schedule: any) => {
                console.log("Processing tomorrow schedule:", schedule);

                const formattedTimeSlot = `${getTimeIn12HourFormat(
                  schedule?.startDate
                )} - ${getTimeIn12HourFormat(schedule?.endDate)}`;

                return (
                  <Button
                    key={schedule?.id}
                    color="primary"
                    onClick={() => setScheduleId(schedule?.id)}
                    variant={
                      schedule?.id === scheduleId ? "contained" : "outlined"
                    }
                  >
                    {formattedTimeSlot}
                  </Button>
                );
              })
            ) : (
              <Typography color="error.main">
                No Schedule is Available Tomorrow!
              </Typography>
            )}
          </Stack>
        )}

        {/* Day After Tomorrow's Schedule Section */}
        <Typography variant="h6" fontSize={16} mt={5}>
          <b>
            Day After Tomorrow:{" "}
            {formatDate(dayAfterTomorrowDate.toISOString()) +
              " " +
              dayAfterTomorrow}
          </b>
        </Typography>
        <Box sx={{ borderBottom: "2px dashed #d0d0d0", mt: 2, mb: 3 }} />

        {dayAfterTomorrowLoading ? (
          <Typography>Loading day after tomorrow schedules...</Typography>
        ) : (
          <Stack direction="row" alignItems="center" flexWrap="wrap" gap={2}>
            {availableDayAfterTomorrowSlots &&
            availableDayAfterTomorrowSlots.length > 0 ? (
              availableDayAfterTomorrowSlots.map((schedule: any) => {
                console.log(
                  "Processing day after tomorrow schedule:",
                  schedule
                );

                const formattedTimeSlot = `${getTimeIn12HourFormat(
                  schedule?.startDate
                )} - ${getTimeIn12HourFormat(schedule?.endDate)}`;

                return (
                  <Button
                    key={schedule?.id}
                    color="primary"
                    onClick={() => setScheduleId(schedule?.id)}
                    variant={
                      schedule?.id === scheduleId ? "contained" : "outlined"
                    }
                  >
                    {formattedTimeSlot}
                  </Button>
                );
              })
            ) : (
              <Typography color="error.main">
                No Schedule is Available Day After Tomorrow!
              </Typography>
            )}
          </Stack>
        )}
      </Box>

      {scheduleId && (
        <Button
          onClick={handleBookAppoinment}
          sx={{ display: "block", mx: "auto", mt: 2 }}
          variant="contained"
          color="primary"
        >
          Book Appointment Now
        </Button>
      )}
    </Box>
  );
};

export default DoctorScheduleSlots;
