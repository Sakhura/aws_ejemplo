import {
  Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, CompareCols, Reveal, Quiz,
} from './lessonComponents.jsx';

const JUEGO_ARCHIVO_O_BD = [
  { q: 'Guardar fotografías de productos.', options: [{ text: '📦 Almacenamiento', correct: true }, { text: '🗄️ Base de datos', correct: false }] },
  { q: 'Consultar el stock de un producto.', options: [{ text: '📦 Almacenamiento', correct: false }, { text: '🗄️ Base de datos', correct: true }] },
  { q: 'Guardar videos de clases.', options: [{ text: '📦 Almacenamiento', correct: true }, { text: '🗄️ Base de datos', correct: false }] },
  { q: 'Buscar un estudiante por RUT.', options: [{ text: '📦 Almacenamiento', correct: false }, { text: '🗄️ Base de datos', correct: true }] },
  { q: 'Guardar 500 archivos PDF.', options: [{ text: '📦 Almacenamiento', correct: true }, { text: '🗄️ Base de datos', correct: false }] },
  { q: 'Consultar todas las notas de un estudiante.', options: [{ text: '📦 Almacenamiento', correct: false }, { text: '🗄️ Base de datos', correct: true }] },
];

const QUIZ_QUESTIONS = [
  {
    q: '¿Qué significa almacenar información?',
    options: [
      { text: 'Eliminar información.', correct: false },
      { text: 'Guardarla para utilizarla posteriormente.', correct: true },
      { text: 'Imprimirla.', correct: false },
      { text: 'Enviarla por correo.', correct: false },
    ],
  },
  {
    q: '¿Cuál es un ejemplo de archivo?',
    options: [
      { text: 'informe.pdf', correct: true },
      { text: 'Una contraseña.', correct: false },
      { text: 'Internet.', correct: false },
      { text: 'Una dirección IP.', correct: false },
    ],
  },
  {
    q: 'Una empresa necesita guardar miles de fotografías. ¿Qué opción representa mejor esta necesidad?',
    options: [
      { text: 'Almacenamiento de archivos/objetos.', correct: true },
      { text: 'DNS.', correct: false },
      { text: 'Dirección IP.', correct: false },
      { text: 'Navegador.', correct: false },
    ],
  },
  {
    q: 'Una universidad necesita consultar las notas de un estudiante utilizando su RUT. ¿Qué sería conceptualmente más apropiado?',
    options: [
      { text: 'Una carpeta de fotografías.', correct: false },
      { text: 'Una base de datos.', correct: true },
      { text: 'DNS.', correct: false },
      { text: 'Navegador.', correct: false },
    ],
  },
  {
    q: '¿Puede una aplicación utilizar almacenamiento y base de datos al mismo tiempo?',
    options: [
      { text: 'No.', correct: false },
      { text: 'Sí.', correct: true },
    ],
  },
  {
    q: '¿Cuál servicio relacionaremos posteriormente con almacenamiento de objetos en AWS?',
    options: [
      { text: 'Amazon S3.', correct: true },
      { text: 'Amazon RDS.', correct: false },
      { text: 'Gmail.', correct: false },
      { text: 'DNS.', correct: false },
    ],
  },
  {
    q: '¿Cuál servicio relacionaremos posteriormente con bases de datos relacionales administradas?',
    options: [
      { text: 'Amazon S3.', correct: false },
      { text: 'Amazon RDS.', correct: true },
      { text: 'Chrome.', correct: false },
      { text: 'DNS.', correct: false },
    ],
  },
];

