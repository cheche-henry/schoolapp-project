import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';


function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div>
      <section className="vh-75" style={{ marginTop: '75px', marginBottom: '75px' }}>
        <h2 className='text-center text-primary' style={{ marginTop: '15px' }}>Login</h2>
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://www.planstudyabroad.uniagents.com/images/login.png"
                className="img-fluid" alt="Sample image" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                {/* Email input */}
                <div className="form-outline mb-4">
                  <label className="form-label">Email address</label>
                  <input required onChange={(e) => setEmail(e.target.value)} type="email" className="form-control form-control-lg"
                    placeholder="Enter email address" />
                </div>

                {/* Password input */}
                <div className="form-outline mb-3">
                  <label className="form-label">Password</label>
                  <input required onChange={(e) => setPassword(e.target.value)} type="password" className="form-control form-control-lg"
                    placeholder="Enter password" />
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-lg"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
