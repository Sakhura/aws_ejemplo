import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué es escalado vertical?', options: [{ text: 'Aumentar capacidad de una máquina.', correct: true }, { text: 'Agregar más máquinas.', correct: false }, { text: 'Crear una subnet.', correct: false }, { text: 'Crear un backup.', correct: false }] },
  { q: '¿Qué es escalado horizontal?', options: [{ text: 'Agregar más máquinas.', correct: true }, { text: 'Aumentar RAM de una sola máquina.', correct: false }, { text: 'Crear RDS.', correct: false }, { text: 'Crear IAM.', correct: false }] },
  { q: '¿Qué es un Single Point of Failure?', options: [{ text: 'Un componente cuya falla puede detener el servicio.', correct: true }, { text: 'Un Security Group.', correct: false }, { text: 'Una AMI.', correct: false }, { text: 'Un backup.', correct: false }] },
  { q: '¿Qué hace un Load Balancer?', options: [{ text: 'Distribuye solicitudes entre destinos.', correct: true }, { text: 'Guarda información.', correct: false }, { text: 'Crea bases de datos.', correct: false }, { text: 'Administra usuarios.', correct: false }] },
  { q: '¿El Load Balancer crea nuevas EC2?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Qué servicio ajustará más adelante la cantidad de EC2?', options: [{ text: 'Auto Scaling.', correct: true }, { text: 'S3.', correct: false }, { text: 'RDS.', correct: false }, { text: 'IAM.', correct: false }] },
  { q: '¿Por qué usamos varias AZ?', options: [{ text: 'Para reducir dependencia de una única zona.', correct: true }, { text: 'Para crear usuarios.', correct: false }, { text: 'Para guardar videos.', correct: false }, { text: 'Para aumentar el tamaño de S3.', correct: false }] },
  { q: '¿Una EC2 Running garantiza que la aplicación esté sana?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Qué concepto utilizaremos para saber si una instancia responde correctamente?', options: [{ text: 'Health Check.', correct: true }, { text: 'Snapshot.', correct: false }, { text: 'IAM Role.', correct: false }, { text: 'NAT.', correct: false }] },
  { q: '¿Los usuarios deberían elegir manualmente qué servidor usar?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
];

