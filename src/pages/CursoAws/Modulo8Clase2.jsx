import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué representa Average?', options: [{ text: 'Promedio del período.', correct: true }, { text: 'Valor mayor.', correct: false }, { text: 'Valor menor.', correct: false }, { text: 'Número de EC2.', correct: false }] },
  { q: '¿Qué representa Maximum?', options: [{ text: 'Mayor valor observado.', correct: true }, { text: 'Promedio.', correct: false }, { text: 'Total.', correct: false }, { text: 'Número de samples.', correct: false }] },
  { q: '¿Qué representa Minimum?', options: [{ text: 'Menor valor observado.', correct: true }, { text: 'Mayor valor.', correct: false }, { text: 'Total.', correct: false }, { text: 'Promedio.', correct: false }] },
  { q: '¿Qué representa Sum?', options: [{ text: 'Suma de los valores.', correct: true }, { text: 'Máximo.', correct: false }, { text: 'Mínimo.', correct: false }, { text: 'Mediana.', correct: false }] },
  { q: '¿Qué representa SampleCount?', options: [{ text: 'Cantidad de Data Points utilizados.', correct: true }, { text: 'Cantidad de EC2.', correct: false }, { text: 'Cantidad de AZ.', correct: false }, { text: 'Número de alarmas.', correct: false }] },
  { q: '¿Qué es Period?', options: [{ text: 'Intervalo usado para agregar los datos.', correct: true }, { text: 'Nombre de métrica.', correct: false }, { text: 'Namespace.', correct: false }, { text: 'Dimension.', correct: false }] },
  { q: 'Si quiero conocer solicitudes totales, ¿qué estadística suele ser apropiada?', options: [{ text: 'Sum.', correct: true }, { text: 'Minimum.', correct: false }, { text: 'Dimension.', correct: false }, { text: 'Namespace.', correct: false }] },
  { q: '¿Average puede ocultar un pico?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Maximum prueba que un valor fue sostenido?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿La estadística correcta depende de la pregunta que queremos responder?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
];

