import React, { createContext, useEffect, useState } from 'react';
export const CourseContext = createContext();

export function CourseProvider({ children }) {
    const [courses, setCourses] = useState('');
    useEffect(() => {
        fetch('http://127.0.0.1:9292/courses')
          .then((res) => res.json())
          .then((data) => {
            setCourses(data)
          })
      }, []);

  const contextData = {
    courses,
  };

  return (
    <CourseContext.Provider value={contextData}>
      {children}
    </CourseContext.Provider>
  );
}