export default function Modulo7Clase1() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 7 · Clase 1</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 7 · Clase 1: ¿Qué es Elastic Load Balancing? De una sola caja a múltiples servidores</h2>
      <p className="lesson-subtitle">
        Un Load Balancer recibe solicitudes y las distribuye entre varios servidores disponibles.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + analogías + arquitectura + actividades + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulos anteriores sobre EC2 y VPC</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Comprender qué problema aparece cuando dependemos de una sola EC2.</li>
            <li>Reconocer qué es un punto único de falla.</li>
            <li>Comprender qué significa escalar una aplicación y diferenciar escalado vertical y horizontal.</li>
            <li>Explicar qué es un Load Balancer y comprender para qué sirve Elastic Load Balancing.</li>
            <li>Entender por qué los usuarios no deberían tener que elegir entre servidores.</li>
            <li>Comprender que Load Balancing no crea nuevas EC2.</li>
            <li>Relacionar Load Balancing con disponibilidad.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2. Volvemos a CloudShop</h3>
          <Flow steps={[{ icon: 'globe', label: 'Usuarios' }, { icon: 'server', label: 'EC2' }, { icon: 'database', label: 'RDS' }]} />
          <p>Todo parece perfecto. La página funciona. Los clientes compran. Hasta que CloudShop se vuelve popular.</p>
        </section>

        <section className="lesson-section">
          <h3>3-4. La instancia se satura</h3>
          <Nota><p>Al comienzo la EC2 responde tranquilamente. Después llegan diez veces más usuarios y la EC2 empieza a sufrir: CPU 95%, memoria alta, muchas solicitudes. Los usuarios notan página lenta, respuestas tardías y errores.</p></Nota>
          <QaItem question="¿Qué hacemos cuando una sola máquina ya no alcanza?" answer="Existen dos estrategias: escalado vertical (una máquina más potente) y escalado horizontal (más máquinas)." />
        </section>

        <section className="lesson-section">
          <h3>5-6. Analogía del supermercado y escalado vertical</h3>
          <Dialogo>Un supermercado con una sola caja funciona perfecto con dos clientes, pero con cincuenta tenemos una fila kilométrica. La primera opción: hacer la caja más potente — cambiar un cajero pequeño por uno más rápido. En Cloud eso es pasar de una EC2 pequeña a una más potente. Eso se llama escalado vertical.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>7-8. ¿Qué es escalado vertical?</h3>
          <p>Aumentar la capacidad de una sola máquina: por ejemplo de 2 GB RAM a 8 GB, o de 2 vCPU a 8 vCPU. Seguimos teniendo una sola máquina.</p>
          <Dialogo>Un solo cajero que ahora cobra cuatro veces más rápido mejora la capacidad, pero seguimos dependiendo de una persona. Si se enferma, problema.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>9-11. Punto único de falla</h3>
          <Nota><p>Nuestra EC2 puede ser enorme, pero si falla, los usuarios ya no llegan a nada. Esto se llama <strong>punto único de falla</strong>.</p></Nota>
          <ConceptBadge icon="alert-triangle">Single Point of Failure (SPOF): un componente cuya falla puede detener una parte importante o completa del servicio</ConceptBadge>
          <InfoBox title="Ejemplos cotidianos" items={['Casa con una sola llave — la pierdes, problema.', 'Empresa con un único enlace de Internet — se corta, problema.', 'Aplicación con una sola EC2 — falla, problema.']} />
        </section>

        <section className="lesson-section">
          <h3>12-15. Escalado horizontal</h3>
          <p>En lugar de hacer una EC2 enorme, podemos tener varias EC2. Esto se llama <strong>escalado horizontal</strong>: agregar más máquinas para compartir el trabajo. Más capacidad total y menos dependencia de una sola instancia.</p>
          <RoleGrid roles={[
            { icon: 'zap', label: 'Vertical', desc: 'Máquina más potente' },
            { icon: 'users', label: 'Horizontal', desc: 'Más máquinas' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>16-18. Horizontal trae una nueva pregunta</h3>
          <Nota><p>Con tres servidores (A, B, C) llega Ana. ¿A cuál se conecta? Después Pedro. ¿A cuál? Después llegan 10.000 usuarios.</p></Nota>
          <p>Sería absurdo mostrarle al usuario un menú "Seleccione servidor: [A] [B] [C]". El usuario no debería preocuparse de nuestra infraestructura. Necesitamos un intermediario.</p>
        </section>

        <section className="lesson-section">
          <h3>19-20. Aparece el Load Balancer</h3>
          <ConceptBadge icon="settings">Load Balancer: componente que recibe solicitudes y las distribuye entre varios servidores disponibles</ConceptBadge>
          <Flow steps={[{ icon: 'globe', label: 'Usuarios' }, { icon: 'settings', label: 'Load Balancer' }, { icon: 'server', label: 'A / B / C' }]} />
          <Dialogo>En el supermercado ponemos a alguien frente a las cajas: la coordinadora recibe clientes y los envía hacia cajas disponibles. Ese es el concepto central.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>21-22. Elastic Load Balancing</h3>
          <p>AWS ofrece Elastic Load Balancing (ELB) como servicio administrado para distribuir tráfico entre múltiples destinos: instancias EC2, direcciones IP, contenedores u otros recursos compatibles, según el tipo de Load Balancer. ELB es el servicio; dentro de él encontramos distintos tipos de Load Balancer. En este curso nos concentraremos principalmente en el <strong>Application Load Balancer</strong>.</p>
        </section>

        <section className="lesson-section">
          <h3>23-25. Elastic Load Balancing no es Auto Scaling</h3>
          <Nota><p>Este error debe morir aquí. Load Balancer distribuye tráfico. Auto Scaling aumenta o disminuye instancias. No hacen lo mismo.</p></Nota>
          <p>Con tres EC2 (A, B, C), el Load Balancer reparte usuarios entre ellas. Pero si necesitamos una EC2 D, el Load Balancer no la crea — eso es trabajo de Auto Scaling.</p>
          <RoleGrid roles={[
            { icon: 'settings', label: 'Load Balancer', desc: '¿A quién envío esta solicitud?' },
            { icon: 'bar-chart', label: 'Auto Scaling', desc: '¿Cuántos servidores necesito?' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>26-28. Más de una Availability Zone</h3>
          <p>Conectamos con el Módulo 5: si todos nuestros servidores están en la AZ A y esa zona tiene problemas, podrían verse afectados todos. En cambio, distribuir A en AZ A y B en AZ B reduce esa dependencia.</p>
          <Flow steps={[{ icon: 'globe', label: 'Usuarios' }, { icon: 'settings', label: 'Load Balancer' }, { icon: 'building', label: 'AZ A → EC2 A' }, { icon: 'building', label: 'AZ B → EC2 B' }]} />
        </section>

        <section className="lesson-section">
          <h3>29-30. No significa que toda la aplicación sea invulnerable</h3>
          <Nota><p>Podemos tener Load Balancer + EC2 A + EC2 B, pero si RDS está mal diseñada o falla, la aplicación todavía puede tener problemas. Alta disponibilidad se diseña por capas: Entrada, Aplicación y Datos, cada una con su propia disponibilidad.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>31-34. Una sola dirección para los usuarios</h3>
          <p>Una ventaja conceptual del Load Balancer: los usuarios utilizan un único punto de entrada. No necesitan conocer al Servidor A, B o C — la infraestructura detrás puede cambiar.</p>
          <Dialogo>Llamamos a "Hotel Cloud" y no preguntamos qué recepcionista está trabajando hoy. El hotel decide quién nos atiende. El Load Balancer cumple un rol parecido: oculta la complejidad detrás.</Dialogo>
          <p>Si agregamos un servidor C, los usuarios no necesitan cambiar la dirección que utilizan — eso facilita la escalabilidad horizontal.</p>
        </section>

        <section className="lesson-section">
          <h3>35-39. ¿Y si una instancia está rota?</h3>
          <Nota><p>Si A ✅, B 💥 y C ✅, no queremos que el Load Balancer siga enviando usuarios a B. El Load Balancer necesita conocer la salud de cada servidor. Para eso existen los <strong>Health Checks</strong>, que veremos en profundidad en la Clase 3.</p></Nota>
          <p>Una EC2 puede estar en estado Running pero con la aplicación detenida — desde el punto de vista de la aplicación, el servidor no sirve.</p>
        </section>

        <section className="lesson-section">
          <h3>40-42. Tres conceptos que aparecerán</h3>
          <p>Para este público no entramos todavía en algoritmos avanzados: ELB distribuye solicitudes entre targets disponibles y saludables según su configuración. La Clase 2 explicará Listener, Target Group y reglas.</p>
          <RoleGrid roles={[
            { icon: 'settings', label: 'Load Balancer', desc: '¿Recibe el tráfico?' },
            { icon: 'radio', label: 'Listener', desc: '¿Qué tráfico estoy escuchando?' },
            { icon: 'target', label: 'Target Group', desc: '¿A qué grupo de servidores puedo enviarlo?' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>43-48. Security Groups siguen existiendo</h3>
          <p>Load Balancer no elimina la seguridad de red. Podemos tener SG-ALB y SG-Web.</p>
          <Flow steps={[{ label: 'Internet — HTTPS 443' }, { label: 'SG-ALB' }, { label: 'ALB — App Port' }, { label: 'SG-Web' }, { label: 'EC2' }]} />
          <p>Las EC2 pueden aceptar tráfico desde el Security Group del ALB, en vez de directamente desde todo Internet. El Load Balancer se vuelve la puerta pública; detrás, la EC2 puede estar más protegida.</p>
        </section>

        <section className="lesson-section">
          <h3>46-48. Load Balancer no guarda datos ni reemplaza RDS Multi-AZ</h3>
          <Nota><p>No confundimos ALB con RDS. El Load Balancer mueve solicitudes; RDS almacena información — distintas responsabilidades. ALB + múltiples EC2 mejora la disponibilidad de la capa de aplicación; RDS Multi-AZ mejora la disponibilidad de la capa de datos. Una no sustituye automáticamente a la otra: cada capa necesita resiliencia.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>49-51. Pero todavía falta automatización</h3>
          <p>Con EC2 A y B, si llegan 100.000 usuarios necesitamos EC2 C, D, E. ¿Quién las crea? No el Load Balancer — ahí aparecerá Amazon EC2 Auto Scaling. Podríamos tener manualmente A, B, C funcionando, pero si cambia la demanda debemos agregar o quitar instancias a mano. Auto Scaling automatizará esa parte.</p>
        </section>

        <section className="lesson-section">
          <h3>51. La arquitectura que construiremos</h3>
          <Flow steps={[
            { icon: 'globe', label: 'Internet' },
            { icon: 'settings', label: 'Load Balancer' },
            { icon: 'target', label: 'Target Group' },
            { icon: 'building', label: 'AZ A + AZ B' },
            { icon: 'server', label: 'EC2' },
            { icon: 'bar-chart', label: 'Auto Scaling' },
            { icon: 'database', label: 'RDS' },
          ]} />
          <p>Pero hoy solo debemos entender la parte superior: el Load Balancer.</p>
        </section>

        <section className="lesson-section">
          <h3>52. Actividad: vertical u horizontal</h3>
          <QaItem question="Cambiar de 2 GB RAM a 16 GB" answer="Vertical." />
          <QaItem question="Agregar tres EC2" answer="Horizontal." />
          <QaItem question="Cambiar a una instancia con más CPU" answer="Vertical." />
          <QaItem question="Pasar de 2 a 6 servidores" answer="Horizontal." />
        </section>

        <section className="lesson-section">
          <h3>53. Actividad: Load Balancer o Auto Scaling</h3>
          <QaItem question="Repartir usuarios entre tres EC2" answer="Load Balancer." />
          <QaItem question="Crear una cuarta EC2 cuando aumenta demanda" answer="Auto Scaling." />
          <QaItem question="Elegir a qué servidor enviar una solicitud" answer="Load Balancer." />
          <QaItem question="Reducir de 5 EC2 a 2 cuando baja la carga" answer="Auto Scaling." />
        </section>

        <section className="lesson-section">
          <h3>54-55. Actividad: encuentra y mejora el punto de falla</h3>
          <QaItem question="Arquitectura: Usuarios → EC2 → RDS Multi-AZ. ¿Dónde seguimos teniendo un punto único de falla evidente?" answer="En la única EC2 de aplicación." />
          <QaItem question="Cambiamos Usuarios → EC2 por Usuarios → Load Balancer → EC2 + EC2. ¿Qué ganamos?" answer="Distribución, menor dependencia de una instancia y posibilidad de crecer horizontalmente." />
        </section>

        <section className="lesson-section">
          <h3>56-58. Caso: UniversidadCloud</h3>
          <Nota><p>UniversidadCloud tiene un Portal con 200 usuarios en un día normal, pero 20.000 durante matrícula. Actualmente: Usuarios → EC2 (una sola).</p></Nota>
          <QaItem question="¿Qué problemas encontramos?" answer="La EC2 puede saturarse; si falla, el portal queda fuera; escalar verticalmente tiene límites; el usuario depende de una única instancia. Evaluamos Load Balancer + múltiples EC2." />
        </section>

        <section className="lesson-section">
          <h3>59-60. Dos propuestas que rechazar</h3>
          <Nota>
            <p>Pedro propone tres URL distintas (servidor1/2/3.cloudshop.cl) y decirle al cliente "si uno no funciona, pruebe otro". No estoy de acuerdo porque estamos trasladando un problema de infraestructura al usuario. Esto es lo que haría en su lugar: proporcionar un punto de entrada único mediante balanceo de carga. El riesgo de su enfoque es una experiencia inconsistente y una operación difícil de mantener.</p>
          </Nota>
          <Nota>
            <p>El gerente propone comprar la EC2 más grande posible y nunca necesitar Load Balancer. No estoy de acuerdo porque una máquina más potente sigue siendo una única máquina y mantiene un punto de falla. Esto es lo que haría en su lugar: evaluar escalado horizontal y redundancia según los requisitos. El riesgo de su enfoque es seguir dependiendo de un solo recurso, además de pagar capacidad excesiva.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>61-63. Vertical sigue siendo útil, pero tiene límites</h3>
          <p>No decimos que escalado vertical sea malo — puede ser adecuado para cargas pequeñas, simplicidad, ciertas aplicaciones o etapas iniciales. Pero no podemos crecer de 2 a 4 a 8 a 16 CPU para siempre: existe un tamaño máximo, un costo, y sigue siendo una sola máquina. Por eso horizontal es importante.</p>
        </section>

        <section className="lesson-section">
          <h3>64-65. Estado de la aplicación y sus límites</h3>
          <Nota><p>Varias EC2 funcionan mejor cuando las instancias pueden atender solicitudes sin depender demasiado de información local exclusiva — no queremos que un usuario entre por EC2 A, luego llegue a EC2 B, y B diga "no sé quién eres". Esto se relaciona con diseño stateless; no profundizamos hoy en sesiones, almacenamiento compartido, cookies o caches.</p></Nota>
          <p>El Load Balancer no arregla una mala aplicación: si nuestra aplicación falla en todas las EC2, tener un ALB no la convierte mágicamente en saludable. El Load Balancer distribuye lo que existe detrás.</p>
        </section>

        <section className="lesson-section">
          <h3>66-70. Diagnóstico conceptual y el mapa de la próxima clase</h3>
          <QaItem question="Load Balancer con A y B. A funciona, B tiene la aplicación detenida. Usuarios reportan fallas intermitentes. ¿Qué sospechamos?" answer="Una de las instancias puede estar recibiendo tráfico aunque su aplicación no esté sana. Eso nos lleva hacia Health Checks — necesita comprobar periódicamente si B está rota." />
          <p>Antes necesitamos saber dónde están organizadas las instancias: eso serán los Target Groups (Clase 2). El Load Balancer también necesita saber qué tráfico recibe: eso será el Listener.</p>
        </section>

        <section className="lesson-section">
          <h3>71-73. RETO DE LA CLASE</h3>
          <Nota><p>EventCloud vende entradas para conciertos: normalmente 100 usuarios, pero cuando comienza la venta, 30.000. Actualmente: Usuarios → EC2 (una sola), y si esa instancia falla, toda la venta se detiene.</p></Nota>
          <Reveal label="Ver las cinco preguntas del reto">
            <ol className="plain-list">
              <li>¿Qué problema existe? Una sola EC2 concentra toda la carga y es un punto único de falla.</li>
              <li>¿Escalar verticalmente puede ayudar? Sí, pero no elimina la dependencia de una sola instancia.</li>
              <li>¿Qué alternativa evaluamos? Escalado horizontal.</li>
              <li>¿Cómo distribuimos las solicitudes? Load Balancer.</li>
              <li>¿Quién creará automáticamente más EC2? Auto Scaling, que veremos después.</li>
            </ol>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>74-75. Retos nivel 2 y 3</h3>
          <QaItem question="ALB con una sola EC2 detrás. ¿Eliminamos completamente el punto único de falla de la aplicación?" answer="No. Seguimos teniendo una sola instancia detrás. El ALB no crea redundancia por sí solo; necesitamos múltiples targets saludables." />
          <QaItem question="ALB con A, B y C, pero las tres EC2 están en la AZ A. ¿Tenemos la misma resiliencia que distribuyéndolas en dos AZ?" answer="No. Una falla de esa zona podría afectar a los tres servidores." />
        </section>

        <section className="lesson-section">
          <h3>76-78. Preguntas trampa y verdadero o falso</h3>
          <QaItem question='"Si tengo un Load Balancer, mi aplicación ya escala automáticamente."' answer="Falso. Load Balancer distribuye; Auto Scaling cambia cantidad. No mezclamos funciones." />
          <QaItem question='"Si tengo tres EC2, no necesito Load Balancer."' answer="No estoy de acuerdo porque todavía necesitamos una forma coherente de distribuir solicitudes y presentar un punto de entrada al usuario. Esto es lo que haría en su lugar: poner un componente de balanceo frente al conjunto de instancias. El riesgo de su enfoque es tener capacidad distribuida que los clientes no utilizan correctamente." />
          <TrueFalseQuiz statements={[
            { text: 'Load Balancer puede distribuir tráfico.', correct: true },
            { text: 'Load Balancer crea automáticamente EC2.', correct: false },
            { text: 'Escalado horizontal significa agregar máquinas.', correct: true },
            { text: 'Escalado vertical significa aumentar capacidad de una máquina.', correct: true },
            { text: 'Tres EC2 en una sola AZ eliminan todos los riesgos.', correct: false },
            { text: 'Un único servidor puede convertirse en punto único de falla.', correct: true },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>79. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>80. Reto oral</h3>
          <Dialogo>Explícame para qué sirve un Load Balancer sin utilizar las palabras balanceador, servidor, tráfico, usuario, solicitud, EC2, AWS, distribuir, aplicación, red ni Cloud.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Es un intermediario que recibe trabajo desde un único punto y lo reparte entre varios trabajadores disponibles para evitar depender de uno solo."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>82. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Saturación</td><td>Una máquina recibe demasiado trabajo</td></tr>
              <tr><td>SPOF</td><td>Todo depende de un solo componente</td></tr>
              <tr><td>Vertical</td><td>Más potencia en una máquina</td></tr>
              <tr><td>Horizontal</td><td>Más máquinas</td></tr>
              <tr><td>Load Balancer</td><td>Reparte solicitudes</td></tr>
              <tr><td>Target</td><td>Destino que recibe trabajo</td></tr>
              <tr><td>Multi-AZ</td><td>Distribuir recursos entre zonas</td></tr>
              <tr><td>Health</td><td>Estado de funcionamiento</td></tr>
              <tr><td>Auto Scaling</td><td>Ajusta cantidad de EC2</td></tr>
              <tr><td>Objetivo</td><td>Menor dependencia y mejor distribución</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>83. Ticket de salida</h3>
          <Dialogo>Una aplicación tiene 3 EC2, pero los usuarios se conectan directamente a una sola de ellas. ¿Qué problema sigue existiendo y qué componente agregarías?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Las tres instancias existen, pero la carga no está siendo distribuida correctamente y seguimos dependiendo de un punto específico de entrada. Agregaría un Load Balancer para recibir las solicitudes y distribuirlas entre las instancias disponibles.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 2</div>
          <Flow steps={[{ icon: 'user', label: 'Usuario' }, { icon: 'settings', label: 'ALB' }, { label: '?' }, { icon: 'server', label: 'A / B' }]} />
          <Dialogo>"El Load Balancer ya recibió la solicitud, pero ¿cómo sabe qué tipo de tráfico está escuchando y a qué grupo de servidores debe enviarlo?"</Dialogo>
          <p>Necesitamos dos conceptos nuevos: Listener y Target Group.</p>
          <ConceptBadge icon="target">Módulo 7 · Clase 2 — Application Load Balancer, Listeners y Target Groups: quién recibe la solicitud y hacia dónde la enviamos</ConceptBadge>
          <span className="tag tag-outline">Módulo 7 · Clase 2 · próximamente</span>
        </div>

      </div>
    </div>
  );
}
