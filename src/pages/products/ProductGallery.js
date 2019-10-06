import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Gallery from "react-photo-gallery";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProductGallery = ({ open, toggle, showGallery, images, imageRenderer, toggleSelectAll, title, allSelected, onDeleteImages }) => {

    return (
        <div>
            <Modal isOpen={open} toggle={toggle} className="modal-xl shadow-sm">
                <ModalHeader toggle={toggle}><FontAwesomeIcon icon="images" /> {title}</ModalHeader>
                <ModalBody>
                { 
                    //!!productSelected.images && productSelected.images.length > 0 ?
                    showGallery ?
                        <Gallery photos={images} renderImage={imageRenderer} /> 
                        : <strong>Produto não possui imagens</strong>
                }
                </ModalBody>
                <ModalFooter>
                    <div className="d-flex flex-fill justify-content-start">
                        <button disabled={!!images && images.length === 0} className="btn btn-outline-light text-dark" onClick={toggleSelectAll}>{!allSelected ? <FontAwesomeIcon icon="check-circle" /> : <FontAwesomeIcon icon="undo" />}</button>
                        <button disabled={!!images && images.length === 0} className="btn btn-outline-light text-dark" onClick={onDeleteImages}><FontAwesomeIcon icon="trash-alt" /></button>
                    </div>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ProductGallery
