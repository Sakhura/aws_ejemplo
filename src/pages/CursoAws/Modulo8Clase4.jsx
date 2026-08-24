import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué es Amazon SNS?', options: [{ text: 'Servicio de notificaciones y mensajería.', correct: true }, { text: 'Base de datos.', correct: false }, { text: 'Load Balancer.', correct: false }, { text: 'VPC.', correct: false }] },
  { q: '¿Qué es un SNS Topic?', options: [{ text: 'Canal lógico donde se publican mensajes.', correct: true }, { text: 'EC2.', correct: false }, { text: 'Métrica.', correct: false }, { text: 'Backup.', correct: false }] },
  { q: '¿Qué es una Subscription?', options: [{ text: 'Conexión entre un Topic y un destinatario.', correct: true }, { text: 'Alarm Threshold.', correct: false }, { text: 'IAM Policy.', correct: false }, { text: 'Target Group.', correct: false }] },
  { q: '¿Qué servicio detecta la condición?', options: [{ text: 'CloudWatch Alarm.', correct: true }, { text: 'SNS.', correct: false }, { text: 'Email.', correct: false }, { text: 'S3.', correct: false }] },
  { q: '¿Qué servicio distribuye el aviso?', options: [{ text: 'SNS.', correct: true }, { text: 'RDS.', correct: false }, { text: 'EC2.', correct: false }, { text: 'ALB.', correct: false }] },
  { q: '¿Una suscripción de correo comienza a recibir mensajes inmediatamente sin confirmación?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Puede una alarma notificar cuando entra en OK?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿SNS puede tener varios suscriptores?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: 'Si un mensaje SNS de prueba funciona pero la alarma no notifica, ¿debemos sospechar primero del correo?', options: [{ text: 'Sí.', correct: false }, { text: 'No, debemos revisar la integración de la alarma con SNS.', correct: true }] },
  { q: '¿Una notificación indica automáticamente la causa raíz?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
];

export default function Modulo8Clase4() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 8 · Clase 4</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 8 · Clase 4: CloudWatch Alarms + Amazon SNS, cómo avisar automáticamente cuando algo importante ocurre</h2>
      <p className="lesson-subtitle">
        CloudWatch detecta la condición; SNS distribuye el aviso.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + configuración guiada + notificaciones + diagnóstico + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 8 · Clases 1 a 3</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es Amazon SNS y comprender qué es un Topic, una Subscription y un Subscriber.</li>
            <li>Relacionar CloudWatch Alarm con SNS y diferenciar detección de notificación.</li>
            <li>Crear conceptualmente un SNS Topic y una suscripción por correo electrónico.</li>
            <li>Comprender que una suscripción por correo debe confirmarse.</li>
            <li>Asociar una alarma con un SNS Topic y comprender las notificaciones por cambio de estado.</li>
            <li>Diferenciar notificaciones al entrar en ALARM, OK o INSUFFICIENT_DATA.</li>
            <li>Reconocer por qué una alarma puede activarse sin que llegue el correo, y diagnosticar problemas básicos de notificaciones.</li>
            <li>Comprender el problema de la fatiga de alertas.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-3. Recordemos dónde quedamos: si nadie mira la consola</h3>
          <InfoBox title="Nuestra alarma" items={['Metric: CPUUtilization', 'Statistic: Average', 'Threshold: > 80%', 'Period: 5 minutos', 'Datapoints: 3 de 3']} />
          <p>CloudWatch observa 85%, 90%, 92% → ALARM. Perfecto. Pero aparece una pregunta: ¿quién sabe que ocurrió?</p>
          <Nota><p>Podemos tener ALARM durante horas mientras el equipo está tomando café, en reunión o fuera de la oficina. La alarma detectó correctamente el problema. Pero nadie se enteró. Necesitamos una forma de comunicarlo.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>4-6. Aquí aparece Amazon SNS</h3>
          <p><strong>Amazon SNS</strong> (Simple Notification Service) es un servicio que permite enviar mensajes a uno o más destinatarios suscritos.</p>
          <Dialogo>Imaginemos una emisora, "Radio CloudShop". La radio transmite "tenemos un incidente", pero solo quienes están sintonizados reciben el mensaje. En SNS, el Topic es parecido al canal, y los suscriptores son quienes escuchan.</Dialogo>
          <RoleGrid roles={[
            { icon: 'bell', label: 'Topic', desc: 'El canal donde publicamos un aviso' },
            { icon: 'link', label: 'Subscription', desc: 'Conecta un Topic con un destino' },
            { icon: 'user', label: 'Subscriber', desc: 'El destinatario que recibirá el mensaje' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>7-10. Topic, Subscription y Subscriber</h3>
          <p>Un <strong>SNS Topic</strong> es un canal lógico al que se publican mensajes para que SNS los distribuya entre sus suscriptores — por ejemplo, <code>cloudshop-alerts</code>. No representa una persona concreta, representa un punto común de distribución.</p>
          <Dialogo>Una empresa crea el grupo "Emergencias TI". Dentro están Ana, Pedro y Camila. Cuando enviamos un mensaje al grupo, todos pueden recibirlo. SNS Topic cumple conceptualmente ese papel.</Dialogo>
          <p>Una <strong>Subscription</strong> conecta un Topic con un destino: Topic → Subscription → sabina@empresa.cl. AWS requiere que exista una suscripción para que un endpoint reciba mensajes publicados en el Topic. El <strong>Subscriber</strong> es el destinatario final: correo electrónico, aplicaciones, u otros servicios compatibles. Para nuestro laboratorio, usaremos email.</p>
          <Flow steps={[{ label: 'Mensaje' }, { icon: 'bell', label: 'Topic' }, { icon: 'link', label: 'Subscription' }, { icon: 'user', label: 'Email' }]} />
        </section>

        <section className="lesson-section">
          <h3>12-14. Integración completa</h3>
          <Flow steps={[{ icon: 'bar-chart', label: 'Metric' }, { icon: 'alert-triangle', label: 'CloudWatch Alarm' }, { icon: 'bell', label: 'SNS Topic' }, { icon: 'link', label: 'Subscription' }, { icon: 'user', label: 'Equipo' }]} />
          <RoleGrid roles={[
            { icon: 'bar-chart', label: 'CloudWatch Metric', desc: 'Mide' },
            { icon: 'alert-triangle', label: 'CloudWatch Alarm', desc: 'Evalúa una condición' },
            { icon: 'bell', label: 'SNS', desc: 'Distribuye el mensaje' },
          ]} />
          <p>No mezclamos detección con comunicación.</p>
        </section>

        <section className="lesson-section">
          <h3>15-17. Creamos nuestro Topic</h3>
          <p>Ruta conceptual: AWS Console → Amazon SNS → Topics → Create topic. Type: Standard, Nombre: <code>cloudshop-alerts</code>. Evitamos nombres como "topic1" — preferimos algo que diga para qué existe.</p>
          <p>Nuestro Topic puede recibir mensajes de varias alarmas: CPU alta, RDS sin espacio, Targets saludables = 0 — todas podrían notificar a <code>cloudshop-alerts</code> si tiene sentido operacional.</p>
        </section>

        <section className="lesson-section">
          <h3>18-21. La suscripción y su confirmación</h3>
          <InfoBox title="Create subscription" items={['Topic: cloudshop-alerts', 'Protocol: Email', 'Endpoint: correo-del-equipo@empresa.cl']} />
          <Nota><p>Una suscripción por correo electrónico debe confirmarse antes de comenzar a recibir mensajes. Si una alarma cambia de estado antes de completar esa verificación, el destinatario no recibirá esa notificación. Este paso provoca muchísimos "SNS no funciona".</p></Nota>
          <p>El destinatario recibe un correo "Confirm subscription" y debe hacer clic. Entonces cambia de <strong>Pending confirmation</strong> a <strong>Confirmed</strong>. Si vemos Pending confirmation, no culpamos a CloudWatch — primero confirmamos la suscripción.</p>
        </section>

        <section className="lesson-section">
          <h3>22-26. Diagnóstico por capas: probamos SNS antes de conectar CloudWatch</h3>
          <QaItem question="Alarm → ALARM ✅, SNS Topic ✅, Email subscription ✅, pero Status: Pending confirmation ❌. ¿Llegará el correo?" answer="No — ese es el problema." />
          <p>Una estrategia útil: publicar un mensaje de prueba directamente en el Topic (SNS Topic → Publish message → "Prueba CloudShop"). Si llega, sabemos que SNS Topic, Subscription y Email funcionan; si después una alarma no notifica, investigamos específicamente la integración con CloudWatch.</p>
          <Nota><p>No probamos todo junto. Si construimos Metric → Alarm → SNS → Email y no funciona, tenemos cuatro lugares posibles de falla. Mejor probar SNS → Email primero, después Alarm → SNS. Así reducimos el misterio.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>26-27. Conectamos CloudWatch Alarm</h3>
          <p>Volvemos a nuestra alarma <code>cloudshop-web-high-cpu</code>. Durante su creación o edición configuramos Notification: Alarm state → In alarm, Topic → cloudshop-alerts. CloudWatch permite utilizar un SNS Topic para notificar cuando una alarma cambia a estados como ALARM, OK o INSUFFICIENT_DATA.</p>
          <Flow steps={[{ label: 'CPU > 80%' }, { icon: 'alert-triangle', label: 'cloudshop-web-high-cpu' }, { label: 'OK → ALARM' }, { icon: 'bell', label: 'cloudshop-alerts' }, { icon: 'user', label: 'Equipo' }]} />
        </section>

        <section className="lesson-section">
          <h3>28-31. Atención al cambio de estado</h3>
          <Nota><p>Para las acciones normales de notificación, CloudWatch ejecuta la acción cuando ocurre una transición de estado. Si la alarma permanece ALARM durante horas, la notificación no se repite constantemente por la misma transición — no pensamos "ALARM durante 1 hora = 60 correos" por defecto.</p></Nota>
          <p>Ejemplo temporal: 10:00 → OK, 10:15 → ALARM (📧 notificación), 10:30 → ALARM, 10:45 → ALARM. No necesariamente recibimos tres correos solo porque sigue en ALARM — el evento importante fue OK → ALARM.</p>
          <p>También podemos configurar otra acción para ALARM → OK, para saber cuándo comenzó y cuándo dejó de cumplirse la condición. Conviene notificar OK depende del flujo operacional: puede ser útil, pero con 200 alarmas puede duplicar el volumen de mensajes — diseñamos según necesidad.</p>
        </section>

        <section className="lesson-section">
          <h3>32-35. INSUFFICIENT_DATA y nuestro diseño sencillo</h3>
          <p>También podemos configurar una acción al entrar en INSUFFICIENT_DATA, aunque no siempre necesitamos notificar todos los estados — el significado depende del caso. Para un heartbeat, perder datos podría ser importante; en otra métrica, quizá no.</p>
          <p>Para estudiantes iniciales utilizaremos: Estado ALARM, Action SNS notification. Nada más — primero dominamos el flujo principal.</p>
        </section>

        <section className="lesson-section">
          <h3>36-39. Qué contiene el mensaje y nombres útiles</h3>
          <p>Una notificación de cambio de estado puede incluir nombre de la alarma, nuevo estado, motivo del cambio, fecha/hora, e información asociada.</p>
          <Nota><p>Imaginen recibir "ALARM: alarm-17". ¿De qué sistema? ¿De qué recurso? Mejor "ALARM: prod-cloudshop-web-high-cpu", mucho más útil. Podemos agregar una descripción como "CPU promedio de capa web sobre 80% durante 15 minutos" — ahora el mensaje tiene contexto operacional.</p></Nota>
          <p>SNS no decide a quién llamar después: no sabe quién está de turno, quién debe investigar, ni cuánto tiempo tiene para responder. Eso pertenece al proceso operacional del equipo — la tecnología no reemplaza organización.</p>
        </section>

        <section className="lesson-section">
          <h3>40-44. Un Topic puede tener varios suscriptores</h3>
          <Flow steps={[{ icon: 'bell', label: 'cloudshop-alerts' }, { icon: 'user', label: 'operaciones@empresa.cl' }, { icon: 'user', label: 'soporte@empresa.cl' }]} />
          <p>Publicamos una vez, SNS distribuye a los suscriptores — modelo uno a muchos.</p>
          <Dialogo>CloudWatch no necesita conocer a Ana, Pedro y Camila. Solo dice "publica este mensaje en cloudshop-alerts". SNS mira quién está suscrito y entrega.</Dialogo>
          <p>Esto desacopla: si mañana agregamos otro-equipo@empresa.cl, modificamos la suscripción del Topic sin rediseñar todas las alarmas.</p>
          <Nota><p>Pero tampoco enviamos todo a todos. Un solo Topic <code>empresa-alerts</code> mezclando CPU alta, facturación, base caída, marketing, backups y desarrollo para toda la empresa produce ruido. Podemos considerar Topics por propósito: <code>prod-critical-alerts</code>, <code>database-alerts</code>, <code>development-alerts</code>. Para nuestro laboratorio basta <code>cloudshop-alerts</code>.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>45-46. Fatiga de alertas vuelve</h3>
          <p>Imaginemos CPU &gt; 50%, 1 de 1, donde cada cambio genera avisos: CPU alta, CPU normal, CPU alta, CPU normal... En poco tiempo, el equipo deja de mirar. Una alerta ignorada es casi equivalente a no tener alerta.</p>
          <Flow steps={[{ label: 'Mala Alarm' }, { label: 'muchos cambios' }, { icon: 'bell', label: 'SNS' }, { label: 'muchos mensajes' }, { label: 'equipo saturado' }]} />
          <p>Por eso la Clase 3 era necesaria antes de esta: SNS no soluciona una alarma mal diseñada, solo distribuye sus consecuencias más rápido.</p>
        </section>

        <section className="lesson-section">
          <h3>47-53. Laboratorio conceptual completo</h3>
          <InfoBox title="Paso 1-2: Topic y Subscription" items={['SNS → Create Topic → cloudshop-alerts', 'Create Subscription → Protocol: Email → Endpoint: correo-del-estudiante']} />
          <p><strong>Paso 3:</strong> abrimos el correo, buscamos "AWS Notifications" y hacemos Confirm subscription. No seguimos hasta tener Confirmed ✅.</p>
          <p><strong>Paso 4:</strong> mensaje de prueba — SNS Topic → Publish message, Subject "Prueba CloudShop", Message "Sistema de alertas funcionando". Resultado esperado: correo recibido.</p>
          <p><strong>Paso 5:</strong> en CloudWatch → Alarms → cloudshop-web-high-cpu, configuramos When alarm is: In alarm, Send notification to: cloudshop-alerts.</p>
          <p><strong>Paso 6:</strong> provocamos o simulamos CPU &gt; threshold durante los períodos requeridos — OK → ALARM, y CloudWatch ejecuta SNS.</p>
          <p>Resultado esperado: recibimos un mensaje indicando Alarm: cloudshop-web-high-cpu, State: ALARM, junto con la razón del cambio. Ahora tenemos detección + aviso.</p>
        </section>

        <section className="lesson-section">
          <h3>54. Pero recibir el correo no resuelve el problema</h3>
          <Nota><p>"CPU alta" nos dice que debemos investigar. No significa "reinicie EC2". La siguiente decisión depende del contexto: podemos mirar otras métricas, Auto Scaling, RDS, aplicación.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>55-61. Seis diagnósticos</h3>
          <QaItem question="Alarma en ALARM, no llega email. ¿Qué revisamos?" answer="¿Alarm action configurada? → ¿Topic correcto? → ¿Subscription existe? → ¿Subscription está Confirmed? → ¿Email llegó a spam? → ¿SNS puede entregar? No recreamos todo CloudWatch inmediatamente." />
          <QaItem question="SNS test message → email ✅, pero Alarm → correo ❌. ¿Qué sabemos e investigamos?" answer="Sabemos que SNS + email funcionan. Investigamos la CloudWatch Alarm Action y si ocurrió realmente una transición al estado configurado — diagnóstico por aislamiento, mucho mejor que 'debe ser AWS'." />
          <QaItem question="Alarm → ALARM ✅, Topic ✅, Subscription: Pending confirmation. ¿Problema y solución?" answer="Suscripción no confirmada. Solución: confirmar desde el correo." />
          <QaItem question="La alarma está en ALARM desde ayer. Hoy corregimos el correo y esperamos un nuevo mensaje, pero no llega. ¿Por qué?" answer="Puede que simplemente no haya ocurrido una nueva transición de estado — las acciones de notificación normalmente se ejecutan al producirse la transición. Podemos forzar ALARM → OK → ALARM mediante una prueba controlada para generar una nueva transición." />
          <QaItem question="Alarm → development-alerts, pero estamos mirando production-alerts. ¿Qué ocurrió?" answer="Topic equivocado — por eso nombres claros importan." />
          <QaItem question="SNS dice 'Delivered' pero el usuario dice 'nunca llegó'. ¿Qué revisamos antes de reconstruir infraestructura?" answer="Spam, Promotions, filtros del correo." />
        </section>

        <section className="lesson-section">
          <h3>63-66. Actividades</h3>
          <QaItem question="Detecta CPU alta / Distribuye el mensaje / Define quién recibe / Recibe el mensaje / Contiene varias suscripciones" answer="CloudWatch Alarm / SNS / Subscription / Subscriber / Topic." />
          <QaItem question="Ordena: Email, SNS Topic, Metric, Subscription, CloudWatch Alarm" answer="Metric → CloudWatch Alarm → SNS Topic → Subscription → Email." />
          <QaItem question="Alarm ✅, Topic ✅, Subscription ✅, pero el correo no llega. Subscription: Pending confirmation. ¿Qué falta?" answer="Confirmar la suscripción." />
          <QaItem question="CPU > 80% / ALARM / Enviar correo / SNS" answer="Detección / Resultado de evaluación / Comunicación / Distribución." />
        </section>

        <section className="lesson-section">
          <h3>67-70. Caso UniversidadCloud y alerta accionable</h3>
          <Nota><p>Queremos que el equipo se entere cuando HealthyHostCount = 0. Creamos la alarma universidad-no-healthy-targets, Action → universidad-alerts, Subscribers: operaciones y soporte. Resultado: ambos equipos pueden enterarse.</p></Nota>
          <p>¿Debemos avisar a todos por CPU alta? No necesariamente — quizá CPU alta es responsabilidad de operaciones, mientras pago rechazado puede interesar a otro equipo. El destino de una alerta debería corresponder a quien pueda actuar.</p>
          <InfoBox title="Una notificación útil podría responder" items={['¿Qué ocurrió?', '¿Dónde?', '¿Cuándo?', '¿Qué condición se superó?', '¿Qué debería investigarse?']} />
          <p>No queremos un correo que solo diga "ERROR". Un ejemplo mejor: "CloudShop Web CPU High — CPU promedio de la capa web superó 80% durante 15 minutos. Revisar: Auto Scaling, RequestCount, cantidad de instancias." Esto convierte una alarma en una herramienta operacional.</p>
        </section>

        <section className="lesson-section">
          <h3>71-72. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El gerente propone: "enviemos todas las alarmas a todos los trabajadores para asegurarnos de que alguien las vea." No estoy de acuerdo porque aumenta rápidamente el ruido y provoca fatiga de alertas. Esto es lo que haría en su lugar: enviar cada alerta al equipo que realmente pueda actuar. El riesgo de su enfoque es que las notificaciones críticas terminen ignoradas junto con cientos de mensajes irrelevantes.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: "si CloudWatch está en ALARM, SNS debería mandar un correo cada minuto hasta que alguien lo arregle." No estoy de acuerdo porque las acciones normales de una alarma se ejecutan principalmente cuando ocurre el cambio de estado, no como un sistema de recordatorios repetitivos. Esto es lo que haría en su lugar: diseñar un proceso de incidentes o escalamiento apropiado si necesitamos recordatorios. El riesgo de su enfoque es asumir un comportamiento que CloudWatch no está configurado para realizar.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>73-74. Monitorear el monitoreo</h3>
          <Nota><p>CloudWatch puede estar ALARM ✅ y SNS puede tener un problema de entrega. SNS publica métricas propias en CloudWatch, incluyendo NumberOfNotificationsFailed, que puede usarse para monitorear fallos de entrega. Esto nos muestra algo interesante: incluso nuestro sistema de alertas puede ser monitoreado — observabilidad empieza a convertirse en una pequeña cebolla tecnológica.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>75-76. RETO DE LA CLASE</h3>
          <Nota><p>EventCloud tiene una alarma eventcloud-high-cpu: CPU Average &gt; 80%, 3 de 3 períodos. Queremos avisar a operaciones@eventcloud.cl. Diseña el flujo.</p></Nota>
          <Reveal label="Ver la solución esperada">
            <Flow steps={[
              { icon: 'bar-chart', label: 'CPUUtilization' }, { icon: 'alert-triangle', label: 'eventcloud-high-cpu' }, { icon: 'bell', label: 'eventcloud-alerts' },
              { icon: 'link', label: 'Email Subscription' }, { icon: 'user', label: 'operaciones@eventcloud.cl' },
            ]} />
            <p>Después: Confirm Subscription ✅, y asociamos el Topic como acción de la alarma.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>77-79. Retos nivel 2, 3 y 4</h3>
          <QaItem question="La alarma entra en ALARM pero no llega mensaje. SNS test message → email ✅. ¿Qué investigamos?" answer="La acción CloudWatch Alarm → SNS y la transición de estado." />
          <QaItem question="SNS test no llega, Subscription: Pending confirmation. ¿Dónde está el problema?" answer="En la suscripción, no en CloudWatch." />
          <QaItem question="Recibimos 20 correos en una hora de varias alarmas que cambian constantemente. ¿Qué problema operacional aparece?" answer="Fatiga de alertas. Debemos revisar thresholds, períodos, Datapoints to Alarm, destinatarios y relevancia de las alarmas." />
        </section>

        <section className="lesson-section">
          <h3>80. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'SNS detecta CPU alta.', correct: false },
            { text: 'CloudWatch Alarm puede enviar una notificación mediante SNS.', correct: true },
            { text: 'Una suscripción por email debe confirmarse.', correct: true },
            { text: 'Un Topic puede tener varios suscriptores.', correct: true },
            { text: 'Si una alarma permanece en ALARM, CloudWatch envía obligatoriamente un correo cada minuto.', correct: false },
            { text: 'Podemos configurar notificación para ALARM, OK o INSUFFICIENT_DATA.', correct: true },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>81. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>82. Reto oral</h3>
          <Dialogo>Explícame SNS sin utilizar las palabras SNS, AWS, Topic, Subscription, mensaje, correo, notificación, alarma, CloudWatch, suscriptor ni enviar.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Es un intermediario que recibe un aviso desde un punto común y lo distribuye entre uno o varios destinatarios previamente registrados."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>84. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>CloudWatch Alarm</td><td>Detecta una condición</td></tr>
              <tr><td>SNS</td><td>Distribuye avisos</td></tr>
              <tr><td>Topic</td><td>Canal de mensajes</td></tr>
              <tr><td>Subscription</td><td>Conecta Topic con destinatario</td></tr>
              <tr><td>Subscriber</td><td>Destinatario</td></tr>
              <tr><td>Email</td><td>Tipo de endpoint</td></tr>
              <tr><td>Pending Confirmation</td><td>Aún no puede recibir</td></tr>
              <tr><td>Confirmed</td><td>Suscripción activa</td></tr>
              <tr><td>ALARM Action</td><td>Acción al entrar en ALARM</td></tr>
              <tr><td>OK Action</td><td>Acción al recuperarse</td></tr>
              <tr><td>SNS Test</td><td>Comprueba canal de notificación</td></tr>
              <tr><td>Alarm Fatigue</td><td>Demasiados avisos poco útiles</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>85. Ticket de salida</h3>
          <Dialogo>Una alarma de CloudWatch está correctamente en ALARM y asociada a un SNS Topic, pero el destinatario no recibe ningún correo. La suscripción aparece como Pending Confirmation. ¿Dónde está el problema?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>La alarma y el Topic pueden estar funcionando correctamente, pero la suscripción de correo aún no fue confirmada. El destinatario debe confirmar la suscripción antes de poder recibir los mensajes publicados en el Topic.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 5</div>
          <ConceptBadge icon="alert-triangle">CloudShop Alarm — CPU promedio mayor que 80%</ConceptBadge>
          <p>Perfecto, ya sabemos que algo está ocurriendo. ¿Pero por qué? Una alarma puede decir "CPU alta", pero no necesariamente "ERROR conexión DB", "ERROR timeout", "ERROR API pagos" o "ERROR aplicación". Para responder "¿qué estaba haciendo realmente la aplicación cuando falló?" necesitamos registros detallados.</p>
          <ConceptBadge icon="file-text">Módulo 8 · Clase 5 — CloudWatch Logs: cómo investigar qué ocurrió dentro de una aplicación cuando las métricas y alarmas nos dicen que algo anda mal</ConceptBadge>
          <span className="tag tag-outline">Módulo 8 · Clase 5 · próximamente</span>
        </div>

      </div>
    </div>
  );
}
