import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, Flow, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const TRUST_POLICY_LAMBDA = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "lambda.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}`;

const PERMISSIONS_POLICY_LAMBDA = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"],
      "Resource": "arn:aws:logs:eu-oeste-1:111122223333:*"
    },
    {
      "Effect": "Allow",
      "Action": "sns:Publish",
      "Resource": "arn:aws:sns:eu-oeste-1:111122223333:cloudshop-calidad"
    }
  ]
}`;

const ACCESS_DENIED_LOG = `2026-09-04T10:15:02Z ERROR AccessDeniedException: User: arn:aws:sts::111122223333:
assumed-role/cloudshop-resenas-role/cloudshop-crear-resena is not authorized
to perform: sns:Publish on resource: cloudshop-calidad`;

const QUIZ_QUESTIONS = [
  { q: '¿Qué es el Execution Role de una función Lambda?', options: [{ text: 'El rol IAM que la función asume para tener permiso de hacer cosas dentro de AWS.', correct: true }, { text: 'El nombre de la función en la consola.', correct: false }, { text: 'El lenguaje de programación usado.', correct: false }, { text: 'Un tipo de Stage de API Gateway.', correct: false }] },
  { q: '¿Qué Principal aparece en la trust policy del Execution Role de Lambda?', options: [{ text: 'lambda.amazonaws.com — el servicio Lambda.', correct: true }, { text: 'ec2.amazonaws.com.', correct: false }, { text: 'La cuenta root.', correct: false }, { text: 'Un usuario IAM específico.', correct: false }] },
  { q: '¿Qué permiso mínimo necesita casi cualquier función Lambda para funcionar bien con observabilidad?', options: [{ text: 'Permiso para escribir logs en CloudWatch Logs.', correct: true }, { text: 'AdministratorAccess.', correct: false }, { text: 'Acceso completo a S3.', correct: false }, { text: 'Ninguno, los logs se generan sin permisos.', correct: false }] },
  { q: '¿Qué error típico aparece cuando a una función le falta un permiso que necesita en tiempo de ejecución?', options: [{ text: 'AccessDeniedException.', correct: true }, { text: 'Un error de sintaxis del código.', correct: false }, { text: 'Un timeout de red únicamente.', correct: false }, { text: 'Ningún error, simplemente no hace nada.', correct: false }] },
  { q: '¿Cada función Lambda debería compartir el mismo Execution Role con permisos amplios "por si acaso"?', options: [{ text: 'Sí, así se simplifica la administración.', correct: false }, { text: 'No — cada función debería tener el rol con exactamente los permisos que su tarea requiere.', correct: true }] },
  { q: '¿Dónde investigarías primero si una función Lambda falla con un error de permisos?', options: [{ text: 'En CloudWatch Logs, revisando el mensaje de error específico.', correct: true }, { text: 'En el código HTML de la página web.', correct: false }, { text: 'En la factura de AWS.', correct: false }, { text: 'No hay forma de saberlo.', correct: false }] },
];

export default function Modulo10Clase4() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 10 · Clase 4</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 10 · Clase 4: IAM y el Execution Role de Lambda — dar a cada función solo los permisos que necesita</h2>
      <p className="lesson-subtitle">
        Que Lambda no tenga un servidor visible no significa que no tenga una identidad. Y esa identidad necesita permiso para todo lo que hace.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + lectura de políticas + diagnóstico de errores + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 10 · Clases 1 a 3, Módulo 9</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es el Execution Role de una función Lambda.</li>
            <li>Reconocer la trust policy que permite a Lambda asumir ese rol.</li>
            <li>Diseñar una permissions policy de mínimo privilegio para una función concreta.</li>
            <li>Reconocer el permiso básico necesario para que una función escriba logs en CloudWatch.</li>
            <li>Diagnosticar un error de permisos (AccessDeniedException) usando CloudWatch Logs.</li>
            <li>Aplicar mínimo privilegio a funciones Lambda, igual que a usuarios y roles en el Módulo 9.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-3. Recordemos dónde quedamos</h3>
          <p>La función de reseñas de CloudShop ya recibe solicitudes reales desde API Gateway (Clase 3). Pero el problema original del módulo seguía pendiente: cuando una reseña tiene calificación baja, la función debería notificar al equipo de calidad. Al intentarlo, la función falla.</p>
          <ConceptBadge icon="alert-triangle">La función no tiene permiso para hacer absolutamente nada más allá de ejecutarse.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>4-6. Toda función Lambda tiene una identidad: el Execution Role</h3>
          <p>Cuando Lambda ejecuta una función, lo hace &quot;disfrazada&quot; de un rol IAM específico — su <strong>Execution Role</strong>. Es exactamente el mismo mecanismo de roles que conocimos en el Módulo 9, Clase 3, aplicado ahora a funciones en vez de a instancias EC2.</p>
          <Flow steps={[{ icon: 'zap', label: 'Función Lambda' }, { icon: 'users', label: 'Execution Role' }, { icon: 'file-text', label: 'Permisos' }, { icon: 'cloud', label: 'Otros servicios AWS' }]} />
          <Nota><p>¿Recuerdas la trust policy y la permissions policy que separamos en el Módulo 9? Aquí aparecen exactamente igual — solo que ahora quien asume el rol no es una EC2, es Lambda.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>7-9. La trust policy: quién puede asumir este rol</h3>
          <pre className="codeblock">{TRUST_POLICY_LAMBDA}</pre>
          <p>En español: <em>&quot;Se permite que el servicio Lambda asuma este rol.&quot;</em> La misma estructura Effect/Principal/Action que leímos en el Módulo 9 — solo que ahora el Principal es <code>lambda.amazonaws.com</code> en vez de <code>ec2.amazonaws.com</code>.</p>
        </section>

        <section className="lesson-section">
          <h3>10-12. El permiso mínimo que casi toda función necesita</h3>
          <p>Para que nuestra función pueda escribir sus <code>console.log</code> en CloudWatch Logs (Clase 2), su Execution Role necesita permiso explícito para crear Log Groups, Log Streams y escribir eventos de log.</p>
          <Nota><p>Sin ese permiso, la función podría seguir ejecutándose, pero perderíamos toda visibilidad sobre lo que hace — exactamente el tipo de investigación que practicamos en el Módulo 8.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>13-15. Ahora el permiso que faltaba: notificar al equipo de calidad</h3>
          <pre className="codeblock">{PERMISSIONS_POLICY_LAMBDA}</pre>
          <table className="table lesson-summary-table">
            <thead><tr><th>Statement</th><th>Traducción</th></tr></thead>
            <tbody>
              <tr><td>logs:CreateLogGroup / CreateLogStream / PutLogEvents</td><td>Permite escribir logs en CloudWatch</td></tr>
              <tr><td>sns:Publish sobre cloudshop-calidad</td><td>Permite enviar una notificación a ese topic específico, y a ningún otro</td></tr>
            </tbody>
          </table>
          <ConceptBadge icon="lock">No Action: &quot;*&quot;. No Resource: &quot;*&quot;. Solo lo que esta función específica necesita.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>16-17. Diagnosticando un error real de permisos</h3>
          <p>Antes de agregar ese permiso de SNS, la función habría fallado así, visible en CloudWatch Logs (Módulo 8):</p>
          <pre className="codeblock">{ACCESS_DENIED_LOG}</pre>
          <QaItem question="¿Qué nos dice exactamente este mensaje?" answer="Que el rol cloudshop-resenas-role no tiene permiso para hacer sns:Publish sobre el recurso cloudshop-calidad — nos dice con precisión qué acción y qué recurso agregar a la permissions policy." />
        </section>

        <section className="lesson-section">
          <h3>18-19. Cada función, su propio rol</h3>
          <QaItem question="La función que consulta el detalle de un producto (Clase 3, reto) y la función de reseñas, ¿deberían compartir el mismo Execution Role?" answer="No necesariamente — si una solo necesita leer datos y la otra necesita publicar en SNS, compartir el mismo rol le daría a la primera un permiso que nunca usa, violando mínimo privilegio." />
          <p>La misma disciplina del Módulo 9: cada identidad —ahora, cada función— recibe solo lo que su tarea específica requiere.</p>
        </section>

        <section className="lesson-section">
          <h3>20-21. Volvamos a CloudShop</h3>
          <p>Con el Execution Role correctamente configurado, la función de reseñas ya puede: escribir sus logs, y publicar una notificación en el topic SNS del equipo de calidad cuando una reseña tiene calificación baja — nada más.</p>
          <Flow steps={[{ icon: 'globe', label: 'Cliente' }, { icon: 'settings', label: 'API Gateway' }, { icon: 'zap', label: 'Lambda + Execution Role' }, { icon: 'bell', label: 'SNS → Equipo de calidad' }]} />
        </section>

        <section className="lesson-section">
          <h3>22-23. RETO DE LA CLASE</h3>
          <Nota><p>CloudShop necesita una nueva función Lambda que, al recibir una solicitud, lea información de un producto guardada en un bucket S3 llamado <code>cloudshop-catalogo-json</code> y la devuelva. Diseña la trust policy y la permissions policy de su Execution Role.</p></Nota>
          <Reveal label="Ver la solución esperada">
            <p>Trust policy: Effect Allow, Principal Service lambda.amazonaws.com, Action sts:AssumeRole — idéntica en estructura a la de cualquier función Lambda. Permissions policy: permiso para escribir logs (logs:CreateLogGroup/CreateLogStream/PutLogEvents) más Allow sobre s3:GetObject, limitado al Resource arn:aws:s3:::cloudshop-catalogo-json/* — sin permiso de escritura ni de eliminación, porque la función solo necesita leer.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>24-25. Retos nivel 2 y 3</h3>
          <QaItem question="Una función Lambda tiene un Execution Role con Action: '*' y Resource: '*'. ¿Qué principio del Módulo 9 está incumpliendo, y qué riesgo concreto trae?" answer="Mínimo privilegio. Si esa función tiene una vulnerabilidad o un error de lógica que un atacante logra explotar, el daño potencial equivale al de un administrador completo de la cuenta." />
          <QaItem question="Una función falla con 'AccessDeniedException... not authorized to perform: dynamodb:PutItem'. ¿Qué corrección aplicarías?" answer="Agregar a la permissions policy del Execution Role un Allow para dynamodb:PutItem, limitado al ARN de la tabla específica que la función necesita escribir — no a todas las tablas de la cuenta." />
        </section>

        <section className="lesson-section">
          <h3>26-27. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El desarrollador propone: &quot;creemos un único Execution Role con AdministratorAccess y se lo asignamos a todas las funciones Lambda de CloudShop, así nunca más nos topamos con un AccessDeniedException.&quot; No estoy de acuerdo porque eso multiplica el riesgo de cualquier error o vulnerabilidad en cualquier función a toda la cuenta — el mismo problema de fondo que corregimos con los usuarios de CloudShop en el Módulo 9. Esto es lo que haría en su lugar: un rol específico por función, ajustado a lo que realmente necesita. El riesgo de su enfoque es que una sola función comprometida tenga alcance total sobre la cuenta.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: &quot;agreguemos permisos de más 'por si en el futuro la función los necesita', así no tenemos que volver a tocar la política.&quot; No estoy de acuerdo porque anticipar permisos futuros de forma amplia es exactamente el mismo error que ya vimos con Action: &apos;*&apos; en el Módulo 9 — la política crece más rápido que la necesidad real. Esto es lo que haría en su lugar: otorgar exactamente lo necesario hoy, y ampliar la política cuando surja una necesidad real y concreta. El riesgo de su enfoque es acumular permisos sin usar que nadie recuerda por qué existen.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>28. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'Toda función Lambda ejecuta código bajo la identidad de su Execution Role.', correct: true },
            { text: 'La trust policy del Execution Role de Lambda tiene como Principal al servicio ec2.amazonaws.com.', correct: false },
            { text: 'Para escribir logs en CloudWatch, la función necesita permisos explícitos en su rol.', correct: true },
            { text: 'AccessDeniedException indica que falta un permiso específico en el Execution Role.', correct: true },
            { text: 'Todas las funciones Lambda de una cuenta deberían compartir el mismo rol con permisos amplios.', correct: false },
            { text: 'CloudWatch Logs puede ayudar a diagnosticar exactamente qué permiso falta.', correct: true },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>29. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>30. Reto oral</h3>
          <Dialogo>Explícame qué es el Execution Role de una función Lambda sin usar las palabras rol, permiso, IAM, ejecución ni Lambda.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>&quot;Es la identidad que se pone temporalmente el código cuando corre, y que determina exactamente qué otras cosas dentro del sistema puede tocar mientras trabaja — ni más, ni menos.&quot;</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>31. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Execution Role</td><td>Rol IAM que asume la función al ejecutarse</td></tr>
              <tr><td>lambda.amazonaws.com</td><td>Principal en la trust policy del rol</td></tr>
              <tr><td>logs:PutLogEvents, etc.</td><td>Permiso mínimo para escribir en CloudWatch Logs</td></tr>
              <tr><td>AccessDeniedException</td><td>Error cuando falta un permiso específico</td></tr>
              <tr><td>Un rol por función</td><td>Mínimo privilegio aplicado a Lambda</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>32. Ticket de salida</h3>
          <Dialogo>Un compañero dice: &quot;mi función Lambda dejó de funcionar de repente, capaz se rompió algo en el código.&quot; ¿Qué revisarías antes de tocar el código?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Revisaría primero CloudWatch Logs de esa función, buscando específicamente un AccessDeniedException — muchas veces &quot;se rompió el código&quot; en realidad es &quot;falta un permiso en el Execution Role&quot;, y el mensaje de error suele decir exactamente qué acción y qué recurso hacen falta.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 5</div>
          <p>Nuestra función ya tiene permisos correctos. Pero todavía no hablamos de cuánta memoria usa, cuánto puede tardar antes de que Lambda la corte, ni por qué a veces la primera invocación después de un rato de inactividad se siente más lenta que las siguientes.</p>
          <ConceptBadge icon="clock">Módulo 10 · Clase 5 — Configuración, límites y cold starts: memoria, timeout, variables de entorno y rendimiento</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-10/clase-5" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 5: Configuración, límites y cold starts →
          </Link>
        </div>

      </div>
    </div>
  );
}
