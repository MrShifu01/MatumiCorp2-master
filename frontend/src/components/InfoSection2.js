import React from 'react'
import { Link } from 'react-router-dom'

const InfoSection2 = () => {
  return (
    <section className='info-section1 bg-black bg-gradient' id='info-section2'>
        <div className='container'>
            <div className='row'>
                <div className='col mx-auto pt-5 text-center'>
                    <h4 className='text-light my-5'>We take complete ownership of the origination, facilitation, and execution of all M&A transactions, ensuring optimal success by conducting efficient and highly targeted transaction processes.</h4>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6 offset-md-3 mx-auto text-center pb-5'>
                  <Link to='/transactions' className='btn btn-primary shadow btn-lg my-4'>View Previous Transactions</Link>
                </div>
            </div>

        </div>
    </section>
  )
}

export default InfoSection2