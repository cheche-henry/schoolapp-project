import React, { useState } from 'react';
import { Link } from 'react-router-dom'
function Faq() {
  const [showText, setShowText] = useState(Array(4).fill(false));

  const toggleText = (index) => {
    const updatedShowText = [...showText];
    updatedShowText[index] = !updatedShowText[index];
    setShowText(updatedShowText);
  };

  return (
    <div>  <section className="py-12 py-sm-24 bg-info-light" style={{ marginBottom: '150px' }}>
      <div className="container">
        <div className="mb-16 text-center">
          <span className="fs-9 fw-semibold text-primary text-uppercase">HAVE ANY QUESTIONS?</span>
          <h2 className="mt-8 " style={{ marginBottom: '50px' }}>Frequently Asked Questions</h2>
        </div>
        <div className="mw-3xl mx-auto">
          <button className="btn p-8 mb-2 w-100 bg-white fw-medium text-start lh-base rounded-4 border border-primary px-4" onClick={() => toggleText(0)}>
            <div className="d-flex justify-content-between">
              <div>
                <h6 className="fs-7 mb-0">How long does it take to complete a course in our bootcamp?</h6>
              </div>
              <div className="ps-4">
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.16732 7.5L7.00065 1.66667L12.834 7.5" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
            </div>
            <p className={`mw-md mt-4 mb-0 text-secondary ${showText[0] ? '' : 'd-none'}`}>
              That depends on the specific course a person is interested in. Our courses can go for a duration on anywhere between 3 and 6 months.
            </p>
          </button>
          <button className="btn mb-2 p-8 w-100 bg-white fw-medium text-start lh-base rounded-4 border border-primary-light px-4" onClick={() => toggleText(1)}>
            <div className="d-flex justify-content-between">
              <div>
                <h6 className="fs-7 mb-0">What are the requirements for our courses?</h6>
              </div>
              <div className="ps-4">
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.8327 1.5L6.99935 7.33333L1.16602 1.5" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
            </div>
            <p className={`mw-md mt-4 mb-0 text-secondary ${showText[1] ? '' : 'd-none'}`}>
              ~ All applicants must be 18 years and above and provide proof of ID/Passport.<br />
              ~ Applicants should have completed at least highschool education.<br />
              ~ Applicants should have basic knowledge on computers.

            </p>
          </button>
          <button className="btn mb-2 p-8 w-100 bg-white fw-medium text-start lh-base rounded-4 border border-primary-light px-4" onClick={() => toggleText(2)}>
            <div className="d-flex justify-content-between">
              <div>
                <h6 className="fs-7 mb-0">Why choose the Cheche Academy?</h6>
              </div>
              <div className="ps-4">
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.8327 1.5L6.99935 7.33333L1.16602 1.5" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
            </div>
            <p className={`mw-md mt-4 mb-0 text-secondary ${showText[2] ? '' : 'd-none'}`}>
              In today's digital age, understanding and embracing technology is more crucial than ever before. By learning about tech, you equip yourself with the necessary skills and knowledge to navigate this rapidly evolving landscape. Enroll in our tech bootcamp and unlock limitless opportunities.


            </p>
          </button>
          <button className="btn mb-2 p-8 w-100 bg-white fw-medium text-start lh-base rounded-4 border border-primary-light px-4" onClick={() => toggleText(3)}>
            <div className="d-flex justify-content-between">
              <div>
                <h6 className="fs-7 mb-0">What payment methods do you accept?</h6>
              </div>
              <div className="ps-4">
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.8327 1.5L6.99935 7.33333L1.16602 1.5" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
            </div>
            <p className={`mw-md mt-4 mb-0 text-secondary ${showText[3] ? '' : 'd-none'}`}>
              We accept various payment methods, including credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. You can choose the preferred payment method which shall be used for the duration of the bootcamp.
            </p>
          </button>
        </div>
      </div>
    </section></div>
  )
}

export default Faq