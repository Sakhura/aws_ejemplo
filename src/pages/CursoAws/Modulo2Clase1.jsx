import { Link } from 'react-router-dom';
import {
  Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, CompareCols, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_AUTENTICACION_AUTORIZACION = [
  { q: 'Caso 1 — Ingreso mi contraseña.', options: [{ text: '🪪 Autenticación', correct: true }, { text: '🎫 Autorización', correct: false }] },
  { q: 'Caso 2 — El sistema verifica si puedo eliminar un archivo.', options: [{ text: '🪪 Autenticación', correct: false }, { text: '🎫 Autorización', correct: true }] },
  { q: 'Caso 3 — Utilizo un segundo factor para entrar.', options: [{ text: '🪪 Autenticación', correct: true }, { text: '🎫 Autorización', correct: false }] },
  { q: 'Caso 4 — El sistema comprueba si puedo acceder a un servidor.', options: [{ text: '🪪 Autenticación', correct: false }, { text: '🎫 Autorización', correct: true }] },
  { q: 'Caso 5 — Comprueba quién soy.', options: [{ text: '🪪 Autenticación', correct: true }, { text: '🎫 Autorización', correct: false }] },
  { q: 'Caso 6 — Comprueba qué puedo hacer.', options: [{ text: '🪪 Autenticación', correct: false }, { text: '🎫 Autorización', correct: true }] },
];

const QUIZ_QUESTIONS = [
  {
    q: '¿Qué significa IAM?',
    options: [
      { text: 'Internet Access Machine', correct: false },
      { text: 'Identity and Access Management', correct: true },
      { text: 'Internal AWS Manager', correct: false },
      { text: 'Internet Account Mode', correct: false },
    ],
  },
  {
    q: '¿Qué pregunta responde la autenticación?',
    options: [
      { text: '¿Cuánto cuesta?', correct: false },
      { text: '¿Quién eres?', correct: true },
      { text: '¿Dónde está AWS?', correct: false },
      { text: '¿Qué archivo quieres?', correct: false },
    ],
  },
  {
    q: '¿Qué pregunta responde la autorización?',
    options: [
      { text: '¿Quién eres?', correct: false },
      { text: '¿Qué puedes hacer?', correct: true },
      { text: '¿Cuál es tu IP?', correct: false },
      { text: '¿Dónde vives?', correct: false },
    ],
  },
  {
    q: '¿Qué elemento describe permisos?',
    options: [
      { text: 'Política', correct: true },
      { text: 'Región', correct: false },
      { text: 'IP', correct: false },
      { text: 'Navegador', correct: false },
    ],
  },
  {
    q: '¿Qué es MFA?',
    options: [
      { text: 'Una base de datos.', correct: false },
      { text: 'Una segunda capa/factor de autenticación.', correct: true },
      { text: 'Un servidor.', correct: false },
      { text: 'Un almacenamiento.', correct: false },
    ],
  },
  {
    q: '¿Es recomendable compartir una misma identidad entre todos los trabajadores?',
    options: [
      { text: 'Sí.', correct: false },
      { text: 'No.', correct: true },
    ],
  },
];

export default function Modulo2Clase1() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 2 · Clase 1</div>
      <div className="lesson-eyebrow">🔐 AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 2 · Clase 1: Introducción a IAM, ¿quién puede entrar y qué puede hacer?</h2>
      <p className="lesson-subtitle">
        Las dos preguntas que resuelve IAM: quién eres (autenticación) y qué puedes hacer (autorización), antes de conocer usuarios, grupos, roles y políticas.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + actividades</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulos 0 y 1</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>🎯 1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar la clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es AWS IAM.</li>
            <li>Diferenciar autenticación y autorización.</li>
            <li>Comprender los conceptos de identidad, acceso y permiso.</li>
            <li>Reconocer por qué no todos deberían acceder a todo.</li>
            <li>Comprender de manera introductoria usuarios, grupos, roles y políticas.</li>
            <li>Reconocer la importancia de proteger las identidades.</li>
          </ul>
          <p>La frase que quiero que recuerden es:</p>
          <Dialogo>🔐 IAM ayuda a controlar quién puede acceder a AWS y qué puede hacer.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>🏢 2. Comencemos fuera de AWS</h3>
          <Nota><p>Yo empezaría la clase sin mencionar IAM. Imaginemos una empresa:</p></Nota>
          <ConceptBadge>🏢 CloudStore</ConceptBadge>
          <p>En ella trabajan:</p>
          <RoleGrid roles={[
            { emoji: '👩‍💼', label: 'Gerente', desc: '' },
            { emoji: '👨‍💻', label: 'Informático', desc: '' },
            { emoji: '👩‍🎨', label: 'Marketing', desc: '' },
            { emoji: '👨‍💰', label: 'Finanzas', desc: '' },
            { emoji: '👩‍💻', label: 'Desarrollo', desc: '' },
          ]} />
          <p>La empresa tiene distintas áreas:</p>
          <InfoBox title="🏢 CLOUDSTORE" items={['💰 Finanzas', '🖥️ Servidores', '📦 Archivos', '🗄️ Bases de datos', '👥 Administración']} />
          <p>Entonces preguntamos:</p>
          <Dialogo>¿Todos deberían poder entrar a todas partes y hacer cualquier cosa?</Dialogo>
          <p>❌ No.</p>
          <Nota><p>Aquí nace el problema que IAM intenta resolver.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>🔑 3. La analogía del edificio</h3>
          <Nota><p>Pensemos en un edificio corporativo. Cuando una persona llega, existen dos preguntas.</p></Nota>
          <p><strong>Pregunta 1</strong></p>
          <Dialogo>¿Quién eres? — 👩 "Soy Camila, trabajo en Marketing."</Dialogo>
          <p><strong>Pregunta 2</strong></p>
          <Dialogo>¿Qué tienes permitido hacer?</Dialogo>
          <p>Camila puede: ✅ entrar a Marketing, ✅ acceder a determinados recursos.</p>
          <p>Pero quizás: ❌ no puede entrar a la sala de servidores, ❌ no puede acceder a Finanzas.</p>
          <Nota><p>AWS necesita resolver exactamente esas dos preguntas.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>☁️ 4. Aparece IAM</h3>
          <Nota>
            <p>IAM significa: Identity and Access Management. En español: Gestión de Identidades y Accesos.</p>
          </Nota>
          <p>Es un servicio de AWS que permite administrar identidades y controlar su acceso a recursos de AWS. Pero para nuestros estudiantes:</p>
          <Dialogo>🔐 IAM es como el sistema de seguridad y control de acceso de AWS.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>🛂 5. El guardia de AWS</h3>
          <Nota><p>Podemos imaginar a IAM como un guardia.</p></Nota>
          <p>Llega Camila:</p>
          <Dialogo>👩 "Quiero entrar."</Dialogo>
          <p>IAM pregunta: 🪪 ¿Quién eres? Después: 🎫 ¿Qué tienes permitido hacer?</p>
          <p>Conceptualmente:</p>
          <Flow steps={[
            { emoji: '👩', label: 'Camila' },
            { emoji: '🔐', label: 'IAM', caption: '🪪 ¿Quién eres? · 🎫 ¿Qué puedes hacer?' },
          ]} />
          <p>Estas preguntas nos llevan a dos conceptos fundamentales.</p>
        </section>

        <section className="lesson-section">
          <h3>🪪 6. Autenticación</h3>
          <Nota><p>Autenticación significa comprobar una identidad.</p></Nota>
          <Dialogo>¿Quién eres?</Dialogo>
          <p>Ejemplo cotidiano: llegamos a un edificio. El guardia solicita 🪪 credencial. La presentamos. El sistema comprueba nuestra identidad.</p>
        </section>

        <section className="lesson-section">
          <h3>📱 7. Ya usamos autenticación diariamente</h3>
          <Nota><p>Cuando entramos a una aplicación utilizamos mecanismos como:</p></Nota>
          <ul className="plain-list">
            <li>👤 usuario</li>
            <li>🔑 contraseña</li>
            <li>📱 segundo factor</li>
            <li>👆 biometría</li>
          </ul>
          <p>El objetivo es comprobar:</p>
          <Dialogo>"Realmente eres quien dices ser."</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>🎫 8. Autorización</h3>
          <Nota><p>Después de saber quién eres aparece otra pregunta:</p></Nota>
          <Dialogo>¿Qué tienes permitido hacer?</Dialogo>
          <p>Eso es: 🎫 Autorización.</p>
          <p>Ejemplo: el guardia confirma "Sí, eres Camila." Pero eso no significa "Puedes entrar a cualquier habitación." Su credencial puede permitir ✅ Marketing pero no ❌ Finanzas, ❌ Sala de servidores.</p>
        </section>

        <section className="lesson-section">
          <h3>🧠 9. Diferencia fundamental</h3>
          <Nota><p>Esta tabla debería aparecer grande:</p></Nota>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Pregunta</th></tr></thead>
            <tbody>
              <tr><td>🪪 Autenticación</td><td>¿Quién eres?</td></tr>
              <tr><td>🎫 Autorización</td><td>¿Qué puedes hacer?</td></tr>
            </tbody>
          </table>
          <p>Una frase para memorizar:</p>
          <Dialogo>Primero comprobamos quién eres. Después comprobamos qué puedes hacer.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>🎉 10. Analogía de un concierto</h3>
          <Nota><p>Supongamos que vamos a un concierto. En la entrada mostramos: 🎟️ entrada, 🪪 identificación. El personal verifica nuestra identidad y entrada.</p></Nota>
          <CompareCols cols={[
            { emoji: '🪪', title: 'Autenticación', items: ['"Sí, esta persona corresponde."'] },
            { emoji: '🎫', title: 'Autorización', items: ['Nuestra entrada dice "Galería".', 'No podemos decidir "hoy quiero sentarme en VIP." 😎', 'Determina a qué zona tenemos acceso.'] },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>☁️ 11. Llevemos esto a AWS</h3>
          <Nota><p>Una persona intenta acceder.</p></Nota>
          <Flow steps={[
            { emoji: '👩', label: 'USUARIO' },
            { emoji: '🔐', label: 'IAM' },
            { emoji: '🪪', label: 'AUTENTICACIÓN', caption: '¿Quién eres?' },
            { emoji: '🎫', label: 'AUTORIZACIÓN', caption: '¿Qué puedes hacer?' },
            { emoji: '☁️', label: 'RECURSOS AWS' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>📦 12. Ejemplo sencillo</h3>
          <Nota><p>Camila trabaja con imágenes. Necesita: 👀 ver archivos, ⬆️ subir archivos. Pero no necesita: 🗑️ eliminar recursos importantes, 🖥️ administrar servidores, 💰 modificar facturación.</p></Nota>
          <Flow steps={[
            { emoji: '👩', label: 'CAMILA' },
            { emoji: '🔐', label: 'IAM' },
            { emoji: '🎫', label: 'PERMISOS', caption: '👀 Ver · ⬆️ Subir · ❌ No administrar servidores' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>🚨 13. ¿Por qué necesitamos IAM?</h3>
          <Nota><p>Imaginemos lo contrario.</p></Nota>
          <Flow steps={[
            { emoji: '☁️', label: 'AWS' },
            { emoji: '👥', label: 'TODOS' },
            { emoji: '👑', label: 'ACCESO A TODO' },
          ]} />
          <p>Cualquier persona podría: 🗑️ eliminar información, 🖥️ apagar servidores, 💰 modificar recursos, 🔐 cambiar configuraciones.</p>
          <p>Claramente tenemos un problema.</p>
        </section>

        <section className="lesson-section">
          <h3>🏠 14. Analogía de las llaves</h3>
          <Nota><p>Imaginemos nuestra casa. Tenemos: 🚪 puerta principal, 🚗 automóvil, 📦 bodega, 🔐 caja fuerte.</p></Nota>
          <Dialogo>¿Entregaríamos una llave maestra a 📦 repartidor?</Dialogo>
          <p>Probablemente no. Solo necesita dejar el paquete.</p>
          <Nota><p>En seguridad digital aplicamos una lógica parecida: cada persona debería tener el acceso necesario para su función.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>🧩 15. Las piezas principales de IAM</h3>
          <Nota><p>En esta clase solo las presentaría. Las estudiaremos después.</p></Nota>
          <RoleGrid roles={[
            { emoji: '👤', label: 'Usuarios', desc: '' },
            { emoji: '👥', label: 'Grupos', desc: '' },
            { emoji: '🎭', label: 'Roles', desc: '' },
            { emoji: '📜', label: 'Políticas', desc: '' },
          ]} />
          <p>Ahora expliquémoslas en una línea.</p>
        </section>

        <section className="lesson-section">
          <h3>👤 16. Usuario</h3>
          <Dialogo>Una identidad individual administrada mediante IAM.</Dialogo>
          <p>Ejemplo: 👤 Camila.</p>
          <p className="text-muted" style={{ fontSize: 12.5 }}>No profundizamos todavía. Eso corresponde a la Clase 2.</p>
        </section>

        <section className="lesson-section">
          <h3>👥 17. Grupo</h3>
          <Dialogo>Un conjunto de usuarios con necesidades de permisos similares.</Dialogo>
          <InfoBox title="👥 MARKETING" items={['👩 Camila', '👨 Pedro', '👩 Andrea']} />
          <p className="text-muted" style={{ fontSize: 12.5 }}>También lo veremos en la Clase 2.</p>
        </section>

        <section className="lesson-section">
          <h3>🎭 18. Rol</h3>
          <Nota><p>Los roles suelen ser más difíciles al principio. Los explicaría como:</p></Nota>
          <Dialogo>Una identidad con permisos que puede ser asumida temporalmente por quien esté autorizado.</Dialogo>
          <p>Analogía: 👩 Ana normalmente es profesora. Pero durante una actividad cumple temporalmente el rol: 🎭 Coordinadora. Mientras ejerce ese rol obtiene determinadas capacidades.</p>
          <Nota><p>No profundizaría todavía en trust policies, STS ni AssumeRole. Todavía no necesitamos abrir esa caja de duendes. 📦</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>📜 19. Política</h3>
          <Nota><p>Una política describe permisos. Responde preguntas como:</p></Nota>
          <Dialogo>¿Qué está permitido hacer?</Dialogo>
          <InfoBox title="📜 POLÍTICA MARKETING" items={['✅ Ver imágenes', '✅ Subir imágenes', '❌ Eliminar imágenes']} />
          <Nota><p>En la Clase 3 entraremos profundamente en políticas. Y recién después aparecerá JSON.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>🧠 20. Nuestro primer mapa IAM</h3>
          <Flow steps={[
            { emoji: '👩', label: 'PERSONA' },
            { emoji: '🪪', label: 'AUTENTICACIÓN', caption: '"¿Quién eres?"' },
            { emoji: '🔐', label: 'IAM' },
            { emoji: '🎫', label: 'AUTORIZACIÓN', caption: '"¿Qué puedes hacer?"' },
            { emoji: '☁️', label: 'RECURSO AWS' },
          ]} />
          <p>Este esquema vale oro para esta clase.</p>
        </section>

        <section className="lesson-section">
          <h3>👑 21. Una identidad especial: Root</h3>
          <Nota><p>Cuando se crea una cuenta AWS existe una identidad especialmente poderosa:</p></Nota>
          <ConceptBadge variant="warning">👑 Root user</ConceptBadge>
          <p>Tiene acceso completo a la cuenta.</p>
          <p>La analogía: la llave maestra del edificio.</p>
        </section>

        <section className="lesson-section">
          <h3>🔑 22. ¿Usamos la llave maestra todos los días?</h3>
          <Nota><p>No.</p></Nota>
          <Dialogo>Si necesitamos abrir solamente nuestra oficina, ¿para qué caminar todo el día con una llave capaz de abrir absolutamente todo?</Dialogo>
          <Nota><p>El usuario root debe reservarse para las tareas que realmente requieren esa identidad y protegerse especialmente.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>📱 23. Segunda barrera: MFA</h3>
          <Nota><p>Presentaría también:</p></Nota>
          <ConceptBadge>MFA — Multi-Factor Authentication (autenticación multifactor)</ConceptBadge>
          <p>La idea: 🔑 algo que conoces (contraseña) + 📱 otra comprobación (segundo factor).</p>
        </section>

        <section className="lesson-section">
          <h3>🏦 24. Ejemplo cotidiano de MFA</h3>
          <Nota><p>Supongamos que alguien descubre nuestra contraseña.</p></Nota>
          <CompareCols cols={[
            { emoji: '🚨', title: 'Sin MFA', items: ['🔑 Contraseña robada', '↓', '🚨 Acceso potencial'] },
            { emoji: '🔐', title: 'Con MFA', items: ['🔑 Contraseña + 📱 Segundo factor', '↓', '🔐 Mayor protección'] },
          ]} />
          <Nota><p>MFA no hace una cuenta invulnerable, pero agrega una barrera de seguridad importante.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>🎮 25. Actividad: autenticación o autorización</h3>
          <Nota><p>Los estudiantes deben decir "Autenticación" o "Autorización" para cada caso.</p></Nota>
          <Quiz questions={QUIZ_AUTENTICACION_AUTORIZACION} />
        </section>

        <section className="lesson-section">
          <h3>🧪 26. Actividad: el edificio AWS</h3>
          <Nota><p>Dibujamos:</p></Nota>
          <InfoBox title="🏢 EDIFICIO AWS" items={['🚪 Recepción', '📦 Bodega', '🖥️ Sala servidores', '💰 Finanzas', '🔐 Seguridad']} />
          <p>Tenemos: 👩 Camila → Marketing, 👨 Andrés → Finanzas, 👩 Daniela → Informática.</p>
          <QaItem question="¿Deberían tener todos acceso a las mismas habitaciones?" answer="No." />
          <QaItem question="¿Qué necesitamos saber antes de dejarlos entrar?" answer="1. ¿Quién eres? — 2. ¿Qué puedes hacer? Acaban de explicar IAM." />
        </section>

        <section className="lesson-section">
          <h3>😈 27. El jefe propone una solución</h3>
          <Nota><p>El jefe dice:</p></Nota>
          <Dialogo>"Para simplificar, hagamos una cuenta AWS y compartamos usuario y contraseña entre todos."</Dialogo>
          <ConceptBadge variant="danger">❌ Mala idea</ConceptBadge>
          <Nota>
            <p>No estoy de acuerdo porque perderíamos separación entre identidades, control de accesos y trazabilidad. Esto es lo que haría en su lugar: utilizar identidades apropiadas y asignar permisos según las funciones. El riesgo de compartir credenciales es que un error o compromiso de esa cuenta puede afectar a todos y dificultar saber quién realizó cada acción.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>🔎 28. ¿Por qué importa saber quién hizo algo?</h3>
          <Nota><p>Imaginemos que alguien 🗑️ elimina un recurso. Necesitamos poder investigar:</p></Nota>
          <Dialogo>¿Quién realizó la acción?</Dialogo>
          <p>Si todos utilizan la misma identidad: 🤷 Se vuelve mucho más difícil atribuir acciones correctamente.</p>
        </section>

        <section className="lesson-section">
          <h3>🛡️ 29. IAM no es solamente "poner contraseñas"</h3>
          <Nota><p>Este error conceptual hay que eliminarlo. IAM se relaciona con:</p></Nota>
          <ul className="plain-list">
            <li>👤 identidades</li>
            <li>🔐 autenticación</li>
            <li>🎫 autorización</li>
            <li>📜 permisos</li>
            <li>🎭 roles</li>
            <li>👥 organización del acceso</li>
          </ul>
          <p>Por eso: IAM administra quién puede acceder y qué puede hacer dentro de AWS.</p>
        </section>

        <section className="lesson-section">
          <h3>📝 30. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>🏆 31. Reto de la clase</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge>🏥 Clínica Cloud</ConceptBadge>
          <p>Tenemos: 👩‍⚕️ Doctora Ana, 👨‍💰 Carlos de Finanzas, 👩‍💻 Daniela de TI. La clínica utiliza recursos en AWS.</p>
          <p>Ana intenta acceder. El sistema pregunta: ¿Quién eres?</p>
          <QaItem question="Pregunta 1 — ¿Estamos hablando de autenticación o autorización?" answer="✅ Autenticación" />
          <p>Luego AWS sabe que es Ana. Ahora pregunta: ¿Ana tiene permiso para realizar esta acción?</p>
          <QaItem question="Pregunta 2 — ¿Autenticación o autorización?" answer="✅ Autorización" />
          <QaItem question="Finalmente: ¿deberían Ana, Carlos y Daniela tener exactamente los mismos permisos?" answer="❌ No." />
          <Nota><p>Cada uno debería tener acceso acorde a sus necesidades.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>🧠 32. Reto oral</h3>
          <Nota><p>La verdadera prueba será:</p></Nota>
          <Dialogo>"Explícame IAM sin utilizar las palabras IAM, identidad, autenticación, autorización ni política." 😈</Dialogo>
          <Reveal label="Ver una respuesta excelente">
            <Dialogo>"Es como el guardia de un edificio: primero comprueba quién eres y después revisa qué lugares y acciones tienes permitidos."</Dialogo>
          </Reveal>
          <p style={{ marginTop: 'var(--space-4)' }}>Si llegan a eso, entendieron.</p>
        </section>

        <section className="lesson-section">
          <h3>📌 33. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Pregunta sencilla</th></tr></thead>
            <tbody>
              <tr><td>🔐 IAM</td><td>¿Quién entra y qué puede hacer?</td></tr>
              <tr><td>🪪 Autenticación</td><td>¿Quién eres?</td></tr>
              <tr><td>🎫 Autorización</td><td>¿Qué puedes hacer?</td></tr>
              <tr><td>👤 Usuario</td><td>Una identidad individual</td></tr>
              <tr><td>👥 Grupo</td><td>Usuarios con necesidades similares</td></tr>
              <tr><td>🎭 Rol</td><td>Identidad asumible con permisos</td></tr>
              <tr><td>📜 Política</td><td>Define permisos</td></tr>
              <tr><td>👑 Root</td><td>Identidad principal de la cuenta</td></tr>
              <tr><td>📱 MFA</td><td>Verificación adicional</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>🎟️ 34. Ticket de salida</h3>
          <Nota><p>Cada estudiante responde en una sola frase:</p></Nota>
          <Dialogo>¿Cuál es la diferencia entre autenticación y autorización?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Autenticación comprueba quién soy; autorización determina qué puedo hacer.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow">🔗 Puente hacia la Clase 2</div>
          <Nota><p>Terminaría mostrando:</p></Nota>
          <Flow steps={[
            { emoji: '🔐', label: 'IAM' },
            { emoji: '👤', label: 'USUARIO' },
            { emoji: '👥', label: 'GRUPO' },
            { emoji: '🎫', label: 'ACCESO' },
          ]} />
          <p>Y preguntaría:</p>
          <Dialogo>"Si tenemos 100 trabajadores, ¿vamos a configurar todo uno por uno?"</Dialogo>
          <p>Ahí queda servido el siguiente problema.</p>
          <Link to="/aprendizaje/aws-desde-cero/modulo-2/clase-2" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 2: Usuarios, grupos y mínimo privilegio →
          </Link>
        </div>

      </div>
    </div>
  );
}
