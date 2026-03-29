import { useState, useEffect } from "react";

const RETRO_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=VT323&family=Special+Elite&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #F4ECD8;
    --paper: #EDE4CC;
    --dark: #1C1008;
    --brown: #3D2B1F;
    --red: #C0392B;
    --gold: #B8860B;
    --faded: #8B7355;
    --border: #3D2B1F;
  }

  body {
    background: var(--cream);
    color: var(--dark);
    font-family: 'Courier Prime', monospace;
    min-height: 100vh;
  }

  .grain {
    position: fixed; inset: 0; pointer-events: none; z-index: 999; opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 150px;
  }

  .app {
    max-width: 680px;
    margin: 0 auto;
    padding: 40px 24px 80px;
  }

  /* HEADER */
  .header {
    text-align: center;
    margin-bottom: 48px;
    position: relative;
  }
  .film-strip {
    display: flex; justify-content: center; gap: 6px; margin-bottom: 16px;
  }
  .film-hole {
    width: 12px; height: 12px;
    border: 2px solid var(--brown);
    border-radius: 2px;
    background: var(--paper);
  }
  .header h1 {
    font-family: 'VT323', monospace;
    font-size: 52px;
    letter-spacing: 4px;
    color: var(--dark);
    line-height: 1;
    text-transform: uppercase;
  }
  .header h1 span { color: var(--red); }
  .header .tagline {
    font-family: 'Special Elite', cursive;
    font-size: 13px;
    color: var(--faded);
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-top: 6px;
  }
  .divider {
    border: none;
    border-top: 2px solid var(--border);
    margin: 16px 0;
    position: relative;
  }
  .divider::before {
    content: '◆';
    position: absolute;
    left: 50%; top: -10px;
    transform: translateX(-50%);
    background: var(--cream);
    padding: 0 8px;
    font-size: 12px;
    color: var(--red);
  }

  /* INPUT SECTION */
  .input-card {
    border: 2px solid var(--border);
    background: var(--paper);
    padding: 28px;
    margin-bottom: 32px;
    position: relative;
  }
  .input-card::before {
    content: '[ INPUT ]';
    position: absolute;
    top: -11px; left: 16px;
    background: var(--paper);
    padding: 0 8px;
    font-family: 'VT323', monospace;
    font-size: 16px;
    letter-spacing: 2px;
    color: var(--faded);
  }
  .input-label {
    font-family: 'Special Elite', cursive;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--faded);
    margin-bottom: 10px;
    display: block;
  }
  .input-row {
    display: flex; gap: 12px; align-items: flex-start; flex-wrap: wrap;
  }
  .movie-input {
    flex: 1; min-width: 200px;
    background: var(--cream);
    border: 2px solid var(--border);
    padding: 12px 16px;
    font-family: 'Courier Prime', monospace;
    font-size: 16px;
    color: var(--dark);
    outline: none;
    transition: border-color 0.2s;
  }
  .movie-input::placeholder { color: var(--faded); }
  .movie-input:focus { border-color: var(--red); }

  .predict-btn {
    background: var(--dark);
    color: var(--cream);
    border: 2px solid var(--dark);
    padding: 12px 24px;
    font-family: 'VT323', monospace;
    font-size: 20px;
    letter-spacing: 2px;
    cursor: pointer;
    text-transform: uppercase;
    transition: all 0.15s;
    white-space: nowrap;
  }
  .predict-btn:hover:not(:disabled) {
    background: var(--red);
    border-color: var(--red);
  }
  .predict-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .hint-row {
    display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px;
  }
  .hint-chip {
    font-family: 'Courier Prime', monospace;
    font-size: 11px;
    border: 1px dashed var(--faded);
    padding: 4px 10px;
    color: var(--faded);
    cursor: pointer;
    transition: all 0.15s;
    background: transparent;
  }
  .hint-chip:hover { border-color: var(--red); color: var(--red); }

  /* LOADING */
  .loading {
    text-align: center; padding: 48px 0;
  }
  .loading-reel {
    font-family: 'VT323', monospace;
    font-size: 48px;
    display: inline-block;
    animation: spin 0.8s steps(8) infinite;
    color: var(--red);
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text {
    font-family: 'Special Elite', cursive;
    font-size: 13px;
    letter-spacing: 3px;
    color: var(--faded);
    margin-top: 12px;
    text-transform: uppercase;
    animation: blink 1s step-end infinite;
  }
  @keyframes blink { 50% { opacity: 0; } }

  /* RESULTS */
  .results {
    animation: fadeIn 0.4s ease;
  }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }

  .result-title-bar {
    background: var(--dark);
    color: var(--cream);
    padding: 12px 20px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .result-movie-name {
    font-family: 'VT323', monospace;
    font-size: 22px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
  .result-badge {
    font-family: 'VT323', monospace;
    font-size: 14px;
    letter-spacing: 1px;
    color: #aaa;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-left: 2px solid var(--border);
    border-right: 2px solid var(--border);
  }
  .metric-cell {
    padding: 20px;
    border-bottom: 2px solid var(--border);
    position: relative;
  }
  .metric-cell:nth-child(odd) { border-right: 1px solid var(--border); }
  .metric-cell:nth-child(even) { border-left: 1px solid var(--border); }

  .metric-label {
    font-family: 'Special Elite', cursive;
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--faded);
    margin-bottom: 8px;
  }
  .metric-value {
    font-family: 'VT323', monospace;
    font-size: 32px;
    color: var(--dark);
    line-height: 1;
  }
  .metric-value.highlight { color: var(--red); }
  .metric-stars {
    font-size: 16px; letter-spacing: 1px; color: var(--gold);
  }

  .verdict-box {
    border: 2px solid var(--border);
    border-top: none;
    padding: 24px 28px;
    background: var(--paper);
    position: relative;
  }
  .verdict-box::before {
    content: '[ ORACLE VERDICT ]';
    position: absolute; top: -11px; left: 16px;
    background: var(--paper); padding: 0 8px;
    font-family: 'VT323', monospace;
    font-size: 16px; letter-spacing: 2px; color: var(--faded);
  }
  .verdict-text {
    font-family: 'Courier Prime', monospace;
    font-size: 15px;
    line-height: 1.75;
    color: var(--brown);
  }

  .similar-row {
    margin-top: 16px; padding-top: 16px;
    border-top: 1px dashed var(--faded);
  }
  .similar-label {
    font-family: 'Special Elite', cursive;
    font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
    color: var(--faded); margin-bottom: 8px;
  }
  .similar-chips {
    display: flex; flex-wrap: wrap; gap: 6px;
  }
  .similar-chip {
    font-family: 'Courier Prime', monospace;
    font-size: 12px;
    border: 1px solid var(--border);
    padding: 3px 10px;
    color: var(--brown);
    background: var(--cream);
  }

  .error-box {
    border: 2px solid var(--red); padding: 20px;
    font-family: 'Courier Prime', monospace; color: var(--red);
    background: #fff5f5; font-size: 14px;
  }

  .reset-btn {
    display: block; margin: 24px auto 0;
    background: transparent; border: 2px dashed var(--faded);
    color: var(--faded); padding: 10px 28px;
    font-family: 'VT323', monospace; font-size: 18px;
    letter-spacing: 2px; cursor: pointer; text-transform: uppercase;
    transition: all 0.15s;
  }
  .reset-btn:hover { border-color: var(--dark); color: var(--dark); }

  .footer {
    text-align: center; margin-top: 64px;
    font-family: 'Special Elite', cursive;
    font-size: 11px; letter-spacing: 2px;
    color: var(--faded); text-transform: uppercase;
  }
`;

const EXAMPLES = [
  "A time-traveling chef in Paris",
  "Elderly astronaut returns to Earth",
  "Teen detective in 1920s Tokyo",
  "Two rival magicians fall in love",
];

function Stars({ score }) {
  const full = Math.round(score / 20);
  return (
    <span className="metric-stars">
      {"★".repeat(full)}{"☆".repeat(5 - full)}
    </span>
  );
}

export default function MoviePredictor() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loadMsg, setLoadMsg] = useState(0);

  const LOAD_MSGS = [
    "CONSULTING THE ORACLE...",
    "READING THE REELS...",
    "ANALYZING BOX OFFICE FATE...",
    "CHANNELING SPIELBERG...",
  ];

  useEffect(() => {
    if (!loading) return;
    const iv = setInterval(() => setLoadMsg(m => (m + 1) % LOAD_MSGS.length), 1200);
    return () => clearInterval(iv);
  }, [loading]);

  const predict = async (movieQuery) => {
    const q = movieQuery || query;
    if (!q.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are a theatrical, slightly dramatic Hollywood oracle who predicts movie success. Given a movie title or concept, respond ONLY with a valid JSON object (no markdown, no backticks, no preamble) with this exact structure:
{
  "title": "cleaned up movie title",
  "genre": "Genre / Subgenre",
  "audienceScore": 72,
  "criticScore": 65,
  "boxOffice": "$120M",
  "oscarChance": "17%",
  "verdict": "A 2-3 sentence dramatic, witty prediction in the voice of an old-school Hollywood oracle. Be specific and entertaining.",
  "similarMovies": ["Movie A", "Movie B", "Movie C"]
}
Scores are 0-100. Be creative but plausible. Always return valid JSON only.`,
          messages: [{ role: "user", content: q }],
        }),
      });

      const data = await res.json();
      const text = data.content?.find(b => b.type === "text")?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
    } catch (e) {
      setError("The oracle encountered a glitch. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: RETRO_STYLE }} />
      <div className="grain" />
      <div className="app">

        {/* HEADER */}
        <div className="header">
          <div className="film-strip">
            {Array(9).fill(0).map((_, i) => <div key={i} className="film-hole" />)}
          </div>
          <h1>MOVIE <span>ORACLE</span></h1>
          <p className="tagline">Predict the fate of any film</p>
          <hr className="divider" />
        </div>

        {/* INPUT */}
        <div className="input-card">
          <label className="input-label">Enter a movie title or concept</label>
          <div className="input-row">
            <input
              className="movie-input"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && predict()}
              placeholder="e.g. A robot who learns to paint..."
              disabled={loading}
            />
            <button
              className="predict-btn"
              onClick={() => predict()}
              disabled={loading || !query.trim()}
            >
              ▶ PREDICT
            </button>
          </div>
          <div className="hint-row">
            {EXAMPLES.map(ex => (
              <button
                key={ex}
                className="hint-chip"
                onClick={() => { setQuery(ex); predict(ex); }}
                disabled={loading}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="loading">
            <div className="loading-reel">⬡</div>
            <p className="loading-text">{LOAD_MSGS[loadMsg]}</p>
          </div>
        )}

        {/* ERROR */}
        {error && <div className="error-box">⚠ {error}</div>}

        {/* RESULTS */}
        {result && !loading && (
          <div className="results">
            <div className="result-title-bar">
              <span className="result-movie-name">"{result.title}"</span>
              <span className="result-badge">{result.genre}</span>
            </div>

            <div className="metrics-grid">
              <div className="metric-cell">
                <div className="metric-label">Audience Score</div>
                <div className="metric-value highlight">{result.audienceScore}%</div>
                <Stars score={result.audienceScore} />
              </div>
              <div className="metric-cell">
                <div className="metric-label">Critic Score</div>
                <div className="metric-value">{result.criticScore}%</div>
                <Stars score={result.criticScore} />
              </div>
              <div className="metric-cell">
                <div className="metric-label">Box Office Prediction</div>
                <div className="metric-value highlight">{result.boxOffice}</div>
              </div>
              <div className="metric-cell">
                <div className="metric-label">Oscar Probability</div>
                <div className="metric-value">{result.oscarChance}</div>
              </div>
            </div>

            <div className="verdict-box">
              <p className="verdict-text">{result.verdict}</p>
              {result.similarMovies?.length > 0 && (
                <div className="similar-row">
                  <div className="similar-label">Comparable Films</div>
                  <div className="similar-chips">
                    {result.similarMovies.map(m => (
                      <span key={m} className="similar-chip">{m}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="reset-btn" onClick={() => { setResult(null); setQuery(""); }}>
              ↺ NEW PREDICTION
            </button>
          </div>
        )}

        <div className="footer">
          ✦ MOVIE ORACLE MCMXXIV ✦ FOR ENTERTAINMENT PURPOSES ONLY ✦
        </div>
      </div>
    </>
  );
}
