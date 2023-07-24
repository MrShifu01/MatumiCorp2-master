import { useRef } from "react";
import useIntersectionObserver from "./IntersectionObserver";

const Contact = () => {
  const h2Ref = useRef();
  const isIntersecting = useIntersectionObserver(h2Ref, { threshold: 0.5 });

  const address = "The Reserve, 54 Melville Rd, Illovo, Johannesburg"

  return (
    <section id="contact" className="contact text-bg-primary bg-gradient py-6">
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="text-center mb-5">
              <h2 ref={h2Ref} className={`about-title text-light invisible-h2 ${isIntersecting ? 'animate-slide-in' : ''}`}>Contact</h2>
              <hr className="w-25 mx-auto text-secondary" />
              <p>
                <strong>Tel:</strong> (011) 283 7700
              </p> 
              <p>
                <a className='address-link' rel='noreferrer' target='_blank' href={`https://maps.google.com/?q=${address}`}>
                  Address: The Reserve, 54 Melville Rd,
                  Illovo, Johannesburg
                </a>
              </p>
              <p>
                <strong>Email:</strong> <a className='email-link' href="mailto:jane@matumicorp.co.za">jane@matumicorp.co.za</a> | <a className='email-link' href="mailto:patrick@matumicorp.co.za">patrick@matumicorp.co.za</a> | <a className='email-link' href="mailto:philip@matumicorp.co.za">philip@matumicorp.co.za</a>
              </p>
              <hr className="w-25 mx-auto mb-5 text-secondary" />
              <h2 className="mb-4 text-light">Get in Touch</h2>
              <p className="lead">
                We welcome all inquiries and would be delighted to hear from
                you. Please don't hesitate to reach out to us for any questions
                or business opportunities.
              </p>
            </div>
            <form className="form" name="contact" netlify>
              <div className="mb-5">
                <input
                  type="text"
                  className="form-control bg-transparent border-top-0 border-start-0 border-end-0 rounded-0 border-muted text-white"
                  name="name"
                  placeholder='Enter Name'
                />
              </div>

              <div className="mb-5">
                <input
                  name="email"
                  type="email"
                  className="form-control bg-transparent border-top-0 border-start-0 border-end-0 rounded-0 border-muted text-white"
                  placeholder='Enter Email'
                />
              </div>

              <div className="mb-5">
                <textarea
                  name="message"
                  className="form-control bg-transparent border-top-0 border-start-0 border-end-0 rounded-0 border-muted text-white "
                  placeholder='Enter Message'
                ></textarea>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-lg btn-dark shadow">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
