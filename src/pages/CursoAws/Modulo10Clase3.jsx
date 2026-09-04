import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const EVENT_API_GATEWAY = `{
  "httpMethod": "POST",
  "path": "/resenas",
  "headers": { "Content-Type": "application/json" },
  "queryStringParameters": null,
  "body": "{\\"productId\\":\\"p-7791\\",\\"rating\\":2,\\"comment\\":\\"Empaque dañado\\"}"
}`;

const HANDLER_API_GATEWAY = `exports.handler = async (event, context) => {
  const datos = JSON.parse(event.body);

  console.log("Nueva reseña vía API:", datos.productId);

  return {
    statusCode: 201,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mensaje: "Reseña recibida", productId: datos.productId })
  };
};`;

const QUIZ_QUESTIONS = [
  { q: '¿Qué es Amazon API Gateway?', options: [{ text: 'El servicio que crea y administra endpoints HTTP que pueden invocar funciones Lambda.', correct: true }, { text: 'Un tipo de base de datos.', correct: false }, { text: 'Un balanceador de carga para EC2.', correct: false }, { text: 'Un servicio de almacenamiento.', correct: false }] },
  { q: '¿Qué información nueva aparece en event cuando la función se dispara vía API Gateway?', options: [{ text: 'httpMethod, path, headers y body, entre otros.', correct: true }, { text: 'Nada cambia respecto a un Test Event manual.', correct: false }, { text: 'Solo el nombre del bucket S3.', correct: false }, { text: 'El tiempo restante de ejecución.', correct: false }] },
  { q: '¿Cómo debe venir estructurada la respuesta de un handler conectado a API Gateway?', options: [{ text: 'Con statusCode y body (normalmente serializado como texto JSON).', correct: true }, { text: 'Puede devolver cualquier cosa, API Gateway lo adapta automáticamente.', correct: false }, { text: 'Solo con un mensaje de texto plano, sin estructura.', correct: false }, { text: 'No debe devolver nada.', correct: false }] },
  { q: '¿Qué determina a qué función Lambda llega una solicitud HTTP en API Gateway?', options: [{ text: 'La combinación de método HTTP y ruta (route).', correct: true }, { text: 'La hora del día.', correct: false }, { text: 'El nombre del cliente que llama.', correct: false }, { text: 'El tamaño del cuerpo de la solicitud.', correct: false }] },
  { q: '¿Qué es un Stage en API Gateway?', options: [{ text: 'Un entorno publicado del API, como dev o prod, cada uno con su propia URL.', correct: true }, { text: 'Un tipo de instancia EC2.', correct: false }, { text: 'Un rol IAM especial.', correct: false }, { text: 'Una tabla de DynamoDB.', correct: false }] },
  { q: '¿event.body llega ya convertido en objeto listo para usar?', options: [{ text: 'Sí, automáticamente.', correct: false }, { text: 'No — normalmente llega como texto y hay que parsearlo (por ejemplo, con JSON.parse).', correct: true }] },
];

