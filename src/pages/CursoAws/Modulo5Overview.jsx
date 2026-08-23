import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, Flow, CompareCols,
} from './lessonComponents.jsx';

export default function Modulo5Overview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 5</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 5: Redes y Amazon VPC</h2>
      <p className="lesson-subtitle">
        Ocho clases de 45 minutos, con progresión lenta: de "¿qué es una red?" hasta diseñar y explicar una arquitectura VPC completa.
      </p>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>Por qué 8 clases</h3>
          <Nota><p>VPC es probablemente el módulo más abstracto para nuestro público, así que mantenemos una progresión más lenta que EC2 o S3: empezamos desde algo tan cotidiano como "¿qué es una red y para qué necesitamos direcciones?" antes de tocar subnets, route tables o Internet Gateway.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>Las 8 clases</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Clase</th><th>Tema</th><th>Objetivo principal</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>¿Qué es una red? IP pública y privada</td><td>Comprender cómo se identifican y comunican dispositivos</td></tr>
              <tr><td>2</td><td>¿Qué es Amazon VPC?</td><td>Entender una red virtual privada dentro de AWS</td></tr>
              <tr><td>3</td><td>Subnets públicas y privadas</td><td>Dividir la red según función y exposición</td></tr>
              <tr><td>4</td><td>Route Tables e Internet Gateway</td><td>Comprender cómo decide la red por dónde enviar tráfico</td></tr>
              <tr><td>5</td><td>NAT Gateway y acceso desde subnets privadas</td><td>Entender cómo salir a Internet sin exponer directamente recursos</td></tr>
              <tr><td>6</td><td>Security Groups vs Network ACLs</td><td>Diferenciar controles de seguridad de red</td></tr>
              <tr><td>7</td><td>Diseñar una VPC sencilla</td><td>Integrar VPC, subnets, rutas y seguridad</td></tr>
              <tr><td>8</td><td>Laboratorio integrador VPC</td><td>Construir y explicar una arquitectura completa</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>Objetivo general del módulo</h3>
          <Nota><p>Al finalizar el Módulo 5, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es una red y qué es una dirección IP, diferenciando IP pública y privada.</li>
            <li>Explicar qué es Amazon VPC y qué es una subnet, diferenciando subnet pública y privada.</li>
            <li>Comprender el propósito de una Route Table y reconocer qué hace un Internet Gateway.</li>
            <li>Comprender conceptualmente para qué sirve NAT Gateway.</li>
            <li>Diferenciar Security Groups y Network ACLs.</li>
            <li>Interpretar y diseñar una arquitectura de red sencilla, aplicando mínimo acceso de red.</li>
            <li>Detectar configuraciones innecesariamente expuestas.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>El cambio de mentalidad</h3>
          <CompareCols cols={[
            { emoji: '🖥️', title: 'EC2', items: ['¿Qué computador necesito?'] },
            { emoji: '📦', title: 'S3', items: ['¿Qué información necesito almacenar?'] },
          ]} />
          <Dialogo>Ahora preguntaremos: ¿cómo se comunican esos recursos?</Dialogo>
          <p>Ya no basta con que los recursos existan. Necesitamos decidir quién puede hablar con quién y por dónde.</p>
        </section>

        <section className="lesson-section">
          <h3>La analogía principal del módulo</h3>
          <CompareCols cols={[
            { emoji: '🏙️', title: 'Ciudad', items: ['Casas', 'Oficinas', 'Hospital', 'Calles', 'Controles de acceso'] },
            { emoji: '🌐', title: 'VPC', items: ['Subnets', 'EC2', 'Route Tables', 'Gateways', 'Controles de seguridad'] },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>Errores que este módulo quiere eliminar</h3>
          <ul className="plain-list">
            <li>"IP pública significa que cualquiera puede entrar." — Falso.</li>
            <li>"Subnet pública significa que todo dentro es público." — Falso.</li>
            <li>"Security Group y NACL son lo mismo." — Falso.</li>
            <li>"Internet Gateway da Internet automáticamente." — Incompleto.</li>
            <li>"NAT permite que Internet entre a la instancia privada." — No es su función normal.</li>
            <li>"VPC es un servidor." — Es una red virtual.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>Arquitectura que deberán entender al terminar</h3>
          <Flow steps={[
            { icon: 'radio', label: 'Internet' },
            { icon: 'door', label: 'Internet Gateway' },
            { icon: 'globe', label: 'VPC 10.0.0.0/16' },
            { icon: 'building', label: 'Public Subnet — SG Web' },
            { icon: 'server', label: 'EC2' },
          ]} />
          <p>Con una Private Subnet paralela conteniendo la base de datos. Si una persona que nunca estudió redes puede explicar ese dibujo al terminar el módulo, habremos ganado.</p>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Empecemos</div>
          <ConceptBadge icon="globe">Módulo 5 · Clase 1 — ¿Qué es una red? IP pública, IP privada y cómo viaja la información</ConceptBadge>
          <Nota><p>Esa primera clase será cero AWS durante buena parte de la sesión: Wi-Fi de casa, direcciones de departamentos, calles y correo postal antes de introducir una sola sigla de VPC.</p></Nota>
          <Link to="/aprendizaje/aws-desde-cero/modulo-5/clase-1" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 1: ¿Qué es una red? →
          </Link>
        </div>

      </div>
    </div>
  );
}
