import { Link } from "react-scroll"

const Footer = () => {
  return (
    <section className='bg-#F4F4F4 bg-gradient'>
        <div className='container-xxl'>
        <div color="row">
                <div className='col px-0 py-5'>
                    <img src="black.png" style={{width: '100px'}} alt="Matumi Logo"/>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6 text-sm-center'>
                    Copyright &copy; 2023 Matumi Corporate Advisers
                </div>
                <div className='col-md-6 text-end'>
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
        </div>
    </section>
  )
}

export default Footer