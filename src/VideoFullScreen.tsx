const VideoFullScreen = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden -z-10">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/Tlou_BG.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoFullScreen;
