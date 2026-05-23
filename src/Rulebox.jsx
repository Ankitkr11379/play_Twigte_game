import React from 'react';

const RuleBox = () => {
  const rules = [
    "If you are patient then only play otherwise just accept your ....",
    "Each player can use at max 9 tokens.",
    "There are 24 red boxes on which the entire game will be played.",
    "If a player uses all 9 tokens, after that they can only move tokens to top, bottom, left, right, or diagonally adjacent red boxes if possible according to game rules.",
    "If a player somehow places three tokens in a combination, they can pick one token of another player and the total token count will be reduced by one for that player. (REMEMBER: ONE COMBINATION CAN'T BE USED AGAIN BY BOTH THE PLAYERS.)",
    "The first player who picks seven tokens of another player will win the TWIGTE."
  ];

  const boxStyle = {
    border: '2px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    maxWidth: '600px',
    margin: '20px auto',
    fontFamily: "'Poppins', sans-serif"
  };

  const titleStyle = {
    fontSize: '1.5em',
    fontWeight: 'bold',
    marginBottom: '10px'
  };

  const listStyle = {
    listStyleType: 'decimal',
    paddingLeft: '20px',
    lineHeight: '1.6'
  };

  return (
    <div style={boxStyle}>
      <div style={titleStyle}>Game Rules</div>
      <ol style={listStyle}>
        {rules.map((rule, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            {rule}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RuleBox;
