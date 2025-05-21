# Memory Card Game

A two-player memory matching card game with a 3x3 grid hosted on Nginx.

![Memory Game Screenshot](https://via.placeholder.com/600x400?text=Memory+Game)

## 🎮 Game Features

- 3x3 grid with matching pairs
- Two-player turn-based gameplay
- Score tracking and persistent high scores
- Animation effects with custom CSS
- Fully accessible with keyboard navigation and screen reader support
- Responsive design for mobile and desktop
- Game state persistence using localStorage

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/memory-card-game.git
   cd memory-card-game
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## 🧪 Running Tests

```bash
npm test
# or
yarn test
```

## 🔧 Project Structure

```
memory-card-game/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Card/
│   │   ├── GameBoard/
│   │   ├── GameControls/
│   │   ├── GameOverModal/
│   │   ├── Instructions/
│   │   ├── PlayerInput/
│   │   ├── ScorePanel/
│   │   └── TurnIndicator/
│   ├── utils/
│   │   ├── accessibility.js
│   │   ├── animations.js
│   │   ├── localStorage.js
│   │   └── shuffleCards.js
│   ├── App.jsx
│   ├── index.jsx
│   └── index.css
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── jest.config.js
├── package.json
├── README.md
└── webpack.config.js
```

## 🎯 Game Rules

1. The game consists of a 3x3 grid containing pairs of matching cards
2. Players take turns flipping two cards per turn
3. If the cards match, the player earns a point and takes another turn
4. If the cards don't match, the cards are flipped back and it's the next player's turn
5. The game ends when all pairs have been matched
6. The player with the most points wins!

## 🛠️ Technologies

- React.js
- CSS (with animations)
- Jest for testing
- ESLint and Prettier for code quality
- Webpack for bundling
- Nginx for production hosting

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request