import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, CompareCols, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué es un Security Group?', options: [{ text: 'Un grupo de usuarios IAM.', correct: false }, { text: 'Un firewall virtual que controla tráfico permitido.', correct: true }, { text: 'Una AMI.', correct: false }, { text: 'Un volumen.', correct: false }] },
  { q: '¿Qué significa inbound?', options: [{ text: 'Tráfico entrante.', correct: true }, { text: 'Tráfico saliente.', correct: false }, { text: 'Usuario IAM.', correct: false }, { text: 'Volumen EBS.', correct: false }] },
  { q: '¿Qué significa outbound?', options: [{ text: 'Tráfico entrante.', correct: false }, { text: 'Tráfico saliente.', correct: true }, { text: 'AMI.', correct: false }, { text: 'Región.', correct: false }] },
  { q: '¿Qué puerto se asocia habitualmente a SSH?', options: [{ text: '80', correct: false }, { text: '22', correct: true }, { text: '443', correct: false }, { text: '53', correct: false }] },
  { q: '¿Qué puerto se asocia habitualmente a HTTP?', options: [{ text: '22', correct: false }, { text: '443', correct: false }, { text: '80', correct: true }, { text: '25', correct: false }] },
  { q: '¿Qué puerto se asocia habitualmente a HTTPS?', options: [{ text: '443', correct: true }, { text: '22', correct: false }, { text: '80', correct: false }, { text: '21', correct: false }] },
  { q: '¿Qué representa 0.0.0.0/0?', options: [{ text: 'Una sola IP.', correct: false }, { text: 'Todas las direcciones IPv4.', correct: true }, { text: 'Ninguna dirección.', correct: false }, { text: 'Solo AWS.', correct: false }] },
  { q: '¿Qué representa /32 en IPv4 en este contexto?', options: [{ text: 'Una sola dirección IPv4.', correct: true }, { text: 'Todo Internet.', correct: false }, { text: 'Una Región.', correct: false }, { text: 'Un puerto.', correct: false }] },
  { q: '¿Permitir el puerto 443 configura automáticamente HTTPS?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: 'Si el servidor web está detenido pero el puerto 80 está permitido, ¿la web funcionará?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
];

