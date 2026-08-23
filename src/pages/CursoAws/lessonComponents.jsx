import { useState } from 'react';

const ICON_PATHS = {
  server: (<><rect x="4" y="3.5" width="16" height="6.5" rx="1.5" /><rect x="4" y="14" width="16" height="6.5" rx="1.5" /><circle cx="7.5" cy="6.75" r="0.6" fill="currentColor" stroke="none" /><circle cx="7.5" cy="17.25" r="0.6" fill="currentColor" stroke="none" /></>),
  user: (<><circle cx="12" cy="8" r="3.6" /><path d="M4.5 20.5c0-4.1 3.4-7 7.5-7s7.5 2.9 7.5 7" /></>),
  users: (<><circle cx="8.5" cy="8.5" r="3" /><circle cx="16" cy="9.5" r="2.4" /><path d="M2.5 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><path d="M14.5 14.3c2.3.5 4 2.6 4 5.2" /></>),
  globe: (<><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><line x1="3" y1="12" x2="21" y2="12" /></>),
  'hard-drive': (<><rect x="3" y="4" width="18" height="16" rx="2" /><line x1="3" y1="14" x2="21" y2="14" /><circle cx="7.5" cy="17.2" r="0.6" fill="currentColor" stroke="none" /></>),
  package: (<><path d="M21 8l-9-5-9 5 9 5 9-5Z" /><path d="M3 8v9l9 5 9-5V8" /><line x1="12" y1="13" x2="12" y2="22" /></>),
  'map-pin': (<><path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.3" /></>),
  cloud: (<path d="M7 18a4.5 4.5 0 0 1-.3-9 5.6 5.6 0 0 1 10.8-1.7A4 4 0 0 1 17 18H7Z" />),
  lock: (<><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7.5a4 4 0 0 1 8 0V11" /></>),
  'file-text': (<><path d="M6 2h9l5 5v15H6Z" /><path d="M15 2v5h5" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" /></>),
  'book-open': (<><path d="M12 6c-1.8-1.3-4.3-2-7-2v14c2.7 0 5.2.7 7 2 1.8-1.3 4.3-2 7-2V4c-2.7 0-5.2.7-7 2Z" /><line x1="12" y1="6" x2="12" y2="20" /></>),
  shield: (<path d="M12 3 20 6.2V11c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6.2Z" />),
  building: (<><rect x="4" y="9" width="8" height="12" rx="1" /><rect x="14" y="3" width="6" height="18" rx="1" /><line x1="7" y1="13" x2="9" y2="13" /><line x1="7" y1="17" x2="9" y2="17" /><line x1="16.5" y1="7" x2="17.5" y2="7" /><line x1="16.5" y1="11" x2="17.5" y2="11" /><line x1="16.5" y1="15" x2="17.5" y2="15" /></>),
  dot: (<circle cx="12" cy="12" r="7" fill="currentColor" stroke="none" />),
  door: (<><path d="M5 21V4.5A1.5 1.5 0 0 1 6.5 3H15v18" /><path d="M15 4l4 1v16h-4" /><circle cx="11.5" cy="12.5" r="0.7" fill="currentColor" stroke="none" /></>),
  database: (<><ellipse cx="12" cy="5.5" rx="8" ry="2.8" /><path d="M4 5.5V18c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8V5.5" /><path d="M4 11.8c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8" /></>),
  disc: (<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /></>),
  key: (<><circle cx="7.5" cy="16.5" r="3.2" /><path d="M9.8 14.2 19 5" /><path d="M14.5 9.5 17 12" /><path d="M17.5 6.5 20 9" /></>),
  radio: (<><circle cx="12" cy="14" r="2.2" /><path d="M12 16.2V21" /><path d="M8.5 10.8a5 5 0 0 1 7 0" /><path d="M5.5 7.8a9.2 9.2 0 0 1 13 0" /></>),
  settings: (<><line x1="4" y1="6" x2="20" y2="6" /><circle cx="9" cy="6" r="2" fill="var(--color-bg)" /><line x1="4" y1="12" x2="20" y2="12" /><circle cx="15" cy="12" r="2" fill="var(--color-bg)" /><line x1="4" y1="18" x2="20" y2="18" /><circle cx="11" cy="18" r="2" fill="var(--color-bg)" /></>),
  'bar-chart': (<><line x1="4" y1="20" x2="4" y2="11" /><line x1="10" y1="20" x2="10" y2="4" /><line x1="16" y1="20" x2="16" y2="14" /><line x1="2" y1="20" x2="22" y2="20" /></>),
  tag: (<><path d="M12 2H4v8l10 10 8-8L12 2Z" /><circle cx="8" cy="7" r="1.2" fill="currentColor" stroke="none" /></>),
  'id-card': (<><rect x="2.5" y="5" width="19" height="14" rx="2" /><circle cx="8" cy="12" r="2" /><line x1="5.5" y1="16.3" x2="10.5" y2="16.3" /><line x1="13.5" y1="9.5" x2="18.5" y2="9.5" /><line x1="13.5" y1="13" x2="18.5" y2="13" /></>),
  rocket: (<><path d="M12 2.5c3 2 5 6 5 10 0 2-1 4-2 5l-1 3-2-2-2 2-1-3c-1-1-2-3-2-5 0-4 2-8 5-10Z" /><line x1="9.3" y1="15" x2="6.5" y2="18" /><line x1="14.7" y1="15" x2="17.5" y2="18" /><circle cx="12" cy="9.5" r="1.4" /></>),
  'check-circle': (<><circle cx="12" cy="12" r="9" /><path d="M7.5 12.5 10.5 15.5 16.5 8.5" /></>),
  target: (<><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /></>),
  clock: (<><circle cx="12" cy="12" r="9" /><line x1="12" y1="7" x2="12" y2="12.3" /><line x1="12" y1="12.3" x2="15.5" y2="14.5" /></>),
  smartphone: (<><rect x="6" y="2" width="12" height="20" rx="2.5" /><line x1="10" y1="18.3" x2="14" y2="18.3" /></>),
  bell: (<><path d="M6 9a6 6 0 0 1 12 0c0 4.5 1.8 5.8 1.8 5.8H4.2S6 13.5 6 9Z" /><path d="M10.2 18a1.9 1.9 0 0 0 3.6 0" /></>),
  camera: (<><rect x="2.5" y="7" width="19" height="13" rx="2" /><path d="M8 7l1.3-2.5h5.4L16 7" /><circle cx="12" cy="13.4" r="3.6" /></>),
  'clipboard-list': (<><rect x="5.5" y="4" width="13" height="18" rx="2" /><rect x="9" y="2" width="6" height="3.6" rx="1" /><line x1="8.5" y1="11" x2="15.5" y2="11" /><line x1="8.5" y1="14.5" x2="15.5" y2="14.5" /><line x1="8.5" y1="18" x2="13" y2="18" /></>),
  upload: (<><path d="M12 15.5V4" /><path d="M7.5 8.5 12 4l4.5 4.5" /><path d="M4.5 15.5v3.7a1.8 1.8 0 0 0 1.8 1.8h11.4a1.8 1.8 0 0 0 1.8-1.8v-3.7" /></>),
  'x-circle': (<><circle cx="12" cy="12" r="9" /><line x1="9" y1="9" x2="15" y2="15" /><line x1="15" y1="9" x2="9" y2="15" /></>),
  search: (<><circle cx="10.5" cy="10.5" r="6.5" /><line x1="15.3" y1="15.3" x2="20" y2="20" /></>),
  home: (<><path d="M4 11.5 12 4l8 7.5" /><path d="M6 10v10h5v-6h2v6h5V10" /></>),
  refresh: (<><path d="M20 11a8 8 0 0 0-14.6-4.4" /><path d="M4 4v5h5" /><path d="M4 13a8 8 0 0 0 14.6 4.4" /><path d="M20 20v-5h-5" /></>),
  calculator: (<><rect x="5" y="2" width="14" height="20" rx="2" /><rect x="7.3" y="4.3" width="9.4" height="4" rx="0.5" /><circle cx="8.4" cy="11.5" r="0.7" fill="currentColor" stroke="none" /><circle cx="12" cy="11.5" r="0.7" fill="currentColor" stroke="none" /><circle cx="15.6" cy="11.5" r="0.7" fill="currentColor" stroke="none" /><circle cx="8.4" cy="15" r="0.7" fill="currentColor" stroke="none" /><circle cx="12" cy="15" r="0.7" fill="currentColor" stroke="none" /><circle cx="15.6" cy="15" r="0.7" fill="currentColor" stroke="none" /><circle cx="8.4" cy="18.5" r="0.7" fill="currentColor" stroke="none" /><circle cx="12" cy="18.5" r="0.7" fill="currentColor" stroke="none" /><circle cx="15.6" cy="18.5" r="0.7" fill="currentColor" stroke="none" /></>),
  zap: (<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />),
  crown: (<><path d="M3 8l4 3.5L12 5l5 6.5L21 8l-1.6 10H4.6L3 8Z" /><line x1="5" y1="21" x2="19" y2="21" /></>),
  flask: (<><path d="M9 2h6" /><path d="M10 3v6.5L4.8 18a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 9.5V3" /><line x1="7.5" y1="14.5" x2="16.5" y2="14.5" /></>),
  trash: (<><path d="M4 7h16" /><path d="M9 3.5h6a1 1 0 0 1 1 1V7H8V4.5a1 1 0 0 1 1-1Z" /><path d="M6.5 7 7.3 20a2 2 0 0 0 2 1.9h5.4a2 2 0 0 0 2-1.9L17.5 7" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></>),
  'dollar-sign': (<><line x1="12" y1="2" x2="12" y2="22" /><path d="M16.5 6.8c0-1.8-2-3.1-4.5-3.1s-4.5 1.4-4.5 3.3c0 1.9 1.9 2.6 4.5 3.3 2.7.7 4.5 1.5 4.5 3.4 0 1.9-2 3.3-4.5 3.3s-4.5-1.3-4.5-3.1" /></>),
  'credit-card': (<><rect x="2.5" y="5" width="19" height="14" rx="2.2" /><line x1="2.5" y1="10" x2="21.5" y2="10" /><line x1="6" y1="14.5" x2="10" y2="14.5" /></>),
  car: (<><path d="M4 16V11.5l2-4.5h12l2 4.5V16" /><path d="M4 16h16v2.5a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1V16" /><path d="M8.5 16v2.5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V16" /><circle cx="8" cy="12.2" r="0.7" fill="currentColor" stroke="none" /><circle cx="16" cy="12.2" r="0.7" fill="currentColor" stroke="none" /></>),
  briefcase: (<><rect x="2.5" y="7.5" width="19" height="12" rx="2" /><path d="M8.5 7.5V5.8a1.8 1.8 0 0 1 1.8-1.8h3.4a1.8 1.8 0 0 1 1.8 1.8v1.7" /><line x1="2.5" y1="13" x2="21.5" y2="13" /></>),
  'help-circle': (<><circle cx="12" cy="12" r="9" /><path d="M9.3 9.3a2.7 2.7 0 1 1 3.7 2.5c-.7.3-1 .9-1 1.7" /><circle cx="12" cy="17" r="0.7" fill="currentColor" stroke="none" /></>),
  lightbulb: (<><path d="M9 18.5h6" /><path d="M8 14.3A4.3 4.3 0 1 1 16 14.3c0 1.9-1.1 2.7-2.1 3.6-.6.5-1 1-1 1.6h-1.8c0-.6-.4-1.1-1-1.6-1-.9-2.1-1.7-2.1-3.6Z" /><line x1="10" y1="21.5" x2="14" y2="21.5" /></>),
  trophy: (<><path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" /><path d="M8 5.2H5.2A2.8 2.8 0 0 0 8 9" /><path d="M16 5.2h2.8A2.8 2.8 0 0 1 16 9" /><line x1="12" y1="13" x2="12" y2="17.5" /><path d="M8.5 20.5h7" /><line x1="12" y1="17.5" x2="12" y2="20.5" /></>),
  link: (<><rect x="2.3" y="9.3" width="8" height="5.4" rx="2.7" transform="rotate(-45 6.3 12)" /><rect x="13.7" y="9.3" width="8" height="5.4" rx="2.7" transform="rotate(-45 17.7 12)" /></>),
  play: (<path d="M7 4.5 20 12 7 19.5Z" />),
  puzzle: (<><path d="M12 3 21 8 12 13 3 8Z" /><path d="M3 13l9 5 9-5" /></>),
  'alert-triangle': (<><path d="M12 3 22 20H2Z" /><line x1="12" y1="9.5" x2="12" y2="14.5" /><circle cx="12" cy="17.3" r="0.7" fill="currentColor" stroke="none" /></>),
  power: (<><line x1="12" y1="3" x2="12" y2="11" /><path d="M6.5 6.5a8 8 0 1 0 11 0" /></>),
  'arrow-right': (<><line x1="4" y1="12" x2="19" y2="12" /><path d="M13 6l6 6-6 6" /></>),
  eye: (<><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>),
};

const DOT_CLASS = { success: 'icon-dot-success', danger: 'icon-dot-danger', warning: 'icon-dot-warning', muted: 'icon-dot-muted' };

export function Icon({ name, className = '' }) {
  if (!name) return null;
  if (name.startsWith('dot-')) {
    const tone = name.slice(4);
    return (
      <svg className={`icon icon-dot ${DOT_CLASS[tone] || ''} ${className}`.trim()} viewBox="0 0 24 24" aria-hidden="true">
        {ICON_PATHS.dot}
      </svg>
    );
  }
  const content = ICON_PATHS[name];
  if (!content) return null;
  return (
    <svg className={`icon ${className}`.trim()} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {content}
    </svg>
  );
}

export function Nota({ children }) {
  return (
    <div className="note-block">
      <span className="note-tag">Seguro</span>
      <div className="note-text">{children}</div>
    </div>
  );
}

export function Dialogo({ children }) {
  return <blockquote className="dialogo">{children}</blockquote>;
}

export function ConceptBadge({ children, variant = 'accent', icon }) {
  const cls = variant === 'danger' ? ' is-danger' : variant === 'warning' ? ' is-warning' : '';
  return (
    <div className={`concept-badge${cls}`}>
      {icon && <Icon name={icon} />}
      <span>{children}</span>
    </div>
  );
}

export function StrikeChip({ children }) {
  return <div className="strike-chip">{children}</div>;
}

export function RoleGrid({ roles }) {
  return (
    <div className="role-grid">
      {roles.map((r) => (
        <div key={r.label} className="role-chip">
          <span className="role-chip-icon">{r.icon ? <Icon name={r.icon} /> : r.emoji}</span>
          <div className="role-chip-label">{r.label}</div>
          <div className="role-chip-desc">{r.desc}</div>
        </div>
      ))}
    </div>
  );
}

export function Flow({ steps }) {
  return (
    <div className="flow">
      {steps.map((s, i) => (
        <div key={i}>
          <div className="flow-step">
            <span className={`flow-step-badge${s.n ? ' is-numeral' : ''}`}>
              {s.n ?? (s.icon ? <Icon name={s.icon} /> : s.emoji)}
            </span>
            <span>
              <span className="flow-step-label">{s.label}</span>
              {s.caption && <span className="flow-step-caption" style={{ display: 'block' }}>{s.caption}</span>}
            </span>
          </div>
          {i < steps.length - 1 && <div className="flow-arrow"><Icon name="arrow-right" className="flow-arrow-icon" /></div>}
        </div>
      ))}
    </div>
  );
}

export function InfoBox({ title, items }) {
  return (
    <div className="info-box">
      {title && <div className="info-box-title">{title}</div>}
      {items.map((it) => (
        <div key={it} className="info-box-row">{it}</div>
      ))}
    </div>
  );
}

export function CompareCols({ cols }) {
  return (
    <div className="compare-grid">
      {cols.map((c) => (
        <div key={c.title} className="compare-col">
          <div className="compare-col-head"><span>{c.emoji}</span><span>{c.title}</span></div>
          <ul>
            {c.items.map((it) => <li key={it}>{it}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function CapacityRow({ label, pct, filled, total }) {
  if (pct != null) {
    return (
      <div className="capacity-row">
        <span className="capacity-row-label">{label}</span>
        <span className="capacity-bar"><span className="capacity-bar-fill" style={{ width: `${pct}%` }} /></span>
        <span className="capacity-row-pct">{pct}%</span>
      </div>
    );
  }
  return (
    <div className="capacity-row">
      <span className="capacity-row-label">{label}</span>
      <span className="capacity-row-segments">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={`capacity-seg${i < filled ? ' is-on' : ''}`} />
        ))}
      </span>
    </div>
  );
}

export function QaItem({ question, answer, answerLabel = 'Respuesta' }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="qa-item">
      <div className="qa-question">{question}</div>
      {open ? (
        <div className="qa-answer">{answerLabel}: {answer}</div>
      ) : (
        <button type="button" className="btn btn-ghost" onClick={() => setOpen(true)}>Ver respuesta</button>
      )}
    </div>
  );
}

export function Reveal({ label = 'Ver respuesta modelo', children }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button type="button" className="btn btn-ghost" onClick={() => setOpen((o) => !o)}>
        {open ? 'Ocultar respuesta modelo' : label}
      </button>
      {open && <div className="reveal-content">{children}</div>}
    </div>
  );
}

export function Quiz({ questions }) {
  const [answers, setAnswers] = useState({});

  function select(qi, oi) {
    if (answers[qi] !== undefined) return;
    setAnswers((a) => ({ ...a, [qi]: oi }));
  }

  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.entries(answers).filter(([qi, oi]) => questions[qi].options[oi].correct).length;

  return (
    <div>
      {questions.map((item, qi) => {
        const selected = answers[qi];
        const answered = selected !== undefined;
        return (
          <div key={item.q} className="quiz-card">
            <div className="quiz-question">Pregunta {qi + 1}. {item.q}</div>
            <div className="quiz-options">
              {item.options.map((opt, oi) => {
                let cls = 'quiz-option';
                if (answered && opt.correct) cls += ' is-correct';
                else if (answered && oi === selected && !opt.correct) cls += ' is-wrong';
                return (
                  <button
                    key={opt.text}
                    type="button"
                    className={cls}
                    disabled={answered}
                    onClick={() => select(qi, oi)}
                  >
                    {String.fromCharCode(65 + oi)}) {opt.text}
                  </button>
                );
              })}
            </div>
            {answered && (
              <div className={`quiz-feedback ${item.options[selected].correct ? 'is-correct-fb' : 'is-wrong-fb'}`}>
                {item.options[selected].correct ? '✅ ¡Correcto!' : '❌ No es esa. La respuesta correcta está resaltada arriba.'}
              </div>
            )}
          </div>
        );
      })}
      <div className="quiz-score">
        {answeredCount === questions.length
          ? `Resultado: ${correctCount} de ${questions.length} correctas.`
          : `Respondidas: ${answeredCount} de ${questions.length}`}
      </div>
    </div>
  );
}

export function TrueFalseQuiz({ statements }) {
  const [answers, setAnswers] = useState({});

  function select(i, value) {
    if (answers[i] !== undefined) return;
    setAnswers((a) => ({ ...a, [i]: value }));
  }

  return (
    <div>
      {statements.map((s, i) => {
        const selected = answers[i];
        const answered = selected !== undefined;
        return (
          <div key={s.text} className="tf-item">
            <div className="tf-statement">{i + 1}. {s.text}</div>
            <div className="tf-options">
              {[true, false].map((val) => {
                let cls = 'tf-btn';
                if (answered && s.correct === val) cls += ' is-correct';
                else if (answered && selected === val && s.correct !== val) cls += ' is-wrong';
                return (
                  <button key={String(val)} type="button" className={cls} disabled={answered} onClick={() => select(i, val)}>
                    {val ? 'Verdadero' : 'Falso'}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
