import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, Flow, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué es una red?', options: [{ text: 'Conjunto de dispositivos que pueden comunicarse.', correct: true }, { text: 'Una contraseña.', correct: false }, { text: 'Una base de datos.', correct: false }, { text: 'Una AMI.', correct: false }] },
  { q: '¿Para qué sirve una dirección IP?', options: [{ text: 'Para identificar un destino/interfaz dentro de un contexto de red.', correct: true }, { text: 'Para crear usuarios.', correct: false }, { text: 'Para guardar archivos.', correct: false }, { text: 'Para aumentar RAM.', correct: false }] },
  { q: '¿Qué es Internet?', options: [{ text: 'Una enorme red de redes.', correct: true }, { text: 'Un servidor único.', correct: false }, { text: 'Una Región AWS.', correct: false }, { text: 'Un sistema operativo.', correct: false }] },
  { q: '¿Qué caracteriza conceptualmente a una IP privada?', options: [{ text: 'Se utiliza en redes privadas y no se enruta directamente por Internet público.', correct: true }, { text: 'Es siempre pública.', correct: false }, { text: 'Es una contraseña.', correct: false }, { text: 'Es un puerto.', correct: false }] },
  { q: '¿Qué caracteriza a una IP pública?', options: [{ text: 'Puede utilizarse para comunicación a través de Internet público según la arquitectura.', correct: true }, { text: 'Solo funciona en una casa.', correct: false }, { text: 'Es igual a IAM.', correct: false }, { text: 'Es un volumen EBS.', correct: false }] },
  { q: '¿Tener IP pública significa acceso total?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Qué ayuda a dirigir información entre redes?', options: [{ text: 'Router.', correct: true }, { text: 'Bucket.', correct: false }, { text: 'Snapshot.', correct: false }, { text: 'AMI.', correct: false }] },
  { q: '¿Wi-Fi e Internet son exactamente lo mismo?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Una red privada puede funcionar aunque no tenga salida a Internet?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿IP e IAM resuelven el mismo problema?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
];

