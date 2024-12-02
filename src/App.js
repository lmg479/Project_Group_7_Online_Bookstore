import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './components/Home';
import Login from './components/Auth/Login';
import CreateProfile from './components/Auth/CreateProfile';
import Cart from './components/Cart/Cart';
import Profile from './components/Profile/Profile';
import CreateReview from './components/Reviews/CreateReview';
import ViewReviews from './components/Reviews/ViewReviews';
import './styles/styles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-review" element={<CreateReview />} />
          <Route path="/reviews" element={<ViewReviews />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
