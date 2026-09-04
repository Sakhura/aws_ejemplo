import { Link } from 'react-router-dom';
import { useIamState } from '../state/iamStore.jsx';
import { labDefinitions, labDefinitionsById } from '../data/labDefinitions.js';
import { computeLabProgress, isLabUnlocked } from '../state/iamLogic.js';

const STATUS_LABEL = { 'sin-empezar': 'Sin empezar', 'en-curso': 'En curso', completado: 'Completado' };

export default function Laboratorios() {
  const state = useIamState();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › Laboratorios guiados</div>
      <h2 style={{ margin: '0 0 4px' }}>Laboratorios guiados</h2>
      <p className="view-intro">Ejercicios cortos sobre la cuenta de prácticas. Cada laboratorio se corrige solo: la consola comprueba el estado real de los recursos al terminar.</p>

      <div className="lab-grid">
        {labDefinitions.map((labDef) => {
          const unlocked = isLabUnlocked(labDef, labDefinitionsById, state);
          const progress = computeLabProgress(labDef, state);
          const meta = !unlocked
            ? `Bloqueado · requiere el laboratorio ${labDef.requires.join(', ')}`
            : progress.status === 'sin-empezar'
              ? 'Sin empezar'
              : `${STATUS_LABEL[progress.status]} · ${progress.passed} de ${progress.total} comprobaciones`;

          const card = (
            <div className={`card elev-sm lab-card${!unlocked ? ' is-locked' : ''}`}>
              <div className="card-kicker">Laboratorio {labDef.id} · {labDef.duration}</div>
              <div className="card-title">{labDef.title}</div>
              <p className="card-body">{labDef.intro}</p>
              <div className="lab-progress"><div style={{ width: `${unlocked ? progress.percent : 0}%` }} /></div>
              <div className="card-meta">{meta}</div>
            </div>
          );

          return unlocked ? (
            <Link key={labDef.id} to={`/aprendizaje/laboratorios/${labDef.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{card}</Link>
          ) : (
            <div key={labDef.id}>{card}</div>
          );
        })}
      </div>
    </div>
  );
}
