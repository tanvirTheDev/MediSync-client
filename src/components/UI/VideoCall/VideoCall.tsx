"use client";

import VideoCallIcon from "@mui/icons-material/VideoCall";
import { Alert, Button, Stack, Typography } from "@mui/material";
import AgoraUIKit from "agora-react-uikit";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VideoCall = ({ videoCallingId }: { videoCallingId: string }) => {
  const [startVideoCall, setStartVideoCall] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [webRTCSupported, setWebRTCSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const userAgent =
        navigator.userAgent || navigator.vendor || (window as any).opera;
      return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent.toLowerCase()
      );
    };

    // Check WebRTC support
    const checkWebRTCSupport = () => {
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    };

    setIsMobile(checkMobile());
    setWebRTCSupported(checkWebRTCSupport());
  }, []);

  const fetchTokenAndStart = async () => {
    try {
      setError(null);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/video-call/agora-token?channelName=${videoCallingId}&uid=0`
      );
      const data = await res.json();
      setToken(data.token);
      setStartVideoCall(true);
    } catch (error: any) {
      console.log(error);
      setError("Failed to start video call. Please try again.");
    }
  };

  const rtcProps = {
    appId: process.env.NEXT_PUBLIC_VIDEO_CALL_APP_ID || "test",
    channel: videoCallingId,
    token: token,
  };

  const callbacks = {
    EndCall: () => {
      setStartVideoCall(false);
      router.push("/dashboard");
    },
  };

  // Show error if WebRTC is not supported
  if (!webRTCSupported) {
    return (
      <Stack
        sx={{
          width: "100%",
          maxWidth: 500,
          mx: "auto",
          mt: { xs: 2, md: 10 },
        }}
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Video calling is not supported in your browser. Please use a modern
          browser like Chrome, Firefox, or Safari.
        </Alert>
      </Stack>
    );
  }

  // Show mobile-specific warning
  if (isMobile && !startVideoCall) {
    return (
      <Stack
        sx={{
          width: "100%",
          maxWidth: 500,
          mx: "auto",
          mt: { xs: 2, md: 10 },
        }}
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Alert severity="info" sx={{ width: "100%" }}>
          <Typography variant="body2">
            <strong>Mobile Device Detected:</strong> Make sure you are using
            HTTPS and have granted camera/microphone permissions.
          </Typography>
        </Alert>

        {error && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}

        <Button
          onClick={fetchTokenAndStart}
          endIcon={<VideoCallIcon />}
          sx={{ borderRadius: "20px" }}
          variant="contained"
        >
          Start Call
        </Button>

        <Image
          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb25jMWk1b3VxYWtjYTdpZXlnNGcwZHVqcGppejM3bDUybTl3aXQ0ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/PnHX3RAVHsjHXTO4qv/giphy.gif"
          width={500}
          height={500}
          alt="video call gif"
        />
      </Stack>
    );
  }

  return startVideoCall ? (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <Stack
      sx={{
        width: "100%",
        maxWidth: 500,
        mx: "auto",
        mt: { xs: 2, md: 10 },
      }}
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
    >
      {error && (
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      )}

      <Button
        onClick={fetchTokenAndStart}
        endIcon={<VideoCallIcon />}
        sx={{ borderRadius: "20px" }}
        variant="contained"
      >
        Start Call
      </Button>
      <Image
        src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb25jMWk1b3VxYWtjYTdpZXlnNGcwZHVqcGppejM3bDUybTl3aXQ0ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/PnHX3RAVHsjHXTO4qv/giphy.gif"
        width={500}
        height={500}
        alt="video call gif"
      />
    </Stack>
  );
};

export default VideoCall;
