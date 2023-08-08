import { useRef } from "react";
import useIntersectionObserver from "./IntersectionObserver";
import { FiPhoneCall } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { FaMapPin } from "react-icons/fa";

const Contact = () => {
  const h2Ref = useRef();
  const isIntersecting = useIntersectionObserver(h2Ref, { threshold: 0.5 });

  const address = "The Reserve, 54 Melville Rd, Illovo, Johannesburg";

  return (
    <section id="contact" className="contact text-bg-primary bg-gradient py-6">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-12">
            <h2
              ref={h2Ref}
              className={`about-title text-light text-center invisible-h2 ${
                isIntersecting ? "animate-slide-in" : ""
              }`}
            >
              Contact
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="my-5 mx-6">
              <p className="d-flex gap-2 align-items-center">
                <div className="contact-circle me-5">
                  <FiPhoneCall className="contact-phone-icon w-100 mb-5 text-black" />
                </div>
                <strong>Tel:</strong> (011) 283 7700
              </p>
              <p className="d-flex gap-2 align-items-center">
                <div className="contact-circle me-5">
                  <FaMapPin className="contact-map-icon w-100 mb-5 text-black" />
                </div>
                <span>Address: </span>
                <a
                  className="address-link text-decoration-none"
                  rel="noreferrer"
                  target="_blank"
                  href={`https://maps.google.com/?q=${address}`}
                >
                  The Reserve, 54 Melville Rd, Illovo, Johannesburg
                </a>
              </p>
              <p className="d-flex gap-2 align-items-start">
                <div className="contact-circle me-5">
                  <AiOutlineMail className="contact-email-icon w-100 mb-5 text-black" />
                </div>
                <strong className="pt-3">Email:</strong>{" "}
                <div className="d-flex flex-column pt-3">
                  <a
                    className="email-link text-decoration-none"
                    href="mailto:jane@matumicorp.co.za"
                  >
                    jane@matumicorp.co.za
                  </a>
                  <a
                    className="email-link text-decoration-none"
                    href="mailto:patrick@matumicorp.co.za"
                  >
                    patrick@matumicorp.co.za
                  </a>
                  <a
                    className="email-link text-decoration-none"
                    href="mailto:philip@matumicorp.co.za"
                  >
                    philip@matumicorp.co.za
                  </a>
                </div>
              </p>
            </div>
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-4">
            <h2 className="mb-4 text-light">Get in Touch</h2>
            {/* <p className="lead">
              We welcome all inquiries and would be delighted to hear from you.
              Please don't hesitate to reach out to us for any questions or
              business opportunities.
            </p> */}
            <form className="form" name="contact" netlify>
              <div className="mb-5">
                <input
                  type="text"
                  className="form-control bg-transparent border-top-0 border-start-0 border-end-0 rounded-0 border-muted text-white"
                  name="name"
                  placeholder="Enter Name"
                />
              </div>

              <div className="mb-5">
                <input
                  name="email"
                  type="email"
                  className="form-control bg-transparent border-top-0 border-start-0 border-end-0 rounded-0 border-muted text-white"
                  placeholder="Enter Email"
                />
              </div>

              <div className="mb-5">
                <textarea
                  name="message"
                  className="form-control bg-transparent border-top-0 border-start-0 border-end-0 rounded-0 border-muted text-white "
                  placeholder="Enter Message"
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
