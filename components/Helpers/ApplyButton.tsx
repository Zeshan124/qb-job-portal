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
          isApplied && "opacity-50 cursor-not-allowed"
        } w-full sm:w-auto px-6 sm:px-10 py-2 sm:py-3 text-sm sm:text-base bg-indigo-500 to-indigo-800 
  text-white font-semibold rounded-lg transition-all duration-300 
  hover:bg-purple-600 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
        disabled={isApplied}
      >
        {isApplied ? "Applied" : "Apply Now"}
      </button>
      <PopupForm
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onSubmit={handleSubmit}
        jobID={jobID}
      />
      <ToastContainer position="top-center" />
    </div>
  );
};
