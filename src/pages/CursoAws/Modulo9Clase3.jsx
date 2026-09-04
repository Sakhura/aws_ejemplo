import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const TRUST_POLICY = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "ec2.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}`;

const PERMISSIONS_POLICY = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::cloudshop-fotos-productos/*"
    }
  ]
}`;

const HARDCODED_ANTIPATTERN = `# Dentro del código de la aplicación (mala práctica)
AWS_ACCESS_KEY_ID = "AKIAEXAMPLE1234"
AWS_SECRET_ACCESS_KEY = "wJalrXUtEXAMPLE/K7MDENG"`;

const TEMP_CREDENTIALS_SHAPE = `{
  "AccessKeyId": "ASIAEXAMPLE...",
  "SecretAccessKey": "...",
  "SessionToken": "...",
  "Expiration": "2026-09-04T18:30:00Z"
}`;

const QUIZ_QUESTIONS = [
  { q: '¿Qué es un rol IAM?', options: [{ text: 'Una identidad con permisos que puede ser asumida temporalmente por una entidad autorizada.', correct: true }, { text: 'Un usuario con contraseña permanente.', correct: false }, { text: 'Un tipo de bucket S3.', correct: false }, { text: 'Una Región de AWS.', correct: false }] },
  { q: '¿Qué determina quién puede asumir un rol?', options: [{ text: 'Su trust policy (política de confianza).', correct: true }, { text: 'El nombre del rol.', correct: false }, { text: 'La cantidad de EC2 activas.', correct: false }, { text: 'El precio del servicio.', correct: false }] },
  { q: '¿Qué determina qué puede hacer un rol una vez asumido?', options: [{ text: 'Sus políticas de permisos.', correct: true }, { text: 'Su trust policy.', correct: false }, { text: 'El nombre del usuario que lo creó.', correct: false }, { text: 'La cuenta root.', correct: false }] },
  { q: '¿Qué servicio de AWS entrega las credenciales temporales al asumir un rol?', options: [{ text: 'AWS STS (Security Token Service).', correct: true }, { text: 'Amazon S3.', correct: false }, { text: 'Amazon RDS.', correct: false }, { text: 'AWS CloudTrail.', correct: false }] },
  { q: '¿Qué es un Instance Profile?', options: [{ text: 'El mecanismo que permite asociar un rol IAM a una instancia EC2.', correct: true }, { text: 'Un tipo de almacenamiento EBS.', correct: false }, { text: 'Una política de facturación.', correct: false }, { text: 'Un Security Group.', correct: false }] },
  { q: '¿Qué riesgo principal evitan los roles frente a las Access Keys guardadas en código?', options: [{ text: 'Credenciales permanentes que pueden filtrarse y seguir siendo válidas indefinidamente.', correct: true }, { text: 'El costo de EC2.', correct: false }, { text: 'La necesidad de un Security Group.', correct: false }, { text: 'La latencia de red.', correct: false }] },
  { q: '¿Las credenciales temporales de un rol expiran?', options: [{ text: 'Sí.', correct: true }, { text: 'No, duran para siempre como una Access Key.', correct: false }] },
  { q: '¿Un rol con permisos excesivos deja de ser riesgoso solo por ser temporal?', options: [{ text: 'Sí.', correct: false }, { text: 'No — mientras está en uso, puede causar el mismo daño que un permiso permanente.', correct: true }] },
];

export default function Modulo9Clase3() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 9 · Clase 3</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 9 · Clase 3: IAM Roles y credenciales temporales — dar permisos a workloads sin Access Keys</h2>
      <p className="lesson-subtitle">
        Un usuario responde &quot;quién eres siempre&quot;. Un rol responde &quot;en quién te conviertes, por un rato, para hacer exactamente esta tarea&quot;.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + lectura de trust policy + casos + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 9 · Clases 1 y 2</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Diferenciar un usuario IAM de un rol IAM.</li>
            <li>Explicar qué significa &quot;asumir un rol&quot; y qué es una trust policy.</li>
            <li>Comprender el rol de AWS STS en la entrega de credenciales temporales.</li>
            <li>Reconocer qué es un Instance Profile y cómo conecta EC2 con un rol.</li>
            <li>Explicar por qué guardar Access Keys permanentes dentro de código o servidores es una mala práctica.</li>
            <li>Aplicar mínimo privilegio al diseñar los permisos de un rol.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-3. Recordemos dónde quedamos</h3>
          <Flow steps={[{ label: 'Identidad' }, { label: 'Autenticación' }, { label: 'Autorización' }, { label: '¿Y las máquinas?', n: '?' }]} />
          <p>En la Clase 2 aprendimos a escribir políticas precisas para personas: Docente, Desarrollador, Soporte, Auditor. Pero CloudShop también tiene una aplicación corriendo en EC2 que necesita leer fotografías de productos desde S3. Una aplicación no tiene huella digital ni recibe un código MFA en su teléfono.</p>
          <ConceptBadge icon="server">¿Cómo le damos permiso a algo que no es una persona?</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>4-5. La solución tentadora (y mala)</h3>
          <p>Alguien del equipo propone: &quot;creemos un usuario IAM, generemos su Access Key y Secret Access Key, y las pegamos directamente en el código de la aplicación.&quot;</p>
          <pre className="codeblock">{HARDCODED_ANTIPATTERN}</pre>
          <ConceptBadge icon="alert-triangle" variant="danger">Esas credenciales ahora viven para siempre dentro del código — y todo lo que vive para siempre tarde o temprano se filtra.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>6-7. Por qué las Access Keys permanentes son un problema</h3>
          <ul className="plain-list">
            <li>Pueden subirse por accidente a un repositorio público de código.</li>
            <li>Quedan copiadas dentro de imágenes (AMIs) o backups del servidor.</li>
            <li>Nadie recuerda rotarlas — y mientras nadie lo hace, siguen siendo válidas.</li>
            <li>Si el servidor se ve comprometido, esas credenciales siguen funcionando incluso fuera de ese servidor.</li>
          </ul>
          <Nota><p>El problema no es que las Access Keys sean &quot;malas&quot; en sí mismas — es que una credencial permanente, olvidada dentro de un servidor o una aplicación, es una puerta que sigue abierta mucho después de que alguien dejó de vigilarla.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>8-10. Aparece el IAM Role</h3>
          <p>Un <strong>rol IAM</strong> es una identidad de AWS con permisos que, a diferencia de un usuario, no pertenece a nadie de forma permanente: puede ser <strong>asumida temporalmente</strong> por una entidad autorizada — una EC2, otro servicio de AWS, una cuenta distinta, o incluso una persona.</p>
          <Dialogo>Piensa en un gafete de visitante de un edificio de oficinas: no es tuyo, no te lo llevas a casa, y deja de funcionar automáticamente pasadas unas horas. Mientras lo llevas puesto, abre exactamente las puertas para las que fue programado — ni una más.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>11-12. Un rol tiene dos mitades</h3>
          <RoleGrid roles={[
            { icon: 'users', label: 'Trust Policy', desc: '¿Quién puede asumir este rol?' },
            { icon: 'file-text', label: 'Permissions Policy', desc: '¿Qué puede hacer una vez que lo asumió?' },
          ]} />
          <Nota><p>Son dos preguntas independientes. Que EC2 tenga permiso para <em>convertirse</em> en el rol no dice nada todavía sobre qué le permite <em>hacer</em> ese rol — igual que en la Clase 2, donde autenticación y autorización eran preguntas distintas.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>13-15. La trust policy, en JSON</h3>
          <pre className="codeblock">{TRUST_POLICY}</pre>
          <table className="table lesson-summary-table">
            <thead><tr><th>Línea</th><th>Traducción</th></tr></thead>
            <tbody>
              <tr><td className="mono">&quot;Effect&quot;: &quot;Allow&quot;</td><td>Permitir</td></tr>
              <tr><td className="mono">&quot;Principal&quot;: {'{'} &quot;Service&quot;: &quot;ec2.amazonaws.com&quot; {'}'}</td><td>El servicio EC2 es quien puede hacerlo</td></tr>
              <tr><td className="mono">&quot;Action&quot;: &quot;sts:AssumeRole&quot;</td><td>Asumir este rol</td></tr>
            </tbody>
          </table>
          <p>En español: <em>&quot;Se permite que el servicio EC2 asuma este rol.&quot;</em> Nada dice todavía qué podrá hacer una vez adentro — eso vive en otra política, separada.</p>
        </section>

        <section className="lesson-section">
          <h3>16-17. La permissions policy del mismo rol</h3>
          <pre className="codeblock">{PERMISSIONS_POLICY}</pre>
          <p>Esta ya la sabemos leer completa desde la Clase 2: permite obtener (leer) objetos dentro del bucket <code>cloudshop-fotos-productos</code>. Ni crear, ni eliminar, ni tocar ningún otro bucket.</p>
        </section>

        <section className="lesson-section">
          <h3>18-20. ¿Qué significa &quot;asumir&quot; un rol?</h3>
          <p>Cuando una entidad autorizada asume un rol, AWS STS (<strong>Security Token Service</strong>) le entrega credenciales temporales — no la contraseña de nadie, no una Access Key eterna: un paquete de acceso con fecha de vencimiento.</p>
          <pre className="codeblock">{TEMP_CREDENTIALS_SHAPE}</pre>
          <Nota><p>No necesitamos memorizar cada campo. Lo importante es <code>Expiration</code>: esas credenciales dejan de funcionar solas, sin que nadie tenga que acordarse de revocarlas.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>21-22. EC2 no “asume” el rol a mano: aparece el Instance Profile</h3>
          <p>En la práctica, no hace falta que la aplicación llame manualmente a STS. Cuando asociamos un rol a una instancia EC2 mediante un <strong>Instance Profile</strong>, AWS se encarga de entregar y renovar esas credenciales temporales automáticamente durante toda la vida de la instancia.</p>
          <Flow steps={[{ icon: 'server', label: 'EC2' }, { icon: 'users', label: 'Instance Profile' }, { icon: 'file-text', label: 'Rol + Permisos' }, { icon: 'package', label: 'S3' }]} />
          <ConceptBadge icon="check-circle">Ningún Access Key escrito en ningún lado. La instancia simplemente ya tiene permiso.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>23-24. No solo EC2: otros usos comunes de los roles</h3>
          <RoleGrid roles={[
            { icon: 'server', label: 'Servicio → Servicio', desc: 'Una función Lambda que necesita leer de DynamoDB' },
            { icon: 'building', label: 'Entre cuentas', desc: 'Una cuenta de AWS que necesita acceso limitado a otra' },
            { icon: 'user', label: 'Persona → Función temporal', desc: 'Un Auditor que asume un rol de solo lectura durante una revisión' },
          ]} />
          <p>En todos los casos, la lógica es la misma: trust policy (¿quién puede asumirlo?) + permissions policy (¿qué puede hacer?) + credenciales que vencen solas.</p>
        </section>

        <section className="lesson-section">
          <h3>25-26. Temporal no es sinónimo de inofensivo</h3>
          <Dialogo>&quot;Si de todos modos vence en un rato, ¿qué problema hay en darle Action: &apos;*&apos; y Resource: &apos;*&apos; a un rol?&quot;</Dialogo>
          <ConceptBadge icon="alert-triangle" variant="danger">Mientras esas credenciales están activas, pueden causar exactamente el mismo daño que un permiso permanente.</ConceptBadge>
          <Nota><p>Mínimo privilegio no se suspende porque el acceso sea temporal — se aplica igual: el rol de EC2 para leer fotos no necesita permiso para eliminar bases de datos, dure el acceso una hora o un año.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>27-28. Volvamos a CloudShop</h3>
          <p>La aplicación de CloudShop en EC2 necesita leer fotografías de productos desde S3. No necesita eliminar fotografías, crear buckets, administrar servidores ni acceder a facturación.</p>
          <QaItem question="¿Creamos un usuario IAM con Access Key para esta aplicación?" answer="No — eso reintroduce el problema de credenciales permanentes que vimos al inicio de la clase." />
          <QaItem question="¿Qué diseñamos en su lugar?" answer="Un rol IAM con trust policy hacia el servicio EC2, permissions policy de solo lectura sobre ese bucket específico, asociado a la instancia mediante un Instance Profile." />
        </section>

        <section className="lesson-section">
          <h3>29-30. RETO DE LA CLASE</h3>
          <Nota><p>Un compañero de CloudShop propone: &quot;para que la aplicación de reportes pueda escribir logs en un bucket S3 y leer configuración desde otro, vamos a crear un usuario IAM llamado <code>app-reportes</code>, generarle una Access Key, y pegarla como variable de entorno en el servidor.&quot; Rediseña la solución aplicando lo aprendido.</p></Nota>
          <Reveal label="Ver la solución esperada">
            <p>Crear un rol IAM (por ejemplo, <code>RolAppReportes</code>) con trust policy que permita a EC2 asumirlo, y una permissions policy con Allow para escribir (<code>PutObject</code>) en el bucket de logs y leer (<code>GetObject</code>) en el bucket de configuración — sin comodines de más. Asociar ese rol a la instancia mediante un Instance Profile, en vez de generar ninguna Access Key. El servidor recibe credenciales temporales automáticamente, sin que nadie tenga que copiar ni rotar nada a mano.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>31-32. Retos nivel 2 y 3</h3>
          <QaItem question="Un rol tiene trust policy que permite a EC2 asumirlo, pero su permissions policy está vacía (sin ningún Allow). ¿Qué puede hacer una instancia que lo asume?" answer="Prácticamente nada — puede asumir el rol (la confianza existe), pero sin políticas de permisos queda todo denegado implícitamente, como vimos en la Clase 2." />
          <QaItem question="Alguien dice: 'las credenciales temporales son tan seguras que ya no necesitamos preocuparnos de mínimo privilegio en los roles.' ¿Estás de acuerdo?" answer="No. La expiración reduce la ventana de riesgo, pero no reemplaza limitar qué puede hacerse durante esa ventana." />
        </section>

        <section className="lesson-section">
          <h3>33-34. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El desarrollador propone: &quot;guardemos la Access Key cifrada dentro del repositorio, así ya no es un problema de seguridad.&quot; No estoy de acuerdo porque cifrar una credencial permanente no la vuelve temporal, y si el mecanismo de descifrado también vive en el repositorio, el atacante que llega hasta ahí igual la obtiene. Esto es lo que haría en su lugar: eliminar la necesidad de esa credencial usando un rol IAM con Instance Profile. El riesgo de su enfoque es asumir que &quot;cifrado&quot; resuelve un problema que en realidad es &quot;esta credencial no debería existir de forma permanente&quot;.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: &quot;démosle al rol de la aplicación AdministratorAccess, así no tenemos que volver a tocarlo si algún día necesita algo más.&quot; No estoy de acuerdo porque repite exactamente el error de mínimo privilegio que corregimos en la Clase 2, ahora aplicado a una máquina en vez de a una persona. Esto es lo que haría en su lugar: otorgar solo las acciones y recursos que la aplicación necesita hoy, y ampliar la política cuando (y si) surge una necesidad real. El riesgo de su enfoque es que un error de la propia aplicación, o una vulnerabilidad explotada en ella, herede el mismo alcance que un administrador de la cuenta.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>35. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'Un rol IAM puede ser asumido por una persona, un servicio de AWS, o incluso otra cuenta.', correct: true },
            { text: 'La trust policy de un rol define qué acciones puede realizar.', correct: false },
            { text: 'AWS STS entrega credenciales temporales al asumir un rol.', correct: true },
            { text: 'Un Instance Profile conecta un rol IAM con una instancia EC2.', correct: true },
            { text: 'Las credenciales temporales de un rol nunca expiran.', correct: false },
            { text: 'Un rol temporal con permisos excesivos no representa ningún riesgo real.', correct: false },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>36. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>37. Reto oral</h3>
          <Dialogo>Explícame qué es un IAM Role sin usar las palabras rol, IAM, credenciales, permiso, temporal ni AWS.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>&quot;Es una función que algo o alguien puede ponerse por un rato, autorizada de antemano, que le deja hacer únicamente ciertas tareas mientras la lleva puesta — y que deja de servir sola, sin que nadie tenga que quitársela.&quot;</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>38. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Rol IAM</td><td>Identidad que puede asumirse temporalmente</td></tr>
              <tr><td>Trust Policy</td><td>¿Quién puede asumir el rol?</td></tr>
              <tr><td>Permissions Policy</td><td>¿Qué puede hacer una vez asumido?</td></tr>
              <tr><td>AssumeRole</td><td>La acción de convertirse temporalmente en el rol</td></tr>
              <tr><td>AWS STS</td><td>Servicio que entrega credenciales temporales</td></tr>
              <tr><td>Credenciales temporales</td><td>Acceso con fecha de vencimiento</td></tr>
              <tr><td>Instance Profile</td><td>Conecta un rol IAM con una instancia EC2</td></tr>
              <tr><td>Access Key permanente en código</td><td>Antipatrón — evitar cuando existe alternativa con rol</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>39. Ticket de salida</h3>
          <Dialogo>Un compañero te muestra el código de una aplicación EC2 con una Access Key escrita directamente adentro y dice: &quot;funciona, ¿cuál es el problema?&quot; ¿Qué le responderías?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Que funcionar no es lo mismo que ser seguro: esa credencial es permanente, puede filtrarse (por ejemplo, si el código llega a un repositorio o una imagen compartida) y seguiría siendo válida hasta que alguien la revoque manualmente. La alternativa preferible es un rol IAM asociado a la instancia mediante un Instance Profile, con exactamente los permisos necesarios y credenciales que expiran solas.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 4</div>
          <p>Ya resolvimos quién entra, qué puede hacer cada identidad, y cómo dar acceso a máquinas sin credenciales permanentes. Pero todavía no hablamos de los datos en sí: ¿qué pasa si alguien logra ver directamente lo que está guardado en un disco o en un bucket, sin pasar por ninguna de estas puertas?</p>
          <ConceptBadge icon="lock">Módulo 9 · Clase 4 — Cifrado y AWS KMS: proteger datos en reposo y comprender claves</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-9/clase-4" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 4: Cifrado y AWS KMS →
          </Link>
        </div>

      </div>
    </div>
  );
}