export default function Modulo10Clase3() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 10 · Clase 3</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 10 · Clase 3: Lambda + API Gateway — exponer una función como endpoint HTTP</h2>
      <p className="lesson-subtitle">
        Nuestra función ya sabe qué hacer. Le falta una puerta con dirección propia para que el mundo exterior pueda tocarla.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + laboratorio guiado + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 10 · Clases 1 y 2, Módulo 7</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es Amazon API Gateway y qué problema resuelve.</li>
            <li>Comprender cómo un método HTTP y una ruta determinan qué función Lambda se invoca.</li>
            <li>Leer la nueva forma del event cuando la función se dispara vía API Gateway.</li>
            <li>Formatear correctamente la respuesta de un handler para que API Gateway la entienda.</li>
            <li>Reconocer qué es un Stage y cómo se relaciona con la URL final del endpoint.</li>
            <li>Conectar una función Lambda a un endpoint HTTP funcional para CloudShop.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-3. Recordemos dónde quedamos</h3>
          <p>En la Clase 2 probamos la función de reseñas con un Test Event manual, escrito a mano en la consola. Funciona para desarrollar, pero ningún cliente de CloudShop puede &quot;abrir la consola de AWS y pegar un JSON&quot; cuando termina de escribir una reseña.</p>
          <ConceptBadge icon="globe">Necesitamos una URL real, a la que cualquier sistema pueda enviar una solicitud HTTP normal.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>4-6. Aparece Amazon API Gateway</h3>
          <p><strong>Amazon API Gateway</strong> es el servicio de AWS para crear, publicar y administrar APIs HTTP. Recibe solicitudes de internet y las dirige hacia la función Lambda correspondiente, sin que nosotros tengamos que administrar ningún servidor web.</p>
          <Flow steps={[{ icon: 'globe', label: 'Cliente HTTP' }, { icon: 'settings', label: 'API Gateway' }, { icon: 'zap', label: 'Lambda' }]} />
          <Dialogo>Recuerda el ALB del Módulo 7: recibía tráfico y lo enviaba a un Target Group de instancias EC2. API Gateway cumple un rol conceptualmente parecido, pero en vez de repartir tráfico entre servidores que ya están corriendo, dispara una función que ni siquiera existe como proceso hasta ese instante.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>7-9. Método + ruta: cómo decide API Gateway a dónde ir</h3>
          <p>Igual que un Listener del ALB usaba reglas para decidir a qué Target Group enviar el tráfico (Módulo 7), API Gateway usa la combinación de <strong>método HTTP</strong> (GET, POST, PUT, DELETE...) y <strong>ruta</strong> (path) para decidir qué función Lambda invocar.</p>
          <table className="table lesson-summary-table">
            <thead><tr><th>Método + Ruta</th><th>Función Lambda</th></tr></thead>
            <tbody>
              <tr><td className="mono">POST /resenas</td><td>cloudshop-crear-resena</td></tr>
              <tr><td className="mono">GET /productos/{'{id}'}</td><td>cloudshop-obtener-producto</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>10-12. El event cambia de forma</h3>
          <p>Cuando la función se dispara desde API Gateway, <code>event</code> ya no es el JSON simple que escribimos a mano en la Clase 2 — ahora incluye toda la información de la solicitud HTTP real.</p>
          <pre className="codeblock">{EVENT_API_GATEWAY}</pre>
          <table className="table lesson-summary-table">
            <thead><tr><th>Campo</th><th>Qué contiene</th></tr></thead>
            <tbody>
              <tr><td className="mono">httpMethod</td><td>El verbo HTTP usado (POST, GET...)</td></tr>
              <tr><td className="mono">path</td><td>La ruta a la que se llamó</td></tr>
              <tr><td className="mono">headers</td><td>Los encabezados de la solicitud</td></tr>
              <tr><td className="mono">body</td><td>El contenido enviado — normalmente como texto, no como objeto</td></tr>
            </tbody>
          </table>
          <Nota><p>Este es exactamente el punto que remarcamos en la Clase 2: la forma de event depende de qué disparó la función. Un Test Event manual no se parece en nada a esto.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>13-15. Adaptando nuestro handler</h3>
          <pre className="codeblock">{HANDLER_API_GATEWAY}</pre>
          <QaItem question="¿Por qué hace falta JSON.parse(event.body)?" answer="Porque event.body llega como texto plano (una cadena de caracteres), aunque ese texto tenga forma de JSON — hay que convertirlo explícitamente en un objeto antes de leer sus propiedades." />
        </section>

        <section className="lesson-section">
          <h3>16-18. La respuesta también tiene forma esperada</h3>
          <p>API Gateway espera que el handler devuelva un objeto con, al menos, <code>statusCode</code> y <code>body</code>. El body debe ser texto (por eso usamos <code>JSON.stringify</code>), no un objeto directo.</p>
          <RoleGrid roles={[
            { icon: 'check-circle', label: 'statusCode', desc: '201 (creado), 200 (éxito), 400 (error del cliente), 500 (error del servidor)...' },
            { icon: 'file-text', label: 'body', desc: 'El contenido de la respuesta, como texto' },
          ]} />
          <ConceptBadge icon="alert-triangle">Si el handler devuelve algo con una forma distinta, API Gateway puede no interpretarlo correctamente.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>19-20. Stages: dónde vive realmente nuestro endpoint</h3>
          <p>Un <strong>Stage</strong> es una versión publicada del API — por ejemplo, <code>dev</code> o <code>prod</code> — y cada Stage tiene su propia URL de invocación. Publicar cambios en el Stage de desarrollo no afecta automáticamente al de producción, hasta que decidamos promoverlos.</p>
          <Flow steps={[{ label: 'API definida' }, { label: 'Stage: dev' }, { label: 'Stage: prod' }]} />
        </section>

        <section className="lesson-section">
          <h3>21-22. Volvamos a CloudShop</h3>
          <p>Con la función de reseñas conectada a <code>POST /resenas</code> en API Gateway, cualquier parte del sitio de CloudShop (o incluso una app móvil futura) puede enviar una solicitud HTTP normal para registrar una reseña, sin saber nada sobre Lambda por dentro.</p>
          <QaItem question="Si un cliente hace GET /resenas en vez de POST /resenas, ¿qué debería ocurrir?" answer="Debería fallar o responder con un error claro (por ejemplo, 403/404, según cómo esté configurado), porque esa combinación de método y ruta no fue definida para invocar ninguna función." />
        </section>

        <section className="lesson-section">
          <h3>23-24. RETO DE LA CLASE</h3>
          <Nota><p>CloudShop necesita exponer <code>GET /productos/{'{id}'}</code> para consultar el detalle de un producto. Diseña, a alto nivel, qué configurarías en API Gateway y qué esperarías recibir en event dentro del handler.</p></Nota>
          <Reveal label="Ver la solución esperada">
            <p>En API Gateway: una ruta con método GET y path <code>/productos/{'{id}'}</code>, conectada a una función Lambda (por ejemplo, <code>cloudshop-obtener-producto</code>). En el handler, event.httpMethod sería &quot;GET&quot;, event.path incluiría el ID solicitado (normalmente disponible en <code>event.pathParameters.id</code>), y no habría body relevante que parsear, a diferencia del POST de reseñas.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>25-26. Retos nivel 2 y 3</h3>
          <QaItem question="Un handler que funcionaba perfecto con un Test Event manual falla al conectarlo a API Gateway con el error 'Cannot read property productId of undefined'. ¿Qué es probable que esté pasando?" answer="El código probablemente está leyendo event.productId directamente, cuando ahora los datos vienen dentro de event.body como texto — hace falta parsear event.body primero." />
          <QaItem question="¿Debería la misma función Lambda atender tanto POST /resenas como GET /resenas, decidiendo internamente qué hacer según event.httpMethod?" answer="Es una opción válida en proyectos pequeños, pero separar en funciones distintas (una por responsabilidad, como vimos en la Clase 2) suele mantener el código y los permisos más simples de razonar." />
        </section>

        <section className="lesson-section">
          <h3>27-28. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El desarrollador propone: &quot;probemos directamente en producción conectando la función al Stage prod, así nos ahorramos configurar un Stage de pruebas.&quot; No estoy de acuerdo porque un error en la forma de la respuesta, como los que vimos hoy, afectaría inmediatamente a clientes reales. Esto es lo que haría en su lugar: probar en un Stage de desarrollo y promover a producción solo después de validar. El riesgo de su enfoque es exponer errores de integración directamente a usuarios de CloudShop.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: &quot;devolvamos siempre statusCode: 200, así nunca tenemos que pensar en códigos de error.&quot; No estoy de acuerdo porque el código de estado es información real para quien consume la API — un error disfrazado de éxito hace que el cliente crea que la reseña se guardó cuando en realidad falló. Esto es lo que haría en su lugar: usar códigos de estado que reflejen honestamente el resultado (400, 500, etc. cuando corresponda). El riesgo de su enfoque es ocultar fallas reales detrás de una respuesta aparentemente exitosa.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>29. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'API Gateway puede dirigir solicitudes HTTP hacia funciones Lambda según método y ruta.', correct: true },
            { text: 'event.body llega siempre ya convertido en objeto, listo para usar sin parsear.', correct: false },
            { text: 'Un handler conectado a API Gateway debe devolver, al menos, statusCode y body.', correct: true },
            { text: 'Un Stage es una versión publicada del API, con su propia URL.', correct: true },
            { text: 'La forma de event es siempre idéntica sin importar si viene de un Test Event o de API Gateway.', correct: false },
            { text: 'Publicar cambios en el Stage dev afecta automáticamente al Stage prod.', correct: false },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>30. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>31. Reto oral</h3>
          <Dialogo>Explícame qué hace API Gateway sin usar las palabras API, Gateway, HTTP, endpoint ni Lambda.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>&quot;Es la recepción que atiende a quien llega de afuera, revisa qué está pidiendo y a través de qué puerta, y avisa exactamente a quién corresponde encargarse — sin que quien llegó necesite saber nada de lo que pasa puertas adentro.&quot;</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>32. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>API Gateway</td><td>Convierte solicitudes HTTP en invocaciones de Lambda</td></tr>
              <tr><td>Route (método + ruta)</td><td>Decide qué función se invoca</td></tr>
              <tr><td>event.httpMethod / path</td><td>Qué método y ruta se usaron</td></tr>
              <tr><td>event.body</td><td>Contenido enviado, como texto — requiere parsear</td></tr>
              <tr><td>statusCode + body de retorno</td><td>Forma esperada de la respuesta</td></tr>
              <tr><td>Stage</td><td>Versión publicada del API, con su propia URL</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>33. Ticket de salida</h3>
          <Dialogo>Un compañero conecta su función a API Gateway y dice: &quot;no entiendo por qué ahora falla si en la consola con el Test Event funcionaba perfecto.&quot; ¿Qué le preguntarías primero?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Le preguntaría si su código está leyendo los datos como si event fuera el JSON simple de la Clase 2, o si ya está leyendo desde event.body (parseado con JSON.parse) como corresponde cuando la función viene de API Gateway — es el error más común al pasar de pruebas manuales a un endpoint real.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 4</div>
          <p>Nuestra función ya recibe tráfico real desde internet. Pero todavía no le dimos permiso para hacer nada más allá de responder — ni leer un producto, ni escribir en ninguna base de datos. Necesita su propia identidad dentro de AWS.</p>
          <ConceptBadge icon="key">Módulo 10 · Clase 4 — IAM y el Execution Role de Lambda: dar a cada función solo los permisos que necesita</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-10/clase-4" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 4: IAM y el Execution Role de Lambda →
          </Link>
        </div>

      </div>
    </div>
  );
}
