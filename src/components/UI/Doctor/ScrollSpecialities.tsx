"use client";
import { useGetSpecialistsQuery } from "@/redux/api/specialistsApi";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useRouter } from "next/navigation";
import * as React from "react";

const ScrollSpecialities = ({ specialities }: { specialities: string }) => {
  const router = useRouter();
  const { data } = useGetSpecialistsQuery(undefined);

  const [value, setValue] = React.useState<string>(specialities || "");

  // Update value when data is loaded
  React.useEffect(() => {
    if (data && data.length > 0 && !value) {
      setValue(data[0].title);
    }
  }, [data, value]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push(`/doctors?specialties=${newValue}`);
    console.log(newValue);
  };
  return (
    <Box sx={{ maxWidth: "100%", bgcolor: "background.paper" }}>
      {data && data.length > 0 && value && (
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {data.map((speciality) => (
            <Tab
              label={speciality.title}
              value={speciality.title}
              key={speciality.id}
            />
          ))}
        </Tabs>
      )}
    </Box>
  );
};

export default ScrollSpecialities;
