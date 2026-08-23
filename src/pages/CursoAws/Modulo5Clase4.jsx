import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué hace una Route Table?', options: [{ text: 'Indica por dónde enviar tráfico.', correct: true }, { text: 'Crea usuarios.', correct: false }, { text: 'Guarda objetos.', correct: false }, { text: 'Instala servidores.', correct: false }] },
  { q: '¿Qué representa Destination?', options: [{ text: 'Hacia dónde va el tráfico.', correct: true }, { text: 'Quién inicia sesión.', correct: false }, { text: 'Cuánto cuesta.', correct: false }, { text: 'Cuánta RAM hay.', correct: false }] },
  { q: '¿Qué representa Target?', options: [{ text: 'Por dónde se envía el tráfico.', correct: true }, { text: 'Usuario IAM.', correct: false }, { text: 'Archivo de destino.', correct: false }, { text: 'CPU.', correct: false }] },
  { q: '¿Qué significa "local" en una ruta?', options: [{ text: 'Tráfico dentro del espacio de la VPC.', correct: true }, { text: 'Todo Internet.', correct: false }, { text: 'Un Security Group.', correct: false }, { text: 'Una contraseña.', correct: false }] },
  { q: '¿Qué representa 0.0.0.0/0 como Destination?', options: [{ text: 'Cualquier destino IPv4 no cubierto por una ruta más específica.', correct: true }, { text: 'Una IP individual.', correct: false }, { text: 'Solo la VPC.', correct: false }, { text: 'Un puerto.', correct: false }] },
  { q: '¿Qué es un Internet Gateway?', options: [{ text: 'Componente que permite conectividad entre VPC e Internet.', correct: true }, { text: 'Un servidor EC2.', correct: false }, { text: 'Un volumen.', correct: false }, { text: 'Un usuario.', correct: false }] },
  { q: '¿Conectar un IGW da Internet automáticamente a todas las instancias?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Qué combinación caracteriza conceptualmente una subnet pública?', options: [{ text: 'Ruta hacia Internet Gateway.', correct: true }, { text: 'Tener "public" en el nombre.', correct: false }, { text: 'Tener una AMI Linux.', correct: false }, { text: 'Tener EBS.', correct: false }] },
  { q: '¿Route Table y Security Group hacen lo mismo?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Una subnet privada puede seguir comunicándose dentro de la VPC?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
];

