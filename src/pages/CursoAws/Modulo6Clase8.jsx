import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué servicio administrado utiliza motores relacionales como MySQL y PostgreSQL?', options: [{ text: 'Amazon RDS', correct: true }, { text: 'S3', correct: false }, { text: 'IAM', correct: false }, { text: 'VPC', correct: false }] },
  { q: '¿RDS es un motor de base de datos?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Qué determina principalmente una DB Instance Class?', options: [{ text: 'Capacidad de cómputo y memoria.', correct: true }, { text: 'Nombre de tablas.', correct: false }, { text: 'Usuarios IAM.', correct: false }, { text: 'CIDR.', correct: false }] },
  { q: '¿Qué utilizamos para definir las subnets disponibles para RDS?', options: [{ text: 'DB Subnet Group.', correct: true }, { text: 'IAM Group.', correct: false }, { text: 'S3 Lifecycle.', correct: false }, { text: 'AMI.', correct: false }] },
  { q: 'Para una RDS interna, ¿deberíamos habilitar acceso público solo por comodidad?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Qué puerto utiliza normalmente MySQL?', options: [{ text: '3306', correct: true }, { text: '80', correct: false }, { text: '443', correct: false }, { text: '22', correct: false }] },
  { q: '¿Qué deberíamos utilizar para conectarnos a RDS?', options: [{ text: 'Endpoint DNS.', correct: true }, { text: 'IP interna fija para siempre.', correct: false }, { text: 'Bucket S3.', correct: false }, { text: 'AZ.', correct: false }] },
  { q: '¿Para qué sirven los backups?', options: [{ text: 'Recuperar información.', correct: true }, { text: 'Escalar lecturas.', correct: false }, { text: 'Crear usuarios.', correct: false }, { text: 'Abrir puertos.', correct: false }] },
  { q: '¿Qué es un snapshot?', options: [{ text: 'Copia en un punto determinado.', correct: true }, { text: 'Security Group.', correct: false }, { text: 'Motor.', correct: false }, { text: 'Región.', correct: false }] },
  { q: '¿Qué es PITR?', options: [{ text: 'Recuperar a un punto específico en el tiempo.', correct: true }, { text: 'Aumentar CPU.', correct: false }, { text: 'Crear VPC.', correct: false }, { text: 'Crear IAM User.', correct: false }] },
  { q: '¿Multi-AZ reemplaza backups?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Cuál es el objetivo principal de Multi-AZ?', options: [{ text: 'Alta disponibilidad.', correct: true }, { text: 'Guardar imágenes.', correct: false }, { text: 'Ejecutar JavaScript.', correct: false }, { text: 'Crear buckets.', correct: false }] },
  { q: '¿Aurora es relacional?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿DynamoDB es NoSQL?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Siempre debemos utilizar una sola tecnología para todos los datos?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
];

