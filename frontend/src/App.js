import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import Layout from "./components/layout/Layout";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';
import { ApplicationProvider } from './context/ApplicationContext';
import Apply from './components/Apply';
function App() {


  return (
    <BrowserRouter>
    <AuthProvider>
    <CourseProvider>
    <ApplicationProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="account" element={<Login />} />
          <Route path="contactus" element={<Contact />} />
          <Route path="contactus" element={<Dashboard/>} />
          <Route path="apply/:id" element={<Apply/>} />
        </Route>
      </Routes>
      </ApplicationProvider>
      </CourseProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
