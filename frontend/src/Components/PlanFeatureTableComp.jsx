import React, { useState, useEffect } from "react";
import Check from "../assets/svgs/settings/check2.svg";
import Cross from "../assets/svgs/settings/cross.svg";

const plans = [
  "Basic Plan ($5/user/mo)",
  "Standard Plan ($8/user/mo)",
  "Advanced Plan ($12/user/mo)",
  "Enterprise Plan ($22/user/mo)",
];

const features = [
  "Lead and Opportunity Tracking",
  "Basic Reporting Tools",
  "Email Integration",
  "Sales Forecasting",
  "Customizable Pipelines",
  "Task and Activity Management",
  "User Accounts",
  "Priority Email Support",
  "Advanced Analytics and Reporting",
  "CRM Tool Integration",
  "Phone and Chat Support",
  "Customizable Workflows",
  "API Access for Integrations",
  "Dedicated Account Manager",
  "Mobile Access",
  "Document Management",
  "Email Campaigns and Templates",
  "Custom Reporting",
  "Multi-Currency Support",
  "Workflow Automation",
  "Advanced Security Features",
  "User Permissions and Roles",
  "Bulk Import/Export",
];

const generateRandomAvailability = () => {
  return features.map(() => {
    return plans.map(() => (Math.random() > 0.5 ? "✓" : "✗"));
  });
};

const PlanFeatureTableComp = () => {
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    setAvailability(generateRandomAvailability());
  }, []);

  return (
    <div className="container mx-auto">
      <div className="overflow-x-auto border rounded-xl bg-white">
        <table className="min-w-full text-sm text-left text-primary font-medium">
          <thead className=" text-primary capitalize bg-darkgray">
            <tr>
              <th className="py-3.5 px-6 font-medium">Feature</th>
              {plans.map((plan, index) => (
                <th key={index} className="font-medium ">
                  {plan}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, featureIndex) => (
              <tr key={featureIndex} className="hover:bg-gray-50 ">
                <td className="py-6 px-6 border-b border-gray-300 w-2/5">
                  {feature}
                </td>
                {availability[featureIndex]?.map((status, planIndex) => (
                  <td
                    key={planIndex}
                    className="border-b border-gray-300 text-center"
                  >
                    {status === "✓" ? (
                      <img src={Check} alt="Check" />
                    ) : (
                      <img src={Cross} alt="Cross" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanFeatureTableComp;
