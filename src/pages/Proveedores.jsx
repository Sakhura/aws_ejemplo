import { Tag, ViewHeader } from '../components/ui.jsx';
import { providers } from '../data/sampleData.js';

export default function Proveedores() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <ViewHeader
        crumb="IAM › Proveedores de identidad"
        title="Proveedores de identidad"
        intro="Un proveedor de identidad deja entrar a la cuenta con credenciales de fuera: el usuario inicia sesión con la cuenta de la universidad y la nube le entrega un rol temporal. No hay que crear un usuario IAM por persona."
        action={<button type="button" className="btn btn-primary" style={{ marginLeft: 'auto' }}>Añadir proveedor</button>}
      />

      <div className="content-grid">
        <section className="content-card">
          <table className="table">
            <thead>
              <tr><th>Proveedor</th><th>Tipo</th><th>Rol asignado</th><th>Estado</th></tr>
            </thead>
            <tbody>
              {providers.map((p) => (
                <tr key={p.name}>
                  <td>{p.name}</td>
                  <td>{p.type}</td>
                  <td>{p.role}</td>
                  <td><Tag text={p.status.text} variant={p.status.variant} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <aside className="guide-panel">
          <div className="guide-panel-head">
            <span className="guide-panel-title">Federación en tres pasos</span>
          </div>
          <div className="guide-defs">
            <div><strong>1.</strong> Registras el proveedor con sus metadatos XML o su URL OIDC.</div>
            <div><strong>2.</strong> Creas un rol cuya política de confianza acepte a ese proveedor.</div>
            <div><strong>3.</strong> El proveedor manda el grupo de la persona y la nube le da el rol que corresponde.</div>
          </div>
          <div className="alert alert-danger" style={{ padding: '11.2px 14px' }}>
            <div className="alert-body" style={{ margin: 0, color: 'color-mix(in srgb, var(--color-text) 80%, transparent)' }}>
              <strong style={{ fontWeight: 600, color: 'var(--color-danger-title)' }}>Error frecuente.</strong>{' '}
              Si el certificado del proveedor caduca, el inicio de sesión falla con <code className="mono">InvalidIdentityToken</code> aunque el rol siga bien configurado.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
