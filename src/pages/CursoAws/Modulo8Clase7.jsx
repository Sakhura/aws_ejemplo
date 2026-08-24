import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué es un CloudWatch Dashboard?', options: [{ text: 'Vista que reúne información de monitoreo.', correct: true }, { text: 'Base de datos.', correct: false }, { text: 'Security Group.', correct: false }, { text: 'AMI.', correct: false }] },
  { q: '¿Qué es un Widget?', options: [{ text: 'Bloque visual dentro de un Dashboard.', correct: true }, { text: 'EC2.', correct: false }, { text: 'IAM Role.', correct: false }, { text: 'Target Group.', correct: false }] },
  { q: '¿Qué Widget es apropiado para observar evolución temporal?', options: [{ text: 'Line.', correct: true }, { text: 'Subscription.', correct: false }, { text: 'IAM.', correct: false }, { text: 'Route Table.', correct: false }] },
  { q: '¿Qué Widget puede servir para mostrar un valor actual?', options: [{ text: 'Number.', correct: true }, { text: 'Launch Template.', correct: false }, { text: 'NAT Gateway.', correct: false }, { text: 'Security Group.', correct: false }] },
  { q: '¿Qué Widget permite mostrar estados de alarmas?', options: [{ text: 'Alarm Widget.', correct: true }, { text: 'EBS Widget exclusivamente.', correct: false }, { text: 'VPC Widget.', correct: false }, { text: 'SNS Topic.', correct: false }] },
  { q: '¿Un Dashboard puede sustituir completamente una alarma?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Cuál es un buen criterio para seleccionar Widgets?', options: [{ text: 'Que respondan preguntas operacionales importantes.', correct: true }, { text: 'Usar todas las métricas posibles.', correct: false }, { text: 'Elegir las más bonitas.', correct: false }, { text: 'Poner una por cada recurso existente.', correct: false }] },
  { q: '¿Podemos incluir datos de varias capas de una aplicación?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿CloudWatch permite dashboards con métricas de varias Regiones?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Un Dashboard bien diseñado debería ayudar a localizar rápidamente qué capa está mostrando problemas?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
];

