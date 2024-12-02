import { Link } from 'react-router-dom';

function Navbar() {
  const handleSearchClick = (e) => {
    e.preventDefault();
    const searchBar = document.getElementById("searchBarContainer");
    if (searchBar) {
      searchBar.style.display = searchBar.style.display === 'none' ? 'flex' : 'none';
    }
  };

  return (
    <header className="navbar">
      <div className="logo-container">
        <img src="/logo.jpg" alt="Library Logo" className="header-image" />
        <h2 className="library-title">Online Bookstore</h2>
      </div>

      <div className="search-container">
        <div className="nav-profile-container">
          <nav className="nav-links">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/reviews">Reviews</Link></li>
            </ul>
          </nav>
          
          <div className="profile-icon">
            <Link to="/profile">
              <img src="/profile.jpg" alt="Profile" className="profile-img" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;