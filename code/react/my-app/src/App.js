import React, { useState, useEffect, useCallback } from 'react';

// Card component
const Card = ({ card, index, handleClick, isFlipped }) => {
  return (
    <div 
      style={{
        height: 100,
        width: 60,
        margin: 5,
        borderRadius: 8,
        cursor: 'pointer',
        backgroundColor: isFlipped ? 'white' : 'blue',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        color: isFlipped ? 'black' : 'white',
        userSelect: 'none',
        boxShadow: '0 0 5px rgba(0,0,0,0.3)'
      }}
      onClick={() => handleClick(index)}
    >
      {isFlipped ? card.value : '?'}
    </div>
  );
};

const CARD_VALUES = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E'];

export default function MemoryCardGame() {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const shuffleCards = useCallback(() => {
    const shuffled = [...CARD_VALUES]
      .map(value => ({ value }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setScores({ 1: 0, 2: 0 });
    setCurrentPlayer(1);
    setGameOver(false);
    setWinner(null);
  }, []);

  useEffect(() => {
    shuffleCards();
  }, [shuffleCards]);

  const handleCardClick = (index) => {
    if (
      gameOver ||
      flippedIndices.includes(index) ||
      flippedIndices.length === 2 ||
      matchedPairs.includes(cards[index].value)
    ) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      const [firstIndex, secondIndex] = newFlippedIndices;

      if (cards[firstIndex].value === cards[secondIndex].value) {
        const newMatchedPairs = [...matchedPairs, cards[firstIndex].value];
        setMatchedPairs(newMatchedPairs);

        const newScores = { ...scores, [currentPlayer]: scores[currentPlayer] + 5 };
        setScores(newScores);

        if (newMatchedPairs.length === 5) {
          setGameOver(true);
          if (newScores[1] > newScores[2]) setWinner(1);
          else if (newScores[2] > newScores[1]) setWinner(2);
          else setWinner(0);
        }

        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
          setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        }, 1000);
      }
    }
  };

  const isCardFlipped = (index) => {
    return flippedIndices.includes(index) || matchedPairs.includes(cards[index].value);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', maxWidth: 400, margin: 'auto' }}>
      <h1>Memory Card Game</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ padding: 8, backgroundColor: currentPlayer === 1 ? 'dodgerblue' : 'lightgray', color: currentPlayer === 1 ? 'white' : 'black', borderRadius: 4 }}>
          Player 1: {scores[1]} pts
        </div>
        <div style={{ padding: 8, backgroundColor: currentPlayer === 2 ? 'dodgerblue' : 'lightgray', color: currentPlayer === 2 ? 'white' : 'black', borderRadius: 4 }}>
          Player 2: {scores[2]} pts
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            index={index}
            handleClick={handleCardClick}
            isFlipped={isCardFlipped(index)}
          />
        ))}
      </div>

      {gameOver && (
        <div style={{ marginTop: 20, backgroundColor: '#fff3cd', padding: 15, borderRadius: 6, textAlign: 'center' }}>
          <h2>Game Over!</h2>
          {winner === 0 ? (
            <p>It's a draw!</p>
          ) : (
            <p>Player {winner} wins with {scores[winner]} points!</p>
          )}
          <button
            style={{ marginTop: 10, padding: '10px 20px', backgroundColor: 'dodgerblue', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
            onClick={shuffleCards}
          >
            Play Again
          </button>
        </div>
      )}

      {!gameOver && (
        <div style={{ marginTop: 20, fontWeight: 'bold' }}>
          Player {currentPlayer}'s turn - Choose two cards to flip
        </div>
      )}
    </div>
  );
}
