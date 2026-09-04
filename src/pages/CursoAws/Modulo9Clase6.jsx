import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const CLOUDTRAIL_EVENT = `{
  "eventTime": "2026-09-04T03:14:22Z",
  "eventName": "TerminateInstances",
  "eventSource": "ec2.amazonaws.com",
  "userIdentity": {
    "type": "AssumedRole",
    "arn": "arn:aws:sts::111122223333:assumed-role/RolSoporte/juan"
  },
  "sourceIPAddress": "190.45.12.8",
  "requestParameters": {
    "instancesSet": { "items": [{ "instanceId": "i-0abc123def456" }] }
  }
}`;

const QUIZ_QUESTIONS = [
  { q: '¿Qué es AWS CloudTrail?', options: [{ text: 'El servicio que registra las llamadas a la API realizadas dentro de la cuenta de AWS.', correct: true }, { text: 'Un servicio de monitoreo de CPU.', correct: false }, { text: 'Un tipo de rol IAM.', correct: false }, { text: 'Un servicio de cifrado.', correct: false }] },
  { q: '¿Qué pregunta responde principalmente CloudTrail?', options: [{ text: '¿Quién hizo qué acción, cuándo y desde dónde?', correct: true }, { text: '¿Cuánta CPU está usando una instancia?', correct: false }, { text: '¿Cuál es el precio de un servicio?', correct: false }, { text: '¿Qué versión de política se usó en 2012?', correct: false }] },
  { q: '¿En qué se diferencia CloudTrail de CloudWatch Logs (Módulo 8)?', options: [{ text: 'CloudTrail registra acciones sobre la cuenta de AWS; CloudWatch Logs registra lo que ocurre dentro de las aplicaciones.', correct: true }, { text: 'Son exactamente lo mismo con distinto nombre.', correct: false }, { text: 'CloudWatch Logs registra quién eliminó una instancia.', correct: false }, { text: 'CloudTrail solo funciona con RDS.', correct: false }] },
  { q: '¿Qué campo de un evento de CloudTrail indica quién realizó la acción?', options: [{ text: 'userIdentity.', correct: true }, { text: 'eventTime.', correct: false }, { text: 'sourceIPAddress solamente.', correct: false }, { text: 'eventSource.', correct: false }] },
  { q: '¿CloudTrail puede registrar acciones realizadas con la cuenta root?', options: [{ text: 'Sí — y por eso es clave para detectar uso indebido de root, tema de la Clase 1.', correct: true }, { text: 'No, root queda fuera de cualquier registro.', correct: false }, { text: 'Solo si root tiene MFA activo.', correct: false }, { text: 'Solo los fines de semana.', correct: false }] },
  { q: '¿Qué es un Trail en CloudTrail?', options: [{ text: 'Una configuración que envía el historial de eventos a un destino como S3 para conservarlo más tiempo del límite por defecto.', correct: true }, { text: 'Un tipo de instancia EC2.', correct: false }, { text: 'Una alarma de CloudWatch.', correct: false }, { text: 'Un usuario IAM especial.', correct: false }] },
  { q: 'Sin CloudTrail, ¿cómo sabríamos con certeza quién eliminó un recurso de producción?', options: [{ text: 'Con mucha dificultad — probablemente preguntando y esperando que alguien lo admita.', correct: true }, { text: 'Automáticamente, AWS siempre lo muestra en cualquier pantalla.', correct: false }] },
];

