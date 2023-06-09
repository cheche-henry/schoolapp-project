import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ApplicationContext } from '../context/ApplicationContext';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Dashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const { currentuser, logout } = useContext(AuthContext);
  const { applicationResponse, deleteApplication, addStudent, getApplication  } = useContext(ApplicationContext);
  const [activeSubpage, setActiveSubpage] = useState('')
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');

  const showSubpage = (subpageId) => {
    setActiveSubpage(subpageId);
  };

  const handleLogout = () => {
    logout();
  };
  const getStudents = () => {
    if (currentuser) {
      fetch('https://schoolapp-utoj.onrender.com/students')
        .then((response) => response.json())
        .then((studentsData) => {
          setStudents(studentsData); // Update the 'students' state with the fetched data
        })
        .catch((error) => {
          console.error('Error retrieving students:', error);
          setStudents([]); // Set 'students' state to an empty array in case of an error
          Swal.fire('Error', 'An error occurred while retrieving students', 'error');
        });
    }
  };
  const handleChangePassword = (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New password and confirm password do not match');
      return;
    }

    fetch(`https://schoolapp-utoj.onrender.com/users/changepassword/${currentuser.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        current_password: passwordData.currentPassword,
        new_password: passwordData.newPassword,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          setPasswordError(response.error);
        } else if (response.success) {
          setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          });
          Swal.fire('Success', response.success, 'success');
        } else {
          setPasswordError('Something went wrong');
        }
      })
      .catch((error) => {
        setPasswordError('Something went wrong');
      });
  };
  useEffect(() => {
    if (!currentuser) {
      navigate('/account/login');
    } else {
      getStudents(); // Fetch students when the component mounts
    }
  }, [currentuser, navigate, getStudents]);
  const handleReject = (applicationId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reject it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteApplication(applicationId);
      }
    });
  };
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rank, setRank] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const userData = {
      name,
      email,
      rank,
      password,
    };
  
    fetch('https://schoolapp-utoj.onrender.com/users/adduser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire('Success', 'User added successfully!', 'success');
          // Clear the form after successful submission
          setName('');
          setEmail('');
          setRank('');
          setPassword('');
        } else {
          Swal.fire('Error', data.error, 'error');
        }
      })
      .catch((error) => {
        Swal.fire('Error', 'Something went wrong', 'error');
        console.error(error);
      });
  };
  const handleApprove = (applicationId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the POST request to add the application details to students
        fetch('https://schoolapp2.onrender.com/students/addstudent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(applicationResponse.find(app => app.id === applicationId))
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire('Success', 'Application approved and student added!', 'success');
              // Optionally, you can also delete the application from the pending applications list
              deleteApplication(applicationId);
            } else {
              Swal.fire('Error', data.error, 'error');
            }
          })
          .catch((error) => {
            Swal.fire('Error', 'Something went wrong', 'error');
            console.error(error);
          });
      }
    });
  };
  
  return (
    <>
      <div className="d-flex justify-content-center" style={{ marginTop: '40px' }} id="btn">
        <div className="d-flex flex-column flex-md-row">
          <button className="btn mb-2 mb-md-0 me-md-3" onClick={() => showSubpage('subpage1')}>
            Pending applications
          </button>
          <button className="btn mb-2 mb-md-0 me-md-3" onClick={() => showSubpage('subpage5')}>
            Students
          </button>
          <button className="btn mb-2 mb-md-0 me-md-3" onClick={() => showSubpage('subpage3')}>
            My account
          </button>
          <button className="btn mb-2 mb-md-0 me-md-3" onClick={() => showSubpage('subpage2')}>
            Account settings
          </button>
          {currentuser && currentuser.rank !== 'admin' ? null : (
          <button className="btn mb-2 mb-md-0 me-md-3" onClick={() => showSubpage('subpage4')}>
            Add user
          </button>)}
        </div>
      </div>

      {activeSubpage === 'subpage1' && (
  <div id="subpage1" className="subpage" style={{ marginTop: '20px' }}>
    <h3 className="text-center text-primary">Pending applications</h3>
    {applicationResponse && applicationResponse.length > 0 ? (
      applicationResponse.map((application) => (
        <div key={application.id} className="container" style={{ marginBottom: '30px' }}>
          <div className="row shadow" style={{ padding: '30px' }}>
            <div className="col-md-6">
              <img
                className="bookimage img-fluid"
                src="https://icons-for-free.com/iconfiles/png/512/coding+dev+development+programming+tag+icon-1320165734987953368.png"
                alt="Application"
              />
            </div>
            <div className="col-md-6">
              <h4>Name: {application.firstname} {application.lastname}</h4>
              <p>Date of Birth: {application.date_of_birth}</p>
              <p>Gender: {application.gender}</p>
              <p>Phone Number: {application.phone_number}</p>
              <p>Email: {application.email}</p>
              <p>Course Title: {application.course_title}</p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
 
    <>
      <button
        className="btn btn-danger me-md-2"
        onClick={() => handleReject(application.id)}
      >
        Reject
      </button>
      <button
  className="btn btn-primary"
  onClick={() => handleApprove(application.id)}
>
  Approve
</button>
    </>
 
</div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center">No pending applications.</p>
    )}
  </div>
)}
 
 {activeSubpage === 'subpage5' && (
  <div id="subpage5" className="subpage" style={{ marginTop: '20px' }}>
    <h3 className="text-center text-primary">Pending applications</h3>
    {students.length === 0 ? (
      <p className="text-center">No pending applications.</p>
    ) : (
      students.map((student) => (
        <div key={student.id} className="container" style={{ marginBottom: '30px' }}>
          <div className="row shadow" style={{ padding: '30px' }}>
            <div className="col-md-6">
              <img
                className="bookimage img-fluid"
                src="https://www.transparentpng.com/thumb/success/png-best-success-9.png"
                alt="Application"
              />
            </div>
            <div className="col-md-6">
              <h4>Name: {student.firstname} {student.lastname}</h4>
              <p>Date of Birth: {student.date_of_birth}</p>
              <p>Gender: {student.gender}</p>
              <p>Phone Number: {student.phone_number}</p>
              <p>Email: {student.email}</p>
              <p>Course Title: {student.course_title}</p>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
)}

{activeSubpage === 'subpage2' && (
        <div id="subpage2" className="subpage" style={{ marginTop: '20px' }}>
        <h3 className="text-center text-primary">Account settings</h3>
        <div className="d-flex justify-content-center mt-4">
          <form onSubmit={handleChangePassword} className="form-container">
            <h3 className="text-center">Change Password</h3>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                className="form-control"
                placeholder="Enter current password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, currentPassword: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                className="form-control"
                placeholder="Enter new password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                placeholder="Confirm new password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                }
              />
            </div>
            {passwordError && <p className="text-danger">{passwordError}</p>}
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
      
)}

      {activeSubpage === 'subpage3' && (
        <div id="subpage3" className="subpage" style={{ marginTop: '20px' }}>
          <h3 className="text-center text-primary">My account</h3>
          {currentuser && (
            <div className="container" style={{ padding: '30px', marginBottom: '30px' }}>
              <div className="row shadow" style={{ padding: '75px' }}>
                <div className="col-md-6">
                  <img
                    className="bookimage img-fluid"
                    src="https://thumbs.dreamstime.com/b/man-icon-profile-member-user-perconal-symbol-vector-white-isolated-background-169942439.jpg"
                    alt="{data.type}"
                    style={{ height: '250px', width: 'auto', marginRight: '150px' }}
                  />
                </div>
                <div className="col-md-6">
                  <div className="user">
                    <h3>Account Details</h3>
                    
                    <p>Email: {currentuser.email}</p>
                    <button className="btn btn-primary mb-2" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>

          )}

        </div>
        
      )}
      {activeSubpage === 'subpage4' && (
      <div id="subpage4" className="subpage" style={{ marginTop: '20px' }}>
      {currentuser && currentuser.rank !== 'admin' ? null : (
        <div className="form-control">
          <h2 className='text-center text-primary'>Add User</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: '100%', border:"solid 1px" }}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%' , border:"solid 1px"}}
              />
            </div>
            <div>
              <label>Rank:</label>
              <input
                type="text"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                required
                style={{ width: '100%', border:"solid 1px" }}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%' , border:"solid 1px"}}
              />
            </div>
            <button style={{ marginTop: '20px' }} className='btn btn-primary' type="submit">Add User</button>
          </form>
        </div>
      )}
    </div>
      )}
    </>
  );
}

export default Dashboard;

