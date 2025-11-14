"use client";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: <PhoneIcon sx={{ fontSize: 32 }} />,
      title: "Phone",
      content: "+880 1234 567890",
      description: "Call us anytime",
    },
    {
      icon: <EmailIcon sx={{ fontSize: 32 }} />,
      title: "Email",
      content: "support@medisync.com",
      description: "Send us an email",
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 32 }} />,
      title: "Address",
      content: "123 Healthcare Street, Dhaka, Bangladesh",
      description: "Visit our office",
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 32 }} />,
      title: "Working Hours",
      content: "Mon - Sat: 9:00 AM - 6:00 PM",
      description: "We're here to help",
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8, lg: 10 },
        background:
          "linear-gradient(180deg, rgba(21,134,253,0.04) 0%, rgba(255,255,255,1) 100%)",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={{ xs: 4, md: 6 }}>
          {/* Header Section */}
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Chip
              label="Get In Touch"
              color="primary"
              variant="outlined"
              sx={{ borderRadius: "999px", fontWeight: 600 }}
            />
            <Typography
              component="h1"
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2.5rem",
                  md: "3rem",
                  lg: "3.5rem",
                },
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "text.primary",
              }}
            >
              Contact Us
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.95rem", md: "1.05rem", lg: "1.15rem" },
                color: "text.secondary",
                maxWidth: "700px",
                lineHeight: 1.7,
              }}
            >
              Have a question or need assistance? We're here to help. Reach out
              to us through any of the channels below, and we'll get back to you
              as soon as possible.
            </Typography>
          </Stack>

          {/* Contact Information Cards */}
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {contactInfo.map((info, index) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow:
                      "0 4px 20px rgba(21,134,253,0.08), 0 2px 8px rgba(8,17,52,0.04)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow:
                        "0 8px 30px rgba(21,134,253,0.15), 0 4px 12px rgba(8,17,52,0.08)",
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: { xs: 2.5, md: 3 },
                      textAlign: "center",
                    }}
                  >
                    <Stack spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "primary.main",
                        }}
                      >
                        {info.icon}
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            fontSize: { xs: "1rem", md: "1.125rem" },
                            mb: 0.5,
                          }}
                        >
                          {info.title}
                        </Typography>
                        <Typography
                          sx={{
                            color: "primary.main",
                            fontWeight: 600,
                            fontSize: { xs: "0.95rem", md: "1rem" },
                            mb: 0.5,
                          }}
                        >
                          {info.content}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            fontSize: { xs: "0.875rem", md: "0.95rem" },
                          }}
                        >
                          {info.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Contact Form Section */}
          <Grid container spacing={{ xs: 3, md: 6 }}>
            <Grid item xs={12} md={7}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow:
                    "0 12px 35px rgba(21,134,253,0.08), 0 4px 18px rgba(8,17,52,0.04)",
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4, lg: 5 } }}>
                  <Stack spacing={3}>
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: "1.5rem", md: "1.75rem" },
                          mb: 1,
                        }}
                      >
                        Send us a Message
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontSize: { xs: "0.875rem", md: "0.95rem" },
                        }}
                      >
                        Fill out the form below and we'll get back to you within
                        24 hours.
                      </Typography>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit}>
                      <Stack spacing={2.5}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Your Name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                },
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Email Address"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                },
                              }}
                            />
                          </Grid>
                        </Grid>

                        <TextField
                          fullWidth
                          label="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        />

                        <TextField
                          fullWidth
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        />

                        <TextField
                          fullWidth
                          label="Message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          multiline
                          rows={5}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        />

                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            py: { xs: 1.25, md: 1.5 },
                            fontSize: { xs: "0.95rem", md: "1rem" },
                            fontWeight: 600,
                            mt: 1,
                            boxShadow: "0 4px 12px rgba(21,134,253,0.3)",
                            "&:hover": {
                              boxShadow: "0 6px 16px rgba(21,134,253,0.4)",
                            },
                          }}
                        >
                          Send Message
                        </Button>
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Additional Info Section */}
            <Grid item xs={12} md={5}>
              <Stack spacing={3}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow:
                      "0 12px 35px rgba(21,134,253,0.08), 0 4px 18px rgba(8,17,52,0.04)",
                    background:
                      "linear-gradient(135deg, rgba(21,134,253,0.05) 0%, rgba(21,134,253,0.02) 100%)",
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Stack spacing={2}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: "1.25rem", md: "1.5rem" },
                          color: "primary.main",
                        }}
                      >
                        Why Contact Us?
                      </Typography>
                      <Stack spacing={1.5}>
                        {[
                          "Get answers to your questions",
                          "Report technical issues",
                          "Provide feedback",
                          "Request feature suggestions",
                          "General inquiries",
                        ].map((item, index) => (
                          <Stack
                            key={index}
                            direction="row"
                            spacing={1.5}
                            alignItems="flex-start"
                          >
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                bgcolor: "primary.main",
                                mt: 1,
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                color: "text.secondary",
                                fontSize: { xs: "0.875rem", md: "0.95rem" },
                                lineHeight: 1.7,
                              }}
                            >
                              {item}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>

                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow:
                      "0 12px 35px rgba(21,134,253,0.08), 0 4px 18px rgba(8,17,52,0.04)",
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Stack spacing={2}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: "1.25rem", md: "1.5rem" },
                        }}
                      >
                        Response Time
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontSize: { xs: "0.875rem", md: "0.95rem" },
                          lineHeight: 1.7,
                        }}
                      >
                        We typically respond to all inquiries within 24 hours
                        during business days. For urgent matters, please call us
                        directly.
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default ContactUs;
