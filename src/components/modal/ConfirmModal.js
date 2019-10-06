import React from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ConfirmModal = ({ open, toggle, className, confirmationQuestion, onConfirmAction }) => {

    return (
        <div>
            <Modal isOpen={open} toggle={toggle} className={className}>
                <ModalBody>
                    <span style={{fontFamily: 'roboto slab'}} className="flex-fill text-dark">{confirmationQuestion}</span>    
                </ModalBody>
                <ModalFooter className="p-2">
                    <div className="d-flex flex-fill justify-content-start">
                        <button className="btn btn-outline-light text-primary flex-fill" onClick={onConfirmAction}><FontAwesomeIcon icon="check"/></button>
                        <div className="ml-2 mr-2"></div>
                        <button className="btn btn-outline-light text-accent flex-fill" onClick={toggle}><FontAwesomeIcon icon="times"/></button>
                    </div>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ConfirmModal
