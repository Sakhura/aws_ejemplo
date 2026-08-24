import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, QaItem, Reveal,
} from './lessonComponents.jsx';

export default function Modulo5Clase7() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 5 · Clase 7</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 5 · Clase 7: Diseñando nuestra primera arquitectura VPC completa</h2>
      <p className="lesson-subtitle">
        Una buena arquitectura de red comienza con las necesidades de comunicación, no con los servicios de AWS.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 a 60 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Diseño guiado + resolución de casos + arquitectura + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 5 · Clases 1 a 6</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Interpretar requisitos básicos de una aplicación y decidir qué componentes deberían estar en zonas públicas o privadas.</li>
            <li>Diseñar una VPC con un rango de direcciones, dividirla en subnets y distribuirlas en más de una Availability Zone.</li>
            <li>Identificar dónde necesitamos Internet Gateway y determinar rutas públicas y privadas.</li>
            <li>Reconocer cuándo podríamos necesitar NAT Gateway y diseñar Security Groups básicos.</li>
            <li>Comprender cuándo una NACL podría agregar otra capa de control.</li>
            <li>Seguir el recorrido del tráfico de extremo a extremo, detectar errores básicos de arquitectura y justificar cada componente utilizado.</li>
          </ul>
          <p>La frase que debe sobrevivir será:</p>
          <Dialogo>Una buena arquitectura de red comienza con las necesidades de comunicación, no con los servicios de AWS.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Hoy cambia la pregunta</h3>
          <Nota><p>Hasta ahora preguntábamos "¿qué hace este componente?" (VPC, Subnet, Route Table, Internet Gateway, NAT Gateway, Security Group, Network ACL).</p></Nota>
          <Dialogo>Hoy preguntaremos: ¿qué problema necesito resolver y qué componentes necesito para hacerlo?</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>3. Nuestro caso: CloudShop</h3>
          <Nota><p>CloudShop es una tienda online. Los clientes necesitan entrar desde Internet, revisar productos y realizar compras. La empresa tiene sitio web, aplicación y base de datos. Además, la aplicación necesita descargar actualizaciones y conectarse a servicios externos.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>4. Requisitos, antes de dibujar AWS</h3>
          <InfoBox title="Clientes" items={['✅ pueden acceder al sitio web']} />
          <InfoBox title="Servidor web" items={['✅ recibe tráfico desde Internet']} />
          <InfoBox title="Aplicación" items={['✅ se comunica con el servidor web', '✅ se comunica con la base de datos', '✅ necesita iniciar conexiones hacia Internet', '❌ no necesita recibir conexiones directas desde Internet']} />
          <InfoBox title="Base de datos" items={['✅ recibe conexiones de la aplicación', '❌ no recibe conexiones directas desde Internet']} />
        </section>

        <section className="lesson-section">
          <h3>5. Primer paso: olvidar AWS por un minuto</h3>
          <Flow steps={[{ icon: 'user', label: 'Clientes' }, { icon: 'globe', label: 'Web' }, { icon: 'settings', label: 'App' }, { icon: 'database', label: 'Database' }]} />
          <p>Y aparte: App → Servicios externos. Esa es nuestra arquitectura lógica. AWS viene después.</p>
        </section>

        <section className="lesson-section">
          <h3>6. Identifiquemos exposición</h3>
          <QaItem question="¿Qué debe recibir conexiones desde Internet?" answer="Web." />
          <QaItem question="¿Aplicación? ¿Base de datos?" answer="Ninguna de las dos." />
          <p>Ya podemos tomar nuestra primera decisión: Web en zona pública; App y DB en zona privada.</p>
        </section>

        <section className="lesson-section">
          <h3>7. ¿App y DB deberían estar juntas?</h3>
          <Nota><p>Para una arquitectura inicial podríamos usar una sola subnet privada. Pero para practicar segmentación diseñaremos Private App Subnet y Private DB Subnet por separado, así cada capa tiene una función clara.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>8. Diseñemos las subnets</h3>
          <p>VPC 10.0.0.0/16. Public: 10.0.1.0/24, Private App: 10.0.2.0/24, Private DB: 10.0.3.0/24.</p>
        </section>

        <section className="lesson-section">
          <h3>9. Pero queremos resiliencia: Multi-AZ</h3>
          <Nota><p>Una arquitectura más robusta no debería depender necesariamente de una sola Availability Zone.</p></Nota>
          <Flow steps={[
            { icon: 'building', label: 'AZ A — Public A + App A + DB A' },
            { icon: 'building', label: 'AZ B — Public B + App B + DB B' },
          ]} />
          <pre className="codeblock">{`AZ A: Public A 10.0.1.0/24, App A 10.0.2.0/24, DB A 10.0.3.0/24
AZ B: Public B 10.0.11.0/24, App B 10.0.12.0/24, DB B 10.0.13.0/24`}</pre>
          <p>Estos bloques son ejemplos educativos, no una plantilla universal. Dejamos espacio en la numeración porque un esquema ordenado facilita lectura y crecimiento — lo importante es que los bloques no se superpongan.</p>
        </section>

        <section className="lesson-section">
          <h3>10. Internet Gateway y Public Route Table</h3>
          <Flow steps={[{ icon: 'radio', label: 'Internet' }, { icon: 'door', label: 'Internet Gateway' }, { icon: 'globe', label: 'VPC' }]} />
          <pre className="codeblock">{`Public Route Table
10.0.0.0/16      local
0.0.0.0/0        Internet Gateway`}</pre>
          <p>Pero recordemos: el IGW no basta por sí solo, necesitamos rutas. Y no ponemos las bases de datos en la subnet pública — nuestra necesidad decía que la base de datos no debe recibir conexiones directas desde Internet.</p>
        </section>

        <section className="lesson-section">
          <h3>11. Private Route Table para DB</h3>
          <pre className="codeblock">{`Destination      Target
10.0.0.0/16      local`}</pre>
          <p>Nada más — la base solo necesita comunicación interna.</p>
        </section>

        <section className="lesson-section">
          <h3>12. NAT Gateway para la App</h3>
          <Nota><p>La App necesita actualizaciones y consultar servicios externos, pero no queremos darle Public IP ni ruta directa al Internet Gateway. Ya conocemos la solución.</p></Nota>
          <Flow steps={[{ icon: 'building', label: 'Public Subnet' }, { icon: 'door', label: 'NAT Gateway' }]} />
          <pre className="codeblock">{`Private App Route Table
10.0.0.0/16      local
0.0.0.0/0        NAT Gateway`}</pre>
          <p>La App puede iniciar conexiones hacia Internet, pero no necesita Public IP, y NAT no la convierte en un servicio web público.</p>
        </section>

        <section className="lesson-section">
          <h3>13. ¿La base de datos necesita NAT?</h3>
          <Nota><p>En nuestro escenario, no. La base solo necesita comunicarse con la aplicación — evitamos darle salida general a Internet, reduciendo conectividad innecesaria.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>14. Principio de mínimo acceso aplicado a red</h3>
          <RoleGrid roles={[
            { icon: 'globe', label: 'Web', desc: 'Necesita Internet' },
            { icon: 'settings', label: 'App', desc: 'Necesita Web + DB + salida externa' },
            { icon: 'database', label: 'DB', desc: 'Necesita App. Nada más.' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>15. Diseñemos Security Groups</h3>
          <p>SG-Web, SG-App, SG-DB — cada uno protegerá una capa distinta.</p>
          <InfoBox title="SG-Web" items={['Inbound: HTTPS 443, Source: Internet según necesidad']} />
          <Nota><p>No añadimos SSH público automáticamente. Si necesitamos administración, diseñamos un mecanismo controlado, no 22 desde 0.0.0.0/0 por comodidad.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>16. SG-App y Security Group como origen</h3>
          <Nota><p>La App no necesita recibir solicitudes desde cualquier dirección: únicamente desde la capa Web.</p></Nota>
          <InfoBox title="SG-App" items={['Inbound: Puerto de aplicación, Source: SG-Web']} />
          <Dialogo>Podemos permitir tráfico desde otro Security Group en escenarios compatibles: en lugar de "acepta desde cualquier IP privada", decimos "acepta desde recursos asociados a SG-Web" — mucho más expresivo.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>17. SG-DB</h3>
          <InfoBox title="SG-DB" items={['Inbound: TCP 3306, Source: SG-App', 'No: 0.0.0.0/0']} />
        </section>

        <section className="lesson-section">
          <h3>18. Nuestro flujo de seguridad completo</h3>
          <Flow steps={[
            { icon: 'user', label: 'Usuario — HTTPS 443' },
            { icon: 'shield', label: 'SG-Web' },
            { icon: 'globe', label: 'Web — puerto aplicación' },
            { icon: 'shield', label: 'SG-App' },
            { icon: 'settings', label: 'App — puerto BD' },
            { icon: 'shield', label: 'SG-DB' },
            { icon: 'database', label: 'Database' },
          ]} />
          <p>Cada capa acepta únicamente lo necesario. El dibujo nos dice: los usuarios no hablan directamente con la base, la web habla con la app, la app habla con la base. Eso es mucho más valioso que memorizar puertos.</p>
        </section>

        <section className="lesson-section">
          <h3>19. ¿Necesitamos NACL?</h3>
          <Nota><p>No necesariamente necesitamos una NACL personalizada para que la arquitectura básica funcione. Podemos usar Security Groups como controles principales y mantener una NACL apropiada (por defecto).</p></Nota>
          <p>Evaluamos una NACL personalizada, por ejemplo, si queremos bloquear un rango IP específico a nivel de subnet — pero no creamos una NACL complejísima solo porque aprendimos que existe.</p>
          <Dialogo>Una arquitectura buena no es la que contiene más servicios AWS. Es la que resuelve requisitos con complejidad razonable.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>20. Arquitectura simplificada para nuestro nivel</h3>
          <Flow steps={[
            { icon: 'radio', label: 'Internet' },
            { icon: 'door', label: 'IGW' },
            { icon: 'globe', label: 'VPC 10.0.0.0/16' },
            { icon: 'building', label: 'Public Subnet — Web' },
            { icon: 'lock', label: 'App Subnet — App + NAT' },
            { icon: 'database', label: 'DB Subnet — DB' },
          ]} />
          <Nota><p>Falta algo para una web realmente robusta: si tenemos Web A y Web B, los clientes necesitarían distribuir solicitudes entre ellos (Application Load Balancer, en un módulo posterior). Pero hoy es suficiente para el objetivo pedagógico: entender la red debajo de ese futuro componente.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>21. Sigamos una solicitud completa</h3>
          <Flow steps={[
            { n: 1, label: 'Cliente → Internet' },
            { n: 2, label: 'Internet → Internet Gateway → VPC' },
            { n: 3, label: 'SG-Web permite HTTPS → Web' },
            { n: 4, label: 'SG-App permite desde SG-Web → App' },
            { n: 5, label: 'SG-DB permite desde SG-App → Database' },
          ]} />
          <Nota><p>Los Security Groups son stateful: las respuestas correspondientes pueden regresar sin que tengamos que crear una regla espejo para cada flujo.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>22. La App necesita una API externa</h3>
          <Flow steps={[
            { icon: 'settings', label: 'App' },
            { icon: 'refresh', label: 'Private Route Table — 0.0.0.0/0 → NAT' },
            { icon: 'door', label: 'NAT Gateway' },
            { icon: 'door', label: 'Internet Gateway' },
            { icon: 'radio', label: 'API externa' },
          ]} />
          <QaItem question="¿Puede la API iniciar una conexión nueva hacia App?" answer="No mediante este camino NAT típico. La App inició la comunicación — eso mantiene nuestra intención: salida sin publicación directa." />
        </section>

        <section className="lesson-section">
          <h3>23. ¿Puede Internet conectarse directamente a DB?</h3>
          <Nota><p>No, porque: está en una zona privada, no tiene direccionamiento público necesario, no tiene ruta directa de exposición, y SG-DB solo permite desde SG-App. Tenemos varias capas alineadas — defensa en profundidad.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>24. Ahora pensemos en costo</h3>
          <Nota><p>Nuestra arquitectura puede utilizar múltiples EC2, NAT Gateway, transferencia de datos y otros componentes. Más resiliencia y segmentación pueden aumentar costos.</p></Nota>
          <ConceptBadge icon="target">Equilibrio: Seguridad + Disponibilidad + Costo + Complejidad</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>25. No construimos arquitectura empresarial para un ejercicio de una hora</h3>
          <Nota><p>Si estamos en laboratorio, podemos simplificar: no necesitamos desplegar 6 subnets, 2 NAT, 6 servidores y 4 bases solo para aprender. El diagrama puede ser completo; la implementación práctica puede ser deliberadamente pequeña.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>26. Actividad: ubica cada componente</h3>
          <QaItem question="Web, App, DB, NAT, IGW — ¿dónde va cada uno?" answer="IGW → VPC. Web → Public Subnet. NAT → Public Subnet. App → Private Subnet. DB → Private Subnet." />
        </section>

        <section className="lesson-section">
          <h3>27. Actividad: ¿quién habla con quién?</h3>
          <QaItem question="Cliente → Web" answer="Sí." />
          <QaItem question="Cliente → DB" answer="No." />
          <QaItem question="Web → App" answer="Sí." />
          <QaItem question="App → DB" answer="Sí." />
          <QaItem question="App → Internet mediante NAT" answer="Sí." />
        </section>

        <section className="lesson-section">
          <h3>28. Actividad: elige la ruta</h3>
          <QaItem question="Tráfico Web → DB, destino dentro de 10.0.0.0/16." answer="Usa local, no NAT." />
          <QaItem question="Tráfico App → API externa, destino Internet." answer="Ruta privada: 0.0.0.0/0 → NAT Gateway." />
          <QaItem question="Tráfico Web → Internet, con direccionamiento apropiado." answer="0.0.0.0/0 → Internet Gateway." />
        </section>

        <section className="lesson-section">
          <h3>29. Seis errores frecuentes</h3>
          <Nota>
            <p>Error 1 — DB en subnet pública con Public IP: no estoy de acuerdo porque la base no necesita exposición directa según nuestros requisitos. Esto es lo que haría en su lugar: moverla a una subnet privada y limitar su SG a la aplicación. El riesgo de este enfoque es aumentar innecesariamente la superficie de ataque.</p>
          </Nota>
          <ul className="plain-list">
            <li>Error 2 — App privada sin NAT: Private RT solo con local, no existe ruta de salida externa. Solución: 0.0.0.0/0 → NAT.</li>
            <li>Error 3 — App apunta al IGW: Private App Subnet con 0.0.0.0/0 → IGW rompe la intención de mantener esa subnet sin ruta directa hacia Internet. Debería ser 0.0.0.0/0 → NAT.</li>
            <li>Error 4 — SG-DB abierto: MySQL 3306 desde 0.0.0.0/0 en vez de Source: SG-App.</li>
            <li>Error 5 — SG-App abierto al mundo: App Port desde 0.0.0.0/0 en vez de Source: SG-Web.</li>
            <li>Error 6 — ruta privada hacia NAT inexistente: NAT existe, pero la tabla privada dice 10.0.0.0/16 → local. Nada cambia por la mera existencia del NAT — necesitamos la ruta.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>30. Arquitectura es un conjunto de relaciones</h3>
          <p>IGW sin ruta: no sirve. NAT sin ruta: no sirve. SG sin servicio: no sirve. Public IP sin arquitectura de red: no sirve. Una pieza aislada no resuelve el problema.</p>
        </section>

        <section className="lesson-section">
          <h3>31. Método de diagnóstico</h3>
          <Flow steps={[
            { label: '¿Origen y destino están correctos?' },
            { label: '¿Las IP/rangos tienen sentido?' },
            { label: '¿Existe una ruta?' },
            { label: '¿El target está disponible?' },
            { label: '¿NACL permite?' },
            { label: '¿SG permite?' },
            { label: '¿El servicio está escuchando?' },
          ]} />
          <p>No empezamos "abramos todo". Este método aplica a: cliente que no abre la web, web que no conecta a app, app que no conecta a DB, y app que no sale a Internet — cada uno con su propio árbol, integrando varias clases del módulo.</p>
        </section>

        <section className="lesson-section">
          <h3>32. Actividad principal: diseña desde requisitos — EduCloud</h3>
          <Nota><p>Portal público, backend privado, base privada, backend necesita Internet, base solo recibe desde backend. VPC: 10.50.0.0/16.</p></Nota>
          <Reveal label="Ver posible respuesta">
            <Flow steps={[
              { icon: 'radio', label: 'Internet' },
              { icon: 'door', label: 'IGW' },
              { icon: 'globe', label: 'VPC 10.50.0.0/16' },
              { icon: 'building', label: 'Public — Portal' },
              { icon: 'lock', label: 'Backend Subnet — Backend + NAT' },
              { icon: 'database', label: 'Database Subnet — DB' },
            ]} />
            <InfoBox items={['SG-Portal: 443, Source: usuarios', 'SG-Backend: AppPort, Source: SG-Portal', 'SG-Database: DBPort, Source: SG-Backend']} />
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>33. Reto de la clase: HealthCloud</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge icon="trophy">HealthCloud</ConceptBadge>
          <p>Los pacientes acceden al portal desde Internet; el portal se comunica con una API interna; la API consulta una base de datos; la API debe descargar actualizaciones; la base no necesita Internet; ningún paciente debe acceder directamente a API o DB.</p>
          <Reveal label="Ver diseño esperado">
            <Flow steps={[
              { icon: 'radio', label: 'Internet' },
              { icon: 'door', label: 'IGW' },
              { icon: 'globe', label: 'Health VPC' },
              { icon: 'building', label: 'Public — Portal' },
              { icon: 'lock', label: 'API Subnet — API + NAT' },
              { icon: 'database', label: 'DB Subnet — DB' },
            ]} />
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>34. Reto nivel 2: encuentra 7 errores</h3>
          <Nota><p>Web en Private Subnet; App con Public IP; DB en Public Subnet con Public IP; Public RT solo local; Private RT con 0.0.0.0/0 → IGW; SG-Web sin 443; SG-App Allow All; SG-DB 3306 desde 0.0.0.0/0.</p></Nota>
          <Reveal label="Ver errores encontrados">
            <ul className="plain-list">
              <li>Web necesita una arquitectura de entrada pública, pero está mal ubicada/configurada.</li>
              <li>App no necesita Public IP.</li>
              <li>DB no debería exponerse directamente.</li>
              <li>Public RT no tiene ruta al IGW.</li>
              <li>Private RT apunta directamente al IGW.</li>
              <li>SG-Web no permite HTTPS.</li>
              <li>SG-App es demasiado amplio.</li>
              <li>SG-DB permite Internet completo.</li>
            </ul>
            <p>Hay incluso más de siete.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>35. Reto oral</h3>
          <Dialogo>Explica toda tu arquitectura sin utilizar las palabras AWS, VPC, subnet, IP, Internet Gateway, NAT, Route Table, Security Group, pública, privada ni firewall.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Separé la aplicación en áreas según quién necesita llegar a cada componente. Los usuarios pueden alcanzar solo la primera capa. Esa capa habla con una segunda, y la segunda con los datos. Los sistemas internos pueden iniciar ciertas comunicaciones externas mediante una salida controlada, pero no reciben conexiones directas desde fuera."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>36. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Necesidad</th><th>Componente</th></tr></thead>
            <tbody>
              <tr><td>Red propia</td><td>VPC</td></tr>
              <tr><td>Separar zonas</td><td>Subnets</td></tr>
              <tr><td>Decidir caminos</td><td>Route Tables</td></tr>
              <tr><td>Conectar VPC con Internet</td><td>Internet Gateway</td></tr>
              <tr><td>Salida desde privado</td><td>NAT Gateway</td></tr>
              <tr><td>Proteger recursos</td><td>Security Groups</td></tr>
              <tr><td>Control de subnet</td><td>Network ACL</td></tr>
              <tr><td>Mayor resiliencia</td><td>Varias AZ</td></tr>
              <tr><td>Menor exposición</td><td>Mínimo acceso</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>37. Ticket de salida</h3>
          <Dialogo>Una aplicación tiene tres capas: Web, App y Database. ¿Cuál debería recibir conexiones directas desde usuarios de Internet y cómo deberían comunicarse las otras dos?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>La capa Web recibe las conexiones públicas. Web se comunica con App y App con Database utilizando la red interna y permisos específicos. App y Database no necesitan exposición directa a usuarios de Internet.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 8</div>
          <Dialogo>"¿Podrías reconstruir todo sin que yo te diga los nombres?"</Dialogo>
          <p>La última clase del módulo será precisamente eso.</p>
          <ConceptBadge icon="trophy">Módulo 5 · Clase 8 — Laboratorio integrador: construye y diagnostica una arquitectura VPC completa</ConceptBadge>
          <Nota><p>Esa clase debe ser un cierre práctico, no más teoría nueva. El estudiante tendrá que partir de requisitos, crear o simular la VPC, subnets, rutas, IGW, NAT y controles, probar los caminos y diagnosticar errores deliberados.</p></Nota>
          <Link to="/aprendizaje/aws-desde-cero/modulo-5/clase-8" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 8: Laboratorio integrador VPC →
          </Link>
        </div>

      </div>
    </div>
  );
}
