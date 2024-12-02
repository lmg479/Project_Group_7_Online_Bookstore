import { useState, useEffect } from 'react';

function Profile() {
  const [likedBooks, setLikedBooks] = useState([]);

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likedBooks') || '[]');
    setLikedBooks(savedLikes);
  }, []);

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      <h2>Liked Books:</h2>
      {likedBooks.length > 0 ? (
        <ul>
          {likedBooks.map((book, index) => (
            <li key={index}>{`${book.title} by ${book.author}`}</li>
          ))}
        </ul>
      ) : (
        <p>No liked books yet.</p>
      )}
    </div>
  );
}

export default Profile;