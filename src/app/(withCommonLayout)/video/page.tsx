import VideoCall from "@/components/UI/VideoCall/VideoCall";

const VideoCalling = async ({
  searchParams,
}: {
  searchParams: Promise<{ videoCallingId: string }>;
}) => {
  const { videoCallingId } = await searchParams;

  return <VideoCall videoCallingId={videoCallingId} />;
};

export default VideoCalling;
