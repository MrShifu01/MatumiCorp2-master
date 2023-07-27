import useIntersectionObserver from "./IntersectionObserver"
import { useRef } from 'react';

const About = () => {
    const h2Ref = useRef();
    const isIntersecting = useIntersectionObserver(h2Ref, { threshold: 0.5 });
    return (
    <section className='about bg-#F4F4F4' id='about'>
        <div className='container'>
            <div className="row mb-5 pt-6">
                <div className="col-md-12">
                    <h2 ref={h2Ref} className={`about-title text-center text-dark invisible-h2 ${isIntersecting ? 'animate-slide-in' : ''}`}>About Us</h2>
                </div>
            </div>
            <div className='row pt-6'>
                <div className='col-md-12'>

                    {/* <hr className="w-25 mx-auto mb-5"/> */}
                    <h4>History</h4>
                    <hr className="w-25 mb-5"/>
                    <p>The company was founded in 2000 by Jane Ashburner and Patrick Glyn.</p>

                    <p><strong>Professional Team: </strong>We have a highly experienced, professional team of M&amp;A specialists whose expertise includes business
                        strategy and diagnostics, valuations, corporate structuring, tax and contract law. This team is supported by a
                        strong cohort of associates, strategic partners and industry specialists in South Africa and globally.</p>

                    <p><strong>Business Network: </strong>Our long-established and extensive regional and global business network provides rapid access to buyers,
                        investors, and potential acquisition targets including those that may need to be discreetly approached.</p>

                    <p><strong>Jurisdictions: </strong>These transactions have included complex cross border transactions covering jurisdictions such as the US, UK,
                        Australia, Germany, Italy, and Brazil.</p>

                    <p><strong>B-BBEE Deals: </strong>We concluded our first B-BBEE transaction in 2003 and have continued to nurture our strong ties with leading
                        B-BBEE investors.</p>

                    <p><strong>Referrals: </strong>Our excellent execution rate and strong relationship with clients have enabled Matumi to thrive over the years
                        based purely on referrals and repeat business from satisfied clients.</p>

                    <h4 className='mt-5'>Why Matumi</h4>
                    <hr className="w-25 mb-5"/>
                    <ul className='about-list'>
                        <li className='about-list-item'>In-depth pre-engagement analysis of the client’s business and transaction objectives and how realistic and
                            achievable those objectives are and what, if anything, can be done to improve value before going to market
                        </li>
                        <li className='about-list-item'>Detailed valuations which we use to manage pricing expectations and ensure that financial projections are
                            realistic, defendable and market related</li>
                        <li className='about-list-item'>Expert project management of every engagement by a Matumi executive who establishes a close working
                            relationship with both negotiating parties and constantly keeps all stakeholders informed</li>
                        <li className='about-list-item'>Vigilance when it comes to identifying and managing potential obstacles that could derail the process
                            including ensuring that any relevant information is disclosed to all parties as early as possible</li>
                        <li className='about-list-item'>Focus on safeguarding our clients’ reputations by running a tightly controlled and carefully targeted
                            process – this ensures that buyers are not perceived to be opportunistic and/or process heavy and that
                            sellers do not destroy value by approaching the market in a haphazard way</li>
                        <li className='about-list-item'>Rigorous screening of potential investors and acquisition targets to ensure they meet the transaction
                            criteria (size, profitability, cultural etc.) before engaging the client and distracting management</li>
                        <li className='about-list-item'>Concern with preserving a healthy working relationship between negotiating parties (buyers and sellers)
                            post the transaction.</li>
                    </ul>
                </div>
            </div>
            <img className='img-fluid' src='assets/img/ipad.png' alt='' />
        </div>
    </section>
  )
}

export default About