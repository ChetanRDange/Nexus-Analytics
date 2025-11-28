import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import EmailLog from "../assets/images/log-details.png";

const emailData = {
  senderName: "Om Javheri",
  date: "September 12, 2024",
  time: "10 AM",
  subject: "Meeting Update",
  salutation: "Dear [Admin's Name],",
  messageLines: [
    "I hope this email finds you well. I wanted to provide you with an update regarding our upcoming meeting. Please let me know if you need any additional details or if there are any changes in the schedule.",
    "Looking forward to your confirmation.",
  ],
  closing: "Best Regards,",
  senderSignature: "Om Javheri",
  avatarSrc: EmailLog,
};

const EmailReceivedDetails = () => {
  const location = useLocation();
  const { row, heading } = location.state;

  const [isScrollable, setIsScrollable] = useState(false);

  const checkScrollability = () => {
    const contentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    console.log(windowHeight);
    setIsScrollable(contentHeight > windowHeight);
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);

    return () => {
      window.removeEventListener("resize", checkScrollability);
    };
  }, []);

  return (
    <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className="w-full pb-8  gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end border-b border-primary">
        <div>
          <span className="text-3xl font-semibold text-dark">
            Email Received Log Details
          </span>
        </div>
        <div className="w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
          <button
            className="px-4 py-2 text-primary font-medium bg-white rounded-xl border border-primary whitespace-nowrap"
            id="button-210"
          >
            Back
          </button>
        </div>
      </div>

      <div>
        <div className="w-full justify-center items-center mt-8 mb-5 pb-8 border-b border-primary gap-y-4 gap-2  lg:items-start md:items-end xl:items-end">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="w-full md:w-7/12">
              <span className=" text-primary mb-2 whitespace-nowrap md:whitespace-wrap">
                Email Received Log Details
              </span>
            </div>
            <div className="w-full">
              <div className="w-full flex flex-col gap-y-1">
                <label className="text-primary font-bold"> Message ID </label>
                <span className="text-primary font-medium">
                  {row.messageId}
                </span>
              </div>

              <div className="w-full flex flex-col gap-y-1 mt-5">
                <label className="text-primary"> Sender Name </label>
                <span className="text-primary font-medium">
                  {row.senderName}
                </span>
              </div>
              <div className="w-full flex flex-col gap-y-1 mt-5">
                <label className="text-primary"> Sender Email ID </label>
                <a
                  href={`mailto:${row.senderMail}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {row.senderMail}
                </a>
              </div>
              <div className="w-full flex flex-col gap-y-1 mt-5">
                <label className="text-primary"> Recipient Email ID </label>
                <a
                  href={`mailto:${row.recipientMail}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {row.recipientMail}
                </a>
              </div>
              <div className="w-full flex flex-col gap-y-1 mt-5">
                <label className="text-primary"> Timestamp </label>
                <span className="text-primary font-medium">
                  {row.timestamp}
                </span>
              </div>
              <div className="w-full flex flex-col gap-y-1 mt-5">
                <label className="text-primary"> Size (KB) </label>
                <span className="text-primary font-medium">{row.size}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full justify-center items-center mt-8 mb-5 pb-8 border-b border-primary gap-y-4 gap-2  lg:items-start md:items-end xl:items-end">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="w-full md:w-7/12">
              <span className=" text-primary mb-2 whitespace-nowrap md:whitespace-wrap">
                Email
              </span>
            </div>
            <div className="w-full">
              <div className="w-full flex gap-2 justify-start text-left items-start">
                <div className="rounded-full">
                  <img src={emailData.avatarSrc} alt={emailData.senderName} />
                </div>
                <div className="w-full flex flex-col gap-y-1">
                  <span className="text-primary">{emailData.senderName}</span>
                  <div className="flex gap-2 items-center">
                    <span className="text-secondary text-sm">
                      {emailData.date}
                    </span>
                    <span className="w-[8px] h-[8px] rounded-full bg-[#64748B]"></span>
                    <span className="text-secondary text-sm">
                      {emailData.time}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-primary mt-4">{emailData.subject}</div>

              <div className="mt-3 text-primary">
                <p className="mb-2">{emailData.salutation}</p>

                {emailData.messageLines.map((line, index) => (
                  <p key={index} className="mb-2">
                    {line}
                  </p>
                ))}
              </div>

              <div className="mt-4">
                <p>{emailData.closing}</p>
                <p>{emailData.senderSignature}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailReceivedDetails;
