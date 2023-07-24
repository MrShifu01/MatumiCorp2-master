import { Link } from "react-scroll"

const Footer = () => {
  return (
    <section className='bg-light bg-gradient'>
        <div className='container-xxl'>
        <div color="row">
                <div className='col text-center py-5'>
                    <img src="black.png" style={{width: '200px'}} alt="Matumi Logo"/>
                </div>
            </div>
            <div className='row text-center'>
                <div className='col pb-5'>
                    Copyright &copy; 2023 Matumi Corporate Advisers
                </div>
            </div>
            <div className='row'>
                <div className='footer-wrapper d-flex justify-content-center mb-5 col-md-8 offset-md-2'>
                    <Link
                        className="footer-link"
                      to="about"
                      spy={true}
                      smooth={true}
                      offset={-90}
                      duration={500}
                    >
                      About
                    </Link>
                    <Link
                        className="footer-link"
                      to="services"
                      spy={true}
                      smooth={true}
                      offset={-90}
                      duration={500}
                    >
                      Services
                    </Link>
                    <Link
                        className="footer-link"
                      to="transactions"
                      spy={true}
                      smooth={true}
                      offset={-90}
                      duration={500}
                    >
                      Transactions
                    </Link>
                    <Link
                        className="footer-link"
                      to="team"
                      spy={true}
                      smooth={true}
                      offset={-90}
                      duration={500}
                    >
                      Team
                    </Link>
                    <Link
                        className="footer-link"
                      to="contact"
                      spy={true}
                      smooth={true}
                      offset={-90}
                      duration={500}
                    >
                      Contact
                    </Link>

                </div>
            </div>


        </div>
    </section>
  )
}

export default Footer