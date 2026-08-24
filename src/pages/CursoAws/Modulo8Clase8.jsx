import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué es una métrica?', options: [{ text: 'Una medida que cambia en el tiempo.', correct: true }, { text: 'Una subnet.', correct: false }, { text: 'Un usuario IAM.', correct: false }, { text: 'Un Topic.', correct: false }] },
  { q: '¿Qué hace una CloudWatch Alarm?', options: [{ text: 'Evalúa una condición.', correct: true }, { text: 'Guarda bases de datos.', correct: false }, { text: 'Reparte tráfico.', correct: false }, { text: 'Crea una VPC.', correct: false }] },
  { q: '¿Qué distribuye una notificación?', options: [{ text: 'Amazon SNS.', correct: true }, { text: 'RDS.', correct: false }, { text: 'EC2.', correct: false }, { text: 'EBS.', correct: false }] },
  { q: '¿Qué ayuda a investigar qué ocurrió dentro de una aplicación?', options: [{ text: 'Logs.', correct: true }, { text: 'Route Table.', correct: false }, { text: 'Internet Gateway.', correct: false }, { text: 'AMI.', correct: false }] },
  { q: '¿Qué agrupa logs relacionados?', options: [{ text: 'Log Group.', correct: true }, { text: 'Target Group.', correct: false }, { text: 'Auto Scaling Group.', correct: false }, { text: 'IAM Group.', correct: false }] },
  { q: '¿Qué permite consultar grandes cantidades de logs?', options: [{ text: 'CloudWatch Logs Insights.', correct: true }, { text: 'Security Group.', correct: false }, { text: 'Listener.', correct: false }, { text: 'Snapshot.', correct: false }] },
  { q: '¿Qué componente permite recopilar memoria interna de EC2?', options: [{ text: 'CloudWatch Agent.', correct: true }, { text: 'ALB.', correct: false }, { text: 'RDS.', correct: false }, { text: 'Route 53.', correct: false }] },
  { q: '¿Qué vista reúne varias señales de monitoreo?', options: [{ text: 'Dashboard.', correct: true }, { text: 'Launch Template.', correct: false }, { text: 'NACL.', correct: false }, { text: 'Bucket.', correct: false }] },
  { q: '¿Una alarma explica automáticamente la causa raíz?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Qué estado significa que la condición definida está siendo incumplida?', options: [{ text: 'ALARM.', correct: true }, { text: 'OK.', correct: false }, { text: 'READY.', correct: false }, { text: 'RUNNING.', correct: false }] },
  { q: '¿Qué significa INSUFFICIENT_DATA?', options: [{ text: 'No existe información suficiente para evaluar correctamente la alarma.', correct: true }, { text: 'CPU siempre está alta.', correct: false }, { text: 'SNS está roto.', correct: false }, { text: 'RDS necesariamente cayó.', correct: false }] },
  { q: '¿Qué estadística ayuda a conocer el mayor valor observado?', options: [{ text: 'Maximum.', correct: true }, { text: 'Average.', correct: false }, { text: 'Sum.', correct: false }, { text: 'Dimension.', correct: false }] },
  { q: '¿Qué estadística suele ser útil para contar solicitudes totales?', options: [{ text: 'Sum.', correct: true }, { text: 'Minimum.', correct: false }, { text: 'Namespace.', correct: false }, { text: 'Dimension.', correct: false }] },
  { q: '¿Qué debemos hacer primero ante una alerta?', options: [{ text: 'Revisar evidencia.', correct: true }, { text: 'Reiniciar todo.', correct: false }, { text: 'Duplicar todas las EC2.', correct: false }, { text: 'Eliminar la alarma.', correct: false }] },
  { q: '¿Qué debería incluir un diagnóstico?', options: [{ text: 'Evidencia + hipótesis + acción razonada.', correct: true }, { text: 'Solo una captura.', correct: false }, { text: 'Solo CPU.', correct: false }, { text: 'Solo el correo SNS.', correct: false }] },
];

