import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué es Amazon CloudWatch?', options: [{ text: 'Servicio de monitoreo y observabilidad.', correct: true }, { text: 'Base de datos.', correct: false }, { text: 'VPC.', correct: false }, { text: 'Sistema operativo.', correct: false }] },
  { q: '¿Qué es una métrica?', options: [{ text: 'Una medida que evoluciona en el tiempo.', correct: true }, { text: 'Un usuario IAM.', correct: false }, { text: 'Una subnet.', correct: false }, { text: 'Una AMI.', correct: false }] },
  { q: '¿Qué es un Data Point?', options: [{ text: 'Un valor de una métrica asociado a un momento.', correct: true }, { text: 'Una EC2.', correct: false }, { text: 'Un Target Group.', correct: false }, { text: 'Una política IAM.', correct: false }] },
  { q: '¿Qué es un Namespace?', options: [{ text: 'Contenedor lógico de métricas.', correct: true }, { text: 'Disco de EC2.', correct: false }, { text: 'Security Group.', correct: false }, { text: 'Listener.', correct: false }] },
  { q: '¿Qué es una Dimension?', options: [{ text: 'Un nombre/valor que ayuda a identificar una métrica.', correct: true }, { text: 'Tamaño físico del servidor.', correct: false }, { text: 'Snapshot.', correct: false }, { text: 'Puerto.', correct: false }] },
  { q: '¿Qué métrica nos ayuda a observar uso de CPU de EC2?', options: [{ text: 'CPUUtilization.', correct: true }, { text: 'HealthyHostCount.', correct: false }, { text: 'BucketSize.', correct: false }, { text: 'RouteCount.', correct: false }] },
  { q: '¿Qué métrica de ALB permite observar solicitudes procesadas?', options: [{ text: 'RequestCount.', correct: true }, { text: 'CPUUtilization.', correct: false }, { text: 'FreeStorageSpace.', correct: false }, { text: 'IAMCount.', correct: false }] },
  { q: '¿Qué métrica permite observar cantidad de Targets saludables?', options: [{ text: 'HealthyHostCount.', correct: true }, { text: 'NetworkOut.', correct: false }, { text: 'CPUUtilization.', correct: false }, { text: 'BucketCount.', correct: false }] },
  { q: '¿Un único Data Point basta siempre para conocer el estado del sistema?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Una métrica nos dice automáticamente la causa de un problema?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
];

