import React from "react";

const LoadingIndicator = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      data-test-id="LoadingIndicator"
    >
      <div className="spinner-border spinner-border-sm text-secondary">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingIndicator;
