import React, { useState } from "react";
import ComposePage from "../pages/ComposePage";

const ComposeButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button className="compose_button" onClick={openModal}>Compose</button>
      {isOpen && <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <button onClick={closeModal}>X</button>
          </div>
          <div className="modal-body">
            <ComposePage closeModal={closeModal} />
          </div>
        </div>
      </div>}
    </>
  );
};

export default ComposeButton;
