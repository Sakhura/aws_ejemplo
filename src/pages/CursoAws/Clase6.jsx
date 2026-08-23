import {
  Icon, Nota, Dialogo, ConceptBadge, StrikeChip, RoleGrid, Flow, CompareCols, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Quién normalmente solicita información?', options: [{ text: 'Cliente', correct: true }, { text: 'Servidor', correct: false }, { text: 'Centro de datos', correct: false }, { text: 'Base de datos', correct: false }] },
  { q: '¿Qué sistema ayuda a relacionar nombres con direcciones?', options: [{ text: 'SaaS', correct: false }, { text: 'DNS', correct: true }, { text: 'S3', correct: false }, { text: 'PaaS', correct: false }] },
  { q: '¿Qué permite comunicar dispositivos y redes?', options: [{ text: 'Internet', correct: true }, { text: 'PDF', correct: false }, { text: 'Base de datos', correct: false }, { text: 'SSD', correct: false }] },
  { q: '¿Qué concepto representa utilizar recursos tecnológicos mediante un proveedor?', options: [{ text: 'Cloud Computing', correct: true }, { text: 'Word', correct: false }, { text: 'DNS', correct: false }, { text: 'JPG', correct: false }] },
  { q: '¿Qué modelo corresponde a utilizar una aplicación terminada?', options: [{ text: 'IaaS', correct: false }, { text: 'PaaS', correct: false }, { text: 'SaaS', correct: true }, { text: 'IP', correct: false }] },
  { q: '¿Dónde guardaríamos conceptualmente fotografías y videos?', options: [{ text: 'Almacenamiento', correct: true }, { text: 'DNS', correct: false }, { text: 'Dirección IP', correct: false }, { text: 'Navegador', correct: false }] },
  { q: '¿Dónde organizaríamos clientes, productos y precios para consultarlos?', options: [{ text: 'Base de datos', correct: true }, { text: 'Carpeta de imágenes', correct: false }, { text: 'DNS', correct: false }, { text: 'Navegador', correct: false }] },
  { q: '¿Qué encontramos en un centro de datos?', options: [{ text: 'Infraestructura tecnológica', correct: true }, { text: 'Solo fotografías', correct: false }, { text: 'Solo navegadores', correct: false }, { text: 'Solo usuarios', correct: false }] },
  { q: '¿Qué significa redundancia?', options: [{ text: 'Eliminar recursos.', correct: false }, { text: 'Tener respaldo o recursos adicionales.', correct: true }, { text: 'Utilizar una sola ubicación.', correct: false }, { text: 'Crear contraseñas.', correct: false }] },
  { q: '¿Qué significa disponibilidad?', options: [{ text: 'Que un servicio funcione cuando se necesita.', correct: true }, { text: 'Que sea gratuito.', correct: false }, { text: 'Que tenga muchas fotografías.', correct: false }, { text: 'Que use SaaS.', correct: false }] },
];

const FRASES_ERROR = [
  { frase: '"Cloud significa que ya no existen servidores."', correccion: 'Cloud utiliza infraestructura física.' },
  { frase: '"Internet y Cloud son exactamente lo mismo."', correccion: 'Internet permite comunicación; Cloud proporciona recursos y servicios utilizando redes como Internet.' },
  { frase: '"Todas las imágenes deberían guardarse en una base de datos."', correccion: 'Existen soluciones de almacenamiento específicamente apropiadas para objetos y archivos.' },
  { frase: '"SaaS me da más control sobre el servidor que IaaS."', correccion: 'Normalmente IaaS ofrece mayor control sobre la infraestructura configurada por el usuario.' },
  { frase: '"Redundancia significa que un sistema jamás fallará."', correccion: 'Reduce riesgos y dependencia, pero no elimina todas las posibles fallas.' },
];

