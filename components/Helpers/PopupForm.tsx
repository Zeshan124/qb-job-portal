"use client";

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
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
  jobID: number; // Pass the jobID as a prop
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
        "http://192.168.18.47:4000/apis/application/post",
        {
          method: "POST",
          body: formPayload,
        }
      );

      const result = await response.json();

      if (response.ok) {
        if (!toast.isActive("success")) {
          toast.success("Application submitted successfully!", {
            toastId: "success",
          });
        }
        setFormData({
          name: "",
          email: "",
          phoneNo: "",
          availabilityDate: "",
          availabilityTime: "",
          resumePDF: null,
        });
        onSubmit(); // Notify parent of successful submission
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
      className="modal-content"
      overlayClassName="modal-overlay"
      shouldCloseOnOverlayClick={true}
    >
      <h2 className="text-2xl mb-4">Apply Now</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg font-semibold">
            Candidate Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNo" className="block text-lg font-semibold">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNo"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label
            htmlFor="availabilityDate"
            className="block text-lg font-semibold"
          >
            Availability Date
          </label>
          <input
            type="date"
            id="availabilityDate"
            name="availabilityDate"
            value={formData.availabilityDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label
            htmlFor="availabilityTime"
            className="block text-lg font-semibold"
          >
            Availability Time
          </label>
          <input
            type="time"
            id="availabilityTime"
            name="availabilityTime"
            value={formData.availabilityTime}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="resumePDF" className="block text-lg font-semibold">
            Upload Resume (PDF)
          </label>
          <input
            type="file"
            id="resumePDF"
            name="resumePDF"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-lg"
            accept=".pdf"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </Modal>
  );
};

export default PopupForm;
