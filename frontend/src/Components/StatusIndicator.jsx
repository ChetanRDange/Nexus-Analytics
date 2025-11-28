import React from "react";
import { useAuth } from "../AuthContext";

const StatusIndicator = ({ status, isActive }) => {
  const { theme } = useAuth();
  const statusValue =
    typeof status === "string" ? status : isActive ? "Active" : "Inactive";

  if (!statusValue) {
    return <span className="text-primary">N/A</span>;
  }

  // Define status configurations for both light and dark themes
  const statusConfig = {
    light: {
      Active: {
        bgColor: "bg-[#ECFDF3]",
        textColor: "text-[#027948]",
        dotColor: "bg-[#12B76A]",
        label: "Active"
      },
      Succeeded: {
        bgColor: "bg-[#ECFDF3]",
        textColor: "text-[#027948]",
        dotColor: "bg-[#12B76A]",
        label: "Succeeded"
      },
      Published: {
        bgColor: "bg-[#ECFDF3]",
        textColor: "text-[#027948]",
        dotColor: "bg-[#12B76A]",
        label: "Published"
      },
      GET: {
        bgColor: "bg-[#ECFDF3]",
        textColor: "text-[#027948]",
        dotColor: "bg-[#12B76A]",
        label: "GET"
      },
      success: {
        bgColor: "bg-[#ECFDF3]",
        textColor: "text-[#027948]",
        dotColor: "bg-[#12B76A]",
        label: "Success"
      },
      Inactive: {
        bgColor: "bg-[#FEF3F2]",
        textColor: "text-[#B32318]",
        dotColor: "bg-[#F04438]",
        label: "Inactive"
      },
      Failed: {
        bgColor: "bg-[#FEF3F2]",
        textColor: "text-[#B32318]",
        dotColor: "bg-[#F04438]",
        label: "Failed"
      },
      Expired: {
        bgColor: "bg-[#FEF3F2]",
        textColor: "text-[#B32318]",
        dotColor: "bg-[#F04438]",
        label: "Expired"
      },
      DELETE: {
        bgColor: "bg-[#FEF3F2]",
        textColor: "text-[#B32318]",
        dotColor: "bg-[#F04438]",
        label: "DELETE"
      },
      error: {
        bgColor: "bg-[#FEF3F2]",
        textColor: "text-[#B32318]",
        dotColor: "bg-[#F04438]",
        label: "Error"
      },
      Invited: {
        bgColor: "bg-[#EFF8FF]",
        textColor: "text-[#175CD3]",
        dotColor: "bg-[#2E90FA]",
        label: "Invited"
      },
      POST: {
        bgColor: "bg-[#EFF8FF]",
        textColor: "text-[#175CD3]",
        dotColor: "bg-[#2E90FA]",
        label: "POST"
      },
      Draft: {
        bgColor: "bg-[#FFFAEB]",
        textColor: "text-[#B54708]",
        dotColor: "bg-[#F79009]",
        label: "Draft"
      },
      Pending: {
        bgColor: "bg-[#F2F4F7]",
        textColor: "text-primary",
        dotColor: "bg-[#667085]",
        label: "Pending"
      },
      Blocked: {
        bgColor: "bg-[#FDF6E3]",
        textColor: "text-[#B54708]",
        dotColor: "bg-[#F79009]",
        label: "Blocked"
      }
    },
    dark: {
      Active: {
        bgColor: "bg-[#0C3A2C]",
        textColor: "text-[#4ADE80]",
        dotColor: "bg-[#4ADE80]",
        label: "Active"
      },
      Succeeded: {
        bgColor: "bg-[#0C3A2C]",
        textColor: "text-[#4ADE80]",
        dotColor: "bg-[#4ADE80]",
        label: "Succeeded"
      },
      Published: {
        bgColor: "bg-[#0C3A2C]",
        textColor: "text-[#4ADE80]",
        dotColor: "bg-[#4ADE80]",
        label: "Published"
      },
      GET: {
        bgColor: "bg-[#0C3A2C]",
        textColor: "text-[#4ADE80]",
        dotColor: "bg-[#4ADE80]",
        label: "GET"
      },
      success: {
        bgColor: "bg-[#0C3A2C]",
        textColor: "text-[#4ADE80]",
        dotColor: "bg-[#4ADE80]",
        label: "Success"
      },
      Inactive: {
        bgColor: "bg-[#3A1212]",
        textColor: "text-[#FCA5A5]",
        dotColor: "bg-[#FCA5A5]",
        label: "Inactive"
      },
      Failed: {
        bgColor: "bg-[#3A1212]",
        textColor: "text-[#FCA5A5]",
        dotColor: "bg-[#FCA5A5]",
        label: "Failed"
      },
      Expired: {
        bgColor: "bg-[#3A1212]",
        textColor: "text-[#FCA5A5]",
        dotColor: "bg-[#FCA5A5]",
        label: "Expired"
      },
      DELETE: {
        bgColor: "bg-[#3A1212]",
        textColor: "text-[#FCA5A5]",
        dotColor: "bg-[#FCA5A5]",
        label: "DELETE"
      },
      error: {
        bgColor: "bg-[#3A1212]",
        textColor: "text-[#FCA5A5]",
        dotColor: "bg-[#FCA5A5]",
        label: "Error"
      },
      Invited: {
        bgColor: "bg-[#1E3A8A]",
        textColor: "text-[#93C5FD]",
        dotColor: "bg-[#93C5FD]",
        label: "Invited"
      },
      POST: {
        bgColor: "bg-[#1E3A8A]",
        textColor: "text-[#93C5FD]",
        dotColor: "bg-[#93C5FD]",
        label: "POST"
      },
      Draft: {
        bgColor: "bg-[#3A2A16]",
        textColor: "text-[#FCD34D]",
        dotColor: "bg-[#FCD34D]",
        label: "Draft"
      },
      Pending: {
        bgColor: "bg-[#1c2849]",
        textColor: "text-[#E4E7EC]",
        dotColor: "bg-[#9CA3AF]",
        label: "Pending"
      },
      Blocked: {
        bgColor: "bg-[#3A2A16]",
        textColor: "text-[#FCD34D]",
        dotColor: "bg-[#FCD34D]",
        label: "Blocked"
      }
    }
  };

  // Get the current theme's config or default to dark theme
  const currentTheme = theme || "dark";
  const themeConfig = statusConfig[currentTheme] || statusConfig.dark;
  
  // Get the specific status config or default values
  const config = themeConfig[statusValue] || {
    bgColor: currentTheme === "dark" ? "bg-gray-800" : "bg-gray-100",
    textColor: currentTheme === "dark" ? "text-gray-200" : "text-gray-800",
    dotColor: currentTheme === "dark" ? "bg-gray-400" : "bg-gray-500",
    label: statusValue,
  };

  return (
    <div
      className={`flex gap-2 items-center py-1 px-2 ${config.bgColor} rounded-xl ${config.textColor} w-fit`}
    >
      <span
        className={`w-[12px] h-[12px] rounded-full ${config.dotColor}`}
      ></span>
      <span>{config.label}</span>
    </div>
  );
};

export default StatusIndicator;