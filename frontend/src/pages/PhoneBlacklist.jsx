import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Download from "../assets/svgs/download.svg";
import DynamicTableComponent from "../Components/DynamicTableComponent";
import Add from "../assets/svgs/add.svg";
import BlacklistIcon from "../assets/svgs/tabler-icon-ban.svg";
import TrashIcon from "../assets/svgs/tabler-icon-trash.svg";
import ImportCompaniesModal from "../Components/ImportCompaniesModal";
import InvitationSuccessModal from "../Components/InvitationSuccessModal";
import SuccessIcon from "../assets/svgs/success-icon.svg";
import DeleteConfirm from "./DeleteConfirm";
import IndiaFlag from "../assets/svgs/india-flag.svg";

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

const defaultColumns = [
  {
    Header: "Sr. No.",
    accessor: "srno",
  },
  {
    Header: "Country",
    accessor: "country",
    Cell: ({ value }) =>
      value ? (
        <div className="flex gap-2 items-center">
          <img src={IndiaFlag} alt="Country Flag" className="w-6 h-6" />
          <span>{value}</span>
        </div>
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Phone Number",
    accessor: "phonenumber",
    Cell: ({ value }) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Number of Unsolicited Calls",
    accessor: "unsolicitedcalls",
    Cell: ({ value }) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Fraudulent Activity Complaints",
    accessor: "fraudactivitycomplaints",
    Cell: ({ value }) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Frequency of Short Calls",
    accessor: "shortcallsfrequency",
    Cell: ({ value }) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Failed OTP Verifications",
    accessor: "failedotpverifications",
    Cell: ({ value }) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Failed Two-Factor Authentication via SMS",
    accessor: "failed2fa",
    Cell: ({ value }) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Robocall Detection",
    accessor: "robocallDetection",
    Cell: ({ value }) => (value ? value : <span>-</span>),
  },
  {
    Header: "Date Added",
    accessor: "dateadded",
    Cell: ({ value }) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Added By",
    accessor: "addedby",
    Cell: ({ value }) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
];

const abuserdefaultColumns = [
  {
    Header: "Sr. No.",
    accessor: "srno",
    Cell: ({ value }) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Country",
    accessor: "country",
    Cell: ({ value }) =>
      value ? (
        <div className="flex gap-2 items-center">
          <img src={IndiaFlag} alt="Country Flag" className="w-6 h-6" />
          <span>{value}</span>
        </div>
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Phone Number",
    accessor: "phonenumber",
    Cell: ({ value }) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Number of Unsolicited Calls",
    accessor: "unsolicitedcalls",
    Cell: ({ value }) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Fraudulent Activity Complaints",
    accessor: "fraudactivitycomplaints",
    Cell: ({ value }) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Frequency of Short Calls",
    accessor: "shortcallsfrequency",
    Cell: ({ value }) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Failed OTP Verifications",
    accessor: "failedotpverifications",
    Cell: ({ value }) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Failed Two-Factor Authentication via SMS",
    accessor: "failed2fa",
    Cell: ({ value }) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Robocall Detection",
    accessor: "robocallDetection",
    Cell: ({ value }) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Date Added",
    accessor: "dateadded",
    Cell: ({ value }) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Added By",
    accessor: "addedby",
    Cell: ({ value }) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Actions",
    accessor: "actions",
    Cell: ({ row }) => (
      <div className="ptpb-4 flex justify-start gap-3 w-full">
        <button
          className="px-5 shadow-sm rounded-xl flex gap-1 text-xs items-center border border-primary w-4/5 justify-center"
          onClick={() => handleBlacklist(row)}
          id="button-254"
        >
          <img src={BlacklistIcon} alt="Blacklist" className="h-5 w-5" />
          Blacklist
        </button>

        <button
          className="px-5 shadow-sm rounded-xl flex gap-1 text-xs items-center border border-primary w-4/5 justify-center"
          id="button-255"
        >
          <img src={TrashIcon} alt="Remove" className="h-5 w-5" /> Remove
        </button>

        <button
          className=" rounded-xl flex gap-1  items-center w-4/5 justify-center"
          id="button-256"
        >
          <svg
            width="33"
            height="32"
            viewBox="0 0 33 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5076 16C14.5076 16.442 14.6832 16.866 14.9958 17.1785C15.3084 17.4911 15.7323 17.6667 16.1743 17.6667C16.6163 17.6667 17.0403 17.4911 17.3528 17.1785C17.6654 16.866 17.841 16.442 17.841 16C17.841 15.558 17.6654 15.134 17.3528 14.8215C17.0403 14.5089 16.6163 14.3333 16.1743 14.3333C15.7323 14.3333 15.3084 14.5089 14.9958 14.8215C14.6832 15.134 14.5076 15.558 14.5076 16Z"
              stroke="#667085"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M23.6743 16C21.6743 19.3333 19.1743 21 16.1743 21C13.1743 21 10.6743 19.3333 8.67432 16C10.6743 12.6667 13.1743 11 16.1743 11C19.1743 11 21.6743 12.6667 23.6743 16Z"
              stroke="#667085"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    ),
  },
];

const comapnyInfo = [
  {
    id: 0,
    srno: "001",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 150,
    fraudactivitycomplaints: 12,
    shortcallsfrequency: "50 calls in 1 hour",
    failedotpverifications: "15 failed OTP attempts",
    failed2fa: "10 failed 2FA attempts",
    robocallDetection: "Detected 10 identical messages",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 1,
    srno: "002",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 30,
    fraudactivitycomplaints: 0,
    shortcallsfrequency: "20 calls in 2 hours",
    failedotpverifications: "2 failed OTP attempts",
    failed2fa: "1 failed 2FA attempt",
    robocallDetection: "Detected 5 identical messages",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 2,
    srno: "003",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 85,
    fraudactivitycomplaints: 5,
    shortcallsfrequency: "40 calls in 30 minutes",
    failedotpverifications: "25 failed OTP attempts",
    failed2fa: "15 failed 2FA attempts",
    robocallDetection: "No robocalls detected",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 3,
    srno: "004",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 10,
    fraudactivitycomplaints: 10,
    shortcallsfrequency: "-",
    failedotpverifications: "5 failed OTP attempts",
    failed2fa: "2 failed 2FA attempts",
    robocallDetection: "Detected 15 identical messages",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 4,
    srno: "005",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 200,
    fraudactivitycomplaints: 6,
    shortcallsfrequency: "70 calls in 1 hour",
    failedotpverifications: "30 failed OTP attempts",
    failed2fa: "25 failed 2FA attempts",
    robocallDetection: "Detected 8 identical messages",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 5,
    srno: "006",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 120,
    fraudactivitycomplaints: 20,
    shortcallsfrequency: "-",
    failedotpverifications: "1 failed OTP attempt",
    failed2fa: "-",
    robocallDetection: "Detected 6 identical messages",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 6,
    srno: "007",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 120,
    fraudactivitycomplaints: 7,
    shortcallsfrequency: "25 calls in 2 hours",
    failedotpverifications: "20 failed OTP attempts",
    failed2fa: "18 failed 2FA attempts",
    robocallDetection: "Detected 12 identical messages",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 7,
    srno: "008",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 45,
    fraudactivitycomplaints: 6,
    shortcallsfrequency: "70 calls in 1 hour",
    failedotpverifications: "3 failed OTP attempts",
    failed2fa: "2 failed 2FA attempts",
    robocallDetection: "No robocalls detected",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 8,
    srno: "009",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 120,
    fraudactivitycomplaints: 10,
    shortcallsfrequency: "35 calls in 1 hour",
    failedotpverifications: "-",
    failed2fa: "-",
    robocallDetection: "Detected 7 identical messages",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 9,
    srno: "010",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 90,
    fraudactivitycomplaints: 2,
    shortcallsfrequency: "55 calls in 45 minutes",
    failedotpverifications: "22 failed OTP attempts",
    failed2fa: "20 failed 2FA attempts",
    robocallDetection: "No robocalls detected",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 10,
    srno: "011",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 45,
    fraudactivitycomplaints: 7,
    shortcallsfrequency: "-",
    failedotpverifications: "-",
    failed2fa: "-",
    robocallDetection: "No robocalls detected",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 11,
    srno: "012",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 120,
    fraudactivitycomplaints: 6,
    shortcallsfrequency: "25 calls in 2 hours",
    failedotpverifications: "4 failed OTP attempts",
    failed2fa: "3 failed 2FA attempts",
    robocallDetection: "No robocalls detected",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 12,
    srno: "013",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 45,
    fraudactivitycomplaints: 7,
    shortcallsfrequency: "35 calls in 1 hour",
    failedotpverifications: "3 failed OTP attempts",
    failed2fa: "18 failed 2FA attempts",
    robocallDetection: "No robocalls detected",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 13,
    srno: "014",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 170,
    fraudactivitycomplaints: 15,
    shortcallsfrequency: "65 calls in 90 minutes",
    failedotpverifications: "30 failed OTP attempts",
    failed2fa: "2 failed 2FA attempts",
    robocallDetection: "No robocalls detected",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 14,
    srno: "015",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 120,
    fraudactivitycomplaints: 6,
    shortcallsfrequency: "12 calls in 2 hours",
    failedotpverifications: "5 failed OTP attempts",
    failed2fa: "15 failed 2FA attempts",
    robocallDetection: "No robocalls detected",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
];

const newcomapnyInfo = [
  {
    id: 0,
    srno: "001",
    country: "",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 150,
    fraudactivitycomplaints: 12,
    shortcallsfrequency: "50 calls in 1 hour",
    failedotpverifications: "15 failed OTP attempts",
    failed2fa: "10 failed 2FA attempts",
    robocallDetection: "Detected 10 identical messages",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 1,
    srno: "",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 30,
    fraudactivitycomplaints: 0,
    shortcallsfrequency: "20 calls in 2 hours",
    failedotpverifications: "2 failed OTP attempts",
    failed2fa: "1 failed 2FA attempt",
    robocallDetection: "Detected 5 identical messages",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 2,
    srno: "003",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "",
    unsolicitedcalls: 85,
    fraudactivitycomplaints: 5,
    shortcallsfrequency: "40 calls in 30 minutes",
    failedotpverifications: "25 failed OTP attempts",
    failed2fa: "15 failed 2FA attempts",
    robocallDetection: "No robocalls detected",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 3,
    srno: "004",
    country: "",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 10,
    fraudactivitycomplaints: 10,
    shortcallsfrequency: "-",
    failedotpverifications: "5 failed OTP attempts",
    failed2fa: "2 failed 2FA attempts",
    robocallDetection: "Detected 15 identical messages",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 4,
    srno: "005",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "",
    unsolicitedcalls: 200,
    fraudactivitycomplaints: 6,
    shortcallsfrequency: "70 calls in 1 hour",
    failedotpverifications: "30 failed OTP attempts",
    failed2fa: "25 failed 2FA attempts",
    robocallDetection: "Detected 8 identical messages",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 5,
    srno: "",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 120,
    fraudactivitycomplaints: 20,
    shortcallsfrequency: "-",
    failedotpverifications: "1 failed OTP attempt",
    failed2fa: "-",
    robocallDetection: "Detected 6 identical messages",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 6,
    srno: "007",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 120,
    fraudactivitycomplaints: 7,
    shortcallsfrequency: "25 calls in 2 hours",
    failedotpverifications: "20 failed OTP attempts",
    failed2fa: "18 failed 2FA attempts",
    robocallDetection: "Detected 12 identical messages",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 7,
    srno: "008",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 45,
    fraudactivitycomplaints: 6,
    shortcallsfrequency: "70 calls in 1 hour",
    failedotpverifications: "3 failed OTP attempts",
    failed2fa: "2 failed 2FA attempts",
    robocallDetection: "No robocalls detected",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 8,
    srno: "009",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 120,
    fraudactivitycomplaints: 10,
    shortcallsfrequency: "35 calls in 1 hour",
    failedotpverifications: "-",
    failed2fa: "-",
    robocallDetection: "Detected 7 identical messages",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 9,
    srno: "010",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 90,
    fraudactivitycomplaints: 2,
    shortcallsfrequency: "55 calls in 45 minutes",
    failedotpverifications: "22 failed OTP attempts",
    failed2fa: "20 failed 2FA attempts",
    robocallDetection: "No robocalls detected",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 10,
    srno: "011",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 45,
    fraudactivitycomplaints: 7,
    shortcallsfrequency: "-",
    failedotpverifications: "-",
    failed2fa: "-",
    robocallDetection: "No robocalls detected",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 11,
    srno: "012",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 120,
    fraudactivitycomplaints: 6,
    shortcallsfrequency: "25 calls in 2 hours",
    failedotpverifications: "4 failed OTP attempts",
    failed2fa: "3 failed 2FA attempts",
    robocallDetection: "No robocalls detected",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 12,
    srno: "013",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 45,
    fraudactivitycomplaints: 7,
    shortcallsfrequency: "35 calls in 1 hour",
    failedotpverifications: "3 failed OTP attempts",
    failed2fa: "18 failed 2FA attempts",
    robocallDetection: "No robocalls detected",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 13,
    srno: "014",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 170,
    fraudactivitycomplaints: 15,
    shortcallsfrequency: "65 calls in 90 minutes",
    failedotpverifications: "30 failed OTP attempts",
    failed2fa: "2 failed 2FA attempts",
    robocallDetection: "No robocalls detected",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
  {
    id: 14,
    srno: "015",
    country: "INDIA",
    countryLogo: IndiaFlag,
    phonenumber: "+91 8888956275",
    unsolicitedcalls: 120,
    fraudactivitycomplaints: 6,
    shortcallsfrequency: "12 calls in 2 hours",
    failedotpverifications: "5 failed OTP attempts",
    failed2fa: "15 failed 2FA attempts",
    robocallDetection: "No robocalls detected",
    dateadded: "10/08/2024, 2:00 AM",
    addedby: "John Doe",
  },
];

const statuses = [
  {
    id: 0,
    name: "Success",
    bgColor: "#ECFDF3",
    color: "#027948",
    dotColor: "#12B76A",
  },
  {
    id: 1,
    name: "Pending",
    bgColor: "#FFFAEB",
    color: "#B54708",
    dotColor: "#F79009",
  },
  {
    id: 2,
    name: "Inactive",
    bgColor: "#F2F4F7",
    color: "#344054",
    dotColor: "#667085",
  },
  {
    id: 3,
    name: "Blocked",
    bgColor: "#FEF3F2",
    color: "#B32318",
    dotColor: "#F04438",
  },
];

const PhoneBlacklist = () => {
  const [onTabClick, setOnTabClick] = useState("Blacklist");

  const [isInviteSentModalOpen, setIsInviteSentModalOpen] = useState(false);

  const [isImportSuccess, setIsImportSuccess] = useState(false);
  const [isImportCompanyModalOpen, setIsImportCompanyModalOpen] =
    useState(false);
  const [successImportModal, setSuccessImportModal] = useState(false);

  const handleSelectionChange = (selectedIds) => {
    console.log("Selected IDs:", selectedIds.length);
  };

  const openImportModal = () => {
    setIsImportCompanyModalOpen(true);
  };
  return (
    <>
      <ImportCompaniesModal
        isImportCompanyModalOpen={isImportCompanyModalOpen}
        setIsImportCompanyModalOpen={setIsImportCompanyModalOpen}
        heading="Notice"
        successImportModal={successImportModal}
        setSuccessImportModal={setSuccessImportModal}
      />
      <InvitationSuccessModal
        isInviteSuccessModalOpen={successImportModal}
        setIsInviteSuccessModalOpen={setSuccessImportModal}
        title="Notices Added Successfully!"
        para="200 notices have been add."
        navigation="/phone-blacklist"
        SuccessIcon={SuccessIcon}
        setIsImportSuccess={setIsImportSuccess}
      />

      <div className="py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
        <div className="w-full pb-4 gap-y-4 gap-2 flex items-start justify-between">
          <div>
            <span className="text-3xl font-semibold text-dark sm:whitespace-nowrap">
              Phone Blacklist
            </span>
          </div>

          <div className="flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
            <Link
              to="/add-email-blacklist"
              className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-primarydark text-white"
            >
              <img src={Add} alt="Add" />
              <span className="hidden md:block">Add to Blacklist</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col rounded-xl">
          <div className="w-full align-middle">
            <div className="flex flex-col gap-y-2 md:flex-row md:justify-between items-center gap-2 pt-3 pb-6 ">
              <div className="w-full flex flex-wrap items-center gap-3 border-b border-primary pb-6">
                <button
                  onClick={() => setOnTabClick("Blacklist")}
                  className={`py-2.5 px-4 rounded-xl text-primary font-medium  ${
                    onTabClick === "Blacklist" ? "bg-fadedblue " : "bg-white "
                  }`}
                  id="button-257"
                >
                  Blacklist
                </button>
                <button
                  onClick={() => setOnTabClick("Abuser")}
                  className={`py-2.5 px-4 rounded-xl text-primary font-medium ${
                    onTabClick === "Abuser" ? "bg-fadedblue" : "bg-white "
                  }`}
                  id="button-258"
                >
                  Abuser’s List
                </button>
              </div>
            </div>
          </div>
        </div>

        {isImportSuccess && (
          <div className="flex flex-col border border-primary mb-8 rounded-xl">
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
                    <button
                      className="w-[100px] sm:w-fit text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-1.5 sm:py-2 px-2 sm:px-3 whitespace-nowrap flex gap-2"
                      id="button-259"
                    >
                      <img src={Download} alt="Download" />
                      <span>Export & Fix</span>
                    </button>
                  </div>
                </div>
                <DynamicTableComponent
                  columns={defaultColumns}
                  data={newcomapnyInfo}
                  selectable={true}
                  onSelectChange={handleSelectionChange}
                  actions={true}
                />
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col border rounded-xl">
          <div className="-m-1.5">
            <div className="p-1.5 min-w-full align-middle">
              {onTabClick === "Blacklist" && (
                <>
                  <DynamicTableComponent
                    columns={defaultColumns}
                    data={comapnyInfo}
                    selectable={true}
                    onSelectChange={handleSelectionChange}
                    openImportModal={openImportModal}
                    actions={true}
                    edit={false}
                    view={true}
                    page="emailblacklist"
                    categories={categories}
                    statuses={statuses}
                    deleteBtn={false}
                    printBtn={true}
                    importBtn={true}
                    ExportBtn={true}
                    tableCountLabel={true}
                    filter={true}
                    search={true}
                  />
                </>
              )}

              {onTabClick === "Abuser" && (
                <>
                  <DynamicTableComponent
                    columns={abuserdefaultColumns}
                    data={comapnyInfo}
                    selectable={true}
                    onSelectChange={handleSelectionChange}
                    openImportModal={openImportModal}
                    actions={false}
                    edit={false}
                    view={true}
                    page="emailblacklist"
                    categories={categories}
                    statuses={statuses}
                    deleteBtn={false}
                    printBtn={true}
                    importBtn={true}
                    ExportBtn={true}
                    tableCountLabel={true}
                    filter={true}
                    search={true}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhoneBlacklist;
