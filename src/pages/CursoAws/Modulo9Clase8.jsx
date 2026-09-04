import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, Flow, InfoBox, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué responde la identidad?', options: [{ text: '¿Quién eres?', correct: true }, { text: '¿Qué puedes hacer?', correct: false }, { text: '¿Está cifrado?', correct: false }, { text: '¿Quién lo hizo?', correct: false }] },
  { q: '¿Qué principio busca entregar solo los permisos necesarios?', options: [{ text: 'Mínimo privilegio.', correct: true }, { text: 'Máxima disponibilidad.', correct: false }, { text: 'Elasticidad.', correct: false }, { text: 'Redundancia.', correct: false }] },
  { q: '¿Qué permite a una EC2 acceder a otros servicios sin Access Keys permanentes?', options: [{ text: 'Un rol IAM con Instance Profile.', correct: true }, { text: 'La cuenta root.', correct: false }, { text: 'Un Security Group.', correct: false }, { text: 'Un snapshot.', correct: false }] },
  { q: '¿Qué servicio protege datos en reposo mediante claves?', options: [{ text: 'AWS KMS.', correct: true }, { text: 'Amazon CloudWatch.', correct: false }, { text: 'AWS Auto Scaling.', correct: false }, { text: 'Amazon Route 53.', correct: false }] },
  { q: '¿Dónde debería vivir la contraseña de una base de datos que usa una aplicación?', options: [{ text: 'AWS Secrets Manager.', correct: true }, { text: 'Escrita en el código fuente.', correct: false }, { text: 'En un chat del equipo.', correct: false }, { text: 'En un comentario del repositorio.', correct: false }] },
  { q: '¿Qué servicio permite saber quién eliminó un recurso y cuándo?', options: [{ text: 'AWS CloudTrail.', correct: true }, { text: 'Amazon GuardDuty.', correct: false }, { text: 'AWS Secrets Manager.', correct: false }, { text: 'Amazon S3.', correct: false }] },
  { q: '¿Qué servicio detecta automáticamente actividad potencialmente sospechosa?', options: [{ text: 'Amazon GuardDuty.', correct: true }, { text: 'AWS KMS.', correct: false }, { text: 'Amazon RDS.', correct: false }, { text: 'AWS CloudTrail únicamente.', correct: false }] },
  { q: '¿Qué centraliza hallazgos de varios servicios de seguridad?', options: [{ text: 'AWS Security Hub.', correct: true }, { text: 'Amazon VPC.', correct: false }, { text: 'AWS Auto Scaling.', correct: false }, { text: 'Elastic Load Balancing.', correct: false }] },
  { q: '¿Autenticarse exitosamente garantiza permiso para hacer cualquier cosa?', options: [{ text: 'Sí.', correct: false }, { text: 'No, autorización es una pregunta distinta.', correct: true }] },
  { q: '¿La cuenta root debería usarse para el trabajo diario del equipo?', options: [{ text: 'Sí, siempre que tenga MFA.', correct: false }, { text: 'No, se reserva para tareas que la requieren explícitamente.', correct: true }] },
];

