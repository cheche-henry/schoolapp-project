import React, { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [currentuser, set_currentUser] = useState();

  const login = (email, password) => {
    fetch('/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          Swal.fire('Error', response.error, 'error');
        } else if (response.success) {
          set_currentUser(response.user);
          navigate('/account/dashboard');
          Swal.fire('Success', response.success, 'success');
        } else {
          Swal.fire('Error', 'Something went wrong', 'error');
        }
      })
      .catch((error) => {
        Swal.fire('Error', 'Something went wrong', 'error');
      });
  };

  const logout = () => {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('/users/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })
          .then((res) => res.json())
          .then((response) => {
            if (response.success) {
              set_currentUser(null); // Clear the current user state
              Swal.fire('Success', 'Logout success', 'success').then(() => {
                navigate('/account/login'); // Redirect to the home page after successful logout
              });
            } else {
              Swal.fire('Error', response.error, 'error');
            }
          })
          .catch((error) => {
            Swal.fire('Error', 'Something went wrong', 'error');
          });
      }
    });
  };

  useEffect(() => {
    fetch('/currentuser')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          set_currentUser(data.user);
          navigate('/account/dashboard');
        }
      });
  }, [navigate]);

  const contextData = {
    login,
    logout,
    currentuser
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
}