export default function Clase4() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 0 · Clase 4</div>
      <div className="lesson-eyebrow">☁️ AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 0 · Clase 4: Archivos, almacenamiento y bases de datos</h2>
      <p className="lesson-subtitle">
        No toda la información se guarda ni se utiliza de la misma manera: la diferencia entre guardar un archivo y organizar información consultable.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial absoluto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas sin conocimientos técnicos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Teórico-práctica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Clases 1, 2 y 3</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>🎯 1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar la clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué significa almacenamiento.</li>
            <li>Reconocer diferentes tipos de archivos.</li>
            <li>Comprender para qué sirve una base de datos.</li>
            <li>Diferenciar almacenamiento de archivos y base de datos.</li>
            <li>Elegir conceptualmente dónde guardar determinada información.</li>
            <li>Comprender que los servicios Cloud también pueden almacenar información.</li>
          </ul>
          <Nota><p>La idea central de toda la clase será:</p></Nota>
          <Dialogo>No toda la información se guarda ni se utiliza de la misma manera.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>🧠 2. Activación de conocimientos previos</h3>
          <Nota><p>Comenzaría mostrando tres elementos:</p></Nota>
          <ul className="plain-list">
            <li>📸 Una fotografía</li>
            <li>📄 Un PDF</li>
            <li>👩‍🎓 Una ficha de estudiante: Nombre: Ana Pérez · RUT: 12.345.678-9 · Carrera: Informática · Asignatura: Cloud · Nota: 6,2</li>
          </ul>
          <p>Y preguntaría:</p>
          <Dialogo>¿Los tres contienen información?</Dialogo>
          <p>Sí.</p>
          <p>Luego:</p>
          <Dialogo>¿Los guardarían exactamente de la misma manera?</Dialogo>
          <p>Aquí comienza la discusión.</p>
        </section>

        <section className="lesson-section">
          <h3>📦 3. ¿Qué significa almacenar?</h3>
          <Nota><p>Almacenar significa, en términos sencillos:</p></Nota>
          <Dialogo>Guardar información para poder utilizarla posteriormente.</Dialogo>
          <p>Lo hacemos constantemente:</p>
          <ul className="plain-list">
            <li>📱 Fotografías en el teléfono</li>
            <li>💻 Documentos en el computador</li>
            <li>☁️ Archivos en Google Drive</li>
            <li>💾 Información en un pendrive</li>
            <li>📧 Archivos adjuntos en correo</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>🏠 4. Analogía del clóset</h3>
          <Nota><p>Imaginemos nuestro computador como una casa. Tenemos un clóset.</p></Nota>
          <InfoBox title="🚪 CLÓSET" items={[
            '📁 Fotografías — vacaciones.jpg, perro.jpg, cumpleaños.jpg',
            '📁 Documentos — contrato.pdf, curriculum.pdf',
            '📁 Trabajo — informe.docx, presupuesto.xlsx',
          ]} />
          <p>Estamos: 📦 almacenando archivos.</p>
        </section>

        <section className="lesson-section">
          <h3>📄 5. ¿Qué es un archivo?</h3>
          <Nota><p>Un archivo es una unidad de información almacenada digitalmente.</p></Nota>
          <p>Ejemplos: 📸 foto.jpg, 📄 contrato.pdf, 🎵 cancion.mp3, 🎬 video.mp4, 📊 presupuesto.xlsx, 📝 informe.docx.</p>
          <Nota>
            <p>No necesitamos que memoricen extensiones. Solo queremos que comprendan: los archivos pueden contener diferentes tipos de información.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>☁️ 6. ¿Y si no quiero guardar el archivo en mi computador?</h3>
          <Nota><p>Recordemos nuestra Clase 2. Podemos utilizar recursos disponibles mediante Cloud. Por ejemplo, podemos almacenar archivos en infraestructura de un proveedor.</p></Nota>
          <p>Conceptualmente:</p>
          <Flow steps={[
            { emoji: '💻', label: 'MI COMPUTADOR' },
            { emoji: '📡', label: 'Internet' },
            { emoji: '☁️', label: 'CLOUD' },
            { emoji: '📦', label: 'ALMACENAMIENTO', caption: 'foto.jpg · contrato.pdf · video.mp4' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>🌎 7. Ya hacemos esto todos los días</h3>
          <Nota>
            <p>Cuando utilizamos servicios como Google Drive, OneDrive o Dropbox, estamos acostumbrados a guardar archivos fuera de nuestro computador y acceder a ellos mediante Internet.</p>
          </Nota>
          <p>Para el usuario:</p>
          <Dialogo>“Guardé mi archivo en la nube.”</Dialogo>
          <p>Detrás de esa experiencia existe infraestructura física que almacena la información.</p>
        </section>

        <section className="lesson-section">
          <h3>🪣 8. Preparándonos para AWS</h3>
          <Nota><p>Más adelante conoceremos un servicio de AWS llamado:</p></Nota>
          <ConceptBadge>📦 Amazon S3</ConceptBadge>
          <p>Por ahora no enseñaría cómo funciona. Solo plantaría la semilla:</p>
          <Dialogo>S3 es un servicio de AWS utilizado para almacenar objetos, como archivos, en la nube.</Dialogo>
          <p>Ejemplos: 📸 imágenes, 🎬 videos, 📄 documentos, 💾 copias de seguridad.</p>
          <Nota><p>Todavía no necesitamos hablar de buckets, clases de almacenamiento, políticas o versionado. Eso llegará después.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>🤔 9. Ahora aparece otro problema</h3>
          <Nota><p>Supongamos que tenemos: 🏫 10 estudiantes. Podríamos tener un archivo con sus datos.</p></Nota>
          <p>Pero ahora nuestra institución tiene: 👩‍🎓 50.000 estudiantes. Necesitamos almacenar: nombre, RUT, carrera, asignaturas, docentes, notas, asistencia, pagos.</p>
          <p>Además queremos hacer preguntas como:</p>
          <Dialogo>“Muéstrame todos los estudiantes de Informática.”</Dialogo>
          <Dialogo>“Busca al estudiante con este RUT.”</Dialogo>
          <Dialogo>“Muéstrame los estudiantes con nota superior a 6.”</Dialogo>
          <p>Aquí una carpeta llena de documentos comienza a ser bastante incómoda. 😵‍💫</p>
        </section>

        <section className="lesson-section">
          <h3>🗄️ 10. Aparece la base de datos</h3>
          <Nota>
            <p>Una base de datos permite almacenar información de manera organizada para facilitar operaciones como: 🔍 buscar, ✏️ actualizar, ➕ agregar, 🗑️ eliminar, 🔗 relacionar información.</p>
          </Nota>
          <p>Una explicación sencilla sería:</p>
          <Dialogo>Una base de datos es una forma organizada de guardar información para poder encontrarla y trabajar con ella fácilmente.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>📒 11. La analogía de la agenda</h3>
          <Nota><p>Pensemos en la agenda de contactos del teléfono. Tenemos:</p></Nota>
          <table className="table lesson-summary-table">
            <thead><tr><th>Nombre</th><th>Teléfono</th><th>Correo</th></tr></thead>
            <tbody>
              <tr><td>Ana</td><td>912345678</td><td>ana@email.cl</td></tr>
              <tr><td>Pedro</td><td>923456789</td><td>pedro@email.cl</td></tr>
              <tr><td>Carla</td><td>934567890</td><td>carla@email.cl</td></tr>
            </tbody>
          </table>
          <p>Podemos preguntar:</p>
          <Dialogo>“Busca a Pedro.”</Dialogo>
          <p>Y obtenemos su información. Eso se parece mucho más conceptualmente a una base de datos.</p>
        </section>

        <section className="lesson-section">
          <h3>🛒 12. Ejemplo de una tienda</h3>
          <Nota><p>Tenemos una tienda online. Vendemos productos. Necesitamos guardar:</p></Nota>
          <table className="table lesson-summary-table">
            <thead><tr><th>Producto</th><th>Precio</th><th>Stock</th></tr></thead>
            <tbody>
              <tr><td>Notebook</td><td>$600.000</td><td>5</td></tr>
              <tr><td>Mouse</td><td>$15.000</td><td>30</td></tr>
              <tr><td>Teclado</td><td>$25.000</td><td>12</td></tr>
            </tbody>
          </table>
          <p>Ahora un cliente compra: 2 Mouse. El sistema puede actualizar:</p>
          <Flow steps={[
            { emoji: '📦', label: 'Antes', caption: 'Mouse · Stock: 30' },
            { emoji: '🛒', label: 'Compra 2' },
            { emoji: '📦', label: 'Después', caption: 'Mouse · Stock: 28' },
          ]} />
          <Nota><p>Estamos trabajando con información estructurada que cambia constantemente. Una base de datos resulta apropiada para este tipo de necesidad.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>📸 13. ¿Y la fotografía del producto?</h3>
          <Nota><p>Aquí está la parte importante. Nuestra tienda también tiene: 📸 notebook.jpg.</p></Nota>
          <p>¿Guardamos el precio dentro de la fotografía? No. ¿Guardamos el stock dentro del JPG? No.</p>
          <p>Podemos tener conceptualmente:</p>
          <CompareCols cols={[
            { emoji: '📦', title: 'Archivos', items: ['notebook.jpg', 'mouse.jpg', 'teclado.jpg'] },
            { emoji: '🗄️', title: 'Base de datos', items: ['Notebook', '$600.000', 'Stock: 5'] },
          ]} />
          <Nota><p>Ambos trabajan juntos.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>🧠 14. La diferencia importante</h3>
          <CompareCols cols={[
            { emoji: '📦', title: 'Almacenamiento', items: ['Quiero guardar algo.'] },
            { emoji: '🗄️', title: 'Base de datos', items: ['Quiero guardar información organizada y trabajar con ella.'] },
          ]} />
          <p>Esta simplificación es suficiente para nuestro nivel inicial.</p>
        </section>

        <section className="lesson-section">
          <h3>🏫 15. Ejemplo académico</h3>
          <Nota><p>Pensemos en una institución educativa.</p></Nota>
          <CompareCols cols={[
            { emoji: '📦', title: 'Material de clases → Almacenamiento', items: ['📄 PDF', '🎬 videos', '📸 imágenes', '📊 presentaciones'] },
            { emoji: '🗄️', title: 'Información académica → Base de datos', items: ['👩‍🎓 estudiantes', '👨‍🏫 docentes', '📚 asignaturas', '📝 notas', '📅 asistencia'] },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>🎮 16. Juego: ¿Archivo o base de datos?</h3>
          <Nota><p>Los estudiantes pueden levantar dos tarjetas (📦 Almacenamiento / 🗄️ Base de datos) mientras la docente lee cada situación.</p></Nota>
          <Quiz questions={JUEGO_ARCHIVO_O_BD} />
        </section>

        <section className="lesson-section">
          <h3>😈 17. Hagámoslo un poquito más difícil</h3>
          <Dialogo>Una red social necesita guardar fotografías de usuarios y además sus nombres, correos y publicaciones. ¿Qué utilizamos?</Dialogo>
          <p>La respuesta correcta no es necesariamente elegir uno. Podemos necesitar:</p>
          <ConceptBadge>📦 + 🗄️ Almacenamiento + Base de datos</ConceptBadge>
          <p>Por ejemplo, para 👩 un usuario:</p>
          <ul className="plain-list">
            <li>Nombre → 🗄️ Base de datos</li>
            <li>Correo → 🗄️ Base de datos</li>
            <li>Foto → 📦 Almacenamiento</li>
            <li>Video → 📦 Almacenamiento</li>
          </ul>
          <Nota><p>Esta idea es importante porque los sistemas reales combinan diferentes servicios.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>🏢 18. Volvamos a Cloud</h3>
          <Nota><p>Recordemos: en Cloud podemos contratar diferentes recursos. No solamente 🖥️ servidores. También 📦 almacenamiento y 🗄️ bases de datos.</p></Nota>
          <p>Nuestro mapa comienza a crecer:</p>
          <RoleGrid roles={[
            { emoji: '🖥️', label: 'Servidor', desc: '' },
            { emoji: '📦', label: 'Archivos', desc: '' },
            { emoji: '🗄️', label: 'Datos', desc: '' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>☁️ 19. Preparándonos para AWS</h3>
          <Nota><p>Ahora sí podemos mostrar dos nombres que conoceremos más adelante:</p></Nota>
          <ConceptBadge>📦 Amazon S3 — almacenamiento de objetos</ConceptBadge>
          <ConceptBadge>🗄️ Amazon RDS — servicio administrado de bases de datos relacionales</ConceptBadge>
          <Nota>
            <p>En esta clase no necesitamos configurarlos. Solo quiero que cuando posteriormente aparezca Amazon S3, el estudiante piense 📦 “Guardar archivos/objetos.” Y cuando aparezca Amazon RDS, piense 🗄️ “Base de datos.”</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>⚠️ 20. Una precisión importante</h3>
          <Nota><p>No enseñaría que:</p></Nota>
          <Dialogo>“S3 guarda archivos y RDS guarda datos.”</Dialogo>
          <p>Porque técnicamente los archivos también son datos. Para este nivel es mejor decir:</p>
          <p>S3 está pensado para almacenamiento de objetos. RDS proporciona bases de datos relacionales administradas. Luego profundizaremos.</p>
        </section>

        <section className="lesson-section">
          <h3>🧪 21. Actividad práctica grupal</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge>🐾 Veterinaria CloudPet</ConceptBadge>
          <p>La veterinaria necesita almacenar: fotografías de mascotas, nombre de las mascotas, datos de propietarios, informes PDF, historial de citas, videos, información de veterinarios, horarios disponibles.</p>
          <p>Los estudiantes deben clasificar cada elemento:</p>
          <table className="table lesson-summary-table">
            <thead><tr><th>Información</th><th>📦 Almacenamiento</th><th>🗄️ Base de datos</th></tr></thead>
            <tbody>
              <tr><td>Fotografías</td><td>✅</td><td></td></tr>
              <tr><td>Nombre mascota</td><td></td><td>✅</td></tr>
              <tr><td>Propietario</td><td></td><td>✅</td></tr>
              <tr><td>PDF</td><td>✅</td><td></td></tr>
              <tr><td>Citas</td><td></td><td>✅</td></tr>
              <tr><td>Videos</td><td>✅</td><td></td></tr>
              <tr><td>Veterinarios</td><td></td><td>✅</td></tr>
              <tr><td>Horarios</td><td></td><td>✅</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>🔍 22. Segunda parte de la actividad</h3>
          <Dialogo>Una mascota puede tener muchas fotografías. ¿Necesitamos elegir solamente almacenamiento o base de datos?</Dialogo>
          <p>No. Podemos utilizar ambos. Por ejemplo:</p>
          <CompareCols cols={[
            { emoji: '🗄️', title: '🐶 Firulais → Base de datos', items: ['Nombre', 'Edad', 'Propietario', 'Historial'] },
            { emoji: '📦', title: '🐶 Firulais → Almacenamiento', items: ['foto1.jpg', 'foto2.jpg', 'examen.pdf'] },
          ]} />
          <Nota><p>Aquí empiezan a visualizar una arquitectura sin darse cuenta. Y eso nos viene de maravilla. 🧩</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>📝 23. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>🏆 24. Reto de la clase</h3>
          <Nota><p>Presentaría el siguiente escenario:</p></Nota>
          <ConceptBadge>🎮 GameCloud</ConceptBadge>
          <p>Estamos creando un videojuego online. Necesitamos guardar: 🎭 avatar del jugador, 👤 nombre del jugador, 🏆 puntaje, 🎬 videos promocionales, 💰 monedas obtenidas, 📸 capturas del juego, 📊 nivel alcanzado.</p>
          <p>Los estudiantes deben decidir:</p>
          <Dialogo>¿Qué guardarías como archivos/objetos y qué información organizarías en una base de datos?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <table className="table lesson-summary-table">
              <thead><tr><th>Información</th><th>Solución conceptual</th></tr></thead>
              <tbody>
                <tr><td>🎭 Avatar</td><td>📦 Almacenamiento</td></tr>
                <tr><td>👤 Nombre</td><td>🗄️ Base de datos</td></tr>
                <tr><td>🏆 Puntaje</td><td>🗄️ Base de datos</td></tr>
                <tr><td>🎬 Videos</td><td>📦 Almacenamiento</td></tr>
                <tr><td>💰 Monedas</td><td>🗄️ Base de datos</td></tr>
                <tr><td>📸 Capturas</td><td>📦 Almacenamiento</td></tr>
                <tr><td>📊 Nivel</td><td>🗄️ Base de datos</td></tr>
              </tbody>
            </table>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>🧠 25. Pregunta trampa</h3>
          <Nota><p>Finalmente preguntaría:</p></Nota>
          <Dialogo>“Entonces Amazon S3 y Amazon RDS hacen exactamente lo mismo porque ambos guardan información.”</Dialogo>
          <ConceptBadge variant="danger">❌ FALSO</ConceptBadge>
          <Nota>
            <p>Ambos almacenan información, pero están diseñados para necesidades y formas de acceso diferentes. Para nuestro nivel: 📦 S3 → objetos/archivos, 🗄️ RDS → información organizada en bases de datos relacionales.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>📌 26. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th><th>Ejemplo</th></tr></thead>
            <tbody>
              <tr><td>📄 Archivo</td><td>Unidad de información</td><td>foto.jpg</td></tr>
              <tr><td>📦 Almacenamiento</td><td>Guarda archivos/objetos</td><td>Fotos y videos</td></tr>
              <tr><td>🗄️ Base de datos</td><td>Organiza información consultable</td><td>Clientes, productos</td></tr>
              <tr><td>☁️ S3</td><td>Almacenamiento de objetos en AWS</td><td>Imágenes</td></tr>
              <tr><td>☁️ RDS</td><td>Bases de datos relacionales administradas</td><td>Clientes y ventas</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>🎟️ 27. Ticket de salida</h3>
          <Nota><p>Antes de terminar, cada estudiante responde:</p></Nota>
          <Dialogo>Una tienda online tiene fotografías de sus productos, precios y stock. ¿Necesita almacenamiento, base de datos o ambos? Explica por qué.</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Ambos. Las fotografías pueden almacenarse como objetos/archivos, mientras que precios, productos y stock pueden organizarse en una base de datos.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow">🔗 Puente hacia la Clase 5</div>
          <Nota><p>Cerraría la clase mostrando nuestro Cloud:</p></Nota>
          <RoleGrid roles={[
            { emoji: '🖥️', label: 'Servidores', desc: '' },
            { emoji: '📦', label: 'Archivos', desc: '' },
            { emoji: '🗄️', label: 'Datos', desc: '' },
          ]} />
          <p>Y haría una pregunta:</p>
          <Dialogo>“Muy bonito todo… pero ¿dónde están físicamente esas máquinas?”</Dialogo>
          <p>Porque la nube no vive en una nube. ☁️😄 Está funcionando sobre infraestructura real. Y esa infraestructura está distribuida en enormes instalaciones alrededor del mundo.</p>
          <span className="tag tag-outline">Clase 5 · próximamente</span>
        </div>

      </div>
    </div>
  );
}
