import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const HANDLER_BASICO = `exports.handler = async (event, context) => {
  console.log("Nueva reseña recibida:", event.reviewId);

  return {
    statusCode: 200,
    body: "Notificación enviada al equipo de calidad"
  };
};`;

const EVENT_EJEMPLO = `{
  "reviewId": "r-48213",
  "productId": "p-7791",
  "rating": 2,
  "comment": "El empaque llegó dañado"
}`;

const CONTEXT_EJEMPLO = `{
  "awsRequestId": "8f3c1a2e-...",
  "functionName": "cloudshop-notificar-resena",
  "getRemainingTimeInMillis": "4820"
}`;

const HANDLER_COMPLETO = `exports.handler = async (event, context) => {
  const { reviewId, productId, rating, comment } = event;

  if (rating <= 2) {
    console.log(\`Alerta: reseña negativa \${reviewId} para \${productId}\`);
    // Aquí notificaríamos al equipo de calidad
  }

  console.log("Tiempo restante:", context.getRemainingTimeInMillis(), "ms");

  return {
    statusCode: 200,
    body: JSON.stringify({ procesado: reviewId })
  };
};`;

const QUIZ_QUESTIONS = [
  { q: '¿Qué es el runtime de una función Lambda?', options: [{ text: 'El entorno de lenguaje en el que se ejecuta el código (por ejemplo, Node.js o Python).', correct: true }, { text: 'El nombre del bucket S3 asociado.', correct: false }, { text: 'El rol IAM de la función.', correct: false }, { text: 'El tiempo máximo de ejecución.', correct: false }] },
  { q: '¿Qué es el handler?', options: [{ text: 'La función específica que Lambda invoca para empezar a ejecutar nuestro código.', correct: true }, { text: 'El servidor donde corre la función.', correct: false }, { text: 'El nombre del evento que disparó la ejecución.', correct: false }, { text: 'Un tipo de trigger.', correct: false }] },
  { q: '¿Qué contiene el parámetro event?', options: [{ text: 'Los datos específicos que llegaron con la invocación, según qué la disparó.', correct: true }, { text: 'Información sobre cuánto tiempo lleva ejecutándose AWS.', correct: false }, { text: 'El código fuente de la función.', correct: false }, { text: 'Las credenciales del rol IAM.', correct: false }] },
  { q: '¿Qué tipo de información aporta context?', options: [{ text: 'Datos sobre la ejecución en sí, como el tiempo restante o el ID de la solicitud.', correct: true }, { text: 'El contenido completo de la base de datos.', correct: false }, { text: 'Los datos de negocio de la solicitud.', correct: false }, { text: 'El historial de todas las invocaciones anteriores.', correct: false }] },
  { q: '¿A dónde van automáticamente los console.log de una función Lambda?', options: [{ text: 'A Amazon CloudWatch Logs.', correct: true }, { text: 'A ningún lugar, se pierden.', correct: false }, { text: 'A un archivo local dentro de la función.', correct: false }, { text: 'Solo se ven si se activa un ajuste especial de pago.', correct: false }] },
  { q: '¿El mismo event.reviewId estará disponible sin importar qué disparó la función?', options: [{ text: 'Sí, siempre es igual.', correct: false }, { text: 'No — la forma del event depende de qué la invocó (API Gateway, S3, un test manual, etc.).', correct: true }] },
];

