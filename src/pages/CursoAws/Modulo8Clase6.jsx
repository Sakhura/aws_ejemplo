import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué es CloudWatch Agent?', options: [{ text: 'Software que recopila telemetría desde servidores.', correct: true }, { text: 'Base de datos.', correct: false }, { text: 'Load Balancer.', correct: false }, { text: 'VPC.', correct: false }] },
  { q: '¿Qué métrica suele requerir Agent en EC2?', options: [{ text: 'Uso de memoria RAM.', correct: true }, { text: 'CPUUtilization estándar.', correct: false }, { text: 'RequestCount del ALB.', correct: false }, { text: 'HealthyHostCount.', correct: false }] },
  { q: '¿Qué otra información puede recopilar el Agent?', options: [{ text: 'Logs.', correct: true }, { text: 'Subnets.', correct: false }, { text: 'Usuarios IAM.', correct: false }, { text: 'Target Groups.', correct: false }] },
  { q: '¿Para qué sirve el IAM Role?', options: [{ text: 'Dar permisos a la EC2/Agent.', correct: true }, { text: 'Medir RAM.', correct: false }, { text: 'Crear gráficos.', correct: false }, { text: 'Guardar logs.', correct: false }] },
  { q: '¿Qué política administrada se utiliza comúnmente para los permisos del Agent?', options: [{ text: 'CloudWatchAgentServerPolicy.', correct: true }, { text: 'AmazonS3ReadOnlyAccess.', correct: false }, { text: 'AdministratorAccess necesariamente.', correct: false }, { text: 'AWSBillingReadOnlyAccess.', correct: false }] },
  { q: '¿Qué puede indicar disk_used_percent?', options: [{ text: 'Porcentaje del disco utilizado.', correct: true }, { text: 'CPU.', correct: false }, { text: 'Usuarios conectados.', correct: false }, { text: 'Requests del ALB.', correct: false }] },
  { q: '¿El Agent necesita saber qué recopilar?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Instalar Agent significa que todas las métricas posibles deben recopilarse?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: 'Si Agent funciona pero no puede enviar datos por permisos, ¿qué componente revisaríamos?', options: [{ text: 'IAM.', correct: true }, { text: 'ALB.', correct: false }, { text: 'RDS.', correct: false }, { text: 'Route Table exclusivamente.', correct: false }] },
  { q: '¿CloudWatch Agent arregla automáticamente una aplicación con poca memoria?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
];

export default function Modulo8Clase6() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 8 · Clase 6</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 8 · Clase 6: CloudWatch Agent, cómo enviar memoria, disco y logs internos desde una EC2 hacia CloudWatch</h2>
      <p className="lesson-subtitle">
        CloudWatch Agent es un recolector instalado dentro del servidor que obtiene información que CloudWatch no puede conocer automáticamente desde fuera.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + arquitectura + configuración guiada + interpretación + diagnóstico + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 8 · Clases 1 a 5</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es CloudWatch Agent y comprender por qué algunas métricas no aparecen automáticamente.</li>
            <li>Diferenciar monitoreo externo e interno, y reconocer métricas como CPU, memoria y uso de disco.</li>
            <li>Comprender que el agente puede recopilar logs y explicar conceptualmente cómo funciona.</li>
            <li>Comprender que la EC2 necesita permisos IAM, relacionar el agente con un IAM Role y reconocer CloudWatchAgentServerPolicy.</li>
            <li>Comprender qué es el archivo de configuración del agente y elegir qué métricas o logs queremos recopilar.</li>
            <li>Comprender qué es el intervalo de recolección y reconocer que más métricas pueden implicar más costo.</li>
            <li>Diagnosticar por qué una métrica del agente no aparece e integrar Agent + Metrics + Logs + Alarm.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-3. Recordemos nuestra EC2: ¿dónde está la RAM?</h3>
          <p>CloudWatch ya puede mostrarnos CPUUtilization, NetworkIn, NetworkOut. Un estudiante pregunta "¿dónde veo cuánta RAM está utilizando?" Buscamos MemoryUtilization y no aparece entre las métricas estándar básicas de EC2.</p>
          <p>¿Por qué? Existe una diferencia entre la información que AWS ve desde fuera y la información que conoce el sistema operativo dentro. AWS sabe muchísimo sobre la infraestructura que ejecuta la instancia, pero la utilización interna de memoria pertenece al sistema operativo invitado.</p>
          <Dialogo>El administrador del hotel puede saber cuánto consume una habitación, si está ocupada, si tiene conexión. Pero no necesariamente sabe cuántos calcetines hay en la maleta ni cuántas tazas hay sobre la mesa. Para conocer lo que ocurre dentro de la habitación, necesitamos alguien dentro. Ese será nuestro Agent.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>5-8. ¿Qué es CloudWatch Agent?</h3>
          <p>CloudWatch Agent es un componente de software que puede instalarse en servidores para recopilar métricas internas, logs y trazas. En EC2 permite complementar las métricas que AWS proporciona de forma predeterminada.</p>
          <ConceptBadge icon="settings">Es un pequeño observador que vive dentro del servidor y envía información hacia CloudWatch</ConceptBadge>
          <Flow steps={[{ icon: 'server', label: 'EC2' }, { icon: 'settings', label: 'CloudWatch Agent' }, { label: 'Memoria / Disco / Logs' }, { icon: 'cloud', label: 'CloudWatch' }]} />
          <p>Sin Agent: EC2 → AWS, obtenemos CPUUtilization, NetworkIn, NetworkOut, pero no <code>mem_used_percent</code> desde el sistema operativo. Con Agent: EC2 → Agent → mem, disk, logs → CloudWatch. La visibilidad aumenta.</p>
        </section>

        <section className="lesson-section">
          <h3>9-11. CPU vs RAM: por qué nos interesa la memoria</h3>
          <p>CPU estándar de EC2 (CPUUtilization) AWS puede proporcionarla como métrica estándar. Memoria RAM interna (<code>mem_used_percent</code>) normalmente requiere el CloudWatch Agent para recopilarse desde el sistema operativo.</p>
          <Nota><p>Podemos tener CPU 25% pero RAM 97% — la aplicación podría empezar a funcionar lentamente, quedarse sin memoria, utilizar swap, o terminar procesos. Si mirábamos solamente CPU, la máquina parecía relajadísima.</p></Nota>
          <RoleGrid roles={[
            { icon: 'zap', label: 'Pulso normal', desc: 'No implica temperatura normal' },
            { icon: 'bar-chart', label: 'CPU normal', desc: 'No implica RAM normal' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>12-14. Uso de disco: no confundamos con EBS</h3>
          <p>CloudWatch Agent también puede recopilar métricas de disco como <code>disk_used</code>, <code>disk_free</code>, <code>disk_used_percent</code>, dependiendo del sistema operativo y configuración — cuánto espacio del disco está realmente ocupado desde dentro del servidor.</p>
          <Nota><p>Dos perspectivas: EBS, donde AWS puede observar comportamiento del volumen como infraestructura; y dentro del sistema operativo, donde podemos preguntar qué porcentaje del sistema de archivos está ocupado (por ejemplo, /dev/xvda1 al 95%). Eso requiere visibilidad desde dentro.</p></Nota>
          <Dialogo>Sabemos que la maleta tiene capacidad para 20 kg, pero queremos saber cuánto está ocupado ahora: 19 kg. El disco existe, pero el Agent nos ayuda a observar su utilización interna.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>15-17. El Agent también puede recoger Logs</h3>
          <p>El agente unificado de CloudWatch puede recopilar logs desde instancias EC2 y enviarlos a CloudWatch Logs. AWS actualmente recomienda este agente unificado para recopilar tanto logs como métricas avanzadas.</p>
          <Flow steps={[{ label: '/var/log/httpd/error_log' }, { icon: 'settings', label: 'Agent' }, { icon: 'file-text', label: 'CloudWatch Logs' }]} />
          <p>Así conectamos con la Clase 5: antes asumíamos que existía <code>/cloudshop/web</code> en CloudWatch Logs — ahora entendemos que alguien tiene que llevar esos registros desde la EC2 hacia CloudWatch. Uno de los mecanismos es CloudWatch Agent.</p>
          <Dialogo>La EC2 tiene una libreta: /var/log/app.log. El Agent lee esa libreta y entrega los registros a CloudWatch Logs. No necesitamos entrar manualmente cada diez minutos a buscar archivos.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>18-22. Pero aparece IAM</h3>
          <p>El Agent quiere enviar información hacia servicios de AWS. Entonces AWS pregunta: ¿tienes permiso? Y volvemos a IAM.</p>
          <Dialogo>Tenemos un empleado (Agent) que intenta entrar a CloudWatch, pero seguridad le pregunta "¿tu credencial permite hacer esto?" Necesita permisos — no dejamos la puerta abierta a cualquiera.</Dialogo>
          <p>En una EC2 utilizamos normalmente un <strong>IAM Role</strong> asociado a la instancia: EC2 → IAM Role → permisos. Así el Agent puede autenticarse utilizando el rol de la instancia.</p>
          <Nota><p>Evitamos pegar Access Keys y Secret Keys guardadas dentro de user-data, scripts o archivos si podemos utilizar IAM Role, porque reduce el manejo manual de credenciales permanentes.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>22-24. CloudWatchAgentServerPolicy</h3>
          <p>AWS mantiene una política administrada llamada <strong>CloudWatchAgentServerPolicy</strong>, descrita como los permisos necesarios para usar Amazon CloudWatch Agent en servidores.</p>
          <ConceptBadge icon="key">Es un conjunto predefinido de permisos que permite al Agent hacer su trabajo</ConceptBadge>
          <Flow steps={[{ icon: 'server', label: 'EC2' }, { icon: 'key', label: 'IAM Role — CloudWatchAgentServerPolicy' }, { icon: 'settings', label: 'CloudWatch Agent' }, { icon: 'bar-chart', label: 'Metrics' }, { icon: 'file-text', label: 'Logs' }]} />
          <RoleGrid roles={[
            { icon: 'key', label: 'IAM', desc: 'Autoriza' },
            { icon: 'settings', label: 'Agent', desc: 'Recopila y envía' },
            { icon: 'cloud', label: 'CloudWatch', desc: 'Recibe y permite observar' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>25-28. El Agent necesita configuración</h3>
          <p>Instalar el programa no basta. El Agent necesita saber qué queremos que recopile: memoria, disco, Apache logs. Eso se define mediante el <strong>archivo de configuración del Agent</strong>, donde podemos definir métricas a recopilar, logs a leer, intervalos, destinos y dimensiones adicionales.</p>
          <Dialogo>Decimos al Agent: trae memoria, disco, log Apache — no traigas todo lo demás. El agente no necesita recopilar absolutamente todo porque sí; definimos lo que realmente necesitamos.</Dialogo>
          <Nota><p>Podemos pedir 100 métricas, 50 archivos log, cada pocos segundos, pero eso puede generar más datos, aumentar costos, añadir ruido y dificultar el análisis. El objetivo es visibilidad útil, no coleccionar telemetría como estampillas.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>29-32. Métricas de memoria y disco: la tendencia importa</h3>
          <p>Algunos nombres que podemos encontrar con el agente: <code>mem_used_percent</code>, <code>mem_available</code>, dependiendo de la plataforma. Con 10:00 → 45%, 10:05 → 60%, 10:10 → 75%, 10:15 → 94%, podemos observar presión creciente de memoria, y después crear una Alarm si corresponde.</p>
          <p>Con disco: <code>disk_used_percent</code> — 10:00 → 65%, 12:00 → 70%, 14:00 → 82%, 16:00 → 94% muestra una tendencia peligrosa, mucho más útil que descubrir "no queda espacio" cuando ya es demasiado tarde.</p>
          <Flow steps={[{ icon: 'settings', label: 'Agent' }, { label: 'disk_used_percent' }, { icon: 'cloud', label: 'CloudWatch' }, { icon: 'alert-triangle', label: 'Alarm' }]} />
          <p>Por ejemplo, <code>disk_used_percent &gt; 85%</code> durante un período determinado — así podemos actuar antes de llenar completamente el disco.</p>
        </section>

        <section className="lesson-section">
          <h3>33-35. Agent + Logs, y ambas cosas a la vez</h3>
          <Flow steps={[{ label: '/var/log/httpd/error_log' }, { icon: 'settings', label: 'Agent' }, { icon: 'file-text', label: 'CloudWatch Logs' }]} />
          <p>Ahora el equipo puede investigar errores desde CloudWatch. El Agent puede hacer ambas cosas: Metrics y Logs — no necesitamos pensar "un Agent para métricas y otro necesariamente para logs". El agente unificado está diseñado para recopilar ambos tipos de telemetría.</p>
        </section>

        <section className="lesson-section">
          <h3>35. Flujo completo</h3>
          <Flow steps={[
            { icon: 'server', label: 'EC2' }, { label: 'Memory + Disk + App Logs' }, { icon: 'settings', label: 'Agent' },
            { icon: 'key', label: 'IAM Role' }, { icon: 'bar-chart', label: 'CloudWatch' }, { icon: 'file-text', label: 'CloudWatch Logs' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>36-39. Collection Interval</h3>
          <p>El Agent también necesita saber cada cuánto recopilamos una métrica: 60 segundos o 300 segundos. AWS permite configurar el intervalo de recolección; valores inferiores a 60 segundos se tratan como métricas de alta resolución.</p>
          <Dialogo>Una cámara toma 1 foto por hora versus 1 foto cada 10 segundos. La segunda permite reconstruir mucho más movimiento, pero también produce muchas más fotos. Con métricas ocurre algo parecido.</Dialogo>
          <p>No necesitamos cada segundo para saber si el disco se está llenando durante semanas — quizá sí necesitamos mucha más resolución en otras señales muy dinámicas. La frecuencia debe corresponder al problema.</p>
        </section>

        <section className="lesson-section">
          <h3>40-46. Laboratorio conceptual: IAM, instalación y configuración</h3>
          <p>Ruta conceptual: IAM → Roles → Create Role, Trusted Entity: EC2. Asociamos <code>CloudWatchAgentServerPolicy</code>. Nombre: <code>cloudshop-cloudwatch-role</code>. Asociamos el Role a nuestra EC2 <code>cloudshop-web-01</code>.</p>
          <p>Instalamos el paquete <code>amazon-cloudwatch-agent</code> — el proceso exacto depende del sistema operativo. AWS soporta el Agent en distintos sistemas, incluidos Linux y Windows Server.</p>
          <InfoBox title="Configuración conceptual" items={['Metrics: Memory ✅, Disk ✅', 'Logs: Apache errors ✅', 'Collection interval: 60 seconds']} />
        </section>

        <section className="lesson-section">
          <h3>45-48. Iniciamos el Agent y verificamos</h3>
          <Flow steps={[{ label: 'Configuration' }, { label: 'Agent starts' }, { label: 'Collect' }, { label: 'Send' }]} />
          <p>Queremos verificar Agent: Running. Pero igual que en EC2, proceso iniciado no garantiza configuración correcta. Buscamos <code>mem_used_percent</code> y <code>disk_used_percent</code> según la configuración aplicada, y el Log Group correspondiente (por ejemplo, <code>/cloudshop/apache/error</code>).</p>
          <Nota><p>Antes: EC2 CPU = 20% y nada más. Ahora: CPU = 20%, RAM = 94%, Disk = 70%, Apache errors = 300. Nuestra visión cambió completamente.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>49-51. Tres casos detective</h3>
          <QaItem question="Usuario dice 'CloudShop está muy lenta'. CPU 22%, RequestCount normal, RDS CPU 25%, Memory 97%. ¿Qué investigamos primero?" answer="Memoria. La CPU por sí sola no mostraba el problema." />
          <QaItem question="CPU 15%, Memory 35%, Disk used 99%. La aplicación empieza a fallar al escribir archivos. ¿Primera línea de investigación?" answer="Almacenamiento interno del servidor." />
          <QaItem question="CPU 25%, Memory 40%, Disk 50%, pero logs repiten 'ERROR payment timeout'. ¿Qué investigamos?" answer="La integración de pagos — el problema no parece ser falta de recursos básicos del servidor." />
        </section>

        <section className="lesson-section">
          <h3>52-57. Errores comunes de configuración</h3>
          <QaItem question="Agent instalado ✅, pero CloudWatch sin mem_used_percent ❌. ¿Qué revisamos?" answer="¿Agent está running? ¿La configuración incluye memoria? ¿IAM Role correcto? ¿Política adecuada? ¿Región correcta? ¿Configuración cargada? No concluimos 'CloudWatch no funciona'." />
          <QaItem question="Agent ✅, Config ✅, IAM Role ❌. ¿Qué ocurre?" answer="El Agent puede recopilar localmente, pero no tener permiso para enviar correctamente los datos — problema de IAM." />
          <QaItem question="Configuramos /var/log/httpd/error_log pero la distribución guarda Apache en /var/log/apache2/error.log. ¿Resultado?" answer="El Agent está mirando el lugar equivocado. No hay registros." />
          <Dialogo>Le pedimos al mensajero "trae las cartas del buzón A", pero las cartas están en el buzón B. El Agent está obedeciendo perfectamente; la configuración está equivocada.</Dialogo>
          <QaItem question="Queremos monitorear / pero configuramos un punto de montaje que no corresponde. ¿Qué pasa?" answer="La métrica puede no representar lo que creemos — siempre preguntamos qué recurso exacto estamos midiendo." />
          <p>Nuevamente aparecen Dimensions: una métrica de disco puede distinguir mount point, device, instance — no basta decir "Disk = 80%", preguntamos "¿qué disco o filesystem?" La Clase 1 vuelve: Metric + Dimension.</p>
        </section>

        <section className="lesson-section">
          <h3>58-61. Costo y observabilidad con propósito</h3>
          <p>Las métricas recopiladas por el agente se añaden a las métricas estándar de EC2: EC2 standard metrics + Agent metrics nos entregan una visión más completa. Pero las métricas recopiladas por CloudWatch Agent se tratan como métricas personalizadas en muchos escenarios, por lo que debemos considerar costos asociados a la cantidad y resolución — no recopilamos absolutamente todo "por si acaso".</p>
          <ConceptBadge icon="search">Antes de activar una métrica preguntamos: ¿qué decisión tomaría si este valor cambia?</ConceptBadge>
          <Nota><p>Si recopilamos 47 métricas que nadie mira, alarma, usa o analiza, estamos pagando por decoración estadística — no es observabilidad útil.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>62-64. Construimos una alarma de memoria: la arquitectura completa</h3>
          <p>Agent publica <code>mem_used_percent</code>. Creamos <code>cloudshop-high-memory</code>: Memory &gt; 90% durante varios períodos, y SNS puede notificar.</p>
          <Flow steps={[
            { icon: 'server', label: 'EC2' }, { icon: 'settings', label: 'Agent' }, { icon: 'bar-chart', label: 'Memory Metric' },
            { icon: 'alert-triangle', label: 'CloudWatch Alarm' }, { icon: 'bell', label: 'SNS' }, { icon: 'user', label: 'Equipo' },
          ]} />
          <p>Todas las clases anteriores empiezan a encajar. Y para logs: EC2 → Agent → CloudWatch Logs → Logs Insights. Un mismo Agent puede alimentar varias partes de nuestra observabilidad.</p>
        </section>

        <section className="lesson-section">
          <h3>65-68. Actividades</h3>
          <QaItem question="CPUUtilization EC2 / NetworkIn / porcentaje de RAM utilizada / porcentaje de filesystem usado / archivo de logs Apache" answer="Estándar / Estándar / Agent / Agent / Agent." />
          <QaItem question="Da permiso / Recopila memoria / Guarda-visualiza la métrica / Analiza logs / Notifica un threshold" answer="IAM Role / CloudWatch Agent / CloudWatch / CloudWatch Logs-Logs Insights / Alarm + SNS." />
          <QaItem question="Agent Running ✅, Memory config ✅, CloudWatch metrics ❌, IAM Role: ninguno. ¿Qué sospechamos?" answer="Permisos IAM." />
          <QaItem question="Agent ✅, IAM ✅, Logs config ✅, pero configuramos /var/log/app/error.log y el archivo real es /opt/cloudshop/logs/error.log. ¿Qué falla?" answer="La ruta configurada." />
        </section>

        <section className="lesson-section">
          <h3>69-70. Caso UniversidadCloud: detectar no es reparar</h3>
          <Nota><p>El portal tiene CPU 30% pero los estudiantes reportan lentitud. Instalamos Agent y descubrimos Memory 96%, con logs "WARN memory allocation slow". Ahora tenemos evidencia que antes no existía.</p></Nota>
          <p>El Agent observa, no aumenta RAM. Puede ayudarnos a detectar; después nosotros decidimos cambiar Instance Type, corregir la aplicación, reiniciar un proceso, o escalar horizontalmente. Otra vez: detectar no es reparar.</p>
        </section>

        <section className="lesson-section">
          <h3>71-72. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El gerente propone: "instalemos CloudWatch Agent y recojamos absolutamente todas las métricas cada segundo." No estoy de acuerdo porque produciríamos mucha telemetría que quizás nadie necesita, con más costo y ruido. Esto es lo que haría en su lugar: definir las señales que realmente soportan decisiones operacionales y elegir una resolución acorde al problema. El riesgo de su enfoque es gastar más y dificultar el análisis.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: "pongamos Access Keys dentro del archivo de configuración para que el Agent tenga permiso." No estoy de acuerdo porque estaríamos distribuyendo credenciales permanentes dentro de servidores. Esto es lo que haría en su lugar: utilizar un IAM Role asociado a la EC2 con los permisos necesarios. El riesgo de su enfoque es exponer credenciales que podrían reutilizarse fuera de la instancia.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>73-74. RETO DE LA CLASE</h3>
          <Nota><p>EventCloud tiene una EC2. CloudWatch muestra CPU 25%, Network normal, pero usuarios reportan lentitud y errores. Necesitamos observar RAM, disco y /var/log/eventcloud/error.log. Diseña cómo obtener esa información.</p></Nota>
          <Reveal label="Ver la solución esperada">
            <Flow steps={[
              { icon: 'server', label: 'EC2' }, { icon: 'key', label: 'IAM Role — CloudWatchAgentServerPolicy' }, { icon: 'settings', label: 'CloudWatch Agent' },
              { label: 'Memory + Disk + application log' }, { icon: 'cloud', label: 'CloudWatch' },
            ]} />
            <p>Después podremos visualizar métricas, crear alarmas e investigar logs.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>75-77. Retos nivel 2, 3 y 4</h3>
          <QaItem question="Agent muestra Memory = 97%, Disk = 55%, CPU = 22%. ¿Qué señal investigamos primero?" answer="Memoria. No aumentamos CPU porque no hay evidencia de saturación de CPU." />
          <QaItem question="Memory = 45%, Disk = 98%, CPU = 20%, logs: 'ERROR no space left on device'. ¿Qué tenemos?" answer="Evidencia muy fuerte de problema relacionado con espacio de disco." />
          <QaItem question="Agent Running ✅, IAM Role ✅, Memory metrics ✅, Logs ❌. ¿Qué concluimos?" answer="No podemos culpar al Agent completo, porque Memory metrics ✅ demuestra que el Agent y los permisos funcionan en gran medida. Investigamos específicamente ruta del log, configuración del log, permisos locales del archivo." />
          <Flow steps={[
            { label: '¿Agent instalado?' }, { label: '¿Agent running?' }, { label: '¿IAM Role?' }, { label: '¿Policy?' },
            { label: '¿Config correcta?' }, { label: '¿Ruta existe?' }, { label: '¿CloudWatch recibe?' },
          ]} />
          <p>Ese patrón evita adivinar.</p>
        </section>

        <section className="lesson-section">
          <h3>79. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'CloudWatch ve automáticamente toda la memoria RAM usada dentro de EC2.', correct: false },
            { text: 'CloudWatch Agent puede recopilar métricas internas.', correct: true },
            { text: 'CloudWatch Agent puede recopilar logs.', correct: true },
            { text: 'IAM Role puede dar permisos al Agent.', correct: true },
            { text: 'Agent y CloudWatch son exactamente lo mismo.', correct: false },
            { text: 'Podemos configurar qué métricas recoge el Agent.', correct: true },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>80. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>81. Reto oral</h3>
          <Dialogo>Explícame para qué sirve CloudWatch Agent sin utilizar las palabras CloudWatch, Agent, AWS, servidor, EC2, memoria, disco, log, métrica, recopilar ni monitoreo.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Es un pequeño observador instalado dentro de una máquina que obtiene información interna y la entrega a una plataforma central para poder analizarla."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>83. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>CloudWatch Agent</td><td>Recolector dentro del servidor</td></tr>
              <tr><td>CPU estándar</td><td>Disponible sin Agent en EC2</td></tr>
              <tr><td>Memory</td><td>Métrica interna recopilable con Agent</td></tr>
              <tr><td>Disk Used</td><td>Uso interno de filesystem</td></tr>
              <tr><td>Logs</td><td>Archivos/eventos que Agent puede enviar</td></tr>
              <tr><td>IAM Role</td><td>Identidad/permisos de la EC2</td></tr>
              <tr><td>CloudWatchAgentServerPolicy</td><td>Permisos administrados para el Agent</td></tr>
              <tr><td>Agent Config</td><td>Define qué recopilar</td></tr>
              <tr><td>Collection Interval</td><td>Cada cuánto se recopila</td></tr>
              <tr><td>High Resolution</td><td>Recolección más frecuente</td></tr>
              <tr><td>Custom Metrics</td><td>Métricas adicionales enviadas a CloudWatch</td></tr>
              <tr><td>Costo</td><td>Más telemetría puede costar más</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>84. Ticket de salida</h3>
          <Dialogo>CloudWatch muestra CPU de 20%, pero queremos saber si una EC2 está usando 95% de RAM y además revisar /var/log/app/error.log. ¿Qué necesitamos?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Necesitamos instalar y configurar CloudWatch Agent dentro de la EC2 para recopilar métricas internas como memoria y enviar el archivo de logs a CloudWatch. La instancia también debe tener un IAM Role con los permisos apropiados para publicar esa información.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 7</div>
          <p>Ahora tenemos una pequeña avalancha de señales: ALB (Requests, Latency, Healthy Targets), EC2 (CPU, Network, Memory, Disk), Auto Scaling (cantidad de instancias), RDS (CPU, Connections, Storage), Aplicación (Logs).</p>
          <p>¿Tenemos que entrar a cada servicio y abrir diez gráficos distintos cada vez que queremos saber cómo está CloudShop? No. Necesitamos reunir las señales importantes en una sola vista operacional.</p>
          <ConceptBadge icon="bar-chart">Módulo 8 · Clase 7 — CloudWatch Dashboards: cómo construir un tablero que muestre la salud completa de nuestra aplicación en una sola pantalla</ConceptBadge>
          <span className="tag tag-outline">Módulo 8 · Clase 7 · próximamente</span>
        </div>

      </div>
    </div>
  );
}
