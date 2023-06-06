import React from 'react'

function About() {
  return (
    <div>
      <section style={{ marginTop: '75px', marginBottom: '100px' }}>
        <div className="container">
          <h2 className='text-center text-primary'>Welcome to Our Tech Bootcamp</h2>
          <p>
            Our tech bootcamp is dedicated to equipping individuals with the skills and knowledge needed to succeed in the fast-paced world of technology. We offer comprehensive programs designed to provide hands-on training and practical experience in various tech fields, including web development, data science, and UI/UX design. Whether you're a beginner looking to start a career in tech or a professional aiming to upskill, our bootcamp has the resources and support you need to achieve your goals.
          </p>
        </div>
      </section>

      <section>
        <div className="container" style={{ marginBottom: '150px' }}>
          <div className="row">
            <h2 className="mb-4 text-primary text-center">Our Mission</h2>
            <div className="col-lg-6">
              <img src="https://inovaantage.com/wp-content/uploads/2021/04/misson.jpg" className="img-fluid" alt="Mission" />
            </div>
            <div className="col-lg-6">

              <p className="lead">
                At our tech bootcamp, our mission is to empower individuals with the knowledge and skills needed to thrive in the rapidly evolving world of technology. We believe that everyone should have access to quality tech education, regardless of their background or previous experience. Through our comprehensive curriculum, hands-on projects, and expert instructors, we aim to provide a supportive and inclusive learning environment where students can gain the practical skills and industry insights necessary to pursue successful careers in tech.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '150px' }}>
        <div className="container">
          <h2 className='text-primary text-center'>Join Our Tech Bootcamp Today</h2>
          <p>
            Are you ready to kickstart your tech career? Join our bootcamp and embark on a transformative learning journey. Our programs are designed to provide you with the essential tools and resources to excel in the tech industry. From immersive coding sessions to collaborative projects, you'll gain hands-on experience and build a strong foundation in cutting-edge technologies. Our dedicated instructors and supportive community will guide you every step of the way, helping you unlock your full potential. Don't miss this opportunity to shape your future in tech - enroll in our bootcamp today!
          </p>
        </div>
      </section>
    </div>
  )
}

export default About