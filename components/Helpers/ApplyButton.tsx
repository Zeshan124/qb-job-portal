"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PopupForm from "./PopupForm";

export const ApplyButton = ({ jobID }: { jobID: number }) => {
  const [isApplied, setIsApplied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const applyHandler = () => {
    if (!isApplied) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
    setIsApplied(true);
    toast.success("Application Submitted Successfully!");
  };

  return (
    <div>
      {" "}
      <button
        onClick={applyHandler}
        type="button"
        className={`${
          isApplied && "opacity-20"
        } px-10 py-3 bg-[#8570C5] text-white font-semibold transition-all duration-300 hover:bg-purple-600 hover:scale-105`}
        disabled={isApplied}
      >
        {" "}
        {isApplied ? "Applied" : "Apply Now"}
      </button>
      {/* Pass the jobID dynamically to the PopupForm */}
      <PopupForm
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onSubmit={handleSubmit}
        jobID={jobID} // Dynamically passed
      />
      <ToastContainer position="top-center" />
    </div>
  );
};
