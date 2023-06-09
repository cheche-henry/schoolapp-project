import React, { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const ApplicationContext = createContext();

export function ApplicationProvider({ children }) {
  const [applicationResponse, setApplicationResponse] = useState(null);
  
  const [students, setStudents] = useState([]);

  const submitData = (formData) => {
    fetch('https://schoolapp-utoj.onrender.com//applications/addapplication', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setApplicationResponse(data);

        if (data.success) {
          Swal.fire('Success', data.success, 'success');
        } else if (data.error) {
          Swal.fire('Error', data.error, 'error');
        } else {
          Swal.fire('Error', 'Something went wrong', 'error');
        }
      })
      .catch((error) => {
        console.error('Error submitting form data:', error);
        setApplicationResponse(null);
        Swal.fire('Error', 'An error occurred while submitting form data', 'error');
      });
  };

  const addStudent = (studentData) => {
    fetch('https://schoolapp-utoj.onrender.com/students/addstudent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Update the list of students with the newly added student
          setStudents((prevStudents) => [...prevStudents, data.student]);
        } else if (data.error) {
          console.error('Error:', data.error);
        } else {
          console.error('Something went wrong');
        }
      })
      .catch((error) => {
        console.error('Error posting student data:', error);
      });
  };


  const getApplications = () => {
    fetch('https://schoolapp-utoj.onrender.com/applications')
      .then((response) => response.json())
      .then((applications) => {
        setApplicationResponse(applications);
      })
      .catch((error) => {
        console.error('Error retrieving applications:', error);
        setApplicationResponse(null);
        Swal.fire('Error', 'An error occurred while retrieving applications', 'error');
      });
  };
  const getStudents = () => {
    fetch('https://schoolapp-utoj.onrender.com/students')
      .then((response) => response.json())
      .then((students) => {
        setApplicationResponse(students);
      })
      .catch((error) => {
        console.error('Error retrieving applications:', error);
        setApplicationResponse(null);
        Swal.fire('Error', 'An error occurred while retrieving applications', 'error');
      });
  };
  const deleteApplication = (applicationId) => {
    fetch(`https://schoolapp-utoj.onrender.com/applications/delete/${applicationId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          Swal.fire('Success', data.success, 'success');
          // Refresh the application list after successful deletion
          getApplications();
        } else if (data.error) {
          Swal.fire('Error', data.error, 'error');
        } else {
          Swal.fire('Error', 'Something went wrong', 'error');
        }
      })
      .catch((error) => {
        console.error('Error deleting application:', error);
        Swal.fire('Error', 'An error occurred while deleting the application', 'error');
      });
  };

  useEffect(() => {
    getApplications();
    getStudents();
  }, []);

  const contextData = {
    applicationResponse,
    submitData,
        deleteApplication,
        addStudent,
        getStudents,
  };

  return (
    <ApplicationContext.Provider value={contextData}>
      {children}
    </ApplicationContext.Provider>
  );
}