export default function Modulo8Clase1() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 8 · Clase 1</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 8 · Clase 1: ¿Qué es Amazon CloudWatch? Métricas, observabilidad y cómo saber qué está ocurriendo en nuestra infraestructura</h2>
      <p className="lesson-subtitle">
        Una métrica es una medida de algo que ocurre en nuestro sistema a lo largo del tiempo.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + interpretación de métricas + consola + actividades + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulos 0 a 7</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué significa monitorear y comprender qué es Amazon CloudWatch.</li>
            <li>Explicar qué es una métrica y comprender qué es un Data Point.</li>
            <li>Comprender qué es un Namespace y qué es una Dimension.</li>
            <li>Identificar métricas básicas de EC2, ALB y RDS.</li>
            <li>Comprender que una métrica representa información a lo largo del tiempo, y diferenciar un valor aislado de una tendencia.</li>
            <li>Navegar conceptualmente por CloudWatch → Metrics e interpretar un gráfico sencillo.</li>
            <li>Comprender que una métrica no necesariamente explica la causa de un problema.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-4. Empecemos con un problema</h3>
          <Flow steps={[{ icon: 'globe', label: 'Usuarios' }, { icon: 'settings', label: 'ALB' }, { icon: 'server', label: 'EC2' }, { icon: 'database', label: 'RDS' }]} />
          <p>Todo parece normal. Hasta que llega un mensaje: "la página está lenta." Podemos decir "debe ser la EC2", pero quizá no — podría ser CPU de EC2, RDS saturada, el ALB con problemas, demasiadas solicitudes, almacenamiento o la aplicación. Si no tenemos evidencia, estamos adivinando.</p>
          <ConceptBadge icon="search">Antes de buscar una solución, necesitamos saber qué está ocurriendo</ConceptBadge>
          <Flow steps={[{ label: 'Página lenta' }, { label: 'Observar' }, { label: 'Medir' }, { label: 'Interpretar' }]} />
        </section>

        <section className="lesson-section">
          <h3>5-6. ¿Qué significa monitorear?</h3>
          <p>Monitorear significa observar regularmente cómo se comporta un sistema mediante información medible. Ejemplo: CPU 20% → 25% → 45% → 80% → 95%. Ahora tenemos una historia.</p>
          <Dialogo>Cuando vamos al médico, no basta preguntar "¿la persona está viva?" Podemos medir pulso, temperatura, presión, oxígeno. En infraestructura hacemos algo parecido: CPU, tráfico, conexiones, tiempos de respuesta, errores, almacenamiento.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>7-8. ¿Qué es Amazon CloudWatch?</h3>
          <p>Amazon CloudWatch es el servicio de monitoreo y observabilidad de AWS. Permite trabajar con métricas, alarmas, logs y otras señales de servicios y aplicaciones. AWS organiza las métricas mediante namespace, nombre de métrica y dimensiones.</p>
          <ConceptBadge icon="bar-chart">CloudWatch es el tablero desde donde podemos observar cómo se están comportando nuestros recursos</ConceptBadge>
          <Dialogo>Un automóvil tiene velocidad, combustible, temperatura, revoluciones. No vemos directamente cada pieza del motor — utilizamos indicadores. CloudWatch hace algo parecido con nuestra infraestructura.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>9-11. Metric y Data Point</h3>
          <p>Una <strong>Metric</strong> es una medida que cambia a lo largo del tiempo — por ejemplo, CPUUtilization: 15% → 30% → 55% → 88%.</p>
          <Nota><p>CPUUtilization es una métrica. CPUUtilization = 85% es un valor de esa métrica en un momento determinado — no son exactamente lo mismo.</p></Nota>
          <p>Cada valor registrado en un momento específico es un <strong>Data Point</strong>: un dato concreto de una métrica en un instante. Ejemplo: 10:15, CPU = 88%.</p>
        </section>

        <section className="lesson-section">
          <h3>12-14. Muchos Data Points forman una serie</h3>
          <p>10:00 → 15%, 10:05 → 20%, 10:10 → 40%, 10:15 → 65%, 10:20 → 90%. Cuando los colocamos juntos, podemos observar una tendencia — mucho más útil que "CPU = 90%" aislado.</p>
          <Nota><p>Pico vs tendencia: 20%, 22%, 95%, 21%, 20% es probablemente un pico aislado. En cambio, 20%, 35%, 55%, 75%, 95% muestra crecimiento sostenido. Aunque ambas series tienen un 95%, su significado es diferente. Un número aislado no nos dice cuánto tiempo lleva así, si acaba de subir, si está bajando, o si ocurre siempre a esa hora — necesitamos contexto temporal.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>15-17. Namespace</h3>
          <p>CloudWatch agrupa métricas dentro de <strong>Namespaces</strong>. AWS define un namespace como un contenedor para métricas — los servicios de AWS suelen utilizar nombres como <code>AWS/EC2</code>, y las métricas de namespaces diferentes permanecen separadas.</p>
          <Dialogo>Tenemos un archivador: carpeta EC2, carpeta RDS, carpeta Application Load Balancer. Dentro de EC2 encontramos CPUUtilization, NetworkIn, NetworkOut. El Namespace cumple esa organización.</Dialogo>
          <p>Ejemplos: <code>AWS/EC2</code> para Amazon EC2, <code>AWS/ApplicationELB</code> para Application Load Balancer, y existen namespaces para muchos otros servicios. La consola de CloudWatch agrupa primero las métricas por namespace y después por combinaciones de dimensiones.</p>
        </section>

        <section className="lesson-section">
          <h3>18-22. Dimension y la identidad de una métrica</h3>
          <p>Una <strong>Dimension</strong> es un par nombre = valor que permite identificar o filtrar una métrica.</p>
          <p>Tenemos diez EC2 publicando todas CPUUtilization. ¿De cuál EC2 hablamos? Usamos una Dimension: <code>InstanceId = i-123456789</code>.</p>
          <Dialogo>Tenemos "Temperatura", pero necesitamos saber de qué habitación. Entonces agregamos Habitación = 304. En CloudWatch: Metric CPUUtilization, Dimension InstanceId = i-abc123.</Dialogo>
          <Flow steps={[{ label: 'AWS/EC2' }, { label: 'CPUUtilization' }, { label: 'InstanceId = i-123' }]} />
          <p>AWS considera que la combinación de namespace, nombre y dimensiones identifica una métrica concreta.</p>
        </section>

        <section className="lesson-section">
          <h3>23-25. Empecemos con EC2</h3>
          <p>Para EC2 veremos inicialmente métricas sencillas: CPUUtilization, NetworkIn, NetworkOut. No necesitamos memorizar veinte métricas hoy.</p>
          <Nota><p>CPU alta no significa automáticamente "mal". Evitamos la regla CPU &gt; 80% = servidor malo. Una CPU alta puede ser carga legítima, procesamiento intensivo, un pico temporal, una aplicación eficiente usando recursos disponibles, o un problema — necesitamos contexto.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>26-28. NetworkIn, NetworkOut y cómo cuentan historias distintas</h3>
          <RoleGrid roles={[
            { icon: 'globe', label: 'NetworkIn', desc: 'Cuánta información está entrando por la red hacia la instancia' },
            { icon: 'globe', label: 'NetworkOut', desc: 'Cuánta información está saliendo desde la instancia' },
          ]} />
          <QaItem question="CPU 90%, Network baja. ¿Qué sospechamos?" answer="Quizá procesamiento interno intenso." />
          <QaItem question="CPU 80%, Network muy alta. ¿Qué sospechamos?" answer="Quizá mucha actividad de usuarios. Todavía no afirmamos la causa, pero tenemos mejores pistas." />
        </section>

        <section className="lesson-section">
          <h3>29-33. Ahora observamos el ALB</h3>
          <p>Application Load Balancer publica métricas en CloudWatch dentro del namespace <code>AWS/ApplicationELB</code>, incluyendo RequestCount, HealthyHostCount y métricas relacionadas con códigos de respuesta.</p>
          <RoleGrid roles={[
            { icon: 'target', label: 'RequestCount', desc: 'Solicitudes procesadas cuando el ALB pudo seleccionar un Target (AWS recomienda la estadística Sum)' },
            { icon: 'dot-success', label: 'HealthyHostCount', desc: 'Cantidad de Targets considerados saludables por el Load Balancer' },
          ]} />
          <Nota><p>Requests subiendo + Healthy Targets bajando (de 4 a 2): significa menos servidores saludables recibiendo más trabajo. Podemos esperar mayor presión sobre los restantes — ahora las métricas empiezan a conversar entre ellas. Ese es el verdadero monitoreo: no miramos CPU sola, comparamos Requests, Healthy Hosts y CPU para construir una historia.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>34-37. Ahora RDS</h3>
          <p>Nuestra aplicación termina llegando a RDS, por eso también debemos observar CPU, conexiones, almacenamiento y otras métricas según motor. La idea central: si EC2 está sana pero RDS está saturada, la página igualmente puede estar lenta.</p>
          <RoleGrid roles={[
            { icon: 'link', label: 'Database Connections', desc: '¿Cuántas conexiones existen hacia la base? (creciendo rápido puede explicar presión en la capa de datos)' },
            { icon: 'hard-drive', label: 'Free Storage Space', desc: '¿Cuánto espacio disponible queda? Aunque CPU = 20%, la base podría acercarse a otro tipo de problema' },
          ]} />
          <Nota><p>Una aplicación tiene múltiples signos vitales: ALB (solicitudes, targets saludables), EC2 (CPU, red), RDS (CPU, conexiones, almacenamiento). No existe "la métrica que explica todo".</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>38-40. Volvamos a CloudShop: tres escenarios</h3>
          <QaItem question="Requests normal, Healthy Hosts 2, EC2 CPU 20%, RDS CPU 95%. ¿Dónde investigaríamos primero?" answer="RDS. No empezamos cambiando el tipo de EC2." />
          <QaItem question="Requests 10x lo normal, Healthy Hosts 2, EC2 CPU 95%, RDS CPU 35%. ¿Qué parece más probable?" answer="La capa de aplicación está recibiendo mucha carga. Todavía investigamos, pero ya no estamos completamente a ciegas." />
          <QaItem question="Requests normal, Healthy Hosts 2 → 0. ¿Dónde empezaríamos?" answer="En los Targets: revisamos Health Check, aplicación, Security Groups y puertos — el Módulo 7 vuelve a aparecer." />
        </section>

        <section className="lesson-section">
          <h3>41. CloudWatch no reemplaza conocimientos anteriores</h3>
          <Nota><p>CloudWatch nos muestra síntomas. Pero para interpretarlos necesitamos saber qué es EC2, qué es RDS, qué es ALB, qué es Target Group. El monitoreo conecta todo el curso.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>42-43. El gráfico no decide por nosotros</h3>
          <p>CloudWatch puede mostrar una métrica en forma gráfica, y podemos observar crecimiento. Pero nosotros preguntamos: ¿qué significa? CPU sube puede significar más usuarios, proceso pesado, error, o trabajo programado.</p>
          <ConceptBadge icon="eye">La métrica es evidencia. No veredicto.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>44-49. Laboratorio conceptual: entrar a CloudWatch</h3>
          <p>Ruta: AWS Console → CloudWatch → Metrics → All metrics. La consola permite explorar métricas primero por namespace y después por dimensiones.</p>
          <p>Elegimos EC2 → Per-Instance Metrics → buscamos CPUUtilization de nuestra instancia. ¿Qué estamos usando como Dimension? InstanceId (ej. i-123456789) — entonces estamos mirando esa EC2 concreta. La consola dibuja CPUUtilization sobre un período de tiempo, y preguntamos: ¿sube? ¿baja? ¿se mantiene? ¿hay picos? No simplemente "¿cuál es el último valor?"</p>
          <Nota><p>Cambiamos el rango temporal (última hora, últimas horas, último día) y observamos que la historia cambia según cuánto tiempo estamos mirando — un pico enorme en 1 hora puede verse pequeñísimo en 30 días. Si investigamos "qué ocurrió hace diez minutos", un gráfico de 6 meses no es la mejor vista; si buscamos tendencia mensual, mirar 5 minutos tampoco. El período de observación debe responder a nuestra pregunta.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>50-51. Actividad: interpreta el gráfico</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Hora</th><th>CPU</th></tr></thead>
            <tbody>
              <tr><td>10:00</td><td>20%</td></tr>
              <tr><td>10:05</td><td>22%</td></tr>
              <tr><td>10:10</td><td>21%</td></tr>
              <tr><td>10:15</td><td>95%</td></tr>
              <tr><td>10:20</td><td>23%</td></tr>
            </tbody>
          </table>
          <QaItem question="¿Qué observas?" answer="Un pico aislado alrededor de las 10:15. No 'la EC2 está saturada todo el tiempo'." />
          <table className="table lesson-summary-table">
            <thead><tr><th>Hora</th><th>CPU</th></tr></thead>
            <tbody>
              <tr><td>10:00</td><td>20%</td></tr>
              <tr><td>10:05</td><td>35%</td></tr>
              <tr><td>10:10</td><td>55%</td></tr>
              <tr><td>10:15</td><td>72%</td></tr>
              <tr><td>10:20</td><td>91%</td></tr>
            </tbody>
          </table>
          <QaItem question="¿Qué observamos ahora?" answer="Una tendencia creciente sostenida durante ese período." />
        </section>

        <section className="lesson-section">
          <h3>52-54. Actividades</h3>
          <QaItem question="CPUUtilization / AWS/EC2 / InstanceId = i-123 / RequestCount / AWS/ApplicationELB" answer="Metric / Namespace / Dimension / Metric / Namespace." />
          <QaItem question="CPUUtilization / RequestCount / HealthyHostCount / Database Connections: ¿qué pregunta responde cada una?" answer="¿Cuánto procesador está usando la EC2? / ¿Cuántas solicitudes está procesando el ALB? / ¿Cuántos Targets se consideran saludables? / ¿Cuántas conexiones tiene la base?" />
          <QaItem question="CPUUtilization alta / HealthyHostCount = 0 / muchas conexiones de DB / RequestCount aumenta 10×. ¿Qué capa?" answer="EC2/cómputo / ALB/Targets / RDS / ALB/demanda." />
        </section>

        <section className="lesson-section">
          <h3>55-57. Tres casos detective</h3>
          <QaItem question="Requests normal, Healthy Hosts 2, EC2 CPU 18%, RDS CPU 97%. ¿Primera hipótesis?" answer="Investigar RDS. No empezamos cambiando el tipo de EC2." />
          <QaItem question="Requests muy altas, Healthy Hosts 4, EC2 CPU promedio 88%, RDS normal. ¿Primera hipótesis?" answer="Alta carga en la capa de aplicación. Podemos revisar si Auto Scaling está respondiendo." />
          <QaItem question="Requests normal, Healthy Hosts 0, EC2 CPU 5%. ¿Significa que las EC2 están relajadas y felices?" answer="No. Puede significar que nadie puede utilizarlas porque no pasan Health Check. Revisamos Health Check, Puerto, SG, Aplicación." />
        </section>

        <section className="lesson-section">
          <h3>58-60. Alto no siempre es malo, bajo no siempre es bueno</h3>
          <Nota><p>RequestCount = 0 podría significar "ningún usuario" o "nadie puede llegar a nuestra aplicación" — el número necesita contexto. Por ejemplo, HealthyHostCount = 0 es bastante bajo, y bastante terrible.</p></Nota>
          <p>Las métricas pueden representar diferentes tipos de valores: Percent, Bytes, Count, Seconds. CPU es Percent, Requests es Count, Response Time es Seconds — no mezclamos unidades sin entender qué representan.</p>
        </section>

        <section className="lesson-section">
          <h3>61-64. Modelo mental completo</h3>
          <Flow steps={[{ label: 'Namespace' }, { label: 'Metric' }, { label: 'Dimension' }, { label: 'Data Points' }, { label: 'Graph' }]} />
          <p>Ejemplo: AWS/EC2 → CPUUtilization → InstanceId = i-123 → 15%, 20%, 25%, 60% → gráfico.</p>
          <p>No todos los servicios publican exactamente las mismas métricas: EC2 → CPU, ALB → Requests/Healthy Hosts, RDS → CPU/Connections/Storage. Y más adelante encontraremos una sorpresa: memoria RAM y uso interno del disco no se tratan exactamente igual que la CPU estándar de EC2 — ahí aparecerá el CloudWatch Agent, en la Clase 6. Hoy no lo necesitamos todavía.</p>
        </section>

        <section className="lesson-section">
          <h3>65-66. RETO DE LA CLASE</h3>
          <Nota><p>EventCloud: a las 18:00 los usuarios reportan "la plataforma está lenta". RequestCount 5.000 → 40.000, HealthyHostCount 2, EC2 CPU 25% → 92%, RDS CPU 30%. ¿Qué parece estar ocurriendo?</p></Nota>
          <Reveal label="Ver la respuesta esperada">
            <p>La evidencia muestra: solicitudes aumentaron mucho + ambos Targets siguen saludables + EC2 CPU aumentó mucho + RDS sigue relativamente estable. Una hipótesis razonable: la capa de aplicación está recibiendo una carga considerablemente mayor. Investigaríamos Auto Scaling y capacidad EC2 — no empezamos escalando RDS.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>67-68. Retos nivel 2 y 3</h3>
          <QaItem question="RequestCount normal, HealthyHostCount 2, EC2 CPU 20%, RDS CPU 98%. ¿Primera capa a investigar?" answer="RDS." />
          <QaItem question="RequestCount 0, HealthyHostCount 0, EC2 CPU 2%. ¿Celebramos porque la CPU está baja?" answer="No. Probablemente tenemos un problema serio de disponibilidad. Revisamos Targets, Health Checks, ALB y Aplicación." />
        </section>

        <section className="lesson-section">
          <h3>69-70. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El gerente propone: "si CPU está debajo del 20%, significa que todo funciona bien." No estoy de acuerdo porque CPU representa solo una señal y una aplicación puede fallar por red, base de datos, errores o falta de Targets saludables con CPU baja. Esto es lo que haría en su lugar: correlacionar varias métricas relevantes. El riesgo de su enfoque es declarar sano un sistema que puede estar completamente fuera de servicio.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: "miremos solo el último valor de cada métrica." No estoy de acuerdo porque un valor aislado puede ocultar tendencias o picos importantes. Esto es lo que haría en su lugar: observar los datos dentro de una ventana temporal adecuada. El riesgo es interpretar incorrectamente comportamientos que solo son claros al ver su evolución.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>71. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'CloudWatch sirve únicamente para EC2.', correct: false },
            { text: 'Una métrica cambia a lo largo del tiempo.', correct: true },
            { text: 'Namespace ayuda a organizar métricas.', correct: true },
            { text: 'InstanceId puede ser una Dimension.', correct: true },
            { text: 'CPU alta siempre significa que la aplicación está fallando.', correct: false },
            { text: 'HealthyHostCount puede ayudarnos a observar cuántos Targets están saludables.', correct: true },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>72. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>73. Reto oral</h3>
          <Dialogo>Explícame una métrica sin utilizar las palabras métrica, medir, número, valor, tiempo, CloudWatch, AWS, gráfico, dato, monitor ni recurso.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Es una señal que registra cómo cambia determinada característica de un sistema y nos permite comparar su comportamiento entre distintos momentos."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>75. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Monitorear</td><td>Observar comportamiento</td></tr>
              <tr><td>CloudWatch</td><td>Servicio de monitoreo</td></tr>
              <tr><td>Metric</td><td>Lo que medimos</td></tr>
              <tr><td>Data Point</td><td>Valor en un momento</td></tr>
              <tr><td>Namespace</td><td>Familia de métricas</td></tr>
              <tr><td>Dimension</td><td>Identifica a quién pertenece</td></tr>
              <tr><td>CPUUtilization</td><td>Uso de CPU</td></tr>
              <tr><td>NetworkIn/Out</td><td>Movimiento de red</td></tr>
              <tr><td>RequestCount</td><td>Solicitudes procesadas por ALB</td></tr>
              <tr><td>HealthyHostCount</td><td>Targets saludables</td></tr>
              <tr><td>DB Connections</td><td>Conexiones de base</td></tr>
              <tr><td>Free Storage</td><td>Espacio disponible</td></tr>
              <tr><td>Tendencia</td><td>Evolución a lo largo del tiempo</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>76. Ticket de salida</h3>
          <Dialogo>CloudShop está lenta. EC2 tiene CPU de 15%, RDS tiene CPU de 95% y el ALB mantiene dos Targets saludables. ¿Qué nos dicen las métricas y dónde investigarías primero?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Las métricas no prueban por sí solas la causa, pero muestran que EC2 tiene poca utilización, los Targets siguen saludables y RDS presenta una utilización muy alta. Investigaría primero la capa de base de datos antes de aumentar capacidad EC2.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 2</div>
          <table className="table lesson-summary-table">
            <thead><tr><th>Hora</th><th>CPU</th></tr></thead>
            <tbody>
              <tr><td>10:00</td><td>20%</td></tr>
              <tr><td>10:01</td><td>100%</td></tr>
              <tr><td>10:02</td><td>20%</td></tr>
              <tr><td>10:03</td><td>20%</td></tr>
              <tr><td>10:04</td><td>20%</td></tr>
            </tbody>
          </table>
          <p>"¿La CPU estuvo realmente al 100% durante estos cinco minutos?" Depende de cómo decidamos resumir esos datos: podemos mirar Average, Maximum, Minimum o Sum y obtener lecturas diferentes. Además debemos decidir: ¿1 minuto? ¿5 minutos? ¿15 minutos?</p>
          <ConceptBadge icon="bar-chart">Módulo 8 · Clase 2 — Métricas, estadísticas y períodos: cómo interpretar correctamente los gráficos de CloudWatch</ConceptBadge>
          <span className="tag tag-outline">Módulo 8 · Clase 2 · próximamente</span>
        </div>

      </div>
    </div>
  );
}
