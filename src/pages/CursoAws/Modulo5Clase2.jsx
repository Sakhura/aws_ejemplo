import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, CompareCols, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué significa VPC?', options: [{ text: 'Virtual Private Cloud', correct: true }, { text: 'Virtual Public Computer', correct: false }, { text: 'Verified Private CPU', correct: false }, { text: 'Virtual Processing Cloud', correct: false }] },
  { q: '¿Qué es una VPC?', options: [{ text: 'Una red virtual lógicamente aislada dentro de AWS.', correct: true }, { text: 'Un servidor.', correct: false }, { text: 'Un disco.', correct: false }, { text: 'Una contraseña.', correct: false }] },
  { q: '¿VPC y EC2 son lo mismo?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Qué expresa CIDR?', options: [{ text: 'Un bloque/rango de direcciones IP.', correct: true }, { text: 'Una contraseña.', correct: false }, { text: 'Un archivo.', correct: false }, { text: 'Un usuario.', correct: false }] },
  { q: '¿Qué representa conceptualmente 10.0.0.0/16?', options: [{ text: 'Un bloque de direcciones IPv4.', correct: true }, { text: 'Una instancia EC2.', correct: false }, { text: 'Un puerto.', correct: false }, { text: 'Una política.', correct: false }] },
  { q: '¿Una VPC pertenece a una Región?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Una VPC puede abarcar varias Availability Zones de su Región?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Crear una VPC entrega Internet automáticamente?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Elegir un rango privado configura automáticamente toda la seguridad?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Qué utilizaremos para dividir una VPC?', options: [{ text: 'Subnets.', correct: true }, { text: 'IAM Groups.', correct: false }, { text: 'Snapshots.', correct: false }, { text: 'S3 Objects.', correct: false }] },
];

