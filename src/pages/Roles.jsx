import { IconQuestion } from '../components/icons.jsx';
import { ViewHeader, GuidePanelHead } from '../components/ui.jsx';
import { roles } from '../data/sampleData.js';

const trustPolicyJson = `{
  "Effect": "Allow",
  "Principal": {
    "Service": "lambda.amazonaws.com"
  },
  "Action": "sts:AssumeRole"
}`;

export default function Roles() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <ViewHeader
        crumb="IAM › Roles"
        title="Roles"
        intro="Un rol es un conjunto de permisos que se asume temporalmente. No tiene contraseña ni clave permanente: quien lo asume recibe credenciales que caducan."
        action={<button type="button" className="btn btn-primary" style={{ marginLeft: 'auto' }}>Crear rol</button>}
      />

      <div className="content-grid">
        <section className="content-card">
          <table className="table">
            <thead>
              <tr><th>Nombre del rol</th><th>Entidad de confianza</th><th>Duración máx.</th><th>Última actividad</th></tr>
            </thead>
            <tbody>
              {roles.map((r) => (
                <tr key={r.name}>
                  <td>{r.name}</td>
                  <td>{r.trust}</td>
                  <td>{r.maxDuration}</td>
                  <td>{r.lastActivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <aside className="guide-panel">
          <GuidePanelHead icon={<IconQuestion style={{ color: 'var(--color-accent)' }} />} title="Usuario o rol" />
          <p>Usa un usuario cuando hay una persona detrás. Usa un rol cuando el que actúa es un servicio, una aplicación o alguien de otra cuenta: nadie guarda claves largas.</p>
          <div>
            <div className="guide-code-kicker" style={{ marginBottom: 5.6 }}>Política de confianza</div>
            <pre className="codeblock">{trustPolicyJson}</pre>
          </div>
          <div className="guide-caption">Este bloque dice quién puede asumir el rol. Los permisos que obtiene se declaran aparte, en las políticas adjuntas.</div>
        </aside>
      </div>
    </div>
  );
}
