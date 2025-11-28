import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  encryption_required_error,
  from_email_required_error,
  from_name_required_error,
  replyto_email_required_error,
  smtp_host_required_error,
  smtp_name_required_error,
  smtp_pass_required_error,
  smtp_port_required_error,
  smtp_username_required_error,
} from "../Components/AllError";
import ComponentDropdown from "../Components/ComponentDropdown";
import InputComponent from "../Components/InputComponent";
import SMTPSendMailModal from "../Components/SMTPSendMailModal";
import HidePass from "../assets/svgs/settings/hidepass.svg";
import ShowPass from "../assets/svgs/settings/passshow.svg";
import useFetch from "../hooks/useFetch";
import useMutation from "../hooks/useMutation";
import { Eye, EyeOff } from "lucide-react";

const statuses = [
  { id: 0, showName: "None", name: "None" },
  { id: 1, showName: "SSL", name: "SSL" },
  { id: 2, showName: "TSL", name: "TSL" },
  { id: 3, showName: "STARTTLS", name: "STARTTLS" },
];

const EditSMTP = () => {
  const { smtpId } = useParams();
  const [isScrollable, setIsScrollable] = useState(false);
  const navigate = useNavigate();
  const { callApi } = useMutation();
  const [input, setInput] = useState("");

  const [isSMTPSendMailModalOpen, setIsSMTPSendMailModalOpen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [statusDropdown, setStatusDropDown] = useState({
    showName: "Click to select an option",
    name: "",
  });

  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    host: "",
    username: "",
    password: "",
    port: "",
    fromName: "",
    fromEmail: "",
    replyTo: "", // ensure replyTo is initialized as empty string
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const checkScrollability = () => {
    const contentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    setIsScrollable(contentHeight > windowHeight);
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);

    return () => {
      window.removeEventListener("resize", checkScrollability);
    };
  }, []);

  const validate = () => {
    let errors = {};

    if (!formData?.name?.trim()) {
      errors.sname = smtp_name_required_error;
      toast.error(smtp_name_required_error);
      return errors;
    }
    if (!formData?.host?.trim()) {
      errors.hostn = smtp_host_required_error;
      toast.error(smtp_host_required_error);
      return errors;
    }
    if (!formData?.username?.trim()) {
      errors.username = smtp_username_required_error;
      toast.error(smtp_username_required_error);
      return errors;
    }
    if (!formData?.password?.trim()) {
      errors.password = smtp_pass_required_error;
      toast.error(smtp_pass_required_error);
      return errors;
    }
    if (!formData?.port) {
      errors.port = smtp_port_required_error;
      toast.error(smtp_port_required_error);
      return errors;
    }
    if (!formData?.fromName?.trim()) {
      errors.fromName = from_name_required_error;
      toast.error(from_name_required_error);
      return errors;
    }
    if (!formData?.fromEmail?.trim()) {
      errors.fromEmail = from_email_required_error;
      toast.error(from_email_required_error);
      return errors;
    }
    if (!formData?.replyTo?.trim()) {
      errors.replyTo = replyto_email_required_error;
      toast.error(replyto_email_required_error);
      return errors;
    }
    if (!statusDropdown?.name) {
      errors.encrypted = encryption_required_error;
      toast.error(encryption_required_error);
      return errors;
    }
    return false;
  };

  const { data: res, loading } = useFetch(`/private/smtp/${smtpId}`);
  const smtpRecord = res?.data;

  useEffect(() => {
    if (smtpRecord) {
      setFormData({
        _id: smtpRecord?._id,
        name: smtpRecord?.name,
        host: smtpRecord?.host,
        username: smtpRecord?.userName,
        password: smtpRecord?.password,
        port: smtpRecord?.port,
        fromName: smtpRecord?.fromName,
        fromEmail: smtpRecord?.fromEmail,
        replyTo: smtpRecord?.replyTo,
      });
      setStatusDropDown({
        showName: smtpRecord?.secure,
        name: smtpRecord?.secure,
      });
    }
  }, [smtpRecord]);

  async function handleEditSmtpSettings(e) {
    e.preventDefault();
    const validateformData = validate();
    if (validateformData) {
      // setErrors(validateformData);
      return;
    }

    const smtpDetails = {
      ...formData,
      port: Number(formData?.port),
      secure: statusDropdown.name,
    };
    const res = await callApi("/private/smtp", "PUT", smtpDetails);
    if (res) navigate("/smtp-settings");
  }

  return (
    <>
      <SMTPSendMailModal
        isSMTPSendMailModalOpen={isSMTPSendMailModalOpen}
        setIsSMTPSendMailModalOpen={setIsSMTPSendMailModalOpen}
      />
      <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
        <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
          <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
            Edit SMTP Setting
          </h4>

          <div className="flex gap-2">
            <Link
              id="cancel"
              to="/smtp-settings"
              className="px-4 py-2 hover:bg-hover  text-primary font-medium bg-main rounded-xl border border-primary whitespace-nowrap"
            >
              Cancel
            </Link>

            <button
              className="saveBtn px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
              id="button-199"
              onClick={handleEditSmtpSettings}
            >
              Update
            </button>
          </div>
        </div>

        <div className="w-full justify-center items-center mt-8 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className="block  text-primary">SMTP setting details</span>
            </div>
            <div className="flex flex-col w-full">
              <form className="w-full">
                <div>
                  <InputComponent
                    inputType="text"
                    name="name"
                    id="sname"
                    labelName="SMTP Name"
                    labelColor="primary"
                    placeholderName="SMTP Name"
                    placeholderColor="secondary"
                    textColor="text-secondary"
                    onChange={handleOnChange}
                    borderRadius="xl"
                    activeBorderColor="blue"
                    value={formData.name}
                  />
                </div>

                <div className="w-full mt-5">
                  <InputComponent
                    inputType="text"
                    name="host"
                    id="hostn"
                    labelName="SMTP Host"
                    labelColor="primary"
                    placeholderName="SMTP Host"
                    placeholderColor="secondary"
                    textColor="text-secondary"
                    onChange={handleOnChange}
                    borderRadius="xl"
                    activeBorderColor="blue"
                    value={formData.host}
                  />
                </div>

                <div className="w-full mt-5">
                  <InputComponent
                    inputType="text"
                    name="username"
                    id="username"
                    labelName="SMTP Username"
                    labelColor="primary"
                    placeholderName="SMTP Username"
                    placeholderColor="secondary"
                    textColor="text-secondary"
                    onChange={handleOnChange}
                    borderRadius="xl"
                    activeBorderColor="blue"
                    value={formData.username}
                  />
                </div>

                <div className="w-full mt-5">
                  <div className="w-full">
                    <div className="relative w-full ">
                      <InputComponent
                        inputType={showPassword ? "text" : "password"}
                        value={formData.password}
                        maxLength={18}
                        name="password"
                        id="password"
                        labelName="SMTP Password"
                        labelColor="primary"
                        placeholderName="SMTP Password"
                        placeholderColor="secondary"
                        textColor="text-secondary"
                        onChange={handleOnChange}
                        borderRadius="xl"
                        activeBorderColor="blue"
                      />
                      <div
                        className="absolute cursor-pointer top-[70%] right-4 -translate-y-1/2 text-primary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Eye /> : <EyeOff />}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full mt-5">
                  <InputComponent
                    inputType="text"
                    name="port"
                    id="port"
                    labelName="SMTP Port"
                    labelColor="primary"
                    placeholderName="SMTP Port"
                    placeholderColor="secondary"
                    textColor="text-secondary"
                    onChange={handleOnChange}
                    borderRadius="xl"
                    activeBorderColor="blue"
                    value={formData.port}
                  />
                </div>

                <div className="w-full mt-5">
                  <InputComponent
                    inputType="text"
                    name="fromName"
                    id="fname"
                    labelName="From Name"
                    labelColor="primary"
                    placeholderName="From Name"
                    placeholderColor="secondary"
                    textColor="text-secondary"
                    onChange={handleOnChange}
                    borderRadius="xl"
                    activeBorderColor="blue"
                    value={formData.fromName}
                  />
                </div>

                <div className="w-full mt-5">
                  <InputComponent
                    inputType="text"
                    name="fromEmail"
                    id="fmail"
                    labelName="From Email"
                    labelColor="primary"
                    placeholderName="From Email"
                    placeholderColor="secondary"
                    textColor="text-secondary"
                    onChange={handleOnChange}
                    borderRadius="xl"
                    activeBorderColor="blue"
                    value={formData.fromEmail}
                  />
                </div>

                <div className="w-full mt-5">
                  <InputComponent
                    inputType="text"
                    name="replyTo"
                    id="replyto"
                    labelName="Reply To"
                    labelColor="primary"
                    placeholderName="Reply To"
                    placeholderColor="secondary"
                    textColor="text-secondary"
                    onChange={handleOnChange}
                    borderRadius="xl"
                    activeBorderColor="blue"
                    value={formData.replyTo || ""}
                  />
                </div>

                <div className="w-full mt-5 pb-10 ">
                  <label className="block  text-primary">Encrypted</label>

                  <div className="mt-2">
                    <ComponentDropdown
                      name="search"
                      SummaryChild={
                        <h5 className="p-0 m-0">{statusDropdown.showName}</h5>
                      }
                      dropdownList={statuses}
                      search={true}
                      commonFunction={setStatusDropDown}
                      selected={statusDropdown.name}
                    />
                  </div>
                </div>
              </form>
              {/* <div className="">
                <button
                  onClick={() => setIsSMTPSendMailModalOpen(true)}
                  className="px-5 py-3 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
                  id="button-200"
                >
                  Send Test Mail
                </button>
              </div> */}
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end items-center gap-4 pt-8 pb-20 mb-12">
          <Link
            id="cancel-1"
            to="/smtp-settings"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover  rounded-xl border border-primary whitespace-nowrap"
          >
            Cancel
          </Link>

          <button
              onClick={handleEditSmtpSettings}
              className="saveBtn px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
            id="button-201"
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default EditSMTP;
