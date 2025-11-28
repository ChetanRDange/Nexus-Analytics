import { useCallback, useEffect, useState } from "react";
import TaskManager from "../assets/images/task-icon.png";
import axiosInstance from "../config/axiosInstance";
import { useNavigate } from "react-router-dom";

const PricingPlans = () => {
  const navigate = useNavigate();
  const [isMonthly, setIsMonthly] = useState(true);
  const [plans, setPlans] = useState([]); 

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/admin/plan");
      console.log(response); 
      const { data } = response;

      if (Array.isArray(data)) {
        setPlans(data);
      } else {
        console.error("API response is not an array", data);
        setPlans([]); 
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setPlans([]); 
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="w-full h-full overflow-x-hidden">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full">
          <div className="w-full flex flex-col justify-center gap-y-2">
            <h2 className="w-full text-2xl sm:text-3xl md:text-4xl font-semibold text-title mb-0.5">
              Choose the right plan for your team
            </h2>
            <p className="text-dark w-full  tracking-wide font-medium">
              Explore all the features of our Basic, Standard, and Enterprise
              plans on a 30 days free trial.
            </p>
          </div>

          <div className="w-full flex justify-start items-center mt-6">
            <div className="py-1 px-1 rounded-xl border border-primary flex gap-2 items-center">
              <button onClick={() => setIsMonthly(true)}
                className={`py-2 px-2 rounded-xl text-title text-sm whitespace-nowrap sm:text-base ${
                  isMonthly ? "py-1.5 bg-primary text-white" : ""
                }`}
               id="button-88">
                Monthly
              </button>

              <button onClick={() => setIsMonthly(false)}
                className={`py-2 px-2 rounded-xl text-title text-sm whitespace-nowrap sm:text-base ${
                  !isMonthly ? "py-1.5 bg-primary text-white" : ""
                }`}
               id="button-89">
                Yearly (Save 10%)
              </button>
            </div>
          </div>

          <div className="w-full px-2 py-10 flex gap-6 gap-y-10 justify-center flex-wrap">
            {Array.isArray(plans) && plans.length > 0 ? (
              plans.map((plan) => (
                <div
                  key={plan._id}
                  className={`py-7 px-3 z-40 rounded-xl border w-[340px] relative ${
                    plan.name === "Standard Plan"
                      ? "border-[#444CE7]"
                      : "border-primary"
                  }`}
                >
                  <div className="z-10">
                    {plan.isRecommended && (
                      <div className="z-10 absolute left-0 -top-[31px] bg-lightcyan text-primary w-full text-center px-1 py-0.5 border rounded-sm">
                        Recommended
                      </div>
                    )}
                  </div>

                  <div className="">
                    <h4 className="text-dark font-semibold text-xl py-2 sm:py-3">
                      {plan.name}
                    </h4>

                    <div className="py-2 sm:py-3 flex gap-2 items-end">
                      <span className="text-black text-3xl sm:text-4xl font-semibold tracking-wide">
                        ${isMonthly ? plan.priceMonthly : plan.priceYearly}
                      </span>
                      <span className="text-dark sm:text-lg whitespace-nowrap">
                        per user / month
                      </span>
                    </div>

                    <div className="w-full flex justify-center">
                      <button className="w-full my-8 border border-primary rounded-xl py-1.5 px-4 text-dark text-base font-medium hover:bg-gray-50"
                        onClick={() =>
                          navigate("/billing-page", {
                            state: { plan, isMonthly },
                          })
                        }
                       id="button-90">
                        {"Start a Trial"}
                      </button>
                    </div>

                    <div className="py-3">
                      <span className="text-dark font-normal text-lg">
                        Features:
                      </span>
                      <div className="flex flex-col gap-y-3 pt-4">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex gap-2 items-start">
                            <span>
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width={24}
                                  height={24}
                                  rx={12}
                                  fill="#D1FADF"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M17.0964 7.38967L9.9364 14.2997L8.0364 12.2697C7.6864 11.9397 7.1364 11.9197 6.7364 12.1997C6.3464 12.4897 6.2364 12.9997 6.4764 13.4097L8.7264 17.0697C8.9464 17.4097 9.3264 17.6197 9.7564 17.6197C10.1664 17.6197 10.5564 17.4097 10.7764 17.0697C11.1364 16.5997 18.0064 8.40967 18.0064 8.40967C18.9064 7.48967 17.8164 6.67967 17.0964 7.37967V7.38967Z"
                                  fill="#12B76A"
                                />
                              </svg>
                            </span>
                            <span className="font-normal text-dark text-base sm:text-lg">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
