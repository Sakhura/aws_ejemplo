import { IconWarning, IconInfo } from '../components/icons.jsx';
import { commonErrors } from '../data/sampleData.js';

export default function Errores() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › Errores frecuentes</div>
      <h2 style={{ margin: '0 0 4px' }}>Errores frecuentes</h2>
      <p className="view-intro">Los mensajes que más aparecen en las prácticas, con su causa real y qué hacer. El color indica si la consola bloquea la acción o solo advierte.</p>

      <div className="error-list">
        {commonErrors.map((err) => (
          <div key={err.title} className={`error-row is-${err.severity}`}>
            {err.severity === 'danger' ? (
              <IconWarning style={{ color: 'var(--color-danger-icon)', marginTop: 2 }} />
            ) : (
              <IconInfo style={{ color: 'var(--color-warning-icon)', marginTop: 2 }} />
            )}
            <div>
              <div className="error-row-title">{err.title}</div>
              <div className="error-row-body">{err.body}</div>
            </div>
            <div className="error-row-meta">{err.metaTop}<br />{err.metaBottom}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
