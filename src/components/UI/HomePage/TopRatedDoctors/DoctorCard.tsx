import { TDoctor } from "@/types";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const DoctorCard = ({ doctor }: { doctor: TDoctor }) => {
  const placeholder =
    "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?q=80&w=600&auto=format&fit=crop";
  const specialities =
    doctor?.doctorSpecialities
      ?.map((speciality) => speciality?.specialities?.title)
      .filter(Boolean)
      .join(", ") ?? "";

  console.log(specialities);

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        boxShadow:
          "0 12px 35px rgba(21,134,253,0.08), 0 4px 18px rgba(8,17,52,0.04)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow:
            "0 18px 40px rgba(21,134,253,0.14), 0 6px 22px rgba(8,17,52,0.06)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          pt: "70%",
          overflow: "hidden",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <Image
          src={doctor?.profilePhoto || placeholder}
          alt={doctor?.name || "Doctor profile"}
          fill
          sizes="(max-width: 600px) 100vw, 320px"
          style={{ objectFit: "cover" }}
        />
      </Box>

      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack spacing={1.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="start"
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                  letterSpacing: "-0.01em",
                }}
              >
                {doctor?.name}
              </Typography>
              <Typography
                sx={{
                  color: "secondary.main",
                  fontSize: { xs: "0.85rem", md: "0.95rem" },
                  mt: 0.5,
                }}
              >
                {doctor?.designation}
              </Typography>
            </Box>
            <Chip
              label={`${doctor?.experience ?? 0}+ yrs`}
              size="small"
              sx={{ borderRadius: 1.5, fontWeight: 600 }}
              color="primary"
              variant="outlined"
            />
          </Stack>

          {specialities && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.6 }}
            >
              Specialities: {specialities}
            </Typography>
          )}

          <Divider />

          <Stack spacing={1}>
            {doctor?.currentWorkingPlace && (
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Working at
                </Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  {doctor.currentWorkingPlace}
                </Typography>
              </Box>
            )}
            <Typography variant="body2" color="text.secondary">
              Patients trust Dr. {doctor?.name?.split(" ")[0]} for comprehensive
              care and collaborative treatment plans tailored to every case.
            </Typography>
          </Stack>
        </Stack>
      </CardContent>

      <CardActions
        sx={{
          px: { xs: 2.5, md: 3 },
          pb: { xs: 2.5, md: 3 },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%" }}
          spacing={2}
        >
          <Stack spacing={0.5}>
            <Typography
              sx={{
                color: "primary.main",
                fontWeight: 700,
                fontSize: { xs: "1rem", md: "1.15rem" },
              }}
            >
              ৳ {doctor?.appointmentFee}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Per consultation · incl. VAT
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Link href={`/doctors/${doctor?.id}`}>
              <Button variant="outlined" sx={{ textTransform: "none" }}>
                View Profile
              </Button>
            </Link>
            <Link href={`/checkout/${doctor?.id}`}>
              <Button variant="contained" sx={{ textTransform: "none" }}>
                Book Now
              </Button>
            </Link>
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default DoctorCard;
