import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué significa NAT?', options: [{ text: 'Network Address Translation', correct: true }, { text: 'Network AWS Transfer', correct: false }, { text: 'New Access Table', correct: false }, { text: 'Network Application Tool', correct: false }] },
  { q: '¿Para qué utilizamos principalmente NAT Gateway en esta arquitectura?', options: [{ text: 'Permitir que recursos privados inicien conexiones externas.', correct: true }, { text: 'Crear usuarios IAM.', correct: false }, { text: 'Guardar archivos.', correct: false }, { text: 'Ejecutar bases de datos.', correct: false }] },
  { q: '¿Una EC2 privada necesita una Public IP propia para utilizar un NAT Gateway?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Dónde ubicamos tradicionalmente un NAT Gateway público para acceso a Internet?', options: [{ text: 'En una subnet pública.', correct: true }, { text: 'Dentro de S3.', correct: false }, { text: 'En IAM.', correct: false }, { text: 'Dentro de EBS.', correct: false }] },
  { q: '¿Qué ruta necesita conceptualmente una Private Route Table?', options: [{ text: '0.0.0.0/0 → NAT Gateway', correct: true }, { text: '0.0.0.0/0 → IAM', correct: false }, { text: '0.0.0.0/0 → EBS', correct: false }, { text: 'Ninguna ruta local.', correct: false }] },
  { q: '¿El NAT Gateway permite que cualquier usuario de Internet inicie directamente una conexión con la EC2 privada?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Qué necesita el NAT Gateway público para salir hacia Internet en el patrón tradicional?', options: [{ text: 'Internet Gateway y ruta apropiada.', correct: true }, { text: 'S3 bucket.', correct: false }, { text: 'IAM Group.', correct: false }, { text: 'Snapshot.', correct: false }] },
  { q: '¿NAT Gateway reemplaza a Security Groups?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿NAT Gateway puede generar costos?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Los recursos privados pueden comunicarse internamente sin pasar por NAT?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
];

