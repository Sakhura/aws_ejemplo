import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué es un log?', options: [{ text: 'Registro de eventos del sistema.', correct: true }, { text: 'Security Group.', correct: false }, { text: 'Load Balancer.', correct: false }, { text: 'AMI.', correct: false }] },
  { q: '¿Qué es un Log Group?', options: [{ text: 'Contenedor lógico de logs relacionados.', correct: true }, { text: 'Una EC2.', correct: false }, { text: 'Métrica.', correct: false }, { text: 'Alarma.', correct: false }] },
  { q: '¿Qué es un Log Stream?', options: [{ text: 'Secuencia de eventos de una fuente.', correct: true }, { text: 'Target Group.', correct: false }, { text: 'Snapshot.', correct: false }, { text: 'Dashboard.', correct: false }] },
  { q: '¿Qué es un Log Event?', options: [{ text: 'Un registro individual asociado a un momento.', correct: true }, { text: 'Un Topic SNS.', correct: false }, { text: 'Una subnet.', correct: false }, { text: 'Una alarma.', correct: false }] },
  { q: '¿Qué nivel suele representar información normal?', options: [{ text: 'INFO.', correct: true }, { text: 'ERROR.', correct: false }, { text: 'FATAL necesariamente.', correct: false }, { text: 'ALARM.', correct: false }] },
  { q: '¿Qué nivel suele indicar una advertencia?', options: [{ text: 'WARN.', correct: true }, { text: 'INFO.', correct: false }, { text: 'OK.', correct: false }, { text: 'SUM.', correct: false }] },
  { q: '¿Qué nivel suele indicar que una operación falló?', options: [{ text: 'ERROR.', correct: true }, { text: 'INFO.', correct: false }, { text: 'Average.', correct: false }, { text: 'Topic.', correct: false }] },
  { q: '¿Qué herramienta ayuda a consultar grandes cantidades de logs?', options: [{ text: 'CloudWatch Logs Insights.', correct: true }, { text: 'IAM.', correct: false }, { text: 'Route Table.', correct: false }, { text: 'Auto Scaling Group.', correct: false }] },
  { q: '¿Por qué es importante el timestamp?', options: [{ text: 'Permite relacionar eventos con el momento del incidente.', correct: true }, { text: 'Define el Instance Type.', correct: false }, { text: 'Cambia la VPC.', correct: false }, { text: 'Define un Target Group.', correct: false }] },
  { q: '¿Debemos incluir passwords en logs para tener más información?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
];

