function Footer() {
  return (
    <footer className="bg-[#333446] text-lg-start bg-body-tertiary font-serif">
      {/* <!-- Section: Social media --> */}
      <section className="flex justify-content-center justify-content-lg-between p-4 border-bottom text-white">
        {/* <!-- Left --> */}
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        {/* <!-- Right --> */}
        <div>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-google"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>

      {/* <!-- Section: Links  --> */}
      <section className="container text-white">
        {/* <!-- Grid row --> */}
        <div className="row mt-3 flex justify-around items-center">
          {/* <!-- Grid column --> */}
          <div className="col-md-2 col-lg-2 col-xl-2  mb-4">
            {/* <!-- Links --> */}
            <h6 className="text-uppercase fw-bold mb-4 text-center">
              Products
            </h6>
            <div className=" mx-20">
              <p>
                <a href="#!" className="text-reset">
                  JavaScript
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  React
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Node
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Mongoose
                </a>
              </p>
            </div>
          </div>

          {/* <!-- Grid column -->  */}
          <div className="col-md-3 col-lg-2 col-xl-2 mb-4">
            {/* <!-- Links --> */}

            <h6 className="text-uppercase fw-bold mb-4 text-center">
              Useful links
            </h6>
            <div className=" mx-20">
              <p>
                <a href="#!" className="text-reset">
                  Pricing
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Settings
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Booking
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Guides
                </a>
              </p>
            </div>
          </div>

          {/* <!-- Grid column --> */}
          <div className="col-md-4 col-lg-3 col-xl-3 mb-md-0 mb-4">
            {/* <!-- Links --> */}

            <h6 className="text-uppercase mb-4 font-serif text-center">
              Contact
            </h6>
            <div className=" mx-14">
              <p>
                <i className="fas fa-home me-3 "></i> Bagmati, Kathmandu, NP
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                jibachhkumar@gmail.com
              </p>
              <p>
                <i className="fas fa-phone me-3 "></i> +977 9810266710
              </p>
              <p>
                <i className="fas fa-print me-3"></i> +977 9843962498
              </p>
            </div>
          </div>
        </div>
        {/* <!-- Grid row --> */}
      </section>

      {/* <!-- Copyright --> */}
      <div
        className="text-center p-4 font-serif text-base text-white"
        // style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2024 Copyright:
        <a className="text-reset fw-bold" href="">
          Explore nepal
        </a>
      </div>
    </footer>
  );
}

export default Footer;
