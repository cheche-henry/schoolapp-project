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
function App() {


  return (
    <BrowserRouter>
    <AuthProvider>
    <CourseProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="account" element={<Login />} />
          <Route path="contactus" element={<Contact />} />
          <Route path="contactus" element={<Dashboard/>} />
        </Route>
      </Routes>
      </CourseProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
