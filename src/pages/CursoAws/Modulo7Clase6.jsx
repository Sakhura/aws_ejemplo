import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué es una Scaling Policy?', options: [{ text: 'Regla que controla cambios de capacidad.', correct: true }, { text: 'Security Group.', correct: false }, { text: 'Backup.', correct: false }, { text: 'AMI.', correct: false }] },
  { q: '¿Qué significa Scale Out?', options: [{ text: 'Agregar instancias.', correct: true }, { text: 'Eliminar instancias.', correct: false }, { text: 'Crear RDS.', correct: false }, { text: 'Crear Target Group.', correct: false }] },
  { q: '¿Qué significa Scale In?', options: [{ text: 'Reducir instancias.', correct: true }, { text: 'Agregar instancias.', correct: false }, { text: 'Crear ALB.', correct: false }, { text: 'Crear VPC.', correct: false }] },
  { q: '¿Qué es Target Tracking?', options: [{ text: 'Política que intenta mantener una métrica cerca de un objetivo.', correct: true }, { text: 'Health Check.', correct: false }, { text: 'Launch Template.', correct: false }, { text: 'Snapshot.', correct: false }] },
  { q: '¿Qué servicio proporciona métricas como CPU?', options: [{ text: 'CloudWatch.', correct: true }, { text: 'S3.', correct: false }, { text: 'Route 53 exclusivamente.', correct: false }, { text: 'IAM.', correct: false }] },
  { q: 'Si CPU está muy por encima del objetivo, ¿qué podemos esperar?', options: [{ text: 'Scale Out.', correct: true }, { text: 'Scale In.', correct: false }, { text: 'Borrar el ALB.', correct: false }, { text: 'Crear snapshot.', correct: false }] },
  { q: 'Si la carga cae mucho, ¿qué puede ocurrir?', options: [{ text: 'Scale In.', correct: true }, { text: 'Scale Out obligatorio.', correct: false }, { text: 'Crear otra VPC.', correct: false }, { text: 'Eliminar RDS.', correct: false }] },
  { q: '¿Qué limita el crecimiento superior?', options: [{ text: 'Maximum Capacity.', correct: true }, { text: 'Minimum.', correct: false }, { text: 'Health Path.', correct: false }, { text: 'Listener.', correct: false }] },
  { q: '¿Qué evita bajar de una determinada cantidad?', options: [{ text: 'Minimum Capacity.', correct: true }, { text: 'Maximum.', correct: false }, { text: 'Target Group.', correct: false }, { text: 'AMI.', correct: false }] },
  { q: '¿Qué es Instance Warmup?', options: [{ text: 'Tiempo para que nuevas instancias se preparen antes de considerarlas plenamente para escalado.', correct: true }, { text: 'Backup de EC2.', correct: false }, { text: 'Reinicio del ALB.', correct: false }, { text: 'Nuevo Target Group.', correct: false }] },
];

