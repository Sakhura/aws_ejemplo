import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, StrikeChip, RoleGrid, Flow, CompareCols,
  QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const TF_STATEMENTS = [
  { text: 'Cloud no utiliza computadores físicos.', correct: false },
  { text: 'Los centros de datos contienen infraestructura tecnológica.', correct: true },
  { text: 'Tener todos nuestros recursos en un único lugar puede aumentar nuestra dependencia de ese lugar.', correct: true },
  { text: 'Disponibilidad significa que el servicio está accesible cuando lo necesitamos.', correct: true },
  { text: 'Redundancia garantiza que jamás tendremos una falla.', correct: false },
];

const QUIZ_QUESTIONS = [
  {
    q: '¿Qué es un centro de datos?',
    options: [
      { text: 'Una aplicación.', correct: false },
      { text: 'Una instalación preparada para albergar infraestructura tecnológica.', correct: true },
      { text: 'Un navegador.', correct: false },
      { text: 'Un archivo.', correct: false },
    ],
  },
  {
    q: '¿Qué podemos encontrar en un centro de datos?',
    options: [
      { text: 'Servidores.', correct: true },
      { text: 'Solamente documentos PDF.', correct: false },
      { text: 'Solamente teléfonos.', correct: false },
      { text: 'Únicamente bases de datos.', correct: false },
    ],
  },
  {
    q: '¿Qué significa disponibilidad?',
    options: [
      { text: 'Que el servicio esté funcionando cuando se necesita.', correct: true },
      { text: 'Que todos tengan contraseña.', correct: false },
      { text: 'Que el servidor sea grande.', correct: false },
      { text: 'Que exista Internet.', correct: false },
    ],
  },
  {
    q: '¿Qué problema existe al depender de un único servidor?',
    options: [
      { text: 'Si falla, puede afectar el servicio completo.', correct: true },
      { text: 'El servidor funciona más rápido.', correct: false },
      { text: 'Se convierte en una base de datos.', correct: false },
      { text: 'Ninguno.', correct: false },
    ],
  },
  {
    q: '¿Qué es redundancia?',
    options: [
      { text: 'Eliminar servidores.', correct: false },
      { text: 'Tener componentes adicionales o de respaldo.', correct: true },
      { text: 'Cambiar una contraseña.', correct: false },
      { text: 'Guardar fotografías.', correct: false },
    ],
  },
  {
    q: '¿Tener redundancia significa que nunca tendremos fallas?',
    options: [
      { text: 'Sí.', correct: false },
      { text: 'No.', correct: true },
    ],
  },
];

