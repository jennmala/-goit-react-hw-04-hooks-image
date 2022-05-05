const KEY = '25171774-7b79c52a8837e6f3634106172';

export function fetchPictures(keyWord, page) {
  return fetch(
    `https://pixabay.com/api/?q=${keyWord}s&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(result => {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(new Error('Try another request'));
  });
}
