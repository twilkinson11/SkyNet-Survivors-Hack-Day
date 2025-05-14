#!/bin/bash

# Create the main project directory

# Create public directory structure
mkdir -p public/assets/{images/{cards,ui,backgrounds},sounds,fonts}
touch public/index.html
touch public/favicon.ico
touch public/manifest.json

# Create sample card images (empty files for placeholder)
touch public/assets/images/cards/{pair1,pair2,pair3,pair4,odd}.png
touch public/assets/images/ui/{logo,card-back}.png
touch public/assets/images/backgrounds/bg.png

# Create sample sound files
touch public/assets/sounds/{flip,match,win}.mp3

# Create source directory with components
mkdir -p src/components/{Card,GameBoard,ScorePanel,TurnIndicator,GameControls,PlayerInput,GameOverModal,Instructions}

# Create component files
for dir in src/components/*; do
  base=$(basename "$dir")
  touch "$dir/$base.jsx"
  touch "$dir/$base.css"
  touch "$dir/index.js"
done

# Create context directory
mkdir -p src/context
touch src/context/GameContext.jsx

# Create hooks directory
mkdir -p src/hooks
touch src/hooks/{useGameState,useCardFlip,useLocalStorage}.js

# Create utils directory
mkdir -p src/utils
touch src/utils/{shuffleCards,generateCardPairs,localStorage,animations,accessibility}.js

# Create constants directory
mkdir -p src/constants
touch src/constants/{gameSettings,cardTypes,animationTimings}.js

# Create tests directory structure
mkdir -p src/tests/{components,hooks,utils}

# Create main app files
touch src/{App.jsx,App.css,index.jsx,index.css}

# Create server/nginx directory
mkdir -p server/nginx
touch server/nginx/default.conf

# Create scripts directory
mkdir -p scripts
touch scripts/{build,deploy}.js

# Create docs directory
mkdir -p docs
touch docs/{architecture,api,user-guide}.md

# Create root configuration files
touch {.gitignore,.eslintrc.js,.prettierrc,package.json,package-lock.json,README.md,jest.config.js,webpack.config.js}

# Create placeholder README content
echo "# Memory Card Game

A two-player memory matching card game with a 3x3 grid hosted on Nginx.

## Getting Started

1. Clone the repository
2. Run \`npm install\`
3. Run \`npm start\`

## Features

- 3x3 grid with matching pairs
- Two-player turn-based gameplay
- Score tracking
- Game state persistence

## Technologies

- React.js
- CSS
- Nginx" > README.md

echo "Folder structure created successfully!"
