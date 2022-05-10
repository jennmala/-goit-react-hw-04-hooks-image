import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { ErrorView } from 'components/ErrorView/ErrorView';
import { PendingView } from 'components/PendingView/PendingView';
import { Modal } from 'components/Modal/Modal';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';

import { fetchPictures } from 'services/pictures-api';

import { AppWrap } from './App.styled';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
  LOADINGMORE: 'loadingMore',
};

export const App = () => {
  const [word, setWord] = useState(null);
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [page, setPage] = useState(1);
  const [isModalShow, setIsModalShow] = useState(false);
  const [currentPicture, setCurrentPicture] = useState(null);

  const pageEndRef = useRef(null);

  useLayoutEffect(() => {
    pageEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [pictures]);

  useEffect(() => {
    if (!word) {
      return;
    }

    if (page === 1) {
      setStatus(STATUS.PENDING);
    } else {
      setStatus(STATUS.LOADINGMORE);
    }

    fetchPictures(word, page)
      .then(pictures => {
        if (pictures.hits.length === 0) {
          return Promise.reject(
            new Error(`No images matching request "${word}". Try another.`)
          );
        }

        if (page === 1) {
          setPictures(pictures.hits);
        } else {
          setPictures(prev => [...prev, ...pictures.hits]);
        }
        setStatus(STATUS.RESOLVED);
      })
      .catch(error => {
        setError(error.message);
        setStatus(STATUS.REJECTED);
      });
  }, [word, page]);

  const onFormSubmit = data => {
    setWord(data);
    setPage(1);
  };

  const toggleModal = e => {
    if (!isModalShow) {
      setCurrentPicture(
        pictures.find(picture => picture.webformatURL === e.target.src)
      );
    }
    setIsModalShow(prev => !prev);
  };

  return (
    <AppWrap>
      <Searchbar onSubmit={onFormSubmit} />

      {status === STATUS.REJECTED && <ErrorView message={error} />}

      {(status === STATUS.RESOLVED || status === STATUS.LOADINGMORE) && (
        <>
          <ImageGallery pictures={pictures} toggleModal={toggleModal} />

          <div ref={pageEndRef} />
        </>
      )}

      {(status === STATUS.PENDING || status === STATUS.LOADINGMORE) && (
        <PendingView />
      )}

      {status === STATUS.RESOLVED && (
        <LoadMoreButton
          onClick={() => {
            setPage(prev => prev + 1);
          }}
        />
      )}

      {isModalShow && (
        <Modal
          largeImage={currentPicture.largeImageURL}
          alt={currentPicture.tags}
          closeModal={toggleModal}
        />
      )}

      <ToastContainer autoClose={2000} />
    </AppWrap>
  );
};
