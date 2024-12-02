import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../../api/googleBooks';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedBooks, setLikedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBooks();
    const savedLikes = JSON.parse(localStorage.getItem('likedBooks') || '[]');
    setLikedBooks(savedLikes);
  }, []);

  const loadBooks = async (searchQuery = '') => {
    try {
      setLoading(true);
      const results = await fetchBooks(searchQuery || 'bestsellers');
      setBooks(results);
    } catch (err) {
      console.error('Error loading books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadBooks(query);
  };

  const toggleLike = (book) => {
    const isLiked = likedBooks.some(b => b.id === book.id);
    let updatedLikes;
    
    if (isLiked) {
      updatedLikes = likedBooks.filter(b => b.id !== book.id);
    } else {
      updatedLikes = [...likedBooks, {
        id: book.id,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors?.[0] || 'Unknown Author'
      }];
    }
    
    setLikedBooks(updatedLikes);
    localStorage.setItem('likedBooks', JSON.stringify(updatedLikes));
  };

  const handleReview = (book) => {
    navigate('/create-review', { state: { book } });
  };

  return (
    <div>
      <form id="searchBarContainer" onSubmit={handleSearch}>
        <input
          type="text"
          id="searchInput"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        
        <select 
          id="filterDropdown"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="genre">Genre</option>
        </select>

        <button 
          type="submit"
          id="searchSubmitButton"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </form>

      <div className="book-grid">
        {loading ? (
          <div>Loading books...</div>
        ) : books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="book-item">
              <div className="book-like-button">
                <button 
                  onClick={() => toggleLike(book)}
                  className={`like-button ${likedBooks.some(b => b.id === book.id) ? 'liked' : ''}`}
                >
                  👍
                </button>
              </div>
              <img
                src={book.volumeInfo.imageLinks?.thumbnail || '/placeholder-book.jpg'}
                alt={book.volumeInfo.title}
                className="book-cover"
              />
              <div className="book-info">
                <h3 className="book-title">{book.volumeInfo.title}</h3>
                <p className="book-author">
                  By {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
                </p>
                <div className="book-options">
                  <button onClick={() => alert('Added to cart!')}>Add to Cart</button>
                  <button onClick={() => handleReview(book)}>Review</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No books found</div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;