import { useRef } from "react";
import useIntersectionObserver from "./IntersectionObserver";

const Team = () => {
  const h2Ref = useRef();
  const isIntersecting = useIntersectionObserver(h2Ref, { threshold: 0.5 });
  return (
    <section className='team bg-light' id='team'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <h2 ref={h2Ref} className={`about-title text-center text-dark mt-6 invisible-h2 ${isIntersecting ? 'animate-slide-in' : ''}`}>Team</h2>
            <hr className="w-25 mx-auto mb-5 text-black" />
          </div>
        </div>

        <div className='row gy-3 pb-5'>
          {/* Jane */}
          <div className='col-lg-3 col-md-6'>
            <div className="card h-100 shadow">
              <img className="card-img-top" src="jane.webp" alt="Jane" />
              <div className="card-body">
                <h5 className="card-title">Jane Ashburner</h5>
                <p className="card-text">Jane has over 25 years of M&A experience and spent 10 years as a management consultant. She manages the entire M&A process including deal origination, pre-deal analysis and preparation, marketing, deal structuring and transaction execution.</p>
              </div>
            </div>
          </div>

          {/* Patrick */}
          <div className='col-lg-3 col-md-6'>
            <div className="card h-100 shadow">
              <img className="card-img-top" src="patrick.webp" alt="Patrick" />
              <div className="card-body">
                <h5 className="card-title">Patrick Glyn</h5>
                <p className="card-text">Patrick is a qualified CA with over 35 years experience in corporate advisory services. He is primarily responsible for valuations, information memorandum compilations and accounting, financial, tax and legal structuring work.</p>
              </div>
            </div>
          </div>

          {/* Philip */}
          <div className='col-lg-3 col-md-6'>
            <div className="card h-100 shadow">
              <img className="card-img-top" src="philip.webp" alt="Philip" />
              <div className="card-body">
                <h5 className="card-title">Philip Rogers</h5>
                <p className="card-text">Philip has worked for McKinsey & Company and Ethos Private Equity. He focuses on diagnostics, developing the investment thesis, strategy development, & post-merger integration. Philip has a BBusSci Hons from UCT and an MBA from INSEAD.</p>
              </div>
            </div>
          </div>

          {/* Michael */}
          <div className='col-lg-3 col-md-6'>
            <div className="card h-100 shadow">
              <img className="card-img-top" src="micheal.webp" alt="Michael" />
              <div className="card-body">
                <h5 className="card-title">Michael Egner</h5>
                <p className="card-text">Michael has worked for numerous international tech start-ups as well as Ethos Private Equity and the JSE. He focuses on financial analysis, transaction structuring, growth strategy, and fundraising. Michael has a LLB from UCT and a PGDipFS from Oxford.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;
