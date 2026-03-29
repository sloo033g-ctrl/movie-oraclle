
🎬 Movie Oracle

A retro-minimalist Hollywood oracle that predicts the fate of any movie concept 
✨ Features

🎯 Predicts audience score, critic score, box office, and Oscar probability
🎭 Dramatic AI-generated verdicts for any title or concept you can imagine
📽️ Retro typewriter aesthetic — VT323 terminal font, cream paper tones, film sprocket details
⚡ Instant example prompts to get started
🎞️ Comparable films suggested for every prediction


🖥️ Tech Stack
LayerToolFrameworkReact 18 + ViteAIAnthropic Claude API (claude-sonnet-4)StylingCSS-in-JS (no UI library)FontsVT323, Special Elite, Courier Prime (Google Fonts)

🚀 Getting Started
Prerequisites

Node.js v18+
An Anthropic API key → console.anthropic.com

Installation
bashgit clone https://github.com/YOUR_USERNAME/movie-oracle.git
cd movie-oracle
npm install
Environment Setup
bashcp .env.example .env
Open .env and fill in your key:
envVITE_ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxx
Run Locally
bashnpm run dev
Open http://localhost:5173 and consult the oracle.

📁 Project Structure
movie-oracle/
├── public/
│   └── favicon.ico
├── src/
│   ├── App.jsx         ← main component
│   └── main.jsx
├── .env                ← your API key (never committed)
├── .env.example        ← safe template
├── .gitignore
├── index.html
├── package.json
└── vite.config.js

🌐 Deployment
Vercel (recommended)

Push to GitHub
Import repo at vercel.com
Add VITE_ANTHROPIC_API_KEY under Environment Variables
Deploy — every push to main auto-deploys

GitHub Pages
bashnpm install --save-dev gh-pages
npm run deploy

⚠️ GitHub Pages can't protect environment variables. Use Vercel for any key-secured deployment.


⚠️ API Key Notice
This app calls the Anthropic API directly from the browser, which is fine for personal or demo use. For a public production app, proxy the API call through a backend (Next.js API routes, Express, etc.) so your key is never exposed to the client.

📜 License
MIT — free to use, modify, and ship.