export default function Modulo6Clase8() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 6 · Clase 8</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 6 · Clase 8: Laboratorio integrador, diseña, protege y recupera la base de datos de CloudShop</h2>
      <p className="lesson-subtitle">
        Una base bien diseñada no solo almacena información: debe ser accesible por quien corresponde, recuperable cuando algo falla y dimensionada según la necesidad real.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">60 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Laboratorio + arquitectura + diagnóstico + recuperación + evaluación final</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 6 · Clases 1 a 7</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Analizar las necesidades de datos de una aplicación y elegir conceptualmente entre RDS, Aurora y DynamoDB.</li>
            <li>Seleccionar un motor relacional apropiado, una DB Instance acorde al escenario y almacenamiento básico.</li>
            <li>Ubicar RDS dentro de una VPC, utilizar un DB Subnet Group y mantenerla sin acceso público cuando no sea necesario.</li>
            <li>Configurar un Security Group para la base y comprender el uso del endpoint RDS.</li>
            <li>Configurar backups automáticos, crear un snapshot manual y comprender cómo restaurar una base.</li>
            <li>Evaluar Single-AZ vs Multi-AZ.</li>
            <li>Diagnosticar errores de conectividad, detectar configuraciones inseguras y eliminar recursos de laboratorio correctamente.</li>
          </ul>
          <p>La frase que debe sobrevivir será:</p>
          <Dialogo>Una base bien diseñada no solo almacena información: debe ser accesible por quien corresponde, recuperable cuando algo falla y dimensionada según la necesidad real.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. La misión</h3>
          <Nota><p>Presentamos: CloudShop vende productos por Internet. Necesita almacenar Clientes, Productos, Pedidos, Pagos. También tiene fotografías de productos y sesiones temporales de compra.</p></Nota>
          <QaItem question="¿Dónde guardamos cada cosa?" answer="Primero analizamos el problema, no comenzamos haciendo clic en Create database." />
        </section>

        <section className="lesson-section">
          <h3>3. Antes de entrar a AWS</h3>
          <InfoBox items={['¿Qué información tiene relaciones? ____________________________', '¿Qué información son archivos? ____________________________', '¿Qué información se consulta rápidamente por ID? ____________________________']} />
        </section>

        <section className="lesson-section">
          <h3>4. Clasificamos los datos</h3>
          <Flow steps={[
            { icon: 'user', label: 'Cliente' },
            { icon: 'globe', label: 'CloudShop' },
            { icon: 'package', label: 'S3 — imágenes' },
            { icon: 'database', label: 'RDS — negocio' },
            { icon: 'zap', label: 'DynamoDB — sesiones' },
          ]} />
          <p>RDS: Clientes, Productos, Pedidos, Pagos, porque existe información estructurada y relacionada. Fotografías: no necesitamos guardarlas dentro de RDS, podemos usar S3. Sesiones: para millones de sesiones consultadas por identificador podríamos evaluar DynamoDB — pero para nuestro laboratorio no necesitamos implementar esta parte, solo reconocer que no todos los datos requieren la misma tecnología.</p>
        </section>

        <section className="lesson-section">
          <h3>5. Elegimos motor y dimensionamos</h3>
          <p>CloudShop utiliza MySQL, entonces evaluamos Amazon RDS for MySQL — no porque "sea el mejor", sino porque la aplicación del ejercicio es compatible con MySQL.</p>
          <Nota><p>Ambiente de Desarrollo, 500 clientes, 100 productos, pocas conexiones simultáneas.</p></Nota>
          <QaItem question="¿Necesitamos una DB gigantesca?" answer="No. Utilizamos una clase pequeña compatible con el motor, Región y cuenta disponibles — no fijamos eternamente db.algo.micro porque las generaciones cambian." />
        </section>

        <section className="lesson-section">
          <h3>6. Almacenamiento</h3>
          <Nota><p>Para una carga general pequeña evaluamos General Purpose SSD. La documentación actual de RDS mantiene gp3 entre las opciones SSD de propósito general.</p></Nota>
          <p>Storage: gp3, tamaño pequeño para laboratorio. No utilizamos Provisioned IOPS sin necesidad: nuestra base tiene pocos usuarios, pocas operaciones — eso sería pagar por rendimiento que no utilizamos.</p>
        </section>

        <section className="lesson-section">
          <h3>7. Diseñamos la red</h3>
          <p>Recordamos el Módulo 5: <code>cloudshop-vpc</code> 10.0.0.0/16, con App Subnet, DB Subnet A (AZ A) y DB Subnet B (AZ B), utilizadas en un DB Subnet Group.</p>
          <p>RDS → Subnet groups → Create DB subnet group. Nombre: <code>cloudshop-db-subnets</code>, incluye db-subnet-a y db-subnet-b.</p>
        </section>

        <section className="lesson-section">
          <h3>8. ¿Nuestra base será pública?</h3>
          <Nota><p>No. Los clientes utilizan la Aplicación, no MySQL directamente. Configuramos Public access: No. AWS recomienda mantener la base privada cuando no existe necesidad de acceso directo desde Internet.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>9. Diseñamos Security Groups</h3>
          <p>Tenemos <code>sg-cloudshop-app</code> y creamos <code>sg-cloudshop-rds</code>.</p>
          <InfoBox title="Regla de RDS" items={['Type: MySQL/Aurora', 'Protocol: TCP', 'Port: 3306', 'Source: sg-cloudshop-app']} />
          <Nota><p>Lo que NO hacemos: 3306 desde 0.0.0.0/0. Tampoco agregamos SSH 22, HTTP 80, HTTPS 443 a SG-RDS sin necesidad — la base necesita el puerto de la base.</p></Nota>
          <Flow steps={[{ icon: 'user', label: 'Cliente' }, { icon: 'globe', label: 'Aplicación' }, { icon: 'database', label: 'RDS' }]} />
          <p>Aplicamos mínimo acceso: Cliente → Aplicación → RDS, nunca Cliente → RDS directamente. Esta arquitectura expresa quién necesita comunicarse con quién.</p>
        </section>

        <section className="lesson-section">
          <h3>10. Create Database y credenciales</h3>
          <InfoBox items={['Engine: MySQL', 'Environment: Development/Laboratory', 'DB Instance: pequeña', 'Storage: gp3', 'VPC: cloudshop-vpc', 'DB Subnet Group: cloudshop-db-subnets', 'Public access: No', 'Security Group: sg-cloudshop-rds']} />
          <Nota><p>Definimos Master username apropiado y una contraseña segura — no utilizamos admin/123456. No ponemos credenciales en GitHub: <code>DB_PASSWORD=MiClave123</code> dentro de un repositorio público es un error. Las credenciales son secretos, aunque hoy no implementemos Secrets Manager, el principio debe quedar instalado.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>11. Esperamos Available y encontramos el endpoint</h3>
          <p>Una RDS pasa por estados como Creating hasta llegar a Available — no intentamos conectarnos antes. Una vez disponible buscamos Endpoint y Port 3306.</p>
          <Nota><p>No utilizamos la IP como referencia permanente. Usamos Endpoint DNS porque la infraestructura subyacente puede cambiar: <code>DB_HOST = cloudshop.xxxxxx.rds.amazonaws.com</code>, no <code>10.0.20.27 para siempre</code>.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>12. Probamos conectividad</h3>
          <Flow steps={[{ icon: 'server', label: 'EC2 App' }, { icon: 'globe', label: 'VPC' }, { icon: 'shield', label: 'SG-RDS — 3306 permitido' }, { icon: 'database', label: 'RDS' }]} />
          <p>Si se conecta, excelente. Pero queremos comprender por qué funciona:</p>
          <Flow steps={[{ label: 'Aplicación' }, { label: 'VPC' }, { label: 'direccionamiento privado' }, { label: 'SG-RDS' }, { label: 'TCP 3306' }, { label: 'RDS Endpoint' }, { label: 'MySQL' }, { label: 'credenciales' }]} />
          <p>No aceptamos simplemente "porque puse Connect".</p>
        </section>

        <section className="lesson-section">
          <h3>13. Creamos nuestra base lógica</h3>
          <pre className="codeblock">CREATE DATABASE cloudshop;</pre>
          <p>Dentro: CLIENTES, PRODUCTOS, PEDIDOS. No necesitamos construir un sistema SQL completo — el foco sigue siendo infraestructura RDS.</p>
        </section>

        <section className="lesson-section">
          <h3>14. Configuramos backups automáticos</h3>
          <Nota><p>Backup retention period: para DB Instances RDS, la documentación actual permite configurar la retención automática entre 0 y 35 días, donde 0 desactiva los backups automáticos. Cuando se crea desde la consola, el valor predeterminado actual es siete días.</p></Nota>
          <QaItem question="¿Qué significa Retention: 7 días?" answer="Tenemos una ventana de recuperación automática de hasta ese período según la configuración. No significa siete snapshots manuales exactamente." />
        </section>

        <section className="lesson-section">
          <h3>15. Snapshot manual e incidente simulado</h3>
          <p>Antes de realizar un cambio importante: RDS → Actions → Take snapshot. Nombre: <code>cloudshop-before-test</code> — porque estamos a punto de realizar una modificación y queremos un punto específico claramente identificado al cual volver.</p>
          <Nota><p>El docente plantea <code>DELETE FROM pedidos;</code> No necesitamos ejecutarlo realmente si el entorno no está preparado — lo importante es imaginar que la información desapareció.</p></Nota>
          <QaItem question="¿Multi-AZ resolvería un DELETE accidental?" answer="No. Necesitamos backup o snapshot según el escenario." />
        </section>

        <section className="lesson-section">
          <h3>16. Point-in-Time Recovery y restauración</h3>
          <Nota><p>Si los automated backups están configurados y el punto está dentro de la ventana disponible, podemos evaluar restaurar a un momento anterior. Ejemplo: 15:12 error → elegimos 15:11.</p></Nota>
          <p>Restaurar crea otra base: <code>cloudshop-original</code> continúa existiendo, la restauración genera <code>cloudshop-restored</code>. No es CTRL+Z sobre la misma infraestructura. Una base restaurada tendrá su propia configuración de conexión — necesitamos validar y posiblemente cambiar DB_HOST de nuestra aplicación.</p>
        </section>

        <section className="lesson-section">
          <h3>17. Flujo correcto de recuperación</h3>
          <Flow steps={[
            { icon: 'alert-triangle', label: 'Incidente' },
            { icon: 'shield', label: 'Contener' },
            { icon: 'clock', label: 'Identificar punto correcto' },
            { icon: 'refresh', label: 'Restaurar' },
            { icon: 'search', label: 'Validar datos' },
            { icon: 'flask', label: 'Probar aplicación' },
            { icon: 'link', label: 'Cambiar conexión' },
            { icon: 'check-circle', label: 'Recuperar servicio' },
          ]} />
          <Dialogo>"Está mala. Borrémosla y restauramos." — Pedro</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque podemos destruir información útil para análisis o recuperación antes de comprobar que la nueva instancia está correcta. Esto es lo que haría en su lugar: conservar la original, restaurar en paralelo y validar. El riesgo de su enfoque es convertir un incidente recuperable en pérdida adicional.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>18. Evaluamos Multi-AZ</h3>
          <QaItem question='"¿Qué ocurre si falla la Availability Zone?" (no datos eliminados, sino infraestructura)' answer="Podemos evaluar Multi-AZ." />
          <p>Laboratorio: Single-AZ puede ser suficiente y económico. Producción crítica: Multi-AZ puede ser apropiado según RTO, impacto de una caída, presupuesto y criticidad. No habilitamos Multi-AZ "porque sí" — más disponibilidad generalmente implica más infraestructura y mayor costo. La pregunta: ¿qué cuesta más, la redundancia o una interrupción?</p>
        </section>

        <section className="lesson-section">
          <h3>19. RPO y RTO de CloudShop</h3>
          <RoleGrid roles={[
            { icon: 'bar-chart', label: 'RPO: 30 minutos', desc: '¿Cuánto dato puedo perder?' },
            { icon: 'clock', label: 'RTO: 1 hora', desc: '¿Cuánto tiempo puedo estar fuera?' },
          ]} />
          <p>Estos objetivos deberían orientar backup + disponibilidad.</p>
        </section>

        <section className="lesson-section">
          <h3>20. Arquitectura final</h3>
          <Flow steps={[
            { icon: 'user', label: 'Clientes' },
            { icon: 'globe', label: 'Aplicación' },
            { icon: 'shield', label: 'SG-App' },
            { icon: 'package', label: 'S3 — imágenes' },
            { icon: 'globe', label: 'VPC → DB Subnet Group (AZ A + AZ B)' },
            { icon: 'shield', label: 'SG-RDS — TCP 3306' },
            { icon: 'database', label: 'RDS MySQL — Backup + Snapshot + Multi-AZ' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>21. Actividad: elige la tecnología / identifica la capa</h3>
          <QaItem question="Fotografías de productos" answer="S3." />
          <QaItem question="Clientes y pedidos relacionados" answer="RDS/Aurora." />
          <QaItem question="Sesiones por SessionID a enorme escala" answer="DynamoDB puede evaluarse." />
          <QaItem question="SG-RDS no permite 3306 / Password incorrecta / Usuario borró pedidos / AZ principal falla" answer="Red / Autenticación / Recuperación / Disponibilidad." />
        </section>

        <section className="lesson-section">
          <h3>22. Actividad: ¿qué herramienta?</h3>
          <QaItem question="Necesito volver a ayer / necesito una copia antes de una actualización" answer="Backup/PITR / Snapshot." />
          <QaItem question="Necesito tolerar mejor una falla de AZ / tengo demasiadas consultas de lectura en Aurora / quiero acceso rápido por claves a escala" answer="Multi-AZ / Reader / DynamoDB." />
        </section>

        <section className="lesson-section">
          <h3>23. Diez diagnósticos</h3>
          <QaItem question="RDS Available ✅, Public access No ✅, App misma VPC ✅, pero SG-RDS sin 3306 desde SG-App." answer="Problema: Security Group." />
          <QaItem question="Engine PostgreSQL, App intenta 3306." answer="PostgreSQL normalmente utiliza 5432." />
          <QaItem question="Endpoint ✅, Puerto ✅, SG ✅, Red ✅, pero Password ❌." answer="La red funciona, pero falla autenticación." />
          <QaItem question="Notebook personal por Internet no conecta a RDS privada. ¿Está rota la base?" answer="No. Está funcionando como fue diseñada." />
          <QaItem question="Restored DB ✅, pero aplicación con DB_HOST = endpoint-original." answer="Sigue utilizando la base original." />
          <QaItem question="Multi-AZ ✅, DELETE clientes. ¿Esperamos que standby tenga los clientes antiguos?" answer="No. Necesitamos backup/PITR." />
          <QaItem question="Backup retention: 0." answer="No contamos con esa estrategia de recuperación automática." />
          <QaItem question="Public access Yes, SG 3306 desde 0.0.0.0/0, para una base que solo utiliza EC2 interna." answer="No estoy de acuerdo porque la configuración expone un servicio que no necesita comunicación directa desde Internet. Esto es lo que haría en su lugar: volverla privada y permitir 3306 solo desde SG-App. El riesgo es ampliar innecesariamente la superficie de ataque." />
          <QaItem question="50 clientes, base 1 GB, carga mínima, pero DB Instance gigantesca." answer="Probablemente funciona estupendo, pero debemos investigar sobredimensionamiento." />
          <QaItem question="Storage 20 GB, usado 19.8 GB." answer="Revisamos crecimiento, capacidad, Storage Autoscaling, logs, datos innecesarios, estrategia de almacenamiento." />
        </section>

        <section className="lesson-section">
          <h3>24. Árbol de diagnóstico general</h3>
          <Flow steps={[
            { label: '¿RDS está Available?' },
            { label: '¿Endpoint correcto?' },
            { label: '¿Puerto correcto?' },
            { label: '¿Existe conectividad de red?' },
            { label: '¿SG permite?' },
            { label: '¿Credenciales son correctas?' },
            { label: '¿Usuario tiene permisos?' },
            { label: '¿La base tiene capacidad?' },
            { label: '¿Aplicación funciona?' },
          ]} />
          <p>No resolvemos "no conecta" con "abrir todo".</p>
        </section>

        <section className="lesson-section">
          <h3>25. RETO FINAL DEL MÓDULO 6</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge icon="trophy">HealthCloud</ConceptBadge>
          <p>Pacientes, Profesionales, Citas, Atenciones. La aplicación es accesible por usuarios; la base no debe estar expuesta directamente a Internet; utiliza PostgreSQL; solo la aplicación debe conectarse; no pueden perder más de una hora de información; una caída prolongada afectaría seriamente el servicio; antes de actualizaciones importantes quieren una copia específica; la base crecerá con el tiempo.</p>
          <Reveal label="Ver las diez decisiones">
            <ol className="plain-list">
              <li>Motor: PostgreSQL, porque la aplicación lo requiere.</li>
              <li>Capacidad: dimensionar según carga esperada, comenzar con una opción razonable y monitorear — ni la más grande ni la más pequeña por reflejo.</li>
              <li>Almacenamiento: General Purpose SSD gp3 con margen de crecimiento.</li>
              <li>Red: VPC con DB Subnet A y DB Subnet B en zonas apropiadas.</li>
              <li>Acceso público: No, porque solo la aplicación necesita conectarse.</li>
              <li>SG-RDS: PostgreSQL TCP 5432, Source: SG-App.</li>
              <li>Backup: el negocio dice "no puedo perder más de una hora" — diseñar la estrategia y validar que satisfaga realmente ese RPO, no basta marcar Backup = Enabled.</li>
              <li>Antes de actualización: Manual Snapshot, por ejemplo healthcloud-before-upgrade.</li>
              <li>Alta disponibilidad: dado que una interrupción prolongada afecta seriamente el servicio, Multi-AZ merece una evaluación fuerte (según RTO + costo + criticidad).</li>
              <li>Crecimiento: evaluar Storage Autoscaling con un máximo controlado, con monitoreo y política de costos.</li>
            </ol>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>26. Reto nivel 2: encuentra 14 errores</h3>
          <Nota><p>Engine MySQL pero Aplicación PostgreSQL; Public access Yes; SG-RDS Allow all ports desde 0.0.0.0/0; DB subnets solo una AZ; Backup retention 0; sin snapshots; DB_HOST con IP fija; Password guardada en GitHub; DB Instance enorme; Storage casi lleno; Multi-AZ No; RTO 15 minutos.</p></Nota>
          <Reveal label="Ver posibles errores">
            <ul className="plain-list">
              <li>Motor no coincide con la aplicación.</li>
              <li>Public access innecesario.</li>
              <li>SG demasiado abierto, con puertos innecesarios y origen demasiado amplio.</li>
              <li>Diseño de subnets insuficiente para escenarios resilientes.</li>
              <li>Backups automáticos desactivados, sin estrategia de snapshots.</li>
              <li>Dependencia de IP fija.</li>
              <li>Credenciales expuestas.</li>
              <li>Posible sobredimensionamiento y almacenamiento cerca de llenarse.</li>
              <li>RTO probablemente incompatible con la falta de HA.</li>
              <li>No existe estrategia de recuperación claramente definida.</li>
            </ul>
            <p>Hay más errores que los prometidos — pequeño bonus de caos.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>27. Limpieza del laboratorio</h3>
          <Nota><p>Antes de eliminar: ¿datos importantes? No. ¿Snapshot necesario? No. ¿Recursos de pago? Sí. Entonces limpiamos. Pero en producción no copiamos automáticamente esa decisión.</p></Nota>
          <p>RDS → Delete: revisamos Final snapshot — si no necesitamos conservar nada, podemos omitirlo deliberadamente, no por accidente. Aunque eliminemos la base, los snapshots manuales pueden continuar existiendo; si son innecesarios, los eliminamos. Eliminar una base no significa eliminar todos los costos relacionados: revisamos snapshots, Security Groups y DB Subnet Group.</p>
        </section>

        <section className="lesson-section">
          <h3>28. Checklist de limpieza</h3>
          <InfoBox items={['RDS eliminada', 'Final snapshot decidido conscientemente', 'Snapshots manuales revisados', 'Security Groups revisados', 'DB Subnet Group revisado', 'Credenciales de laboratorio retiradas', 'Recursos auxiliares revisados', 'Costos revisados']} />
        </section>

        <section className="lesson-section">
          <h3>29. Evaluación final del Módulo 6</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>30. Rúbrica del módulo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Nivel</th><th>Resultado</th></tr></thead>
            <tbody>
              <tr><td>Logrado</td><td>Diseña, protege, dimensiona y recupera una RDS básica</td></tr>
              <tr><td>En proceso</td><td>Reconoce los componentes, pero necesita apoyo para relacionarlos</td></tr>
              <tr><td>Inicial</td><td>Recuerda nombres, pero no sabe decidir cuándo ni por qué utilizarlos</td></tr>
            </tbody>
          </table>
          <Nota><p>Para "Logrado", el estudiante debe explicar: por qué utilizaría una base de datos, qué es RDS, qué motor elegiría, qué significa DB Instance, por qué aplicaría right sizing, por qué RDS debería ser privada, qué hace SG-RDS, qué es el endpoint, qué hace un backup, qué diferencia snapshot y PITR, qué hace Multi-AZ, por qué Multi-AZ no reemplaza backup, y qué diferencia Aurora y DynamoDB.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>31. Reto oral final</h3>
          <Dialogo>Diseña una solución para una tienda online sin utilizar las palabras RDS, MySQL, VPC, subnet, Security Group, backup, snapshot, Multi-AZ, Aurora, DynamoDB, AWS ni base de datos.</Dialogo>
          <Reveal label="Ver una buena respuesta">
            <Dialogo>"Separaría los archivos de la información estructurada del negocio. Mantendría esta última en un sistema administrado accesible solo desde la aplicación, con capacidad proporcional al uso, copias que permitan volver a estados anteriores y redundancia adicional cuando el impacto de una interrupción lo justifique."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>32. Mapa final del Módulo 6</h3>
          <Flow steps={[
            { icon: 'database', label: 'Datos' },
            { icon: 'clipboard-list', label: 'Relacional — RDS / Aurora (Writer + Reader)' },
            { icon: 'zap', label: 'NoSQL — DynamoDB' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>33. Las ideas que deben sobrevivir</h3>
          <ul className="plain-list">
            <li>Una base organiza y relaciona información.</li>
            <li>RDS administra gran parte de la plataforma, pero RDS no es un motor.</li>
            <li>Motor, cómputo y almacenamiento son decisiones diferentes.</li>
            <li>Right sizing evita pagar capacidad innecesaria.</li>
            <li>Una base no necesita ser pública para que una aplicación la utilice; solo permitimos el puerto y origen necesarios.</li>
            <li>La aplicación utiliza el endpoint RDS.</li>
            <li>Backup sirve para recuperación; snapshot representa un punto concreto; PITR permite volver a un momento anterior dentro de la ventana disponible.</li>
            <li>Multi-AZ sirve para disponibilidad, pero no reemplaza backups.</li>
            <li>Aurora sigue siendo relacional; DynamoDB utiliza un modelo NoSQL.</li>
            <li>Podemos utilizar diferentes tecnologías para distintos tipos de datos.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>34. Ticket de salida del módulo</h3>
          <Dialogo>Una tienda tiene imágenes de productos, clientes y pedidos relacionados, y millones de sesiones temporales consultadas por ID. ¿Guardarías todo de la misma manera?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>No necesariamente. Podríamos utilizar S3 para imágenes, una solución relacional como RDS o Aurora para clientes y pedidos, y evaluar DynamoDB para las sesiones si ese patrón de acceso lo justifica.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="cloud" /> Módulo 6 completado</div>
          <Nota><p>El estudiante comenzó pensando "una base de datos es donde guardo cosas", y debería terminar pensando en un recorrido completo:</p></Nota>
          <Flow steps={[
            { label: '¿Qué información tengo?' },
            { label: '¿Cómo se relaciona?' },
            { label: '¿Qué tecnología corresponde?' },
            { label: '¿Cuánta capacidad necesito?' },
            { label: '¿Quién debe acceder?' },
            { label: '¿Cómo la protejo?' },
            { label: '¿Cómo recupero información?' },
            { label: '¿Cuánta interrupción tolero?' },
            { label: '¿Cuánto estoy dispuesto a pagar?' },
          ]} />
          <p>Eso ya es pensamiento de arquitectura de datos.</p>
          <span className="tag tag-outline">Próximo módulo · próximamente</span>
        </div>

      </div>
    </div>
  );
}
