import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { PendingView } from 'components/PendingView/PendingView';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';

import { GalleryWrap } from './ImageGallery.styled';

export const ImageGallery = ({ pictures, isLoadingMore, onMoreBtnClick }) => {
  return (
    <>
      <GalleryWrap>
        {pictures.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            smallImage={webformatURL}
            largeImage={largeImageURL}
            alt={tags}
          />
        ))}
      </GalleryWrap>

      {isLoadingMore ? (
        <PendingView />
      ) : (
        <LoadMoreButton
          onClick={() => {
            onMoreBtnClick();
          }}
        />
      )}
    </>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object.isRequired),
  isLoadingMore: PropTypes.bool.isRequired,
  onMoreBtnClick: PropTypes.func.isRequired,
};
