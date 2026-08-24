import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué es un Launch Template?', options: [{ text: 'Plantilla para lanzar EC2.', correct: true }, { text: 'Target Group.', correct: false }, { text: 'Backup RDS.', correct: false }, { text: 'Route Table.', correct: false }] },
  { q: '¿Qué define la AMI?', options: [{ text: 'Imagen base de la instancia.', correct: true }, { text: 'Cantidad máxima de EC2.', correct: false }, { text: 'Health Check.', correct: false }, { text: 'Target Group.', correct: false }] },
  { q: '¿Qué define principalmente el Instance Type?', options: [{ text: 'Recursos de cómputo.', correct: true }, { text: 'Path web.', correct: false }, { text: 'Backup.', correct: false }, { text: 'VPC CIDR.', correct: false }] },
  { q: '¿Para qué sirve User Data?', options: [{ text: 'Ejecutar configuración automática al iniciar.', correct: true }, { text: 'Crear usuarios IAM.', correct: false }, { text: 'Crear snapshots.', correct: false }, { text: 'Definir Maximum Capacity.', correct: false }] },
  { q: '¿Quién define Desired Capacity?', options: [{ text: 'Auto Scaling Group.', correct: true }, { text: 'Launch Template.', correct: false }, { text: 'Target Group.', correct: false }, { text: 'ALB Listener.', correct: false }] },
  { q: '¿Quién define qué AMI usar?', options: [{ text: 'Launch Template.', correct: true }, { text: 'RDS.', correct: false }, { text: 'Target Group.', correct: false }, { text: 'Listener.', correct: false }] },
  { q: '¿Una plantilla puede tener versiones?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Crear Version 2 modifica automáticamente las instancias antiguas?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: 'Si User Data falla, ¿la EC2 puede estar Running pero Unhealthy?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Por qué queremos plantillas reproducibles?', options: [{ text: 'Para crear instancias consistentes automáticamente.', correct: true }, { text: 'Para guardar imágenes S3.', correct: false }, { text: 'Para reemplazar VPC.', correct: false }, { text: 'Para crear IAM Groups.', correct: false }] },
];

