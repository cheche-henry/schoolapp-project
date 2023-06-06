import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div><footer className="text-center text-primary" style={{ backgroundColor: 'whitesmoke' }}>
      <div className="container">
        <section className="" style={{ marginTop: '30px' }}>
          {/* Facebook */}
          <a style={{ color: '#3b5998', marginRight: '1rem' }} href="#!" role="button">
            <i className="bi bi-facebook fs-1"></i>
          </a>

          {/* Twitter */}
          <a style={{ color: '#55acee', marginRight: '1rem' }} role="button">
            <i className="bi bi-twitter fs-1"></i>
          </a>

          {/* Google */}
          <a style={{ color: '#dd4b39', marginRight: '1rem' }} role="button">
            <i className="bi bi-google fs-1"></i>
          </a>

          {/* Instagram */}
          <a style={{ color: '#ac2bac', marginRight: '1rem' }} role="button">
            <i className="bi bi-instagram fs-1"></i>
          </a>

        </section>
        <hr className="my-5" />
        <section className="mb-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <p>
                Unlock your potential in the tech industry with our comprehensive bootcamp programs.
                <br />
                Learn the latest technologies, gain hands-on experience, and acquire the skills needed to thrive in the
                digital era.
                <br />
                Our expert instructors and cutting-edge curriculum will guide you through the exciting world of tech.
                <br />
                Join us today and shape your future in the tech industry.
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        ©Cheche Academy 2023
      </div>
    </footer></div>
  )
}

export default Footer