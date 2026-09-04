import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, ViewHeader } from '../components/ui.jsx';
import { useIamState, useIamDispatch } from '../state/iamStore.jsx';
import { createPolicy, updatePolicy, deletePolicy } from '../state/iamReducer.js';
import { isValidResourceName } from '../state/iamLogic.js';

const TYPE_FILTERS = ['Todas', 'Administrada', 'Propia del curso'];
const BLANK_DOCUMENT = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "*"
    }
  ]
}`;

export default function Politicas() {
  const state = useIamState();
  const dispatch = useIamDispatch();
  const [filter, setFilter] = useState('Todas');
  const [editingId, setEditingId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('Propia del curso');
  const [documentText, setDocumentText] = useState(BLANK_DOCUMENT);
  const [error, setError] = useState('');

  const policies = Object.values(state.policies).filter((p) => filter === 'Todas' || p.type === filter);

  function openCreate() {
    setEditingId(null); setName(''); setType('Propia del curso'); setDocumentText(BLANK_DOCUMENT); setError(''); setFormOpen(true);
  }

  function openEdit(policy) {
    setEditingId(policy.id); setName(policy.name); setType(policy.type);
    setDocumentText(JSON.stringify(policy.document, null, 2)); setError(''); setFormOpen(true);
  }

  function submit() {
    if (!isValidResourceName(name)) { setError('Escribe un nombre para la política.'); return; }
    let parsedDocument;
    try {
      parsedDocument = JSON.parse(documentText);
    } catch {
      setError('MalformedPolicyDocument: el JSON de la política no es válido.');
      return;
    }
    if (editingId) dispatch(updatePolicy(editingId, { name: name.trim(), type, document: parsedDocument }));
    else dispatch(createPolicy({ name: name.trim(), type, document: parsedDocument }));
    setFormOpen(false);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <ViewHeader
        crumb="IAM › Políticas"
        title="Políticas"
        intro="Cada política es un documento JSON con permisos. Se adjunta a usuarios, grupos o roles, y una misma política puede estar adjunta en varios sitios a la vez."
        action={
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 'var(--space-3)' }}>
            <Link to="/iam/politicas/simulador" className="btn btn-secondary">Simulador de políticas</Link>
            <button type="button" className="btn btn-primary" onClick={openCreate}>Crear política</button>
          </div>
        }
      />

      {formOpen && (
        <section className="content-card" style={{ marginBottom: 'var(--space-4)' }}>
          {error && <div role="alert" className="alert alert-danger"><div className="alert-body">{error}</div></div>}
          <div className="field-row">
            <div className="field">
              <label htmlFor="pol-name">Nombre</label>
              <input id="pol-name" className="input" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="pol-type">Tipo</label>
              <select id="pol-type" className="input" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Propia del curso">Propia del curso</option>
                <option value="Administrada">Administrada</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="pol-doc">Documento (JSON)</label>
            <textarea id="pol-doc" className="input mono" rows={10} value={documentText} onChange={(e) => setDocumentText(e.target.value)} />
          </div>
          <div className="footer-bar-actions" style={{ justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-ghost" onClick={() => setFormOpen(false)}>Cancelar</button>
            <button type="button" className="btn btn-primary" onClick={submit}>{editingId ? 'Guardar cambios' : 'Guardar política'}</button>
          </div>
        </section>
      )}

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
            <span className="toolbar-count">{policies.length} política{policies.length === 1 ? '' : 's'}</span>
          </div>
          <table className="table">
            <thead>
              <tr><th>Nombre</th><th>Tipo</th><th></th></tr>
            </thead>
            <tbody>
              {policies.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td><Tag text={p.type} variant={p.type === 'Administrada' ? 'neutral' : 'accent'} /></td>
                  <td style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <button type="button" className="btn btn-ghost" onClick={() => openEdit(p)}>Editar</button>
                    <Link to={`/iam/politicas/simulador?policy=${p.id}`} className="btn btn-ghost">Simular</Link>
                    <button type="button" className="btn btn-ghost" onClick={() => dispatch(deletePolicy(p.id))}>Eliminar</button>
                  </td>
                </tr>
              ))}
              {policies.length === 0 && (
                <tr><td colSpan={3} className="text-muted">Todavía no hay políticas.</td></tr>
              )}
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
        </aside>
      </div>
    </div>
  );
}
