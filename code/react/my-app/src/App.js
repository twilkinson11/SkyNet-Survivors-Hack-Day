import { useState, useEffect } from 'react'


// Card component to represent each playing card
const Card = ({ card, index, handleClick, isFlipped }) => {
  return (
    <div 
      className={`h-32 w-24 rounded-lg cursor-pointer transform transition-transform duration-300 ${isFlipped ? 'rotate-y-180' : ''}`}
      onClick={() => handleClick(index)}
    >
      <div className={`relative w-full h-full transition-all duration-500 ${isFlipped ? 'bg-white' : 'bg-blue-600'} rounded-lg shadow-md`}>
        {isFlipped ? (
          <div className="flex items-center justify-center h-full text-3xl font-bold">
            {card.value}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-white text-xl">
            ?
          </div>
        )}
      </div>
    </div>
  );
};

export default function MemoryCardGame() {
  // Create card values: 5 pairs = 10 cards total
  const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E'];
  
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  

  // Shuffle cards
  const shuffleCards = () => {
    // Create shuffled cards
    const shuffled = [...cardValues]
      .map(value => ({ value, matched: false }))
      .sort(() => Math.random() - 0.5);

      
    
    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setScores({ 1: 0, 2: 0 });
    setCurrentPlayer(1);
    setGameOver(false);
    setWinner(null);
  };

  // Initialize game
  useEffect(() => {
    shuffleCards();
  } );

  // Handle card click
  const handleCardClick = (index) => {
    // Prevent clicks if game is over
    if (gameOver) return;
    
    // Prevent clicking already matched cards or clicking more than 2 unmatched cards
    if (
      matchedPairs.includes(cards[index].value) || 
      flippedIndices.includes(index) ||
      flippedIndices.length === 2
    ) {
      return;
    }

    // Flip card
    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    // Check for matches if two cards are flipped
    if (newFlippedIndices.length === 2) {
      const [firstIndex, secondIndex] = newFlippedIndices;
      
      if (cards[firstIndex].value === cards[secondIndex].value) {
        // Match found
        setMatchedPairs([...matchedPairs, cards[firstIndex].value]);
        
        // Update score for current player
        const newScores = { ...scores };
        newScores[currentPlayer] += 5;
        setScores(newScores);
        
        // Check if game is over (3 matches found)
        if (matchedPairs.length + 1 === 5) { // 5 pairs in total (10 cards paired)
          setGameOver(true);
          
          // Determine winner
          if (newScores[1] > newScores[2]) {
            setWinner(1);
          } else if (newScores[2] > newScores[1]) {
            setWinner(2);
          } else {
            setWinner(0); // Draw
          }
        }
        
        // Clear flipped indices
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      } else {
        // No match, switch player after a delay
        setTimeout(() => {
          setFlippedIndices([]);
          setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        }, 1000);
      }
    }
  };

  // Check if a card should be displayed as flipped
  const isCardFlipped = (index) => {
    return flippedIndices.includes(index) || matchedPairs.includes(cards[index].value);
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Memory Card Game</h1>
      
      <div className="mb-4 flex justify-between w-full max-w-md">
        <div className={`p-3 rounded-lg ${currentPlayer === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          Player 1: {scores[1]} points
        </div>
        <div className={`p-3 rounded-lg ${currentPlayer === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          Player 2: {scores[2]} points
        </div>
      </div>
      
      <div className="grid grid-cols-5 gap-4 mb-6">
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
        <div className="mt-4 p-4 bg-yellow-100 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-2">Game Over!</h2>
          {winner === 0 ? (
            <p>It's a draw!</p>
          ) : (
            <p>Player {winner} wins with {scores[winner]} points!</p>
          )}
          <button 
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            onClick={shuffleCards}
          >
            Play Again
          </button>
        </div>
      )}
      
      {!gameOver && (
        <div className="mt-4 text-lg font-medium">
          Player {currentPlayer}'s turn - Choose two cards to flip
        </div>
      )}
    </div>
  )
}





