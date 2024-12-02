import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ViewReviews() {
  const [userReviews, setUserReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
    setUserReviews(savedReviews);
  }, []);

  const deleteReview = (index) => {
    const updatedReviews = userReviews.filter((_, i) => i !== index);
    setUserReviews(updatedReviews);
    localStorage.setItem('userReviews', JSON.stringify(updatedReviews));
  };

  return (
    <div className="reviews-page">
      <h2>Your Book Reviews</h2>
      
      {userReviews.length === 0 ? (
        <div className="no-reviews">
          <p>You haven't written any reviews yet.</p>
          <button onClick={() => navigate('/')} className="return-home-button">
            Browse Books to Review
          </button>
        </div>
      ) : (
        <div className="reviews-grid">
          {userReviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-card-header">
                <img 
                  src={review.bookImage || '/placeholder-book.jpg'} 
                  alt={review.bookTitle}
                  className="review-book-thumbnail"
                />
                <div className="review-card-title">
                  <h3>{review.bookTitle}</h3>
                  <div className="review-rating">
                    Rating: {review.rating}/10
                  </div>
                </div>
              </div>
              
              <div className="review-card-content">
                <p className="review-description">{review.description}</p>
                <div className="review-metadata">
                  <span className="review-date">Reviewed on {review.date}</span>
                  <button 
                    onClick={() => deleteReview(index)}
                    className="delete-review-button"
                  >
                    Delete Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewReviews; 