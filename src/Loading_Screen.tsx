import { useEffect, useState } from "react";
import Logo_TLOU_branca from "../public/Logo_TLOU_branca.png";

function Loading_Screen() {
  const [showLogo, setShowLogo] = useState(false);
  const [hideLogo, setHideLogo] = useState(false);
  const [fadeScreen, setFadeScreen] = useState(false);
  const [removeScreen, setRemoveScreen] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowLogo(true), 1800);

    setTimeout(() => setHideLogo(true), 8000);

    setTimeout(() => setFadeScreen(true), 10000);

    setTimeout(() => setRemoveScreen(true), 19000);
  }, []);

  if (removeScreen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black transition-opacity duration-1500 ${
        fadeScreen ? "opacity-0" : "opacity-100"
      }`}
    >
      <img
        src={Logo_TLOU_branca}
        alt="Logo TLOU"
        className={`max-w-sm transition-all duration-1000 ${
          showLogo && !hideLogo ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default Loading_Screen;
