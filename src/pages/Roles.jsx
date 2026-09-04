import { useEffect, useState } from 'react';
import { IconQuestion } from '../components/icons.jsx';
import { ViewHeader, GuidePanelHead } from '../components/ui.jsx';
import { useIamState, useIamDispatch } from '../state/iamStore.jsx';
import { createRole, deleteRole, assumeRole, clearRoleSession, attachPolicy, detachPolicy } from '../state/iamReducer.js';
import { isValidResourceName } from '../state/iamLogic.js';

const DEFAULT_TRUST_POLICY = `{
  "Effect": "Allow",
  "Principal": {
    "Service": "lambda.amazonaws.com"
  },
  "Action": "sts:AssumeRole"
}`;

function formatRemaining(expiresAt, now) {
  const ms = new Date(expiresAt).getTime() - now;
  if (ms <= 0) return 'Expirada';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds.toString().padStart(2, '0')}s restantes`;
}

export default function Roles() {
  const state = useIamState();
  const dispatch = useIamDispatch();
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newTrust, setNewTrust] = useState(DEFAULT_TRUST_POLICY);
  const [newDuration, setNewDuration] = useState(60);
  const [formError, setFormError] = useState('');
  const [managing, setManaging] = useState(null);
  const [policyToAttach, setPolicyToAttach] = useState('');
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const hasActiveSession = Object.values(state.roles).some((r) => r.activeSession);
    if (!hasActiveSession) return undefined;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [state.roles]);

  const roles = Object.values(state.roles);
  const allPolicies = Object.values(state.policies);

  function submitNewRole() {
    if (!isValidResourceName(newName)) { setFormError('Escribe un nombre para el rol.'); return; }
    let parsedTrust;
    try {
      parsedTrust = JSON.parse(newTrust);
    } catch {
      setFormError('La política de confianza no es un JSON válido.');
      return;
    }
    dispatch(createRole({ name: newName.trim(), trustPolicy: parsedTrust, maxDurationMinutes: Number(newDuration) || 60 }));
    setNewName(''); setNewTrust(DEFAULT_TRUST_POLICY); setNewDuration(60); setFormError(''); setCreating(false);
  }

  const managedRole = managing ? state.roles[managing] : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <ViewHeader
        crumb="IAM › Roles"
        title="Roles"
        intro="Un rol es un conjunto de permisos que se asume temporalmente. No tiene contraseña ni clave permanente: quien lo asume recibe credenciales que caducan."
        action={<button type="button" className="btn btn-primary" style={{ marginLeft: 'auto' }} onClick={() => setCreating((c) => !c)}>Crear rol</button>}
      />

      {creating && (
        <section className="content-card" style={{ marginBottom: 'var(--space-4)' }}>
          {formError && (
            <div role="alert" className="alert alert-danger"><div className="alert-body">{formError}</div></div>
          )}
          <div className="field-row">
            <div className="field">
              <label htmlFor="rol-name">Nombre del rol</label>
              <input id="rol-name" className="input" value={newName} onChange={(e) => setNewName(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="rol-duration">Duración máxima (minutos)</label>
              <input id="rol-duration" type="number" min="1" className="input" value={newDuration} onChange={(e) => setNewDuration(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="rol-trust">Política de confianza (JSON)</label>
            <textarea id="rol-trust" className="input mono" rows={7} value={newTrust} onChange={(e) => setNewTrust(e.target.value)} />
          </div>
          <div className="footer-bar-actions" style={{ justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-ghost" onClick={() => setCreating(false)}>Cancelar</button>
            <button type="button" className="btn btn-primary" onClick={submitNewRole}>Guardar rol</button>
          </div>
        </section>
      )}

      <div className="content-grid">
        <section className="content-card">
          <table className="table">
            <thead>
              <tr><th>Nombre del rol</th><th>Políticas</th><th>Duración máx.</th><th>Sesión activa</th><th></th></tr>
            </thead>
            <tbody>
              {roles.map((r) => (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>{r.policies.length} adjunta{r.policies.length === 1 ? '' : 's'}</td>
                  <td>{r.maxDurationMinutes} min</td>
                  <td>{r.activeSession ? formatRemaining(r.activeSession.expiresAt, now) : '—'}</td>
                  <td>
                    <button type="button" className="btn btn-ghost" onClick={() => { setManaging((c) => (c === r.id ? null : r.id)); setPolicyToAttach(''); }}>{managing === r.id ? 'Cerrar' : 'Gestionar'}</button>
                  </td>
                </tr>
              ))}
              {roles.length === 0 && (
                <tr><td colSpan={5} className="text-muted">Todavía no hay roles.</td></tr>
              )}
            </tbody>
          </table>
        </section>

        {managedRole ? (
          <aside className="guide-panel">
            <div className="guide-panel-head"><span className="guide-panel-title">Gestionar {managedRole.name}</span></div>

            <div className="radio-group-label">Políticas de permisos</div>
            <div className="field-row">
              <select className="input" value={policyToAttach} onChange={(e) => setPolicyToAttach(e.target.value)}>
                <option value="">Selecciona una política</option>
                {allPolicies.filter((p) => !managedRole.policies.includes(p.id)).map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <button type="button" className="btn btn-secondary" disabled={!policyToAttach} onClick={() => { dispatch(attachPolicy('role', managedRole.id, policyToAttach)); setPolicyToAttach(''); }}>Adjuntar</button>
            </div>
            <div className="checklist">
              {managedRole.policies.map((pid) => (
                <div key={pid} className="checklist-item is-checked">
                  <span>{state.policies[pid]?.name ?? pid}</span>
                  <button type="button" className="btn btn-ghost" onClick={() => dispatch(detachPolicy('role', managedRole.id, pid))}>Quitar</button>
                </div>
              ))}
              {managedRole.policies.length === 0 && <div className="text-muted">Sin políticas adjuntas todavía — el rol no puede hacer nada al asumirse.</div>}
            </div>

            <div className="radio-group-label" style={{ marginTop: 'var(--space-4)' }}>Sesión temporal</div>
            {managedRole.activeSession ? (
              <>
                <div className="credential-box">
                  <div className="credential-row"><span className="text-muted">Access Key ID</span><code className="mono">{managedRole.activeSession.accessKeyId}</code></div>
                  <div className="credential-row"><span className="text-muted">Session Token</span><code className="mono">{managedRole.activeSession.sessionToken.slice(0, 24)}…</code></div>
                  <div className="credential-row"><span className="text-muted">Expira</span><code className="mono">{formatRemaining(managedRole.activeSession.expiresAt, now)}</code></div>
                </div>
                <button type="button" className="btn btn-ghost" onClick={() => dispatch(clearRoleSession(managedRole.id))}>Cerrar sesión</button>
              </>
            ) : (
              <button type="button" className="btn btn-primary" onClick={() => dispatch(assumeRole(managedRole.id))}>Asumir rol</button>
            )}

            <button type="button" className="btn btn-secondary" style={{ marginTop: 'var(--space-4)' }} onClick={() => { dispatch(deleteRole(managedRole.id)); setManaging(null); }}>Eliminar rol</button>
          </aside>
        ) : (
          <aside className="guide-panel">
            <GuidePanelHead icon={<IconQuestion style={{ color: 'var(--color-accent)' }} />} title="Usuario o rol" />
            <p>Usa un usuario cuando hay una persona detrás. Usa un rol cuando el que actúa es un servicio, una aplicación o alguien de otra cuenta: nadie guarda claves largas.</p>
            <div>
              <div className="guide-code-kicker" style={{ marginBottom: 5.6 }}>Política de confianza</div>
              <pre className="codeblock">{DEFAULT_TRUST_POLICY}</pre>
            </div>
            <div className="guide-caption">Este bloque dice quién puede asumir el rol. Los permisos que obtiene se declaran aparte, en las políticas adjuntas.</div>
          </aside>
        )}
      </div>
    </div>
  );
}
