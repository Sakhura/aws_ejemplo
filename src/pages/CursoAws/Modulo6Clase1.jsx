import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué es una base de datos?', options: [{ text: 'Sistema organizado para almacenar y consultar información.', correct: true }, { text: 'Solo un archivo PDF.', correct: false }, { text: 'Una dirección IP.', correct: false }, { text: 'Una instancia EC2.', correct: false }] },
  { q: '¿Qué es una tabla?', options: [{ text: 'Organización de datos del mismo tipo.', correct: true }, { text: 'Un Security Group.', correct: false }, { text: 'Un servidor.', correct: false }, { text: 'Una VPC.', correct: false }] },
  { q: '¿Qué es una columna?', options: [{ text: 'Una característica de los registros.', correct: true }, { text: 'Una base completa.', correct: false }, { text: 'Un usuario.', correct: false }, { text: 'Un backup.', correct: false }] },
  { q: '¿Qué representa una fila?', options: [{ text: 'Un registro.', correct: true }, { text: 'Una Región.', correct: false }, { text: 'Una IP.', correct: false }, { text: 'Un motor.', correct: false }] },
  { q: '¿Para qué sirve un ID?', options: [{ text: 'Para identificar un registro.', correct: true }, { text: 'Para abrir Internet.', correct: false }, { text: 'Para guardar videos.', correct: false }, { text: 'Para crear VPC.', correct: false }] },
  { q: '¿Qué significa relacional?', options: [{ text: 'Que podemos relacionar información entre tablas.', correct: true }, { text: 'Que necesita Internet.', correct: false }, { text: 'Que es pública.', correct: false }, { text: 'Que usa S3.', correct: false }] },
  { q: '¿Qué operación CRUD modifica información existente?', options: [{ text: 'Update.', correct: true }, { text: 'Read.', correct: false }, { text: 'Create.', correct: false }, { text: 'Delete.', correct: false }] },
  { q: '¿Qué operación CRUD consulta información?', options: [{ text: 'Read.', correct: true }, { text: 'Delete.', correct: false }, { text: 'Update.', correct: false }, { text: 'Create.', correct: false }] },
  { q: '¿S3 y una base de datos relacional resuelven exactamente el mismo problema?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Una aplicación real puede utilizar S3 y una base de datos al mismo tiempo?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
];