export default function Modulo7Clase6() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 7 · Clase 6</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 7 · Clase 6: Políticas de escalado, Scale Out, Scale In y Target Tracking</h2>
      <p className="lesson-subtitle">
        Una política de escalado observa una métrica y ajusta la cantidad de instancias para intentar mantenerla cerca de un objetivo.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + métricas + configuración guiada + diagnóstico + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 7 · Clases 1 a 5</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es una Scaling Policy y comprender qué significan Scale Out y Scale In.</li>
            <li>Explicar qué es Target Tracking Scaling y relacionar Auto Scaling con métricas de CloudWatch.</li>
            <li>Utilizar conceptualmente CPU promedio como métrica y reconocer métricas relacionadas con el ALB.</li>
            <li>Comprender qué representa un valor objetivo y cómo una política modifica la capacidad deseada.</li>
            <li>Comprender el papel de Minimum y Maximum Capacity, y el concepto de Instance Warmup.</li>
            <li>Reconocer riesgos de una política demasiado agresiva.</li>
            <li>Diseñar una política básica según necesidades del negocio.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-4. Recordemos nuestro ASG</h3>
          <Nota><p>Tenemos Minimum = 2, Desired = 2, Maximum = 6. Actualmente A y B. Todo funciona, hasta que empieza una venta especial: CPU A = 90%, CPU B = 92%. Pero el ASG sigue pensando Desired = 2. ¿Quién le dice que necesitamos más capacidad?</p></Nota>
          <p>Necesitamos una <strong>Scaling Policy</strong>: una regla que dice cuándo aumentar o reducir la cantidad de servidores.</p>
          <Flow steps={[{ label: 'Métrica' }, { label: 'Política' }, { icon: 'bar-chart', label: 'Auto Scaling' }, { label: 'Cantidad cambia' }]} />
        </section>

        <section className="lesson-section">
          <h3>5-7. ¿Qué es Target Tracking?</h3>
          <Dialogo>Configuramos un aire acondicionado con temperatura objetivo 22°C. Si tenemos 29°C, el sistema trabaja más. Si tenemos 18°C, reduce esfuerzo. Una política de Target Tracking funciona conceptualmente de forma parecida.</Dialogo>
          <p>Target Tracking permite seleccionar una métrica y establecer un valor objetivo; Auto Scaling ajusta capacidad para intentar mantener esa métrica cerca del objetivo — AWS lo compara precisamente con un termostato.</p>
          <ConceptBadge icon="target">"Quiero que esta medida se mantenga aproximadamente en este valor"</ConceptBadge>
          <p>Ejemplo: Métrica Average CPU Utilization, Target 50% — intentar mantener la CPU promedio del Auto Scaling Group alrededor del 50%.</p>
        </section>

        <section className="lesson-section">
          <h3>8-11. CPU demasiado alta y Scale Out</h3>
          <p>Con Target 50% y CPU real 85%, los servidores están trabajando mucho más que nuestro objetivo — la política puede provocar Scale Out: agregar capacidad horizontalmente.</p>
          <p>¿Por qué baja la CPU? Antes 1.000 solicitudes ÷ 2 servidores; después 1.000 solicitudes ÷ 4 servidores — cada uno recibe conceptualmente menos trabajo promedio.</p>
          <Dialogo>Tenemos dos cajas y una fila enorme. Abrimos dos más. La carga por cajero disminuye. Eso representa Scale Out.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>12-15. Ahora baja la demanda: Scale In</h3>
          <p>Horas después, CPU promedio 15% pero nuestro objetivo es 50% — tenemos demasiada capacidad para la carga. Auto Scaling puede realizar <strong>Scale In</strong>: retirar capacidad, siempre respetando Minimum Capacity.</p>
          <Nota><p>Sin Scale In podríamos mantener 6 EC2 toda la madrugada aunque necesitemos solo 2 — eso significa recursos ociosos y mayor costo.</p></Nota>
          <Flow steps={[
            { label: 'Carga normal' }, { label: '2 EC2' }, { label: 'Carga aumenta' }, { label: 'Métrica sube' },
            { label: 'Scale Out' }, { label: '4 EC2' }, { label: 'Carga disminuye' }, { label: 'Métrica baja' }, { label: 'Scale In' }, { label: '2 EC2' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>16-20. ¿De dónde salen las métricas?</h3>
          <p>AWS utiliza <strong>Amazon CloudWatch</strong> para recopilar y utilizar métricas relacionadas con los recursos.</p>
          <ConceptBadge icon="bar-chart">CloudWatch funciona como el tablero de instrumentos que nos muestra cómo se comporta la infraestructura</ConceptBadge>
          <Dialogo>Tenemos combustible, temperatura, revoluciones, velocidad. No conducimos mirando el motor directamente — miramos métricas. En AWS, CPU, Network y Requests cumplen un rol parecido.</Dialogo>
          <p>Métrica común: <code>CPUUtilization</code>, que representa cuánto se está utilizando el procesador. No existe un porcentaje universal que sea "bueno" para todas las aplicaciones.</p>
        </section>

        <section className="lesson-section">
          <h3>19-21. CPU alta no significa automáticamente desastre</h3>
          <p>Una CPU de 80% durante 5 segundos puede no justificar ninguna acción. Pero 90% durante mucho tiempo puede indicar capacidad insuficiente — debemos observar comportamiento, no números aislados.</p>
          <Nota><p>Target = 50% no es ley universal. La métrica objetivo debe elegirse según la aplicación, tiempos de respuesta, patrón de carga, pruebas y costo. Target Tracking intenta equilibrar: evitar CPU 95% pero también CPU 3% en una gran flota — buscamos capacidad suficiente sin exceso absurdo.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>22-25. La política no crea directamente EC2</h3>
          <Flow steps={[{ label: 'Scaling Policy' }, { label: '"Necesitamos más capacidad"' }, { icon: 'bar-chart', label: 'Auto Scaling Group' }, { label: 'Cambia Desired' }, { icon: 'file-text', label: 'Launch Template' }, { icon: 'server', label: 'Nueva EC2' }]} />
          <p>La política toma la decisión. El ASG ejecuta el cambio, apoyándose en el Launch Template de la Clase 5. Si crear una instancia tarda veinte minutos, la respuesta a un pico puede ser demasiado lenta.</p>
        </section>

        <section className="lesson-section">
          <h3>25-29. Crear capacidad toma tiempo: Instance Warmup</h3>
          <Flow steps={[{ label: 'Scale Out' }, { label: 'Launch EC2' }, { label: 'Boot' }, { label: 'User Data' }, { label: 'Application' }, { label: 'Health Check' }, { icon: 'dot-success', label: 'Healthy' }]} />
          <p>No ocurre instantáneamente. Ahí aparece <strong>Instance Warmup</strong>: un período durante el cual damos tiempo a una nueva instancia para arrancar y comenzar a trabajar antes de utilizar plenamente su información en nuevas decisiones de escalado.</p>
          <Dialogo>Contratamos un nuevo cocinero. No contamos su productividad completa cuando todavía está entrando, preparando su estación y encendiendo la cocina. Le damos tiempo de preparación. Eso es el warmup.</Dialogo>
          <Nota><p>Sin warmup adecuado: CPU alta → ASG crea C, pero C todavía está iniciando. El sistema observa "la CPU sigue alta" y puede pensar "necesito D", después "necesito E" — y podríamos escalar demasiado rápido. Una nueva instancia necesita demostrar que ya forma parte real de la capacidad disponible.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>30-33. Otra métrica: solicitudes por Target</h3>
          <p>Cuando usamos un Application Load Balancer, Target Tracking puede utilizar métricas relacionadas con solicitudes por Target, por ejemplo <code>ALBRequestCountPerTarget</code>: podemos escalar según cuánto trabajo recibe aproximadamente cada servidor.</p>
          <p>Ejemplo: queremos aprox. 1.000 solicitudes por Target. Tenemos 4.000 solicitudes con 2 Targets — cada uno recibe aproximadamente 2.000, así que podemos necesitar más capacidad. Con 4.000 ÷ 4 Targets = 1.000 aprox., estamos más cerca del objetivo.</p>
          <RoleGrid roles={[
            { icon: 'bar-chart', label: 'CPU', desc: '¿Cuánto trabaja el procesador?' },
            { icon: 'target', label: 'Request Count per Target', desc: '¿Cuántas solicitudes recibe cada Target?' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>34-36. Elegir la métrica equivocada puede ser inútil</h3>
          <Nota><p>Si nuestra aplicación usa poca CPU pero espera muchísimo a servicios externos, la CPU puede permanecer baja aunque la aplicación esté saturada por otra razón — escalar solo por CPU podría no representar correctamente la carga. Queremos una métrica que cambie con la carga, disminuya cuando agregamos capacidad, y tenga relación con el problema que intentamos resolver.</p></Nota>
          <p>Configurar CPU target = 10% porque "10 es un número bonito" puede provocar mucha capacidad ociosa — el objetivo debe tener una razón.</p>
        </section>

        <section className="lesson-section">
          <h3>37-39. Oscilación y estabilidad</h3>
          <p>Otro problema que queremos evitar: 2 instancias → 4 → 2 → 4 → 2 → 4 continuamente, como una puerta automática con ansiedad. AWS aplica mecanismos para evitar reacciones innecesariamente rápidas, y elementos como warmup y el comportamiento de Target Tracking ayudan a estabilizar el escalado — no queremos reaccionar a cada pequeño movimiento de la métrica.</p>
        </section>

        <section className="lesson-section">
          <h3>39-42. Scale In cuidadoso, y Maximum/Minimum siguen mandando</h3>
          <p>Agregar capacidad suele ser menos peligroso que quitar demasiada. Si eliminamos servidores muy rápido, podemos provocar una nueva saturación — por eso la reducción debe ser controlada.</p>
          <QaItem question="Min = 2, Desired = 2, Max = 6. La carga sube muchísimo y la política quisiera 10 instancias. ¿Qué ocurre?" answer="El grupo no superará Max = 6 por esa política." />
          <Nota><p>Eso no significa que el sistema esté bien: si seis instancias no alcanzan, Max = 6 se transforma en un límite de capacidad y debemos revisar arquitectura, cuotas, presupuesto y rendimiento.</p></Nota>
          <QaItem question="La carga cae a cero, la política quiere 1 instancia, pero Minimum = 2. ¿Qué ocurre?" answer="Mantenemos al menos 2 — Minimum protege nuestro piso de capacidad." />
          <RoleGrid roles={[
            { icon: 'lock', label: 'Minimum', desc: 'Protege capacidad mínima' },
            { icon: 'target', label: 'Target Tracking', desc: 'Ajusta según demanda' },
            { icon: 'zap', label: 'Maximum', desc: 'Limita crecimiento' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>44-49. Caso CloudShop: el ciclo completo</h3>
          <Nota><p>Configuración: Minimum 2, Desired 2, Maximum 6. Target Tracking Average CPU 50%. Estado: CPU promedio 82%. Esperamos Scale Out.</p></Nota>
          <p>El ASG pasa a Desired = 4 y crea C y D. Tras arrancar, CPU promedio 48% — cerca del objetivo. Horas más tarde, CPU promedio 18%: Auto Scaling puede comenzar Scale In hasta acercarse a 50%, sin bajar de Minimum = 2.</p>
          <Nota><p>Target Tracking no busca exactamente 50.0000%: no pensamos "si está en 49,9 crea algo; si está en 50,1 elimina algo". El sistema busca mantener la métrica aproximadamente alrededor del objetivo utilizando sus mecanismos de escalado.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>50-54. Scheduled y Predictive Scaling</h3>
          <p>Auto Scaling también puede modificar capacidad según horarios programados: por ejemplo, 08:00 → Desired 6, 22:00 → Desired 2 (<strong>Scheduled Scaling</strong>). Si sabemos que la matrícula universitaria comienza el lunes a las 08:00, podemos preparar capacidad antes del pico, en vez de esperar a que la CPU suba.</p>
          <RoleGrid roles={[
            { icon: 'bar-chart', label: 'Dynamic', desc: '"Está pasando ahora"' },
            { icon: 'clock', label: 'Scheduled', desc: '"Sé cuándo ocurrirá"' },
            { icon: 'search', label: 'Predictive', desc: '"Los patrones indican que probablemente ocurrirá"' },
          ]} />
          <p>AWS también ofrece Predictive Scaling, que utiliza patrones históricos para anticipar capacidad futura — para nuestro nivel lo reconoceremos, pero no lo configuraremos en profundidad. Nuestro foco sigue siendo Target Tracking.</p>
        </section>

        <section className="lesson-section">
          <h3>55-58. Actividades</h3>
          <QaItem question="CPU 90%, Target 50%." answer="Scale Out." />
          <QaItem question="CPU 12%, Target 50%." answer="Scale In probable." />
          <QaItem question="Alta demanda de solicitudes / madrugada y poca carga" answer="Scale Out / Scale In." />
          <QaItem question="Minimum = 2 / Maximum = 8 / CPU target = 50% / Desired = 4" answer="Piso / Techo / Objetivo de escalado / Cantidad que el grupo intenta mantener ahora." />
          <QaItem question="Aplicación donde el uso de CPU crece claramente con más usuarios, vs. aplicación detrás de ALB donde la carga se relaciona con el número de requests. ¿Qué métrica evaluamos?" answer="CPUUtilization en el primer caso; Requests por Target puede ser interesante en el segundo." />
          <Nota><p>Podemos tener múltiples políticas, pero eso requiere comprender cómo interactúan. Para nuestro curso inicial, una política Target Tracking sencilla es suficiente — no necesitamos crear 17 políticas para sentirnos arquitectos.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>59-61. Laboratorio conceptual: creamos la política</h3>
          <p>Ruta conceptual: Auto Scaling Groups → cloudshop-web-asg → Automatic scaling → Create dynamic scaling policy.</p>
          <InfoBox items={['Policy type: Target tracking', 'Métrica: Average CPU utilization', 'Target: 50']} />
          <p>Configuramos un warmup apropiado según cuánto demora nuestra instancia en estar realmente disponible — si Boot + User Data + App toman varios minutos, debemos considerar ese comportamiento. No existe un warmup universal para todas las aplicaciones.</p>
        </section>

        <section className="lesson-section">
          <h3>62-67. Generamos carga conceptual: la arquitectura respira sola</h3>
          <p>Nuestro ASG comienza con A y B, CPU 20%. Generamos carga: la CPU sube a 40%, 60%, 80%. La política observa que la métrica está sobre el objetivo — esperamos Scale Out: Desired 2 → 3, después posiblemente 3 → 4, según comportamiento y necesidad. Las nuevas instancias nacen mediante el Launch Template y se integran con el ALB: Target Group → Health Check → Healthy → recibe tráfico.</p>
          <p>Después quitamos carga: CPU promedio 20%. Tras el comportamiento correspondiente, Desired 4 → 3 → 2, sin bajar de Minimum = 2.</p>
          <Nota><p><strong>Elasticidad</strong> significa que nuestra infraestructura puede crecer y reducirse según necesidad — no es lo mismo que simplemente "tener muchas máquinas".</p></Nota>
          <Dialogo>Carga alta: acordeón expandido. Carga baja: acordeón contraído. Ese movimiento representa muy bien la elasticidad.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>68-70. Elasticidad no significa capacidad infinita ni pagar menos siempre</h3>
          <p>Tenemos Maximum Capacity, Service Quotas, dependencias, presupuesto y límites de aplicación. Cloud no convierte infinito en una configuración válida. El costo también escala: 2 EC2 cuestan menos que 6 EC2. Auto Scaling puede ahorrar al reducir capacidad, pero cuando necesita más, el costo también aumenta — eso es esperado.</p>
          <Nota><p>El objetivo no es pagar menos siempre: es pagar por capacidad apropiada para la demanda y nivel de servicio. Ahorrar hasta provocar caídas no es optimización; sobredimensionar permanentemente tampoco.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>71-75. Cuatro diagnósticos</h3>
          <QaItem question="CPU 95%, pero no escala. ¿Qué revisamos?" answer="¿Scaling Policy existe? ¿Métrica correcta? ¿Maximum alcanzado? ¿ASG puede lanzar instancias? ¿Hay errores de capacidad/cuotas? No asumimos que Auto Scaling está roto." />
          <QaItem question="Min = 2, Desired = 6, Max = 6, CPU = 95%. ¿Por qué no crea más?" answer="Alcanzó Maximum Capacity — ahora debemos revisar si el máximo sigue siendo adecuado." />
          <QaItem question="2 → 4 → 6 muy rápidamente, pero la carga ya había bajado. ¿Qué investigamos?" answer="Target demasiado bajo, warmup inadecuado, métrica poco representativa, o que la aplicación tarda en arrancar." />
          <QaItem question="C y D están Running pero Unhealthy. ¿Qué ocurre?" answer="Tenemos más máquinas, pero ninguna capacidad útil nueva. Revisamos Launch Template, User Data, SG y Health Check — las clases anteriores vuelven al escenario." />
          <Nota><p>Escalar infraestructura dañada no ayuda: 2 servidores rotos convertidos en 6 servidores rotos no es alta disponibilidad, es una colección premium de problemas.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>76-79. Dos propuestas que rechazar, y RDS también debe soportar la carga</h3>
          <Nota>
            <p>El gerente propone: "pongamos CPU objetivo en 5% para garantizar que jamás se sature." No estoy de acuerdo porque obligaría al grupo a mantener mucha capacidad ociosa. Esto es lo que haría en su lugar: definir el objetivo mediante pruebas de rendimiento y experiencia esperada. El riesgo de su enfoque es aumentar costos de forma importante sin demostrar beneficio.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: "pongamos Maximum en 500, si hay problemas que AWS cree lo que necesite." No estoy de acuerdo porque el máximo funciona como límite técnico y financiero. Esto es lo que haría en su lugar: establecer un máximo basado en capacidad probada, dependencias y presupuesto. El riesgo es un crecimiento de infraestructura costoso que incluso podría sobrecargar servicios aguas abajo como RDS.</p>
          </Nota>
          <p>Escalar Web no escala mágicamente Database: si pasamos de 2 EC2 a 20 EC2, RDS puede recibir muchas más conexiones y consultas. Cada capa de la arquitectura (Usuarios → ALB → EC2 × N → RDS) debe ser monitoreada.</p>
        </section>

        <section className="lesson-section">
          <h3>80-83. RETO DE LA CLASE</h3>
          <Nota><p>EventCloud: Auto Scaling Group Minimum 2, Desired 2, Maximum 8. Durante una venta, CPU promedio = 85%. Política Target Tracking, CPU target = 50%. ¿Qué comportamiento esperamos?</p></Nota>
          <Reveal label="Ver la respuesta esperada">
            <p>Auto Scaling debería aumentar Desired Capacity y lanzar nuevas instancias mediante el Launch Template hasta que la carga se distribuya y la métrica se acerque al objetivo, respetando Maximum = 8.</p>
          </Reveal>
          <QaItem question="Después de la venta, CPU promedio = 15% con 6 instancias. ¿Qué esperamos?" answer="Scale In progresivo hasta una capacidad apropiada, sin bajar de Minimum = 2." />
          <QaItem question="CPU = 95%, Desired = 8, Maximum = 8, y los usuarios siguen reportando lentitud. ¿Qué hacemos?" answer="No podemos asumir que Auto Scaling pueda seguir creciendo bajo esos límites. Revisamos si Max debe aumentar, si existe otro cuello de botella, si RDS está saturada, si el código está optimizado, o si hay cuotas o límites." />
        </section>

        <section className="lesson-section">
          <h3>84. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'Auto Scaling sabe cuándo crecer aunque no tenga políticas ni cambios de Desired.', correct: false },
            { text: 'Scale Out agrega capacidad.', correct: true },
            { text: 'Scale In reduce capacidad.', correct: true },
            { text: 'Target Tracking trabaja con una métrica objetivo.', correct: true },
            { text: 'Maximum puede impedir seguir escalando.', correct: true },
            { text: 'Warmup da tiempo a nuevas instancias para prepararse.', correct: true },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>85. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>86. Reto oral</h3>
          <Dialogo>Explícame Target Tracking sin utilizar las palabras Auto Scaling, Target, Tracking, CPU, métrica, instancia, servidor, AWS, máximo, mínimo, política ni Cloud.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Es un mecanismo que observa una medida de trabajo, la compara con un valor que queremos mantener y aumenta o reduce la cantidad de trabajadores según sea necesario."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>88. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Scaling Policy</td><td>Regla para cambiar capacidad</td></tr>
              <tr><td>Scale Out</td><td>Agregar EC2</td></tr>
              <tr><td>Scale In</td><td>Reducir EC2</td></tr>
              <tr><td>Target Tracking</td><td>Mantener una métrica cerca de un objetivo</td></tr>
              <tr><td>CloudWatch</td><td>Fuente de métricas</td></tr>
              <tr><td>CPUUtilization</td><td>Uso de CPU</td></tr>
              <tr><td>Requests/Target</td><td>Trabajo recibido por servidor</td></tr>
              <tr><td>Minimum</td><td>Piso de capacidad</td></tr>
              <tr><td>Desired</td><td>Capacidad buscada actualmente</td></tr>
              <tr><td>Maximum</td><td>Techo de capacidad</td></tr>
              <tr><td>Warmup</td><td>Tiempo de preparación</td></tr>
              <tr><td>Elasticidad</td><td>Crecer y reducir según necesidad</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>89. Ticket de salida</h3>
          <Dialogo>Tenemos Minimum 2, Desired 2, Maximum 6 y una política Target Tracking con CPU objetivo de 50%. La CPU promedio permanece en 85%. ¿Qué debería intentar hacer Auto Scaling?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Debería aumentar la capacidad mediante Scale Out, modificando la capacidad deseada y creando nuevas instancias hasta intentar acercar la CPU promedio al objetivo, sin superar Maximum = 6.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 7</div>
          <p>Ya tenemos todas las piezas individuales: ALB, Listener, Target Group, Health Check, Auto Scaling Group, Launch Template, Scaling Policy. Pero saber qué hace cada una por separado todavía no demuestra que podamos construir una arquitectura resiliente. Ahora necesitamos juntarlas.</p>
          <Flow steps={[
            { icon: 'globe', label: 'Internet' }, { icon: 'settings', label: 'ALB' }, { icon: 'target', label: 'Target Group' },
            { icon: 'building', label: 'AZ A + AZ B' }, { icon: 'server', label: 'EC2' }, { icon: 'bar-chart', label: 'ASG' }, { icon: 'database', label: 'RDS' },
          ]} />
          <ConceptBadge icon="bar-chart">Módulo 7 · Clase 7 — ALB + Auto Scaling + Multi-AZ: construir una aplicación que distribuya carga, reemplace fallas y crezca automáticamente</ConceptBadge>
          <span className="tag tag-outline">Módulo 7 · Clase 7 · próximamente</span>
        </div>

      </div>
    </div>
  );
}
