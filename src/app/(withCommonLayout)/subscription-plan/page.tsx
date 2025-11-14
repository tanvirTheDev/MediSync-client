import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

const SubscriptionPlanPage = () => {
  const plans = [
    {
      id: "basic",
      name: "Basic Plan",
      price: 299,
      period: "month",
      description:
        "Perfect for individuals seeking essential healthcare services",
      popular: false,
      features: [
        "Unlimited doctor consultations",
        "Access to all specialties",
        "24/7 customer support",
        "Basic health reports",
        "Appointment reminders",
        "Prescription management",
      ],
      buttonText: "Get Started",
      buttonVariant: "outlined" as const,
    },
    {
      id: "premium",
      name: "Premium Plan",
      price: 599,
      period: "month",
      description: "Comprehensive healthcare coverage for you and your family",
      popular: true,
      features: [
        "Everything in Basic Plan",
        "Priority appointment booking",
        "Video consultations included",
        "Advanced health analytics",
        "Family member coverage (up to 4)",
        "Health checkup reminders",
        "Discount on diagnostics",
        "Dedicated care coordinator",
      ],
      buttonText: "Choose Premium",
      buttonVariant: "contained" as const,
    },
    {
      id: "enterprise",
      name: "Enterprise Plan",
      price: 1299,
      period: "month",
      description:
        "Complete healthcare solution for organizations and large families",
      popular: false,
      features: [
        "Everything in Premium Plan",
        "Unlimited family members",
        "Corporate health programs",
        "Custom health reports",
        "API integration",
        "Dedicated account manager",
        "Bulk appointment scheduling",
        "Employee wellness tracking",
        "Custom billing options",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outlined" as const,
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
              label="Subscription Plans"
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
              Choose Your Health Plan
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.95rem", md: "1.05rem", lg: "1.15rem" },
                color: "text.secondary",
                maxWidth: "700px",
                lineHeight: 1.7,
              }}
            >
              Select the perfect healthcare plan that fits your needs. Get
              unlimited access to expert doctors, advanced diagnostics, and
              comprehensive health management tools.
            </Typography>
          </Stack>

          {/* Plans Grid */}
          <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
            {plans.map((plan) => (
              <Grid key={plan.id} item xs={12} sm={6} lg={4}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    border: plan.popular ? "2px solid" : "1px solid",
                    borderColor: plan.popular ? "primary.main" : "divider",
                    boxShadow: plan.popular
                      ? "0 12px 40px rgba(21,134,253,0.15), 0 4px 18px rgba(8,17,52,0.08)"
                      : "0 4px 20px rgba(21,134,253,0.08), 0 2px 8px rgba(8,17,52,0.04)",
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "visible",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: plan.popular
                        ? "0 16px 50px rgba(21,134,253,0.2), 0 6px 22px rgba(8,17,52,0.1)"
                        : "0 8px 30px rgba(21,134,253,0.15), 0 4px 12px rgba(8,17,52,0.08)",
                    },
                  }}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: -12,
                        left: "50%",
                        transform: "translateX(-50%)",
                        bgcolor: "primary.main",
                        color: "white",
                        px: 2,
                        py: 0.5,
                        borderRadius: 2,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        boxShadow: "0 4px 12px rgba(21,134,253,0.3)",
                      }}
                    >
                      Most Popular
                    </Box>
                  )}

                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Stack spacing={3}>
                      {/* Plan Header */}
                      <Box>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            fontSize: { xs: "1.5rem", md: "1.75rem" },
                            mb: 1,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {plan.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            fontSize: { xs: "0.875rem", md: "0.95rem" },
                            lineHeight: 1.6,
                          }}
                        >
                          {plan.description}
                        </Typography>
                      </Box>

                      {/* Pricing */}
                      <Box>
                        <Stack
                          direction="row"
                          alignItems="baseline"
                          spacing={0.5}
                        >
                          <Typography
                            sx={{
                              fontSize: { xs: "2.5rem", md: "3rem" },
                              fontWeight: 700,
                              color: "primary.main",
                              lineHeight: 1,
                            }}
                          >
                            ৳{plan.price}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.secondary",
                              fontSize: { xs: "1rem", md: "1.125rem" },
                            }}
                          >
                            /{plan.period}
                          </Typography>
                        </Stack>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            fontSize: { xs: "0.75rem", md: "0.875rem" },
                            mt: 0.5,
                            display: "block",
                          }}
                        >
                          Billed monthly
                        </Typography>
                      </Box>

                      <Divider />

                      {/* Features List */}
                      <Stack spacing={1.5}>
                        {plan.features.map((feature, index) => (
                          <Stack
                            key={index}
                            direction="row"
                            spacing={1.5}
                            alignItems="flex-start"
                          >
                            <CheckCircleIcon
                              sx={{
                                color: "primary.main",
                                fontSize: { xs: "1.25rem", md: "1.5rem" },
                                mt: 0.25,
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                color: "text.primary",
                                fontSize: { xs: "0.875rem", md: "0.95rem" },
                                lineHeight: 1.6,
                              }}
                            >
                              {feature}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>

                      {/* CTA Button */}
                      <Button
                        variant={plan.buttonVariant}
                        fullWidth
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          py: { xs: 1.25, md: 1.5 },
                          fontSize: { xs: "0.95rem", md: "1rem" },
                          fontWeight: 600,
                          mt: "auto",
                          ...(plan.popular && {
                            boxShadow: "0 4px 12px rgba(21,134,253,0.3)",
                            "&:hover": {
                              boxShadow: "0 6px 16px rgba(21,134,253,0.4)",
                            },
                          }),
                        }}
                      >
                        {plan.buttonText}
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Additional Info Section */}
          <Box
            sx={{
              mt: { xs: 4, md: 6 },
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "1.125rem", md: "1.25rem" },
                mb: 2,
                color: "text.primary",
              }}
            >
              All plans include:
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 3 }}
              justifyContent="center"
              flexWrap="wrap"
            >
              {[
                "Secure payment processing",
                "Cancel anytime",
                "30-day money-back guarantee",
                "No hidden fees",
              ].map((item, index) => (
                <Stack
                  key={index}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "0.875rem", md: "0.95rem" },
                  }}
                >
                  <CheckCircleIcon
                    sx={{
                      color: "primary.main",
                      fontSize: "1rem",
                    }}
                  />
                  <Typography variant="body2">{item}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          {/* FAQ or Contact Section */}
          <Box
            sx={{
              textAlign: "center",
              mt: { xs: 2, md: 4 },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.875rem", md: "0.95rem" },
                mb: 1,
              }}
            >
              Need help choosing a plan?
            </Typography>
            <Link href="/contact-us" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                sx={{
                  textTransform: "none",
                  color: "primary.main",
                  fontWeight: 600,
                }}
              >
                Contact Our Team
              </Button>
            </Link>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default SubscriptionPlanPage;
