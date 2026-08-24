import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, QaItem, TrueFalseQuiz,
} from './lessonComponents.jsx';

export default function Modulo7Overview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 7</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 7: Elastic Load Balancing y Auto Scaling</h2>
      <p className="lesson-subtitle">
        El Load Balancer distribuye el trabajo y Auto Scaling ajusta cuántos trabajadores tenemos disponibles.
      </p>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>Las 8 clases</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Clase</th><th>Tema</th><th>Objetivo principal</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>¿Qué es Elastic Load Balancing?</td><td>Entender el problema de distribuir tráfico</td></tr>
              <tr><td>2</td><td>Application Load Balancer y Target Groups</td><td>Comprender ALB, Listeners y Targets</td></tr>
              <tr><td>3</td><td>Health Checks</td><td>Detectar instancias sanas y enfermas</td></tr>
              <tr><td>4</td><td>Amazon EC2 Auto Scaling</td><td>Crear grupos que mantengan capacidad</td></tr>
              <tr><td>5</td><td>Launch Templates y capacidad</td><td>Definir cómo nacen nuevas EC2</td></tr>
              <tr><td>6</td><td>Políticas de escalado</td><td>Scale Out, Scale In y Target Tracking</td></tr>
              <tr><td>7</td><td>ALB + Auto Scaling + Multi-AZ</td><td>Integrar todo en una arquitectura resiliente</td></tr>
              <tr><td>8</td><td>Laboratorio integrador</td><td>Construir, romper, escalar y diagnosticar</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>Objetivo general del módulo</h3>
          <Nota><p>Al finalizar el Módulo 7, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Comprender por qué una sola EC2 puede transformarse en un punto de falla.</li>
            <li>Explicar qué significa escalabilidad horizontal.</li>
            <li>Comprender qué es Elastic Load Balancing y qué hace un Application Load Balancer.</li>
            <li>Comprender qué es un Listener y reconocer qué es un Target Group.</li>
            <li>Comprender cómo funcionan los Health Checks y qué ocurre con una instancia Unhealthy.</li>
            <li>Comprender qué es Amazon EC2 Auto Scaling y qué es un Auto Scaling Group.</li>
            <li>Comprender Minimum, Desired y Maximum capacity, y utilizar conceptualmente un Launch Template.</li>
            <li>Diferenciar Scale Out y Scale In, comprender las políticas de escalado dinámico y reconocer Target Tracking.</li>
            <li>Relacionar métricas de CloudWatch con decisiones de escalado.</li>
            <li>Diseñar una arquitectura ALB + Auto Scaling + múltiples AZ, integrando EC2, VPC, Security Groups y RDS.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>El problema que abre el módulo</h3>
          <Flow steps={[{ icon: 'globe', label: 'Usuarios' }, { icon: 'server', label: 'EC2' }, { icon: 'database', label: 'RDS' }]} />
          <p>Funciona. Hasta que ocurre una de dos cosas.</p>
          <Nota><p><strong>Problema A — demasiados usuarios:</strong> CPU al 95%, RAM alta, todos los usuarios intentando utilizar la misma máquina. ¿Qué hacemos si una sola EC2 ya no alcanza?</p></Nota>
          <Nota><p><strong>Problema B — la EC2 falla:</strong> aunque RDS esté perfectamente sana, si la única EC2 se cae, los usuarios ya no pueden llegar a nada. Una sola instancia puede convertirse en un punto único de falla.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>Analogía del supermercado</h3>
          <Dialogo>Un supermercado con una sola caja funciona con pocos clientes, pero cuando llegan diez veces más, el resultado es una fila enorme. La primera solución posible: abrir más cajas. En la nube, eso equivale a tener varias EC2 en lugar de una sola.</Dialogo>
          <p>Pero aparece otra pregunta: ¿quién decide a qué servidor enviar cada cliente? Ahí aparece Load Balancing.</p>
        </section>

        <section className="lesson-section">
          <h3>Dos servicios, dos preguntas</h3>
          <RoleGrid roles={[
            { icon: 'settings', label: 'Elastic Load Balancing', desc: '¿A qué servidor envío esta solicitud?' },
            { icon: 'bar-chart', label: 'Auto Scaling', desc: '¿Cuántos servidores necesito?' },
          ]} />
          <Nota><p>El Load Balancer no crea servidores. Su trabajo principal es recibir y distribuir tráfico. Para aumentar o reducir instancias necesitamos Auto Scaling.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>Las dos piezas trabajando juntas</h3>
          <Flow steps={[
            { icon: 'globe', label: 'Usuarios' },
            { icon: 'settings', label: 'Load Balancer' },
            { icon: 'server', label: 'EC2 / EC2 / EC2' },
          ]} />
          <p>Auto Scaling modifica la flota. Load Balancer reparte el tráfico entre los targets apropiados. Y podemos distribuir entre Availability Zones, conectando con lo aprendido en el Módulo 5.</p>
        </section>

        <section className="lesson-section">
          <h3>Arquitectura objetivo del módulo</h3>
          <Flow steps={[
            { icon: 'globe', label: 'Internet' },
            { icon: 'settings', label: 'Application Load Balancer' },
            { icon: 'building', label: 'AZ A + AZ B' },
            { icon: 'server', label: 'EC2 A + EC2 B (Auto Scaling Group)' },
            { icon: 'database', label: 'RDS' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>Diferencia que debe quedar tatuada mentalmente</h3>
          <QaItem question='"Load Balancer crea EC2 cuando sube la CPU."' answer="Falso. El Load Balancer distribuye tráfico, no crea instancias." />
          <QaItem question='"Auto Scaling puede aumentar la cantidad de instancias."' answer="Verdadero." />
          <TrueFalseQuiz statements={[
            { text: 'Target Group contiene destinos que pueden recibir tráfico.', correct: true },
            { text: 'Health Check ayuda a detectar targets no saludables.', correct: true },
            { text: 'Auto Scaling significa tener siempre muchas EC2.', correct: false },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>Qué NO enseñaremos como objetivo principal</h3>
          <p>Para mantener el módulo apto para público no técnico, no profundizaremos todavía en Network Load Balancer avanzado, Gateway Load Balancer, sticky sessions avanzadas, algoritmos complejos de routing, lifecycle hooks, mixed instances policies, Spot dentro de ASG, predictive scaling avanzado, blue/green deployment ni ECS/EKS load balancing. Los reconoceremos cuando corresponda, pero no necesitamos convertir este curso inicial en certificación profesional disfrazada.</p>
        </section>

        <section className="lesson-section">
          <h3>Conexión con módulos anteriores</h3>
          <RoleGrid roles={[
            { icon: 'lock', label: 'IAM', desc: '¿Quién puede crear/modificar recursos?' },
            { icon: 'server', label: 'EC2', desc: '¿Dónde corre la aplicación?' },
            { icon: 'package', label: 'S3', desc: '¿Dónde guardamos objetos?' },
            { icon: 'globe', label: 'VPC', desc: '¿Cómo se conectan los componentes?' },
            { icon: 'database', label: 'RDS', desc: '¿Dónde viven los datos relacionales?' },
            { icon: 'bar-chart', label: 'ELB + Auto Scaling', desc: '¿Cómo distribuimos y ajustamos capacidad?' },
          ]} />
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Empecemos</div>
          <ConceptBadge icon="bar-chart">Módulo 7 · Clase 1 — ¿Qué es Elastic Load Balancing? De una sola caja a múltiples servidores</ConceptBadge>
          <Nota><p>Esa clase empieza sin consola AWS. Primero ponemos 100 clientes frente a una sola caja, vemos qué ocurre cuando esa caja colapsa, comparamos escalado vertical y horizontal, y recién después aparece el Load Balancer como el "coordinador" que reparte solicitudes.</p></Nota>
          <Link to="/aprendizaje/aws-desde-cero/modulo-7/clase-1" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 1: ¿Qué es Elastic Load Balancing? →
          </Link>
        </div>

      </div>
    </div>
  );
}