export default function Modulo8Clase5() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 8 · Clase 5</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 8 · Clase 5: CloudWatch Logs, cómo investigar qué ocurrió dentro de una aplicación cuando las métricas y alarmas nos dicen que algo anda mal</h2>
      <p className="lesson-subtitle">
        La métrica nos dice que algo cambió; el log nos ayuda a reconstruir qué estaba ocurriendo cuando cambió.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + lectura de registros + búsqueda + diagnóstico + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 8 · Clases 1 a 4</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es un log y para qué sirve, y diferenciar métrica, alarma y log.</li>
            <li>Explicar qué es CloudWatch Logs, comprender qué es un Log Group, un Log Stream y un Log Event.</li>
            <li>Leer registros sencillos y reconocer mensajes INFO, WARN y ERROR.</li>
            <li>Comprender que no todos los logs significan fallas.</li>
            <li>Buscar eventos dentro de un rango de tiempo y reconocer patrones repetidos.</li>
            <li>Comprender de manera introductoria CloudWatch Logs Insights.</li>
            <li>Relacionar una alarma con los logs del mismo período y comprender qué es la retención de logs.</li>
            <li>Diagnosticar un incidente básico con métricas + alarmas + logs.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-3. Volvamos a CloudShop</h3>
          <Flow steps={[{ icon: 'bar-chart', label: 'CPUUtilization' }, { icon: 'alert-triangle', label: 'Alarm' }, { icon: 'bell', label: 'SNS' }, { icon: 'user', label: '"CPU alta"' }]} />
          <p>El equipo recibe "CloudShop Web CPU High". Perfecto — sabemos que CPU &gt; 80% durante 15 minutos. Pero todavía no sabemos: ¿por qué? La CPU alta podría relacionarse con aumento real de usuarios, error de programación, proceso repetitivo, problemas de base de datos, tarea programada, o reintentos contra otro servicio. La alarma detectó el síntoma. Ahora debemos investigar.</p>
        </section>

        <section className="lesson-section">
          <h3>4-6. Aquí aparecen los Logs</h3>
          <p>Un <strong>log</strong> es un registro de eventos que fueron ocurriendo dentro de un sistema — por ejemplo: 20:01 Usuario inició sesión, 20:02 Producto consultado, 20:03 Pedido creado, 20:03 Pago aprobado. Eso es una historia ordenada de eventos.</p>
          <Dialogo>Un guardia de seguridad escribe: "08:00 se abre edificio, 08:15 ingresa proveedor, 09:20 se activa alarma puerta 3, 09:22 se revisa puerta 3, 09:25 problema resuelto". Si alguien pregunta "¿qué ocurrió a las 09:20?", consultamos la bitácora. CloudWatch Logs cumple un papel parecido.</Dialogo>
          <p>Amazon CloudWatch Logs permite centralizar, almacenar, buscar y analizar registros provenientes de aplicaciones y sistemas — el lugar donde podemos reunir las bitácoras de nuestros sistemas sin entrar servidor por servidor.</p>
        </section>

        <section className="lesson-section">
          <h3>7-9. Métrica vs log vs alarma: los tres trabajan juntos</h3>
          <RoleGrid roles={[
            { icon: 'bar-chart', label: 'Metric', desc: '¿Qué está cambiando?' },
            { icon: 'alert-triangle', label: 'Alarm', desc: '¿Cuándo me preocupo?' },
            { icon: 'file-text', label: 'Log', desc: '¿Qué ocurrió?' },
          ]} />
          <Flow steps={[
            { label: 'Aplicación genera eventos' }, { label: 'Métricas muestran comportamiento' }, { label: 'Alarma detecta condición' },
            { label: 'Equipo recibe aviso' }, { label: 'Equipo revisa logs' }, { label: 'Investiga causa' },
          ]} />
          <p>Este es el flujo de investigación que queremos aprender.</p>
        </section>

        <section className="lesson-section">
          <h3>10-14. Log Group y Log Stream</h3>
          <p>CloudWatch organiza logs principalmente mediante <strong>Log Groups</strong>: una carpeta lógica donde reunimos registros relacionados — por ejemplo, <code>/cloudshop/web</code> o <code>/cloudshop/api</code>.</p>
          <p>Dentro de un Log Group podemos tener <strong>Log Streams</strong>: una secuencia de registros que viene de una fuente concreta. Recordemos nuestro Auto Scaling Group con A, B, C: todos ejecutan la misma aplicación, pero queremos poder saber cuál generó determinado mensaje. Entonces: Log Group = la aplicación, Log Stream = la fuente concreta.</p>
          <Dialogo>Tenemos el libro de incidentes del hotel, pero separamos Recepción, Restaurante, Piso 1, Piso 2. Todos pertenecen al mismo hotel, pero vienen de lugares distintos.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>15-19. Log Event y correlacionar por tiempo</h3>
          <p>Dentro de un Log Stream encontramos <strong>Log Events</strong>: cada mensaje individual registrado en un momento determinado, por ejemplo <code>20:15:33 ERROR Database connection timeout</code>.</p>
          <Flow steps={[{ label: 'Log Group' }, { label: 'Log Stream' }, { label: 'Log Events' }]} />
          <p>Un evento normalmente incluye Timestamp + Message. La hora importa porque nuestra alarma ocurrió a las 20:15 — queremos revisar qué estaba pasando alrededor de ese momento.</p>
          <QaItem question="Alarma a las 20:15 CPU High. Buscamos logs entre 20:10 y 20:20 y encontramos varios 'ERROR DB timeout' y 'RETRY' alrededor de esa hora. ¿Qué tenemos?" answer="Una pista. No significa todavía 'RDS es definitivamente la causa', pero con CPU alta + muchos reintentos DB + mismo momento, la hipótesis se vuelve más fuerte. Eso se llama correlacionar." />
        </section>

        <section className="lesson-section">
          <h3>20-24. Tipos de mensajes: INFO, WARN, ERROR</h3>
          <RoleGrid roles={[
            { icon: 'check-circle', label: 'INFO', desc: 'Información sobre una operación normal (ej. "Application started")' },
            { icon: 'alert-triangle', label: 'WARN', desc: 'Algo merece atención, pero el sistema todavía puede continuar' },
            { icon: 'x-circle', label: 'ERROR', desc: 'Una operación que falló o una condición importante' },
          ]} />
          <Nota><p>Un ERROR no significa necesariamente que toda la aplicación esté caída. Con 1.000 solicitudes de las cuales 5 fallan, podemos generar 5 ERROR pero la aplicación sigue atendiendo otras 995 — por eso también necesitamos contexto.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>25-27. Los patrones importan</h3>
          <p>No buscamos solamente ERROR. Cinco líneas seguidas de "INFO Retry payment" aunque digan INFO, la repetición puede revelar un comportamiento anormal. Un log aislado "ERROR timeout" puede ser un evento puntual, pero el mismo error repetido durante varios minutos es otra historia — igual que las métricas, frecuencia y tendencia importan.</p>
          <ConceptBadge icon="search">No leas solamente una línea. Mira qué ocurrió antes y después.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>28-30. Buscar logs con método</h3>
          <p>En CloudWatch Logs podemos filtrar o buscar eventos: ERROR, timeout, payment, según el incidente. No buscamos "todo" — con millones de registros, leer desde el primero no funciona. Usamos rango de tiempo + palabra o patrón + fuente correcta para reducir el problema.</p>
          <InfoBox title="Método de investigación" items={['¿Cuándo ocurrió?', '¿Qué componente parece afectado?', '¿Qué Log Group corresponde?', '¿Qué términos buscamos?', '¿Qué ocurrió justo antes?', '¿Se repite?']} />
        </section>

        <section className="lesson-section">
          <h3>31-35. Ejemplo CloudShop: correlacionamos métricas y logs</h3>
          <p>Recibimos la alarma cloudshop-high-error-rate a las 19:35. Entramos CloudWatch → Logs → Log groups → /cloudshop/web, rango 19:25–19:45, buscamos ERROR. Encontramos varios "payment provider timeout" alrededor de esa hora — muchos errores relacionados con el servicio de pago.</p>
          <Nota><p>¿Podemos afirmar causa raíz? Todavía no necesariamente — podría ser el proveedor de pagos, nuestra conexión, DNS, credenciales, o un timeout demasiado bajo. Pero hemos reducido muchísimo el campo de investigación.</p></Nota>
          <p>Ahora vemos EC2 CPU 30%, RDS CPU 25%, ALB Requests normal, y logs con "ERROR payment provider timeout" — la hipótesis cambia: no parece saturación de EC2, investigamos la integración con pagos. Requests normales nos dice que la carga no cambió mucho; payment timeout nos dice que una parte específica está fallando. Esa combinación es mucho más útil.</p>
        </section>

        <section className="lesson-section">
          <h3>36-38. Varios Log Groups por propósito</h3>
          <p>Podemos tener <code>/cloudshop/web</code>, <code>/cloudshop/api</code>, <code>/cloudshop/payments</code>, <code>/cloudshop/jobs</code> — separar responsabilidades facilita la investigación y la retención. Un único Log Group con todo mezclado puede ser difícil de navegar. Pero tampoco creamos un Log Group por cada línea sin sentido — la estructura debe reflejar cómo pensamos la aplicación.</p>
        </section>

        <section className="lesson-section">
          <h3>39-41. Retención de logs</h3>
          <p>Los logs pueden almacenarse durante un período configurado — <strong>retención</strong> significa cuánto tiempo queremos conservar esos registros: 7 días, 30 días, 90 días, 1 año, según necesidad.</p>
          <Nota><p>Más logs + más tiempo = más almacenamiento y potencialmente más costo y complejidad. No siempre existe necesidad operacional de conservar todo eternamente. Logs de laboratorio quizá pocos días; aplicación productiva quizá más tiempo; requerimientos regulatorios pueden exigir períodos específicos. No existe una respuesta universal.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>42-45. Logs pueden contener información sensible</h3>
          <p>No deberíamos registrar indiscriminadamente contraseñas, tokens, secretos o datos sensibles completos — un log también es información almacenada.</p>
          <Nota><p>Ejemplo malo: "INFO Login user=ana password=SuperSecreta123". Ejemplo mejor: "INFO Login successful user_id=4821" — tenemos información útil, sin guardar la contraseña. Un buen log debería ayudar a responder qué ocurrió, cuándo, en qué componente, con qué solicitud y cuál fue el resultado, sin exponer información innecesariamente sensible.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>46-47. Correlation ID, primer vistazo</h3>
          <p>En aplicaciones distribuidas podemos agregar un identificador a una solicitud, por ejemplo <code>request_id=ABC123</code>. Entonces encontramos WEB, API y PAYMENT todos con el mismo request_id, lo que permite seguir una misma solicitud entre varios componentes.</p>
          <Dialogo>Enviamos un paquete con tracking 12345. Podemos seguirlo por bodega, camión, centro de distribución, entrega. Un request_id cumple conceptualmente una función parecida.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>48-52. CloudWatch Logs Insights</h3>
          <p>Cuando tenemos muchos logs, CloudWatch Logs Insights permite consultar y analizar registros utilizando un lenguaje de consulta — una herramienta que nos ayuda a hacer preguntas sobre muchos logs sin leerlos uno por uno.</p>
          <pre className="codeblock">{`fields @timestamp, @message
| filter @message like /ERROR/
| sort @timestamp desc
| limit 20`}</pre>
          <p>No necesitamos memorizarla, solo entender qué pide: mostrar hora y mensaje → quedarse con ERROR → ordenar recientes primero → mostrar 20. En vez de enseñar "código extraño", lo traducimos: ¿qué quiero saber? → ¿qué registros necesito? → ¿qué filtro aplico? También podemos contar errores o ver qué mensaje se repite más — esto transforma miles de líneas en información resumida.</p>
        </section>

        <section className="lesson-section">
          <h3>53-54. Log Alarm y el flujo de incidente completo</h3>
          <p>CloudWatch también permite crear mecanismos de alarma relacionados con logs — para este curso lo dejamos como reconocimiento. Primero dominamos Logs → buscar → investigar.</p>
          <Flow steps={[{ icon: 'bar-chart', label: 'Metric' }, { icon: 'alert-triangle', label: 'Alarm' }, { icon: 'bell', label: 'SNS' }, { icon: 'user', label: 'Equipo' }, { icon: 'file-text', label: 'Logs' }, { icon: 'search', label: 'Investigación' }]} />
        </section>

        <section className="lesson-section">
          <h3>55-58. Cuatro diagnósticos</h3>
          <QaItem question="CPU 95%. Logs: 'INFO Generating report' repetido a la misma hora. ¿Hipótesis?" answer="Un proceso de generación de informes podría estar consumiendo CPU. No concluimos todavía, pero sabemos dónde mirar." />
          <QaItem question="Métrica Errors ↑. Logs: 'ERROR Database authentication failed' repetido. ¿Qué investigamos primero?" answer="Credenciales, secreto, configuración, acceso a base — no CPU primero." />
          <QaItem question="ALB latency ↑. Logs: 'WARN Database query took 8.2/9.1 seconds'. ¿Qué pista entrega?" answer="Consultas lentas — después podemos revisar RDS." />
          <QaItem question="Target Group: EC2-B → Unhealthy. Logs de EC2-B: 'ERROR Application failed to start'. ¿Qué conectamos?" answer="Health Check + Log: el Health Check dice que no está listo, el log dice qué ocurrió al iniciar. Conecta el Módulo 7 ('B está mala') con el Módulo 8 ('B falló porque no pudo iniciar la aplicación')." />
        </section>

        <section className="lesson-section">
          <h3>60-63. Tres errores comunes de investigación</h3>
          <QaItem question="Tenemos 'payment timeout' pero miramos /cloudshop/web cuando los detalles están en /cloudshop/payments. Resultado: 'no hay errores'. ¿Qué significa eso?" answer="No significa que no existan — quizá estamos mirando la fuente equivocada." />
          <QaItem question="Incidente a las 20:15, pero buscamos ayer 08:00–09:00. ¿Qué encontraremos?" answer="Nada relevante. El primer filtro casi siempre debería ser tiempo." />
          <QaItem question="Entramos a CloudWatch y el Log Group está vacío. ¿Significa que la aplicación no genera ningún log?" answer="No automáticamente. Puede ser que la aplicación no esté enviando logs, agente/configuración incorrecta, permisos insuficientes, ruta equivocada, o fuente incorrecta." />
          <Nota><p>EC2 no envía mágicamente cada archivo interno de log hacia CloudWatch. Necesitamos configurar cómo recopilar determinados logs del sistema operativo o aplicación — para eso aparecerá el CloudWatch Agent en la Clase 6.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>64-67. Laboratorio conceptual</h3>
          <p>Supongamos que ya tenemos /cloudshop/web con streams EC2-A y EC2-B. La alarma ocurrió a las 14:25. Seleccionamos rango 14:15–14:35 y buscamos ERROR.</p>
          <p>Resultados: varios "ERROR DB timeout" y un "WARN retrying request" alrededor de las 14:25 — existen errores repetidos relacionados con DB alrededor del incidente.</p>
          <p>Correlacionamos: CloudWatch Metrics muestra RDS connections ↑ y RDS CPU ↑, junto con los logs de DB timeout — nuestra hipótesis: la base está bajo presión o no responde con suficiente rapidez. Eso merece investigación en RDS.</p>
        </section>

        <section className="lesson-section">
          <h3>68-72. Actividades</h3>
          <QaItem question="CPU = 95% / Si CPU > 80% durante 15 min / ERROR Database timeout / HealthyHostCount = 0 / WARN API response slow" answer="Métrica / Alarma / Log / Métrica / Log." />
          <QaItem question="/cloudshop/web / EC2-A / '20:15 ERROR timeout'" answer="Log Group / Log Stream / Log Event." />
          <QaItem question="'Application started successfully' / 'Response slower than expected' / 'Database connection failed'" answer="INFO / WARN / ERROR." />
          <QaItem question="Alarma payment failures. Tenemos /cloudshop/web, /cloudshop/payments, /cloudshop/jobs. ¿Dónde miramos primero?" answer="/cloudshop/payments." />
          <QaItem question="Incidente a las 15:32. ¿Últimos 90 días completos o 15:20–15:45?" answer="15:20–15:45 entrega mejor resolución contextual para una investigación inicial." />
        </section>

        <section className="lesson-section">
          <h3>73-74. RETO DE LA CLASE</h3>
          <Nota><p>EventCloud, a las 19:10 recibimos eventcloud-high-latency. ALB Requests normal, EC2 CPU 35%, RDS CPU 40%. Logs: 19:08 WARN payment API response 6s, 19:09 ERROR payment API timeout (×2), 19:10 ERROR payment API timeout, 19:11 WARN retry payment. ¿Qué parece más sospechoso?</p></Nota>
          <Reveal label="Ver la respuesta esperada">
            <p>La evidencia apunta hacia problemas o lentitud en la integración con el servicio de pagos: requests normales + EC2 CPU normal + RDS CPU normal + múltiples timeouts de pagos. No tenemos prueba absoluta, pero es la primera línea razonable de investigación.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>75-77. Retos nivel 2, 3 y 4</h3>
          <QaItem question="CPU 95%. Logs: 'INFO report generation started', 'INFO processing 500000 records' repetido. ¿Qué proceso podría relacionarse con la CPU alta?" answer="La generación/procesamiento del informe." />
          <QaItem question="HealthyHostCount 1 → 0. Log de EC2: 'ERROR failed to bind port 80'. ¿Qué relación establecemos?" answer="La aplicación no pudo iniciar correctamente en el puerto esperado, por lo que el Health Check puede fallar." />
          <QaItem question="Tenemos 10.000 errores, pero buscamos en los últimos 5 minutos y no aparece nada. El incidente ocurrió ayer. ¿Qué está mal?" answer="El rango temporal." />
        </section>

        <section className="lesson-section">
          <h3>78-81. Dos propuestas que rechazar y una cadena de errores</h3>
          <Nota>
            <p>El gerente propone: "guardemos absolutamente todo en logs, incluyendo passwords, así tendremos más información para investigar." No estoy de acuerdo porque los logs también son información almacenada y pueden convertirse en una fuente de exposición de secretos. Esto es lo que haría en su lugar: registrar contexto útil sin incluir credenciales ni secretos. El riesgo de su enfoque es transformar el sistema de observabilidad en una fuga de información sensible.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: "si encuentro un ERROR, ya sé cuál fue la causa." No estoy de acuerdo porque un mensaje de error puede ser consecuencia de otro problema anterior. Esto es lo que haría en su lugar: revisar los eventos alrededor del error y correlacionarlos con métricas y otros componentes. El riesgo de su enfoque es corregir un síntoma mientras la causa real permanece activa.</p>
          </Nota>
          <p>Podemos ver "ERROR unable to process order", pero antes "ERROR payment timeout", y antes "WARN DNS resolution slow" — el último error puede ser solo el final de la historia. Por eso miramos antes y después.</p>
        </section>

        <section className="lesson-section">
          <h3>81-82. Logs no reemplazan métricas</h3>
          <p>Si tenemos millones de líneas, podríamos encontrar eventos, pero para saber cuántos errores hay, si están aumentando, o desde cuándo, una métrica puede ser mucho más eficiente. Logs y métricas se complementan: la métrica resume (tendencia), el log explica (contenido). Juntos son más poderosos.</p>
        </section>

        <section className="lesson-section">
          <h3>83. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'Un log es un registro de eventos.', correct: true },
            { text: 'Log Group y Log Stream son exactamente lo mismo.', correct: false },
            { text: 'Un Log Stream puede representar una fuente específica.', correct: true },
            { text: 'Todos los mensajes ERROR significan caída completa del sistema.', correct: false },
            { text: 'Podemos buscar logs por rango de tiempo.', correct: true },
            { text: 'Guardar secretos en logs es una buena práctica.', correct: false },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>84. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>85. Reto oral</h3>
          <Dialogo>Explícame para qué sirven los logs sin utilizar las palabras log, registro, evento, aplicación, sistema, error, CloudWatch, AWS, mensaje, archivo ni historial.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Son una bitácora ordenada de lo que fue ocurriendo, útil para reconstruir una situación y entender qué sucedía alrededor de un problema."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>87. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Log</td><td>Bitácora de eventos</td></tr>
              <tr><td>Log Group</td><td>Carpeta lógica</td></tr>
              <tr><td>Log Stream</td><td>Registros de una fuente</td></tr>
              <tr><td>Log Event</td><td>Evento individual</td></tr>
              <tr><td>Timestamp</td><td>Momento del evento</td></tr>
              <tr><td>INFO</td><td>Información normal</td></tr>
              <tr><td>WARN</td><td>Advertencia</td></tr>
              <tr><td>ERROR</td><td>Operación con problema</td></tr>
              <tr><td>Logs Insights</td><td>Consultar y analizar logs</td></tr>
              <tr><td>Retention</td><td>Tiempo de conservación</td></tr>
              <tr><td>Correlación</td><td>Relacionar logs y métricas</td></tr>
              <tr><td>Request ID</td><td>Seguir una solicitud</td></tr>
              <tr><td>Seguridad</td><td>No registrar secretos</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>88. Ticket de salida</h3>
          <Dialogo>CloudWatch Alarm indica latencia alta a las 14:20. EC2 y RDS muestran métricas normales, pero entre las 14:18 y 14:22 los logs repiten ERROR payment API timeout. ¿Qué información adicional aportan los logs?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>La alarma nos dice que existe una condición de latencia elevada, mientras los logs muestran que en el mismo período están ocurriendo múltiples timeouts relacionados con el servicio de pagos. Eso no prueba por sí solo la causa raíz, pero dirige la investigación hacia esa integración.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 6</div>
          <p>En una EC2 existen /var/log/messages, /var/log/httpd/, logs de aplicación, uso de memoria, uso de disco. ¿CloudWatch recibe automáticamente toda esta información interna solo porque la EC2 existe? No necesariamente. CloudWatch conoce muchas métricas de infraestructura, pero para recopilar memoria RAM, uso interno de disco y archivos de logs específicos, necesitamos un pequeño recolector dentro del servidor.</p>
          <ConceptBadge icon="settings">Módulo 8 · Clase 6 — CloudWatch Agent: cómo enviar memoria, disco y logs internos desde una EC2 hacia CloudWatch</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-8/clase-6" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 6: CloudWatch Agent →
          </Link>
        </div>

      </div>
    </div>
  );
}
