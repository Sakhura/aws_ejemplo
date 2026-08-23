import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, CompareCols, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const POLICY_LECTURA = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::productos-imagenes/*"
    }
  ]
}`;

const POLICY_PELIGROSA = `{
  "Effect": "Allow",
  "Action": "*",
  "Resource": "*"
}`;

const ACCESS_KEY_LEAK = `AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...`;

const QUIZ_QUESTIONS = [
  { q: '¿Qué servicio administra identidades y accesos en AWS?', options: [{ text: 'S3', correct: false }, { text: 'IAM', correct: true }, { text: 'RDS', correct: false }, { text: 'EC2', correct: false }] },
  { q: '¿Cuál es la diferencia entre autenticación y autorización?', options: [{ text: 'Son exactamente lo mismo.', correct: false }, { text: 'Autenticación comprueba quién eres; autorización qué puedes hacer.', correct: true }, { text: 'Autenticación crea servidores.', correct: false }, { text: 'Autorización crea contraseñas.', correct: false }] },
  { q: '¿Qué permite administrar permisos comunes para varios usuarios?', options: [{ text: 'Grupo IAM', correct: true }, { text: 'Dirección IP', correct: false }, { text: 'DNS', correct: false }, { text: 'S3', correct: false }] },
  { q: '¿Qué elemento define permisos?', options: [{ text: 'Política IAM', correct: true }, { text: 'Región', correct: false }, { text: 'Navegador', correct: false }, { text: 'IP', correct: false }] },
  { q: '¿Qué significa Deny?', options: [{ text: 'Permitir', correct: false }, { text: 'Denegar', correct: true }, { text: 'Descargar', correct: false }, { text: 'Ejecutar', correct: false }] },
  { q: '¿Qué principio indica que debemos dar solo los permisos necesarios?', options: [{ text: 'Alta disponibilidad', correct: false }, { text: 'Mínimo privilegio', correct: true }, { text: 'Elasticidad', correct: false }, { text: 'SaaS', correct: false }] },
  { q: '¿Qué usaríamos normalmente para que EC2 acceda a otro servicio AWS sin guardar credenciales permanentes?', options: [{ text: 'Rol IAM', correct: true }, { text: 'Root', correct: false }, { text: 'Contraseña compartida', correct: false }, { text: 'Cuenta pública', correct: false }] },
  { q: '¿Qué agrega MFA?', options: [{ text: 'Una segunda verificación', correct: true }, { text: 'Más CPU', correct: false }, { text: 'Más almacenamiento', correct: false }, { text: 'Una Región', correct: false }] },
  { q: '¿Qué hacemos si una Access Key aparece públicamente?', options: [{ text: 'Nada.', correct: false }, { text: 'Solo cambiar el nombre.', correct: false }, { text: 'Considerarla comprometida, revocarla y revisar actividad.', correct: true }, { text: 'Compartirla.', correct: false }] },
  { q: '¿Deberíamos utilizar root diariamente?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
];

export default function Modulo2Clase6() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 2 · Clase 6</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 2 · Clase 6: Laboratorio y desafío final de IAM</h2>
      <p className="lesson-subtitle">
        Clase de cierre del módulo, casi sin teoría nueva: resolvemos el caso completo de NovaCloud aplicando todo lo aprendido en las cinco clases anteriores.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Resolución de casos + desafío integrador</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 2, Clases 1 a 5</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar la clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>identificar identidades y necesidades de acceso;</li>
            <li>decidir cuándo usar usuarios, grupos o roles;</li>
            <li>aplicar mínimo privilegio;</li>
            <li>interpretar políticas sencillas;</li>
            <li>reconocer malas prácticas;</li>
            <li>proponer uso de MFA;</li>
            <li>diferenciar acceso humano y acceso entre servicios;</li>
            <li>detectar credenciales expuestas;</li>
            <li>justificar sus decisiones de seguridad.</li>
          </ul>
          <p>La frase central será:</p>
          <Dialogo>La seguridad no consiste en dar acceso. Consiste en dar el acceso correcto, a la persona o servicio correcto, durante el tiempo necesario.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Sin teoría nueva</h3>
          <Nota><p>Yo empezaría diciéndoles:</p></Nota>
          <Dialogo>"Hoy no aprenderemos conceptos nuevos. Hoy vamos a comprobar si sabemos usar los que ya tenemos."</Dialogo>
          <p>En la pizarra dejamos únicamente:</p>
          <RoleGrid roles={[
            { icon: 'user', label: 'Usuario', desc: '' },
            { icon: 'users', label: 'Grupo', desc: '' },
            { icon: 'users', label: 'Rol', desc: '' },
            { icon: 'file-text', label: 'Política', desc: '' },
            { icon: 'smartphone', label: 'MFA', desc: '' },
            { icon: 'target', label: 'Mínimo privilegio', desc: '' },
            { icon: 'key', label: 'Credenciales', desc: '' },
            { icon: 'crown', label: 'Root', desc: '' },
          ]} />
          <p>Todo el resto de la clase se construye con estas piezas.</p>
        </section>

        <section className="lesson-section">
          <h3>3. Empresa del desafío: NovaCloud</h3>
          <Nota><p>Presentamos una empresa ficticia:</p></Nota>
          <ConceptBadge>NovaCloud</ConceptBadge>
          <p>Tiene una aplicación de comercio electrónico en AWS. Trabajan seis personas:</p>
          <RoleGrid roles={[
            { icon: 'user', label: 'Camila', desc: 'Marketing' },
            { icon: 'user', label: 'Pedro', desc: 'Infraestructura' },
            { icon: 'user', label: 'Daniela', desc: 'Desarrollo' },
            { icon: 'user', label: 'Andrés', desc: 'Finanzas' },
            { icon: 'user', label: 'Carolina', desc: 'Auditoría' },
            { icon: 'user', label: 'Luis', desc: 'Soporte' },
          ]} />
          <p>Además existen: 🖥️ una aplicación ejecutándose en EC2, 📦 imágenes almacenadas en S3, 🗄️ una base de datos, 💰 información de costos.</p>
        </section>

        <section className="lesson-section">
          <h3>4. Primera misión: organizar a las personas</h3>
          <Dialogo>¿Crearíamos una sola cuenta para todos?</Dialogo>
          <p>❌ No. Ahora deben agrupar a los trabajadores. Una propuesta razonable:</p>
          <table className="table lesson-summary-table">
            <thead><tr><th>Grupo</th><th>Miembro</th></tr></thead>
            <tbody>
              <tr><td>👥 MARKETING</td><td>👩 Camila</td></tr>
              <tr><td>👥 INFRAESTRUCTURA</td><td>👨 Pedro</td></tr>
              <tr><td>👥 DESARROLLO</td><td>👩 Daniela</td></tr>
              <tr><td>👥 FINANZAS</td><td>👨 Andrés</td></tr>
              <tr><td>👥 AUDITORÍA</td><td>👩 Carolina</td></tr>
              <tr><td>👥 SOPORTE</td><td>👨 Luis</td></tr>
            </tbody>
          </table>
          <Nota><p>Lo importante no es el nombre exacto del grupo, sino que puedan justificar por qué separar funciones.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>5. Segunda misión: definir necesidades</h3>
          <p>Les entregamos esta tabla incompleta:</p>
          <table className="table lesson-summary-table">
            <thead><tr><th>Persona</th><th>Necesita</th><th>No necesita</th></tr></thead>
            <tbody>
              <tr><td>Camila</td><td>Imágenes de productos</td><td>Servidores</td></tr>
              <tr><td>Pedro</td><td>Infraestructura</td><td>Marketing</td></tr>
              <tr><td>Daniela</td><td>Recursos de desarrollo</td><td>Facturación</td></tr>
              <tr><td>Andrés</td><td>Costos</td><td>Servidores</td></tr>
              <tr><td>Carolina</td><td>Lectura para auditoría</td><td>Modificar</td></tr>
              <tr><td>Luis</td><td>Soporte limitado</td><td>Administración total</td></tr>
            </tbody>
          </table>
          <p>Los estudiantes deben completar o discutir los permisos.</p>
        </section>

        <section className="lesson-section">
          <h3>6. El principio que manda</h3>
          <QaItem question="¿Qué principio debemos aplicar antes de entregar permisos?" answer="Mínimo privilegio: solo los permisos necesarios para la tarea." />
        </section>

        <section className="lesson-section">
          <h3>7. Tercera misión: política para Marketing</h3>
          <p>Camila necesita: ✅ visualizar imágenes, ✅ subir imágenes. ❌ no necesita eliminarlas.</p>
          <p>Pedimos construir una política humana:</p>
          <ConceptBadge>EFFECT: Allow — ACTIONS: Ver imágenes, Subir imágenes — RESOURCE: Imágenes de productos</ConceptBadge>
          <Nota><p>Si agregan "eliminar", deben justificar por qué. Si no existe una necesidad real: ❌ no se agrega.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>8. Ahora leemos una política</h3>
          <pre className="codeblock">{POLICY_LECTURA}</pre>
          <QaItem question="1. ¿Permite o deniega?" answer="Allow." />
          <QaItem question="2. ¿Qué acción aparece?" answer="GetObject." />
          <QaItem question="3. ¿Sobre qué recurso?" answer="Objetos del recurso indicado." />
          <QaItem question="4. ¿Es una política de lectura o administración total?" answer="Lectura." />
        </section>

        <section className="lesson-section">
          <h3>9. Política peligrosa</h3>
          <pre className="codeblock">{POLICY_PELIGROSA}</pre>
          <QaItem question="¿Le darían esto a Camila?" answer="❌ No, porque tiene permisos muchísimo más amplios de los necesarios. Viola mínimo privilegio." />
        </section>

        <section className="lesson-section">
          <h3>10. Cuarta misión: EC2 necesita S3</h3>
          <p>La aplicación en EC2 necesita leer imágenes desde S3. Tenemos dos propuestas.</p>
          <CompareCols cols={[
            { icon: 'key', title: 'Opción A', items: ['EC2 → Access Key guardada en código → S3'] },
            { icon: 'users', title: 'Opción B', items: ['EC2 → Rol IAM → Leer imágenes → S3'] },
          ]} />
          <QaItem question="¿Cuál elegirían?" answer="✅ B." />
        </section>

        <section className="lesson-section">
          <h3>11. ¿Por qué rol?</h3>
          <Nota><p>Porque:</p></Nota>
          <ul className="plain-list">
            <li>evita guardar credenciales permanentes en el código;</li>
            <li>permite usar credenciales temporales;</li>
            <li>limita permisos;</li>
            <li>encaja bien para acceso entre servicios AWS.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>12. Quinta misión: confianza</h3>
          <QaItem
            question="¿Qué debe decidir un rol antes de entregar acceso?"
            answer="Dos cosas: 🤝 ¿Quién puede asumirlo? y 📜 ¿Qué puede hacer?"
          />
          <Dialogo>Confianza = quién. Permisos = qué.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>13. Sexta misión: proteger identidades humanas</h3>
          <QaItem question="¿Qué medida recomendaríamos para las identidades humanas importantes?" answer="MFA." />
          <Flow steps={[
            { icon: 'key', label: 'Contraseña' },
            { icon: 'smartphone', label: 'Segundo factor' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>14. Séptima misión: aparece root</h3>
          <Nota><p>El gerente dice:</p></Nota>
          <Dialogo>"Para no complicarnos, usemos root entre todos."</Dialogo>
          <ConceptBadge variant="danger">No</ConceptBadge>
          <Nota><p>Root debe protegerse especialmente y reservarse para tareas que realmente lo requieren. No se comparte. No se usa como cuenta cotidiana.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>15. Octava misión: phishing</h3>
          <Nota><p>Camila recibe un correo:</p></Nota>
          <Dialogo>"Su cuenta AWS será suspendida. Ingrese su contraseña y código MFA aquí."</Dialogo>
          <QaItem question="¿Qué riesgo existe?" answer="🎣 Phishing." />
          <QaItem question="¿Qué debe hacer?" answer="No entregar credenciales, no compartir código MFA, verificar por canales legítimos." />
        </section>

        <section className="lesson-section">
          <h3>16. Novena misión: Access Key filtrada</h3>
          <Nota><p>Daniela encuentra esto en GitHub público:</p></Nota>
          <pre className="codeblock">{ACCESS_KEY_LEAK}</pre>
          <QaItem question="¿La borramos del repositorio y seguimos trabajando?" answer="❌ No. Debemos considerarla potencialmente comprometida." />
          <p>Procedimiento conceptual:</p>
          <Flow steps={[
            { icon: 'bell', label: 'Detectar' },
            { icon: 'lock', label: 'Revocar/deshabilitar' },
            { icon: 'search', label: 'Revisar actividad' },
            { icon: 'settings', label: 'Corregir causa' },
            { icon: 'key', label: 'Reemplazar solo si es necesario' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>17. Desafío central</h3>
          <Nota><p>Ahora entregamos a los grupos el escenario completo.</p></Nota>
          <ConceptBadge>Caso: NovaCloud</ConceptBadge>
          <p>La empresa necesita:</p>
          <ul className="plain-list">
            <li>Marketing — 📸 ver y subir imágenes.</li>
            <li>Infraestructura — 🖥️ administrar servidores.</li>
            <li>Finanzas — 💰 consultar costos.</li>
            <li>Auditoría — 👀 revisar configuraciones, sin modificar.</li>
            <li>Aplicación EC2 — 📦 leer archivos desde S3.</li>
            <li>Todos los trabajadores — 🔐 acceso protegido.</li>
          </ul>
          <p>Los estudiantes deben diseñar:</p>
          <ol className="plain-list">
            <li>grupos;</li>
            <li>permisos;</li>
            <li>roles;</li>
            <li>MFA;</li>
            <li>buenas prácticas.</li>
          </ol>
        </section>

        <section className="lesson-section">
          <h3>18. Plantilla del estudiante</h3>
          <Nota><p>Les entregaría:</p></Nota>
          <InfoBox items={[
            'PERSONA / SERVICIO: _____________________',
            '¿USUARIO, GRUPO O ROL?: _____________________',
            '¿QUÉ NECESITA HACER?: _____________________',
            '¿QUÉ NO DEBERÍA PODER HACER?: _____________________',
            '¿NECESITA MFA?: _____________________',
            '¿APLICA MÍNIMO PRIVILEGIO?: _____________________',
          ]} />
        </section>

        <section className="lesson-section">
          <h3>19. Solución esperada</h3>
          <Reveal label="Ver una posible solución">
            <InfoBox title="👩 Camila" items={['Grupo: Marketing', 'Permisos: ver/subir imágenes', 'MFA: sí', 'No necesita: administrar servidores']} />
            <InfoBox title="👨 Pedro" items={['Grupo: Infraestructura', 'Permisos: administrar recursos necesarios', 'MFA: sí', 'No necesita: acceso financiero salvo necesidad']} />
            <InfoBox title="👨 Andrés" items={['Grupo: Finanzas', 'Permisos: consultar costos', 'MFA: sí', 'No necesita: administrar EC2']} />
            <InfoBox title="👩 Carolina" items={['Grupo: Auditoría', 'Permisos: lectura', 'MFA: sí', 'No necesita: modificar recursos']} />
            <InfoBox title="🖥️ Aplicación EC2" items={['Usuario: no necesariamente', 'Rol: 🎭 RolLecturaS3', 'Permiso: 📦 leer objetos necesarios']} />
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>20. El gerente vuelve</h3>
          <Nota><p>El gerente propone:</p></Nota>
          <Dialogo>"Administrador para todos. Así nunca tendrán problemas de permisos."</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque permisos excesivos aumentan el impacto de errores y cuentas comprometidas. Esto es lo que haría en su lugar: asignar permisos basados en la función y revisarlos periódicamente. El riesgo del enfoque del gerente es convertir cualquier cuenta comprometida en una puerta de entrada a gran parte de AWS.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>21. Detecta las 8 malas prácticas</h3>
          <Nota><p>Mostramos:</p></Nota>
          <ol className="plain-list">
            <li>Root se usa todos los días.</li>
            <li>Todos conocen su contraseña.</li>
            <li>MFA está desactivado.</li>
            <li>Todos tienen AdministratorAccess.</li>
            <li>Access Keys están en código.</li>
            <li>El repositorio es público.</li>
            <li>Nadie revisa permisos antiguos.</li>
            <li>EC2 usa credenciales permanentes.</li>
          </ol>
          <p>Los estudiantes deben corregirlas.</p>
        </section>

        <section className="lesson-section">
          <h3>22. Corrección</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Mala práctica</th><th>Mejora</th></tr></thead>
            <tbody>
              <tr><td>Root diario</td><td>Reservarlo</td></tr>
              <tr><td>Contraseña compartida</td><td>Identidades individuales</td></tr>
              <tr><td>Sin MFA</td><td>Activarlo</td></tr>
              <tr><td>Admin para todos</td><td>Mínimo privilegio</td></tr>
              <tr><td>Keys en código</td><td>Roles / gestión segura</td></tr>
              <tr><td>Keys públicas</td><td>Revocar inmediatamente</td></tr>
              <tr><td>Permisos antiguos</td><td>Revisar y retirar</td></tr>
              <tr><td>EC2 con keys</td><td>Rol IAM</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>23. Juego rápido: decide en 5 segundos</h3>
          <Nota><p>Lees un caso y deben responder.</p></Nota>
          <QaItem question="Caso 1 — Persona que trabaja diariamente." answer="👤 Usuario / identidad humana apropiada." />
          <QaItem question="Caso 2 — 20 personas de Marketing." answer="👥 Grupo." />
          <QaItem question="Caso 3 — EC2 necesita leer S3." answer="🎭 Rol." />
          <QaItem question="Caso 4 — ¿Qué puede hacer un usuario?" answer="📜 Política." />
          <QaItem question="Caso 5 — Segundo factor." answer="📱 MFA." />
          <QaItem question="Caso 6 — Solo lo necesario." answer="🎯 Mínimo privilegio." />
        </section>

        <section className="lesson-section">
          <h3>24. Evaluación final</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>25. Reto final del Módulo 2</h3>
          <Nota><p>La pregunta final será:</p></Nota>
          <Dialogo>"Diseña el acceso AWS de una pequeña empresa sin utilizar la palabra 'administrador' como solución." 😈</Dialogo>
          <p>Deben incluir:</p>
          <ul className="plain-list">
            <li>👤 personas;</li>
            <li>👥 grupos;</li>
            <li>🎭 al menos un rol;</li>
            <li>📜 permisos;</li>
            <li>📱 MFA;</li>
            <li>🎯 mínimo privilegio.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>26. Rúbrica</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Nivel</th><th>Resultado</th></tr></thead>
            <tbody>
              <tr><td>🟢 Logrado</td><td>Elige correctamente identidades, roles y permisos y justifica</td></tr>
              <tr><td>🟡 En proceso</td><td>Reconoce conceptos pero entrega permisos demasiado amplios</td></tr>
              <tr><td>🔴 Inicial</td><td>Propone cuentas compartidas, root o administrador para todos</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>27. Pregunta oral definitiva</h3>
          <Nota><p>Preguntaría:</p></Nota>
          <Dialogo>"¿Por qué no damos acceso administrador a todo el mundo?"</Dialogo>
          <Reveal label="Ver una buena respuesta">
            <Dialogo>"Porque cada identidad debería tener solamente los permisos necesarios. Si ocurre un error o la cuenta es comprometida, limitar los permisos reduce el impacto."</Dialogo>
          </Reveal>
          <p style={{ marginTop: 'var(--space-4)' }}>Si pueden explicar eso sin leer, IAM empezó a hacer clic.</p>
        </section>

        <section className="lesson-section">
          <h3>28. Mapa final del Módulo 2</h3>
          <RoleGrid roles={[
            { icon: 'user', label: 'Usuarios', desc: '' },
            { icon: 'users', label: 'Grupos', desc: '' },
            { icon: 'users', label: 'Roles', desc: '' },
          ]} />
          <Flow steps={[
            { icon: 'file-text', label: 'Políticas' },
            { icon: 'target', label: 'Mínimo privilegio' },
          ]} />
          <RoleGrid roles={[
            { icon: 'smartphone', label: 'MFA', desc: '' },
            { icon: 'key', label: 'Credenciales', desc: '' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>29. Ticket de salida</h3>
          <Nota><p>Cada estudiante completa:</p></Nota>
          <Dialogo>"Antes de entregar acceso en AWS, primero preguntaría ________, después ________ y finalmente ________."</Dialogo>
          <Reveal label="Ver una respuesta ideal">
            <p>Quién necesita acceso, qué necesita hacer y sobre qué recurso necesita hacerlo.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>30. Cierre del Módulo 2</h3>
          <Nota><p>Al terminar este módulo, el estudiante debería poder mirar una situación como:</p></Nota>
          <Flow steps={[
            { icon: 'user', label: 'Persona' },
            { icon: 'lock', label: 'IAM' },
            { icon: 'file-text', label: 'Permiso' },
            { icon: 'cloud', label: 'Recurso' },
          ]} />
          <p>y preguntarse automáticamente:</p>
          <ul className="plain-list">
            <li>¿Quién es?</li>
            <li>¿Qué necesita hacer?</li>
            <li>¿Necesita hacerlo siempre?</li>
            <li>¿Sobre qué recurso?</li>
            <li>¿Estoy entregando más permisos de los necesarios?</li>
          </ul>
          <Nota><p>Ese cambio de mentalidad es más importante que memorizar veinte nombres de políticas.</p></Nota>
        </section>

        <div className="bridge-callout">
          <ConceptBadge>Módulo 2 completado</ConceptBadge>
          <p style={{ marginTop: 'var(--space-3)' }}>El siguiente módulo ya puede cambiar bastante el ritmo.</p>
          <span className="tag tag-outline">Módulo 3 · próximamente</span>
        </div>

      </div>
    </div>
  );
}
