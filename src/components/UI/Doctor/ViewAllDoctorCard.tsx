import { TDoctor } from "@/types";
import PhoneIcon from "@mui/icons-material/Phone";
import StarIcon from "@mui/icons-material/Star";
import { Box, Button, Chip, Rating, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const ViewAllDoctorCard = ({ doctor }: { doctor: TDoctor }) => {
  const placeholder =
    "https://static.vecteezy.com/system/resources/thumbnails/026/489/224/small_2x/muslim-malay-woman-doctor-in-hospital-with-copy-space-ai-generated-photo.jpg";

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 3,
        bgcolor: "white",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "box-shadow 0.2s ease",
        "&:hover": {
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Left Side: Image and Main Info */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          p: 3,
          gap: 2,
        }}
      >
        {/* Doctor Image */}
        <Box
          sx={{
            width: { xs: "100%", sm: "80%", md: "180px" },
            height: { xs: "220px", sm: "250px", md: "180px" },
            minWidth: { md: "180px" },
            bgcolor: "#f0f0f0",
            borderRadius: 1,
            overflow: "hidden",
            alignSelf: { xs: "center", md: "flex-start" },
            mx: { xs: "auto", md: 0 },
          }}
        >
          <Image
            src={doctor?.profilePhoto || placeholder}
            alt="doctor image"
            width={180}
            height={180}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        {/* Doctor Details */}
        <Stack gap={2}>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              fontSize: { xs: "1.1rem", md: "1.25rem" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {doctor?.name}
          </Typography>

          <Typography
            sx={{
              color: "secondary.main",
              fontSize: "0.95rem",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {doctor?.designation}
          </Typography>

          {/* Rating & Contact (Mobile) */}
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <StarIcon sx={{ color: "#FFA726", fontSize: "1.1rem" }} />
              <Typography fontWeight={600} fontSize="0.95rem">
                {doctor?.averageRating || 0}
              </Typography>
              <Typography fontSize="0.8rem" color="text.secondary">
                ({doctor?.review?.length || 0})
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={0.5}>
              <PhoneIcon sx={{ color: "primary.main", fontSize: "1.1rem" }} />
              <Typography fontSize="0.95rem" fontWeight={500}>
                {doctor?.contactNumber}
              </Typography>
            </Stack>
          </Stack>

          {/* Specialties */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: { xs: "center", md: "flex-start" },
              gap: 1,
            }}
          >
            {doctor?.doctorSpecialties?.length ? (
              doctor?.doctorSpecialties.map((specialty, idx) => (
                <Chip
                  key={specialty?.specialties?.title || idx}
                  label={specialty?.specialties?.title}
                  size="small"
                  color="primary"
                />
              ))
            ) : (
              <Typography>No specialties listed</Typography>
            )}
          </Box>

          {/* Working Place */}
          <Typography
            sx={{
              color: "text.secondary",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <b>Working at:</b> {doctor?.currentWorkingPlace}
          </Typography>

          {/* Fee */}
          <Typography
            color="primary.main"
            fontWeight={600}
            fontSize="1rem"
            textAlign={{ xs: "center", md: "left" }}
          >
            Consultation Fee: Taka {doctor?.apointmentFee}{" "}
            <span style={{ color: "#888", fontWeight: 400 }}>(incl. VAT)</span>
          </Typography>
          <Typography
            variant="caption"
            color="secondary.main"
            textAlign={{ xs: "center", md: "left" }}
            display="block"
          >
            Per consultation
          </Typography>

          {/* Button */}
          <Box textAlign="center" mt={1}>
            <Link
              href={`/checkout/${doctor?.id}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontSize: "1rem",
                  px: 4,
                  py: 1.2,
                  width: { xs: "100%", sm: "150px" },
                }}
              >
                Book Now
              </Button>
            </Link>
          </Box>
        </Stack>
      </Box>

      {/* Sidebar (Desktop Only) */}
      <Box
        sx={{
          bgcolor: "grey.50",
          p: 3,
          width: { xs: "100%", md: "300px" },
          display: { xs: "none", md: "block" },
        }}
      >
        <Stack gap={3}>
          <Box>
            <Typography color="secondary.main">Working in</Typography>
            <Typography
              fontWeight="600"
              mt={1}
              lineHeight={1.4}
              sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            >
              {doctor?.currentWorkingPlace}
            </Typography>
          </Box>

          <Box>
            <Typography color="secondary.main">Average Rating</Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}
            >
              <Rating
                value={doctor?.averageRating || 0}
                readOnly
                precision={0.1}
                size="small"
              />
              <Typography fontWeight={600}>
                {doctor?.averageRating || 0}
              </Typography>
              <Typography fontSize="0.75rem" color="text.secondary">
                ({doctor?.review?.length || 0})
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography color="secondary.main">Contact Number</Typography>
            <Typography fontWeight={600} mt={0.5}>
              {doctor?.contactNumber}
            </Typography>
          </Box>

          <Box
            sx={{
              borderBottom: "2px dashed",
              borderColor: "secondary.light",
              my: 2,
            }}
          />

          <Box>
            <Typography color="secondary.main" mb={1}>
              Total Experience
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {doctor?.experience}+ Years
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default ViewAllDoctorCard;
