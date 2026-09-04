import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const PERMISSIONS_POLICY_DYNAMO = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["dynamodb:PutItem", "dynamodb:Query"],
      "Resource": "arn:aws:dynamodb:eu-oeste-1:111122223333:table/cloudshop-resenas"
    },
    {
      "Effect": "Allow",
      "Action": "sns:Publish",
      "Resource": "arn:aws:sns:eu-oeste-1:111122223333:cloudshop-calidad"
    }
  ]
}`;

const HANDLER_PUT_ITEM = `const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { PutItemCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});

exports.handler = async (event, context) => {
  const datos = JSON.parse(event.body);

  await client.send(new PutItemCommand({
    TableName: "cloudshop-resenas",
    Item: {
      productId: datos.productId,
      reviewId: datos.reviewId,
      rating: datos.rating,
      comment: datos.comment
    }
  }));

  if (datos.rating <= 2) {
    // Publicar en SNS, como vimos en la Clase 4
  }

  return { statusCode: 201, body: JSON.stringify({ guardado: true }) };
};`;

const HANDLER_QUERY = `const { QueryCommand } = require("@aws-sdk/lib-dynamodb");

exports.handler = async (event, context) => {
  const { productId } = event.pathParameters;

  const resultado = await client.send(new QueryCommand({
    TableName: "cloudshop-resenas",
    KeyConditionExpression: "productId = :pid",
    ExpressionAttributeValues: { ":pid": productId }
  }));

  return { statusCode: 200, body: JSON.stringify(resultado.Items) };
};`;

const ERROR_ACCESS_DENIED = `AccessDeniedException: is not authorized to perform: dynamodb:Query
on resource: cloudshop-resenas`;

const ERROR_RESOURCE_NOT_FOUND = `ResourceNotFoundException: Requested resource not found
(Table: 'cloudshop-resena' not found — nombre mal escrito)`;

const QUIZ_QUESTIONS = [
  { q: '¿Qué necesita el Execution Role de una función para poder guardar datos en DynamoDB?', options: [{ text: 'Un permiso explícito, como dynamodb:PutItem, sobre el ARN de la tabla.', correct: true }, { text: 'Nada, DynamoDB está siempre abierto a cualquier función Lambda.', correct: false }, { text: 'Solo necesita el nombre de la tabla en una variable de entorno.', correct: false }, { text: 'Basta con que la función esté en la misma Región.', correct: false }] },
  { q: '¿Qué operación de DynamoDB se usa para guardar o reemplazar un item?', options: [{ text: 'PutItem.', correct: true }, { text: 'DeleteTable.', correct: false }, { text: 'CreateFunction.', correct: false }, { text: 'AssumeRole.', correct: false }] },
  { q: '¿Qué operación permite obtener varios items que comparten la misma Partition Key?', options: [{ text: 'Query.', correct: true }, { text: 'PutItem.', correct: false }, { text: 'DeleteItem.', correct: false }, { text: 'AssumeRole.', correct: false }] },
  { q: '¿Qué indica un error ResourceNotFoundException al llamar a DynamoDB?', options: [{ text: 'Que la tabla referenciada no existe (o su nombre está mal escrito).', correct: true }, { text: 'Que falta un permiso IAM.', correct: false }, { text: 'Que la función superó su timeout.', correct: false }, { text: 'Que el rating es inválido.', correct: false }] },
  { q: '¿Qué indica un AccessDeniedException al llamar a DynamoDB desde Lambda?', options: [{ text: 'Que el Execution Role no tiene el permiso necesario sobre esa tabla.', correct: true }, { text: 'Que la tabla no existe.', correct: false }, { text: 'Que hay un error de sintaxis en el handler.', correct: false }, { text: 'Que la memoria configurada es insuficiente.', correct: false }] },
  { q: '¿Dónde investigarías primero si una función que guarda datos en DynamoDB empieza a fallar después de un cambio de permisos?', options: [{ text: 'En CloudWatch Logs, buscando el mensaje de error exacto.', correct: true }, { text: 'En el código HTML del sitio.', correct: false }, { text: 'No hay forma de investigarlo.', correct: false }] },
];

export default function Modulo10Clase7() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 10 · Clase 7</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 10 · Clase 7: Lambda + DynamoDB — integrar cómputo y datos sin administrar ningún servidor</h2>
      <p className="lesson-subtitle">
        Aquí se cierra el círculo: una solicitud HTTP entra, se ejecuta código, se guarda un dato, y nadie tuvo que encender un solo servidor en el camino.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + lectura de código + diagnóstico de errores + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 10 · Clases 1 a 6</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Escribir un item en DynamoDB desde una función Lambda usando PutItem.</li>
            <li>Consultar items relacionados desde una función Lambda usando Query.</li>
            <li>Otorgar al Execution Role exactamente los permisos de DynamoDB que la función necesita.</li>
            <li>Diagnosticar ResourceNotFoundException y AccessDeniedException al integrar Lambda con DynamoDB.</li>
            <li>Describir la arquitectura completa API Gateway → Lambda → DynamoDB (+ SNS) de punta a punta.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-3. Recordemos dónde quedamos</h3>
          <p>Ya diseñamos la tabla <code>cloudshop-resenas</code> con Partition Key = productId y Sort Key = reviewId (Clase 6). Hoy conectamos el handler de la Clase 4 (que ya notifica al equipo de calidad) para que, además, guarde cada reseña de verdad.</p>
          <Flow steps={[{ icon: 'globe', label: 'Cliente' }, { icon: 'settings', label: 'API Gateway' }, { icon: 'zap', label: 'Lambda' }, { icon: 'database', label: 'DynamoDB' }]} />
        </section>

        <section className="lesson-section">
          <h3>4-6. El permiso que falta, otra vez</h3>
          <p>Como en la Clase 4, antes de que el código funcione necesitamos ampliar el Execution Role de la función.</p>
          <pre className="codeblock">{PERMISSIONS_POLICY_DYNAMO}</pre>
          <p>En español: <em>&quot;Permitir guardar y consultar items únicamente en la tabla cloudshop-resenas, y publicar únicamente en el topic cloudshop-calidad.&quot;</em> Ni un permiso más — la misma disciplina de mínimo privilegio del Módulo 9, aplicada ahora también a DynamoDB.</p>
        </section>

        <section className="lesson-section">
          <h3>7-9. Guardando una reseña: PutItem</h3>
          <pre className="codeblock">{HANDLER_PUT_ITEM}</pre>
          <table className="table lesson-summary-table">
            <thead><tr><th>Línea</th><th>Qué hace</th></tr></thead>
            <tbody>
              <tr><td className="mono">new DynamoDBClient({'{}'})</td><td>Prepara la conexión al servicio DynamoDB</td></tr>
              <tr><td className="mono">PutItemCommand</td><td>Define la operación: guardar este item en esta tabla</td></tr>
              <tr><td className="mono">client.send(...)</td><td>Ejecuta la operación y espera la confirmación</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>10-12. Consultando las reseñas de un producto: Query</h3>
          <pre className="codeblock">{HANDLER_QUERY}</pre>
          <QaItem question="¿Por qué esta consulta funciona de forma eficiente?" answer="Porque KeyConditionExpression filtra directamente por la Partition Key (productId) — exactamente el patrón de acceso para el que diseñamos la tabla en la Clase 6, en vez de tener que revisar todos los items de la tabla." />
        </section>

        <section className="lesson-section">
          <h3>13-15. Dos errores típicos, y cómo distinguirlos</h3>
          <RoleGrid roles={[
            { icon: 'alert-triangle', label: 'ResourceNotFoundException', desc: 'La tabla referenciada no existe, o su nombre está mal escrito' },
            { icon: 'alert-triangle', label: 'AccessDeniedException', desc: 'El Execution Role no tiene el permiso necesario sobre esa tabla' },
          ]} />
          <pre className="codeblock">{ERROR_RESOURCE_NOT_FOUND}</pre>
          <pre className="codeblock">{ERROR_ACCESS_DENIED}</pre>
          <Nota><p>Ambos aparecen en CloudWatch Logs (Módulo 8) con un mensaje claro sobre qué falló — la misma disciplina de investigación de la Clase 4, ahora aplicada a errores de DynamoDB en vez de SNS.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>16-17. La arquitectura completa, de punta a punta</h3>
          <Flow steps={[
            { icon: 'globe', label: 'Cliente' }, { icon: 'settings', label: 'API Gateway' }, { icon: 'zap', label: 'Lambda' },
            { icon: 'database', label: 'DynamoDB' }, { icon: 'bell', label: 'SNS (si rating bajo)' },
          ]} />
          <p>Ninguna pieza de esta arquitectura requiere que CloudShop administre un servidor: ni el endpoint HTTP (Clase 3), ni el cómputo (Clases 1-2, 4-5), ni el almacenamiento (Clase 6-7), ni la notificación (Clase 4). Todo escala y se cobra según el uso real.</p>
        </section>

        <section className="lesson-section">
          <h3>18-19. Volvamos a CloudShop</h3>
          <QaItem question="Un cliente envía una reseña con rating 5. ¿Debería dispararse la notificación SNS?" answer="No — solo las reseñas con rating bajo (según el umbral configurado en la Clase 5) disparan la notificación; todas se guardan en DynamoDB, pero solo algunas generan alerta." />
          <QaItem question="¿La función que consulta reseñas (GET) necesita el mismo permiso sns:Publish que la función que las crea (POST)?" answer="No — mínimo privilegio otra vez: la función de consulta solo necesita dynamodb:Query, no necesita tocar SNS en absoluto." />
        </section>

        <section className="lesson-section">
          <h3>20-21. RETO DE LA CLASE</h3>
          <Nota><p>Al desplegar la función de reseñas actualizada, empieza a fallar con: <code>AccessDeniedException: not authorized to perform: dynamodb:PutItem on resource: cloudshop-resenas</code>. El código no cambió respecto a la clase anterior. ¿Qué revisarías, y qué corregirías?</p></Nota>
          <Reveal label="Ver la solución esperada">
            <p>Revisaría el Execution Role de la función en IAM (Clase 4): probablemente se actualizó el código para escribir en DynamoDB, pero nadie amplió la permissions policy del rol con el Allow correspondiente a dynamodb:PutItem sobre el ARN de cloudshop-resenas. La corrección es agregar exactamente ese permiso — ni más amplio, ni sobre otra tabla.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>22-23. Retos nivel 2 y 3</h3>
          <QaItem question="Una función lanza ResourceNotFoundException al intentar escribir en 'cloudshop-resena' (sin la 's' final). ¿Es un problema de permisos?" answer="No — es un nombre de tabla incorrecto. Un permiso de más o de menos no cambiaría este error; hay que corregir el nombre de la tabla en el código o la configuración." />
          <QaItem question="¿Debería la función de consulta (GET) tener permiso dynamodb:DeleteItem sobre la tabla de reseñas, 'por si algún día se necesita'?" answer="No — mínimo privilegio: se otorga cuando exista una necesidad real y concreta de eliminar, no de forma anticipada 'por si acaso' (Módulo 9)." />
        </section>

        <section className="lesson-section">
          <h3>24-25. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El desarrollador propone: &quot;démosle a la función de reseñas permiso dynamodb:* sobre toda la cuenta, así no volvemos a toparnos con un AccessDeniedException.&quot; No estoy de acuerdo porque eso otorgaría acceso a todas las tablas de DynamoDB de la cuenta, no solo a cloudshop-resenas — exactamente el error de mínimo privilegio que ya corregimos en el Módulo 9 y en la Clase 4. Esto es lo que haría en su lugar: otorgar las acciones específicas (PutItem, Query) sobre el ARN exacto de la tabla que la función usa. El riesgo de su enfoque es que un error en esta función pueda afectar datos de cualquier otra tabla de la cuenta.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: &quot;si algo falla, probemos aumentando la memoria y el timeout antes de revisar los permisos.&quot; No estoy de acuerdo porque un AccessDeniedException no tiene relación con memoria o timeout (Clase 5) — es un problema de permisos, y CloudWatch Logs normalmente lo dice explícitamente. Esto es lo que haría en su lugar: leer el mensaje de error exacto antes de cambiar cualquier configuración. El riesgo de su enfoque es perder tiempo ajustando parámetros que no tienen relación con la causa real del problema.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>26. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'Para escribir en DynamoDB, el Execution Role de la función necesita un permiso explícito sobre esa tabla.', correct: true },
            { text: 'PutItem se usa para guardar o reemplazar un item en una tabla.', correct: true },
            { text: 'Query permite obtener varios items que comparten la misma Partition Key.', correct: true },
            { text: 'ResourceNotFoundException siempre significa que falta un permiso IAM.', correct: false },
            { text: 'AccessDeniedException siempre significa que la tabla no existe.', correct: false },
            { text: 'La arquitectura completa de este módulo no requiere administrar ningún servidor propio.', correct: true },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>27. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>28. Reto oral</h3>
          <Dialogo>Explícame la arquitectura completa de la función de reseñas de CloudShop sin usar las palabras Lambda, DynamoDB, API Gateway, SNS ni servidor.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>&quot;Alguien envía una opinión desde afuera. Un punto de entrada la recibe y la pasa a un trozo de código que se enciende solo para esa tarea. Ese código guarda la opinión en un lugar hecho para encontrarla rápido después, y si la opinión es mala, avisa a quien debe saberlo — todo sin que nadie haya tenido que dejar nada prendido esperando.&quot;</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>29. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>PutItem</td><td>Guardar/reemplazar un item</td></tr>
              <tr><td>Query</td><td>Consultar items que comparten Partition Key</td></tr>
              <tr><td>Permiso sobre el ARN de la tabla</td><td>Requisito del Execution Role para operar en DynamoDB</td></tr>
              <tr><td>ResourceNotFoundException</td><td>La tabla no existe o el nombre está mal</td></tr>
              <tr><td>AccessDeniedException</td><td>Falta un permiso en el Execution Role</td></tr>
              <tr><td>Arquitectura completa</td><td>API Gateway → Lambda → DynamoDB (+ SNS), sin servidores propios</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>30. Ticket de salida</h3>
          <Dialogo>Un compañero dice: &quot;mi función guarda bien las reseñas pero al consultar por productId no devuelve nada, aunque sé que hay datos guardados.&quot; ¿Qué revisarías primero?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Revisaría que la Query esté usando exactamente el mismo nombre de atributo como Partition Key (productId) que se usó al guardar con PutItem, y que el valor buscado coincida exactamente (mayúsculas, espacios, tipo de dato). Un desajuste entre cómo se escribió el item y cómo se consulta es la causa más común de &quot;no encuentra nada&quot; cuando los datos sí existen.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Próximamente</div>
          <p>Ya tenemos todas las piezas por separado: Lambda, API Gateway, IAM, configuración, DynamoDB. Falta cerrar el módulo de la forma en que cerramos todos los anteriores: construyendo una API serverless completa para CloudShop, de principio a fin.</p>
          <ConceptBadge icon="zap">Módulo 10 · Clase 8 — Laboratorio integrador: construir una API serverless completa para CloudShop</ConceptBadge>
          <span className="tag tag-outline">Módulo 10 · Clase 8 · próximamente</span>
        </div>

      </div>
    </div>
  );
}
