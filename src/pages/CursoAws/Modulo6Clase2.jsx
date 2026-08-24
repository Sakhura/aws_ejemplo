import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, CompareCols, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué significa RDS?', options: [{ text: 'Relational Database Service', correct: true }, { text: 'Remote Data Server', correct: false }, { text: 'Relational Disk Storage', correct: false }, { text: 'Regional Database System', correct: false }] },
  { q: '¿Amazon RDS es un motor de base de datos?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Cuál es un motor soportado por RDS?', options: [{ text: 'MySQL', correct: true }, { text: 'HTML', correct: false }, { text: 'CSS', correct: false }, { text: 'Terraform', correct: false }] },
  { q: '¿Qué es una DB Instance?', options: [{ text: 'Entorno de cómputo administrado donde funciona la base.', correct: true }, { text: 'Usuario IAM.', correct: false }, { text: 'Bucket.', correct: false }, { text: 'Security Group.', correct: false }] },
  { q: '¿RDS puede integrarse con VPC?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿AWS diseña automáticamente nuestras tablas?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿RDS proporciona funciones de backup?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Multi-AZ está relacionado con alta disponibilidad?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿RDS debe ser público para que una aplicación EC2 pueda utilizarlo?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿RDS puede generar costos según capacidad y configuración?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
];

