import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, QaItem,
} from './lessonComponents.jsx';

export default function Modulo9Overview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 9</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 9: Seguridad en AWS</h2>
      <p className="lesson-subtitle">
        Seguridad no consiste en poner una contraseña fuerte; consiste en controlar quién entra, qué puede hacer, qué datos puede ver y dejar evidencia de lo que ocurrió.
      </p>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>Las 8 clases</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Clase</th><th>Tema</th><th>Objetivo</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Identidad, autenticación, MFA y cuenta root</td><td>Proteger el acceso</td></tr>
              <tr><td>2</td><td>IAM Policies y mínimo privilegio</td><td>Controlar qué puede hacer cada identidad</td></tr>
              <tr><td>3</td><td>IAM Roles y credenciales temporales</td><td>Dar permisos a workloads sin Access Keys</td></tr>
              <tr><td>4</td><td>Cifrado y AWS KMS</td><td>Proteger datos en reposo y comprender claves</td></tr>
              <tr><td>5</td><td>AWS Secrets Manager</td><td>Proteger contraseñas, tokens y secretos</td></tr>
              <tr><td>6</td><td>AWS CloudTrail</td><td>Saber quién hizo qué y cuándo</td></tr>
              <tr><td>7</td><td>GuardDuty y Security Hub</td><td>Detectar actividad sospechosa y centralizar hallazgos</td></tr>
              <tr><td>8</td><td>Laboratorio integrador de seguridad</td><td>Diseñar y auditar CloudShop segura</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>Objetivo general del módulo</h3>
          <Nota><p>Al finalizar el Módulo 9, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Comprender el modelo de seguridad por capas en AWS y diferenciar autenticación y autorización.</li>
            <li>Comprender MFA y reconocer buenas prácticas para la cuenta root.</li>
            <li>Aplicar conceptualmente el principio de mínimo privilegio y diferenciar Users, Groups, Roles y Policies.</li>
            <li>Leer una política IAM básica en JSON, comprendiendo Allow, Deny, Action, Resource y Condition.</li>
            <li>Explicar por qué las credenciales temporales son preferibles, y comprender el uso de IAM Roles para workloads.</li>
            <li>Reconocer riesgos asociados a Access Keys, y comprender cifrado en tránsito y en reposo.</li>
            <li>Explicar qué es AWS KMS y qué son las claves administradas.</li>
            <li>Reconocer el uso de Secrets Manager para credenciales y secretos.</li>
            <li>Comprender qué registra AWS CloudTrail y diferenciarlo de CloudWatch.</li>
            <li>Reconocer Amazon GuardDuty como servicio de detección de amenazas y el rol de Security Hub a nivel introductorio.</li>
            <li>Diseñar una arquitectura básica de seguridad para CloudShop.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>El problema que abre el módulo</h3>
          <Flow steps={[{ icon: 'globe', label: 'Usuarios' }, { icon: 'settings', label: 'ALB' }, { icon: 'server', label: 'EC2 × N' }, { icon: 'database', label: 'RDS' }]} />
          <p>CloudShop ya tiene S3, Auto Scaling, CloudWatch, Alarms y Logs. Todo funciona. Hasta que alguien pregunta: "¿quién puede entrar a todo esto?" Y otra persona responde: "todos somos Administrator para no complicarnos."</p>
          <Nota><p>Docente, Desarrollador, Soporte y Auditor, todos con AdministratorAccess. El problema no es solamente "alguien podría equivocarse" — también aumenta el impacto de una cuenta comprometida.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>Principio de mínimo privilegio</h3>
          <p>AWS recomienda conceder únicamente los permisos necesarios para realizar una tarea.</p>
          <ConceptBadge icon="key">Cada identidad debería tener solo las llaves que realmente necesita</ConceptBadge>
          <Dialogo>En un hotel, el huésped puede entrar a su habitación, el personal de limpieza a habitaciones asignadas, y el administrador tiene permisos diferentes. No entregamos a todos la llave maestra. AWS funciona con la misma lógica conceptual.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>Los pilares del módulo</h3>
          <Flow steps={[
            { label: '¿Quién eres?' }, { label: '¿Cómo demuestras quién eres?' }, { label: '¿Qué puedes hacer?' },
            { label: '¿Cómo protegemos los datos?' }, { label: '¿Quién hizo qué?' }, { label: '¿Hay actividad sospechosa?' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>Servicio correcto para cada necesidad</h3>
          <QaItem question="Guardar password DB / Investigar quién eliminó una EC2 / Detectar actividad sospechosa / Controlar permisos / Gestionar claves de cifrado" answer="Secrets Manager / CloudTrail / GuardDuty / IAM / KMS." />
        </section>

        <section className="lesson-section">
          <h3>Regla central del módulo</h3>
          <ConceptBadge icon="shield">"No confío porque estás dentro."</ConceptBadge>
          <p>No basta pertenecer a la empresa. No basta estar dentro de la VPC. No basta conocer una contraseña. Cada acceso debería responder quién eres, qué necesitas y qué tienes permitido hacer.</p>
        </section>

        <section className="lesson-section">
          <h3>Seguridad compartida</h3>
          <p>Retomamos el Shared Responsibility Model: AWS protege la infraestructura de la nube. El cliente sigue siendo responsable, según el servicio utilizado, de identidades, permisos, datos, configuración y aplicaciones. No podemos decir "está en AWS, entonces ya es seguro".</p>
          <Dialogo>AWS puede construir un edificio robusto, pero si nosotros dejamos la puerta abierta, escribimos la contraseña en la pared, o entregamos la llave maestra a todos, el edificio no puede salvarnos de nuestras decisiones.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>Seguridad por capas</h3>
          <RoleGrid roles={[
            { icon: 'user', label: 'IAM', desc: 'Prevenir/controlar' },
            { icon: 'file-text', label: 'CloudTrail', desc: 'Auditar' },
            { icon: 'search', label: 'GuardDuty', desc: 'Detectar amenazas' },
            { icon: 'shield', label: 'Security Hub', desc: 'Centralizar/evaluar postura' },
          ]} />
          <p>No existe un botón único llamado "Secure AWS". Seguridad es la suma de controles coordinados: MFA + IAM + Roles + Security Groups + Encryption + Secrets + CloudTrail + Detection.</p>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Próximamente</div>
          <ConceptBadge icon="user">Módulo 9 · Clase 1 — Identidad, autenticación, autorización, MFA y la cuenta root: quién puede entrar a AWS y cómo protegemos ese acceso</ConceptBadge>
          <Nota><p>Esa clase abrirá con tres conceptos que no son iguales: identidad (¿quién eres?), autenticación (¿puedes demostrarlo?) y autorización (¿qué puedes hacer?), antes de entrar en MFA y las buenas prácticas para proteger la cuenta root.</p></Nota>
          <span className="tag tag-outline">Módulo 9 · Clase 1 · próximamente</span>
        </div>

      </div>
    </div>
  );
}
