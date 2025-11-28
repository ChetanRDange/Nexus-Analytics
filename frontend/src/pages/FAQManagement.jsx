import React, { useState, useNavigate } from "react";
import Add from "../assets/svgs/add.svg";
import Download from "../assets/svgs/download.svg";
import SuccessIcon from "../assets/svgs/success-icon.svg";
import { Link } from "react-router-dom";
import ImportCompaniesModal from "../Components/ImportCompaniesModal";
import DynamicTableComponent from "../Components/DynamicTableComponent";
import InvitationSuccessModal from "../Components/InvitationSuccessModal";
import DeleteConfirm from "./DeleteConfirm";
import { IoMdAdd } from "react-icons/io";
import NewTable from "../Components/NewTable";
import BulkTable from "../Components/BulkTable";
import formatDateTime from "../utils/DateFormat";
import { getFaqSampleData } from "../utils/SampleFileData";

const statuses = [
  {
    id: 0,
    name: "Active",
    searchBy: "status",
    bgColor: "#ECFDF3",
    color: "#027948",
    dotColor: "#12B76A",
  },
  {
    id: 1,
    name: "Inactive",
    searchBy: "status",
    bgColor: "#F2F4F7",
    color: "#344054",
    dotColor: "#667085",
  },
];

const badgeData = [
  {
    SrNo: "001",
    id: "0",
    FAQ_ID: "2564",
    category: "General",
    question: "How to sign up?",
    answer: "Go to sign-up page...",
    tags: "Registration, signup",
    priority: "High",
    visibility: "Public",
    keywords: "signup, register",
    statusFAQ: "Active",
    createdBy: "Admin",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
    featured: "Yes",
  },
  {
    SrNo: "002",
    id: "1",
    FAQ_ID: "2564",
    category: "Payments",
    question: "Can I get a refund?",
    answer: "Yes, if requested...",
    tags: "Payment Issues",
    priority: "Low",
    visibility: "Public",
    keywords: "refund, payment",
    statusFAQ: "Inactive",
    createdBy: "Editor",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
    featured: "Yes",
  },
  {
    SrNo: "003",
    id: "2",
    FAQ_ID: "2564",
    category: "Account",
    question: "How to change password?",
    answer: "Go to profile settings...",
    tags: "Security",
    priority: "Medium",
    visibility: "Admin Only",
    keywords: "password, reset",
    statusFAQ: "Active",
    createdBy: "Admin",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
    featured: "Yes",
  },
  {
    SrNo: "004",
    id: "3",
    FAQ_ID: "2564",
    category: "Account",
    question: "How to delete my account?",
    answer: "Send a request to...",
    tags: "Security",
    priority: "High",
    visibility: "Admin Only",
    keywords: "delete, account",
    statusFAQ: "Active",
    createdBy: "User",
    updatedBy: "User",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
    featured: "Yes",
  },
  {
    SrNo: "005",
    id: "4",
    FAQ_ID: "2564",
    category: "Billing",
    question: "How to view my invoices?",
    answer: "Visit the billing...",
    tags: "Billing",
    priority: "Medium",
    visibility: "Admin Only",
    keywords: "invoice, billing",
    statusFAQ: "Active",
    createdBy: "Admin",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
    featured: "Yes",
  },
  {
    SrNo: "006",
    id: "5",
    FAQ_ID: "2564",
    category: "Billing",
    question: "What payment methods are accepted?",
    answer: "We accept credit...",
    tags: "Payment",
    priority: "Low",
    visibility: "Public",
    keywords: "payment, methods",
    statusFAQ: "Inactive",
    createdBy: "User",
    updatedBy: "User",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
    featured: "Yes",
  },
  {
    SrNo: "007",
    id: "6",
    FAQ_ID: "2564",
    category: "Security",
    question: "What to do if I forget my password?",
    answer: "Use the forgot...",
    tags: "Security",
    priority: "High",
    visibility: "Admin Only",
    keywords: "password, forget",
    statusFAQ: "Active",
    createdBy: "Admin",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
    featured: "Yes",
  },
  {
    SrNo: "008",
    id: "7",
    FAQ_ID: "2564",
    category: "Support",
    question: "How to contact support?",
    answer: "Email us at...",
    tags: "Support",
    priority: "Medium",
    visibility: "Public",
    keywords: "contact, support",
    statusFAQ: "Active",
    createdBy: "User",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
    featured: "Yes",
  },
  {
    SrNo: "009",
    id: "8",
    FAQ_ID: "2564",
    category: "Product",
    question: "What are the main features?",
    answer: "Our product offers...",
    tags: "Product Info",
    priority: "Medium",
    visibility: "Admin Only",
    keywords: "features, product",
    statusFAQ: "Inactive",
    createdBy: "Admin",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
    featured: "Yes",
  },
  {
    SrNo: "010",
    id: "9",
    FAQ_ID: "2564",
    category: "Account",
    question: "How to change my email address?",
    answer: "Go to profile...",
    tags: "Profile",
    priority: "Low",
    visibility: "Public",
    keywords: "email, change",
    statusFAQ: "Active",
    createdBy: "User",
    updatedBy: "User",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
    featured: "Yes",
  },
  {
    SrNo: "011",
    id: "10",
    FAQ_ID: "2564",
    category: "Payments",
    question: "How to upgrade my plan?",
    answer: "Visit the plans...",
    tags: "Upgrade, subscription",
    priority: "High",
    visibility: "Admin Only",
    keywords: "upgrade, subscription",
    statusFAQ: "Inactive",
    createdBy: "Admin",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
    featured: "Yes",
  },
  {
    SrNo: "012",
    id: "11",
    FAQ_ID: "2564",
    category: "General",
    question: "App not loading. What should I do?",
    answer: "Restart the app...",
    tags: "Issues",
    priority: "Low",
    visibility: "Admin Only",
    keywords: "troubleshooting",
    statusFAQ: "Active",
    createdBy: "Admin",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
    featured: "Yes",
  },
  {
    SrNo: "013",
    id: "12",
    FAQ_ID: "2564",
    category: "General",
    question: "How is my data secured?",
    answer: "We use encryption...",
    tags: "Security",
    priority: "High",
    visibility: "Public",
    keywords: "privacy, data",
    statusFAQ: "Inactive",
    createdBy: "Admin",
    updatedBy: "User",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
    featured: "Yes",
  },
  {
    SrNo: "014",
    id: "13",
    FAQ_ID: "2564",
    category: "Support",
    question: "How to request feature support?",
    answer: "Submit a ticket...",
    tags: "Feature request",
    priority: "Medium",
    visibility: "Admin Only",
    keywords: "feature request",
    statusFAQ: "Active",
    createdBy: "Admin",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
    featured: "Yes",
  },
  {
    SrNo: "015",
    id: "14",
    FAQ_ID: "2564",
    category: "Product",
    question: "Is the product available on iOS?",
    answer: "Yes, on App Store...",
    tags: "Compatibility, iOS",
    priority: "High",
    visibility: "Public",
    keywords: "compatibility, iOS",
    statusFAQ: "Inactive",
    createdBy: "User",
    updatedBy: "User",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
    featured: "Yes",
  },
  {
    SrNo: "016",
    id: "15",
    FAQ_ID: "2564",
    category: "Payments",
    question: "How to apply for a refund?",
    answer: "Visit the refund...",
    tags: "Refund, Billing",
    priority: "Low",
    visibility: "Public",
    keywords: "refund, billing",
    statusFAQ: "Active",
    createdBy: "Admin",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
    featured: "Yes",
  },
  {
    SrNo: "017",
    id: "16",
    FAQ_ID: "2564",
    category: "General",
    question: "How often is the product updated?",
    answer: "We release updates...",
    tags: "Updates, Product",
    priority: "Medium",
    visibility: "Admin Only",
    keywords: "updates, product",
    statusFAQ: "Inactive",
    createdBy: "User",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
    featured: "Yes",
  },
  {
    SrNo: "018",
    id: "17",
    FAQ_ID: "2564",
    category: "Security",
    question: "Why is my account blocked?",
    answer: "Contact support...",
    tags: "Account Blocked",
    priority: "High",
    visibility: "Public",
    keywords: "account blocked",
    statusFAQ: "Active",
    createdBy: "Admin",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
    featured: "Yes",
  },
  {
    SrNo: "019",
    id: "18",
    FAQ_ID: "2564",
    category: "Security",
    question: "How to enable 2FA?",
    answer: "Go to security...",
    tags: "Security",
    priority: "Low",
    visibility: "Admin Only",
    keywords: "2FA, security",
    statusFAQ: "Inactive",
    createdBy: "Admin",
    updatedBy: "User",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
    featured: "Yes",
  },
  {
    SrNo: "020",
    id: "19",
    FAQ_ID: "2564",
    category: "General",
    question: "What is your privacy policy?",
    answer: "View our privacy...",
    tags: "Privacy",
    priority: "High",
    visibility: "Public",
    keywords: "privacy policy",
    statusFAQ: "Active",
    createdBy: "Admin",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
    featured: "Yes",
  },
];

