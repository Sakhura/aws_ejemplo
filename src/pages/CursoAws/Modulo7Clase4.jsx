import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué hace Amazon EC2 Auto Scaling?', options: [{ text: 'Mantiene y ajusta cantidad de EC2.', correct: true }, { text: 'Guarda archivos.', correct: false }, { text: 'Crea bases de datos.', correct: false }, { text: 'Reemplaza S3.', correct: false }] },
  { q: '¿Qué es un Auto Scaling Group?', options: [{ text: 'Grupo que administra una colección de EC2.', correct: true }, { text: 'Target Group.', correct: false }, { text: 'Security Group.', correct: false }, { text: 'IAM Group.', correct: false }] },
  { q: '¿Qué significa Minimum Capacity?', options: [{ text: 'Cantidad mínima de instancias.', correct: true }, { text: 'CPU mínima.', correct: false }, { text: 'Puerto mínimo.', correct: false }, { text: 'Cantidad de VPC.', correct: false }] },
  { q: '¿Qué significa Desired Capacity?', options: [{ text: 'Cantidad que el grupo intenta mantener ahora.', correct: true }, { text: 'Cantidad máxima.', correct: false }, { text: 'Cantidad de ALB.', correct: false }, { text: 'Número de usuarios.', correct: false }] },
  { q: '¿Qué significa Maximum Capacity?', options: [{ text: 'Límite máximo del grupo.', correct: true }, { text: 'Cantidad mínima.', correct: false }, { text: 'Capacidad RDS.', correct: false }, { text: 'Target Group.', correct: false }] },
  { q: '¿Qué es Scale Out?', options: [{ text: 'Agregar instancias.', correct: true }, { text: 'Quitar instancias.', correct: false }, { text: 'Crear un snapshot.', correct: false }, { text: 'Cambiar VPC.', correct: false }] },
  { q: '¿Qué es Scale In?', options: [{ text: 'Retirar instancias.', correct: true }, { text: 'Agregar instancias.', correct: false }, { text: 'Crear RDS.', correct: false }, { text: 'Abrir un puerto.', correct: false }] },
  { q: '¿Target Group y Auto Scaling Group son lo mismo?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Qué utilizará Auto Scaling para saber cómo crear EC2?', options: [{ text: 'Launch Template.', correct: true }, { text: 'Snapshot RDS.', correct: false }, { text: 'NACL.', correct: false }, { text: 'Bucket.', correct: false }] },
  { q: 'Si Desired es 2 y una de las dos EC2 falla, ¿qué debería intentar hacer ASG?', options: [{ text: 'Crear un reemplazo.', correct: true }, { text: 'Eliminar el ALB.', correct: false }, { text: 'Borrar la VPC.', correct: false }, { text: 'Esperar siempre intervención humana.', correct: false }] },
];

