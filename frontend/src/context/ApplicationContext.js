import React, { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const ApplicationContext = createContext();

export function ApplicationProvider({ children }) {
  const [applicationResponse, setApplicationResponse] = useState(null);

  const submitData = (formData) => {
    // ...existing code for submitting application data
  };

  const getApplications = () => {
    fetch('/applications')
      .then((response) => response.json())
      .then((application) => {
        setApplicationResponse(application);
      })
      .catch((error) => {
        console.error('Error retrieving applications:', error);
        setApplicationResponse(null);
        Swal.fire('Error', 'An error occurred while retrieving applications', 'error');
      });
  };

  const deleteApplication = (applicationId) => {
    fetch(`/applications/delete/${applicationId}`, {
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
  }, []);

  const contextData = {
    applicationResponse,
    submitData,
    getApplications,
    deleteApplication,
  };

  return (
    <ApplicationContext.Provider value={contextData}>
      {children}
    </ApplicationContext.Provider>
  );
}
