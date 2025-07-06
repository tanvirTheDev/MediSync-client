import { TDoctor } from "@/types";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const DoctorCard = ({ doctor }: { doctor: TDoctor }) => {
  const placeholder =
    "https://static.vecteezy.com/system/resources/thumbnails/026/489/224/small_2x/muslim-malay-woman-doctor-in-hospital-with-copy-space-ai-generated-photo.jpg";

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      gap={2}
      sx={{
        bgcolor: "white",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 1,
        "&:hover": {
          boxShadow: 3,
          transition: "box-shadow 0.3s ease-in-out",
        },
      }}
    >
      {/* Main Doctor Info Section */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        flex={1}
        gap={3}
        sx={{ p: 3 }}
      >
        {/* Doctor Image */}
        <Box
          sx={{
            width: { xs: "100%", sm: 190 },
            height: { xs: 200, sm: 190 },
            bgcolor: "#f5f5f5",
            borderRadius: 1,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <Image
            src={doctor?.profilePhoto ? doctor.profilePhoto : placeholder}
            alt="doctor image"
            width={190}
            height={190}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Doctor Details */}
        <Stack flex={1} justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ fontSize: { xs: "1.1rem", md: "1.25rem" } }}
            >
              {doctor?.name}
            </Typography>
            <Typography
              sx={{
                my: "2px",
                color: "secondary.main",
                fontSize: { xs: "0.875rem", md: "1rem" },
              }}
            >
              {doctor?.designation}
            </Typography>
            <Typography
              sx={{
                color: "secondary.main",
                fontSize: { xs: "0.8rem", md: "0.875rem" },
                lineHeight: 1.4,
              }}
            >
              {doctor?.doctorSpecialties?.length
                ? "Specialties in" +
                  " " +
                  doctor?.doctorSpecialties?.map(
                    (specialty) => specialty?.specialties?.title
                  )
                : ""}
            </Typography>
          </Box>

          <Box
            sx={{
              borderBottom: "2px dashed",
              borderColor: "secondary.light",
              my: 2,
            }}
          />

          {/* Price and Book Button */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", sm: "center" }}
            gap={2}
          >
            <Box>
              <Stack direction="row" alignItems="center" flexWrap="wrap">
                <Typography
                  variant="h6"
                  sx={{
                    color: "primary.main",
                    fontWeight: "600",
                    fontSize: { xs: "1rem", md: "1.25rem" },
                  }}
                >
                  Taka : {doctor?.apointmentFee}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: "inline",
                    ml: 1,
                    color: "secondary.main",
                    fontSize: { xs: "0.7rem", md: "0.75rem" },
                  }}
                >
                  (incl. Vat)
                </Typography>
              </Stack>
              <Typography
                variant="caption"
                color="secondary.main"
                sx={{ fontSize: { xs: "0.7rem", md: "0.75rem" } }}
              >
                Per consultation
              </Typography>
            </Box>
            <Box>
              <Link href={`/checkout/${doctor?.id}`}>
                <Button
                  variant="contained"
                  sx={{
                    width: { xs: "100%", sm: "auto" },
                    minWidth: { xs: "auto", sm: 120 },
                  }}
                >
                  Book Now
                </Button>
              </Link>
            </Box>
          </Stack>
        </Stack>
      </Stack>

      {/* Additional Info Section */}
      <Stack
        sx={{
          p: 3,
          bgcolor: "grey.50",
          width: { xs: "100%", md: "300px" },
          minHeight: { xs: "auto", md: 235 },
        }}
      >
        <Box flex={1}>
          <Typography
            color="secondary.main"
            sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
          >
            Working in
          </Typography>
          <Typography
            sx={{
              fontWeight: "600",
              mt: "3px",
              fontSize: { xs: "0.9rem", md: "1rem" },
              lineHeight: 1.4,
            }}
          >
            {doctor?.currentWorkingPlace}
          </Typography>
        </Box>

        <Box
          sx={{
            borderBottom: "2px dashed",
            borderColor: "secondary.light",
            my: "22px",
          }}
        />

        <Stack
          direction={{ xs: "column", sm: "row", md: "column" }}
          justifyContent="space-between"
          gap={2}
        >
          <Box>
            <Typography
              color="secondary.main"
              sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
            >
              Total Experience
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "600",
                fontSize: { xs: "1.1rem", md: "1.25rem" },
              }}
            >
              {doctor?.experience}+ Years
            </Typography>
          </Box>
          <Box>
            <Button
              component={Link}
              href={`/doctors/${doctor?.id}`}
              variant="outlined"
              sx={{
                width: { xs: "100%", sm: "auto" },
                minWidth: { xs: "auto", sm: 120 },
              }}
            >
              View Details
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DoctorCard;