export default function Modulo9Clase6() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 9 · Clase 6</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 9 · Clase 6: AWS CloudTrail — saber quién hizo qué y cuándo</h2>
      <p className="lesson-subtitle">
        IAM decide quién puede hacer algo. CloudTrail registra, sin excepciones, quién efectivamente lo hizo.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + lectura de eventos + caso + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 9 · Clases 1 a 5, Módulo 8</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es AWS CloudTrail y qué problema resuelve.</li>
            <li>Diferenciar CloudTrail de CloudWatch Logs, ya visto en el Módulo 8.</li>
            <li>Leer un evento de CloudTrail e identificar quién, qué, cuándo y desde dónde.</li>
            <li>Comprender qué es un Trail y por qué conviene enviar eventos a S3.</li>
            <li>Reconocer por qué CloudTrail es clave para auditar el uso de la cuenta root.</li>
            <li>Aplicar CloudTrail para investigar un incidente concreto.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-3. El problema que abre la clase</h3>
          <p>Un lunes por la mañana, alguien en CloudShop descubre que una instancia EC2 de producción fue eliminada durante el fin de semana. Nadie admite haberlo hecho. El equipo tiene identidades bien diseñadas (Clase 1), políticas precisas (Clase 2), roles sin Access Keys (Clase 3), datos cifrados (Clase 4) y secretos protegidos (Clase 5) — pero ninguna de esas piezas responde la pregunta de hoy:</p>
          <ConceptBadge icon="search">¿Quién eliminó esa instancia, y cuándo?</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>4-6. Aparece AWS CloudTrail</h3>
          <p><strong>AWS CloudTrail</strong> es el servicio que registra las llamadas a la API realizadas dentro de una cuenta de AWS: quién hizo una acción, qué acción fue, sobre qué recurso, cuándo, y desde qué dirección IP. Prácticamente todo lo que ocurre en AWS —desde la consola web, la CLI o programáticamente— pasa por una llamada a la API, y CloudTrail queda escuchando.</p>
          <Dialogo>Es como la cámara de seguridad y el libro de visitas de un edificio a la vez: no decide quién puede entrar (eso ya lo resuelve IAM), pero registra exactamente quién entró, por qué puerta y a qué hora — sin excepciones ni favoritismos.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>7-8. CloudTrail no es lo mismo que CloudWatch Logs</h3>
          <p>En el Módulo 8 conocimos CloudWatch Logs: los mensajes que genera nuestra <em>aplicación</em> (INFO, WARN, ERROR) dentro de un servidor. CloudTrail vive en un nivel distinto: registra las acciones realizadas sobre la <em>cuenta de AWS misma</em>, sin importar si provienen de una aplicación, una persona en la consola o un script.</p>
          <RoleGrid roles={[
            { icon: 'file-text', label: 'CloudWatch Logs', desc: '¿Qué hizo mi aplicación? (Módulo 8)' },
            { icon: 'search', label: 'CloudTrail', desc: '¿Quién hizo qué sobre mis recursos de AWS?' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>9-11. Leamos un evento real de CloudTrail</h3>
          <pre className="codeblock">{CLOUDTRAIL_EVENT}</pre>
          <table className="table lesson-summary-table">
            <thead><tr><th>Campo</th><th>Traducción</th></tr></thead>
            <tbody>
              <tr><td className="mono">eventTime</td><td>Cuándo ocurrió</td></tr>
              <tr><td className="mono">eventName</td><td>Qué acción — aquí, terminar instancias EC2</td></tr>
              <tr><td className="mono">userIdentity</td><td>Quién — aquí, alguien que asumió el rol RolSoporte</td></tr>
              <tr><td className="mono">sourceIPAddress</td><td>Desde qué dirección IP</td></tr>
              <tr><td className="mono">requestParameters</td><td>Sobre qué recurso concreto — aquí, una instancia específica</td></tr>
            </tbody>
          </table>
          <p>En español: <em>&quot;El 4 de septiembre de 2026 a las 03:14 UTC, alguien que asumió el rol RolSoporte terminó la instancia i-0abc123def456, desde la IP 190.45.12.8.&quot;</em> El misterio del lunes se resuelve con un solo evento.</p>
        </section>

        <section className="lesson-section">
          <h3>12-13. Event history: lo que ya viene activado</h3>
          <p>AWS mantiene automáticamente un historial de eventos de administración de los últimos 90 días, visible desde la consola, sin ninguna configuración adicional. Para muchos casos de investigación reciente, alcanza con consultarlo directamente.</p>
          <Nota><p>Ese historial por defecto es útil, pero limitado en el tiempo. Si CloudShop necesita conservar evidencia por más de 90 días —por auditoría, cumplimiento o simple prudencia— necesita otra pieza.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>14-16. El Trail: conservar el historial más allá de los 90 días</h3>
          <p>Un <strong>Trail</strong> es una configuración de CloudTrail que envía los eventos a un destino duradero — típicamente un bucket de Amazon S3 (Módulo 4), y opcionalmente también a CloudWatch Logs para poder generar alarmas sobre eventos específicos.</p>
          <Flow steps={[{ icon: 'search', label: 'CloudTrail' }, { icon: 'package', label: 'Trail → S3', caption: 'Retención a largo plazo' }, { icon: 'bar-chart', label: 'CloudWatch Logs (opcional)', caption: 'Alarmas sobre eventos' }]} />
          <Nota><p>¿Recuerdas que en el Módulo 4 aprendimos a proteger buckets S3, y en esta misma clase de Módulo 9 (Clase 4) aprendimos a cifrarlos con KMS? El bucket donde vive un Trail merece exactamente ese mismo cuidado — es, literalmente, el registro de todo lo que pasó en la cuenta.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>17-18. CloudTrail y la cuenta root: el círculo se cierra</h3>
          <p>En la Clase 1 dijimos que la cuenta root no debería usarse a diario, y que su actividad merece vigilancia especial. CloudTrail es exactamente la herramienta que hace eso posible: cada acción realizada con la cuenta root —incluso el simple hecho de iniciar sesión— queda registrada, con la misma estructura de evento que acabamos de leer.</p>
          <ConceptBadge icon="crown" variant="warning">Si root aparece haciendo algo un martes a las 2 a.m., CloudTrail es quien nos lo dice.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>19-20. Volvamos al incidente de CloudShop</h3>
          <QaItem question="¿Dónde buscaríamos primero para saber quién terminó la instancia de producción?" answer="En CloudTrail — Event history, filtrando por el nombre de evento TerminateInstances y el rango de fechas del fin de semana." />
          <QaItem question="Encontramos que userIdentity corresponde a RolSoporte, asumido por 'juan'. ¿Qué deberíamos revisar después?" answer="Si la permissions policy de RolSoporte realmente debería permitir terminar instancias de producción — probablemente no, según mínimo privilegio (Clase 2)." />
        </section>

        <section className="lesson-section">
          <h3>21-22. RETO DE LA CLASE</h3>
          <Nota><p>El equipo de CloudShop nota que el bucket <code>cloudshop-comprobantes</code> (el mismo de la Clase 4, cifrado con KMS) cambió sus permisos de acceso hace tres días, y ahora aparece más abierto de lo esperado. Nadie recuerda haberlo modificado. ¿Cómo investigarías, en orden?</p></Nota>
          <Reveal label="Ver la respuesta esperada">
            <p>Buscar en CloudTrail eventos relacionados con ese bucket (por ejemplo, PutBucketPolicy o PutBucketAcl) en los últimos días. Revisar el campo userIdentity de esos eventos para identificar qué usuario o rol hizo el cambio, junto con sourceIPAddress y eventTime. Con esa información, conversar con esa identidad específica y, si el cambio no estaba autorizado, revertirlo y revisar si esa identidad debería tener ese nivel de permiso sobre el bucket.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>23-24. Retos nivel 2 y 3</h3>
          <QaItem question="Un evento de CloudTrail muestra userIdentity.type: 'Root'. ¿Qué deberíamos sentir al respecto?" answer="Atención inmediata — la cuenta root no debería estar generando actividad rutinaria, así que ese evento merece revisión prioritaria." />
          <QaItem question="CloudShop solo revisa CloudTrail cuando ya ocurrió un incidente. ¿Es esa la mejor estrategia?" answer="No del todo — conectar CloudTrail con CloudWatch Logs y alarmas (Módulo 8) permite detectar eventos preocupantes casi en el momento en que ocurren, en vez de descubrirlos días después." />
        </section>

        <section className="lesson-section">
          <h3>25-26. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El gerente propone: &quot;con que cada persona nos avise cuando hace un cambio importante, ya no necesitamos CloudTrail.&quot; No estoy de acuerdo porque depender de que alguien recuerde avisar falla exactamente en los casos que más importan: errores, accesos no autorizados o acciones que la propia persona no considera &quot;importantes&quot; en el momento. Esto es lo que haría en su lugar: mantener CloudTrail activo como registro objetivo e independiente de lo que la gente recuerde contar. El riesgo de su enfoque es no tener ningún registro confiable el día que algo salga mal y nadie hable.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: &quot;no hace falta un Trail hacia S3, con los 90 días de Event history alcanza siempre.&quot; No estoy de acuerdo porque algunos incidentes se descubren mucho después de haber ocurrido — como el bucket que cambió sus permisos hace tres días y podría haber pasado desapercibido varias semanas más. Esto es lo que haría en su lugar: configurar un Trail hacia un bucket S3 protegido, para conservar evidencia más allá de esa ventana. El riesgo de su enfoque es perder la posibilidad de investigar cualquier cosa ocurrida hace más de 90 días.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>27. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'CloudTrail registra las llamadas a la API realizadas dentro de la cuenta de AWS.', correct: true },
            { text: 'CloudTrail y CloudWatch Logs son exactamente lo mismo.', correct: false },
            { text: 'El campo userIdentity de un evento indica quién realizó la acción.', correct: true },
            { text: 'La actividad de la cuenta root nunca aparece registrada en CloudTrail.', correct: false },
            { text: 'Un Trail permite conservar eventos más allá de los 90 días del historial por defecto.', correct: true },
            { text: 'CloudTrail decide qué permisos tiene cada usuario.', correct: false },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>28. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>29. Reto oral</h3>
          <Dialogo>Explícame qué es AWS CloudTrail sin usar las palabras registro, auditoría, evento, AWS, API ni CloudTrail.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>&quot;Es lo que deja constancia de quién hizo cada cosa dentro de la cuenta, en qué momento, y desde dónde — sin que nadie tenga que confiar en la memoria de las personas.&quot;</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>30. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>AWS CloudTrail</td><td>Registra quién hizo qué, cuándo y desde dónde</td></tr>
              <tr><td>Event history</td><td>Últimos 90 días, disponible sin configurar nada</td></tr>
              <tr><td>Trail</td><td>Envía eventos a un destino duradero, como S3</td></tr>
              <tr><td>userIdentity</td><td>Quién realizó la acción</td></tr>
              <tr><td>eventName</td><td>Qué acción se realizó</td></tr>
              <tr><td>sourceIPAddress</td><td>Desde dónde se realizó</td></tr>
              <tr><td>CloudTrail vs. CloudWatch Logs</td><td>Cuenta de AWS vs. aplicación</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>31. Ticket de salida</h3>
          <Dialogo>Un compañero te dice: &quot;ya tenemos IAM bien configurado, ¿para qué necesitamos además CloudTrail?&quot; ¿Qué le responderías?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>IAM decide quién puede hacer qué, pero no deja un registro histórico de lo que efectivamente ocurrió. CloudTrail cumple esa función distinta: sin él, investigar un incidente después de que sucedió depende de la memoria o la honestidad de las personas, en vez de un registro objetivo del sistema.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 7</div>
          <p>Ya sabemos investigar después de que algo ocurrió. Pero revisar CloudTrail manualmente, evento por evento, no escala cuando la cuenta crece. ¿Y si algo pudiera avisarnos automáticamente cuando la actividad se ve sospechosa, sin que tengamos que estar buscando todo el tiempo?</p>
          <ConceptBadge icon="search">Módulo 9 · Clase 7 — GuardDuty y Security Hub: detectar actividad sospechosa y centralizar hallazgos</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-9/clase-7" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 7: GuardDuty y Security Hub →
          </Link>
        </div>

      </div>
    </div>
  );
}