export default function Modulo7Clase5() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 7 · Clase 5</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 7 · Clase 5: Launch Templates, la receta que permite a Auto Scaling crear servidores iguales una y otra vez</h2>
      <p className="lesson-subtitle">
        El Launch Template define cómo debe nacer una nueva EC2.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + configuración guiada + automatización + diagnóstico + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 7 · Clases 1 a 4</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es un Launch Template y por qué Auto Scaling necesita una plantilla.</li>
            <li>Identificar los principales elementos de una plantilla: AMI, Instance Type, Security Group, Storage y User Data.</li>
            <li>Explicar cómo User Data automatiza la preparación de una EC2.</li>
            <li>Comprender por qué las nuevas instancias deben ser reproducibles.</li>
            <li>Reconocer que un Launch Template puede tener versiones.</li>
            <li>Comprender la relación Launch Template → Auto Scaling Group → EC2.</li>
            <li>Diagnosticar errores comunes de una plantilla.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-3. Recordemos dónde quedamos</h3>
          <Nota><p>Nuestro Auto Scaling Group dice Minimum = 2, Desired = 2, Maximum = 5. Tenemos A ✅, B 💥. Auto Scaling detecta "me falta una instancia" y decide crear C. Pero aparece una pregunta enorme: ¿cómo sabe cómo debe ser C?</p></Nota>
          <p>Debe conocer qué sistema operativo, qué tipo de instancia, qué Security Group, qué disco, qué aplicación y qué configuración. No queremos que AWS improvise "hoy haré una EC2 misteriosa" — necesitamos una receta.</p>
        </section>

        <section className="lesson-section">
          <h3>4-6. Esa receta es el Launch Template</h3>
          <p>Un Launch Template contiene parámetros utilizados para lanzar instancias EC2.</p>
          <ConceptBadge icon="file-text">Es una plantilla que describe cómo queremos que se creen nuestros servidores</ConceptBadge>
          <Dialogo>Tenemos una pizzería. La receta dice masa, tomate, queso, jamón, 20 minutos. Cada vez que necesitamos otra pizza, seguimos la receta — no preguntamos nuevamente "¿qué ingredientes llevaba?"</Dialogo>
          <RoleGrid roles={[
            { icon: 'disc', label: 'AMI', desc: '' },
            { icon: 'server', label: 'Instance Type', desc: '' },
            { icon: 'shield', label: 'Security Group', desc: '' },
            { icon: 'hard-drive', label: 'Storage', desc: '' },
            { icon: 'file-text', label: 'User Data', desc: '' },
          ]} />
          <p>Todas las instancias parten de una configuración común.</p>
        </section>

        <section className="lesson-section">
          <h3>7-9. ¿Por qué importa que sean parecidas?</h3>
          <p>Nuestro Load Balancer espera que todas puedan atender HTTP puerto 80 y responder /health. Si A tiene Apache y B no, la infraestructura deja de ser predecible.</p>
          <Nota><p>Configurar manualmente cinco servidores puede terminar en: A correcto, B con SG equivocado, C sin Apache, D con versión antigua, E "Pedro sabe qué le hizo". Eso no escala bien. Queremos <strong>reproducibilidad</strong>: poder crear nuevamente una infraestructura con la misma configuración esperada, reduciendo errores manuales, diferencias inesperadas y tiempo de preparación.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>10-12. Primer componente: AMI</h3>
          <p>El Launch Template puede definir una <strong>Amazon Machine Image (AMI)</strong>: la imagen base desde la cual comienza la EC2 — por ejemplo, Amazon Linux.</p>
          <Dialogo>Antes de construir una vivienda decidimos qué plano base utilizaremos. La AMI cumple una función similar: define un punto inicial para el sistema operativo, la configuración base y el software incluido según la imagen.</Dialogo>
          <p>La AMI no tiene que incluir toda la aplicación: podemos tener una AMI de sistema operativo base y usar User Data para instalar y configurar la aplicación. También existen estrategias con una AMI previamente preparada; para este curso usaremos una AMI sencilla + User Data.</p>
        </section>

        <section className="lesson-section">
          <h3>13-14. Segundo componente: Instance Type</h3>
          <p>El Launch Template puede definir el <strong>Instance Type</strong> — por ejemplo una clase pequeña apropiada para laboratorio. Esto determina CPU, RAM y capacidades asociadas.</p>
          <Nota><p>El right sizing vuelve: no seleccionamos una instancia gigante porque Auto Scaling puede crear varias. Si elegimos una instancia enorme y el ASG escala a 10 instancias, tenemos una factura musculosa.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>15-16. Tercer componente: Security Group</h3>
          <p>Nuestro Launch Template puede asociar sg-cloudshop-web: HTTP 80, Source SG-ALB. Cada nueva instancia nace con el control de red apropiado.</p>
          <Nota><p>Un SG equivocado se replica: si la plantilla utiliza sg-wrong, Auto Scaling puede crear A, B, C, D perfectamente idénticas — y perfectamente inútiles.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>17. Cuarto componente: Storage</h3>
          <p>Podemos definir almacenamiento para las nuevas instancias, por ejemplo Root Volume SSD con una capacidad apropiada. No necesitamos profundizar aquí porque EBS ya pertenece al mundo EC2 — solo recordamos que las nuevas instancias también necesitan disco.</p>
        </section>

        <section className="lesson-section">
          <h3>18-19. ¿Y Key Pair? SSH no es requisito de Auto Scaling</h3>
          <p>Un Launch Template puede incluir una Key Pair en configuraciones donde realmente necesitamos acceso SSH. Pero para infraestructura automatizada debemos preguntarnos: ¿necesitamos administrar manualmente cada servidor? No asumimos que todas las EC2 deban tener SSH abierto al mundo.</p>
          <Nota><p>Auto Scaling no necesita entrar por SSH para crear la instancia. La instancia debe poder configurarse automáticamente — eso nos lleva a una pieza fundamental: User Data.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>20-23. User Data</h3>
          <p>User Data permite ejecutar instrucciones cuando una instancia EC2 se inicia.</p>
          <ConceptBadge icon="file-text">Es una lista de instrucciones que puede preparar automáticamente el servidor cuando nace</ConceptBadge>
          <pre className="codeblock">{`#!/bin/bash
dnf install -y httpd
systemctl enable httpd
systemctl start httpd`}</pre>
          <p>Entonces una nueva instancia arranca, instala Apache, lo activa y lo inicia, sin que un humano entre manualmente. Podemos agregar una página:</p>
          <pre className="codeblock">{`echo "<h1>CloudShop funcionando</h1>" > /var/www/html/index.html`}</pre>
          <p>Y para integrarlo con la clase anterior, un endpoint /health:</p>
          <pre className="codeblock">{`mkdir -p /var/www/html/health
echo "OK" > /var/www/html/health/index.html`}</pre>
          <p>Entonces el Load Balancer puede comprobar /health/ y recibir 200 OK.</p>
        </section>

        <section className="lesson-section">
          <h3>24-25. Flujo completo de nacimiento</h3>
          <Flow steps={[
            { icon: 'bar-chart', label: 'Auto Scaling' }, { icon: 'file-text', label: 'Launch Template' }, { icon: 'server', label: 'Nueva EC2' },
            { label: 'User Data' }, { icon: 'globe', label: 'Apache + App' }, { icon: 'alert-triangle', label: 'Health Check' }, { icon: 'dot-success', label: 'Healthy' }, { icon: 'settings', label: 'ALB envía tráfico' },
          ]} />
          <p>Este flujo es el corazón de esta clase. Una nueva instancia puede aparecer a las 03:17 AM — no queremos que AWS nos llame "hola, despierte, acabo de crear una EC2, entre a instalar Apache". La automatización debe prepararla.</p>
        </section>

        <section className="lesson-section">
          <h3>26-29. User Data puede fallar</h3>
          <p>EC2 Running ✅, pero User Data ❌: Apache no se instaló. Entonces Health Check ❌ y el Target queda Unhealthy. El problema está en la preparación automática.</p>
          <Flow steps={[
            { label: '¿EC2 lanzó?' }, { label: '¿AMI correcta?' }, { label: '¿Instance Type válido?' }, { label: '¿Security Group correcto?' },
            { label: '¿User Data ejecutó?' }, { label: '¿Aplicación inició?' }, { label: '¿Health Check responde?' },
          ]} />
          <Nota><p>No culpamos al Load Balancer primero. Si todas las instancias nuevas aparecen Unhealthy, el ALB puede estar funcionando perfectamente — el problema podría estar en el Launch Template o el User Data.</p></Nota>
          <Dialogo>Tenemos una fábrica. Cada producto sale defectuoso, defectuoso, defectuoso. ¿El problema está en los clientes? No. Miramos la línea de producción. El Launch Template es parte de esa línea.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>30-34. Versiones del Launch Template</h3>
          <p>Los Launch Templates pueden tener versiones: Version 1 y después Version 2, cuando cambiamos la configuración. Esto permite evolucionar la receta — por ejemplo, Version 1 con una AMI antigua, Version 2 con una AMI nueva o User Data mejorado. No necesitamos destruir toda la plantilla para cada cambio.</p>
          <Nota><p>Pero cambiar la plantilla no cambia mágicamente instancias viejas. Si EC2 A y B fueron creadas con Version 1, y creamos Version 2, eso no significa que A y B se transformen — ya fueron creadas. Una plantilla afecta futuros lanzamientos: si el ASG utiliza Version 2 para futuros lanzamientos, la nueva EC2 C puede nacer con Version 2, mientras A y B todavía conservan la configuración con la que nacieron.</p></Nota>
          <p>Más adelante existen estrategias para reemplazar flotas de instancias gradualmente (Instance Refresh, que no profundizaremos aquí) — pero dejamos instalada la idea: actualizar una plantilla y actualizar toda la flota no son exactamente lo mismo.</p>
        </section>

        <section className="lesson-section">
          <h3>35-36. Qué puede contener una plantilla y Tags</h3>
          <InfoBox title="Para nuestro nivel" items={['AMI', 'Instance Type', 'Security Group', 'Storage', 'Key Pair si corresponde', 'User Data', 'Tags']} />
          <p>Podemos agregar etiquetas como Proyecto = CloudShop, Rol = Web, Ambiente = Laboratorio — cada instancia creada puede ser más fácil de identificar, buscar, administrar y eliminar.</p>
        </section>

        <section className="lesson-section">
          <h3>37-38. Nombres de instancia dinámicos: el servidor deja de ser especial</h3>
          <p>En Auto Scaling no debemos depender excesivamente de nombres como Servidor-Pedro o Servidor-Final2 — las instancias pueden nacer y morir automáticamente. Pensamos más en Rol = Web que en una máquina individual eternamente importante.</p>
          <Dialogo>Antes: "no toques Web-01, es nuestro servidor histórico." Ahora: "si Web-01 falla, debe poder ser reemplazado." Ese cambio de mentalidad es fundamental en Cloud.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>39-40. Launch Template y ASG</h3>
          <Flow steps={[{ icon: 'file-text', label: 'Launch Template' }, { icon: 'bar-chart', label: 'Auto Scaling Group' }, { icon: 'server', label: 'EC2 A / B / C' }]} />
          <RoleGrid roles={[
            { icon: 'bar-chart', label: 'ASG', desc: '¿Cuántas?' },
            { icon: 'file-text', label: 'Launch Template', desc: '¿Cómo?' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>41-46. Laboratorio conceptual: creamos el Launch Template</h3>
          <p>Ruta conceptual: EC2 → Launch Templates → Create launch template. Nombre: <code>cloudshop-web-template</code>.</p>
          <p>AMI: Amazon Linux, versión actual compatible — no fijamos una AMI ID específica en el contenido reutilizable porque cambia por Región y con el tiempo. Instance Type: una instancia pequeña apropiada para laboratorio — otra vez, no fijamos una familia eterna; queremos enseñar el criterio.</p>
          <p>Security Group: <code>sg-cloudshop-web</code>, permite HTTP 80 desde <code>sg-cloudshop-alb</code>.</p>
          <pre className="codeblock">{`#!/bin/bash
dnf install -y httpd
systemctl enable httpd
systemctl start httpd
echo "<h1>CloudShop</h1>" > /var/www/html/index.html
mkdir -p /var/www/html/health
echo "OK" > /var/www/html/health/index.html`}</pre>
          <p>Nuestro Target Group tiene Health Check Path: /health/. Una nueva instancia debe responder ahí — todo queda conectado.</p>
          <Flow steps={[
            { icon: 'globe', label: 'Usuarios' }, { icon: 'settings', label: 'ALB' }, { icon: 'target', label: 'Web Target Group — /health/' },
            { icon: 'server', label: 'EC2 A / B' }, { icon: 'bar-chart', label: 'Web ASG' }, { icon: 'file-text', label: 'Launch Template' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>47-50. Simulamos falla: C nace desde la plantilla</h3>
          <p>Tenemos A ✅, B ✅. Terminamos B. El ASG dice Desired = 2, Actual = 1: necesita crear C.</p>
          <Flow steps={[
            { label: 'cloudshop-web-template' }, { label: 'Nueva C' }, { label: 'Amazon Linux' }, { label: 'Security Group' },
            { label: 'User Data' }, { label: 'Apache' }, { label: '/health/' }, { icon: 'dot-success', label: 'Healthy' },
          ]} />
          <Nota><p>Ahí está la automatización real: nadie eligió manualmente la AMI, instaló Apache manualmente, creó la página manualmente ni configuró el SG manualmente. La plantilla ya lo definió.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>51-54. Cuatro errores comunes</h3>
          <QaItem question="Launch Template usa una AMI que no corresponde y User Data intenta 'dnf install httpd' en una distribución incompatible. ¿Qué ocurre?" answer="El script puede fallar y el Target queda Unhealthy." />
          <QaItem question="Template usa SG-No-Web, que no permite HTTP 80 desde el ALB. ¿Qué ocurre?" answer="Unhealthy." />
          <QaItem question="User Data tiene un typo: 'dnf install htttpd'. ¿Qué ocurre?" answer="Apache no se instala; la EC2 queda Running pero Health ❌ — conecta directamente con la Clase 3." />
          <QaItem question="User Data configura la aplicación en 8080, pero el Target Group espera 80. ¿Qué ocurre?" answer="No se encuentran. Debemos alinear App + SG + Target Group + Health Check." />
        </section>

        <section className="lesson-section">
          <h3>55-56. Una plantilla no debe contener secretos en texto plano</h3>
          <Nota><p>Evitamos incluir directamente <code>DB_PASSWORD=SuperSecreto123</code> en User Data reutilizable sin una estrategia segura, porque las credenciales son secretos. Más adelante podríamos utilizar servicios como Secrets Manager o Parameter Store. Automatizar secretos mal también escala mal: si ponemos una contraseña sensible en la plantilla y creamos 50 instancias, hemos distribuido el mismo problema 50 veces.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>57-58. Versionamos la plantilla</h3>
          <p>Version 1 tiene "CloudShop v1"; creamos Version 2 con "CloudShop v2" — una receta nueva. Pero no basta crear una nueva versión: debemos asegurarnos de que el Auto Scaling Group esté configurado para usar la versión que realmente queremos lanzar.</p>
        </section>

        <section className="lesson-section">
          <h3>59-62. Actividades</h3>
          <QaItem question='"Necesito 3 EC2." / "Usa Amazon Linux." / "Máximo 6." / "Instala Apache." / "Usa sg-web." / "Desired = 4."' answer="ASG / Launch Template / ASG / Launch Template (User Data) / Launch Template / ASG." />
          <QaItem question="Sistema operativo base / CPU-RAM aproximada / Acceso desde ALB / Instalar Apache automáticamente / Disco raíz" answer="AMI / Instance Type / Security Group / User Data / Storage." />
          <QaItem question="AMI ✅, Instance Type ✅, User Data ✅, Apache ✅, pero SG-Web sin HTTP desde SG-ALB. ¿Dónde está el problema?" answer="Security Group." />
          <QaItem question="SG ✅, AMI ✅, Target Group ✅, pero User Data crea /healthy mientras Health Check consulta /health. ¿Resultado?" answer="Unhealthy." />
        </section>

        <section className="lesson-section">
          <h3>63-64. Caso UniversidadCloud</h3>
          <Nota><p>Necesitamos servidores idénticos para el portal: Amazon Linux, Apache, página UniversidadCloud, /health, SG-Web. No queremos configurar cada uno manualmente — solución: Launch Template.</p></Nota>
          <InfoBox items={['Name: universidad-web-template', 'AMI: Amazon Linux', 'Instance Type: pequeño', 'SG: universidad-web-sg', 'User Data: instalar Apache, crear portal, crear /health']} />
        </section>

        <section className="lesson-section">
          <h3>65-66. RETO DE LA CLASE</h3>
          <Nota><p>EventCloud tiene un Auto Scaling Group: Min 2, Desired 2, Max 6. Cada servidor nuevo debe utilizar Amazon Linux, instalar Apache, responder /health, permitir HTTP solo desde SG-ALB, mostrar EventCloud activo y poder crearse sin intervención manual. Diseña el Launch Template.</p></Nota>
          <Reveal label="Ver la solución esperada">
            <InfoBox title="eventcloud-web-template" items={['Amazon Linux', 'Clase pequeña', 'sg-eventcloud-web', 'Almacenamiento apropiado', 'User Data']} />
            <pre className="codeblock">{`#!/bin/bash
dnf install -y httpd
systemctl enable httpd
systemctl start httpd
echo "<h1>EventCloud activo</h1>" > /var/www/html/index.html
mkdir -p /var/www/html/health
echo "OK" > /var/www/html/health/index.html`}</pre>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>67-69. Retos nivel 2 y 3, y diagnóstico completo</h3>
          <QaItem question="El ASG crea nuevas EC2 y todas aparecen Running ✅ pero Unhealthy ❌. ¿Culpamos primero a Auto Scaling?" answer="No. Revisamos Launch Template, User Data, SG, Target Group y Health Path — el grupo sí está creando instancias." />
          <QaItem question="Template Version 1 usaba HTTP 80. Version 2 hace que la app escuche 8080, pero el Target Group sigue en Port 80. ¿Qué puede ocurrir?" answer="Las nuevas instancias pueden quedar Unhealthy. Actualizar una parte de la arquitectura puede requerir actualizar otras." />
          <Flow steps={[
            { label: 'ASG crea EC2 ✅' }, { label: 'EC2 Running ✅' }, { label: 'Target Unhealthy ❌' },
            { label: '¿AMI correcta?' }, { label: '¿User Data terminó?' }, { label: '¿Servicio iniciado?' }, { label: '¿Puerto coincide?' }, { label: '¿SG permite ALB?' }, { label: '¿Health path existe?' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>70-73. Dos propuestas que rechazar y plantillas por rol</h3>
          <Nota>
            <p>El administrador propone: "si una instancia nueva sale mal, la arreglo manualmente y listo." No estoy de acuerdo porque Auto Scaling puede eliminar esa instancia y crear otra con el mismo defecto. Esto es lo que haría en su lugar: corregir la plantilla o el proceso automático que genera el problema. El riesgo de su enfoque es repetir trabajo manual en una infraestructura diseñada precisamente para ser reemplazable.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: "hagamos una plantilla distinta para cada EC2." No estoy de acuerdo porque perderíamos gran parte de la consistencia y reproducibilidad buscadas. Esto es lo que haría en su lugar: utilizar una plantilla común por rol y parametrizar solo lo realmente necesario. El riesgo es volver a una infraestructura llena de configuraciones únicas difíciles de mantener.</p>
          </Nota>
          <p>Podríamos tener web-template para Web y worker-template para Workers — no template-A, template-B, template-C solo porque son máquinas distintas. Pensamos en función (Rol: WEB), no en individuo (Servidor-17), porque la instancia puede ser reemplazada mañana; la función permanece.</p>
        </section>

        <section className="lesson-section">
          <h3>74. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'Launch Template decide cuántas EC2 existen.', correct: false },
            { text: 'Launch Template define cómo crear EC2.', correct: true },
            { text: 'User Data puede automatizar configuración.', correct: true },
            { text: 'Una nueva versión cambia automáticamente todas las EC2 existentes.', correct: false },
            { text: 'Una mala plantilla puede crear muchas instancias defectuosas.', correct: true },
            { text: 'ASG y Launch Template trabajan juntos.', correct: true },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>75. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>76. Reto oral</h3>
          <Dialogo>Explícame qué hace un Launch Template sin utilizar las palabras Launch, Template, EC2, servidor, instancia, AWS, AMI, User Data, configuración, Auto Scaling ni Cloud.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Es una receta reutilizable que describe cómo debe construirse cada nuevo trabajador para que todos comiencen con las mismas características y puedan prepararse automáticamente."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>78. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Launch Template</td><td>Receta para nuevas EC2</td></tr>
              <tr><td>AMI</td><td>Imagen base</td></tr>
              <tr><td>Instance Type</td><td>Potencia de la instancia</td></tr>
              <tr><td>Security Group</td><td>Reglas de red</td></tr>
              <tr><td>Storage</td><td>Disco de la EC2</td></tr>
              <tr><td>User Data</td><td>Configuración automática</td></tr>
              <tr><td>Tags</td><td>Identificación de recursos</td></tr>
              <tr><td>Version</td><td>Evolución de la plantilla</td></tr>
              <tr><td>ASG</td><td>Decide cuántas instancias</td></tr>
              <tr><td>Health Check</td><td>Comprueba si quedaron listas</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>79. Ticket de salida</h3>
          <Dialogo>Un Auto Scaling Group crea nuevas EC2, pero todas quedan Unhealthy porque Apache nunca se instala. ¿Qué componente revisarías primero?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Revisaría el Launch Template, especialmente el User Data y la AMI utilizada, porque Auto Scaling está creando correctamente las instancias, pero la configuración automática necesaria para preparar la aplicación está fallando.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 6</div>
          <p>Ya tenemos Launch Template, Auto Scaling Group, EC2 reproducibles, Health Checks y Load Balancer. Pero nuestro grupo todavía puede estar Minimum = 2, Desired = 2, Maximum = 6 — y permanecer eternamente en 2 instancias, aunque lleguen 50.000 usuarios.</p>
          <p>Falta responder: ¿qué hace que Auto Scaling decida pasar de 2 a 4 instancias y luego volver a 2 cuando la demanda baja?</p>
          <ConceptBadge icon="bar-chart">Módulo 7 · Clase 6 — Políticas de escalado: Scale Out, Scale In y Target Tracking para reaccionar automáticamente a la demanda</ConceptBadge>
          <span className="tag tag-outline">Módulo 7 · Clase 6 · próximamente</span>
        </div>

      </div>
    </div>
  );
}
