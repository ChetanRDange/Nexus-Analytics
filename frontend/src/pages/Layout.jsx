import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useBrand } from "../BrandContext";
import AdminChangePassword from "../Components/AdminChangePassword";
import BulkInviteCompanySuccess from "../Components/BulkInviteCompanySuccess";
import ErrorResponse from "../Components/ErrorResponse";
import NoPlans from "../Components/NoPlans";
import ProtectedRoute from "../Components/ProtectedRoute";
import StructuredLayout from "../Components/StructuredLayout";
import UnableToLoad from "../Components/UnableToLoad";
import useFavicon from "../hooks/useFavicon";
import VuexyLayout from "./VuexyLayout";
import VuexyDashboard from "./VuexyDashboard";
import DataAnalyticsPage from "./DataAnalyticsPage";
import InsightsListPage from "./InsightsListPage";
import TopicAnalysisPage from "./TopicAnalysisPage";
import SourceAnalysisPage from "./SourceAnalysisPage";
import CountryAnalysisPage from "./CountryAnalysisPage";
import PESTLEAnalysisPage from "./PESTLEAnalysisPage";
import AdvancedChartsDashboard from "./AdvancedChartsDashboard";
import AnalyticsOverviewPage from "./AnalyticsOverviewPage";
import {
  OverviewDashboard,
  SectorAnalysisDashboard,
  RegionalAnalysisDashboard,
  TimelineAnalysisDashboard,
  PESTLEAnalysisDashboard
} from "./dashboards";
import APIDetails from "./APIDetails";
import APILogs from "./APILogs";
import AWSSettings from "./AWSSetting";
import ActivityDetails from "./ActivityDetails";
import ActivityLogs from "./ActivityLogs";
import AddAws from "./AddAws";
import AddBadge from "./AddBadge";
import AddCompany from "./AddCompany";
import AddCoupon from "./AddCoupon";
import AddDocument from "./AddDocument";
import AddEmailBlacklist from "./AddEmailBlacklist";
import AddFAQ from "./AddFAQ";
import AddIPBlacklist from "./AddIPBlacklist";
import AddNotice from "./AddNotice";
import AddPhoneBlacklist from "./AddPhoneBlacklist";
import AddPlan from "./AddPlan";
import AddRole from "./AddRole";
import AddSmtp from "./AddSmtp";
import AddUser from "./AddUser";
import AdminProfile from "./AdminProfile";
import AdvancedAccessLogs from "./AdvancedAccessLogs";
import AllLogs from "./AllLogs";
import BadgeManagement from "./BadgeManagement";
import BlacklistSettings from "./BlacklistSettings";
import BrandSettings from "./BrandSettings";
import ChangeForgotPassword from "./ChangeForgotPassword";
import ChangePassword from "./ChangePassword";
import Companies from "./Companies";
import Coupons from "./Coupons";
import CronDetails from "./CronDetails";
import CronLogs from "./CronLogs";
import DataBackupDetails from "./DataBackupDetails";
import DataBackupLogs from "./DataBackupLogs";
import DataBackupSetting from "./DataBackupSetting";
import DeleteConfirm from "./DeleteConfirm";
import Documentation from "./Documentation";
import EditAws from "./EditAWS";
import EditBadge from "./EditBadge";
import EditCompany from "./EditCompany";
import EditCoupon from "./EditCoupon";
import EditDocumentation from "./EditDocumentation";
import EditFAQManagement from "./EditFAQManagement";
import EditNotices from "./EditNotices";
import EditPlan from "./EditPlan";
import EditRole from "./EditRole";
import EditSMTP from "./EditSMTP";
import EditUser from "./EditUser";
import EmailBlacklist from "./EmailBlacklist";
import EmailReceivedDetails from "./EmailReceivedDetails";
import EmailReceivedLogs from "./EmailReceivedLogs";
import EmailStatusDetails from "./EmailStatusDetails";
import EmailStatusLogs from "./EmailStatusLogs";
import EmailTemplate from "./EmailTemplate";
import EmailVerification from "./EmailVerification";
import ErrorResponseMessage from "./ErrorResponseMessage";
import FAQManagement from "./FAQManagement";
import FactorAuthentication from "./FactorAuthentication";
import ForgotPassword from "./ForgotPassword";
import ForgotPasswordDetails from "./ForgotPasswordDetails";
import ForgotPasswordLogs from "./ForgotPasswordLogs";
import GlobalSettings from "./GlobalSettings";
import IPBlacklist from "./IPBlacklist";
import LocalizationSetting from "./LocalizationSetting";
import LogSetting from "./LogSetting";
import Login from "./Login";
import LoginLogs from "./LoginLogs";
import MagicLogsDetails from "./MagicLogsDetails";
import MailerMagix from "./MailerMagix";
import Notice from "./Notice";
import NoticeDetails from "./NoticeDetails";
import Payment from "./Payment";
import PaymentSettings from "./PaymentSettings";
import PendingReferrals from "./PendingReferrals";
import PersonalizationSettings from "./PersonalizationSettings";
import PhoneBlacklist from "./PhoneBlacklist";
import PlanFinder from "./PlanFinder";
import Plans from "./Plans";
import PusherSettings from "./PusherSettings";
import ReCaptchaSettings from "./ReCaptchaSettings";
import ReferralSetting2 from "./ReferralSetting2";
import ReferralTransaction from "./ReferralTransaction";
import Register1 from "./Register1";
import Register2 from "./Register2";
import ResendOTP from "./ResendOTP";
import ResetPassword from "./ResetPassword";
import RoleManagement from "./RoleManagement";
import SMSDetails from "./SMSDetails";
import SMSLogs from "./SMSLogs";
import SMTPSettings from "./SMTPSettings";
import Segments from "./Segments";
import SuccessErrorDetails from "./SuccessErrorDetails";
import SuccessErrorLogs from "./SuccessLogs";
import SuccessResponseMessages from "./SuccessResponseMessages";
import SupportLogsDetails from "./SupportLogsDetails";
import SystemOTPSettings from "./SystemOTPSettings";
import TwoFactAuth from "./TwoFactAuth";
import UserAcess from "./UserAcess";
import UserDetails from "./UserDetails";
import UserProfile from "./UserProfile";
import Users from "./Users";
import ViewAws from "./ViewAWS";
import ViewBadge from "./ViewBadge";
import ViewCompany from "./ViewCompany";
import ViewCoupon from "./ViewCoupon";
import ViewDocument from "./ViewDocument";
import ViewEmailBlacklist from "./ViewEmailBlacklist";
import ViewFAQManagement from "./ViewFAQManagement";
import ViewIPBlacklist from "./ViewIPBlacklist";
import ViewLoginLog from "./ViewLoginLog";
import ViewPayment from "./ViewPayment";
import ViewPhoneBlacklist from "./ViewPhoneBlacklist";
import ViewPlan from "./ViewPlan";
import ViewRole from "./ViewRole";
import ViewSmtp from "./ViewSmtp";
import ViewTemplate from "./ViewTemplate";
import EditTemplate from "./EditTemplate";
import EnterprisePlans from "./EnterprisePlans";
import CompanyUsers from "./CompanyUsers";
import EnterpriseRequests from "./EnterpriseRequests";
import ViewCompanyUser from "./ViewCompanyUser";
import EditCompanyUser from "./EditCompanyUser";
import ViewEnterpriseRequest from "./ViewEnterpriseRequest";
import EditEnterpriseRequest from "./EditEnterpriseRequest";
import NotFoundPage from "../Components/Missing";
import PaymentGatewayIntegrations from "./PaymentGatewayIntegrations";
import ResponseMsg from "./ResponseMsg";
import VersionControl from "./VersionControl";
import ViewVersionControl from "./ViewVersionControl";
import AddVersionControl from "./AddVersionControl";
import ViewResponseMessage from "./ViewResponseMessage";
import EditResponseMessage from "./EditResponseMessage";
import SuccessLogs from "./SuccessLogs";
import ErrorLogs from "./ErrorLogs";

