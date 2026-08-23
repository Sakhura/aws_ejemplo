import { labs } from '../data/sampleData.js';

export default function Laboratorios() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › Laboratorios guiados</div>
      <h2 style={{ margin: '0 0 4px' }}>Laboratorios guiados</h2>
      <p className="view-intro">Ejercicios cortos sobre la cuenta de prácticas. Cada laboratorio se corrige solo: la consola comprueba el estado real de los recursos al terminar.</p>

      <div className="lab-grid">
        {labs.map((lab) => (
          <div key={lab.number} className={`card elev-sm lab-card${lab.locked ? ' is-locked' : ''}`}>
            <div className="card-kicker">Laboratorio {lab.number} · {lab.duration}</div>
            <div className="card-title">{lab.title}</div>
            <p className="card-body">{lab.body}</p>
            <div className="lab-progress"><div style={{ width: `${lab.progress}%` }} /></div>
            <div className="card-meta">{lab.meta}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
