import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, Flow, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const HANDLER_ENV_VARS = `exports.handler = async (event, context) => {
  const topicArn = process.env.SNS_TOPIC_ARN;
  const umbral = Number(process.env.UMBRAL_CALIFICACION_BAJA);

  console.log("Publicando en:", topicArn, "si rating <=", umbral);
  // ...
};`;

const TIMEOUT_ERROR = `2026-09-04T11:02:15Z Task timed out after 3.00 seconds`;

const QUIZ_QUESTIONS = [
  { q: '¿Qué controla la memoria asignada a una función Lambda?', options: [{ text: 'Cuánta RAM tiene disponible la función, y proporcionalmente también su capacidad de CPU.', correct: true }, { text: 'Solo el precio, sin ningún efecto en el rendimiento.', correct: false }, { text: 'El lenguaje de programación permitido.', correct: false }, { text: 'El número de invocaciones simultáneas permitidas.', correct: false }] },
  { q: '¿Qué ocurre si una función supera su timeout configurado?', options: [{ text: 'Lambda corta la ejecución y registra un error de tipo "Task timed out".', correct: true }, { text: 'La función espera indefinidamente hasta terminar.', correct: false }, { text: 'AWS aumenta el timeout automáticamente.', correct: false }, { text: 'No pasa nada, simplemente tarda más en responder.', correct: false }] },
  { q: '¿Para qué sirven las variables de entorno en Lambda?', options: [{ text: 'Para pasar configuración a la función sin escribirla directamente en el código.', correct: true }, { text: 'Para guardar contraseñas de forma segura, reemplazando a Secrets Manager.', correct: false }, { text: 'Para definir el runtime de la función.', correct: false }, { text: 'Para aumentar la memoria disponible.', correct: false }] },
  { q: '¿Qué es un cold start?', options: [{ text: 'El tiempo extra que toma la primera invocación cuando Lambda debe preparar un nuevo entorno de ejecución.', correct: true }, { text: 'Un error que impide que la función se ejecute.', correct: false }, { text: 'El momento en que se elimina una función.', correct: false }, { text: 'Un tipo de timeout.', correct: false }] },
  { q: '¿Una invocación inmediatamente después de otra reciente suele sufrir cold start?', options: [{ text: 'No, generalmente reutiliza el mismo entorno ya preparado (warm start).', correct: true }, { text: 'Sí, siempre.', correct: false }] },
  { q: '¿Dónde deberían vivir credenciales sensibles como una contraseña de base de datos, según lo visto en el Módulo 9?', options: [{ text: 'En AWS Secrets Manager, no en una variable de entorno sin protección adicional.', correct: true }, { text: 'En una variable de entorno común, es exactamente lo mismo.', correct: false }, { text: 'Directamente escritas en el handler.', correct: false }, { text: 'En un comentario del código.', correct: false }] },
];

