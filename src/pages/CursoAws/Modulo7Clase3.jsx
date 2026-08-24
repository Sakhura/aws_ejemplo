import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué comprueba un Health Check?', options: [{ text: 'Si el Target responde correctamente.', correct: true }, { text: 'Cuántos usuarios IAM existen.', correct: false }, { text: 'Cuánto cuesta RDS.', correct: false }, { text: 'Qué Región usamos.', correct: false }] },
  { q: '¿Dónde se configura el Health Check del ALB?', options: [{ text: 'Target Group.', correct: true }, { text: 'S3.', correct: false }, { text: 'IAM.', correct: false }, { text: 'Route Table.', correct: false }] },
  { q: '¿Qué significa Healthy?', options: [{ text: 'El Target responde según la comprobación configurada.', correct: true }, { text: 'EC2 existe.', correct: false }, { text: 'Tiene Public IP.', correct: false }, { text: 'Tiene EBS.', correct: false }] },
  { q: '¿Qué significa Unhealthy Threshold?', options: [{ text: 'Cantidad de fallos consecutivos antes de declararlo no saludable.', correct: true }, { text: 'Máximo de EC2.', correct: false }, { text: 'Cantidad de backups.', correct: false }, { text: 'Número de AZ.', correct: false }] },
  { q: '¿Qué significa Healthy Threshold?', options: [{ text: 'Éxitos consecutivos requeridos para volver a Healthy.', correct: true }, { text: 'CPU máxima.', correct: false }, { text: 'Número de Target Groups.', correct: false }, { text: 'Capacidad de RDS.', correct: false }] },
  { q: '¿Qué es el Health Check Path?', options: [{ text: 'Ruta consultada para comprobar la aplicación.', correct: true }, { text: 'CIDR.', correct: false }, { text: 'Route Table.', correct: false }, { text: 'IAM Policy.', correct: false }] },
  { q: '¿Una EC2 puede estar Running y Unhealthy?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: 'Si el Target está Unhealthy, ¿ALB debería seguir enviándole solicitudes normales?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Un SG incorrecto puede provocar Health Check fallido?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Health Check reemplaza automáticamente una EC2 dañada?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
];

