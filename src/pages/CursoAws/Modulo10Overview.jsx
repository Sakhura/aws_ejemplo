import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, QaItem,
} from './lessonComponents.jsx';

export default function Modulo10Overview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 10</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 10: Computación Serverless con AWS Lambda</h2>
      <p className="lesson-subtitle">
        Hasta ahora, cada vez que necesitamos ejecutar código, primero tuvimos que pensar en un servidor. ¿Y si esa parte dejara de ser nuestro problema?
      </p>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>Las 8 clases</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Clase</th><th>Tema</th><th>Objetivo</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>¿Qué es Serverless? Introducción a AWS Lambda</td><td>Entender el cambio de modelo frente a EC2</td></tr>
              <tr><td>2</td><td>Nuestra primera función Lambda</td><td>Runtime, handler, event y context</td></tr>
              <tr><td>3</td><td>Lambda + API Gateway</td><td>Exponer una función como endpoint HTTP</td></tr>
              <tr><td>4</td><td>IAM y el Execution Role de Lambda</td><td>Dar a cada función solo los permisos que necesita</td></tr>
              <tr><td>5</td><td>Configuración, límites y cold starts</td><td>Memoria, timeout, variables de entorno y rendimiento</td></tr>
              <tr><td>6</td><td>Amazon DynamoDB</td><td>La base de datos NoSQL administrada y serverless</td></tr>
              <tr><td>7</td><td>Lambda + DynamoDB</td><td>Integrar cómputo y datos sin administrar ningún servidor</td></tr>
              <tr><td>8</td><td>Laboratorio integrador</td><td>Construir una API serverless completa para CloudShop</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>Objetivo general del módulo</h3>
          <Nota><p>Al finalizar el Módulo 10, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué significa &quot;serverless&quot; y en qué se diferencia conceptualmente de EC2.</li>
            <li>Crear y comprender la estructura básica de una función AWS Lambda: handler, event y context.</li>
            <li>Exponer una función Lambda como endpoint HTTP usando Amazon API Gateway.</li>
            <li>Diseñar un Execution Role de Lambda aplicando mínimo privilegio (Módulo 9).</li>
            <li>Reconocer memoria, timeout y variables de entorno, y comprender qué es un cold start.</li>
            <li>Explicar qué es Amazon DynamoDB y diferenciar tablas, items y partition key de una base relacional (Módulo 6).</li>
            <li>Integrar Lambda con DynamoDB para leer y escribir datos sin administrar ningún servidor.</li>
            <li>Diseñar una arquitectura serverless simple para un caso de negocio de CloudShop.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>El problema que abre el módulo</h3>
          <Flow steps={[{ icon: 'globe', label: 'Usuarios' }, { icon: 'settings', label: 'ALB' }, { icon: 'server', label: 'EC2 × N' }, { icon: 'database', label: 'RDS' }]} />
          <p>CloudShop necesita una función pequeña: cuando un cliente termina de reseñar un producto, enviar una notificación al equipo de calidad. Es poco tráfico — quizás cincuenta veces al día. Alguien propone: &quot;lancemos una EC2 más, con Auto Scaling, un Target Group y su Security Group, dedicada solo a esto.&quot;</p>
          <ConceptBadge icon="alert-triangle">Eso es mantener un servidor encendido, parcheado y monitoreado las 24 horas, para un trabajo que dura milisegundos y ocurre unas pocas veces al día.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>¿Y si no hubiera servidor que administrar?</h3>
          <p>Ahí aparece <strong>AWS Lambda</strong>: en vez de aprovisionar un servidor, subimos código, y AWS lo ejecuta únicamente cuando algo lo dispara — una solicitud HTTP, un archivo nuevo en S3, un mensaje en una cola. Cuando nadie lo necesita, no hay nada corriendo, y no se paga nada.</p>
          <Dialogo>Es la diferencia entre alquilar un local todo el año para abrir dos horas al día, y pagar solamente por las dos horas en que efectivamente se usa. El trabajo se hace igual — cambia quién carga con lo que sobra el resto del tiempo.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>&quot;Serverless&quot; no significa que no exista un servidor</h3>
          <QaItem question="Si no hay servidor, ¿dónde corre el código de Lambda?" answer="Sigue corriendo en un servidor — solo que AWS lo aprovisiona, administra, parchea y escala automáticamente, sin que nosotros tengamos que verlo ni administrarlo." />
          <ConceptBadge icon="server">&quot;Serverless&quot; quiere decir: el servidor deja de ser nuestro problema, no que haya dejado de existir.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>Lo que ya sabemos, aplicado de nuevo</h3>
          <RoleGrid roles={[
            { icon: 'users', label: 'IAM (Módulo 9)', desc: 'Cada función Lambda tiene su propio rol, con mínimo privilegio' },
            { icon: 'database', label: 'RDS y DynamoDB (Módulo 6)', desc: 'DynamoDB es a las bases de datos lo que Lambda es a los servidores' },
            { icon: 'bar-chart', label: 'CloudWatch (Módulo 8)', desc: 'Las funciones Lambda también generan métricas y logs' },
          ]} />
          <p>Este módulo no empieza de cero: aplica identidad, roles y mínimo privilegio (Módulo 9) y observabilidad (Módulo 8) a un modelo de cómputo distinto al de EC2.</p>
        </section>

        <section className="lesson-section">
          <h3>Los pilares del módulo</h3>
          <Flow steps={[
            { label: '¿Qué dispara la función?' }, { label: '¿Qué hace el código?' }, { label: '¿Qué permisos tiene?' },
            { label: '¿Dónde guarda o lee datos?' }, { label: '¿Cuánto tarda y cuánto cuesta?' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>Regla central del módulo</h3>
          <ConceptBadge icon="zap">Pagas por lo que se ejecuta, no por lo que está encendido esperando.</ConceptBadge>
          <p>Esa idea cambia cómo diseñamos: en EC2 nos preocupábamos por cuántos servidores mantener encendidos (Módulo 7). En Lambda, la pregunta pasa a ser qué evento dispara la ejecución, cuánto tarda, y qué permisos necesita mientras corre.</p>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Próximamente</div>
          <ConceptBadge icon="zap">Módulo 10 · Clase 1 — ¿Qué es Serverless? Introducción a AWS Lambda: de administrar servidores a solo traer código</ConceptBadge>
          <Nota><p>Esa clase abrirá retomando el caso de la notificación de reseñas de CloudShop, comparando conceptualmente el camino EC2 (Módulos 3 y 7) con el camino Lambda, antes de entrar en el modelo de ejecución por eventos.</p></Nota>
          <span className="tag tag-outline">Módulo 10 · Clase 1 · próximamente</span>
        </div>

      </div>
    </div>
  );
}
