# 🎬 Movie Oracle

> A retro-minimalist Hollywood oracle that predicts the fate of any movie concept
---

## ✨ Features

- 🎯 Predicts **audience score**, **critic score**, **box office**, and **Oscar probability**
- 🎭 Dramatic AI-generated verdicts for any title or concept you can imagine
- 📽️ Retro typewriter aesthetic — VT323 terminal font, cream paper tones, film sprocket details
- ⚡ Instant example prompts to get started
- 🎞️ Comparable films suggested for every prediction

---

## 🖥️ Tech Stack

| Layer | Tool |
|-------|------|
| Framework | React 18 + Vite |
| AI | Anthropic Claude API (`claude-sonnet-4`) |
| Styling | CSS-in-JS (no UI library) |
| Fonts | VT323, Special Elite, Courier Prime (Google Fonts) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- An Anthropic API key → [console.anthropic.com](https://console.anthropic.com)

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/movie-oracle.git
cd movie-oracle
npm install
```

### Environment Setup

```bash
cp .env.example .env
```

Open `.env` and fill in your key:

```env
VITE_ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxx
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and consult the oracle.

---

## 📁 Project Structure

```
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
```

---

## 🌐 Deployment

### Vercel (recommended)

1. Push to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Add `VITE_ANTHROPIC_API_KEY` under **Environment Variables**
4. Deploy — every push to `main` auto-deploys

### GitHub Pages

```bash
npm install --save-dev gh-pages
npm run deploy
```

> ⚠️ GitHub Pages can't protect environment variables. Use Vercel for any key-secured deployment.

---

## ⚠️ API Key Notice

This app calls the Anthropic API directly from the browser, which is fine for personal or demo use. For a public production app, proxy the API call through a backend (Next.js API routes, Express, etc.) so your key is never exposed to the client.

---

## 📜 License

MIT — free to use, modify, and ship.

---