const newbadgeData = [
  {
    SrNo: "001",
    id: "0",
    FAQ_ID: "",
    category: "",
    question: "How to sign up?",
    answer: "Go to sign-up page...",
    tags: "Registration, signup",
    priority: "High",
    visibility: "Public",
    keywords: "signup, register",
    statusFAQ: "Active",
    createdBy: "Admin",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
  },
  {
    SrNo: "002",
    id: "1",
    FAQ_ID: "2564",
    category: "",
    question: "Can I get a refund?",
    answer: "Yes, if requested...",
    tags: "Payment Issues",
    priority: "Low",
    visibility: "Public",
    keywords: "refund, payment",
    statusFAQ: "Inactive",
    createdBy: "Editor",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
  },
  {
    SrNo: "003",
    id: "2",
    FAQ_ID: "",
    category: "Account",
    question: "How to change password?",
    answer: "Go to profile settings...",
    tags: "Security",
    priority: "Medium",
    visibility: "Admin Only",
    keywords: "password, reset",
    statusFAQ: "Active",
    createdBy: "Admin",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
  },
  {
    SrNo: "004",
    id: "3",
    FAQ_ID: "2564",
    category: "",
    question: "How to delete my account?",
    answer: "Send a request to...",
    tags: "Security",
    priority: "High",
    visibility: "Admin Only",
    keywords: "delete, account",
    statusFAQ: "Active",
    createdBy: "User",
    updatedBy: "User",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
  },
  {
    SrNo: "005",
    id: "4",
    FAQ_ID: "",
    category: "Billing",
    question: "How to view my invoices?",
    answer: "Visit the billing...",
    tags: "",
    priority: "Medium",
    visibility: "Admin Only",
    keywords: "invoice, billing",
    statusFAQ: "Active",
    createdBy: "Admin",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
  },
  {
    SrNo: "006",
    id: "5",
    FAQ_ID: "2564",
    category: "",
    question: "What payment methods are accepted?",
    answer: "We  credit...",
    tags: "Payment",
    priority: "Low",
    visibility: "Public",
    keywords: "payment, methods",
    statusFAQ: "Inactive",
    createdBy: "User",
    updatedBy: "User",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
  },
  {
    SrNo: "007",
    id: "6",
    FAQ_ID: "2564",
    category: "",
    question: "What to do if I forget my password?",
    answer: "Use the forgot...",
    tags: "Security",
    priority: "High",
    visibility: "Admin Only",
    keywords: "password, forget",
    statusFAQ: "Active",
    createdBy: "Admin",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
  },
  {
    SrNo: "008",
    id: "7",
    FAQ_ID: "2564",
    category: "Support",
    question: "How to contact support?",
    answer: "Email us at...",
    tags: "Support",
    priority: "Medium",
    visibility: "Public",
    keywords: "contact, support",
    statusFAQ: "Active",
    createdBy: "User",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
  },
  {
    SrNo: "009",
    id: "8",
    FAQ_ID: "2564",
    category: "Product",
    question: "What are the main features?",
    answer: "Our product offers...",
    tags: "Product Info",
    priority: "Medium",
    visibility: "Admin Only",
    keywords: "features, product",
    statusFAQ: "Inactive",
    createdBy: "Admin",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
  },
  {
    SrNo: "010",
    id: "9",
    FAQ_ID: "2564",
    category: "Account",
    question: "How to change my email address?",
    answer: "Go to profile...",
    tags: "Profile",
    priority: "Low",
    visibility: "Public",
    keywords: "email, change",
    statusFAQ: "Active",
    createdBy: "User",
    updatedBy: "User",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
  },
  {
    SrNo: "011",
    id: "10",
    FAQ_ID: "2564",
    category: "",
    question: "How to upgrade my plan?",
    answer: "Visit the plans...",
    tags: "Upgrade, subscription",
    priority: "High",
    visibility: "Admin Only",
    keywords: "upgrade, subscription",
    statusFAQ: "Inactive",
    createdBy: "Admin",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
  },
  {
    SrNo: "012",
    id: "11",
    FAQ_ID: "2564",
    category: "General",
    question: "App not loading. What should I do?",
    answer: "Restart the app...",
    tags: "Issues",
    priority: "Low",
    visibility: "Admin Only",
    keywords: "troubleshooting",
    statusFAQ: "Active",
    createdBy: "Admin",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
  },
  {
    SrNo: "013",
    id: "12",
    FAQ_ID: "2564",
    category: "",
    question: "How is my data secured?",
    answer: "We use encryption...",
    tags: "Security",
    priority: "High",
    visibility: "Public",
    keywords: "privacy, data",
    statusFAQ: "Inactive",
    createdBy: "Admin",
    updatedBy: "User",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
  },
  {
    SrNo: "014",
    id: "13",
    FAQ_ID: "2564",
    category: "Support",
    question: "How to request feature support?",
    answer: "Submit a ticket...",
    tags: "Feature request",
    priority: "Medium",
    visibility: "Admin Only",
    keywords: "feature request",
    statusFAQ: "Active",
    createdBy: "Admin",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
  },
  {
    SrNo: "015",
    id: "14",
    FAQ_ID: "2564",
    category: "Product",
    question: "Is the product available on iOS?",
    answer: "Yes, on App Store...",
    tags: "",
    priority: "High",
    visibility: "Public",
    keywords: "compatibility, iOS",
    statusFAQ: "Inactive",
    createdBy: "User",
    updatedBy: "User",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
  },
  {
    SrNo: "016",
    id: "15",
    FAQ_ID: "2564",
    category: "Payments",
    question: "How to apply for a refund?",
    answer: "Visit the refund...",
    tags: "Refund, Billing",
    priority: "Low",
    visibility: "Public",
    keywords: "refund, billing",
    statusFAQ: "Active",
    createdBy: "Admin",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
  },
  {
    SrNo: "017",
    id: "16",
    FAQ_ID: "2564",
    category: "",
    question: "How often is the product updated?",
    answer: "We release updates...",
    tags: "Updates, Product",
    priority: "Medium",
    visibility: "Admin Only",
    keywords: "updates, product",
    statusFAQ: "Inactive",
    createdBy: "User",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
  },
  {
    SrNo: "018",
    id: "17",
    FAQ_ID: "2564",
    category: "Security",
    question: "Why is my account blocked?",
    answer: "Contact support...",
    tags: "Account Blocked",
    priority: "High",
    visibility: "Public",
    keywords: "account blocked",
    statusFAQ: "Active",
    createdBy: "Admin",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
  },
  {
    SrNo: "019",
    id: "18",
    FAQ_ID: "2564",
    category: "Security",
    question: "How to enable 2FA?",
    answer: "Go to security...",
    tags: "Security",
    priority: "Low",
    visibility: "Admin Only",
    keywords: "2FA, security",
    statusFAQ: "Inactive",
    createdBy: "Admin",
    updatedBy: "User",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
  },
  {
    SrNo: "020",
    id: "19",
    FAQ_ID: "2564",
    category: "General",
    question: "What is your privacy policy?",
    answer: "View our privacy...",
    tags: "Privacy",
    priority: "High",
    visibility: "Public",
    keywords: "privacy policy",
    statusFAQ: "Active",
    createdBy: "Admin",
    updatedBy: "Admin",
    createdDate: "22-08-2024, 02.00 AM",
    updatedDate: "22-09-2024, 02.00 AM",
  },
];

