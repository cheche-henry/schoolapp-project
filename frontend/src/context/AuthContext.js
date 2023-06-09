import React, { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [currentuser, set_currentUser] = useState();

  const login = (email, password) => {
    fetch('https://schoolapp-utoj.onrender.com/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          Swal.fire('Error', response.error, 'error');
        } else if (response.success) {
          const user = { email }; // Create a user object with the logged-in email (or other relevant user information)
          set_currentUser(user); // Set the current user state
  
          // Post the user details to the server
          fetch('https://schoolapp-utoj.onrender.com/currentuser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user })
          })
            .then((res) => res.json())
            .then((data) => {
              // Handle the response if needed
            })
            .catch((error) => {
              // Handle the error if needed
            });
  
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
        fetch('https://schoolapp-utoj.onrender.com/users/logout', {
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
    fetch('https://schoolapp-utoj.onrender.com/currentuser')
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