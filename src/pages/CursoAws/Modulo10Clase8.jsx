import {
  Icon, Nota, Dialogo, Flow, InfoBox, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué significa realmente "serverless"?', options: [{ text: 'Que el servidor deja de ser nuestro problema, no que haya dejado de existir.', correct: true }, { text: 'Que no hay ningún hardware detrás.', correct: false }, { text: 'Que es gratis siempre.', correct: false }, { text: 'Que ya no hace falta ningún proveedor de nube.', correct: false }] },
  { q: '¿Qué recibe el handler de una función Lambda?', options: [{ text: 'event y context.', correct: true }, { text: 'Solo el código fuente.', correct: false }, { text: 'Un Security Group.', correct: false }, { text: 'Una VPC.', correct: false }] },
  { q: '¿Qué determina a qué función Lambda llega una solicitud en API Gateway?', options: [{ text: 'Método HTTP + ruta.', correct: true }, { text: 'La hora del día.', correct: false }, { text: 'El tamaño del body.', correct: false }, { text: 'El nombre del cliente.', correct: false }] },
  { q: '¿Qué necesita el Execution Role de una función para actuar sobre otro servicio de AWS?', options: [{ text: 'Un permiso IAM explícito, de mínimo privilegio.', correct: true }, { text: 'Nada, Lambda tiene acceso total por defecto.', correct: false }, { text: 'Solo estar en la misma Región.', correct: false }, { text: 'Una Access Key hardcodeada.', correct: false }] },
  { q: '¿Qué liga la memoria configurada de una función Lambda?', options: [{ text: 'También la capacidad de CPU disponible.', correct: true }, { text: 'El runtime permitido.', correct: false }, { text: 'El número de rutas de API Gateway.', correct: false }, { text: 'Nada más que el costo.', correct: false }] },
  { q: '¿Qué es un cold start?', options: [{ text: 'La demora de preparar un nuevo entorno de ejecución tras inactividad.', correct: true }, { text: 'Un error de permisos.', correct: false }, { text: 'Un tipo de timeout fijo.', correct: false }, { text: 'Un error de sintaxis.', correct: false }] },
  { q: '¿Qué determina cómo se distribuyen los items en una tabla DynamoDB?', options: [{ text: 'La Partition Key.', correct: true }, { text: 'El nombre de la función Lambda.', correct: false }, { text: 'El Stage de API Gateway.', correct: false }, { text: 'El runtime.', correct: false }] },
  { q: '¿Qué operación de DynamoDB usarías para obtener todas las reseñas de un mismo producto?', options: [{ text: 'Query, filtrando por Partition Key.', correct: true }, { text: 'PutItem.', correct: false }, { text: 'AssumeRole.', correct: false }, { text: 'CreateTable cada vez.', correct: false }] },
  { q: '¿AccessDeniedException y ResourceNotFoundException significan lo mismo?', options: [{ text: 'No — uno es de permisos, el otro de un recurso inexistente o mal nombrado.', correct: true }, { text: 'Sí, son intercambiables.', correct: false }] },
  { q: '¿Lambda es la mejor opción para cualquier tipo de carga de trabajo, sin excepción?', options: [{ text: 'No — depende de si la tarea es breve y basada en eventos, o de carga sostenida.', correct: true }, { text: 'Sí, siempre.', correct: false }] },
];