export default function Modulo8Clase2() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 8 · Clase 2</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 8 · Clase 2: Métricas, estadísticas y períodos, cómo interpretar correctamente los gráficos de CloudWatch</h2>
      <p className="lesson-subtitle">
        La métrica nos dice qué medimos; la estadística nos dice cómo resumimos los datos y el período nos dice durante cuánto tiempo los agrupamos.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + interpretación de gráficos + consola + diagnóstico + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 8 · Clase 1</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Comprender qué significa agregar datos y explicar qué es una Statistic en CloudWatch.</li>
            <li>Diferenciar Average, Maximum, Minimum, Sum y SampleCount.</li>
            <li>Comprender qué es un Period y por qué el mismo gráfico cambia según el período.</li>
            <li>Explicar por qué el mismo conjunto de datos puede verse diferente según la estadística.</li>
            <li>Elegir una estadística apropiada según la pregunta.</li>
            <li>Reconocer cuándo Average puede esconder un pico y cuándo Maximum puede exagerar un comportamiento sostenido.</li>
            <li>Comprender cuándo Sum resulta útil e interpretar gráficos sencillos de EC2 y ALB.</li>
            <li>Comprender de manera introductoria qué es un percentil.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-3. Recordemos la clase anterior</h3>
          <Flow steps={[{ label: 'Namespace' }, { label: 'Metric' }, { label: 'Dimension' }, { label: 'Data Points' }, { label: 'Graph' }]} />
          <p>Ejemplo: AWS/EC2 → CPUUtilization → InstanceId = i-123 → 20%, 25%, 90%, 30%. Pero ahora aparece una nueva pregunta: ¿cómo mostramos todos esos Data Points en un gráfico?</p>
          <p>Imaginemos que durante cinco minutos obtenemos: 20%, 25%, 100%, 20%, 25%. Podemos preguntarnos: ¿cuál fue el promedio? ¿cuál fue el máximo? ¿cuál fue el mínimo? Cada pregunta produce una respuesta distinta.</p>
          <Dialogo>Cinco estudiantes obtienen 4,0, 4,5, 7,0, 4,0 y 4,5. Podemos preguntar "¿cuál fue la nota promedio?", "¿cuál fue la nota más alta?" o "¿cuál fue la más baja?" Estamos utilizando los mismos datos, pero diferentes formas de resumirlos.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>5-11. Eso es una Statistic: Average, Maximum, Minimum</h3>
          <p>En CloudWatch, una <strong>Statistic</strong> representa una forma de agregar los Data Points de una métrica durante un período determinado. Entre las estadísticas habituales: Average, Minimum, Maximum, Sum, SampleCount.</p>
          <p>Con 20, 25, 100, 20, 25: <strong>Average</strong> = 38% (suma 190 ÷ 5). ¿La CPU estuvo al 100% durante cinco minutos? No — solo sabemos que llegó al 100% en algún momento de ese período.</p>
          <p><strong>Maximum</strong> = 100% (el valor más alto observado). <strong>Minimum</strong> = 20% (el valor más bajo observado). Los tres son correctos, pero responden preguntas diferentes.</p>
          <RoleGrid roles={[
            { icon: 'bar-chart', label: 'Average', desc: '¿Cuál fue el comportamiento medio?' },
            { icon: 'zap', label: 'Maximum', desc: '¿Qué tan alto llegó?' },
            { icon: 'x-circle', label: 'Minimum', desc: '¿Qué tan bajo llegó?' },
          ]} />
          <p>No existe "la mejor estadística para todo".</p>
        </section>

        <section className="lesson-section">
          <h3>12-14. Average y Maximum también pueden engañar</h3>
          <Nota><p>CPU: 20, 20, 20, 100, 20. Average = 36%. Si miramos solo Average, podríamos pensar "todo tranquilo" — pero hubo 100% en algún momento. Al revés, si mostramos solo Maximum = 100%, podríamos concluir "la EC2 estuvo completamente saturada" — eso tampoco está demostrado, solo sabemos que alcanzó ese máximo.</p></Nota>
          <p>Por eso comparamos estadísticas: Average = 92% + Maximum = 100% es muy distinto de Average = 20% + Maximum = 100%. En ambos casos el máximo es 100%, pero el comportamiento no es el mismo.</p>
        </section>

        <section className="lesson-section">
          <h3>15-18. Sum y SampleCount</h3>
          <p><strong>Sum</strong> representa la suma de todos los valores del período, y CloudWatch la utiliza especialmente bien para métricas donde queremos conocer un volumen total. Ejemplo: Requests 100, 120, 150, 130 → Sum = 500.</p>
          <p>Para RequestCount, Sum resulta conceptualmente mucho más útil que Average, porque queremos el total.</p>
          <p><strong>SampleCount</strong> representa cuántos Data Points participaron en el cálculo — con 20, 25, 30, 35, 40 tenemos SampleCount = 5. Nos ayuda a comprender cuántas observaciones hay detrás de una estadística: Average = 50% con SampleCount = 1 no es la misma historia que Average = 50% con SampleCount = 1000.</p>
          <table className="table lesson-summary-table">
            <thead><tr><th>Estadística</th><th>Pregunta sencilla</th></tr></thead>
            <tbody>
              <tr><td>Average</td><td>¿Cuál fue el promedio?</td></tr>
              <tr><td>Maximum</td><td>¿Qué tan alto llegó?</td></tr>
              <tr><td>Minimum</td><td>¿Qué tan bajo llegó?</td></tr>
              <tr><td>Sum</td><td>¿Cuál fue el total?</td></tr>
              <tr><td>SampleCount</td><td>¿Cuántas observaciones hubo?</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>21-27. Ahora aparece Period</h3>
          <p>CloudWatch también necesita saber: ¿durante cuánto tiempo agrupamos los datos? Eso se llama <strong>Period</strong>: la duración temporal asociada a cada estadística calculada.</p>
          <Dialogo>Imaginemos que nuestros Data Points son pelotas. Podemos meterlas en cajas de 1 minuto, 5 minutos o 15 minutos. Cada caja se resume mediante la estadística seleccionada.</Dialogo>
          <p>Con Period = 1 minuto: vemos 20, 25, 100, 20, 25 — el pico queda muy visible. Con Period = 5 minutos y Statistic = Average: vemos 38% como un solo punto. Con el mismo período pero Statistic = Maximum: obtenemos 100%. Mismos cinco minutos, distinta interpretación.</p>
          <Nota><p>Esto explica muchos gráficos "contradictorios": dos personas pueden mirar la misma EC2, en la misma hora, y una decir CPU 40% mientras otra dice CPU 100%. Ambas podrían tener razón — una está mirando Average y otra Maximum.</p></Nota>
          <Dialogo>En un viaje, velocidad promedio = 70 km/h, pero velocidad máxima = 120 km/h. ¿Quién tiene razón? Ambas cifras — una responde cómo fue el viaje en promedio, la otra qué velocidad máxima alcanzamos.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>28-31. Period cambia el nivel de detalle</h3>
          <p>Período corto (1 minuto) permite observar más detalle. Período largo (1 hora) resume mucho más comportamiento en cada punto.</p>
          <Dialogo>1 minuto es más parecido a mirar de cerca con microscopio. 1 hora es más parecido a mirar desde arriba en helicóptero. Ambas vistas sirven para preguntas diferentes.</Dialogo>
          <Nota><p>CloudWatch conserva métricas con diferentes resoluciones según su antigüedad: los puntos de un minuto se mantienen con esa resolución durante un tiempo limitado, después se agregan a cinco minutos, y posteriormente a una hora para períodos históricos más antiguos. No necesitamos memorizar los días exactos — lo importante es que AWS puede agregar información antigua para conservarla de manera más resumida.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>34-36. Lo que debería preguntar el estudiante</h3>
          <InfoBox title="Cada vez que mira un gráfico" items={['¿Qué métrica es?', '¿Qué estadística?', '¿Qué período?', '¿Qué rango de tiempo?', '¿Qué unidad?']} />
          <p>Si no sabe eso, todavía no sabe qué está mirando. Recordamos también las unidades: CPUUtilization → Percent, RequestCount → Count, Network → Bytes. No podemos interpretar "5000" sin saber si representa 5.000 solicitudes, bytes o segundos.</p>
          <Flow steps={[{ label: 'Metric — ¿qué mido?' }, { label: 'Statistic — ¿cómo resumo?' }, { label: 'Period — ¿durante cuánto agrupo?' }]} />
        </section>

        <section className="lesson-section">
          <h3>41-44. Error común: mirar un día completo para investigar un minuto</h3>
          <Nota><p>Usuario dice "falló a las 14:32". Abrimos un gráfico de los últimos 30 días — el incidente puede quedar aplastado entre miles de datos, como buscar una hormiga desde un helicóptero. Si ocurrió a las 14:32, acercamos la ventana a 14:20–14:45 y utilizamos un período apropiado.</p></Nota>
          <p><strong>Rango temporal</strong> (últimas 3 horas) responde "¿qué intervalo total quiero visualizar?". <strong>Period</strong> (5 minutos) responde "¿cómo agrupo los datos dentro de ese intervalo?" — son conceptos diferentes. Con Time range = 3 horas y Period = 5 minutos, tenemos muchos puntos de cinco minutos distribuidos dentro de esas tres horas.</p>
        </section>

        <section className="lesson-section">
          <h3>45-49. La estadística apropiada depende de la métrica</h3>
          <p>Para CPUUtilization miramos Average y Maximum. Para RequestCount, frecuentemente Sum. Para HealthyHostCount puede interesarnos Minimum, porque queremos saber si en algún momento nos quedamos con pocos Targets saludables.</p>
          <QaItem question="HealthyHostCount durante 5 minutos: 4, 4, 4, 1, 4. Average = 3,4. ¿Eso parece relativamente sano?" answer="Podría parecerlo, pero Minimum = 1 nos revela que en algún momento solo quedó un Target saludable. Muy distinto." />
          <QaItem question="HealthyHostCount: 4, 4, 0, 4, 4. Average = 3,2. ¿Podríamos pensar 'tenemos tres aproximadamente'?" answer="Sí, pero en realidad hubo 0 en un momento. Para disponibilidad, ese mínimo puede ser crítico." />
          <p>Para RequestCount, con 100, 120, 130, 150, 200 en cinco minutos: Sum = 700 solicitudes responde cuánto tráfico total ocurrió. Average responde otra pregunta — el promedio de los valores incluidos, no necesariamente "cuántas solicitudes totales tuvimos".</p>
        </section>

        <section className="lesson-section">
          <h3>50-53. Laboratorio conceptual</h3>
          <p>Ruta: CloudWatch → Metrics → All metrics → EC2 → Per-Instance Metrics. Seleccionamos CPUUtilization de nuestra EC2. Probamos Average, después Maximum, después Minimum, y observamos cómo cambia el gráfico — la infraestructura no cambió, cambió nuestra forma de resumir los datos.</p>
          <p>Cambiamos Period: 1 minute, después 5 minutes, después 15 minutes, según lo que permita la métrica y el rango seleccionado.</p>
          <ConceptBadge icon="bar-chart">"No cambió la CPU histórica; cambió la forma en que CloudWatch agrupó y resumió sus Data Points"</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>54-56. Casos CloudShop A y B</h3>
          <QaItem question="CPU: 20, 20, 20, 100, 20. Average 36%, Maximum 100%. ¿La instancia estuvo saturada durante todo el período?" answer="No podemos afirmarlo." />
          <QaItem question="CPU: 90, 92, 94, 95, 93. Average ≈ 92,8%, Maximum 95%. ¿Qué sugiere esto?" answer="Utilización persistentemente elevada — ambas estadísticas coinciden, y eso merece mucho más interés." />
          <QaItem question="Caso 1: Average 25%, Maximum 100%. Caso 2: Average 93%, Maximum 100%. ¿Qué sospechamos en cada uno?" answer="Caso 1: probablemente un pico aislado. Caso 2: probablemente carga alta sostenida. No es prueba absoluta, pero mejora muchísimo nuestra interpretación." />
        </section>

        <section className="lesson-section">
          <h3>57-62. Cuatro casos detective y la correlación</h3>
          <QaItem question="Usuario dice 'la aplicación estuvo lenta durante 20 minutos'. Maximum CPU 98%, Average CPU 25%. ¿Primera conclusión?" answer="El máximo por sí solo no demuestra saturación sostenida. Seguimos investigando." />
          <QaItem question="Average 91%, Maximum 99%, durante 30 minutos. ¿Qué entrega esto?" answer="Evidencia mucho más fuerte de utilización elevada sostenida. Revisamos carga, Auto Scaling, aplicación, número de instancias." />
          <QaItem question="HealthyHostCount: Average = 2,8, Minimum = 0. ¿Cuál es el dato más preocupante?" answer="Minimum = 0, porque significa que durante algún punto del período no hubo Targets saludables." />
          <QaItem question="RequestCount Sum = 100.000, frente a normalmente 10.000. ¿Qué tenemos?" answer="Un aumento importante de demanda total, que puede correlacionarse con CPU y Auto Scaling." />
          <Flow steps={[{ label: 'RequestCount Sum ↑↑↑' }, { label: 'CPU Average ↑↑' }, { label: 'ASG Instances ↑' }]} />
          <p>Historia probable: aumentó la demanda y Auto Scaling comenzó a agregar capacidad. La observabilidad empieza a reconstruir eventos — una sola métrica rara vez basta.</p>
        </section>

        <section className="lesson-section">
          <h3>63-67. Percentiles, primer vistazo</h3>
          <p>CloudWatch también soporta estadísticas de percentiles, como p50, p90, p95, p99, además de las estadísticas básicas. Para este público solo introducimos la idea.</p>
          <p>Supongamos que medimos tiempos de respuesta: muchísimas solicitudes rápidas, pero algunas extremadamente lentas. Un promedio puede esconder la experiencia de esos usuarios.</p>
          <ConceptBadge icon="target">p95 representa un valor bajo el cual cae aproximadamente el 95% de las observaciones</ConceptBadge>
          <p>Por ejemplo, p95 latency = 2 segundos significa aproximadamente que el 95% de las observaciones tuvieron una latencia igual o inferior a 2 segundos.</p>
          <Nota><p>Con 95 usuarios a 1 segundo y 5 usuarios a 20 segundos, el promedio entrega una cifra tranquila, pero esos cinco usuarios siguen teniendo una experiencia horrible. Los percentiles ayudan a observar la cola del comportamiento. Para el resto de esta sesión trabajaremos principalmente con Average, Maximum, Minimum, Sum y SampleCount — los percentiles quedan como concepto reconocido.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>68-71. Actividades</h3>
          <QaItem question="Quiero conocer el total de requests / el valor más alto de CPU / la CPU promedio / el menor número de Targets saludables / cuántos Data Points participaron" answer="Sum / Maximum / Average / Minimum / SampleCount." />
          <QaItem question="Average CPU = 30%, Maximum CPU = 95%. ¿Podemos afirmar 'CPU estuvo al 95% todo el período'?" answer="No." />
          <QaItem question="Average CPU = 90%, Maximum CPU = 96%. ¿Qué sospechamos?" answer="Utilización alta y sostenida durante buena parte del período." />
          <QaItem question="HealthyHostCount: Average = 3, Minimum = 0. ¿Qué dato investigaríamos urgentemente?" answer="Minimum = 0." />
        </section>

        <section className="lesson-section">
          <h3>72-73. RETO DE LA CLASE</h3>
          <Nota><p>EventCloud, durante 15 minutos: CPU 20, 22, 25, 95, 20, 23, 21, 20, 22, 24, 20, 21, 25, 20, 22.</p></Nota>
          <QaItem question="¿Cuál es el Maximum?" answer="95%." />
          <QaItem question="¿El 95% representa el comportamiento general de esos 15 minutos?" answer="No. Tenemos un pico alto, pero la mayoría de valores son mucho menores. Necesitamos revisar Average + Maximum + el momento del pico antes de hablar de saturación sostenida." />
        </section>

        <section className="lesson-section">
          <h3>74-75. Retos nivel 2 y 3</h3>
          <QaItem question="Otro servidor: 85, 90, 91, 92, 94, 89, 90, 88, 92, 93, 91, 95, 90, 89, 92. ¿Qué historia cuenta?" answer="Average alto, Maximum 95 — existe utilización alta sostenida. La historia es muy distinta al caso anterior." />
          <QaItem question="ALB HealthyHostCount: 4, 4, 4, 4, 0, 4, 4. Con un período amplio, Average puede suavizar la caída. ¿Qué otra estadística miraríamos?" answer="Minimum, porque queremos saber si alguna vez llegamos a cero." />
        </section>

        <section className="lesson-section">
          <h3>76-78. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El gerente propone: "siempre usemos Maximum porque así nunca se nos escapa ningún problema." No estoy de acuerdo porque un máximo aislado puede hacer parecer crítico un pico breve y normal. Esto es lo que haría en su lugar: comparar Maximum con Average y revisar la duración y el contexto. El riesgo de su enfoque es generar diagnósticos y alarmas exageradas.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: "siempre usemos Average porque es más representativo." No estoy de acuerdo porque el promedio puede esconder picos o caídas breves pero importantes. Esto es lo que haría en su lugar: elegir la estadística según la pregunta. El riesgo de su enfoque es no detectar eventos críticos, como quedarse momentáneamente sin Targets saludables.</p>
          </Nota>
          <RoleGrid roles={[
            { icon: 'bar-chart', label: '¿Cómo se comportó normalmente?', desc: 'Average' },
            { icon: 'zap', label: '¿Qué tan alto llegó?', desc: 'Maximum' },
            { icon: 'x-circle', label: '¿Qué tan bajo llegó?', desc: 'Minimum' },
            { icon: 'target', label: '¿Cuánto ocurrió en total?', desc: 'Sum' },
            { icon: 'clipboard-list', label: '¿Cuántas observaciones?', desc: 'SampleCount' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>79. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'Average y Maximum siempre muestran el mismo valor.', correct: false },
            { text: 'Period indica cuánto tiempo agrupamos para cada estadística.', correct: true },
            { text: 'Sum puede ser útil para contar solicitudes.', correct: true },
            { text: 'Maximum demuestra por sí solo que un problema fue sostenido.', correct: false },
            { text: 'Minimum puede ayudar a detectar una caída temporal de Healthy Hosts.', correct: true },
            { text: 'Un período más largo normalmente resume más información en cada punto.', correct: true },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>80. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>81. Reto oral</h3>
          <Dialogo>Explícame la diferencia entre Average y Maximum sin utilizar las palabras promedio, máximo, mínimo, número, valor, estadística, métrica, CloudWatch, AWS, alto ni bajo.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Una resume el comportamiento general de todas las observaciones consideradas, mientras la otra conserva únicamente la observación que llegó más lejos hacia el extremo superior."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>83. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Average</td><td>Comportamiento promedio</td></tr>
              <tr><td>Maximum</td><td>Mayor valor observado</td></tr>
              <tr><td>Minimum</td><td>Menor valor observado</td></tr>
              <tr><td>Sum</td><td>Total acumulado</td></tr>
              <tr><td>SampleCount</td><td>Cantidad de observaciones</td></tr>
              <tr><td>Period</td><td>Tiempo agrupado en cada cálculo</td></tr>
              <tr><td>Time Range</td><td>Intervalo total que visualizamos</td></tr>
              <tr><td>Metric</td><td>Qué estamos midiendo</td></tr>
              <tr><td>Statistic</td><td>Cómo resumimos</td></tr>
              <tr><td>Percentile</td><td>Posición relativa dentro de observaciones</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>84. Ticket de salida</h3>
          <Dialogo>Durante cinco minutos una EC2 registró 20%, 20%, 100%, 20% y 20% de CPU. CloudWatch muestra Maximum = 100% y Average = 36%. ¿Cuál de los dos valores es correcto?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Ambos. Maximum indica que en algún momento la CPU alcanzó 100%, mientras Average resume el comportamiento de todos los Data Points del período. Ninguno por sí solo demuestra que la EC2 haya permanecido al 100% durante los cinco minutos.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 3</div>
          <table className="table lesson-summary-table">
            <thead><tr><th>Hora</th><th>CPU Average</th></tr></thead>
            <tbody>
              <tr><td>10:00</td><td>25%</td></tr>
              <tr><td>10:05</td><td>30%</td></tr>
              <tr><td>10:10</td><td>85%</td></tr>
              <tr><td>10:15</td><td>90%</td></tr>
              <tr><td>10:20</td><td>92%</td></tr>
            </tbody>
          </table>
          <p>Ya sabemos qué métrica, qué estadística y qué período. Pero aparece otra pregunta: ¿tenemos que quedarnos mirando este gráfico hasta que la CPU supere el límite? No. Queremos expresar una regla: SI CPU Average &gt; 80% DURANTE varios períodos ENTONCES cambiar a ALARM.</p>
          <ConceptBadge icon="alert-triangle">Módulo 8 · Clase 3 — CloudWatch Alarms: cómo detectar automáticamente que una métrica entró en una condición preocupante</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-8/clase-3" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 3: CloudWatch Alarms →
          </Link>
        </div>

      </div>
    </div>
  );
}
