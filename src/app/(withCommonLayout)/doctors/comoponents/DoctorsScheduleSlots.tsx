"use client";

import { useCreateAppointmentMutation } from "@/redux/api/appoinmentApi";
import { useInitialPaymentMutation } from "@/redux/api/payment";
import { useGetAllSchedulesQuery } from "@/redux/api/scheduleApi";
import { formatDate } from "@/utils/formatDate";
import { getTimeIn12HourFormat } from "@/utils/getTimeIn12HoursForment";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
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

  const [createAppointment] = useCreateAppointmentMutation();
  const [initialPayment] = useInitialPaymentMutation();
  const handleBookAppoinment = async () => {
    try {
      if (id && scheduleId) {
        const res = await createAppointment({
          doctorId: id,
          scheduleId,
        }).unwrap();
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

  const renderScheduleSection = (
    title: string,
    date: string,
    schedules: any[],
    loading: boolean
  ) => {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          boxShadow:
            "0 4px 20px rgba(21,134,253,0.08), 0 2px 8px rgba(8,17,52,0.04)",
          mb: 3,
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  color: "text.primary",
                  mb: 0.5,
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.875rem", md: "0.95rem" },
                }}
              >
                {date}
              </Typography>
            </Box>

            <Divider />

            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: 4,
                }}
              >
                <CircularProgress size={32} />
              </Box>
            ) : schedules && schedules.length > 0 ? (
              <Stack
                direction="row"
                alignItems="center"
                flexWrap="wrap"
                gap={1.5}
              >
                {schedules.map((schedule: any) => {
                  const formattedTimeSlot = `${getTimeIn12HourFormat(
                    schedule?.startDate
                  )} - ${getTimeIn12HourFormat(schedule?.endDate)}`;

                  const isSelected = schedule?.id === scheduleId;

                  return (
                    <Button
                      key={schedule?.id}
                      onClick={() => setScheduleId(schedule?.id)}
                      variant={isSelected ? "contained" : "outlined"}
                      color="primary"
                      sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        minWidth: { xs: "100px", sm: "120px" },
                        fontSize: { xs: "0.875rem", md: "0.95rem" },
                        fontWeight: isSelected ? 600 : 500,
                        boxShadow: isSelected
                          ? "0 4px 12px rgba(21,134,253,0.3)"
                          : "none",
                        "&:hover": {
                          boxShadow: isSelected
                            ? "0 6px 16px rgba(21,134,253,0.4)"
                            : "0 2px 8px rgba(21,134,253,0.2)",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      {formattedTimeSlot}
                    </Button>
                  );
                })}
              </Stack>
            ) : (
              <Box
                sx={{
                  textAlign: "center",
                  py: 3,
                  px: 2,
                  bgcolor: "action.hover",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "0.875rem", md: "0.95rem" },
                  }}
                >
                  No available slots for this day
                </Typography>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ mb: { xs: 4, md: 6 } }}>
      <Stack spacing={3}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.5rem", md: "2rem" },
            color: "text.primary",
            mb: 1,
          }}
        >
          Select Your Preferred Time
        </Typography>

        {renderScheduleSection(
          "Today",
          `${formatDate(currentDate.toISOString())} · ${today}`,
          availableSlots || [],
          isLoading
        )}

        {renderScheduleSection(
          "Tomorrow",
          `${formatDate(tomorrowDate.toISOString())} · ${tomorrow}`,
          availableTomorrowSlots || [],
          tomorrowLoading
        )}

        {renderScheduleSection(
          "Day After Tomorrow",
          `${formatDate(
            dayAfterTomorrowDate.toISOString()
          )} · ${dayAfterTomorrow}`,
          availableDayAfterTomorrowSlots || [],
          dayAfterTomorrowLoading
        )}
      </Stack>

      {scheduleId && (
        <Box
          sx={{
            position: "sticky",
            bottom: { xs: 16, md: 24 },
            mt: 4,
            zIndex: 10,
          }}
        >
          <Card
            elevation={8}
            sx={{
              borderRadius: 3,
              background:
                "linear-gradient(135deg, rgba(21,134,253,0.95) 0%, rgba(21,134,253,0.98) 100%)",
              border: "none",
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "white",
                      fontWeight: 600,
                      fontSize: { xs: "1rem", md: "1.125rem" },
                      mb: 0.5,
                    }}
                  >
                    Ready to book?
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255,255,255,0.9)",
                      fontSize: { xs: "0.875rem", md: "0.95rem" },
                    }}
                  >
                    Confirm your appointment slot
                  </Typography>
                </Box>
                <Button
                  onClick={handleBookAppoinment}
                  variant="contained"
                  sx={{
                    bgcolor: "white",
                    color: "primary.main",
                    textTransform: "none",
                    borderRadius: 2,
                    px: { xs: 3, md: 4 },
                    py: { xs: 1.25, md: 1.5 },
                    fontSize: { xs: "0.95rem", md: "1rem" },
                    fontWeight: 600,
                    minWidth: { xs: "100%", sm: "200px" },
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.95)",
                    },
                  }}
                >
                  Book Appointment Now
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default DoctorScheduleSlots;
