import PropTypes from 'prop-types';

import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { toast } from 'react-toastify';

import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [keyWord, setKeyWord] = useState('');

  const onInputChange = e => {
    setKeyWord(e.currentTarget.value);
  };

  const onFormSubmit = e => {
    e.preventDefault();
    const name = keyWord.trim();
    if (name === '') {
      toast.error('Enter a word!');
      return;
    }
    onSubmit(name.toLowerCase());
    setKeyWord('');
  };

  return (
    <Header>
      <SearchForm onSubmit={onFormSubmit}>
        <SearchFormButton type="submit">
          <IconContext.Provider
            value={{ style: { width: '50%', height: 'auto' } }}
          >
            <div>
              <BsSearch />
            </div>
          </IconContext.Provider>

          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          onChange={onInputChange}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={keyWord}
          name="keyWord"
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
