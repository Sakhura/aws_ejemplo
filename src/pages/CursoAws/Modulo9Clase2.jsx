import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const POLICY_SIMPLE = `{
  "Effect": "Allow",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::cloudshop-catalogo/*"
}`;

const POLICY_FULL = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::cloudshop-catalogo/*"
    }
  ]
}`;

const POLICY_ADMIN = `{
  "Effect": "Allow",
  "Action": "*",
  "Resource": "*"
}`;

const POLICY_DENY_EXPLICITO = `{
  "Version": "2012-10-17",
  "Statement": [
    { "Effect": "Allow", "Action": "s3:*", "Resource": "*" },
    { "Effect": "Deny", "Action": "s3:DeleteObject", "Resource": "*" }
  ]
}`;

const POLICY_RETO = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::cloudshop-devoluciones/*"
    }
  ]
}`;

const QUIZ_QUESTIONS = [
  { q: '¿Qué es una IAM Policy?', options: [{ text: 'Un documento que define qué acciones están permitidas o denegadas sobre qué recursos.', correct: true }, { text: 'Un tipo de instancia EC2.', correct: false }, { text: 'Una contraseña temporal.', correct: false }, { text: 'Un dispositivo MFA.', correct: false }] },
  { q: '¿Qué significa Effect: Allow?', options: [{ text: 'Permitir.', correct: true }, { text: 'Denegar.', correct: false }, { text: 'Eliminar.', correct: false }, { text: 'Auditar.', correct: false }] },
  { q: '¿Qué indica Action en una política?', options: [{ text: 'Qué operación puede o no realizarse.', correct: true }, { text: 'Quién es el usuario.', correct: false }, { text: 'La Región de AWS.', correct: false }, { text: 'El precio del servicio.', correct: false }] },
  { q: '¿Qué indica Resource en una política?', options: [{ text: 'Sobre qué recurso concreto aplica la acción.', correct: true }, { text: 'El nombre del usuario.', correct: false }, { text: 'El proveedor de identidad.', correct: false }, { text: 'La fecha de creación de la cuenta.', correct: false }] },
  { q: 'Si ninguna política permite explícitamente una acción, ¿queda permitida por defecto?', options: [{ text: 'Sí.', correct: false }, { text: 'No, queda denegada implícitamente.', correct: true }] },
  { q: 'Si un Allow y un Deny aplican sobre la misma acción, ¿cuál gana?', options: [{ text: 'El Deny explícito.', correct: true }, { text: 'El Allow, porque es más flexible.', correct: false }, { text: 'Gana la política creada primero.', correct: false }, { text: 'Ninguno; AWS pregunta al usuario.', correct: false }] },
  { q: '¿Qué representa el comodín "*" en Action o Resource?', options: [{ text: 'Puede representar todas las acciones o todos los recursos, según el contexto.', correct: true }, { text: 'Un usuario específico.', correct: false }, { text: 'Una Región concreta.', correct: false }, { text: 'Un tipo de instancia.', correct: false }] },
  { q: '¿Qué principio busca entregar solo los permisos necesarios para una tarea?', options: [{ text: 'Mínimo privilegio.', correct: true }, { text: 'Máxima disponibilidad.', correct: false }, { text: 'Redundancia.', correct: false }, { text: 'Elasticidad.', correct: false }] },
  { q: '¿"Version": "2012-10-17" significa que la política fue creada en 2012?', options: [{ text: 'Sí.', correct: false }, { text: 'No, identifica la versión del lenguaje de políticas.', correct: true }] },
];

export default function Modulo9Clase2() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 9 · Clase 2</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 9 · Clase 2: IAM Policies y mínimo privilegio — cómo controlar qué puede hacer cada identidad</h2>
      <p className="lesson-subtitle">
        Autenticarse abre la puerta. Una política decide, habitación por habitación, qué puede tocarse una vez adentro.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + lectura guiada de JSON + actividades + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 9 · Clase 1</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es una IAM Policy y qué problema resuelve.</li>
            <li>Reconocer los elementos básicos de una política: Effect, Action, Resource.</li>
            <li>Diferenciar Allow y Deny, y comprender la denegación implícita.</li>
            <li>Explicar por qué un Deny explícito tiene prioridad sobre un Allow.</li>
            <li>Reconocer el riesgo de los comodines (<code>*</code>) en Action y Resource.</li>
            <li>Aplicar el principio de mínimo privilegio al diseñar permisos.</li>
            <li>Leer una política IAM completa en JSON sin que resulte intimidante.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-3. Recordemos dónde quedamos</h3>
          <Flow steps={[{ label: 'Identidad' }, { label: 'Autenticación' }, { label: 'Autorización', n: '?' }]} />
          <p>En la Clase 1 resolvimos dos preguntas: quién eres (identidad) y cómo lo demuestras (autenticación + MFA). Quedó pendiente la tercera, la que en el fondo protege los recursos: una vez que entraste, ¿qué puedes hacer?</p>
          <ConceptBadge icon="file-text">Esa pregunta la responde una IAM Policy.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>4-5. El problema que abre la clase</h3>
          <p>El equipo de CloudShop ya activó MFA en la cuenta root y dejó de compartirla. Buen comienzo. Pero todos los usuarios IAM del equipo siguen teniendo <strong>AdministratorAccess</strong>: Docente, Desarrollador, Soporte y Auditor pueden, todos por igual, crear, modificar y eliminar cualquier recurso.</p>
          <QaItem question="¿Soporte necesita poder eliminar una base de datos de producción para responder tickets de clientes?" answer="No. Y sin embargo, con AdministratorAccess, puede hacerlo." />
        </section>

        <section className="lesson-section">
          <h3>6-8. ¿Qué es una IAM Policy?</h3>
          <p>Una <strong>IAM Policy</strong> es un documento que define, de forma explícita, qué acciones están permitidas o denegadas sobre qué recursos. No es lo mismo que un usuario: el usuario responde &quot;¿quién?&quot;, la política responde &quot;¿qué puede hacer?&quot;.</p>
          <Flow steps={[{ icon: 'user', label: 'Usuario / Rol' }, { icon: 'file-text', label: 'Policy' }, { icon: 'package', label: 'Recurso' }]} />
          <Dialogo>Una política es como el reglamento interno de un edificio: no dice quién eres, dice qué puede hacer cada tipo de visitante una vez que ya mostró su identificación en la entrada.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>9-10. Allow y Deny</h3>
          <RoleGrid roles={[
            { icon: 'dot-success', label: 'Allow', desc: 'Permite explícitamente una acción' },
            { icon: 'dot-danger', label: 'Deny', desc: 'Deniega explícitamente una acción' },
          ]} />
          <p>Con esas dos palabras, y las preguntas &quot;¿qué acción?&quot; y &quot;¿sobre qué recurso?&quot;, ya podemos leer la inmensa mayoría de una política IAM.</p>
        </section>

        <section className="lesson-section">
          <h3>11-13. La regla que sorprende a casi todos: denegación implícita</h3>
          <ConceptBadge icon="shield" variant="warning">Si ninguna política permite explícitamente una acción, esa acción queda denegada.</ConceptBadge>
          <Dialogo>No funciona como &quot;si nadie dijo que no, puedo hacerlo&quot;. Funciona como una tarjeta de acceso de hotel: si tu tarjeta no fue programada para abrir la habitación 401, no la abre — sin que exista ninguna regla escrita diciendo &quot;prohibido para ti&quot;. Simplemente nunca te dieron ese permiso.</Dialogo>
          <Nota><p>Este es el motivo por el que, al crear un usuario IAM nuevo, este empieza sin poder hacer prácticamente nada — hasta que le asociamos políticas.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>14-15. ¿Entonces para qué existe Deny si ya hay denegación implícita?</h3>
          <p>Porque a veces necesitamos ser explícitos: bloquear una acción concreta incluso cuando otra política, en otro lugar, la esté permitiendo.</p>
          <ConceptBadge icon="alert-triangle" variant="danger">Un Deny explícito siempre gana, incluso frente a un Allow.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>16-17. Viendo esa regla en JSON</h3>
          <pre className="codeblock">{POLICY_DENY_EXPLICITO}</pre>
          <p>La primera declaración permite todas las acciones de S3. La segunda deniega explícitamente <code>s3:DeleteObject</code>. Resultado: esa identidad puede hacer casi cualquier cosa en S3, excepto eliminar objetos — el Deny recorta al Allow.</p>
        </section>

        <section className="lesson-section">
          <h3>18-20. Ahora sí: nuestro primer JSON completo</h3>
          <p>Empecemos por lo más simple posible:</p>
          <pre className="codeblock">{POLICY_SIMPLE}</pre>
          <table className="table lesson-summary-table">
            <thead><tr><th>Línea del JSON</th><th>Traducción</th></tr></thead>
            <tbody>
              <tr><td className="mono">&quot;Effect&quot;: &quot;Allow&quot;</td><td>Permitir</td></tr>
              <tr><td className="mono">&quot;Action&quot;: &quot;s3:GetObject&quot;</td><td>Obtener/leer un objeto de Amazon S3</td></tr>
              <tr><td className="mono">&quot;Resource&quot;: &quot;...cloudshop-catalogo/*&quot;</td><td>Los objetos dentro de ese bucket</td></tr>
            </tbody>
          </table>
          <p>En español: <em>&quot;Permitir leer los objetos del bucket cloudshop-catalogo.&quot;</em> Ya leímos nuestra primera política.</p>
        </section>

        <section className="lesson-section">
          <h3>21-22. Una política real suele tener más estructura</h3>
          <pre className="codeblock">{POLICY_FULL}</pre>
          <Flow steps={[{ icon: 'file-text', label: 'Policy' }, { icon: 'clipboard-list', label: 'Statement', caption: 'Una o más reglas' }]} />
          <Nota><p><code>Statement</code> es simplemente la lista de reglas que contiene la política — puede tener una o muchas.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>23. ¿Por qué dice &quot;2012-10-17&quot;?</h3>
          <p className="mono" style={{ fontSize: 14 }}>&quot;Version&quot;: &quot;2012-10-17&quot;</p>
          <Nota><p>No significa que la política se creó en 2012. Identifica la versión del lenguaje de políticas IAM que se está usando. Es normal seguir viendo esa fecha hoy — no hay ninguna máquina del tiempo escondida ahí.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>24-26. El comodín: útil y peligroso al mismo tiempo</h3>
          <ConceptBadge icon="zap">*</ConceptBadge>
          <p>El asterisco es un comodín: puede representar &quot;todas las acciones&quot; o &quot;todos los recursos&quot;, según dónde aparezca. Veamos qué significa combinarlo en ambos lugares a la vez:</p>
          <pre className="codeblock">{POLICY_ADMIN}</pre>
          <p>Traducción: permitir <strong>todas</strong> las acciones sobre <strong>todos</strong> los recursos. Es, en esencia, la misma idea detrás de AdministratorAccess — el problema que tiene CloudShop ahora mismo con los cuatro roles de su equipo.</p>
        </section>

        <section className="lesson-section">
          <h3>27-29. Mínimo privilegio, otra vez, pero con JSON al frente</h3>
          <p>Ya conocimos este principio con la cuenta root en la Clase 1. Ahora lo aplicamos a cada usuario IAM: entregar únicamente las acciones y recursos que esa identidad necesita para su trabajo — ni un permiso más.</p>
          <Flow steps={[{ icon: 'lock', label: 'Mínimo privilegio' }, { icon: 'file-text', label: 'Políticas específicas' }, { icon: 'check-circle', label: 'Solo lo necesario' }]} />
          <QaItem question="¿Por qué 'total, ya tiene MFA' no es excusa para darle AdministratorAccess a Soporte?" answer="MFA fortalece la autenticación (que sea quien dice ser), pero no limita la autorización (qué puede hacer). Son capas distintas, y ambas importan." />
        </section>

        <section className="lesson-section">
          <h3>30-32. Arreglemos a CloudShop</h3>
          <p>Retomemos los cuatro roles con AdministratorAccess: Docente, Desarrollador, Soporte y Auditor. Diseñemos qué necesita realmente cada uno.</p>
          <RoleGrid roles={[
            { icon: 'book-open', label: 'Docente', desc: 'Leer contenido de S3, sin crear ni eliminar infraestructura' },
            { icon: 'server', label: 'Desarrollador', desc: 'Gestionar EC2, S3 y RDS del entorno de desarrollo' },
            { icon: 'help-circle', label: 'Soporte', desc: 'Consultar (leer) recursos para diagnosticar tickets, sin poder eliminar' },
            { icon: 'search', label: 'Auditor', desc: 'Solo lectura sobre toda la cuenta, sin poder modificar nada' },
          ]} />
          <Nota><p>Ninguno de los cuatro necesita, para su trabajo diario, la capacidad de cerrar la cuenta o cambiar el método de pago — eso, como vimos en la Clase 1, es territorio de root, y ni siquiera root debería usarse para lo cotidiano.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>33-34. Actividades</h3>
          <QaItem question="Effect: Allow — Action: Leer — Resource: Reportes financieros. ¿Qué significa en español?" answer="Se permite consultar (leer) los reportes financieros." />
          <QaItem question="Effect: Deny — Action: Eliminar — Resource: Bucket de producción. ¿Qué significa?" answer="Se deniega explícitamente eliminar cualquier objeto de ese bucket, sin importar qué otro Allow exista." />
          <QaItem question="Un Allow otorga s3:* sobre todo el bucket, y otro statement agrega Deny sobre s3:DeleteBucket en ese mismo bucket. ¿Puede eliminarse el bucket?" answer="No. El Deny explícito prevalece sobre el Allow." />
        </section>

        <section className="lesson-section">
          <h3>35-36. Lee tu política: reto guiado</h3>
          <pre className="codeblock">{POLICY_RETO}</pre>
          <p>Sin buscar nada más, respondamos:</p>
          <QaItem question="¿Permite o deniega?" answer="Permite (Allow)." />
          <QaItem question="¿Qué acciones aparecen?" answer="s3:GetObject y s3:PutObject — es decir, leer y subir objetos." />
          <QaItem question="¿Sobre qué recurso aplica?" answer="Los objetos dentro del bucket cloudshop-devoluciones." />
          <QaItem question="¿Esta identidad puede eliminar objetos de ese bucket?" answer="No aparece ningún Allow para eliminar (DeleteObject), así que esa acción queda denegada implícitamente." />
        </section>

        <section className="lesson-section">
          <h3>37-38. RETO DE LA CLASE</h3>
          <Nota><p>El área de Soporte de CloudShop necesita: consultar el estado de los pedidos almacenados en S3, y consultar información básica de las instancias EC2 para ayudar a diagnosticar problemas reportados por clientes. No necesitan crear, modificar ni eliminar ningún recurso.</p></Nota>
          <Reveal label="Ver la política esperada (en español)">
            <p>Effect: Allow — Action: leer/consultar objetos de S3 y describir instancias EC2 — Resource: los buckets y recursos relevantes de CloudShop. Sin ningún Allow para crear, modificar o eliminar. Cualquier otra acción queda denegada implícitamente, sin necesidad de escribir un Deny para cada una.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>39-40. Retos nivel 2 y 3</h3>
          <QaItem question="Un usuario tiene Action: '*' y Resource: '*' en su única política. ¿Qué principio está incumpliendo la cuenta?" answer="Mínimo privilegio: el permiso es enormemente más amplio que cualquier tarea razonable." />
          <QaItem question="Un Auditor con permisos de solo lectura reporta que no puede modificar ni eliminar nada. ¿Es un error a corregir?" answer="No — es exactamente el comportamiento esperado para su función. 'No poder' no siempre es un bug." />
        </section>

        <section className="lesson-section">
          <h3>41-42. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El gerente propone: &quot;démosle AdministratorAccess a todos, así nunca tenemos que estar ajustando permisos cuando alguien los necesita.&quot; No estoy de acuerdo porque eso multiplica el daño potencial de cualquier error o de una sola credencial comprometida a toda la cuenta. Esto es lo que haría en su lugar: definir políticas específicas por función, basadas en lo que cada rol realmente hace. El riesgo de su enfoque es que un error de Soporte pueda eliminar infraestructura de producción sin ninguna barrera que lo detenga.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: &quot;no hace falta usar Deny, con no dar Allow ya alcanza.&quot; No estoy completamente de acuerdo — la denegación implícita cubre la mayoría de los casos, pero un Deny explícito sigue siendo necesario cuando queremos bloquear una acción específica de forma inequívoca, incluso frente a políticas más amplias que ya existen o que se agreguen después. Esto es lo que haría en su lugar: usar denegación implícita como base, y reservar Deny explícito para las excepciones críticas. El riesgo de ignorarlo es asumir que ningún Allow futuro volverá a abrir esa puerta.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>43. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'Una IAM Policy responde la pregunta "¿quién eres?".', correct: false },
            { text: 'Si ninguna política permite una acción, esa acción queda denegada por defecto.', correct: true },
            { text: 'Un Deny explícito puede ser anulado por un Allow en otra política.', correct: false },
            { text: 'El comodín "*" puede representar todas las acciones o todos los recursos.', correct: true },
            { text: 'Mínimo privilegio significa dar todos los permisos posibles "por si acaso".', correct: false },
            { text: '"Version": "2012-10-17" indica la versión del lenguaje de políticas, no la fecha de creación.', correct: true },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>44. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>45. Reto oral</h3>
          <Dialogo>Explícame qué es una IAM Policy sin usar las palabras política, permiso, IAM, JSON, Allow, Deny, Action, Resource ni AWS.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>&quot;Es el documento que decide, para cada quien, exactamente qué puede tocar y qué no, una vez que ya se demostró quién es.&quot;</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>46. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>IAM Policy</td><td>Documento que define permisos</td></tr>
              <tr><td>Statement</td><td>Lista de reglas dentro de la política</td></tr>
              <tr><td>Effect</td><td>¿Permitir o denegar?</td></tr>
              <tr><td>Action</td><td>¿Qué operación?</td></tr>
              <tr><td>Resource</td><td>¿Sobre qué recurso?</td></tr>
              <tr><td>Allow</td><td>Permitir</td></tr>
              <tr><td>Deny</td><td>Denegar</td></tr>
              <tr><td>Denegación implícita</td><td>Si nadie lo permitió, no se puede</td></tr>
              <tr><td>Deny explícito</td><td>Siempre gana sobre un Allow</td></tr>
              <tr><td>*</td><td>Comodín — todas las acciones o todos los recursos</td></tr>
              <tr><td>Mínimo privilegio</td><td>Solo los permisos necesarios, ni uno más</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>47. Ticket de salida</h3>
          <Dialogo>Un compañero te dice: &quot;le voy a dar a este usuario Action: '*' y Resource: '*', así no tengo que volver a tocar sus permisos nunca más.&quot; ¿Qué le responderías?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Que eso viola el principio de mínimo privilegio: cualquier error de ese usuario, o cualquier credencial suya comprometida, tendría el mismo alcance que un administrador total de la cuenta. Es preferible definir exactamente qué acciones y recursos necesita, aunque implique revisar la política más adelante si sus tareas cambian.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 3</div>
          <p>Ya sabemos escribir permisos precisos para personas. Pero CloudShop tiene servidores EC2 que también necesitan acceder a S3 y a otros servicios. ¿Le creamos un usuario IAM a un servidor? ¿Le damos una contraseña? ¿Guardamos Access Keys dentro del código de la aplicación?</p>
          <ConceptBadge icon="key">Módulo 9 · Clase 3 — IAM Roles y credenciales temporales: dar permisos a workloads sin Access Keys</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-9/clase-3" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 3: IAM Roles y credenciales temporales →
          </Link>
        </div>

      </div>
    </div>
  );
}
