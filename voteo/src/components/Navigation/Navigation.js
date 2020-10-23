import React from 'react';

const Navigation = ({onRouteChange, isSignedIn, weAreOnRegistration}) => {
  if (isSignedIn) {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end', zIndex: 1.5}}>
        <p
          onClick={() => onRouteChange('VotingPage')}
          className = 'f5 link dim black ma4 ml2 pointer'
        >
        Party&nbsp;Info
        </p>
        <p
          onClick={() => onRouteChange('UserProfile')}
          className = 'f5 link dim black ma4 ml2 pointer'
        >
        My&nbsp;Profile
        </p>
        <p
          onClick={() => {
            onRouteChange('Signin')
          }}
          className = 'f5 link dim black ma4 ml2 pointer'
        >
        Log&nbsp;Out
        </p>
      </nav>
    );
  }
  else if (weAreOnRegistration) {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end', zIndex: 1.5}}>
          <p className = 'f5 black ma4 ml2 mr0'>
            (already&nbsp;have&nbsp;an&nbsp;account?)
          </p>
          &nbsp;
          <p
            onClick={() => onRouteChange('Signin')}
            className = 'f5 link dim black ma4 ml2 pointer'>
            Sign&nbsp;In
          </p>
      </nav>
    );
  }
  else {
    return (
      <span className = 'f5 ma4 ml2'></span>
    );
  }
}

export default Navigation;
