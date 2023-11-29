import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import "./ConfirmationDialog.css";

Modal.setAppElement("#root");

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
    const [modalIsOpen, setModalIsOpen] = useState(true);

    const handleConfirm = () => {
        onConfirm();
        setModalIsOpen(false);
    };

    const handleCancel = () => {
        onCancel();
        setModalIsOpen(false);
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleCancel}
            contentLabel="Confirmation Dialog"
            className="confirmation-dialog__modal"
        >
            <h2 className="confirmation-dialog__modal__title">{message}</h2>
            <div className="confirmation-dialog__modal__buttons">
                <button className="confirmation-dialog__modal__buttons__button confirmation-dialog__modal__buttons__button--confirm" onClick={handleConfirm}>Confirm</button>
                <button className="confirmation-dialog__modal__buttons__button confirmation-dialog__modal__buttons__button--cancel" onClick={handleCancel}>Cancel</button>
            </div>

        </Modal>
    );
};

export default ConfirmationDialog;