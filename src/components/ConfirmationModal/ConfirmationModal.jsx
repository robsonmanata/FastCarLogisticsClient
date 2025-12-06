import React from 'react';
import { ConfirmationModalStyles } from './ConfirmationModalStyle';

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    const styles = new ConfirmationModalStyles();

    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <h2 style={styles.title}>{title}</h2>
                <p style={styles.message}>{message}</p>
                <div style={styles.buttonGroup}>
                    <button style={styles.cancelButton} onClick={onCancel}>
                        Cancel
                    </button>
                    <button style={styles.confirmButton} onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
