import PHDatePicker from "@/components/Form/PHDatePicker";
import PHForm from "@/components/Form/PHForm";
import PHTimePicker from "@/components/Form/PHTimePickert";
import PHModal from "@/components/Shared/PHModal/PHModal";
import { useCreateScheduleMutation } from "@/redux/api/scheduleApi";
import { TProps } from "@/types";
import { formatDate } from "@/utils/formatDate";
import { formatTime } from "@/utils/formetTime";

import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const ScheduleModal = ({ open, setOpen }: TProps) => {
  const [createSchedule] = useCreateScheduleMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    // console.log(values);
    values.startDate = formatDate(values.startDate);
    values.endDate = formatDate(values.endDate);
    values.startTime = formatTime(values.startTime);
    values.endTime = formatTime(values.endTime);
    console.log("Submitting values:", values);
    try {
      const res = await createSchedule(values).unwrap();
      console.log("API Response:", res);

      // Check if response is an array with data (successful creation)
      if (Array.isArray(res) && res.length > 0) {
        toast.success("Schedules created successfully!");
        setOpen(false);
      } else if (res && (res.id || res.data?.id)) {
        toast.success("Schedules created successfully!");
        setOpen(false);
      } else {
        console.log("Empty response - schedule creation may have failed:", res);
        toast.error(
          "Failed to create schedules. Please check your input and try again."
        );
      }
    } catch (err: any) {
      console.error("Error creating schedule:", err);
      toast.error(err?.data?.message || "Failed to create schedule");
    }
  };

  return (
    <PHModal open={open} setOpen={setOpen} title="Create Schedule">
      <PHForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2} sx={{ width: "400px" }}>
          <Grid item md={12}>
            <PHDatePicker name="startDate" label="Start Date" />
          </Grid>
          <Grid item md={12}>
            <PHDatePicker name="endDate" label="End Date" />
          </Grid>
          <Grid item md={6}>
            <PHTimePicker name="startTime" label="Start Time" />
          </Grid>
          <Grid item md={6}>
            <PHTimePicker name="endTime" label="End Time" />
          </Grid>
        </Grid>
        <Button type="submit" sx={{ mt: 1 }}>
          Create
        </Button>
      </PHForm>
    </PHModal>
  );
};

export default ScheduleModal;