const defaultColumns = [
  {
    Header: "FAQ ID",
    searchable: true,
    accessor: "faqId",
    render: (value) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
    isMandatory: true,
  },
  {
    Header: "Category",
    searchable: true,
    accessor: "category",
    render: (value) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
    isMandatory: true,
  },
  {
    Header: "Question",
    searchable: true,
    accessor: "question",
    render: (value) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
    isMandatory: true,
  },
  {
    Header: "Answer",
    searchable: true,
    accessor: "answer",
    render: (value) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
    isMandatory: true,
  },
  {
    Header: "Tags",
    searchable: true,
    accessor: "tags",
    render: (value) =>
      value ? (
        value?.map((item) => (
          <span className="w-full text-center bg-fadedblue text-darkblue  px-2 py-1 rounded-lg">
            {item}
          </span>
        ))
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Priority",
    searchable: true,
    accessor: "priority",
    render: (value) => {
      const priorityStyles = {
        High: "bg-[#FEF3F2] text-[#B32318]",
        Medium: "bg-[#F0FAF2] text-[#F1C21B]",
        Low: "bg-[#F2F4F7] text-primary",
      };

      const priorityColors = {
        High: "#B32318",
        Medium: "#F1C21B",
        Low: "#667085",
      };

      return (
        <div
          className={`rounded-xl ${priorityStyles[value]} px-2 py-1 w-fit flex gap-2 items-center`}
        >
          <span
            className="min-w-[8px] min-h-[8px] rounded-full"
            style={{ backgroundColor: priorityColors[value] }}
          ></span>
          <span>{value}</span>
        </div>
      );
    },
    isMandatory: true,
  },
  {
    Header: "Visibility",
    searchable: true,
    accessor: "visibility",
    render: (value) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Keywords",
    searchable: true,
    accessor: "keywords",
    render: (value) =>
      value ? (
        value?.map((item, index) => <p key={index}>{item}</p>)
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Status",
    searchable: true,
    accessor: "status",
    render: (value) => {
      const statusStyles = {
        Inactive: "bg-[#F2F4F7] text-primary",
        Active: "bg-[#ECFDF3] text-[#027948]",
      };
      const statusColors = {
        Inactive: "#667085",
        Active: "#12B76A",
      };

      return (
        <div
          className={`rounded-xl ${statusStyles[value]} px-2 py-1 w-fit flex gap-2 items-center`}
        >
          <span
            className="min-w-[8px] min-h-[8px] rounded-full"
            style={{ backgroundColor: statusColors[value] }}
          ></span>
          <span>{value}</span>
        </div>
      );
    },
  },
  {
    Header: "Created By",
    accessor: "createdBy",
    render: (value) =>
      value ? (
        value?.name
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Updated By",
    accessor: "updatedBy",
  },
  {
    Header: "Created Date",
    accessor: "createdAt",
    render: (value) =>
      value ? (
        formatDateTime(value)
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Updated Date",
    accessor: "updatedAt",
    render: (value) =>
      value ? (
        formatDateTime(value)
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
];

const categories = [
  {
    id: 0,
    name: "Company Id",
  },
  {
    id: 1,
    name: "Company Size",
  },
  {
    id: 2,
    name: "Latest Payment",
  },
  {
    id: 3,
    name: "Plan Expiry Date",
  },
  {
    id: 4,
    name: "Status",
  },
];

const bulkColumns = [
  {
    Header: "FAQ ID",
    key: "faqId",
    required: false, // Not required as it might be auto-generated
  },
  {
    Header: "Category",
    key: "category",
    required: true,
  },
  {
    Header: "Question",
    key: "question",
    required: true,
  },
  {
    Header: "Answer",
    key: "answer",
    required: true,
  },
  {
    Header: "Keywords",
    key: "keywords",
    required: false,
  },
  {
    Header: "Status",
    key: "status",
    required: false,
  },
  {
    Header: "Visibility",
    key: "visibility",
    required: false,
  },
  {
    Header: "Featured",
    key: "featured",
    required: false,
  },
  {
    Header: "Tags",
    key: "tags",
    required: false,
  },
  {
    Header: "Priority",
    key: "priority",
    required: false,
  },
  // {
  //   Header: "Created By",
  //   key: "createdBy",
  //   required: false,
  // },
  {
    Header: "Updated By",
    key: "updatedBy",
    required: false,
  },
];

const schemaMapping = {
  faqId: "faqId",
  category: "category",
  question: "question",
  answer: "answer",
  keywords: "keywords",
  status: "status",
  visibility: "visibility",
  featured: "featured",
  tags: "tags",
  priority: "priority",
  createdBy: "createdBy",
  updatedBy: "updatedBy",
};

const FAQManagement = () => {
  const [successImportModal, setSuccessImportModal] = useState(false);
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const [isInviteSentModalOpen, setIsInviteSentModalOpen] = useState(false);
  const [fileImportedData, setFileImportedData] = useState([]);
  const [isFileImported, setIsFileImported] = useState(false);

  const [isImportCompanyModalOpen, setIsImportCompanyModalOpen] =
    useState(false);
  const [isImportSuccess, setIsImportSuccess] = useState(false);
  const handleSelectionChange = (selectedIds) => {
    console.log("Selected IDs:", selectedIds);
  };
  if (isImportSuccess) {
    console.log("Success");
  }
  const openImportModal = () => {
    setIsImportCompanyModalOpen(true);
  };

  const tableMetaData = {
    model: "Badge",
    endpoint: "/private/faqs",
    viewPath: "view-faq-management-details",
    editPath: "edit-faq-management",
    bulkImport: true,
    showDeleteAll: true,
    deleteField: "faqId",
  };

  return (
    <>
      <ImportCompaniesModal
        isImportCompanyModalOpen={isImportCompanyModalOpen}
        setIsImportCompanyModalOpen={setIsImportCompanyModalOpen}
        heading="FAQ Management"
        successImportModal={successImportModal}
        setSuccessImportModal={setSuccessImportModal}
      />
      <InvitationSuccessModal
        isInviteSuccessModalOpen={successImportModal}
        setIsInviteSuccessModalOpen={setSuccessImportModal}
        title="FAQ Added Successfully!"
        para="200 FAQ have been add."
        navigation="/faq-management"
        SuccessIcon={SuccessIcon}
        setIsImportSuccess={setIsImportSuccess}
      />
      <div className="min-h-screen py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
        <div className=" w-full">
          <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
            <div className="">
              <h4 className="text-3xl text-dark">FAQ Management</h4>
            </div>
            <div className="w-full flex justify-end sm:w-fit">
              <Link
                id="add-faq"
                to="/add-faq"
                className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-primarydark text-white"
              >
                {/* <img src={Add} alt="Add" /> */}
                <IoMdAdd size={22} />
                <span className="hidden md:block">Add FAQ</span>
              </Link>
            </div>
          </div>
          {/* {isImportSuccess && (
            <div className="flex flex-col border border-primary my-8 rounded-xl">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full align-middle">
                  <div className="w-full flex flex-col-reverse sm:flex-row flex-wrap gap-y-4 justify-between px-6 ptpb-4 border-b border-primary">
                    <div className="flex gap-1 flex-col justify-start">
                      <h3 className="text-lg font-semibold">
                        10 records couldn’t be added.
                      </h3>
                      <p className="text-secondary font-normal">
                        We couldn’t add these records due to invalid format or
                        missing data.
                      </p>
                    </div>
                    <DeleteConfirm
                      isInviteSentModalOpen={isInviteSentModalOpen}
                      setIsInviteSentModalOpen={setIsInviteSentModalOpen}
                    />
                    <div className="w-full xl:w-fit flex flex-wrap sm:flex-nowrap justify-end gap-2 items-center">
                      <button className="w-[100px] sm:w-fit text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-1.5 sm:py-2 px-2 sm:px-3 whitespace-nowrap flex gap-2" id="button-219">
                        <img src={Download} alt="Download" />
                        <span>Export & Fix</span>
                      </button>
                    </div>
                  </div>
                  <DynamicTableComponent
                    columns={defaultColumns}
                    data={newbadgeData}
                    selectable={true}
                    onSelectChange={handleSelectionChange}
                    actions={true}
                  />
                </div>
              </div>
            </div>
          )} */}
          {isFileImported && (
            // <div className="flex flex-col border border-primary my-8 rounded-xl">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full align-middle">
                <DeleteConfirm
                  isInviteSentModalOpen={isInviteSentModalOpen}
                  setIsInviteSentModalOpen={setIsInviteSentModalOpen}
                />
                <BulkTable
                  bulkendpoint="/faqs/bulk"
                  defaultColumns={bulkColumns}
                  data={fileImportedData}
                  schemaMapping={schemaMapping}
                  setIsFileImported={setIsFileImported}
                />
              </div>
            </div>
            // </div>
          )}
          {/* <div className="flex flex-col border border-primary my-8 rounded-xl"> */}
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              {!isFileImported && (
                <NewTable
                  columns={defaultColumns}
                  tableMetaData={tableMetaData}
                  triggerRefetch={triggerRefetch}
                  setTriggerRefetch={setTriggerRefetch}
                  statuses={statuses}
                  sampleFileDataxlsx={getFaqSampleData}
                  setFileImportedData={setFileImportedData}
                  setIsFileImported={setIsFileImported}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default FAQManagement;
