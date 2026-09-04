import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IconCheck } from '../components/icons.jsx';
import { ViewHeader } from '../components/ui.jsx';
import { useIamState } from '../state/iamStore.jsx';
import { evaluate, evaluateAgainstDocument } from '../state/policyEngine.js';

export default function PolicySimulator() {
  const state = useIamState();
  const [searchParams] = useSearchParams();
  const preselectedPolicyId = searchParams.get('policy');
  const preselectedPolicy = preselectedPolicyId ? state.policies[preselectedPolicyId] : null;

  const [mode, setMode] = useState(preselectedPolicy ? 'document' : 'principal');
  const [principalType, setPrincipalType] = useState('user');
  const [principalId, setPrincipalId] = useState('');
  const [action, setAction] = useState('s3:GetObject');
  const [resource, setResource] = useState('arn:aws:s3:::practicas-curso/archivo.txt');
  const [documentText, setDocumentText] = useState(
    preselectedPolicy ? JSON.stringify(preselectedPolicy.document, null, 2) : '{\n  "Version": "2012-10-17",\n  "Statement": []\n}',
  );
  const [mfaPresent, setMfaPresent] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const users = Object.values(state.users);
  const roles = Object.values(state.roles);

  function run() {
    setError('');
    if (mode === 'principal') {
      if (!principalId) { setError('Selecciona un principal (usuario o rol).'); return; }
      setResult(evaluate({ principal: { type: principalType, id: principalId }, action, resource, state }));
      return;
    }
    try {
      const document = JSON.parse(documentText);
      setResult(evaluateAgainstDocument({ document, action, resource, mfaPresent }));
    } catch {
      setError('MalformedPolicyDocument: el JSON de la política no es válido.');
      setResult(null);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <ViewHeader
        crumb="IAM › Políticas › Simulador"
        title="Simulador de políticas"
        intro="Prueba si una acción sobre un recurso queda permitida o denegada, usando las políticas reales de un usuario o rol, o un documento JSON suelto que todavía no has guardado."
      />

      <div className="content-grid">
        <section className="content-card">
          <div className="radio-group">
            <label className="radio">
              <input type="radio" name="modo-sim" checked={mode === 'principal'} onChange={() => setMode('principal')} />
              <span className="dot" />
              <span>Usar las políticas reales de un usuario o rol</span>
            </label>
            <label className="radio">
              <input type="radio" name="modo-sim" checked={mode === 'document'} onChange={() => setMode('document')} />
              <span className="dot" />
              <span>Probar un documento JSON suelto</span>
            </label>
          </div>

          {mode === 'principal' ? (
            <div className="field-row">
              <div className="field">
                <label htmlFor="sim-type">Tipo de principal</label>
                <select id="sim-type" className="input" value={principalType} onChange={(e) => { setPrincipalType(e.target.value); setPrincipalId(''); }}>
                  <option value="user">Usuario</option>
                  <option value="role">Rol</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="sim-principal">Principal</label>
                <select id="sim-principal" className="input" value={principalId} onChange={(e) => setPrincipalId(e.target.value)}>
                  <option value="">Selecciona uno</option>
                  {(principalType === 'user' ? users.map((u) => u.username) : roles.map((r) => r.id)).map((id) => (
                    <option key={id} value={id}>{principalType === 'user' ? id : state.roles[id].name}</option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <>
              <div className="field">
                <label htmlFor="sim-doc">Documento (JSON)</label>
                <textarea id="sim-doc" className="input mono" rows={10} value={documentText} onChange={(e) => setDocumentText(e.target.value)} />
              </div>
              <label className="checkbox">
                <input type="checkbox" checked={mfaPresent} onChange={(e) => setMfaPresent(e.target.checked)} />
                <span className="box"><IconCheck /></span>
                <span>Simular con MFA presente</span>
              </label>
            </>
          )}

          <div className="field-row" style={{ marginTop: 'var(--space-4)' }}>
            <div className="field">
              <label htmlFor="sim-action">Action</label>
              <input id="sim-action" className="input mono" value={action} onChange={(e) => setAction(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="sim-resource">Resource</label>
              <input id="sim-resource" className="input mono" value={resource} onChange={(e) => setResource(e.target.value)} />
            </div>
          </div>

          {error && <div role="alert" className="alert alert-danger"><div className="alert-body">{error}</div></div>}

          <button type="button" className="btn btn-primary" onClick={run}>Probar</button>

          {result && (
            <div className={`alert ${result.effect === 'Allow' ? 'alert-warning' : 'alert-danger'}`} style={{ marginTop: 'var(--space-4)' }}>
              <div className="alert-title">{result.effect === 'Allow' ? 'Allow' : 'Deny'} — {result.reason}</div>
              <div className="alert-body">
                {result.matchedStatements.length === 0
                  ? 'Ninguna política adjunta permite esta acción sobre este recurso: queda denegada por defecto.'
                  : `Decidido por la política "${result.matchedStatements[0].policyName}": ${JSON.stringify(result.matchedStatements[0].statement)}`}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
