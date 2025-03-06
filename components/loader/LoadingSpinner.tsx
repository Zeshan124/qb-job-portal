"use client";

import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="relative w-20 h-20 perspective-3d">
        <div className="absolute inset-0 border-4 border-t-transparent border-indigo-400 rounded-full animate-spin-orbit-3d shadow-md shadow-indigo-500/30"></div>

        <div className="absolute inset-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full animate-pulse-core shadow-xl shadow-indigo-600/50"></div>

        <div className="absolute w-5 h-5 bg-indigo-200 rounded-full animate-orbit-particle-3d shadow-lg shadow-indigo-300/70"></div>
      </div>
      <p className="mt-8 text-indigo-200 font-semibold tracking-wide animate-pulse-text">
        Loading...
      </p>
    </div>
  );
};

export default LoadingSpinner;
