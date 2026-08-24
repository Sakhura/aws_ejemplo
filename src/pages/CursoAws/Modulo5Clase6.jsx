import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿A qué nivel trabaja un Security Group?', options: [{ text: 'Recurso asociado.', correct: true }, { text: 'Región completa.', correct: false }, { text: 'Cuenta completa.', correct: false }, { text: 'Bucket.', correct: false }] },
  { q: '¿A qué nivel trabaja una Network ACL?', options: [{ text: 'Subnet.', correct: true }, { text: 'Objeto S3.', correct: false }, { text: 'Usuario IAM.', correct: false }, { text: 'AMI.', correct: false }] },
  { q: '¿Security Group es stateful?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Network ACL es stateless?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Security Groups permiten reglas Deny explícitas?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Network ACL puede tener Allow y Deny?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Cómo evalúa AWS las reglas NACL?', options: [{ text: 'Desde el número menor hasta encontrar la primera coincidencia.', correct: true }, { text: 'Aleatoriamente.', correct: false }, { text: 'Solo la última.', correct: false }, { text: 'Todas pesan igual.', correct: false }] },
  { q: '¿Una subnet puede asociarse simultáneamente a varias NACL?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Una NACL puede estar asociada a varias subnets?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Una custom NACL recién creada permite todo por defecto?', options: [{ text: 'Sí.', correct: false }, { text: 'No, inicialmente bloquea inbound y outbound hasta configurar reglas.', correct: true }] },
];

