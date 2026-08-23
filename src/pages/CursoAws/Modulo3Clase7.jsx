import {
  Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, CompareCols, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué servicio utilizamos como capacidad de cómputo?', options: [{ text: 'EC2', correct: true }, { text: 'IAM', correct: false }, { text: 'S3', correct: false }, { text: 'Route 53', correct: false }] },
  { q: '¿Qué utilizamos como plantilla de la instancia?', options: [{ text: 'AMI', correct: true }, { text: 'Security Group', correct: false }, { text: 'EBS Snapshot', correct: false }, { text: 'IAM Group', correct: false }] },
  { q: '¿Qué controla conexiones permitidas hacia la instancia?', options: [{ text: 'Security Group', correct: true }, { text: 'AMI', correct: false }, { text: 'EBS', correct: false }, { text: 'Tag', correct: false }] },
  { q: '¿Qué puerto asociamos normalmente a HTTP?', options: [{ text: '22', correct: false }, { text: '80', correct: true }, { text: '443 solamente', correct: false }, { text: '3306', correct: false }] },
  { q: '¿Qué software instalamos para entregar la página?', options: [{ text: 'Apache HTTP Server', correct: true }, { text: 'IAM', correct: false }, { text: 'EBS', correct: false }, { text: 'CloudWatch', correct: false }] },
  { q: '¿Permitir el puerto 80 instala Apache?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Apache Running significa que EC2 está necesariamente Running?', options: [{ text: 'Debemos comprobar ambas capas.', correct: true }, { text: 'Sí automáticamente.', correct: false }] },
  { q: '¿Dónde observamos métricas básicas de EC2?', options: [{ text: 'CloudWatch / Monitoring', correct: true }, { text: 'IAM solamente', correct: false }, { text: 'S3', correct: false }, { text: 'DNS', correct: false }] },
  { q: '¿Debemos dejar la instancia Running después del laboratorio si no se necesita?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Terminate garantiza automáticamente que todos los recursos asociados desaparezcan?', options: [{ text: 'Sí.', correct: false }, { text: 'No, debemos revisarlos.', correct: true }] },
];

