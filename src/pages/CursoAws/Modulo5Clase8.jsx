import {
  Icon, Nota, Dialogo, ConceptBadge, Flow, InfoBox, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué servicio permite crear una red virtual en AWS?', options: [{ text: 'Amazon VPC', correct: true }, { text: 'S3', correct: false }, { text: 'EBS', correct: false }, { text: 'IAM', correct: false }] },
  { q: '¿Qué es una subnet?', options: [{ text: 'Una división de la VPC.', correct: true }, { text: 'Un servidor.', correct: false }, { text: 'Una contraseña.', correct: false }, { text: 'Un bucket.', correct: false }] },
  { q: '¿Qué hace una Route Table?', options: [{ text: 'Decide por dónde enviar tráfico.', correct: true }, { text: 'Guarda datos.', correct: false }, { text: 'Crea usuarios.', correct: false }, { text: 'Instala Linux.', correct: false }] },
  { q: '¿Qué conecta una VPC con Internet?', options: [{ text: 'Internet Gateway.', correct: true }, { text: 'IAM Role.', correct: false }, { text: 'EBS.', correct: false }, { text: 'Snapshot.', correct: false }] },
  { q: '¿Qué ruta caracteriza nuestro ejemplo de subnet pública?', options: [{ text: '0.0.0.0/0 → IGW', correct: true }, { text: '0.0.0.0/0 → EBS', correct: false }, { text: '10.0.0.0/16 → IAM', correct: false }, { text: 'Ninguna.', correct: false }] },
  { q: '¿Qué usamos para salida desde una subnet privada en nuestro diseño?', options: [{ text: 'NAT Gateway.', correct: true }, { text: 'S3.', correct: false }, { text: 'IAM Group.', correct: false }, { text: 'AMI.', correct: false }] },
  { q: '¿Security Group trabaja principalmente a qué nivel?', options: [{ text: 'Recurso asociado.', correct: true }, { text: 'Región.', correct: false }, { text: 'Cuenta completa.', correct: false }, { text: 'Bucket.', correct: false }] },
  { q: '¿NACL trabaja a qué nivel?', options: [{ text: 'Subnet.', correct: true }, { text: 'AMI.', correct: false }, { text: 'Usuario.', correct: false }, { text: 'EBS.', correct: false }] },
  { q: '¿Una base de datos privada necesita necesariamente Public IP?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Una subnet llamada public-subnet es pública solo por el nombre?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
];

export default function Modulo5Clase8() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 5 · Clase 8</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 5 · Clase 8: Laboratorio integrador, construye y diagnostica una arquitectura VPC completa</h2>
      <p className="lesson-subtitle">
        Una red funciona cuando direccionamiento, rutas, gateways y controles de seguridad están alineados con la comunicación que necesitamos.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">60 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Laboratorio integrador + diagnóstico + evaluación final</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 5 · Clases 1 a 7</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Crear o diseñar una VPC completa, definir un rango CIDR, y crear una subnet pública y una privada.</li>
            <li>Asociar subnets a Availability Zones, crear y asociar Route Tables, y configurar un Internet Gateway.</li>
            <li>Identificar qué hace pública a una subnet y comprender cómo entregar salida a Internet a una privada mediante NAT Gateway.</li>
            <li>Configurar Security Groups básicos y revisar Network ACLs.</li>
            <li>Lanzar una EC2 en una subnet pública, comprobar conectividad y seguir el recorrido del tráfico.</li>
            <li>Diagnosticar errores de red y limpiar recursos correctamente.</li>
          </ul>
          <p>La frase que debe sobrevivir será:</p>
          <Dialogo>Una red funciona cuando direccionamiento, rutas, gateways y controles de seguridad están alineados con la comunicación que necesitamos.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. La misión</h3>
          <Nota><p>Presentamos: Proyecto CloudShop. La empresa necesita desplegar una infraestructura básica en AWS.</p></Nota>
          <Flow steps={[{ icon: 'user', label: 'Clientes' }, { icon: 'globe', label: 'Servidor Web' }, { icon: 'settings', label: 'Aplicación interna' }]} />
          <InfoBox items={['Los clientes deben acceder al servidor web', 'El servidor web debe estar en una red controlada', 'La aplicación interna no debe recibir conexiones directas desde Internet', 'La aplicación interna necesita iniciar conexiones hacia Internet', 'Solo se deben permitir los puertos necesarios']} />
        </section>

        <section className="lesson-section">
          <h3>3. Antes de entrar a AWS</h3>
          <InfoBox items={['Nombre del proyecto: ________________________', 'CIDR VPC: ________________________', 'CIDR subnet pública: ________________________', 'CIDR subnet privada: ________________________', 'Región: ________________________', 'AZ pública: ________________________', 'AZ privada: ________________________']} />
          <p>Y responde: ¿qué debe ser público? ¿qué debe ser privado? ¿quién necesita comunicarse con quién?</p>
        </section>

        <section className="lesson-section">
          <h3>4. Arquitectura objetivo</h3>
          <Flow steps={[
            { icon: 'radio', label: 'Internet' },
            { icon: 'door', label: 'Internet Gateway' },
            { icon: 'globe', label: 'VPC 10.0.0.0/16' },
            { icon: 'building', label: 'Public Subnet 10.0.1.0/24 — Web' },
            { icon: 'lock', label: 'Private Subnet 10.0.2.0/24 — App → NAT Gateway' },
          ]} />
          <p>Después añadiremos rutas y controles de seguridad.</p>
        </section>

        <section className="lesson-section">
          <h3>5. Paso 1: crear la VPC</h3>
          <p>VPC → Your VPCs → Create VPC. Name: <code>cloudshop-vpc</code>, IPv4 CIDR: <code>10.0.0.0/16</code>.</p>
          <QaItem question="¿Qué acabamos de crear?" answer="Una red virtual con un espacio de direcciones definido. No un servidor, no una subnet, no Internet." />
          <p>Etiquetas: <code>Proyecto = CloudShop</code>, <code>Modulo = VPC</code>, <code>Ambiente = Laboratorio</code> — esto ayudará después a identificar y limpiar recursos.</p>
        </section>

        <section className="lesson-section">
          <h3>6. Paso 2 y 3: crear las subnets</h3>
          <pre className="codeblock">{`cloudshop-public-a   10.0.1.0/24
cloudshop-private-a  10.0.2.0/24`}</pre>
          <Nota><p>Hasta este punto tenemos dos subnets. Llamarlas "public" y "private" no cambia su comportamiento — necesitamos rutas.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>7. Paso 4: crear y asociar Internet Gateway</h3>
          <p>VPC → Internet Gateways → Create. Nombre: <code>cloudshop-igw</code>. Después debemos asociarlo a nuestra VPC.</p>
          <Nota><p>Si lo creamos pero no lo conectamos a la VPC, no forma todavía el camino que necesitamos. Crear y asociar son pasos distintos.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>8. Paso 5: Public Route Table</h3>
          <p>Name: <code>cloudshop-public-rt</code>, asociada a <code>cloudshop-vpc</code> — tendrá automáticamente la ruta local (<code>10.0.0.0/16 → local</code>).</p>
          <p>Agregamos ruta hacia Internet: Destination <code>0.0.0.0/0</code>, Target <code>cloudshop-igw</code>. Asociamos la tabla a <code>cloudshop-public-a</code>.</p>
          <ConceptBadge icon="check-circle">Ahora sí podemos llamarla pública: la configuración, no el nombre, define su comportamiento</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>9. Paso 6: Private Route Table</h3>
          <p>Creamos <code>cloudshop-private-rt</code>, inicialmente solo <code>10.0.0.0/16 → local</code>, y la asociamos a <code>cloudshop-private-a</code>.</p>
          <p>Para nuestro escenario IPv4: no tiene ruta directa 0.0.0.0/0 → IGW, por lo tanto mantiene la intención de subnet privada.</p>
        </section>

        <section className="lesson-section">
          <h3>10. Paso 7: NAT Gateway</h3>
          <Nota><p>La aplicación privada necesita iniciar conexiones hacia Internet. En el patrón tradicional del laboratorio lo creamos en la Public Subnet, con una Elastic IP como direccionamiento público.</p></Nota>
          <ConceptBadge icon="dollar-sign" variant="warning">NAT Gateway puede generar cargos. Si la cuenta del laboratorio no está preparada para asumirlos, esta parte puede realizarse solo de forma conceptual o eliminarse inmediatamente después de la prueba.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>11. Paso 8: actualizar Private Route Table</h3>
          <pre className="codeblock">{`Public RT:  10.0.0.0/16 → local, 0.0.0.0/0 → IGW
Private RT: 10.0.0.0/16 → local, 0.0.0.0/0 → NAT Gateway`}</pre>
          <p>Esta comparación resume buena parte del módulo.</p>
        </section>

        <section className="lesson-section">
          <h3>12. Paso 9 y 10: Security Groups</h3>
          <InfoBox title="sg-web" items={['Inbound: HTTPS 443 (o HTTP 80), Source: 0.0.0.0/0']} />
          <Nota><p>Si necesitamos SSH: 22 desde IP administrativa específica, no 0.0.0.0/0 sin una necesidad deliberada.</p></Nota>
          <InfoBox title="sg-app" items={['Inbound: Application Port, Source: sg-web']} />
          <p>Web → App sí; cualquiera → App no. Este principio de mínimo acceso conecta IAM, Security Groups y arquitectura VPC.</p>
        </section>

        <section className="lesson-section">
          <h3>13. Paso 11: revisar Network ACL</h3>
          <Nota><p>Para nuestro primer laboratorio podemos mantener una configuración sencilla y revisar la NACL asociada (Inbound, Outbound, Subnet Associations) sin crear una custom NACL si no aporta nada al objetivo práctico.</p></Nota>
          <p>Porque el objetivo es aprender arquitectura, no demostrar cuántas reglas podemos acumular: Security Groups como control fino de recursos, NACL como capa de subnet.</p>
        </section>

        <section className="lesson-section">
          <h3>14. Paso 12: lanzar EC2 Web</h3>
          <p>Instancia pequeña en <code>cloudshop-public-a</code>, con <code>sg-web</code> y direccionamiento público necesario para la prueba.</p>
          <InfoBox items={['Instance: ________________', 'Private IP: ________________', 'Public IP: ________________', 'Subnet: ________________', 'Security Group: ________________', 'Route Table: ________________']} />
        </section>

        <section className="lesson-section">
          <h3>15. Paso 13 y 14: instalar y probar</h3>
          <pre className="codeblock">{`sudo dnf install httpd -y
sudo systemctl start httpd
echo '<h1>CloudShop funcionando</h1><p>Modulo VPC completado</p>' | sudo tee /var/www/html/index.html`}</pre>
          <p>Abrimos <code>http://PUBLIC-IP</code>. Si todo está configurado correctamente: "CloudShop funcionando".</p>
        </section>

        <section className="lesson-section">
          <h3>16. El estudiante debe explicar por qué funciona</h3>
          <Nota><p>No aceptamos "porque seguí los pasos". Debe explicar el recorrido completo:</p></Nota>
          <Flow steps={[
            { icon: 'user', label: 'Navegador' },
            { icon: 'radio', label: 'Internet' },
            { icon: 'door', label: 'IGW' },
            { icon: 'refresh', label: 'Public Route' },
            { icon: 'building', label: 'Public Subnet' },
            { icon: 'shield', label: 'SG' },
            { icon: 'server', label: 'EC2' },
            { icon: 'globe', label: 'Apache' },
          ]} />
          <p>Eso demuestra comprensión.</p>
        </section>

        <section className="lesson-section">
          <h3>17. Paso 15: recurso privado conceptual</h3>
          <p>Segunda EC2 en <code>cloudshop-private-a</code> (o analizada conceptualmente según presupuesto): Private IP sí, Public IP no, Security Group <code>sg-app</code>.</p>
          <QaItem question="¿Puede un navegador de Internet entrar directamente?" answer="No debería, porque nuestro diseño no le proporciona una ruta de entrada pública ni direccionamiento público. Eso es intencional." />
          <QaItem question="¿Puede salir mediante NAT?" answer="Sí, si Private RT tiene 0.0.0.0/0 → NAT y el NAT tiene conectividad apropiada." />
          <p>Prueba conceptual: <code>sudo dnf update</code> desde la instancia privada comprueba salida (Private EC2 → Private RT → NAT → IGW → Internet). No confundimos salida con entrada: que la instancia pueda descargar actualizaciones no significa que un usuario pueda conectarse directamente.</p>
        </section>

        <section className="lesson-section">
          <h3>18. Ahora viene el diagnóstico</h3>
          <Nota><p>El docente entrega arquitecturas rotas. El estudiante debe encontrar el problema sin abrir todo, borrar todo o recrear todo.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>19. Diez errores para diagnosticar</h3>
          <QaItem question="ERROR 1 — IGW ✅, Public RT solo local. La web no abre." answer="Falta 0.0.0.0/0 → IGW." />
          <QaItem question="ERROR 2 — Public RT tiene 0.0.0.0/0 → IGW, pero el IGW no está asociado correctamente." answer="El target no proporciona el camino funcional esperado." />
          <QaItem question="ERROR 3 — EC2 Web está en cloudshop-private-a, pero esperamos acceso directo público." answer="El recurso está en un segmento cuya configuración no coincide con su función." />
          <QaItem question="ERROR 4 — Subnet pública ✅, Route IGW ✅, SG HTTP ✅, pero sin Public IPv4." answer="Falta direccionamiento público apropiado." />
          <QaItem question="ERROR 5 — Route ✅, Public IP ✅, Apache ✅, pero SG sin HTTP/HTTPS." answer="El camino existe, pero el recurso no permite esa comunicación." />
          <QaItem question="ERROR 6 — Red ✅, SG ✅, pero Apache Stopped." answer="La red funciona, pero la aplicación no responde." />
          <QaItem question="ERROR 7 — NAT ✅, pero Private Route solo local." answer="La instancia privada no tiene ruta general de salida." />
          <QaItem question="ERROR 8 — Private RT → NAT ✅, NAT ✅, pero Public RT sin IGW." answer="NAT tampoco puede completar la salida hacia Internet." />
          <QaItem question="ERROR 9 — Private App con Public IP, ruta 0.0.0.0/0 → IGW, SG Allow All." answer="No estoy de acuerdo porque la arquitectura contradice el requisito de mantener la aplicación interna sin exposición directa. Esto es lo que haría en su lugar: eliminar el direccionamiento y la ruta pública innecesarios, usar NAT para salida si corresponde y limitar su SG a la capa Web. El riesgo es ampliar la superficie de ataque." />
          <QaItem question="ERROR 10 — SG-DB con 3306 desde 0.0.0.0/0, cuando solo App necesita conectarse." answer="La regla es demasiado amplia. Mejor: 3306, Source: SG-App." />
        </section>

        <section className="lesson-section">
          <h3>20. Árbol de diagnóstico general</h3>
          <Flow steps={[
            { label: '¿El recurso existe?' },
            { label: '¿Está ejecutándose?' },
            { label: '¿Está en la subnet correcta?' },
            { label: '¿Tiene direccionamiento apropiado?' },
            { label: '¿Existe ruta correcta?' },
            { label: '¿Gateway/NAT funciona?' },
            { label: '¿NACL permite?' },
            { label: '¿SG permite?' },
            { label: '¿Servicio funciona?' },
          ]} />
          <p>Este árbol vale más que memorizar cien botones.</p>
        </section>

        <section className="lesson-section">
          <h3>21. Actividad: arma el camino</h3>
          <Reveal label="Ver solución — camino público">
            <Flow steps={[{ icon: 'radio', label: 'Internet' }, { icon: 'door', label: 'IGW' }, { icon: 'refresh', label: 'Route Table' }, { icon: 'building', label: 'Public Subnet' }, { icon: 'shield', label: 'Security Group' }, { icon: 'server', label: 'EC2' }]} />
          </Reveal>
          <Reveal label="Ver solución — salida privada">
            <Flow steps={[{ icon: 'server', label: 'Private EC2' }, { icon: 'refresh', label: 'Private RT' }, { icon: 'door', label: 'NAT' }, { icon: 'door', label: 'IGW' }, { icon: 'radio', label: 'Internet' }]} />
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>22. Actividad: mínimo acceso</h3>
          <QaItem question="DB solo recibe desde App. ¿Cuál NO necesita necesariamente?" answer="Public IP." />
          <InfoBox items={['Web: 443 desde usuarios', 'App: Puerto App desde SG-Web', 'DB: Puerto DB desde SG-App']} />
          <p>Los estudiantes deben explicar por qué no usamos Allow All.</p>
        </section>

        <section className="lesson-section">
          <h3>23. Multi-AZ conceptual</h3>
          <Flow steps={[{ icon: 'radio', label: 'Internet' }, { icon: 'door', label: 'IGW' }, { icon: 'building', label: 'AZ A — Public A + Private A' }, { icon: 'building', label: 'AZ B — Public B + Private B' }]} />
          <p>No necesitamos desplegar todo en laboratorio.</p>
        </section>

        <section className="lesson-section">
          <h3>24. RETO FINAL DEL MÓDULO 5</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge icon="trophy">HealthCloud</ConceptBadge>
          <InfoBox items={['Los pacientes acceden al portal mediante HTTPS', 'El portal es público', 'La API es privada', 'La base de datos es privada', 'API necesita consultar Internet', 'Base de datos no necesita Internet', 'Solo API puede acceder a DB', 'Solo Portal puede acceder a API', 'Arquitectura debe poder crecer a dos AZ']} />
          <p>Los estudiantes deben diseñar VPC (por ejemplo 10.50.0.0/16), subnets (Public, Private API, Private DB, con variantes A/B para Multi-AZ), rutas (Pública: local + IGW; API privada: local + NAT; DB privada: solo local), Security Groups (SG-Portal 443 desde clientes, SG-API desde SG-Portal, SG-DB desde SG-API), y justificar si necesitan una NACL personalizada.</p>
          <Reveal label="Ver posible respuesta sobre NACL">
            <p>No necesariamente para el caso básico; podemos mantenerla sencilla y utilizar Security Groups como control principal del recurso. La capacidad de decir "no necesito este componente extra" también demuestra comprensión.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>25. Reto nivel 2: encuentra 10 errores</h3>
          <Nota><p>VPC 10.0.0.0/16. Web en Private Subnet con Public IP. API en Public Subnet con Public IP. DB en Public Subnet con Public IP. Public RT solo local. Private RT con 0.0.0.0/0 → IGW. NAT en subnet privada. SG-Web sin 443. SG-API Allow All. SG-DB 3306 desde Internet.</p></Nota>
          <Reveal label="Ver posibles correcciones">
            <ul className="plain-list">
              <li>Web debe utilizar una arquitectura pública coherente.</li>
              <li>API no necesita Public IP.</li>
              <li>DB no necesita Public IP y debería estar en subnet privada.</li>
              <li>Public RT necesita ruta al IGW.</li>
              <li>Private API RT debería usar NAT para salida.</li>
              <li>NAT público debería ubicarse en subnet pública en el patrón aprendido.</li>
              <li>SG-Web necesita HTTPS si ese es el servicio.</li>
              <li>SG-API debe restringirse al origen Web.</li>
              <li>SG-DB debe restringirse a API.</li>
            </ul>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>26. Reto oral final</h3>
          <Dialogo>Explica la arquitectura completa sin utilizar las palabras AWS, VPC, subnet, Route Table, NAT, Internet Gateway, Security Group, NACL, IP, pública ni privada.</Dialogo>
          <Reveal label="Ver una buena respuesta">
            <Dialogo>"Dividí los sistemas según quién necesita llegar a ellos. Los usuarios externos solo alcanzan la primera capa. Esa capa puede comunicarse con una segunda capa interna, y esta con los datos. Los sistemas internos que necesitan servicios externos utilizan una salida intermedia, mientras los datos permanecen accesibles únicamente desde la aplicación autorizada."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>27. Limpieza del laboratorio</h3>
          <Nota><p>Este punto es obligatorio, especialmente porque NAT Gateway puede generar costos. Seguimos un orden seguro:</p></Nota>
          <Flow steps={[
            { n: 1, label: 'EC2 — Terminate + revisar EBS' },
            { n: 2, label: 'NAT Gateway — Delete' },
            { n: 3, label: 'Elastic IP — liberar si ya no se usa' },
            { n: 4, label: 'Route Tables personalizadas' },
            { n: 5, label: 'Internet Gateway — desacoplar y eliminar' },
            { n: 6, label: 'Subnets' },
            { n: 7, label: 'Security Groups personalizados' },
            { n: 8, label: 'VPC' },
          ]} />
          <p>No dejamos el NAT Gateway flotando porque "ya terminamos la clase". Los recursos públicos sin uso (como una Elastic IP) pueden generar cargos según las condiciones vigentes.</p>
        </section>

        <section className="lesson-section">
          <h3>28. Checklist de limpieza</h3>
          <InfoBox items={['EC2 terminadas', 'EBS revisado', 'NAT Gateway eliminado', 'Elastic IP revisada/liberada', 'Route Tables personalizadas revisadas', 'Internet Gateway eliminado', 'Subnets eliminadas', 'Security Groups personalizados eliminados', 'Network ACL personalizada revisada', 'VPC eliminada', 'Costos revisados']} />
        </section>

        <section className="lesson-section">
          <h3>29. Error frecuente de limpieza</h3>
          <QaItem question='El estudiante intenta "Delete VPC" y AWS responde que existen dependencias. ¿Está AWS fallando?' answer="No. Significa que todavía hay componentes conectados a esa VPC. No podemos borrar la VPC si todavía dependen de ella subnets, gateways y recursos — la limpieza también muestra las relaciones y ayuda a comprender cómo están conectadas las piezas." />
        </section>

        <section className="lesson-section">
          <h3>30. Evaluación final del Módulo 5</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>31. Rúbrica final</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Nivel</th><th>Resultado</th></tr></thead>
            <tbody>
              <tr><td>Logrado</td><td>Diseña, explica, prueba y diagnostica una VPC básica</td></tr>
              <tr><td>En proceso</td><td>Comprende componentes pero necesita apoyo para conectarlos</td></tr>
              <tr><td>Inicial</td><td>Reconoce nombres, pero no entiende el recorrido del tráfico</td></tr>
            </tbody>
          </table>
          <Nota><p>Para "Logrado", el estudiante debe explicar: qué es la VPC, por qué eligió ese CIDR, qué función tiene cada subnet, qué hace pública una subnet, qué hace el Internet Gateway, qué hace NAT Gateway, cómo funcionan las Route Tables, qué controla Security Group, qué controla Network ACL, cómo llega un usuario hasta EC2, cómo una instancia privada sale a Internet, y cómo diagnosticaría un fallo.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>32. Mapa final del Módulo 5</h3>
          <Flow steps={[
            { icon: 'radio', label: 'Internet' },
            { icon: 'door', label: 'Internet Gateway' },
            { icon: 'globe', label: 'Amazon VPC' },
            { icon: 'building', label: 'Public Subnet — Public RT (0.0.0.0/0 → IGW) → NACL → SG-Web → Web' },
            { icon: 'lock', label: 'Private Subnet — Private RT (0.0.0.0/0 → NAT) → NACL → SG-App → App → DB' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>33. Las ideas que deben sobrevivir</h3>
          <ul className="plain-list">
            <li>VPC es nuestra red virtual.</li>
            <li>CIDR define el espacio de direcciones.</li>
            <li>Subnets dividen la VPC; cada subnet pertenece a una AZ.</li>
            <li>Route Table decide por dónde viaja el tráfico.</li>
            <li>Internet Gateway conecta VPC e Internet.</li>
            <li>Una subnet pública tiene una ruta apropiada hacia IGW; una privada no tiene esa ruta directa.</li>
            <li>NAT permite salida desde recursos privados.</li>
            <li>Security Group controla tráfico de recursos; NACL controla tráfico a nivel de subnet.</li>
            <li>Varias capas pueden trabajar juntas; solo damos la conectividad necesaria.</li>
            <li>Limpiar infraestructura también es parte del trabajo.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>34. Ticket de salida del Módulo 5</h3>
          <Dialogo>Una EC2 está en una subnet pública, tiene Public IP y HTTP permitido, pero la página no carga. ¿Qué revisarías?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Revisaría que la instancia esté funcionando, la Route Table tenga una ruta al Internet Gateway, el IGW esté correctamente asociado, la Network ACL permita el tráfico, el Security Group permita HTTP y que el servidor web esté realmente ejecutándose.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="cloud" /> Módulo 5 completado</div>
          <Nota><p>El estudiante comenzó pensando "Internet funciona porque hay Wi-Fi", y debería terminar pensando en un recorrido completo:</p></Nota>
          <Flow steps={[
            { label: 'Necesidad de comunicación' },
            { icon: 'globe', label: 'Diseño de VPC' },
            { icon: 'map-pin', label: 'Direccionamiento' },
            { icon: 'building', label: 'Segmentación' },
            { icon: 'refresh', label: 'Enrutamiento' },
            { icon: 'door', label: 'Gateways' },
            { icon: 'shield', label: 'Controles' },
            { icon: 'flask', label: 'Pruebas' },
            { icon: 'search', label: 'Diagnóstico' },
            { icon: 'trash', label: 'Limpieza' },
          ]} />
          <p>Eso ya es pensamiento de arquitectura de red. El siguiente módulo lógico es:</p>
          <ConceptBadge icon="database">Módulo 6: Bases de datos en AWS</ConceptBadge>
          <span className="tag tag-outline">Módulo 6 · próximamente</span>
        </div>

      </div>
    </div>
  );
}
