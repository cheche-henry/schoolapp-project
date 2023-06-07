import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Dashboard() {
  const { currentuser } = useContext(AuthContext);
  const [activeSubpage, setActiveSubpage] = useState('subpage1');
  const showSubpage = (subpageId) => {
    setActiveSubpage(subpageId);
  };

  return (
    <>
      <button onClick={() => showSubpage('subpage1')}>Pending applications</button>
      <button onClick={() => showSubpage('subpage2')}>Students</button>
      <button onClick={() => showSubpage('subpage3')}>My account</button>

      {activeSubpage === 'subpage1' && (
        <div id="subpage1" className="subpage">
          <h2>Pending applications</h2>
          <p>This is the content of subpage 1.</p>
        </div>
      )}

      {activeSubpage === 'subpage2' && (
        <div id="subpage2" className="subpage">
          <h2>Students</h2>
          <p>This is the content of subpage 2.</p>
        </div>
      )}

      {activeSubpage === 'subpage3' && (
        <div id="subpage3" className="subpage">
          <h2>My account</h2>
          {currentuser && (
            <div>
              <p>Email: {currentuser.email}</p>
              <p>Name: {currentuser.name}</p>
              <p>Name: {currentuser.created_at}</p>
              <p>Name: {currentuser.updated_at}</p>
              {/* Add more properties as needed */}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Dashboard;
