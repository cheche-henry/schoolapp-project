import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ApplicationContext } from '../context/ApplicationContext';
import { CourseContext } from '../context/CourseContext';

function Apply() {
  const { courses } = useContext(CourseContext);
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const { submitData } = useContext(ApplicationContext);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [date_of_birth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const selectedCourse = courses.find((course) => course.id === parseInt(id));
    setCourse(selectedCourse);
  }, [courses, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      firstname,
      lastname,
      date_of_birth,
      gender,
      phone_number,
      email,
      course_title: course.title,
    };

    submitData(formData);
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <section className="vh-75 my-5">
        <h2 className="text-center text-primary my-3">Apply Now</h2>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h3 className="text-center">{course.title}</h3>
              <img src={course.image} className="img-fluid" alt="Sample image" />
              <p className="my-3">{course.description}</p>
            </div>
            <div className="col-lg-6">
              <form onSubmit={handleSubmit}>
                <h3 className="text-center text-primary my-4">Fill in the form below</h3>
                <div className="mb-4">
                  <label className="form-label">First Name</label>
                  <input
                    type="text" pattern="[A-Za-z]+"
                    className="form-control"
                    placeholder="Enter first name"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    name="firstname"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text" pattern="[A-Za-z]+"
                    className="form-control"
                    placeholder="Enter last name"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    name="lastname"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    value={date_of_birth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    name="date_of_birth"
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-select"
                    aria-label="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    name="gender"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter phone number"
                    value={phone_number}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (input.length <= 10) {
                        setPhoneNumber(input);
                      }
                    }}
                    name="phone_number"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter a valid email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                  />
                </div>

                <div className="text-center my-4">
                  <button type="submit" className="btn btn-primary">
                    Apply
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Apply;
