import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  // const footerRef = useRef(null);

  // useEffect(() => {
  //   const revealObserver = (entries) => {
  //     const [entry] = entries;
  //     //console.log(entry);

  //     if (entry.isIntersecting)
  //       entry.target.classList.remove("translate-y-1/4");
  //     else entry.target.classList.add("translate-y-1/4");
  //   };

  //   const footerObserver = new IntersectionObserver(revealObserver, {
  //     root: null,
  //     threshold: 0.1,
  //   });

  //   if (footerRef.current) {
  //     footerObserver.observe(footerRef.current);
  //     // footerRef.style.
  //   }
  // }, [footerRef]);

  return (
    <footer
      className="bg-slate-800 text-lg-start bg-body-tertiary text-muted"
      // ref={footerRef}
    >
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
      {/* <!-- Section: Social media --> */}

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
                  Angular
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  React
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Vue
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Laravel
                </a>
              </p>
            </div>
          </div>
          {/* <!-- Grid column --> */}

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
                  Orders
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Help
                </a>
              </p>
            </div>
          </div>
          {/* <!-- Grid column --> */}

          {/* <!-- Grid column --> */}
          <div className="col-md-4 col-lg-3 col-xl-3 mb-md-0 mb-4">
            {/* <!-- Links --> */}

            <h6 className="text-uppercase mb-4 font-serif text-center">
              Contact
            </h6>
            <div className=" mx-16">
              <p>
                <i className="fas fa-home me-3 "></i> New York, NY 10012, US
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                info@example.com
              </p>
              <p>
                <i className="fas fa-phone me-3 "></i> + 01 234 567 88
              </p>
              <p>
                <i className="fas fa-print me-3"></i> + 01 234 567 89
              </p>
            </div>
          </div>
        </div>
        {/* <!-- Grid row --> */}
      </section>
      {/* <!-- Section: Links  --> */}

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
