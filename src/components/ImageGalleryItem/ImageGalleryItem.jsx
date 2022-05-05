import { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'components/Modal/Modal';
import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ smallImage, alt, largeImage }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <>
      <Item onClick={toggleModal}>
        <Image src={smallImage} alt={alt} />
      </Item>

      {showModal && (
        <Modal largeImage={largeImage} alt={alt} closeModal={toggleModal} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
