import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import {
  ClipboardList,
  LayoutDashboard,
  ScrollText,
  Ticket,
  UserPlus,
  Wallet,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  HiOutlineCog,
  HiOutlineDocumentText,
  HiOutlineOfficeBuilding,
  HiOutlineTag,
  HiAdjustments,
} from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";
import { TbMessageCog } from "react-icons/tb";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useStore from "../state/store";
import SearchComponent from "./SearchComponent";
import SideBarItems from "./SideBarItems";
import { useAuth } from "../AuthContext";

function AccordionIcon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-4 w-4 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

function SkeletonItem() {
  return (
    <div className="py-2.5 px-3 rounded-xl flex items-center gap-4 animate-pulse">
      <div className="w-6 h-6 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-32"></div>
    </div>
  );
}

export default function MaterialSidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const [open, setOpen] = useState(0);
  const location = useLocation();
  const accordionRefs = {
    2: useRef(null), // Plans
    3: useRef(null), // Logs
    4: useRef(null), // Companies
    6: useRef(null), // Settings
    8: useRef(null), // Extension Settings
    9: useRef(null), // Templates
  };

  const handleOpen = (value, e) => {
    e.stopPropagation();
    const wasOpen = open === value;
    setOpen(wasOpen ? 0 : value);

    if (!wasOpen && accordionRefs[value]?.current) {
      setTimeout(() => {
        const sidebar = document.querySelector(".overflow-y-auto");
        const accordion = accordionRefs[value].current;
        if (sidebar && accordion) {
          const accordionRect = accordion.getBoundingClientRect();
          const sidebarRect = sidebar.getBoundingClientRect();

          const scrollAmount = accordionRect.top - sidebarRect.top - 20;

          sidebar.scrollBy({
            top: scrollAmount,
            behavior: "smooth",
          });
        }
      }, 200);
    }
  };

  const handleNavigation = (href, setIsSidebarOpen) => {
    if (typeof setIsSidebarOpen === "function") {
      setIsSidebarOpen(false);
    }

    if (window.location.pathname === href) {
      navigate("/", { replace: true });
      setTimeout(() => {
        navigate(href, { replace: true });
      }, 0);
    } else {
      navigate(href, { replace: true });
    }
  };

  const { admin } = useStore();
  const { profileLoading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const companies = [
    {
      id: 1,
      name: "Companies",
      href: "/companies",
    },
    {
      id: 5,
      name: "Company Users",
      href: "/company-users",
    },
  ];

  const plans = [
    {
      id: 1,
      name: "Normal Plans",
      href: "/normal-plans",
    },
    {
      id: 2,
      name: "Enterprise Plans",
      href: "/enterprise-plans",
    },
  ];

  const logs = [
    {
      id: 1,
      name: "API",
      href: "/api-logs",
    },
    {
      id: 2,
      name: "Email",
      href: "/email-logs",
    },
    {
      id: 3,
      name: "Login",
      href: "/login-logs",
    },
    {
      id: 4,
      name: "Forgot Password",
      href: "/forgot-password-logs",
    },
    {
      id: 5,
      name: "Success",
      href: "/success-logs",
    },
    {
      id: 6,
      name: "Error",
      href: "/error-logs",
    },
    // {
    //   id: 7,
    //   name: "Data Backup",
    //   href: "/data-backup-logs",
    // },
    // {
    //   id: 8,
    //   name: "Cron",
    //   href: "/cron-logs",
    // },
    {
      id: 8,
      name: "Advance access",
      href: "/advanced-access-logs",
    },
  ];

  const hasResponseMessagePermission =
    admin?.isSuperAdmin || admin?.permissions?.responseMessage?.GET;

  const responseMessages = [
    {
      id: 1,
      name: "Success Response Message",
      href: "/success-response-message",
    },
    {
      id: 2,
      name: "Error Response Message",
      href: "/error-response-message",
    },
  ];

  const extensionSettings = [
    {
      id: 1,
      name: "Version Control",
      href: "/version-control",
    },
  ];

  const templates = [
    {
      id: 1,
      name: "Email Template",
      href: "/email-template",
    },
  ];

  const data = [
    {
      id: 0,
      key: "dashboard",
      title: "Dashboard",
      icon: LayoutDashboard,
      pathname: "/dashboard",
    },
    {
      id: 3,
      key: "user",
      title: "Admin Users",
      icon: UserPlus,
      pathname: "/admin-users",
    },
    {
      id: 4,
      key: "notices",
      title: "Notices",
      icon: ScrollText,
      pathname: "/notices",
    },
    {
      id: 5,
      key: "documentation",
      title: "Documentation",
      icon: ClipboardList,
      pathname: "/documentation",
    },
    {
      id: 7,
      key: "payments",
      title: "Payments",
      icon: Wallet,
      pathname: "/payments",
    },
    {
      id: 8,
      key: "coupons",
      title: "Coupons",
      icon: Ticket,
      pathname: "/coupons",
    },
  ];

  const filterItems = (items, key = "name") => {
    return items.filter((item) =>
      item[key].toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredLogs = filterItems(logs);
  const filteredData = filterItems(data, "title");

  const hasLogsPermission =
    admin?.isSuperAdmin || admin?.permissions?.logs?.GET;
  const hasSettingsPermission =
    admin?.isSuperAdmin || admin?.permissions?.settings?.GET;
  const hasSmtpPermission =
    admin?.isSuperAdmin || admin?.permissions?.smtp?.GET;
  const hasAwsPermission = admin?.isSuperAdmin || admin?.permissions?.aws?.GET;
  const hasBrandPermission =
    admin?.isSuperAdmin || admin?.permissions?.brand?.GET;
  const hasPaymentSettingPermission =
    admin?.isSuperAdmin || admin?.permissions?.paymentSetting?.GET;
  const hasRolesPermission =
    admin?.isSuperAdmin || admin?.permissions?.roles?.GET;
  const hasCompaniesPermission =
    admin?.isSuperAdmin || admin?.permissions?.companies?.GET;
  const hasPlansPermission =
    admin?.isSuperAdmin || admin?.permissions?.plans?.GET;
  const hasMailerMagixPermission =
    admin?.isSuperAdmin || admin?.permissions?.mailerMagix?.GET;
  const hasTemplatesPermission =
    admin?.isSuperAdmin || admin?.permissions?.emailTemplates?.GET;
  const hasExtensionSettingPermission =
    admin?.isSuperAdmin || admin?.permissions?.versionControl?.GET;

  const settings = [
    ...(hasBrandPermission
      ? [{ id: 0, name: "Brand Settings", href: "/brand-settings" }]
      : []),
    ...(hasSmtpPermission
      ? [{ id: 1, name: "SMTP Settings", href: "/smtp-settings" }]
      : []),
    ...(hasPaymentSettingPermission
      ? [{ id: 2, name: "Payment Settings", href: "/payment-settings" }]
      : []),
    ...(hasSettingsPermission
      ? [{ id: 5, name: "Global Settings", href: "/global-settings" }]
      : []),
    ...(hasAwsPermission
      ? [{ id: 6, name: "AWS Settings", href: "/aws-settings" }]
      : []),
    ...(hasRolesPermission
      ? [{ id: 11, name: "Role Management", href: "/role-management" }]
      : []),
    ...(hasMailerMagixPermission
      ? [{ id: 15, name: "Mailer Magix", href: "/mailer-magix" }]
      : []),
  ];

  const filteredSettings = filterItems(settings);

  useEffect(() => {
    if (searchTerm) {
      if (filteredLogs.length > 0) setOpen(3);
      else if (filteredSettings.length > 0) setOpen(6);
      else setOpen(0);
    }
  }, [searchTerm]);

  useEffect(() => {
    const path = location.pathname;
    setOpen(0);
    if (path.includes("companies") || path.includes("company-users")) {
      setOpen(4);
    } else if (
      path.includes("normal-plans") ||
      path.includes("enterprise-plans")
    ) {
      setOpen(2);
    }
    // Logs routes
    else if (path.includes("logs")) {
      setOpen(3);
    } else if (
      path.includes("success-response") ||
      path.includes("error-response")
    ) {
      setOpen(7);
    } else if (
      path.includes("settings") ||
      path.includes("role-management") ||
      path.includes("mailer-magix")
    ) {
      setOpen(6);
    } else if (path.includes("version-control")) {
      setOpen(8);
    } else if (path.includes("email-template")) {
      setOpen(9);
    }
  }, [location.pathname]);

  return (
    <div className=" h-full px-3 ptpb-4 sm:py-6 relative bg-main border-r border-primary">
      <div className="w-full">
        <div className="flex flex-col space-y-2 h-screen lg:h-screen-minus-240 overflow-y-auto scrollbar-hide pb-12">
          <div className="w-full flex items-center rounded-xl border border-primary px-3 focus:border-hover mb-4">
            <SearchComponent
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>

          {profileLoading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <SkeletonItem key={i} />
              ))}
            </div>
          ) : (
            <>
              {/* Dashboard - Always shown first */}
              {filteredData
                .filter((item) => item.key === "dashboard")
                .map((item, i) => {
                  if (
                    admin?.isSuperAdmin ||
                    (admin?.permissions && admin?.permissions[item.key]?.GET)
                  ) {
                    return (
                      <React.Fragment key={i}>
                        <SideBarItems
                          item={item}
                          setIsSidebarOpen={setIsSidebarOpen}
                        />
                      </React.Fragment>
                    );
                  }
                  return null;
                })}

              {/* Companies Dropdown */}
              {hasCompaniesPermission && (
                <Accordion
                  open={open === 4}
                  icon={<AccordionIcon id={4} open={open} />}
                  className="bg-main text-base"
                >
                  <AccordionHeader
                    onClick={(e) => handleOpen(4, e)}
                    className={`py-2.5 px-3 text-left text-base rounded-xl flex gap-2 items-center border-0 shadow-none bg-main ${
                      open === 4
                        ? "bg-fadedblue text-blue"
                        : "hover:bg-hover bg-main text-primary"
                    }`}
                  >
                    <div className="flex gap-4 items-center">
                      <span>
                        <HiOutlineOfficeBuilding
                          size={24}
                          className={`${
                            open === 4
                              ? "text-blue bg-fadedblue"
                              : "text-primary"
                          }`}
                        />
                      </span>
                      <span> Companies </span>
                    </div>
                  </AccordionHeader>
                  <AccordionBody className="space-y-1">
                    {companies.map((link, index) => (
                      <NavLink
                        key={index}
                        to={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation(link.href, setIsSidebarOpen);
                        }}
                        className={({ isActive }) =>
                          `block text-base px-4 font-medium rounded-xl py-2.5 capitalize ${
                            isActive
                              ? "bg-fadedblue text-blue"
                              : "text-primary hover:bg-hover bg-main"
                          }`
                        }
                      >
                        <span className="pl-8">{link.name}</span>
                      </NavLink>
                    ))}
                  </AccordionBody>
                </Accordion>
              )}

              {/* Plans Dropdown */}
              {hasPlansPermission && (
                <Accordion
                  open={open === 2}
                  icon={<AccordionIcon id={2} open={open} />}
                  className="bg-main text-base"
                >
                  <AccordionHeader
                    onClick={(e) => handleOpen(2, e)}
                    className={`py-2.5 px-3 text-left text-base rounded-xl flex gap-2 items-center border-0 shadow-none bg-main ${
                      open === 2
                        ? "bg-fadedblue text-blue"
                        : "hover:bg-hover bg-main text-primary"
                    }`}
                  >
                    <div className="flex gap-4 items-center">
                      <span>
                        <HiOutlineTag
                          size={24}
                          className={`${
                            open === 2 ? "text-blue" : "text-primary"
                          }`}
                        />
                      </span>
                      <span> Plans </span>
                    </div>
                  </AccordionHeader>
                  <AccordionBody className="space-y-1">
                    {plans.map((link, index) => (
                      <NavLink
                        key={index}
                        to={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation(link.href, setIsSidebarOpen);
                        }}
                        className={({ isActive }) =>
                          `block text-base px-4 font-medium rounded-xl py-2.5 capitalize ${
                            isActive
                              ? "bg-fadedblue text-blue"
                              : "text-primary hover:bg-hover bg-main"
                          }`
                        }
                      >
                        <span className="pl-8">{link.name}</span>
                      </NavLink>
                    ))}
                  </AccordionBody>
                </Accordion>
              )}

              {/* Other menu items excluding dashboard */}
              {filteredData
                .filter((item) => item.key !== "dashboard")
                .map((item, i) => {
                  if (
                    admin?.isSuperAdmin ||
                    (admin?.permissions &&
                      ((item.key === "payments" &&
                        admin?.permissions?.paymentRecord?.GET) ||
                        admin?.permissions[item.key]?.GET))
                  ) {
                    return (
                      <React.Fragment key={i}>
                        <SideBarItems
                          item={item}
                          setIsSidebarOpen={setIsSidebarOpen}
                        />
                      </React.Fragment>
                    );
                  }
                  return null;
                })}

              {/* Logs Dropdown */}
              {hasLogsPermission && (
                <Accordion
                  open={open === 3}
                  icon={<AccordionIcon id={3} open={open} />}
                  className="bg-main text-base"
                >
                  <AccordionHeader
                    onClick={(e) => handleOpen(3, e)}
                    className={`py-2.5 px-3 text-left text-base rounded-xl flex gap-2 items-center border-0 shadow-none bg-main ${
                      open === 3
                        ? "bg-fadedblue text-blue"
                        : "hover:bg-hover bg-main text-primary"
                    }`}
                  >
                    <div className="flex gap-4 items-center">
                      <span>
                        <HiOutlineDocumentText
                          size={26}
                          className={`${
                            open === 3 ? "text-blue" : "text-primary"
                          }`}
                        />
                      </span>
                      <span> Logs </span>
                    </div>
                  </AccordionHeader>
                  <AccordionBody className="space-y-1">
                    {filteredLogs.map((link, index) => (
                      <NavLink
                        key={index}
                        to={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation(link.href, setIsSidebarOpen);
                        }}
                        className={({ isActive }) =>
                          `block text-base px-4 font-medium rounded-xl py-2.5 capitalize ${
                            isActive
                              ? "bg-fadedblue text-blue"
                              : "text-primary hover:bg-hover bg-main"
                          }`
                        }
                      >
                        <span className="pl-8">{link.name}</span>
                      </NavLink>
                    ))}
                  </AccordionBody>
                </Accordion>
              )}

              {/* Response Messages Dropdown */}
              {hasResponseMessagePermission && (
                <Accordion
                  open={open === 7}
                  icon={<AccordionIcon id={7} open={open} />}
                  className="bg-main text-base"
                >
                  <AccordionHeader
                    onClick={(e) => handleOpen(7, e)}
                    className={`py-2.5 px-3 text-left text-base rounded-xl flex gap-2 items-center border-0 shadow-none bg-main ${
                      open === 7
                        ? "bg-fadedblue text-blue"
                        : "hover:bg-hover bg-main text-primary"
                    }`}
                  >
                    <div className="flex gap-4 items-center">
                      <span>
                        <TbMessageCog
                          size={22}
                          className={`${
                            open === 7 ? "text-blue" : "text-primary"
                          }`}
                        />
                      </span>
                      <span>Response Messages</span>
                    </div>
                  </AccordionHeader>
                  <AccordionBody className="space-y-1">
                    {responseMessages.map((link, index) => (
                      <NavLink
                        key={index}
                        to={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation(link.href, setIsSidebarOpen);
                        }}
                        className={({ isActive }) =>
                          `block text-base px-4 font-medium rounded-xl py-2.5 capitalize ${
                            isActive
                              ? "bg-fadedblue text-blue"
                              : "text-primary hover:bg-hover bg-main"
                          }`
                        }
                      >
                        <span className="pl-8">{link.name}</span>
                      </NavLink>
                    ))}
                  </AccordionBody>
                </Accordion>
              )}

              {/* Settings Dropdown */}
              {hasSettingsPermission && (
                <Accordion
                  open={open === 6}
                  icon={<AccordionIcon id={6} open={open} />}
                  className="bg-main text-base"
                >
                  <AccordionHeader
                    onClick={(e) => handleOpen(6, e)}
                    className={`py-2.5 px-3 text-left text-base rounded-xl flex gap-2 items-center border-0 shadow-none  ${
                      open === 6
                        ? "bg-fadedblue text-blue"
                        : "hover:bg-hover bg-main text-primary"
                    }`}
                    ref={accordionRefs[6]}
                  >
                    <div className="flex gap-4 items-center">
                      <span>
                        <HiOutlineCog
                          size={26}
                          className={`${
                            open === 6 ? "text-blue" : "text-primary"
                          }`}
                        />
                      </span>
                      <span> Settings </span>
                    </div>
                  </AccordionHeader>
                  <AccordionBody className="space-y-1 ">
                    {filteredSettings.map((link, index) => (
                      <NavLink
                        key={index}
                        to={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation(link.href, setIsSidebarOpen);
                        }}
                        className={({ isActive }) =>
                          `block text-base px-4 font-medium rounded-xl py-2.5 capitalize  ${
                            isActive
                              ? "bg-fadedblue text-blue"
                              : "text-primary hover:bg-hover bg-main"
                          }`
                        }
                      >
                        <span className="pl-8 ">{link.name}</span>
                      </NavLink>
                    ))}
                  </AccordionBody>
                </Accordion>
              )}

              {/* Extension Settings Dropdown */}
              {hasExtensionSettingPermission && (
                <Accordion
                  open={open === 8}
                  icon={<AccordionIcon id={8} open={open} />}
                  className="bg-main text-base"
                >
                  <AccordionHeader
                    onClick={(e) => handleOpen(8, e)}
                    className={`py-2.5 px-3 text-left text-base rounded-xl flex gap-2 items-center border-0 shadow-none ${
                      open === 8
                        ? "bg-fadedblue text-blue"
                        : "hover:bg-hover bg-main text-primary"
                    }`}
                    ref={accordionRefs[8]}
                  >
                    <div className="flex gap-4 items-center">
                      <span>
                        <HiAdjustments
                          size={22}
                          className={`${
                            open === 8 ? "text-blue" : "text-primary"
                          }`}
                        />
                      </span>
                      <span>Extension Settings</span>
                    </div>
                  </AccordionHeader>
                  <AccordionBody className="space-y-1">
                    {extensionSettings.map((link, index) => (
                      <NavLink
                        key={index}
                        to={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation(link.href, setIsSidebarOpen);
                        }}
                        className={({ isActive }) =>
                          `block text-base px-4 font-medium rounded-xl py-2.5 capitalize ${
                            isActive
                              ? "bg-fadedblue text-blue"
                              : "text-primary hover:bg-hover bg-main"
                          }`
                        }
                      >
                        <span className="pl-8">{link.name}</span>
                      </NavLink>
                    ))}
                  </AccordionBody>
                </Accordion>
              )}

              {/* Templates Dropdown */}
              {hasTemplatesPermission && (
                <Accordion
                  open={open === 9}
                  icon={<AccordionIcon id={9} open={open} />}
                  className="bg-main text-base"
                >
                  <AccordionHeader
                    onClick={(e) => handleOpen(9, e)}
                    className={`py-2.5 px-3 text-left text-base rounded-xl flex gap-2 items-center border-0 shadow-none ${
                      open === 9
                        ? "bg-fadedblue text-blue"
                        : "hover:bg-hover bg-main text-primary"
                    }`}
                    ref={accordionRefs[9]}
                  >
                    <div className="flex gap-4 items-center">
                      <span>
                        <MdOutlineEmail
                          size={22}
                          className={`${
                            open === 9 ? "text-blue" : "text-primary"
                          }`}
                        />
                      </span>
                      <span>Templates</span>
                    </div>
                  </AccordionHeader>
                  <AccordionBody className="space-y-1">
                    {templates.map((link, index) => (
                      <NavLink
                        key={index}
                        to={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation(link.href, setIsSidebarOpen);
                        }}
                        className={({ isActive }) =>
                          `block text-base px-4 font-medium rounded-xl py-2.5 capitalize ${
                            isActive
                              ? "bg-fadedblue text-blue"
                              : "text-primary hover:bg-hover bg-main"
                          }`
                        }
                      >
                        <span className="pl-8">{link.name}</span>
                      </NavLink>
                    ))}
                  </AccordionBody>
                </Accordion>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
