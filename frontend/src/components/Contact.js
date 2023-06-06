import React from 'react'
import Faq from './Faq'

function Contact() {
  return (
    <div>
      <form className="text-center border border-light p-5" action="#!" style={{ marginBottom: '100px' }}>
        <p className="h4 mb-4 text-primary">Contact us</p>
        <p className="text-center mt-4">Have questions or want to learn more about our tech bootcamp?<br /> Fill out the form above and we'll get back to you as soon as possible. We're excited to hear from you!</p>
        <input type="text" id="defaultContactFormName" className="form-control mb-4" placeholder="Name" />
        <input type="email" id="defaultContactFormEmail" className="form-control mb-4" placeholder="E-mail" />
        <div className="form-group" style={{ marginBottom: '50px' }}>
          <textarea className="form-control rounded-0" id="exampleFormControlTextarea2" rows="3" placeholder="Message"></textarea>
        </div>
        <button className="btn btn-info btn-block btn-lg" type="submit">Send</button>
      </form>
      <Faq />
    </div>


  )
}

export default Contact