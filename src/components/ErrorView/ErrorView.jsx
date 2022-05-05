import PropTypes from 'prop-types';

import errorImage from 'images/sadCat.jpg';
import { Wrap, ImageError } from './ErrorView.styled';

export const ErrorView = ({ message }) => {
  return (
    <Wrap>
      {message}
      <ImageError src={errorImage} width="500" alt="sad cat" />
    </Wrap>
  );
};

ErrorView.propTypes = {
  message: PropTypes.string.isRequired,
};
