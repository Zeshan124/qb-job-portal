"use client";

import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-60 z-50">
      <div className="relative w-16 h-16">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-t-indigo-500 border-r-indigo-300 border-b-transparent border-l-transparent rounded-full animate-spin-smooth shadow-lg shadow-indigo-500/20"></div>

        {/* Inner Core */}
        <div className="absolute inset-2 bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 rounded-full animate-pulse-soft shadow-inner shadow-purple-500/30"></div>

        {/* Orbiting Particle */}
        {/* <div className="absolute w-3 h-3 bg-indigo-300 rounded-full animate-orbit-smooth shadow-md shadow-indigo-400/50"></div> */}
      </div>
      <p className="mt-6 text-indigo-100 font-medium text-lg tracking-wider animate-fade-text">
        Loading...
      </p>
    </div>
  );
};

export default LoadingSpinner;
