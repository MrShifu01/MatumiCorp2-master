import { Carousel, Image } from 'react-bootstrap';

const TestimonialCarousel = () => {

  return (
    <Carousel pause='hover' className='bg-info mb-4'>
        <Carousel.Item>
        <p className="testimonial-text text-center">
              "Matumi M&A Corporate Advisers has been an exceptional partner in our journey of mergers and acquisitions.
              They have demonstrated a deep understanding of our business objectives and provided invaluable strategic advice.
              With their support, we've successfully navigated complex deals and achieved remarkable outcomes."
            </p>
        <p className="testimonial-author text-center">
          - John Smith, CEO of Allen Gray
        </p>
        </Carousel.Item>
        <Carousel.Item>
        <p className="testimonial-text text-center">
              "I am highly impressed with Matumi M&A Corporate Advisers' professionalism and dedication.
              They have a remarkable ability to grasp complex business situations and propose effective solutions.
              Our partnership with Matumi has opened up new opportunities and helped us achieve significant growth."
            </p>
            <p className="testimonial-author text-center">
              - Michael Johnson, CEO of ABC Enterprises
            </p>
        </Carousel.Item>
        <Carousel.Item>
        <p className="testimonial-text text-center">
              "Working with Matumi M&A Corporate Advisers has been a game-changer for our company.
              Their team's extensive knowledge and experience in the mergers and acquisitions field
              have led to transformative deals and strategic partnerships. Matumi's commitment to our
              success is evident in every step of the process."
            </p>
            <p className="testimonial-author text-center">
              - Jane Doe, CEO of XYZ Inc.
            </p>
        </Carousel.Item>
    </Carousel>
  );
};

export default TestimonialCarousel