import React, { createContext , useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentuser,set_currentUser] = useState()
  const login = (email, password) => {
    fetch('/users/login', {
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
  

  useEffect(() => {
    fetch('/currentuser')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if(data.user){
          set_currentUser(data.user)
        }
      })
  }, []);
  const contextData = {
    login,
    currentuser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
}
