import React from 'react';
import './Home.css';

const Home = ({ onRouteChange }) => {
  return (
    <main className='tc dib homeBackground' style={{height: '100vh', display: 'inline-block'}}>
      <p
        style={{fonFamily: '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif', marginTop: '12vh', color: 'rgb(110, 80, 32)', fontSize: '50px', fontWeight: '600', marginBottom: '5vh'}}
      >
        What are you waiting for?
      </p>
      <h1
        style={{fonFamily: '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif', color: 'rgb(32, 62, 110)', fontSize: '100px', marginTop: '2vh'}}
      >
        Voting AWAITS
      </h1>
    </main>
  );
}

export default Home;
