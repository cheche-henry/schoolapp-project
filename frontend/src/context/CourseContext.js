import React, { createContext, useEffect, useState } from 'react';

export const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:9292/courses')
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.log('Error fetching courses:', error);
      });
  }, []);

  useEffect(() => {
    console.log('Courses:', courses); // Check if courses are being fetched correctly
  }, [courses]);

  const contextData = {
    courses,
  };

  return (
    <CourseContext.Provider value={contextData}>
      {children}
    </CourseContext.Provider>
  );
}
