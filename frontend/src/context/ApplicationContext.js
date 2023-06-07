import React, { createContext, useState } from 'react';
import Swal from 'sweetalert2';

export const ApplicationContext = createContext();

export function ApplicationProvider({ children }) {
  const [applicationResponse, setApplicationResponse] = useState(null);

  const submitData = (formData) => {
    fetch('/applications/addapplication', {
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

  const contextData = {
    applicationResponse,
    submitData,
  };

  return (
    <ApplicationContext.Provider value={contextData}>
      {children}
    </ApplicationContext.Provider>
  );
}
