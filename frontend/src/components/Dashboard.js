import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ApplicationContext } from '../context/ApplicationContext';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Dashboard() {
  const navigate = useNavigate();
  const { currentuser, logout } = useContext(AuthContext);
  const { applicationResponse,deleteApplication, } = useContext(ApplicationContext);
  const [activeSubpage, setActiveSubpage] = useState('subpage1');

  const showSubpage = (subpageId) => {
    setActiveSubpage(subpageId);
  };


  const handleLogout = () => {
    logout();
    };
    
    useEffect(() => {
    if (!currentuser) {
    navigate('/account/login');
    }
    }, [currentuser, navigate]);
  
    const handleReject = (applicationId) => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reject it!',
      }).then((result) => {
        if (result.isConfirmed) {
          deleteApplication(applicationId);
        }
      });
    };
  return (
    <>
      <div className="d-flex justify-content-center" style={{ marginTop: '40px' }} id="btn">
        <div className="d-flex flex-column flex-md-row">
          <button className="btn  mb-2 mb-md-0 me-md-3" onClick={() => showSubpage('subpage1')}>
            Pending applications
          </button>
          <button className="btn  mb-2 mb-md-0 me-md-3" onClick={() => showSubpage('subpage2')}>
            Students
          </button>
          <button className="btn  mb-2 mb-md-0 me-md-3" onClick={() => showSubpage('subpage3')}>
            My account
          </button>
        </div>
      </div>

      {applicationResponse && applicationResponse.length > 0 ? (
  <div id="subpage3" className="subpage" style={{ marginTop: '20px' }}>
    <h3 className="text-center text-primary">Pending applications</h3>
    {applicationResponse.map((application) => (
      <div
        key={application.id}
        className="container"
        style={{ marginBottom: '30px' }}
      >
        <div className="row shadow" style={{ padding: '30px' }}>
          <div className="col-md-6">
            <img
              className="bookimage img-fluid"
              src="https://png.pngtree.com/png-vector/20220707/ourmid/pngtree-close-html-bracket-embed-code-png-image_5654026.png"
              alt={application.type}
              style={{
                height: '250px',
                width: 'auto',
                marginRight: '150px',
              }}
            />
          </div>
          <div className="col-md-6">
            <div className="user">
              <h3>Applicant Details</h3>
              <p>Course: {application.course_title} </p>
              <p>Name: {application.firstname} </p>
              <p>Date of birth: {application.date_of_birth}</p>
              <p>Gender: {application.gender} </p>
              <p>Phone number: {application.phone_number}</p>
              <p>Email: {application.email}</p>
              <p>Applied at: {application.created_at}</p>
              <button
                      className="btn btn-danger mb-3 me-3 btn-lg"
                      onClick={() => handleReject(application.id)}
                    >
                      Reject
                    </button>
              <button className="btn btn-success mb-3 ms-3 btn-lg">
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <p>No pending applications</p>
)}

      {activeSubpage === 'subpage2' && (
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
                   <p>Name: {currentuser.name} </p>
                   <p>Email: {currentuser.email}</p>
                   <p>Check-in date: {currentuser.created_at} </p>
                   <p>Check-out date: {currentuser.updated_at}</p>
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
                    <p>Name: {currentuser.name} </p>
                    <p>Email: {currentuser.email}</p>
                    <p>Check-in date: {currentuser.created_at} </p>
                    <p>Check-out date: {currentuser.updated_at}</p>
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
    </>
  );
}

export default Dashboard;
