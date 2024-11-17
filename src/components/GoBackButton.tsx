"use client";

import React from "react";

const GoBackButton = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <button
      onClick={handleGoBack}
      className="hover:bg-secondary-dark mb-4 rounded-lg bg-primary px-4 py-2 text-white"
    >
      Go Back
    </button>
  );
};

export default GoBackButton;
