import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué componente recibe inicialmente las solicitudes web?', options: [{ text: 'Application Load Balancer', correct: true }, { text: 'RDS', correct: false }, { text: 'Launch Template', correct: false }, { text: 'Snapshot', correct: false }] },
  { q: '¿Qué componente agrupa los destinos?', options: [{ text: 'Target Group', correct: true }, { text: 'IAM Group', correct: false }, { text: 'Route Table', correct: false }, { text: 'DB Subnet Group', correct: false }] },
  { q: '¿Qué comprueba el estado de un Target?', options: [{ text: 'Health Check', correct: true }, { text: 'AMI', correct: false }, { text: 'S3', correct: false }, { text: 'NAT Gateway', correct: false }] },
  { q: '¿Qué administra cuántas EC2 existen?', options: [{ text: 'Auto Scaling Group', correct: true }, { text: 'ALB', correct: false }, { text: 'RDS', correct: false }, { text: 'Listener', correct: false }] },
  { q: '¿Qué define cómo nace una EC2?', options: [{ text: 'Launch Template', correct: true }, { text: 'Target Group', correct: false }, { text: 'Health Check', correct: false }, { text: 'VPC Peering', correct: false }] },
  { q: '¿Por qué utilizamos varias AZ?', options: [{ text: 'Para reducir dependencia de una sola zona.', correct: true }, { text: 'Para crear más usuarios IAM.', correct: false }, { text: 'Para almacenar archivos.', correct: false }, { text: 'Para aumentar un puerto.', correct: false }] },
  { q: 'Si una instancia queda Unhealthy, ¿qué hace el ALB normalmente?', options: [{ text: 'Deja de dirigirle tráfico normal.', correct: true }, { text: 'Crea RDS.', correct: false }, { text: 'Borra el Target Group.', correct: false }, { text: 'Cambia el dominio.', correct: false }] },
  { q: '¿Puede Auto Scaling utilizar Health Checks del Load Balancer para reemplazar instancias?', options: [{ text: 'Sí, si se configura.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Qué provoca Scale Out?', options: [{ text: 'Aumentar capacidad.', correct: true }, { text: 'Reducir capacidad.', correct: false }, { text: 'Crear snapshots.', correct: false }, { text: 'Abrir puertos.', correct: false }] },
  { q: '¿Una RDS privada puede ser utilizada por EC2 dentro de la arquitectura?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
];

export default function Modulo7Clase7() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 7 · Clase 7</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 7 · Clase 7: ALB + Auto Scaling + Multi-AZ, construir una aplicación que distribuya carga, reemplace fallas y crezca automáticamente</h2>
      <p className="lesson-subtitle">
        El ALB distribuye, los Health Checks verifican, Auto Scaling mantiene capacidad y las Availability Zones evitan depender de una sola ubicación.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Arquitectura + integración + diagnóstico + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 7 · Clases 1 a 6</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Integrar un Application Load Balancer con un Auto Scaling Group.</li>
            <li>Comprender por qué utilizar múltiples Availability Zones.</li>
            <li>Relacionar ALB, Listener, Target Group y Auto Scaling Group.</li>
            <li>Comprender el registro automático de nuevas EC2 en un Target Group.</li>
            <li>Explicar cómo los Health Checks participan en la arquitectura y cómo Auto Scaling reemplaza instancias no saludables.</li>
            <li>Diseñar Security Groups por capas y comprender el flujo Internet → ALB → EC2 → RDS.</li>
            <li>Comprender qué ocurre cuando una instancia falla, cuando aumenta la demanda y cuando disminuye.</li>
            <li>Detectar puntos únicos de falla y diseñar una arquitectura básica tolerante a fallos.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-4. Tenemos todas las piezas: arquitectura objetivo</h3>
          <p>Ya conocemos ALB, Listener, Target Group, Health Check, Auto Scaling Group, Launch Template y Scaling Policy. Por separado, cada una tiene sentido. Hoy las conectamos.</p>
          <Flow steps={[{ icon: 'globe', label: 'Usuarios' }, { icon: 'server', label: 'EC2' }, { icon: 'database', label: 'RDS' }]} />
          <p>Ya sabemos qué problemas existen: mucha carga, falla de EC2, falla de zona, cambios de demanda. Queremos una arquitectura mejor:</p>
          <Flow steps={[
            { icon: 'globe', label: 'Internet' }, { icon: 'settings', label: 'Public ALB' }, { icon: 'radio', label: 'Listener' }, { icon: 'target', label: 'Target Group' },
            { icon: 'building', label: 'AZ A + AZ B' }, { icon: 'server', label: 'EC2 A + EC2 B' }, { icon: 'bar-chart', label: 'Auto Scaling' }, { icon: 'database', label: 'RDS privada' },
          ]} />
          <p>AWS permite asociar un Target Group con un Auto Scaling Group; cuando Auto Scaling lanza nuevas instancias, puede registrarlas automáticamente en ese Target Group.</p>
        </section>

        <section className="lesson-section">
          <h3>5-8. Empecemos por las Availability Zones</h3>
          <p>Tenemos una Región con AZ A y AZ B. Queremos distribuir nuestra capa de aplicación entre ambas.</p>
          <Nota><p>¿Qué pasa si todo está en una AZ? Tenemos tres servidores en AZ A — parece resiliente, hasta que AZ A falla y los tres pueden verse afectados. Tres servidores no significan automáticamente alta disponibilidad: reducen dependencia de una sola instancia, pero seguimos dependiendo de una sola Availability Zone.</p></Nota>
          <Flow steps={[{ icon: 'globe', label: 'Región' }, { icon: 'building', label: 'AZ A → EC2 A' }, { icon: 'building', label: 'AZ B → EC2 B' }]} />
          <p>Ahora un problema localizado en una zona no necesariamente elimina toda nuestra capacidad.</p>
        </section>

        <section className="lesson-section">
          <h3>9-13. El Load Balancer también utiliza varias zonas</h3>
          <p>Un ALB funciona sobre las Availability Zones habilitadas para él y dirige tráfico hacia Targets saludables. AWS recomienda que las zonas utilizadas por el Load Balancer correspondan con las que utiliza el Auto Scaling Group.</p>
          <p>Los usuarios no conocen EC2 A, B o C — conocen cloudshop.cl, que apunta hacia el ALB. Detrás, la infraestructura puede cambiar.</p>
          <p>El ALB recibe HTTPS :443 mediante el Listener, y ejecuta Forward hacia cloudshop-web-tg. El Target Group define qué destinos pueden atender las solicitudes, y el Health Check comprueba su estado.</p>
        </section>

        <section className="lesson-section">
          <h3>14-16. ¿Quién creó esas instancias?</h3>
          <p>Nuestro Auto Scaling Group, con Minimum = 2, Desired = 2, Maximum = 6, y el Launch Template cloudshop-web-template (AMI Amazon Linux, Instance Type pequeño, SG sg-cloudshop-web, User Data que instala la aplicación) como receta.</p>
          <p>Hasta aquí ya tenemos automatización: si necesitamos 2 instancias, Auto Scaling intenta mantener 2. Si una desaparece, intenta reemplazarla. Si una política pide más, crea más.</p>
        </section>

        <section className="lesson-section">
          <h3>17-25. Primera prueba: falla una EC2</h3>
          <p>Tenemos A ✅, B ✅. Ahora B deja de responder. Primero el Health Check: dos checks fallidos consecutivos, y después del umbral configurado, B → Unhealthy. El Load Balancer deja de considerarla un destino normal, reduciendo impacto sobre los usuarios.</p>
          <p>Después entra Auto Scaling: si habilitamos Health Checks de Elastic Load Balancing para el ASG, Auto Scaling puede considerar una instancia no saludable reportada por ELB y reemplazarla. B se reemplaza: nace C usando el Launch Template.</p>
          <Flow steps={[{ label: 'Nueva EC2 C' }, { label: 'Boot' }, { label: 'User Data' }, { label: 'Aplicación' }, { label: '/health' }]} />
          <p>Todavía no queremos usuarios llegando inmediatamente: C debe pasar sus comprobaciones iniciales antes de ser considerada Healthy. Entonces vuelve al tráfico: A y C reciben solicitudes, y volvemos a Desired = 2 servidores saludables.</p>
          <Nota><p>Nadie creó C manualmente. Este flujo ocurrió mediante detección + distribución + reemplazo + automatización — ahí está el valor de integrar los servicios.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>26-31. Segunda prueba: aumenta la demanda</h3>
          <p>Ambas instancias están sanas (A ✅, C ✅), pero comienza CyberDay CloudShop: llegan muchísimos usuarios, CPU A = 88%, CPU C = 90%.</p>
          <p>Tenemos una política Target Tracking, Average CPU 50%, métrica actual 89% — necesitamos más capacidad. Auto Scaling aumenta Desired de 2 a 4 y lanza D y E usando nuevamente el Launch Template. D y E deben pasar Health Check (initial → Healthy) antes de recibir tráfico.</p>
          <p>El ALB distribuye ahora entre cuatro: A, C, D, E. Antes: 2 servidores, CPU ~90%. Después: 4 servidores, CPU ~50% aproximadamente. El sistema se expandió.</p>
        </section>

        <section className="lesson-section">
          <h3>32-34. Tercera prueba: termina CyberDay</h3>
          <p>A las 03:00, pocos usuarios, CPU 15%. Tenemos A, C, D, E pero ya no necesitamos tanta capacidad. Auto Scaling puede realizar Scale In: Desired 4 → 2, eliminando capacidad adicional de forma controlada.</p>
          <Flow steps={[{ label: 'Carga baja — 2 EC2' }, { label: 'Carga alta — 4 EC2' }, { label: 'Carga baja — 2 EC2' }]} />
          <p>Eso es elasticidad.</p>
        </section>

        <section className="lesson-section">
          <h3>35-40. Cuarta prueba: falla una Availability Zone</h3>
          <p>Nuestro ASG utiliza Subnet A y Subnet B, en AZ A y AZ B — buscamos distribuir capacidad, no concentrar todas las EC2 en una sola zona: AZ A tiene A y D; AZ B tiene C y E.</p>
          <p>Ahora AZ A falla. ¿Qué ocurre?</p>
          <Nota><p>La aplicación todavía tiene capacidad: en AZ B, C ✅ y E ✅ siguen funcionando. El Load Balancer puede continuar utilizando Targets saludables disponibles en las zonas habilitadas — así evitamos depender completamente de AZ A.</p></Nota>
          <p>Si nuestra capacidad deseada sigue siendo Desired = 4 pero solo tenemos dos instancias útiles, Auto Scaling puede intentar lanzar capacidad adicional donde esté disponible dentro de las zonas configuradas. El objetivo: mantener servicio y recuperar capacidad.</p>
          <Dialogo>Tenemos Sucursal Norte y Sucursal Sur. Si Norte cierra por una emergencia, Sur puede seguir atendiendo. No significa que nada ocurre, pero evita cerrar todo el negocio.</Dialogo>
          <Nota><p>Multi-AZ no significa cero impacto: si perdemos 50% de nuestra capacidad de golpe, los servidores restantes pueden recibir más carga temporalmente. La arquitectura resiliente busca reducir impacto y recuperar capacidad, no prometer magia.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>41-46. Ahora conectamos RDS: tres Security Groups</h3>
          <p>Nuestra aplicación necesita datos: Usuario → ALB → EC2 → RDS. Recordemos el Módulo 6: RDS permanece privada. Podemos diseñar SG-ALB, SG-App y SG-RDS, cada uno protegiendo una capa diferente.</p>
          <InfoBox title="SG-ALB" items={['Inbound: HTTPS 443', 'Source: Internet']} />
          <InfoBox title="SG-App" items={['Inbound: HTTP/App Port', 'Source: SG-ALB (no 0.0.0.0/0)']} />
          <InfoBox title="SG-RDS" items={['Inbound: TCP 3306 (MySQL)', 'Source: SG-App']} />
          <p>Así: Internet → ALB, ALB → EC2, EC2 → RDS. Cada capa conoce solo a la siguiente — el usuario no necesita acceso directo a App ni Database, reduciendo exposición innecesaria.</p>
        </section>

        <section className="lesson-section">
          <h3>47-50. Arquitectura de tres capas y salida NAT</h3>
          <p>Para una arquitectura más madura podemos evaluar: ALB en subnets públicas, EC2 en subnets privadas, RDS en subnets privadas.</p>
          <RoleGrid roles={[
            { icon: 'globe', label: 'Capa 1 — Entrada', desc: '' },
            { icon: 'settings', label: 'Capa 2 — Aplicación', desc: '' },
            { icon: 'database', label: 'Capa 3 — Datos', desc: '' },
          ]} />
          <p>Es un patrón muy común. Pero las EC2 privadas pueden necesitar salida (actualizaciones, descargar paquetes, consultar servicios externos) — desde subnets privadas debemos diseñar una salida apropiada, por ejemplo mediante NAT, conectando nuevamente con el Módulo 5.</p>
        </section>

        <section className="lesson-section">
          <h3>50. Arquitectura completa</h3>
          <Flow steps={[
            { icon: 'globe', label: 'Internet' }, { icon: 'shield', label: 'SG-ALB → SG-App' }, { icon: 'settings', label: 'ALB (Public Layer)' },
            { icon: 'building', label: 'AZ A + AZ B — App Subnets' }, { icon: 'server', label: 'EC2' }, { icon: 'bar-chart', label: 'ASG' },
            { icon: 'shield', label: 'SG-App → SG-RDS' }, { icon: 'database', label: 'RDS (Data Layer)' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>51-53. ¿Dónde está el Target Group? Health Check sigue siendo crítico</h3>
          <p>El Target Group está entre el ALB y las EC2: ALB → Listener → Target Group → Healthy Targets → EC2. El Target Group no es una red, es una agrupación lógica de destinos.</p>
          <Nota><p>Sin Health Checks, podríamos continuar enviando tráfico a un Target roto. Los Health Checks permiten detectar y retirar Targets no saludables.</p></Nota>
          <Flow steps={[{ label: 'Target Unhealthy' }, { icon: 'alert-triangle', label: '' }, { label: 'ALB deja tráfico' }, { icon: 'bar-chart', label: 'ASG reemplaza' }, { label: 'Nueva EC2' }, { icon: 'dot-success', label: 'Healthy' }, { label: 'Vuelve a recibir' }]} />
          <p>Esta es la gran integración del módulo.</p>
        </section>

        <section className="lesson-section">
          <h3>54-57. Tres comportamientos diferentes</h3>
          <Flow steps={[{ label: 'CPU alta' }, { label: 'Scale Out' }, { label: 'Nueva EC2' }, { label: 'Target Group' }, { icon: 'dot-success', label: 'Healthy' }, { label: 'Recibe tráfico' }]} />
          <RoleGrid roles={[
            { icon: 'alert-triangle', label: 'Falla → Replace', desc: '' },
            { icon: 'zap', label: 'Demanda aumenta → Scale Out', desc: '' },
            { icon: 'x-circle', label: 'Demanda disminuye → Scale In', desc: '' },
          ]} />
          <p>Auto Scaling participa en los tres escenarios. Reemplazo no es lo mismo que Scale Out por demanda: si Desired = 2 y una instancia falla, crear un reemplazo no significa que escalamos a tres — seguimos buscando 2. Ese es mantenimiento de capacidad. Scale Out sí cambia la capacidad buscada (2 → 4): ahí sí aumentamos capacidad total. La diferencia es importante.</p>
        </section>

        <section className="lesson-section">
          <h3>58-63. Cuatro diagnósticos integrados</h3>
          <QaItem question="Los usuarios no pueden acceder. ALB Active ✅, pero Target Group 0 Healthy Targets. ¿Qué investigamos?" answer="Aplicación, Security Group, puerto, Health Check Path, User Data, Launch Template." />
          <QaItem question="CPU 95%, pero el ASG Desired = 2 y no crece. ¿Qué revisamos?" answer="Scaling Policy, Maximum Capacity, CloudWatch Metric, Launch failures, Quotas." />
          <QaItem question="El ASG crea instancias constantemente (C, D, E) y todas terminan Unhealthy y son terminadas. ¿Dónde sospechamos?" answer="Configuración común: especialmente Launch Template, User Data, SG y Health Check." />
          <Dialogo>Una galleta quemada, otra quemada, otra quemada. No culpamos a cada galleta individual — revisamos el horno y la receta: el Launch Template.</Dialogo>
          <QaItem question="4 EC2 Healthy ✅, pero usuarios siguen con lentitud. RDS CPU 100%. ¿Qué ocurre?" answer="El problema probablemente se movió hacia la capa de datos — más EC2 pueden incluso aumentar la presión." />
          <Nota><p>Escalar una capa puede revelar otro cuello de botella: ALB ✅, EC2 × 10 ✅, pero RDS 🔥 — el sistema completo sigue limitado. Esto nos enseña que la arquitectura Cloud debe observarse extremo a extremo.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>64-68. Laboratorio conceptual: integramos todo</h3>
          <p>Necesitamos: VPC con AZ A y AZ B, App Subnet A y App Subnet B, Launch Template, Target Group y ALB ya existentes.</p>
          <InfoBox title="Creamos el ASG" items={['Name: cloudshop-web-asg', 'Min: 2', 'Desired: 2', 'Max: 6', 'Subnets: app-subnet-a, app-subnet-b']} />
          <p>Asociamos el Target Group cloudshop-web-tg, para que las instancias lanzadas por el grupo se incorporen automáticamente. Activamos Health Checks apropiados: además de EC2 Health Checks, configuramos el ASG para utilizar información de salud de Elastic Load Balancing, permitiendo reemplazar instancias que el Load Balancer reporte como no saludables — el ASG puede escuchar también al "médico" del Load Balancer.</p>
          <InfoBox title="Agregamos política" items={['Target Tracking', 'Average CPU: 50%']} />
          <p>Ahora tenemos: Falla → Replacement. Carga → Scale Out / Scale In.</p>
        </section>

        <section className="lesson-section">
          <h3>69-72. Actividades</h3>
          <QaItem question="Recibe conexiones del usuario / Escucha HTTPS 443 / Agrupa las EC2 / Comprueba /health / Decide cuántas instancias mantener / Define cómo nace una EC2 / Decide cuándo crecer" answer="ALB / Listener / Target Group / Health Check / ASG / Launch Template / Scaling Policy." />
          <QaItem question="Ordena: Target Group, ALB, EC2, Internet, Listener, Health Check" answer="Internet → ALB → Listener → Target Group → Healthy Targets → EC2." />
          <QaItem question="ALB con EC2 A y B, ambas en AZ A. ¿Qué riesgo queda?" answer="Dependencia de una sola Availability Zone." />
          <QaItem question="AZ A → A, AZ B → B. ¿Qué mejora?" answer="Resiliencia ante una falla localizada en una AZ." />
        </section>

        <section className="lesson-section">
          <h3>73-74. RETO DE LA CLASE</h3>
          <Nota><p>EventCloud: durante un concierto, 50.000 usuarios; normalmente 500. Requisitos: (1) una EC2 no debe ser punto único de falla, (2) usar dos Availability Zones, (3) las nuevas instancias deben crearse automáticamente, (4) solo Targets saludables reciben tráfico, (5) si una EC2 falla, debe reemplazarse, (6) si aumenta carga, debemos crecer, (7) si baja carga, debemos reducir, (8) RDS debe permanecer privada.</p></Nota>
          <Reveal label="Ver la solución conceptual">
            <Flow steps={[
              { icon: 'globe', label: 'Internet' }, { icon: 'settings', label: 'ALB' }, { icon: 'radio', label: 'HTTPS 443' }, { icon: 'target', label: 'event-web-tg — /health' },
              { icon: 'building', label: 'AZ A + AZ B' }, { icon: 'server', label: 'EC2' }, { icon: 'bar-chart', label: 'Auto Scaling — Min 2 / Desired 2 / Max 8' },
              { icon: 'file-text', label: 'Launch Template' }, { icon: 'target', label: 'Target Tracking — CPU ~50%' }, { icon: 'database', label: 'RDS privada' },
            ]} />
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>75-77. Retos nivel 2, 3 y 4</h3>
          <QaItem question="A ✅, B ❌, Desired = 2. ¿Qué debe ocurrir?" answer="1) ALB deja de enviar tráfico a B. 2) ASG detecta problema/capacidad insuficiente. 3) Lanza C. 4) C ejecuta User Data. 5) C pasa Health Check. 6) C comienza a recibir tráfico." />
          <QaItem question="A ✅, C ✅, CPU 90%, Policy Target = 50%, Max = 6. ¿Qué esperamos?" answer="Scale Out: nuevas instancias D y E según necesidad, que después pasan Health Checks y reciben tráfico." />
          <QaItem question="6 instancias, CPU 92%, Maximum = 6. ¿Qué ocurre?" answer="Auto Scaling no puede seguir creciendo por encima del máximo configurado. Debemos investigar si Maximum debe cambiar, si existe otro cuello de botella, si las instancias son apropiadas, si RDS puede soportar más, o si hay un problema de aplicación." />
        </section>

        <section className="lesson-section">
          <h3>78-81. Tres trampas y arquitectura resiliente por capas</h3>
          <Nota>
            <p>El gerente propone: "para simplificar, pongamos todas las EC2 en una sola AZ, igual tenemos Auto Scaling." No estoy de acuerdo porque Auto Scaling protege frente a pérdida de instancias, pero no elimina la dependencia de una única Availability Zone. Esto es lo que haría en su lugar: distribuir la capacidad en al menos dos zonas apropiadas. El riesgo de su enfoque es perder simultáneamente gran parte o toda la capa de aplicación ante una falla de zona.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: "hagamos públicas todas las EC2 para que el ALB pueda encontrarlas." No estoy de acuerdo porque un ALB puede comunicarse con Targets mediante la red de la VPC; las EC2 no necesitan necesariamente exposición pública directa. Esto es lo que haría en su lugar: permitir el puerto de aplicación desde el Security Group del ALB. El riesgo de su enfoque es aumentar innecesariamente la superficie de ataque.</p>
          </Nota>
          <QaItem question='"Si tenemos Auto Scaling, ya no necesitamos Health Checks."' answer="Falso. Sin una buena señal de salud, podemos tener la cantidad correcta de servidores, pero algunos pueden estar rotos — cantidad 2 no significa 2 funcionales." />
          <RoleGrid roles={[
            { icon: 'settings', label: 'ALB', desc: 'Entrada' },
            { icon: 'target', label: 'Target Group', desc: 'Destinos' },
            { icon: 'alert-triangle', label: 'Health Check', desc: 'Salud' },
            { icon: 'bar-chart', label: 'ASG', desc: 'Cantidad' },
            { icon: 'file-text', label: 'Launch Template', desc: 'Configuración' },
            { icon: 'target', label: 'Scaling Policy', desc: 'Elasticidad' },
            { icon: 'building', label: 'Multi-AZ', desc: 'Distribución geográfica' },
            { icon: 'database', label: 'RDS', desc: 'Datos' },
          ]} />
          <p>Ninguno resuelve todo solo.</p>
        </section>

        <section className="lesson-section">
          <h3>82. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'ALB crea nuevas EC2.', correct: false },
            { text: 'ASG puede registrar nuevas EC2 en un Target Group asociado.', correct: true },
            { text: 'Health Checks permiten detectar Targets que no responden.', correct: true },
            { text: 'Tener varias EC2 en una AZ elimina el riesgo de falla de zona.', correct: false },
            { text: 'Scaling Policy puede provocar Scale Out.', correct: true },
            { text: 'RDS tiene que ser pública para que las EC2 la utilicen.', correct: false },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>83. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>84. Reto oral</h3>
          <Dialogo>Explícame esta arquitectura sin utilizar las palabras AWS, ALB, Auto Scaling, EC2, servidor, Target Group, Health Check, Availability Zone, Load Balancer, Cloud, RDS ni Internet.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Existe una puerta común que reparte trabajo entre varios trabajadores ubicados en lugares separados. Un mecanismo verifica continuamente cuáles están listos, otro mantiene la cantidad necesaria y puede agregar o reemplazar trabajadores automáticamente según fallos o demanda."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>86. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>ALB</td><td>Recibe y distribuye solicitudes</td></tr>
              <tr><td>Listener</td><td>Recibe un protocolo/puerto</td></tr>
              <tr><td>Target Group</td><td>Agrupa destinos</td></tr>
              <tr><td>Health Check</td><td>Determina quién puede atender</td></tr>
              <tr><td>ASG</td><td>Mantiene y ajusta EC2</td></tr>
              <tr><td>Launch Template</td><td>Define cómo nacen</td></tr>
              <tr><td>Scaling Policy</td><td>Decide cuándo crecer/reducir</td></tr>
              <tr><td>Multi-AZ</td><td>Reduce dependencia de una zona</td></tr>
              <tr><td>SG por capas</td><td>Limita quién habla con quién</td></tr>
              <tr><td>RDS privada</td><td>Mantiene la capa de datos aislada</td></tr>
              <tr><td>Replacement</td><td>Sustituye capacidad problemática</td></tr>
              <tr><td>Scale Out</td><td>Agrega capacidad</td></tr>
              <tr><td>Scale In</td><td>Retira capacidad</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>87. Ticket de salida</h3>
          <Dialogo>Tenemos dos EC2 en dos Availability Zones detrás de un ALB. Una queda Unhealthy. El ASG tiene Desired = 2 y está integrado con el Target Group. ¿Qué debería ocurrir?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>El ALB debería dejar de enviar tráfico normal a la instancia no saludable. Auto Scaling debería intentar reemplazarla para recuperar la capacidad deseada. La nueva instancia se crea desde el Launch Template, se registra en el Target Group y debe pasar sus Health Checks antes de comenzar a recibir tráfico.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 8</div>
          <p>"Ahora les toca a ustedes." En la próxima clase no vamos a explicar una nueva tecnología. Vamos a entregar una empresa, tráfico variable, una EC2 que falla, una AZ problemática, una RDS privada, una mala configuración y una política de escalado. El estudiante tendrá que diseñar, construir, romper, diagnosticar y reparar la arquitectura.</p>
          <ConceptBadge icon="trophy">Módulo 7 · Clase 8 — Laboratorio integrador: construir CloudShop escalable, provocar fallas y demostrar que la arquitectura puede recuperarse</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-7/clase-8" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 8: Laboratorio integrador →
          </Link>
        </div>

      </div>
    </div>
  );
}
