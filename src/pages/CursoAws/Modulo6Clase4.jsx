import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Dentro de qué servicio de red funciona RDS?', options: [{ text: 'VPC', correct: true }, { text: 'S3', correct: false }, { text: 'IAM Group', correct: false }, { text: 'CloudFront', correct: false }] },
  { q: '¿Qué es un DB Subnet Group?', options: [{ text: 'Grupo de subnets que RDS puede utilizar.', correct: true }, { text: 'Grupo de usuarios.', correct: false }, { text: 'Lista de tablas.', correct: false }, { text: 'Backup.', correct: false }] },
  { q: '¿Qué opción usaríamos para una RDS que no necesita acceso directo desde Internet?', options: [{ text: 'Public access = No', correct: true }, { text: 'Public access = Yes siempre', correct: false }, { text: '0.0.0.0/0', correct: false }, { text: 'SSH', correct: false }] },
  { q: '¿Qué controla el tráfico hacia RDS?', options: [{ text: 'Security Group', correct: true }, { text: 'S3 Lifecycle', correct: false }, { text: 'AMI', correct: false }, { text: 'EBS Snapshot', correct: false }] },
  { q: '¿Qué puerto utiliza normalmente MySQL?', options: [{ text: '3306', correct: true }, { text: '443', correct: false }, { text: '22', correct: false }, { text: '80', correct: false }] },
  { q: '¿Qué puerto utiliza normalmente PostgreSQL?', options: [{ text: '5432', correct: true }, { text: '3306', correct: false }, { text: '80', correct: false }, { text: '53', correct: false }] },
  { q: '¿Podemos utilizar otro Security Group como origen en SG-RDS?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Debemos usar la IP interna fija de RDS como referencia permanente?', options: [{ text: 'Sí.', correct: false }, { text: 'No. Debemos utilizar su endpoint DNS.', correct: true }] },
  { q: '¿Que SG permita 3306 significa que el usuario ya está autenticado en MySQL?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿RDS privada significa que la aplicación dentro de la VPC no puede usarla?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
];