export default function Modulo7Clase4() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 7 · Clase 4</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 7 · Clase 4: Amazon EC2 Auto Scaling, mantener automáticamente la cantidad correcta de servidores</h2>
      <p className="lesson-subtitle">
        Auto Scaling mantiene y ajusta la cantidad de servidores que nuestra aplicación necesita.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + arquitectura + configuración guiada + actividades + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 7 · Clases 1 a 3</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es Amazon EC2 Auto Scaling y qué es un Auto Scaling Group.</li>
            <li>Diferenciar Auto Scaling Group y Target Group.</li>
            <li>Comprender los conceptos Minimum, Desired y Maximum Capacity.</li>
            <li>Explicar cómo Auto Scaling mantiene la cantidad deseada de instancias y cómo puede reemplazar una instancia problemática.</li>
            <li>Explicar qué significa Scale Out y Scale In.</li>
            <li>Comprender que Auto Scaling necesita una plantilla (Launch Template) para crear nuevas EC2.</li>
            <li>Comprender cómo un Auto Scaling Group puede trabajar en múltiples Availability Zones.</li>
            <li>Relacionar Auto Scaling con ALB y Health Checks.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-3. Recordemos dónde quedamos</h3>
          <Flow steps={[{ icon: 'globe', label: 'Usuarios' }, { icon: 'settings', label: 'ALB' }, { icon: 'target', label: 'Target Group' }, { icon: 'dot-success', label: 'A' }, { icon: 'dot-danger', label: 'B' }]} />
          <p>El Health Check detectó que B está Unhealthy. El ALB hizo correctamente su trabajo: dejó de enviarle tráfico. Pero ahora solo tenemos a A funcionando.</p>
          <Nota><p>¿Quién crea automáticamente otra EC2 para reemplazar a B? No el Load Balancer, no el Health Check. La respuesta será Amazon EC2 Auto Scaling.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>4-6. ¿Qué es Amazon EC2 Auto Scaling?</h3>
          <Dialogo>Nuestro supermercado necesita siempre 2 cajeros. Tenemos al Cajero A bien y al Cajero B enfermo. El coordinador de filas puede dejar de enviar personas a B. Pero necesitamos además a alguien que diga "nos falta un cajero, llamaré a otro". Eso representa Auto Scaling.</Dialogo>
          <p>Amazon EC2 Auto Scaling permite administrar grupos de instancias EC2 y mantener o modificar automáticamente la cantidad de capacidad disponible.</p>
          <ConceptBadge icon="bar-chart">Es el encargado de asegurarse de que tengamos el número de servidores que decidimos necesitar</ConceptBadge>
          <RoleGrid roles={[
            { icon: 'settings', label: 'Load Balancer', desc: '¿A cuál servidor envío esta solicitud?' },
            { icon: 'bar-chart', label: 'Auto Scaling', desc: '¿Cuántos servidores debo tener?' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>7-9. Auto Scaling Group y su diferencia con Target Group</h3>
          <p>El componente central es el <strong>Auto Scaling Group (ASG)</strong>: un grupo que administra automáticamente una colección de instancias EC2.</p>
          <Nota><p>ASG no es Target Group. Auto Scaling Group administra existencia y cantidad de EC2. Target Group administra destinos que pueden recibir tráfico del Load Balancer — son grupos diferentes.</p></Nota>
          <p>Una instancia puede pertenecer conceptualmente a ambos: el ASG mantiene la EC2, y el Target Group permite que reciba tráfico.</p>
        </section>

        <section className="lesson-section">
          <h3>10-15. Los tres números más importantes</h3>
          <RoleGrid roles={[
            { icon: 'bar-chart', label: 'Minimum Capacity', desc: 'La cantidad mínima de instancias que queremos mantener' },
            { icon: 'target', label: 'Desired Capacity', desc: 'La cantidad de instancias que el grupo intenta mantener ahora' },
            { icon: 'zap', label: 'Maximum Capacity', desc: 'El límite superior de instancias que permitimos al grupo crear' },
          ]} />
          <p>Ejemplo: Minimum = 2, Desired = 3, Maximum = 6. Ahora mismo tenemos 3, podemos bajar hasta 2 y podemos subir hasta 6.</p>
          <Dialogo>El hotel decide: Minimum 2 recepcionistas, Desired 3, Maximum 6. Nunca queremos menos de dos. Ahora necesitamos tres. Y aunque llegue medio planeta, no podemos superar seis según nuestra política actual.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>16-19. ¿Qué pasa si tenemos menos que Desired?</h3>
          <p>Con Desired = 2, si tenemos A ✅ y B 💥, queda solo 1 instancia pero deseamos 2. Auto Scaling detecta la diferencia y el grupo lanza un reemplazo: aparece C, y volvemos a A ✅, C ✅ — Desired = 2.</p>
          <Nota><p>Aquí Health Checks y Auto Scaling se encuentran: el Health Check detecta que B está mala; Auto Scaling puede utilizar información de salud de EC2 y, cuando está integrado con Elastic Load Balancing, considerar Health Checks del balanceador para reemplazar instancias no saludables.</p></Nota>
          <Flow steps={[
            { label: 'B falla' }, { label: 'Unhealthy' }, { label: 'ALB deja de enviarle tráfico' }, { label: 'ASG detecta falta de capacidad/salud' },
            { label: 'B termina' }, { label: 'C se crea' }, { label: 'C se vuelve Healthy' }, { label: 'C recibe tráfico' },
          ]} />
          <p>Esa secuencia integra las primeras cuatro clases del módulo.</p>
        </section>

        <section className="lesson-section">
          <h3>20-21. Auto Scaling no repara B</h3>
          <Nota><p>Generalmente el modelo es reemplazar infraestructura defectuosa por una nueva instancia basada en una configuración conocida — no que Auto Scaling entre por SSH a arreglar Apache manualmente. La filosofía cambia: en infraestructura tradicional podemos tratar un servidor como "Betsy, nuestro servidor especial que llevamos arreglando siete años". Con infraestructura reproducible, si una instancia está mala, la reemplazamos.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>22-24. Pero Auto Scaling necesita saber qué crear</h3>
          <p>Si debe lanzar una nueva EC2, necesita saber qué AMI, qué tipo de instancia, qué Security Group, qué configuración y qué User Data. Eso se define mediante un <strong>Launch Template</strong> — la próxima clase profundizará este concepto.</p>
          <Dialogo>Si necesitamos otra pizza, no inventamos los ingredientes cada vez. Tenemos una receta y producimos pizza A, B, C. De la misma forma, un Launch Template produce instancias consistentes.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>25-27. Auto Scaling y Availability Zones</h3>
          <p>Un Auto Scaling Group puede abarcar subnets en múltiples Availability Zones, evitando concentrar toda la capacidad en una sola zona. Si falla la AZ A, Auto Scaling puede intentar mantener capacidad lanzando instancias disponibles en las zonas configuradas según las condiciones del grupo.</p>
          <Flow steps={[{ icon: 'bar-chart', label: 'Auto Scaling Group' }, { icon: 'building', label: 'AZ A → EC2 A' }, { icon: 'building', label: 'AZ B → EC2 B' }]} />
          <p>Antes, una EC2 que fallaba requería intervención humana para crear otra. Ahora, ASG detecta la falla y lanza un reemplazo — reduciendo la dependencia de intervención manual.</p>
        </section>

        <section className="lesson-section">
          <h3>28-32. Scale Out y Scale In</h3>
          <p>Auto Scaling no es solamente reemplazo: también puede cambiar la cantidad debido a variaciones de demanda.</p>
          <RoleGrid roles={[
            { icon: 'zap', label: 'Scale Out', desc: 'Agregar instancias cuando necesitamos más capacidad' },
            { icon: 'x-circle', label: 'Scale In', desc: 'Retirar instancias cuando la demanda ha bajado' },
          ]} />
          <Dialogo>Scale Out: hay una fila enorme, abrimos más cajas. Scale In: son las 3 AM, casi nadie viene — no necesitamos 20 cajeros, cerramos algunas cajas.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>33-34. Pero no bajamos a cero si Minimum es 2</h3>
          <p>Con Minimum = 2, aunque la carga sea de 0 usuarios, el ASG intentará mantener 2 instancias, porque nosotros definimos ese mínimo.</p>
          <Nota><p>Minimum es una decisión de arquitectura: tal vez queremos redundancia, varias AZ, o capacidad disponible inmediata. No lo elegimos por superstición.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>35-37. Desired puede cambiar</h3>
          <p>Con Min = 2, Desired = 2, Max = 6, después de una política de escalado Desired puede pasar a 4, y el grupo busca 4 instancias. Más tarde puede volver a 2 y reducir. ¿Quién cambia Desired? Manualmente, mediante políticas de escalado, mediante escalado programado, u otros mecanismos compatibles. En este módulo nos concentraremos en Dynamic Scaling, especialmente Target Tracking — eso será la Clase 6. Por ahora basta con saber que el Auto Scaling Group sabe mantener un número deseado.</p>
        </section>

        <section className="lesson-section">
          <h3>38-40. Nuestra arquitectura actual e integración con Target Group</h3>
          <Flow steps={[
            { icon: 'globe', label: 'Internet' }, { icon: 'settings', label: 'ALB' }, { icon: 'target', label: 'Target Group' },
            { icon: 'building', label: 'AZ A + AZ B' }, { icon: 'server', label: 'EC2' }, { icon: 'bar-chart', label: 'Auto Scaling' },
          ]} />
          <p>Podemos asociar un Auto Scaling Group con un Target Group: las nuevas instancias creadas por el ASG pueden registrarse automáticamente en ese Target Group.</p>
          <Flow steps={[{ icon: 'bar-chart', label: 'ASG' }, { icon: 'server', label: 'Nueva EC2' }, { icon: 'target', label: 'Target Group' }, { icon: 'alert-triangle', label: 'Health Check' }, { icon: 'settings', label: 'Recibe tráfico' }]} />
          <Nota><p>C no recibe tráfico inmediatamente: una nueva instancia necesita Boot → configuración → aplicación → Health Check → Healthy. Solo entonces está preparada para recibir solicitudes normalmente.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>41-46. Automatización reproducible</h3>
          <Nota><p>Si cada nueva EC2 requiere que alguien entre manualmente y configure diecisiete cosas, Auto Scaling pierde gran parte de su sentido. Necesitamos que las instancias nazcan listas o puedan configurarse automáticamente, típicamente mediante User Data en el Launch Template: instalar Apache, crear página, iniciar servicio.</p></Nota>
          <Flow steps={[
            { label: 'ASG detecta necesidad' }, { label: 'Launch Template' }, { label: 'Nueva EC2' }, { label: 'User Data' },
            { label: 'Aplicación inicia' }, { label: 'Health Check' }, { label: 'Target Healthy' }, { label: 'Tráfico' },
          ]} />
          <Nota><p>Si User Data falla, la nueva EC2 queda Running pero sin Apache instalado — entonces el Health Check falla y puede no recibir tráfico. Por eso la automatización también debe probarse: Auto Scaling no arregla una mala plantilla. Si el Launch Template crea 100 EC2 rotas, Auto Scaling puede ser extremadamente eficiente produciendo problemas — automatizar amplifica tanto buenas como malas configuraciones.</p></Nota>
          <RoleGrid roles={[
            { icon: 'settings', label: 'ALB', desc: '¿A quién envío la solicitud?' },
            { icon: 'alert-triangle', label: 'Health Check', desc: '¿Quién puede atender?' },
            { icon: 'bar-chart', label: 'Auto Scaling', desc: '¿Cuántos servidores necesito/mantengo?' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>47-51. Laboratorio conceptual: creamos el ASG</h3>
          <p>Ruta conceptual: EC2 → Auto Scaling Groups → Create Auto Scaling Group. Nombre: <code>cloudshop-web-asg</code>.</p>
          <p>Seleccionamos el Launch Template <code>cloudshop-web-template</code> (por ahora asumimos que ya existe — la Clase 5 lo construiremos en detalle). VPC: <code>cloudshop-vpc</code>, con subnets app-subnet-a y app-subnet-b en distintas AZ. Asociamos el Target Group <code>cloudshop-web-tg</code>, para que las nuevas instancias puedan incorporarse al conjunto que atiende al ALB.</p>
          <InfoBox title="Capacidad para laboratorio" items={['Minimum: 2', 'Desired: 2', 'Maximum: 4']} />
        </section>

        <section className="lesson-section">
          <h3>52-56. Simulamos una falla: este es el experimento central</h3>
          <p>Si no existen instancias suficientes con Desired = 2, Auto Scaling lanzará A y B según el Launch Template. Después de pasar el Health Check, ambas se vuelven Healthy y pueden recibir tráfico.</p>
          <p>Terminamos manualmente B (o provocamos una condición no saludable en un entorno controlado). Con Desired = 2 y solo 1 running healthy, Auto Scaling detecta que falta capacidad y crea C. Después: A ✅, C ✅ — de nuevo Desired = 2.</p>
          <Dialogo>El estudiante debe explicar: "eliminamos una EC2, pero apareció otra sin crearla manualmente porque el Auto Scaling Group intentó recuperar su Desired Capacity." Eso demuestra comprensión.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>57-58. No confundamos reemplazo con Scale Out por demanda</h3>
          <QaItem question="Desired = 2, una instancia muere y el ASG crea otra. ¿Qué es esto?" answer="Mantener capacidad (reemplazo)." />
          <QaItem question="Desired cambia de 2 a 4 por alta demanda y el ASG crea dos más. ¿Qué es esto?" answer="Escalado (Scale Out)." />
          <p>Mismo mecanismo — crear EC2 — pero razón diferente: porque falta una instancia, o porque necesitamos más capacidad.</p>
        </section>

        <section className="lesson-section">
          <h3>59-63. Actividades</h3>
          <QaItem question='"Cantidad mínima que debo mantener." / "Cantidad que quiero ahora." / "Límite superior."' answer="Minimum / Desired / Maximum." />
          <QaItem question="Min = 2, Desired = 3, Max = 6. ¿Cuántas intenta mantener ahora?" answer="3." />
          <QaItem question="Min = 2, Desired = 2, Max = 4. Tenemos A ✅, B 💥. ¿Qué debería hacer el ASG?" answer="Crear una instancia de reemplazo para volver a 2." />
          <QaItem question="Min = 2, Desired = 2, Max = 5. Una política cambia Desired a 4. ¿Qué ocurre?" answer="Scale Out: se agregan instancias hasta alcanzar 4." />
          <QaItem question="4 instancias, pero Desired cambia a 2. ¿Qué ocurre?" answer="Scale In: se retira capacidad respetando mínimo y políticas aplicables." />
        </section>

        <section className="lesson-section">
          <h3>64-69. Caso UniversidadCloud y los límites de Auto Scaling</h3>
          <Nota><p>Portal universitario: Min 2, Desired 2, Max 8. Normalmente necesita 2 EC2; durante matrícula puede necesitar 6; después, 2 otra vez. Un caso clásico para Auto Scaling.</p></Nota>
          <p>¿Por qué Max = 8 y no infinito? Por presupuesto, pruebas de capacidad, límites de arquitectura o capacidad de dependencias — no queremos escalar indefinidamente.</p>
          <Nota><p>Más EC2 no arregla todo: si tenemos 50 EC2 pero RDS está completamente saturada, agregar más Web Servers puede incluso aumentar presión sobre la base. Auto Scaling necesita considerar la arquitectura completa — escalar una capa puede trasladar el cuello de botella a otra.</p></Nota>
          <p>Otro riesgo: costo. Un Maximum = 100 sin razón clara podría disparar la factura sin control. Maximum también es control de riesgo.</p>
          <RoleGrid roles={[
            { icon: 'lock', label: 'Minimum', desc: 'Protege capacidad mínima' },
            { icon: 'zap', label: 'Maximum', desc: 'Protege contra crecimiento descontrolado' },
            { icon: 'target', label: 'Desired', desc: 'Expresa el estado buscado' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>70-71. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El gerente propone: "pongamos Minimum 20 para que nunca falte capacidad." No estoy de acuerdo porque eso obliga a mantener 20 instancias incluso cuando la demanda no las necesita. Esto es lo que haría en su lugar: definir un mínimo basado en disponibilidad y carga base, y dejar que políticas de escalado aumenten capacidad cuando corresponda. El riesgo de su enfoque es pagar continuamente por infraestructura ociosa.</p>
          </Nota>
          <Nota>
            <p>Otro gerente propone: "pongamos Minimum 0, Desired 0 y Maximum 100 para ahorrar." No estoy de acuerdo porque una aplicación que requiere disponibilidad inmediata podría quedarse sin servidores preparados y necesitar tiempo para arrancarlos. Esto es lo que haría en su lugar: definir una capacidad mínima según el nivel de servicio esperado. El riesgo es que los primeros usuarios encuentren el sistema sin capacidad lista.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>72-74. Auto Scaling no es instantáneo</h3>
          <p>Crear una EC2 requiere tiempo: Launch → Boot → User Data → Aplicación → Health Check → Healthy. No debemos esperar que aparezca capacidad nueva en cero segundos. Más adelante veremos <strong>Instance Warmup</strong>, para dar tiempo a una instancia nueva a prepararse antes de ser considerada plenamente en decisiones de escalado. Pero primero necesitamos dominar el ciclo de creación.</p>
          <QaItem question="Si todos los servidores se crean automáticamente, ¿cómo garantizamos que sean iguales?" answer="Launch Template — la próxima clase estará dedicada a eso." />
        </section>

        <section className="lesson-section">
          <h3>75-79. RETO DE LA CLASE</h3>
          <Nota><p>EventCloud: Minimum 2, Desired 2, Maximum 6. Estado inicial A ✅, B ✅. A las 10:00, B falla. A las 10:05, el ASG detecta que solo queda una instancia válida.</p></Nota>
          <Reveal label="Ver la respuesta">
            <p>Desired = 2, Actual = 1. Auto Scaling debe intentar crear C hasta recuperar A ✅, C ✅ — resultado: Actual = Desired = 2.</p>
          </Reveal>
          <QaItem question="Más tarde la carga aumenta y una política cambia Desired de 2 a 5. ¿Qué ocurre?" answer="Auto Scaling crea 3 instancias adicionales hasta alcanzar 5, sin superar Maximum = 6." />
          <QaItem question="La demanda sigue subiendo y la política quisiera Desired = 8, pero Maximum = 6. ¿Qué ocurre?" answer="El grupo no debería superar 6 bajo esa configuración — ahora hay que decidir si 6 sigue siendo suficiente." />
          <QaItem question="ASG dice Desired = 2, pero las nuevas instancias aparecen Unhealthy una y otra vez y son reemplazadas continuamente. ¿Qué investigamos?" answer="Launch Template, User Data, aplicación, Security Groups, Health Check, puerto, AMI. El problema no necesariamente es Auto Scaling — puede estar en la receta que está utilizando." />
          <Nota><p>El bucle infernal: ASG crea EC2 → EC2 nace rota → Health Check falla → ASG reemplaza → nueva EC2 nace rota... Automatizar una mala configuración puede crear un bucle muy eficiente de fracaso.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>81. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'Auto Scaling distribuye tráfico.', correct: false },
            { text: 'Auto Scaling puede mantener Desired Capacity.', correct: true },
            { text: 'Minimum es el límite inferior.', correct: true },
            { text: 'Maximum es el límite superior.', correct: true },
            { text: 'Una EC2 puede ser reemplazada automáticamente.', correct: true },
            { text: 'Auto Scaling necesita saber cómo crear nuevas EC2.', correct: true },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>82. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>83. Reto oral</h3>
          <Dialogo>Explícame Auto Scaling sin utilizar las palabras Auto Scaling, EC2, servidor, instancia, AWS, grupo, mínimo, máximo, desired, capacidad, crear ni eliminar.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Es un mecanismo que mantiene automáticamente la cantidad de trabajadores que hemos definido y puede aumentar o reducir ese conjunto cuando las necesidades cambian."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>85. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Auto Scaling</td><td>Mantiene y ajusta EC2</td></tr>
              <tr><td>ASG</td><td>Grupo administrado de instancias</td></tr>
              <tr><td>Minimum</td><td>Mínimo permitido</td></tr>
              <tr><td>Desired</td><td>Cantidad buscada ahora</td></tr>
              <tr><td>Maximum</td><td>Máximo permitido</td></tr>
              <tr><td>Scale Out</td><td>Agregar capacidad</td></tr>
              <tr><td>Scale In</td><td>Reducir capacidad</td></tr>
              <tr><td>Replacement</td><td>Sustituir instancia problemática</td></tr>
              <tr><td>Launch Template</td><td>Receta para nuevas EC2</td></tr>
              <tr><td>Target Group</td><td>Grupo que recibe tráfico</td></tr>
              <tr><td>Health Check</td><td>Determina salud</td></tr>
              <tr><td>Multi-AZ</td><td>Distribuye capacidad entre zonas</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>86. Ticket de salida</h3>
          <Dialogo>Un Auto Scaling Group tiene Minimum 2, Desired 2 y Maximum 5. Una de sus dos EC2 falla. ¿Qué debería ocurrir?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>El grupo detectará que tiene menos capacidad de la deseada y debería intentar crear una nueva instancia basada en su configuración hasta volver a mantener dos instancias válidas.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 5</div>
          <Flow steps={[{ icon: 'bar-chart', label: 'Auto Scaling' }, { label: 'Necesito una EC2 nueva' }, { label: '¿Cómo sabe exactamente qué EC2 crear?' }]} />
          <p>Necesita conocer la AMI, el tamaño, el Security Group, el almacenamiento y el User Data. No queremos configurar cada instancia manualmente — necesitamos una receta reutilizable.</p>
          <ConceptBadge icon="file-text">Módulo 7 · Clase 5 — Launch Templates: la receta que permite a Auto Scaling crear servidores iguales una y otra vez</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-7/clase-5" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 5: Launch Templates →
          </Link>
        </div>

      </div>
    </div>
  );
}
