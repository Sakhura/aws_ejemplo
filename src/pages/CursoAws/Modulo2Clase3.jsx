import { Link } from 'react-router-dom';
import {
  Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, CompareCols, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const POLICY_JSON_SIMPLE = `{
  "Effect": "Allow",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::imagenes-marketing/*"
}`;

const POLICY_JSON_FULL = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::imagenes-marketing/*"
    }
  ]
}`;

const POLICY_JSON_GIGANTE = `{
  "Effect": "Allow",
  "Action": "*",
  "Resource": "*"
}`;

const POLICY_JSON_RETO = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::materiales-curso/*"
    }
  ]
}`;

const QUIZ_SEGURO_RIESGOSO = [
  { q: 'Marketing puede visualizar sus imágenes.', options: [{ text: '🟢 Seguro/razonable', correct: true }, { text: '🔴 Riesgoso', correct: false }] },
  { q: 'Marketing tiene acceso administrador completo sin necesitarlo.', options: [{ text: '🟢 Seguro/razonable', correct: false }, { text: '🔴 Riesgoso', correct: true }] },
  { q: 'Finanzas puede consultar los recursos necesarios para su función.', options: [{ text: '🟢 Seguro/razonable', correct: true }, { text: '🔴 Riesgoso', correct: false }] },
  { q: 'Todos los empleados tienen Action: * y Resource: *.', options: [{ text: '🟢 Seguro/razonable', correct: false }, { text: '🔴 Riesgoso', correct: true }] },
  { q: 'Un usuario recibe solamente los permisos necesarios.', options: [{ text: '🟢 Seguro/razonable', correct: true }, { text: '🔴 Riesgoso', correct: false }] },
];

const QUIZ_QUESTIONS = [
  { q: '¿Qué hace una política IAM?', options: [{ text: 'Define permisos.', correct: true }, { text: 'Crea Internet.', correct: false }, { text: 'Crea una Región.', correct: false }, { text: 'Guarda fotografías.', correct: false }] },
  { q: '¿Qué significa Allow?', options: [{ text: 'Eliminar.', correct: false }, { text: 'Permitir.', correct: true }, { text: 'Usuario.', correct: false }, { text: 'Servidor.', correct: false }] },
  { q: '¿Qué significa Deny?', options: [{ text: 'Permitir.', correct: false }, { text: 'Copiar.', correct: false }, { text: 'Denegar.', correct: true }, { text: 'Descargar.', correct: false }] },
  { q: '¿Qué indica Action?', options: [{ text: 'Qué operación se puede realizar.', correct: true }, { text: 'Quién creó AWS.', correct: false }, { text: 'La contraseña.', correct: false }, { text: 'La Región.', correct: false }] },
  { q: '¿Qué indica Resource?', options: [{ text: 'Sobre qué recurso se aplica la acción.', correct: true }, { text: 'El usuario.', correct: false }, { text: 'La contraseña.', correct: false }, { text: 'Internet.', correct: false }] },
  { q: 'Si una acción no está permitida por ninguna política aplicable, ¿se puede realizar?', options: [{ text: 'Sí.', correct: false }, { text: 'No, normalmente queda implícitamente denegada.', correct: true }] },
  { q: '¿Qué tiene prioridad frente a un Allow cuando ambos aplican?', options: [{ text: 'Un Deny explícito.', correct: true }, { text: 'El usuario más antiguo.', correct: false }, { text: 'El grupo con más miembros.', correct: false }, { text: 'La contraseña.', correct: false }] },
];

export default function Modulo2Clase3() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 2 · Clase 3</div>
      <div className="lesson-eyebrow">🔐 AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 2 · Clase 3: Políticas IAM, las reglas de acceso</h2>
      <p className="lesson-subtitle">
        Cómo le decimos a AWS exactamente qué puede hacer un usuario o grupo, leyendo nuestra primera política en JSON sin que dé miedo.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + práctica guiada</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 2, Clases 1 y 2</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>🎯 1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es una política IAM.</li>
            <li>Comprender qué significa permitir y denegar.</li>
            <li>Reconocer los elementos básicos de una política.</li>
            <li>Relacionar políticas con usuarios, grupos y roles.</li>
            <li>Comprender el principio de mínimo privilegio al crear permisos.</li>
            <li>Leer una política IAM sencilla.</li>
            <li>Reconocer por primera vez la estructura básica de una política JSON.</li>
          </ul>
          <p>La frase que debe sobrevivir:</p>
          <Dialogo>📜 Una política IAM define qué acciones están permitidas o denegadas sobre determinados recursos.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>🧠 2. Recordemos dónde quedamos</h3>
          <Nota><p>Ya conocemos:</p></Nota>
          <Flow steps={[
            { emoji: '👩', label: 'Camila' },
            { emoji: '👥', label: 'Marketing' },
          ]} />
          <p>Sabemos 👤 quién es Camila. Sabemos 👥 a qué grupo pertenece. Pero nos falta algo.</p>
          <Dialogo>¿Cómo sabe AWS qué puede hacer Marketing?</Dialogo>
          <p>Aquí aparece:</p>
          <ConceptBadge>📜 POLÍTICA IAM</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>🏢 3. Volvamos al edificio</h3>
          <Nota><p>Imaginemos nuevamente nuestra empresa. Tenemos: 👩 Camila → Marketing.</p></Nota>
          <InfoBox title="CAMILA · Marketing" items={['✅ Entrar a oficina Marketing', '✅ Ver material publicitario', '❌ Entrar a Finanzas', '❌ Entrar a sala de servidores']} />
          <Nota><p>Esas reglas conceptualmente cumplen una función parecida a una política. Le dicen al sistema qué está permitido y qué no.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>📜 4. ¿Qué es una política IAM?</h3>
          <Nota><p>Una política IAM es un documento que define permisos.</p></Nota>
          <Dialogo>Es una lista de reglas que AWS utiliza para decidir qué acciones pueden realizarse sobre determinados recursos.</Dialogo>
          <InfoBox title="📜 POLÍTICA MARKETING" items={['Puede: ✅ ver imágenes, ✅ subir imágenes', 'No necesita: ❌ administrar servidores, ❌ modificar bases de datos']} />
        </section>

        <section className="lesson-section">
          <h3>🎫 5. Usuario y política no son lo mismo</h3>
          <Nota><p>Este punto es fundamental.</p></Nota>
          <CompareCols cols={[
            { emoji: '👤', title: 'Usuario', items: ['Responde: ¿Quién?'] },
            { emoji: '📜', title: 'Política', items: ['Ayuda a responder: ¿Qué puede hacer?'] },
          ]} />
          <Flow steps={[
            { emoji: '👩', label: 'CAMILA' },
            { emoji: '📜', label: 'POLÍTICA' },
            { emoji: '📦', label: 'RECURSO' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>👥 6. También podemos utilizar políticas con grupos</h3>
          <Nota><p>Recordemos nuestro grupo:</p></Nota>
          <InfoBox title="👥 MARKETING" items={['👩 Camila', '👨 Juan', '👩 Andrea']} />
          <p>Todos necesitan permisos similares. Podemos asociar permisos al grupo:</p>
          <Flow steps={[
            { emoji: '👥', label: 'MARKETING' },
            { emoji: '📜', label: 'Política Marketing', caption: '✅ Ver · ✅ Subir' },
          ]} />
          <Nota><p>Así evitamos repetir configuraciones para cada usuario.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>🎭 7. ¿Y los roles?</h3>
          <Nota><p>Las políticas también pueden asociarse a roles. Por ahora:</p></Nota>
          <Flow steps={[
            { emoji: '🎭', label: 'ROL' },
            { emoji: '📜', label: 'POLÍTICA' },
            { emoji: '🎫', label: 'PERMISOS' },
          ]} />
          <p>No necesitamos profundizar todavía. Lo importante es comprender: las políticas son una pieza fundamental para expresar permisos en IAM.</p>
        </section>

        <section className="lesson-section">
          <h3>🚦 8. El semáforo de IAM</h3>
          <Nota><p>Ahora introduciría dos palabras:</p></Nota>
          <CompareCols cols={[
            { emoji: '🟢', title: 'ALLOW', items: ['Significa: Permitir'] },
            { emoji: '🔴', title: 'DENY', items: ['Significa: Denegar'] },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>🚪 9. Analogía de una puerta</h3>
          <Nota><p>Tenemos a 👩 Camila que quiere entrar a 📦 Recursos Marketing. El sistema revisa las reglas.</p></Nota>
          <Flow steps={[
            { emoji: '👩', label: 'Camila' },
            { emoji: '📜', label: 'Política' },
            { emoji: '🟢', label: 'PERMITIDO', caption: 'Puede continuar.' },
          ]} />
          <p>Pero si intenta 🖥️ administrar servidores y no tiene permiso:</p>
          <Flow steps={[
            { emoji: '👩', label: 'Camila' },
            { emoji: '📜', label: 'Permisos' },
            { emoji: '🚫', label: 'SIN PERMISO', caption: 'La acción no se autoriza.' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>⚠️ 10. Una regla importantísima de AWS</h3>
          <Nota><p>Aquí introduciría:</p></Nota>
          <ConceptBadge variant="warning">🚫 Denegación implícita</ConceptBadge>
          <p>En AWS, de manera general:</p>
          <Dialogo>Si no existe un permiso que autorice una acción, esa acción está denegada.</Dialogo>
          <p>Esto es muy importante. No funciona como "si nadie dijo que no, entonces puedo." Funciona más parecido a:</p>
          <Dialogo>"Si nadie te dio permiso, no puedes."</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>🏨 11. Analogía del hotel</h3>
          <Nota><p>Llegamos a un hotel. Nuestra tarjeta permite ✅ Habitación 302. Intentamos abrir 🚪 Habitación 401. La tarjeta no tiene permiso.</p></Nota>
          <p>No necesitamos una regla escrita diciendo "Camila tiene prohibido entrar a la 401." Simplemente: no tiene autorización para entrar.</p>
        </section>

        <section className="lesson-section">
          <h3>🔴 12. ¿Entonces para qué existe DENY?</h3>
          <Nota><p>Porque AWS también permite establecer una denegación explícita. Podemos tener una regla que diga directamente: 🚫 esta acción está denegada.</p></Nota>
          <p>Y aquí aparece una regla muy importante:</p>
          <ConceptBadge variant="danger">🔴 Un DENY explícito tiene prioridad sobre un ALLOW.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>🎮 13. Analogía sencilla</h3>
          <Nota><p>Tenemos una persona con una tarjeta: 🟢 puede entrar al edificio. Pero existe otra regla: 🔴 no puede entrar a la sala de servidores.</p></Nota>
          <p>🏢 edificio → ✅ · 🖥️ sala servidores → ❌</p>
          <Nota><p>El permiso general no elimina la prohibición específica.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>🧠 14. Las tres preguntas de una política</h3>
          <Nota><p>Antes de mostrar JSON, enseñaría a leer una política respondiendo tres preguntas:</p></Nota>
          <ol className="plain-list">
            <li>🎬 ¿Qué acción? — ¿Qué quiere hacer?</li>
            <li>📦 ¿Sobre qué recurso? — ¿Dónde quiere hacerlo?</li>
            <li>🚦 ¿Está permitido o denegado? — ¿ALLOW o DENY?</li>
          </ol>
        </section>

        <section className="lesson-section">
          <h3>🛒 15. Ejemplo CloudStore</h3>
          <p>Camila trabaja en Marketing. Necesita: ver las imágenes de productos.</p>
          <QaItem question="🎬 Acción" answer="Ver." />
          <QaItem question="📦 Recurso" answer="Imágenes de productos." />
          <QaItem question="🚦 Decisión" answer="Permitir." />
          <p>Nuestra política humana sería:</p>
          <ConceptBadge>🟢 Permitir a Camila visualizar las imágenes de productos.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>📤 16. Agreguemos otra acción</h3>
          <p>Camila también necesita: subir imágenes. Entonces tenemos:</p>
          <InfoBox title="📜 POLÍTICA MARKETING" items={['🟢 Permitir — 👀 Ver imágenes', '🟢 Permitir — ⬆️ Subir imágenes']} />
        </section>

        <section className="lesson-section">
          <h3>🚫 17. Lo que Camila no necesita</h3>
          <Nota><p>Camila no necesita: 🖥️ eliminar servidores.</p></Nota>
          <Dialogo>¿Le damos ese permiso?</Dialogo>
          <p>❌ No. Recordemos: mínimo privilegio. Solo entregamos los permisos necesarios para realizar su trabajo.</p>
        </section>

        <section className="lesson-section">
          <h3>🎯 18. El corazón de una política</h3>
          <Nota><p>Ahora podemos introducir tres palabras reales que posteriormente encontrarán en AWS. No las memoricen todavía, las traducimos:</p></Nota>
          <table className="table lesson-summary-table">
            <thead><tr><th>AWS</th><th>Nosotros preguntamos</th></tr></thead>
            <tbody>
              <tr><td>Effect</td><td>🚦 ¿Permitir o denegar?</td></tr>
              <tr><td>Action</td><td>🎬 ¿Qué puede hacer?</td></tr>
              <tr><td>Resource</td><td>📦 ¿Sobre qué?</td></tr>
            </tbody>
          </table>
          <p>Eso ya parece bastante menos monstruoso.</p>
        </section>

        <section className="lesson-section">
          <h3>🗣️ 19. Construyamos una política en español</h3>
          <Nota><p>Queremos decir: permitir ver objetos almacenados en un lugar determinado.</p></Nota>
          <p>Primero, Effect: 🟢 Permitir. Después, Action: 👀 Leer. Finalmente, Resource: 📦 los objetos correspondientes.</p>
          <ConceptBadge>EFECTO: Permitir · ACCIÓN: Leer · RECURSO: Archivos de Marketing</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>👀 20. Ahora sí: nuestro primer JSON</h3>
          <Nota><p>Recién aquí mostraría algo parecido a lo que encontrarán realmente:</p></Nota>
          <pre className="codeblock">{POLICY_JSON_SIMPLE}</pre>
          <p>Y me detendría. No explicaría ARN todavía. No explicaría sintaxis JSON profundamente. No explicaría comodines en profundidad.</p>
          <Dialogo>¿Reconocen alguna palabra?</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>🔍 21. Traduzcamos el monstruo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Línea del JSON</th><th>Para nuestro nivel</th></tr></thead>
            <tbody>
              <tr><td className="mono">"Effect": "Allow"</td><td>🟢 Permitir</td></tr>
              <tr><td className="mono">"Action": "s3:GetObject"</td><td>👀 Obtener/leer un objeto de S3</td></tr>
              <tr><td className="mono">"Resource": "...imagenes-marketing/*"</td><td>📦 Los objetos dentro del recurso indicado</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>🧠 22. Entonces el JSON decía...</h3>
          <p>En español sencillo:</p>
          <Dialogo>"Permitir leer los objetos almacenados en este recurso de S3."</Dialogo>
          <p>Y listo. 🎉 Acabamos de leer nuestra primera política.</p>
        </section>

        <section className="lesson-section">
          <h3>📜 23. Una política real tiene una estructura</h3>
          <Nota><p>Ahora podemos mostrar una versión más completa:</p></Nota>
          <pre className="codeblock">{POLICY_JSON_FULL}</pre>
          <Nota><p>En esta clase no necesitamos memorizarla. Solo reconocer:</p></Nota>
          <Flow steps={[
            { emoji: '📜', label: 'Política' },
            { emoji: '📋', label: 'Statement', caption: 'Effect · Action · Resource' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>📅 24. ¿Por qué dice 2012?</h3>
          <Nota><p>Esta pregunta aparecerá casi seguro.</p></Nota>
          <p className="mono" style={{ fontSize: 14 }}>"Version": "2012-10-17"</p>
          <p>No significa "esta política fue creada en 2012."</p>
          <Nota><p>Indica la versión del lenguaje de políticas que utiliza el documento. Por eso aunque estemos en 2026, podemos seguir viendo 2012-10-17. No hay una máquina del tiempo escondida en IAM. ⏳</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>🧱 25. ¿Qué es Statement?</h3>
          <Nota><p>Statement contiene una o más declaraciones de permisos. Podemos pensarlo como "aquí están mis reglas."</p></Nota>
          <InfoBox title="📜 POLÍTICA" items={['REGLA 1 — ✅ Puede leer', 'REGLA 2 — ✅ Puede subir', 'REGLA 3 — 🚫 No puede eliminar']} />
          <p>Una política puede contener varias reglas.</p>
        </section>

        <section className="lesson-section">
          <h3>🎮 26. Juego: traduce la política</h3>
          <Nota><p>Mostraría:</p></Nota>
          <QaItem question="Effect: Allow — Action: Ver — Resource: Fotografías. ¿Qué significa?" answer="Permitir ver fotografías." />
          <QaItem question="Effect: Deny — Action: Eliminar — Resource: Fotografías. ¿Qué significa?" answer="Denegar la eliminación de fotografías." />
        </section>

        <section className="lesson-section">
          <h3>😈 27. El comodín</h3>
          <Nota><p>Ahora mostramos:</p></Nota>
          <ConceptBadge>*</ConceptBadge>
          <p>En muchas políticas AWS aparecerá el asterisco como comodín. Para nuestro nivel: puede representar "todos" dentro del contexto correspondiente.</p>
          <p>Ejemplo conceptual: <code className="mono">Action: *</code> puede representar muchas/todas las acciones aplicables.</p>
          <p>🚨 Y aquí deberían comenzar a sonar alarmas.</p>
        </section>

        <section className="lesson-section">
          <h3>👑 28. El permiso gigantesco</h3>
          <Nota><p>Mostramos:</p></Nota>
          <pre className="codeblock">{POLICY_JSON_GIGANTE}</pre>
          <Dialogo>¿Qué creen que significa?</Dialogo>
          <p>Simplificando: 🟢 permitir 🎬 todas las acciones 📦 sobre todos los recursos. Es un permiso extremadamente amplio.</p>
        </section>

        <section className="lesson-section">
          <h3>🚨 29. ¿Se lo damos a todos?</h3>
          <p>❌ No.</p>
          <Nota>
            <p>No estoy de acuerdo porque contradice el principio de mínimo privilegio. Esto es lo que haría en su lugar: definir solamente las acciones y recursos necesarios. El riesgo de utilizar permisos excesivamente amplios es aumentar enormemente el daño potencial de un error o de una identidad comprometida.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>✂️ 30. De enorme a específico</h3>
          <CompareCols cols={[
            { emoji: '🚨', title: 'Muy amplio', items: ['Permitir TODO sobre TODO'] },
            { emoji: '🛡️', title: 'Más específico', items: ['Permitir LEER sobre IMÁGENES DE MARKETING'] },
          ]} />
          <p>La segunda opción limita considerablemente lo que puede hacerse.</p>
        </section>

        <section className="lesson-section">
          <h3>🔐 31. Volvemos al mínimo privilegio</h3>
          <Nota><p>Ahora las Clases 2 y 3 se conectan.</p></Nota>
          <Flow steps={[
            { emoji: '🔐', label: 'MÍNIMO PRIVILEGIO' },
            { emoji: '📜', label: 'POLÍTICAS' },
            { emoji: '✅', label: 'Solo permisos necesarios' },
          ]} />
          <p>No damos "todo por si acaso". Damos lo necesario para realizar la tarea.</p>
        </section>

        <section className="lesson-section">
          <h3>🧪 32. Actividad: construye una política humana</h3>
          <Nota><p>Antes de escribir código, entregamos tres tarjetas:</p></Nota>
          <RoleGrid roles={[
            { emoji: '🚦', label: 'EFFECT', desc: 'Allow / Deny' },
            { emoji: '🎬', label: 'ACTION', desc: 'Ver / Subir / Eliminar' },
            { emoji: '📦', label: 'RESOURCE', desc: 'Imágenes / Documentos / Servidores' },
          ]} />
          <p>Los estudiantes deben construir reglas. Por ejemplo: Camila necesita ver imágenes.</p>
          <ConceptBadge>Effect: ALLOW · Action: VER · Resource: IMÁGENES</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>🏥 33. Caso Clínica Cloud</h3>
          <Nota><p>Tenemos: 👩‍⚕️ Ana. Necesita consultar determinados documentos. No necesita eliminarlos.</p></Nota>
          <InfoBox title="Construimos" items={['🟢 ALLOW — 👀 VER — 📄 DOCUMENTOS']} />
          <p>No agregamos: <span className="text-muted">🟢 ALLOW — 🗑️ ELIMINAR — 📄 DOCUMENTOS</span></p>
          <QaItem question="¿Por qué?" answer="No lo necesita. Mínimo privilegio." />
        </section>

        <section className="lesson-section">
          <h3>🎮 34. Actividad: ¿seguro o peligroso?</h3>
          <Nota><p>Los estudiantes muestran 🟢 SEGURO/RAZONABLE o 🔴 RIESGOSO según el contexto.</p></Nota>
          <Quiz questions={QUIZ_SEGURO_RIESGOSO} />
        </section>

        <section className="lesson-section">
          <h3>📝 35. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>🏆 36. Reto de la clase</h3>
          <Nota><p>Nuestra empresa:</p></Nota>
          <ConceptBadge>🛍️ CloudShop</ConceptBadge>
          <p>tiene un grupo 👥 Marketing. Sus trabajadores necesitan: ✅ visualizar imágenes de productos, ✅ subir imágenes nuevas. ❌ no necesitan eliminar imágenes, ❌ no necesitan administrar servidores.</p>
          <p>Los estudiantes deben diseñar una política humana.</p>
          <Reveal label="Ver solución esperada">
            <InfoBox title="📜 POLÍTICA MARKETING" items={['EFFECT: 🟢 Permitir', 'ACTIONS: 👀 Ver imágenes · ⬆️ Subir imágenes', 'RESOURCE: 📦 Imágenes de productos']} />
            <p style={{ marginTop: 'var(--space-3)' }}>Y deben justificar: no entregamos permisos para servidores porque Marketing no los necesita.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>🔥 37. Reto nivel 2</h3>
          <Nota><p>Ahora les mostramos:</p></Nota>
          <pre className="codeblock">{POLICY_JSON_GIGANTE}</pre>
          <QaItem question="El usuario solamente necesita visualizar imágenes. ¿Qué está mal?" answer="Tiene muchos más permisos de los necesarios." />
          <QaItem question="¿Qué principio estamos incumpliendo?" answer="🔐 Mínimo privilegio." />
        </section>

        <section className="lesson-section">
          <h3>🧠 38. Reto final: lee tu primera política</h3>
          <Nota><p>Presentamos:</p></Nota>
          <pre className="codeblock">{POLICY_JSON_RETO}</pre>
          <p>Sin buscar nada, deben responder:</p>
          <QaItem question="¿Permite o deniega?" answer="🟢 Permite." />
          <QaItem question="¿Qué acción aparece?" answer="GetObject" />
          <QaItem question="¿Con qué servicio se relaciona?" answer="Amazon S3." />
          <QaItem question="¿Qué recurso aparece?" answer="Los objetos del recurso materiales-curso." />
          <QaItem question={'¿Es Action: "*"?'} answer="No." />
          <p>🎉 Acaban de interpretar una política básica.</p>
        </section>

        <section className="lesson-section">
          <h3>📌 39. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Elemento</th><th>Pregunta</th></tr></thead>
            <tbody>
              <tr><td>📜 Policy</td><td>¿Cuáles son las reglas?</td></tr>
              <tr><td>Statement</td><td>¿Qué declaraciones contiene?</td></tr>
              <tr><td>Effect</td><td>¿Permitir o denegar?</td></tr>
              <tr><td>Action</td><td>¿Qué acción?</td></tr>
              <tr><td>Resource</td><td>¿Sobre qué recurso?</td></tr>
              <tr><td>Allow</td><td>🟢 Permitir</td></tr>
              <tr><td>Deny</td><td>🔴 Denegar</td></tr>
              <tr><td>*</td><td>Comodín, puede ampliar mucho el alcance</td></tr>
              <tr><td>🔐 Mínimo privilegio</td><td>Solo lo necesario</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>🎟️ 40. Ticket de salida</h3>
          <Nota><p>Les mostraría:</p></Nota>
          <ConceptBadge>Effect: Allow · Action: Leer · Resource: Documentos</ConceptBadge>
          <Dialogo>Explícalo sin utilizar ninguna de esas tres palabras en inglés.</Dialogo>
          <Reveal label="Ver respuesta">
            <p>"Se permite consultar los documentos."</p>
          </Reveal>
          <p style={{ marginTop: 'var(--space-4)' }}>Si pueden traducir una política técnica a lenguaje cotidiano, el objetivo de la clase está cumplido.</p>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow">🔗 Puente hacia la Clase 4</div>
          <Nota><p>Cerraría con una pequeña provocación:</p></Nota>
          <Flow steps={[
            { emoji: '👩', label: 'Camila' },
            { emoji: '📜', label: 'Política' },
            { emoji: '📦', label: 'S3' },
          ]} />
          <p>Pero ahora preguntamos:</p>
          <Dialogo>"¿Qué ocurre cuando no es una persona la que necesita permiso?"</Dialogo>
          <p>Por ejemplo:</p>
          <Flow steps={[
            { emoji: '🖥️', label: 'EC2' },
            { n: '?', label: '¿Necesita acceder a S3?' },
          ]} />
          <p>¿Le creamos un usuario? ¿Le damos una contraseña? ¿Guardamos las credenciales dentro del servidor?</p>
          <p>🚨 Mejor no. Aquí aparece una de las piezas más importantes de IAM:</p>
          <ConceptBadge>🎭 Módulo 2 · Clase 4 — Roles IAM: permisos temporales sin compartir credenciales</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-2/clase-4" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 4: Roles IAM, permisos temporales sin compartir credenciales →
          </Link>
        </div>

      </div>
    </div>
  );
}