export default function Modulo8Clase8() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 8 · Clase 8</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 8 · Clase 8: Laboratorio integrador, recibir una alerta, investigar métricas y logs, identificar la capa afectada y justificar el diagnóstico</h2>
      <p className="lesson-subtitle">
        Monitorear no significa mirar gráficos; significa usar evidencia para comprender qué está ocurriendo y decidir qué hacer.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">60 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Laboratorio + incidente simulado + diagnóstico + toma de decisiones + evaluación final</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 8 · Clases 1 a 7</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Recibir e interpretar una alerta operacional y comprender el flujo Metric → Alarm → SNS.</li>
            <li>Utilizar un Dashboard como punto inicial de diagnóstico e identificar qué capa presenta señales anormales.</li>
            <li>Diferenciar disponibilidad, demanda y rendimiento, comparando métricas de ALB, EC2, Auto Scaling y RDS.</li>
            <li>Utilizar métricas recopiladas mediante CloudWatch Agent y revisar logs dentro del período del incidente.</li>
            <li>Correlacionar timestamps entre alarmas, métricas y logs, y formular una hipótesis basada en evidencia.</li>
            <li>Diferenciar síntoma y causa probable, e identificar cuándo no existe evidencia suficiente.</li>
            <li>Evitar cambios impulsivos sobre infraestructura, proponer una acción de mitigación e investigación posterior.</li>
            <li>Diseñar alarmas útiles y comprender el ciclo básico de observabilidad.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2. La misión</h3>
          <Nota><p>Hoy el estudiante se convierte en Operador Cloud de CloudShop. No recibirá "revise la CPU de EC2" — recibirá solamente un incidente: usuarios reportan "CloudShop está extremadamente lenta" y una notificación ALARM: cloudshop-high-latency. Su misión: determinar qué está ocurriendo.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>3-4. Arquitectura bajo investigación y herramientas disponibles</h3>
          <Flow steps={[
            { icon: 'globe', label: 'Usuarios' }, { icon: 'settings', label: 'ALB' }, { icon: 'target', label: 'Target Group' },
            { icon: 'server', label: 'EC2-A / EC2-B' }, { icon: 'bar-chart', label: 'Auto Scaling' }, { icon: 'database', label: 'RDS' },
          ]} />
          <InfoBox title="Herramientas disponibles" items={['CloudWatch Dashboard', 'Metrics', 'Alarms', 'SNS Notification', 'CloudWatch Logs', 'Logs Insights', 'Agent Metrics']} />
          <p>Debe decidir en qué orden usarlas.</p>
        </section>

        <section className="lesson-section">
          <h3>5-6. Llega la alerta: primera regla</h3>
          <InfoBox items={['ALARM: cloudshop-high-latency', 'State: ALARM', 'Time: 14:20']} />
          <p>La alerta nos dice que existe una condición anormal. No nos dice la causa.</p>
          <ConceptBadge icon="alert-triangle">No cambiar infraestructura todavía</ConceptBadge>
          <p>No hacemos inmediatamente "¿CPU alta? → crear 10 EC2" ni "¿página lenta? → reiniciar RDS".</p>
          <Flow steps={[{ label: 'Alerta' }, { label: 'Observar' }, { label: 'Comparar' }, { label: 'Investigar' }, { label: 'Hipótesis' }, { label: 'Acción' }]} />
        </section>

        <section className="lesson-section">
          <h3>7-10. Paso 1 y 2: Dashboard y rango temporal</h3>
          <p>Entramos a CloudWatch → Dashboards → cloudshop-health. La alerta ocurrió a las 14:20, así que miramos aproximadamente 14:00–14:40 — no últimos 90 días, porque queremos observar qué cambió alrededor del incidente.</p>
          <InfoBox title="Escenario inicial" items={['RequestCount: normal', 'Healthy Targets: 2', 'EC2 CPU: 30%', 'Memory: 45%', 'Disk: 55%', 'ASG Instances: 2', 'RDS CPU: 96%', 'DB Connections: ↑↑↑']} />
          <QaItem question="¿Qué llama la atención?" answer="RDS. Pero todavía no concluimos: podemos afirmar que RDS presenta una señal anormal, no que 'RDS es definitivamente la causa raíz'. Necesitamos más evidencia." />
        </section>

        <section className="lesson-section">
          <h3>11-15. Paso 3: revisamos logs y formulamos la hipótesis</h3>
          <p>Como el incidente comenzó alrededor de las 14:20, consultamos /cloudshop/web entre 14:10 y 14:30.</p>
          <pre className="codeblock">{`14:18:41 WARN database response slow
14:18:53 WARN database response slow
14:19:02 ERROR database timeout
14:19:05 WARN retry database query
14:19:08 ERROR database timeout
14:20:01 ERROR database timeout
14:20:05 WARN retry database query`}</pre>
          <p>Ahora tenemos: RDS CPU alta + conexiones aumentando + database timeout + mismo período.</p>
          <Nota><p><strong>Hipótesis:</strong> la degradación parece estar relacionada con presión en la capa de base de datos. Notemos el lenguaje: no decimos "ya sabemos exactamente la causa", decimos "la evidencia apunta hacia esa capa".</p></Nota>
          <p>Dentro de RDS todavía podría haber una consulta ineficiente, demasiadas conexiones, falta de índices, una transacción bloqueada, carga extraordinaria, o una consulta masiva programada. CloudWatch nos ayudó a encontrar dónde investigar, no necesariamente qué línea SQL cambiar.</p>
          <RoleGrid roles={[
            { icon: 'zap', label: 'Síntoma', desc: 'Latencia alta' },
            { icon: 'search', label: 'Evidencia', desc: 'RDS CPU 96%, DB Connections ↑, DB timeout logs' },
            { icon: 'target', label: 'Hipótesis', desc: 'Presión o degradación en la capa de datos' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>16-21. Incidente A y B: demanda legítima vs falla de aplicación</h3>
          <InfoBox title="Incidente A: alta demanda legítima" items={['RequestCount: ↑↑↑↑', 'Healthy Targets: 4', 'EC2 CPU: 87%', 'Memory: 60%', 'ASG Instances: 2 → 4', 'RDS CPU: 35%', 'Logs: INFO requests processing normally']} />
          <QaItem question="¿Qué observamos?" answer="Existe un incremento importante de demanda que está elevando la utilización de EC2, pero Healthy Targets = 4 y ASG 2→4 muestran que Auto Scaling está agregando capacidad. No necesariamente tenemos una falla — puede ser comportamiento esperado bajo alta demanda." />
          <Nota><p>Una alarma no siempre significa desastre. CPU High puede significar que CyberDay comenzó y la plataforma está escalando — el contexto manda.</p></Nota>
          <InfoBox title="Incidente B: falla de aplicación" items={['RequestCount: normal', 'Healthy Targets: 2 → 1', 'EC2-A CPU: 20%', 'EC2-B CPU: 3%', 'RDS: normal', 'Logs de EC2-B: ERROR application failed to start, ERROR unable to bind port 80']} />
          <QaItem question="¿Qué parece ocurrir?" answer="EC2-B no está ejecutando correctamente la aplicación, lo que explicaría HealthyHostCount 2→1. El problema no parece ser RDS ni tráfico excesivo." />
          <Flow steps={[{ label: 'Application failed' }, { label: 'HTTP 80 no responde' }, { icon: 'alert-triangle', label: 'Health Check falla' }, { label: 'Target Unhealthy' }, { icon: 'settings', label: 'ALB evita ese Target' }]} />
          <p>Y si ASG utiliza esa información de salud, Auto Scaling puede reemplazar capacidad. El Módulo 7 vuelve completo.</p>
        </section>

        <section className="lesson-section">
          <h3>22-26. Incidente C y D: memoria y disco</h3>
          <InfoBox title="Incidente C: memoria" items={['RequestCount: normal', 'Healthy Targets: 2', 'CPU: 25%', 'Memory: 96%', 'Disk: 50%', 'RDS: normal', 'Logs: WARN memory usage critical, ERROR process terminated due to memory allocation']} />
          <QaItem question="¿Qué parece ocurrir?" answer="La instancia presenta presión de memoria. Esta señal no habría sido tan fácil de observar únicamente con las métricas estándar básicas de EC2 — aquí fue fundamental el CloudWatch Agent." />
          <p>Posibles investigaciones posteriores: procesos, memory leak, tamaño de instancia, configuración de aplicación, comportamiento bajo carga. No decidimos inmediatamente "cambiar a la EC2 más grande de AWS" — primero entendemos por qué consume tanta memoria.</p>
          <InfoBox title="Incidente D: disco lleno" items={['CPU: 15%', 'Memory: 40%', 'Disk Used: 98%', 'Healthy Targets: 2', 'Logs: ERROR no space left on device, ERROR unable to write temporary file']} />
          <QaItem question="¿Qué capa investigamos?" answer="Almacenamiento interno de la EC2. CPU = 15% parece perfecto, pero Disk = 98% puede destruir la aplicación igualmente — CPU no es 'la salud del servidor', es una señal." />
        </section>

        <section className="lesson-section">
          <h3>27-29. Incidente E: integración externa</h3>
          <InfoBox title="Incidente E" items={['RequestCount: normal', 'Healthy Targets: 2', 'EC2 CPU: 30%', 'Memory: 40%', 'RDS: normal', 'Logs: ERROR payment API timeout (×2), WARN retry payment, ERROR payment API unavailable']} />
          <QaItem question="¿Qué parece ocurrir?" answer="La infraestructura principal parece relativamente estable, pero la aplicación presenta problemas comunicándose con el servicio de pagos. La línea de investigación es App → Payment Service, no EC2 CPU." />
          <Nota><p>Esto es observabilidad: cinco incidentes diferentes pueden generar el mismo mensaje del usuario ("la página está lenta"), pero las causas probables pueden ser EC2, Memory, Disk, RDS o una API externa. Por eso necesitamos señales múltiples.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>30-31. Matriz de diagnóstico</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Señal</th><th>Primera sospecha</th></tr></thead>
            <tbody>
              <tr><td>RequestCount ↑ + CPU ↑</td><td>Carga web</td></tr>
              <tr><td>Healthy Hosts ↓</td><td>Aplicación/Targets</td></tr>
              <tr><td>Memory ↑</td><td>Presión de memoria</td></tr>
              <tr><td>Disk Used ↑</td><td>Filesystem</td></tr>
              <tr><td>RDS CPU ↑</td><td>Base de datos</td></tr>
              <tr><td>DB Connections ↑</td><td>Presión de conexiones</td></tr>
              <tr><td>Payment timeout logs</td><td>Servicio externo</td></tr>
              <tr><td>Todo normal pero error específico</td><td>Aplicación/integración</td></tr>
            </tbody>
          </table>
          <Nota><p>Pero sospecha no es diagnóstico definitivo. La tabla sirve para decidir dónde mirar primero, no es una tabla mágica de causas — CPU ↑ podría venir de más usuarios, un loop, un reporte, compresión, cifrado, o un proceso en segundo plano. Por eso seguimos investigando.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>32-36. El flujo completo y la línea de tiempo</h3>
          <Flow steps={[
            { icon: 'bar-chart', label: 'Metric' }, { icon: 'alert-triangle', label: 'Alarm' }, { icon: 'bell', label: 'SNS' }, { icon: 'user', label: 'Equipo' },
            { icon: 'target', label: 'Dashboard' }, { icon: 'file-text', label: 'Logs' }, { icon: 'search', label: 'Correlación' }, { icon: 'target', label: 'Hipótesis' }, { icon: 'settings', label: 'Acción' },
          ]} />
          <p>Ese es el corazón del Módulo 8. Comenzamos con Dashboard porque entrega una vista rápida de varias capas — ¿dónde parece estar la anomalía? Después profundizamos con Logs, porque una vez localizada una capa necesitamos contexto: RDS CPU ↑ nos dice presión; ERROR database timeout añade evidencia de cómo afecta a la aplicación.</p>
          <p>El timestamp une todo: Alarm 14:20, RDS CPU ↑ a las 14:18, DB timeout 14:19, queja de usuario 14:21. Podemos reconstruir: 14:18 presión DB → 14:19 timeouts → 14:20 alarma → 14:21 usuarios reportan. Eso es una línea temporal del incidente, mucho más útil que cuatro gráficos aislados porque diferencia causa probable de consecuencia.</p>
        </section>

        <section className="lesson-section">
          <h3>37-39. Logs Insights en el laboratorio</h3>
          <pre className="codeblock">{`fields @timestamp, @message
| filter @message like /ERROR/
| sort @timestamp desc
| limit 20`}</pre>
          <p>No buscamos memorizar sintaxis, buscamos entender: mostrar → filtrar → ordenar → limitar. También podemos preguntar "¿qué errores aparecen más?": Database timeout → 325, Payment timeout → 5, Login failed → 2 — ahora sabemos cuál patrón domina.</p>
          <Nota><p>Un ERROR database timeout puede ser puntual, pero 325 database timeouts en cinco minutos merece atención. De nuevo: cantidad + tiempo + contexto.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>40-46. Incidente F: faltan datos</h3>
          <InfoBox title="Incidente F" items={['Alarm: cloudshop-memory-high', 'State: INSUFFICIENT_DATA', 'CPU: normal', 'Memory metric: sin nuevos datos']} />
          <QaItem question="¿Qué sospechamos?" answer="No necesariamente 'memoria normal'. Investigamos el Agent, IAM, configuración y conectividad. Falta de datos también es evidencia: no asumimos que 'sin métrica' significa '0%' — ese error sería peligroso." />
          <Flow steps={[{ label: '¿EC2 existe?' }, { label: '¿Agent running?' }, { label: '¿IAM Role?' }, { label: '¿Policy?' }, { label: '¿Config correcta?' }, { label: '¿Métrica llega?' }]} />
        </section>

        <section className="lesson-section">
          <h3>44-46. Incidente G: alarma funciona, correo no</h3>
          <InfoBox title="Incidente G" items={['Alarm: ALARM ✅', 'SNS Topic: cloudshop-alerts ✅', 'Subscription: Pending confirmation ❌']} />
          <p>Diagnóstico: la alerta fue detectada, pero el canal de email no estaba habilitado completamente. Antes de declarar "CloudWatch falló" revisamos Alarm Action → SNS Topic → Subscription → Confirmed?</p>
          <Nota><p>Detección y notificación siguen siendo distintas: la CloudWatch Alarm puede funcionar aunque el correo no llegue. Por eso siempre aislamos cada etapa.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>47. Arquitectura de observabilidad final</h3>
          <Flow steps={[
            { icon: 'globe', label: 'CloudShop' }, { icon: 'settings', label: 'ALB' }, { icon: 'server', label: 'EC2 + Agent' }, { icon: 'database', label: 'RDS' },
            { icon: 'cloud', label: 'CloudWatch' }, { icon: 'bar-chart', label: 'Metrics' }, { icon: 'file-text', label: 'Logs' }, { icon: 'target', label: 'Dashboard' },
            { icon: 'alert-triangle', label: 'Alarms' }, { icon: 'bell', label: 'SNS' }, { icon: 'user', label: 'Equipo' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>48-51. Actividades</h3>
          <InfoBox title="Ante un incidente, preguntamos" items={['¿Cuándo comenzó?', '¿Qué alarma se activó?', '¿Qué cambió en el Dashboard?', '¿Qué capa parece afectada?', '¿Qué muestran los logs del mismo período?']} />
          <QaItem question="Usuario dice 'está lento', CPU 20%. ¿Podemos decir 'no es infraestructura'?" answer="No. Nos falta observar Memory, Disk, ALB, RDS, Logs." />
          <QaItem question="RDS CPU 98%, EC2 CPU 20% / Memory 97%, CPU 30% / HealthyHostCount = 0 / payment timeout logs, resto normal" answer="RDS / EC2-memoria / Target-Application layer / integración de pagos." />
          <QaItem question="'La página está lenta' / 'RDS CPU = 98%' / 'Probablemente la capa DB está bajo presión'" answer="Síntoma / Evidencia / Hipótesis." />
          <Nota><p>Nunca confundimos hipótesis con hecho. Es mejor escribir "la evidencia sugiere presión en RDS" que "RDS es la causa" si aún no verificamos queries, bloqueos u otros factores. El lenguaje también forma parte del diagnóstico profesional.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>53-55. Mitigación vs causa raíz</h3>
          <p>Si tenemos evidencia suficiente de RDS bajo presión, podemos evaluar una mitigación: reducir carga, optimizar consulta, aumentar capacidad, corregir conexiones, o detener trabajo masivo — pero la mitigación depende del diagnóstico.</p>
          <Nota><p>"Reiniciar" no es estrategia universal. Si siempre hacemos problema → reiniciar, podemos ocultar evidencia y el problema volverá. Un reinicio puede ser mitigación en ciertos casos, no diagnóstico.</p></Nota>
          <RoleGrid roles={[
            { icon: 'settings', label: 'Mitigación', desc: 'Restaurar servicio rápidamente' },
            { icon: 'search', label: 'Root Cause Analysis', desc: 'Entender qué originó el incidente' },
          ]} />
          <p>Ejemplo: reiniciar un proceso puede restaurar el servicio, pero si existe un memory leak, la causa sigue ahí.</p>
        </section>

        <section className="lesson-section">
          <h3>56. Mini informe de incidente</h3>
          <InfoBox items={[
            'INCIDENTE: CloudShop lento', 'Hora: 14:20', 'Alarma: high-latency',
            'Evidencia: RDS CPU 96%, conexiones elevadas, database timeout repetidos',
            'Hipótesis: presión en capa de base de datos', 'Mitigación propuesta: ...', 'Investigación posterior: ...',
          ]} />
          <p>No necesitamos veinte páginas. Necesitamos claridad.</p>
        </section>

        <section className="lesson-section">
          <h3>57-64. RETO FINAL DEL MÓDULO 8</h3>
          <Nota><p>HealthCloud: Usuarios → ALB → EC2 × N → RDS, con Auto Scaling, CloudWatch Agent, Alarms, SNS, Logs y Dashboard. A las 11:30 usuarios reportan "el sistema demora demasiado en guardar una ficha". Notificación: ALARM healthcloud-high-response-time, State ALARM, Time 11:32.</p></Nota>
          <InfoBox title="Dashboard" items={['RequestCount: normal', 'HealthyHostCount: 3', 'EC2 CPU: 35%', 'Memory: 50%', 'Disk: 60%', 'ASG Instances: 3', 'RDS CPU: 92%', 'DB Connections: muy altas']} />
          <QaItem question="¿Qué capa parece más sospechosa?" answer="RDS." />
          <pre className="codeblock">{`11:29 WARN patient insert slow
11:30 WARN database response 4.8 seconds
11:30 ERROR database timeout
11:31 WARN retry insert
11:31 ERROR database timeout
11:32 ERROR database timeout`}</pre>
          <Reveal label="Ver la respuesta esperada">
            <p>La evidencia apunta a degradación en la capa de base de datos, debido a CPU elevada, gran cantidad de conexiones y múltiples timeouts coincidiendo con el aumento de latencia. Pero, ¿cuál es la causa raíz exacta? Todavía no tenemos suficiente evidencia para afirmarla.</p>
          </Reveal>
          <QaItem question="Reto nivel 2: descubrimos que a las 11:25 se inició un proceso de generación de reportes sobre toda la base. ¿Qué cambia?" answer="Ahora tenemos una hipótesis más específica: el proceso de reportes puede estar elevando carga y afectando operaciones transaccionales." />
          <QaItem question="Reto nivel 3: detenemos controladamente el proceso de reportes. RDS CPU 92%→40%, DB Connections ↓, Latency ↓. ¿Qué aporta esto?" answer="Refuerza significativamente la relación entre ese proceso y el incidente." />
          <Flow steps={[{ label: 'Observación' }, { label: 'Hipótesis' }, { label: 'Intervención controlada' }, { label: 'Nueva observación' }]} />
          <p>No: Problema → Adivinar → Cambiar 17 cosas → No saber qué funcionó. Eso es trabajar con evidencia.</p>
        </section>

        <section className="lesson-section">
          <h3>65-69. Reto sorpresa, falsa alarma y alarmas que evolucionan</h3>
          <QaItem question="Healthy Targets 3, CPU 30%, Memory 35%, RDS normal, Latency alta, Logs: 'ERROR external identity provider timeout'. ¿Qué hacemos?" answer="Investigamos la dependencia externa de autenticación. No tocamos RDS." />
          <Flow steps={[{ icon: 'target', label: 'Dashboard — ¿dónde parece el problema?' }, { icon: 'file-text', label: 'Logs — ¿qué estaba ocurriendo?' }, { icon: 'search', label: 'Investigación — ¿por qué ocurrió?' }]} />
          <QaItem question="Alarma CPU > 80%, 1 de 1. Datos: 20, 25, 91, 22, 20. Usuarios no reportan problemas. ¿Qué investigamos además del sistema?" answer="La alarma — quizá es demasiado sensible para este caso." />
          <p>Los incidentes nos enseñan qué thresholds funcionan. Podemos descubrir que 80% en 1 de 1 genera demasiado ruido, y revisar Period, Evaluation Periods, Datapoints to Alarm, Threshold. El sistema de monitoreo también evoluciona.</p>
          <Nota><p>Pero tampoco bajamos sensibilidad solo porque molesta — no hacemos "alarm molesta → threshold = 99.999% para que se calle". Preguntamos qué condición representa realmente riesgo; ajustar alertas requiere evidencia.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>70-72. Alarm history y reconocimiento de Log Alarms</h3>
          <p>Durante una investigación también puede ser útil revisar cambios de estado de alarmas: OK → ALARM → OK, junto con la línea temporal del incidente.</p>
          <p>CloudWatch también permite crear Log Alarms directamente sobre resultados programados de consultas de Logs Insights, además del enfoque tradicional de convertir logs en métricas mediante filtros — no lo configuraremos en este laboratorio, pero el estudiante debe reconocer Logs → Query → Alarm como una posibilidad moderna: "si aparecen más de 100 errores de pago dentro de una ventana, genera una alarma."</p>
        </section>

        <section className="lesson-section">
          <h3>73-74. Actividades</h3>
          <QaItem question="Ordena: Hipótesis, SNS, Dashboard, Alarm, Logs, Metric" answer="Metric → Alarm → SNS → Dashboard → Logs → Hypothesis." />
          <QaItem question="Saber que CPU subió / Detectar automáticamente CPU alta / Avisar al equipo / Ver varias capas juntas / Saber qué error ocurrió / Obtener RAM desde EC2" answer="Metric / Alarm / SNS / Dashboard / Logs / CloudWatch Agent." />
        </section>

        <section className="lesson-section">
          <h3>75-78. Evaluación práctica por equipos</h3>
          <InfoBox title="Cada equipo recibe un incidente diferente" items={[
            'Equipo A: CPU alta, Requests altas, ASG escala',
            'Equipo B: RDS CPU alta, DB timeout',
            'Equipo C: Memory alta, process killed',
            'Equipo D: Healthy Targets = 0, app failed to start',
            'Equipo E: infra normal, payment API timeout',
          ]} />
          <p>Cada equipo debe presentar qué investigó y por qué, entregando: síntoma, alarma, métricas relevantes, logs relevantes, capa afectada, hipótesis, evidencia, acción propuesta, y qué falta verificar. Esto obliga a razonar, no solamente marcar respuestas.</p>
        </section>

        <section className="lesson-section">
          <h3>77-78. Rúbrica</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Nivel</th><th>Evidencia</th></tr></thead>
            <tbody>
              <tr><td>Sobresaliente</td><td>Correlaciona métricas + logs + tiempo, diferencia evidencia e hipótesis y propone acción razonada</td></tr>
              <tr><td>Logrado</td><td>Identifica correctamente la capa y usa evidencia suficiente</td></tr>
              <tr><td>En proceso</td><td>Identifica señales pero salta demasiado rápido a conclusiones</td></tr>
              <tr><td>Inicial</td><td>Propone cambios sin revisar evidencia</td></tr>
            </tbody>
          </table>
          <Nota><p>Para "sobresaliente", el estudiante no debería decir solamente "RDS está mal". Debería decir algo como: "la alerta de latencia comenzó a las 11:32. En el mismo período RDS alcanzó 92% de CPU y aumentaron las conexiones, mientras EC2 permaneció estable. Los logs muestran múltiples database timeout. La evidencia sugiere que la degradación está concentrada en la capa de base de datos. Aún necesitamos revisar consultas y conexiones para determinar la causa raíz."</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>79-81. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El gerente propone: "cuando llegue cualquier alarma, aumentemos todas las EC2 automáticamente." No estoy de acuerdo porque muchas fallas no están relacionadas con falta de capacidad web. Esto es lo que haría en su lugar: usar la alerta para identificar primero qué capa presenta evidencia anormal. El riesgo de su enfoque es aumentar costos sin resolver problemas de RDS, disco, memoria o dependencias externas.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: "si el Dashboard está verde ahora, el incidente nunca ocurrió." No estoy de acuerdo porque un sistema puede haberse recuperado antes de que iniciemos la investigación. Esto es lo que haría en su lugar: revisar el rango temporal del incidente, historial de alarmas y logs. El riesgo de su enfoque es perder fallas intermitentes que ya dejaron de ser visibles en el estado actual.</p>
          </Nota>
          <p>Investigar el pasado es parte de monitorear: "ahora ✅" no significa "hace 30 minutos ✅". Por eso tenemos historical metrics, logs, alarm states, timestamps — la historia importa.</p>
        </section>

        <section className="lesson-section">
          <h3>82-84. Limpieza y checklist</h3>
          <p>Si durante las prácticas creamos recursos específicos, revisamos alarmas, SNS Topics, Subscriptions, Dashboards, Log Groups, Agent configs y EC2 temporales de laboratorio — no eliminamos recursos compartidos del curso, solo lo creado específicamente para la práctica.</p>
          <InfoBox items={[
            'Recibí/interpreté la alerta', 'Identifiqué la hora', 'Abrí el Dashboard', 'Ajusté el rango temporal',
            'Revisé disponibilidad', 'Revisé demanda', 'Revisé EC2', 'Revisé Agent metrics', 'Revisé RDS', 'Revisé Auto Scaling',
            'Busqué logs del período', 'Encontré patrones', 'Diferencié síntoma e hipótesis', 'Propuse una acción',
            'Identifiqué qué falta verificar', 'Documenté el incidente',
          ]} />
        </section>

        <section className="lesson-section">
          <h3>85. Evaluación final del Módulo 8</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>86. Reto oral final</h3>
          <Dialogo>Explícame observabilidad sin utilizar las palabras CloudWatch, AWS, monitoreo, métrica, alarma, log, Dashboard, SNS, Agent, gráfico, dato ni servidor.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Es la capacidad de obtener suficientes señales sobre una solución para comprender cómo se comporta, detectar cambios importantes y reconstruir qué estaba ocurriendo cuando aparece un problema."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>88. Las ideas que deben sobrevivir</h3>
          <ul className="plain-list">
            <li>Una métrica muestra comportamiento cuantificable.</li>
            <li>Los Data Points forman una historia temporal.</li>
            <li>Average, Maximum, Minimum y Sum responden preguntas diferentes.</li>
            <li>El período cambia cómo resumimos los datos.</li>
            <li>Una alarma evalúa una condición.</li>
            <li>OK, ALARM e INSUFFICIENT_DATA son estados diferentes.</li>
            <li>SNS distribuye notificaciones.</li>
            <li>Logs permiten reconstruir eventos.</li>
            <li>Logs Insights ayuda a consultar grandes cantidades de registros.</li>
            <li>CloudWatch Agent obtiene información interna como memoria, disco y logs.</li>
            <li>Dashboard reúne las señales importantes.</li>
            <li>El tiempo permite correlacionar eventos.</li>
            <li>Una señal anormal no siempre revela la causa.</li>
            <li>Debemos diferenciar síntoma, evidencia e hipótesis.</li>
            <li>La mitigación y la causa raíz no son necesariamente lo mismo.</li>
            <li>Una alerta útil debe ser accionable.</li>
            <li>La observabilidad también debe diseñarse considerando costos.</li>
            <li>Diagnosticar significa trabajar con evidencia, no adivinar.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>89. Ticket de salida del módulo</h3>
          <Dialogo>Usuarios reportan lentitud. EC2 muestra CPU de 25%, memoria de 40% y dos Targets saludables. RDS muestra CPU de 95%, conexiones creciendo y los logs repiten database timeout. ¿Qué puedes afirmar y qué todavía no puedes afirmar?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Puedo afirmar que existe evidencia de presión en la capa de base de datos coincidiendo con el incidente: RDS tiene CPU elevada, aumentan las conexiones y la aplicación registra timeouts. Puedo plantear que la degradación probablemente está relacionada con esa capa. Todavía no puedo afirmar la causa raíz exacta sin investigar consultas, bloqueos, conexiones u otros procesos de la base de datos.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="cloud" /> Módulo 8 completado</div>
          <Nota><p>El estudiante comenzó el módulo viendo "CPU = 90%" y termina siendo capaz de construir:</p></Nota>
          <Flow steps={[
            { icon: 'alert-triangle', label: 'Alarma' }, { icon: 'bell', label: 'Notificación' }, { icon: 'target', label: 'Dashboard' },
            { icon: 'bar-chart', label: 'Varias métricas' }, { icon: 'file-text', label: 'Logs' }, { icon: 'clock', label: 'Correlación temporal' },
            { icon: 'search', label: 'Hipótesis' }, { icon: 'settings', label: 'Acción' },
          ]} />
          <p>Ya no pregunta solamente "¿está alta la CPU?". Ahora puede preguntar: "¿qué cambió, cuándo cambió, qué otras señales cambiaron al mismo tiempo y qué evidencia respalda nuestra hipótesis?"</p>
          <ConceptBadge icon="lock">Módulo 9 — Seguridad en AWS</ConceptBadge>
          <p>Porque ya construimos infraestructura que recibe tráfico, ejecuta aplicaciones, almacena datos, escala y se monitorea — ahora debemos responder preguntas más incómodas: ¿quién puede entrar? ¿cómo se autentica? ¿qué puede hacer? ¿cómo protegemos los datos? ¿cómo sabemos quién hizo un cambio? ¿cómo detectamos actividad sospechosa?</p>
          <span className="tag tag-outline">Módulo 9 · próximamente</span>
        </div>

      </div>
    </div>
  );
}