export default function Modulo3Clase7() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 3 · Clase 7</div>
      <div className="lesson-eyebrow">🏆 AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 3 · Clase 7: Laboratorio integrador, publica tu primera página web con Amazon EC2</h2>
      <p className="lesson-subtitle">
        Cierre práctico del módulo: conectamos AMI, tipo de instancia, Security Group, EBS, acceso, servidor web, monitoreo y costos en una sola solución.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 a 60 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Laboratorio integrador + desafío práctico + evaluación final</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 3 · Clases 1 a 6</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>🎯 1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Planificar una instancia EC2 antes de crearla.</li>
            <li>Seleccionar una AMI apropiada.</li>
            <li>Elegir un tipo de instancia adecuado.</li>
            <li>Configurar almacenamiento básico.</li>
            <li>Reconocer la configuración de red.</li>
            <li>Configurar un Security Group para una página web.</li>
            <li>Conectarse a una instancia Linux mediante un método autorizado.</li>
            <li>Instalar un servidor web.</li>
            <li>Crear una página HTML sencilla.</li>
            <li>Acceder a la página desde un navegador.</li>
            <li>Reconocer la relación entre IP, puerto y servicio.</li>
            <li>Revisar métricas básicas.</li>
            <li>Identificar recursos asociados.</li>
            <li>Limpiar la infraestructura utilizada.</li>
          </ul>
          <p>La idea que debe sobrevivir será:</p>
          <Dialogo>🚀 Una página en EC2 funciona porque varias piezas trabajan juntas: cómputo, red, seguridad, almacenamiento y software.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>🧠 2. Hoy no empezamos creando</h3>
          <Nota><p>Antes de entrar a AWS, presentamos la misión:</p></Nota>
          <ConceptBadge>🌐 MISIÓN — Publicar una página web sencilla utilizando Amazon EC2</ConceptBadge>
          <Flow steps={[
            { emoji: '👩', label: 'Usuario' },
            { emoji: '🌐', label: 'Navegador' },
            { emoji: '📡', label: 'Internet' },
            { emoji: '🛡️', label: 'Security Group' },
            { emoji: '🖥️', label: 'Amazon EC2' },
            { emoji: '🌐', label: 'Servidor web' },
            { emoji: '📄', label: 'index.html' },
          ]} />
          <p>Ese dibujo resume prácticamente todo el módulo.</p>
        </section>

        <section className="lesson-section">
          <h3>🧩 3. Antes de tocar AWS: diseñemos</h3>
          <Dialogo>¿Qué necesitamos para realizar este laboratorio?</Dialogo>
          <RoleGrid roles={[
            { emoji: '🖥️', label: 'Cómputo', desc: 'Amazon EC2' },
            { emoji: '📀', label: 'Plantilla', desc: 'Una AMI Linux adecuada' },
            { emoji: '⚙️', label: 'Capacidad', desc: 'Instancia pequeña suficiente para el laboratorio' },
            { emoji: '💾', label: 'Almacenamiento', desc: 'Un volumen EBS básico' },
            { emoji: '🔐', label: 'Seguridad', desc: 'Permitir solamente las conexiones necesarias' },
            { emoji: '🌐', label: 'Aplicación', desc: 'Un servidor web' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>📝 4. Nuestra ficha de arquitectura</h3>
          <Nota><p>Antes de crear nada, cada estudiante completa: Proyecto (Mi primera web AWS), Región, AMI, Tipo de instancia, Sistema operativo, Puerto web, Acceso administrativo, Almacenamiento.</p></Nota>
          <p>Si no pueden completar esta hoja, todavía no deberían presionar Launch Instance.</p>
        </section>

        <section className="lesson-section">
          <h3>🌎 5. Paso 1: comprobar la Región</h3>
          <Dialogo>¿En qué Región estamos trabajando?</Dialogo>
          <Flow steps={[{ emoji: '☁️', label: 'AWS' }, { emoji: '🌎', label: 'Región' }, { emoji: '🏢', label: 'Availability Zone' }, { emoji: '🖥️', label: 'EC2' }]} />
          <p>Todos los estudiantes deberían trabajar en la Región indicada para el laboratorio, salvo que exista una razón diferente.</p>
        </section>

        <section className="lesson-section">
          <h3>🔎 6. Paso 2: entrar a Amazon EC2</h3>
          <p>Utilizamos el buscador de servicios, buscamos EC2, entramos al servicio y luego: <strong>Instances → Launch instance</strong>.</p>
        </section>

        <section className="lesson-section">
          <h3>🏷️ 7. Paso 3: nombre y etiquetas</h3>
          <Nota><p>Usaremos un nombre claro, por ejemplo <code>web-aws-curso</code> o <code>ec2-web-clase7</code>. Evitaría <code>prueba</code> o <code>servidor1</code> si después tendremos muchos recursos.</p></Nota>
          <p>Podemos agregar etiquetas, por ejemplo:</p>
          <ConceptBadge>Curso = AWSDesdeCero · Modulo = EC2 · Ambiente = Laboratorio</ConceptBadge>
          <p>Los nombres deben ayudarnos a entender qué es y para qué existe.</p>
        </section>

        <section className="lesson-section">
          <h3>📀 8. Paso 4: elegir AMI</h3>
          <Nota><p>Para este laboratorio utilizaremos una imagen Linux adecuada proporcionada por una fuente confiable, por ejemplo una opción oficial de Amazon Linux disponible en la consola.</p></Nota>
          <QaItem question="¿Qué estamos eligiendo?" answer="📀 La plantilla inicial de nuestra instancia." />
          <p>¿Por qué Linux? Porque nos permitirá instalar fácilmente un servidor web sencillo y practicar conceptos básicos. Pero la lección no es "EC2 siempre usa Linux" — EC2 permite distintos sistemas según las necesidades.</p>
        </section>

        <section className="lesson-section">
          <h3>⚙️ 9. Paso 5: tipo de instancia</h3>
          <Nota><p>Seleccionamos un tipo pequeño apropiado para el laboratorio y revisamos: 🧠 vCPU; 🧮 memoria; 💰 condiciones de precio; 🏗️ compatibilidad.</p></Nota>
          <p>Recordamos: 🎯 Right sizing. No queremos una máquina gigantesca para entregar una página con dos líneas de texto.</p>
          <QaItem question="Un estudiante selecciona una instancia extremadamente grande. ¿Qué preguntamos?" answer="¿Qué necesidad concreta justifica esa capacidad? Si la respuesta es 'ninguna', cambiamos la elección. La infraestructura se justifica por necesidad, no por entusiasmo." />
        </section>

        <section className="lesson-section">
          <h3>🔑 10. Paso 6: método de acceso</h3>
          <Nota><p>Según la configuración elegida para el laboratorio, podemos utilizar un método de conexión autorizado como EC2 Instance Connect (cuando esté disponible y configurado), SSH con key pair, o Session Manager si la infraestructura está preparada.</p></Nota>
          <p>Para nuestro público: necesitamos una forma segura de administrar la instancia.</p>
          <p>Si usamos Key Pair: recordamos 🔓 parte pública + 🔐 clave privada. La clave privada no se comparte, no se publica y no se sube a GitHub.</p>
        </section>

        <section className="lesson-section">
          <h3>🌐 11. Paso 7: red</h3>
          <p>Revisamos: 🌐 VPC, 🏘️ Subnet, 🌍 Public IP. No profundizamos en VPC todavía, pero sabemos: nuestra instancia necesita conectividad apropiada para el objetivo del laboratorio.</p>
          <Dialogo>¿Necesitamos acceso desde Internet? Sí, porque queremos que un navegador pueda acceder a nuestra página. Pero esto no significa "abrimos todo".</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>🛡️ 12. Paso 8: Security Group</h3>
          <Nota><p>Nuestro servidor tendrá dos necesidades diferentes:</p></Nota>
          <RoleGrid roles={[
            { emoji: '🌐', label: 'Usuarios web', desc: 'Necesitan acceder a HTTP, puerto 80' },
            { emoji: '👩', label: 'Administrador', desc: 'Acceso administrativo según el método utilizado, por ejemplo SSH puerto 22' },
          ]} />
          <p>Diseñemos primero las reglas:</p>
          <InfoBox title="Regla web" items={['Tipo: HTTP', 'Puerto: 80', 'Origen: público según objetivo']} />
          <InfoBox title="Regla administrativa" items={['Tipo: SSH', 'Puerto: 22', 'Origen: restringido']} />
          <p>No deben tener necesariamente el mismo origen.</p>
        </section>

        <section className="lesson-section">
          <h3>🌎 13. ¿Por qué HTTP público y SSH restringido?</h3>
          <p>Porque queremos que usuarios puedan visitar nuestra página:</p>
          <Flow steps={[{ emoji: '🌎', label: 'Internet' }, { emoji: '🚪', label: 'Puerto 80' }, { emoji: '🖥️', label: 'EC2' }]} />
          <Nota><p>SSH es una vía administrativa. No queremos que cualquiera llegue por SSH si podemos restringirlo. Aplicamos: mínimo acceso necesario.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>💾 14. Paso 9: almacenamiento</h3>
          <p>Revisamos el almacenamiento EBS. Para una página sencilla, utilizamos únicamente la capacidad necesaria para el laboratorio.</p>
          <Flow steps={[{ emoji: '🖥️', label: 'EC2 procesa' }, { emoji: '💾', label: 'EBS almacena' }]} />
        </section>

        <section className="lesson-section">
          <h3>🔍 15. Paso 10: revisar antes de lanzar</h3>
          <InfoBox items={['Región correcta', 'Nombre claro', 'AMI apropiada', 'Tipo adecuado', 'Método de acceso correcto', 'Red revisada', 'Security Group revisado', 'Almacenamiento revisado', 'Precio revisado']} />
          <p>Ahora sí: 🚀 Launch instance.</p>
          <Flow steps={[{ emoji: '⏳', label: 'Pending' }, { emoji: '🟢', label: 'Running' }]} />
          <p>Cuando aparece Running, nuestro servidor virtual está ejecutándose. Pero todavía no tenemos una página.</p>
        </section>

        <section className="lesson-section">
          <h3>🕵️ 16. Detective EC2</h3>
          <Nota><p>Antes de conectarnos, los estudiantes identifican:</p></Nota>
          <InfoBox items={['Instance ID', 'Instance Type', 'AMI', 'Availability Zone', 'Public IPv4', 'Private IPv4', 'Security Group', 'EBS']} />
        </section>

        <section className="lesson-section">
          <h3>🔌 17. Paso 11: conectarnos</h3>
          <Nota><p>Utilizamos el mecanismo configurado para el laboratorio. Una vez conectados veremos una terminal. Para muchos estudiantes será la primera vez que entren a un servidor remoto.</p></Nota>
          <Dialogo>No estamos trabajando directamente en nuestro computador. Estamos enviando instrucciones al servidor EC2.</Dialogo>
          <Flow steps={[{ emoji: '👩', label: 'Mi computador' }, { emoji: '🌐', label: 'Internet / conexión autorizada' }, { emoji: '🖥️', label: 'EC2' }]} />
        </section>

        <section className="lesson-section">
          <h3>🐧 18. Primero reconocemos dónde estamos</h3>
          <Nota><p>Podemos utilizar comandos básicos de Linux apropiados para observar:</p></Nota>
          <InfoBox items={['whoami — conocer el usuario actual', 'hostname — identificar el sistema']} />
          <p>El objetivo no es enseñar Linux completo. Solo demostrar: "estoy dentro del servidor".</p>
        </section>

        <section className="lesson-section">
          <h3>📦 19. Necesitamos un servidor web</h3>
          <Nota><p>Una instancia Linux sola no necesariamente entrega páginas web. Necesitamos instalar software capaz de responder solicitudes HTTP.</p></Nota>
          <p>Para nuestro laboratorio utilizaremos <strong>Apache HTTP Server</strong> (en Amazon Linux suele identificarse como <code>httpd</code>).</p>
          <Nota><p>Analogía: tenemos el edificio (🏢 EC2), pero necesitamos alguien que atienda pedidos: 👨‍🍳 el servidor web. Cuando llega <code>GET /</code>, el servidor web busca la página correspondiente y responde.</p></Nota>
          <Flow steps={[{ emoji: '🌐', label: 'Navegador' }, { emoji: '🚪', label: 'Puerto 80' }, { emoji: '🌐', label: 'Apache' }, { emoji: '📄', label: 'HTML' }]} />
        </section>

        <section className="lesson-section">
          <h3>🛠️ 20. Instalar y arrancar Apache</h3>
          <Nota><p>En una instancia Amazon Linux compatible, el docente puede utilizar el gestor de paquetes correspondiente. Ejemplo conceptual:</p></Nota>
          <InfoBox items={['sudo dnf update -y — actualizar información de paquetes', 'sudo dnf install httpd -y — instalar el servidor web', 'sudo systemctl start httpd — iniciar el servicio', 'sudo systemctl enable httpd — iniciarlo automáticamente en futuros arranques']} />
          <p>El comando exacto debe ajustarse a la distribución utilizada. No buscamos memorizar, buscamos comprender: <code>sudo</code> ejecuta con privilegios elevados, <code>dnf</code> gestiona paquetes, <code>install</code> instala, <code>-y</code> acepta confirmaciones automáticamente.</p>
        </section>

        <section className="lesson-section">
          <h3>🔍 21. Verificar el estado</h3>
          <p><code>sudo systemctl status httpd</code> — buscamos algo equivalente a <strong>active (running)</strong>.</p>
          <Flow steps={[{ emoji: '🖥️', label: 'EC2 Running' }, { emoji: '🌐', label: 'Apache Running' }]} />
          <Nota><p>Diferencia fundamental: EC2 Running no garantiza Apache Running. Son capas distintas.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>📄 22. Crear nuestra página</h3>
          <Nota><p>Necesitamos crear nuestro propio contenido. Habitualmente Apache utiliza un directorio como <code>/var/www/html/</code> para servir contenido web.</p></Nota>
          <p>Podemos crear una página sencilla con un comando como:</p>
          <InfoBox items={["echo '<h1>Mi primera web en AWS ☁️</h1><p>Servidor publicado utilizando Amazon EC2.</p>' | sudo tee /var/www/html/index.html"]} />
          <p>El objetivo no es evaluar diseño web. Es comprobar arquitectura Cloud.</p>
        </section>

        <section className="lesson-section">
          <h3>🎉 23. Probar desde el navegador</h3>
          <Nota><p>Buscamos la Public IPv4 de nuestra instancia. En el navegador: <code>http://PUBLIC-IP</code>. Cada estudiante utiliza la de su propia instancia.</p></Nota>
          <p>Si todo está correctamente configurado debería aparecer: <strong>Mi primera web en AWS ☁️</strong> 🎉</p>
          <Flow steps={[
            { emoji: '👩', label: 'Estudiante' },
            { emoji: '🌐', label: 'Navegador' },
            { emoji: '📡', label: 'Internet' },
            { emoji: '🛡️', label: 'Security Group · Puerto 80' },
            { emoji: '🖥️', label: 'EC2' },
            { emoji: '🌐', label: 'Apache' },
            { emoji: '📄', label: 'index.html' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>🧠 24. Detengámonos aquí</h3>
          <Dialogo>¿Qué está ocurriendo cuando actualizamos el navegador?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>El navegador envía una solicitud a nuestra instancia, el Security Group permite HTTP, Apache recibe la solicitud y devuelve el archivo HTML.</p>
          </Reveal>
          <p style={{ marginTop: 'var(--space-4)' }}>Si pueden decir eso: 🎯 entendieron el módulo.</p>
        </section>

        <section className="lesson-section">
          <h3>🚨 25. ¿Qué pasa si no funciona?</h3>
          <Nota><p>No abrimos todos los puertos y rezamos a los dioses del Wi-Fi. 😄 Seguimos un diagnóstico.</p></Nota>
          <Flow steps={[
            { label: '¿EC2 Running?' },
            { label: '¿IP correcta?' },
            { label: '¿Puerto 80 permitido?' },
            { label: '¿Apache Running?' },
            { label: '¿index.html existe?' },
            { emoji: '🌐', label: 'Página' },
          ]} />
          <p>Ese árbol vale más que memorizar botones. Diagnóstico paso a paso: EC2 (Stopped → la web no podrá responder normalmente), IP (¿Public IPv4 correcta?), Security Group (¿HTTP por puerto 80 permitido?), Apache (<code>sudo systemctl status httpd</code>, si está detenido <code>sudo systemctl start httpd</code>), archivo (<code>ls /var/www/html/</code>, esperamos ver <code>index.html</code>).</p>
        </section>

        <section className="lesson-section">
          <h3>🛡️ 26. ¿Nuestra página usa HTTPS?</h3>
          <Nota><p>No necesariamente. Si estamos utilizando <code>http://</code>, estamos usando HTTP. Permitir 443 en el Security Group no transforma automáticamente nuestra aplicación en HTTPS.</p></Nota>
          <p>Necesitaríamos: 🔐 certificado; ⚙️ configuración; 🌐 servidor preparado. Eso se verá más adelante.</p>
        </section>

        <section className="lesson-section">
          <h3>📊 27. Paso 17: revisar monitoreo</h3>
          <Nota><p>Volvemos a EC2, seleccionamos la instancia y buscamos Monitoring. Observamos CPUUtilization. Ahora generemos un poco de actividad: 🔄 actualizamos la página varias veces.</p></Nota>
          <Flow steps={[{ emoji: '👥', label: 'Solicitudes' }, { emoji: '🖥️', label: 'EC2' }, { emoji: '📊', label: 'Métricas' }]} />
          <QaItem question="¿CPU baja? ¿Eso significa que debemos eliminar la instancia?" answer="Probablemente sí, la CPU esté baja. Pero no, no debemos eliminarla. Significa que tenemos información para interpretar junto con el contexto." />
        </section>

        <section className="lesson-section">
          <h3>💾 28. Paso 18: revisar EBS</h3>
          <Nota><p>Buscamos el almacenamiento de la instancia. Identificamos: 💾 Volume ID; 📏 Size; 🔐 Encryption; 🗑️ Delete on termination.</p></Nota>
          <Dialogo>¿Dónde está guardado nuestro index.html? En almacenamiento utilizado por el sistema, normalmente sobre el volumen correspondiente.</Dialogo>
          <p>¿Necesitamos snapshot? Para una página de dos líneas probablemente no necesitamos conservar un respaldo permanente. No creamos recursos solamente porque aparece el botón.</p>
        </section>

        <section className="lesson-section">
          <h3>💰 29. Paso 19: revisar costos</h3>
          <Dialogo>¿Qué recursos tenemos actualmente?</Dialogo>
          <p>Podrían existir: 🖥️ EC2; 💾 EBS; 🛡️ Security Group; 🔑 Key Pair; 🌐 recursos de red; y quizás otros según nuestra configuración.</p>
        </section>

        <section className="lesson-section">
          <h3>🧹 30. La parte más importante: limpiar</h3>
          <Nota><p>Si esta instancia existe únicamente para el laboratorio y ya no será necesaria, la eliminamos de forma controlada. No simplemente cerramos el navegador.</p></Nota>
          <p>Paso 20: Terminate Instance. Verificamos "¿estoy eliminando la instancia correcta?" y después: Terminate.</p>
          <Flow steps={[{ emoji: '🟢', label: 'Running' }, { emoji: '⚫', label: 'Shutting-down' }, { emoji: '❌', label: 'Terminated' }]} />
          <Nota><p>En un entorno real no haríamos esto sin revisar información importante, respaldos, dependencias, volúmenes, aplicaciones y usuarios. Pero nuestro laboratorio es desechable por diseño. Esa es una diferencia enorme.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>✅ 31. Checklist de limpieza</h3>
          <InfoBox items={['EC2 revisada', 'EC2 terminada si ya no se necesita', 'EBS revisado', 'Snapshots revisados', 'Security Group revisado', 'Key Pair revisado', 'Región correcta comprobada', 'Costos/recursos revisados']} />
          <p>Después de terminar EC2: revisamos Volumes (¿quedó algún volumen que ya no necesitamos?), Snapshots (¿lo necesitamos?), Key Pair (si fue exclusivo del laboratorio, evaluamos eliminarlo y gestionar de forma segura cualquier archivo local) y Security Group (si ya no tiene dependencias, podemos limpiarlo).</p>
          <Nota><p>Es mucho más fácil eliminar <code>web-aws-curso</code> que intentar decidir qué era <code>test2-final-nuevo</code>. 😄 Una buena nomenclatura también es una práctica operacional.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>🎮 32. Actividad: reconstruye el flujo</h3>
          <Nota><p>Entregamos estas piezas desordenadas: Apache, EC2, Navegador, Security Group, index.html, Internet, Puerto 80. Los estudiantes deben ordenarlas.</p></Nota>
          <Reveal label="Ver solución">
            <Flow steps={[
              { emoji: '🌐', label: 'Navegador' },
              { emoji: '📡', label: 'Internet' },
              { emoji: '🛡️', label: 'Security Group' },
              { emoji: '🚪', label: 'Puerto 80' },
              { emoji: '🖥️', label: 'EC2' },
              { emoji: '🌐', label: 'Apache' },
              { emoji: '📄', label: 'index.html' },
            ]} />
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>🧪 33. Actividad: rompe la arquitectura</h3>
          <QaItem question="Quitamos la regla HTTP (puerto 80). ¿Qué ocurre?" answer="La instancia puede seguir Running. Apache puede seguir Running. Pero el usuario externo podría no llegar al servicio por esa vía." />
          <QaItem question="Dejamos el puerto 80 abierto pero detenemos Apache. ¿Qué ocurre?" answer="El Security Group permite llegar al puerto, pero no tenemos el servicio web respondiendo." />
          <QaItem question="Apache Running, Security Group correcto, pero EC2 = Stopped. ¿Funciona?" answer="❌ No. Tenemos varias capas que deben colaborar." />
        </section>

        <section className="lesson-section">
          <h3>🧠 34. La gran revelación</h3>
          <Nota><p>Una aplicación Cloud no depende de una sola cosa.</p></Nota>
          <ConceptBadge>🖥️ Cómputo + 🌐 Red + 🛡️ Seguridad + 💾 Almacenamiento + ⚙️ Software = 🌐 Servicio</ConceptBadge>
          <p>Esta es una de las ideas más importantes de todo el curso.</p>
        </section>

        <section className="lesson-section">
          <h3>📝 35. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>🏆 36. Reto final del Módulo 3: WebCloud</h3>
          <Nota><p>El estudiante recibe únicamente esta misión, sin la secuencia exacta:</p></Nota>
          <Dialogo>Publica una página que diga tu nombre y "Mi primera aplicación en Amazon EC2".</Dialogo>
          <p>Debe decidir: Región, AMI, tipo de instancia, método de acceso, Security Group, almacenamiento, servidor web, archivo HTML, prueba y limpieza.</p>
          <InfoBox items={['<h1>Tu nombre</h1>', '<h2>Mi primera aplicación en Amazon EC2 ☁️</h2>', '<p>Curso AWS desde Cero</p>']} />
        </section>

        <section className="lesson-section">
          <h3>🧩 37. Evaluación del reto: seis preguntas</h3>
          <QaItem question="¿Por qué eligió esa AMI?" answer='No aceptamos solamente "porque decía Linux". Buscamos: "porque necesitaba un sistema Linux compatible con el laboratorio y el servidor web."' />
          <QaItem question="¿Por qué eligió ese tipo de instancia?" answer='"Porque la carga del laboratorio es pequeña y no requiere una instancia grande." Ahí evaluamos: 🎯 right sizing.' />
          <QaItem question="¿Qué regla de red necesita la página?" answer="HTTP por el puerto 80 para el origen correspondiente. El acceso administrativo debe limitarse según el método utilizado." />
          <QaItem question="¿Qué función cumple EBS?" answer="Proporciona almacenamiento para elementos como el sistema y archivos de la instancia." />
          <QaItem question="¿Cómo sabrías qué está haciendo tu instancia?" answer="Revisando métricas y monitoreo, por ejemplo mediante CloudWatch." />
          <QaItem question="¿Qué haces al terminar?" answer='La respuesta no puede ser "cierro AWS". 😄 Debe ser: "reviso y limpio los recursos que ya no necesito."' />
        </section>

        <section className="lesson-section">
          <h3>🔥 38. Reto de diagnóstico</h3>
          <QaItem question="EC2 Running, Apache Running, index.html existe, pero el Security Group no tiene HTTP 80. ¿Cuál es el problema probable?" answer="El tráfico web no está permitido por el Security Group." />
          <QaItem question="EC2 Running, HTTP 80 permitido, index.html existe, pero Apache Stopped. ¿Problema?" answer="El servidor web no está ejecutándose." />
          <QaItem question="EC2 Stopped, HTTP 80 permitido, Apache estaba configurado. ¿Problema?" answer="La instancia está detenida." />
          <QaItem question="EC2 Terminated. ¿Podemos hacer Start sobre esa misma instancia?" answer="❌ No. Fue terminada." />
        </section>

        <section className="lesson-section">
          <h3>🎮 39. Reto oral final</h3>
          <Dialogo>Explícame cómo funciona tu página sin utilizar las palabras AWS, EC2, Security Group, Apache, HTTP, servidor, nube ni Internet. 😈</Dialogo>
          <Reveal label="Ver una buena respuesta">
            <Dialogo>"Mi navegador envía una solicitud hacia una máquina remota. Las reglas verifican que esa comunicación esté permitida, un programa recibe la solicitud, busca el archivo de la página y devuelve su contenido."</Dialogo>
          </Reveal>
          <p style={{ marginTop: 'var(--space-4)' }}>Si pueden explicar eso, entendieron la arquitectura más allá de los nombres comerciales.</p>
        </section>

        <section className="lesson-section">
          <h3>📊 40. Rúbrica del laboratorio</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Nivel</th><th>Resultado</th></tr></thead>
            <tbody>
              <tr><td>🟢 Logrado</td><td>Crea, explica, prueba y limpia la infraestructura</td></tr>
              <tr><td>🟡 En proceso</td><td>Logra publicar, pero necesita ayuda para explicar decisiones</td></tr>
              <tr><td>🔴 Inicial</td><td>Sigue pasos sin comprender AMI, seguridad, almacenamiento o acceso</td></tr>
            </tbody>
          </table>
          <Nota><p>No basta con que aparezca la página. El estudiante debe poder explicar qué es EC2, qué AMI eligió, qué capacidad eligió, qué tráfico permitió, dónde se almacenan los archivos, qué software responde, qué IP utilizó, cómo monitorea y qué recursos elimina.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>🧠 41. Mapa completo del Módulo 3</h3>
          <CompareCols cols={[
            { emoji: '🖥️', title: 'EC2', items: ['📀 AMI', '⚙️ Tipo', '🌎 Región'] },
            { emoji: '🛡️', title: 'Seguridad', items: ['Security Group', 'Conexiones permitidas'] },
            { emoji: '💾', title: 'Almacenamiento', items: ['EBS', 'Snapshots'] },
          ]} />
          <p>EC2 + Security Group + EBS + CloudWatch → 🌐 Aplicación funcionando.</p>
        </section>

        <section className="lesson-section">
          <h3>📌 42. Lo que debe sobrevivir al módulo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Idea</th></tr></thead>
            <tbody>
              <tr><td>🖥️ EC2</td><td>Capacidad de cómputo</td></tr>
              <tr><td>📀 AMI</td><td>Plantilla</td></tr>
              <tr><td>⚙️ Instance Type</td><td>Capacidad</td></tr>
              <tr><td>🎯 Right sizing</td><td>Elegir lo adecuado</td></tr>
              <tr><td>🔑 Acceso</td><td>Administrar de forma segura</td></tr>
              <tr><td>🌐 IP</td><td>Dirección de comunicación</td></tr>
              <tr><td>🛡️ Security Group</td><td>Control de tráfico</td></tr>
              <tr><td>🚪 22 / 80 / 443</td><td>SSH / HTTP / HTTPS</td></tr>
              <tr><td>💾 EBS</td><td>Almacenamiento</td></tr>
              <tr><td>📸 Snapshot</td><td>Copia puntual</td></tr>
              <tr><td>📊 CloudWatch</td><td>Monitoreo</td></tr>
              <tr><td>💰 Costos</td><td>Revisar recursos completos</td></tr>
              <tr><td>🧹 Limpieza</td><td>Parte obligatoria del laboratorio</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>🎟️ 43. Ticket de salida del Módulo 3</h3>
          <Dialogo>Tu página está funcionando correctamente. ¿Eso significa que tu trabajo terminó?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>No. Todavía debemos monitorear, revisar costos, proteger el recurso, administrar sus datos y limpiar la infraestructura cuando deje de ser necesaria.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>🏁 44. Cierre del Módulo 3</h3>
          <Nota><p>El estudiante ya pasó de "EC2 es un servidor virtual" a poder comprender el recorrido completo:</p></Nota>
          <Flow steps={[
            { label: 'Necesidad' },
            { emoji: '📀', label: 'Selecciono plantilla' },
            { emoji: '⚙️', label: 'Selecciono capacidad' },
            { emoji: '🖥️', label: 'Creo EC2' },
            { emoji: '🛡️', label: 'Controlo acceso' },
            { emoji: '💾', label: 'Administro almacenamiento' },
            { emoji: '🌐', label: 'Ejecuto aplicación' },
            { emoji: '📊', label: 'Monitoreo' },
            { emoji: '💰', label: 'Reviso costos' },
            { emoji: '🧹', label: 'Limpio' },
          ]} />
          <p>Eso ya es una competencia práctica inicial, no una definición memorizada.</p>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow">🔗 Módulo 3 completado</div>
          <Dialogo>✅ Módulo 3 completado</Dialogo>
          <p>El siguiente bloque lógico sería:</p>
          <ConceptBadge>📦 Módulo 4: Amazon S3</ConceptBadge>
          <Nota>
            <p>Ahí dejaremos de pensar en "discos conectados a servidores" y aprenderemos almacenamiento de objetos, buckets, objetos, permisos, versionado, clases de almacenamiento, hosting estático y ciclo de vida, manteniendo exactamente el mismo formato clase por clase.</p>
          </Nota>
          <span className="tag tag-outline">Módulo 4 · Amazon S3 · próximamente</span>
        </div>

      </div>
    </div>
  );
}
