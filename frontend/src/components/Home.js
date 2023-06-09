import React, { useEffect, useState } from 'react';
import Faq from './Faq';
function Home() {
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    if (reloadCount < 0) {
      setReloadCount(reloadCount + 1);
      window.location.reload();
    }
  }, [reloadCount]);

  return (
    <div> <div className="container" style={{ marginTop: '100px', marginBottom: '75px' }}>
      <div className="landing row">
        <div className="col-12 col-md-6 col-lg-8 mb-5 d-flex justify-content-center align-items-center">
          <img src="/landing.png" className="img-fluid" alt="loading..." />
        </div>
        <div className="col-12 col-md-6 col-lg-4 mb-5 d-flex justify-content-center align-items-center">
          <div className="text-container">
            <h2 className='text-primary'>Welcome to the Cheche Academy</h2>
            <h5>Begin your tech journey with us.</h5>
            <p>
              In today's digital age, understanding and embracing technology is more crucial than ever before. By learning
              about tech, you equip yourself with the necessary skills and knowledge to navigate this rapidly evolving
              landscape. Enroll in our tech bootcamp and unlock limitless opportunities.
            </p>
            <button type="button" className="btn btn-primary btn-lg">Get started</button>
          </div>
        </div>

      </div>
    </div>
      <div className="container" style={{ marginBottom: '150px' }}>
        <div className="row">
          <div className="col-lg-6">
            <h2 className="mb-4 text-primary">Our Mission</h2>
            <p className="lead">
              At our tech bootcamp, our mission is to empower individuals with the knowledge and skills needed to thrive in the rapidly evolving world of technology. We believe that everyone should have access to quality tech education, regardless of their background or previous experience. Through our comprehensive curriculum, hands-on projects, and expert instructors, we aim to provide a supportive and inclusive learning environment where students can gain the practical skills and industry insights necessary to pursue successful careers in tech.
            </p>
          </div>
          <div className="col-lg-6">
            <img src="/mission.png" className="img-fluid" alt="Mission" style={{ marginTop: '50px' }} />
          </div>
        </div>
      </div>

      <section style={{ marginBottom: '150px' }}>
        <div className="row d-flex justify-content-center">
          <div className="col-md-10 col-xl-8 text-center">
            <h3 className="mb-4">Testimonials</h3>
            <p className="mb-4 pb-2 mb-md-5 pb-md-0">
              Hear from our satisfied bootcamp participants who have successfully transformed their careers in the tech industry. They have experienced the comprehensive curriculum, hands-on projects, and expert guidance that our bootcamp offers. Read their stories and discover how our bootcamp can empower you to achieve your goals and excel in the rapidly evolving world of technology.
            </p>
          </div>
        </div>

        <div className="row text-center">
          <div className="col-md-4 mb-5 mb-md-0">
            <div className="d-flex justify-content-center mb-4">
              <img src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxhY2slMjBwZXJzb258ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                className="rounded-circle shadow-1-strong" width="150" height="150" />
            </div>
            <h5 className="mb-3">John Smith</h5>
            <h6 className="text-primary mb-3">Web Developer</h6>
            <p className="px-xl-3">
              The bootcamp has provided me with a solid foundation in web development. The curriculum is comprehensive, and the practical projects allowed me to apply my knowledge in real-world scenarios. I am now confident in pursuing a career in web development.
            </p>
          </div>
          <div className="col-md-4 mb-5 mb-md-0">
            <div className="d-flex justify-content-center mb-4">
              <img src="https://images.pexels.com/photos/1139245/pexels-photo-1139245.jpeg?cs=srgb&dl=pexels-joshua-mcknight-1139245.jpg&fm=jpg"
                className="rounded-circle shadow-1-strong" width="150" height="150" />
            </div>
            <h5 className="mb-3">Lisa Cudrow</h5>
            <h6 className="text-primary mb-3">Graphic Designer</h6>
            <p className="px-xl-3">
              The bootcamp was a game-changer for me. As a graphic designer, I wanted to expand my skills into the digital realm. The program not only taught me essential design principles but also introduced me to tools and techniques specific to UI/UX design. Now, I feel confident in taking on design projects in the tech industry.
            </p>
          </div>
          <div className="col-md-4 mb-0">
            <div className="d-flex justify-content-center mb-4">
              <img src="https://images.pexels.com/photos/1820559/pexels-photo-1820559.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                className="rounded-circle shadow-1-strong" width="150" height="150" />
            </div>
            <h5 className="mb-3">Maria Samantha</h5>
            <h6 className="text-primary mb-3">Marketing Specialist</h6>
            <p className="px-xl-3">
              The bootcamp exceeded my expectations. The instructors were knowledgeable, and the curriculum was tailored to the current industry trends. As a marketing specialist, the insights I gained about tech and digital marketing strategies have been invaluable. I now feel equipped to navigate the digital landscape with confidence.
            </p>
          </div>
        </div>
      </section>




      <Faq />
    </div>
  )
}

export default Home