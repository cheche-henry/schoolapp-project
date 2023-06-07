import React, { useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'
import { CourseContext } from '../../context/CourseContext';
import { AuthContext } from '../../context/AuthContext';
function Navbar() {
  const { courses } = useContext(CourseContext);
  const { currentuser } = useContext(AuthContext);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary shadow mb-10 rounded" id="navigation">
        <div className="container">
          <Link to="/" className="navbar-brand" id="logo">
            🏫 <span className="color-primary">Cheche</span>Academy
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
            <ul className="navbar-nav" id="navlist">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  🏠 Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="about" className="nav-link active">
                  📙 About us
                </Link>
              </li>
              <li className="nav-item">
                <Link to="contactus" className="nav-link active">
                  📞 Contact us
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link active dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Our courses
                </a>
                <ul className="dropdown-menu">
                {courses &&
                  courses.map((course) => (
                    <li key={course.id}>
                      <Link to={`apply/${course.id}`} className="dropdown-item">{course.title}</Link>
                    </li>
                  ))}
              </ul>
              </li>
              {currentuser && currentuser?
              <>
             <li className="nav-item">
                <Link to="account/dashboard" className="nav-link active">
                  Dashboard
                </Link>
              </li>
              </>:<> <li className="nav-item">
                <Link to="account/login" className="nav-link active">
                  🔒 Login
                </Link>
              </li></>
          } 
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
