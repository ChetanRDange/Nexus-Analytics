import React, { useEffect, useState } from "react";
// import ColorPaletComp from "../Components/ColorPaletComp";
import {
  FaCheck,
  FaDiscord,
  FaEdit,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMediumM,
  FaPinterest,
  FaQuora,
  FaRedditAlien,
  FaTimes,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaSquareThreads, FaXTwitter } from "react-icons/fa6";
import { SiTiktok } from "react-icons/si";
import { useAuth } from "../AuthContext";

const SocialMediaTable = ({ socialMediaData = {}, onUpdate, isEditing, setIsEditing }) => {
  const { theme } = useAuth();

  //   const { setAppSettings } = useAppSettings();
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");
  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  const [editableLinks, setEditableLinks] = useState({});

  useEffect(() => {
    setEditableLinks(socialMediaData);
  }, [socialMediaData]);

  const handleChange = (platform, value) => {
    const updated = { ...editableLinks, [platform]: value };
    setEditableLinks(updated);
    onUpdate?.(updated); // Immediately update parent too
  };

  const handleUpdate = async () => {
    if (onUpdate) {
      onUpdate(editableLinks);
    }
    setIsEditing(false);
  };

  const socialMediaIcons = {
    quora: <FaQuora className="text-[#B92B27] text-2xl" />,
    discord: <FaDiscord className="text-[#5865F2] text-2xl" />,
    pinterest: <FaPinterest className="text-[#E60023] text-2xl" />,
    youtube: <FaYoutube className="text-[#FF0000] text-2xl" />,
    instagram: <FaInstagram className="text-[#E1306C] text-2xl" />,
    tiktok: (
      <SiTiktok
        className={`text-2xl ${isDarkMode ? "text-white" : "text-black"}`}
      />
    ),
    linkedin: <FaLinkedin className="text-[#0077B5] text-2xl" />,
    reddit: <FaRedditAlien className="text-[#FF4500] text-2xl" />,
    facebook: <FaFacebook className="text-[#1877F2] text-2xl" />,
    threads: (
      <FaSquareThreads
        className={`text-2xl ${isDarkMode ? "text-white" : "text-black"}`} // :white_check_mark: Dark mode logic applied
      />
    ),
    x: (
      <FaXTwitter
        className={`text-2xl ${isDarkMode ? "text-white" : "text-black"}`} // :white_check_mark: Dark mode logic applied
      />
    ),
    medium: (
      <FaMediumM
        className={`text-2xl ${isDarkMode ? "text-white" : "text-[#12100E]"}`} // :white_check_mark: Dark mode logic applied
      />
    ),
    whatsapp: <FaWhatsapp className="text-[#25D366] text-2xl" />,
  };

  const socialMediaNames = {
    quora: "Quora",
    discord: "Discord",
    pinterest: "Pinterest",
    youtube: "YouTube",
    instagram: "Instagram",
    tiktok: "TikTok",
    linkedin: "LinkedIn",
    reddit: "Reddit",
    facebook: "Facebook",
    threads: "Threads",
    x: "Twitter",
    medium: "Medium",
    whatsapp: "WhatsApp",
  };

  return (
    <div className="p-6 border border-border rounded-xl w-full max-w-4xl mx-auto mb-8 bg-inherit">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-xl text-primary">Social Media Links</h2>
        {isEditing ? (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleUpdate}
              className="px-4 py-2 text-white font-medium bg-brand hover:bg-brandHover rounded-xl flex items-center gap-2"
              id="button-284"
            >
              <FaCheck /> Update
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              //   className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
              className="flex gap-2 h-fit items-center px-3 md:px-3 sm:px-4 rounded-xl py-2 bg-primary hover:bg-primarydark text-white"
              id="button-285"
            >
              <FaTimes /> Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex gap-2 h-fit items-center px-3 md:px-3 sm:px-4 rounded-xl py-2 bg-primary hover:bg-primarydark text-white"
            id="button-286"
          >
            <FaEdit /> Edit
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-border text-sm md:text-lg text-primary">
          <thead>
            <tr className="bg-inherit border-b border-border">
              <th className="p-3 text-left font-semibold w-1/3">
                Social Media
              </th>
              <th className="p-3 text-left font-semibold">Links</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(editableLinks).map(([platform, link]) => (
              <tr key={platform} className="border-b border-border">
                <td className="p-3 flex items-center gap-3">
                  {socialMediaIcons[platform] || ":globe_with_meridians:"}
                  <span className="capitalize text-sm md:text-lg">
                    {socialMediaNames[platform] || platform}
                  </span>
                </td>
                <td className="p-3">
                  {isEditing ? (
                    <input
                      type="text"
                      id={`input-${platform}`}
                      value={link}
                      onChange={(e) => handleChange(platform, e.target.value)}
                      className="w-full p-2 border border-border rounded text-sm md:text-lg bg-inherit"
                      placeholder={`Enter ${socialMediaNames[platform]} URL`}
                    />
                  ) : link ? (
                    <a
                      id={`link-${platform}`}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand underline text-lg"
                    >
                      {link.length > 30 ? `${link.substring(0, 30)}...` : link}
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm md:text-lg">
                      No link provided
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default SocialMediaTable;