export default function Modulo10Clase5() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 10 · Clase 5</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 10 · Clase 5: Configuración, límites y cold starts — memoria, timeout, variables de entorno y rendimiento</h2>
      <p className="lesson-subtitle">
        Que no administremos el servidor no significa que no debamos entender cómo se comporta.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + configuración guiada + casos + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 10 · Clases 1 a 4</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué controla la memoria configurada en una función Lambda.</li>
            <li>Explicar qué es el timeout y qué ocurre cuando se supera.</li>
            <li>Usar variables de entorno para configurar una función sin hardcodear valores.</li>
            <li>Diferenciar variables de entorno comunes de secretos (Módulo 9, Secrets Manager).</li>
            <li>Explicar qué es un cold start y por qué ocurre.</li>
            <li>Ajustar memoria y timeout de forma razonada para una función concreta.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-3. Recordemos dónde quedamos</h3>
          <p>La función de reseñas de CloudShop ya tiene permisos correctos (Clase 4). Pero el equipo empieza a hacer preguntas más finas: &quot;¿cuánta memoria le damos?&quot;, &quot;¿qué pasa si tarda demasiado?&quot;, y alguien nota algo raro: &quot;la primera vez que la uso después de un rato sin actividad, se siente más lenta que las siguientes veces. ¿Por qué?&quot;</p>
        </section>

        <section className="lesson-section">
          <h3>4-6. Memoria: no es solo RAM</h3>
          <p>Al configurar una función, elegimos cuánta <strong>memoria</strong> tiene disponible. Lo que sorprende a casi todos: en Lambda, la memoria asignada también determina, proporcionalmente, cuánta capacidad de CPU recibe la función. Más memoria no es solo &quot;más espacio&quot; — también puede significar ejecución más rápida.</p>
          <ConceptBadge icon="zap">Duplicar la memoria puede, en muchos casos, reducir el tiempo de ejecución — y a veces el costo total termina siendo similar o incluso menor.</ConceptBadge>
          <Nota><p>Esto no es intuitivo viniendo de EC2 (Módulo 3), donde elegíamos CPU y memoria como cosas separadas. En Lambda van de la mano.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>7-9. Timeout: cuánto tiempo le damos antes de cortar</h3>
          <p>El <strong>timeout</strong> define el tiempo máximo que Lambda deja correr una invocación antes de detenerla por la fuerza. Si la función no termina antes de ese límite, la ejecución se corta y se registra un error.</p>
          <pre className="codeblock">{TIMEOUT_ERROR}</pre>
          <QaItem question="Nuestra función de reseñas normalmente tarda 300 ms, pero configuramos un timeout de 3 segundos. ¿Es razonable?" answer="Sí — da margen para variaciones normales sin ser exageradamente largo. Un timeout demasiado corto cortaría ejecuciones legítimas; uno demasiado largo podría dejar una función colgada consumiendo tiempo (y costo) innecesariamente ante un problema real." />
        </section>

        <section className="lesson-section">
          <h3>10-12. Variables de entorno: configuración sin hardcodear</h3>
          <p>En vez de escribir valores fijos dentro del código, podemos definir <strong>variables de entorno</strong> en la configuración de la función, y leerlas desde el handler.</p>
          <pre className="codeblock">{HANDLER_ENV_VARS}</pre>
          <p>Así, cambiar el ARN del topic SNS o el umbral de calificación baja no requiere modificar ni volver a desplegar el código — solo actualizar la configuración.</p>
        </section>

        <section className="lesson-section">
          <h3>13-15. Variables de entorno no son lo mismo que secretos</h3>
          <QaItem question="¿Debería la contraseña de una base de datos guardarse como variable de entorno de Lambda?" answer="No como práctica principal — el Módulo 9 nos enseñó que ese tipo de credencial pertenece a AWS Secrets Manager, con permisos IAM específicos sobre quién puede leerla. Las variables de entorno son mejores para configuración no sensible: nombres de recursos, umbrales, flags." />
          <Nota><p>Las variables de entorno de Lambda pueden cifrarse, pero eso no las convierte automáticamente en el lugar correcto para un secreto rotable con control de acceso fino — para eso seguimos prefiriendo Secrets Manager.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>16-18. Aparece el cold start</h3>
          <p>Cuando una función no ha sido invocada en un rato, AWS libera el entorno que la ejecutaba. La siguiente invocación requiere preparar uno nuevo: descargar el código, iniciar el runtime, ejecutar cualquier código de inicialización — antes de siquiera llegar al handler. A eso se le llama <strong>cold start</strong>.</p>
          <Flow steps={[{ label: 'Sin actividad' }, { icon: 'clock', label: 'Nueva invocación' }, { label: 'Preparar entorno (cold start)' }, { icon: 'zap', label: 'Ejecutar handler' }]} />
          <Dialogo>Es como un horno que se apagó: la primera vez que lo enciendes de nuevo, tarda en calentarse antes de poder cocinar algo. Mientras se mantiene encendido y en uso, cada plato siguiente sale mucho más rápido.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>19-21. Warm start: las invocaciones siguientes</h3>
          <p>Si la función vuelve a invocarse poco después, Lambda suele reutilizar el mismo entorno ya preparado — un <strong>warm start</strong>, mucho más rápido porque se salta toda la preparación inicial.</p>
          <QaItem question="Una función que recibe tráfico constante todo el día, ¿sufre cold starts con la misma frecuencia que una que se usa una vez por semana?" answer="No — con tráfico frecuente, los entornos se mantienen calientes casi todo el tiempo; una función usada esporádicamente enfrenta cold starts con más frecuencia." />
        </section>

        <section className="lesson-section">
          <h3>22-23. ¿Se puede evitar completamente el cold start?</h3>
          <p>No del todo, pero se puede reducir su impacto: manteniendo el paquete de código liviano, evitando trabajo pesado en el código de inicialización, y —para casos donde la latencia es crítica— AWS ofrece <strong>Provisioned Concurrency</strong>, que mantiene entornos ya calientes esperando, a cambio de un costo adicional.</p>
          <Nota><p>Para nuestro nivel, basta con reconocer que esa opción existe y para qué sirve — no es necesaria para la función de notificación de reseñas de CloudShop, donde unos milisegundos extra ocasionales no son críticos.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>24-25. Volvamos a CloudShop</h3>
          <QaItem question="¿Vale la pena pagar por Provisioned Concurrency en la función de notificación de reseñas?" answer="Probablemente no — se ejecuta pocas veces al día y no es una ruta crítica de tiempo real; un cold start ocasional de unos cientos de milisegundos es aceptable ahí." />
          <QaItem question="¿Y en una función que sirve directamente el checkout de compra, donde cada milisegundo de demora importa?" answer="Ahí sí sería una decisión razonable a evaluar, dependiendo del volumen de tráfico y de qué tan sensible sea la experiencia del cliente a la latencia." />
        </section>

        <section className="lesson-section">
          <h3>26-27. RETO DE LA CLASE</h3>
          <Nota><p>La función de reseñas de CloudShop está configurada con 128 MB de memoria y tarda en promedio 900 ms por ejecución, cerca del límite de un timeout de 1 segundo, generando timeouts ocasionales. ¿Qué dos ajustes propondrías, y por qué en ese orden?</p></Nota>
          <Reveal label="Ver la solución esperada">
            <p>Primero, aumentar la memoria (por ejemplo, a 256 MB): dado que memoria y CPU están ligadas en Lambda, es probable que la ejecución se acelere significativamente sin cambiar el código. Segundo, ajustar el timeout con un margen razonable sobre el nuevo tiempo de ejecución esperado (no exageradamente alto), para absorber variaciones normales sin ocultar problemas reales.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>28-29. Retos nivel 2 y 3</h3>
          <QaItem question="Alguien configura un timeout de 15 minutos 'para no tener que pensar en esto nunca más'. ¿Qué riesgo trae?" answer="Si algo queda colgado (por ejemplo, esperando una respuesta que nunca llega), la función seguiría corriendo —y generando costo— mucho más tiempo del necesario, en vez de fallar rápido y visiblemente." />
          <QaItem question="Una función guarda su API Key de un servicio externo como variable de entorno sin cifrado adicional. Conectando con el Módulo 9, ¿qué alternativa es preferible?" answer="Guardar esa API Key en AWS Secrets Manager y que la función la recupere mediante su Execution Role (Clase 4), en vez de dejarla como texto plano en la configuración de la función." />
        </section>

        <section className="lesson-section">
          <h3>30-31. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El desarrollador propone: &quot;configuremos siempre la memoria máxima disponible en todas las funciones, así nunca tenemos problemas de rendimiento.&quot; No estoy de acuerdo porque más memoria significa más costo por cada milisegundo de ejecución, y una función simple como la de reseñas no necesita esa capacidad. Esto es lo que haría en su lugar: medir el comportamiento real de cada función y ajustar la memoria a lo que efectivamente necesita. El riesgo de su enfoque es pagar de más por capacidad que nunca se usa.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: &quot;guardemos todas las configuraciones, incluidas contraseñas, como variables de entorno, así todo queda en un solo lugar.&quot; No estoy de acuerdo porque mezclar configuración no sensible con secretos reales pierde el control de acceso granular y la rotación que ofrece Secrets Manager (Módulo 9). Esto es lo que haría en su lugar: variables de entorno para configuración común, Secrets Manager para credenciales. El riesgo de su enfoque es exponer secretos con menos protección de la que realmente necesitan.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>32. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'En Lambda, la memoria asignada también afecta la capacidad de CPU disponible.', correct: true },
            { text: 'Si una función supera su timeout, Lambda espera indefinidamente hasta que termine.', correct: false },
            { text: 'Las variables de entorno permiten configurar una función sin modificar el código.', correct: true },
            { text: 'Un cold start ocurre porque Lambda necesita preparar un nuevo entorno de ejecución.', correct: true },
            { text: 'Las invocaciones consecutivas y frecuentes suelen sufrir cold start cada vez.', correct: false },
            { text: 'Guardar un secreto sensible en una variable de entorno común es equivalente en seguridad a usar Secrets Manager.', correct: false },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>33. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>34. Reto oral</h3>
          <Dialogo>Explícame qué es un cold start sin usar las palabras Lambda, servidor, entorno, ejecución ni frío.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>&quot;Es la demora extra que ocurre la primera vez que algo se pone en marcha después de haber estado inactivo, comparado con lo rápido que responde una vez que ya está listo y funcionando.&quot;</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>35. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Memoria</td><td>RAM disponible — y proporcionalmente, más CPU</td></tr>
              <tr><td>Timeout</td><td>Tiempo máximo antes de cortar la ejecución</td></tr>
              <tr><td>Variable de entorno</td><td>Configuración externa al código</td></tr>
              <tr><td>Cold start</td><td>Demora al preparar un entorno nuevo</td></tr>
              <tr><td>Warm start</td><td>Reutilizar un entorno ya preparado</td></tr>
              <tr><td>Provisioned Concurrency</td><td>Mantener entornos calientes de antemano, con costo adicional</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>36. Ticket de salida</h3>
          <Dialogo>Un compañero dice: &quot;mi función a veces responde en 50 ms y otras veces en 800 ms, sin razón aparente.&quot; ¿Qué le explicarías?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Probablemente esté observando la diferencia entre warm start y cold start: cuando el entorno ya estaba preparado por una invocación reciente, responde rápido; cuando ha pasado tiempo sin actividad, Lambda necesita preparar un entorno nuevo antes de ejecutar el handler, lo que añade esa latencia adicional.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 6</div>
          <p>Nuestra función ya está bien configurada. Pero hasta ahora solo enviaba una notificación — no guardaba nada. Para que CloudShop pueda consultar después todas las reseñas recibidas, necesitamos un lugar donde guardarlas. Y ese lugar, en el mundo serverless, casi nunca es una base de datos relacional tradicional.</p>
          <ConceptBadge icon="database">Módulo 10 · Clase 6 — Amazon DynamoDB: la base de datos NoSQL administrada y serverless</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-10/clase-6" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 6: Amazon DynamoDB →
          </Link>
        </div>

      </div>
    </div>
  );
}