export default function Modulo9Clase8() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 9 · Clase 8</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 9 · Clase 8: Laboratorio integrador, diseñar y auditar CloudShop segura</h2>
      <p className="lesson-subtitle">
        Seguridad no es un servicio que se activa una vez. Es una auditoría que se repite, hallazgo por hallazgo, hasta que ya no quedan puertas abiertas por descuido.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">60 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Laboratorio + auditoría de hallazgos + diseño + evaluación final</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 9 · Clases 1 a 7</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Auditar una arquitectura completa aplicando identidad, autenticación, autorización y mínimo privilegio.</li>
            <li>Detectar el uso de Access Keys o secretos hardcodeados y proponer la alternativa correcta con roles y Secrets Manager.</li>
            <li>Reconocer datos sin cifrado y aplicar KMS donde corresponde.</li>
            <li>Usar CloudTrail para reconstruir quién hizo qué, y GuardDuty/Security Hub para investigar actividad sospechosa.</li>
            <li>Priorizar hallazgos de seguridad por severidad e impacto, en vez de atenderlos en orden aleatorio.</li>
            <li>Diseñar la arquitectura de seguridad completa de CloudShop y justificar cada decisión.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2. La misión</h3>
          <Nota><p>Hoy el estudiante se convierte en Auditor de Seguridad de CloudShop. No recibirá &quot;revisa el usuario X&quot; — recibirá acceso completo a la cuenta y una única instrucción: encontrar todo lo que esté mal, explicar por qué es un problema, y proponer la corrección exacta usando lo aprendido en las siete clases anteriores.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>3-4. Arquitectura bajo auditoría</h3>
          <Flow steps={[
            { icon: 'globe', label: 'Usuarios' }, { icon: 'settings', label: 'ALB' }, { icon: 'server', label: 'EC2' },
            { icon: 'database', label: 'RDS' }, { icon: 'package', label: 'S3' }, { icon: 'users', label: 'Equipo IAM' },
          ]} />
          <InfoBox title="Herramientas disponibles" items={['IAM — Usuarios, Grupos, Roles, Políticas', 'AWS KMS', 'AWS Secrets Manager', 'AWS CloudTrail', 'Amazon GuardDuty', 'AWS Security Hub']} />
          <p>Debe decidir en qué orden revisarlas, y qué evidencia respalda cada hallazgo.</p>
        </section>

        <section className="lesson-section">
          <h3>5-6. Hallazgo 1: el usuario que puede con todo</h3>
          <InfoBox title="IAM → Usuarios" items={['Docente — AdministratorAccess', 'Desarrollador — AdministratorAccess', 'Soporte — AdministratorAccess', 'Auditor — AdministratorAccess']} />
          <QaItem question="¿Qué está mal?" answer="Los cuatro roles tienen el mismo nivel de permiso total, sin importar lo que realmente necesita cada función — el mismo problema planteado desde el Overview del módulo." />
          <Reveal label="Ver la corrección esperada">
            <p>Diseñar una política específica por función: Docente con lectura sobre contenido educativo, Desarrollador con permisos de gestión sobre el entorno de desarrollo, Soporte con lectura para diagnóstico, Auditor con solo lectura sobre toda la cuenta. Ninguno necesita, para su trabajo diario, permisos de facturación o de administración total (Clases 1 y 2).</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>7-8. Hallazgo 2: actividad de root sin explicación</h3>
          <p>Revisando CloudTrail, el estudiante encuentra este evento:</p>
          <pre className="codeblock">{`{
  "eventTime": "2026-08-30T02:47:10Z",
  "eventName": "ConsoleLogin",
  "userIdentity": { "type": "Root" },
  "sourceIPAddress": "203.0.113.44",
  "additionalEventData": { "MFAUsed": "No" }
}`}</pre>
          <QaItem question="¿Qué dos cosas deberían encender alarmas aquí?" answer="Que la cuenta root inició sesión (Clase 1: root no debería usarse a diario) y que lo hizo sin MFA (Clase 1: MFA en root debería estar activo desde el primer día)." />
          <Reveal label="Ver la corrección esperada">
            <p>Investigar de inmediato quién tuvo acceso a las credenciales de root en ese momento, confirmar que MFA esté activo en root, rotar la contraseña de root, y reforzar que el trabajo diario se realice exclusivamente con usuarios y roles IAM.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>9-10. Hallazgo 3: la Access Key que no debería existir</h3>
          <pre className="codeblock">{`# Dentro del código de la aplicación de reportes
AWS_ACCESS_KEY_ID = "AKIAEXAMPLE9876"
AWS_SECRET_ACCESS_KEY = "9x7Kdl...EXAMPLE"`}</pre>
          <QaItem question="¿Cuál es el problema, y cuál es la corrección?" answer="Una credencial permanente escrita en el código (Clase 3). La corrección: crear un rol IAM con trust policy hacia EC2 y permissions policy de mínimo privilegio, asociarlo mediante Instance Profile, y eliminar la Access Key del código y revocarla." />
        </section>

        <section className="lesson-section">
          <h3>11-12. Hallazgo 4: datos sensibles sin cifrar</h3>
          <InfoBox title="Amazon S3 → cloudshop-comprobantes" items={['Default encryption: None', 'Contenido: comprobantes de pago de clientes']} />
          <QaItem question="¿Qué falta, y qué riesgo específico cubre?" answer="Cifrado con AWS KMS (Clase 4). Sin él, si alguien obtiene una copia de esos objetos por fuera de los controles normales de S3 (por ejemplo, un backup mal compartido), el contenido queda legible sin ninguna barrera adicional." />
          <Reveal label="Ver la corrección esperada">
            <p>Activar cifrado con una customer managed key de KMS, con una key policy que solo otorgue kms:Decrypt al rol de Facturación — exactamente el diseño trabajado en el reto de la Clase 4.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>13-14. Hallazgo 5: la contraseña que nadie debería poder leer así</h3>
          <pre className="codeblock">{`# archivo config.env, versionado en el repositorio
DB_PASSWORD=Sup3rSecreta2024!`}</pre>
          <QaItem question="¿Qué corrección aplica, conectando con la Clase 5?" answer="Mover esa contraseña a AWS Secrets Manager, otorgar secretsmanager:GetSecretValue únicamente al rol de la aplicación que la necesita, eliminarla del repositorio, y rotarla — porque una vez que una credencial quedó expuesta en el historial de versiones, hay que asumir que pudo haber sido vista." />
        </section>

        <section className="lesson-section">
          <h3>15-17. Hallazgo 6: GuardDuty tiene algo que decir</h3>
          <pre className="codeblock">{`{
  "severity": 8.9,
  "type": "CryptoCurrency:EC2/BitcoinTool.B!DNS",
  "resource": { "instanceId": "i-0reportes456" },
  "createdAt": "2026-08-30T03:10:44Z"
}`}</pre>
          <QaItem question="¿A qué hora ocurrió esto, comparado con el login de root sin MFA del Hallazgo 2?" answer="23 minutos después (02:47 → 03:10) — muy cerca en el tiempo, lo cual es una pista fuerte para investigar si ambos eventos están relacionados." />
          <Nota><p>Esto es correlación de evidencia, el mismo tipo de razonamiento que ya practicamos con métricas y logs en el Módulo 8: un solo evento aislado dice poco, pero dos eventos relacionados y cercanos en el tiempo cuentan una historia mucho más convincente.</p></Nota>
          <Reveal label="Ver la investigación esperada">
            <p>Revisar en CloudTrail qué acciones se realizaron con la sesión de root entre las 02:47 y las 03:10: si se modificaron roles, se crearon Access Keys, o se lanzaron instancias. Si se confirma actividad no autorizada, aislar la instancia i-0reportes456, revocar credenciales comprometidas, rotar la contraseña de root y los secretos accesibles desde esa sesión, y documentar el incidente completo en Security Hub.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>18-19. Matriz de auditoría</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Señal encontrada</th><th>Clase relacionada</th><th>Corrección</th></tr></thead>
            <tbody>
              <tr><td>AdministratorAccess para todos</td><td>Clases 1 y 2</td><td>Políticas específicas por función</td></tr>
              <tr><td>Root sin MFA, con actividad</td><td>Clase 1</td><td>Activar MFA, rotar credencial, dejar de usar root a diario</td></tr>
              <tr><td>Access Key en código</td><td>Clase 3</td><td>Rol IAM + Instance Profile</td></tr>
              <tr><td>Bucket sin cifrar</td><td>Clase 4</td><td>KMS + key policy de mínimo privilegio</td></tr>
              <tr><td>Contraseña en repositorio</td><td>Clase 5</td><td>Secrets Manager + rotación</td></tr>
              <tr><td>Finding de GuardDuty sin investigar</td><td>Clases 6 y 7</td><td>Correlacionar con CloudTrail y responder</td></tr>
            </tbody>
          </table>
          <Nota><p>Ningún hallazgo se corrige aislado del resto: la Access Key hardcodeada, la contraseña expuesta y el login de root sin MFA bien podrían ser parte del mismo incidente, no seis problemas independientes.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>20-21. Priorizar, no solo listar</h3>
          <p>El estudiante tiene los seis hallazgos. Antes de corregir, debe ordenarlos por urgencia.</p>
          <QaItem question="¿Cuál atenderías primero: el bucket sin cifrar, o el posible compromiso activo sugerido por GuardDuty + root sin MFA?" answer="El posible compromiso activo — podría estar ocurriendo daño en este momento. El bucket sin cifrar es un riesgo real, pero no indica una intrusión en curso." />
          <p>Esta es la misma lógica de priorización que ya practicamos en la Clase 7: severidad e impacto inmediato antes que mejoras estructurales, aunque ambas terminen atendiéndose.</p>
        </section>

        <section className="lesson-section">
          <h3>22-24. Evaluación práctica por equipos</h3>
          <InfoBox title="Cada equipo recibe un hallazgo distinto para presentar" items={[
            'Equipo A: permisos excesivos (IAM)',
            'Equipo B: uso indebido de root (CloudTrail)',
            'Equipo C: credenciales hardcodeadas (Roles/Secrets Manager)',
            'Equipo D: datos sin cifrar (KMS)',
            'Equipo E: finding de GuardDuty sin investigar',
          ]} />
          <p>Cada equipo debe presentar: qué encontró, qué evidencia lo respalda, qué principio de las Clases 1 a 7 se está incumpliendo, y la corrección exacta — con la misma disciplina de &quot;evidencia antes que afirmación&quot; que usamos en el Módulo 8.</p>
        </section>

        <section className="lesson-section">
          <h3>25. Rúbrica</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Nivel</th><th>Evidencia</th></tr></thead>
            <tbody>
              <tr><td>Sobresaliente</td><td>Correlaciona hallazgos entre sí, distingue urgencia de importancia, y propone corrección precisa citando el principio de seguridad correspondiente</td></tr>
              <tr><td>Logrado</td><td>Identifica correctamente el hallazgo y propone una corrección razonable</td></tr>
              <tr><td>En proceso</td><td>Identifica el síntoma pero no conecta con el principio de seguridad correspondiente</td></tr>
              <tr><td>Inicial</td><td>Propone corregir sin evidencia clara de qué está mal</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>26-27. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El gerente propone: &quot;corrijamos solo el hallazgo más grave y dejemos los demás para después, ya resolvimos lo importante.&quot; No estoy de acuerdo porque un atacante no necesita el hallazgo más grave para causar daño — a veces basta con el más ignorado. Esto es lo que haría en su lugar: priorizar por urgencia, pero programar la corrección de todos los hallazgos, no solo del primero. El riesgo de su enfoque es dejar puertas abiertas conocidas, documentadas y sin plazo de cierre.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: &quot;ya que activamos GuardDuty, Security Hub, CloudTrail, KMS y Secrets Manager, ya no necesitamos revisar manualmente nada más.&quot; No estoy de acuerdo porque estas herramientas generan señales y datos, pero interpretarlos, priorizarlos y decidir qué hacer sigue siendo trabajo humano — como vimos en cada hallazgo de este laboratorio. Esto es lo que haría en su lugar: usar las herramientas para reunir evidencia más rápido, y mantener revisiones periódicas del panorama completo. El riesgo de su enfoque es confundir tener las herramientas activas con estar efectivamente protegidos.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>28. Checklist final de la auditoría</h3>
          <InfoBox items={[
            'Revisé permisos de cada usuario/rol contra mínimo privilegio',
            'Confirmé MFA activo en la cuenta root',
            'Verifiqué que ningún servicio use Access Keys hardcodeadas',
            'Confirmé cifrado con KMS en buckets y bases con datos sensibles',
            'Confirmé que las credenciales de aplicaciones vivan en Secrets Manager',
            'Revisé CloudTrail en busca de actividad inusual reciente',
            'Revisé findings abiertos en GuardDuty/Security Hub',
            'Documenté cada hallazgo con evidencia y corrección propuesta',
          ]} />
        </section>

        <section className="lesson-section">
          <h3>29. Evaluación final del Módulo 9</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>30. Reto oral final</h3>
          <Dialogo>Explícame qué significa &quot;seguridad en la nube&quot; sin usar las palabras seguridad, AWS, IAM, cifrado, secreto, CloudTrail, GuardDuty ni permiso.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>&quot;Es asegurarse de que cada quien pueda hacer exactamente lo que necesita y nada más, que lo guardado siga siendo ilegible para quien no debería verlo, y que quede constancia de todo lo que ocurre — para poder confiar en el sistema incluso cuando nadie lo está mirando en ese momento.&quot;</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>31. Las ideas que deben sobrevivir</h3>
          <ul className="plain-list">
            <li>Identidad, autenticación y autorización son tres preguntas distintas.</li>
            <li>La cuenta root no es para el trabajo diario, y merece MFA desde el primer día.</li>
            <li>Una IAM Policy define permisos con Effect, Action y Resource.</li>
            <li>La denegación implícita significa que nadie puede hacer lo que nadie le permitió.</li>
            <li>Un Deny explícito siempre gana sobre un Allow.</li>
            <li>Los roles entregan credenciales temporales sin necesidad de Access Keys permanentes.</li>
            <li>El cifrado con KMS protege los datos incluso si alguien los obtiene por fuera de IAM.</li>
            <li>Los secretos no deberían vivir en código, archivos de configuración ni chats.</li>
            <li>CloudTrail responde quién hizo qué, cuándo y desde dónde.</li>
            <li>GuardDuty detecta actividad sospechosa; no la bloquea por sí solo.</li>
            <li>Security Hub centraliza hallazgos de varias fuentes en un solo lugar.</li>
            <li>Mínimo privilegio aplica a personas, roles, claves y secretos por igual.</li>
            <li>Ninguna herramienta reemplaza el criterio de investigar antes de concluir.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>32. Ticket de salida del módulo</h3>
          <Dialogo>Un nuevo integrante del equipo pregunta: &quot;¿por dónde empiezo si quiero entender la seguridad de nuestra cuenta de AWS?&quot; ¿Qué le responderías, en tres pasos?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Primero, revisar identidad y accesos: MFA en root, políticas de mínimo privilegio, y roles en vez de credenciales permanentes. Segundo, revisar protección de datos: qué está cifrado con KMS y dónde viven los secretos de las aplicaciones. Tercero, revisar visibilidad: qué dice CloudTrail sobre actividad reciente y qué hallazgos tienen abiertos GuardDuty y Security Hub.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="check-circle" /> Módulo 9 completado</div>
          <Nota><p>El estudiante comenzó el módulo con un equipo que compartía la contraseña de la cuenta root por chat, y termina siendo capaz de auditar y diseñar:</p></Nota>
          <Flow steps={[
            { icon: 'id-card', label: 'Identidad' }, { icon: 'key', label: 'MFA' }, { icon: 'file-text', label: 'Policies' },
            { icon: 'users', label: 'Roles' }, { icon: 'lock', label: 'KMS' }, { icon: 'key', label: 'Secrets Manager' },
            { icon: 'search', label: 'CloudTrail' }, { icon: 'shield', label: 'GuardDuty + Security Hub' },
          ]} />
          <p>Ya no pregunta solamente &quot;¿quién tiene acceso?&quot;. Ahora puede preguntar: &quot;¿esta identidad tiene exactamente lo que necesita, sus credenciales son temporales, sus datos están protegidos, y tenemos evidencia de todo lo que ha hecho?&quot;</p>
          <p>Con esto se completa el recorrido de <strong>AWS desde cero</strong> a través de cómputo, almacenamiento, redes, bases de datos, alta disponibilidad, monitoreo y seguridad — las piezas con las que CloudShop, desde la Clase 1 del Módulo 0, se construyó paso a paso hasta convertirse en una arquitectura completa, observable y segura.</p>
          <p>Todo lo construido hasta aquí sigue dependiendo de servidores que nosotros encendemos, escalamos y aseguramos. ¿Y si, para ciertos casos, ni siquiera tuviéramos que pensar en el servidor?</p>
          <Link to="/aprendizaje/aws-desde-cero/modulo-10" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ver la hoja de ruta del Módulo 10: Computación Serverless con AWS Lambda →
          </Link>
        </div>

      </div>
    </div>
  );
}
