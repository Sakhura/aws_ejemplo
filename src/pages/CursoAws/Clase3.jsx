import {
  Nota, Dialogo, ConceptBadge, Flow, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const TARJETAS = [
  { q: 'Quiero utilizar Gmail.', options: [{ text: '🖥️ IaaS', correct: false }, { text: '⚙️ PaaS', correct: false }, { text: '📱 SaaS', correct: true }] },
  { q: 'Quiero configurar mi propio servidor virtual.', options: [{ text: '🖥️ IaaS', correct: true }, { text: '⚙️ PaaS', correct: false }, { text: '📱 SaaS', correct: false }] },
  { q: 'Soy desarrollador y quiero un entorno preparado para ejecutar mi aplicación.', options: [{ text: '🖥️ IaaS', correct: false }, { text: '⚙️ PaaS', correct: true }, { text: '📱 SaaS', correct: false }] },
  { q: 'Quiero utilizar Canva.', options: [{ text: '🖥️ IaaS', correct: false }, { text: '⚙️ PaaS', correct: false }, { text: '📱 SaaS', correct: true }] },
  { q: 'Necesito controlar bastante la configuración de un servidor.', options: [{ text: '🖥️ IaaS', correct: true }, { text: '⚙️ PaaS', correct: false }, { text: '📱 SaaS', correct: false }] },
];

const QUIZ_QUESTIONS = [
  {
    q: '¿Qué significa IaaS?',
    options: [
      { text: 'Internet as a Service', correct: false },
      { text: 'Infrastructure as a Service', correct: true },
      { text: 'Information and Security', correct: false },
      { text: 'Integrated Application Service', correct: false },
    ],
  },
  {
    q: 'Una empresa quiere utilizar Gmail. ¿Qué modelo representa mejor esta situación?',
    options: [
      { text: 'IaaS', correct: false },
      { text: 'PaaS', correct: false },
      { text: 'SaaS', correct: true },
      { text: 'DNS', correct: false },
    ],
  },
  {
    q: 'Necesitamos un servidor virtual que podamos configurar. ¿Qué modelo corresponde?',
    options: [
      { text: 'SaaS', correct: false },
      { text: 'IaaS', correct: true },
      { text: 'DNS', correct: false },
      { text: 'PaaS', correct: false },
    ],
  },
  {
    q: 'Un desarrollador quiere concentrarse principalmente en su aplicación y utilizar un entorno administrado para ejecutarla.',
    options: [
      { text: 'PaaS', correct: true },
      { text: 'SaaS', correct: false },
      { text: 'IP', correct: false },
      { text: 'DNS', correct: false },
    ],
  },
  {
    q: '¿Cuál afirmación es correcta?',
    options: [
      { text: 'SaaS siempre es mejor.', correct: false },
      { text: 'IaaS siempre es más barato.', correct: false },
      { text: 'Cada modelo responde a necesidades diferentes.', correct: true },
      { text: 'PaaS elimina Internet.', correct: false },
    ],
  },
];

export default function Clase3() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 0 · Clase 3</div>
      <div className="lesson-eyebrow">☁️ AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 0 · Clase 3: IaaS, PaaS y SaaS</h2>
      <p className="lesson-subtitle">
        Qué podemos arrendar exactamente en la nube, con la analogía de una pizzería: cocinar nosotros, usar una cocina lista, o pedir la pizza hecha.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial absoluto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas sin conocimientos técnicos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Teórico-práctica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Clases 1 y 2</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>🎯 1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué son IaaS, PaaS y SaaS.</li>
            <li>Diferenciar los tres modelos.</li>
            <li>Reconocer ejemplos cotidianos.</li>
            <li>Elegir un modelo según una necesidad sencilla.</li>
            <li>Comprender la relación entre control y responsabilidad.</li>
          </ul>
          <p>La idea que debe sobrevivir a la clase es:</p>
          <Dialogo>En Cloud podemos contratar diferentes niveles de servicio. En algunos administramos muchas cosas y en otros el proveedor se encarga de casi todo.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>🧠 2. Activación de conocimientos previos</h3>
          <Nota><p>Comenzaría preguntando:</p></Nota>
          <Dialogo>¿Qué aprendimos en la clase anterior sobre Cloud?</Dialogo>
          <p>Respuesta esperada:</p>
          <p>Podemos utilizar recursos tecnológicos sin tener que comprar y mantener toda la infraestructura física nosotros mismos.</p>
          <p>Entonces hacemos una segunda pregunta:</p>
          <Dialogo>¿Qué podemos contratar exactamente?</Dialogo>
          <ul className="plain-list">
            <li>🖥️ ¿Un servidor? Sí.</li>
            <li>⚙️ ¿Un entorno donde ejecutar una aplicación? Sí.</li>
            <li>📱 ¿Una aplicación completamente terminada? También.</li>
          </ul>
          <p>Y esas diferencias nos llevan a:</p>
          <ConceptBadge>IaaS · PaaS · SaaS</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>🍕 3. La pizzería Cloud</h3>
          <Nota><p>No mostraría todavía las definiciones técnicas. Primero:</p></Nota>
          <Dialogo>“Hoy queremos comer pizza.”</Dialogo>
          <p>Tenemos tres posibilidades.</p>
          <p style={{ fontWeight: 500 }}>🍳 Situación A: quiero cocinar</p>
          <p>Tengo mi propia receta y quiero controlar la preparación. Pero alguien me proporciona: 🏠 espacio, 🔥 horno, 🍳 cocina.</p>
          <p>Yo me preocupo de: 🍅 ingredientes, 👨‍🍳 preparación, 🍕 receta.</p>
          <p>La idea es:</p>
          <Dialogo>“Dame la infraestructura. Yo hago el resto.”</Dialogo>
          <p>Eso se parece a:</p>
          <ConceptBadge>🖥️ IaaS</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>🖥️ 4. IaaS</h3>
          <Nota>
            <p>IaaS significa: Infrastructure as a Service. En español: Infraestructura como Servicio.</p>
          </Nota>
          <p>El proveedor nos proporciona recursos de infraestructura tecnológica. Por ejemplo: 🖥️ servidores virtuales, 💾 almacenamiento, 🌐 redes.</p>
          <p>Nosotros seguimos teniendo bastante control.</p>
          <p className="text-muted" style={{ fontSize: 12, marginBottom: 4 }}>Frase para recordar</p>
          <ConceptBadge>🖥️ IaaS = "Dame infraestructura y yo configuro."</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>🏠 5. Otra analogía para IaaS</h3>
          <Nota><p>Imaginemos que arrendamos una casa vacía.</p></Nota>
          <p>El propietario proporciona: 🏠 casa, 🚪 puertas, 🪟 ventanas, 💡 instalaciones.</p>
          <p>Pero nosotros ponemos: 🛏️ muebles, 📺 televisión, 🖼️ decoración.</p>
          <p>Tenemos bastante libertad. Pero también tenemos más cosas de las cuales preocuparnos.</p>
          <Nota><p>Esa relación es importante: más control normalmente significa más responsabilidad.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>☁️ 6. Ejemplo en AWS</h3>
          <Nota><p>Más adelante conoceremos: Amazon EC2. EC2 permite crear servidores virtuales.</p></Nota>
          <p>Por ahora solo necesitamos recordar:</p>
          <ConceptBadge>EC2 → servidor virtual → ejemplo relacionado con IaaS</ConceptBadge>
          <p>Todavía no necesitamos saber cómo crear uno.</p>
        </section>

        <section className="lesson-section">
          <h3>🍕 7. Volvamos a nuestra pizza</h3>
          <Nota><p>Ahora queremos preparar nuestra receta, pero no queremos preocuparnos tanto por la cocina.</p></Nota>
          <p>Queremos que alguien nos diga:</p>
          <Dialogo>“La cocina está preparada. Trae tu receta y cocina.”</Dialogo>
          <p>Tenemos un entorno listo para trabajar. Esto nos lleva a:</p>
          <ConceptBadge>⚙️ PaaS</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>⚙️ 8. PaaS</h3>
          <Nota>
            <p>PaaS significa: Platform as a Service. En español: Plataforma como Servicio.</p>
          </Nota>
          <p>El proveedor administra más componentes tecnológicos para que nosotros podamos concentrarnos principalmente en desarrollar o ejecutar nuestra aplicación.</p>
          <p className="text-muted" style={{ fontSize: 12, marginBottom: 4 }}>Frase para recordar</p>
          <ConceptBadge>⚙️ PaaS = "Dame un entorno preparado para mi aplicación."</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>👩‍💻 9. Ejemplo sencillo</h3>
          <Nota><p>Imaginemos una programadora. Tiene una aplicación terminada.</p></Nota>
          <p>No quiere pasar horas preocupándose de: 🖥️ servidores, 🔧 infraestructura, ⚙️ determinadas configuraciones.</p>
          <p>Quiere principalmente: publicar su aplicación. Una solución PaaS puede facilitar ese trabajo.</p>
        </section>

        <section className="lesson-section">
          <h3>☁️ 10. Ejemplo relacionado con AWS</h3>
          <Nota><p>Un ejemplo pedagógico que conoceremos posteriormente es: AWS Elastic Beanstalk.</p></Nota>
          <p>Nos permite desplegar aplicaciones mientras AWS ayuda a gestionar distintos componentes de la infraestructura necesaria.</p>
          <p>Para esta clase:</p>
          <ConceptBadge>PaaS → quiero concentrarme más en mi aplicación</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>🍕 11. Hoy no quiero cocinar</h3>
          <Nota><p>Tercera situación. Llegamos cansados. No queremos: ❌ comprar ingredientes, ❌ cocinar, ❌ limpiar, ❌ usar el horno.</p></Nota>
          <p>Sacamos el teléfono 📱. Elegimos pizza. Pagamos. Y esperamos. 🛵🍕</p>
          <p>Queremos: el producto terminado. Aquí aparece:</p>
          <ConceptBadge>📱 SaaS</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>📱 12. SaaS</h3>
          <Nota>
            <p>SaaS significa: Software as a Service. En español: Software como Servicio.</p>
          </Nota>
          <p>El proveedor administra la aplicación y la infraestructura necesaria. Nosotros simplemente utilizamos el software.</p>
          <p className="text-muted" style={{ fontSize: 12, marginBottom: 4 }}>Frase para recordar</p>
          <ConceptBadge>📱 SaaS = "Dame la aplicación lista para usar."</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>🌎 13. Probablemente ya utilizan SaaS</h3>
          <Nota><p>Podemos mostrar ejemplos cotidianos:</p></Nota>
          <ul className="plain-list">
            <li>Gmail — 📧 entramos y utilizamos correo.</li>
            <li>Microsoft 365 — 📄 utilizamos aplicaciones y servicios.</li>
            <li>Canva — 🎨 creamos diseños.</li>
          </ul>
          <Nota><p>El usuario normalmente no necesita saber dónde están físicamente los servidores ni mantenerlos. Simplemente utiliza el servicio.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>🧠 14. Detengamos la clase aquí</h3>
          <Nota><p>Antes de seguir, preguntaría: ¿cuál es la diferencia entre los tres? Y mostraría solamente esto:</p></Nota>
          <ul className="plain-list">
            <li>🖥️ IaaS — dame infraestructura.</li>
            <li>⚙️ PaaS — dame un entorno preparado.</li>
            <li>📱 SaaS — dame el software terminado.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>🎚️ 15. La escalera de responsabilidad</h3>
          <Nota><p>Esta imagen conceptual es más importante que memorizar las definiciones:</p></Nota>
          <p style={{ fontWeight: 500 }}>Más control nuestro · más responsabilidad</p>
          <Flow steps={[
            { emoji: '🖥️', label: 'IaaS' },
            { emoji: '⚙️', label: 'PaaS' },
            { emoji: '📱', label: 'SaaS' },
          ]} />
          <p style={{ fontWeight: 500 }}>Menos cosas administramos</p>
          <Nota>
            <p>No significa que SaaS es mejor que PaaS, ni que PaaS es mejor que IaaS. Significa que sirven para necesidades diferentes.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>🏢 16. Llevémoslo a una empresa</h3>
          <Nota><p>Tenemos una empresa ficticia:</p></Nota>
          <ConceptBadge>🏢 CloudStore</ConceptBadge>
          <p>Necesitamos solucionar tres problemas.</p>
          <p style={{ fontWeight: 500 }}>Problema A</p>
          <p>Necesitamos correo electrónico para nuestros trabajadores. ¿Necesitamos construir nuestro propio sistema de correo? No necesariamente. Podemos utilizar una solución terminada.</p>
          <ConceptBadge>📱 SaaS</ConceptBadge>
          <p style={{ fontWeight: 500, marginTop: 'var(--space-4)' }}>Problema B</p>
          <p>Necesitamos un servidor virtual que nuestro equipo pueda configurar. Queremos mayor control.</p>
          <ConceptBadge>🖥️ IaaS</ConceptBadge>
          <p style={{ fontWeight: 500, marginTop: 'var(--space-4)' }}>Problema C</p>
          <p>Nuestros programadores hicieron una aplicación y necesitan un entorno para publicarla. Quieren concentrarse principalmente en su aplicación.</p>
          <ConceptBadge>⚙️ PaaS</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>🎮 17. Actividad: levanta tu tarjeta</h3>
          <Nota>
            <p>Entregaría tres tarjetas a cada estudiante (IaaS, PaaS, SaaS). Lees una situación y tienen aproximadamente cinco segundos para levantar una tarjeta.</p>
          </Nota>
          <Quiz questions={TARJETAS} />
        </section>

        <section className="lesson-section">
          <h3>🤔 18. Ahora hagámoslo un poco más difícil</h3>
          <QaItem
            question="Una empresa necesita una aplicación para realizar videollamadas. No quiere desarrollar nada. ¿Qué elegiríamos?"
            answer="SaaS — porque quiere utilizar una aplicación terminada."
          />
          <QaItem
            question="Una empresa desarrolló su propia aplicación y quiere concentrarse en publicarla, reduciendo la administración de infraestructura."
            answer="PaaS."
          />
          <QaItem
            question="El departamento TI necesita crear servidores virtuales y tener bastante control sobre su configuración."
            answer="IaaS."
          />
        </section>

        <section className="lesson-section">
          <h3>⚠️ 19. Error frecuente</h3>
          <Nota><p>Preguntaría:</p></Nota>
          <Dialogo>“¿Entonces SaaS siempre es la mejor alternativa porque hacemos menos trabajo?”</Dialogo>
          <ConceptBadge variant="danger">❌ No</ConceptBadge>
          <Nota>
            <p>No estoy de acuerdo porque menos administración también puede significar menos control sobre ciertos componentes. Esto es lo que haría en su lugar: elegir el modelo según las necesidades. El riesgo de elegir SaaS solamente porque parece más sencillo es terminar con una solución que no permita la personalización o control requerido.</p>
          </Nota>
          <p>Por ejemplo: necesito solamente correo → 📱 SaaS puede ser suficiente. Necesito controlar un servidor → 🖥️ IaaS puede tener más sentido.</p>
        </section>

        <section className="lesson-section">
          <h3>🧪 20. Actividad grupal</h3>
          <Nota><p>Divide la clase en grupos pequeños. Entrégales este caso:</p></Nota>
          <ConceptBadge>🏫 Universidad Futuro</ConceptBadge>
          <p>La universidad necesita:</p>
          <ul className="plain-list">
            <li>A. Correo electrónico para docentes.</li>
            <li>B. Servidores virtuales para prácticas de estudiantes de informática.</li>
            <li>C. Un entorno para que desarrolladores publiquen una aplicación académica.</li>
          </ul>
          <p>Los estudiantes deben completar:</p>
          <table className="table lesson-summary-table">
            <thead><tr><th>Necesidad</th><th>Modelo</th><th>¿Por qué?</th></tr></thead>
            <tbody>
              <tr><td>Correo electrónico</td><td>?</td><td>?</td></tr>
              <tr><td>Servidores virtuales</td><td>?</td><td>?</td></tr>
              <tr><td>Publicar aplicación</td><td>?</td><td>?</td></tr>
            </tbody>
          </table>
          <Reveal label="Ver solución">
            <table className="table lesson-summary-table">
              <thead><tr><th>Necesidad</th><th>Modelo</th><th>Razón</th></tr></thead>
              <tbody>
                <tr><td>Correo</td><td>SaaS</td><td>Queremos utilizar software terminado</td></tr>
                <tr><td>Servidores virtuales</td><td>IaaS</td><td>Necesitamos infraestructura y control</td></tr>
                <tr><td>Publicar aplicación</td><td>PaaS</td><td>Queremos enfocarnos en la aplicación</td></tr>
              </tbody>
            </table>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>📝 21. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>🏆 22. Reto de la clase</h3>
          <Nota><p>Aquí no les permitiría utilizar las palabras: Infraestructura, Plataforma, Software. 😈</p></Nota>
          <p>La instrucción sería:</p>
          <Dialogo>“Explícale IaaS, PaaS y SaaS a tu abuela, abuelo o a una persona que nunca haya estudiado informática.”</Dialogo>
          <p>Una respuesta posible:</p>
          <Reveal>
            <ul className="plain-list">
              <li>🖥️ IaaS — “Me prestan las herramientas y yo hago el trabajo.”</li>
              <li>⚙️ PaaS — “Me entregan el lugar preparado y yo pongo mi creación.”</li>
              <li>📱 SaaS — “Me entregan algo terminado y simplemente lo utilizo.”</li>
            </ul>
          </Reveal>
          <p style={{ marginTop: 'var(--space-4)' }}>Si pueden explicarlo sin utilizar las definiciones oficiales, entendieron realmente el concepto.</p>
        </section>

        <section className="lesson-section">
          <h3>📌 23. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table" style={{ maxWidth: 720 }}>
            <thead><tr><th></th><th>IaaS 🖥️</th><th>PaaS ⚙️</th><th>SaaS 📱</th></tr></thead>
            <tbody>
              <tr><td>¿Qué recibo?</td><td>Recursos básicos</td><td>Entorno preparado</td><td>Aplicación</td></tr>
              <tr><td>¿Tengo control?</td><td>Alto</td><td>Intermedio</td><td>Menor</td></tr>
              <tr><td>¿Administro más cosas?</td><td>Sí</td><td>Algunas</td><td>Pocas</td></tr>
              <tr><td>Ejemplo conceptual</td><td>Servidor virtual</td><td>Entorno para app</td><td>Gmail</td></tr>
              <tr><td>Frase</td><td>"Yo configuro"</td><td>"Yo desarrollo"</td><td>"Yo uso"</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>🎯 24. Ticket de salida</h3>
          <Nota><p>Antes de terminar, cada estudiante responde en una sola línea:</p></Nota>
          <Dialogo>Una empresa necesita Microsoft 365 para sus trabajadores. ¿IaaS, PaaS o SaaS? ¿Por qué?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>SaaS, porque la empresa quiere utilizar una aplicación/servicio terminado.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow">🔗 Puente hacia la Clase 4</div>
          <Nota><p>Cerraría proyectando una fotografía, un PDF y una ficha de estudiante. Y preguntaría:</p></Nota>
          <Dialogo>“¿Guardar una fotografía y guardar los datos de 10.000 estudiantes es lo mismo?”</Dialogo>
          <p>📸 Fotografía · 📄 PDF · 👩‍🎓 Nombre + RUT + carrera + notas</p>
          <p style={{ fontSize: 15, fontWeight: 500 }}>No exactamente.</p>
          <p>Ahí comienza la siguiente clase:</p>
          <ConceptBadge>📦 Clase 4: Archivos, almacenamiento y bases de datos</ConceptBadge>
          <Nota>
            <p>Esta clase será especialmente importante antes de presentar servicios como Amazon S3 y Amazon RDS, porque primero entenderán qué problema resuelve cada tipo de almacenamiento y después aprenderán el nombre del servicio AWS.</p>
          </Nota>
          <span className="tag tag-outline">Clase 4 · próximamente</span>
        </div>

      </div>
    </div>
  );
}
