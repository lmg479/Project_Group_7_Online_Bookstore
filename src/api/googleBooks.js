const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const fetchBooks = async (query = '') => {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${query || 'bestsellers'}&maxResults=20`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};