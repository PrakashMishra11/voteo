import React from 'react';

const Card = ({ uponVoting, party, candidate }) => {
  return (
    <div
        className='tc bg-light-gray dib br3 pa3 bw2 shadow-5 w-90'
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '4vh auto', backgroundColor: 'rgba(52, 52, 52, 0.8)'}}
      >

      <div className='ma0 ml2 pa3 white'>
        <img src={ require(`./${party}.png`) } alt={ party } style={{ paddingTop: '5px' }} width='180' height='150' />
        <h3>{ party.toUpperCase() }</h3>
      </div>

      <div className='ma4 mt0 mb0 pa3 w-60 white'>
        <h2>{ `${ candidate }` }</h2><h3>is the Party Representative for</h3><h2>{ `${ party.toUpperCase() }` }</h2>
      </div>

      <button
        className='f4 tc link dim ph4 pv2 mb2 mr5 dib white bg-dark-blue w-10 link br2 b--dark-blue fw5 pa2 ba b--solid'
        onClick={ () => uponVoting(party.toUpperCase()) }
        type = 'submit'
        value = 'Vote'
      >
      VOTE
      </button>

    </div>
  );
}

export default Card;