export default function Modulo7Clase3() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 7 · Clase 3</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 7 · Clase 3: Health Checks, cómo detectar servidores saludables antes de enviarles usuarios</h2>
      <p className="lesson-subtitle">
        El Load Balancer no pregunta si la máquina está encendida; pregunta si la aplicación está lista para atender usuarios.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + diagnóstico + configuración guiada + actividades + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 7 · Clases 1 y 2</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es un Health Check y comprender la diferencia entre una EC2 encendida y una aplicación saludable.</li>
            <li>Reconocer los estados Healthy y Unhealthy, y comprender que los Health Checks se configuran en el Target Group.</li>
            <li>Explicar qué es el Health Check Path y comprender el intervalo entre comprobaciones.</li>
            <li>Explicar conceptualmente Healthy Threshold y Unhealthy Threshold.</li>
            <li>Reconocer que una instancia Unhealthy deja de recibir tráfico normal del ALB.</li>
            <li>Comprender cómo un Target puede volver a estado Healthy.</li>
            <li>Diagnosticar errores básicos de Health Check, diferenciando problemas de aplicación, puerto, Security Group y ruta.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-3. Uno de los servidores tiene problemas</h3>
          <Nota><p>Terminamos la clase anterior con cloudshop-web-tg: Web A, Web B y Web C. El ALB puede enviar solicitudes hacia esos Targets. Pero aparece una pregunta: ¿cómo sabe si realmente están funcionando?</p></Nota>
          <p>Web A, Web B y Web C están todas en estado <code>Running ✅</code>. Todo parece normal. Pero en Web B, Apache está <code>Stopped ❌</code>: la EC2 está viva, pero la aplicación web está muerta.</p>
        </section>

        <section className="lesson-section">
          <h3>4-6. Running ≠ Healthy</h3>
          <ConceptBadge icon="alert-triangle">EC2 Running = la máquina está encendida. Target Healthy = el servicio responde según la comprobación configurada. No son lo mismo.</ConceptBadge>
          <Dialogo>Tenemos una caja: el cajero está presente, pero la caja registradora está averiada. ¿Enviamos clientes? No. Que el trabajador esté físicamente presente no significa que pueda atender.</Dialogo>
          <p>Ahí aparece el <strong>Health Check</strong>: una comprobación periódica que realiza el Load Balancer para determinar si un Target está respondiendo correctamente. El ALB pregunta repetidamente a cada servidor: "¿puedes atender?"</p>
        </section>

        <section className="lesson-section">
          <h3>7-8. Visualmente y dónde se configura</h3>
          <Flow steps={[{ icon: 'settings', label: 'ALB' }, { icon: 'target', label: 'Target Group' }, { icon: 'dot-success', label: 'A' }, { icon: 'dot-danger', label: 'B' }, { icon: 'dot-success', label: 'C' }]} />
          <p>Los Health Checks se configuran en el <strong>Target Group</strong>, no directamente como una propiedad independiente de cada EC2. Ese grupo aplica su comprobación a sus Targets registrados.</p>
        </section>

        <section className="lesson-section">
          <h3>9-11. Health Check por HTTP</h3>
          <p>Para una aplicación web podemos configurar Protocol: HTTP, Port: traffic port, Path: /. Entonces el ALB solicita <code>GET /</code> al servidor y espera una respuesta válida — por ejemplo, HTTP 200 puede indicar que el servicio respondió correctamente. No necesitamos memorizar todos los códigos HTTP hoy: 200 ≈ OK.</p>
          <Dialogo>Recepción llama a una habitación: "¿está disponible?" Si alguien responde "sí", ✅. Si nadie contesta repetidamente, ❌. Eso es conceptualmente un Health Check.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>12-15. Health Check Path</h3>
          <p>Una pieza muy importante es el <strong>Path</strong>: la dirección interna que el Load Balancer consulta para comprobar el servicio, por ejemplo /, /health o /status. Una aplicación puede tener /health que responde OK cuando está preparada.</p>
          <Nota><p>El path debe existir. Si configuramos /health pero la aplicación solo tiene /index.html, la respuesta podría ser 404 y el Target puede terminar Unhealthy, aunque la página principal funcione. Un Health Check mal configurado puede mentir: aplicación funcionando, pero el ALB piensa que el servidor está enfermo. Por eso el diagnóstico debe revisar aplicación y comprobación.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>16-21. Interval y Thresholds</h3>
          <p><strong>Interval</strong>: cada cuánto tiempo hacemos la comprobación — por ejemplo, cada 30 segundos. No preguntamos una sola vez: una aplicación podría fallar temporalmente, y si tomáramos una decisión con una sola respuesta mala, sería demasiado rápido. Por eso existen los <strong>thresholds</strong>.</p>
          <RoleGrid roles={[
            { icon: 'x-circle', label: 'Unhealthy Threshold', desc: 'Cuántas comprobaciones fallidas consecutivas necesitamos antes de declarar un Target no saludable (ej. 2)' },
            { icon: 'check-circle', label: 'Healthy Threshold', desc: 'Cuántas comprobaciones exitosas consecutivas necesitamos para considerarlo saludable de nuevo (ej. 3)' },
          ]} />
          <Dialogo>Pedro dice "ya estoy bien". No lo mandamos a cargar 200 cajas inmediatamente porque tosió una vez menos. Queremos observar recuperación consistente. Eso representa conceptualmente el Healthy Threshold — evita una puerta giratoria de caos si el estado cambia todo el tiempo.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>22-26. ¿Qué hace el ALB con un Unhealthy?</h3>
          <p>Con A ✅, B ❌, C ✅, el ALB distribuye tráfico hacia A y C, y deja fuera a B mientras siga no saludable.</p>
          <Nota><p>Importantísimo: Health Check ≠ reparación. El ALB detecta que B está mal, pero no necesariamente arregla Apache. Load Balancer evita enviar tráfico a Targets enfermos; Auto Scaling puede reemplazar instancias no saludables según configuración e integración. Eso será fundamental en las próximas clases.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>27-29. Recuperación del Target</h3>
          <p>Si arreglamos Web B (por ejemplo, <code>sudo systemctl start httpd</code>), /health empieza a responder correctamente. El ALB continúa comprobando, y después de alcanzar el Healthy Threshold, Web B vuelve a Healthy y recibe tráfico otra vez.</p>
          <Dialogo>Caja B estaba cerrada. Se arregla la máquina. Se prueba un cobro, luego otro. Después: ABIERTA, y vuelve a recibir clientes.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>30-35. Errores comunes</h3>
          <QaItem question="Aplicación funciona perfectamente, pero SG-Web no permite HTTP 80 desde SG-ALB. ¿Qué ocurre?" answer="El ALB tampoco puede realizar correctamente la conexión hacia el Target — el Health Check falla. No es necesariamente un problema de Apache: hay que diagnosticar por capas." />
          <QaItem question="Aplicación escucha 80, Target Group usa 8080." answer="Health Check intenta 8080 pero nadie responde — Unhealthy." />
          <QaItem question="EC2 Running, Apache Stopped, Network OK, SG OK." answer="Unhealthy — aquí sí es un problema de aplicación." />
          <QaItem question="Health Path /status, pero la aplicación no tiene /status." answer="Error de respuesta — el Target puede marcarse no saludable." />
          <QaItem question="El path /health existe pero devuelve HTTP 500." answer="Indica que la aplicación está presentando un problema; el Health Check debería detectarlo." />
        </section>

        <section className="lesson-section">
          <h3>36-40. Un buen Health Check debe comprobar algo útil</h3>
          <Nota><p>Podemos hacer que /health siempre responda "OK" aunque toda la aplicación esté rota — técnicamente exitoso, pero poco útil. Si /health solo comprueba que el servidor web está encendido, pero la aplicación necesita una base de datos que está caída, ¿debemos considerarla saludable? Depende del diseño: un Health Check puede comprobar superficialmente "mi proceso responde" o más profundamente "mi aplicación está realmente preparada para atender". No existe una única respuesta universal.</p></Nota>
          <p>Tampoco queremos un Health Check exagerado que consulte RDS, S3, veinte APIs externas, correo y pagos en cada comprobación — podemos marcar instancias como enfermas por dependencias que quizá no deberían sacarlas completamente de servicio. El Health Check debe representar correctamente nuestra definición de "listo".</p>
        </section>

        <section className="lesson-section">
          <h3>41-45. Success Codes, Timeout y parámetros principales</h3>
          <p>El ALB puede configurar qué códigos de respuesta considera exitosos — trabajaremos con 200 como ejemplo principal. Otro parámetro es el <strong>Timeout</strong>: cuánto tiempo espera el ALB una respuesta antes de considerar esa comprobación fallida (por ejemplo, 5 segundos). Una aplicación lenta también puede ser un problema: si /health demora 30 segundos con un timeout de 5, el resultado es fallo, aunque el servidor responda eventualmente.</p>
          <InfoBox title="Parámetros principales" items={['Protocol', 'Port', 'Path', 'Interval', 'Timeout', 'Unhealthy Threshold', 'Healthy Threshold']} />
        </section>

        <section className="lesson-section">
          <h3>46. Ejemplo de configuración sencilla</h3>
          <InfoBox items={['Protocol: HTTP', 'Port: traffic port', 'Path: /health', 'Interval: 30 seconds', 'Timeout: 5 seconds', 'Healthy threshold: 2', 'Unhealthy threshold: 2']} />
          <Nota><p>Estos valores son ejemplos educativos, no una configuración universal para producción.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>47-48. Flujo temporal</h3>
          <Flow steps={[{ label: 'Healthy ✅' }, { label: 'Check 1 ❌' }, { label: 'Check 2 ❌' }, { label: 'Unhealthy ❌' }, { label: 'Check 1 ✅' }, { label: 'Check 2 ✅' }, { label: 'Healthy ✅' }]} />
        </section>

        <section className="lesson-section">
          <h3>49-54. Laboratorio conceptual: rompemos y reparamos Web B</h3>
          <p>Tenemos web-a y web-b, ambas sirviendo /health con respuesta OK, registradas en cloudshop-web-tg. Revisamos salud (EC2 → Target Groups → cloudshop-web-tg → Targets): web-a → Healthy, web-b → Healthy.</p>
          <p>Detenemos Apache en Web B (<code>sudo systemctl stop httpd</code>). Después de las comprobaciones: web-a → Healthy, web-b → Unhealthy. Probamos el Load Balancer: antes alternaba A, B, A, B; después solo responde A, A, A, porque B dejó de ser un Target saludable.</p>
          <p>Reparamos con <code>sudo systemctl start httpd</code>. El Health Check vuelve a recibir respuestas válidas, y después del umbral, web-b → Healthy y vuelve a participar.</p>
          <Flow steps={[
            { label: 'Healthy' }, { label: 'aplicación falla' }, { label: 'Health Checks fallan' }, { label: 'Unhealthy' },
            { label: 'ALB deja de enviar tráfico' }, { label: 'aplicación se repara' }, { label: 'Health Checks funcionan' }, { label: 'Healthy' }, { label: 'recibe tráfico otra vez' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>55-56. El ALB no reemplazó Web B</h3>
          <Nota><p>Notemos algo: después de fallar, Web B sigue existiendo. El ALB simplemente dejó de usarla. La próxima pregunta será: ¿quién la reemplaza automáticamente si está realmente dañada? Respuesta futura: Auto Scaling. ALB detecta "B Unhealthy", y más adelante Auto Scaling detecta capacidad no saludable y puede colaborar para reemplazar B — uno de los grandes momentos del módulo.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>57-60. Actividades</h3>
          <QaItem question="EC2 encendida" answer="Running." />
          <QaItem question="/health responde correctamente" answer="Healthy." />
          <QaItem question="Apache detenido pero EC2 encendida" answer="Running, pero probablemente Unhealthy." />
          <QaItem question="EC2 Running ✅, Apache ✅, SG ✅, Health path: /banana (la aplicación no tiene /banana). ¿Qué falla?" answer="El Health Check Path." />
          <QaItem question='"Cada cuánto pregunto." / "Cuánto espero respuesta." / "Cuántos fallos antes de declarar enfermo." / "Cuántos éxitos antes de declararlo sano."' answer="Interval / Timeout / Unhealthy Threshold / Healthy Threshold." />
          <QaItem question="Web A Healthy, Web B Unhealthy, Web C Healthy. ¿Cuáles deben recibir tráfico?" answer="A y C sí; B no." />
        </section>

        <section className="lesson-section">
          <h3>61-64. Caso UniversidadCloud: si todos fallan, busca lo común</h3>
          <QaItem question="portal-tg con A ✅, B ❌, C ✅. ¿Qué debería ocurrir?" answer="El ALB utiliza A y C." />
          <Nota><p>Pero si A, B y C fallan al mismo tiempo, ¿es probable que los tres servidores se hayan roto simultáneamente? Puede ocurrir, pero antes sospechamos algo común: Health Check Path, puerto, SG, aplicación o configuración del Target Group. Esta regla de diagnóstico es poderosa: si varios Targets fallan a la vez, pregunta qué comparten.</p></Nota>
          <Flow steps={[
            { label: '¿EC2 Running?' }, { label: '¿Servicio web iniciado?' }, { label: '¿Puerto correcto?' }, { label: '¿SG permite desde ALB?' },
            { label: '¿Health Check Path existe?' }, { label: '¿Responde dentro del Timeout?' }, { label: '¿Código esperado?' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>65-67. Dos errores que evitar</h3>
          <Nota>
            <p>El desarrollador propone: "todos están Unhealthy, abramos todos los puertos desde Internet." No estoy de acuerdo porque eso cambia la superficie de exposición sin demostrar que el problema sea el Security Group. Esto es lo que haría en su lugar: revisar path, puerto, aplicación y acceso desde SG-ALB en orden. El riesgo de su enfoque es crear una vulnerabilidad y seguir sin resolver el Health Check.</p>
          </Nota>
          <Nota><p>Otro error: usar /generar-reporte-anual como Health Check. Cada 30 segundos dispararía una consulta enorme contra la base de datos — muy mala idea. El Health Check debe ser suficientemente liviano para ejecutarse frecuentemente; idealmente responde algo simple como 200 OK, sin realizar trabajo innecesariamente pesado. El objetivo es saber si el servicio está preparado, no generar el informe financiero del planeta.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>68-69. Health Checks también protegen despliegues</h3>
          <p>Si agregamos Web D pero todavía está iniciando la aplicación, mientras esté Unhealthy el ALB no debería enviarle usuarios normales; cuando pasa a Healthy, entra al conjunto. Esto será muy importante con Auto Scaling: una nueva EC2 necesita tiempo (Boot → User Data → Apache → Aplicación → /health OK → Healthy) antes de estar realmente lista para trabajar.</p>
        </section>

        <section className="lesson-section">
          <h3>70-75. RETO DE LA CLASE</h3>
          <Nota><p>EventCloud tiene ticket-web-tg con Web A, Web B y Web C. Configuración: HTTP, Port 80, Path /health, Interval 30s, Timeout 5s, Healthy threshold 2, Unhealthy threshold 2.</p></Nota>
          <p>Escenario: Web A /health → 200. Web B Apache stopped. Web C /health → 404.</p>
          <Reveal label="Ver la solución">
            <QaItem question="¿Cuál es el estado de cada Target?" answer="A: Healthy. B: Unhealthy (el servicio no responde). C: Unhealthy (/health no entrega la respuesta esperada). El ALB utiliza solo A." />
          </Reveal>
          <QaItem question="Web C tiene / → 200, pero /health → 404. ¿La página web puede funcionar manualmente mientras el ALB considera el Target Unhealthy?" answer="Sí. Eso demuestra que el Health Check está evaluando la ruta configurada, no la aplicación completa." />
          <QaItem question="Web B fue reparado y obtiene ✅✅ con Healthy threshold = 2. ¿Qué ocurre?" answer="Vuelve a Healthy y puede recibir tráfico nuevamente." />
          <QaItem question="Todos los Targets Unhealthy. EC2 Running ✅, Apache ✅, /health ✅, pero SG-Web permite HTTP 80 solo desde 203.0.113.5/32 y no desde SG-ALB. ¿Qué sospechamos?" answer="El ALB no tiene acceso apropiado al puerto de los Targets." />
        </section>

        <section className="lesson-section">
          <h3>76. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'Running significa Healthy.', correct: false },
            { text: 'Health Check se configura en Target Group.', correct: true },
            { text: 'Unhealthy Targets reciben normalmente tráfico igual que Healthy.', correct: false },
            { text: 'Path incorrecto puede causar Unhealthy.', correct: true },
            { text: 'Security Group puede afectar Health Check.', correct: true },
            { text: 'ALB repara automáticamente Apache.', correct: false },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>77. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>78. Reto oral</h3>
          <Dialogo>Explícame qué hace un Health Check sin utilizar las palabras Health, Check, saludable, servidor, EC2, aplicación, ALB, Target, HTTP, puerto, ruta ni AWS.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Es una comprobación repetida que permite determinar si uno de los trabajadores disponibles está realmente preparado para recibir nuevas tareas."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>80. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Health Check</td><td>Comprueba si el servicio responde</td></tr>
              <tr><td>Healthy</td><td>Puede recibir tráfico</td></tr>
              <tr><td>Unhealthy</td><td>Se retira temporalmente del tráfico</td></tr>
              <tr><td>Path</td><td>Ruta consultada</td></tr>
              <tr><td>Port</td><td>Puerto de comprobación</td></tr>
              <tr><td>Interval</td><td>Cada cuánto se pregunta</td></tr>
              <tr><td>Timeout</td><td>Cuánto esperamos</td></tr>
              <tr><td>Unhealthy Threshold</td><td>Fallos antes de marcarlo malo</td></tr>
              <tr><td>Healthy Threshold</td><td>Éxitos antes de recuperarlo</td></tr>
              <tr><td>Running ≠ Healthy</td><td>Máquina encendida no garantiza aplicación funcional</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>81. Ticket de salida</h3>
          <Dialogo>Una EC2 está Running, pero Apache está detenido. ¿Puede aparecer como Unhealthy en el Target Group y qué hará el ALB?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Sí. Si el Health Check no obtiene la respuesta esperada, el Target puede marcarse Unhealthy. El ALB dejará de enviarle tráfico normal mientras permanezca en ese estado y utilizará otros Targets saludables disponibles.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 4</div>
          <Flow steps={[{ icon: 'target', label: 'Target Group' }, { icon: 'dot-success', label: 'A' }, { icon: 'dot-danger', label: 'B — fuera del flujo' }]} />
          <p>El ALB ya hizo su trabajo: detectó B, dejó de enviarle usuarios. Pero B sigue ahí, dañado, y ahora solo nos queda una instancia funcional: A. ¿Quién se encargará de mantener automáticamente la cantidad de servidores que necesitamos y crear un reemplazo cuando falte capacidad?</p>
          <ConceptBadge icon="bar-chart">Módulo 7 · Clase 4 — Amazon EC2 Auto Scaling: mantener automáticamente la cantidad correcta de servidores</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-7/clase-4" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 4: Amazon EC2 Auto Scaling →
          </Link>
        </div>

      </div>
    </div>
  );
}