export default function Modulo5Clase1() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 5 · Clase 1</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 5 · Clase 1: ¿Qué es una red? IP pública, IP privada y cómo viaja la información</h2>
      <p className="lesson-subtitle">
        Una red permite que distintos dispositivos se comuniquen e intercambien información. Cero AWS todavía: empezamos en casa.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial absoluto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + analogías + actividades + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulos 0 a 4</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es una red y por qué los dispositivos necesitan comunicarse.</li>
            <li>Explicar qué es una dirección IP de manera sencilla.</li>
            <li>Diferenciar IP pública e IP privada.</li>
            <li>Comprender el papel básico de un router.</li>
            <li>Entender que Internet está formado por muchas redes conectadas.</li>
            <li>Comprender conceptualmente cómo viaja una solicitud desde un dispositivo hasta otro sistema.</li>
            <li>Reconocer que tener una IP pública no significa automáticamente que todo esté permitido.</li>
          </ul>
          <p>La frase que debe sobrevivir será:</p>
          <Dialogo>Una red permite que distintos dispositivos se comuniquen e intercambien información.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Empecemos en casa</h3>
          <Nota><p>Antes de mencionar AWS, imaginemos una casa con teléfono, notebook, Smart TV, consola e impresora, todos conectados al mismo Wi-Fi.</p></Nota>
          <QaItem question="¿Qué tienen en común?" answer="Están conectados a una red." />
        </section>

        <section className="lesson-section">
          <h3>3. ¿Qué es una red?</h3>
          <Dialogo>Una red es un grupo de dispositivos conectados para poder intercambiar información.</Dialogo>
          <p>También encontramos redes en universidades, hospitales, bancos, empresas, fábricas y centros de datos. La escala cambia; la idea sigue siendo dispositivos que necesitan comunicarse.</p>
        </section>

        <section className="lesson-section">
          <h3>4. ¿Por qué necesitamos una red?</h3>
          <Nota><p>Sin red, Camila tendría que caminar con un pendrive hasta el escritorio de Pedro para compartir un documento. Con una red, simplemente lo envía. Mucho más práctico.</p></Nota>
          <p>Por ejemplo: compartir información, utilizar impresoras, navegar por Internet, enviar mensajes, ver videos, acceder a sistemas, conectarnos con servicios Cloud.</p>
        </section>

        <section className="lesson-section">
          <h3>5. Pero aparece un problema</h3>
          <Nota><p>Si quiero enviar información a "la impresora" específicamente, ¿cómo sabe la red cuál dispositivo es? Necesitamos alguna forma de identificarlo.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>6. Analogía de las direcciones</h3>
          <p>Si queremos entregar una carta, no basta escribir "entregar en una casa de Chile". Necesitamos una dirección.</p>
        </section>

        <section className="lesson-section">
          <h3>7. Dirección IP</h3>
          <Dialogo>Una dirección IP identifica un dispositivo o interfaz dentro de un contexto de red para poder enviar información hacia él.</Dialogo>
          <p>Ejemplo: <code>192.168.1.25</code>. No necesitamos entender todavía cada número — solo que es una dirección utilizada dentro de una red.</p>
        </section>

        <section className="lesson-section">
          <h3>8. Analogía del edificio</h3>
          <p>"Edificio Central, Departamento 25": el edificio nos ayuda a encontrar la ubicación general; el departamento, el destino concreto. En redes tendremos también mecanismos para identificar redes y dispositivos dentro de ellas.</p>
        </section>

        <section className="lesson-section">
          <h3>9. No todos pueden tener la misma dirección</h3>
          <Nota><p>Dentro del mismo contexto de red, dos dispositivos no deberían usar simultáneamente la misma dirección IP si eso provoca conflicto de direccionamiento — como dos casas usando exactamente "Calle Cloud 123".</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>10. El router</h3>
          <Flow steps={[{ icon: 'smartphone', label: 'Teléfono' }, { icon: 'server', label: 'Notebook' }, { icon: 'radio', label: 'Router' }, { icon: 'globe', label: 'Internet' }]} />
          <Dialogo>Un router ayuda a dirigir información entre redes. Es como un encargado de tránsito que sabe por dónde enviar la información.</Dialogo>
          <p>No entraremos todavía en tablas de rutas — eso llegará en la Clase 4.</p>
        </section>

        <section className="lesson-section">
          <h3>11. ¿Qué es lo que viaja?</h3>
          <p>Cuando enviamos información por una red, los datos se transmiten en unidades estructuradas. No necesitamos estudiar profundamente paquetes y protocolos: solo imaginamos datos que viajan desde un origen hacia un destino, como un paquete postal con remitente y destinatario.</p>
        </section>

        <section className="lesson-section">
          <h3>12. ¿Qué es Internet?</h3>
          <Dialogo>Internet no es una nube mágica flotando sobre nuestras cabezas. Es una enorme red de redes interconectadas.</Dialogo>
          <p>Nuestra casa (red doméstica) se conecta mediante nuestro proveedor a Internet, y desde allí podemos llegar a otras redes y servicios.</p>
        </section>

        <section className="lesson-section">
          <h3>13. Ejemplo cotidiano: cómo viaja una solicitud</h3>
          <Flow steps={[
            { icon: 'server', label: 'Notebook' },
            { icon: 'radio', label: 'Router' },
            { icon: 'globe', label: 'Internet' },
            { icon: 'server', label: 'Servidor' },
          ]} />
          <p>Luego la respuesta regresa por el mismo camino en sentido inverso. Ya vimos esto en módulos anteriores; ahora estamos abriendo la caja negra que estaba en medio.</p>
        </section>

        <section className="lesson-section">
          <h3>14. IP privada</h3>
          <Dialogo>Una IP privada identifica un dispositivo dentro de una red privada y no está diseñada para ser enrutada directamente por Internet público.</Dialogo>
          <p>Ejemplos de rangos privados IPv4: <code>10.x.x.x</code>, <code>172.16.x.x - 172.31.x.x</code>, <code>192.168.x.x</code>. No necesitamos memorizarlos hoy.</p>
          <p>Analogía: una empresa tiene un número público (+56 2 1234 5678), pero internamente Camila usa el anexo 201, Pedro el 202. El anexo sirve dentro de la organización.</p>
        </section>

        <section className="lesson-section">
          <h3>15. IP pública</h3>
          <Dialogo>Una IP pública es una dirección que puede utilizarse para comunicación a través de Internet público cuando la arquitectura y controles correspondientes lo permiten.</Dialogo>
          <table className="table lesson-summary-table">
            <thead><tr><th>Dirección</th><th>Idea</th></tr></thead>
            <tbody>
              <tr><td>IP privada</td><td>Comunicación dentro de redes privadas</td></tr>
              <tr><td>IP pública</td><td>Comunicación mediante Internet público según arquitectura</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>16. Tener IP pública NO significa que todo esté abierto</h3>
          <Nota><p>Tenemos IP pública, pero además puede existir firewall, puertos y rutas. Dirección y permiso son cosas diferentes — conocer nuestra dirección no significa que alguien pueda abrir nuestra puerta.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>17. Esto conecta con Security Groups</h3>
          <Flow steps={[{ icon: 'globe', label: 'IP pública' }, { icon: 'shield', label: 'Security Group' }, { icon: 'server', label: 'EC2' }]} />
          <p>La IP ayuda a localizar. El Security Group controla el tráfico permitido. Ya conocemos los puertos 22 (SSH), 80 (HTTP) y 443 (HTTPS): dirección + servicio al que queremos llegar.</p>
        </section>

        <section className="lesson-section">
          <h3>18. IP no es lo mismo que URL</h3>
          <p><code>203.0.113.20</code> puede ser una IP; <code>www.cloudshop.cl</code> es un nombre. Los humanos preferimos nombres; los sistemas de red utilizan direcciones. Más adelante podremos estudiar DNS, que ayuda a relacionarlos — pero no hoy.</p>
        </section>

        <section className="lesson-section">
          <h3>19. ¿Por qué crear redes privadas?</h3>
          <Nota><p>Porque no queremos que todo sistema esté expuesto directamente a todo el mundo. Los clientes necesitan acceder al sitio web, pero probablemente no necesitan conectarse directamente a la base de datos.</p></Nota>
          <p>Analogía del restaurante: los clientes pueden entrar al comedor, pero no a la cocina, la bodega ni la oficina. Una red bien diseñada también separa áreas según su función.</p>
        </section>

        <section className="lesson-section">
          <h3>20. Primera semilla de VPC</h3>
          <Flow steps={[{ icon: 'globe', label: 'Red' }, { icon: 'radio', label: 'Área pública' }, { icon: 'lock', label: 'Área privada' }]} />
          <p>Todavía no hablamos de subnets. Solo entendemos que una red puede dividirse en zonas con diferentes propósitos.</p>
        </section>

        <section className="lesson-section">
          <h3>21. Dirección no significa identidad</h3>
          <Nota><p>IP = dirección de red, no IP = persona. Una dirección IP puede cambiar, compartirse mediante mecanismos de red o representar una interfaz concreta. No la usamos como prueba absoluta de identidad.</p></Nota>
          <p>Y tampoco reemplaza IAM: IAM pregunta "¿quién está autorizado para realizar acciones AWS?"; la red pregunta "¿desde dónde y hacia dónde puede existir comunicación?". Son problemas distintos.</p>
        </section>

        <section className="lesson-section">
          <h3>22. Internet no es lo mismo que Wi-Fi</h3>
          <QaItem question="Si mi Wi-Fi funciona, ¿significa que tengo Internet?" answer="No necesariamente. Podemos estar conectados a Wi-Fi pero perder la salida a Internet, y todavía comunicarnos con dispositivos locales como una impresora." />
          <p>Esta diferencia será importante en AWS: más adelante tendremos recursos que pueden comunicarse dentro de una VPC pero no tener salida directa a Internet — y eso no significa que la red esté rota, puede ser exactamente el diseño que queremos.</p>
        </section>

        <section className="lesson-section">
          <h3>23. Actividad: red o no red</h3>
          <QaItem question="Cinco computadores conectados en una oficina." answer="Red." />
          <QaItem question="Un notebook sin conexión con ningún otro dispositivo." answer="No representa por sí solo una red." />
          <QaItem question="Internet." answer="Una enorme red de redes." />
        </section>

        <section className="lesson-section">
          <h3>24. Actividad: pública o privada</h3>
          <QaItem question="192.168.1.20" answer="Probablemente una IP privada." />
          <QaItem question="Dirección utilizada públicamente por un servidor accesible desde Internet." answer="IP pública." />
          <Nota><p>No enseñamos "si empieza con 192 siempre es privada" — solo determinados rangos están reservados para uso privado, y los aprenderemos gradualmente.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>25. Actividad: CloudShop</h3>
          <Nota><p>Camila necesita visitar la web; la web necesita consultar la base de datos; un visitante de Internet no debería conectarse directamente a la base de datos.</p></Nota>
          <QaItem question="¿Todos deberían estar en el mismo nivel de exposición?" answer="No. La web accesible desde fuera; la base de datos protegida internamente." />
        </section>

        <section className="lesson-section">
          <h3>26. El jefe tiene una idea</h3>
          <Dialogo>"Si el servidor tiene IP pública, entonces cualquiera puede entrar. Mejor nunca usemos IP públicas."</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque una IP pública solo aporta direccionamiento público, mientras el acceso también depende de reglas y arquitectura. Esto es lo que haría en su lugar: decidir qué recursos necesitan exposición pública y protegerlos con controles adecuados. El riesgo de su enfoque es impedir servicios legítimamente públicos por confundir dirección con autorización.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>27. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>28. Reto de la clase</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge icon="trophy">Clínica Cloud</ConceptBadge>
          <p>Pacientes deben acceder al portal web; médicos deben usar sistemas internos autorizados; la base de datos no debe recibir conexiones directas desde cualquier persona en Internet.</p>
          <QaItem question="¿Todos los sistemas deberían estar expuestos públicamente?" answer="No." />
          <Reveal label="Ver solución conceptual">
            <Flow steps={[{ icon: 'radio', label: 'Internet' }, { icon: 'globe', label: 'Portal Web' }, { icon: 'lock', label: 'Red interna' }, { icon: 'database', label: 'Base de datos' }]} />
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>29. Reto nivel 2 y de diagnóstico</h3>
          <QaItem question='CloudShop: el gerente propone "pongamos IP pública a la web y a la base de datos para que sea más fácil". ¿Correcto?' answer="No estoy de acuerdo porque la base de datos no necesita necesariamente exposición directa a Internet. Esto es lo que haría en su lugar: mantener públicamente accesible solo el componente que lo requiere y proteger los componentes internos. El riesgo de su enfoque es ampliar innecesariamente la superficie de ataque." />
          <QaItem question="Un notebook con IP privada correcta y Wi-Fi conectado puede imprimir, pero no puede abrir sitios web. ¿La red local está completamente caída?" answer="No. La comunicación local funciona. El problema puede estar en la conectividad hacia Internet u otro componente." />
        </section>

        <section className="lesson-section">
          <h3>30. Reto oral</h3>
          <Dialogo>Explícame qué es una red sin utilizar las palabras red, Internet, Wi-Fi, conectar, dispositivo, IP, dirección, comunicación ni datos.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Es un sistema que permite que distintos equipos se encuentren y puedan intercambiar información siguiendo caminos y reglas."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>31. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Red</td><td>Dispositivos que pueden comunicarse</td></tr>
              <tr><td>Dirección IP</td><td>Identifica un destino/interfaz en una red</td></tr>
              <tr><td>IP privada</td><td>Se utiliza dentro de redes privadas</td></tr>
              <tr><td>IP pública</td><td>Puede participar en comunicación por Internet</td></tr>
              <tr><td>Router</td><td>Dirige tráfico entre redes</td></tr>
              <tr><td>Internet</td><td>Red de redes</td></tr>
              <tr><td>Puerto</td><td>Identifica servicios dentro de un sistema</td></tr>
              <tr><td>Seguridad</td><td>Decide qué tráfico está permitido</td></tr>
              <tr><td>IAM</td><td>Controla identidades y acciones AWS</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>32. Ticket de salida</h3>
          <Dialogo>¿Cuál es la diferencia entre tener una dirección pública y tener permiso para entrar a un sistema?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>La dirección permite localizar el sistema, mientras los controles de seguridad determinan qué comunicaciones están permitidas.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 2</div>
          <Dialogo>"Si en nuestra casa tenemos una red privada para nuestros dispositivos, ¿podemos crear algo parecido dentro de AWS?"</Dialogo>
          <p>Sí. Podemos crear una red virtual y decidir qué rango de direcciones tendrá, qué recursos vivirán dentro, cómo queremos aislarla y cómo la dividiremos posteriormente.</p>
          <ConceptBadge icon="building">Módulo 5 · Clase 2 — ¿Qué es Amazon VPC? Nuestra red privada dentro de AWS</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-5/clase-2" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 2: ¿Qué es Amazon VPC? →
          </Link>
        </div>

      </div>
    </div>
  );
}
