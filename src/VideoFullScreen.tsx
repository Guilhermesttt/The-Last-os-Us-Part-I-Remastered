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

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />

    </div>
  );
};

export default VideoFullScreen;
