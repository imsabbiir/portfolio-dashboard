"use client";
import React, { useEffect, useState } from "react";
import { FaCheck, FaPen, FaTimes } from "react-icons/fa";

function Page() {
  const [pricingPlans, setPricingPlans] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/packages");
      const data = await response.json();
      setPricingPlans(data);
    };
    fetchData();
  }, []);

  // Toggle the 'included' field of a service
  const toggleIncluded = (planIndex, serviceIndex) => {
    const updatedPlans = [...pricingPlans];
    const current = updatedPlans[planIndex].services[serviceIndex].included;
    updatedPlans[planIndex].services[serviceIndex].included = !current;
    setPricingPlans(updatedPlans);
  };

  const handleUpdate = async (planIndex) => {
    const updatedPlan = pricingPlans[planIndex];
    try {
      const res = await fetch(`/api/packages/${updatedPlan._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPlan),
      });

      if (!res.ok) throw new Error("Failed to update");
      setEditIndex(null);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="mt-5">
      <div className="w-full grid  md:grid-cols-3 lg:grid-cols-3 gap-3">
        {pricingPlans.map((plan, planIndex) => {
          const isEditing = editIndex === planIndex;

          return (
            <div
              key={planIndex}
              className="px-4 py-6 gradientBg flex flex-col items-center relative"
            >
              <h2 className="text-lg font-semibold titleText mb-4">
                {plan.title}
              </h2>
              {isEditing ? (
                <div className="mb-4">
                  <input
                    type="text"
                    value={plan.price}
                    onChange={(e) => {
                      const updatedPlans = [...pricingPlans];
                      updatedPlans[planIndex].price = e.target.value;
                      setPricingPlans(updatedPlans);
                    }}
                    className="text-center text-[32px] font-semibold activeText uppercase w-full bg-transparent border-b border-gray-400 focus:outline-none"
                  />
                  <span
                    className={`pl-1 ${
                      isNaN(Number(plan.price))
                        ? ""
                        : "text-base font-normal subTitleText"
                    }`}
                  ></span>
                </div>
              ) : (
                <p className="text-[32px] font-semibold activeText mb-4 uppercase">
                  {plan.price}
                  <span
                    className={`pl-1 ${
                      isNaN(Number(plan.price))
                        ? ""
                        : "text-base font-normal subTitleText"
                    }`}
                  >
                    {isNaN(Number(plan.price)) ? "*" : "$"}
                  </span>
                </p>
              )}

              <ul className="mt-5 mb-10 flex flex-col items-start gap-4">
                {plan?.services?.map((service, serviceIndex) => (
                  <li
                    key={serviceIndex}
                    className="flex justify-between items-center w-full text-sm"
                  >
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <input
                          type="checkbox"
                          checked={service.included}
                          onChange={() =>
                            toggleIncluded(planIndex, serviceIndex)
                          }
                          className="accent-yellow-500"
                        />
                      ) : (
                        <span className="text-[10px] font-light">
                          {service.included ? <FaCheck /> : <FaTimes />}
                        </span>
                      )}
                      <span
                        className={`subTitleText text-xs ${
                          !service.included && !isEditing ? "opacity-30" : ""
                        }`}
                      >
                        {service.serviceName}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <div
                className="absolute -top-2 -right-2 h-7 w-7 rounded-full activeBg flex justify-center items-center cursor-pointer swapText"
                onClick={() =>
                  isEditing ? setEditIndex(null) : setEditIndex(planIndex)
                }
              >
                {isEditing ? (
                  <FaTimes className="text-xs" />
                ) : (
                  <FaPen className="text-xs" />
                )}
              </div>

              {isEditing && (
                <button
                  onClick={() => handleUpdate(planIndex)}
                  className="mt-3 px-4 py-1 text-xs rounded bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  Update
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Page;
