import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import DoctorsScheduleSlots from "../comoponents/DoctorsScheduleSlots";

const InfoBoxStyles = {
  background:
    "linear-gradient(to bottom, rgba(21,134,253,0.3), rgba(255,255,255,1) 100%)",
  width: "100%",
  p: 3,
  "& h6": {
    color: "primary.main",
  },
  "& p": {
    color: "secondary.main",
  },
};

const Page = async ({ params }: any) => {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/doctor/${id}`
  );
  const { data: doctor } = await res.json();

  const specialties = doctor.doctorSpecialties.map(
    (ds: any) => ds.specialties.title
  );
  const photo =
    "https://static.vecteezy.com/system/resources/thumbnails/026/489/224/small_2x/muslim-malay-woman-doctor-in-hospital-with-copy-space-ai-generated-photo.jpg";
  return (
    <Container>
      <Box my={5}>
        <Typography variant="h4" fontWeight={700} textAlign="center">
          Doctor&apos;s Profile Details
        </Typography>
        <Typography
          textAlign="center"
          mt={2}
          sx={{ width: "70%", margin: "10px auto" }}
          variant="h6"
        >
          Compassionate and dedicated doctor committed to delivering
          high-quality care. Proficient in diagnosis, treatment, and advocating
          for comprehensive well-being. Prioritizing patient-centered approaches
          for optimal health outcomes.
        </Typography>
      </Box>

      <Box>
        <Box sx={{ my: 10, p: 3, bgcolor: "#f8f8f8" }}>
          <Stack sx={{ bgcolor: "white", p: 3 }}>
            <Stack direction="row" gap={3}>
              <Box sx={{ width: 281, height: 281, bgcolor: "#808080" }}>
                <Image
                  src={doctor?.profilePhoto || photo}
                  alt="doctor image"
                  width={281}
                  height={281}
                  priority
                  style={{
                    height: "281px",
                  }}
                />
              </Box>
              <Stack flex={1}>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {doctor?.name}
                  </Typography>
                  <Typography sx={{ my: "2px", color: "secondary.main" }}>
                    {doctor?.designation}
                  </Typography>
                  <Stack direction="row" alignItems="center" gap={2} mt={1}>
                    <Typography
                      noWrap
                      sx={{
                        maxWidth: "45ch",
                      }}
                    >
                      Specialties in
                    </Typography>
                    <Box>
                      {specialties.map((sp: any) => (
                        <Chip
                          key={sp}
                          label={sp}
                          color="primary"
                          sx={{ mr: 1 }}
                        />
                      ))}
                    </Box>
                  </Stack>
                </Box>

                <Box>
                  <Typography sx={{ my: "2px" }}>Working at</Typography>
                  <Typography>{doctor?.currentWorkingPlace}</Typography>
                </Box>

                <Box>
                  <Stack direction="row">
                    <Typography
                      fontWeight={"bold"}
                      // fontSize={20}
                      sx={{
                        color: "#141414",
                      }}
                    >
                      Consultation Fee
                    </Typography>
                    <Stack
                      sx={{
                        ml: 2,
                      }}
                    >
                      <Typography>
                        Taka : {doctor?.apointmentFee} (incl. Vat)
                      </Typography>
                      <Typography>Per consultation</Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              gap={3}
              justifyContent={"space-between"}
              sx={{
                my: 4,
              }}
            >
              <Box sx={InfoBoxStyles}>
                <Typography variant="h6">Total Experience</Typography>
                <Typography>{doctor?.experience}+ Years</Typography>
              </Box>
              <Box sx={InfoBoxStyles}>
                <Typography variant="h6">Qualification</Typography>
                <Typography>{doctor?.qualification}</Typography>
              </Box>
              <Box sx={InfoBoxStyles}>
                <Typography variant="h6">Average Rating</Typography>
                <Typography>{doctor?.averageRating}</Typography>
              </Box>
              <Box sx={InfoBoxStyles}>
                <Typography variant="h6">Contact Number</Typography>
                <Typography>{doctor?.contactNumber}</Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Box>
      <DoctorsScheduleSlots id={doctor.id} />
    </Container>
  );
};

export default Page;
