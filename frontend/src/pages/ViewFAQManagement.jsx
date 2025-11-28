import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ComponentDropdown from "../Components/ComponentDropdown";
import useFetch from "../hooks/useFetch";
import formatDateTime from "../utils/DateFormat";
const status = [
  {
    id: 0,
    showName: "Active",
    name: "Active",
  },
  {
    id: 1,
    showName: "Inactive",
    name: "Inactive",
  },
];
const categories = [
  {
    id: 0,
    showName: "General",
    name: "General",
  },
  {
    id: 1,
    showName: "Payments",
    name: "Payments",
  },
  {
    id: 2,
    showName: "Account",
    name: "Account",
  },
  {
    id: 3,
    showName: "Billing",
    name: "Billing",
  },
  {
    id: 4,
    showName: "Security",
    name: "Security",
  },
  {
    id: 5,
    showName: "Support",
    name: "Support",
  },
  {
    id: 6,
    showName: "Product",
    name: "Product",
  },
];

const ViewFAQManagement = () => {
  const { faqId } = useParams();
  const [catagoryDropdown, setCatagoryDropdown] = useState({
    showName: "",
    name: "",
  });

  const [statusDropDown, setStatusDropDown] = useState({
    showName: "",
    name: "",
  });

  const { data: res, reFetch } = useFetch(`/private/faqs/${faqId}`);
  const faqRecord = res?.data;

  useEffect(() => {
    setCatagoryDropdown({
      showName: faqRecord?.category,
      name: faqRecord?.category,
    });
    setStatusDropDown({
      showName: faqRecord?.status,
      name: faqRecord?.status,
    });
  }, [faqRecord]);

  return (
    <>
      <div className="py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
        <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
          <div>
            <span className="text-3xl font-semibold text-dark">Add FAQ</span>
          </div>
          <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
            <Link
              id="cancel"
              to="/faq-management"
              className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50 rounded-xl border border-primary whitespace-nowrap"
            >
              Cancel
            </Link>
            <Link
              id="edit"
              to={`/edit-faq-management/${faqId}`}
              className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
            >
              Edit
            </Link>
          </div>
        </div>

        <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary ">
                General Information Section
              </span>
            </div>
            <div className="w-full">
              <div className="w-full">
                <label className="block  font-medium text-primary">
                  FAQ ID
                </label>
                <div className="mt-1">
                  <p className="font-normal text-dark ">
                    {faqRecord?.faqId || "N/A"}
                  </p>
                </div>
              </div>

              <div className="w-full mt-5">
                <label className="text-primary">Category Type</label>
                <div className="dropdown-container relative w-full mt-2">
                  <ComponentDropdown
                    name="duration"
                    SummaryChild={
                      <h5 className="p-0 m-0 text-primary">
                        {catagoryDropdown.showName}
                      </h5>
                    }
                    dropdownList={categories}
                    search={true}
                    commonFunction={setCatagoryDropdown}
                    selected={catagoryDropdown.name}
                  />
                </div>
              </div>
              <div className="w-full mt-5">
                <label className="block  font-medium text-primary">
                  Question
                </label>
                <div className="mt-1">
                  <p className="font-normal text-dark ">
                    {faqRecord?.question || "N/A"}
                  </p>
                </div>
              </div>
              <div className="w-full mt-5">
                <label className="block  font-medium text-primary">
                  Answer
                </label>
                <div className="mt-1">
                  <p className="font-normal text-dark ">
                    {faqRecord?.answer || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className="block text-primary">
                SEO and Visibility Settings Section
              </span>
            </div>
            <div className="w-full">
              <div className="w-full">
                <label className="block  font-medium text-primary">
                  Keywords
                </label>
                <div className="mt-1">
                  <p className="font-normal text-dark ">
                    {faqRecord?.keywords.join(", ") || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex justify-between w-full mt-5">
                <div className="w-full">
                  <label className="block  font-medium text-primary">
                    Tags
                  </label>
                  <div className="mt-1">
                    <p className="font-normal text-dark ">
                      {faqRecord?.tags.join(", ") || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-y-1">
                  <label className="text-primary font-bold">Featured</label>
                  {!faqRecord?.featured ? (
                    <span className="rounded-xl px-4 py-1 bg-[#FFFAEB] flex gap-2 items-center text-[#B54708] w-fit">
                      <span className="min-w-[12px] min-h-[12px] rounded-full bg-[#F79009]"></span>
                      <span>No</span>
                    </span>
                  ) : (
                    <span className="rounded-xl px-4 py-1 bg-[#ECFDF3] flex gap-2 items-center text-[#027948] w-fit">
                      <span className="min-w-[12px] min-h-[12px] rounded-full bg-[#12B76A]"></span>
                      <span>Yes</span>
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full mt-5">
                <label className="block  font-medium text-primary">
                  Visibility
                </label>
                <div className="mt-1">
                  <p className="font-normal text-dark ">
                    {faqRecord?.visibility || "N/A"}
                  </p>
                </div>
              </div>

              <div className="w-full mt-5">
                <label className="text-primary">Status</label>
                <div className="dropdown-container relative w-full mt-2">
                  <ComponentDropdown
                    name="duration"
                    SummaryChild={
                      <h5 className="p-0 m-0 text-primary">
                        {statusDropDown.showName}
                      </h5>
                    }
                    dropdownList={status}
                    search={false}
                    commonFunction={setStatusDropDown}
                    selected={statusDropDown.name}
                  />
                </div>
              </div>
              <div className="flex justify-between w-full mt-5">
                <div className="w-full">
                  <label className="block  font-medium text-primary">
                    Created Date
                  </label>
                  <div className="mt-1">
                    <p className="font-normal text-dark ">
                      {formatDateTime(faqRecord?.createdAt) || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="w-full">
                  <label className="block  font-medium text-primary">
                    Updated Date
                  </label>
                  <div className="mt-1">
                    <p className="font-normal text-dark ">
                      {formatDateTime(faqRecord?.updatedAt) || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className="block text-primary">
                Priority and Engagement Section
              </span>
            </div>
            <div className="w-full">
              <div className="w-full">
                <label className="block  font-medium text-primary">
                  Priority Level
                </label>
                <div className="mt-1">
                  <p className="font-normal text-dark ">
                    {faqRecord?.priority || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewFAQManagement;
