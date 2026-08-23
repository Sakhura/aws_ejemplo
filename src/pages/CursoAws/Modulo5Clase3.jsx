import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué es una subnet?', options: [{ text: 'Una parte de una VPC.', correct: true }, { text: 'Un servidor.', correct: false }, { text: 'Un usuario.', correct: false }, { text: 'Un bucket.', correct: false }] },
  { q: '¿A cuántas Availability Zones pertenece una subnet?', options: [{ text: 'Una.', correct: true }, { text: 'Todas automáticamente.', correct: false }, { text: 'Ninguna.', correct: false }, { text: 'Depende de IAM.', correct: false }] },
  { q: '¿Una VPC puede tener varias subnets?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Qué representa conceptualmente 10.0.1.0/24?', options: [{ text: 'Un bloque de direcciones que podría utilizar una subnet.', correct: true }, { text: 'Un usuario.', correct: false }, { text: 'Una AMI.', correct: false }, { text: 'Una contraseña.', correct: false }] },
  { q: '¿Qué tipo de subnet solemos evaluar para un servidor web público?', options: [{ text: 'Pública.', correct: true }, { text: 'Solo privada siempre.', correct: false }, { text: 'IAM.', correct: false }, { text: 'EBS.', correct: false }] },
  { q: '¿Dónde solemos ubicar conceptualmente una base de datos sin acceso directo desde Internet?', options: [{ text: 'Subnet privada.', correct: true }, { text: 'Internet Gateway.', correct: false }, { text: 'Route 53.', correct: false }, { text: 'S3.', correct: false }] },
  { q: '¿Una instancia en subnet pública tiene automáticamente acceso a Internet?', options: [{ text: 'Sí.', correct: false }, { text: 'No. Necesita otras condiciones.', correct: true }] },
  { q: '¿Una subnet privada puede comunicarse internamente?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿El nombre de una subnet define si es pública?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Qué será clave para determinar si una subnet tiene ruta directa hacia Internet?', options: [{ text: 'Route Table + Internet Gateway.', correct: true }, { text: 'El color del ícono.', correct: false }, { text: 'IAM Group.', correct: false }, { text: 'Snapshot.', correct: false }] },
];

