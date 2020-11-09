import React from 'react';

const Navigation = ({onRouteChange, isSignedIn, weAreOnRegistration, weAreOnVotingPage, atHome}) => {
  if (atHome && !isSignedIn) {
    return (
      <main style={{display: 'flex', zIndex: 1.5 }} className = 'homeBackground'>
        <div className='w-50'>
          <nav style={{display: 'flex', justifyContent: 'flex-start'}}>
            <p
              className = 'mt4 ml6 dark-blue f2'
            >
              VOTEO
            </p>
          </nav>
        </div>
        <div className='w-50'>
          <nav style={{display: 'flex', justifyContent: 'flex-end', marginTop: '3.5vh', marginLeft: '1vh', marginBottom: '4vh'}}>
              <p
                onClick={() => onRouteChange('Register')}
                className = 'f4 link dim black mr0 pointer'
              >
                Register&nbsp;
              </p>
              <p className = 'f4 black mr0 ml0'>&nbsp;/&nbsp;</p>
              <p
                onClick={() => onRouteChange('Signin')}
                className = 'f4 link dim black mr5 pointer'
              >
                &nbsp;Sign&nbsp;In
              </p>
          </nav>
        </div>
      </main>
    );
  }
  if (atHome && isSignedIn) {
    return (
      <main style={{display: 'flex', zIndex: 1.5 }} className = 'homeBackground'>
        <div className='w-50'>
          <nav style={{display: 'flex', justifyContent: 'flex-start'}}>
            <p
              className = 'mt4 ml6 dark-blue f2'
            >
              VOTEO
            </p>
          </nav>
        </div>
        <div className='w-50'>
          <nav style={{display: 'flex', justifyContent: 'flex-end', marginTop: '3.5vh', marginLeft: '1vh', marginBottom: '4vh'}}>
            <p
              onClick={() => onRouteChange('InHome')}
              className = 'f4 link dim black mr2 pointer'
            >
            Home
            </p>
            <p
              onClick={() => onRouteChange('VotingPage')}
              className = 'f4 link dim black ml4 mr2 pointer'
            >
            Party&nbsp;Info
            </p>
            <p
              onClick={() => onRouteChange('UserProfile')}
              className = 'f4 link dim black ml4 mr2 pointer'
            >
            My&nbsp;Profile
            </p>
            <p
              onClick={() => {
                onRouteChange('OutHome')
              }}
              className = 'f4 link dim black mr5 ml4 pointer'
            >
            Log&nbsp;Out
            </p>
          </nav>
        </div>
      </main>
    );
  }
   // className = 'tc h-100 profilePane'
  else if (isSignedIn && !weAreOnVotingPage) {
    return (
      <main style={{display: 'flex', zIndex: 1.5, backgroundColor: '#c4b381', height: '12vh', fontFamily: '"Syne Mono", monospace'}}>
        <div className='w-50'>
          <nav style={{display: 'flex', justifyContent: 'flex-start', width: '64.8%'}}>
            <p
              className = 'mt4 ml6 dark-blue f2'
            >
              VOTEO
            </p>
          </nav>
        </div>
        <div className='w-50'>
          <nav style={{display: 'flex', color: 'rgb(14, 37, 82)', justifyContent: 'flex-end', zIndex: 1.5, marginTop: '3.5vh', marginLeft: '1vh', marginBottom: '4vh'}}>
            <p
              onClick={() => onRouteChange('InHome')}
              className = 'f4 link dim mr2 pointer'
            >
            Home
            </p>
            <p
              onClick={() => onRouteChange('VotingPage')}
              className = 'f4 link dim ml4 mr2 pointer'
            >
            Party&nbsp;Info
            </p>
            <p
              onClick={() => onRouteChange('UserProfile')}
              className = 'f4 link dim ml4 mr2 pointer'
            >
            My&nbsp;Profile
            </p>
            <p
              onClick={() => {
                onRouteChange('OutHome')
              }}
              className = 'f4 link dim mr5 ml4 pointer'
            >
            Log&nbsp;Out
            </p>
          </nav>
        </div>
      </main>
    );
  }
  else if (isSignedIn && weAreOnVotingPage) {
    return (
      <main style={{display: 'flex', zIndex: 1.5 }} className = 'votingBackground'>
        <div className='w-50'>
          <nav style={{display: 'flex', justifyContent: 'flex-start'}}>
            <img src={ require(`./electionCommisionOfIndia.png`) } alt='eci logo' style={{ paddingTop: '5px' }} className = 'mt0 ml5' width='100' height='100' />
            <p
              className = 'mt4 ml2 dark-blue f2'
            >
              Election&nbsp;Commision&nbsp;of&nbsp;India
            </p>
          </nav>
        </div>
        <div className='w-50'>
          <nav style={{display: 'flex', justifyContent: 'flex-end', marginTop: '3.5vh', marginLeft: '1vh', marginBottom: '4vh'}}>
            <p
              onClick={() => onRouteChange('InHome')}
              className = 'f4 link dim black mr2 pointer'
            >
            Home
            </p>
            <p
              onClick={() => onRouteChange('VotingPage')}
              className = 'f4 link dim black ml4 mr2 pointer'
            >
            Party&nbsp;Info
            </p>
            <p
              onClick={() => onRouteChange('UserProfile')}
              className = 'f4 link dim black ml4 mr2 pointer'
            >
            My&nbsp;Profile
            </p>
            <p
              onClick={() => {
                onRouteChange('OutHome')
              }}
              className = 'f4 link dim black ml4 mr5 pointer'
            >
            Log&nbsp;Out
            </p>
          </nav>
        </div>
      </main>
    );
  }
  else if (weAreOnRegistration) {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end', zIndex: 1.5}}>
          <p className = 'f5 black mt3 ml2 mr0 mb3'>
            <br />
            (already&nbsp;have&nbsp;an&nbsp;account?)
          </p>
          &nbsp;
          <p
            onClick={() => onRouteChange('Signin')}
            className = 'f4 link dim black mr5 mt4 ml1 mb3 pointer'>
            Sign&nbsp;In
          </p>
      </nav>
    );
  }
  else {
    return (
      <span className = 'f4 mr5 ml2 mt3 mb3'></span>
    );
  }
}

export default Navigation;
