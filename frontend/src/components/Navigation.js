import React, { useState, useEffect } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-scroll'
import { Link as LinkRouter } from 'react-router-dom';

const ScrollListener = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isScrolled;
};

function Navigation({bg}) {
  const [expanded, setExpanded] = useState(false);
  const isScrolled = bg === 'bg-light' ? true : ScrollListener();

  return (
    <div>
      <Navbar
        expand="lg"
        expanded={expanded}
        className={`navbar ${
          isScrolled ? "bg-light shadow-sm navbar-light" : "navbar-dark"
        } fixed-top`}
        variant="primary"
      >
        <div className="navbar-content container-fluid">
        <Navbar.Brand
          className={`text-2xl ${isScrolled ? "text-primary" : "text-light"}`}
          href="#hero"
        >
          {bg !== 'bg-light' ? (
            <Link
              to="hero"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <img
                style={{ width: "100px" }}
                src={`${isScrolled ? "/black.png" : "/white.png"}`}
                alt="logo"
              />
            </Link>
          ) : (
            <LinkRouter to="/">
              <img
                style={{ width: "100px" }}
                src={`${isScrolled ? "/black.png" : "/white.png"}`}
                alt="logo"
              />
            </LinkRouter>
          )}
        </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")}/>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className={`${isScrolled ? "" : "dark-bg"}`}
          >
            <Nav className="ms-auto pt-3">

              {bg !== 'bg-light' &&
                <>

                <Nav.Link>
                  <LinkRouter className='btn nav-button btn-primary shadow' to="/transactions">TRANSACTIONS</LinkRouter>
                </Nav.Link>

                <div
                  className={`text-uppercase nav-link-div ${
                    isScrolled ? "text-dark" : "text-light"
                  }`}
                
                >
                  <Link
                    activeClass="active-link"
                    to="about"
                    spy={true}
                    smooth={true}
                    offset={-90}
                    duration={500}
                    onClick={() => setExpanded(false)}
                  >
                    About us
                  </Link>
                </div>
                <div
                  className={`text-dark text-uppercase nav-link-div ${
                    isScrolled ? "text-dark" : "text-light"
                  }`}

                >
                  <Link
                    activeClass="active-link"
                    to="services"
                    spy={true}
                    smooth={true}
                    offset={-90}
                    duration={500}
                    onClick={() => setExpanded(false)}
                  >
                    Services
                  </Link>
                </div>
                <div
                  className={`text-dark text-uppercase nav-link-div ${
                    isScrolled ? "text-dark" : "text-light"
                  }`}
                >
                  <Link
                    activeClass="active-link"
                    to="testimonials"
                    spy={true}
                    smooth={true}
                    offset={-90}
                    duration={500}
                    onClick={() => setExpanded(false)}
                  >
                    Testimonials
                  </Link>
                </div>
                <div
                  className={`text-dark text-uppercase nav-link-div ${
                    isScrolled ? "text-dark" : "text-light"
                  }`}
                >
                  <Link
                    activeClass="active-link"
                    to="team"
                    spy={true}
                    smooth={true}
                    offset={-90}
                    duration={500}
                    onClick={() => setExpanded(false)}
                  >
                    Team
                  </Link>
                </div>
                <div
                  className={`text-dark text-uppercase nav-link-div ${
                    isScrolled ? "text-dark" : "text-light"
                  }`}
                >
                  <Link
                    activeClass="active-link"
                    to="contact"
                    spy={true}
                    smooth={true}
                    offset={-90}
                    duration={500}
                    onClick={() => setExpanded(false)}
                  >
                    Contact
                  </Link>
                </div>
              </>}

            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
}

export default Navigation;
