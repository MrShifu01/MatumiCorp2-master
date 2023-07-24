import React from 'react';
import { Link } from 'react-scroll'

const Hero = () => {
  return (
    <div className='hero-container' id='hero'>
      {/* Container for the background image */}
      <div className='hero-image'></div>
      <div className='hero-overlay'></div>

      {/* Container for the hero text */}
      <div className='hero-text'>
        <h6 className='text-uppercase text-sm'>Welcome to</h6>
        <h1 className='heading'>Matumi Corporate Advisers</h1>
        <p className='lead'>
          Matumi is a boutique M&A advisory firm specializing in end-to-end merger and acquisition services across various sectors, including healthcare, logistics, and technology.
        </p>
        <div>
        <Link
            activeClass='active'
            to='about'
            spy={true}
            smooth={true}
            offset={-90} // Offset to adjust the scrolling position, you can change this as needed
            duration={500} // Duration of the scroll animation
          >
            <button className='btn btn-lg btn-primary mt-2 shadow' variant="light" size="lg">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
