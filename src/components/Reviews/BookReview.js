import { useState } from 'react';

function BookReview({ book, onSubmitReview, onClose }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = {
      bookId: book.id,
      bookTitle: book.volumeInfo.title,
      bookImage: book.volumeInfo.imageLinks?.thumbnail,
      rating,
      comment,
      date: new Date().toLocaleDateString()
    };
    
    // Save to localStorage
    const existingReviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
    existingReviews.push(review);
    localStorage.setItem('userReviews', JSON.stringify(existingReviews));
    
    onSubmitReview(review);
    onClose();
  };

  return (
    <div className="review-modal">
      <div className="review-modal-content">
        <h2>Review: {book.volumeInfo.title}</h2>
        <form onSubmit={handleSubmit} className="review-form">
          <div className="rating-select">
            <label>Rating (1-5): </label>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num} Stars</option>
              ))}
            </select>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here..."
            required
          />
          <div className="review-buttons">
            <button type="submit">Submit Review</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookReview; 