import { logoutUser } from "@/services/actions/logoutUser";
import { getUserInfo } from "@/services/auth.services";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const router = useRouter();
  const userData = getUserInfo() as any;

  const handleLogOut = () => {
    logoutUser(router);
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {userData?.email ? (
        <>
          {/* DASHBOARD (Only when logged in) */}
          <Button
            variant="contained"
            color="primary"
            component={Link}
            href="/dashboard"
          >
            Dashboard
          </Button>

          {/* LOGOUT */}
          <Button variant="contained" color="error" onClick={handleLogOut}>
            Logout
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/login"
        >
          Login
        </Button>
      )}
    </Stack>
  );
};

export default AuthButton;
