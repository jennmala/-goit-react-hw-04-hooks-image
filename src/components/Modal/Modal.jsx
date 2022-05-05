import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImage, alt, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', onEscClick);
    return () => window.removeEventListener('keydown', onEscClick);
  });

  const onEscClick = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <Overlay onClick={onBackdropClick}>
      <ModalWindow>
        <img src={largeImage} alt={alt} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
