'use client';

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PopupForm = ({
  isOpen,
  onRequestClose,
  onSubmit,
}: {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: () => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
    availability: "",
  });

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
    const { name, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : null,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(); // Only mark as "applied" when submitted
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose} // Close modal without applying
      contentLabel="Apply Now"
      className="modal-content"
      overlayClassName="modal-overlay"
      shouldCloseOnOverlayClick={true} // Allow closing on overlay click
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
          <label htmlFor="phone" className="block text-lg font-semibold">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="resume" className="block text-lg font-semibold">
            Resume
          </label>
          <input
            type="file"
            id="resume"
            name="resume"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="coverLetter" className="block text-lg font-semibold">
            Cover Letter
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="availability" className="block text-lg font-semibold">
            Availability Date & Time
          </label>
          <textarea
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer position="top-center" />
    </Modal>
  );
};

export default PopupForm;
