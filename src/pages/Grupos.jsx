import { useState } from 'react';
import { IconQuestion, IconSearch } from '../components/icons.jsx';
import { Tag, ViewHeader, GuidePanelHead } from '../components/ui.jsx';
import { groups } from '../data/sampleData.js';

export default function Grupos() {
  const [query, setQuery] = useState('');
  const filtered = groups.filter((g) => g.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <ViewHeader
        crumb="IAM › Grupos de usuarios"
        title="Grupos de usuarios"
        intro="Un grupo reúne usuarios que necesitan los mismos permisos. Adjunta la política al grupo una vez y todos sus miembros la heredan; al sacar al usuario del grupo, pierde esos permisos."
        action={<button type="button" className="btn btn-primary" style={{ marginLeft: 'auto' }}>Crear grupo</button>}
      />

      <div className="content-grid">
        <section className="content-card">
          <div className="toolbar-row">
            <div style={{ position: 'relative', maxWidth: 240, flex: 1 }}>
              <IconSearch style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
              <input
                className="input"
                placeholder="Buscar grupo"
                style={{ paddingLeft: 30 }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <span className="toolbar-count">{filtered.length} grupo{filtered.length === 1 ? '' : 's'}</span>
          </div>
          <table className="table">
            <thead>
              <tr><th>Nombre del grupo</th><th>Usuarios</th><th>Políticas adjuntas</th><th>Creado</th></tr>
            </thead>
            <tbody>
              {filtered.map((g) => (
                <tr key={g.name}>
                  <td>{g.name}</td>
                  <td>{g.users}</td>
                  <td><Tag text={g.policiesTag.text} variant={g.policiesTag.variant} /></td>
                  <td>{g.created}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={4} className="text-muted">No hay grupos que coincidan con "{query}".</td></tr>
              )}
            </tbody>
          </table>
        </section>

        <aside className="guide-panel">
          <GuidePanelHead icon={<IconQuestion style={{ color: 'var(--color-accent)' }} />} title="Guía interactiva" tag="Grupos" />
          <p>Los permisos siempre se conceden al grupo, nunca al usuario suelto: así basta una sola revisión para saber qué puede hacer toda una clase.</p>
          <div className="guide-note">Un grupo no tiene credenciales y no puede iniciar sesión. Tampoco se anida: un grupo no contiene otros grupos.</div>
          <div className="guide-inset">
            <div className="guide-inset-kicker">Práctica sugerida</div>
            Mete a <code className="mono">alumno-practicas-01</code> en <code className="mono">practicas-lectura</code> y comprueba que ya puede listar el bucket sin adjuntarle ninguna política propia.
          </div>
        </aside>
      </div>
    </div>
  );
}