const Layout = () => {
  const { isAuthenticated } = useAuth();
  const { brand } = useBrand();

  const setFavicon = useFavicon("/assets/images/leadmagixlogo.png");

  useEffect(() => {
    if (brand?.favIcon) {
      setFavicon(brand?.favIcon);
    }
  }, [brand?.favIcon]);

  return (
    <>
      <Routes>
        {/* Vuexy Dashboard Routes with new layout */}
        <Route element={<ProtectedRoute><VuexyLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<VuexyDashboard />} />
          <Route path="/analytics" element={<AnalyticsOverviewPage />} />
          <Route path="/crm" element={<AdvancedChartsDashboard />} />
          <Route path="/ecommerce" element={<VuexyDashboard />} />

          {/* New Dashboard Pages */}
          <Route path="/dashboard/overview" element={<OverviewDashboard />} />
          <Route path="/dashboard/sectors" element={<SectorAnalysisDashboard />} />
          <Route path="/dashboard/regions" element={<RegionalAnalysisDashboard />} />
          <Route path="/dashboard/timeline" element={<TimelineAnalysisDashboard />} />
          <Route path="/dashboard/pestle" element={<PESTLEAnalysisDashboard />} />
          <Route path="/dashboard/advanced" element={<AdvancedChartsDashboard />} />
          <Route path="/dashboard/analytics" element={<AnalyticsOverviewPage />} />

          {/* Data Analytics Routes */}
          <Route path="/data/region" element={<RegionalAnalysisDashboard />} />
          <Route path="/data/sector" element={<SectorAnalysisDashboard />} />
          <Route path="/data/topic" element={<TopicAnalysisPage />} />
          <Route path="/data/source" element={<SourceAnalysisPage />} />
          <Route path="/data/timeline" element={<TimelineAnalysisDashboard />} />
          <Route path="/data/pestle" element={<PESTLEAnalysisPage />} />
          <Route path="/data/all" element={<InsightsListPage />} />
          <Route path="/data/filter" element={<InsightsListPage />} />
          <Route path="/data/export" element={<DataAnalyticsPage />} />

          {/* Insights Routes */}
          <Route path="/insights/trends" element={<TimelineAnalysisDashboard />} />
          <Route path="/insights/predictions" element={<AdvancedChartsDashboard />} />
          <Route path="/insights/reports" element={<AnalyticsOverviewPage />} />

          {/* Geography Routes */}
          <Route path="/geo/map" element={<CountryAnalysisPage />} />
          <Route path="/geo/country" element={<CountryAnalysisPage />} />
          <Route path="/geo/region" element={<RegionalAnalysisDashboard />} />

          {/* Advanced Charts Routes */}
          <Route path="/charts/advanced" element={<AdvancedChartsDashboard />} />
          <Route path="/charts/nivo" element={<AdvancedChartsDashboard />} />
        </Route>

        <Route
          path="/"
          element={isAuthenticated ? <Navigate to={"/dashboard"} /> : <Login />}
        />
        <Route
          path="/factor-auth"
          element={
            isAuthenticated ? (
              <Navigate to={"/dashboard"} />
            ) : (
              <FactorAuthentication />
            )
          }
        />
        <Route
          path="/change-password"
          element={
            isAuthenticated ? (
              <Navigate to={"/dashboard"} />
            ) : (
              <ChangePassword />
            )
          }
        />
        <Route
          path="/change-forgot-password"
          element={
            isAuthenticated ? (
              <Navigate to={"/dashboard"} />
            ) : (
              <ChangeForgotPassword />
            )
          }
        />
        <Route
          element={
            <ProtectedRoute>
              <StructuredLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/companies" element={<Companies />} />
          <Route path="/company-users" element={<CompanyUsers />} />
          <Route
            path="/company-user-details/:id"
            element={<ViewCompanyUser />}
          />
          <Route path="/edit-company-user/:id" element={<EditCompanyUser />} />
          <Route path="/normal-plans" element={<Plans />} />
          <Route path="/enterprise-requests" element={<EnterpriseRequests />} />
          <Route path="/response-messages" element={<ResponseMsg />} />
          <Route
            path="/response-message/view/:key"
            element={<ViewResponseMessage />}
          />
          <Route
            path="/response-message/edit/:key"
            element={<EditResponseMessage />}
          />
          <Route
            path="/view-enterprise-request"
            element={<ViewEnterpriseRequest />}
          />
          <Route
            path="/edit-enterprise-request"
            element={<EditEnterpriseRequest />}
          />
          <Route path="/enterprise-plans" element={<EnterprisePlans />} />
          <Route path="/add-version-control" element={<AddVersionControl />} />
          <Route
            path="/view-version-control/:id"
            element={<ViewVersionControl />}
          />
          <Route path="/version-control" element={<VersionControl />} />
          <Route path="/notices" element={<Notice />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/payments" element={<Payment />} />
          <Route path="/email-template" element={<EmailTemplate />} />
          <Route path="/email-template/view/:id" element={<ViewTemplate />} />
          <Route path="/email-template/edit/:id" element={<EditTemplate />} />
          <Route path="/segments" element={<Segments />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/badge-management" element={<BadgeManagement />} />
          <Route path="/faq-management" element={<FAQManagement />} />
          <Route path="/notices/edit/:noticeId" element={<EditNotices />} />
          <Route path="/notices/view/:noticeId" element={<NoticeDetails />} />
          <Route path="/admin-users" element={<Users />} />
          <Route path="/edit-admin-user/:userId" element={<EditUser />} />
          <Route path="/add-plan/:id?" element={<AddPlan />} />
          <Route path="/notices/add/:id?" element={<AddNotice />} />
          <Route path="/documentation/add/:id?" element={<AddDocument />} />
          <Route path="/add-admin-user" element={<AddUser />} />
          <Route path="/admin-user-details/:userId" element={<UserDetails />} />
          <Route
            path="/change-admin-password"
            element={<AdminChangePassword />}
          />
          <Route path="/view-loginlog-details" element={<ViewLoginLog />} />
          <Route
            path="/payments/view/:paymentRecordId"
            element={<ViewPayment />}
          />
          <Route path="/edit-plan/:planId" element={<EditPlan />} />
          <Route path="/smtp-settings/edit/:smtpId" element={<EditSMTP />} />
          <Route
            path="/documentation/edit/:documentId"
            element={<EditDocumentation />}
          />
          <Route path="/aws-settings/edit/:awsId" element={<EditAws />} />
          <Route path="/role-management/edit/:roleId" element={<EditRole />} />
          <Route path="/edit-badge/:badgeId" element={<EditBadge />} />
          <Route path="/coupons/edit/:couponId" element={<EditCoupon />} />
          <Route
            path="edit-faq-management/:faqId"
            element={<EditFAQManagement />}
          />
          <Route path="/view-plan-details/:planId" element={<ViewPlan />} />
          <Route path="/smtp-settings/view/:smtpId" element={<ViewSmtp />} />
          <Route path="/aws-settings/view/:awsId" element={<ViewAws />} />
          <Route path="/coupons/view/:couponId" element={<ViewCoupon />} />
          <Route
            path="/documentation/view/:documentId"
            element={<ViewDocument />}
          />
          <Route
            path="/view-emailblacklist-details"
            element={<ViewEmailBlacklist />}
          />
          <Route
            path="/view-phoneblacklist-details"
            element={<ViewPhoneBlacklist />}
          />
          <Route
            path="/view-ipblacklist-details"
            element={<ViewIPBlacklist />}
          />
          <Route path="/view-badge-details/:badgeId" element={<ViewBadge />} />
          <Route
            path="/companies-success"
            element={<BulkInviteCompanySuccess />}
          />
          <Route path="/companies/add" element={<AddCompany />} />
          {/* <Route path="/referral-setting" element={<ReferralSetting />} /> */}
          <Route path="/referral-setting" element={<ReferralSetting2 />} />
          <Route path="/edit-company/:companyId" element={<EditCompany />} />
          <Route path="/error-response" element={<ErrorResponse />} />
          <Route path="/smtp-settings/add" element={<AddSmtp />} />
          <Route path="/add-email-blacklist" element={<AddEmailBlacklist />} />
          <Route path="/add-phone-blacklist" element={<AddPhoneBlacklist />} />
          <Route path="/add-ip-blacklist" element={<AddIPBlacklist />} />
          <Route path="/aws-settings/add" element={<AddAws />} />
          <Route path="/role-management/add" element={<AddRole />} />
          <Route path="/add-badge" element={<AddBadge />} />
          <Route path="/add-faq" element={<AddFAQ />} />
          <Route path="/coupons/add/:id?" element={<AddCoupon />} />
          <Route
            path="/referral-transaction"
            element={<ReferralTransaction />}
          />
          <Route path="/pending-referral" element={<PendingReferrals />} />
          <Route path="/unable-to-load" element={<UnableToLoad />} />
          <Route path="/no-plans" element={<NoPlans />} />
          <Route path="/delete-confirm" element={<DeleteConfirm />} />
          <Route path="/login-logs" element={<LoginLogs />} />
          <Route path="/login-logs/view/:id" element={<APIDetails />} />
          <Route path="/companies/view/:companyId" element={<ViewCompany />} />
          <Route path="/role-management/view/:roleId" element={<ViewRole />} />
          <Route path="/api-logs/view/:id" element={<APIDetails />} />
          <Route path="/view-sms-details" element={<SMSDetails />} />
          <Route path="/view-activity-details" element={<ActivityDetails />} />
          {/* <Route
            path="/view-all-details/:allLogId"
            element={<AllLogsDetails />}
          /> */}
          <Route
            path="/email-logs/view/:emailId"
            element={<EmailStatusDetails />}
          />
          <Route path="/view-cron-details" element={<CronDetails />} />
          <Route
            path="/view-faq-management-details/:faqId"
            element={<ViewFAQManagement />}
          />
          <Route
            path="/view-forgot-password-details/:forgotPasswordId"
            element={<ForgotPasswordDetails />}
          />
          <Route
            path="/view-data-backup-details"
            element={<DataBackupDetails />}
          />
          <Route
            path="/view-success-error-details"
            element={<SuccessErrorDetails />}
          />
          <Route
            path="/view-email-received-details"
            element={<EmailReceivedDetails />}
          />
          <Route
            path="/view-magic-logs-details"
            element={<MagicLogsDetails />}
          />
          <Route
            path="/view-support-logs-details"
            element={<SupportLogsDetails />}
          />
          <Route path="/api-logs" element={<APILogs />} />
          <Route path="/sms-logs" element={<SMSLogs />} />
          <Route path="/activity-logs" element={<ActivityLogs />} />
          <Route path="/all-activity-logs" element={<AllLogs />} />
          <Route path="/email-logs" element={<EmailStatusLogs />} />
          <Route path="/cron-logs" element={<CronLogs />} />
          <Route
            path="/forgot-password-logs"
            element={<ForgotPasswordLogs />}
          />
          <Route path="/data-backup-logs" element={<DataBackupLogs />} />
          <Route path="/success-logs" element={<SuccessLogs />} />
          <Route path="/success-logs/view/:id" element={<APIDetails />} />
          <Route path="/error-logs" element={<ErrorLogs />} />
          <Route path="/error-logs/view/:id" element={<APIDetails />} />
          <Route path="/email-received-logs" element={<EmailReceivedLogs />} />
          <Route
            path="/advanced-access-logs"
            element={<AdvancedAccessLogs />}
          />
          <Route
            path="/error-response-message"
            element={<ErrorResponseMessage />}
          />
          <Route
            path="/success-response-message"
            element={<SuccessResponseMessages />}
          />
          <Route path="/profile" element={<AdminProfile />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/brand-settings" element={<BrandSettings />} />
          <Route path="/smtp-settings" element={<SMTPSettings />} />
          <Route path="/payment-settings" element={<PaymentSettings />} />
          <Route
            path="/payment-settings/:gatewayKey"
            element={<PaymentGatewayIntegrations />}
          />
          <Route path="/pusher-settings" element={<PusherSettings />} />
          <Route path="/recaptcha-settings" element={<ReCaptchaSettings />} />
          <Route path="/mailer-magix" element={<MailerMagix />} />
          <Route path="/global-settings" element={<GlobalSettings />} />
          <Route path="/aws-settings" element={<AWSSettings />} />
          <Route
            path="/localization-settings"
            element={<LocalizationSetting />}
          />
          <Route
            path="/user-access-security-settings"
            element={<UserAcess />}
          />
          <Route path="/system-otp-settings" element={<SystemOTPSettings />} />
          <Route path="/log-settings" element={<LogSetting />} />
          <Route path="/data-backup-settings" element={<DataBackupSetting />} />
          <Route path="/role-management" element={<RoleManagement />} />
          <Route
            path="/personalization-settings"
            element={<PersonalizationSettings />}
          />
          <Route path="/blacklist-settings" element={<BlacklistSettings />} />
          <Route path="/plan-finder" element={<PlanFinder />} />
          <Route path="/email-blacklist" element={<EmailBlacklist />} />
          <Route path="/phone-blacklist" element={<PhoneBlacklist />} />
          <Route path="/ip-blacklist" element={<IPBlacklist />} />
        </Route>
        <Route path="/welcome" element={<Register1 />} />
        <Route path="/register" element={<Register2 />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<ResendOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/two-fact-auth" element={<TwoFactAuth />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default Layout;
