import {
  Nota, Dialogo, ConceptBadge, StrikeChip, RoleGrid, Flow, InfoBox, CompareCols, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const TRUST_POLICY_JSON = `{
  "Effect": "Allow",
  "Principal": {
    "Service": "ec2.amazonaws.com"
  },
  "Action": "sts:AssumeRole"
}`;

const MALA_PRACTICA_JSON = `Action: "*"
Resource: "*"`;

const QUIZ_USUARIO_O_ROL = [
  { q: 'Daniela tiene una identidad habitual dentro de AWS.', options: [{ text: '👤 Usuario', correct: true }, { text: '🎭 Rol', correct: false }] },
  { q: 'Un servidor necesita leer archivos de S3.', options: [{ text: '👤 Usuario', correct: false }, { text: '🎭 Rol', correct: true }] },
  { q: 'Un auditor necesita permisos adicionales temporalmente.', options: [{ text: '👤 Usuario', correct: false }, { text: '🎭 Rol', correct: true }] },
  { q: 'Pedro tiene una identidad personal para trabajar normalmente.', options: [{ text: '👤 Usuario', correct: true }, { text: '🎭 Rol', correct: false }] },
  { q: 'Una aplicación necesita acceder temporalmente a otro servicio AWS.', options: [{ text: '👤 Usuario', correct: false }, { text: '🎭 Rol', correct: true }] },
];

const QUIZ_BUENA_O_MALA = [
  { q: 'Servidor necesita leer S3 y recibe rol solo lectura.', options: [{ text: '✅ Buena idea', correct: true }, { text: '🔴 Riesgoso', correct: false }] },
  { q: 'Guardamos una Access Key permanentemente en el código.', options: [{ text: '✅ Buena idea', correct: false }, { text: '🔴 Riesgoso', correct: true }] },
  { q: 'Auditor asume rol temporal con permisos de lectura.', options: [{ text: '✅ Razonable', correct: true }, { text: '🔴 Riesgoso', correct: false }] },
  { q: 'Rol de lectura tiene AdministratorAccess.', options: [{ text: '✅ Razonable', correct: false }, { text: '🔴 Excesivo', correct: true }] },
  { q: 'Un servicio AWS recibe exactamente los permisos necesarios.', options: [{ text: '✅ Mínimo privilegio', correct: true }, { text: '🔴 Riesgoso', correct: false }] },
];

const QUIZ_QUESTIONS = [
  { q: '¿Qué es un rol IAM?', options: [{ text: 'Un servidor.', correct: false }, { text: 'Una identidad con permisos que puede ser asumida por entidades autorizadas.', correct: true }, { text: 'Una Región.', correct: false }, { text: 'Un archivo.', correct: false }] },
  { q: '¿Cuál es una ventaja importante de utilizar roles?', options: [{ text: 'Eliminar Internet.', correct: false }, { text: 'Reducir la necesidad de credenciales permanentes.', correct: true }, { text: 'Obtener acceso administrador siempre.', correct: false }, { text: 'Crear archivos.', correct: false }] },
  { q: '¿Qué determina quién puede asumir un rol?', options: [{ text: 'La relación o política de confianza.', correct: true }, { text: 'Amazon S3.', correct: false }, { text: 'La dirección IP solamente.', correct: false }, { text: 'La base de datos.', correct: false }] },
  { q: '¿Qué define qué puede hacer el rol?', options: [{ text: 'Las políticas de permisos asociadas.', correct: true }, { text: 'El navegador.', correct: false }, { text: 'DNS.', correct: false }, { text: 'El nombre del rol solamente.', correct: false }] },
  { q: 'Un EC2 necesita leer archivos desde S3. ¿Qué alternativa es generalmente más apropiada?', options: [{ text: 'Guardar credenciales permanentes en el código.', correct: false }, { text: 'Asociar un rol con los permisos necesarios.', correct: true }, { text: 'Dar root.', correct: false }, { text: 'Compartir una contraseña.', correct: false }] },
  { q: '¿Los roles deben respetar mínimo privilegio?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
];

export default function Modulo2Clase4() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 2 · Clase 4</div>
      <div className="lesson-eyebrow">🎭 AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 2 · Clase 4: Roles IAM, permisos temporales sin compartir credenciales</h2>
      <p className="lesson-subtitle">
        Qué hacer cuando quien necesita permiso no es una persona sino un servidor: roles, confianza y credenciales temporales.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + casos prácticos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 2, Clases 1 a 3</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>🎯 1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar la clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es un rol IAM.</li>
            <li>Diferenciar usuario IAM y rol IAM.</li>
            <li>Comprender qué significa asumir un rol.</li>
            <li>Entender por qué los roles ayudan a evitar credenciales permanentes.</li>
            <li>Reconocer casos donde un servicio AWS necesita acceder a otro servicio.</li>
            <li>Comprender de manera introductoria la relación entre rol, política y confianza.</li>
          </ul>
          <p>La idea que debe sobrevivir será:</p>
          <Dialogo>🎭 Un rol entrega permisos temporales a quien esté autorizado para asumirlo.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>🧠 2. Recordemos lo aprendido</h3>
          <Nota><p>Ya conocemos:</p></Nota>
          <RoleGrid roles={[
            { emoji: '👤', label: 'Usuarios', desc: '' },
            { emoji: '👥', label: 'Grupos', desc: '' },
            { emoji: '📜', label: 'Políticas', desc: '' },
          ]} />
          <p>Sabemos que 👤 el usuario representa una identidad, y 📜 la política define permisos. Pero ahora aparece un problema nuevo.</p>
        </section>

        <section className="lesson-section">
          <h3>🖥️ 3. ¿Qué pasa cuando una máquina necesita permiso?</h3>
          <Nota><p>Imaginemos una aplicación funcionando en un servidor. Ese servidor necesita leer archivos almacenados en Amazon S3.</p></Nota>
          <Flow steps={[
            { emoji: '🖥️', label: 'SERVIDOR' },
            { emoji: '📦', label: 'AMAZON S3' },
          ]} />
          <Dialogo>¿Cómo le damos permiso al servidor?</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>😈 4. La mala solución</h3>
          <Nota><p>Alguien propone:</p></Nota>
          <Dialogo>"Creemos un usuario IAM, copiemos sus credenciales y guardémoslas dentro del servidor." 🚨</Dialogo>
          <p>Eso puede generar problemas. Porque ahora tenemos credenciales permanentes almacenadas en algún lugar. Si alguien las obtiene: 🔑 puede intentar utilizarlas.</p>
        </section>

        <section className="lesson-section">
          <h3>❌ 5. ¿Por qué no queremos credenciales pegadas por todas partes?</h3>
          <Nota><p>Las credenciales permanentes aumentan el riesgo de:</p></Nota>
          <ul className="plain-list">
            <li>filtración;</li>
            <li>exposición accidental;</li>
            <li>uso fuera del lugar esperado;</li>
            <li>dificultad para rotarlas;</li>
            <li>olvido de credenciales antiguas.</li>
          </ul>
          <Nota>
            <p>Esto es lo que haría en su lugar: usar un rol IAM cuando el caso lo permita. El riesgo de guardar credenciales estáticas dentro de aplicaciones o servidores es que una filtración puede abrir una puerta que siga funcionando hasta que esas credenciales sean revocadas.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>🎭 6. Aparece el rol IAM</h3>
          <Nota><p>Un rol IAM es una identidad de AWS con permisos que puede ser asumida temporalmente por una entidad autorizada.</p></Nota>
          <p>Para nuestro público:</p>
          <Dialogo>Un rol es como ponerse temporalmente una credencial de trabajo que permite hacer determinadas tareas.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>🏥 7. Analogía del hospital</h3>
          <Nota><p>Imaginemos a 👩 Ana. Normalmente es enfermera. Pero durante determinado turno asume el rol de:</p></Nota>
          <ConceptBadge>🎭 Coordinadora</ConceptBadge>
          <p>Mientras cumple ese rol puede: ✅ revisar determinados registros, ✅ coordinar tareas, ✅ acceder a determinadas funciones.</p>
          <p>Cuando termina: deja de actuar bajo ese rol.</p>
          <Nota><p>El rol no cambia quién es Ana. Le entrega capacidades asociadas a una función determinada.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>🎬 8. Otra analogía: el actor</h3>
          <Nota><p>Un actor puede interpretar distintos personajes.</p></Nota>
          <p>👨 Persona real puede asumir: 🎭 Rey, 🎭 Detective, 🎭 Profesor. Cada personaje tiene acciones diferentes dentro de la historia.</p>
          <Nota><p>En IAM, una identidad autorizada puede asumir un rol y recibir temporalmente los permisos asociados a ese rol.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>🧠 9. Usuario vs. Rol</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th></th><th>👤 Usuario</th><th>🎭 Rol</th></tr></thead>
            <tbody>
              <tr><td>Representa</td><td>Identidad normalmente persistente</td><td>Identidad asumible</td></tr>
              <tr><td>Credenciales</td><td>Puede tener credenciales de largo plazo</td><td>Usa credenciales temporales al asumirse</td></tr>
              <tr><td>Uso</td><td>Personas o casos específicos</td><td>Servicios, personas, cuentas, aplicaciones</td></tr>
              <tr><td>Permisos</td><td>Mediante políticas</td><td>Mediante políticas</td></tr>
              <tr><td>Idea</td><td>"Soy esta identidad"</td><td>"Asumo temporalmente esta función"</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>🖥️ 10. Volvamos a nuestro servidor</h3>
          <Flow steps={[
            { emoji: '🖥️', label: 'EC2' },
            { emoji: '📦', label: 'S3' },
          ]} />
          <p>El servidor necesita: 👀 leer archivos. No necesita: 🗑️ eliminar buckets, 👑 administrar AWS, 💰 ver facturación.</p>
          <p>Entonces podemos crear:</p>
          <ConceptBadge>🎭 RolLecturaS3</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>📜 11. ¿Qué tendrá ese rol?</h3>
          <Nota><p>El rol tendrá asociados permisos.</p></Nota>
          <Flow steps={[
            { emoji: '🎭', label: 'RolLecturaS3' },
            { emoji: '📜', label: 'Política' },
            { emoji: '✅', label: 'Leer objetos S3' },
          ]} />
          <Nota><p>Aquí conectamos inmediatamente con la Clase 3. El rol no inventa permisos. Las políticas siguen definiendo qué puede hacerse.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>🔐 12. ¿Quién puede asumir el rol?</h3>
          <Nota><p>No cualquiera. AWS también necesita saber:</p></Nota>
          <Dialogo>¿Quién tiene permiso para asumir este rol?</Dialogo>
          <p>Esto introduce otro concepto:</p>
          <ConceptBadge>🤝 Confianza</ConceptBadge>
          <p>Un rol tiene una relación de confianza que determina quién puede asumirlo.</p>
        </section>

        <section className="lesson-section">
          <h3>🏢 13. Analogía de la empresa</h3>
          <Nota><p>Tenemos una credencial especial: 🎭 "Técnico de Servidores". Pero no puede tomarla cualquier persona que pase por el pasillo. Solo: 👨‍💻 miembros autorizados.</p></Nota>
          <p>Entonces tenemos dos preguntas:</p>
          <ol className="plain-list">
            <li>¿Quién puede asumir el rol? — 🤝 Confianza</li>
            <li>¿Qué puede hacer después de asumirlo? — 📜 Permisos</li>
          </ol>
        </section>

        <section className="lesson-section">
          <h3>🧩 14. El mapa del rol</h3>
          <Flow steps={[
            { n: '?', label: '¿QUIÉN?' },
            { emoji: '🤝', label: 'Confianza' },
            { emoji: '🎭', label: 'ROL IAM' },
            { emoji: '📜', label: 'Permisos' },
            { n: '?', label: '¿QUÉ PUEDE HACER?' },
          ]} />
          <p>Este esquema es muy importante.</p>
        </section>

        <section className="lesson-section">
          <h3>🚪 15. La llave temporal</h3>
          <Nota><p>Podemos pensar en un rol como una llave que:</p></Nota>
          <ul className="plain-list">
            <li>se entrega a alguien autorizado;</li>
            <li>sirve para una función concreta;</li>
            <li>tiene permisos determinados;</li>
            <li>no necesita ser una credencial fija compartida permanentemente.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>🕐 16. ¿Qué significa temporal?</h3>
          <Nota><p>Al asumir un rol, AWS proporciona credenciales temporales. No necesitamos entrar todavía en: ❌ AccessKeyId, ❌ SecretAccessKey, ❌ SessionToken, ❌ AWS STS en profundidad.</p></Nota>
          <p>Para esta clase:</p>
          <Dialogo>Asumir un rol genera acceso temporal con los permisos de ese rol.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>🖥️ 17. Caso práctico: EC2 necesita S3</h3>
          <Nota><p>Tenemos una aplicación en EC2. Necesita leer imágenes almacenadas en S3.</p></Nota>
          <Flow steps={[
            { emoji: '🖥️', label: 'EC2' },
            { emoji: '🎭', label: 'RolLecturaS3', caption: 'asume' },
            { emoji: '📜', label: 'Puede leer' },
            { emoji: '📦', label: 'S3' },
          ]} />
          <Nota><p>Así evitamos guardar manualmente credenciales permanentes dentro de la aplicación.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>☁️ 18. ¿Por qué esto es mejor?</h3>
          <Nota><p>Porque:</p></Nota>
          <ul className="plain-list">
            <li>🔐 reduce la necesidad de credenciales estáticas.</li>
            <li>🕐 utiliza credenciales temporales.</li>
            <li>🎯 podemos limitar permisos.</li>
            <li>🔄 AWS puede administrar la obtención de esas credenciales en muchos escenarios.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>🧠 19. Mínimo privilegio otra vez</h3>
          <p>El rol debe seguir la misma regla que vimos anteriormente. Si EC2 solo necesita 👀 leer imágenes, no hacemos:</p>
          <StrikeChip>❌ 🎭 ROL — ✅ TODO AWS — ✅ TODOS LOS RECURSOS</StrikeChip>
          <p>Eso sería excesivo.</p>
        </section>

        <section className="lesson-section">
          <h3>✂️ 20. Mejor diseño</h3>
          <InfoBox title="🎭 RolLecturaImagenes" items={['✅ Leer imágenes', '📦 Bucket correspondiente', '❌ Eliminar', '❌ Crear servidores', '❌ Facturación']} />
          <p>Eso aplica:</p>
          <ConceptBadge>🔐 Mínimo privilegio</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>👩‍💻 21. Los roles no son solo para servicios AWS</h3>
          <Nota><p>También pueden utilizarse en otros escenarios. Por ejemplo:</p></Nota>
          <ul className="plain-list">
            <li>👩 personas que necesitan acceso temporal.</li>
            <li>🏢 otra cuenta AWS.</li>
            <li>🖥️ aplicaciones.</li>
            <li>☁️ servicios AWS.</li>
          </ul>
          <Nota><p>Pero para esta clase empezaría principalmente con servicio AWS → servicio AWS, porque es más sencillo de visualizar.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>🏢 22. Ejemplo: persona con función temporal</h3>
          <Nota><p>Tenemos a 👩 Carolina. Trabaja normalmente en soporte. Durante una auditoría necesita temporalmente: 👀 consultar determinados recursos.</p></Nota>
          <p>En vez de darle permisos permanentes adicionales, puede ser preferible permitirle asumir:</p>
          <ConceptBadge>🎭 RolAuditoria</ConceptBadge>
          <p>durante el período necesario.</p>
        </section>

        <section className="lesson-section">
          <h3>🔄 23. Cuando termina la tarea</h3>
          <Nota><p>Carolina deja de necesitar esa función. No tenemos por qué mantener esos permisos adicionales permanentemente.</p></Nota>
          <Flow steps={[
            { emoji: '👩', label: 'Carolina — Normal', caption: 'Permisos habituales' },
            { emoji: '🎭', label: 'Durante auditoría', caption: 'RolAuditoria — Permisos temporales' },
            { emoji: '👩', label: 'Después', caption: 'Permisos habituales' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>🚨 24. Usuario administrador temporal</h3>
          <Nota><p>Aquí preguntaría:</p></Nota>
          <Dialogo>"Si alguien necesita administrar algo solamente durante una hora, ¿le damos administrador para siempre?"</Dialogo>
          <p>❌ No necesariamente.</p>
          <Nota><p>El uso de roles puede ayudar a entregar acceso temporal y controlado según el contexto.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>🎮 25. Juego: ¿Usuario o Rol?</h3>
          <Nota><p>Los estudiantes levantan 👤 USUARIO o 🎭 ROL para cada caso.</p></Nota>
          <Quiz questions={QUIZ_USUARIO_O_ROL} />
        </section>

        <section className="lesson-section">
          <h3>🧪 26. Actividad: encuentra la mala práctica</h3>
          <Nota><p>Caso:</p></Nota>
          <Flow steps={[
            { emoji: '🖥️', label: 'Aplicación EC2' },
            { emoji: '🔑', label: 'Usuario IAM', caption: 'Access Key guardada en código' },
            { emoji: '📦', label: 'S3' },
          ]} />
          <QaItem question="¿Qué les preocupa?" answer="Hay credenciales permanentes almacenadas dentro de la aplicación." />
          <p>Luego mostramos:</p>
          <Flow steps={[
            { emoji: '🖥️', label: 'EC2' },
            { emoji: '🎭', label: 'Rol' },
            { emoji: '📦', label: 'S3' },
          ]} />
          <Nota><p>Para este caso, esta segunda arquitectura es más apropiada.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>📜 27. Rol + política</h3>
          <Nota><p>Recordemos:</p></Nota>
          <Flow steps={[
            { emoji: '🎭', label: 'ROL' },
            { emoji: '📜', label: 'POLÍTICA' },
          ]} />
          <p>Ejemplo conceptual:</p>
          <ConceptBadge>🎭 LectorS3 — 📜 s3:GetObject — 📦 materiales-curso</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>🤝 28. Confianza + permisos</h3>
          <Nota><p>Ahora agregamos la otra mitad:</p></Nota>
          <Flow steps={[
            { emoji: '🤝', label: 'Confianza', caption: 'EC2 puede asumirlo' },
            { emoji: '🎭', label: 'RolLecturaS3' },
            { emoji: '📜', label: 'Permisos', caption: 'Leer determinados objetos S3' },
          ]} />
          <p>Son dos ideas diferentes. Confianza: ¿quién puede usar el rol? Permisos: ¿qué puede hacer cuando lo usa?</p>
        </section>

        <section className="lesson-section">
          <h3>🧠 29. Esta diferencia vale oro</h3>
          <Nota><p>Yo preguntaría:</p></Nota>
          <Dialogo>"Pedro puede ponerse el uniforme de médico. ¿Eso significa que está autorizado para asumir ese rol?"</Dialogo>
          <p>No. Primero necesitamos determinar quién está autorizado a asumir esa función. Luego, qué permite esa función.</p>
        </section>

        <section className="lesson-section">
          <h3>📑 30. ¿Cómo se expresa la confianza en AWS?</h3>
          <Nota><p>AWS utiliza una trust policy, o política de confianza, para indicar quién puede asumir un rol. No la desarrollaría profundamente todavía. Solo:</p></Nota>
          <InfoBox title="🎭 ROL" items={['🤝 Trust Policy — ¿Quién puede asumirlo?', '📜 Permissions — ¿Qué puede hacer?']} />
        </section>

        <section className="lesson-section">
          <h3>👀 31. Primer vistazo técnico</h3>
          <Nota><p>Podemos mostrar conceptualmente una política de confianza muy simplificada:</p></Nota>
          <pre className="codeblock">{TRUST_POLICY_JSON}</pre>
          <Nota><p>No les pediría memorizarla. Solo señalaría: Principal — quién. AssumeRole — asumir el rol.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>🧙 32. Y aparece STS</h3>
          <Nota><p>Más adelante verán: AWS STS — Security Token Service.</p></Nota>
          <p>Está relacionado con las credenciales temporales utilizadas en escenarios como asumir roles. Para esta clase basta:</p>
          <Dialogo>STS participa en la entrega de credenciales temporales. Nada más.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>🎯 33. Las cuatro piezas</h3>
          <Nota><p>Este sería el resumen visual central:</p></Nota>
          <Flow steps={[
            { emoji: '👤', label: 'QUIÉN NECESITA ACCESO' },
            { emoji: '🤝', label: 'CONFIANZA', caption: '¿Puede asumirlo?' },
            { emoji: '🎭', label: 'ROL' },
            { emoji: '📜', label: 'POLÍTICA', caption: '¿Qué puede hacer?' },
            { emoji: '☁️', label: 'RECURSO AWS' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>🏥 34. Actividad grupal: Clínica Cloud</h3>
          <Nota><p>Tenemos: 🖥️ Servidor de informes. Necesita leer documentos almacenados en S3.</p></Nota>
          <QaItem question="¿Quién necesita acceso?" answer="🖥️ Servidor." />
          <QaItem question="¿Qué debería asumir?" answer="🎭 Un rol." />
          <QaItem question="¿Qué permiso necesita?" answer="👀 Leer documentos." />
          <QaItem question="¿Necesita eliminar documentos?" answer="❌ No." />
        </section>

        <section className="lesson-section">
          <h3>🏫 35. Caso Universidad Cloud</h3>
          <Nota><p>Una aplicación alojada en AWS genera certificados. Necesita: 📄 obtener archivos de plantilla desde S3.</p></Nota>
          <Flow steps={[
            { emoji: '🖥️', label: 'Aplicación' },
            { emoji: '🎭', label: 'RolCertificados' },
            { emoji: '📜', label: 'Leer plantillas' },
            { emoji: '📦', label: 'S3' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>😈 36. Pregunta trampa</h3>
          <Nota><p>Preguntaría:</p></Nota>
          <Dialogo>"Si un rol es temporal, ¿podemos darle permisos de administrador sin preocuparnos?"</Dialogo>
          <ConceptBadge variant="danger">❌ No</ConceptBadge>
          <Nota>
            <p>Temporal no significa seguro por definición. Un rol excesivamente poderoso sigue siendo peligroso mientras está siendo utilizado. Por eso: los roles también deben aplicar mínimo privilegio.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>🛡️ 37. Otra mala práctica</h3>
          <p>Rol:</p>
          <pre className="codeblock">{MALA_PRACTICA_JSON}</pre>
          <p>Y decimos:</p>
          <Dialogo>"Da igual, solo dura temporalmente."</Dialogo>
          <p>Incorrecto. Durante ese período podría hacer muchísimo.</p>
        </section>

        <section className="lesson-section">
          <h3>🎮 38. Actividad rápida: ¿buena o mala idea?</h3>
          <Quiz questions={QUIZ_BUENA_O_MALA} />
        </section>

        <section className="lesson-section">
          <h3>📝 39. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>🏆 40. Reto de la clase</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge>🛍️ CloudShop</ConceptBadge>
          <p>Tenemos una aplicación ejecutándose en EC2. Necesita: 👀 leer fotografías almacenadas en S3. No necesita: ❌ eliminar fotografías, ❌ crear buckets, ❌ administrar servidores, ❌ acceder a facturación.</p>
          <Dialogo>Diseña conceptualmente el acceso correcto.</Dialogo>
          <Reveal label="Ver solución esperada">
            <Flow steps={[
              { emoji: '🖥️', label: 'EC2' },
              { emoji: '🎭', label: 'RolLecturaFotos' },
              { emoji: '📜', label: 'Permitir lectura' },
              { emoji: '📦', label: 'S3 FotosProductos' },
            ]} />
            <p style={{ marginTop: 'var(--space-3)' }}>El rol debería confiar en la entidad autorizada correspondiente y tener únicamente los permisos necesarios para leer las fotografías.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>🔥 41. Reto nivel 2</h3>
          <Nota><p>Compara:</p></Nota>
          <CompareCols cols={[
            { emoji: '🔑', title: 'Solución A', items: ['EC2 → Access Key escrita en código'] },
            { emoji: '🎭', title: 'Solución B', items: ['EC2 → IAM Role'] },
          ]} />
          <QaItem
            question="¿Cuál elegirías y por qué?"
            answer="B, porque permite utilizar permisos mediante un rol y credenciales temporales en lugar de almacenar manualmente credenciales permanentes en la aplicación."
          />
        </section>

        <section className="lesson-section">
          <h3>🧠 42. Explica el rol sin decir "rol"</h3>
          <Nota><p>Reto oral:</p></Nota>
          <Dialogo>Explica IAM Role sin utilizar las palabras rol, IAM, credenciales ni permisos.</Dialogo>
          <Reveal label="Ver una respuesta válida">
            <Dialogo>"Es como recibir temporalmente una tarjeta que te deja realizar ciertas tareas porque estás autorizado para usarla."</Dialogo>
          </Reveal>
          <p style={{ marginTop: 'var(--space-4)' }}>Si pueden decir algo parecido, entendieron.</p>
        </section>

        <section className="lesson-section">
          <h3>📌 43. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación</th></tr></thead>
            <tbody>
              <tr><td>🎭 Rol IAM</td><td>Identidad que puede asumirse</td></tr>
              <tr><td>🤝 Confianza</td><td>Quién puede asumir el rol</td></tr>
              <tr><td>📜 Política</td><td>Qué puede hacer</td></tr>
              <tr><td>🕐 Temporal</td><td>El acceso utiliza credenciales temporales</td></tr>
              <tr><td>🔐 Mínimo privilegio</td><td>Solo lo necesario</td></tr>
              <tr><td>AWS STS</td><td>Servicio relacionado con credenciales temporales</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>🔄 44. Conectemos las cuatro clases</h3>
          <Flow steps={[
            { n: 1, label: '🔐 ¿Qué es IAM?', caption: 'Autenticación + autorización' },
            { n: 2, label: '👤👥 Usuarios + grupos', caption: 'Mínimo privilegio' },
            { n: 3, label: '📜 Políticas', caption: '¿Qué puede hacer?' },
            { n: 4, label: '🎭 Roles', caption: '¿Quién puede asumir temporalmente esos permisos?' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>🎟️ 45. Ticket de salida</h3>
          <Nota><p>Mostraría:</p></Nota>
          <Dialogo>Una aplicación EC2 necesita descargar un archivo desde S3. Un compañero propone crear un usuario IAM y escribir su Access Key directamente en el código. ¿Qué harías en su lugar?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Usaría un rol IAM para EC2 con solamente los permisos necesarios para acceder al recurso.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow">🔗 Puente hacia la Clase 5</div>
          <Nota><p>Ahora tenemos:</p></Nota>
          <RoleGrid roles={[
            { emoji: '👤', label: 'Usuario', desc: '' },
            { emoji: '👥', label: 'Grupo', desc: '' },
            { emoji: '🎭', label: 'Rol', desc: '' },
            { emoji: '📜', label: 'Política', desc: '' },
          ]} />
          <p>Pero todavía falta responder una pregunta práctica:</p>
          <Dialogo>¿Cómo protegemos correctamente el acceso a estas identidades?</Dialogo>
          <p>Contraseñas. MFA. Credenciales. Access Keys. Rotación. Y algunas malas prácticas que conviene evitar antes de que provoquen incendios digitales. 🔥🧯</p>
          <ConceptBadge>🛡️ Módulo 2 · Clase 5 — Credenciales, contraseñas, MFA y buenas prácticas de seguridad</ConceptBadge>
          <span className="tag tag-outline">Módulo 2 · Clase 5 · próximamente</span>
        </div>

      </div>
    </div>
  );
}
