import { useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { IconCheck } from '../components/icons.jsx';
import { useIamState, useIamDispatch } from '../state/iamStore.jsx';
import { labDefinitionsById } from '../data/labDefinitions.js';
import { computeLabProgress, isLabUnlocked } from '../state/iamLogic.js';

export default function LaboratorioDetalle() {
  const { labId } = useParams();
  const state = useIamState();
  const dispatch = useIamDispatch();
  const labDef = labDefinitionsById[labId];
  const seededLabId = useRef(null);

  useEffect(() => {
    if (labDef?.seed && seededLabId.current !== labId) {
      seededLabId.current = labId;
      labDef.seed(dispatch, state);
    }
    // Intencionalmente solo depende de labId: seed() debe correr una vez al
    // entrar al laboratorio, no en cada cambio de estado posterior.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labId]);

  if (!labDef) return <Navigate to="/aprendizaje/laboratorios" replace />;

  const unlocked = isLabUnlocked(labDef, labDefinitionsById, state);
  if (!unlocked) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
        <div className="breadcrumb">Aprendizaje › Laboratorios guiados › Laboratorio {labDef.id}</div>
        <h2>{labDef.title}</h2>
        <div role="alert" className="alert alert-warning">
          <div className="alert-body">Este laboratorio está bloqueado. Completa primero el laboratorio {labDef.requires.join(', ')}.</div>
        </div>
        <Link to="/aprendizaje/laboratorios" className="btn btn-secondary" style={{ marginTop: 'var(--space-4)', alignSelf: 'flex-start' }}>Volver al listado</Link>
      </div>
    );
  }

  const progress = computeLabProgress(labDef, state);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › Laboratorios guiados › Laboratorio {labDef.id}</div>
      <h2 style={{ margin: '0 0 4px' }}>Laboratorio {labDef.id} · {labDef.title}</h2>
      <p className="view-intro">{labDef.intro}</p>

      <div className="content-grid">
        <section className="content-card">
          <ol className="plain-list">
            {labDef.steps.map((step, i) => (
              <li key={step.title}>
                <strong>{i + 1}. {step.title}</strong> — {step.body}
              </li>
            ))}
          </ol>
        </section>

        <aside className="guide-panel">
          <div className="guide-panel-head">
            <span className="guide-panel-title">Comprobaciones</span>
            <span className="tag tag-outline" style={{ marginLeft: 'auto' }}>{progress.passed} de {progress.total}</span>
          </div>
          <div className="lab-progress"><div style={{ width: `${progress.percent}%` }} /></div>
          <div className="checklist">
            {progress.checkResults.map((check) => (
              <div key={check.id} className={`checklist-item${check.passing ? ' is-checked' : ''}`}>
                {check.passing && <IconCheck style={{ marginTop: 2 }} />}
                <span>{check.label}</span>
              </div>
            ))}
          </div>
          {progress.status === 'completado' && (
            <div className="alert alert-warning" style={{ marginTop: 'var(--space-4)' }}>
              <div className="alert-body">Laboratorio completado. Puedes volver al listado para continuar con el siguiente.</div>
            </div>
          )}
        </aside>
      </div>

      <Link to="/aprendizaje/laboratorios" className="btn btn-secondary" style={{ marginTop: 'var(--space-4)', alignSelf: 'flex-start' }}>Volver al listado</Link>
    </div>
  );
}
