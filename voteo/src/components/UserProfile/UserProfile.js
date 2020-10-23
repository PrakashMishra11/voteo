import React from 'react';

const UserProfile = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>

      <div style={{justifyContent: 'flex-start'}}>
        <ul style={{display: 'flex', flexDirection: 'column', listStyle: 'none', textAlign: 'right'}} className='mr0'>
          <li>{`Name: `}</li>
          <br />
          <li>{`State: `}</li>
          <br />
        </ul>
      </div>

      <div>
        <ul style={{display: 'flex', flexDirection: 'column', listStyle: 'none', textAlign: 'left'}} className=''>
          <li>{`Parth Kodape`}</li>
          <br />
          <li>{`Madhya Pradesh`}</li>
          <br />
        </ul>
      </div>

    </div>
  );
}

export default UserProfile;
