import React from 'react';

const VotingPage = ({ uponVoting }) => {
  return (
    <div>
      <button
      onClick={uponVoting}
      className='dib link bw1 b--solid orange bg-white fw9 pa3 br-pill hover-white hover-bg-orange pointer w-20 ba b--orange'
      type = 'submit'
      value = 'Vote'>
      Vote
      </button>
    </div>
  );
}

export default VotingPage;
