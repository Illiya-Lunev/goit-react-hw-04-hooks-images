
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '22951340-683a641f2fde08e18261bbe3d';
  
export const fetchImages = ( { nextQuery, page } ) => {
    return fetch(
      `${BASE_URL}/?q=${nextQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
  
      return Promise.reject(new Error("Oops, nothing was found!"));
    })
  }
  

