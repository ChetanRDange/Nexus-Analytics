import React, { useState } from "react";
import { Link } from "react-router-dom";
import Social from "../assets/images/sociallink.png";
import Close from "../assets/svgs/close.svg";
import MultiselectDropdown from "./MultiselectDropdown";

const statuses = [
  { id: 0, showName: "Facebook", name: "facebook" },
  { id: 1, showName: "Instagram", name: "instagram" },
  { id: 2, showName: "Twitter", name: "twitter" },
  { id: 3, showName: "LinkedIn", name: "linkedin" },
  { id: 4, showName: "Enter Profile URL or Username", name: "other" },
];

const AddSocialMediaLink = ({ isAddSocialMediaLinkOpen, setIsAddSocialMediaLinkOpen }) => {
  if (!isAddSocialMediaLinkOpen) return null;

  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [profileUrls, setProfileUrls] = useState({
    facebook: "https://facebook.com/yourprofile",
    instagram: "https://instagram.com/yourprofile",
    twitter: "https://twitter.com/yourprofile",
    linkedin: "https://linkedin.com/yourprofile",
    youtube: "https://youtube.com/yourprofile",
    pinterest: "https://pinterest.com/yourprofile",
    other: "https://instagram.com/yourprofile",
  });

  const handleSelectionChange = (selected) => {
    setSelectedAccounts(selected);
  };

  const handleUrlChange = (e) => {
    const { name, value } = e.target;
    setProfileUrls({
      ...profileUrls,
      [name]: value,
    });
  };

  const handleSubmit = (action) => {
    if (action === "save") {
      console.log("Form Submitted:", profileUrls);
    } else {
      console.log("Form Cancelled");
    }
    setIsAddSocialMediaLinkOpen(false);
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"
        onClick={() => setIsAddSocialMediaLinkOpen(false)}
      ></div>
      <div className="flex items-start py-5 justify-center w-full min-h-screen px-4 text-center lg:absolute lg:top-[12%]">
        <form className="bg-white rounded-2xl text-left overflow-hidden shadow-xl flex flex-col gap-2 transform transition-all w-[95%] sm:w-[80%] md:w-[75%] lg:w-[70%] xl:w-[664px] 2xl:w-[664px] px-6 2xl:px-8 py-10">
          <div className="w-full flex flex-col gap-6 justify-center items-center relative">
            <button
              onClick={() => setIsAddSocialMediaLinkOpen(false)}
              className="absolute top-0 right-0 p-2"
              id="button-1"
            >
              
              <img src={Close} alt="" />
            </button>
            <img src={Social} alt="" className="w-12 h-12" />
            <h2 className="text-3xl font-bold text-center mb-2 text-primary ">Add Social Media Account</h2>
          </div>
          <p className="text-secondary text-center font-medium mb-3">
            Link your social media accounts to connect or update them easily.
          </p>
          <div className="dropdown-container relative w-full mt-1 text-[16px]">
            <MultiselectDropdown data={statuses} label="Select Social Media Account" onChange={handleSelectionChange} />
          </div>

          {selectedAccounts.map((account) => (
            <div key={account.id} className="mt-4">
              {account.name !== "other" ? (
                <>
                  <label htmlFor={`${account.name}Url`} className="block text-sm font-medium text-primary mb-1">
                    {account.showName} URL
                  </label>
                  <input
                    type="text"
                    id={`${account.name}Url`}
                    name={account.name}
                    value={profileUrls[account.name]}
                    onChange={handleUrlChange}
                    className="w-full p-2 border border-primary text-secondary rounded-xl"
                  />
                </>
              ) : (
                <>
                  <label htmlFor="otherUrl" className="block text-sm font-medium text-primary mb-1">
                    Enter Profile URL or Username for {account.showName}
                  </label>
                  <input
                    type="text"
                    id="otherUrl"
                    name="other"
                    value={profileUrls.other}
                    onChange={handleUrlChange}
                    className="w-full p-2 border border-primary text-secondary rounded-xl"
                  />
                </>
              )}
            </div>
          ))}

          <hr className="h-0.5 px-0 bg-darkgray my-5" />
          <div className="mt-6 flex justify-end gap-3">
            <Link
              id="cancel"
              onClick={() => handleSubmit("cancel")}
              className="px-4 py-2 text-primary font-medium bg-white rounded-xl border border-primary whitespace-nowrap"
            >
              Cancel
            </Link>
            <Link
              id="save"
              onClick={() => handleSubmit("save")}
              className="px-4 py-2 text-white font-medium bg-primary rounded-xl whitespace-nowrap items-center"
            >
              Save
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSocialMediaLink;
