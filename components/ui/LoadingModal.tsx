import React from "react";
import ReactDOM from "react-dom";

// Optional: Import a CSS module or style directly for custom styling
import "./LoadingModal.css";

const LoadingModal = ({isOpen}: any) => {
  if (!isOpen) return null;

  // This modal is rendered using ReactDOM.createPortal,
  // which appends this component to the body element of the DOM,
  // ensuring that it is on top of other content.
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="loading-spinner">
          {/* Here you can use any kind of spinner you prefer. Below is a simple CSS-based example. */}
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    </div>,
    document.body // Assuming the body is the modal container
  );
};

export default LoadingModal;
