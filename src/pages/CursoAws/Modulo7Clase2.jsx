import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué tipo de Load Balancer estudiaremos principalmente?', options: [{ text: 'Application Load Balancer', correct: true }, { text: 'NAT Gateway', correct: false }, { text: 'RDS Proxy', correct: false }, { text: 'Internet Gateway', correct: false }] },
  { q: '¿Qué hace un Listener?', options: [{ text: 'Espera conexiones según protocolo y puerto.', correct: true }, { text: 'Crea EC2.', correct: false }, { text: 'Guarda datos.', correct: false }, { text: 'Crea backups.', correct: false }] },
  { q: '¿Qué puerto utiliza normalmente HTTPS?', options: [{ text: '443', correct: true }, { text: '3306', correct: false }, { text: '22', correct: false }, { text: '53', correct: false }] },
  { q: '¿Qué es un Target Group?', options: [{ text: 'Grupo de destinos que pueden recibir solicitudes.', correct: true }, { text: 'Grupo IAM.', correct: false }, { text: 'Grupo de buckets.', correct: false }, { text: 'Route Table.', correct: false }] },
  { q: '¿Qué es un Target?', options: [{ text: 'Destino registrado, como una EC2.', correct: true }, { text: 'Listener.', correct: false }, { text: 'VPC.', correct: false }, { text: 'Backup.', correct: false }] },
  { q: '¿Qué acción envía tráfico a un Target Group?', options: [{ text: 'Forward', correct: true }, { text: 'Snapshot', correct: false }, { text: 'Scale', correct: false }, { text: 'Backup', correct: false }] },
  { q: '¿Puede un ALB dirigir /api/* y /web/* a grupos distintos?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Target Group y Auto Scaling Group son lo mismo?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Puede el Listener usar HTTPS 443 mientras los Targets reciben HTTP 80?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Una EC2 registrada siempre está saludable?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
];