export default function Modulo5Clase2() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 5 · Clase 2</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 5 · Clase 2: ¿Qué es Amazon VPC? Nuestra red privada dentro de AWS</h2>
      <p className="lesson-subtitle">
        Amazon VPC nos permite crear nuestra propia red virtual aislada lógicamente dentro de AWS.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + analogías + lectura de arquitectura + actividades</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 5 · Clase 1</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es Amazon VPC y qué significa una red virtual privada.</li>
            <li>Diferenciar AWS, una VPC y una instancia EC2.</li>
            <li>Comprender que una VPC posee un rango de direcciones IP y reconocer la notación CIDR.</li>
            <li>Comprender qué representa 10.0.0.0/16 y por qué necesitamos planificar el espacio de direcciones.</li>
            <li>Reconocer una Default VPC y una VPC personalizada.</li>
            <li>Comprender que una VPC pertenece a una Región y puede abarcar varias Zonas de Disponibilidad.</li>
            <li>Prepararse para dividir una VPC mediante subnets.</li>
          </ul>
          <p>La frase que debe sobrevivir será:</p>
          <Dialogo>Amazon VPC nos permite crear nuestra propia red virtual aislada lógicamente dentro de AWS.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Recordemos la Clase 1</h3>
          <Nota><p>Ya comprendemos: red, dispositivos, direcciones IP, caminos y controles.</p></Nota>
          <Dialogo>¿Dónde están conectadas nuestras instancias EC2 cuando las creamos en AWS?</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>3. AWS también necesita redes</h3>
          <Nota><p>Servidor web, servidor de aplicaciones y base de datos necesitan comunicarse. No queremos que floten en una nube abstracta — necesitamos una red.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>4. Aquí aparece Amazon VPC</h3>
          <Dialogo>VPC significa Virtual Private Cloud. Es un servicio que nos permite definir una red virtual propia dentro de AWS.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>5. La analogía del terreno</h3>
          <Nota><p>Imaginemos que AWS es una enorme extensión territorial. Nosotros queremos construir una empresa: primero delimitamos nuestro terreno. Dentro decidiremos después dónde poner casas, oficinas, qué áreas serán privadas y cuáles tendrán contacto con el exterior. Ese terreno representa conceptualmente nuestra VPC.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>6. AWS ≠ VPC ≠ EC2</h3>
          <RoleGrid roles={[
            { icon: 'cloud', label: 'AWS', desc: 'Plataforma completa' },
            { icon: 'globe', label: 'VPC', desc: 'Una red virtual dentro de AWS' },
            { icon: 'server', label: 'EC2', desc: 'Cómputo dentro de la VPC' },
          ]} />
          <p>Analogía del edificio: la VPC es el edificio; EC2 son las oficinas dentro. Una VPC no ejecuta nuestra aplicación — proporciona el entorno de red donde determinados recursos pueden comunicarse.</p>
        </section>

        <section className="lesson-section">
          <h3>7. ¿Por qué se llama "Private"?</h3>
          <Dialogo>Porque la VPC es una red lógicamente aislada que controlamos dentro de AWS. No compartimos automáticamente nuestra red interna con cualquier otro cliente AWS.</Dialogo>
          <p>Podemos decidir qué rangos utilizar, cómo dividirlos, qué conectividad existirá y qué recursos pueden comunicarse.</p>
        </section>

        <section className="lesson-section">
          <h3>8. "Private" no significa sin Internet</h3>
          <Nota><p>"Si es Virtual Private Cloud, entonces no puede conectarse a Internet." — Incorrecto. Una VPC puede tener componentes con conectividad hacia Internet y componentes internos. Dependerá del diseño.</p></Nota>
          <p>Analogía: nuestra casa es privada pero tiene una puerta hacia la calle. Eso no convierte toda la casa en espacio público.</p>
        </section>

        <section className="lesson-section">
          <h3>9. La VPC define un espacio de direcciones</h3>
          <Nota><p>Cuando creamos una VPC necesitamos indicar qué conjunto de direcciones IP podrá utilizar esta red. Aquí aparece CIDR — pero lo veremos sin matemáticas complicadas.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>10. CIDR: describir un bloque</h3>
          <Dialogo>CIDR es una forma de expresar un bloque de direcciones IP.</Dialogo>
          <p>No queremos escribir <code>10.0.0.1</code>, <code>10.0.0.2</code>, <code>10.0.0.3</code>... una por una — sería una penitencia digital.</p>
        </section>

        <section className="lesson-section">
          <h3>11. Primer CIDR: 10.0.0.0/16</h3>
          <ConceptBadge icon="package">10.0.0.0/16 — Un bloque de direcciones IPv4 que podemos utilizar como espacio de nuestra red</ConceptBadge>
          <Nota><p>El /16 indica cuántos bits corresponden a la parte que identifica la red, pero para este nivel: el número después de / nos ayuda a determinar el tamaño del bloque. No entraremos en conversión binaria.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>12. Regla intuitiva</h3>
          <Dialogo>En IPv4, un número menor después de / representa un bloque más grande, y un número mayor representa un bloque más pequeño.</Dialogo>
          <p><code>/16</code> es un bloque mayor que <code>/24</code>. Eso basta por ahora.</p>
        </section>

        <section className="lesson-section">
          <h3>13. Nuestra primera VPC conceptual</h3>
          <Nota><p>VPC: CloudShop, CIDR: 10.0.0.0/16 — CloudShop tiene reservado ese bloque de direcciones para organizar su red. Más adelante podríamos usar direcciones como <code>10.0.1.x</code>, <code>10.0.2.x</code>, <code>10.0.3.x</code> según cómo dividamos la red.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>14. No podemos elegir rangos alegremente</h3>
          <p>En organizaciones reales debemos considerar otras VPC, oficinas, VPN, redes corporativas y futuras conexiones. Si utilizamos rangos superpuestos, podemos complicar la conectividad futura — como dos ciudades que ambas dicen tener "Calle 10, Casa 20".</p>
          <Dialogo>Planificar hoy evita dolores mañana: ¿qué rango utilizaré? ¿Necesito conectarla con otra red? ¿Cuánto crecimiento espero? ¿Existe ya ese rango en otra parte?</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>15. La VPC pertenece a una Región</h3>
          <Flow steps={[{ icon: 'cloud', label: 'AWS' }, { icon: 'map-pin', label: 'Región' }, { icon: 'globe', label: 'VPC' }]} />
          <p>Una VPC es un recurso regional: no creamos una única VPC que se extienda automáticamente por todas las Regiones AWS.</p>
        </section>

        <section className="lesson-section">
          <h3>16. VPC regional, subnets zonales</h3>
          <p>La VPC abarca la Región y sus Zonas de Disponibilidad. Pero las subnets que veremos en Clase 3 pertenecen a una Zona de Disponibilidad específica — la VPC sigue siendo la red general.</p>
        </section>

        <section className="lesson-section">
          <h3>17. ¿Qué vive dentro de una VPC?</h3>
          <p>Muchos recursos de red AWS pueden estar asociados a una VPC: EC2, bases de datos, Security Groups, subnets, Route Tables, gateways.</p>
        </section>

        <section className="lesson-section">
          <h3>18. ¿S3 vive dentro de nuestra VPC?</h3>
          <Nota><p>No de la misma forma que una instancia EC2. Amazon S3 es un servicio regional administrado con su propio modelo de acceso. Más adelante existen mecanismos para conectar recursos VPC con servicios como S3 de maneras específicas (VPC Endpoints), pero no necesitamos eso todavía.</p></Nota>
          <p>Nuestro dibujo correcto NO es "VPC contiene EC2, S3, IAM, CloudWatch, absolutamente todo AWS" — algunos servicios interactúan con VPC de maneras diferentes.</p>
        </section>

        <section className="lesson-section">
          <h3>19. Default VPC vs Custom VPC</h3>
          <RoleGrid roles={[
            { icon: 'home', label: 'Default VPC', desc: 'Casa ya preparada, lista para usarse rápidamente' },
            { icon: 'settings', label: 'Custom VPC', desc: 'Diseñamos habitaciones, puertas, zonas y accesos' },
          ]} />
          <p>Cuando en el Módulo 3 creamos EC2 y "todo funcionó" sin diseñar red, probablemente estábamos utilizando infraestructura de red ya preparada — no era magia, había una configuración de red.</p>
        </section>

        <section className="lesson-section">
          <h3>20. Caso CloudShop</h3>
          <Nota><p>Queremos construir CloudShop VPC con servidor web, aplicación y base de datos. Pero no queremos que todos tengan el mismo nivel de exposición.</p></Nota>
          <Dialogo>Entonces tendremos que dividir nuestra red.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>21. Hoy tenemos una ciudad sin barrios</h3>
          <ConceptBadge>VPC 10.0.0.0/16: Web + App + DB, todo dentro del mismo gran espacio conceptual</ConceptBadge>
          <QaItem question="¿Cómo organizamos mejor esta ciudad?" answer="Necesitamos barrios: una zona para sistemas públicos y otra para sistemas privados. Aquí comienza a aparecer Subnet." />
        </section>

        <section className="lesson-section">
          <h3>22. VPC es el conjunto, subnet es una parte</h3>
          <CompareCols cols={[
            { emoji: '🏙️', title: 'Ciudad', items: ['Barrio A', 'Barrio B', 'Barrio C'] },
            { emoji: '🌐', title: 'VPC', items: ['Subnet A', 'Subnet B', 'Subnet C'] },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>23. El CIDR también se dividirá</h3>
          <p>Si nuestra VPC tiene <code>10.0.0.0/16</code>, más adelante podríamos reservar partes como <code>10.0.1.0/24</code> y <code>10.0.2.0/24</code>, cada una representando una subnet. Estamos dividiendo el bloque mayor en bloques más pequeños. La próxima clase explicará por qué hacemos esos cortes.</p>
        </section>

        <section className="lesson-section">
          <h3>24. Comunicación dentro de la VPC</h3>
          <Nota><p>Los recursos dentro de una VPC pueden comunicarse según sus direcciones, rutas, reglas de seguridad y configuración de red. No significa "todo habla con todo automáticamente sin controles".</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>25. VPC tampoco reemplaza IAM</h3>
          <RoleGrid roles={[
            { icon: 'lock', label: 'IAM', desc: '¿Quién puede crear, modificar o eliminar recursos AWS?' },
            { icon: 'globe', label: 'VPC', desc: '¿Cómo están organizadas y conectadas nuestras redes?' },
          ]} />
          <p>Camila puede tener permiso IAM para administrar EC2 — eso no significa que la aplicación dentro de EC2 pueda comunicarse con cualquier destino. Son dos dimensiones diferentes de seguridad.</p>
        </section>

        <section className="lesson-section">
          <h3>26. ¿Una VPC tiene Internet automáticamente?</h3>
          <Nota><p>No necesariamente. Crear una VPC no significa automáticamente VPC → Internet. Necesitamos otros componentes: rutas, direcciones apropiadas, seguridad. En la Clase 4 veremos Internet Gateway.</p></Nota>
          <ConceptBadge icon="target">No existe "el botón Internet". Necesitamos varias piezas trabajando juntas: dirección + ruta + gateway + seguridad = conectividad posible</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>27. VPC aislada también es válida</h3>
          <p>Podemos tener una VPC donde los recursos se comuniquen internamente según sus reglas, pero sin salida a Internet. Un banco podría tener sistemas internos que necesitan comunicarse entre sí pero no necesitan recibir tráfico desde Internet — eso puede ser precisamente el objetivo.</p>
        </section>

        <section className="lesson-section">
          <h3>28. Actividad: AWS, VPC o EC2</h3>
          <QaItem question="Plataforma completa de servicios." answer="AWS." />
          <QaItem question="Red virtual propia." answer="VPC." />
          <QaItem question="Servidor virtual." answer="EC2." />
          <QaItem question="Define espacio de direcciones." answer="VPC." />
          <QaItem question="Ejecuta una aplicación." answer="EC2." />
        </section>

        <section className="lesson-section">
          <h3>29. Actividad: construyamos CloudShop</h3>
          <Nota><p>Elegimos conceptualmente VPC: 10.0.0.0/16.</p></Nota>
          <QaItem question="¿Qué hemos decidido?" answer="El espacio de direcciones general de nuestra red." />
          <p>Lo que todavía NO hemos decidido: cuál zona será pública, cuál será privada, cómo se llega a Internet, qué tráfico está permitido. Solo tenemos el terreno.</p>
        </section>

        <section className="lesson-section">
          <h3>30. Dos ideas equivocadas frecuentes</h3>
          <Dialogo>"Nuestra VPC usa 10.0.0.0/16, por lo tanto ya está protegida."</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque elegir un rango privado no configura por sí mismo todos los controles de seguridad. Esto es lo que haría en su lugar: diseñar subnets, rutas y controles de tráfico según la necesidad. El riesgo de su enfoque es creer que el direccionamiento sustituye la seguridad.</p>
          </Nota>
          <QaItem question='"Como es una VPC privada, ninguna instancia puede conectarse a Internet." ¿Correcto?' answer="No. La conectividad depende del diseño. Una VPC puede contener recursos con conectividad externa y recursos sin conectividad directa." />
        </section>

        <section className="lesson-section">
          <h3>31. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>32. Reto de la clase</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge icon="trophy">CloudShop</ConceptBadge>
          <p>La empresa define VPC: 10.0.0.0/16.</p>
          <QaItem question="¿Qué representa?" answer="El espacio general de direcciones de la VPC." />
          <QaItem question="¿Ya definimos qué servidores son públicos, si existe acceso a Internet o la seguridad?" answer="No, no y no completamente." />
          <QaItem question="¿Qué deberíamos hacer después?" answer="Dividir la red según funciones." />
        </section>

        <section className="lesson-section">
          <h3>33. Reto nivel 2 y de diagnóstico</h3>
          <QaItem question='El gerente dice: "Pongamos Web y Base de datos juntos. Después vemos la seguridad." ¿Correcto?' answer="No estoy de acuerdo porque estamos perdiendo una oportunidad temprana de separar componentes con necesidades distintas. Esto es lo que haría en su lugar: diseñar segmentos diferentes desde el inicio. El riesgo de su enfoque es terminar con una red difícil de proteger y reorganizar." />
          <QaItem question="Un estudiante crea VPC 10.0.0.0/16 e inmediatamente intenta navegar a Internet desde una instancia. No funciona. ¿Podemos concluir que 'la VPC está mala'?" answer="No. Todavía tendríamos que revisar subnet, route table, gateway, direccionamiento, Security Group y otros controles. Crear la VPC fue solo el primer paso." />
        </section>

        <section className="lesson-section">
          <h3>34. Reto oral</h3>
          <Dialogo>Explícame VPC sin usar las palabras AWS, VPC, red, virtual, privada, dirección, IP, CIDR, nube ni Internet.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Es un espacio aislado que definimos para organizar nuestros sistemas y decidir cómo podrán relacionarse entre ellos y con el exterior."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>35. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Amazon VPC</td><td>Red virtual dentro de AWS</td></tr>
              <tr><td>Private</td><td>Lógicamente aislada y controlada</td></tr>
              <tr><td>CIDR</td><td>Bloque de direcciones</td></tr>
              <tr><td>10.0.0.0/16</td><td>Ejemplo de espacio de red</td></tr>
              <tr><td>Región</td><td>Ubicación regional de la VPC</td></tr>
              <tr><td>Availability Zone</td><td>Zona dentro de la Región</td></tr>
              <tr><td>EC2</td><td>Recurso de cómputo que puede usar la VPC</td></tr>
              <tr><td>Default VPC</td><td>Red preparada inicialmente</td></tr>
              <tr><td>Custom VPC</td><td>Red diseñada según necesidades</td></tr>
              <tr><td>Subnet</td><td>Parte de una VPC</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>36. Ticket de salida</h3>
          <Dialogo>Si creo una VPC con 10.0.0.0/16, ¿qué estoy definiendo y qué NO estoy definiendo todavía?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Estoy definiendo el espacio general de direcciones de la red. Todavía no estoy definiendo por sí solo qué recursos serán públicos, sus rutas hacia Internet ni todos sus controles de seguridad.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 3</div>
          <ConceptBadge>VPC 10.0.0.0/16: Web + App + DB, todavía sin barrios</ConceptBadge>
          <Dialogo>"Tenemos una ciudad completa, pero todavía no tiene barrios. ¿Queremos colocar el sitio web público y la base de datos privada exactamente en el mismo sector?"</Dialogo>
          <p>No. Necesitamos dividir nuestra red en zona pública y zona privada.</p>
          <ConceptBadge icon="building">Módulo 5 · Clase 3 — Subnets públicas y privadas: dividiendo nuestra VPC en zonas</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-5/clase-3" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 3: Subnets públicas y privadas →
          </Link>
        </div>

      </div>
    </div>
  );
}
