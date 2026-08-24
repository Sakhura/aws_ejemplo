import {
  Icon, Nota, Dialogo, ConceptBadge, Flow, InfoBox, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué componente recibe el tráfico de los usuarios?', options: [{ text: 'Application Load Balancer', correct: true }, { text: 'Auto Scaling Group', correct: false }, { text: 'Launch Template', correct: false }, { text: 'RDS', correct: false }] },
  { q: '¿Qué hace el Listener?', options: [{ text: 'Escucha un protocolo y puerto.', correct: true }, { text: 'Crea EC2.', correct: false }, { text: 'Cambia Desired.', correct: false }, { text: 'Crea backups.', correct: false }] },
  { q: '¿Qué agrupa los destinos que pueden recibir tráfico?', options: [{ text: 'Target Group', correct: true }, { text: 'IAM Group', correct: false }, { text: 'DB Subnet Group', correct: false }, { text: 'Route Table', correct: false }] },
  { q: '¿Qué determina si un Target responde correctamente?', options: [{ text: 'Health Check', correct: true }, { text: 'Launch Template', correct: false }, { text: 'Scaling Policy', correct: false }, { text: 'RDS Snapshot', correct: false }] },
  { q: '¿Qué administra la cantidad de EC2?', options: [{ text: 'Auto Scaling Group', correct: true }, { text: 'ALB', correct: false }, { text: 'Listener', correct: false }, { text: 'S3', correct: false }] },
  { q: '¿Qué define cómo nace una nueva EC2?', options: [{ text: 'Launch Template', correct: true }, { text: 'Target Group', correct: false }, { text: 'Health Check', correct: false }, { text: 'Listener', correct: false }] },
  { q: '¿Qué significa Scale Out?', options: [{ text: 'Agregar capacidad.', correct: true }, { text: 'Reducir capacidad.', correct: false }, { text: 'Eliminar ALB.', correct: false }, { text: 'Crear snapshot.', correct: false }] },
  { q: '¿Qué significa Scale In?', options: [{ text: 'Reducir capacidad.', correct: true }, { text: 'Agregar capacidad.', correct: false }, { text: 'Crear RDS.', correct: false }, { text: 'Abrir Security Group.', correct: false }] },
  { q: '¿Qué es Target Tracking?', options: [{ text: 'Una política que ajusta capacidad según una métrica objetivo.', correct: true }, { text: 'Un Health Check.', correct: false }, { text: 'Una AMI.', correct: false }, { text: 'Un Listener.', correct: false }] },
  { q: '¿Por qué utilizamos dos AZ?', options: [{ text: 'Para reducir dependencia de una sola zona.', correct: true }, { text: 'Para crear usuarios IAM.', correct: false }, { text: 'Para guardar archivos.', correct: false }, { text: 'Para aumentar CPU.', correct: false }] },
  { q: '¿Load Balancer crea nuevas EC2?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Auto Scaling distribuye las solicitudes de usuario?', options: [{ text: 'Sí.', correct: false }, { text: 'No, esa función corresponde al Load Balancer.', correct: true }] },
  { q: '¿Una EC2 Running garantiza que el servicio web esté sano?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Auto Scaling puede considerar Health Checks de ELB si están habilitados?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Maximum Capacity puede impedir seguir creciendo?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
];

export default function Modulo7Clase8() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 7 · Clase 8</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 7 · Clase 8: Laboratorio integrador, construir CloudShop escalable, provocar fallas y demostrar que la arquitectura puede recuperarse</h2>
      <p className="lesson-subtitle">
        Una arquitectura escalable no depende de que cada servidor sobreviva; depende de que el sistema pueda detectar fallas, reemplazar capacidad y seguir atendiendo.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">60 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Laboratorio + arquitectura + fallas controladas + escalado + diagnóstico + evaluación final</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 7 · Clases 1 a 7</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Diseñar una aplicación distribuida entre múltiples EC2 e implementar conceptualmente un Application Load Balancer.</li>
            <li>Crear y utilizar un Listener, asociar un Target Group y configurar Health Checks.</li>
            <li>Utilizar un Launch Template y crear un Auto Scaling Group con Minimum, Desired y Maximum Capacity.</li>
            <li>Distribuir instancias entre dos Availability Zones y asociar el ASG con un Target Group.</li>
            <li>Configurar una política Target Tracking.</li>
            <li>Provocar una falla controlada y observar cómo el ALB retira un Target no saludable y Auto Scaling recupera capacidad.</li>
            <li>Simular un aumento de carga y comprender Scale Out y Scale In.</li>
            <li>Diagnosticar configuraciones incorrectas e integrar ALB + EC2 + Auto Scaling + RDS privada.</li>
            <li>Limpiar los recursos del laboratorio.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2. La misión</h3>
          <Nota><p>CloudShop tiene hoy Usuarios → EC2 → RDS. Funciona. Pero CloudShop anuncia CyberCloud Day: el tráfico pasará de 200 usuarios a 50.000 durante algunas horas. Además, una EC2 puede fallar. Queremos que el sistema continúe funcionando.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>3. Requisitos del negocio</h3>
          <InfoBox items={[
            'Aplicación web pública', 'RDS privada', 'Mínimo 2 servidores', 'Máximo 6 servidores', 'Dos Availability Zones',
            'Reemplazo automático ante fallos', 'Crecimiento automático ante carga', 'Reducción automática cuando baja la carga', 'Solo servidores saludables reciben tráfico',
          ]} />
        </section>

        <section className="lesson-section">
          <h3>4. Antes de AWS, diseñamos</h3>
          <Flow steps={[
            { icon: 'globe', label: 'Internet' }, { icon: 'settings', label: 'ALB' }, { icon: 'target', label: 'Target Group' }, { icon: 'alert-triangle', label: 'Health Checks' },
            { icon: 'building', label: 'AZ A + AZ B' }, { icon: 'server', label: 'EC2' }, { icon: 'bar-chart', label: 'Auto Scaling' }, { icon: 'file-text', label: 'Launch Template' },
            { icon: 'target', label: 'Scaling Policy' }, { icon: 'database', label: 'RDS' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>5-8. Punto de entrada: creamos el ALB</h3>
          <Nota><p>No queremos Usuario → EC2 A directamente, porque EC2 A volvería a ser un punto directo de dependencia. Utilizaremos un Application Load Balancer como entrada.</p></Nota>
          <InfoBox title="ALB" items={['Name: cloudshop-alb', 'Scheme: Internet-facing', 'VPC: cloudshop-vpc', 'AZ: A y B', 'Subnets: public-subnet-a, public-subnet-b']} />
          <InfoBox title="SG-ALB (sg-cloudshop-alb)" items={['Inbound: HTTPS 443', 'Source: Internet']} />
          <p>Para un laboratorio simplificado también podemos trabajar temporalmente con HTTP 80, pero el concepto de producción es HTTPS.</p>
        </section>

        <section className="lesson-section">
          <h3>8-10. Listener, Target Group y Health Check</h3>
          <InfoBox title="Listener" items={['HTTPS :443', 'Default Action: Forward → cloudshop-web-tg']} />
          <InfoBox title="Target Group (cloudshop-web-tg)" items={['Tipo: Instances', 'Protocol: HTTP', 'Port: 80']} />
          <InfoBox title="Health Check" items={['Protocol: HTTP', 'Path: /health/', 'Interval, Timeout, Healthy/Unhealthy threshold con valores educativos razonables']} />
          <p>El objetivo: comprobar si la aplicación realmente responde.</p>
        </section>

        <section className="lesson-section">
          <h3>11-14. Todavía no registramos una flota manual</h3>
          <p>Queremos que Auto Scaling controle las instancias, evitando administrar Web-A, Web-B, Web-C manualmente para siempre.</p>
          <InfoBox title="Launch Template (cloudshop-web-template)" items={['AMI: Amazon Linux', 'Instance Type: pequeña', 'SG: sg-cloudshop-web', 'Almacenamiento apropiado', 'User Data']} />
          <InfoBox title="SG-App (sg-cloudshop-web)" items={['Inbound: HTTP 80', 'Source: sg-cloudshop-alb (no 0.0.0.0/0)']} />
          <p>El usuario llega solo hasta el ALB. Después, ALB → EC2: la EC2 acepta tráfico desde el ALB, no directamente desde cualquier lugar.</p>
        </section>

        <section className="lesson-section">
          <h3>15-16. User Data</h3>
          <pre className="codeblock">{`#!/bin/bash
dnf install -y httpd
systemctl enable httpd
systemctl start httpd

INSTANCE_ID=$(curl -s http://169.254.169.254/latest/meta-data/instance-id)

echo "<h1>CloudShop</h1><p>Servidor: $INSTANCE_ID</p>" > /var/www/html/index.html

mkdir -p /var/www/html/health
echo "OK" > /var/www/html/health/index.html`}</pre>
          <p>Para un laboratorio educativo, mostrar un identificador diferente en cada instancia nos permite visualizar que el ALB está distribuyendo solicitudes.</p>
        </section>

        <section className="lesson-section">
          <h3>17-21. Auto Scaling Group: capacidad y Health Checks de ELB</h3>
          <InfoBox title="cloudshop-web-asg" items={['Launch Template: cloudshop-web-template', 'VPC: cloudshop-vpc', 'Subnets: app-subnet-a, app-subnet-b (dos AZ)']} />
          <InfoBox title="Capacidad" items={['Minimum: 2 (nunca menos de 2)', 'Desired: 2 (queremos 2 ahora)', 'Maximum: 6 (nunca más de 6)']} />
          <p>Asociamos el Target Group cloudshop-web-tg al ASG: cuando el Auto Scaling Group lanza nuevas instancias, estas pueden registrarse automáticamente en el Target Group asociado.</p>
          <p>Activamos también los Health Checks de Elastic Load Balancing para el ASG: con esta integración, una instancia que ELB reporte como no saludable puede ser reemplazada por Auto Scaling — conectando detección con reemplazo.</p>
          <Nota><p><strong>Health Check Grace Period:</strong> una nueva instancia necesita tiempo para Boot → User Data → Apache → Aplicación. Auto Scaling puede utilizar un período de gracia antes de juzgar su salud — no despedimos al trabajador mientras todavía se está poniendo el uniforme.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>22-26. Creamos el grupo y probamos el ALB</h3>
          <p>Con Desired = 2, Auto Scaling lanza EC2 A y B, idealmente distribuidas entre AZ A y AZ B. Después de arrancar, A → Healthy ✅, B → Healthy ✅, porque /health/ responde 200 OK.</p>
          <p>Accedemos mediante el DNS del ALB, no mediante la IP de A ni de B.</p>
          <Flow steps={[{ icon: 'user', label: 'Usuario' }, { icon: 'settings', label: 'ALB' }, { icon: 'target', label: 'Target Group' }, { icon: 'dot-success', label: 'Target saludable' }, { icon: 'server', label: 'EC2' }]} />
          <p>Refrescamos varias veces: podemos observar "CloudShop — Servidor A" y luego "CloudShop — Servidor B". No esperamos necesariamente una alternancia matemática perfecta — el objetivo es verificar que hay múltiples Targets participando.</p>
        </section>

        <section className="lesson-section">
          <h3>27-32. PRUEBA 1: falla de aplicación</h3>
          <p>Provocamos una falla controlada en EC2 B, deteniendo Apache (<code>sudo systemctl stop httpd</code>). Después de los fallos necesarios: A → Healthy ✅, B → Unhealthy ❌.</p>
          <Nota><p>El ALB protege al usuario: ahora Usuario → ALB → A ✅, mientras B queda fuera del tráfico normal. Ese es el primer mecanismo de protección.</p></Nota>
          <p>Si los Health Checks de ELB están habilitados para el ASG, Auto Scaling puede terminar/reemplazar B: nace C usando el Launch Template. C debe demostrar que está lista (User Data → Apache → /health/ → Healthy) antes de comenzar a recibir tráfico.</p>
          <Dialogo>El estudiante debe poder explicar la secuencia completa: B dejó de responder → Health Check la marcó Unhealthy → ALB dejó de enviarle tráfico → Auto Scaling detectó la condición → se lanzó un reemplazo desde el Launch Template → la nueva EC2 se registró → pasó Health Check → volvió la capacidad deseada.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>33-38. PRUEBA 2: aumento de demanda</h3>
          <p>Simulamos mucha carga. Nuestro ASG sigue en Min = 2, Desired = 2, Max = 6 — necesitamos una política.</p>
          <InfoBox title="Target Tracking" items={['Policy: Target Tracking', 'Métrica: Average CPU Utilization', 'Target educativo: 50%']} />
          <p>Para el laboratorio, 50% es sencillo de visualizar. En producción, el valor debe determinarse mediante pruebas y comportamiento real de la aplicación.</p>
          <p>Generamos carga conceptual: CPU promedio 20% → 45% → 70% → 85%. La política detecta un valor por encima del objetivo: Scale Out. El ASG cambia Desired de 2 a 3, y luego según necesidad a 4. Las nuevas EC2 utilizan el Launch Template y deben pasar Health Check antes de ser útiles.</p>
          <Flow steps={[{ icon: 'globe', label: 'Usuarios' }, { icon: 'settings', label: 'ALB' }, { icon: 'target', label: 'Target Group' }, { icon: 'dot-success', label: 'A' }, { icon: 'dot-success', label: 'C' }, { icon: 'dot-success', label: 'D' }, { icon: 'dot-success', label: 'E' }]} />
        </section>

        <section className="lesson-section">
          <h3>39-42. PRUEBA 3: baja la demanda</h3>
          <p>Quitamos la carga. CPU 15%, tenemos 4 instancias — la política puede realizar Scale In y reducir progresivamente la capacidad.</p>
          <Nota><p>Minimum sigue protegiendo: aunque la carga sea casi cero, Desired no debería reducirse por debajo de 2 en nuestra configuración.</p></Nota>
          <p>Esta prueba demuestra elasticidad: más demanda → más infraestructura; poca demanda → menos infraestructura. No simplemente "tener seis servidores todo el día". Podemos configurar tiempo de warmup para evitar utilizar inmediatamente una instancia recién creada como si ya estuviera completamente operativa en las métricas agregadas.</p>
        </section>

        <section className="lesson-section">
          <h3>43-47. PRUEBA 4: problema de Availability Zone</h3>
          <p>Estado: AZ A tiene A y D; AZ B tiene C y E. Planteamos AZ A 💥. No necesariamente necesitamos provocar una falla real de AZ en laboratorio — la simulamos conceptualmente.</p>
          <QaItem question="¿Qué ocurriría con nuestra aplicación?" answer="Tenemos todavía AZ B con C y E — por lo tanto queda capacidad disponible en otra zona. El ALB sigue dirigiendo solicitudes hacia Targets saludables registrados en las zonas disponibles. Resultado esperado: servicio degradado quizá, pero no necesariamente servicio completamente destruido." />
          <p>Si Desired = 4 y perdemos 2 instancias, Auto Scaling intentará recuperar capacidad dentro de las zonas/configuración disponibles — el objetivo: Actual → Desired.</p>
          <Nota><p>Esto es diferente de escalar por tráfico. Falla de zona: Desired = 4, Actual = 2, Auto Scaling intenta volver a 4. Alta carga: Desired 2 → 4, porque cambió la capacidad requerida. Son situaciones diferentes.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>48-52. PRUEBA 5: revisar Security Groups</h3>
          <Flow steps={[{ icon: 'globe', label: 'Internet' }, { icon: 'shield', label: 'SG-ALB' }, { icon: 'settings', label: 'ALB' }, { icon: 'shield', label: 'SG-App' }, { icon: 'server', label: 'EC2' }, { icon: 'shield', label: 'SG-RDS' }, { icon: 'database', label: 'RDS' }]} />
          <InfoBox title="SG-ALB" items={['HTTPS 443', 'Source: Internet']} />
          <InfoBox title="SG-App" items={['HTTP 80', 'Source: SG-ALB']} />
          <InfoBox title="SG-RDS (MySQL)" items={['TCP 3306', 'Source: SG-App (no 0.0.0.0/0)']} />
          <p>Flujo de mínimo acceso: Usuario → ALB, ALB → App, App → RDS. No Usuario → RDS, y tampoco necesariamente Usuario → EC2.</p>
        </section>

        <section className="lesson-section">
          <h3>53. Arquitectura final de CloudShop</h3>
          <Flow steps={[
            { icon: 'globe', label: 'Internet — HTTPS 443' }, { icon: 'shield', label: 'SG-ALB' }, { icon: 'settings', label: 'ALB' }, { icon: 'radio', label: 'Listener' },
            { icon: 'target', label: 'cloudshop-web-tg — /health/' }, { icon: 'building', label: 'AZ A + AZ B — App Subnets' }, { icon: 'server', label: 'EC2' },
            { icon: 'bar-chart', label: 'Auto Scaling Group — Min 2 / Desired 2 / Max 6' }, { icon: 'file-text', label: 'Launch Template' }, { icon: 'target', label: 'Target Tracking — CPU ~50%' },
            { icon: 'shield', label: 'SG-RDS' }, { icon: 'database', label: 'RDS privada' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>54-57. Diagnóstico ordenado: si todos fallan, revisa lo común</h3>
          <Nota><p>Si un usuario reporta "CloudShop no carga", no preguntamos automáticamente "¿está encendida la EC2?" — tenemos múltiples capas y necesitamos diagnóstico ordenado.</p></Nota>
          <QaItem question="El ALB devuelve error. ¿Qué revisamos?" answer="¿ALB está Active? → ¿Listener existe? → ¿Target Group correcto? → ¿Hay Healthy Targets? Si 0 Healthy Targets, miramos la capa de aplicación." />
          <QaItem question="A ❌, B ❌, C ❌ — todos los Targets Unhealthy. ¿Qué sospechamos?" answer="Algo compartido: revisamos Health Check Path, Port, SG-App, Launch Template, User Data. Es menos probable que sean tres problemas totalmente independientes que una configuración común defectuosa." />
        </section>

        <section className="lesson-section">
          <h3>58-64. Siete diagnósticos más</h3>
          <QaItem question="El ASG crea instancias sin parar: C → Unhealthy → termina, D → Unhealthy → termina, E → Unhealthy → termina. ¿Qué sospechamos?" answer="Launch Template o Health Check. El ASG está haciendo exactamente lo que le pedimos, pero la receta produce instancias inútiles." />
          <QaItem question="CPU 95% y no escala. ¿Qué revisamos?" answer="Scaling Policy, Maximum Capacity, CloudWatch metric, ASG activity, Launch failures, Service quotas. Si Desired = 6 y Maximum = 6, ya conocemos una causa posible." />
          <Nota><p>Maximum alcanzado (Max = 6, Actual = 6, CPU = 95%): el sistema ya llegó al techo que nosotros mismos configuramos. No está ignorando la política — está obedeciendo Maximum.</p></Nota>
          <QaItem question="Hay 6 EC2 pero sigue lento, y RDS tiene CPU 100%. ¿Qué concluimos?" answer="El cuello de botella ya no está en EC2. Agregar EC2 7 y 8 no necesariamente soluciona el problema — la arquitectura debe analizarse como conjunto." />
          <QaItem question="La aplicación funciona por IP de la EC2 pero no por el ALB. ¿Qué revisamos primero?" answer="Listener, Target Group, Health Checks, SG-ALB, SG-App — no RDS primero, porque el síntoma está entre usuario y aplicación." />
          <QaItem question="La página carga ('CloudShop ✅') pero Productos no aparece ('Productos ❌'). ¿Qué investigamos?" answer="La capa web sí está funcionando. Investigamos EC2 → RDS: SG-RDS, endpoint, credenciales, motor/puerto." />
        </section>

        <section className="lesson-section">
          <h3>65-68. Actividades</h3>
          <QaItem question="Reparte solicitudes / Determina si EC2 responde / Define cómo nace nueva EC2 / Mantiene dos servidores / Cambia cantidad según CPU / Controla máximo 6" answer="ALB / Health Check / Launch Template / ASG / Scaling Policy / Maximum Capacity." />
          <QaItem question="Una EC2 muere, Desired sigue 2 / CPU aumenta y Desired cambia 2→4 / CPU baja y Desired cambia 4→2" answer="Reemplazo / Scale Out / Scale In." />
          <QaItem question="EC2 con Public IP, SG-App permite 80 desde 0.0.0.0/0, pero tenemos ALB. ¿Qué cambiaríamos?" answer="Permitir el puerto de aplicación solo desde SG-ALB y evitar exposición directa innecesaria." />
          <QaItem question="ALB ✅, EC2 A, B y C todas en AZ A. ¿Qué sigue siendo un punto importante de dependencia?" answer="AZ A." />
        </section>

        <section className="lesson-section">
          <h3>69-71. RETO FINAL DEL MÓDULO 7</h3>
          <Nota><p>TicketStorm vende entradas para un artista extremadamente popular: normalmente 500 usuarios simultáneos, pero durante una venta 100.000. Requisitos: no depender de una sola EC2, usar al menos 2 AZ, mantener mínimo 2 EC2, máximo 10, escalar automáticamente, detectar aplicación caída, reemplazar instancias defectuosas, servidores web no accesibles directamente desde Internet, RDS privada.</p></Nota>
          <Reveal label="Ver la solución conceptual">
            <Flow steps={[
              { icon: 'globe', label: 'Internet' }, { icon: 'settings', label: 'ALB' }, { icon: 'radio', label: 'HTTPS 443' }, { icon: 'target', label: 'ticketstorm-web — /health' },
              { icon: 'building', label: 'AZ A + AZ B' }, { icon: 'server', label: 'EC2' }, { icon: 'bar-chart', label: 'Auto Scaling — Min 2 / Max 10' },
              { icon: 'file-text', label: 'Launch Template' }, { icon: 'target', label: 'Target Tracking' }, { icon: 'database', label: 'RDS privada' },
            ]} />
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>72-75. Cuatro retos finales</h3>
          <QaItem question="A ✅, B ❌. ¿Qué ocurre?" answer="Health Check → B Unhealthy → ALB evita B → ASG reemplaza → nueva C → Health Check → C Healthy → ALB usa A + C." />
          <QaItem question="CPU = 90%, Target = 50%. ¿Qué ocurre?" answer="Target Tracking → Scale Out → Desired aumenta → ASG crea EC2 → se registran → Health Check → reciben tráfico." />
          <QaItem question="Termina la venta, CPU = 12%, tenemos 8 EC2. ¿Qué esperamos?" answer="Scale In gradual, respetando Minimum = 2." />
          <QaItem question="Actual = 10, Max = 10, CPU = 95%. ¿Qué debe decir el estudiante?" answer="Auto Scaling ya alcanzó el máximo configurado; debemos investigar si necesitamos aumentar el límite o si existe otro cuello de botella. No 'AWS está fallando'." />
        </section>

        <section className="lesson-section">
          <h3>76-77. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El gerente propone: "como Auto Scaling reemplaza servidores, no necesitamos varias Availability Zones." No estoy de acuerdo porque una falla de zona puede afectar simultáneamente a múltiples instancias. Esto es lo que haría en su lugar: distribuir el Auto Scaling Group entre dos o más zonas apropiadas. El riesgo de su enfoque es perder toda la capa de aplicación aunque Auto Scaling esté correctamente configurado.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: "si algo falla, ponemos Maximum = 100 y se arregla." No estoy de acuerdo porque escalar solo la capa EC2 no garantiza resolver el cuello de botella y puede aumentar presión sobre RDS u otras dependencias. Esto es lo que haría en su lugar: identificar primero qué componente está limitado. El riesgo de su enfoque es multiplicar costos y empeorar la saturación aguas abajo.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>78-80. Evaluación final: reconstruye los tres flujos</h3>
          <QaItem question="Ordena: User, ALB, Listener, Target Group, Health Check, EC2" answer="User → ALB → Listener → Target Group → Healthy Target → EC2." />
          <QaItem question="Ordena: New EC2, Auto Scaling, Launch Template, Target Group, Health Check" answer="Auto Scaling → Launch Template → New EC2 → Target Group → Health Check → recibe tráfico." />
          <QaItem question="Ordena: CPU alta, CloudWatch, Scaling Policy, ASG, New EC2" answer="CPU alta → CloudWatch → Scaling Policy → ASG → New EC2." />
        </section>

        <section className="lesson-section">
          <h3>81-84. Limpieza del laboratorio</h3>
          <Nota><p>El laboratorio no termina cuando la página funciona. Termina cuando los recursos innecesarios están eliminados: ALB, Target Groups, Auto Scaling Groups, Launch Templates, EC2, Security Groups, RDS si fue creada solo para laboratorio.</p></Nota>
          <p>Debemos considerar dependencias: primero eliminamos o reducimos el ASG, para evitar que cree nuevamente instancias que intentamos borrar manualmente.</p>
          <Dialogo>Estudiante: "eliminé las dos EC2." Auto Scaling: Desired = 2. AWS: "entendido, aquí tiene dos nuevas." Eso no es un error — es el ASG haciendo exactamente su trabajo.</Dialogo>
          <InfoBox title="Orden de limpieza conceptual" items={['1. Auto Scaling Group', '2. Load Balancer', '3. Target Group', '4. Launch Template si ya no se usa', '5. Security Groups sin dependencias', '6. Recursos auxiliares']} />
          <p>La secuencia exacta puede variar según dependencias presentes en la cuenta. Recursos como ALB, EC2 y RDS pueden continuar generando costos mientras existan — laboratorio terminado no significa facturación terminada.</p>
        </section>

        <section className="lesson-section">
          <h3>86. Checklist de laboratorio</h3>
          <InfoBox items={[
            'ALB creado', 'Listener configurado', 'Target Group creado', 'Health Check funcionando', 'Launch Template creado',
            'ASG en dos AZ', 'Min / Desired / Max definidos', 'Target Group asociado al ASG', 'ELB Health Checks habilitados si corresponde',
            'Scaling Policy configurada', 'Prueba de fallo realizada', 'Replacement observado', 'Scale Out comprendido', 'Scale In comprendido',
            'Security Groups revisados', 'RDS privada', 'Recursos de laboratorio eliminados',
          ]} />
        </section>

        <section className="lesson-section">
          <h3>87. Evaluación final del Módulo 7</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>88. Rúbrica del módulo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Nivel</th><th>Evidencia esperada</th></tr></thead>
            <tbody>
              <tr><td>Logrado</td><td>Diseña y explica ALB + ASG + Health Checks + múltiples AZ</td></tr>
              <tr><td>En proceso</td><td>Reconoce los componentes, pero confunde responsabilidades</td></tr>
              <tr><td>Inicial</td><td>Memoriza nombres, pero no logra reconstruir el flujo</td></tr>
            </tbody>
          </table>
          <Nota><p>Para "Logrado", el estudiante debe explicar con sus propias palabras: ¿qué hace ALB? ¿qué hace Listener? ¿qué es Target Group? ¿qué hace Health Check? ¿qué hace Auto Scaling? ¿qué es Desired? ¿qué hace Launch Template? ¿qué provoca Scale Out? ¿qué provoca Scale In? ¿por qué varias AZ? ¿qué pasa cuando una instancia falla? No basta identificar logos.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>90. Reto oral final</h3>
          <Dialogo>Explícame toda la arquitectura sin utilizar las palabras AWS, Load Balancer, Auto Scaling, EC2, servidor, instancia, Target Group, Health Check, Availability Zone, Cloud, CPU ni RDS.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Los clientes llegan a una entrada común que reparte el trabajo entre varios trabajadores ubicados en lugares separados. El sistema comprueba cuáles pueden atender, reemplaza automáticamente a los que fallan y aumenta o reduce la cantidad disponible cuando cambia la demanda."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>92. Las ideas que deben sobrevivir</h3>
          <ul className="plain-list">
            <li>Load Balancer distribuye solicitudes.</li>
            <li>Listener recibe protocolo y puerto.</li>
            <li>Target Group agrupa destinos.</li>
            <li>Health Check determina qué Targets están disponibles.</li>
            <li>Auto Scaling administra cantidad de instancias.</li>
            <li>Minimum, Desired y Maximum definen límites.</li>
            <li>Launch Template describe cómo crear una EC2.</li>
            <li>Scaling Policy decide cuándo modificar capacidad.</li>
            <li>Scale Out agrega capacidad; Scale In reduce capacidad.</li>
            <li>Distribuir entre AZ reduce dependencia de una sola zona.</li>
            <li>Una instancia debe poder ser reemplazada.</li>
            <li>ALB, App y RDS deben tener controles de red por capas.</li>
            <li>RDS no necesita ser pública para servir a las EC2.</li>
            <li>Escalar también puede aumentar costos.</li>
            <li>Más servidores no solucionan automáticamente todos los cuellos de botella.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>93. Ticket de salida del módulo</h3>
          <Dialogo>Una tienda tiene dos EC2 detrás de un ALB. Una deja de responder justo cuando aumenta la demanda. ¿Qué componentes participan para mantener el servicio?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>El Health Check detecta la instancia problemática y el ALB deja de enviarle tráfico. Auto Scaling puede reemplazarla para recuperar la capacidad deseada. Si además la demanda aumenta, una Scaling Policy puede provocar Scale Out y crear más instancias mediante el Launch Template, que se registran en el Target Group y comienzan a recibir tráfico una vez saludables.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="cloud" /> Módulo 7 completado</div>
          <Nota><p>El estudiante comenzó este módulo con Usuarios → una EC2, y termina comprendiendo:</p></Nota>
          <Flow steps={[
            { icon: 'globe', label: 'Usuarios' }, { icon: 'settings', label: 'ALB' }, { icon: 'target', label: 'Healthy Targets' },
            { icon: 'building', label: 'AZ A + AZ B' }, { icon: 'server', label: 'EC2' }, { icon: 'bar-chart', label: 'Auto Scaling' }, { icon: 'target', label: 'Elasticidad' },
          ]} />
          <p>Eso ya no es simplemente ejecutar una máquina. Es empezar a diseñar servicios resilientes y elásticos.</p>
          <ConceptBadge icon="bar-chart">Módulo 8 — Monitoreo, métricas y alertas con Amazon CloudWatch</ConceptBadge>
          <p>Porque ahora tenemos una infraestructura capaz de escalar, reemplazar y balancear, pero queda una pregunta esencial: ¿cómo sabemos que algo está fallando antes de que el usuario nos avise?</p>
          <span className="tag tag-outline">Módulo 8 · próximamente</span>
        </div>

      </div>
    </div>
  );
}
