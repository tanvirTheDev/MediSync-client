import { Box, Skeleton, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";

const DoctorUpdateSkeleton = () => {
  return (
    <Box
      sx={{
        width: "100%",
        p: { xs: 2, md: 3 },
        bgcolor: "white",
        borderRadius: 4,
        boxShadow: "0 18px 45px rgba(21,134,253,0.08)",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack spacing={4}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
        >
          <Skeleton variant="circular" width={120} height={120} />
          <Skeleton variant="rounded" width={200} height={44} />
        </Stack>

        {[...Array(3)].map((_, sectionIndex) => (
          <Grid container spacing={2} key={`section-${sectionIndex}`}>
            {[...Array(3)].map((__, fieldIndex) => (
              <Grid
                item
                xs={12}
                md={4}
                key={`field-${sectionIndex}-${fieldIndex}`}
              >
                <Skeleton variant="rounded" height={60} />
              </Grid>
            ))}
          </Grid>
        ))}

        <Grid container spacing={2}>
          {[...Array(2)].map((_, idx) => (
            <Grid item xs={12} md={4} key={`extra-${idx}`}>
              <Skeleton variant="rounded" height={60} />
            </Grid>
          ))}
          <Grid item xs={12} md={4}>
            <Skeleton variant="rounded" height={120} />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Skeleton variant="rounded" width={160} height={46} />
        </Box>
      </Stack>
    </Box>
  );
};

export default DoctorUpdateSkeleton;
