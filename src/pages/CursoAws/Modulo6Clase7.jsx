import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, CompareCols, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Aurora es relacional?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Con qué ecosistemas es compatible Aurora?', options: [{ text: 'MySQL y PostgreSQL.', correct: true }, { text: 'SQL Server y Oracle exclusivamente.', correct: false }, { text: 'DynamoDB.', correct: false }, { text: 'S3.', correct: false }] },
  { q: '¿Qué componente de Aurora recibe escrituras?', options: [{ text: 'Writer.', correct: true }, { text: 'Reader.', correct: false }, { text: 'S3.', correct: false }, { text: 'NACL.', correct: false }] },
  { q: '¿Para qué sirve principalmente un Reader?', options: [{ text: 'Lecturas.', correct: true }, { text: 'Route Tables.', correct: false }, { text: 'IAM.', correct: false }, { text: 'EBS.', correct: false }] },
  { q: '¿Aurora distribuye seis copias de los datos entre tres AZ?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Qué hace Aurora Serverless?', options: [{ text: 'Ajusta capacidad según demanda dentro de límites configurados.', correct: true }, { text: 'Elimina los datos al detenerse.', correct: false }, { text: 'Convierte SQL en NoSQL.', correct: false }, { text: 'Elimina todos los costos.', correct: false }] },
  { q: '¿DynamoDB es relacional?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Qué modelos utiliza principalmente DynamoDB?', options: [{ text: 'Clave-valor y documentos.', correct: true }, { text: 'Archivos y carpetas.', correct: false }, { text: 'Solo SQL relacional.', correct: false }, { text: 'Máquinas virtuales.', correct: false }] },
  { q: '¿DynamoDB tiene DB Instance que debamos dimensionar como RDS?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿NoSQL significa que no existen transacciones?', options: [{ text: 'Sí.', correct: false }, { text: 'No. DynamoDB soporta transacciones ACID.', correct: true }] },
];

