/* global React, ReactDOM, TweaksPanel, useTweaks, TweakSection, TweakColor, TweakRadio, TweakToggle, TweakSlider */
const { useEffect } = React;

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "orange": "#ff5b1f",
  "paper": "#f4ede0",
  "ink": "#0c0a08",
  "highlight": "#ffd84a",
  "tapeOpacity": 0.55,
  "showTape": true,
  "showHalftone": true,
  "heroStyle": "mega",
  "voice": "warm",
  "programsLayout": "grid"
}/*EDITMODE-END*/;

function applyTweaks(t) {
  const r = document.documentElement.style;
  r.setProperty('--orange', t.orange);
  r.setProperty('--paper', t.paper);
  r.setProperty('--ink', t.ink);
  r.setProperty('--highlight', t.highlight);
  document.body.classList.toggle('no-tape', !t.showTape);
  const stage = document.querySelector('.programs-stage');
  if (stage) stage.setAttribute('data-layout', t.programsLayout);
}

function App() {
  const [t, setTweak] = useTweaks(DEFAULTS);
  useEffect(() => applyTweaks(t), [t]);
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Palette">
        <TweakColor label="Orange" value={t.orange} onChange={v => setTweak('orange', v)}
          options={["#ff5b1f", "#f7931a", "#e94e1b", "#d8401a", "#ff8c42"]} />
        <TweakColor label="Paper" value={t.paper} onChange={v => setTweak('paper', v)}
          options={["#f4ede0", "#f6f1e7", "#efe6d2", "#fff8eb", "#e8dec5"]} />
        <TweakColor label="Ink" value={t.ink} onChange={v => setTweak('ink', v)}
          options={["#0c0a08", "#1a1714", "#221d18", "#000000", "#2b2417"]} />
        <TweakColor label="Highlight" value={t.highlight} onChange={v => setTweak('highlight', v)}
          options={["#ffd84a", "#fff066", "#a3d9a5", "#ffb380", "#ff5b1f"]} />
      </TweakSection>
      <TweakSection title="Zine effects">
        <TweakToggle label="Tape decorations" value={t.showTape} onChange={v => setTweak('showTape', v)} />
        <TweakToggle label="Halftone textures" value={t.showHalftone} onChange={v => setTweak('showHalftone', v)} />
      </TweakSection>
      <TweakSection title="Programs section layout">
        <TweakRadio label="Style" value={t.programsLayout} onChange={v => setTweak('programsLayout', v)}
          options={[
            { value: 'grid', label: 'Grid' },
            { value: 'index', label: 'Index' },
            { value: 'pinboard', label: 'Pinboard' },
          ]} />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root') || (() => {
  const d = document.createElement('div'); d.id = 'tweaks-root'; document.body.appendChild(d); return d;
})()).render(<App />);
