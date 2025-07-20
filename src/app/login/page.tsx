"use client";
import assets from "@/assets";
import InputForm from "@/components/Form/InputForm";
import PHForm from "@/components/Form/PHForm";
import { loginSchema } from "@/schema/loginSchema";
import { loginPatient } from "@/services/actions/loginPatient";
import { storeUserInfo } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import Image from "next/image";

import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const LoginPage = () => {
  // const router = useRouter();
  const handleLogin = async (data: FieldValues) => {
    try {
      const res = await loginPatient(data);
      console.log(res);
      if (res?.data?.accessToken) {
        toast.success(res?.message);
        storeUserInfo({ accessToken: res?.data?.accessToken });
        // router.push("/dashboard");
      } else {
        toast.error(res?.message);
        // setError(res?.message);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Container sx={{ mt: { xs: 4, md: 10 } }}>
      {/* Demo Accounts Section */}
      <Box
        sx={{
          width: { xs: "100%", sm: "90%", md: "600px" },
          mx: "auto",
          mb: { xs: 2, md: 3 },
          p: { xs: 1.5, md: 2 },
          border: "1px dashed #1976d2",
          borderRadius: 2,
          backgroundColor: "#f5faff",
        }}
      >
        <Typography variant="h6" fontWeight={600} mb={1} color="primary.main">
          Demo Accounts
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Box>
            <Typography variant="subtitle2" fontWeight={500}>
              Admin
            </Typography>
            <Typography variant="body2">Email: tanvir@gmail.com</Typography>
            <Typography variant="body2">Password: 123456</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight={500}>
              Doctor
            </Typography>
            <Typography variant="body2">
              Email: doctorpeterson@gmail.com
            </Typography>
            <Typography variant="body2">Password: 123456</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight={500}>
              Patient
            </Typography>
            <Typography variant="body2">Email: asif@gmail.com</Typography>
            <Typography variant="body2">Password: 123456</Typography>
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", sm: "90%", md: "600px" },
          boxShadow: 1,
          height: { xs: "auto", md: "450px" },
          mx: "auto",
          padding: { xs: 2, md: 5 },
        }}
      >
        {/* heading */}
        <Stack alignItems="center" pb={3}>
          <Image src={assets.svgs.logo} alt="logo" width={50} height={50} />
          <Typography
            variant="h5"
            component="h1"
            fontWeight={700}
            my={1}
            fontSize={{ xs: 22, md: 28 }}
          >
            Login Patient MediSync
          </Typography>
        </Stack>
        {/* form */}
        <PHForm
          onSubmit={handleLogin}
          resolver={zodResolver(loginSchema)}
          defaultValues={{
            email: "",
            password: "",
          }}
        >
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <InputForm name="email" label="Email" fullWidth type="email" />
            <InputForm
              name="password"
              label="Password"
              fullWidth
              type="password"
            />
          </Stack>
          <Box sx={{ textAlign: "right", mt: 2, mb: 4 }}>
            <Link href="/forget-password" variant="body2">
              Forget Password
            </Link>
          </Box>
          <Button
            fullWidth
            type="submit"
            sx={{ py: 1.2, fontSize: { xs: 16, md: 18 } }}
          >
            Login
          </Button>
        </PHForm>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          mt={4}
          alignItems="center"
        >
          <Typography variant="body2">Don&apos;t have a account?</Typography>
          <Link underline="none" href="/register">
            Create an account
          </Link>
        </Stack>
      </Box>
    </Container>
  );
};

export default LoginPage;