export default function Clase6() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 0 · Clase 6</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 0 · Clase 6: Cómo se conecta todo</h2>
      <p className="lesson-subtitle">
        Clase de integración y evaluación del módulo: reconstruimos el recorrido completo, desde que Martina abre el navegador hasta que recibe su respuesta.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial absoluto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas sin conocimientos técnicos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Tipo de clase</div><div className="lesson-meta-value">Integración + evaluación del módulo</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Clases 1 a 5</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante debería ser capaz de:</p></Nota>
          <ul className="plain-list">
            <li>Relacionar usuario, navegador, Internet y servidor.</li>
            <li>Comprender dónde entra Cloud en ese recorrido.</li>
            <li>Diferenciar procesamiento, almacenamiento y base de datos.</li>
            <li>Recordar cuándo hablamos de IaaS, PaaS y SaaS.</li>
            <li>Comprender por qué existen los centros de datos.</li>
            <li>Relacionar redundancia y disponibilidad.</li>
            <li>Explicar todo el proceso usando palabras simples.</li>
          </ul>
          <p>La frase objetivo será:</p>
          <Dialogo>"Ya no veo Cloud como algo mágico. Puedo explicar qué ocurre desde que una persona realiza una solicitud hasta que recibe una respuesta."</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Comencemos sin mostrar ninguna respuesta</h3>
          <Nota><p>Yo proyectaría solamente esta imagen conceptual:</p></Nota>
          <Flow steps={[
            { icon: 'user', label: 'Usuario' },
            { icon: 'globe', label: 'Navegador' },
            { n: '?', label: '???' },
            { icon: 'cloud', label: 'Cloud' },
            { n: '?', label: '???' },
            { icon: 'upload', label: 'Respuesta' },
          ]} />
          <p>Y preguntaría:</p>
          <Dialogo>"¿Podemos completar este recorrido con lo que hemos aprendido?"</Dialogo>
          <Nota><p>La idea es que sean ellos quienes reconstruyan el mapa.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>3. Paso 1: aparece el usuario</h3>
          <Nota><p>Todo comienza con una persona que quiere hacer algo.</p></Nota>
          <p>Por ejemplo: 👩 Martina quiere comprar un libro online. Abre 🌐 Chrome y escribe: www.libreria.cl</p>
          <Nota><p>Aquí tenemos nuestro primer concepto:</p></Nota>
          <ConceptBadge>Cliente</ConceptBadge>
          <p>Es quien solicita información o un servicio. Puede ser: 💻 computador, 📱 teléfono, 📺 Smart TV.</p>
        </section>

        <section className="lesson-section">
          <h3>4. Paso 2: necesitamos encontrar el destino</h3>
          <Nota><p>Martina conoce www.libreria.cl. Pero los sistemas necesitan localizar dónde está el servicio.</p></Nota>
          <p>Aquí recordamos:</p>
          <ConceptBadge>DNS</ConceptBadge>
          <Nota><p>Para nuestro nivel: DNS ayuda a relacionar nombres fáciles de recordar con las direcciones utilizadas por los sistemas.</p></Nota>
          <p>Analogía: 📱 contactos del teléfono. Nosotros buscamos "Mamá" y el teléfono encuentra el número correspondiente.</p>
        </section>

        <section className="lesson-section">
          <h3>5. ¿Qué aparece junto con DNS?</h3>
          <Nota><p>La dirección IP.</p></Nota>
          <p>Nuestra versión simple:</p>
          <Dialogo>IP = una dirección que ayuda a identificar un dispositivo o recurso dentro de una red.</Dialogo>
          <p>No necesitamos todavía: ❌ subnetting, ❌ máscaras, ❌ IPv6, ❌ CIDR. Esos pequeños dragones aparecerán bastante después. 🐉</p>
        </section>

        <section className="lesson-section">
          <h3>6. Paso 3: la solicitud viaja</h3>
          <Nota><p>La solicitud debe llegar desde Martina hasta el sistema de la tienda. Entonces aparece:</p></Nota>
          <ConceptBadge>Internet</ConceptBadge>
          <Nota><p>Internet permite que redes y dispositivos se comuniquen.</p></Nota>
          <p>Nuestro recorrido comienza a verse así:</p>
          <Flow steps={[
            { icon: 'user', label: 'Martina' },
            { icon: 'globe', label: 'Navegador' },
            { icon: 'book-open', label: 'DNS' },
            { icon: 'map-pin', label: 'Dirección' },
            { icon: 'radio', label: 'Internet' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>7. Paso 4: alguien debe responder</h3>
          <Nota><p>La tienda necesita sistemas capaces de recibir la solicitud. Aquí aparece:</p></Nota>
          <ConceptBadge>Servidor</ConceptBadge>
          <p>Martina dice conceptualmente:</p>
          <Dialogo>"Quiero ver el libro Fundamentos de Cloud."</Dialogo>
          <p>El servidor recibe esa solicitud. Ahora necesita preparar una respuesta.</p>
        </section>

        <section className="lesson-section">
          <h3>8. Pero el servidor no trabaja solo</h3>
          <Nota><p>Aquí conectamos la Clase 4. Para mostrar el producto, podríamos necesitar:</p></Nota>
          <ul className="plain-list">
            <li>📸 fotografía del libro</li>
            <li>📖 nombre</li>
            <li>💰 precio</li>
            <li>📦 stock</li>
            <li>🎬 quizás un video</li>
          </ul>
          <Nota><p>No toda esa información tiene necesariamente que almacenarse de la misma manera.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>9. Recuperemos el almacenamiento</h3>
          <Nota><p>Las fotografías y otros archivos pueden estar en:</p></Nota>
          <ConceptBadge>Almacenamiento</ConceptBadge>
          <p>Por ejemplo: libro.jpg, portada.jpg, video.mp4.</p>
          <Nota><p>Más adelante AWS nos mostrará servicios específicos para esto. Por ahora: almacenamiento = guardar objetos o archivos.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>10. Recuperemos la base de datos</h3>
          <Nota><p>Datos como nombre del producto, precio, stock, categoría, identificador, pueden estar organizados en:</p></Nota>
          <ConceptBadge>Base de datos</ConceptBadge>
          <table className="table lesson-summary-table">
            <thead><tr><th>Producto</th><th>Precio</th><th>Stock</th></tr></thead>
            <tbody><tr><td>Libro Cloud</td><td>$29.990</td><td>14</td></tr></tbody>
          </table>
          <p>Ahora nuestro servidor puede consultar:</p>
          <Dialogo>"¿Cuánto cuesta?" — "¿Hay unidades disponibles?"</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>11. ¿Dónde entra Cloud?</h3>
          <Nota><p>Todo lo anterior podría ejecutarse usando infraestructura Cloud.</p></Nota>
          <RoleGrid roles={[
            { icon: 'server', label: 'Procesamiento', desc: '' },
            { icon: 'package', label: 'Archivos', desc: '' },
            { icon: 'database', label: 'Datos', desc: '' },
          ]} />
          <Nota>
            <p>Cloud no significa que los computadores desaparecieron. Significa que utilizamos recursos tecnológicos administrados sobre infraestructura de un proveedor.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>12. ¿Dónde están físicamente esos recursos?</h3>
          <Nota><p>Detrás de Cloud existen:</p></Nota>
          <ConceptBadge>Centros de datos</ConceptBadge>
          <p>Que contienen: 🖥️ servidores, 💾 almacenamiento, 🌐 redes, 🔌 sistemas eléctricos, ❄️ refrigeración, 🔐 seguridad física.</p>
          <p>Así que podemos extender nuestro mapa:</p>
          <Flow steps={[
            { icon: 'cloud', label: 'Cloud' },
            { icon: 'building', label: 'Centros de datos', caption: '🖥️ · 💾 · 🌐' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>13. ¿Qué pasa si algo falla?</h3>
          <Nota><p>Una tienda importante no debería depender idealmente de un único componente.</p></Nota>
          <Flow steps={[
            { icon: 'server', label: 'Servidor único', caption: '❌' },
            { icon: 'zap', label: 'Servicio no disponible' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>14. Aquí aparece la redundancia</h3>
          <Nota><p>Podemos diseñar sistemas con recursos adicionales.</p></Nota>
          <CompareCols cols={[
            { icon: 'server', title: 'Servidor A', items: ['❌ Si presenta problemas...'] },
            { icon: 'server', title: 'Servidor B', items: ['✅ ...otro puede ayudar a mantener el servicio.'] },
          ]} />
          <Nota><p>Para nuestro nivel: redundancia = evitar depender de una sola pieza.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>15. Y eso nos lleva a disponibilidad</h3>
          <Nota><p>Disponibilidad significa:</p></Nota>
          <Dialogo>Que el servicio esté funcionando cuando el usuario lo necesita.</Dialogo>
          <p>Martina no quiere conocer la arquitectura. Ella quiere: 📚 ver el libro, 💳 comprar, ✅ terminar.</p>
          <Nota><p>Para el usuario, una buena arquitectura muchas veces es invisible. Y esa es una de sus mejores cualidades.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>16. Ahora hagamos el viaje completo</h3>
          <Flow steps={[
            { icon: 'user', label: 'USUARIO' },
            { icon: 'globe', label: 'NAVEGADOR' },
            { icon: 'book-open', label: 'DNS' },
            { icon: 'map-pin', label: 'DIRECCIÓN' },
            { icon: 'radio', label: 'INTERNET' },
            { icon: 'cloud', label: 'SERVICIO CLOUD', caption: '🖥️ Procesamiento · 📦 Almacenamiento · 🗄️ Base de datos' },
            { icon: 'building', label: 'CENTRO DE DATOS' },
            { icon: 'refresh', label: 'RECURSOS DE RESPALDO' },
            { icon: 'upload', label: 'RESPUESTA' },
            { icon: 'globe', label: 'NAVEGADOR' },
            { icon: 'user', label: 'USUARIO' },
          ]} />
          <Nota><p>Ese mapa resume prácticamente todo el Módulo 0.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>17. ¿Y dónde quedaron IaaS, PaaS y SaaS?</h3>
          <Nota><p>No han desaparecido. Describen qué nivel de servicio queremos consumir.</p></Nota>
          <ul className="plain-list">
            <li>🖥️ IaaS — "Quiero infraestructura."</li>
            <li>⚙️ PaaS — "Quiero un entorno preparado."</li>
            <li>📱 SaaS — "Quiero utilizar la aplicación."</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>18. Unamos las seis clases</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Clase</th><th>Pregunta principal</th><th>Concepto</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>¿Qué pasa al abrir una web?</td><td>Cliente, servidor, Internet</td></tr>
              <tr><td>2</td><td>¿Debo comprar mis servidores?</td><td>Cloud</td></tr>
              <tr><td>3</td><td>¿Qué puedo consumir en Cloud?</td><td>IaaS, PaaS, SaaS</td></tr>
              <tr><td>4</td><td>¿Cómo guardamos información?</td><td>Almacenamiento y BD</td></tr>
              <tr><td>5</td><td>¿Dónde está Cloud y cómo evitamos fallas?</td><td>Centros de datos y disponibilidad</td></tr>
              <tr><td>6</td><td>¿Cómo funciona todo junto?</td><td>Integración</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>19. Actividad principal: "Somos la nube"</h3>
          <Nota><p>Esta sería la actividad estrella del módulo. Seleccionamos estudiantes para representar:</p></Nota>
          <RoleGrid roles={[
            { icon: 'user', label: 'Usuario', desc: '' },
            { icon: 'globe', label: 'Navegador', desc: '' },
            { icon: 'book-open', label: 'DNS', desc: '' },
            { icon: 'radio', label: 'Internet', desc: '' },
            { icon: 'server', label: 'Servidor', desc: '' },
            { icon: 'package', label: 'Almacenamiento', desc: '' },
            { icon: 'database', label: 'Base de datos', desc: '' },
            { icon: 'refresh', label: 'Servidor de respaldo', desc: '' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>20. Escenario</h3>
          <Nota><p>El usuario dice:</p></Nota>
          <Dialogo>"Quiero ver una zapatilla roja que cuesta menos de $50.000."</Dialogo>
          <p>El flujo sería:</p>
          <Flow steps={[
            { icon: 'user', label: 'Usuario', caption: 'Hace la solicitud.' },
            { icon: 'globe', label: 'Navegador', caption: 'Recibe la petición.' },
            { icon: 'book-open', label: 'DNS', caption: 'Ayuda a localizar el servicio.' },
            { icon: 'radio', label: 'Internet', caption: 'Transporta la solicitud.' },
            { icon: 'server', label: 'Servidor', caption: 'Recibe el pedido.' },
            { icon: 'database', label: 'Base de datos', caption: 'Busca: Zapatilla roja · Precio: $45.000 · Stock: 8' },
            { icon: 'package', label: 'Almacenamiento', caption: 'Entrega: zapatilla-roja.jpg' },
            { icon: 'server', label: 'Servidor', caption: 'Construye la respuesta.' },
            { icon: 'globe', label: 'Navegador', caption: 'La muestra.' },
            { icon: 'user', label: 'Usuario', caption: 'Ve: 👟 Zapatilla roja · 💰 $45.000 · 📦 8 unidades' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>21. Agreguemos una falla</h3>
          <Nota><p>Ahora repetimos la actividad, pero la docente dice:</p></Nota>
          <Dialogo>"¡El servidor A falló!"</Dialogo>
          <p>El estudiante-servidor A se sienta. 😄</p>
          <QaItem question="¿Qué necesitamos para continuar?" answer="🔁 Otro recurso disponible." />
          <Nota><p>Aquí conectamos inmediatamente redundancia y disponibilidad.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>22. Reto final del Módulo 0</h3>
          <Nota><p>Presentamos este caso:</p></Nota>
          <ConceptBadge>MegaGame</ConceptBadge>
          <p>Una empresa tiene un videojuego online. Un jugador: 1. abre el juego, 2. inicia sesión, 3. selecciona su personaje, 4. ve su avatar, 5. consulta sus puntos, 6. comienza una partida.</p>
          <p>El sistema utiliza: 📸 imágenes, 👤 datos de jugadores, 🏆 puntajes, 🖥️ servidores, ☁️ Cloud, 🌐 Internet.</p>
        </section>

        <section className="lesson-section">
          <h3>23. Preguntas del reto</h3>
          <Nota><p>Los estudiantes deben responder con sus propias palabras:</p></Nota>
          <QaItem question="1. ¿Qué permite que el dispositivo del jugador se comunique con el sistema?" answer="🌐 Internet." />
          <QaItem question="2. ¿Qué componente podría procesar las solicitudes?" answer="🖥️ Servidor." />
          <QaItem question="3. ¿Dónde guardaríamos conceptualmente el avatar?" answer="📦 Almacenamiento." />
          <QaItem question="4. ¿Dónde guardaríamos el puntaje?" answer="🗄️ Base de datos." />
          <QaItem question="5. ¿Dónde podría estar funcionando toda esta infraestructura?" answer="☁️ Infraestructura Cloud / centros de datos." />
          <QaItem question="6. ¿Por qué sería conveniente no depender de un único servidor?" answer="🔁 Para mejorar la disponibilidad y reducir la dependencia de un único componente." />
        </section>

        <section className="lesson-section">
          <h3>25. Evaluación final</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>26. Juego final: encuentra el error</h3>
          <Nota><p>Ahora mostramos frases incorrectas. Los estudiantes deben corregirlas.</p></Nota>
          {FRASES_ERROR.map((f, i) => (
            <div key={f.frase} style={{ marginBottom: 'var(--space-4)' }}>
              <p style={{ marginBottom: 4 }}>Frase {i + 1}</p>
              <StrikeChip>❌ {f.frase}</StrikeChip>
              <Reveal label="Ver corrección">
                <p>{f.correccion}</p>
              </Reveal>
            </div>
          ))}
        </section>

        <section className="lesson-section">
          <h3>27. Actividad final: dibuja tu propia arquitectura</h3>
          <Nota><p>Les daría este caso:</p></Nota>
          <Dialogo>Una universidad quiere una plataforma donde estudiantes puedan iniciar sesión, ver sus notas, descargar materiales y revisar videos.</Dialogo>
          <p>Deben dibujar solamente usando estos símbolos: 👩 Usuario, 🌐 Internet, 🖥️ Servidor, 📦 Almacenamiento, 🗄️ Base de datos, ☁️ Cloud, 🏢 Centro de datos.</p>
          <Nota><p>No existe una única representación perfecta.</p></Nota>
          <Reveal label="Ver una representación posible">
            <Flow steps={[
              { icon: 'user', label: 'Estudiante' },
              { icon: 'globe', label: 'Internet' },
              { icon: 'cloud', label: 'Cloud' },
              { icon: 'server', label: 'Aplicación' },
              { icon: 'package', label: 'Almacenamiento', caption: 'PDF · Videos' },
              { icon: 'database', label: 'Base de datos', caption: 'Notas · Alumnos' },
            ]} />
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>28. Evaluación oral</h3>
          <Nota><p>Para comprobar comprensión real, elegiría estudiantes al azar y les pediría:</p></Nota>
          <Dialogo>"Explícame Cloud sin usar la palabra nube."</Dialogo>
          <Reveal label="Ver una respuesta válida">
            <Dialogo>"Es una forma de utilizar recursos tecnológicos proporcionados por otra empresa sin tener que comprar y mantener toda la infraestructura nosotros mismos."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>29. Segunda evaluación oral</h3>
          <Dialogo>"¿Qué ocurre aproximadamente cuando entro a una tienda online?"</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <Dialogo>"Mi navegador envía una solicitud por Internet. El sistema la procesa, puede consultar una base de datos y buscar archivos almacenados, y luego envía una respuesta que aparece en mi navegador."</Dialogo>
          </Reveal>
          <Nota><p>Si alguien puede decir eso con naturalidad, ya tenemos una base excelente para comenzar AWS.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>30. Escala de logro</h3>
          <Nota><p>Puedes evaluar el módulo con esta rúbrica sencilla:</p></Nota>
          <table className="table lesson-summary-table">
            <thead><tr><th>Nivel</th><th>Descripción</th></tr></thead>
            <tbody>
              <tr><td>🟢 Logrado</td><td>Explica los conceptos y los relaciona</td></tr>
              <tr><td>🟡 En proceso</td><td>Reconoce conceptos, pero le cuesta conectarlos</td></tr>
              <tr><td>🔴 Inicial</td><td>Memoriza palabras, pero no comprende el flujo</td></tr>
            </tbody>
          </table>
          <Nota><p>Yo priorizaría siempre Logrado = explicar con palabras propias, no repetir definiciones.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>31. Ticket de salida final</h3>
          <Nota><p>La última pregunta del Módulo 0 sería:</p></Nota>
          <Dialogo>"Antes de este módulo, ¿qué pensabas que era la nube y cómo la explicarías ahora?"</Dialogo>
          <p className="text-muted" style={{ fontSize: 12.5 }}>Esta pregunta además permite observar cuánto cambió la comprensión conceptual del estudiante.</p>
        </section>

        <section className="lesson-section">
          <h3>32. Las 10 ideas que deben sobrevivir</h3>
          <ol className="plain-list">
            <li>🌐 Internet permite comunicación.</li>
            <li>💻 Un cliente solicita.</li>
            <li>🖥️ Un servidor responde.</li>
            <li>📖 DNS ayuda a encontrar destinos usando nombres.</li>
            <li>☁️ Cloud permite utilizar recursos tecnológicos como servicios.</li>
            <li>🖥️ IaaS ofrece infraestructura.</li>
            <li>⚙️ PaaS ofrece un entorno preparado.</li>
            <li>📱 SaaS entrega aplicaciones listas para usar.</li>
            <li>📦 Almacenamiento y 🗄️ bases de datos resuelven necesidades diferentes.</li>
            <li>🔁 La redundancia puede ayudar a mejorar la disponibilidad.</li>
          </ol>
        </section>

        <section className="lesson-section">
          <h3>33. Cierre del Módulo 0</h3>
          <Nota><p>Yo terminaría proyectando:</p></Nota>
          <ConceptBadge>Ya sabemos qué problema resuelve Cloud. Ahora podemos aprender AWS.</ConceptBadge>
          <Nota><p>El estudiante todavía no necesita saber: ❌ crear EC2, ❌ configurar S3, ❌ escribir políticas IAM, ❌ crear una VPC, ❌ utilizar CLI.</p></Nota>
          <p>Pero ahora, cuando escuche <strong>EC2</strong>, podrá pensar "Servidor." Cuando escuche <strong>S3</strong>, "Almacenamiento." Cuando escuche <strong>RDS</strong>, "Base de datos."</p>
          <p>Y cuando hablemos de Regiones y Zonas de Disponibilidad, ya comprenderá que estamos intentando organizar infraestructura real para mantener servicios funcionando.</p>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="cloud" /> Fin del Módulo 0</div>
          <Nota>
            <p>El paso siguiente ya debería ser Módulo 1: Conociendo AWS, comenzando con una Clase 1 titulada "¿Qué es AWS y qué servicios nos ofrece?", donde por primera vez AWS deja de ser un nombre mencionado de pasada y se convierte en el protagonista del curso.</p>
          </Nota>
          <span className="tag tag-outline">Módulo 1 · próximamente</span>
        </div>

      </div>
    </div>
  );
}