export default function Modulo5Clase5() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 5 · Clase 5</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 5 · Clase 5: NAT Gateway, salida a Internet desde una subnet privada</h2>
      <p className="lesson-subtitle">
        NAT Gateway permite que recursos privados salgan hacia Internet sin convertirlos en recursos públicamente accesibles.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + diseño de arquitectura + lectura de rutas + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 5 · Clases 1 a 4</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué significa NAT y para qué sirve un NAT Gateway.</li>
            <li>Diferenciar Internet Gateway y NAT Gateway.</li>
            <li>Comprender por qué un NAT Gateway público se ubica en una subnet pública.</li>
            <li>Comprender que una subnet privada puede iniciar conexiones hacia Internet mediante NAT.</li>
            <li>Entender que Internet no puede iniciar directamente conexiones hacia las instancias privadas a través del NAT Gateway.</li>
            <li>Comprender el papel de una Elastic IP en un NAT Gateway público.</li>
            <li>Interpretar una ruta 0.0.0.0/0 → NAT Gateway y el flujo Private Subnet → NAT → Internet Gateway → Internet.</li>
            <li>Reconocer consideraciones básicas de disponibilidad y costos, y detectar configuraciones incorrectas.</li>
          </ul>
          <p>La frase que debe sobrevivir será:</p>
          <Dialogo>NAT Gateway permite que recursos privados salgan hacia Internet sin convertirlos en recursos públicamente accesibles.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Recordemos nuestro problema</h3>
          <Flow steps={[{ icon: 'radio', label: 'Internet' }, { icon: 'door', label: 'Internet Gateway' }, { icon: 'globe', label: 'VPC 10.0.0.0/16' }, { icon: 'building', label: 'Public Subnet — Web' }, { icon: 'lock', label: 'Private Subnet — App' }]} />
          <p>El servidor web necesita Internet. La aplicación privada no queremos exponerla directamente, pero necesita hacer algo.</p>
        </section>

        <section className="lesson-section">
          <h3>3. Nuestra aplicación privada necesita actualizaciones</h3>
          <Nota><p>App privada necesita instalar paquetes, descargar actualizaciones y consultar una API externa. Pero nuestra Private Subnet no tiene <code>0.0.0.0/0 → Internet Gateway</code>.</p></Nota>
          <Dialogo>¿Cómo sale a Internet sin volverla pública?</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>4. Aquí aparece NAT Gateway</h3>
          <Dialogo>NAT significa Network Address Translation. Permite que un dispositivo salga utilizando otra dirección para representar esa comunicación.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>5. Analogía de la recepción del edificio</h3>
          <Nota><p>Empleados pueden llamar hacia afuera, pero las llamadas externas no llegan directamente al escritorio de cada persona — pasan por recepción.</p></Nota>
          <Flow steps={[{ icon: 'server', label: 'EC2 privada' }, { icon: 'door', label: 'NAT Gateway' }, { icon: 'radio', label: 'Internet' }]} />
          <p>El recurso privado inicia la comunicación; el NAT Gateway actúa como intermediario.</p>
        </section>

        <section className="lesson-section">
          <h3>6. La dirección del inicio importa</h3>
          <Nota><p>El escenario típico: privado → inicia conexión → NAT → Internet. AWS señala que servicios externos no pueden iniciar conexiones no solicitadas hacia esas instancias mediante el NAT Gateway.</p></Nota>
          <p>Analogía del pedido online: hacemos un pedido y la tienda responde a la conversación que nosotros iniciamos, pero una persona desconocida no obtiene automáticamente acceso libre a nuestra casa.</p>
        </section>

        <section className="lesson-section">
          <h3>7. ¿Dónde ponemos el NAT Gateway?</h3>
          <Dialogo>Para permitir salida hacia Internet mediante un NAT Gateway público, tradicionalmente lo ubicamos en una subnet pública, y esa subnet tiene una ruta hacia el Internet Gateway.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>8. Route Tables pública y privada</h3>
          <pre className="codeblock">{`Public Route Table
10.0.0.0/16      local
0.0.0.0/0        Internet Gateway

Private Route Table
10.0.0.0/16      local
0.0.0.0/0        NAT Gateway`}</pre>
          <Nota><p>AWS documenta precisamente este patrón: para que recursos de una subnet privada accedan a Internet, su ruta IPv4 general puede apuntar al NAT Gateway. Compare las dos rutas — esa diferencia es fundamental.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>9. Flujo completo de salida</h3>
          <Flow steps={[
            { icon: 'server', label: 'EC2 privada — 10.0.2.20' },
            { icon: 'refresh', label: 'Private Route Table — 0.0.0.0/0 → NAT' },
            { icon: 'door', label: 'NAT Gateway' },
            { icon: 'refresh', label: 'Public Route Table' },
            { icon: 'door', label: 'Internet Gateway' },
            { icon: 'radio', label: 'Internet' },
          ]} />
          <p>Y la respuesta vuelve por el mismo camino en sentido inverso: el NAT mantiene información suficiente para traducir la respuesta hacia el origen correspondiente.</p>
        </section>

        <section className="lesson-section">
          <h3>10. ¿La EC2 privada necesita IP pública?</h3>
          <Nota><p>No. Ese es precisamente uno de los puntos. Nuestra instancia puede tener solo Private IP (10.0.2.20), sin Public IP, y utilizar NAT Gateway para iniciar conexiones externas.</p></Nota>
          <p>NAT no entrega una Public IP a la instancia — la instancia sigue utilizando su dirección privada. NAT se encarga de la traducción para las conexiones que pasan por él.</p>
        </section>

        <section className="lesson-section">
          <h3>11. Elastic IP del NAT Gateway</h3>
          <Nota><p>Un NAT Gateway público requiere una dirección pública asociada. En el diseño tradicional por AZ, se asocia una Elastic IP al NAT Gateway público durante su creación.</p></Nota>
          <Dialogo>La Elastic IP es una dirección pública estable que puede representar al NAT Gateway frente a Internet.</Dialogo>
          <Nota><p>Elastic IP no significa que la EC2 privada sea pública. La dirección pública pertenece al NAT Gateway, no a cada instancia privada.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>12. Internet Gateway vs NAT Gateway</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th></th><th>Internet Gateway</th><th>NAT Gateway</th></tr></thead>
            <tbody>
              <tr><td>Función</td><td>Conecta VPC con Internet</td><td>Traduce conexiones y facilita salida desde recursos privados</td></tr>
              <tr><td>Entrada directa a EC2 pública</td><td>Puede formar parte del camino</td><td>No sirve para iniciar conexiones no solicitadas hacia EC2 privada</td></tr>
              <tr><td>Ruta</td><td>0.0.0.0/0 → IGW</td><td>0.0.0.0/0 → NAT</td></tr>
            </tbody>
          </table>
          <RoleGrid roles={[
            { icon: 'door', label: 'Internet Gateway', desc: '¿Cómo conectamos la VPC con Internet?' },
            { icon: 'door', label: 'NAT Gateway', desc: '¿Cómo permitimos que recursos privados inicien conexiones externas sin exponerlos?' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>13. Casos de uso</h3>
          <p>Instalar software: App privada → NAT → Repositorio (responde, la EC2 recibe los paquetes). Consumir una API: App → NAT → api.ejemplo.com, sin necesitar una dirección IPv4 pública propia. Servidor interno que necesita actualizaciones y consulta servicios externos, pero no atiende usuarios de Internet — un buen ejemplo de recurso privado con salida mediante NAT.</p>
        </section>

        <section className="lesson-section">
          <h3>14. NAT Gateway no reemplaza Security Groups ni Route Table</h3>
          <ConceptBadge icon="target">Dirección + Route Table + NAT/IGW + Security Group = Comunicación según diseño. Ninguna pieza reemplaza automáticamente a las demás.</ConceptBadge>
          <Nota><p>Podemos crear un NAT Gateway, pero si la subnet privada sigue teniendo solo <code>10.0.0.0/16 → local</code>, la instancia no sabe enviar tráfico de Internet hacia el NAT. Necesitamos <code>0.0.0.0/0 → NAT Gateway</code> — como una salida especial sin ningún cartel "SALIDA →" instalado.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>15. ¿Por qué el NAT está en una subnet pública?</h3>
          <Nota><p>Colocar el NAT Gateway en una subnet privada no resolvería el objetivo, porque el propio NAT necesita conectividad hacia el Internet Gateway mediante una subnet pública.</p></Nota>
          <Flow steps={[{ icon: 'lock', label: 'Private Subnet' }, { icon: 'door', label: 'NAT' }, { icon: 'building', label: 'Public Subnet' }, { icon: 'door', label: 'IGW' }, { icon: 'radio', label: 'Internet' }]} />
        </section>

        <section className="lesson-section">
          <h3>16. NAT Gateway puede generar costos</h3>
          <Nota><p>Los NAT Gateways administrados tienen costos asociados, incluyendo componentes de uso/procesamiento de datos según el modelo vigente. No creamos NAT Gateways "por si acaso" — revisamos siempre el precio actual.</p></Nota>
          <p>10 GB de tráfico no es el mismo escenario que 10 TB. AWS documenta alternativas como VPC Endpoints para determinados servicios (por ejemplo S3) a fin de evitar enviar cierto tráfico innecesariamente por un NAT Gateway — eso queda para una etapa posterior.</p>
        </section>

        <section className="lesson-section">
          <h3>17. No todo tráfico pasa por NAT</h3>
          <Nota><p>Si existe una ruta más específica, AWS la usa. Con <code>10.0.0.0/16 → local</code> y <code>0.0.0.0/0 → NAT</code>, tráfico hacia 10.0.1.25 usa local, no NAT. Comunicación interna (App → DB dentro de la VPC) no necesita NAT Gateway.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>18. Alta disponibilidad</h3>
          <Nota><p>En arquitecturas distribuidas entre varias AZ, debemos considerar la disponibilidad del camino NAT y evitar dependencias innecesarias entre zonas. Un patrón clásico es NAT por AZ, para que cada subnet privada utilice un NAT en su propia AZ.</p></Nota>
          <Flow steps={[
            { icon: 'building', label: 'AZ A — Public A → NAT A → Private A → App A' },
            { icon: 'building', label: 'AZ B — Public B → NAT B → Private B → App B' },
          ]} />
          <p>Pero más disponibilidad puede costar más: dos NAT Gateways mejoran ciertas características de disponibilidad, con mayor costo potencial. Volvemos al principio Cloud: arquitectura adecuada, no arquitectura máxima.</p>
        </section>

        <section className="lesson-section">
          <h3>19. Actividad: IGW o NAT</h3>
          <QaItem question="Conectar VPC e Internet." answer="IGW." />
          <QaItem question="Permitir salida de una instancia privada sin Public IP." answer="NAT." />
          <QaItem question="La subnet pública tiene 0.0.0.0/0 hacia..." answer="IGW." />
          <QaItem question="La subnet privada tiene 0.0.0.0/0 hacia..." answer="NAT." />
        </section>

        <section className="lesson-section">
          <h3>20. Actividad: ¿qué ruta falta?</h3>
          <Nota><p>Private Subnet 10.0.2.0/24, Route Table solo <code>10.0.0.0/16 → local</code>, NAT Gateway existe. Pero EC2 privada no puede salir a Internet.</p></Nota>
          <QaItem question="¿Qué falta?" answer="0.0.0.0/0 → NAT Gateway" />
          <QaItem question={'Private Route Table tiene 0.0.0.0/0 → Internet Gateway. ¿Qué ocurrió con nuestra subnet privada?'} answer="Tiene una ruta directa hacia el IGW. Conceptualmente ya no sigue el diseño privado que queríamos para Internet IPv4." />
        </section>

        <section className="lesson-section">
          <h3>21. Diseñemos CloudShop</h3>
          <Nota><p>VPC 10.0.0.0/16, Public 10.0.1.0/24, Private 10.0.2.0/24. Necesitamos web pública, app privada que necesita actualizaciones.</p></Nota>
          <Reveal label="Ver solución conceptual">
            <Flow steps={[
              { icon: 'radio', label: 'Internet' },
              { icon: 'door', label: 'Internet Gateway' },
              { icon: 'building', label: 'Public Subnet — Web + NAT Gateway' },
              { icon: 'lock', label: 'Private Subnet — App' },
            ]} />
            <pre className="codeblock">{`Public RT:  10.0.0.0/16 → local, 0.0.0.0/0 → Internet Gateway
Private RT: 10.0.0.0/16 → local, 0.0.0.0/0 → NAT Gateway`}</pre>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>22. Sigamos un paquete</h3>
          <p>App (10.0.2.20) quiere llegar a 8.8.8.8: mira su ruta (0.0.0.0/0 → NAT), llega al NAT Gateway, el NAT traduce, sale por el Internet Gateway, y la respuesta regresa mediante el flujo correspondiente.</p>
        </section>

        <section className="lesson-section">
          <h3>23. Desde Internet intentan iniciar una conexión</h3>
          <QaItem question="Un atacante intenta conectarse directamente a la EC2 privada (sin Public IP, usando NAT para salida). ¿Puede?" answer="No. El NAT Gateway no está diseñado para permitir conexiones entrantes no solicitadas hacia esa instancia." />
          <ConceptBadge icon="check-circle">Necesita Internet ≠ necesita ser pública</ConceptBadge>
          <p>Un recurso puede consumir servicios externos sin convertirse en un endpoint público.</p>
        </section>

        <section className="lesson-section">
          <h3>24. Dos propuestas equivocadas</h3>
          <Dialogo>"La instancia privada necesita actualizar Linux. Pongámosle Public IP." — Pedro</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque estamos modificando su exposición para resolver solamente una necesidad de salida. Esto es lo que haría en su lugar: utilizar un mecanismo de egress apropiado, como NAT cuando corresponde. El riesgo de su enfoque es exponer directamente un recurso que no necesita conexiones entrantes desde Internet.</p>
          </Nota>
          <Dialogo>"Entonces pongamos también el servidor web detrás del NAT para que clientes entren." — el gerente</Dialogo>
          <Nota><p>NAT Gateway no es el componente que utilizamos para recibir conexiones públicas no solicitadas hacia instancias privadas. Para un servicio web público necesitaremos una arquitectura de entrada apropiada.</p></Nota>
          <ConceptBadge icon="x-circle">NAT Gateway = salida controlada. No = publicar mi aplicación</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>25. Pregunta de costos: ¿un NAT por instancia?</h3>
          <QaItem question="Tenemos 20 instancias privadas. ¿Necesitamos 20 NAT Gateways?" answer="No. Un NAT Gateway puede ser utilizado por múltiples recursos mediante sus rutas, sujeto al diseño y capacidad correspondientes. Pensamos a nivel de subnet/ruta, no instalamos un NAT Gateway dentro de cada servidor." />
        </section>

        <section className="lesson-section">
          <h3>26. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>27. Reto de la clase</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge icon="trophy">ClínicaCloud</ConceptBadge>
          <p>VPC 10.20.0.0/16 con Public Subnet 10.20.1.0/24 y Private Subnet 10.20.2.0/24 conteniendo <code>servidor-aplicacion</code>, que debe descargar actualizaciones y consultar una API externa, pero no debe recibir conexiones directas desde Internet.</p>
          <QaItem question="¿Qué componente evaluamos?" answer="NAT Gateway." />
        </section>

        <section className="lesson-section">
          <h3>28. Retos nivel 2, 3 y de diagnóstico</h3>
          <QaItem question="NAT Gateway existe, Public RT tiene 0.0.0.0/0 → IGW, Private RT solo local. La app privada no accede a Internet. ¿Qué falta?" answer="La ruta 0.0.0.0/0 → NAT Gateway en la tabla correspondiente a la subnet privada." />
          <QaItem question="Private RT tiene 0.0.0.0/0 → NAT, pero el NAT está en una subnet sin ruta al IGW. ¿Funcionará?" answer="No. El NAT también necesita un camino hacia Internet en ese diseño." />
          <QaItem question="La EC2 privada puede comunicarse con la base de datos pero no puede descargar actualizaciones. ¿Está toda la VPC rota?" answer="No. La ruta local puede funcionar perfectamente mientras la ruta de salida externa está ausente o mal configurada." />
        </section>

        <section className="lesson-section">
          <h3>29. Reto oral</h3>
          <Dialogo>Explícame NAT Gateway sin usar las palabras NAT, gateway, Internet, privado, público, IP, red, ruta, salir ni dirección.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Es un intermediario que permite que sistemas internos inicien comunicación con servicios externos y reciban sus respuestas sin quedar disponibles directamente para nuevas conexiones desde afuera."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>30. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>NAT</td><td>Traducción de direcciones</td></tr>
              <tr><td>NAT Gateway</td><td>Salida para recursos privados</td></tr>
              <tr><td>Private IP</td><td>Dirección de la instancia privada</td></tr>
              <tr><td>Elastic IP</td><td>Dirección pública asociada al NAT público en el patrón tradicional</td></tr>
              <tr><td>Private RT</td><td>0.0.0.0/0 → NAT</td></tr>
              <tr><td>Public RT</td><td>0.0.0.0/0 → IGW</td></tr>
              <tr><td>IGW</td><td>Conecta la VPC con Internet</td></tr>
              <tr><td>Security Group</td><td>Sigue controlando tráfico del recurso</td></tr>
              <tr><td>Costos</td><td>NAT Gateway puede generar cargos</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>31. Ticket de salida</h3>
          <Dialogo>Una EC2 en una subnet privada necesita descargar actualizaciones, pero no debe recibir conexiones directas desde Internet. ¿Qué arquitectura utilizarías?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Mantendría la EC2 sin IP pública en una subnet privada, configuraría su ruta de salida hacia un NAT Gateway y permitiría que el NAT llegue a Internet mediante la infraestructura pública correspondiente.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 6</div>
          <Flow steps={[{ icon: 'radio', label: 'Internet' }, { icon: 'door', label: 'IGW' }, { icon: 'globe', label: 'VPC' }, { icon: 'building', label: 'Public — Web' }, { icon: 'database', label: 'Private — DB' }]} />
          <p>Ya sabemos por dónde viaja el tráfico, cómo sale, y cómo una subnet privada puede iniciar conexiones externas. Pero falta una pregunta:</p>
          <Dialogo>"¿Quién controla el tráfico a nivel del recurso y quién puede controlar el tráfico de toda una subnet?"</Dialogo>
          <p>Ya conocemos Security Group. Ahora aparecerá Network ACL — y tendremos que evitar otra confusión clásica: "son dos firewalls, así que hacen exactamente lo mismo."</p>
          <ConceptBadge icon="shield">Módulo 5 · Clase 6 — Security Groups vs Network ACLs: seguridad en dos niveles diferentes</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-5/clase-6" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 6: Security Groups vs Network ACLs →
          </Link>
        </div>

      </div>
    </div>
  );
}