export default function Modulo7Clase2() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 7 · Clase 2</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 7 · Clase 2: Application Load Balancer, Listeners y Target Groups</h2>
      <p className="lesson-subtitle">
        El Listener recibe, la regla decide y el Target Group define hacia dónde enviamos la solicitud.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + arquitectura + configuración guiada + actividades + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 7 · Clase 1</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es un Application Load Balancer y qué tipo de tráfico maneja.</li>
            <li>Explicar qué es un Listener y comprender la relación entre protocolo y puerto.</li>
            <li>Explicar qué es un Target Group y reconocer qué es un Target.</li>
            <li>Comprender cómo el ALB conecta Listeners con Target Groups.</li>
            <li>Comprender qué es una Default Action y reconocer que un Listener puede tener reglas.</li>
            <li>Comprender conceptualmente routing por rutas como /app y /api.</li>
            <li>Diferenciar ALB, Listener y Target Group.</li>
            <li>Diseñar un flujo básico Usuario → ALB → Target Group → EC2.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-3. Recordemos el problema</h3>
          <Flow steps={[{ icon: 'globe', label: 'Usuarios' }, { icon: 'settings', label: 'Load Balancer' }, { icon: 'server', label: 'A / B / C' }]} />
          <p>Sabemos que el Load Balancer distribuye solicitudes. Pero falta responder: ¿cómo sabe qué tráfico está recibiendo y a qué servidores puede enviarlo? Hoy aparecen tres piezas nuevas.</p>
          <Flow steps={[{ icon: 'settings', label: 'Application Load Balancer' }, { icon: 'radio', label: 'Listener' }, { icon: 'target', label: 'Target Group' }, { icon: 'server', label: 'Targets' }]} />
        </section>

        <section className="lesson-section">
          <h3>4-5. ¿Qué es un Application Load Balancer?</h3>
          <p>Un Application Load Balancer (ALB) es un tipo de Elastic Load Balancer orientado principalmente a tráfico de aplicaciones HTTP y HTTPS.</p>
          <ConceptBadge icon="settings">Es el recepcionista web de nuestra aplicación</ConceptBadge>
          <Dialogo>En el Hotel CloudShop, todos los visitantes llegan primero a Recepción — no van directamente a buscar una habitación por los pasillos. La recepción pregunta "¿a qué viene?" y dirige a la persona correcta. Ese será nuestro ALB.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>6-9. ¿Qué es un Listener?</h3>
          <p>AWS define un Listener como el proceso que revisa solicitudes de conexión utilizando el protocolo y puerto configurados. Un ALB necesita al menos un Listener para poder recibir tráfico.</p>
          <ConceptBadge icon="radio">El Listener representa la puerta por la que el ALB está esperando solicitudes</ConceptBadge>
          <Dialogo>Nuestro edificio tiene la Puerta 80 para HTTP y la Puerta 443 para HTTPS. El Listener dice conceptualmente: "estoy escuchando aquí".</Dialogo>
          <p>Podemos crear un Listener HTTP en Protocol: HTTP, Port: 80, indicando protocolo y puerto junto con una acción predeterminada. Para tráfico cifrado usamos HTTPS en el puerto 443 — ahí también necesitaremos un certificado apropiado, tema que no profundizaremos todavía.</p>
        </section>

        <section className="lesson-section">
          <h3>10-12. El Listener no es la EC2</h3>
          <p>Listener 443 no significa que la EC2 esté escuchando necesariamente en 443. Podemos tener Cliente → ALB :443 y después ALB → EC2 :80 — son dos tramos diferentes.</p>
          <Flow steps={[{ icon: 'user', label: 'Usuario' }, { label: 'HTTPS 443' }, { icon: 'settings', label: 'ALB' }, { label: 'HTTP 80' }, { icon: 'server', label: 'EC2' }]} />
          <Dialogo>El cliente entra por la puerta principal, pero después la recepción puede enviarlo por un pasillo interno diferente. No necesitamos usar la misma puerta para entrada externa e interna.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>13-16. ¿Qué es un Target Group? ¿Qué es un Target?</h3>
          <p>Un Target Group agrupa uno o más destinos registrados a los que el Load Balancer puede dirigir solicitudes, enrutando hacia targets registrados usando el protocolo y puerto especificados, y permitiendo configurar Health Checks por grupo.</p>
          <ConceptBadge icon="target">Es la lista de trabajadores que pueden atender determinado tipo de solicitud</ConceptBadge>
          <p>El ALB no piensa "tengo tres EC2 cualquiera", piensa "tengo un grupo llamado cloudshop-web". Un <strong>Target</strong> es un destino registrado dentro del Target Group — por ejemplo, EC2 A. También pueden existir otros tipos de target compatibles, como direcciones IP o funciones Lambda en escenarios soportados; para nuestro curso usaremos EC2.</p>
          <Nota><p>Otra confusión que debemos evitar: Target Group no es Auto Scaling Group. Target Group agrupa destinos que pueden recibir tráfico. Auto Scaling Group administra cuántas EC2 existen.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>17. La cadena básica</h3>
          <Flow steps={[{ icon: 'user', label: 'Usuario' }, { icon: 'settings', label: 'ALB' }, { icon: 'radio', label: 'Listener' }, { icon: 'target', label: 'Target Group' }, { icon: 'server', label: 'A / B' }]} />
          <p>Ese dibujo debe sobrevivir intacto.</p>
        </section>

        <section className="lesson-section">
          <h3>18-21. Reglas, Forward y Default Action</h3>
          <p>Un Listener tiene Rules (reglas). Una regla puede decir: "si ocurre esto, realiza esta acción" — por ejemplo, "si la solicitud llega, forward a cloudshop-web". Una de las acciones fundamentales es <strong>Forward</strong>: reenviar la solicitud hacia un Target Group.</p>
          <p>Todo Listener tiene además una <strong>Default Action</strong>, una acción predeterminada para manejar tráfico cuando corresponde.</p>
          <Dialogo>Recepción tiene una regla: "si no existe ninguna instrucción especial, enviar al comedor principal." Eso sería la acción predeterminada.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>22-26. Routing basado en contenido</h3>
          <p>Un ALB puede utilizar reglas para dirigir solicitudes diferentes hacia distintos Target Groups. Por ejemplo, /app/* hacia App Targets y /api/* hacia API Targets.</p>
          <Flow steps={[
            { icon: 'globe', label: 'Usuarios' },
            { icon: 'settings', label: 'ALB' },
            { icon: 'radio', label: 'Listener 443' },
            { label: '/app/* → App TG' },
            { label: '/api/* → API TG' },
          ]} />
          <p>Esto se llama <strong>routing basado en contenido</strong>: el ALB puede mirar información de la solicitud y decidir a qué grupo enviarla. No necesitamos estudiar hoy todas las condiciones disponibles — la idea es que una sola puerta puede dirigir a varios servicios.</p>
          <Dialogo>Llegamos a recepción del hospital y decimos "tengo hora con traumatología" — nos envían a Traumatología. Otra persona dice "vengo por laboratorio" — la envían a Laboratorio. Una recepción, múltiples destinos. Eso representa muy bien las reglas de un ALB.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>27-28. No necesitamos varios Load Balancers necesariamente</h3>
          <p>Una arquitectura ingenua podría crear un ALB Web, un ALB API y un ALB Admin solo porque hay servicios distintos. Con reglas, un solo ALB puede dirigir distintos tipos de solicitudes a diferentes Target Groups cuando el diseño lo permite — esto puede reducir complejidad. Pero tampoco significa que "un ALB siempre debe manejar absolutamente todo": la decisión depende de la arquitectura.</p>
        </section>

        <section className="lesson-section">
          <h3>29-31. Las reglas tienen prioridad</h3>
          <p>Las reglas personalizadas de un Listener tienen prioridad y se evalúan en orden hasta encontrar una coincidencia. Por ejemplo: prioridad 10 → /api/* → API Target Group; prioridad 20 → /admin/* → Admin Target Group; finalmente Default → Web Target Group.</p>
          <Nota><p>Si una regla muy amplia aparece antes que una más específica, podríamos enviar solicitudes al lugar equivocado — parecido a lo que aprendimos con NACL, aunque el funcionamiento específico es diferente.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>32-36. Puertos distintos y capas de seguridad</h3>
          <p>Target Groups pueden tener distintos puertos: Web-TG en HTTP 80 y API-TG en HTTP 8080. Una entrada HTTPS puede repartirse hacia dos servicios internos diferentes con puertos distintos, lo que también ayuda con seguridad: podemos permitir Internet → ALB 443 y luego ALB → EC2 80/8080 según necesidad, sin que las EC2 reciban conexiones directas desde Internet.</p>
          <Flow steps={[{ icon: 'globe', label: 'Usuario' }, { icon: 'shield', label: 'SG-ALB' }, { icon: 'settings', label: 'ALB' }, { icon: 'shield', label: 'SG-Web' }, { icon: 'server', label: 'EC2' }]} />
        </section>

        <section className="lesson-section">
          <h3>37-41. Registrar targets y Health Checks por grupo</h3>
          <p>Creamos cloudshop-web y registramos web-01 y web-02 — podemos agregar o retirar targets registrados en el grupo según necesidad. Si agregamos EC2 C, registramos web-03, y el ALB puede utilizarla cuando esté disponible y saludable.</p>
          <Nota><p>Registrar no significa saludable. Podemos tener un Target web-03 registrado, pero con Health: Unhealthy — entonces el Load Balancer no debería tratarlo como destino normal. La configuración de Health Check se define por Target Group; en la Clase 3 lo veremos en profundidad.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>42. Arquitectura completa hasta ahora</h3>
          <Flow steps={[
            { icon: 'globe', label: 'Internet' },
            { icon: 'shield', label: 'SG-ALB' },
            { icon: 'settings', label: 'Public ALB' },
            { icon: 'radio', label: 'Listener 443' },
            { label: '/web/* → Web TG' },
            { label: '/api/* → API TG' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>43-46. Actividades</h3>
          <QaItem question="Recibe las solicitudes externas" answer="ALB." />
          <QaItem question="Escucha HTTPS 443" answer="Listener." />
          <QaItem question="Agrupa web-01 y web-02" answer="Target Group." />
          <QaItem question="web-01" answer="Target." />
          <QaItem question="Ordena: Target Group, Usuario, Listener, EC2, ALB" answer="Usuario → ALB → Listener → Target Group → EC2." />
          <QaItem question="Navegación segura web / navegación web tradicional: ¿protocolo y puerto?" answer="HTTPS 443 / HTTP 80." />
          <QaItem question="Tenemos /api/*. ¿Qué hacemos?" answer="Enviar a API Target Group." />
        </section>

        <section className="lesson-section">
          <h3>47-51. Laboratorio conceptual: creamos el Target Group</h3>
          <p>Ruta conceptual: EC2 → Target Groups → Create Target Group. Nombre: <code>cloudshop-web-tg</code>.</p>
          <p>Target type: <strong>Instances</strong>, porque queremos registrar EC2 A y EC2 B. Protocol: HTTP, Port: 80, porque nuestra aplicación web escucha HTTP 80. El Target Group pertenece conceptualmente a nuestra cloudshop-vpc — los targets deben tener conectividad apropiada con el Load Balancer.</p>
          <p>Registramos web-a y web-b: <code>cloudshop-web-tg</code> queda con ambos targets.</p>
        </section>

        <section className="lesson-section">
          <h3>52-58. Creamos el ALB</h3>
          <p>Ruta conceptual: EC2 → Load Balancers → Create Load Balancer → Application Load Balancer. Nombre: <code>cloudshop-alb</code>.</p>
          <p>Scheme: <strong>Internet-facing</strong>, porque usuarios externos necesitan alcanzar el ALB. (También existen ALB internos para escenarios sin exposición pública, que quedará como reconocimiento.) Seleccionamos subnets en AZ A y AZ B para mejorar la resiliencia del punto de entrada.</p>
          <p>Security Group <code>sg-cloudshop-alb</code>: Inbound HTTP 80 durante laboratorio, o HTTPS 443 para una arquitectura más apropiada de producción. Configuramos el Listener HTTP :80 con Default Action Forward → cloudshop-web-tg.</p>
          <Flow steps={[{ icon: 'user', label: 'Usuario' }, { icon: 'settings', label: 'cloudshop-alb' }, { icon: 'radio', label: 'HTTP 80' }, { icon: 'target', label: 'cloudshop-web-tg' }, { icon: 'server', label: 'A / B' }]} />
        </section>

        <section className="lesson-section">
          <h3>58-59. DNS del Load Balancer</h3>
          <p>El ALB tendrá un nombre DNS, por ejemplo <code>cloudshop-alb-xxxxxxxx.region.elb.amazonaws.com</code>. Podemos utilizarlo para probar el Load Balancer — los usuarios no necesitan conocer la IP pública de EC2 A ni de EC2 B.</p>
          <Nota><p>Antes: Usuario → IP EC2. Ahora: Usuario → DNS ALB → Target disponible. Las EC2 detrás pueden cambiar sin obligar al usuario a aprender una nueva dirección.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>60-61. Hagamos las EC2 diferentes para probar</h3>
          <p>En web-a mostramos "Hola, soy servidor A" y en web-b "Hola, soy servidor B". Al refrescar varias veces podemos observar solicitudes llegando a diferentes targets, dependiendo del comportamiento del balanceador. En producción no queremos que cada servidor se identifique así — la idea del laboratorio es hacer visible algo que normalmente ocurre detrás.</p>
        </section>

        <section className="lesson-section">
          <h3>62-67. Diagnóstico: ALB funciona pero no muestra página</h3>
          <p>Revisamos en orden: ¿ALB Active? → ¿Listener correcto? → ¿Target Group correcto? → ¿Targets registrados? → ¿Targets Healthy? → ¿SG permite tráfico? → ¿Apache está funcionando? No empezamos "recreemos todo".</p>
          <QaItem question="Listener 80, Default action apunta a wrong-target-group. ¿Qué ocurre?" answer="Las solicitudes llegan al ALB, pero se dirigen al grupo equivocado." />
          <QaItem question="cloudshop-web contiene 0 targets. ¿Qué ocurre?" answer="El ALB no tiene ningún trabajador al cual entregar trabajo." />
          <QaItem question="Apache escucha 80, pero el Target Group está configurado en 8080. ¿Qué ocurre?" answer="Problemas de conectividad/Health Check — puerto y aplicación deben coincidir." />
          <QaItem question="SG-ALB permite 80, pero SG-Web no tiene entrada desde SG-ALB. ¿Qué ocurre?" answer="El usuario llega al Load Balancer, pero el Load Balancer no puede completar la conexión hacia la EC2." />
          <RoleGrid roles={[
            { icon: 'shield', label: 'SG-ALB', desc: '¿Quién puede llegar al Load Balancer?' },
            { icon: 'shield', label: 'SG-Web', desc: '¿Quién puede llegar a las EC2?' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>68. RETO DE LA CLASE</h3>
          <Nota><p>StreamCloud tiene Web A, Web B, API A y API B. Los usuarios ingresan por https://streamcloud.cl. Requisitos: /web/* → servidores Web, /api/* → servidores API.</p></Nota>
          <Reveal label="Ver la solución conceptual">
            <Flow steps={[
              { icon: 'globe', label: 'Usuarios' },
              { icon: 'settings', label: 'ALB' },
              { icon: 'radio', label: 'HTTPS 443' },
              { label: '/web/* → web-targets' },
              { label: '/api/* → api-targets' },
            ]} />
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>70-73. Retos y propuestas para rechazar</h3>
          <QaItem question="Default: Web-TG, Regla /api/* → API-TG. Usuario solicita /api/productos. ¿Dónde debería ir?" answer="API-TG." />
          <QaItem question="Usuario solicita /contacto, que no coincide con /api/*. ¿Qué ocurre?" answer="Se utiliza la acción predeterminada, por ejemplo Web-TG." />
          <Nota>
            <p>El gerente propone: "pongamos todas las EC2 web y API en un mismo Target Group y listo." No estoy de acuerdo porque perderíamos una separación clara entre servicios que atienden solicitudes distintas. Esto es lo que haría en su lugar: utilizar Target Groups separados y reglas del Listener cuando los servicios tengan funciones diferentes. El riesgo de su enfoque es enviar tráfico a servidores que no están preparados para procesarlo.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: "como el ALB escucha 443, todas las EC2 también tienen que escuchar 443." No estoy de acuerdo porque el protocolo/puerto cliente→ALB y ALB→Target pueden configurarse de forma distinta. Esto es lo que haría en su lugar: cifrar el tramo externo con HTTPS y definir conscientemente cómo se comunica el ALB con los targets. El riesgo es añadir configuración innecesaria o confundir las dos conexiones.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>74. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'Listener escucha un protocolo y puerto.', correct: true },
            { text: 'Target Group crea automáticamente EC2.', correct: false },
            { text: 'Una EC2 registrada es un Target.', correct: true },
            { text: 'Un ALB puede tener reglas.', correct: true },
            { text: 'Todos los paths tienen que ir al mismo Target Group.', correct: false },
            { text: 'Health Checks se configuran por Target Group.', correct: true },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>75. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>76. Reto oral</h3>
          <Dialogo>Explícame cómo funciona un ALB sin utilizar las palabras Load Balancer, Listener, Target Group, EC2, servidor, tráfico, usuario, HTTP, HTTPS, puerto ni AWS.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Existe un punto de entrada que recibe peticiones, aplica reglas para decidir qué tipo de trabajo representan y luego las entrega a uno de los trabajadores pertenecientes al grupo correspondiente."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>78. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>ALB</td><td>Punto de entrada y distribución</td></tr>
              <tr><td>Listener</td><td>Escucha protocolo y puerto</td></tr>
              <tr><td>Rule</td><td>Decide qué hacer</td></tr>
              <tr><td>Forward</td><td>Envía hacia Target Group</td></tr>
              <tr><td>Target Group</td><td>Agrupa destinos</td></tr>
              <tr><td>Target</td><td>Destino individual</td></tr>
              <tr><td>80</td><td>HTTP</td></tr>
              <tr><td>443</td><td>HTTPS</td></tr>
              <tr><td>/api/*</td><td>Ejemplo de routing por path</td></tr>
              <tr><td>Health Check</td><td>Revisa salud de targets</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>79. Ticket de salida</h3>
          <Dialogo>Un usuario entra a https://cloudshop.cl/api/productos. Tenemos un ALB con Listener HTTPS 443 y una regla /api/* → api-target-group. ¿Cuál es el recorrido?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>La solicitud llega al ALB por el Listener HTTPS 443, la regla detecta que la ruta comienza con /api/, ejecuta la acción de forwarding hacia api-target-group y el ALB selecciona un Target apropiado del grupo para atenderla.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 3</div>
          <Flow steps={[{ icon: 'target', label: 'web-target-group' }, { icon: 'dot-success', label: 'A' }, { icon: 'dot-warning', label: 'B' }, { icon: 'dot-danger', label: 'C' }]} />
          <p>El Listener sabe a qué grupo enviar tráfico. Pero todavía falta la pregunta más importante: ¿cómo sabe el Load Balancer cuál de esas EC2 realmente está funcionando? Porque Running no necesariamente significa que la aplicación esté funcionando. Necesitamos que el Load Balancer pregunte continuamente: "¿sigues bien?"</p>
          <ConceptBadge icon="dot-danger">Módulo 7 · Clase 3 — Health Checks: cómo detectar servidores saludables antes de enviarles usuarios</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-7/clase-3" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 3: Health Checks →
          </Link>
        </div>

      </div>
    </div>
  );
}
