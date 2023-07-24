import { useRef } from "react";
import useIntersectionObserver from "./IntersectionObserver";

const Services = () => {
  const h2Ref = useRef();
  const isIntersecting = useIntersectionObserver(h2Ref, { threshold: 0.5 });
  return (
    <section className='services bg-primary bg-gradient' id='services'>
      <div className='container'>
        <div className='row pt-6'>
          <div className='col-md-6 offset-md-3'>
            <h2 ref={h2Ref} className={`text-white about-title text-center invisible-h2 ${isIntersecting? 'animate-slide-in' : ''}`}>Services</h2>
            <hr class="w-25 mx-auto mb-6 text-secondary"/>
          </div>
        </div>
        <div className='row pb-6 text-white'>
          <div className='col-md-6 p-5'>
            <h4 className='text-uppercase text-center'>Sell-side mandates</h4>
            <p className='text-center w-75 m-auto'>Sell-side mandates with mid-sized companies (enterprise value of between R50 million and R3 billion) seeking a minority or majority investor and/or shareholders seeking a partial or total exit from the business.</p>
          </div>
          <div className='col-md-6 p-5'>
          <h4 className='text-uppercase text-center'>Buy-side mandates</h4>
            <p className='text-center w-75 m-auto'>Buy-side mandates with trade buyers, private equity funds and institutional investors whom we assist to hone their acquisition strategies, select strategic targets and successfully acquire target companies.</p>
          </div>
          <div className='col-md-6 p-5'>
          <h4 className='text-uppercase text-center'>B-BBEE</h4>
            <p className='text-center w-75 m-auto'>Broad-Based Black Economic Empowerment (B-BBEE) transactions for clients seeking optimally structured and financed transactions with B-BBEE investors that can add long term strategic and financial value to the company.</p>
          </div>
          <div className='col-md-6 p-5'>
          <h4 className='text-uppercase text-center'>Capital Raising</h4>
            <p className='text-center w-75 m-auto'>Capital Raising for established businesses seeking expansion or growth capital and for selected start-ups and early stage companies seeking to raise venture capital.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services