export default function Modulo6Clase1() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 6 · Clase 1</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 6 · Clase 1: ¿Qué es una base de datos? De una lista de clientes a información relacionada</h2>
      <p className="lesson-subtitle">
        Una base de datos organiza información para que podamos encontrarla, relacionarla y utilizarla de manera confiable.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial absoluto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + analogías + actividades + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Ninguno técnico específico</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es una base de datos y por qué necesitamos organizar información.</li>
            <li>Diferenciar dato e información.</li>
            <li>Explicar qué es una tabla, una columna y un registro o fila. Reconocer un identificador.</li>
            <li>Comprender de manera sencilla qué es una relación.</li>
            <li>Diferenciar archivo y base de datos, y reconocer casos donde una base de datos resulta útil.</li>
            <li>Comprender qué significa base de datos relacional.</li>
            <li>Prepararse para entender Amazon RDS en la siguiente clase.</li>
          </ul>
          <p>La frase que debe sobrevivir será:</p>
          <Dialogo>Una base de datos organiza información para que podamos encontrarla, relacionarla y utilizarla de manera confiable.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Empecemos con una tienda</h3>
          <Nota><p>Una pequeña tienda con tres clientes (Ana, Pedro, Camila) y tres productos (Notebook, Teclado, Mouse). Al principio podemos anotar todo en un cuaderno: cuaderno de clientes, cuaderno de productos, cuaderno de ventas. Para una tienda con tres clientes, puede funcionar.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>3. Pero la tienda crece</h3>
          <Nota><p>10 clientes → 100 → 1.000 → 100.000, cada uno con varias compras.</p></Nota>
          <QaItem question="¿Seguimos buscando manualmente página por página?" answer="Ahí empiezan los problemas." />
        </section>

        <section className="lesson-section">
          <h3>4. Primera necesidad: encontrar información</h3>
          <p>El jefe pregunta "¿cuál es el teléfono de Ana?", luego "¿qué compró Ana?", luego "¿cuánto gastó Ana este año?" — ahora necesitamos combinar información. La complejidad aumenta.</p>
        </section>

        <section className="lesson-section">
          <h3>5. Dato vs información</h3>
          <RoleGrid roles={[
            { icon: 'file-text', label: 'Dato', desc: 'Un valor aislado, por ejemplo 59990. Por sí solo no sabemos mucho.' },
            { icon: 'check-circle', label: 'Información', desc: 'El dato dentro de un contexto: "Total pedido: $59.990". Ahora tiene significado.' },
          ]} />
          <p>Otro ejemplo: el dato "42" puede significar edad, cantidad o stock; la información "Stock de teclados: 42 unidades" ya sabemos qué representa.</p>
        </section>

        <section className="lesson-section">
          <h3>6. ¿Qué es una base de datos?</h3>
          <Dialogo>Es un sistema organizado donde guardamos información para poder encontrarla y relacionarla fácilmente.</Dialogo>
          <p>Analogía del archivador: una oficina con secciones de clientes, productos, pedidos y proveedores. Una base de datos cumple una idea parecida, pero de forma digital y mucho más potente.</p>
        </section>

        <section className="lesson-section">
          <h3>7. Aparece la tabla</h3>
          <pre className="codeblock">{`CLIENTES
ID | Nombre  | Email
1  | Ana     | ana@email.cl
2  | Pedro   | pedro@email.cl
3  | Camila  | camila@email.cl`}</pre>
          <p>Una tabla agrupa información del mismo tipo: CLIENTES contiene clientes, PRODUCTOS contiene productos, PEDIDOS contiene pedidos.</p>
        </section>

        <section className="lesson-section">
          <h3>8. Columnas y registros</h3>
          <RoleGrid roles={[
            { icon: 'tag', label: 'Columna', desc: 'Describe una característica, como Nombre o Email' },
            { icon: 'file-text', label: 'Registro / Fila', desc: 'Representa un elemento concreto, como "1 | Ana | ana@email.cl"' },
          ]} />
          <p>Analogía del formulario: cada pregunta (Nombre, Email, Teléfono, Ciudad) sería conceptualmente una columna.</p>
        </section>

        <section className="lesson-section">
          <h3>9. Tabla + columnas + registros</h3>
          <ConceptBadge icon="clipboard-list">TABLA: Clientes · COLUMNAS: ID, Nombre, Email · REGISTRO: 1, Ana, ana@email.cl</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>10. ¿Por qué no ponemos todo en una sola tabla gigante?</h3>
          <Nota><p>Podríamos intentar una tabla con Cliente, Email, Producto, Precio, Fecha, Proveedor, Stock, Dirección, Pedido, Pago... pero rápidamente tendríamos información repetida, dificultad para actualizar, desorden e inconsistencias.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>11. Ejemplo de repetición</h3>
          <Nota><p>Ana realiza cinco compras. Si escribimos todo junto, su email aparece cinco veces.</p></Nota>
          <QaItem question="¿Qué pasa si cambiamos su email pero solo actualizamos cuatro de las cinco filas?" answer="Ahora tenemos cuatro filas con ana@email.cl y una con ana@nueva.cl. ¿Cuál es correcto?" />
        </section>

        <section className="lesson-section">
          <h3>12. Una mejor idea: guardar Ana una sola vez</h3>
          <p>CLIENTES: ID 1, Nombre Ana, Email ana@nueva.cl. Y después usamos su ID para relacionarla con otras cosas.</p>
        </section>

        <section className="lesson-section">
          <h3>13. ¿Qué es un ID?</h3>
          <Dialogo>Un identificador permite distinguir un registro. Es como el número de ficha de cada elemento.</Dialogo>
          <p>Analogía de la ficha clínica: dos personas pueden llamarse "Juan Pérez", pero cada una tiene un identificador distinto — el nombre puede repetirse, el identificador permite saber exactamente de cuál registro hablamos.</p>
        </section>

        <section className="lesson-section">
          <h3>14. Creemos Pedidos</h3>
          <pre className="codeblock">{`PEDIDOS
ID Pedido | Cliente ID | Total
100       | 1          | 59990
101       | 2          | 24990
102       | 1          | 12990`}</pre>
          <QaItem question="¿Quién es Cliente ID 1?" answer="Miramos CLIENTES: ID 1 → Ana." />
        </section>

        <section className="lesson-section">
          <h3>15. Acabamos de crear una relación</h3>
          <Flow steps={[{ icon: 'user', label: 'Ana — ID 1' }, { icon: 'file-text', label: 'Pedido 100' }, { icon: 'file-text', label: 'Pedido 102' }]} />
          <p>La tabla PEDIDOS se relaciona con CLIENTES mediante Cliente ID.</p>
        </section>

        <section className="lesson-section">
          <h3>16. ¿Qué significa "relacional"?</h3>
          <Dialogo>Las tablas no viven aisladas; podemos conectarlas para entender cómo se relaciona la información.</Dialogo>
          <Flow steps={[{ icon: 'user', label: 'Ana' }, { icon: 'file-text', label: 'Pedido 100' }, { icon: 'package', label: 'Notebook' }]} />
          <p>Una relación puede responder preguntas: "¿qué pedidos hizo Ana?" → buscamos Cliente ID = 1. "¿Quién hizo el pedido 100?" → buscamos Pedido 100, Cliente ID = 1, llegamos a Ana.</p>
        </section>

        <section className="lesson-section">
          <h3>17. Consultar información</h3>
          <Dialogo>Consultar una base de datos es hacerle una pregunta a la información.</Dialogo>
          <p>Por ejemplo: "muéstrame todos los clientes", "muéstrame productos con stock menor a 10", "muéstrame pedidos de Ana". Todavía no necesitamos escribir SQL — primero entendemos la intención.</p>
        </section>

        <section className="lesson-section">
          <h3>18. SQL</h3>
          <Dialogo>SQL (Structured Query Language) es un lenguaje utilizado para comunicarnos con muchas bases de datos relacionales.</Dialogo>
          <p>Analogía del restaurante: le decimos al camarero "quiero una pizza sin aceitunas" y él interpreta nuestra solicitud. Conceptualmente SQL permite expresar lo que queremos obtener o modificar en la base.</p>
        </section>

        <section className="lesson-section">
          <h3>19. CRUD</h3>
          <RoleGrid roles={[
            { icon: 'upload', label: 'Create', desc: 'Agregar — nueva clienta' },
            { icon: 'eye', label: 'Read', desc: 'Consultar — ver clientes' },
            { icon: 'settings', label: 'Update', desc: 'Modificar — cambiar email' },
            { icon: 'trash', label: 'Delete', desc: 'Eliminar — borrar registro' },
          ]} />
          <p>En nuestra tienda: Ana se registra (Create), buscar datos de Ana (Read), Ana cambia su teléfono (Update), se elimina un registro según corresponda (Delete). Eso es CRUD en lenguaje cotidiano.</p>
        </section>

        <section className="lesson-section">
          <h3>20. ¿Entonces Excel es una base de datos?</h3>
          <Nota><p>Excel puede organizar datos en filas y columnas y resolver muchos problemas, pero una hoja de cálculo y un sistema gestor de bases de datos no son lo mismo. Las bases de datos están diseñadas para: múltiples usuarios, consultas complejas, relaciones, concurrencia, control de acceso, consistencia, grandes volúmenes, aplicaciones.</p></Nota>
          <p>No despreciamos Excel: para 30 registros y una persona, puede ser completamente suficiente. El problema aparece cuando las necesidades cambian — elegimos herramienta según problema, no es una competencia.</p>
        </section>

        <section className="lesson-section">
          <h3>21. ¿Y S3?</h3>
          <Nota><p>foto.jpg, video.mp4, manual.pdf pueden ser ideales para S3. Pero cliente, pedido, producto, pago, stock que necesitamos relacionar y consultar constantemente — ahí una base de datos puede tener más sentido.</p></Nota>
          <table className="table lesson-summary-table">
            <thead><tr><th>Necesidad</th><th>S3</th><th>Base de datos</th></tr></thead>
            <tbody>
              <tr><td>Guardar imagen/video/PDF</td><td>✅</td><td></td></tr>
              <tr><td>Relacionar clientes y pedidos</td><td></td><td>✅</td></tr>
              <tr><td>Consultar stock / buscar ventas por cliente</td><td></td><td>✅</td></tr>
            </tbody>
          </table>
          <p>Una aplicación real puede utilizar ambos: S3 para imágenes de productos, base de datos para productos, precios, stock, clientes y pedidos.</p>
        </section>

        <section className="lesson-section">
          <h3>22. Conectando con EC2 y VPC</h3>
          <Flow steps={[{ icon: 'user', label: 'Usuario' }, { icon: 'globe', label: 'Aplicación' }, { icon: 'server', label: 'EC2' }, { icon: 'package', label: 'S3' }, { icon: 'database', label: 'Database' }]} />
          <p>La aplicación y la base también necesitan comunicarse mediante la red (VPC) — uno de los temas más importantes del módulo.</p>
        </section>

        <section className="lesson-section">
          <h3>23. ¿Todo el mundo debe acceder a la base?</h3>
          <Nota><p>No. Un cliente puede necesitar usar la aplicación, pero no conectarse directamente a la base de datos.</p></Nota>
          <Flow steps={[{ icon: 'user', label: 'Cliente' }, { icon: 'globe', label: 'Aplicación' }, { icon: 'database', label: 'Base de datos' }]} />
          <p>Analogía del banco: un cliente utiliza el cajero, no entra directamente al sistema central del banco. La aplicación actúa como intermediaria.</p>
        </section>

        <section className="lesson-section">
          <h3>24. Consistencia y concurrencia</h3>
          <Nota><p>Tenemos stock: 1 Notebook. Dos clientes intentan comprarlo al mismo tiempo. Necesitamos evitar terminar vendiendo 2 notebooks cuando solo había uno — eso es concurrencia: varias personas o procesos intentando leer o modificar datos simultáneamente.</p></Nota>
          <p>Analogía del último asiento: si Ana y Pedro intentan comprar el mismo asiento al mismo tiempo, el sistema debe evitar que ambos lo consigan.</p>
        </section>

        <section className="lesson-section">
          <h3>25. Seguridad y persistencia</h3>
          <Nota><p>Una base de datos puede controlar quién puede conectarse, leer, modificar y qué acciones puede realizar. Un usuario que solo necesita consultar (READ) no necesita necesariamente DELETE — mínimo privilegio, igual que IAM.</p></Nota>
          <p>Persistencia: los datos deben seguir existiendo aunque la aplicación se reinicie. Si el servidor web se apaga, no queremos que desaparezcan clientes, pedidos y productos.</p>
        </section>

        <section className="lesson-section">
          <h3>26. Actividad: tabla, columna o registro</h3>
          <QaItem question="CLIENTES" answer="Tabla." />
          <QaItem question="Email" answer="Columna." />
          <QaItem question="1 | Ana | ana@email.cl" answer="Registro." />
        </section>

        <section className="lesson-section">
          <h3>27. Actividad: ¿qué guardamos dónde?</h3>
          <QaItem question="foto-producto.jpg, manual.pdf, video-clase.mp4" answer="S3." />
          <QaItem question="Nombre y precio de 10.000 productos, clientes y pedidos relacionados, stock actual" answer="Base de datos." />
        </section>

        <section className="lesson-section">
          <h3>28. Actividad: identifica CRUD</h3>
          <QaItem question="Registrar nuevo cliente" answer="Create." />
          <QaItem question="Buscar cliente" answer="Read." />
          <QaItem question="Cambiar teléfono" answer="Update." />
          <QaItem question="Eliminar registro" answer="Delete." />
        </section>

        <section className="lesson-section">
          <h3>29. Actividad: construye una tabla y relaciones</h3>
          <Nota><p>"Necesitamos registrar estudiantes." Una posible tabla: ESTUDIANTES (ID, Nombre, Email, Carrera).</p></Nota>
          <QaItem question="¿Agregaríamos todas las notas de todas las asignaturas en la misma columna Nombre?" answer="No. Necesitamos otra tabla NOTAS y una relación." />
          <QaItem question="ESTUDIANTES: ID 1 → Ana. NOTAS: Estudiante_ID 1, Nota 6.5. ¿De quién es 6.5?" answer="Ana. Acabamos de utilizar una relación." />
        </section>

        <section className="lesson-section">
          <h3>30. Reto de la clase</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge icon="trophy">PizzaCloud</ConceptBadge>
          <p>Administra pedidos en pedidos.xlsx: 5.000 clientes, 30 productos, 500 pedidos diarios, varios trabajadores. Necesita saber qué pidió cada cliente, cuánto pagó, qué productos contiene cada pedido y cuánto stock queda.</p>
          <QaItem question="¿Seguirías utilizando solamente un archivo?" answer="No sería nuestra primera elección." />
          <Reveal label="Ver diseño de PizzaCloud">
            <Flow steps={[{ icon: 'users', label: 'Clientes' }, { icon: 'file-text', label: 'Pedidos' }, { icon: 'package', label: 'Detalle_Pedido' }, { icon: 'package', label: 'Productos' }]} />
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>31. Reto nivel 2 y preguntas trampa</h3>
          <QaItem question="Ana realiza tres pedidos. ¿Repetimos todos sus datos completos en cada pedido?" answer="No sería la mejor estrategia. Esto es lo que haría en su lugar: guardar un identificador del cliente en cada pedido. El riesgo de repetir datos es generar inconsistencias cuando cambien." />
          <QaItem question='"Si uso una base de datos, nunca tendré datos incorrectos." ¿Correcto?' answer="No. Una base puede contener datos incorrectos perfectamente organizados. La tecnología ayuda, pero nosotros seguimos siendo responsables de reglas, calidad de datos, diseño y seguridad." />
          <QaItem question='"Como la base está en Cloud, no necesito backup." ¿Correcto?' answer="No. Cloud no elimina errores humanos, borrados, configuraciones incorrectas ni necesidades de recuperación. Eso lo veremos en Clase 5." />
        </section>

        <section className="lesson-section">
          <h3>32. Motor vs base de datos</h3>
          <RoleGrid roles={[
            { icon: 'settings', label: 'Motor', desc: 'Software que administra la base (MySQL, PostgreSQL)' },
            { icon: 'database', label: 'Base de datos', desc: 'La colección organizada de información administrada por ese sistema' },
          ]} />
          <p>Analogía del estacionamiento: el estacionamiento sería el motor; los autos serían la información organizada. No necesitamos decidir hoy cuál motor es mejor — son tecnologías diferentes para necesidades que pueden variar.</p>
        </section>

        <section className="lesson-section">
          <h3>33. ¿Y AWS dónde entra?</h3>
          <Nota><p>Podríamos instalar MySQL nosotros mismos en EC2, pero eso significa administrar servidor, sistema operativo, instalación, parches, backups y monitoreo.</p></Nota>
          <Dialogo>¿Y si AWS administra gran parte de esa infraestructura por nosotros? Aquí aparecerá Amazon RDS.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>34. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>35. Reto oral</h3>
          <Dialogo>Explícame qué es una base de datos sin utilizar las palabras base, datos, tabla, registro, columna, información, SQL, guardar, archivo ni sistema.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Es una forma estructurada de organizar elementos relacionados para poder encontrarlos, modificarlos y conectarlos entre sí de manera consistente."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>36. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Base de datos</td><td>Información organizada</td></tr>
              <tr><td>Tabla</td><td>Agrupa datos del mismo tipo</td></tr>
              <tr><td>Columna</td><td>Característica</td></tr>
              <tr><td>Registro</td><td>Elemento individual</td></tr>
              <tr><td>ID</td><td>Identificador</td></tr>
              <tr><td>Relación</td><td>Conecta información</td></tr>
              <tr><td>Consulta</td><td>Pregunta a los datos</td></tr>
              <tr><td>CRUD</td><td>Crear, leer, modificar y eliminar</td></tr>
              <tr><td>SQL</td><td>Lenguaje para trabajar con bases relacionales</td></tr>
              <tr><td>Motor</td><td>Software que administra la base</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>37. Ticket de salida</h3>
          <Dialogo>Tenemos clientes, productos y pedidos. ¿Por qué sería útil almacenarlos en tablas separadas relacionadas por identificadores?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Porque evitamos repetir innecesariamente información, podemos mantenerla más consistente y podemos relacionar clientes, productos y pedidos de forma organizada.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 2</div>
          <Flow steps={[{ icon: 'database', label: 'Base de datos' }, { icon: 'settings', label: 'MySQL' }]} />
          <InfoBox items={['Servidor', 'Sistema operativo', 'Actualizaciones', 'Almacenamiento', 'Backups', 'Monitoreo']} />
          <Dialogo>"¿Tenemos que administrar nosotros todo eso para poder utilizar una base de datos en AWS?"</Dialogo>
          <p>No necesariamente. AWS ofrece un servicio administrado específicamente para bases de datos relacionales.</p>
          <ConceptBadge icon="cloud">Módulo 6 · Clase 2 — Amazon RDS: cuando AWS administra gran parte del trabajo pesado</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-6/clase-2" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 2: Amazon RDS →
          </Link>
        </div>

      </div>
    </div>
  );
}