export default function Modulo6Clase2() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 6 · Clase 2</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 6 · Clase 2: Amazon RDS, cuando AWS administra gran parte del trabajo pesado</h2>
      <p className="lesson-subtitle">
        Amazon RDS nos permite utilizar una base de datos relacional mientras AWS administra gran parte de la infraestructura que existe debajo.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + comparación + arquitectura + actividades + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 6 · Clase 1</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es Amazon RDS y qué significa servicio administrado.</li>
            <li>Diferenciar RDS de instalar una base de datos manualmente en EC2.</li>
            <li>Comprender qué es un motor de base de datos y reconocer algunos motores compatibles con RDS.</li>
            <li>Comprender qué es una DB Instance y que necesita cómputo y almacenamiento.</li>
            <li>Diferenciar las responsabilidades de AWS y del cliente.</li>
            <li>Comprender que RDS puede integrarse con una VPC y ofrece backups, mantenimiento y alta disponibilidad.</li>
            <li>Comprender que RDS sigue generando costos.</li>
            <li>Prepararse para elegir motor y capacidad en la Clase 3.</li>
          </ul>
          <p>La frase que debe sobrevivir será:</p>
          <Dialogo>Amazon RDS nos permite utilizar una base de datos relacional mientras AWS administra gran parte de la infraestructura que existe debajo.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Recordemos la clase anterior</h3>
          <Nota><p>Una tienda con Clientes, Productos, Pedidos, Pagos, donde decidimos que una base de datos relacional puede ser apropiada. Ahora necesitamos ejecutar esa base en algún lugar.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>3. Opción 1: hacerlo nosotros</h3>
          <Flow steps={[{ icon: 'cloud', label: 'AWS' }, { icon: 'server', label: 'EC2' }, { icon: 'settings', label: 'MySQL' }, { icon: 'database', label: 'Base de datos' }]} />
          <p>Parece sencillo, pero detrás aparecen muchas tareas: Servidor, Sistema operativo, Motor, Actualizaciones, Seguridad, Almacenamiento, Backups, Monitoreo, Fallos, Recuperación. La base funciona, pero alguien tiene que cuidar todo eso.</p>
          <Dialogo>A las 3 de la mañana nadie sueña con recibir "el disco de la base de datos está lleno".</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>4. Aquí aparece Amazon RDS</h3>
          <Nota><p>RDS significa Relational Database Service. Amazon RDS es un servicio administrado para desplegar y operar bases de datos relacionales en AWS. Automatiza tareas como aprovisionamiento, aplicación de parches, backups y otras labores operativas.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>5. Analogía del hotel</h3>
          <CompareCols cols={[
            { emoji: '🏠', title: 'Opción A: comprar una casa', items: ['Construcción', 'Reparaciones', 'Electricidad, agua', 'Mantenimiento'] },
            { emoji: '🏨', title: 'Opción B: hotel', items: ['Nos preocupamos de utilizar la habitación', 'El hotel se encarga de limpieza, mantenimiento, infraestructura'] },
          ]} />
          <p>RDS se parece conceptualmente más al segundo modelo.</p>
        </section>

        <section className="lesson-section">
          <h3>6. Pero RDS no significa "AWS hace todo"</h3>
          <Nota><p>Seguimos teniendo responsabilidades: nuestros datos, diseño de tablas, usuarios de la base, permisos, consultas, configuración, decisiones de capacidad, arquitectura de acceso.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>7. Responsabilidad compartida</h3>
          <CompareCols cols={[
            { emoji: '☁️', title: 'AWS', items: ['Infraestructura física', 'Mantenimiento del servicio', 'Aprovisionamiento', 'Determinadas tareas de parches', 'Mecanismos de backup', 'Detección de fallos'] },
            { emoji: '👤', title: 'Nosotros', items: ['Datos', 'Cuentas', 'Accesos', 'Tablas', 'Consultas', 'Configuración', 'Arquitectura'] },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>8. No confundamos "administrado" con "automágico"</h3>
          <Nota><p>Si nuestra tabla está mal diseñada, AWS no aparece diciendo "te la voy a arreglar". Si ejecutamos una consulta equivocada (DELETE...), RDS no responde "sé que no querías hacer eso". La administración del servicio no reemplaza buenas decisiones.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>9. RDS no es un motor</h3>
          <ConceptBadge icon="x-circle" variant="danger">Amazon RDS ≠ MySQL</ConceptBadge>
          <RoleGrid roles={[
            { icon: 'cloud', label: 'RDS', desc: 'El servicio administrado' },
            { icon: 'settings', label: 'MySQL', desc: 'Uno de los motores que puede ejecutar' },
          ]} />
          <p>Analogía del automóvil: un servicio de arriendo nos permite elegir distintos autos — el servicio de arriendo no es el automóvil.</p>
        </section>

        <section className="lesson-section">
          <h3>10. ¿Por qué varios motores?</h3>
          <Nota><p>Porque distintas organizaciones ya utilizan tecnologías diferentes: una empresa dice "nuestra aplicación funciona con PostgreSQL", otra "usamos SQL Server", otra "usamos MySQL". RDS permite trabajar con varios motores conocidos.</p></Nota>
          <p>No elegimos por el logo más bonito: preguntamos qué usa mi aplicación, qué conoce mi equipo, qué características necesito, qué licenciamiento existe, cuánto costará.</p>
        </section>

        <section className="lesson-section">
          <h3>11. ¿Qué es una DB Instance?</h3>
          <Dialogo>Es el entorno de cómputo administrado donde funciona nuestro motor de base de datos.</Dialogo>
          <p>AWS describe una DB Instance como la infraestructura subyacente que incluye recursos como CPU, memoria, almacenamiento e IOPS.</p>
          <Flow steps={[{ icon: 'cloud', label: 'Amazon RDS' }, { icon: 'server', label: 'DB Instance' }, { icon: 'settings', label: 'MySQL' }, { icon: 'database', label: 'CloudShop' }]} />
        </section>

        <section className="lesson-section">
          <h3>12. Una DB Instance necesita recursos</h3>
          <Nota><p>Igual que aprendimos con EC2, necesitamos capacidad: CPU, Memoria, Almacenamiento. Una base con 100 clientes no tiene las mismas necesidades que 100 millones de transacciones.</p></Nota>
          <Dialogo>Right sizing vuelve a aparecer: no contratar más de lo necesario, ni menos de lo necesario. La Clase 3 estará dedicada a esto.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>13. RDS tampoco es S3</h3>
          <RoleGrid roles={[
            { icon: 'package', label: 'Amazon S3', desc: 'Imágenes, videos, archivos' },
            { icon: 'database', label: 'Amazon RDS', desc: 'Clientes, productos, pedidos, pagos' },
          ]} />
          <p>No porque S3 sea malo para los segundos, sino porque estamos resolviendo necesidades diferentes. CloudShop puede utilizar ambos: S3 para imágenes de productos, RDS para clientes, productos, pedidos y pagos.</p>
        </section>

        <section className="lesson-section">
          <h3>14. ¿RDS puede estar dentro de nuestra VPC?</h3>
          <Nota><p>RDS se integra con Amazon VPC, permitiéndonos controlar configuración de red y aislamiento de la base. Entonces conectamos inmediatamente con el Módulo 5.</p></Nota>
          <QaItem question="¿Necesita cualquier usuario de Internet conectarse directamente a RDS?" answer="En nuestro caso, no." />
        </section>

        <section className="lesson-section">
          <h3>15. Primera arquitectura RDS</h3>
          <Flow steps={[{ icon: 'user', label: 'Usuario' }, { icon: 'globe', label: 'Aplicación' }, { icon: 'database', label: 'RDS — red interna' }]} />
          <p>Analogía del banco: un cliente utiliza el cajero, que consulta el sistema bancario — el cliente no recibe acceso directo al sistema central.</p>
        </section>

        <section className="lesson-section">
          <h3>16. Security Groups vuelven</h3>
          <RoleGrid roles={[
            { icon: 'shield', label: 'SG-App', desc: '' },
            { icon: 'shield', label: 'SG-RDS', desc: 'Solo permite tráfico desde SG-App' },
          ]} />
          <p>MySQL utiliza normalmente TCP 3306: SG-RDS, Inbound MySQL/Aurora 3306, Source: SG-App. No necesitamos 0.0.0.0/0.</p>
          <p>Mínimo privilegio, otra vez: solo la aplicación que necesita la base puede conectarse. Esto conecta IAM + VPC + Security Groups + RDS — la seguridad empieza a funcionar como un sistema.</p>
        </section>

        <section className="lesson-section">
          <h3>17. RDS puede tener opción de acceso público</h3>
          <Nota><p>Al configurar determinadas bases RDS encontraremos opciones relacionadas con "Public access". Pero que exista la opción no significa que debamos activarla.</p></Nota>
          <Dialogo>"Quiero conectarme desde mi notebook. Pongamos RDS público." — Pedro</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque estamos cambiando la exposición de la base para resolver una necesidad administrativa. Esto es lo que haría en su lugar: diseñar un acceso controlado y limitado. El riesgo de su enfoque es aumentar innecesariamente la superficie de ataque de un sistema que contiene información de negocio.</p>
          </Nota>
          <ConceptBadge icon="lock">Nuestra regla inicial: RDS privado por defecto</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>18. RDS y Availability Zones</h3>
          <Flow steps={[{ icon: 'map-pin', label: 'Región' }, { icon: 'globe', label: 'VPC' }, { icon: 'building', label: 'DB Subnets' }, { icon: 'database', label: 'RDS' }]} />
          <p>Más adelante veremos Multi-AZ para mejorar disponibilidad (Clase 6).</p>
        </section>

        <section className="lesson-section">
          <h3>19. DB Subnet Group</h3>
          <Dialogo>Es un conjunto de subnets que RDS puede utilizar dentro de nuestra VPC.</Dialogo>
          <p>Normalmente queremos subnets apropiadamente distribuidas entre Availability Zones para diseños resilientes. Le decimos a AWS: "para mi base puedes utilizar estos sectores autorizados".</p>
        </section>

        <section className="lesson-section">
          <h3>20. ¿RDS realiza backups?</h3>
          <Nota><p>Sí. Amazon RDS ofrece backups automatizados y snapshots manuales. Los backups automatizados pueden conservarse según un período de retención y permiten recuperación a un punto dentro de ese período. Hoy solo reconoceremos la función — la Clase 5 será completamente sobre esto.</p></Nota>
          <RoleGrid roles={[
            { icon: 'refresh', label: 'Automated Backup', desc: '' },
            { icon: 'camera', label: 'Manual Snapshot', desc: '' },
          ]} />
          <Nota><p>Los backups tienen configuración, períodos de retención, costos y condiciones, procedimientos de restauración. No asumimos "AWS guarda todo para siempre".</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>21. ¿Y si falla infraestructura?</h3>
          <Nota><p>RDS también ofrece configuraciones de alta disponibilidad como Multi-AZ. En una implementación Multi-AZ, RDS puede mantener una instancia primaria y una o más instancias standby en otras AZ según el tipo de despliegue, con mecanismos de failover (Clase 6).</p></Nota>
          <RoleGrid roles={[
            { icon: 'camera', label: 'Backup', desc: '¿Cómo recupero datos?' },
            { icon: 'building', label: 'Multi-AZ', desc: '¿Cómo mantengo disponibilidad ante determinados fallos?' },
          ]} />
          <p>Analogía del hotel: backup es tener una copia de mis documentos; Multi-AZ es tener otra habitación preparada si la actual deja de funcionar. Una copia de papeles no es otra habitación, y una segunda habitación no reemplaza la copia de documentos.</p>
        </section>

        <section className="lesson-section">
          <h3>22. Monitoreo y parches</h3>
          <p>RDS también ofrece integración con herramientas de monitoreo (CPU, memoria, almacenamiento, conexiones, actividad). Y reduce el trabajo manual relacionado con mantenimiento y parcheo — pero seguimos necesitando planificar ventanas y comprender impactos. Administrado no significa invisible.</p>
          <Dialogo>Maintenance Window: un período donde AWS puede realizar determinadas tareas de mantenimiento planificadas según configuración y necesidad.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>23. Antes y después de RDS</h3>
          <CompareCols cols={[
            { emoji: '🖥️', title: 'Nosotros administramos en EC2', items: ['EC2 → OS → MySQL', 'Storage → Backup → Patching → Monitoring'] },
            { emoji: '☁️', title: 'Amazon RDS', items: ['RDS → Motor → Nuestra base', 'AWS gestiona buena parte de la plataforma subyacente'] },
          ]} />
          <QaItem question="¿Significa que EC2 + MySQL está mal?" answer="No. Existen escenarios donde necesitamos mayor control sobre sistema operativo o configuración. En otros, RDS reduce trabajo operacional. La pregunta correcta: ¿cuánto control necesito y cuánto quiero administrar?" />
        </section>

        <section className="lesson-section">
          <h3>24. EC2 + DB vs RDS</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th></th><th>DB en EC2</th><th>Amazon RDS</th></tr></thead>
            <tbody>
              <tr><td>Control SO</td><td>Alto</td><td>AWS administra infraestructura subyacente</td></tr>
              <tr><td>Instalación motor</td><td>Cliente</td><td>Gestionada mediante servicio</td></tr>
              <tr><td>Backups</td><td>Cliente diseña/gestiona</td><td>Funciones integradas</td></tr>
              <tr><td>Parches</td><td>Mayor responsabilidad cliente</td><td>RDS automatiza gran parte</td></tr>
              <tr><td>Configuración DB / Datos</td><td>Cliente</td><td>Cliente</td></tr>
              <tr><td>Facilidad operativa</td><td>Menor</td><td>Mayor</td></tr>
            </tbody>
          </table>
          <Nota><p>No existe gratis "menos administración". El servicio administrado tiene un costo: pagamos, entre otras cosas, por infraestructura, capacidad, almacenamiento, funcionalidades del servicio y reducción de carga operacional.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>25. No elegimos una instancia gigante</h3>
          <Dialogo>"Para que nunca se ponga lenta, usemos la más grande." — Pedro</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque estamos pagando capacidad sin demostrar que la necesitamos. Esto es lo que haría en su lugar: comenzar con un tamaño acorde al uso esperado y monitorear. El riesgo de su enfoque es elevar costos sin beneficio real.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>26. Caso CloudShop</h3>
          <Nota><p>10.000 clientes, 500 productos, pedidos diarios. La aplicación utiliza MySQL, entonces evaluamos Amazon RDS for MySQL.</p></Nota>
          <Flow steps={[
            { icon: 'user', label: 'Cliente' },
            { icon: 'globe', label: 'Aplicación' },
            { icon: 'shield', label: 'SG-App' },
            { icon: 'globe', label: 'Amazon VPC' },
            { icon: 'lock', label: 'DB Subnets' },
            { icon: 'shield', label: 'SG-RDS' },
            { icon: 'database', label: 'RDS MySQL' },
          ]} />
          <p>No metemos producto.jpg dentro de la base como primera opción: S3 para producto.jpg, RDS para nombre, precio, stock y key/URL de imagen.</p>
        </section>

        <section className="lesson-section">
          <h3>27. Actividad: ¿AWS o nosotros?</h3>
          <QaItem question="Hardware físico" answer="AWS." />
          <QaItem question="Diseño tabla Clientes" answer="Nosotros." />
          <QaItem question="Consulta SQL incorrecta" answer="Nosotros." />
          <QaItem question="Muchas tareas de backup automatizado de RDS" answer="AWS ejecuta el mecanismo según nuestra configuración." />
          <QaItem question="Elegir quién puede acceder" answer="Nosotros." />
        </section>

        <section className="lesson-section">
          <h3>28. Actividad: RDS o S3, motor o servicio</h3>
          <QaItem question="Imágenes de productos, videos, PDFs" answer="S3." />
          <QaItem question="Pedidos, clientes, stock" answer="RDS." />
          <QaItem question="Amazon RDS" answer="Servicio administrado." />
          <QaItem question="MySQL, PostgreSQL, SQL Server" answer="Motores." />
        </section>

        <section className="lesson-section">
          <h3>29. Diseñemos una RDS conceptual — UniversidadCloud</h3>
          <Nota><p>Necesita almacenar estudiantes, asignaturas, notas, docentes. Aplicación compatible con PostgreSQL.</p></Nota>
          <InfoBox items={['¿Qué motor?', '¿Qué tamaño?', '¿Cuánto almacenamiento?', '¿En qué VPC?', '¿En qué subnets?', '¿Quién puede acceder?', '¿Necesitamos backups?', '¿Necesitamos alta disponibilidad?', '¿Cuánto costará?']} />
          <p>Este checklist nos acompañará todo el módulo.</p>
        </section>

        <section className="lesson-section">
          <h3>30. Dos errores frecuentes</h3>
          <Nota>
            <p>Error: base directamente pública para una aplicación que no requiere acceso directo. No estoy de acuerdo porque estamos saltándonos la capa de aplicación y aumentando la exposición de la base. Esto es lo que haría en su lugar: Usuario → Aplicación → RDS privado. El riesgo es exponer directamente un servicio crítico.</p>
          </Nota>
          <p>Error: contraseña en código (usuario = admin, password = 123456 escrito directamente en código compartido). Las credenciales de base de datos son secretos y deben tratarse como tales.</p>
        </section>

        <section className="lesson-section">
          <h3>31. IAM y credenciales de DB no son exactamente lo mismo</h3>
          <RoleGrid roles={[
            { icon: 'lock', label: 'IAM', desc: '¿Quién administra el recurso RDS?' },
            { icon: 'database', label: 'Database credentials', desc: '¿Quién entra a la base?' },
          ]} />
          <p>En determinados motores y configuraciones existen integraciones IAM, pero para nuestro nivel no asumimos que crear un usuario IAM crea automáticamente un usuario dentro de MySQL.</p>
        </section>

        <section className="lesson-section">
          <h3>32. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>33. Reto de la clase</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge icon="trophy">ClínicaCloud</ConceptBadge>
          <p>Pacientes, médicos, citas, atenciones. La aplicación utiliza PostgreSQL. La empresa quiere instalar PostgreSQL manualmente en una EC2. Comparar EC2 + PostgreSQL versus RDS PostgreSQL.</p>
          <QaItem question="¿Qué opción requiere más administración directa?" answer="EC2 + PostgreSQL." />
          <QaItem question="¿RDS elimina la necesidad de backups?" answer="No. RDS proporciona mecanismos de backup que debemos configurar y administrar correctamente." />
          <QaItem question="¿Haríamos RDS público solo para facilitar conexión?" answer="No como decisión predeterminada." />
        </section>

        <section className="lesson-section">
          <h3>34. Reto nivel 2 y de arquitectura</h3>
          <Dialogo>"Como RDS es administrado, AWS es responsable de nuestros datos incorrectos." — un gerente</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque el servicio administra infraestructura y operaciones de plataforma, no la calidad lógica de nuestra información. Esto es lo que haría en su lugar: definir validaciones, permisos, backups y procedimientos de operación. El riesgo es delegar responsabilidades que siguen perteneciendo a la aplicación y al negocio.</p>
          </Nota>
          <Reveal label="Ver solución de arquitectura: Usuario + EC2 App + S3 + RDS">
            <Flow steps={[{ icon: 'user', label: 'Usuario' }, { icon: 'server', label: 'App' }, { icon: 'package', label: 'S3 — imágenes' }, { icon: 'database', label: 'RDS — datos negocio' }]} />
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>35. Reto oral</h3>
          <Dialogo>Explícame Amazon RDS sin utilizar las palabras AWS, Amazon, RDS, base de datos, servidor, MySQL, PostgreSQL, Cloud, administrado ni servicio.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Es una plataforma que nos permite utilizar motores relacionales mientras el proveedor se encarga de gran parte de la infraestructura, mantenimiento y mecanismos operativos necesarios para mantenerlos funcionando."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>36. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Amazon RDS</td><td>Servicio administrado de bases relacionales</td></tr>
              <tr><td>Motor</td><td>Tecnología de base de datos</td></tr>
              <tr><td>DB Instance</td><td>Capacidad donde funciona el motor</td></tr>
              <tr><td>Storage</td><td>Espacio para los datos</td></tr>
              <tr><td>VPC</td><td>Entorno de red</td></tr>
              <tr><td>Security Group</td><td>Control de tráfico</td></tr>
              <tr><td>Backup</td><td>Protección y recuperación</td></tr>
              <tr><td>Multi-AZ</td><td>Alta disponibilidad</td></tr>
              <tr><td>Managed</td><td>AWS administra gran parte de la plataforma</td></tr>
              <tr><td>Cliente</td><td>Sigue administrando datos y decisiones</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>37. Ticket de salida</h3>
          <Dialogo>¿Cuál es la diferencia entre instalar MySQL en una instancia EC2 y utilizar Amazon RDS para MySQL?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Con EC2 administramos directamente mucha más infraestructura, sistema operativo y mantenimiento. Con RDS, AWS administra gran parte de esas tareas operativas, mientras nosotros seguimos siendo responsables de nuestros datos, configuración, usuarios, seguridad y uso de la base.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 3</div>
          <Flow steps={[{ icon: 'cloud', label: 'Amazon RDS' }, { icon: 'settings', label: 'Motor: MySQL' }, { n: '?', label: 'DB Instance' }, { n: '?', label: 'Storage' }]} />
          <Dialogo>"Ya decidimos utilizar RDS, pero ¿cuánta CPU, memoria y almacenamiento necesita nuestra base?"</Dialogo>
          <p>Porque podemos cometer dos errores: demasiado pequeña (mala experiencia) o absurdamente grande (costoso).</p>
          <ConceptBadge icon="settings">Módulo 6 · Clase 3 — Motores, DB Instances y almacenamiento: elegir el tamaño correcto sin pagar de más</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-6/clase-3" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 3: Motores, DB Instances y almacenamiento →
          </Link>
        </div>

      </div>
    </div>
  );
}