export default function Modulo5Clase3() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 5 · Clase 3</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 5 · Clase 3: Subnets públicas y privadas, dividiendo nuestra VPC en zonas</h2>
      <p className="lesson-subtitle">
        Una subnet es una parte de nuestra VPC que utilizamos para organizar recursos y controlar cómo se conectan.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + diseño de red + actividades + preparación práctica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 5 · Clases 1 y 2</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es una subnet y por qué dividimos una VPC.</li>
            <li>Reconocer que una subnet pertenece a una Availability Zone.</li>
            <li>Comprender la diferencia conceptual entre subnet pública y privada.</li>
            <li>Entender que una subnet pública necesita una ruta apropiada hacia un Internet Gateway.</li>
            <li>Comprender que una instancia necesita además direccionamiento y seguridad adecuados.</li>
            <li>Comprender que una subnet privada puede comunicarse internamente.</li>
            <li>Relacionar subnets con disponibilidad y dividir conceptualmente un CIDR /16 en bloques /24.</li>
            <li>Diseñar una arquitectura sencilla con una zona pública y una privada.</li>
          </ul>
          <p>La frase que debe sobrevivir será:</p>
          <Dialogo>Una subnet es una parte de nuestra VPC que utilizamos para organizar recursos y controlar cómo se conectan.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Recordemos nuestra VPC</h3>
          <ConceptBadge>VPC CloudShop — 10.0.0.0/16 — Web + App + DB, todos dentro del mismo gran espacio</ConceptBadge>
          <p>Ahora necesitamos organizarlos.</p>
        </section>

        <section className="lesson-section">
          <h3>3. La ciudad necesita barrios</h3>
          <Nota><p>No colocamos fábricas, viviendas, hospitales y comercio todo mezclado en el mismo espacio. La ciudad se divide en barrios o zonas, cada una con un propósito diferente.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>4. En una VPC ocurre algo parecido: subnets</h3>
          <Dialogo>Una subnet es una sección más pequeña dentro de una VPC.</Dialogo>
          <Flow steps={[{ icon: 'globe', label: 'VPC' }, { icon: 'building', label: 'Subnet A' }, { icon: 'building', label: 'Subnet B' }, { icon: 'building', label: 'Subnet C' }]} />
        </section>

        <section className="lesson-section">
          <h3>5. Dividiendo el bloque</h3>
          <p>VPC 10.0.0.0/16 puede reservar bloques como <code>10.0.1.0/24</code> y <code>10.0.2.0/24</code> para distintas subnets. No necesitamos entrar todavía en cálculos binarios: solo recordamos que /16 representa un bloque mayor que /24 — estamos dividiendo un bloque grande en bloques más pequeños.</p>
        </section>

        <section className="lesson-section">
          <h3>6. Una subnet pertenece a una Availability Zone</h3>
          <Nota><p>Este concepto es muy importante. La VPC abarca la Región. Pero una subnet pertenece a una sola Availability Zone — no podemos decir que una subnet abarca varias AZ. Si queremos recursos distribuidos entre varias AZ, creamos subnets en cada una.</p></Nota>
          <Flow steps={[{ icon: 'map-pin', label: 'Región' }, { icon: 'globe', label: 'VPC' }, { icon: 'building', label: 'AZ A → Subnet A' }, { icon: 'building', label: 'AZ B → Subnet B' }]} />
        </section>

        <section className="lesson-section">
          <h3>7. ¿Por qué dividir una VPC?</h3>
          <p>Podemos dividir por nivel de exposición, función, disponibilidad, seguridad, organización o arquitectura. Comenzaremos con la más fácil: público vs privado.</p>
        </section>

        <section className="lesson-section">
          <h3>8. Subnet pública</h3>
          <Dialogo>Una subnet pública es una subnet cuya tabla de rutas tiene una ruta hacia un Internet Gateway para tráfico de Internet.</Dialogo>
          <Nota><p>Es una zona de la VPC preparada para que determinados recursos puedan comunicarse directamente con Internet cuando también cumplen las demás condiciones necesarias.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>9. La palabra importante es "puedan"</h3>
          <Nota><p>Estar dentro de una subnet pública no convierte automáticamente una instancia en accesible desde Internet. También necesitamos dirección pública apropiada, ruta, Internet Gateway y Security Group adecuado.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>10. Las piezas de una instancia pública</h3>
          <Flow steps={[
            { icon: 'server', label: 'EC2 + dirección pública + Security Group' },
            { icon: 'building', label: 'Public Subnet' },
            { icon: 'refresh', label: 'Route Table' },
            { icon: 'door', label: 'Internet Gateway' },
            { icon: 'radio', label: 'Internet' },
          ]} />
          <p>Analogía: tener una casa en un barrio con salida a la carretera no significa que la puerta de tu casa esté abierta. Subnet pública = barrio con ruta exterior; Security Group = control de la puerta del recurso.</p>
        </section>

        <section className="lesson-section">
          <h3>11. Subnet privada</h3>
          <Dialogo>Una subnet privada no tiene una ruta directa hacia un Internet Gateway para Internet. Es una zona diseñada para recursos que no necesitan recibir conectividad directa desde Internet.</Dialogo>
          <p>Ejemplos: bases de datos, servidores internos, componentes sensibles. Analogía del banco: la recepción es de acceso público; la bóveda no tiene una puerta directa desde la calle.</p>
        </section>

        <section className="lesson-section">
          <h3>12. CloudShop dividido</h3>
          <Flow steps={[
            { icon: 'globe', label: 'VPC 10.0.0.0/16' },
            { icon: 'radio', label: 'Public Subnet 10.0.1.0/24 → Web' },
            { icon: 'lock', label: 'Private Subnet 10.0.2.0/24 → Database' },
          ]} />
          <p>Ahora podemos decir: el servidor web tiene una función pública, mientras la base de datos tiene una función privada. No necesitamos exponer ambos recursos de la misma forma.</p>
        </section>

        <section className="lesson-section">
          <h3>13. Privado no significa incomunicado</h3>
          <Nota><p>Una base de datos en subnet privada puede comunicarse con la aplicación y otros recursos permitidos, si existe conectividad y las reglas lo permiten.</p></Nota>
          <p>Analogía: una oficina interna no tiene puerta directa a la calle, pero sí tiene puerta hacia el pasillo interno — comunicación controlada dentro del edificio.</p>
        </section>

        <section className="lesson-section">
          <h3>14. Comunicación dentro de la VPC</h3>
          <Nota><p>Una VPC incluye una ruta local que permite comunicación entre sus rangos, sujeta a controles como Security Groups y NACLs. Las subnets de una misma VPC pueden tener comunicación interna cuando las reglas lo permiten.</p></Nota>
          <p>App (10.0.1.20) y DB (10.0.2.30) pueden comunicarse dentro de la VPC sin necesitar Internet para esa conversación.</p>
        </section>

        <section className="lesson-section">
          <h3>15. IP privada y pública en cada recurso</h3>
          <RoleGrid roles={[
            { icon: 'server', label: 'Web', desc: 'IP privada 10.0.1.25 + IP pública' },
            { icon: 'database', label: 'Database', desc: 'Solo IP privada 10.0.2.20' },
          ]} />
          <p>La dirección privada sirve dentro de la arquitectura VPC; la pública puede participar en comunicación con Internet según el resto del diseño. El cliente no necesita conocer ni alcanzar directamente la IP privada de la base.</p>
        </section>

        <section className="lesson-section">
          <h3>16. Security Groups siguen siendo necesarios</h3>
          <Nota><p>Que la base esté en una subnet privada no significa que deba aceptar conexiones desde todos los recursos internos. Podemos diseñar: Web → permitido, Otro servidor → no permitido, según las necesidades.</p></Nota>
          <ConceptBadge icon="target">Defensa por capas: segmentación + Security Groups + IAM + rutas — cada pieza resuelve un problema diferente</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>17. "Public" y "Private" no son nombres mágicos</h3>
          <Nota><p>Podemos llamar a una subnet "SUPER-PRIVADA-SECRETA", pero si su tabla de rutas tiene conectividad directa mediante Internet Gateway, el nombre no la convierte en privada. La arquitectura real depende de las rutas y conectividad, no de la etiqueta.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>18. ¿Qué convierte una subnet en pública?</h3>
          <Dialogo>Una ruta apropiada hacia un Internet Gateway: 0.0.0.0/0 → Internet Gateway en la tabla de rutas asociada. Esto será el corazón de la Clase 4.</Dialogo>
          <p>Una subnet privada no posee esa ruta directa. Puede tener <code>10.0.0.0/16 → local</code> y quizás otras rutas internas. Más adelante puede utilizar NAT Gateway (Clase 5) para iniciar conexiones hacia Internet sin exponer directamente las instancias.</p>
        </section>

        <section className="lesson-section">
          <h3>19. Una arquitectura real suele usar varias AZ</h3>
          <Nota><p>Si todos nuestros recursos están en una sola AZ y esa zona presenta una falla relevante, toda nuestra aplicación podría verse afectada. Distribuir recursos puede mejorar resiliencia.</p></Nota>
          <Flow steps={[
            { icon: 'building', label: 'AZ A — Public A + Private A' },
            { icon: 'building', label: 'AZ B — Public B + Private B' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>20. Las subnets no deberían superponerse</h3>
          <Nota><p>Dentro de la VPC, los bloques de subnet deben encajar correctamente sin solaparse. No podemos tener dos subnets con exactamente el mismo rango dentro de la misma VPC. AWS también reserva algunas direcciones dentro de cada subnet IPv4 para funciones de red — no todas las direcciones de un CIDR están disponibles para instancias.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>21. Actividad: VPC o subnet</h3>
          <QaItem question="Red general: 10.0.0.0/16" answer="VPC." />
          <QaItem question="Parte: 10.0.1.0/24" answer="Subnet." />
          <QaItem question="Abarca la Región." answer="VPC." />
          <QaItem question="Pertenece a una Availability Zone." answer="Subnet." />
        </section>

        <section className="lesson-section">
          <h3>22. Actividad: público o privado</h3>
          <QaItem question="Servidor que atiende usuarios de Internet." answer="Zona pública puede ser apropiada." />
          <QaItem question="Base de datos." answer="Zona privada normalmente es más apropiada." />
          <QaItem question="Servidor interno que no recibe tráfico público." answer="Privada." />
          <QaItem question="Load balancer público." answer="Subnets públicas pueden formar parte del diseño." />
        </section>

        <section className="lesson-section">
          <h3>23. Actividad: verdadero o falso</h3>
          <QaItem question="Todo recurso en una subnet pública tiene automáticamente Internet." answer="Falso." />
          <QaItem question="Una subnet pertenece a una sola AZ." answer="Verdadero." />
          <QaItem question="Una subnet privada no puede comunicarse con ningún recurso." answer="Falso." />
          <QaItem question='El nombre "private-subnet" la vuelve privada.' answer="Falso." />
        </section>

        <section className="lesson-section">
          <h3>24. Diseñemos UniversidadCloud</h3>
          <Nota><p>VPC 10.10.0.0/16 con portal para estudiantes, aplicación interna y base de datos.</p></Nota>
          <Reveal label="Ver propuesta">
            <Flow steps={[
              { icon: 'radio', label: 'Public Subnet 10.10.1.0/24 → Portal' },
              { icon: 'lock', label: 'Private Subnet 10.10.2.0/24 → App + DB' },
            ]} />
          </Reveal>
          <p>Más subnets no significa automáticamente mejor arquitectura; muy pocas puede limitar separación. La meta es segmentación útil y comprensible.</p>
        </section>

        <section className="lesson-section">
          <h3>25. Dos errores opuestos</h3>
          <Dialogo>"Si pongo la base en la subnet pública puedo conectarme más fácil." — Pedro</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque estaríamos ampliando la exposición de un componente que normalmente no necesita recibir conexiones directas desde Internet. Esto es lo que haría en su lugar: mantener la base en una subnet privada y proporcionar acceso administrativo mediante mecanismos controlados. El riesgo de su enfoque es aumentar innecesariamente la superficie de ataque.</p>
          </Nota>
          <p>Tampoco decimos "todo debe estar en subnet privada porque privado es más seguro" — un servicio diseñado para Internet necesita una arquitectura que permita esa comunicación. La seguridad no significa desconectar todo.</p>
        </section>

        <section className="lesson-section">
          <h3>26. Subnet no reemplaza Security Group</h3>
          <p>Tenemos una Private Subnet, pero todavía necesitamos un Security Group para controlar qué conexiones son permitidas — segmentación y firewall trabajan juntos.</p>
          <RoleGrid roles={[
            { icon: 'building', label: 'Subnet', desc: '¿Dónde vive?' },
            { icon: 'shield', label: 'Security Group', desc: '¿Quién puede tocar la puerta?' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>27. Primer vistazo a Route Table e Internet Gateway</h3>
          <Nota><p>Una tabla de rutas contiene instrucciones que ayudan a decidir hacia dónde enviar tráfico de red — como una señalética (Centro → derecha, Aeropuerto → izquierda).</p></Nota>
          <Nota><p>Un Internet Gateway es un componente que permite conectividad entre una VPC e Internet cuando la arquitectura y las rutas están configuradas correctamente.</p></Nota>
          <Flow steps={[{ icon: 'radio', label: 'Internet' }, { icon: 'door', label: 'Internet Gateway' }, { icon: 'refresh', label: 'Route Table' }, { icon: 'building', label: 'Public Subnet' }, { icon: 'server', label: 'Web' }]} />
          <p>La siguiente clase desmontará este dibujo pieza por pieza.</p>
        </section>

        <section className="lesson-section">
          <h3>28. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>29. Reto de la clase</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge icon="trophy">ClínicaCloud</ConceptBadge>
          <p>VPC 10.20.0.0/16 con portal para pacientes, aplicación interna y base de datos.</p>
          <Reveal label="Ver posible solución">
            <Flow steps={[
              { icon: 'radio', label: 'Public Subnet 10.20.1.0/24 → Portal' },
              { icon: 'lock', label: 'Private Subnet 10.20.2.0/24 → App + DB' },
            ]} />
            <p>Lo importante no son exactamente los números, sino por qué ubicamos cada componente ahí.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>30. Reto nivel 2 y de diagnóstico</h3>
          <QaItem question="La clínica quiere mayor disponibilidad con AZ A y AZ B. ¿Qué podríamos hacer?" answer="Crear Public A + Private A en AZ A, y Public B + Private B en AZ B, distribuyendo recursos según la arquitectura." />
          <QaItem question='Una instancia está en "public-subnet" pero no tiene acceso a Internet. ¿Podemos decir "AWS está fallando"?' answer="No. Primero revisamos tabla de rutas, Internet Gateway, dirección pública, Security Group y otros controles. El nombre no demuestra nada." />
        </section>

        <section className="lesson-section">
          <h3>31. Reto oral</h3>
          <Dialogo>Explícame una subnet sin utilizar las palabras subnet, VPC, red, IP, dirección, público, privado, zona, AWS ni Internet.</Dialogo>
          <Reveal label="Ver una buena respuesta">
            <Dialogo>"Es una división más pequeña dentro de un espacio mayor que nos permite agrupar sistemas según su función y controlar mejor cómo se relacionan."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>32. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Subnet</td><td>Parte de una VPC</td></tr>
              <tr><td>CIDR subnet</td><td>Bloque de direcciones de esa zona</td></tr>
              <tr><td>Availability Zone</td><td>Cada subnet pertenece a una AZ</td></tr>
              <tr><td>Public Subnet</td><td>Tiene ruta apropiada hacia Internet Gateway</td></tr>
              <tr><td>Private Subnet</td><td>No tiene ruta directa hacia Internet Gateway</td></tr>
              <tr><td>Private IP</td><td>Dirección interna del recurso</td></tr>
              <tr><td>Public IP</td><td>Dirección pública cuando corresponde</td></tr>
              <tr><td>Security Group</td><td>Controla tráfico del recurso</td></tr>
              <tr><td>Route Table</td><td>Decide por dónde enviar tráfico</td></tr>
              <tr><td>Internet Gateway</td><td>Conecta la VPC con Internet</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>33. Ticket de salida</h3>
          <Dialogo>¿Qué hace que una subnet sea pública: su nombre, la IP de una instancia o su configuración de rutas?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Su configuración de rutas, específicamente una ruta apropiada hacia un Internet Gateway; además, el recurso necesita las demás condiciones de direccionamiento y seguridad para comunicarse con Internet.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 4</div>
          <Flow steps={[{ icon: 'server', label: 'EC2' }, { icon: 'building', label: 'Public Subnet' }, { n: '?', label: '¿?' }, { icon: 'radio', label: 'Internet' }]} />
          <Dialogo>"Ya pusimos nuestro servidor en una zona pública. Pero cuando quiere enviar información a Google, ¿cómo sabe por dónde salir?"</Dialogo>
          <p>Necesitamos una señalética: "Para este destino, ve por aquí". Eso será Route Table. Y para poder salir de la VPC hacia Internet necesitaremos Internet Gateway.</p>
          <ConceptBadge icon="refresh">Módulo 5 · Clase 4 — Route Tables e Internet Gateway: enseñándole a nuestra red por dónde ir</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-5/clase-4" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 4: Route Tables e Internet Gateway →
          </Link>
        </div>

      </div>
    </div>
  );
}
