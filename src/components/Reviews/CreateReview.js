import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function CreateReview() {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;
  const [rating, setRating] = useState(5);
  const [description, setDescription] = useState('');

  if (!book) {
    return (
      <div className="review-page">
        <div className="no-book-selected">
          <p>No book selected for review.</p>
          <button onClick={() => navigate('/')} className="return-home-button">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const review = {
      bookId: book.id,
      bookTitle: book.volumeInfo.title,
      bookImage: book.volumeInfo.imageLinks?.thumbnail,
      rating,
      description,
      date: new Date().toLocaleDateString()
    };

    // Save to localStorage
    const existingReviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
    existingReviews.push(review);
    localStorage.setItem('userReviews', JSON.stringify(existingReviews));

    // Show success message and navigate back
    alert('Review submitted successfully!');
    navigate('/');
  };

  return (
    <div className="review-page">
      <div className="review-container">
        <h2>Write a Review</h2>
        <div className="review-book-info">
          <img 
            src={book.volumeInfo.imageLinks?.thumbnail || '/placeholder-book.jpg'} 
            alt={book.volumeInfo.title}
            className="review-book-cover"
          />
          <div className="book-details">
            <h3>{book.volumeInfo.title}</h3>
            <p>By {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="review-form">
          <div className="rating-input">
            <label htmlFor="rating">Rating (1-10):</label>
            <input
              type="number"
              id="rating"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              required
            />
            <span className="rating-max">/ 10</span>
          </div>

          <div className="description-input">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your review here..."
              rows="6"
              required
            />
          </div>

          <div className="review-buttons">
            <button type="submit" className="submit-button">Submit Review</button>
            <button 
              type="button" 
              onClick={() => navigate('/')}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateReview;