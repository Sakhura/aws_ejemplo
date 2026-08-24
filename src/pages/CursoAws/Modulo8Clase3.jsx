import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué es una CloudWatch Alarm?', options: [{ text: 'Una regla que evalúa una condición sobre una señal.', correct: true }, { text: 'Una EC2.', correct: false }, { text: 'Una base de datos.', correct: false }, { text: 'Una subnet.', correct: false }] },
  { q: '¿Qué es un Threshold?', options: [{ text: 'Límite de comparación.', correct: true }, { text: 'Namespace.', correct: false }, { text: 'Security Group.', correct: false }, { text: 'AMI.', correct: false }] },
  { q: '¿Qué significa Evaluation Periods?', options: [{ text: 'Cantidad de períodos considerados para evaluar.', correct: true }, { text: 'Cantidad de EC2.', correct: false }, { text: 'Cantidad de AZ.', correct: false }, { text: 'Número de usuarios.', correct: false }] },
  { q: '¿Qué significa Datapoints to Alarm?', options: [{ text: 'Cantidad de puntos que deben incumplir el threshold.', correct: true }, { text: 'Número de alarmas creadas.', correct: false }, { text: 'Número de logs.', correct: false }, { text: 'Cantidad de buckets.', correct: false }] },
  { q: '¿Qué significa OK?', options: [{ text: 'La condición de alarma no se está cumpliendo.', correct: true }, { text: 'Toda la infraestructura está perfecta.', correct: false }, { text: 'La alarma está eliminada.', correct: false }, { text: 'No existen datos.', correct: false }] },
  { q: '¿Qué significa ALARM?', options: [{ text: 'La condición definida se está cumpliendo.', correct: true }, { text: 'AWS se apagó.', correct: false }, { text: 'La métrica desapareció.', correct: false }, { text: 'El usuario cerró sesión.', correct: false }] },
  { q: '¿Qué significa INSUFFICIENT_DATA?', options: [{ text: 'No hay suficientes datos para determinar el estado.', correct: true }, { text: 'CPU está alta.', correct: false }, { text: 'RDS falló necesariamente.', correct: false }, { text: 'ALB está sano.', correct: false }] },
  { q: 'En una alarma 2 de 3, ¿deben incumplir los tres puntos?', options: [{ text: 'Sí.', correct: false }, { text: 'No, bastan al menos dos.', correct: true }] },
  { q: '¿Un único pico debe generar siempre una alarma?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Puede CloudWatch configurar qué hacer cuando faltan Data Points?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
];

export default function Modulo8Clase3() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 8 · Clase 3</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 8 · Clase 3: CloudWatch Alarms, cómo detectar automáticamente que una métrica entró en una condición preocupante</h2>
      <p className="lesson-subtitle">
        Una alarma compara una métrica con una condición y cambia de estado cuando esa condición se mantiene según las reglas que definimos.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + configuración guiada + interpretación + diagnóstico + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 8 · Clases 1 y 2</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es una CloudWatch Alarm y comprender qué es un Threshold.</li>
            <li>Comprender la relación entre métrica, estadística y período, y explicar qué son los Evaluation Periods.</li>
            <li>Comprender qué significa Datapoints to Alarm y diferenciar los estados OK, ALARM e INSUFFICIENT_DATA.</li>
            <li>Comprender una alarma tipo "M de N" y reconocer por qué no debemos alarmar por un único pico.</li>
            <li>Comprender de forma inicial cómo tratar datos faltantes.</li>
            <li>Crear conceptualmente una alarma sobre CPU y una alarma sobre disponibilidad.</li>
            <li>Diferenciar monitorear una métrica de actuar sobre una alarma.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-4. Eso no escala: aquí aparece CloudWatch Alarm</h3>
          <p>Ya sabemos observar Metric + Statistic + Period: CPUUtilization + Average + 5 minutes. Con 10:00 → 30%, 10:05 → 35%, 10:10 → 85%, 10:15 → 90%, 10:20 → 92%, ¿tenemos que quedarnos mirando este gráfico todo el día? No.</p>
          <Nota><p>Imaginen una persona frente a CloudWatch todo el día esperando "avísame si supera 80%". Necesitamos automatizar la vigilancia.</p></Nota>
          <p>Una <strong>CloudWatch Alarm</strong> observa una métrica o expresión y evalúa si cumple una condición definida. Las alarmas de métricas pueden estar en los estados OK, ALARM o INSUFFICIENT_DATA.</p>
          <Dialogo>Tenemos humo, pero no queremos mirar el techo cada treinta segundos. Instalamos un detector con una regla como "si detecto suficiente humo, activo alarma". En Cloud: métrica → condición → estado.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>6-9. Threshold y primera evaluación</h3>
          <p>Un <strong>Threshold</strong> es el límite con el cual comparamos la métrica — por ejemplo, CPU &gt; 80%.</p>
          <p>Con Metric CPUUtilization, Statistic Average, Period 5 minutes, Threshold 80%: preguntamos "¿el promedio de CPU del período supera 80%?"</p>
          <QaItem question="CPU Average = 40%, Threshold = 80%. ¿Resultado?" answer="OK, porque la condición preocupante no se está cumpliendo." />
          <p>Después, CPU Average = 92%: 92 &gt; 80, tenemos un Data Point que incumple el threshold. Pero aparece la parte importante: ¿un solo punto basta para activar la alarma?</p>
        </section>

        <section className="lesson-section">
          <h3>10-13. Evaluation Periods</h3>
          <Nota><p>Con 10:00 → 20%, 10:05 → 95%, 10:10 → 22%, si la alarma reaccionara inmediatamente al 95%, podría activarse por un pico aislado, generando ruido. Recordemos la Clase 2: 20, 20, 100, 20, 20 no es lo mismo que 90, 92, 95, 91, 94. Queremos distinguir un evento breve de un problema sostenido.</p></Nota>
          <p>Para eso usamos <strong>Evaluation Periods</strong>: cuántos períodos recientes CloudWatch considera al evaluar el estado de la alarma. Con Period 5 minutos y Evaluation Periods 3, estamos observando aproximadamente 15 minutos de evaluación.</p>
        </section>

        <section className="lesson-section">
          <h3>14-19. Datapoints to Alarm: M de N</h3>
          <p><strong>Datapoints to Alarm</strong> indica cuántos de esos puntos evaluados deben estar fuera del umbral para llevar la alarma a ALARM.</p>
          <QaItem question="Evaluation Periods = 3, Datapoints to Alarm = 3, Threshold CPU > 80%. Periodo 1 → 85%, Periodo 2 → 90%, Periodo 3 → 92%. ¿Resultado?" answer="ALARM. Cuando ambos valores son iguales, CloudWatch exige que todos esos períodos estén incumpliendo el umbral." />
          <QaItem question="Mismo threshold y '3 de 3', pero Periodo 1 → 85%, Periodo 2 → 40% (OK), Periodo 3 → 90%. ¿Resultado?" answer="OK, o no entra todavía en ALARM — tenemos 2 incumplimientos de 3, pero configuramos 3 de 3." />
          <p>Esto evita reaccionar demasiado rápido: un valor alto aislado no basta, queremos 85%, 90%, 92% de forma sostenida.</p>
          <p>También podemos configurar Evaluation Periods = 3, Datapoints to Alarm = 2 — eso se conoce como <strong>alarma M de N</strong>, donde M = 2 y N = 3. CloudWatch entra en ALARM si al menos 2 de los 3 puntos evaluados incumplen el threshold.</p>
          <Dialogo>Tenemos Lunes, Martes, Miércoles. La regla dice "si falta al menos 2 de los 3 días, activar alerta". Lunes falta, Martes asiste, Miércoles falta: cumple 2 de 3. CloudWatch utiliza la misma lógica conceptual.</Dialogo>
          <p>3 de 3 es más estricto en exigir continuidad. 2 de 3 tolera un período normal entre períodos problemáticos. No existe una configuración universal.</p>
        </section>

        <section className="lesson-section">
          <h3>22-24. Flapping y diseño con duración</h3>
          <Nota><p>Una alarma demasiado sensible (CPU &gt; 50%, Period 1 minuto, 1 de 1) podría entrar y salir de alarma constantemente: 49, 51 🚨, 48, 52 🚨, 49 — resultado: ruido. Llamamos <strong>flapping</strong> a los cambios frecuentes entre estados (OK → ALARM → OK → ALARM), lo que dificulta distinguir eventos importantes de simples oscilaciones.</p></Nota>
          <p>Preferimos diseñar con duración: CPU Average &gt; 80% durante 3 de 3 períodos de 5 minutos, para indicar carga alta sostenida aproximadamente durante 15 minutos — no porque 15 sea mágico, sino porque representa nuestro requisito.</p>
        </section>

        <section className="lesson-section">
          <h3>25-29. Estados de una alarma</h3>
          <RoleGrid roles={[
            { icon: 'dot-success', label: 'OK', desc: 'La condición de alarma no se está cumpliendo' },
            { icon: 'dot-danger', label: 'ALARM', desc: 'La condición sí se está cumpliendo' },
            { icon: 'dot-warning', label: 'INSUFFICIENT_DATA', desc: 'No hay información suficiente para determinar el estado' },
          ]} />
          <Nota><p>OK no significa "todo AWS está perfecto". Una alarma de CPU alta en estado OK solo significa que esa condición específica no está activa — no significa que EC2, RDS, ALB, App e Internet estén todos perfectos. Cada alarma responde una pregunta concreta: "¿CPU está demasiado alta?", "¿tenemos cero Targets saludables?", "¿queda poco almacenamiento?"</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>28-33. INSUFFICIENT_DATA y Missing Data</h3>
          <p>INSUFFICIENT_DATA puede aparecer cuando la alarma es nueva, faltan datos, la métrica no está disponible, o todavía no hay suficiente información para evaluarla.</p>
          <Dialogo>Queremos saber "¿qué piensa la clase?" Pero solo respondió un estudiante. No concluimos inmediatamente "toda la clase piensa esto" — tenemos información insuficiente.</Dialogo>
          <Nota><p>INSUFFICIENT_DATA tampoco significa necesariamente fallo: puede significar "no tengo información suficiente", no automáticamente "el servidor murió". Necesitamos investigar por qué faltan datos.</p></Nota>
          <p>CloudWatch permite definir cómo tratar Data Points faltantes durante la evaluación de una alarma: tratarlos como breaching, notBreaching, ignorarlos, o considerar que faltan. Supongamos que vigilamos RequestCount y no hay datos porque nadie está utilizando la aplicación — eso puede ser normal a las 03:00. Pero si vigilamos un Heartbeat y deja de llegar información, quizá es precisamente el problema. Mismo "no hay datos", significado diferente.</p>
        </section>

        <section className="lesson-section">
          <h3>34-38. Construyamos nuestra primera alarma</h3>
          <InfoBox title="Configuración educativa" items={['Metric: CPUUtilization', 'Statistic: Average', 'Period: 5 minutes', 'Threshold: > 80%', 'Evaluation Periods: 3', 'Datapoints to Alarm: 3']} />
          <ConceptBadge icon="alert-triangle">"Si el promedio de CPU supera 80% durante los tres períodos de cinco minutos evaluados, cambia a ALARM"</ConceptBadge>
          <p>Con 10:00 → 40%, 10:05 → 85%, 10:10 → 90%, 10:15 → 92%: evaluamos los últimos tres (85, 90, 92, todos incumplen) → ALARM. Después, 10:20 → 45%: la ventana va cambiando con las evaluaciones recientes, y eventualmente puede regresar a OK cuando ya no se cumple la condición configurada.</p>
          <p>Las alarmas cambian de estado (OK → ALARM → OK), lo que permite conocer cuándo comenzó y cuándo terminó una condición — más adelante podremos usar esos cambios para notificar.</p>
        </section>

        <section className="lesson-section">
          <h3>39-40. Alarmar CPU no arregla CPU</h3>
          <Nota><p>Importantísimo: Alarm ≠ reparación automática. La alarma detecta una condición. Después podemos decidir notificar, ejecutar determinadas acciones compatibles, o investigar. CloudWatch Alarm también puede participar en algunos mecanismos de escalado, aunque Target Tracking suele administrar automáticamente las alarmas necesarias para su política — recordamos que observación y acción pueden conectarse, pero no son lo mismo.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>41-43. Alarma de disponibilidad</h3>
          <p>No todo será CPU. Podemos crear una alarma sobre HealthyHostCount: ¿tenemos suficientes Targets saludables?</p>
          <InfoBox title="Alarma de disponibilidad" items={['Metric: HealthyHostCount', 'Statistic: Minimum', 'Threshold: < 1']} />
          <p>Interpretación: "si llegamos a cero Targets saludables, tenemos un problema serio." La estadística Minimum puede ser especialmente útil cuando queremos saber si en algún momento dentro del período el número de Targets cayó a un valor crítico.</p>
          <QaItem question="Healthy Hosts: 4, 4, 0, 4, 4. Average = 3,2. ¿Parece terrible?" answer="No parece terrible con Average, pero Minimum = 0 sí nos revela pérdida completa temporal de Targets saludables. Por eso primero elegimos bien la estadística, después construimos la alarma." />
        </section>

        <section className="lesson-section">
          <h3>44-46. Ejemplo RDS y dos direcciones</h3>
          <p>Podemos crear conceptualmente: Metric CPUUtilization, Resource RDS, Threshold &gt; 85% durante varios períodos — pero nuevamente, 85% no es un número universal; la decisión debe basarse en comportamiento normal, pruebas, impacto y requisitos.</p>
          <p>También podemos alertar cuando FreeStorageSpace caiga demasiado — aquí la condición cambia: Metric &lt; Threshold. No todas las alarmas son "mayor que": podemos vigilar greater than, greater or equal, lower than o lower or equal, según la condición configurada.</p>
          <RoleGrid roles={[
            { icon: 'zap', label: 'CPU', desc: 'Problema cuando sube demasiado' },
            { icon: 'hard-drive', label: 'Free Storage', desc: 'Problema cuando baja demasiado' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>47-52. Laboratorio conceptual: creamos la alarma</h3>
          <p>Ruta: CloudWatch → Alarms → All alarms → Create alarm → Select metric. Elegimos EC2 → Per-Instance Metrics → CPUUtilization, Dimension InstanceId = nuestra EC2. Elegimos Statistic: Average (queremos CPU promedio del período). Period: 5 minutes.</p>
          <InfoBox title="Definimos la condición" items={['Whenever CPUUtilization is: Greater than 80']} />
          <p>En Additional Configuration configuramos Datapoints to alarm: 3 out of 3. En esta clase todavía no configuramos notificación — la próxima clase añadirá Amazon SNS para responder "¿quién se entera cuando cambia a ALARM?"</p>
        </section>

        <section className="lesson-section">
          <h3>53-55. Nombre y descripción: crear una alarma también es documentación</h3>
          <p>Evitamos nombres como "alarma1". Mejor <code>cloudshop-web-high-cpu</code> o <code>prod-web-cpu-high</code> — el nombre debería decir qué vigila. Podemos incluir una descripción como "CPU promedio de EC2 web supera 80% durante 15 minutos", para que alguien que la vea después entienda por qué existe.</p>
          <Nota><p>Una alarma bien nombrada explica qué recurso, qué problema, qué ambiente. Por ejemplo, <code>prod-rds-low-storage</code> es bastante más útil que <code>alarma-final-nueva-2</code>.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>56-60. Actividades</h3>
          <QaItem question="Threshold > 80, 3 de 3. Datos: 85, 90, 91. ¿Estado?" answer="ALARM." />
          <QaItem question="Mismo threshold '3 de 3'. Datos: 85, 40, 91. ¿Estado?" answer="No alcanza los tres puntos incumpliendo." />
          <QaItem question="Mismos datos (85, 40, 91), pero ahora '2 de 3'. ¿Estado?" answer="ALARM." />
          <QaItem question="CPU demasiado alta / Espacio libre demasiado bajo / Targets saludables llegan a 0" answer="Greater than / Less than / Less than." />
          <QaItem question="Condición no se cumple / Condición de alarma se cumple / CloudWatch aún no tiene datos suficientes" answer="OK / ALARM / INSUFFICIENT_DATA." />
        </section>

        <section className="lesson-section">
          <h3>61-64. Caso CloudShop: ¿el problema se resolvió?</h3>
          <QaItem question="Alarma CPU Average > 80%, Period 5 min, 3 of 3. Datos: 10:00 → 82%, 10:05 → 85%, 10:10 → 88%. ¿Estado?" answer="ALARM." />
          <QaItem question="Después: 10:15 → 30%, 10:20 → 35%, 10:25 → 32%. ¿Qué ocurre con la alarma?" answer="La condición deja de cumplirse, y la alarma puede volver a OK cuando la evaluación correspondiente ya no incumple el threshold." />
          <Nota><p>¿Eso significa que el problema se resolvió? Significa que la condición observada dejó de cumplirse — no necesariamente sabemos por qué. Quizá Auto Scaling agregó EC2, los usuarios se fueron, la aplicación se recuperó, o alguien hizo un cambio. Necesitamos contexto: una alarma detecta síntomas, no nos dice automáticamente "tu código tiene un loop en línea 57". Para investigar causas necesitaremos Logs, más adelante.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>65-70. Qué hace una buena alarma</h3>
          <InfoBox title="Una alarma debería responder" items={['¿Qué estoy vigilando?', '¿Qué considero preocupante?', '¿Durante cuánto tiempo?', '¿Cuántos puntos deben fallar?', '¿Qué significa ausencia de datos?']} />
          <Nota><p>Si creamos 200 alarmas que entran y salen constantemente, el equipo puede comenzar a ignorarlas — eso se conoce como <strong>fatiga de alertas</strong>. El objetivo no es tener muchas alarmas, es tener alarmas útiles. Preguntamos: "si esta alarma entra en ALARM, ¿alguien sabe qué hacer?" Si la respuesta es "ni idea", necesitamos mejorar diseño o documentación.</p></Nota>
          <p>Una alarma demasiado baja (CPU &gt; 30%) puede entrar constantemente si 30% es normal — resultado: ruido. Una alarma demasiado alta (CPU &gt; 100%) nunca se activará en una métrica porcentual que no supere ese rango — resultado: alarma inútil. Los thresholds deben tener sentido técnico. Tampoco queremos FreeStorage &lt; 1 byte, porque para entonces ya llegamos muy tarde — una buena alarma nos da tiempo para actuar.</p>
        </section>

        <section className="lesson-section">
          <h3>71. Threshold estático vs comportamiento normal</h3>
          <p>Hoy trabajamos con Static Threshold, por ejemplo CPU &gt; 80%. Más adelante podemos reconocer Anomaly Detection, donde CloudWatch compara la métrica con una banda de comportamiento esperado. AWS permite crear alarmas basadas en detección de anomalías y también utilizar configuraciones M de N — pero no necesitamos eso todavía.</p>
        </section>

        <section className="lesson-section">
          <h3>72-73. RETO DE LA CLASE</h3>
          <Nota><p>EventCloud: Metric CPUUtilization, Statistic Average, Period 5 minutes, Threshold &gt; 80%, Evaluation Periods 3, Datapoints to Alarm 2. Datos: 18:00 → 85%, 18:05 → 40%, 18:10 → 92%. ¿Debe entrar en ALARM?</p></Nota>
          <Reveal label="Ver la respuesta">
            <p>85% breach, 40% normal, 92% breach. Dos puntos incumplen dentro de 3 evaluados. Configuración 2 de 3 → ALARM.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>74-76. Retos nivel 2, 3 y 4</h3>
          <QaItem question="Cambiamos Datapoints to Alarm a 3, mismos datos (85, 40, 92). ¿Resultado?" answer="No cumple 3 de 3 — no entra todavía en ALARM por esa secuencia." />
          <QaItem question="Alarma HealthyHostCount, Minimum < 1. Datos: 4, 4, 0, 4. ¿Debemos preocuparnos?" answer="Sí, porque Minimum = 0 indica que durante el período hubo un punto donde no había Targets saludables." />
          <QaItem question="Alarma CPU > 80, 1 de 1, Period 1 min. Estado cambia OK, ALARM, OK, ALARM, OK. ¿Qué problema tenemos?" answer="Alarma demasiado sensible o métrica oscilando alrededor del threshold. Debemos revisar threshold, período, número de datapoints y comportamiento normal." />
        </section>

        <section className="lesson-section">
          <h3>77-78. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El gerente propone: "pongamos todas las alarmas en 1 de 1 para enterarnos antes." No estoy de acuerdo porque cualquier pico breve puede generar ruido y fatiga de alertas. Esto es lo que haría en su lugar: definir período y cantidad de Data Points según cuánto tiempo debe mantenerse una condición antes de considerarla relevante. El riesgo de su enfoque es que las alertas importantes terminen ignoradas entre demasiados falsos positivos.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: "si una alarma está OK, significa que toda la aplicación funciona." No estoy de acuerdo porque una alarma solo evalúa la condición para la que fue creada. Esto es lo que haría en su lugar: combinar alarmas sobre las señales importantes de cada capa. El riesgo es asumir que un sistema está sano porque una única métrica no presenta problemas.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>79. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'Una alarma vigila una condición.', correct: true },
            { text: 'Threshold es el límite con el que comparamos.', correct: true },
            { text: '3 de 3 significa que tres períodos deben incumplir.', correct: true },
            { text: '2 de 3 puede activarse aunque uno de los tres períodos esté normal.', correct: true },
            { text: 'OK significa que toda AWS está funcionando bien.', correct: false },
            { text: 'INSUFFICIENT_DATA significa que no existe información suficiente para determinar el estado.', correct: true },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>80. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>81. Reto oral</h3>
          <Dialogo>Explícame cómo funciona una alarma sin utilizar las palabras alarma, CloudWatch, AWS, métrica, threshold, umbral, período, dato, CPU, estado ni monitoreo.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Es una regla automática que observa repetidamente una señal, la compara con una condición y determina si la situación merece considerarse normal o preocupante."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>83. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Alarm</td><td>Vigila una condición</td></tr>
              <tr><td>Threshold</td><td>Límite de comparación</td></tr>
              <tr><td>Period</td><td>Tiempo de cada bloque</td></tr>
              <tr><td>Evaluation Periods</td><td>Cuántos bloques miramos</td></tr>
              <tr><td>Datapoints to Alarm</td><td>Cuántos deben incumplir</td></tr>
              <tr><td>3 de 3</td><td>Todos los tres</td></tr>
              <tr><td>2 de 3</td><td>Al menos dos</td></tr>
              <tr><td>OK</td><td>Condición normal</td></tr>
              <tr><td>ALARM</td><td>Condición preocupante</td></tr>
              <tr><td>INSUFFICIENT_DATA</td><td>No hay datos suficientes</td></tr>
              <tr><td>Missing Data</td><td>Debemos decidir cómo interpretarlos</td></tr>
              <tr><td>Alarm Fatigue</td><td>Demasiadas alertas inútiles</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>84. Ticket de salida</h3>
          <Dialogo>Una alarma usa CPU Average mayor que 80%, período de 5 minutos y configuración 2 de 3. Los últimos valores son 85%, 40% y 90%. ¿Qué debería ocurrir?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Dos de los tres Data Points superan 80%, por lo que la configuración 2 de 3 se cumple y la alarma puede entrar en estado ALARM.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 4</div>
          <Flow steps={[{ icon: 'bar-chart', label: 'CPU' }, { icon: 'alert-triangle', label: 'CloudWatch Alarm' }, { icon: 'dot-danger', label: 'ALARM' }]} />
          <p>Perfecto. CloudWatch detectó el problema. ¿Pero quién se entera? Si nadie está mirando la consola, la alarma puede permanecer ahí tranquilamente mientras el equipo sigue tomando café sin saber nada.</p>
          <Flow steps={[{ icon: 'dot-danger', label: 'ALARM' }, { icon: 'bell', label: 'Notificación' }, { icon: 'user', label: 'Persona/Equipo' }]} />
          <ConceptBadge icon="bell">Módulo 8 · Clase 4 — CloudWatch Alarms + Amazon SNS: cómo avisar automáticamente cuando algo importante ocurre</ConceptBadge>
          <span className="tag tag-outline">Módulo 8 · Clase 4 · próximamente</span>
        </div>

      </div>
    </div>
  );
}
