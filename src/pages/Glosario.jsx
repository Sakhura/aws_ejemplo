import { glossary } from '../data/sampleData.js';

export default function Glosario() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › Glosario</div>
      <h2 style={{ margin: '0 0 4px' }}>Glosario</h2>
      <p className="view-intro">Los términos que aparecen en la consola, en una línea cada uno.</p>

      <div className="glossary-grid">
        {glossary.map((entry) => (
          <div key={entry.term} className="glossary-entry">
            <div className="glossary-term">{entry.term}</div>
            <div className="glossary-def">{entry.def}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