export default function Modulo6Clase7() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 6 · Clase 7</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 6 · Clase 7: Amazon Aurora y DynamoDB, cuando no todas las bases de datos resuelven el mismo problema</h2>
      <p className="lesson-subtitle">
        No elegimos una base porque sea más nueva o más rápida; la elegimos porque su modelo responde mejor al problema que necesitamos resolver.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + comparación + arquitectura + actividades + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 6 · Clases 1 a 6</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es Amazon Aurora y comprender que sigue siendo una base de datos relacional.</li>
            <li>Reconocer compatibilidad con MySQL y PostgreSQL, diferenciando conceptualmente Aurora de RDS tradicional.</li>
            <li>Comprender los conceptos Writer y Reader, y reconocer la arquitectura de almacenamiento distribuido de Aurora.</li>
            <li>Comprender qué es Aurora Serverless y qué significa capacidad automática.</li>
            <li>Comprender qué es DynamoDB y reconocerlo como base NoSQL administrada.</li>
            <li>Comprender de manera inicial clave y valor.</li>
            <li>Diferenciar SQL y NoSQL sin declarar un ganador universal.</li>
            <li>Elegir conceptualmente entre RDS, Aurora y DynamoDB.</li>
          </ul>
          <p>La frase que debe sobrevivir será:</p>
          <Dialogo>No elegimos una base porque sea más nueva o más rápida; la elegimos porque su modelo responde mejor al problema que necesitamos resolver.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Recordemos lo que conocemos</h3>
          <Nota><p>Hasta ahora nuestro mundo de bases era principalmente Amazon RDS: MySQL, PostgreSQL, MariaDB, SQL Server, otros. Aprendimos tablas, relaciones, SQL, backups, Multi-AZ, VPC. Ahora ampliamos el mapa.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>3. Aparece Amazon Aurora</h3>
          <Dialogo>Aurora permite utilizar el modelo relacional conocido de MySQL o PostgreSQL, pero con una arquitectura de almacenamiento y disponibilidad diseñada específicamente para AWS.</Dialogo>
          <ConceptBadge icon="x-circle" variant="danger">No pensamos: Aurora = NoSQL</ConceptBadge>
          <p>Seguimos teniendo tablas, registros, relaciones, SQL. La gran diferencia está principalmente en cómo AWS construyó la plataforma detrás.</p>
        </section>

        <section className="lesson-section">
          <h3>4. Analogía del automóvil</h3>
          <p>Imaginemos que sabemos conducir un automóvil convencional. Aurora sería un automóvil con una plataforma distinta debajo, pero cuyos controles siguen resultándonos familiares — seguimos entendiendo volante, pedales, cambios. En Aurora, SQL, tablas y relaciones siguen presentes.</p>
        </section>

        <section className="lesson-section">
          <h3>5. Compatibilidad y familia RDS</h3>
          <p>Encontramos Aurora MySQL-Compatible y Aurora PostgreSQL-Compatible. A diferencia de RDS general (MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Db2), Aurora se centra en MySQL-compatible y PostgreSQL-compatible.</p>
          <Flow steps={[{ icon: 'cloud', label: 'Servicios relacionales AWS' }, { icon: 'database', label: 'Amazon RDS' }, { icon: 'rocket', label: 'Amazon Aurora' }]} />
          <p>En la consola y documentación veremos una fuerte relación entre ambos servicios, pero Aurora utiliza una arquitectura propia.</p>
        </section>

        <section className="lesson-section">
          <h3>6. La gran diferencia: almacenamiento</h3>
          <Nota><p>Aurora separa conceptualmente Cómputo de Almacenamiento. Su almacenamiento distribuye seis copias de los datos entre tres Availability Zones, aportando redundancia incluso sin que añadamos Readers.</p></Nota>
          <p>Los datos no dependen de un único disco asociado a un único servidor. Analogía: en vez de guardar un documento importante únicamente en la Oficina A, tenemos copias distribuidas en AZ A, AZ B y AZ C — la idea es aumentar resiliencia.</p>
          <Nota><p>No enseñamos "Aurora crea seis bases completas que administramos". Las seis copias forman parte de la arquitectura administrada de almacenamiento de Aurora.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>7. Aurora Cluster: Writer y Reader</h3>
          <Dialogo>Un DB Cluster es un conjunto donde encontramos capacidad de cómputo y almacenamiento compartido de Aurora.</Dialogo>
          <Flow steps={[{ icon: 'rocket', label: 'Aurora Cluster' }, { icon: 'settings', label: 'Writer' }, { icon: 'eye', label: 'Reader' }, { icon: 'hard-drive', label: 'Aurora Storage' }]} />
          <RoleGrid roles={[
            { icon: 'settings', label: 'Writer', desc: 'Acepta operaciones que modifican datos: INSERT, UPDATE, DELETE' },
            { icon: 'eye', label: 'Reader', desc: 'Se utiliza para consultas de lectura: SELECT' },
          ]} />
          <p>Aurora puede incorporar múltiples Readers para escalar lecturas y aportar opciones de failover.</p>
        </section>

        <section className="lesson-section">
          <h3>8. ¿Por qué Readers?</h3>
          <Nota><p>Imaginemos 100 escrituras por minuto pero 100.000 consultas por minuto. Podemos distribuir parte de las lecturas entre Reader A, B y C en lugar de cargar todo sobre el Writer.</p></Nota>
          <p>Aurora puede utilizar distintos endpoints: Writer Endpoint (operaciones generales/escrituras) y Reader Endpoint (distribuir lecturas). La aplicación puede dirigir tipos de trabajo a componentes diferentes.</p>
        </section>

        <section className="lesson-section">
          <h3>9. Alta disponibilidad en Aurora</h3>
          <Flow steps={[{ icon: 'x-circle', label: 'Writer — falla' }, { icon: 'refresh', label: 'Failover' }, { icon: 'check-circle', label: 'Reader → nuevo Writer' }]} />
          <Nota><p>En configuraciones Multi-AZ apropiadas, Aurora puede realizar failover automático ante problemas del Writer o incluso de una AZ. Incluso si cambia quién actúa como Writer, el almacenamiento de Aurora está separado conceptualmente del cómputo — esto facilita su arquitectura de disponibilidad y escalabilidad.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>10. Aurora Serverless</h3>
          <Nota><p>¿Qué pasa si nuestra demanda cambia muchísimo entre horas del día? Podríamos evaluar Aurora Serverless.</p></Nota>
          <Dialogo>No significa "no existen servidores". Significa que nosotros no gestionamos capacidad mediante instancias fijas de la misma manera tradicional; Aurora puede ajustar capacidad dentro del rango configurado.</Dialogo>
          <p>Aurora Serverless escala Writer y Readers según demanda utilizando Aurora Capacity Units (ACUs).</p>
          <ConceptBadge icon="x-circle" variant="danger">Serverless ≠ $0. Pagamos según los recursos y características utilizadas.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>11. ACU y escalamiento</h3>
          <Dialogo>Una ACU representa capacidad de cómputo y memoria disponible para Aurora Serverless.</Dialogo>
          <p>Analogía del restaurante: un restaurante tradicional mantiene 20 cocineros todo el día aunque a las 3:00 no haya clientes. Una capacidad más adaptable permite: pocos clientes → menos capacidad, muchos clientes → más capacidad.</p>
          <p>Caso AulaCloud: poca actividad normalmente, pero durante matrícula y publicación de notas la carga aumenta muchísimo — Aurora Serverless podría ser una alternativa a evaluar, no significa que automáticamente sea la mejor.</p>
        </section>

        <section className="lesson-section">
          <h3>12. Aurora tradicional (Provisioned) vs Serverless</h3>
          <CompareCols cols={[
            { emoji: '🖥️', title: 'Provisioned', items: ['Elegimos capacidad', 'La mantenemos', 'Escalamos cuando corresponde'] },
            { emoji: '🤖', title: 'Serverless', items: ['Definimos rango', 'Aurora adapta capacidad'] },
          ]} />
          <p>Son dos modelos para necesidades diferentes. No elegimos Serverless porque "suena moderno" — preguntamos: ¿carga constante? ¿impredecible? ¿muchos períodos inactivos? ¿necesitamos baja latencia constante? ¿cuál es el costo?</p>
        </section>

        <section className="lesson-section">
          <h3>13. Ahora cambiamos completamente de modelo</h3>
          <Nota><p>Hasta ahora tenemos Clientes, Pedidos, Productos con relaciones. Pero existen aplicaciones donde el acceso principal es más parecido a "Tengo esta clave. Dame inmediatamente su información." Ahí aparece otra familia.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>14. Amazon DynamoDB</h3>
          <Nota><p>Amazon DynamoDB es un servicio de base de datos NoSQL completamente administrado. AWS lo orienta a modelos de datos clave-valor y documentos, con rendimiento de milisegundos de un solo dígito a escala.</p></Nota>
          <Dialogo>Es una base pensada para acceder muy rápidamente a información mediante claves, sin depender del modelo relacional tradicional.</Dialogo>
          <ConceptBadge icon="x-circle" variant="danger">NoSQL no significa "sin estructura": DynamoDB sigue teniendo tablas, claves, items, atributos. Solo utiliza un modelo diferente.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>15. Nueva terminología</h3>
          <RoleGrid roles={[
            { icon: 'clipboard-list', label: 'Table', desc: '≈ Tabla' },
            { icon: 'package', label: 'Item', desc: '≈ Registro' },
            { icon: 'tag', label: 'Attribute', desc: '≈ Campo' },
            { icon: 'key', label: 'Key', desc: '≈ Identificador' },
          ]} />
          <p>Pero no son exactamente el mismo modelo relacional. Los items de una tabla no necesariamente tienen que poseer exactamente los mismos atributos — a diferencia de una tabla relacional donde definimos columnas de forma estructurada, en DynamoDB los items pueden tener atributos diferentes si el diseño lo requiere.</p>
        </section>

        <section className="lesson-section">
          <h3>16. La clave es fundamental</h3>
          <Dialogo>La clave (Primary Key) nos permite encontrar rápidamente un elemento.</Dialogo>
          <p>Analogía del casillero: tenemos la llave 1001, vamos directamente a ese casillero. DynamoDB está diseñado alrededor de patrones de acceso muy claros.</p>
          <Nota><p>Esto cambia la forma de diseñar: en SQL muchas veces pensamos "primero modelo todas mis relaciones". En DynamoDB debemos pensar mucho en "¿cómo va a consultar la aplicación esta información?" — el patrón de acceso se vuelve central.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>17. Ejemplos: carrito y videojuego</h3>
          <p>Carrito de compras: CartID = CART-500, la aplicación pregunta "dame CART-500", necesitamos respuesta rápida. Videojuego online: PlayerID, Score, Level, Settings, consultamos constantemente "dame el estado de PlayerID 9001" — DynamoDB podría ser una tecnología a evaluar.</p>
        </section>

        <section className="lesson-section">
          <h3>18. Escalabilidad y On-Demand</h3>
          <Nota><p>DynamoDB está diseñado para escalar a volúmenes muy grandes. AWS recomienda On-Demand como opción de throughput predeterminada para muchas aplicaciones serverless — escala automáticamente y utiliza un modelo de pago por solicitud.</p></Nota>
          <p>No necesitamos dimensionar un servidor de base de datos tradicional para comenzar. DynamoDB tampoco tiene "DB Instance": con RDS pensamos en DB Instance; con DynamoDB pensamos mucho más en tablas, claves, capacidad/solicitudes. La infraestructura queda aún más abstraída.</p>
        </section>

        <section className="lesson-section">
          <h3>19. ¿DynamoDB es más rápido que RDS?</h3>
          <Nota><p>Esa pregunta está mal planteada. Son modelos diferentes. Una consulta relacional compleja (clientes JOIN pedidos JOIN productos GROUP BY...) no se transforma automáticamente en un buen caso DynamoDB.</p></Nota>
          <p>RDS está naturalmente orientado a Cliente → Pedidos → Productos → Pagos. DynamoDB requiere diseñar los datos según patrones de acceso y no utiliza joins relacionales tradicionales de la misma forma.</p>
        </section>

        <section className="lesson-section">
          <h3>20. NoSQL no reemplaza SQL</h3>
          <Nota><p>Tampoco "NoSQL = futuro, SQL = antiguo". Bases relacionales siguen siendo extremadamente útiles. La decisión depende de estructura, relaciones y patrón de consulta.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>21. RDS/Aurora vs DynamoDB</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th></th><th>RDS/Aurora</th><th>DynamoDB</th></tr></thead>
            <tbody>
              <tr><td>Modelo</td><td>Relacional</td><td>NoSQL</td></tr>
              <tr><td>SQL tradicional</td><td>✅</td><td>No como modelo relacional tradicional</td></tr>
              <tr><td>Relaciones complejas</td><td>Natural</td><td>Requieren otro diseño</td></tr>
              <tr><td>DB Instance</td><td>Sí / Aurora según modo</td><td>No</td></tr>
              <tr><td>Clave-valor</td><td>No es su foco principal</td><td>✅</td></tr>
              <tr><td>Escalado serverless</td><td>Aurora Serverless posible</td><td>Nativo del servicio</td></tr>
              <tr><td>Caso típico</td><td>Negocio relacional</td><td>Acceso rápido por claves/patrones</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>22. DynamoDB sí puede tener transacciones y SQL-like</h3>
          <Nota><p>Tampoco enseñaremos "NoSQL significa que no hay transacciones". DynamoDB soporta operaciones transaccionales ACID para determinados flujos. NoSQL no significa "sin garantías".</p></Nota>
          <p>DynamoDB soporta PartiQL, un lenguaje compatible con sintaxis SQL para determinadas operaciones — pero esto no transforma DynamoDB en una base relacional. El modelo de almacenamiento sigue siendo NoSQL.</p>
        </section>

        <section className="lesson-section">
          <h3>23. La pregunta no es SQL vs NoSQL</h3>
          <Dialogo>La pregunta es: ¿qué tipo de problema estoy resolviendo?</Dialogo>
          <p>Muchas relaciones y consultas variadas → relacional puede ser apropiado. Acceso predecible a gran escala mediante claves → DynamoDB puede ser apropiado.</p>
        </section>

        <section className="lesson-section">
          <h3>24. Casos CloudShop y GameCloud</h3>
          <CompareCols cols={[
            { emoji: '🛍️', title: 'CloudShop', items: ['Clientes, pedidos, productos, pagos', 'JOIN, reportes, consultas variadas', 'Una base relacional tiene mucho sentido'] },
            { emoji: '🎮', title: 'GameCloud', items: ['PlayerID, Estado, Puntaje, Configuración', '"Dame el estado de este jugador" con millones de jugadores', 'DynamoDB podría ser una excelente opción'] },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>25. Una aplicación puede utilizar ambas</h3>
          <Flow steps={[{ icon: 'globe', label: 'Aplicación' }, { icon: 'rocket', label: 'Aurora — pedidos y pagos' }, { icon: 'zap', label: 'DynamoDB — sesiones y estados rápidos' }]} />
          <p>No necesitamos elegir "una base para gobernarlas a todas". Y podemos sumar S3 para imágenes y videos — cada servicio resuelve un problema distinto.</p>
        </section>

        <section className="lesson-section">
          <h3>26. Polyglot Persistence</h3>
          <Dialogo>Usar distintos tipos de bases o almacenamiento para distintas necesidades dentro de la misma aplicación.</Dialogo>
          <Nota><p>No necesitamos memorizar el término. Lo importante: una arquitectura puede utilizar más de una tecnología de datos.</p></Nota>
          <p>Pero no creamos cinco bases por diversión "porque cada una hace algo interesante" — es una receta para una arquitectura inmanejable. Cada tecnología agrega conocimiento, seguridad, monitoreo, costo, complejidad.</p>
        </section>

        <section className="lesson-section">
          <h3>27. Actividad: Relacional o NoSQL / RDS o Aurora</h3>
          <QaItem question="Clientes, pedidos, productos y reportes" answer="Relacional." />
          <QaItem question="Estado de jugador por PlayerID" answer="NoSQL puede ser apropiado." />
          <QaItem question="Necesitamos SQL Server / Oracle" answer="RDS." />
          <QaItem question="Aplicación compatible con MySQL y queremos evaluar arquitectura Aurora" answer="Aurora." />
        </section>

        <section className="lesson-section">
          <h3>28. Actividad: Writer o Reader / encuentra el error</h3>
          <QaItem question="INSERT, UPDATE, DELETE" answer="Writer." />
          <QaItem question="Reporte con SELECT" answer="Reader puede atenderlo." />
          <QaItem question='"Tengo un Reader Aurora. Voy a enviarle los INSERT para repartir carga." ¿Correcto?' answer="No. Los Readers procesan operaciones de lectura. Las escrituras se dirigen al Writer." />
        </section>

        <section className="lesson-section">
          <h3>29. Cuatro casos</h3>
          <QaItem question="Tienda tradicional: clientes, productos, pedidos, facturas, reportes. Equipo conoce PostgreSQL." answer="RDS PostgreSQL, o evaluar Aurora PostgreSQL-compatible según requisitos." />
          <QaItem question="Aplicación con carga impredecible (semana normal baja, evento con pico enorme)." answer="Evaluar Aurora Serverless, porque su capacidad puede ajustarse dentro de límites configurados según demanda." />
          <QaItem question="Millones de dispositivos IoT, cada uno con DeviceID, Estado, ÚltimaLectura, Configuración, consultados por DeviceID." answer="DynamoDB podría tener mucho sentido." />
          <QaItem question="Contabilidad compleja: clientes, facturas, pagos, impuestos, centros de costo, consultas relacionales variadas. ¿'DynamoDB porque escala más' es suficiente?" answer="No. El modelo relacional probablemente merece una evaluación muy seria aquí." />
        </section>

        <section className="lesson-section">
          <h3>30. Reto de la clase: EventCloud</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge icon="trophy">EventCloud</ConceptBadge>
          <p>Vende entradas para conciertos. Necesita: información empresarial (clientes, compras, pagos, eventos con relaciones y reportes), sesiones temporales (SessionID, millones de accesos rápidos), imágenes (posters, fotografías).</p>
          <Reveal label="Ver solución conceptual">
            <InfoBox items={['Clientes, compras y pagos → RDS/Aurora, porque tenemos información relacional', 'Sesiones → DynamoDB puede ser una alternativa apropiada', 'Imágenes → S3']} />
            <p>Eso demuestra: distintas herramientas para distintos problemas.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>31. Retos nivel 2 y 3</h3>
          <QaItem question="EventCloud tiene MySQL. Durante la venta de entradas carga enorme, después actividad baja. ¿Qué tecnología relacional podríamos evaluar?" answer="Aurora MySQL-Compatible con Aurora Serverless, dependiendo de requisitos y costo. No decimos 'debemos migrar', decimos evaluar." />
          <QaItem question="DynamoDB con 100 millones de items, pero la aplicación necesita constantemente joins complejos, consultas ad hoc y reportes relacionales. ¿Que escale mucho lo convierte automáticamente en una buena elección?" answer="No. El patrón de acceso no parece alinearse naturalmente con su modelo." />
        </section>

        <section className="lesson-section">
          <h3>32. Dos gerentes equivocados</h3>
          <Dialogo>"DynamoDB es serverless y escala mucho, migremos todas nuestras bases SQL."</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque está eligiendo una tecnología por una característica aislada sin considerar el modelo de datos y consultas. Esto es lo que haría en su lugar: revisar relaciones y patrones de acceso antes de decidir. El riesgo de su enfoque es convertir consultas sencillas en diseños complejos y costosos de mantener.</p>
          </Nota>
          <Dialogo>"Siempre hemos usado MySQL, usemos MySQL para absolutamente todo."</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque algunas necesidades pueden beneficiarse de modelos diferentes. Esto es lo que haría en su lugar: mantener MySQL donde encaja y evaluar alternativas cuando existe una razón concreta. El riesgo es forzar todas las cargas dentro de una herramienta que no necesariamente optimiza cada patrón.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>33. Método de decisión</h3>
          <InfoBox items={['¿Los datos tienen relaciones complejas?', '¿Necesito SQL y consultas ad hoc?', '¿Cómo accederá la aplicación a la información?', '¿Cuál es el volumen?', '¿Cómo cambia la carga?', '¿Necesito escalar lecturas?', '¿Necesito alta disponibilidad?', '¿Qué conoce mi equipo?', '¿Cuánto costará?']} />
        </section>

        <section className="lesson-section">
          <h3>34. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>35. Reto oral</h3>
          <Dialogo>Explícame la diferencia entre Aurora y DynamoDB sin utilizar las palabras AWS, base de datos, SQL, NoSQL, relacional, tabla, clave, MySQL, PostgreSQL, servidor ni Cloud.</Dialogo>
          <Reveal label="Ver una buena respuesta">
            <Dialogo>"Una está pensada para información estructurada con relaciones y consultas tradicionales, mientras la otra está diseñada alrededor de accesos muy rápidos y predecibles a elementos mediante identificadores y otros patrones definidos."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>36. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Aurora</td><td>Base relacional diseñada por AWS</td></tr>
              <tr><td>Aurora MySQL / PostgreSQL</td><td>Compatible con esos ecosistemas</td></tr>
              <tr><td>Writer</td><td>Atiende escrituras</td></tr>
              <tr><td>Reader</td><td>Atiende lecturas</td></tr>
              <tr><td>Aurora Storage</td><td>Distribuido entre varias AZ</td></tr>
              <tr><td>Aurora Serverless</td><td>Ajusta capacidad</td></tr>
              <tr><td>DynamoDB</td><td>Base NoSQL administrada</td></tr>
              <tr><td>Key</td><td>Identificador fundamental</td></tr>
              <tr><td>Item</td><td>Elemento almacenado</td></tr>
              <tr><td>Attribute</td><td>Característica de un item</td></tr>
              <tr><td>On-Demand</td><td>Capacidad adaptativa por solicitud</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>37. Ticket de salida</h3>
          <Dialogo>Una aplicación necesita clientes, pedidos y facturas con relaciones complejas, pero también mantiene millones de sesiones temporales consultadas principalmente por SessionID. ¿Usarías necesariamente una sola base para todo?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>No necesariamente. Podríamos evaluar una base relacional como RDS o Aurora para los datos de negocio y DynamoDB para las sesiones si sus patrones de acceso lo justifican. La decisión debe basarse en la necesidad, no en utilizar una sola tecnología para todo.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 8</div>
          <Flow steps={[
            { icon: 'clipboard-list', label: 'Modelo relacional' },
            { icon: 'cloud', label: 'RDS' },
            { icon: 'settings', label: 'Motor y capacidad' },
            { icon: 'lock', label: 'VPC + SG' },
            { icon: 'refresh', label: 'Backups' },
            { icon: 'building', label: 'Multi-AZ' },
            { icon: 'rocket', label: 'Aurora' },
            { icon: 'zap', label: 'DynamoDB' },
          ]} />
          <p>Ahora eliminamos las etiquetas y entregamos una empresa completa. El estudiante tendrá que decidir qué tecnología usar, dónde ubicarla, quién puede acceder, cómo protegerla, cómo recuperarla y cuánto nivel de disponibilidad necesita.</p>
          <ConceptBadge icon="trophy">Módulo 6 · Clase 8 — Laboratorio integrador: diseña, protege y recupera la base de datos de CloudShop</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-6/clase-8" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 8: Laboratorio integrador de bases de datos →
          </Link>
        </div>

      </div>
    </div>
  );
}
