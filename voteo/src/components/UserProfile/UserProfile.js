import React from 'react';
import './UserProfile.css';

const UserProfile = ({ userInfo }) => {
  return (
    <main style={{width: '100vw', height: '100vh', backgroundColor: '#dbd5d9', display: 'inline-block'}}>
      <div className='container f4'>
          <h1 id = 'profileHead'>Your Profile</h1>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
              <label id = 'label'>Name :</label>
              <label className = 'text'>{`${userInfo.fn} ${userInfo.ln}`}</label>
          </div>
          <div>
            <label id = 'label'>Aadhar no :</label>
            <label className = 'text'>{`${userInfo.an}`}</label>
          </div>
          <div>
            <label id = 'label'>Voter id :</label>
            <label className = 'text'>{`${userInfo.vi}`}</label>
          </div>
          <div>
              <label id = 'label'>Phone no :</label>
              <label className = 'number'>{`${userInfo.phone}`}</label>
          </div>
          <div>
              <label id = 'label'> Email :</label>
              <label className = 'email'>{`${userInfo.email}`}</label>
          </div>
              <div>
              <label id = 'label'>City :</label>
              <label className = 'text'>{`${userInfo.city}`}</label>
          </div>
          <div>
              <label id = 'label'>State :</label>
              <label className = 'text'>{`${userInfo.state}`}</label>
          </div>

      </div>
    </main>
  );
}

export default UserProfile;
