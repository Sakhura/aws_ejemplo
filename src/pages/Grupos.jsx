import { useState } from 'react';
import { IconQuestion, IconSearch } from '../components/icons.jsx';
import { Tag, ViewHeader, GuidePanelHead } from '../components/ui.jsx';
import { useIamState, useIamDispatch } from '../state/iamStore.jsx';
import { createGroup, deleteGroup, addUserToGroup, removeUserFromGroup, attachPolicy, detachPolicy } from '../state/iamReducer.js';
import { isValidResourceName } from '../state/iamLogic.js';

export default function Grupos() {
  const state = useIamState();
  const dispatch = useIamDispatch();
  const [query, setQuery] = useState('');
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [nameError, setNameError] = useState(false);
  const [managing, setManaging] = useState(null);
  const [memberToAdd, setMemberToAdd] = useState('');
  const [policyToAttach, setPolicyToAttach] = useState('');

  const groups = Object.values(state.groups).filter((g) => g.name.toLowerCase().includes(query.toLowerCase()));
  const allUsers = Object.values(state.users);
  const allPolicies = Object.values(state.policies);

  function submitNewGroup() {
    if (!isValidResourceName(newName)) { setNameError(true); return; }
    dispatch(createGroup({ name: newName.trim(), desc: newDesc.trim() }));
    setNewName(''); setNewDesc(''); setNameError(false); setCreating(false);
  }

  function openManage(groupId) {
    setManaging((current) => (current === groupId ? null : groupId));
    setMemberToAdd(''); setPolicyToAttach('');
  }

  const managedGroup = managing ? state.groups[managing] : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <ViewHeader
        crumb="IAM › Grupos de usuarios"
        title="Grupos de usuarios"
        intro="Un grupo reúne usuarios que necesitan los mismos permisos. Adjunta la política al grupo una vez y todos sus miembros la heredan; al sacar al usuario del grupo, pierde esos permisos."
        action={<button type="button" className="btn btn-primary" style={{ marginLeft: 'auto' }} onClick={() => setCreating((c) => !c)}>Crear grupo</button>}
      />

      {creating && (
        <section className="content-card" style={{ marginBottom: 'var(--space-4)' }}>
          <div className="field-row">
            <div className="field">
              <label htmlFor="grp-name">Nombre del grupo</label>
              <input id="grp-name" className={`input${nameError ? ' is-invalid' : ''}`} value={newName} onChange={(e) => { setNewName(e.target.value); setNameError(false); }} />
              {nameError && <div className="field-hint">Escribe un nombre para el grupo.</div>}
            </div>
            <div className="field">
              <label htmlFor="grp-desc">Descripción (opcional)</label>
              <input id="grp-desc" className="input" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} />
            </div>
          </div>
          <div className="footer-bar-actions" style={{ justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-ghost" onClick={() => setCreating(false)}>Cancelar</button>
            <button type="button" className="btn btn-primary" onClick={submitNewGroup}>Guardar grupo</button>
          </div>
        </section>
      )}

      <div className="content-grid">
        <section className="content-card">
          <div className="toolbar-row">
            <div style={{ position: 'relative', maxWidth: 240, flex: 1 }}>
              <IconSearch style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
              <input className="input" placeholder="Buscar grupo" style={{ paddingLeft: 30 }} value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <span className="toolbar-count">{groups.length} grupo{groups.length === 1 ? '' : 's'}</span>
          </div>
          <table className="table">
            <thead>
              <tr><th>Nombre del grupo</th><th>Usuarios</th><th>Políticas adjuntas</th><th></th></tr>
            </thead>
            <tbody>
              {groups.map((g) => (
                <tr key={g.id}>
                  <td>{g.name}</td>
                  <td>{g.members.length}</td>
                  <td>{g.policies.length ? <Tag text={`${g.policies.length} adjunta${g.policies.length === 1 ? '' : 's'}`} variant="accent" /> : <Tag text="Ninguna" variant="neutral" />}</td>
                  <td>
                    <button type="button" className="btn btn-ghost" onClick={() => openManage(g.id)}>{managing === g.id ? 'Cerrar' : 'Gestionar'}</button>
                  </td>
                </tr>
              ))}
              {groups.length === 0 && (
                <tr><td colSpan={4} className="text-muted">No hay grupos que coincidan con &quot;{query}&quot;.</td></tr>
              )}
            </tbody>
          </table>
        </section>

        {managedGroup ? (
          <aside className="guide-panel">
            <div className="guide-panel-head">
              <span className="guide-panel-title">Gestionar {managedGroup.name}</span>
            </div>

            <div className="radio-group-label">Miembros</div>
            <div className="field-row">
              <select className="input" value={memberToAdd} onChange={(e) => setMemberToAdd(e.target.value)}>
                <option value="">Selecciona un usuario</option>
                {allUsers.filter((u) => !managedGroup.members.includes(u.username)).map((u) => (
                  <option key={u.username} value={u.username}>{u.username}</option>
                ))}
              </select>
              <button type="button" className="btn btn-secondary" disabled={!memberToAdd} onClick={() => { dispatch(addUserToGroup(memberToAdd, managedGroup.id)); setMemberToAdd(''); }}>Añadir</button>
            </div>
            <div className="checklist">
              {managedGroup.members.map((username) => (
                <div key={username} className="checklist-item is-checked">
                  <span>{username}</span>
                  <button type="button" className="btn btn-ghost" onClick={() => dispatch(removeUserFromGroup(username, managedGroup.id))}>Quitar</button>
                </div>
              ))}
              {managedGroup.members.length === 0 && <div className="text-muted">Sin miembros todavía.</div>}
            </div>

            <div className="radio-group-label" style={{ marginTop: 'var(--space-4)' }}>Políticas adjuntas</div>
            <div className="field-row">
              <select className="input" value={policyToAttach} onChange={(e) => setPolicyToAttach(e.target.value)}>
                <option value="">Selecciona una política</option>
                {allPolicies.filter((p) => !managedGroup.policies.includes(p.id)).map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <button type="button" className="btn btn-secondary" disabled={!policyToAttach} onClick={() => { dispatch(attachPolicy('group', managedGroup.id, policyToAttach)); setPolicyToAttach(''); }}>Adjuntar</button>
            </div>
            <div className="checklist">
              {managedGroup.policies.map((pid) => (
                <div key={pid} className="checklist-item is-checked">
                  <span>{state.policies[pid]?.name ?? pid}</span>
                  <button type="button" className="btn btn-ghost" onClick={() => dispatch(detachPolicy('group', managedGroup.id, pid))}>Quitar</button>
                </div>
              ))}
              {managedGroup.policies.length === 0 && <div className="text-muted">Sin políticas adjuntas.</div>}
            </div>

            <button type="button" className="btn btn-secondary" style={{ marginTop: 'var(--space-4)' }} onClick={() => { dispatch(deleteGroup(managedGroup.id)); setManaging(null); }}>Eliminar grupo</button>
          </aside>
        ) : (
          <aside className="guide-panel">
            <GuidePanelHead icon={<IconQuestion style={{ color: 'var(--color-accent)' }} />} title="Guía interactiva" tag="Grupos" />
            <p>Los permisos siempre se conceden al grupo, nunca al usuario suelto: así basta una sola revisión para saber qué puede hacer toda una clase.</p>
            <div className="guide-note">Un grupo no tiene credenciales y no puede iniciar sesión. Tampoco se anida: un grupo no contiene otros grupos.</div>
            <div className="guide-inset">
              <div className="guide-inset-kicker">Práctica sugerida</div>
              Mete a <code className="mono">alumno-practicas-01</code> en <code className="mono">practicas-lectura</code> y comprueba que ya puede listar el bucket sin adjuntarle ninguna política propia.
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
