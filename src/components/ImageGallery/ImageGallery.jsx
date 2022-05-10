import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { GalleryWrap } from './ImageGallery.styled';

export const ImageGallery = ({ pictures, toggleModal }) => {
  return (
    <GalleryWrap>
      {pictures.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          smallImage={webformatURL}
          alt={tags}
          toggleModal={toggleModal}
        />
      ))}
    </GalleryWrap>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object.isRequired),
  toggleModal: PropTypes.func.isRequired,
};
