import React, { useState, useEffect, useCallback } from 'react';

// Card component with nicer styles and flip animation
const Card = ({ card, index, handleClick, isFlipped }) => {
  return (
    <div
      onClick={() => handleClick(index)}
      style={{
        perspective: 800,
        cursor: 'pointer',
        width: 80,
        height: 120,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          borderRadius: 12,
          boxShadow: '0 8px 14px rgba(0, 0, 0, 0.25)',
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          userSelect: 'none',
        }}
      >
        {/* Front side (face down) */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: '#1e40af',
            borderRadius: 12,
            color: 'white',
            fontSize: 48,
            lineHeight: '120px',
            backfaceVisibility: 'hidden',
            boxShadow: 'inset 0 0 10px rgba(255,255,255,0.2)',
          }}
        >
          ?
        </div>

        {/* Back side (face up) */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            borderRadius: 12,
            color: '#1e40af',
            fontSize: 56,
            fontWeight: '700',
            lineHeight: '120px',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            boxShadow: '0 0 8px #1e40af',
          }}
        >
          {card.value}
        </div>
      </div>
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
        }, 1200);
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
          setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        }, 1200);
      }
    }
  };

  const isCardFlipped = (index) => {
    return flippedIndices.includes(index) || matchedPairs.includes(cards[index].value);
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <h1 style={{ fontSize: 36, color: '#111827', marginBottom: 24 }}>Memory Card Game</h1>

      <div
        style={{
          display: 'flex',
          gap: 20,
          marginBottom: 32,
          width: '100%',
          maxWidth: 360,
          justifyContent: 'space-between',
        }}
      >
        {[1, 2].map((player) => (
          <div
            key={player}
            style={{
              flex: 1,
              backgroundColor: currentPlayer === player ? '#2563eb' : '#e5e7eb',
              color: currentPlayer === player ? 'white' : '#374151',
              padding: '12px 0',
              borderRadius: 12,
              textAlign: 'center',
              fontWeight: '600',
              boxShadow: currentPlayer === player ? '0 4px 12px rgba(37, 99, 235, 0.4)' : 'none',
              userSelect: 'none',
              transition: 'background-color 0.3s, color 0.3s',
            }}
          >
            Player {player}: {scores[player]} pts
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 80px)',
          gap: 16,
          marginBottom: 32,
          justifyContent: 'center',
        }}
      >
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
        <div
          style={{
            backgroundColor: '#fff7ed',
            borderRadius: 12,
            padding: 24,
            maxWidth: 360,
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 8px 20px rgba(252, 211, 77, 0.6)',
            userSelect: 'none',
          }}
        >
          <h2 style={{ fontSize: 28, marginBottom: 12, color: '#b45309' }}>Game Over!</h2>
          {winner === 0 ? (
            <p style={{ fontSize: 20, marginBottom: 20 }}>It's a draw!</p>
          ) : (
            <p style={{ fontSize: 20, marginBottom: 20 }}>
              Player {winner} wins with {scores[winner]} points!
            </p>
          )}
          <button
            onClick={shuffleCards}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              fontWeight: '600',
              border: 'none',
              borderRadius: 8,
              padding: '10px 24px',
              fontSize: 18,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.6)',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2563eb')}
          >
            Play Again
          </button>
        </div>
      )}

      {!gameOver && (
        <div
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: '#374151',
            userSelect: 'none',
          }}
        >
          Player {currentPlayer}&apos;s turn - Choose two cards to flip
        </div>
      )}
    </div>
  );
}
