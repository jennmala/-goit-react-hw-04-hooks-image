import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { ErrorView } from 'components/ErrorView/ErrorView';
import { PendingView } from 'components/PendingView/PendingView';

import { fetchPictures } from 'services/pictures-api';

import { AppWrap } from './App.styled';

export const App = () => {
  const [word, setWord] = useState(null);
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const pageEndRef = useRef(null);

  useLayoutEffect(() => {
    console.log('useLayoutEffect');
    pageEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [pictures]);

  useEffect(() => {
    if (!word) {
      return;
    }
    setStatus('pending');
    fetchPictures(word, 1)
      .then(pictures => {
        if (pictures.hits.length === 0) {
          return Promise.reject(
            new Error(`No images matching request "${word}". Try another.`)
          );
        }
        setPictures(pictures.hits);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error.message);
        setStatus('rejected');
      });
  }, [word]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    setIsLoadingMore(true);
    fetchPictures(word, page)
      .then(pictures => {
        setPictures(prev => [...prev, ...pictures.hits]);
        setIsLoadingMore(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, [page, word]);

  function onLoadMoreClick() {
    setIsLoadingMore(true);
    setPage(prev => prev + 1);
  }

  return (
    <AppWrap>
      <Searchbar
        onSubmit={e => {
          setWord(e);
          setPage(1);
        }}
      />

      {status === 'pending' && <PendingView />}

      {status === 'rejected' && <ErrorView message={error} />}

      {status === 'resolved' && (
        <>
          <ImageGallery
            pictures={pictures}
            isLoadingMore={isLoadingMore}
            onMoreBtnClick={onLoadMoreClick}
          />

          <div ref={pageEndRef} />
        </>
      )}

      <ToastContainer autoClose={2000} />
    </AppWrap>
  );
};
