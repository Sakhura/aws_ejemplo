import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const HARDCODED_DB_PASSWORD = `# Dentro del código de la aplicación (mala práctica)
DB_HOST = "cloudshop-db.rds.amazonaws.com"
DB_USER = "admin"
DB_PASSWORD = "Sup3rSecreta2024!"`;

const SECRET_ACCESS_POLICY = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "secretsmanager:GetSecretValue",
      "Resource": "arn:aws:secretsmanager:eu-oeste-1:111122223333:secret:cloudshop/db-password"
    }
  ]
}`;

const QUIZ_QUESTIONS = [
  { q: '¿Qué es un secreto, en el sentido de Secrets Manager?', options: [{ text: 'Una contraseña, token o credencial que una aplicación necesita para funcionar.', correct: true }, { text: 'Un tipo de instancia EC2.', correct: false }, { text: 'Un bucket privado.', correct: false }, { text: 'Un rol IAM.', correct: false }] },
  { q: '¿Qué problema principal resuelve AWS Secrets Manager?', options: [{ text: 'Evitar guardar contraseñas y tokens escritos directamente en el código o en archivos de configuración.', correct: true }, { text: 'Acelerar el tráfico de red.', correct: false }, { text: 'Reemplazar completamente a IAM.', correct: false }, { text: 'Monitorear el uso de CPU.', correct: false }] },
  { q: '¿Cómo obtiene una aplicación el valor de un secreto, siguiendo buenas prácticas?', options: [{ text: 'Con un rol IAM que tiene permiso para llamar a Secrets Manager en el momento en que lo necesita.', correct: true }, { text: 'Copiándolo una sola vez dentro del código fuente.', correct: false }, { text: 'Pidiéndolo por chat al equipo de seguridad.', correct: false }, { text: 'Usando la cuenta root.', correct: false }] },
  { q: '¿Con qué servicio visto en la clase anterior se relaciona Secrets Manager para proteger los secretos almacenados?', options: [{ text: 'AWS KMS.', correct: true }, { text: 'Amazon CloudWatch.', correct: false }, { text: 'Elastic Load Balancing.', correct: false }, { text: 'Amazon VPC.', correct: false }] },
  { q: '¿Qué ventaja ofrece la rotación automática de secretos?', options: [{ text: 'Renovar contraseñas periódicamente sin depender de que alguien lo recuerde hacer a mano.', correct: true }, { text: 'Elimina la necesidad de IAM.', correct: false }, { text: 'Hace pública la contraseña para más comodidad.', correct: false }, { text: 'Aumenta la velocidad de la base de datos.', correct: false }] },
  { q: '¿Qué controla quién puede leer el valor de un secreto?', options: [{ text: 'Una IAM Policy sobre el ARN de ese secreto.', correct: true }, { text: 'El tamaño del secreto.', correct: false }, { text: 'La Región donde vive la aplicación.', correct: false }, { text: 'Nada — cualquier usuario autenticado puede leerlo.', correct: false }] },
  { q: '¿Guardar una contraseña de base de datos en el código fuente es una buena práctica si el repositorio es privado?', options: [{ text: 'Sí, si nadie más tiene acceso nunca.', correct: false }, { text: 'No — sigue siendo una credencial permanente expuesta a filtraciones, historial de commits y accesos futuros no anticipados.', correct: true }] },
];

export default function Modulo9Clase5() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 9 · Clase 5</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 9 · Clase 5: AWS Secrets Manager — proteger contraseñas, tokens y secretos</h2>
      <p className="lesson-subtitle">
        Cada credencial que alguien escribe &quot;solo por ahora&quot; dentro de un archivo tiende a quedarse ahí mucho más tiempo del planeado.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + casos + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 9 · Clases 1 a 4</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es un secreto y por qué merece un tratamiento distinto al resto de la configuración.</li>
            <li>Explicar qué es AWS Secrets Manager y qué problema resuelve.</li>
            <li>Comprender cómo una aplicación obtiene un secreto usando un rol IAM en vez de hardcodearlo.</li>
            <li>Reconocer la relación entre Secrets Manager y AWS KMS.</li>
            <li>Comprender qué es la rotación automática de secretos y por qué importa.</li>
            <li>Aplicar mínimo privilegio a los permisos sobre un secreto.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-3. Recordemos dónde quedamos</h3>
          <Flow steps={[{ label: 'IAM' }, { label: 'Roles' }, { label: 'KMS' }, { label: '¿Y las contraseñas?', n: '?' }]} />
          <p>La aplicación de CloudShop en EC2 ya tiene un rol IAM (Clase 3) y sus datos ya están cifrados con KMS (Clase 4). Pero esa aplicación necesita conectarse a la base de datos RDS, y para eso necesita algo muy concreto: <strong>la contraseña de esa base de datos</strong>.</p>
          <ConceptBadge icon="alert-triangle">¿Dónde guardamos esa contraseña para que la aplicación pueda usarla?</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>4-5. La tentación de siempre</h3>
          <p>Alguien propone, otra vez, la misma solución rápida que ya rechazamos con las Access Keys en la Clase 3:</p>
          <pre className="codeblock">{HARDCODED_DB_PASSWORD}</pre>
          <ConceptBadge icon="alert-triangle" variant="danger">Misma historia, personaje distinto: una credencial permanente, ahora escrita directamente en el código.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>6-8. ¿Qué es un secreto?</h3>
          <p>Un <strong>secreto</strong> es cualquier credencial que una aplicación necesita para funcionar y que no debería quedar expuesta: una contraseña de base de datos, un token de una API externa, una clave de un servicio de terceros.</p>
          <RoleGrid roles={[
            { icon: 'database', label: 'Contraseña de RDS', desc: 'Para que la aplicación se conecte a la base' },
            { icon: 'link', label: 'Token de API externa', desc: 'Para conectarse a un servicio de pagos, envíos, etc.' },
            { icon: 'key', label: 'Credencial de terceros', desc: 'Cualquier clave que no sea nuestra pero que necesitemos usar' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>9-11. Aparece AWS Secrets Manager</h3>
          <p><strong>AWS Secrets Manager</strong> es el servicio de AWS diseñado específicamente para almacenar, recuperar y administrar secretos, sin que ninguna aplicación necesite tenerlos escritos en su código.</p>
          <Flow steps={[{ icon: 'server', label: 'Aplicación EC2' }, { icon: 'key', label: 'Secrets Manager', caption: 'Solicita el secreto en tiempo real' }, { icon: 'database', label: 'RDS' }]} />
          <Dialogo>Es como no tener que memorizar la combinación de la caja fuerte de la oficina: alguien autorizado la pide en el momento en que la necesita, y el sistema se la entrega — nadie la lleva anotada en un papel pegado al monitor.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>12-13. ¿Cómo obtiene la aplicación el secreto, en la práctica?</h3>
          <p>La aplicación usa su rol IAM (el mismo tipo que construimos en la Clase 3) para pedirle a Secrets Manager el valor del secreto en el momento en que lo necesita — típicamente al iniciar, o cuando abre la conexión a la base.</p>
          <pre className="codeblock">{SECRET_ACCESS_POLICY}</pre>
          <p>En español: <em>&quot;Permitir obtener el valor de este secreto específico de CloudShop.&quot;</em> Nada de contraseñas escritas en ningún archivo — solo un permiso IAM sobre un secreto concreto, exactamente como leímos políticas desde la Clase 2.</p>
        </section>

        <section className="lesson-section">
          <h3>14-15. ¿Y esto no es lo mismo que KMS?</h3>
          <p>Están relacionados, pero resuelven cosas distintas. KMS (Clase 4) protege claves de cifrado y, en general, datos en reposo. Secrets Manager está diseñado específicamente para el ciclo de vida de credenciales: guardarlas, entregarlas bajo demanda a quien tiene permiso, y rotarlas. De hecho, por debajo, Secrets Manager usa KMS para cifrar los secretos que almacena.</p>
          <ConceptBadge icon="lock">Secrets Manager es el mostrador especializado; KMS es la caja fuerte que hay detrás.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>16-18. Rotación automática: el problema de las contraseñas que nadie cambia</h3>
          <p>Una de las razones por las que las credenciales hardcodeadas envejecen mal es que nadie quiere tocarlas: cambiar una contraseña significa actualizarla en todos los lugares donde está escrita, y eso da miedo. Secrets Manager puede rotar automáticamente ciertas credenciales (por ejemplo, la contraseña de una base RDS) según un calendario, actualizando el secreto sin que la aplicación deje de funcionar.</p>
          <Nota><p>Para nuestro nivel, basta con entender la idea: una contraseña que se renueva sola, en vez de vivir sin cambios durante años porque &quot;dejarla como está es más simple&quot;.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>19-20. Mínimo privilegio, otra vez, aplicado a secretos</h3>
          <QaItem question="¿Todos los roles de CloudShop deberían poder leer el secreto de la contraseña de RDS?" answer="No. Solo el rol de la aplicación que realmente necesita conectarse a esa base debería tener secretsmanager:GetSecretValue sobre ese secreto específico." />
          <p>Exactamente la misma lógica que aplicamos a políticas (Clase 2), roles (Clase 3) y claves de KMS (Clase 4): cada identidad recibe acceso solo a los secretos que su función realmente exige.</p>
        </section>

        <section className="lesson-section">
          <h3>21-22. Volvamos a CloudShop</h3>
          <p>Rediseñemos el acceso de la aplicación a la base de datos:</p>
          <Flow steps={[{ icon: 'server', label: 'App EC2' }, { icon: 'users', label: 'Rol IAM' }, { icon: 'key', label: 'Secrets Manager', caption: 'cloudshop/db-password' }, { icon: 'database', label: 'RDS' }]} />
          <Nota><p>Ninguna contraseña vive en el código, en un archivo de configuración ni en un mensaje de chat. Vive en un solo lugar administrado, y solo quien tiene permiso IAM explícito puede pedirla.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>23-24. RETO DE LA CLASE</h3>
          <Nota><p>CloudShop va a integrar un servicio externo de envío de paquetes, que exige una API Key para autenticar cada solicitud. Un desarrollador propone pegar esa API Key directamente en una variable dentro del código de la aplicación &quot;porque es más rápido para probarlo hoy&quot;. Rediseña la solución.</p></Nota>
          <Reveal label="Ver la solución esperada">
            <p>Guardar la API Key como un secreto en AWS Secrets Manager (por ejemplo, <code>cloudshop/envios-api-key</code>). Otorgar al rol IAM de la aplicación de envíos permiso de <code>secretsmanager:GetSecretValue</code> únicamente sobre ese secreto. La aplicación la solicita en tiempo de ejecución, y si el equipo de envíos rota la clave más adelante, se actualiza en un solo lugar sin tocar el código.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>25-26. Retos nivel 2 y 3</h3>
          <QaItem question="Un rol tiene permiso de secretsmanager:GetSecretValue sobre * (todos los secretos de la cuenta). ¿Qué principio está incumpliendo?" answer="Mínimo privilegio — el mismo problema que vimos con Action: '*' en políticas IAM y con permisos excesivos sobre claves de KMS." />
          <QaItem question="La contraseña de RDS se rotó automáticamente anoche, pero un compañero la tenía copiada en un archivo de texto en su computadora desde hace un mes. ¿Ese archivo sigue siendo útil?" answer="No — quedó desactualizado en cuanto ocurrió la rotación, lo cual es justamente una de las ventajas de no depender de copias sueltas de una credencial." />
        </section>

        <section className="lesson-section">
          <h3>27-28. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El desarrollador propone: &quot;guardemos todas las contraseñas en un archivo de texto dentro del servidor, así el equipo las encuentra fácil cuando las necesita.&quot; No estoy de acuerdo porque ese archivo se convierte en un único punto de fuga: cualquiera con acceso al servidor, o una copia de ese archivo, obtiene todas las credenciales de golpe. Esto es lo que haría en su lugar: usar Secrets Manager con permisos IAM específicos por secreto. El riesgo de su enfoque es concentrar todas las credenciales de la organización en un solo archivo sin ningún control de acceso granular.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: &quot;ya que activamos rotación automática, no hace falta seguir controlando quién puede leer el secreto.&quot; No estoy de acuerdo porque la rotación resuelve un problema (contraseñas que envejecen sin cambiar) completamente distinto al de quién tiene permiso para leerlas. Esto es lo que haría en su lugar: mantener ambos controles activos — rotación y permisos mínimos sobre cada secreto. El riesgo de su enfoque es asumir que una buena práctica reemplaza a la otra, cuando en realidad se complementan.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>29. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'Un secreto puede ser una contraseña, un token o una credencial de terceros.', correct: true },
            { text: 'Secrets Manager guarda los secretos sin ninguna relación con AWS KMS.', correct: false },
            { text: 'Una aplicación puede obtener un secreto usando su rol IAM, sin tenerlo escrito en el código.', correct: true },
            { text: 'La rotación automática puede renovar una contraseña de base de datos sin intervención manual.', correct: true },
            { text: 'Todos los roles de una cuenta deberían poder leer todos los secretos, por si acaso.', correct: false },
            { text: 'Guardar una contraseña en un archivo de texto dentro del servidor es equivalente en seguridad a usar Secrets Manager.', correct: false },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>30. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>31. Reto oral</h3>
          <Dialogo>Explícame qué es AWS Secrets Manager sin usar las palabras secreto, contraseña, credencial, AWS ni rotación.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>&quot;Es el lugar donde vive, bien resguardado, lo que una aplicación necesita para autenticarse ante otro sistema — y que se le entrega solo a quien está autorizado a pedirlo, en el momento en que lo pide.&quot;</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>32. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Secreto</td><td>Contraseña, token o credencial que una app necesita</td></tr>
              <tr><td>AWS Secrets Manager</td><td>Servicio que almacena y entrega secretos bajo demanda</td></tr>
              <tr><td>GetSecretValue</td><td>Acción IAM para leer el valor de un secreto</td></tr>
              <tr><td>Relación con KMS</td><td>Secrets Manager cifra los secretos usando KMS</td></tr>
              <tr><td>Rotación automática</td><td>Renovar credenciales periódicamente sin intervención manual</td></tr>
              <tr><td>Credencial hardcodeada</td><td>Antipatrón — evitar cuando existe alternativa con Secrets Manager</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>33. Ticket de salida</h3>
          <Dialogo>Un compañero te dice: &quot;solo voy a dejar la contraseña de la base en el código por esta semana, mientras terminamos la demo, después la saco.&quot; ¿Qué le responderías?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Que ese &quot;por esta semana&quot; suele convertirse en meses, y que el código con la contraseña puede quedar en el historial de versiones incluso después de eliminarla. Es preferible invertir ese mismo tiempo en configurar el secreto en Secrets Manager desde el inicio, con permisos IAM específicos para el rol de la aplicación.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 6</div>
          <p>Ya protegimos el acceso, los datos y los secretos de CloudShop. Pero queda una pregunta que ninguna de las clases anteriores respondió todavía: si algo sale mal — un recurso eliminado, un permiso cambiado, un acceso inesperado — ¿cómo sabemos quién lo hizo, y cuándo?</p>
          <ConceptBadge icon="file-text">Módulo 9 · Clase 6 — AWS CloudTrail: saber quién hizo qué y cuándo</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-9/clase-6" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 6: AWS CloudTrail →
          </Link>
        </div>

      </div>
    </div>
  );
}