export default function Modulo10Clase2() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 10 · Clase 2</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 10 · Clase 2: Nuestra primera función Lambda — runtime, handler, event y context</h2>
      <p className="lesson-subtitle">
        Toda función Lambda, sin importar el lenguaje, responde a las mismas dos preguntas: ¿qué llegó? y ¿en qué condiciones se está ejecutando esto?
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + lectura de código + práctica guiada</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 10 · Clase 1</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es el runtime de una función Lambda.</li>
            <li>Identificar el handler y explicar por qué es el punto de entrada de la función.</li>
            <li>Leer el parámetro event y comprender que su forma depende de qué disparó la función.</li>
            <li>Leer el parámetro context y reconocer qué tipo de información aporta.</li>
            <li>Comprender qué devuelve una función Lambda y para qué sirve ese valor.</li>
            <li>Reconocer que los logs de una función Lambda llegan automáticamente a CloudWatch (Módulo 8).</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-3. Recordemos dónde quedamos</h3>
          <Flow steps={[{ label: 'Evento' }, { icon: 'zap', label: 'Lambda ejecuta código' }, { label: 'Resultado' }]} />
          <p>En la Clase 1 entendimos el modelo: algo dispara la función, Lambda la ejecuta, y se detiene. Hoy abrimos esa caja y escribimos la función de notificación de reseñas de CloudShop de verdad.</p>
        </section>

        <section className="lesson-section">
          <h3>4-5. El runtime: en qué idioma le hablamos a Lambda</h3>
          <p>El <strong>runtime</strong> es el entorno de lenguaje en el que se ejecuta nuestro código: Node.js, Python, Java, entre otros. Lambda soporta varios, y nosotros elegimos uno al crear la función — en los ejemplos de esta clase usaremos Node.js, por ser el más común para empezar.</p>
          <Nota><p>No necesitamos memorizar la sintaxis exacta de cada runtime. Lo importante es entender que, sin importar el lenguaje elegido, toda función Lambda comparte la misma estructura general que veremos a continuación.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>6-8. El handler: la puerta de entrada</h3>
          <p>El <strong>handler</strong> es la función específica dentro de nuestro código que Lambda invoca cada vez que ocurre un evento. Es, literalmente, donde empieza la ejecución.</p>
          <pre className="codeblock">{HANDLER_BASICO}</pre>
          <Dialogo>Es como el timbre de una casa: sin importar qué tan grande sea la casa por dentro, existe un único punto donde alguien toca primero — a partir de ahí, el resto del código decide qué hacer.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>9-11. event: qué llegó con la invocación</h3>
          <p>El primer parámetro del handler, <strong>event</strong>, contiene los datos específicos de lo que disparó la función. Su forma exacta depende de qué la invocó: una solicitud HTTP trae unos campos, un archivo nuevo en S3 trae otros completamente distintos.</p>
          <pre className="codeblock">{EVENT_EJEMPLO}</pre>
          <p>En nuestro caso, event trae los datos de la reseña recién creada: qué producto, qué calificación, qué comentario.</p>
          <QaItem question="¿event.reviewId tendrá siempre exactamente la misma forma sin importar qué dispare la función?" answer="No — event refleja los datos de ese disparador específico. Una notificación de S3 (Clase 6-7) no se parece en nada a esta reseña; cada trigger define su propia forma de event." />
        </section>

        <section className="lesson-section">
          <h3>12-14. context: en qué condiciones se está ejecutando esto</h3>
          <p>El segundo parámetro, <strong>context</strong>, no trae datos de negocio — trae información sobre la ejecución en sí: un identificador único de la invocación, el nombre de la función, y cuánto tiempo queda antes de que la ejecución se corte.</p>
          <pre className="codeblock">{CONTEXT_EJEMPLO}</pre>
          <RoleGrid roles={[
            { icon: 'file-text', label: 'event', desc: '¿Qué pasó? — datos de negocio' },
            { icon: 'clock', label: 'context', desc: '¿Cómo va esta ejecución? — metadatos técnicos' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>15-17. Armemos la función completa de CloudShop</h3>
          <pre className="codeblock">{HANDLER_COMPLETO}</pre>
          <table className="table lesson-summary-table">
            <thead><tr><th>Línea</th><th>Qué hace</th></tr></thead>
            <tbody>
              <tr><td className="mono">{'const { reviewId, ... } = event'}</td><td>Lee los datos de la reseña que llegó</td></tr>
              <tr><td className="mono">{'if (rating <= 2)'}</td><td>Decide si esta reseña amerita una alerta</td></tr>
              <tr><td className="mono">{'context.getRemainingTimeInMillis()'}</td><td>Consulta cuánto tiempo queda de ejecución</td></tr>
              <tr><td className="mono">{'return { statusCode: 200, ... }'}</td><td>Responde que el procesamiento terminó bien</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>18-19. ¿Qué es ese valor de retorno?</h3>
          <p>Lo que el handler devuelve (return) se convierte en la respuesta de la invocación. Si Lambda fue llamada por una solicitud HTTP (Clase 3), ese valor puede terminar siendo la respuesta que recibe el usuario. Si fue disparada por otro evento, ese valor puede quedar disponible para quien esté esperando el resultado.</p>
          <ConceptBadge icon="check-circle">Handler recibe event + context, y devuelve un resultado — ese es el contrato completo.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>20-21. Probar la función sin esperar un evento real</h3>
          <p>En la consola de Lambda podemos crear un <strong>Test Event</strong>: un objeto JSON de ejemplo que simula lo que llegaría en <code>event</code>, para invocar la función manualmente y ver qué ocurre — sin necesidad de tener todavía un API Gateway o un bucket S3 conectados.</p>
          <Nota><p>Esto es exactamente lo que usamos para diseñar y probar la función de reseñas de CloudShop antes de conectarla a nada más.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>22-23. ¿Dónde quedan los console.log?</h3>
          <p>Cada vez que la función usa <code>console.log</code>, ese mensaje llega automáticamente a <strong>Amazon CloudWatch Logs</strong> — el mismo servicio que conocimos en el Módulo 8, en un Log Group creado específicamente para esta función.</p>
          <Flow steps={[{ icon: 'zap', label: 'Lambda' }, { icon: 'file-text', label: 'console.log' }, { icon: 'bar-chart', label: 'CloudWatch Logs' }]} />
          <QaItem question="Si la función falla silenciosamente y no sabemos por qué, ¿dónde investigaríamos primero?" answer="En CloudWatch Logs, revisando el Log Group de esa función — la misma disciplina de investigación que practicamos en el Módulo 8." />
        </section>

        <section className="lesson-section">
          <h3>24-25. Volvamos a CloudShop</h3>
          <QaItem question="¿Qué pasaría si event no tuviera el campo 'rating' porque alguien cambió cómo se llama el evento en otro lugar del sistema?" answer="El código fallaría o se comportaría de forma inesperada al intentar leer un valor que no existe — por eso es importante conocer exactamente la forma del event antes de escribir el handler." />
          <QaItem question="¿Debería la función de reseñas intentar hacer también el envío de un correo electrónico completo, la actualización del catálogo y el cálculo de estadísticas, todo junto?" answer="No necesariamente — funciones pequeñas y enfocadas en una sola responsabilidad suelen ser más fáciles de probar, depurar y mantener que una función que intenta hacer demasiado." />
        </section>

        <section className="lesson-section">
          <h3>26-27. RETO DE LA CLASE</h3>
          <Nota><p>CloudShop necesita una función que reciba el evento de un carrito abandonado, con esta forma: <code>{'{ "cartId": "c-991", "itemCount": 3, "totalValue": 45.50 }'}</code>. Si <code>totalValue</code> supera 40, debe registrar un mensaje indicando que vale la pena enviar un recordatorio al cliente. Escribe el handler.</p></Nota>
          <Reveal label="Ver una solución esperada">
            <pre className="codeblock">{`exports.handler = async (event, context) => {
  const { cartId, totalValue } = event;

  if (totalValue > 40) {
    console.log(\`Carrito \${cartId} vale la pena recordar: $\${totalValue}\`);
  }

  return { statusCode: 200, body: JSON.stringify({ procesado: cartId }) };
};`}</pre>
            <p>Los puntos clave a evaluar: leer correctamente los campos del event, aplicar la condición sobre totalValue, y devolver una respuesta coherente.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>28-29. Retos nivel 2 y 3</h3>
          <QaItem question="Un compañero escribe toda la lógica de negocio directamente dentro del parámetro context. ¿Qué está confundiendo?" answer="context aporta metadatos de la ejecución (tiempo restante, request ID), no datos de negocio — esos vienen en event." />
          <QaItem question="La función tarda demasiado y se corta a mitad de camino. ¿Qué dato de context nos ayudaría a anticipar ese problema?" answer="context.getRemainingTimeInMillis() — permite que el propio código sepa cuánto tiempo le queda y actúe en consecuencia (por ejemplo, guardar progreso parcial) antes de agotar el límite." />
        </section>

        <section className="lesson-section">
          <h3>30-31. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El desarrollador propone: &quot;pongamos toda la lógica de CloudShop —reseñas, carritos, reportes— en una sola función Lambda gigante, así administramos menos funciones.&quot; No estoy de acuerdo porque una función que hace de todo se vuelve difícil de probar, de depurar y de asegurar con mínimo privilegio (Módulo 9) — necesitaría permisos para todo lo que toca. Esto es lo que haría en su lugar: una función por responsabilidad concreta, cada una con su propio event esperado y su propio rol. El riesgo de su enfoque es una función frágil, difícil de mantener y con permisos excesivos.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: &quot;no hace falta revisar la forma del event antes de escribir el código, ya lo iremos ajustando cuando falle en producción.&quot; No estoy de acuerdo porque probar con un Test Event realista, antes de conectar la función a un trigger real, cuesta minutos y evita errores costosos después. Esto es lo que haría en su lugar: diseñar y probar con eventos de ejemplo representativos primero. El riesgo de su enfoque es descubrir errores de forma con datos reales de clientes, en producción.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>32. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'El runtime es el entorno de lenguaje en el que se ejecuta la función.', correct: true },
            { text: 'El handler es siempre el mismo, sin importar cómo se llame nuestra función dentro del código.', correct: false },
            { text: 'event contiene datos de negocio específicos de lo que disparó la función.', correct: true },
            { text: 'context contiene información sobre la ejecución, como el tiempo restante.', correct: true },
            { text: 'Los console.log de una función Lambda desaparecen apenas termina la ejecución.', correct: false },
            { text: 'La forma del event depende de qué disparó la función.', correct: true },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>33. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>34. Reto oral</h3>
          <Dialogo>Explícame la diferencia entre event y context sin usar las palabras evento, contexto, dato, ejecución ni Lambda.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>&quot;Uno te dice qué pasó y con qué información específica. El otro te dice en qué condiciones estás trabajando ahora mismo, mientras lo resuelves.&quot;</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>35. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Runtime</td><td>Entorno de lenguaje donde corre el código</td></tr>
              <tr><td>Handler</td><td>Función de entrada que Lambda invoca</td></tr>
              <tr><td>event</td><td>Datos de negocio de lo que disparó la función</td></tr>
              <tr><td>context</td><td>Metadatos de la ejecución (tiempo restante, request ID)</td></tr>
              <tr><td>Return</td><td>Lo que la función devuelve como resultado</td></tr>
              <tr><td>Test Event</td><td>JSON de ejemplo para probar sin un trigger real</td></tr>
              <tr><td>Logs</td><td>console.log llega automáticamente a CloudWatch Logs</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>36. Ticket de salida</h3>
          <Dialogo>Un compañero dice: &quot;no entiendo por qué mi función Lambda a veces recibe un event distinto, si es la misma función.&quot; ¿Qué le responderías?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Que la forma de event depende de qué disparó la invocación — un Test Event manual, una solicitud HTTP vía API Gateway, o una notificación de S3 traen estructuras distintas. La función es la misma; lo que cambia es la fuente del evento que la invoca.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Próximamente</div>
          <p>Nuestra función ya funciona probándola manualmente con un Test Event. Pero para que sea útil de verdad, necesitamos que cualquier cliente —o cualquier otro sistema— pueda dispararla a través de una URL real, con una solicitud HTTP normal.</p>
          <ConceptBadge icon="globe">Módulo 10 · Clase 3 — Lambda + API Gateway: exponer una función como endpoint HTTP</ConceptBadge>
          <span className="tag tag-outline">Módulo 10 · Clase 3 · próximamente</span>
        </div>

      </div>
    </div>
  );
}