export default function Modulo3Clase4() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 3 · Clase 4</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 3 · Clase 4: Security Groups, puertos y control del tráfico</h2>
      <p className="lesson-subtitle">
        Quién puede llegar hasta nuestra instancia y por qué puerta: inbound, outbound, puertos 22/80/443 y 0.0.0.0/0 sin recetas mágicas.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + laboratorio guiado + actividad práctica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 3 · Clases 1 a 3</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es un Security Group.</li>
            <li>Comprender qué significa tráfico inbound y outbound.</li>
            <li>Explicar qué es un puerto usando una analogía sencilla.</li>
            <li>Reconocer los puertos 22, 80 y 443.</li>
            <li>Comprender qué significa permitir tráfico desde una dirección o rango.</li>
            <li>Reconocer 0.0.0.0/0.</li>
            <li>Comprender de manera inicial qué es CIDR.</li>
            <li>Aplicar el principio de mínimo acceso necesario.</li>
            <li>Revisar y modificar reglas de un Security Group.</li>
            <li>Detectar reglas demasiado abiertas.</li>
          </ul>
          <p>La idea que debe sobrevivir será:</p>
          <Dialogo>🔐 Un Security Group controla qué tráfico está permitido entrar o salir de un recurso asociado.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Recordemos dónde quedamos</h3>
          <Nota><p>En la clase anterior creamos una instancia:</p></Nota>
          <Flow steps={[{ icon: 'map-pin', label: 'Internet' }, { icon: 'server', label: 'EC2' }]} />
          <p>Pero dejamos una pregunta pendiente:</p>
          <Dialogo>¿Cualquier persona puede conectarse a cualquier servicio de nuestra instancia?</Dialogo>
          <p>La respuesta correcta es: ❌ No debería. Necesitamos controlar el acceso.</p>
        </section>

        <section className="lesson-section">
          <h3>3. Analogía del edificio</h3>
          <Nota><p>Imaginemos un edificio. Tiene varias puertas:</p></Nota>
          <InfoBox title="🏢 EDIFICIO" items={['🚪 Entrada principal', '🚪 Puerta de empleados', '🚪 Bodega', '🚪 Sala técnica']} />
          <p>No todas las personas deberían poder entrar por todas las puertas. El guardia pregunta:</p>
          <Dialogo>¿Por qué puerta quieres entrar? — ¿Desde dónde vienes?</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>4. Aparece el Security Group</h3>
          <Nota><p>Un Security Group es un firewall virtual asociado a determinados recursos de AWS, como una instancia EC2.</p></Nota>
          <Dialogo>Es como el guardia que controla qué puertas pueden utilizarse y desde dónde se permite el acceso.</Dialogo>
          <Flow steps={[{ icon: 'map-pin', label: 'Tráfico' }, { icon: 'shield', label: 'Security Group' }, { icon: 'server', label: 'EC2' }]} />
        </section>

        <section className="lesson-section">
          <h3>5. ¿Qué significa Inbound?</h3>
          <Dialogo>Inbound significa: tráfico que intenta entrar al recurso.</Dialogo>
          <Flow steps={[{ icon: 'user', label: 'Usuario' }, { icon: 'map-pin', label: 'Internet' }, { icon: 'shield', label: 'Security Group' }, { icon: 'server', label: 'EC2' }]} />
          <p>La pregunta es: ¿permitimos que este tráfico llegue?</p>
        </section>

        <section className="lesson-section">
          <h3>6. ¿Qué significa Outbound?</h3>
          <Dialogo>Outbound significa: tráfico que sale desde el recurso hacia otro destino.</Dialogo>
          <Flow steps={[{ icon: 'server', label: 'EC2' }, { icon: 'shield', label: 'Security Group' }, { icon: 'map-pin', label: 'Internet' }]} />
          <p>La pregunta es: ¿qué tráfico permitimos que salga?</p>
        </section>

        <section className="lesson-section">
          <h3>7. Diferencia clave</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Pregunta sencilla</th></tr></thead>
            <tbody>
              <tr><td>📥 Inbound</td><td>¿Qué puede entrar?</td></tr>
              <tr><td>📤 Outbound</td><td>¿Qué puede salir?</td></tr>
            </tbody>
          </table>
          <Nota><p>No necesitamos memorizar más que eso al principio.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>8. ¿Qué es un puerto?</h3>
          <Nota><p>Un puerto es un identificador lógico utilizado para dirigir tráfico hacia un servicio o aplicación.</p></Nota>
          <Dialogo>Podemos imaginarlo como una puerta numerada.</Dialogo>
          <RoleGrid roles={[{ icon: 'door', label: '22', desc: '' }, { icon: 'door', label: '80', desc: '' }, { icon: 'door', label: '443', desc: '' }]} />
        </section>

        <section className="lesson-section">
          <h3>9. Analogía del hotel</h3>
          <Nota><p>Imaginemos un hotel con habitaciones numeradas. La dirección del hotel nos lleva al edificio. El número de habitación nos lleva al lugar correcto dentro del edificio.</p></Nota>
          <ConceptBadge>Dirección IP + 🚪 Puerto → a qué servicio queremos llegar</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>10. Tres puertos importantes</h3>
          <Nota><p>Para esta clase reconoceremos solo tres.</p></Nota>
          <table className="table lesson-summary-table">
            <thead><tr><th>Puerto</th><th>Uso habitual</th></tr></thead>
            <tbody>
              <tr><td>22</td><td>SSH</td></tr>
              <tr><td>80</td><td>HTTP</td></tr>
              <tr><td>443</td><td>HTTPS</td></tr>
            </tbody>
          </table>
          <p>No quiero que memoricen una enciclopedia de puertos. Solo estos tres porque los veremos pronto.</p>
        </section>

        <section className="lesson-section">
          <h3>11. Puerto 22: SSH</h3>
          <Dialogo>SSH nos permite administrar remotamente una instancia mediante una conexión segura.</Dialogo>
          <Flow steps={[{ icon: 'user', label: 'Administrador' }, { icon: 'door', label: 'Puerto 22' }, { icon: 'server', label: 'EC2 Linux' }]} />
        </section>

        <section className="lesson-section">
          <h3>12. Puerto 80: HTTP</h3>
          <Nota><p>HTTP se utiliza habitualmente para tráfico web sin cifrado TLS.</p></Nota>
          <Flow steps={[{ icon: 'map-pin', label: 'Usuario web' }, { icon: 'door', label: 'Puerto 80' }, { icon: 'globe', label: 'Servidor web' }]} />
        </section>

        <section className="lesson-section">
          <h3>13. Puerto 443: HTTPS</h3>
          <Nota><p>HTTPS se utiliza habitualmente para tráfico web protegido mediante TLS.</p></Nota>
          <Flow steps={[{ icon: 'map-pin', label: 'Usuario' }, { icon: 'door', label: 'Puerto 443' }, { icon: 'lock', label: 'Sitio HTTPS' }]} />
          <Nota><p>Para una web pública real, normalmente queremos favorecer HTTPS.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>14. Puerta abierta no significa "todo abierto"</h3>
          <Nota><p>Si permitimos HTTP (Puerto 80), no estamos automáticamente permitiendo SSH (Puerto 22). Cada regla debe evaluarse por separado.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>15. Tres preguntas para cualquier regla</h3>
          <Nota><p>Antes de crear una regla preguntamos:</p></Nota>
          <ol className="plain-list">
            <li>¿Qué tráfico? — SSH, HTTP, HTTPS.</li>
            <li>¿Qué puerto? — 22, 80, 443.</li>
            <li>¿Desde dónde? — Una dirección específica, una red o un rango.</li>
          </ol>
        </section>

        <section className="lesson-section">
          <h3>16. El origen</h3>
          <Nota><p>En una regla inbound encontraremos algo parecido a: Source.</p></Nota>
          <Dialogo>¿Desde dónde permitimos que llegue el tráfico?</Dialogo>
          <p>Por ejemplo: 👩 mi computador, o 🌎 Internet. No son lo mismo.</p>
        </section>

        <section className="lesson-section">
          <h3>17. Mi IP</h3>
          <Nota><p>Si necesitamos acceso administrativo solamente desde nuestro computador, podríamos restringir el origen a una dirección específica o rango apropiado.</p></Nota>
          <Flow steps={[{ icon: 'user', label: 'Mi computador', caption: 'IP: X.X.X.X' }, { icon: 'door', label: '22' }, { icon: 'server', label: 'EC2' }]} />
          <p>Eso es diferente de permitir: 🌎 todo Internet.</p>
        </section>

        <section className="lesson-section">
          <h3>18. Aparece 0.0.0.0/0</h3>
          <Nota><p>En AWS podemos encontrar: 0.0.0.0/0.</p></Nota>
          <ConceptBadge>0.0.0.0/0 = todas las direcciones IPv4 — 🌎 "Desde cualquier IPv4"</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>19. ¿0.0.0.0/0 es siempre malo?</h3>
          <p>No necesariamente.</p>
          <Nota>
            <p>No estoy de acuerdo con enseñar "nunca usar 0.0.0.0/0" porque una web pública puede necesitar aceptar tráfico HTTP/HTTPS desde Internet. Esto es lo que haría en su lugar: evaluar el servicio y el puerto. El riesgo de prohibirlo como regla absoluta es que los estudiantes aprendan recetas en vez de entender arquitectura.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>20. Ejemplo razonable</h3>
          <p>Para una página pública:</p>
          <ConceptBadge>HTTP — Puerto 80 — Source: 0.0.0.0/0</ConceptBadge>
          <p>puede tener sentido si queremos que cualquier usuario IPv4 pueda acceder. Y para HTTPS:</p>
          <ConceptBadge>HTTPS — Puerto 443 — Source: 0.0.0.0/0</ConceptBadge>
          <p>también puede ser razonable.</p>
        </section>

        <section className="lesson-section">
          <h3>21. Ejemplo más delicado</h3>
          <ConceptBadge variant="danger">SSH — Puerto 22 — Source: 0.0.0.0/0</ConceptBadge>
          <p>Significa: cualquier dirección IPv4 puede intentar alcanzar el servicio SSH.</p>
          <Nota><p>Eso aumenta la superficie de exposición. Para administración normalmente intentaremos restringir el origen cuando sea posible.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>22. Analogía de la puerta de tu casa</h3>
          <CompareCols cols={[
            { icon: 'door', title: 'Puerta del local comercial', items: ['Queremos que entren clientes.', '🌎 acceso amplio puede tener sentido.'] },
            { icon: 'lock', title: 'Puerta de tu habitación privada', items: ['¿La dejamos abierta para cualquier persona?', 'Probablemente no.'] },
          ]} />
          <Nota><p>HTTP público y acceso administrativo tienen necesidades distintas.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>23. ¿Qué es CIDR?</h3>
          <Nota><p>AWS utiliza notación CIDR para representar rangos de direcciones IP. No enseñaremos subnetting todavía.</p></Nota>
          <Dialogo>CIDR es una forma de indicar una dirección o conjunto de direcciones.</Dialogo>
          <ConceptBadge>203.0.113.10/32 — una sola dirección IPv4 concreta en esta explicación</ConceptBadge>
          <ConceptBadge>0.0.0.0/0 — representa todas las IPv4</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>24. ¿Qué significa /32?</h3>
          <Nota><p>Para IPv4, un /32 representa una dirección individual.</p></Nota>
          <ConceptBadge>203.0.113.10/32 = 📍 solo esa dirección</ConceptBadge>
          <p>No profundizamos todavía en bits ni máscaras. Eso llegará en redes.</p>
        </section>

        <section className="lesson-section">
          <h3>25. ¿Y IPv6?</h3>
          <Nota><p>Podemos encontrar: ::/0, que conceptualmente representa todas las direcciones IPv6.</p></Nota>
          <ConceptBadge>0.0.0.0/0 → todas las IPv4</ConceptBadge>
          <ConceptBadge>::/0 → todas las IPv6</ConceptBadge>
          <p>Solo reconocerlas.</p>
        </section>

        <section className="lesson-section">
          <h3>26. Security Groups son stateful</h3>
          <Nota>
            <p>Los Security Groups son stateful. Si permitimos una conexión de entrada, el tráfico de respuesta correspondiente puede regresar sin que tengamos que crear manualmente una regla inversa específica para esa respuesta.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>27. Analogía del pedido</h3>
          <Nota><p>Pedimos pizza. Permitimos que llegue el repartidor. Cuando abrimos la puerta y recibimos el pedido, no necesitamos crear otra autorización especial para decir "ahora el repartidor puede salir." 😄</p></Nota>
          <p>La respuesta forma parte de la comunicación ya permitida.</p>
        </section>

        <section className="lesson-section">
          <h3>28. Security Groups no usan reglas DENY</h3>
          <Nota><p>Esta diferencia con IAM es importante. En Security Groups configuramos reglas de ✅ Allow. No escribimos reglas explícitas ❌ Deny.</p></Nota>
          <p>Si un tráfico no está permitido por una regla aplicable: no pasa.</p>
        </section>

        <section className="lesson-section">
          <h3>29. IAM vs Security Group</h3>
          <CompareCols cols={[
            { icon: 'user', title: 'IAM', items: ['¿Qué identidad puede hacer qué?', '¿Quién puede hacer algo?'] },
            { icon: 'globe', title: 'Security Group', items: ['¿Qué tráfico de red puede entrar o salir?', '¿Qué conexión de red se permite?'] },
          ]} />
          <p>No son lo mismo.</p>
        </section>

        <section className="lesson-section">
          <h3>30. El principio de mínimo acceso</h3>
          <Nota><p>En IAM aprendimos: 🎯 Mínimo privilegio — solo permisos necesarios. Ahora aplicamos algo parecido a red:</p></Nota>
          <ConceptBadge>Mínimo acceso</ConceptBadge>
          <p>Solo abrimos: los puertos necesarios; desde los orígenes necesarios; para los servicios necesarios.</p>
        </section>

        <section className="lesson-section">
          <h3>31. Caso: servidor web</h3>
          <Nota><p>Tenemos 🖥️ EC2 y queremos publicar una página web HTTP. Usuarios necesitan:</p></Nota>
          <Flow steps={[{ icon: 'map-pin', label: 'Internet' }, { icon: 'door', label: '80' }, { icon: 'server', label: 'EC2' }]} />
          <ConceptBadge>Type: HTTP — Port: 80 — Source: Internet</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>32. Administración del mismo servidor</h3>
          <Nota><p>Nosotros además necesitamos administrar la instancia.</p></Nota>
          <Flow steps={[{ icon: 'user', label: 'Administrador' }, { icon: 'door', label: '22' }, { icon: 'server', label: 'EC2' }]} />
          <p>Pero no necesitamos que todos los visitantes web utilicen SSH. Por eso:</p>
          <CompareCols cols={[
            { icon: 'map-pin', title: 'HTTP · 80', items: ['público'] },
            { icon: 'map-pin', title: 'SSH · 22', items: ['restringido'] },
          ]} />
          <p>pueden tener configuraciones diferentes.</p>
        </section>

        <section className="lesson-section">
          <h3>33. Pintemos la arquitectura</h3>
          <Nota><p>Este dibujo debería quedar visible durante el laboratorio.</p></Nota>
          <Flow steps={[
            { icon: 'map-pin', label: 'INTERNET' },
            { icon: 'globe', label: 'HTTP 80 · Admin 22' },
            { icon: 'shield', label: 'Security Group' },
            { icon: 'server', label: 'EC2' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>34. Laboratorio: revisar nuestro Security Group</h3>
          <Nota><p>Volvemos a la instancia creada en Clase 3.</p></Nota>
          <Flow steps={[
            { icon: 'server', label: 'EC2' },
            { icon: 'clipboard-list', label: 'Instances' },
            { icon: 'target', label: 'Seleccionar instancia' },
            { icon: 'shield', label: 'Security' },
            { icon: 'lock', label: 'Security Groups' },
          ]} />
          <p>Dependiendo de la consola actual, los nombres o ubicación visual pueden cambiar ligeramente. El objetivo no es memorizar la ruta. Es encontrar el Security Group asociado.</p>
        </section>

        <section className="lesson-section">
          <h3>35. Primero solo observar</h3>
          <Nota><p>Buscamos: Inbound rules y Outbound rules. No modificamos todavía.</p></Nota>
          <p>Cada estudiante debe identificar: Type; Protocol; Port range; Source; Description, si existe.</p>
        </section>

        <section className="lesson-section">
          <h3>36. Leer una regla inbound</h3>
          <Nota><p>Supongamos que vemos: Type: SSH, Protocol: TCP, Port: 22, Source: 203.0.113.10/32.</p></Nota>
          <QaItem question="¿Qué significa?" answer="Permite tráfico SSH por el puerto 22 desde esa dirección IPv4 específica." />
        </section>

        <section className="lesson-section">
          <h3>37. Leer una segunda regla</h3>
          <Nota><p>Type: HTTP, Protocol: TCP, Port: 80, Source: 0.0.0.0/0.</p></Nota>
          <QaItem question="¿Qué significa?" answer="Permite conexiones HTTP al puerto 80 desde cualquier dirección IPv4." />
        </section>

        <section className="lesson-section">
          <h3>38. Detectemos exposición</h3>
          <Nota><p>Mostramos: SSH, TCP, 22, 0.0.0.0/0.</p></Nota>
          <QaItem question="¿Qué significa?" answer="Cualquier dirección IPv4 puede intentar conectarse al puerto SSH." />
          <QaItem question="¿Lo necesitamos?" answer="Si la respuesta es no: debemos restringirlo." />
        </section>

        <section className="lesson-section">
          <h3>39. Editar Inbound Rules</h3>
          <Nota><p>Ahora podemos realizar una modificación controlada. Por ejemplo, para nuestro laboratorio podemos ajustar el origen administrativo según las instrucciones del docente.</p></Nota>
          <ConceptBadge>Tipo + Puerto + Origen = Regla</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>40. Opción "My IP"</h3>
          <Nota><p>La consola puede ofrecer una opción del tipo My IP. Esta puede ayudar a establecer el origen con la dirección pública actual desde la que estamos trabajando.</p></Nota>
          <p>Pero debemos advertir: si nuestra IP cambia, esa regla puede dejar de permitirnos acceso. Especialmente en conexiones domésticas o móviles.</p>
        </section>

        <section className="lesson-section">
          <h3>41. Agregar HTTP</h3>
          <Nota><p>Si queremos preparar la instancia para una futura web HTTP de laboratorio, podemos añadir una regla apropiada:</p></Nota>
          <ConceptBadge>HTTP — TCP — 80 — Source: según el objetivo del laboratorio</ConceptBadge>
          <p>Si será una página pública: el origen puede necesitar ser amplio. Pero siempre sabemos por qué.</p>
        </section>

        <section className="lesson-section">
          <h3>42. HTTPS</h3>
          <Nota><p>También reconoceremos: HTTPS, TCP, 443. Pero permitir el puerto 443 no convierte mágicamente nuestra web en HTTPS.</p></Nota>
          <p>Necesitamos además: 🔐 certificado; ⚙️ configuración del servidor web; otros componentes.</p>
          <Nota><p>Regla de red y cifrado web son cosas distintas.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>43. Error común: abrir 443 y creer que ya tenemos HTTPS</h3>
          <p>No. El Security Group simplemente permite que el tráfico alcance el puerto. El servicio dentro de la instancia tiene que estar configurado para atender HTTPS.</p>
        </section>

        <section className="lesson-section">
          <h3>44. Revisemos Outbound</h3>
          <Nota><p>Ahora observamos las reglas de salida. En muchas configuraciones iniciales podemos encontrar reglas de salida amplias.</p></Nota>
          <QaItem question="¿Qué significa outbound?" answer="Tráfico que sale desde la instancia." />
          <p>No profundizaremos todavía en restricciones avanzadas de egress.</p>
        </section>

        <section className="lesson-section">
          <h3>45. El flujo completo</h3>
          <Flow steps={[
            { icon: 'user', label: 'Usuario' },
            { icon: 'map-pin', label: 'Internet' },
            { icon: 'upload', label: 'Inbound Rule' },
            { icon: 'shield', label: 'Security Group' },
            { icon: 'server', label: 'EC2' },
            { icon: 'upload', label: 'Respuesta' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>46. Actividad: ¿permitirías esta regla?</h3>
          <Nota><p>Los estudiantes responden: 🟢 razonable, 🟡 depende, 🔴 demasiado amplia.</p></Nota>
          <QaItem question="Caso 1 — Web pública: HTTP 80, 0.0.0.0/0" answer="🟢/🟡 Puede ser razonable según el diseño." />
          <QaItem question="Caso 2 — Servidor administrativo: SSH 22, 0.0.0.0/0" answer="🔴 Generalmente demasiado amplio para administración si podemos restringirlo." />
          <QaItem question="Caso 3 — SSH: 22, Mi IP /32" answer="🟢 Más restringido." />
          <QaItem question="Caso 4 — Base de datos: Puerto de BD, 0.0.0.0/0" answer="🔴 Normalmente una gran señal de alerta si no existe una razón excepcional." />
        </section>

        <section className="lesson-section">
          <h3>47. Actividad grupal: Hotel Cloud</h3>
          <Nota><p>Tenemos un hotel con tres puertas:</p></Nota>
          <InfoBox items={['🚪 Recepción pública — Todos los huéspedes pueden entrar. → HTTP/HTTPS público', '🔐 Oficina administración — Solo personal autorizado. → SSH restringido', '🗄️ Caja fuerte — Acceso extremadamente restringido. → servicios sensibles muy limitados']} />
          <Nota><p>El objetivo es comprender que cada servicio tiene una necesidad de exposición diferente.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>48. El desarrollador desesperado</h3>
          <Nota><p>Pedro dice:</p></Nota>
          <Dialogo>"No funciona la conexión. Voy a permitir todos los puertos desde cualquier dirección."</Dialogo>
          <ConceptBadge variant="danger">Mala solución</ConceptBadge>
          <Nota>
            <p>No estoy de acuerdo porque elimina controles para resolver un problema que quizá tiene una causa específica. Esto es lo que haría en su lugar: identificar qué protocolo, puerto y origen necesita realmente la aplicación. El riesgo de su enfoque es exponer servicios innecesarios a Internet.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>49. Diagnóstico correcto</h3>
          <Nota><p>Si algo no conecta, preguntamos:</p></Nota>
          <ol className="plain-list">
            <li>¿La instancia está Running?</li>
            <li>¿Tiene la dirección correcta?</li>
            <li>¿Existe ruta/conectividad?</li>
            <li>¿El Security Group permite el puerto?</li>
            <li>¿El servicio dentro de EC2 está funcionando?</li>
            <li>¿Estamos usando el protocolo correcto?</li>
          </ol>
          <p>No: "abramos todo y veamos."</p>
        </section>

        <section className="lesson-section">
          <h3>50. Security Group no inicia servicios</h3>
          <Nota><p>Esta diferencia es muy importante. Supongamos: Security Group ✅ HTTP 80 permitido. Pero dentro de EC2: servidor web ❌ apagado.</p></Nota>
          <QaItem question="¿La página funcionará?" answer="❌ No." />
          <Nota><p>El Security Group permite que el tráfico llegue. No crea ni inicia la aplicación.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>51. Dos condiciones</h3>
          <Nota><p>Para que una web responda necesitamos, entre otras cosas:</p></Nota>
          <Flow steps={[{ icon: 'shield', label: 'Red permite tráfico' }, { icon: 'globe', label: 'Servicio está funcionando' }, { icon: 'check-circle', label: 'Posible respuesta' }]} />
          <p>Esta idea será clave en Clase 7.</p>
        </section>

        <section className="lesson-section">
          <h3>52. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>53. Reto de la clase</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge>CloudShop</ConceptBadge>
          <p>Tenemos una instancia EC2 que será un servidor web. Necesitamos: 🌎 cualquier cliente debe poder visitar la web; 👩 solo la administradora debe conectarse por SSH; 🔐 no queremos abrir puertos innecesarios.</p>
          <p>Los estudiantes deben diseñar conceptualmente las reglas.</p>
        </section>

        <section className="lesson-section">
          <h3>54. Solución esperada</h3>
          <Reveal label="Ver solución esperada">
            <InfoBox title="Regla web" items={['Type: HTTP', 'Protocol: TCP', 'Port: 80', 'Source: 0.0.0.0/0 (si es web HTTP pública)']} />
            <InfoBox title="Regla administrativa" items={['Type: SSH', 'Protocol: TCP', 'Port: 22', 'Source: IP de administración /32 o un rango administrativo apropiado']} />
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>55. Reto nivel 2</h3>
          <Nota><p>CloudShop agrega HTTPS. ¿Qué hacemos?</p></Nota>
          <ConceptBadge>HTTPS — TCP — 443 — Source: público según necesidad</ConceptBadge>
          <QaItem question="¿Eso basta para tener HTTPS?" answer="❌ No. También debemos configurar el servicio web y el certificado correspondiente." />
        </section>

        <section className="lesson-section">
          <h3>56. Reto: encuentra el error</h3>
          <Nota><p>Security Group:</p></Nota>
          <InfoBox items={['SSH — 22 — 0.0.0.0/0', 'HTTP — 80 — 0.0.0.0/0', 'HTTPS — 443 — 0.0.0.0/0', 'MYSQL — 3306 — 0.0.0.0/0', 'ALL — ALL — 0.0.0.0/0 😬']} />
          <QaItem
            question="¿Qué regla vuelve prácticamente irrelevantes muchas de las anteriores?"
            answer="La última: ALL / ALL / 0.0.0.0/0, porque permite muchísimo tráfico desde cualquier IPv4."
          />
        </section>

        <section className="lesson-section">
          <h3>57. ¿Qué principio violamos?</h3>
          <ConceptBadge>Mínimo acceso necesario</ConceptBadge>
          <p>No necesitamos abrir: todo, desde todos, por si acaso.</p>
        </section>

        <section className="lesson-section">
          <h3>58. Reto oral</h3>
          <Dialogo>Explícame un Security Group sin usar las palabras seguridad, firewall, tráfico, red, puerto, permitir ni bloquear. 😈</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Es como un guardia que decide qué personas pueden utilizar determinadas puertas para llegar a nuestro sistema."</Dialogo>
          </Reveal>
          <p style={{ marginTop: 'var(--space-4)' }}>Si llegan a algo así, comprendieron el concepto.</p>
        </section>

        <section className="lesson-section">
          <h3>59. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>🛡️ Security Group</td><td>Controla conexiones permitidas</td></tr>
              <tr><td>📥 Inbound</td><td>Lo que entra</td></tr>
              <tr><td>📤 Outbound</td><td>Lo que sale</td></tr>
              <tr><td>🚪 Puerto</td><td>Puerta lógica de un servicio</td></tr>
              <tr><td>22</td><td>SSH</td></tr>
              <tr><td>80</td><td>HTTP</td></tr>
              <tr><td>443</td><td>HTTPS</td></tr>
              <tr><td>0.0.0.0/0</td><td>Todas las IPv4</td></tr>
              <tr><td>/32</td><td>Una IPv4 individual</td></tr>
              <tr><td>🎯 Mínimo acceso</td><td>Abrir solo lo necesario</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>60. Ticket de salida</h3>
          <Dialogo>Tenemos una web pública y acceso administrativo SSH. ¿Deberían ambos servicios tener necesariamente el mismo origen permitido? ¿Por qué?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>No. La web puede necesitar acceso público, mientras que SSH debería restringirse a los orígenes administrativos necesarios.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 5</div>
          <Nota><p>Cerraría mostrando nuestra instancia:</p></Nota>
          <Flow steps={[{ icon: 'map-pin', label: 'Usuario' }, { icon: 'shield', label: 'Security Group' }, { icon: 'server', label: 'EC2' }, { n: '?', label: '???' }]} />
          <Dialogo>"Ya podemos llegar de forma controlada a nuestro servidor. Pero ¿dónde está guardado su sistema operativo y qué pasa con sus archivos si detenemos la instancia?"</Dialogo>
          <p>Aquí aparece la siguiente pieza:</p>
          <ConceptBadge>Módulo 3 · Clase 5 — Amazon EBS: almacenamiento, volúmenes y snapshots</ConceptBadge>
          <Nota>
            <p>En esa clase separaremos definitivamente cómputo de almacenamiento, veremos qué persiste cuando EC2 se detiene, qué ocurre al terminar una instancia y por qué un snapshot no es simplemente "otro disco".</p>
          </Nota>
          <Link to="/aprendizaje/aws-desde-cero/modulo-3/clase-5" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 5: Amazon EBS, volúmenes y snapshots →
          </Link>
        </div>

      </div>
    </div>
  );
}
