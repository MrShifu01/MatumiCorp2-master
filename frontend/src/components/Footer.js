import { Link } from "react-scroll";

const Footer = () => {
  return (
    <section className="bg-#F4F4F4 bg-gradient">
      <div className="container-xxl">
        <div className="row my-5">
          <div className="col-md-6 text-sm-center">
            <img src="black.png" className="px-3" style={{ width: "100px" }} alt="Matumi Logo" />
            Copyright &copy; 2023 Matumi Corporate Advisers
          </div>
          <div className="col-md-6 text-end">
            <div className="footer-wrapper d-flex justify-content-center pt-3 col-md-8 offset-md-2">
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
  );
};

export default Footer;
