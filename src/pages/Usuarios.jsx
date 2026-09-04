import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconCheck, IconSearch } from '../components/icons.jsx';
import { Tag, ViewHeader } from '../components/ui.jsx';
import { useIamState, useIamDispatch } from '../state/iamStore.jsx';
import { deleteUser, setMfaEnabled, attachPolicy, detachPolicy } from '../state/iamReducer.js';

export default function Usuarios() {
  const state = useIamState();
  const dispatch = useIamDispatch();
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [policyToAttach, setPolicyToAttach] = useState('');

  const users = Object.values(state.users).filter((u) => u.username.toLowerCase().includes(query.toLowerCase()));
  const policies = Object.values(state.policies);

  function toggleExpanded(username) {
    setExpanded((current) => (current === username ? null : username));
    setPolicyToAttach('');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <ViewHeader
        crumb="IAM › Usuarios"
        title="Usuarios"
        intro="Cada usuario representa una persona o una aplicación con credenciales propias. Adjunta permisos a través de grupos siempre que puedas; usa la política directa solo como excepción."
        action={<Link to="/iam/usuarios/crear" className="btn btn-primary" style={{ marginLeft: 'auto' }}>Crear usuario</Link>}
      />

      <div className="content-grid">
        <section className="content-card">
          <div className="toolbar-row">
            <div style={{ position: 'relative', maxWidth: 240, flex: 1 }}>
              <IconSearch style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
              <input className="input" placeholder="Buscar usuario" style={{ paddingLeft: 30 }} value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <span className="toolbar-count">{users.length} usuario{users.length === 1 ? '' : 's'}</span>
          </div>

          <table className="table">
            <thead>
              <tr><th>Usuario</th><th>Acceso</th><th>MFA</th><th>Grupos</th><th>Políticas directas</th><th></th></tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.username}>
                  <td>{u.username}</td>
                  <td>{u.accessType === 'console' ? 'Consola' : 'Programático'}</td>
                  <td>
                    <label className="checkbox">
                      <input type="checkbox" checked={u.mfaEnabled} onChange={(e) => dispatch(setMfaEnabled(u.username, e.target.checked))} />
                      <span className="box"><IconCheck /></span>
                      <span>{u.mfaEnabled ? 'Activo' : 'Inactivo'}</span>
                    </label>
                  </td>
                  <td>{u.groups.length ? u.groups.map((gid) => state.groups[gid]?.name).filter(Boolean).join(', ') : <Tag text="Ninguno" variant="neutral" />}</td>
                  <td>{u.policies.length ? u.policies.map((pid) => state.policies[pid]?.name).filter(Boolean).join(', ') : <Tag text="Ninguna" variant="neutral" />}</td>
                  <td>
                    <button type="button" className="btn btn-ghost" onClick={() => toggleExpanded(u.username)}>{expanded === u.username ? 'Cerrar' : 'Gestionar'}</button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan={6} className="text-muted">No hay usuarios que coincidan con &quot;{query}&quot;.</td></tr>
              )}
            </tbody>
          </table>
        </section>

        {expanded && state.users[expanded] && (
          <aside className="guide-panel">
            <div className="guide-panel-head">
              <span className="guide-panel-title">Gestionar {expanded}</span>
            </div>

            <div className="radio-group-label">Adjuntar política directamente</div>
            <div className="field-row">
              <select className="input" value={policyToAttach} onChange={(e) => setPolicyToAttach(e.target.value)}>
                <option value="">Selecciona una política</option>
                {policies.filter((p) => !state.users[expanded].policies.includes(p.id)).map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-secondary"
                disabled={!policyToAttach}
                onClick={() => { dispatch(attachPolicy('user', expanded, policyToAttach)); setPolicyToAttach(''); }}
              >
                Adjuntar
              </button>
            </div>

            <div className="checklist">
              {state.users[expanded].policies.map((pid) => (
                <div key={pid} className="checklist-item is-checked">
                  <span>{state.policies[pid]?.name ?? pid}</span>
                  <button type="button" className="btn btn-ghost" onClick={() => dispatch(detachPolicy('user', expanded, pid))}>Quitar</button>
                </div>
              ))}
              {state.users[expanded].policies.length === 0 && <div className="text-muted">Sin políticas directas.</div>}
            </div>

            <button
              type="button"
              className="btn btn-secondary"
              style={{ marginTop: 'var(--space-4)' }}
              onClick={() => { dispatch(deleteUser(expanded)); setExpanded(null); }}
            >
              Eliminar usuario
            </button>
          </aside>
        )}
      </div>
    </div>
  );
}
