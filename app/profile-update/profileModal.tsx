import React from "react";
import ReactDOM from "react-dom";

// Optional: Import a CSS module or style directly for custom styling
import "../../components/ui/LoadingModal.css";
import UpdateProfile from "./page";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const closeModal = () => {
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="">
        <UpdateProfile closeModal={closeModal} />
      </div>
    </div>
  );
};

export default ProfileModal;