export default function Modulo5Clase6() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 5 · Clase 6</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 5 · Clase 6: Security Groups vs Network ACLs, seguridad en dos niveles diferentes</h2>
      <p className="lesson-subtitle">
        Security Group protege recursos; Network ACL protege el límite de una subnet.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + comparación + lectura de reglas + actividades + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 5 · Clases 1 a 5</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Recordar qué es un Security Group y explicar qué es una Network ACL.</li>
            <li>Diferenciar seguridad a nivel de recurso y de subnet.</li>
            <li>Comprender qué significa stateful y qué significa stateless.</li>
            <li>Reconocer que Security Groups trabajan con reglas Allow, y que NACLs permiten Allow y Deny.</li>
            <li>Comprender el orden de evaluación de reglas de una NACL, y diferenciar reglas inbound y outbound.</li>
            <li>Comprender que una subnet solo puede estar asociada a una Network ACL a la vez.</li>
            <li>Reconocer el comportamiento general de la Default Network ACL.</li>
            <li>Diseñar una protección sencilla utilizando SG + NACL.</li>
          </ul>
          <p>La frase que debe sobrevivir será:</p>
          <Dialogo>Security Group protege recursos; Network ACL protege el límite de una subnet.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Recordemos nuestro Security Group</h3>
          <Flow steps={[{ icon: 'radio', label: 'Internet' }, { icon: 'shield', label: 'Security Group' }, { icon: 'server', label: 'EC2' }]} />
          <p>Configuramos reglas como HTTP puerto 80 desde 0.0.0.0/0, o SSH puerto 22 desde "Mi IP". La pregunta era: ¿qué tráfico permitimos hacia este recurso?</p>
        </section>

        <section className="lesson-section">
          <h3>3. Pero ahora tenemos una subnet completa</h3>
          <Nota><p>Public Subnet con Web A, Web B, Web C — cada instancia puede tener su Security Group. Pero aparece otra pregunta: ¿podemos colocar un control en el borde de toda la subnet?</p></Nota>
          <Dialogo>Sí. Aquí aparece Network ACL.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>4. Network ACL</h3>
          <Nota><p>ACL significa Access Control List. En AWS hablamos de Network ACL o NACL.</p></Nota>
          <Dialogo>Una Network ACL es una lista de reglas que permite o deniega tráfico cuando entra o sale de una subnet.</Dialogo>
          <p>AWS la define como un control de tráfico inbound y outbound a nivel de subnet.</p>
        </section>

        <section className="lesson-section">
          <h3>5. Analogía del barrio</h3>
          <RoleGrid roles={[
            { icon: 'building', label: 'Network ACL', desc: 'Control de acceso del barrio' },
            { icon: 'shield', label: 'Security Group', desc: 'Guardia de cada casa' },
          ]} />
          <Flow steps={[{ icon: 'radio', label: 'Tráfico' }, { icon: 'building', label: 'Network ACL' }, { icon: 'building', label: 'Subnet' }, { icon: 'shield', label: 'Security Group' }, { icon: 'server', label: 'EC2' }]} />
          <Nota><p>No significa que AWS siempre procese literalmente cada concepto exactamente como este dibujo pedagógico en todos los escenarios, pero ayuda a entender que son capas distintas.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>6. Primera gran diferencia: nivel</h3>
          <RoleGrid roles={[
            { icon: 'shield', label: 'Security Group', desc: 'Trabaja a nivel de recurso/interfaz asociada' },
            { icon: 'building', label: 'Network ACL', desc: 'Trabaja a nivel de subnet' },
          ]} />
          <p>AWS resume esta diferencia como instance/resource level vs subnet level. Analogía del edificio: la recepción es control general que afecta a quienes atraviesan el límite; la cerradura de la oficina protege esa oficina concreta.</p>
        </section>

        <section className="lesson-section">
          <h3>7. Podemos usar ambos: defensa en capas</h3>
          <Flow steps={[{ icon: 'radio', label: 'Exterior' }, { icon: 'building', label: 'Capa subnet — NACL' }, { icon: 'shield', label: 'Capa recurso — SG' }, { icon: 'server', label: 'Aplicación' }]} />
          <p>No usamos ambos porque "uno solo sea malo", sino porque podemos agregar defensa en capas — una cebolla tecnológica, pero con menos lágrimas.</p>
        </section>

        <section className="lesson-section">
          <h3>8. Security Groups: solo Allow. NACL: Allow y Deny</h3>
          <Nota><p>Los Security Groups utilizan reglas que permiten tráfico. No configuramos reglas explícitas DENY en un Security Group — AWS mantiene actualmente esa característica.</p></Nota>
          <Dialogo>En una NACL sí podemos tener ALLOW y DENY.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>9. Las NACL tienen números de regla</h3>
          <Nota><p>Podemos encontrar reglas 100, 110, 120, 200. AWS evalúa las reglas desde el número más bajo hacia arriba y se detiene cuando encuentra la primera coincidencia.</p></Nota>
          <QaItem question="Regla 100: DENY Pedro. Regla 200: ALLOW todos. Llega Pedro. ¿Qué ocurre?" answer="Primero encuentra 100 → DENY Pedro, y deja de seguir leyendo. Resultado: Pedro no entra." />
          <QaItem question="Ahora invertimos: 100 ALLOW todos, 200 DENY Pedro. Llega Pedro. ¿Qué ocurre?" answer="La primera coincidencia es 100 → ALLOW, y la regla 200 ya no se evalúa para ese tráfico." />
          <ConceptBadge icon="target">Regla de oro NACL: número menor = se evalúa antes. AWS recomienda dejar espacios (100, 200, 300) para poder insertar reglas después.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>10. Regla final *</h3>
          <Nota><p>Una Network ACL incluye reglas predeterminadas con *, que deniegan el tráfico que no haya coincidido con reglas numeradas anteriores.</p></Nota>
          <pre className="codeblock">{`100 → ALLOW HTTP
200 → ALLOW HTTPS
*   → DENY lo demás`}</pre>
          <p>Tráfico SSH (22) no coincide con 100 ni 200, llega a *, resultado: DENY.</p>
        </section>

        <section className="lesson-section">
          <h3>11. La diferencia más importante: Stateful vs Stateless</h3>
          <Nota><p>Security Group es Stateful. Network ACL es Stateless. AWS mantiene actualmente esa diferencia. Lo veremos sin hechicería matemática.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>12. ¿Qué significa Stateful?</h3>
          <Dialogo>El Security Group recuerda que una conexión permitida fue iniciada y permite automáticamente el tráfico de respuesta correspondiente.</Dialogo>
          <p>Analogía de la pizza: cuando el repartidor responde a nuestro pedido, no necesitamos llamar nuevamente al guardia para autorizar el regreso de cada respuesta — el sistema recuerda la conversación.</p>
        </section>

        <section className="lesson-section">
          <h3>13. Network ACL es Stateless</h3>
          <Dialogo>La NACL no recuerda automáticamente una conversación como el Security Group. Por eso debemos considerar explícitamente tráfico de entrada y de salida.</Dialogo>
          <p>Analogía de dos guardias: entras correctamente por la entrada, pero al salir, el guardia de salida también revisa su propia lista — no sabe automáticamente "ella entró hace cinco minutos, déjala pasar".</p>
        </section>

        <section className="lesson-section">
          <h3>14. Inbound y Outbound</h3>
          <RoleGrid roles={[
            { icon: 'upload', label: 'Inbound', desc: 'Controla tráfico que entra a la subnet' },
            { icon: 'upload', label: 'Outbound', desc: 'Controla tráfico que sale de la subnet' },
          ]} />
          <Nota><p>Como NACL es stateless, la respuesta puede utilizar puertos diferentes del servicio original (puertos efímeros del cliente). No entraremos hoy a memorizar rangos de puertos efímeros — solo: una NACL mal configurada puede permitir la solicitud y bloquear la respuesta. AWS advierte que las NACL personalizadas deben contemplar reglas para tráfico de respuesta.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>15. ¿Cuántas NACL puede tener una subnet?</h3>
          <Nota><p>Una subnet puede estar asociada a una Network ACL a la vez. Una misma Network ACL puede estar asociada a varias subnets.</p></Nota>
          <Flow steps={[{ icon: 'building', label: 'nacl-publica' }, { icon: 'building', label: 'Public Subnet A + B' }]} />
        </section>

        <section className="lesson-section">
          <h3>16. Default Network ACL vs Custom NACL</h3>
          <Nota><p>Cuando tenemos una VPC, existe una Default Network ACL que por defecto permite todo el tráfico IPv4 entrante y saliente mediante sus reglas numeradas iniciales, conservando una regla * que deniega lo que no coincida.</p></Nota>
          <ConceptBadge icon="alert-triangle" variant="warning">Una Network ACL personalizada recién creada bloquea inicialmente todo el tráfico inbound y outbound hasta que agregamos reglas apropiadas</ConceptBadge>
          <p>Esto es muy importante para el laboratorio: crear una NACL custom y asociarla rápidamente a una subnet de producción sin configurar reglas puede hacer perder conectividad.</p>
        </section>

        <section className="lesson-section">
          <h3>17. Por eso primero diseñamos</h3>
          <Flow steps={[
            { n: 1, label: 'Crear NACL' },
            { n: 2, label: 'Configurar reglas' },
            { n: 3, label: 'Revisar' },
            { n: 4, label: 'Asociar cuidadosamente' },
            { n: 5, label: 'Probar' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>18. Security Group evalúa reglas distinto</h3>
          <Nota><p>Los Security Groups consideran sus reglas aplicables para determinar si el tráfico está permitido, sin la misma lógica de "regla 100 primero, luego 200" — la numeración/prioridad ordenada es característica de las NACL.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>19. Tabla comparativa fundamental</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Característica</th><th>Security Group</th><th>Network ACL</th></tr></thead>
            <tbody>
              <tr><td>Nivel</td><td>Recurso</td><td>Subnet</td></tr>
              <tr><td>Estado</td><td>Stateful</td><td>Stateless</td></tr>
              <tr><td>Reglas</td><td>Allow</td><td>Allow + Deny</td></tr>
              <tr><td>Orden</td><td>Sin prioridad numérica</td><td>Número menor primero</td></tr>
              <tr><td>Respuesta</td><td>Automáticamente contemplada</td><td>Debe permitirse</td></tr>
              <tr><td>Alcance</td><td>Recursos asociados</td><td>Subnets asociadas</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>20. ¿Cuál es "mejor"?</h3>
          <Dialogo>Ninguno. Son herramientas diferentes. Pregunta incorrecta: "¿cuál reemplaza al otro?". Pregunta correcta: "¿qué nivel quiero controlar?".</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>21. Caso ClínicaCloud</h3>
          <Nota><p>Public Subnet con Portal A y Portal B.</p></Nota>
          <QaItem question="Regla general de subnet: bloquear un rango conocido. ¿SG o NACL?" answer="Network ACL." />
          <QaItem question="Regla específica de Portal A: HTTPS público. ¿SG o NACL?" answer="Security Group." />
        </section>

        <section className="lesson-section">
          <h3>22. Una NACL restrictiva puede bloquear un SG permisivo (y al revés)</h3>
          <Nota><p>SG permite HTTPS 443, pero NACL deniega HTTPS 443. ¿Funciona? No — el tráfico debe superar los controles aplicables.</p></Nota>
          <p>Analogía del concierto: tener entrada VIP no crea mágicamente una carretera si la policía cerró la calle completa. Y al revés: NACL permite HTTP 80, pero el Security Group no lo permite — la NACL deja llegar al barrio, pero la casa no abre la puerta.</p>
          <Flow steps={[{ icon: 'radio', label: 'Cliente' }, { icon: 'building', label: 'NACL — ¿pasa?' }, { icon: 'shield', label: 'SG — ¿pasa?' }, { icon: 'server', label: 'Aplicación — ¿funciona?' }]} />
        </section>

        <section className="lesson-section">
          <h3>23. Laboratorio conceptual: revisar reglas</h3>
          <Nota><p>Security Group: HTTPS TCP 443, 0.0.0.0/0, ALLOW — a nivel de recurso asociado.</p></Nota>
          <InfoBox items={['NACL ID: _________________', 'Subnet asociada: _________________', 'Regla inbound 100: _________________', 'Regla outbound 100: _________________', 'Regla final: _________________']} />
        </section>

        <section className="lesson-section">
          <h3>24. Leer una regla y añadir un Deny</h3>
          <pre className="codeblock">{`Rule #: 100
Type: HTTPS
Protocol: TCP
Port: 443
Source: 0.0.0.0/0
ALLOW`}</pre>
          <Dialogo>Permitir tráfico HTTPS inbound desde cualquier IPv4.</Dialogo>
          <QaItem question={'Rule 90: DENY 203.0.113.50/32. Rule 100: ALLOW 0.0.0.0/0. ¿Qué ocurre con 203.0.113.50?'} answer="DENY, porque 90 se evalúa antes." />
        </section>

        <section className="lesson-section">
          <h3>25. Actividad: ¿quién decide?</h3>
          <QaItem question="Bloquear IP para toda una subnet." answer="Network ACL puede ser una opción." />
          <QaItem question="Permitir HTTPS a una EC2 concreta." answer="Security Group." />
          <QaItem question="Permitir SSH solo a servidores administrativos específicos." answer="Security Group." />
          <QaItem question="Crear un Deny explícito a nivel de subnet." answer="Network ACL." />
        </section>

        <section className="lesson-section">
          <h3>26. Actividad: ¿qué regla gana?</h3>
          <pre className="codeblock">{`100 → ALLOW HTTP 0.0.0.0/0
200 → DENY HTTP 203.0.113.5/32`}</pre>
          <QaItem question="Llega 203.0.113.5. ¿Qué ocurre?" answer="ALLOW. La regla 100 coincide primero y AWS deja de evaluar reglas posteriores." />
          <QaItem question="Para corregir y bloquear esa IP, ¿cómo reordenamos?" answer="90 → DENY 203.0.113.5/32, 100 → ALLOW 0.0.0.0/0. Ahora: DENY. El orden es parte del diseño." />
        </section>

        <section className="lesson-section">
          <h3>27. No hacemos reglas sin documentación</h3>
          <Nota><p>Una NACL con reglas 70, 80, 83, 92, 100, 110, 115, 119 y nadie recuerda para qué existe cada una. Usamos números organizados, descripciones, documentación y nombres claros.</p></Nota>
          <Dialogo>Tener 57 reglas NACL no significa "somos muy seguros" — podría significar "nadie entiende nuestra red". La meta es controles necesarios y comprensibles.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>28. Defense in Depth</h3>
          <Flow steps={[
            { icon: 'radio', label: 'Internet' },
            { icon: 'refresh', label: 'Routes' },
            { icon: 'building', label: 'NACL' },
            { icon: 'shield', label: 'SG' },
            { icon: 'server', label: 'Sistema' },
            { icon: 'lock', label: 'Aplicación' },
          ]} />
          <p>Y además IAM controla quién puede modificar estas configuraciones en AWS — no confundimos seguridad administrativa con seguridad del tráfico.</p>
        </section>

        <section className="lesson-section">
          <h3>29. Nuestro mapa de seguridad completo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Capa</th><th>Pregunta</th></tr></thead>
            <tbody>
              <tr><td>IAM</td><td>¿Quién configura?</td></tr>
              <tr><td>Routing</td><td>¿Por dónde viaja?</td></tr>
              <tr><td>NACL</td><td>¿Puede cruzar la subnet?</td></tr>
              <tr><td>Security Group</td><td>¿Puede alcanzar el recurso?</td></tr>
              <tr><td>Aplicación</td><td>¿Puede utilizar el servicio?</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>30. Dos propuestas equivocadas</h3>
          <Dialogo>"La NACL ya bloquea lo peligroso. Dejemos Security Group abierto." — el gerente</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque estamos eliminando una capa de mínimo acceso a nivel del recurso. Esto es lo que haría en su lugar: mantener reglas específicas en ambos niveles cuando la arquitectura lo justifique. El riesgo de su enfoque es que un cambio en la NACL deje recursos innecesariamente expuestos.</p>
          </Nota>
          <Dialogo>"Hagamos toda la seguridad solamente con NACL." — el desarrollador</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque perderíamos el control fino y stateful que entregan Security Groups a los recursos. Esto es lo que haría en su lugar: utilizar Security Groups como control principal de recursos y NACL cuando necesitemos una capa adicional a nivel de subnet. El riesgo es crear reglas complejas, difíciles de mantener y propensas a bloquear tráfico legítimo.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>31. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>32. Reto de la clase</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge icon="trophy">CloudShop</ConceptBadge>
          <p>Public Subnet con Web A y Web B. Necesitamos: HTTPS público hacia los servidores web, SSH solo desde administración, bloquear a nivel de subnet una dirección específica conocida, y mantener comunicación de respuesta correcta.</p>
          <Reveal label="Ver solución esperada">
            <InfoBox items={['HTTPS a servidores web → Security Group, 443, desde Internet según necesidad', 'SSH administrativo → Security Group, 22, desde origen administrativo restringido', 'Bloquear una IP específica para la subnet → Network ACL, DENY', 'Tráfico de respuesta → SG lo gestiona statefully; NACL necesita reglas inbound/outbound apropiadas']} />
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>33. Retos nivel 2, 3 y de diagnóstico</h3>
          <QaItem question="SG HTTPS 443 ALLOW, NACL inbound HTTPS 443 ALLOW, NACL outbound DENY ALL. La web no responde correctamente. ¿Qué investigamos?" answer="La salida de la NACL, porque es stateless y el tráfico de respuesta también debe estar permitido." />
          <QaItem question="NACL: 100 ALLOW ALL, 200 DENY 203.0.113.10/32. El administrador espera bloquear esa IP. ¿Funcionará?" answer="No. La regla 100 coincide primero. Debemos cambiar el orden: 90 DENY específica, 100 ALLOW general." />
          <QaItem question="Route Table ✅, IGW ✅, Public IP ✅, SG HTTPS ✅, pero NACL bloquea tráfico. ¿Puede fallar la web?" answer="Sí. Tener bien configuradas las demás capas no hace desaparecer una regla NACL que bloquee el tráfico." />
        </section>

        <section className="lesson-section">
          <h3>34. Reto oral</h3>
          <Dialogo>Explícame la diferencia entre SG y NACL sin usar las palabras Security Group, Network ACL, firewall, subnet, recurso, tráfico, permitir, bloquear, stateful ni stateless.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Uno funciona como el control de la puerta de cada casa y recuerda las conversaciones autorizadas; el otro funciona como el control general del barrio y revisa por separado lo que entra y lo que sale."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>35. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Security Group</th><th>Network ACL</th></tr></thead>
            <tbody>
              <tr><td>Nivel</td><td>Recurso</td><td>Subnet</td></tr>
              <tr><td>Estado</td><td>Stateful</td><td>Stateless</td></tr>
              <tr><td>Allow</td><td>✅</td><td>✅</td></tr>
              <tr><td>Deny explícito</td><td>❌</td><td>✅</td></tr>
              <tr><td>Orden numérico</td><td>No</td><td>✅</td></tr>
              <tr><td>Retorno automático</td><td>✅</td><td>❌</td></tr>
              <tr><td>Uso</td><td>Control fino</td><td>Capa adicional de subnet</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>36. Ticket de salida</h3>
          <Dialogo>Una web tiene HTTPS permitido en su Security Group, pero la Network ACL de la subnet deniega ese tráfico. ¿Puede el cliente conectarse?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>No. El tráfico también debe superar el control de la Network ACL. Un Allow del Security Group no anula un Deny aplicable a nivel de subnet.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 7</div>
          <Flow steps={[
            { icon: 'radio', label: 'Internet' },
            { icon: 'door', label: 'Internet Gateway' },
            { icon: 'globe', label: 'VPC' },
            { icon: 'building', label: 'Public Subnet — Route + NACL + SG → Web' },
            { icon: 'lock', label: 'Private Subnet — Route + NACL + NAT + SG → DB/App' },
          ]} />
          <Dialogo>"Ya conocemos cada pieza por separado. ¿Podemos diseñar una red completa sin que yo les diga dónde va cada cosa?"</Dialogo>
          <p>Allí dejaremos de introducir componentes nuevos y construiremos una arquitectura desde requisitos de negocio: qué debe ser público, qué debe ser privado, cómo sale cada recurso, qué rutas necesita y qué controles de seguridad corresponden.</p>
          <ConceptBadge icon="puzzle">Módulo 5 · Clase 7 — Diseñando nuestra primera arquitectura VPC completa</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-5/clase-7" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 7: Diseñando nuestra primera arquitectura VPC completa →
          </Link>
        </div>

      </div>
    </div>
  );
}
