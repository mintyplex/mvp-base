import React from "react";
import ReactDOM from "react-dom";

// Optional: Import a CSS module or style directly for custom styling
import "../../components/ui/LoadingModal.css";
import UpdateProfile from "./page";

const ProfileModal = ({ isOpen }: any) => {
  if (!isOpen) return null;
  function closeModal() {
    isOpen = false;
  }

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="">
        <UpdateProfile />
      </div>
    </div>
  );
};

export default ProfileModal;