export default function Modulo5Clase4() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 5 · Clase 4</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 5 · Clase 4: Route Tables e Internet Gateway, enseñándole a nuestra red por dónde ir</h2>
      <p className="lesson-subtitle">
        La Route Table indica por dónde debe viajar el tráfico, y el Internet Gateway proporciona una puerta entre la VPC e Internet.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + lectura de rutas + diseño de red + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 5 · Clases 1 a 3</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es una Route Table y qué es una ruta.</li>
            <li>Identificar Destination y Target, y comprender la ruta local.</li>
            <li>Reconocer 0.0.0.0/0 como destino general IPv4.</li>
            <li>Explicar qué es un Internet Gateway y cómo una subnet se considera pública.</li>
            <li>Diferenciar Route Table, Internet Gateway y Security Group.</li>
            <li>Comprender que una instancia necesita varias condiciones para comunicarse con Internet.</li>
            <li>Detectar errores básicos de enrutamiento y diseñar conceptualmente una subnet pública.</li>
          </ul>
          <p>La frase que debe sobrevivir será:</p>
          <Dialogo>La Route Table indica por dónde debe viajar el tráfico, y el Internet Gateway proporciona una puerta entre la VPC e Internet.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Recordemos dónde quedamos</h3>
          <Flow steps={[{ icon: 'globe', label: 'VPC 10.0.0.0/16' }, { icon: 'radio', label: 'Public Subnet 10.0.1.0/24' }, { icon: 'lock', label: 'Private Subnet 10.0.2.0/24' }]} />
          <Dialogo>Dentro de la subnet pública tenemos un servidor web. ¿Cómo sabe por dónde enviar información hacia Internet?</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>3. Analogía del cruce vial</h3>
          <Nota><p>Necesitamos carreteras, pero también indicaciones: aeropuerto → izquierda, hospital → recto. Sin señales podemos tener caminos, pero no sabemos cuál tomar.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>4. Route Table</h3>
          <Dialogo>Una Route Table es como una tabla de señales que indica hacia dónde enviar tráfico según su destino.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>5. Destination y Target</h3>
          <RoleGrid roles={[
            { icon: 'map-pin', label: 'Destination', desc: '¿Hacia dónde quiere ir el tráfico?' },
            { icon: 'door', label: 'Target', desc: '¿Por dónde lo enviamos?' },
          ]} />
          <p>Por ejemplo: <code>10.0.0.0/16 → local</code>, <code>0.0.0.0/0 → igw-xxxx</code>. Lo traduciremos línea por línea. Más adelante aparecerán otros targets como NAT Gateway, peering o VPN — hoy solo necesitamos dos.</p>
        </section>

        <section className="lesson-section">
          <h3>6. Primera ruta: local</h3>
          <Dialogo>El tráfico destinado al espacio de nuestra propia VPC se mantiene dentro de la VPC.</Dialogo>
          <p>Web (10.0.1.20) y Database (10.0.2.30) pertenecen a 10.0.0.0/16, así que la ruta local permite conceptualmente esa comunicación, siempre sujeta también a Security Groups y NACLs. Analogía: un departamento del edificio no necesita salir a la calle para enviar algo a otro departamento del mismo edificio.</p>
        </section>

        <section className="lesson-section">
          <h3>7. Aparece 0.0.0.0/0</h3>
          <Nota><p>Ya conocimos 0.0.0.0/0 en Security Groups. Ahora aparece en una Route Table, y su función cambia según el contexto.</p></Nota>
          <RoleGrid roles={[
            { icon: 'shield', label: 'En Security Group', desc: 'Source 0.0.0.0/0 = cualquier IPv4 puede ser origen para esa regla' },
            { icon: 'refresh', label: 'En Route Table', desc: 'Destination 0.0.0.0/0 = cualquier destino IPv4 sin ruta más específica' },
          ]} />
          <p>Mismo CIDR, distinta función.</p>
        </section>

        <section className="lesson-section">
          <h3>8. Nuestra ruta de salida</h3>
          <p><code>Destination: 0.0.0.0/0</code>, <code>Target: Internet Gateway</code> — traducido: "para destinos IPv4 externos, envía el tráfico hacia el Internet Gateway".</p>
        </section>

        <section className="lesson-section">
          <h3>9. ¿Qué es un Internet Gateway?</h3>
          <Dialogo>Un Internet Gateway (IGW) es un componente de VPC que permite comunicación entre la VPC e Internet cuando el resto de la arquitectura está configurado apropiadamente.</Dialogo>
          <p>Analogía de la ciudad amurallada: existe una puerta principal para entrar y salir; la puerta no decide qué calle tomamos dentro de la ciudad, solo conecta ciudad ↔ exterior.</p>
        </section>

        <section className="lesson-section">
          <h3>10. Route Table e Internet Gateway hacen trabajos distintos</h3>
          <Flow steps={[{ icon: 'server', label: 'EC2' }, { icon: 'refresh', label: 'Route Table — decide por dónde' }, { icon: 'door', label: 'Internet Gateway — puerta' }, { icon: 'radio', label: 'Internet' }]} />
        </section>

        <section className="lesson-section">
          <h3>11. Internet Gateway solo tampoco basta</h3>
          <Nota><p>Si conectamos un Internet Gateway pero la Route Table solo tiene <code>10.0.0.0/16 → local</code>, no hay ninguna instrucción para Internet. Tener puerta no significa saber llegar hasta ella — como un edificio con salida a la calle pero sin ningún cartel "SALIDA →" dentro.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>12. ¿Eso convierte la subnet en pública?</h3>
          <Dialogo>Conceptualmente sí: una subnet cuya Route Table tiene una ruta hacia un Internet Gateway para Internet se considera pública.</Dialogo>
          <Nota><p>Pero estar en subnet pública no significa que una instancia pueda comunicarse automáticamente con Internet. Para IPv4, normalmente también necesita: IP pública o Elastic IP apropiada, Security Group que permita el tráfico necesario, y rutas correctas.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>13. La receta completa</h3>
          <Flow steps={[
            { icon: 'server', label: 'EC2 — IP privada + IP pública + Security Group' },
            { icon: 'building', label: 'Public Subnet' },
            { icon: 'refresh', label: 'Route Table — 0.0.0.0/0 → IGW' },
            { icon: 'door', label: 'Internet Gateway' },
            { icon: 'radio', label: 'Internet' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>14. ¿Y en la subnet privada?</h3>
          <p>Puede tener <code>10.0.0.0/16 → local</code> pero no <code>0.0.0.0/0 → Internet Gateway</code>. No tiene una ruta directa hacia Internet mediante el IGW. Pero sigue conectada internamente: Public Subnet y Private Subnet pueden comunicarse mediante la ruta local de la VPC cuando las reglas de seguridad lo permiten.</p>
        </section>

        <section className="lesson-section">
          <h3>15. CloudShop completa</h3>
          <Flow steps={[
            { icon: 'radio', label: 'Internet' },
            { icon: 'door', label: 'Internet Gateway' },
            { icon: 'globe', label: 'VPC 10.0.0.0/16' },
            { icon: 'building', label: 'Public Subnet — Web' },
            { icon: 'database', label: 'Private Subnet — Database' },
          ]} />
          <p>Route Table pública: <code>10.0.0.0/16 → local</code>, <code>0.0.0.0/0 → Internet Gateway</code>. Route Table privada: <code>10.0.0.0/16 → local</code> (por ahora).</p>
        </section>

        <section className="lesson-section">
          <h3>16. Dos subnets pueden usar distintas Route Tables</h3>
          <p>Public Subnet → Public Route Table; Private Subnet → Private Route Table, cada una con instrucciones diferentes. Las subnets están asociadas a tablas de rutas, y utilizan la tabla asociada para determinar cómo enrutar tráfico.</p>
        </section>

        <section className="lesson-section">
          <h3>17. Main Route Table</h3>
          <Nota><p>Cada VPC tiene una Main Route Table: la que actúa como principal para subnets que no tienen una asociación explícita con otra tabla. También podemos crear Route Tables personalizadas como <code>public-rt</code> y <code>private-rt</code> — pero recordamos: el nombre no define su comportamiento. <code>public-rt</code> con solo <code>10.0.0.0/16 → local</code> no crea Internet.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>18. Leer una Route Table</h3>
          <pre className="codeblock">{`Destination     Target
10.0.0.0/16     local
0.0.0.0/0       igw-ABC`}</pre>
          <QaItem question="Primera fila: ¿a dónde? ¿por dónde?" answer="10.0.0.0/16, por la ruta local." />
          <QaItem question="Segunda fila: ¿a dónde? ¿por dónde?" answer="Todos los demás destinos IPv4, por el Internet Gateway." />
        </section>

        <section className="lesson-section">
          <h3>19. ¿Cuál ruta gana?</h3>
          <Nota><p>Si existen varias rutas que podrían coincidir, AWS utiliza la ruta más específica aplicable. Destino <code>10.0.2.30</code> usa <code>10.0.0.0/16 → local</code> porque es una coincidencia más específica. Destino <code>8.8.8.8</code> no pertenece a <code>10.0.0.0/16</code>, así que usa <code>0.0.0.0/0 → IGW</code>.</p></Nota>
          <p>Analogía: si buscamos "hospital → izquierda", tomamos la instrucción específica, no "todo lo demás → centro".</p>
        </section>

        <section className="lesson-section">
          <h3>20. Route Table no es firewall</h3>
          <RoleGrid roles={[
            { icon: 'refresh', label: 'Route Table', desc: '¿Por dónde?' },
            { icon: 'shield', label: 'Security Group', desc: '¿Está permitido?' },
          ]} />
          <p>Analogía: una señal "Sala 202 → segundo piso" es como la Route Table. Pero en la puerta de 202 hay un guardia — eso es el Security Group. Saber llegar no significa poder entrar. Internet Gateway tampoco decide puertos: no dice "HTTP sí, SSH no" — eso corresponde a otros controles.</p>
        </section>

        <section className="lesson-section">
          <h3>21. Tres preguntas distintas</h3>
          <ConceptBadge icon="target">Route Table: ¿por dónde? · Internet Gateway: ¿hay puerta al exterior? · Security Group: ¿está permitido?</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>22. Entrada y salida en la práctica</h3>
          <Flow steps={[
            { icon: 'user', label: 'Usuario' },
            { icon: 'radio', label: 'Internet' },
            { icon: 'door', label: 'Internet Gateway' },
            { icon: 'globe', label: 'VPC → Public Subnet' },
            { icon: 'shield', label: 'Security Group' },
            { icon: 'server', label: 'EC2' },
          ]} />
          <p>Y para salir: EC2 → Route Table (0.0.0.0/0) → Internet Gateway → Internet, por ejemplo para descargar una actualización.</p>
        </section>

        <section className="lesson-section">
          <h3>23. Diagnóstico paso a paso</h3>
          <Nota><p>Si "tengo IP pública pero no Internet" no concluimos "la IP está mala". Revisamos:</p></Nota>
          <InfoBox items={['¿La instancia está Running?', '¿La subnet usa la Route Table correcta?', '¿Existe 0.0.0.0/0 → IGW?', '¿El IGW está asociado a la VPC?', '¿Existe direccionamiento público?', '¿Security Group permite lo necesario?']} />
          <p>Si "tengo IGW pero no Internet": tener la puerta sin la ruta hacia ella no entrega el camino necesario. Si "tengo ruta pero no IGW": necesitamos ruta + target válido.</p>
        </section>

        <section className="lesson-section">
          <h3>24. Actividad: lee la tabla</h3>
          <QaItem question={'Tabla con solo "10.0.0.0/16 → local". ¿Tiene ruta directa hacia Internet?'} answer="No." />
          <QaItem question={'Tabla con "10.0.0.0/16 → local" y "0.0.0.0/0 → igw-123". ¿Tiene ruta hacia Internet Gateway?'} answer="Sí. Podría utilizarse como Route Table para una subnet pública." />
        </section>

        <section className="lesson-section">
          <h3>25. Actividad: Route Table o Security Group</h3>
          <QaItem question='"HTTP 80 permitido"' answer="Security Group." />
          <QaItem question="0.0.0.0/0 → igw" answer="Route Table." />
          <QaItem question='"SSH solo desde mi IP"' answer="Security Group." />
          <QaItem question="10.0.0.0/16 → local" answer="Route Table." />
        </section>

        <section className="lesson-section">
          <h3>26. Pero surge un problema</h3>
          <Nota><p>Nuestra base de datos privada quizás no necesita Internet. Pero otro servidor privado podría necesitar actualizaciones, instalar paquetes o consultar una API externa.</p></Nota>
          <QaItem question="¿Cómo sale sin convertirse en público?" answer="Ahí aparece el gran protagonista de la Clase 5: NAT Gateway." />
        </section>

        <section className="lesson-section">
          <h3>27. Dos errores frecuentes</h3>
          <Dialogo>"Pongamos 0.0.0.0/0 → IGW en todas las subnets y listo." — el gerente</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque convertiríamos en públicas subnets que diseñamos precisamente para evitar conectividad directa con Internet. Esto es lo que haría en su lugar: definir rutas según la función de cada segmento. El riesgo de su enfoque es ampliar innecesariamente la exposición de recursos internos.</p>
          </Nota>
          <p>Y el error contrario: abrir el Security Group para "arreglar" un problema de rutas. Tener permiso (Security Group) sin camino (Route Table) tampoco funciona — como tener reserva confirmada en un restaurante sin que exista una carretera para llegar.</p>
        </section>

        <section className="lesson-section">
          <h3>28. Todas las piezas deben coincidir</h3>
          <ConceptBadge icon="target">Dirección + Ruta + Gateway + Seguridad = Comunicación posible</ConceptBadge>
          <p>La palabra importante es "posible" — todavía pueden existir otros controles o fallas.</p>
        </section>

        <section className="lesson-section">
          <h3>29. Caso ClínicaCloud completo</h3>
          <Flow steps={[
            { icon: 'radio', label: 'Internet' },
            { icon: 'door', label: 'Internet Gateway' },
            { icon: 'globe', label: 'VPC 10.20.0.0/16' },
            { icon: 'building', label: 'Public Subnet 10.20.1.0/24 — Portal' },
            { icon: 'database', label: 'Private Subnet 10.20.2.0/24 — DB' },
          ]} />
          <p>Public RT: <code>10.20.0.0/16 → local</code>, <code>0.0.0.0/0 → IGW</code>. Private RT: <code>10.20.0.0/16 → local</code> solamente.</p>
        </section>

        <section className="lesson-section">
          <h3>30. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>31. Reto de la clase</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge icon="trophy">CloudShop</ConceptBadge>
          <p>VPC 10.0.0.0/16, Subnet Web (10.0.1.0/24) debe recibir usuarios desde Internet; Subnet Database (10.0.2.0/24) no debe tener conexión directa desde Internet. Diseña las dos Route Tables.</p>
          <Reveal label="Ver solución esperada">
            <pre className="codeblock">{`Public Route Table
10.0.0.0/16      local
0.0.0.0/0        Internet Gateway

Private Route Table
10.0.0.0/16      local`}</pre>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>32. Retos de diagnóstico</h3>
          <QaItem question="Public Subnet con ruta a IGW, EC2 con Public IP, pero Security Group no permite HTTP 80. ¿Funcionará la página?" answer="No. El camino existe, pero el Security Group no permite ese tráfico." />
          <QaItem question="EC2 con Public IP, Security Group con HTTP 80, pero la subnet no tiene ruta hacia IGW. ¿Funciona?" answer="No. Tenemos permiso, pero falta el camino." />
          <QaItem question='"La subnet se llama public-subnet, tiene Security Group abierto para HTTP, pero no puedo ver la web." ¿Qué revisamos primero?' answer="Entre otras cosas: Route Table y Internet Gateway, además de IP y servicio web." />
        </section>

        <section className="lesson-section">
          <h3>33. Reto oral</h3>
          <Dialogo>Explícame una Route Table sin utilizar las palabras ruta, tabla, red, tráfico, destino, dirección, Internet, gateway, IP ni camino.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Es un conjunto de instrucciones que le dice al sistema qué siguiente lugar utilizar según dónde necesita llegar la información."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>34. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Route Table</td><td>Indica por dónde enviar tráfico</td></tr>
              <tr><td>Destination</td><td>Hacia dónde</td></tr>
              <tr><td>Target</td><td>Por dónde</td></tr>
              <tr><td>local</td><td>Comunicación dentro de la VPC</td></tr>
              <tr><td>0.0.0.0/0</td><td>Destinos IPv4 generales</td></tr>
              <tr><td>Internet Gateway</td><td>Puerta VPC ↔ Internet</td></tr>
              <tr><td>Public Subnet</td><td>Tiene ruta hacia IGW</td></tr>
              <tr><td>Private Subnet</td><td>No tiene ruta directa hacia IGW</td></tr>
              <tr><td>Public IP</td><td>Direccionamiento público del recurso</td></tr>
              <tr><td>Security Group</td><td>Controla tráfico permitido</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>35. Ticket de salida</h3>
          <Dialogo>Una instancia tiene IP pública y un Security Group que permite HTTP, pero su subnet no tiene 0.0.0.0/0 → Internet Gateway. ¿Qué falta?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Falta la ruta que permita enviar tráfico de Internet hacia el Internet Gateway. Tener dirección y permiso no sustituye el camino de red.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 5</div>
          <Flow steps={[{ icon: 'radio', label: 'Internet' }, { icon: 'door', label: 'IGW' }, { icon: 'building', label: 'Public Subnet — Web' }]} />
          <p>Eso funciona para un componente público. Pero tenemos una Private Subnet con una aplicación que necesita descargar actualizaciones, consultar una API externa e instalar paquetes — sin darle exposición directa desde Internet.</p>
          <Dialogo>¿Cómo hacemos para que pueda salir sin convertirla en pública?</Dialogo>
          <ConceptBadge icon="door">Módulo 5 · Clase 5 — NAT Gateway: permitir salida a Internet desde una subnet privada sin exponer directamente sus instancias</ConceptBadge>
          <span className="tag tag-outline">Módulo 5 · Clase 5 · próximamente</span>
        </div>

      </div>
    </div>
  );
}