export default function Modulo8Clase7() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 8 · Clase 7</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 8 · Clase 7: CloudWatch Dashboards, cómo construir un tablero que muestre la salud completa de nuestra aplicación en una sola pantalla</h2>
      <p className="lesson-subtitle">
        Un Dashboard reúne las señales importantes para que podamos comprender rápidamente qué está ocurriendo en nuestra aplicación.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + diseño de tablero + interpretación + configuración guiada + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 8 · Clases 1 a 6</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es un CloudWatch Dashboard y para qué sirve, y diferenciar Dashboard, Metric y Alarm.</li>
            <li>Comprender qué es un Widget y reconocer distintos tipos.</li>
            <li>Diseñar un tablero basado en la salud de una aplicación, seleccionando métricas importantes de ALB, EC2, Auto Scaling y RDS.</li>
            <li>Incorporar métricas del CloudWatch Agent y mostrar estados de alarmas.</li>
            <li>Comprender la importancia del rango temporal, y que un Dashboard no detecta automáticamente problemas.</li>
            <li>Diseñar una jerarquía visual útil y evitar dashboards saturados.</li>
            <li>Comprender conceptualmente dashboards multi-Region.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-3. Tenemos demasiadas pantallas</h3>
          <p>CloudShop ya genera muchas señales: ALB (RequestCount, HealthyHostCount, Response Time), EC2 (CPU, Network, Memory, Disk), Auto Scaling (cantidad de instancias), RDS (CPU, Connections, Storage), Aplicación (Logs).</p>
          <p>Para revisar CloudShop podemos terminar entrando y saliendo de EC2, ALB, RDS y Auto Scaling una y otra vez. Mientras ocurre un incidente, perdemos tiempo navegando. Necesitamos una vista común.</p>
        </section>

        <section className="lesson-section">
          <h3>4-7. Aquí aparece CloudWatch Dashboard</h3>
          <p>CloudWatch incluye dashboards automáticos y permite crear dashboards personalizados para reunir métricas y alarmas seleccionadas en una sola vista.</p>
          <ConceptBadge icon="bar-chart">Un Dashboard es una pantalla donde organizamos los indicadores más importantes de nuestra aplicación</ConceptBadge>
          <Dialogo>Cuando conducimos no necesitamos abrir el motor, el depósito, las ruedas y la batería para saber cómo está el vehículo — tenemos un tablero con velocidad, combustible, temperatura y motor. El Dashboard cumple esa función operacional.</Dialogo>
          <Nota><p>Importantísimo: Dashboard ≠ Alarm. El Dashboard muestra; la alarma vigila y cambia de estado. Podemos tener CPU = 99% en un gráfico precioso, y si no existe una alarma, nadie necesariamente recibe aviso.</p></Nota>
          <RoleGrid roles={[
            { icon: 'bar-chart', label: 'Metric', desc: 'Entrega el dato' },
            { icon: 'alert-triangle', label: 'Alarm', desc: 'Detecta una condición' },
            { icon: 'target', label: 'Dashboard', desc: 'Reúne y visualiza' },
            { icon: 'file-text', label: 'Logs', desc: 'Permiten investigar detalles' },
            { icon: 'bell', label: 'SNS', desc: 'Avisa' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>8-9. Un Dashboard está formado por Widgets</h3>
          <p>Un CloudWatch Dashboard utiliza <strong>Widgets</strong>: un bloque visual que muestra información dentro del tablero. CloudWatch permite utilizar distintos tipos: líneas, área apilada, número, gauge, barras y pie; también existen widgets de alarmas y Logs Insights. Para nuestro curso trabajaremos principalmente con Line, Number, Gauge, Alarm y Logs Insights.</p>
        </section>

        <section className="lesson-section">
          <h3>10-14. Tipos de widgets</h3>
          <RoleGrid roles={[
            { icon: 'bar-chart', label: 'Line', desc: 'Cómo cambia una métrica en el tiempo (CPU, Latency, Connections, Memory)' },
            { icon: 'target', label: 'Number', desc: '¿Cuál es el valor actual o resumido? (ej. Healthy Targets: 4)' },
            { icon: 'target', label: 'Gauge', desc: 'Dónde está un valor dentro de un rango (ej. Memory 82%)' },
            { icon: 'alert-triangle', label: 'Alarm', desc: 'Qué condiciones están activas' },
            { icon: 'search', label: 'Logs Insights', desc: 'Resultados de consultas de logs (ej. top errores)' },
          ]} />
          <Nota><p>El Gauge puede ser útil para CPU, memoria o almacenamiento, pero debemos evitar llenar todo el Dashboard con velocímetros de nave espacial.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>15-18. No todo tiene que ser gráfico</h3>
          <QaItem question="¿Cómo evolucionó la CPU? / ¿Cuántos Targets sanos tengo ahora? / ¿Qué alarmas están activas? / ¿Qué errores se repiten?" answer="Line / Number / Alarm / Logs Insights." />
          <p>Antes de crear Widgets preguntamos: ¿qué necesito saber rápidamente? ¿La aplicación está disponible? ¿Está aumentando la demanda? ¿Las EC2 están saturadas? ¿Auto Scaling está respondiendo? ¿RDS está bajo presión? ¿Hay errores importantes? Luego elegimos métricas, no al revés.</p>
          <Nota><p>Mala forma de diseñar: "CloudWatch tiene 400 métricas, pongámoslas todas." Resultado: el usuario pregunta "¿está funcionando?" y el Dashboard responde con 73 líneas de colores imaginarios.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>18-19. Un buen Dashboard cuenta una historia: CloudShop Health</h3>
          <p>Podemos organizarlo de arriba hacia abajo: ¿está disponible? → ¿cuánta demanda existe? → ¿cómo está la aplicación? → ¿cómo está la base? → ¿hay alarmas? Así el tablero guía la investigación.</p>
          <p>Diseñemos <code>cloudshop-health</code> con cuatro zonas: Demanda, Disponibilidad, Aplicación, Base de datos.</p>
        </section>

        <section className="lesson-section">
          <h3>20-26. Las cuatro zonas</h3>
          <RoleGrid roles={[
            { icon: 'globe', label: 'Demanda', desc: 'RequestCount del ALB — ¿cuánto trabajo está llegando?' },
            { icon: 'dot-success', label: 'Disponibilidad', desc: 'HealthyHostCount + alarmas críticas (no-healthy-targets, high-alb-errors)' },
            { icon: 'settings', label: 'Aplicación', desc: 'EC2 CPU/Network + Agent Memory/Disk' },
            { icon: 'database', label: 'Base de datos', desc: 'RDS CPU, Connections, Free Storage' },
          ]} />
          <p>Auto Scaling también importa: si Requests ↑, CPU ↑, pero Instances = 2 durante todo el evento, quizá Auto Scaling no está respondiendo como esperamos. Con Requests ↑, CPU ↑, Instances 2 → 4, podemos interpretar que aumentó la carga y Auto Scaling agregó capacidad — la métrica de capacidad explica parte de la historia.</p>
        </section>

        <section className="lesson-section">
          <h3>27-28. Ahora observamos todo el recorrido</h3>
          <Flow steps={[{ icon: 'globe', label: 'Users' }, { icon: 'settings', label: 'ALB' }, { icon: 'server', label: 'EC2' }, { icon: 'database', label: 'RDS' }]} />
          <p>Nuestro Dashboard debería representar esas mismas capas, así cuando aparece un problema seguimos el camino del usuario.</p>
          <Flow steps={[
            { icon: 'target', label: 'RequestCount' }, { icon: 'dot-success', label: 'Healthy Targets' }, { icon: 'zap', label: 'EC2 CPU' }, { label: 'Memory' },
            { icon: 'bar-chart', label: 'ASG Instances' }, { icon: 'hard-drive', label: 'Disk Used' }, { icon: 'database', label: 'RDS CPU' }, { icon: 'link', label: 'DB Connections' }, { icon: 'alert-triangle', label: 'Active Alarms' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>29-31. El orden visual importa</h3>
          <Nota><p>Información crítica debe aparecer arriba. No escondemos "Healthy Targets = 0" en la esquina inferior después de "Network packets por segundo". La jerarquía debería reflejar importancia operacional.</p></Nota>
          <Flow steps={[{ label: 'Disponibilidad' }, { label: 'Demanda' }, { label: 'Capacidad' }, { label: 'Rendimiento' }, { label: 'Dependencias' }, { label: 'Detalles' }]} />
          <p>Porque si Healthy Targets = 0, no tiene mucho sentido celebrar CPU = 2%. Idealmente alguien debería mirar cloudshop-health y en pocos segundos poder decir "hay mucha demanda, Auto Scaling subió a cuatro instancias, la aplicación está estable y RDS está normal" — no debería necesitar descifrar un acertijo visual.</p>
        </section>

        <section className="lesson-section">
          <h3>32-35. El rango temporal sigue siendo importante</h3>
          <p>Podemos mirar última hora, últimas 24 horas, última semana — el Dashboard sigue dependiendo de la ventana temporal (la Clase 2 vuelve otra vez).</p>
          <QaItem question="Usuario dice 'falló hace diez minutos'. ¿Qué rango usamos?" answer="Última hora o un rango personalizado alrededor del incidente — no dejamos 'últimos 3 meses' esperando encontrar fácilmente un pico de 60 segundos." />
          <p>En cambio, para "¿la base está consumiendo cada vez más conexiones durante el mes?" usamos 7 o 30 días. Mismo Dashboard, diferentes usos: operación inmediata (¿estamos bien ahora?), investigación (¿qué ocurrió a las 14:20?), tendencia (¿estamos creciendo con el tiempo?). El contexto temporal cambia la lectura.</p>
        </section>

        <section className="lesson-section">
          <h3>36-41. Laboratorio conceptual: creamos el Dashboard</h3>
          <p>Ruta: CloudWatch → Dashboards → Create dashboard. Nombre: <code>cloudshop-health</code>.</p>
          <InfoBox title="Primeros Widgets" items={[
            'Line: AWS/ApplicationELB → RequestCount, título "CloudShop Requests"',
            'Number: HealthyHostCount, título "Healthy Targets"',
            'Line: CPUUtilization de las EC2 web',
          ]} />
          <Nota><p>No siempre queremos una línea por instancia. Con 2 EC2 puede ser útil; si Auto Scaling crea 50 EC2, mostrar 50 líneas convierte el Dashboard en tallarines estadísticos. Necesitamos pensar qué nivel de agregación sirve.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>41-43. Auto Scaling cambia los servidores</h3>
          <p>CloudWatch ofrece widgets de Metrics Explorer que permiten visualizar conjuntos de recursos que comparten tags o propiedades, útil para flotas dinámicas — lo dejamos como concepto de reconocimiento.</p>
          <p>Recordemos: A y B pueden convertirse en A, C, D, E. Las instancias nacen y mueren. Un Dashboard demasiado dependiente de EC2-A puede quedar obsoleto — queremos observar la aplicación o grupo, no enamorarnos de una máquina concreta.</p>
          <Dialogo>"¿Cómo está el servidor Pedro?" es menos útil que "¿cómo está la capa Web?" Auto Scaling nos obliga a pensar por servicio.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>44-48. Agregamos Memory, Disk, RDS, Alarmas y Logs</h3>
          <p>Agregamos <code>mem_used_percent</code> (Line o Gauge, "Web Memory") y <code>disk_used_percent</code>. Ahora CPU, memoria y disco pueden verse juntas.</p>
          <p>Para RDS agregamos CPUUtilization, DatabaseConnections, FreeStorageSpace — no necesitamos cada métrica de RDS, solo aquellas que ayuden a responder preguntas reales.</p>
          <InfoBox title="Alarm Widget: alarmas críticas" items={['cloudshop-no-healthy-targets', 'cloudshop-high-web-cpu', 'cloudshop-high-memory', 'cloudshop-rds-low-storage']} />
          <p>Podemos agregar un Logs Insights Widget que muestre errores recientes, por ejemplo "ERROR últimos 30 minutos" — combinando comportamiento y evidencia en la misma pantalla.</p>
          <Nota><p>Pero cuidado con los logs: no metemos 10.000 líneas dentro del Dashboard. El Widget debería mostrar un resumen o consulta útil; para investigar detalles entramos a Logs Insights.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>50-53. Dashboard de salud vs Dashboard técnico</h3>
          <p>Podemos tener diferentes tableros: <code>cloudshop-health</code> (estado general), <code>cloudshop-database</code> (RDS), <code>cloudshop-web-deep-dive</code> (EC2 y Agent). No todos necesitan la misma información.</p>
          <Nota><p>Un Dashboard con 97 widgets no significa observabilidad avanzada — puede significar que nadie supo qué quitar. Una estrategia mejor: Resumen → detalle por capa.</p></Nota>
          <Dialogo>En urgencias tenemos pulso, presión, oxígeno, temperatura. No mostramos al médico cada examen que el paciente se realizó desde 1998. Primero signos vitales, después profundidad si es necesaria.</Dialogo>
          <p>Un tablero inicial podría mostrar solo Healthy Targets, Requests, Latency, Active Alarms. Después otro con CPU, Memory, Disk, ASG Capacity. Y otro con RDS CPU, Connections, Storage. Eso produce capas de análisis.</p>
        </section>

        <section className="lesson-section">
          <h3>54-56. Dashboard multi-Region y cross-account, reconocimiento</h3>
          <p>CloudWatch permite dashboards con métricas de varias Regiones y también configuraciones cross-account cuando se habilitan los permisos correspondientes. Para nuestro curso no configuraremos múltiples cuentas y Regiones — solo dejamos instalada la idea de que un Dashboard puede crecer con la arquitectura. En organizaciones grandes puede existir una Cuenta Producción, Desarrollo, Seguridad y una Cuenta Monitoreo centralizada; para nuestros estudiantes, concepto, no laboratorio.</p>
        </section>

        <section className="lesson-section">
          <h3>57-60. Actividades</h3>
          <QaItem question="Mostrar CPU durante una hora / Detectar CPU > 80% / Mostrar cantidad actual de Targets sanos / Avisar cuando Targets sanos = 0" answer="Widget / Alarm / Widget / Alarm." />
          <QaItem question="Evolución de CPU / Número actual de Healthy Targets / Porcentaje de memoria / Estado de alarmas / Resumen de errores" answer="Line / Number / Gauge o Line / Alarm Widget / Logs Insights Widget." />
          <QaItem question="Tenemos NetworkOut, HealthyHostCount, CPU, RequestCount. Si el objetivo es saber primero si la aplicación está disponible, ¿qué ponemos arriba?" answer="HealthyHostCount — disponibilidad primero." />
          <QaItem question="Dashboard con 7 widgets, cinco de ellos son variaciones de CPU repetidas. ¿Qué problema tenemos?" answer="Redundancia y falta de propósito." />
        </section>

        <section className="lesson-section">
          <h3>61-65. Cuatro casos: interpretar el Dashboard</h3>
          <QaItem question="Requests ↑↑↑, Healthy Targets 4, EC2 CPU 85%, ASG Instances 2→4, RDS CPU 30%. ¿Qué historia vemos?" answer="La demanda aumentó, la capa web recibió más carga, Auto Scaling aumentó capacidad de 2 a 4 instancias, RDS se mantiene relativamente estable — la arquitectura parece respondiendo al incremento de carga." />
          <QaItem question="Requests normal, Healthy Targets 0, EC2 CPU 3%, RDS CPU 10%. ¿Qué es lo importante?" answer="Healthy Targets = 0. No celebramos CPU baja — tenemos un problema de disponibilidad." />
          <QaItem question="Requests normal, Healthy Targets 4, EC2 CPU 30%, Memory 40%, RDS CPU 95%, DB Connections ↑↑↑. ¿Dónde investigamos?" answer="RDS. El Dashboard permite ubicar rápidamente la capa." />
          <QaItem question="Requests normal, Healthy Targets 4, CPU 25%, Memory 35%, Disk 97%. ¿Qué investigamos?" answer="Disco. Otra vez: CPU normal no significa sistema sano." />
        </section>

        <section className="lesson-section">
          <h3>66. La clase completa converge</h3>
          <Flow steps={[
            { label: '1. ¿Qué medimos?' }, { label: '2. ¿Cómo lo interpretamos?' }, { label: '3. ¿Cuándo alarmamos?' }, { label: '4. ¿A quién avisamos?' },
            { label: '5. ¿Qué ocurrió?' }, { label: '6. ¿Qué pasa dentro de EC2?' }, { label: '7. ¿Cómo vemos todo junto?' },
          ]} />
          <p>Ya casi tenemos observabilidad operacional completa.</p>
        </section>

        <section className="lesson-section">
          <h3>67-70. Tres errores comunes</h3>
          <Nota><p>Dashboard sin alarmas: tenemos gráficos de CPU, RDS, Memory, Disk, pero ninguna alarma. Problema: alguien debe estar mirando — Dashboard no sustituye notificación.</p></Nota>
          <Nota><p>Alarmas sin contexto: el Dashboard muestra tres alarmas pero no muestra CPU, Requests, Targets. Entonces sabemos que algo está mal, pero no tenemos contexto visual inmediato — queremos ambos.</p></Nota>
          <Nota><p>Escalas engañosas: dos gráficos pueden parecer igual de dramáticos, aunque uno vaya de 20 a 25 y otro de 20 a 100. Siempre revisamos eje, unidad y rango — un gráfico también puede engañar visualmente.</p></Nota>
          <p>En un Dashboard, diseño significa reducir el tiempo para comprender. No necesitamos fuegos artificiales visuales — necesitamos prioridad, orden, contexto, legibilidad. Eso es buen diseño operacional.</p>
        </section>

        <section className="lesson-section">
          <h3>71-72. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El gerente propone: "pongamos todas las métricas disponibles en el Dashboard para no perder nada." No estoy de acuerdo porque demasiada información dificulta identificar rápidamente qué es importante. Esto es lo que haría en su lugar: seleccionar métricas que respondan preguntas operacionales claras y crear tableros de detalle para investigación. El riesgo de su enfoque es ocultar las señales críticas dentro de un océano de gráficos.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: "si tenemos Dashboard, ya no necesitamos alarmas ni SNS." No estoy de acuerdo porque el Dashboard necesita que alguien lo observe, mientras las alarmas detectan condiciones automáticamente y SNS puede comunicar esos cambios. Esto es lo que haría en su lugar: usar Dashboard, Alarm y SNS como herramientas complementarias. El riesgo de su enfoque es descubrir problemas solo cuando alguien casualmente abra el tablero.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>73-74. RETO DE LA CLASE</h3>
          <Nota><p>EventCloud Operations dispone de: ALB RequestCount, HealthyHostCount, EC2 CPU, EC2 Memory, EC2 Disk, ASG Capacity, RDS CPU, DB Connections, FreeStorageSpace, Alarm states, Application logs. Diseña un Dashboard con <strong>máximo 8 Widgets</strong>.</p></Nota>
          <p>¿Por qué máximo 8? Porque obliga a responder qué es realmente importante — no podemos escapar diciendo "pongo todo". El estudiante debe priorizar.</p>
          <Reveal label="Ver una posible solución">
            <ol className="plain-list">
              <li>Healthy Targets</li>
              <li>RequestCount</li>
              <li>ALB Response Time</li>
              <li>EC2 CPU</li>
              <li>EC2 Memory</li>
              <li>ASG Instance Count</li>
              <li>RDS CPU + Connections</li>
              <li>Critical Alarms</li>
            </ol>
            <p>Otra respuesta puede ser válida, si el estudiante justifica por qué cada Widget existe.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>76-78. Retos nivel 2, 3 y 4</h3>
          <QaItem question="Solo puede elegir 4 Widgets. ¿Qué priorizaría?" answer="Una opción: Availability (HealthyHostCount), Demand (RequestCount), Application capacity/performance (EC2 CPU/ASG), Database health (RDS CPU). La respuesta correcta depende del objetivo del tablero." />
          <QaItem question="Healthy Targets 4, Requests ↑, CPU ↑, ASG Instances ↑, RDS normal. ¿Qué parece ocurrir?" answer="Aumento de demanda con escalado de la capa web." />
          <QaItem question="Healthy Targets 4, Requests normal, EC2 normal, RDS normal, pero Alarm: payment-errors 🚨. ¿Qué hacemos?" answer="Revisar la alarma y los logs de pagos. El Dashboard nos dirige hacia la siguiente herramienta." />
        </section>

        <section className="lesson-section">
          <h3>79. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'Un Dashboard puede reunir métricas y alarmas.', correct: true },
            { text: 'Dashboard y Alarm son lo mismo.', correct: false },
            { text: 'Podemos utilizar diferentes tipos de widgets.', correct: true },
            { text: 'Más Widgets siempre significa mejor Dashboard.', correct: false },
            { text: 'CloudWatch tiene dashboards automáticos y personalizados.', correct: true },
            { text: 'CloudWatch puede crear dashboards con métricas de varias Regiones.', correct: true },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>80. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>81. Reto oral</h3>
          <Dialogo>Explícame para qué sirve un Dashboard sin utilizar las palabras Dashboard, CloudWatch, AWS, gráfico, métrica, pantalla, monitor, dato, Widget, alarma ni sistema.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Es una vista organizada que reúne los indicadores más importantes para poder comprender rápidamente cómo se está comportando una solución y dónde podría existir un problema."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>83. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Dashboard</td><td>Vista general de monitoreo</td></tr>
              <tr><td>Widget</td><td>Bloque dentro del tablero</td></tr>
              <tr><td>Line</td><td>Evolución temporal</td></tr>
              <tr><td>Number</td><td>Valor resumido</td></tr>
              <tr><td>Gauge</td><td>Posición dentro de un rango</td></tr>
              <tr><td>Alarm Widget</td><td>Estado de alarmas</td></tr>
              <tr><td>Logs Insights Widget</td><td>Resumen/consulta de logs</td></tr>
              <tr><td>Time Range</td><td>Ventana que estamos observando</td></tr>
              <tr><td>Health</td><td>¿Está disponible?</td></tr>
              <tr><td>Demand</td><td>¿Cuánto trabajo llega?</td></tr>
              <tr><td>Capacity</td><td>¿Cuánta infraestructura tenemos?</td></tr>
              <tr><td>Performance</td><td>¿Cómo se comporta?</td></tr>
              <tr><td>Dependencies</td><td>¿Cómo están servicios como RDS?</td></tr>
              <tr><td>Multi-Region</td><td>Métricas de distintas Regiones en una vista</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>84. Ticket de salida</h3>
          <Dialogo>CloudShop tiene 40 métricas disponibles, pero solo podemos mostrar seis en el Dashboard principal. ¿Qué criterio utilizarías para elegirlas?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Elegiría métricas que permitan responder rápidamente si la aplicación está disponible, cuánta demanda recibe, si la capa de aplicación tiene capacidad suficiente, si Auto Scaling está reaccionando y si una dependencia crítica como RDS presenta problemas. Las métricas de detalle quedarían para dashboards secundarios o investigación.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 8</div>
          <p>Ahora ya podemos observar, interpretar, detectar, notificar, investigar, obtener telemetría interna y visualizar todo junto. Falta demostrar que el estudiante puede hacerlo sin que nosotros le digamos qué métrica mirar primero.</p>
          <ConceptBadge icon="trophy">Módulo 8 · Clase 8 — Laboratorio integrador: recibir una alerta, usar el Dashboard, investigar métricas y logs, identificar la capa afectada y justificar el diagnóstico</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-8/clase-8" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 8: Laboratorio integrador →
          </Link>
        </div>

      </div>
    </div>
  );
}
