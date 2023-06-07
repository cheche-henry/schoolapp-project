import React, { createContext } from 'react';
import Swal from 'sweetalert2';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const login = (email, password) => {
    fetch('http://127.0.0.1:9292/users/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then((res) => res.json())
      .then((response) => {
        if(response.error){
            Swal.fire(
                'error',
                 response.error,
                'error'
              )
        }
        else if(response.success){
        Swal.fire(
          'Good job!',
          response.success,
          'success'
        )}
        else{
            Swal.fire(
                'error',
                 'Something went wrong',
                'error'
              ) 
        }
      });
  };

  const contextData = {
    login,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
}
