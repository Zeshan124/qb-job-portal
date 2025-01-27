"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PopupForm from "./PopupForm";
// import { PopupForm } from "./PopupForm";

export const ApplyButton = () => {
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
      <button
        onClick={applyHandler}
        type="button"
        className={`${
          isApplied && "opacity-20"
        } px-10 py-3 bg-blue-600 text-white font-semibold transition-all duration-300 hover:bg-blue-800 hover:scale-105`}
        disabled={isApplied}
      >
        {isApplied ? "Applied" : "Apply Now"}
      </button>
      <PopupForm
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onSubmit={handleSubmit}
      />
      <ToastContainer position="top-center" />
    </div>
  );
};
