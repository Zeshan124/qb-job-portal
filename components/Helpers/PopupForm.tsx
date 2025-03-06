"use client";

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PopupForm = ({
  isOpen,
  onRequestClose,
  onSubmit,
  jobID,
}: {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: () => void;
  jobID: number;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    availabilityDate: "",
    availabilityTime: "",
    resumePDF: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      resumePDF: files ? files[0] : null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.resumePDF) {
      if (!toast.isActive("resumeError")) {
        toast.error("Please upload your resume.", { toastId: "resumeError" });
      }
      return;
    }

    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("phoneNo", formData.phoneNo);
    formPayload.append("availabilityDate", formData.availabilityDate);
    formPayload.append("availabilityTime", formData.availabilityTime);
    formPayload.append("jobID", String(jobID));
    formPayload.append("resumePDF", formData.resumePDF);
    formPayload.append("status", "received");

    try {
      setIsSubmitting(true);

      const response = await fetch(
        "https://bhrportal.qist.pk/apis/application/post",
        {
          method: "POST",
          body: formPayload,
        }
      );

      const result = await response.json();

      if (response.ok) {
        if (!toast.isActive("success")) {
          // toast.success("Application submitted successfully!", {
          //   toastId: "success",
          // });
        }
        setFormData({
          name: "",
          email: "",
          phoneNo: "",
          availabilityDate: "",
          availabilityTime: "",
          resumePDF: null,
        });
        onSubmit();
      } else {
        if (!toast.isActive("error")) {
          toast.error(result.message || "Failed to submit application.", {
            toastId: "error",
          });
        }
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      if (!toast.isActive("error")) {
        toast.error("Something went wrong. Please try again later.", {
          toastId: "error",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Apply Now"
      className="modal-content w-[90%] max-w-3xl mx-auto my-4 sm:my-8 bg-white rounded-2xl shadow-xl overflow-hidden"
      overlayClassName="modal-overlay fixed inset-0 bg-gray-600 bg-opacity-70 flex items-center justify-center transition-opacity duration-300"
      shouldCloseOnOverlayClick={true}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative px-4 sm:px-6 md:px-8 py-6"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-800 p-4 -mx-4 sm:-mx-6 md:-mx-8 -mt-6 mb-6">
          <button
            onClick={onRequestClose}
            className="absolute right-4 top-4 text-white hover:text-gray-200 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-xl sm:text-2xl font-semibold text-white text-center">
            Application Form
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100 text-center mt-1">
            Join our team - Submit your application today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm transition-all duration-200 text-sm sm:text-base"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm transition-all duration-200 text-sm sm:text-base"
                placeholder="john.doe@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label
                htmlFor="phoneNo"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phoneNo"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm transition-all duration-200 text-sm sm:text-base"
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
            <div>
              <label
                htmlFor="availabilityDate"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5"
              >
                Available Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="availabilityDate"
                name="availabilityDate"
                value={formData.availabilityDate}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm transition-all duration-200 text-sm sm:text-base"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="availabilityTime"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5"
            >
              Preferred Interview Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              id="availabilityTime"
              name="availabilityTime"
              value={formData.availabilityTime}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm transition-all duration-200 text-sm sm:text-base"
              required
            />
          </div>

          <div>
            <label
              htmlFor="resumePDF"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5"
            >
              Resume Upload (PDF) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="file"
                id="resumePDF"
                name="resumePDF"
                onChange={handleFileChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-md file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 shadow-sm cursor-pointer text-sm sm:text-base"
                accept=".pdf"
                required
              />
              <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Max 5MB • PDF format only
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center pt-4 gap-4 sm:gap-0">
            <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
              Fields marked with <span className="text-red-500">*</span> are
              required
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-indigo-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm sm:text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Submit Application"
              )}
            </motion.button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-100 text-center text-xs sm:text-sm text-gray-500">
          Secured by Qist Bazaar • Your data is protected
        </div>
      </motion.div>
    </Modal>
  );
};

export default PopupForm;
