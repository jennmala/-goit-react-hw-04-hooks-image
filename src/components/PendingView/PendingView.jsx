import { TailSpin } from 'react-loader-spinner';
import { Wrap } from './PendingView.styled';

export const PendingView = () => {
  return (
    <Wrap>
      <TailSpin height="100" width="100" color="blue" ariaLabel="loading" />
      Loading ...
    </Wrap>
  );
};
