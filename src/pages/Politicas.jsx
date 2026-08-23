import { useState } from 'react';
import { Tag, ViewHeader } from '../components/ui.jsx';
import { policies } from '../data/sampleData.js';

const TYPE_FILTERS = ['Todas', 'Administradas', 'Propias del curso'];

export default function Politicas() {
  const [filter, setFilter] = useState('Todas');
  const filtered = filter === 'Todas' ? policies : policies.filter((p) => p.type === filter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <ViewHeader
        crumb="IAM › Políticas"
        title="Políticas"
        intro="Cada política es un documento JSON con permisos. Se adjunta a usuarios, grupos o roles, y una misma política puede estar adjunta en varios sitios a la vez."
        action={<button type="button" className="btn btn-primary" style={{ marginLeft: 'auto' }}>Crear política</button>}
      />

      <div className="content-grid">
        <section className="content-card">
          <div className="toolbar-row">
            <div className="seg">
              {TYPE_FILTERS.map((opt) => (
                <label key={opt} className="seg-opt">
                  <input type="radio" name="tipo-pol" checked={filter === opt} onChange={() => setFilter(opt)} />
                  {opt}
                </label>
              ))}
            </div>
            <span className="toolbar-count">{filtered.length} política{filtered.length === 1 ? '' : 's'}</span>
          </div>
          <table className="table">
            <thead>
              <tr><th>Nombre</th><th>Tipo</th><th>Adjunta a</th><th>Alcance</th></tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.name}>
                  <td>{p.name}</td>
                  <td>{p.type}</td>
                  <td>{p.attachedTo}</td>
                  <td><Tag text={p.scope.text} variant={p.scope.variant} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <aside className="guide-panel">
          <div className="guide-panel-head">
            <span className="guide-panel-title">Cómo se evalúa</span>
            <span className="tag tag-outline" style={{ marginLeft: 'auto' }}>Orden</span>
          </div>
          <div className="guide-defs">
            <div><strong>1.</strong> Todo está denegado por defecto.</div>
            <div><strong>2.</strong> Un <code className="mono">Allow</code> en cualquier política adjunta concede el permiso.</div>
            <div><strong>3.</strong> Un <code className="mono">Deny</code> explícito gana siempre, aunque haya diez Allow.</div>
          </div>
          <div className="alert alert-warning" style={{ padding: '11.2px 14px' }}>
            <div className="alert-body" style={{ margin: 0, color: 'color-mix(in srgb, var(--color-text) 80%, transparent)' }}>
              <strong style={{ fontWeight: 600, color: 'var(--color-warning-icon)' }}>Riesgo detectado.</strong>{' '}
              <code className="mono">AdministradorTotal</code> está adjunta a un usuario del curso. Sustitúyela por permisos concretos antes de la entrega.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