export default function Modulo10Clase8() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 10 · Clase 8</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 10 · Clase 8: Laboratorio integrador, construir una API serverless completa para CloudShop</h2>
      <p className="lesson-subtitle">
        Cada pieza por separado ya la dominamos. Hoy las conectamos todas, de principio a fin, sin encender un solo servidor.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">60 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Laboratorio + construcción guiada + diagnóstico de fallas + evaluación final</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 10 · Clases 1 a 7</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Construir de punta a punta una API serverless: API Gateway + Lambda + DynamoDB + SNS.</li>
            <li>Diseñar el Execution Role de cada función con mínimo privilegio.</li>
            <li>Diagnosticar fallas comunes de integración entre las piezas de una arquitectura serverless.</li>
            <li>Diferenciar errores de permisos, de nombres de recursos, y de forma de los datos.</li>
            <li>Justificar decisiones de configuración (memoria, timeout, variables de entorno) con criterio, no por costumbre.</li>
            <li>Explicar por qué esta arquitectura no requiere administrar ningún servidor propio.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2. La misión</h3>
          <Nota><p>Hoy el estudiante se convierte en Arquitecto Serverless de CloudShop. No recibirá &quot;crea una función Lambda&quot; aislada — recibirá el requerimiento completo: &quot;los clientes deben poder enviar reseñas de productos y consultar las reseñas de un producto específico, sin que el equipo administre ningún servidor, y notificando al equipo de calidad cuando la calificación sea baja.&quot;</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>3-4. Arquitectura objetivo</h3>
          <Flow steps={[
            { icon: 'globe', label: 'Cliente' }, { icon: 'settings', label: 'API Gateway' }, { icon: 'zap', label: 'Lambda' },
            { icon: 'database', label: 'DynamoDB' }, { icon: 'bell', label: 'SNS' },
          ]} />
          <InfoBox title="Piezas a construir" items={[
            'Tabla DynamoDB: cloudshop-resenas (Partition Key productId, Sort Key reviewId)',
            'Función crear-resena: POST /resenas',
            'Función obtener-resenas: GET /productos/{id}/resenas',
            'Execution Role específico para cada función',
            'Topic SNS: cloudshop-calidad',
          ]} />
        </section>

        <section className="lesson-section">
          <h3>5-6. Paso 1: la tabla (Clase 6)</h3>
          <QaItem question="¿Por qué Partition Key = productId y no reviewId?" answer="Porque el patrón de acceso principal es 'dame todas las reseñas de este producto' — con productId como Partition Key, esa consulta es directa y eficiente, evitando revisar toda la tabla." />
        </section>

        <section className="lesson-section">
          <h3>7-8. Paso 2: crear-resena (Clases 2, 3 y 4)</h3>
          <p>La función recibe el evento de API Gateway, parsea <code>event.body</code>, guarda el item con PutItem, y si <code>rating &lt;= umbral</code>, publica en SNS.</p>
          <QaItem question="¿Qué dos permisos mínimos necesita su Execution Role?" answer="dynamodb:PutItem sobre el ARN de cloudshop-resenas, y sns:Publish sobre el ARN de cloudshop-calidad — además del permiso básico de logs (Clase 4)." />
        </section>

        <section className="lesson-section">
          <h3>9-10. Paso 3: obtener-resenas (Clases 3 y 7)</h3>
          <p>La función recibe <code>productId</code> desde <code>event.pathParameters</code>, y ejecuta un Query filtrando por esa Partition Key.</p>
          <QaItem question="¿Necesita esta función permiso sns:Publish?" answer="No — solo consulta datos, nunca notifica. Darle ese permiso violaría mínimo privilegio sin ninguna necesidad real." />
        </section>

        <section className="lesson-section">
          <h3>11-12. Paso 4: rutas en API Gateway (Clase 3)</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Método + Ruta</th><th>Función Lambda</th></tr></thead>
            <tbody>
              <tr><td className="mono">POST /resenas</td><td>crear-resena</td></tr>
              <tr><td className="mono">GET /productos/{'{id}'}/resenas</td><td>obtener-resenas</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>13-14. Paso 5: configuración (Clase 5)</h3>
          <QaItem question="crear-resena tarda en promedio 300 ms. ¿Qué timeout y memoria son razonables?" answer="Una memoria modesta (por ejemplo, 128-256 MB) y un timeout con margen sobre el promedio observado (por ejemplo, 3 segundos) — ni tan ajustado que corte ejecuciones normales, ni tan amplio que oculte problemas reales." />
          <QaItem question="¿El ARN del topic SNS debería estar escrito directamente en el código, o como variable de entorno?" answer="Como variable de entorno — así se puede cambiar sin volver a desplegar código, y facilita tener distintos topics por Stage (dev/prod)." />
        </section>

        <section className="lesson-section">
          <h3>15-17. Falla 1: AccessDeniedException al crear una reseña</h3>
          <InfoBox title="Síntoma" items={['POST /resenas responde 500', 'CloudWatch Logs: AccessDeniedException on dynamodb:PutItem']} />
          <QaItem question="¿Dónde está el problema, y cómo se corrige?" answer="El Execution Role de crear-resena no tiene (o perdió) el permiso dynamodb:PutItem sobre cloudshop-resenas. Se corrige agregando ese Allow específico a su permissions policy (Clase 4)." />
        </section>

        <section className="lesson-section">
          <h3>18-19. Falla 2: ResourceNotFoundException</h3>
          <InfoBox title="Síntoma" items={['Ambas funciones fallan', 'CloudWatch Logs: ResourceNotFoundException — Table cloudshop-resena not found']} />
          <QaItem question="¿Es un problema de permisos?" answer="No — el nombre de la tabla en el código (cloudshop-resena) no coincide con el nombre real de la tabla (cloudshop-resenas). Se corrige alineando el nombre exacto, no ajustando permisos." />
        </section>

        <section className="lesson-section">
          <h3>20-21. Falla 3: la función 'no encuentra' event.productId</h3>
          <InfoBox title="Síntoma" items={['POST /resenas responde con error al leer event.productId', 'La función funcionaba con el Test Event de la Clase 2']} />
          <QaItem question="¿Qué cambió?" answer="Al conectar la función a API Gateway (Clase 3), los datos ya no llegan directamente en event — llegan en event.body como texto, y hace falta JSON.parse(event.body) antes de leer productId." />
        </section>

        <section className="lesson-section">
          <h3>22-23. Falla 4: GET /productos/{'{id}'}/resenas devuelve una lista vacía</h3>
          <InfoBox title="Síntoma" items={['Se sabe que existen reseñas guardadas para ese producto', 'La Query no devuelve ningún item']} />
          <QaItem question="¿Qué revisarías primero?" answer="Que el valor de productId usado en la Query coincida exactamente (mayúsculas, espacios, tipo) con el que se guardó al crear la reseña — un desajuste entre escritura y consulta es la causa más común de este síntoma (Clase 7)." />
        </section>

        <section className="lesson-section">
          <h3>24-25. Falla 5: la primera solicitud del día siempre es lenta</h3>
          <InfoBox title="Síntoma" items={['Primera invocación tras horas sin tráfico: ~900 ms', 'Invocaciones siguientes: ~60 ms']} />
          <QaItem question="¿Es un bug que hay que arreglar en el código?" answer="No necesariamente — es un cold start (Clase 5): la primera invocación tras inactividad requiere preparar un entorno nuevo. Si esa latencia ocasional es aceptable para el caso de uso, no hace falta ninguna corrección; si fuera crítica, se podría evaluar Provisioned Concurrency." />
        </section>

        <section className="lesson-section">
          <h3>26-27. Matriz de diagnóstico</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Síntoma</th><th>Causa probable</th><th>Clase relacionada</th></tr></thead>
            <tbody>
              <tr><td>AccessDeniedException</td><td>Falta permiso en el Execution Role</td><td>Clase 4</td></tr>
              <tr><td>ResourceNotFoundException</td><td>Nombre de tabla/recurso incorrecto</td><td>Clase 7</td></tr>
              <tr><td>Error leyendo un campo del event</td><td>No se parseó event.body</td><td>Clase 3</td></tr>
              <tr><td>Query no devuelve nada</td><td>Valor de clave no coincide exactamente</td><td>Clase 7</td></tr>
              <tr><td>Primera invocación lenta, luego rápida</td><td>Cold start, no un bug</td><td>Clase 5</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>28-29. Evaluación práctica por equipos</h3>
          <InfoBox title="Cada equipo recibe una falla distinta para diagnosticar" items={[
            'Equipo A: AccessDeniedException en PutItem',
            'Equipo B: ResourceNotFoundException por nombre incorrecto',
            'Equipo C: error leyendo event.body sin parsear',
            'Equipo D: Query que no devuelve resultados esperados',
            'Equipo E: latencia intermitente (cold start vs. problema real)',
          ]} />
          <p>Cada equipo presenta: el síntoma observado, la evidencia en CloudWatch Logs, la causa raíz, y la corrección exacta — con la misma disciplina de evidencia antes que afirmación practicada en los Módulos 8 y 9.</p>
        </section>

        <section className="lesson-section">
          <h3>30. Rúbrica</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Nivel</th><th>Evidencia</th></tr></thead>
            <tbody>
              <tr><td>Sobresaliente</td><td>Diagnostica con evidencia de logs, distingue causas de permisos, nombres y forma de datos, y justifica la corrección citando la clase correspondiente</td></tr>
              <tr><td>Logrado</td><td>Identifica correctamente la falla y propone una corrección razonable</td></tr>
              <tr><td>En proceso</td><td>Identifica el síntoma pero no logra ubicar la causa raíz</td></tr>
              <tr><td>Inicial</td><td>Propone cambios sin evidencia clara de qué falla</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>31-32. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El gerente propone: &quot;ante cualquier error, démosle a todas las funciones AdministratorAccess, así dejamos de perder tiempo con AccessDeniedException.&quot; No estoy de acuerdo porque eso multiplicaría el alcance de cualquier error o vulnerabilidad de una sola función a toda la cuenta — el mismo riesgo que el Módulo 9 completo advirtió repetidamente. Esto es lo que haría en su lugar: leer el mensaje de error exacto en CloudWatch Logs y agregar únicamente el permiso faltante sobre el recurso específico. El riesgo de su enfoque es convertir un problema de configuración puntual en una exposición de seguridad permanente.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: &quot;si algo falla intermitentemente, aumentemos la memoria al máximo y el timeout a varios minutos, así seguro se arregla.&quot; No estoy de acuerdo porque, como vimos con el cold start, no toda lentitud intermitente es un problema real que se resuelve con más recursos — y un timeout exageradamente largo puede ocultar fallas genuinas en vez de exponerlas rápido. Esto es lo que haría en su lugar: diagnosticar primero con evidencia (Clase 5) y ajustar configuración solo cuando la causa lo justifique. El riesgo de su enfoque es pagar de más sin resolver el problema real.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>33. Checklist final del laboratorio</h3>
          <InfoBox items={[
            'Tabla DynamoDB creada con la clave primaria correcta',
            'Función crear-resena con Execution Role de mínimo privilegio',
            'Función obtener-resenas con Execution Role de mínimo privilegio',
            'Rutas de API Gateway conectadas a la función correcta',
            'event.body parseado correctamente en cada handler',
            'Memoria y timeout ajustados con criterio, no por defecto',
            'ARN del topic SNS como variable de entorno, no hardcodeado',
            'Probé cada falla simulada y documenté causa + corrección',
          ]} />
        </section>

        <section className="lesson-section">
          <h3>34. Evaluación final del Módulo 10</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>35. Reto oral final</h3>
          <Dialogo>Explícame qué construimos en este módulo sin usar las palabras Lambda, DynamoDB, API Gateway, servidor, evento ni AWS.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>&quot;Construimos un sistema que espera en silencio, sin costar nada mientras nadie lo usa, y que se enciende solo por unos instantes cada vez que alguien necesita guardar o consultar algo — guardando la información en un lugar diseñado para encontrarla rápido, y avisando a quien corresponde cuando algo lo amerita.&quot;</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>36. Las ideas que deben sobrevivir</h3>
          <ul className="plain-list">
            <li>Serverless significa que el servidor deja de ser nuestro problema, no que haya dejado de existir.</li>
            <li>Toda función Lambda recibe event (qué pasó) y context (en qué condiciones se ejecuta).</li>
            <li>Método y ruta determinan qué función invoca API Gateway.</li>
            <li>El event cambia de forma según qué disparó la función.</li>
            <li>Cada función necesita su propio Execution Role, con mínimo privilegio.</li>
            <li>Memoria y CPU están ligadas en Lambda; el timeout debe tener margen razonable.</li>
            <li>Las variables de entorno son para configuración; los secretos van en Secrets Manager.</li>
            <li>El cold start es esperado, no siempre es un bug que corregir.</li>
            <li>La Partition Key se diseña según el patrón de acceso, no según relaciones.</li>
            <li>Una mala Partition Key puede concentrar toda la carga (hot partition).</li>
            <li>AccessDeniedException y ResourceNotFoundException son errores distintos, con causas distintas.</li>
            <li>DynamoDB no reemplaza a RDS/Aurora en todos los casos — cada modelo resuelve un problema distinto.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>37. Ticket de salida del módulo</h3>
          <Dialogo>Un nuevo integrante del equipo pregunta: &quot;¿cuándo deberíamos usar Lambda en vez de EC2 para algo nuevo que estemos construyendo?&quot; ¿Qué le responderías?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Cuando la tarea es breve, está disparada por eventos puntuales (una solicitud HTTP, un archivo nuevo, un horario) y no necesita mantener estado propio entre ejecuciones — ahí Lambda suele encajar mejor, y probablemente cueste menos que mantener un servidor encendido. Para tráfico constante y sostenido, o procesos muy largos, EC2 con Auto Scaling (Módulo 7) sigue siendo, en muchos casos, la elección más razonable. No es una decisión de &quot;cuál es mejor&quot; en abstracto, sino de qué modelo encaja con la tarea específica.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="check-circle" /> Módulo 10 completado</div>
          <Nota><p>El estudiante empezó el módulo con la pregunta &quot;¿y si no hubiera servidor que administrar?&quot; y termina siendo capaz de construir:</p></Nota>
          <Flow steps={[
            { icon: 'zap', label: 'Lambda' }, { icon: 'globe', label: 'API Gateway' }, { icon: 'key', label: 'Execution Role' },
            { icon: 'clock', label: 'Config y cold starts' }, { icon: 'database', label: 'DynamoDB' }, { icon: 'bell', label: 'SNS' },
          ]} />
          <p>Ya no pregunta solamente &quot;¿cuántos servidores necesito?&quot;. Ahora puede preguntar: &quot;¿qué evento dispara este trabajo, qué permisos necesita exactamente, y dónde guardo el resultado sin tener que administrar nada de por medio?&quot;</p>
          <p>Con esto, CloudShop suma cómputo sin servidor y una base de datos NoSQL a todo lo construido desde el Módulo 0: fundamentos, IAM, EC2, S3, VPC, RDS, Auto Scaling, CloudWatch y seguridad — dos caminos de cómputo distintos, cada uno resolviendo el problema para el que fue pensado.</p>
        </div>

      </div>
    </div>
  );
}
