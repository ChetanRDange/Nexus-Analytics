import { useEffect, useState } from "react";
import Logo from "../assets/images/leadmagixlogo.png";


function useFavicon(initialIcon) {
  const [iconUrl, setIconUrl] = useState(Logo);
  // const [iconUrl, setIconUrl] = useState(initialIcon);

  useEffect(() => {
    if (!iconUrl) return;

    let existingLink = document.querySelector("link[rel='icon']");
    if (existingLink) {
      existingLink.href = iconUrl;
    } else {
      const newLink = document.createElement("link");
      newLink.type = "image/x-icon";
      newLink.sizes = "64x64";
      newLink.rel = "icon";
      newLink.href = iconUrl;
      document.head.appendChild(newLink);
    }
  }, [iconUrl]);

  return setIconUrl;
}

export default useFavicon;
