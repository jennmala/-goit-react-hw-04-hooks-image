import PropTypes from 'prop-types';

import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ smallImage, alt, toggleModal }) => {
  return (
    <Item onClick={toggleModal}>
      <Image src={smallImage} alt={alt} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
