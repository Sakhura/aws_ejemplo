import { useState } from 'react';

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

export function ConceptBadge({ children, variant = 'accent' }) {
  const cls = variant === 'danger' ? ' is-danger' : variant === 'warning' ? ' is-warning' : '';
  return <div className={`concept-badge${cls}`}>{children}</div>;
}

export function StrikeChip({ children }) {
  return <div className="strike-chip">{children}</div>;
}

export function RoleGrid({ roles }) {
  return (
    <div className="role-grid">
      {roles.map((r) => (
        <div key={r.label} className="role-chip">
          <span className="role-chip-emoji">{r.emoji}</span>
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
            <span className={`flow-step-badge${s.n ? ' is-numeral' : ''}`}>{s.n ?? s.emoji}</span>
            <span>
              <span className="flow-step-label">{s.label}</span>
              {s.caption && <span className="flow-step-caption" style={{ display: 'block' }}>{s.caption}</span>}
            </span>
          </div>
          {i < steps.length - 1 && <div className="flow-arrow">↓</div>}
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

export function CapacityRow({ label, icons }) {
  return (
    <div className="capacity-row">
      <span className="capacity-row-label">{label}</span>
      <span className="capacity-row-icons">{icons}</span>
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