export default function Clase5() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 0 · Clase 5</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 0 · Clase 5: Centros de datos, disponibilidad y continuidad</h2>
      <p className="lesson-subtitle">
        Por qué no conviene que un servicio importante dependa de un único servidor ni de un único lugar.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial absoluto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas sin conocimientos técnicos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Teórico-práctica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Clases 1 a 4</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar la clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es un centro de datos.</li>
            <li>Comprender que Cloud funciona sobre infraestructura física real.</li>
            <li>Entender qué significa disponibilidad.</li>
            <li>Reconocer por qué es riesgoso depender de un único lugar.</li>
            <li>Comprender la idea básica de redundancia.</li>
            <li>Relacionar continuidad de servicio con una arquitectura distribuida.</li>
          </ul>
          <p>La idea central será:</p>
          <Dialogo>Si un servicio es importante, no conviene depender de un solo punto de falla.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Activación de conocimientos previos</h3>
          <Nota><p>Comenzaría mostrando este esquema:</p></Nota>
          <Flow steps={[
            { icon: 'user', label: 'Usuario' },
            { icon: 'globe', label: 'Internet' },
            { icon: 'cloud', label: 'Cloud' },
          ]} />
          <p>Y preguntaría:</p>
          <Dialogo>¿Dónde está físicamente ese "Cloud"?</Dialogo>
          <p>Luego iría revelando:</p>
          <Flow steps={[
            { icon: 'cloud', label: 'Cloud' },
            { icon: 'building', label: 'Centros de datos', caption: '🖥️ Servidores · 💾 Almacenamiento · 🌐 Redes · 🔌 Energía · ❄️ Refrigeración' },
          ]} />
          <Nota><p>La nube no elimina la infraestructura. La nube cambia quién la administra y cómo nosotros accedemos a ella.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>3. ¿Qué es un centro de datos?</h3>
          <Nota><p>Un centro de datos es una instalación diseñada para albergar infraestructura tecnológica.</p></Nota>
          <p>Dentro podemos encontrar: 🖥️ servidores, 💾 sistemas de almacenamiento, 🌐 equipos de red, 🔌 sistemas eléctricos, ❄️ refrigeración, 🔐 controles de seguridad física.</p>
          <p>Explicación sencilla:</p>
          <Dialogo>Un centro de datos es como un gran edificio preparado especialmente para mantener computadores y sistemas funcionando de manera segura y continua.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>4. Analogía del hotel tecnológico</h3>
          <Nota><p>Imaginemos un enorme hotel. Pero en vez de habitaciones para personas, tiene espacios para: 🖥️ servidores.</p></Nota>
          <p>Cada servidor necesita: ⚡ electricidad, ❄️ temperatura adecuada, 🌐 conexión, 🔐 seguridad, 🔧 mantenimiento.</p>
          <p>El centro de datos proporciona esas condiciones.</p>
        </section>

        <section className="lesson-section">
          <h3>5. ¿Por qué necesitan tanta infraestructura?</h3>
          <Nota><p>Un servidor no funciona por arte de magia. Necesita energía. Pero:</p></Nota>
          <Dialogo>¿Qué pasa si se corta la luz?</Dialogo>
          <p>Por eso los centros de datos pueden contar con sistemas de respaldo eléctrico. También necesitan refrigeración porque muchos equipos funcionando juntos generan calor.</p>
          <p>Y necesitan múltiples conexiones de red porque sin conectividad: el servidor podría estar funcionando perfectamente, pero nadie podría llegar hasta él.</p>
        </section>

        <section className="lesson-section">
          <h3>6. El problema del único lugar</h3>
          <Nota><p>Supongamos que nuestra empresa tiene toda su plataforma en un único edificio.</p></Nota>
          <Flow steps={[
            { icon: 'user', label: 'Usuarios' },
            { icon: 'globe', label: 'Internet' },
            { icon: 'building', label: 'CENTRO DE DATOS', caption: '🖥️ Aplicación · 📦 Archivos · 🗄️ Base de datos' },
          ]} />
          <p>Todo funciona bien. Hasta que ocurre un problema. Puede ser: 🔌 corte eléctrico, 🌐 falla de conexión, 🔥 incidente físico, 🔧 falla técnica.</p>
          <p>Si todo depende de ese lugar:</p>
          <Flow steps={[
            { icon: 'building', label: 'Centro de datos', caption: '❌' },
            { icon: 'zap', label: 'Servicio no disponible' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>7. La analogía de los huevos</h3>
          <Nota><p>Aquí usaría la frase:</p></Nota>
          <Dialogo>"No pongamos todos los huevos en la misma canasta."</Dialogo>
          <CompareCols cols={[
            { icon: 'briefcase', title: 'Una sola canasta', items: ['🥚🥚🥚🥚🥚🥚', 'Si la canasta se cae 💥: pierdo todos.'] },
            { emoji: '🧺🧺', title: 'Canastas distribuidas', items: ['🥚🥚🥚 · 🥚🥚🥚', 'Un problema en una canasta no necesariamente afecta todo.'] },
          ]} />
          <Nota><p>En tecnología ocurre algo parecido.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>8. Introducción a redundancia</h3>
          <Nota><p>Redundancia significa tener componentes adicionales que pueden ayudar si otro componente falla.</p></Nota>
          <CompareCols cols={[
            { icon: 'x-circle', title: 'Sin redundancia', items: ['Servicio → 🖥️ Servidor único', 'Si falla: servicio afectado.'] },
            { icon: 'check-circle', title: 'Con redundancia', items: ['Servicio → 🖥️ A y 🖥️ B', 'Si A falla, B sigue: el servicio continúa.'] },
          ]} />
          <Nota><p>Para este nivel basta con: redundancia = tener respaldo para evitar depender de un único componente.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>9. ¿Qué significa disponibilidad?</h3>
          <Nota><p>La disponibilidad responde a una pregunta muy sencilla:</p></Nota>
          <Dialogo>¿El servicio está funcionando cuando el usuario lo necesita?</Dialogo>
          <p>Por ejemplo, entramos a una tienda online.</p>
          <p><strong>Caso A</strong> — La página abre.</p>
          <ConceptBadge>Disponible</ConceptBadge>
          <p><strong>Caso B</strong> — Aparece "Servicio no disponible."</p>
          <ConceptBadge variant="danger">No disponible</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>10. ¿Todos los sistemas necesitan la misma disponibilidad?</h3>
          <Nota><p>No.</p></Nota>
          <ul className="plain-list">
            <li>Blog personal — si está fuera de servicio cinco minutos: 😐 puede ser molesto.</li>
            <li>Sistema bancario — si está fuera de servicio cinco horas: 😱 el impacto puede ser mucho mayor.</li>
            <li>Sistema de emergencia — si falla: 🚨 podría tener consecuencias críticas.</li>
          </ul>
          <Nota><p>Cuanto más importante es un servicio, mayor atención requiere su continuidad y disponibilidad.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>11. Ejemplo cotidiano</h3>
          <Nota><p>Supongamos que usamos una aplicación de mensajería. Normalmente esperamos que funcione: 🌅 mañana, 🌞 tarde, 🌙 noche.</p></Nota>
          <p>No pensamos "espero que el servidor no esté en mantenimiento." Esperamos simplemente que funcione. Esa expectativa está relacionada con disponibilidad.</p>
        </section>

        <section className="lesson-section">
          <h3>12. Caso CloudStore</h3>
          <Nota><p>Volvamos a nuestra tienda ficticia. CloudStore tiene: 🖥️ aplicación, 📦 fotografías, 🗄️ productos, 👥 clientes.</p></Nota>
          <p>Durante Cyber Monday recibe miles de visitas. Ahora imagina: el único servidor falla.</p>
          <Flow steps={[
            { icon: 'users', label: 'Usuarios (miles)' },
            { icon: 'server', label: 'Servidor', caption: '❌' },
            { icon: 'zap', label: 'TIENDA CAÍDA' },
          ]} />
          <p>Se pierden ventas.</p>
        </section>

        <section className="lesson-section">
          <h3>13. Diseñemos una alternativa</h3>
          <Nota><p>Podemos imaginar varios recursos trabajando para evitar depender de uno solo.</p></Nota>
          <Flow steps={[
            { icon: 'users', label: 'Usuarios' },
            { icon: 'globe', label: 'Internet' },
            { icon: 'server', label: 'Servidor A + Servidor B' },
            { icon: 'database', label: 'Datos' },
          ]} />
          <Nota>
            <p>No necesitamos todavía enseñar balanceadores de carga, replicación o clustering. Solo queremos que entiendan: podemos diseñar sistemas para que una falla no derribe todo el servicio.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>14. ¿Y si el problema afecta un edificio completo?</h3>
          <Nota><p>Excelente pregunta para la clase:</p></Nota>
          <Dialogo>"¿Qué pasa si tenemos 10 servidores, pero todos están dentro del mismo edificio?"</Dialogo>
          <p>Seguimos teniendo un problema. Si el edificio completo queda afectado, todos los servidores podrían verse comprometidos al mismo tiempo.</p>
          <p>Por eso los grandes proveedores Cloud distribuyen infraestructura entre diferentes ubicaciones.</p>
        </section>

        <section className="lesson-section">
          <h3>15. Aquí comienza a aparecer AWS</h3>
          <Nota><p>AWS organiza su infraestructura global utilizando conceptos como Regiones y Zonas de disponibilidad. Pero en esta clase solo los mencionaría superficialmente.</p></Nota>
          <p>Por ahora: AWS tiene infraestructura distribuida geográficamente para permitir diseñar servicios más resistentes y disponibles. La explicación formal queda para el módulo dedicado a AWS.</p>
        </section>

        <section className="lesson-section">
          <h3>16. Analogía para Región y Zona</h3>
          <Nota><p>Podemos anticiparlo así: imagina un país con distintas ciudades.</p></Nota>
          <CompareCols cols={[
            { icon: 'map-pin', title: 'Región', items: ['Una zona geográfica general.', 'Dentro de ella puede haber varias ubicaciones independientes.'] },
            { icon: 'building', title: 'Zona de disponibilidad', items: ['Una ubicación física separada de otras dentro de esa región.'] },
          ]} />
          <Nota><p>Más adelante veremos exactamente cómo AWS utiliza estos conceptos.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>17. Idea que deben retener</h3>
          <Flow steps={[
            { icon: 'building', label: 'UN SOLO LUGAR', caption: 'Mayor dependencia' },
            { icon: 'alert-triangle', label: 'Si falla, podemos tener problemas' },
          ]} />
          <Flow steps={[
            { icon: 'map-pin', label: 'VARIAS UBICACIONES', caption: 'Podemos distribuir recursos' },
            { icon: 'check-circle', label: 'Mayor capacidad de resistir fallas' },
          ]} />
          <p>No significa que sea imposible tener una caída. Significa que podemos reducir el riesgo de que una sola falla afecte todo.</p>
        </section>

        <section className="lesson-section">
          <h3>18. Actividad: ¿qué harías tú?</h3>
          <Nota><p>Presentamos una plataforma educativa. La institución tiene: 👩‍🎓 20.000 estudiantes. Todos entran a revisar notas. Tenemos dos propuestas.</p></Nota>
          <CompareCols cols={[
            { icon: 'server', title: 'Propuesta A', items: ['Un único servidor.'] },
            { emoji: '🖥️🖥️', title: 'Propuesta B', items: ['Varios recursos preparados para continuar operando.'] },
          ]} />
          <QaItem question="¿Cuál ofrece menos dependencia de un único servidor?" answer="Propuesta B." />
        </section>

        <section className="lesson-section">
          <h3>19. Actividad grupal</h3>
          <Nota><p>Caso:</p></Nota>
          <ConceptBadge>Clínica SaludCloud</ConceptBadge>
          <p>La clínica utiliza un sistema online para: 📅 reservar horas, 👩‍⚕️ consultar profesionales, 📄 revisar información, 💳 realizar pagos.</p>
          <p>El sistema depende de: un único servidor, una única conexión, una única ubicación.</p>
          <p>Preguntas:</p>
          <ol className="plain-list">
            <li>¿Qué riesgos observan?</li>
            <li>¿Qué pasaría si el servidor falla?</li>
            <li>¿Qué pasaría si falla la conexión del lugar?</li>
            <li>¿Qué podríamos hacer para reducir la dependencia?</li>
          </ol>
          <Reveal label="Ver respuestas esperadas (probable)">
            <ul className="plain-list">
              <li>Tener recursos de respaldo.</li>
              <li>Utilizar más de una ubicación.</li>
              <li>Evitar depender de un único componente.</li>
            </ul>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>20. Diferencia importante</h3>
          <Nota><p>No enseñaría:</p></Nota>
          <StrikeChip>❌ "Redundancia significa que nunca habrá fallas."</StrikeChip>
          <p>Eso es falso.</p>
          <Nota>
            <p>No estoy de acuerdo porque los sistemas pueden fallar incluso teniendo redundancia. Esto es lo que haría en su lugar: explicar que la redundancia reduce el impacto y el riesgo de ciertos fallos. El riesgo de enseñar que evita todas las caídas es crear una falsa sensación de seguridad.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>21. Verdadero o falso</h3>
          <TrueFalseQuiz statements={TF_STATEMENTS} />
        </section>

        <section className="lesson-section">
          <h3>22. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>23. Reto de la clase</h3>
          <Nota><p>Presentaría este escenario:</p></Nota>
          <ConceptBadge>TicketFest</ConceptBadge>
          <p>Una empresa vende entradas online para conciertos. A las 10:00 se abre la venta para un artista muy popular. En cinco minutos entran: 👥 100.000 personas.</p>
          <p>Toda la plataforma depende de: 🖥️ un servidor, ubicado en: 🏢 un único lugar.</p>
          <Dialogo>¿Qué problemas observas y qué cambiarías para mejorar la disponibilidad?</Dialogo>
          <Reveal label="💡 Ver respuesta esperada">
            <p>No necesitamos una arquitectura técnica. Una buena respuesta sería:</p>
            <Dialogo>"El problema es que todo depende de un único servidor y una sola ubicación. Si alguno falla, el servicio podría dejar de funcionar. Se podrían utilizar varios recursos y distribuirlos para reducir la dependencia de un único punto."</Dialogo>
            <p>Eso demuestra comprensión.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>24. Reto extra</h3>
          <Dialogo>¿Qué tiene más riesgo?</Dialogo>
          <CompareCols cols={[
            { icon: 'server', title: 'Opción A', items: ['Todo depende de un servidor.'] },
            { emoji: '🖥️🖥️', title: 'Opción B', items: ['Dos servidores, pero ambos están en el mismo edificio.'] },
            { emoji: '🏢🏢', title: 'Opción C', items: ['Recursos distribuidos entre dos edificios distintos.'] },
          ]} />
          <Nota><p>Para esta explicación simplificada, la opción C reduce más la dependencia de un único componente y una única ubicación.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>25. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>🏢 Centro de datos</td><td>Lugar físico preparado para infraestructura tecnológica</td></tr>
              <tr><td>🖥️ Servidor</td><td>Procesa y entrega servicios</td></tr>
              <tr><td>🔁 Redundancia</td><td>Tener respaldo o componentes adicionales</td></tr>
              <tr><td>✅ Disponibilidad</td><td>Que el servicio funcione cuando se necesita</td></tr>
              <tr><td>⚠️ Punto único de falla</td><td>Algo cuya falla puede afectar todo</td></tr>
              <tr><td>🌍 Distribución</td><td>Utilizar diferentes recursos o ubicaciones</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>26. Nuestro mapa del curso crece</h3>
          <RoleGrid roles={[
            { icon: 'server', label: 'Servidores', desc: '' },
            { icon: 'package', label: 'Archivos', desc: '' },
            { icon: 'database', label: 'Datos', desc: '' },
          ]} />
          <Flow steps={[
            { icon: 'building', label: 'Centros de datos' },
          ]} />
          <RoleGrid roles={[
            { icon: 'refresh', label: 'Redundancia', desc: '' },
            { icon: 'check-circle', label: 'Disponibilidad', desc: '' },
          ]} />
          <p>Ahora Cloud empieza a tener una estructura mucho más concreta.</p>
        </section>

        <section className="lesson-section">
          <h3>27. Ticket de salida</h3>
          <Nota><p>Cada estudiante responde en máximo dos líneas:</p></Nota>
          <Dialogo>¿Por qué una empresa importante podría preferir distribuir sus servicios en lugar de depender de un único servidor y una sola ubicación?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>"Porque si un componente o una ubicación falla, otros recursos pueden ayudar a mantener el servicio disponible."</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 6</div>
          <Nota><p>Cerraría mostrando todo lo que hemos aprendido:</p></Nota>
          <Flow steps={[
            { icon: 'user', label: 'Usuario' },
            { icon: 'globe', label: 'Internet' },
            { icon: 'cloud', label: 'Cloud', caption: '🖥️ Procesamiento · 📦 Almacenamiento · 🗄️ Base de datos' },
            { icon: 'building', label: 'Centros de datos' },
            { icon: 'refresh', label: 'Redundancia' },
            { icon: 'check-circle', label: 'Disponibilidad' },
          ]} />
          <p>Y preguntaría:</p>
          <Dialogo>"¿Podemos contar ahora la historia completa desde que una persona abre una página hasta que recibe la información?"</Dialogo>
          <p>Esa será la misión final del módulo.</p>
          <Link to="/aprendizaje/aws-desde-cero/clase-6" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 6: Cómo se conecta todo →
          </Link>
        </div>

      </div>
    </div>
  );
}
