import React from "react";
import ReactDOM from "react-dom";

// Optional: Import a CSS module or style directly for custom styling
import "./LoadingModal.css";

const LoadingModal = ({ isOpen }: any) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="loading-spinner">
          <div className="spinner"></div>
          {/* <p>Loading...</p> */}
        </div>
      </div>
    </div>,
    document.body 
  );
};

export default LoadingModal;
