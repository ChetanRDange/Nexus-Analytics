import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import ComponentDropdown from "../Components/ComponentDropdown";
import InputComponent from "../Components/InputComponent";
import Brand from "../assets/svgs/settings/brand.svg";
import HidePass from "../assets/svgs/settings/hidepass.svg";
import ShowPass from "../assets/svgs/settings/passshow.svg";
import useMutation from "../hooks/useMutation";
import useFetch from "../hooks/useFetch";
import { Eye, EyeOff } from "lucide-react";

const statuses = [
  { id: 0, showName: "us-east-1", name: "us-east-1" },
  { id: 1, showName: "ap-south-1", name: "ap-south-1" },
  { id: 2, showName: "eu-west-1", name: "eu-west-1" },
  { id: 3, showName: "ap-south-2", name: "ap-south-2" },
];

const EditAws = () => {
  const { awsId } = useParams();
  const { callApi } = useMutation();
  const navigate = useNavigate();

  const [accessPassword, setAccessPassword] = useState(false);
  const [secretPassword, setSecretPassword] = useState(false);

  const [statusDropdown, setStatusDropDown] = useState({
    showName: "Click to select an option",
    name: "",
  });

  const [awsDetails, setAwsDetails] = useState({
    id: "",
    name: "",
    region: "",
    bucket: "",
    accessKey: "",
    secretKey: "",
  });

  const validate = () => {
    let errors = {};
    if (!awsDetails.name.trim()) {
      errors.name = "Name is required. ";
      toast.error(errors.name);
      return errors;
    }
    if (!statusDropdown.name.trim()) {
      errors.region = "Region is required. ";
      toast.error(errors.region);
      return errors;
    }
    if (!awsDetails.bucket.trim()) {
      errors.bucket = "Bucket name is required. ";
      toast.error(errors.bucket);
      return errors;
    }
    if (!awsDetails.accessKey.trim() || awsDetails.accessKey.length < 20) {
      errors.accessKey = "Access Key is not valid.";
      toast.error(errors.accessKey);
      return errors;
    }
    if (!awsDetails.secretKey.trim() || awsDetails.secretKey.length < 40) {
      errors.secretKey = "Secret Key is not valid.";
      toast.error(errors.secretKey);
      return errors;
    }
    return errors;
  };

  const { data: res, loading } = useFetch(`/private/aws/${awsId}`);
  const awsRecord = res?.data;

  useEffect(() => {
    if (awsRecord) {
      setAwsDetails({
        _id: awsRecord?._id,
        name: awsRecord?.name,
        region: awsRecord?.awsRegion,
        bucket: awsRecord?.awsBucket,
        accessKey: awsRecord?.awsAccess,
        secretKey: awsRecord?.awsSecret,
      });
      setStatusDropDown({
        showName: awsRecord?.awsRegion,
        name: awsRecord?.awsRegion,
      });
    }
  }, [awsRecord]);

  const handleUpdateAwsDetails = async (e) => {
    e.preventDefault();
    const awsErrors = validate();
    if (Object.keys(awsErrors).length > 0) return;
    const res = await callApi(`/private/aws`, "PUT", {
      ...awsDetails,
      region: statusDropdown?.name,
    });
    if (res) navigate("/aws-settings");
  };

  return (
    <>
      <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
        <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
          <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
            Edit AWS Setting
          </h4>

          <div className="flex gap-2">
            <Link
              id="cancel"
              to="/aws-settings"
              className="px-4 py-2 text-primary font-medium bg-main rounded-xl border hover:bg-hover  border-primary whitespace-nowrap"
            >
              Cancel
            </Link>

            <button
              onClick={handleUpdateAwsDetails}
              className="saveBtn px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
              id="button-179"
            >
              Update
            </button>
          </div>
        </div>

        <div className="w-full justify-center items-center mt-6 pb-4 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end border-b border-primary">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary flex items-center gap-1">
                AWS Account Information
              </span>
              <span className="text-secondary font-normal ">
                AWS Overview and Details
              </span>
            </div>

            <form className="w-full " method="post">
              <div>
                <InputComponent
                  inputType="text"
                  name="aname"
                  id="aname"
                  labelName="AWS Name"
                  labelColor="primary"
                  placeholderName="AWS Name"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  value={awsDetails?.name} // bind to state value
                  onChange={(e) =>
                    setAwsDetails({ ...awsDetails, name: e.target.value })
                  }
                  borderRadius="xl"
                  activeBorderColor="blue"
                />
              </div>

              <div className="w-full mt-5 ">
                <label className="block text-primary mb-1">AWS Region</label>

                <div>
                  <ComponentDropdown
                    name="search"
                    SummaryChild={
                      <h5 className="p-0 m-0">{statusDropdown.showName}</h5>
                    }
                    dropdownList={statuses}
                    commonFunction={setStatusDropDown}
                    selected={statusDropdown.name}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* AWS S3 Bucket Information */}
        <div className="w-full justify-center items-center mt-6 pb-4 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end border-b border-primary">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary flex items-center gap-1">
                AWS S3 Bucket Information
              </span>
            </div>

            <form className="w-full " method="post">
              <div>
                <InputComponent
                  inputType="text"
                  name="awsbucket"
                  id="awsbucket"
                  labelName="AWS Bucket"
                  labelColor="primary"
                  placeholderName="AWS Bucket"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  value={awsDetails?.bucket}
                  onChange={(e) =>
                    setAwsDetails({ ...awsDetails, bucket: e.target.value })
                  }
                  borderRadius="xl"
                  activeBorderColor="blue"
                />
              </div>
            </form>
          </div>
        </div>

        {/* AWS Security Credentials */}
        <div className="w-full justify-center items-center mt-8 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary flex items-center gap-1">
                AWS Security Credentials
              </span>
            </div>

            <form className="w-full " method="post">
              <div className="relative w-full ">
                <InputComponent
                  Icon={Brand}
                  inputType={accessPassword ? "text" : "password"}
                  maxLength={18}
                  name="awsakey"
                  id="awsakey"
                  labelName="AWS Access Key"
                  labelColor="primary"
                  placeholderName="AWS Access Key"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  value={awsDetails?.accessKey}
                  onChange={(e) =>
                    setAwsDetails({ ...awsDetails, accessKey: e.target.value })
                  }
                  borderRadius="xl"
                  activeBorderColor="blue"
                />

                <div
                  className="absolute cursor-pointer top-[70%] right-4 -translate-y-1/2 text-primary"
                  onClick={() => setAccessPassword(!accessPassword)}
                >
                  {accessPassword ? <Eye /> : <EyeOff />}
                </div>
              </div>

              <div className="relative w-full mt-4  ">
                <InputComponent
                  Icon={Brand}
                  inputType={secretPassword ? "text" : "password"}
                  maxLength={18}
                  name="awsskey"
                  id="awsskey"
                  labelName="AWS Secret Key"
                  labelColor="primary"
                  placeholderName="AWS Secret Key"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  value={awsDetails?.secretKey}
                  onChange={(e) =>
                    setAwsDetails({ ...awsDetails, secretKey: e.target.value })
                  }
                  borderRadius="xl"
                  activeBorderColor="blue"
                />

                <div
                  className="absolute cursor-pointer top-[70%] right-4 -translate-y-1/2 text-primary"
                  onClick={() => setSecretPassword(!secretPassword)}
                >
                  {secretPassword ? <Eye /> : <EyeOff />}
                </div>
              </div>
            </form>
          </div>

          <div className="sm:hidden flex justify-end gap-2 mt-4 mb-20 border-t border-primary pt-6">
            <Link
              id="cancel"
              to="/aws-settings"
              className="px-4 py-2 text-primary font-medium bg-main rounded-xl border hover:bg-hover  border-primary whitespace-nowrap"
            >
              Cancel
            </Link>

            <button
              onClick={handleUpdateAwsDetails}
              className="saveBtn px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
              id="button-179"
            >
              Update
            </button>
          </div>
        </div>

        <div className="flex w-full justify-end gap-2">
            <Link
              id="cancel"
              to="/aws-settings"
              className="px-4 py-2 text-primary font-medium bg-main rounded-xl border hover:bg-hover  border-primary whitespace-nowrap"
            >
              Cancel
            </Link>

            <button
              onClick={handleUpdateAwsDetails}
              className="saveBtn px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
              id="button-179"
            >
              Update
            </button>
          </div>
      </div>
    </>
  );
};

export default EditAws;