export default function Modulo6Clase4() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 6 · Clase 4</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 6 · Clase 4: RDS dentro de una VPC, subnets privadas, Security Groups y acceso seguro</h2>
      <p className="lesson-subtitle">
        La aplicación necesita conectarse a la base; Internet no necesariamente necesita hacerlo.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + arquitectura + configuración guiada + diagnóstico + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 6 · Clases 1 a 3 + conceptos básicos del Módulo 5</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Comprender por qué una base de datos normalmente no necesita exposición directa a Internet.</li>
            <li>Ubicar conceptualmente RDS dentro de una VPC y comprender qué es un DB Subnet Group.</li>
            <li>Relacionar RDS con subnets privadas y comprender la opción Public access.</li>
            <li>Configurar conceptualmente un Security Group para RDS, permitiendo acceso desde otro Security Group.</li>
            <li>Comprender el uso de puertos de base de datos y diferenciar seguridad IAM y seguridad de red.</li>
            <li>Comprender qué es un endpoint de RDS y reconocer que debemos conectarnos mediante DNS, no la IP interna.</li>
            <li>Seguir el flujo Aplicación → RDS y diagnosticar errores básicos de conexión.</li>
          </ul>
          <p>La frase que debe sobrevivir será:</p>
          <Dialogo>La aplicación necesita conectarse a la base; Internet no necesariamente necesita hacerlo.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Recordemos CloudShop</h3>
          <Flow steps={[{ icon: 'user', label: 'Cliente' }, { icon: 'globe', label: 'Aplicación' }, { icon: 'database', label: 'RDS MySQL' }]} />
          <QaItem question="¿La clienta necesita conectarse directamente a MySQL?" answer="No." />
          <p>Analogía del banco: cuando utilizamos una aplicación bancaria, el banco no nos entrega "aquí está la dirección de nuestra base, conéctese directamente" — la aplicación funciona como intermediaria.</p>
        </section>

        <section className="lesson-section">
          <h3>3. Nuestra arquitectura deseada</h3>
          <Flow steps={[{ icon: 'radio', label: 'Internet' }, { icon: 'globe', label: 'Aplicación' }, { icon: 'shield', label: 'SG-App' }, { icon: 'shield', label: 'SG-RDS — red privada' }, { icon: 'database', label: 'RDS' }]} />
          <p>El cliente alcanza la aplicación. La aplicación alcanza la base.</p>
        </section>

        <section className="lesson-section">
          <h3>4. Lo que queremos evitar</h3>
          <Nota><p>Internet → RDS directamente, cuando no existe una necesidad para ello. La base normalmente contiene clientes, contraseñas cifradas, pedidos, pagos, inventario e información interna — no necesitamos ampliar su superficie de exposición.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>5. RDS vive dentro de una VPC</h3>
          <Nota><p>Las instancias RDS actuales se crean dentro de una Amazon VPC. La VPC proporciona el entorno de red donde definimos subnets y Security Groups.</p></Nota>
          <p>Ya sabemos qué significa VPC, Subnet, IP privada, Security Group, Route Table. Ahora aplicamos esos conceptos a RDS — no estamos aprendiendo otra red, estamos reutilizando la misma arquitectura.</p>
        </section>

        <section className="lesson-section">
          <h3>6. DB Subnet Group</h3>
          <Dialogo>Es una lista de subnets que autorizamos para que RDS pueda utilizar dentro de nuestra VPC.</Dialogo>
          <p>AWS selecciona una subnet y una dirección IP de ese grupo para la instancia de base de datos.</p>
          <Flow steps={[{ icon: 'globe', label: 'VPC' }, { icon: 'package', label: 'DB Subnet Group' }, { icon: 'lock', label: 'DB Subnet A + DB Subnet B' }, { icon: 'database', label: 'RDS' }]} />
        </section>

        <section className="lesson-section">
          <h3>7. ¿Por qué varias subnets?</h3>
          <Nota><p>Un DB Subnet Group normal debe cubrir al menos dos Availability Zones, salvo ciertos escenarios especiales. Esto prepara la arquitectura para opciones como Multi-AZ y recuperación.</p></Nota>
          <p>No le damos a RDS una única esquina del edificio; le damos sectores disponibles en más de una zona.</p>
        </section>

        <section className="lesson-section">
          <h3>8. Para nuestra arquitectura usaremos subnets privadas</h3>
          <pre className="codeblock">{`VPC 10.0.0.0/16
DB Subnet A — 10.0.20.0/24 (AZ A)
DB Subnet B — 10.0.21.0/24 (AZ B)`}</pre>
          <p>¿Por qué privadas? Porque nuestra base necesita comunicación con la aplicación, pero no necesita recibir conexiones directas desde usuarios de Internet. La necesidad dicta la arquitectura.</p>
        </section>

        <section className="lesson-section">
          <h3>9. Public access</h3>
          <Nota><p>Durante la creación de RDS veremos una opción Public access: Yes o No. AWS indica que No hace que la instancia sea accesible solo desde dentro de la VPC, mientras que Yes puede darle direccionamiento público bajo las demás condiciones necesarias.</p></Nota>
          <ConceptBadge icon="lock">Para CloudShop: Public access = No, porque la aplicación está dentro de la arquitectura AWS y puede comunicarse mediante la red privada</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>10. "Public access: Yes" no significa "sin contraseña"</h3>
          <Nota><p>Aunque una RDS sea públicamente accesible, eso no significa que cualquiera pueda entrar automáticamente. También interviene Security Group + credenciales + configuración. Pero seguimos sin necesitarlo: nuestro razonamiento no es "como existe Security Group, hagámosla pública", sino "¿existe una necesidad real de exposición pública?". Para CloudShop: no.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>11. SG-RDS</h3>
          <p>Creamos SG-App para nuestra aplicación y SG-RDS para nuestra base. MySQL utiliza normalmente TCP 3306.</p>
          <RoleGrid roles={[
            { icon: 'x-circle', label: 'Mala regla', desc: 'MySQL/Aurora, 3306, Source: 0.0.0.0/0 — demasiado amplio' },
            { icon: 'check-circle', label: 'Regla apropiada', desc: 'MySQL, TCP 3306, Source: SG-App' },
          ]} />
          <p>AWS permite utilizar otro Security Group como origen de una regla de acceso a RDS: los recursos asociados al SG-App pueden intentar conectarse al puerto MySQL de RDS. No estamos diciendo "todo lo que tenga una IP privada puede entrar" — estamos definiendo una relación entre capas.</p>
        </section>

        <section className="lesson-section">
          <h3>12. Otros motores y puertos</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Motor</th><th>Puerto estándar</th></tr></thead>
            <tbody>
              <tr><td>MySQL</td><td>3306</td></tr>
              <tr><td>PostgreSQL</td><td>5432</td></tr>
              <tr><td>SQL Server</td><td>1433</td></tr>
              <tr><td>Oracle</td><td>1521</td></tr>
            </tbody>
          </table>
          <p>No necesitamos memorizarlos todos. La regla es: permitir solo el puerto del motor que realmente estamos utilizando.</p>
        </section>

        <section className="lesson-section">
          <h3>13. Security Group es stateful</h3>
          <Nota><p>Si SG-RDS permite App → RDS, la respuesta correspondiente puede regresar gracias al comportamiento stateful del Security Group. No necesitamos diseñar una regla espejo para cada respuesta.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>14. ¿Y las credenciales?</h3>
          <Nota><p>Que la red permita App → RDS:3306 no significa que la aplicación tenga acceso automático a todas las tablas. Todavía necesitamos usuario base, contraseña/secreto y privilegios.</p></Nota>
          <RoleGrid roles={[
            { icon: 'globe', label: 'Red', desc: '¿Puede llegar?' },
            { icon: 'key', label: 'Database Auth', desc: '¿Puede iniciar sesión?' },
            { icon: 'file-text', label: 'DB Permissions', desc: '¿Qué puede hacer?' },
          ]} />
          <p>Analogía del edificio: Security Group te permite llegar hasta la puerta; credenciales es tener una llave; permisos dentro de la base es qué habitaciones puedes utilizar. No son lo mismo.</p>
          <Nota><p>IAM tampoco reemplaza credenciales automáticamente: tener un IAM User o Role no significa que ese usuario ya existe dentro de MySQL. Existen mecanismos de autenticación IAM para motores/configuraciones compatibles, pero no los necesitamos todavía.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>15. Nuestro modelo de seguridad completo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Capa</th><th>Pregunta</th></tr></thead>
            <tbody>
              <tr><td>IAM</td><td>¿Puede administrar RDS?</td></tr>
              <tr><td>VPC</td><td>¿Puede llegar?</td></tr>
              <tr><td>SG-RDS</td><td>¿Está permitido?</td></tr>
              <tr><td>Usuario DB</td><td>¿Puede iniciar sesión?</td></tr>
              <tr><td>Privilegios DB</td><td>¿Qué puede hacer?</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>16. ¿Cómo encuentra la aplicación a RDS? El endpoint</h3>
          <Dialogo>El endpoint es el nombre de red que utilizamos para conectarnos a la base.</Dialogo>
          <pre className="codeblock">database-abc123.region.rds.amazonaws.com : 3306</pre>
          <Nota><p>AWS recomienda utilizar el nombre DNS del endpoint en lugar de depender de la IP subyacente, porque esa dirección puede cambiar, por ejemplo durante failover.</p></Nota>
          <p>Analogía: queremos llamar a "Recepción CloudShop", no memorizar "el escritorio 17 del piso 3". Si la recepción cambia físicamente de lugar, el nombre sigue siendo la referencia estable.</p>
        </section>

        <section className="lesson-section">
          <h3>17. Cadena de conexión conceptual</h3>
          <InfoBox items={['HOST: endpoint RDS', 'PORT: 3306', 'DATABASE: cloudshop', 'USER: app_user', 'PASSWORD: ********']} />
          <Nota><p>No ponemos la contraseña en código público: las credenciales son secretos. Más adelante podremos estudiar mecanismos como AWS Secrets Manager.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>18. Diagnóstico: "Public access = No" no es un error</h3>
          <QaItem question="Un estudiante intenta conectarse desde su notebook personal por Internet a la RDS privada y no funciona. ¿Está rota la base?" answer="No necesariamente. Puede estar funcionando exactamente como fue diseñada." />
          <Nota><p>AWS indica que una DB Instance configurada con acceso privado no tiene IP pública y no es alcanzable directamente desde Internet. Eso no es error, es aislamiento.</p></Nota>
          <p>Para administrar una RDS privada existen mecanismos según el entorno: recursos dentro de la misma VPC, redes conectadas, VPN, Direct Connect, hosts administrativos apropiados. Para nuestro curso, la aplicación EC2 estará dentro de la VPC.</p>
        </section>

        <section className="lesson-section">
          <h3>19. Arquitectura de laboratorio</h3>
          <Flow steps={[{ icon: 'radio', label: 'Internet' }, { icon: 'server', label: 'EC2 App — IP privada' }, { icon: 'shield', label: 'SG-App' }, { icon: 'shield', label: 'SG-RDS' }, { icon: 'database', label: 'RDS — privada' }]} />
        </section>

        <section className="lesson-section">
          <h3>20. Debemos dejar direcciones disponibles</h3>
          <Nota><p>AWS necesita direcciones IP disponibles en las subnets del DB Subnet Group para operaciones como recuperación, mantenimiento, escalado y failover. AWS recomienda dejar espacio suficiente en los bloques de subnet.</p></Nota>
          <p>Analogía del estacionamiento: si todos los espacios están ocupados y AWS necesita mover o recuperar una instancia, no tiene dónde colocarla. Necesitamos margen.</p>
          <p>Al definir DB Subnet A y DB Subnet B en distintas AZ, ya estamos preparando una arquitectura que puede soportar opciones de alta disponibilidad posteriormente (Clase 6).</p>
        </section>

        <section className="lesson-section">
          <h3>21. Public DB Subnet Group existe, pero no es lo recomendado por defecto</h3>
          <Nota><p>Técnicamente también pueden existir escenarios de RDS públicamente accesible: Public access = Yes, subnets públicas apropiadas, Internet Gateway, reglas del Security Group. Puede existir una necesidad legítima para desarrollo, aplicaciones externas o acceso remoto controlado. Pero en producción debemos justificar claramente por qué necesitamos exposición pública.</p></Nota>
          <QaItem question="¿Quién necesita llegar a la base? Si la respuesta es 'solo mi aplicación dentro de AWS'..." answer="Entonces Public access: No es una decisión muy natural." />
        </section>

        <section className="lesson-section">
          <h3>22. Laboratorio conceptual: crear el DB Subnet Group</h3>
          <Nota><p>VPC cloudshop-vpc (10.0.0.0/16), App subnet 10.0.1.0/24, DB subnets 10.0.20.0/24 y 10.0.21.0/24.</p></Nota>
          <p>RDS → Subnet groups → Create DB subnet group. Nombre: <code>cloudshop-db-subnets</code>, seleccionamos db-subnet-a y db-subnet-b en distintas AZ.</p>
        </section>

        <section className="lesson-section">
          <h3>23. Configuración de RDS y Security Group</h3>
          <p>Connectivity: VPC = cloudshop-vpc, DB subnet group = cloudshop-db-subnets, Public access = No.</p>
          <InfoBox title="sg-cloudshop-rds" items={['Inbound: MySQL/Aurora, Port 3306, Source: sg-cloudshop-app']} />
          <QaItem question="Revisemos la regla: ¿quién? ¿qué acción de red? ¿a qué? ¿puerto?" answer="SG-App, conectar, RDS, 3306. Eso es mucho más comprensible que memorizar una tabla de reglas." />
        </section>

        <section className="lesson-section">
          <h3>24. No agregamos HTTP ni SSH</h3>
          <Nota><p>En SG-RDS no necesitamos HTTP 80 ni HTTPS 443, porque MySQL no utiliza esos puertos para sus conexiones normales. Tampoco SSH: una RDS administrada no se administra como una EC2 donde hacemos SSH 22 para entrar al sistema operativo — AWS gestiona la infraestructura subyacente y no nos entrega acceso tradicional al sistema operativo de la DB Instance.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>25. Detective RDS</h3>
          <InfoBox items={['DB Identifier: ____________________', 'VPC: ____________________', 'DB Subnet Group: ____________________', 'Public access: ____________________', 'Security Group: ____________________', 'Endpoint: ____________________', 'Port: ____________________']} />
          <Flow steps={[{ icon: 'server', label: 'App' }, { icon: 'shield', label: 'SG-App' }, { icon: 'globe', label: 'VPC' }, { icon: 'shield', label: 'SG-RDS' }, { icon: 'database', label: 'RDS' }]} />
        </section>

        <section className="lesson-section">
          <h3>26. Cuatro problemas de conexión para diagnosticar</h3>
          <QaItem question="SG-RDS permite 3306 desde SG-Other, pero la aplicación usa SG-App. ¿Funciona?" answer="No. Solución: revisar el origen autorizado." />
          <QaItem question="Base PostgreSQL, pero SG permite 3306 y la aplicación intenta 5432. ¿Funciona?" answer="No. El puerto permitido debe coincidir con el servicio utilizado." />
          <QaItem question="VPC ✅, SG ✅, Endpoint ✅, Port ✅, pero Password incorrecto. ¿Resultado?" answer="Fallo de autenticación. Eso demuestra que Conectividad ≠ Autenticación." />
          <QaItem question="Aplicación utiliza old-database.example, pero la RDS actual tiene otro endpoint. ¿Funciona la red perfecta?" answer="No estamos intentando llegar al destino correcto, aunque la red esté perfecta." />
        </section>

        <section className="lesson-section">
          <h3>27. Árbol de diagnóstico RDS</h3>
          <Flow steps={[
            { label: '¿RDS está Available?' },
            { label: '¿Endpoint correcto?' },
            { label: '¿Puerto correcto?' },
            { label: '¿Origen dentro/conectado a la VPC?' },
            { label: '¿SG-RDS permite ese origen?' },
            { label: '¿NACL/rutas permiten?' },
            { label: '¿Credenciales correctas?' },
            { label: '¿Usuario DB tiene permisos?' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>28. Actividad: seguro o riesgoso</h3>
          <QaItem question="RDS privada, 3306 solo desde SG-App." answer="Razonable." />
          <QaItem question="RDS pública, 3306 desde 0.0.0.0/0." answer="Muy riesgoso para nuestro caso." />
          <QaItem question="MySQL con HTTP 80 abierto." answer="No responde a la necesidad." />
        </section>

        <section className="lesson-section">
          <h3>29. Actividad: ¿quién debe llegar? / red o credencial</h3>
          <QaItem question="Cliente → App / Cliente → RDS / App → RDS / Internet completo → RDS" answer="Sí / No / Sí / No para nuestro escenario." />
          <QaItem question="SG no permite 3306 / Password incorrecto / Usuario no tiene permiso SELECT" answer="Red / Autenticación / Autorización de base." />
        </section>

        <section className="lesson-section">
          <h3>30. Caso ClínicaCloud</h3>
          <Nota><p>Pacientes acceden al portal; App consulta base (PostgreSQL); pacientes no acceden directamente; RDS no necesita Internet público.</p></Nota>
          <Flow steps={[{ icon: 'radio', label: 'Internet' }, { icon: 'globe', label: 'Portal' }, { icon: 'settings', label: 'App — SG-App' }, { icon: 'shield', label: 'SG-RDS — TCP 5432' }, { icon: 'database', label: 'PostgreSQL RDS — Public access: No' }]} />
        </section>

        <section className="lesson-section">
          <h3>31. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>32. Reto de la clase: AulaCloud</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge icon="trophy">AulaCloud</ConceptBadge>
          <p>Aplicación EC2 en sg-aulacloud-app, RDS MySQL. La base debe ser privada, aceptar conexiones solo desde la aplicación, y estar preparada para usar subnets en dos AZ.</p>
          <Reveal label="Ver solución esperada">
            <InfoBox items={['DB Subnet Group: db-subnet-a + db-subnet-b en dos AZ', 'Public access: No', 'SG-RDS: MySQL TCP 3306, Source: sg-aulacloud-app', 'Aplicación utiliza: RDS Endpoint + 3306 + credenciales']} />
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>33. Retos nivel 2 y 3</h3>
          <QaItem question="RDS Private ✅, SG-RDS 3306 desde SG-App ✅, pero App está en otra VPC sin conexión. ¿Funcionará?" answer="No. El Security Group puede permitir conceptualmente el tráfico, pero todavía necesitamos conectividad de red válida entre origen y destino. Una regla no crea carreteras." />
          <QaItem question="RDS Public access = Yes, SG con 3306 desde 203.0.113.10/32. ¿Cualquier persona de Internet puede conectarse?" answer="No necesariamente. Solo el origen permitido por la regla tendría conectividad de red potencial, y todavía serían necesarias credenciales y demás condiciones. Pero seguimos evaluando si la exposición pública es necesaria." />
        </section>

        <section className="lesson-section">
          <h3>34. El desarrollador quiere "arreglar" la conexión</h3>
          <Dialogo>"No conecta. Pongamos RDS pública y 0.0.0.0/0 en el Security Group para probar."</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque estamos eliminando controles antes de identificar el problema. Esto es lo que haría en su lugar: revisar endpoint, puerto, origen, Security Groups, red y credenciales en orden. El riesgo de su enfoque es convertir un error de diagnóstico en una exposición real de la base.</p>
          </Nota>
          <ConceptBadge icon="search">No ampliamos permisos para descubrir qué estaba mal: observamos → identificamos la capa → corregimos únicamente esa capa</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>35. Reto oral</h3>
          <Dialogo>Explícame cómo protegerías una base en AWS sin utilizar las palabras RDS, VPC, subnet, Security Group, pública, privada, Internet, puerto, IP, endpoint ni base de datos.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Mantendría el sistema interno fuera del alcance directo de usuarios externos y permitiría que solo la aplicación autorizada pudiera comunicarse con él mediante el servicio específico que necesita."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>36. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>VPC</td><td>Red donde se integra RDS</td></tr>
              <tr><td>DB Subnet Group</td><td>Subnets disponibles para RDS</td></tr>
              <tr><td>Private access</td><td>Sin acceso directo desde Internet</td></tr>
              <tr><td>Public access</td><td>Permite direccionamiento público bajo condiciones</td></tr>
              <tr><td>SG-RDS</td><td>Controla tráfico hacia la base</td></tr>
              <tr><td>SG-App → SG-RDS</td><td>Permite acceso entre capas autorizadas</td></tr>
              <tr><td>Endpoint</td><td>Nombre DNS para conectarse</td></tr>
              <tr><td>Credenciales</td><td>Autenticación dentro de la base</td></tr>
              <tr><td>Mínimo acceso</td><td>Solo el origen y puerto necesarios</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>37. Ticket de salida</h3>
          <Dialogo>Mi aplicación EC2 necesita conectarse a una RDS MySQL, pero ningún usuario de Internet necesita acceder directamente a la base. ¿Cómo la configurarías?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Mantendría RDS con acceso público deshabilitado, utilizaría un DB Subnet Group con subnets apropiadas, configuraría SG-RDS para permitir TCP 3306 solamente desde el Security Group de la aplicación y conectaría la aplicación utilizando el endpoint DNS de RDS y credenciales apropiadas.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 5</div>
          <ConceptBadge icon="check-circle">CloudShop RDS: VPC ✅ · Private access ✅ · SG correcto ✅ · Aplicación conectada ✅</ConceptBadge>
          <p>Todo funciona. Hasta que alguien escribe <code>DELETE FROM pedidos;</code> — o peor, <code>DROP TABLE clientes;</code></p>
          <Dialogo>"La seguridad evitó accesos no autorizados, pero ¿cómo recuperamos información que un usuario autorizado eliminó por error?"</Dialogo>
          <p>La respuesta no está en Security Group ni en VPC.</p>
          <ConceptBadge icon="refresh">Módulo 6 · Clase 5 — Backups, snapshots y Point-in-Time Recovery: cómo volver atrás cuando algo sale mal</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-6/clase-5" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 5: Backups, snapshots y recuperación →
          </Link>
        </div>

      </div>
    </div>
  );
}
