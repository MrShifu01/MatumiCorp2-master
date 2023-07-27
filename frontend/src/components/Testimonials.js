import TestimonialCarousel from "./Carousel";
import { useRef } from "react";
import useIntersectionObserver from "./IntersectionObserver";

const Testimonials = () => {
  const h2Ref = useRef();
  const isIntersecting = useIntersectionObserver(h2Ref, { threshold: 0.5 });
  return (
    <section className='testimonials bg-#F4F4F4' id='testimonials'>
      <div className='row mb-5'>
        <div className='col-md-6 offset-md-3'>
          <h2 ref={h2Ref} className={`about-title text-center text-dark mt-6 invisible-h2 ${isIntersecting ? 'animate-slide-in' : ''}`}>Testimonials</h2>
        </div>
      </div>
      <div className="container-xxl">
          <div className="row">
            <div className="col-md-8 offset-md-2 mb-6">
                <TestimonialCarousel />
            </div>
          </div>
      </div>
    </section>
  );
};

export default Testimonials;
