// //
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { token } = useAuth();
//   // const {profile,setting} = getProfile()
//   // profile.permissions
//   // bata konse route ke liye ja raha he
//   // notice route ke liye ja raha he
//   // user ke permissions me dekh ki usko permission he ya nahi
//   // agar he to aage bhej de
//   // nahi to unauthorized ka page dikha de

//   if (!token) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import useStore from "../state/store";

// const ProtectedRoute = ({ children }) => {
//   const { token } = useAuth();
//   const { admin } = useStore();
//   const location = useLocation();

//   if (!token) {
//     return <Navigate to="/" replace />;
//   }

//   // If admin data is still loading, return null or a loading spinner
//   if (!admin) {
//     return null; // or <LoadingSpinner />;
//   }

//   // Extract the base path (e.g., "plans" from "/plans/settings")
//   const basePath = location.pathname.split('/')[1] || 'dashboard';

//   // Check if the route exists in permissions
//   const routePermissions = admin.permissions?.[basePath];

//   // If the route is not in permissions, allow access (or redirect if preferred)
//   if (routePermissions === undefined) {
//     return children; // or <Navigate to="/dashboard" replace /> if you want to block unknown routes
//   }

//   // Check GET permission (explicitly check for false)
//   const hasPermission = routePermissions.GET !== false;

//   if (!hasPermission) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import useStore from "../state/store";

// Define route-to-permission mappings
const ROUTE_TO_PERMISSION_MAP = {
  // Main routes
  dashboard: "dashboard",
  companies: "companies",
  "company-users": "companies",
  plans: "plans",
  notices: "notices",
  documentation: "documentation",
  payments: "paymentRecord",
  "email-template": "email",
  coupons: "coupons",
  users: "user",
  "login-logs": "logs",
  "api-logs": "logs",
  "all-activity-logs": "logs",
  "email-logs": "logs",

  // Settings routes
  "brand-settings": "brand",
  "smtp-settings": "smtp",
  "payment-settings": "paymentSetting",
  "global-settings": "settings",
  "aws-settings": "aws",
  "role-management": "roles",
  "mailer-magix": "email",

  // Profile routes
  "admin-profile": "user",
  "user-profile": "user",

  // Add routes
  "add-plan": "plans",
  "add-notice": "notices",
  "documentation/add": "documentation",
  "add-user": "user",
  "add-company": "companies",
  "smtp-settings/add": "smtp",
  "aws-settings/add": "aws",
  "role-management/add": "roles",
  "coupons/add": "coupons",

  // Edit routes
  "notices/edit": "notices",
  "users/edit": "user",
  "edit-plan": "plans",
  "smtp-settings/edit": "smtp",
  "documentation/edit": "documentation",
  "aws-settings/edit": "aws",
  "role-management/edit": "roles",
  "edit-company": "companies",

  // View routes
  "notices/view": "notices",
  "admin-user-details": "user",
  "view-loginlog-details": "logs",
  "payments/view": "paymentRecord",
  "view-plan-details": "plans",
  "smtp-settings/view": "smtp",
  "aws-settings/view": "aws",
  "coupons/view": "coupons",
  "documentation/view": "documentation",
  "companies/view": "companies",
  "role-management/view": "roles",
  "api-logs/view": "api",
  "email-logs/view": "email",
  "view-forgot-password-details": "logs",

  // Special routes
  "change-admin-password": "user",
  "error-response": "settings",
};

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const { admin } = useStore();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!admin) {
    return null; // or <LoadingSpinner />
  }
  if (admin.isSuperAdmin) {
    return children;
  }

  const pathSegments = location.pathname.split("/").filter(Boolean);
  let basePath = pathSegments[0] || "dashboard";

  const permissionKey = ROUTE_TO_PERMISSION_MAP[basePath] || basePath;

  const dynamicRoutePatterns = ["edit-", "view-", "add-", "change-"];
  const isDynamicRoute = dynamicRoutePatterns.some((prefix) =>
    basePath.startsWith(prefix)
  );

  if (isDynamicRoute) {
    const resource = basePath
      .replace(/^(edit-|view-|add-|change-)/, "")
      .split("-")[0];
    basePath = ROUTE_TO_PERMISSION_MAP[resource] || resource;
  }

  let httpMethod = "GET";
  if (
    location.pathname.includes("/add-") ||
    location.pathname.includes("/change-")
  ) {
    httpMethod = "POST";
  } else if (location.pathname.includes("/edit-")) {
    httpMethod = "PUT";
  } else if (location.pathname.includes("/delete-")) {
    httpMethod = "DELETE";
  }

  const routePermissions = admin.permissions?.[permissionKey];
  const hasPermission = routePermissions?.[httpMethod] !== false;

  if (routePermissions === undefined) {
    return children;
  }

  if (!hasPermission) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
