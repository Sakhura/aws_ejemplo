import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, CompareCols, CapacityRow, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_EC2_O_NO = [
  { q: 'Necesito ejecutar una aplicación en un servidor virtual.', options: [{ text: '🖥️ EC2', correct: true }, { text: '❌ Otro servicio/concepto', correct: false }] },
  { q: 'Necesito administrar permisos.', options: [{ text: '🖥️ EC2', correct: false }, { text: '❌ IAM', correct: true }] },
  { q: 'Necesito capacidad de procesamiento virtual.', options: [{ text: '🖥️ EC2', correct: true }, { text: '❌ Otro servicio/concepto', correct: false }] },
  { q: 'Necesito almacenar objetos.', options: [{ text: '🖥️ EC2', correct: false }, { text: '❌ Otro servicio, como S3', correct: true }] },
  { q: 'Necesito ejecutar un servidor web.', options: [{ text: '🖥️ EC2 puede ser una opción', correct: true }, { text: '❌ Otro servicio/concepto', correct: false }] },
  { q: 'Necesito administrar usuarios y roles.', options: [{ text: '🖥️ EC2', correct: false }, { text: '❌ IAM', correct: true }] },
];

const QUIZ_QUESTIONS = [
  { q: '¿Qué significa EC2?', options: [{ text: 'Elastic Compute Cloud', correct: true }, { text: 'Elastic Computer Control', correct: false }, { text: 'External Cloud Computer', correct: false }, { text: 'Elastic Cost Center', correct: false }] },
  { q: '¿Qué proporciona principalmente EC2?', options: [{ text: 'Capacidad de cómputo virtual.', correct: true }, { text: 'Solo fotografías.', correct: false }, { text: 'Usuarios IAM.', correct: false }, { text: 'DNS.', correct: false }] },
  { q: '¿Qué es una instancia EC2?', options: [{ text: 'Un servidor virtual ejecutado mediante EC2.', correct: true }, { text: 'Una contraseña.', correct: false }, { text: 'Una Región.', correct: false }, { text: 'Una política.', correct: false }] },
  { q: '¿Todas las instancias EC2 tienen necesariamente la misma capacidad?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Qué es una AMI?', options: [{ text: 'Una plantilla utilizada para lanzar instancias.', correct: true }, { text: 'Una contraseña.', correct: false }, { text: 'Un usuario.', correct: false }, { text: 'Una Región.', correct: false }] },
  { q: '¿EC2 puede generar costos?', options: [{ text: 'Sí.', correct: true }, { text: 'No, nunca.', correct: false }] },
  { q: '¿Una instancia detenida garantiza que no exista ningún costo asociado?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
];

export default function Modulo3Clase1() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 3 · Clase 1</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 3 · Clase 1: ¿Qué es Amazon EC2 y para qué sirve?</h2>
      <p className="lesson-subtitle">
        Por qué comprar un servidor físico es incómodo, y cómo EC2 nos deja obtener capacidad de cómputo bajo demanda en AWS.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial absoluto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + actividades + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulos 0, 1 y 2</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es Amazon EC2 en palabras sencillas.</li>
            <li>Comprender qué significa instancia EC2.</li>
            <li>Relacionar EC2 con un computador o servidor virtual.</li>
            <li>Identificar CPU, memoria, almacenamiento y sistema operativo.</li>
            <li>Comprender el concepto de cómputo bajo demanda.</li>
            <li>Reconocer situaciones donde EC2 puede ser útil.</li>
            <li>Diferenciar conceptualmente EC2 de un computador físico propio.</li>
            <li>Comprender que crear una instancia puede generar costos.</li>
          </ul>
          <p>La frase que debe sobrevivir:</p>
          <Dialogo>🖥️ Amazon EC2 nos permite obtener capacidad de cómputo en AWS cuando la necesitamos.</Dialogo>
          <p>Para comenzar podemos decir:</p>
          <Dialogo>"EC2 nos permite crear computadores virtuales en AWS."</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Antes de EC2: tenemos un problema</h3>
          <Nota><p>Presentaría este escenario:</p></Nota>
          <ConceptBadge>CloudShop</ConceptBadge>
          <p>Creamos una tienda online. Tenemos: 🌐 página web, 📦 imágenes, 🗄️ información de productos, 👥 clientes.</p>
          <p>Pero necesitamos algo capaz de: ⚙️ ejecutar nuestra aplicación; 🧮 procesar solicitudes; 📤 generar respuestas.</p>
          <Dialogo>¿Dónde ejecutamos nuestra aplicación?</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>3. Primera posibilidad: comprar un servidor</h3>
          <Flow steps={[
            { icon: 'building', label: 'Empresa' },
            { icon: 'server', label: 'Servidor físico' },
          ]} />
          <p>Necesitamos preocuparnos de cosas como: 💰 comprarlo; 📦 recibirlo; 🔌 electricidad; 🌐 conectividad; ❄️ refrigeración; 🔧 mantenimiento; 🛡️ seguridad física; ♻️ reemplazo cuando envejece.</p>
          <Nota><p>Es una alternativa válida, pero no siempre es la más conveniente.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>4. El problema de adivinar el futuro</h3>
          <Nota><p>CloudShop tiene hoy: 👥 100 clientes. Pero quizás mañana tenga: 👥 1.000. O durante una campaña: 👥👥👥 20.000.</p></Nota>
          <Dialogo>¿Qué tamaño de servidor compro?</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>5. Si compramos demasiado</h3>
          <Nota><p>Supongamos que compramos un servidor enorme pensando en el futuro.</p></Nota>
          <CapacityRow label="Capacidad" pct={100} />
          <CapacityRow label="Uso real" pct={10} />
          <p>Tenemos capacidad que no estamos utilizando. Pero ya pagamos por ella. 💸</p>
        </section>

        <section className="lesson-section">
          <h3>6. Si compramos demasiado poco</h3>
          <Nota><p>Ahora ocurre lo contrario. Nuestro servidor soporta: 👥 500 usuarios. Pero llega: 🔥 Cyber Day.</p></Nota>
          <p>Tenemos: 👥👥👥👥👥 10.000 usuarios. El servidor podría quedar corto de recursos.</p>
          <p>Resultado: 🐌 lentitud; ❌ errores; 😤 clientes frustrados.</p>
        </section>

        <section className="lesson-section">
          <h3>7. Aquí entra Cloud</h3>
          <Nota><p>En los módulos anteriores aprendimos que Cloud permite utilizar recursos tecnológicos proporcionados como servicios. Ahora conoceremos un recurso concreto de AWS:</p></Nota>
          <ConceptBadge>Amazon EC2</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>8. ¿Qué significa EC2?</h3>
          <Nota>
            <p>EC2 significa: Elastic Compute Cloud. El nombre completo es: Amazon Elastic Compute Cloud. Y se abrevia: EC2.</p>
          </Nota>
          <p>El "2" viene de las dos palabras que comienzan con C: Compute, Cloud. C² → EC2.</p>
        </section>

        <section className="lesson-section">
          <h3>9. ¿Qué significa Compute?</h3>
          <Nota><p>Compute se refiere a capacidad de procesamiento para ejecutar aplicaciones y cargas de trabajo.</p></Nota>
          <Dialogo>Es la capacidad que necesitamos para ejecutar programas y procesar tareas.</Dialogo>
          <p>Ejemplos: 🌐 ejecutar una página web; ⚙️ ejecutar una aplicación; 🧮 realizar cálculos; 🤖 ejecutar determinados procesos; 🎮 alojar ciertos componentes de un juego.</p>
        </section>

        <section className="lesson-section">
          <h3>10. Analogía del computador</h3>
          <Nota><p>Nuestro notebook tiene:</p></Nota>
          <CompareCols cols={[
            { icon: 'server', title: 'COMPUTADOR', items: ['🧠 Procesador', '🧮 Memoria RAM', '💾 Almacenamiento', '🪟 Sistema operativo', '🌐 Red'] },
            { icon: 'server', title: 'EC2', items: ['🧠 CPU virtual', '🧮 Memoria', '💾 Almacenamiento', '🐧/🪟 Sistema operativo', '🌐 Conectividad'] },
          ]} />
          <p>Una instancia EC2 también tendrá recursos de este tipo.</p>
        </section>

        <section className="lesson-section">
          <h3>11. Entonces, ¿qué es EC2?</h3>
          <Nota><p>Una explicación inicial adecuada sería:</p></Nota>
          <Dialogo>Amazon EC2 es un servicio de AWS que proporciona capacidad de cómputo virtual en la nube.</Dialogo>
          <p>Y una explicación para contársela a alguien en un ascensor:</p>
          <Dialogo>"Es como arrendar computadores virtuales en AWS para ejecutar aplicaciones."</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>12. La analogía del hotel</h3>
          <Nota><p>Imaginemos que necesitamos dormir una noche en otra ciudad.</p></Nota>
          <Dialogo>¿Construimos una casa? 🏗️🏠</Dialogo>
          <p>Probablemente no. Utilizamos: 🏨 una habitación. La necesitamos 🕐 durante cierto período. Después: 👋 dejamos de utilizarla.</p>
          <Nota><p>EC2 tiene una lógica parecida: utilizamos capacidad cuando la necesitamos, sin tener que comprar el servidor físico subyacente.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>13. ¿Qué es una instancia?</h3>
          <Nota><p>Esta palabra aparecerá constantemente: Instancia EC2.</p></Nota>
          <Dialogo>Una instancia es un servidor virtual creado utilizando Amazon EC2.</Dialogo>
          <Flow steps={[
            { icon: 'cloud', label: 'AWS' },
            { icon: 'server', label: 'Amazon EC2' },
          ]} />
          <RoleGrid roles={[
            { icon: 'server', label: 'Instancia 1', desc: '' },
            { icon: 'server', label: 'Instancia 2', desc: '' },
            { icon: 'server', label: 'Instancia 3', desc: '' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>14. Servicio vs. instancia</h3>
          <Nota><p>Es importante no confundirlos.</p></Nota>
          <CompareCols cols={[
            { icon: 'cloud', title: 'Amazon EC2', items: ['Es el servicio.'] },
            { icon: 'server', title: 'Instancia EC2', items: ['Es uno de los servidores virtuales que ejecutamos mediante ese servicio.'] },
          ]} />
          <p>Analogía:</p>
          <InfoBox title="🏨 HOTEL" items={['🚪 Habitación 101', '🚪 Habitación 102', '🚪 Habitación 103']} />
          <p>Hotel ≈ servicio. Habitación ≈ instancia.</p>
        </section>

        <section className="lesson-section">
          <h3>15. No todas las instancias son iguales</h3>
          <Nota><p>Pensemos en computadores.</p></Nota>
          <RoleGrid roles={[
            { icon: 'server', label: 'Equipo pequeño', desc: '2 CPU · 4 GB RAM' },
            { icon: 'server', label: 'Equipo mediano', desc: '4 CPU · 16 GB RAM' },
            { icon: 'rocket', label: 'Equipo potente', desc: 'muchos CPU · mucha RAM' },
          ]} />
          <Nota><p>En EC2 también podemos elegir diferentes combinaciones de recursos. Eso nos llevará en la próxima clase a: tipos de instancia.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>16. También necesitamos un sistema operativo</h3>
          <Nota><p>Un computador necesita software para funcionar. En EC2 podemos utilizar distintos sistemas operativos según las opciones disponibles.</p></Nota>
          <p>Por ejemplo: 🐧 Linux, 🪟 Windows Server.</p>
          <Nota><p>La elección dependerá de nuestra aplicación y necesidades.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>17. ¿Cómo elegimos el sistema?</h3>
          <Nota><p>AWS utiliza el concepto: AMI — Amazon Machine Image. Pero hoy solamente la presentaremos.</p></Nota>
          <ConceptBadge>Una AMI es una plantilla utilizada para iniciar una instancia EC2.</ConceptBadge>
          <p>La estudiaremos en la Clase 2.</p>
        </section>

        <section className="lesson-section">
          <h3>18. Analogía de la receta</h3>
          <Nota><p>Pensemos:</p></Nota>
          <Flow steps={[
            { icon: 'book-open', label: 'Receta' },
            { emoji: '🎂', label: 'Pastel' },
          ]} />
          <p>Conceptualmente:</p>
          <Flow steps={[
            { icon: 'disc', label: 'AMI' },
            { icon: 'server', label: 'Instancia EC2' },
          ]} />
          <Nota><p>La AMI contiene información necesaria para crear la instancia, incluido el sistema operativo y otros componentes según la imagen.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>19. Una AMI puede crear varias instancias</h3>
          <Flow steps={[{ icon: 'disc', label: 'AMI' }]} />
          <RoleGrid roles={[
            { icon: 'server', label: 'Instancia A', desc: '' },
            { icon: 'server', label: 'Instancia B', desc: '' },
            { icon: 'server', label: 'Instancia C', desc: '' },
          ]} />
          <p>Una plantilla puede utilizarse como base para lanzar múltiples instancias.</p>
        </section>

        <section className="lesson-section">
          <h3>20. ¿Qué significa "Elastic"?</h3>
          <Nota><p>EC2 se llama Elastic porque la capacidad puede adaptarse a necesidades cambiantes.</p></Nota>
          <Dialogo>Elasticidad significa poder ajustar recursos según la demanda.</Dialogo>
          <p>No entraremos todavía en Auto Scaling. Pero dejamos sembrada la idea. 🌱</p>
        </section>

        <section className="lesson-section">
          <h3>21. Volvamos a CloudShop</h3>
          <CapacityRow label="Semana normal" filled={1} total={3} />
          <CapacityRow label="Durante una campaña" filled={3} total={3} />
          <CapacityRow label="Después" filled={1} total={3} />
          <Nota><p>Cloud facilita adaptar la infraestructura en comparación con comprar capacidad física fija para cada posible pico.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>22. ¿EC2 es gratis?</h3>
          <Nota><p>No debemos enseñar: "EC2 es gratis." EC2 es un servicio con precios asociados.</p></Nota>
          <p>Dependiendo de: tipo de instancia; tiempo de uso; sistema operativo; almacenamiento; transferencia de datos; modelo de compra; otros recursos asociados; pueden existir cargos.</p>
        </section>

        <section className="lesson-section">
          <h3>23. Regla del curso</h3>
          <Nota><p>Desde hoy adoptamos:</p></Nota>
          <ConceptBadge>CREAR → PROBAR → LIMPIAR</ConceptBadge>
          <Flow steps={[
            { icon: 'rocket', label: 'Crear' },
            { icon: 'flask', label: 'Probar' },
            { icon: 'search', label: 'Verificar' },
            { icon: 'trash', label: 'Eliminar cuando ya no sea necesario' },
          ]} />
          <Nota><p>Eso será parte de la evaluación, no un detalle administrativo.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>24. Detener no siempre significa costo cero</h3>
          <Nota><p>Esta distinción debe introducirse desde temprano.</p></Nota>
          <p>Si detenemos una instancia: 🛑 dejamos de consumir determinados recursos de cómputo facturables asociados a su ejecución. Pero pueden permanecer otros recursos: 💾 almacenamiento EBS; 🌐 determinadas direcciones o servicios; 📸 snapshots; entre otros.</p>
          <p>Por eso: "Instancia detenida" no significa automáticamente "cuenta sin costos".</p>
        </section>

        <section className="lesson-section">
          <h3>25. ¿Y terminar una instancia?</h3>
          <Nota><p>Más adelante aprenderemos el estado: Terminated. Significa que la instancia ha sido terminada/eliminada. Pero incluso entonces debemos revisar los recursos asociados.</p></Nota>
          <p>La pregunta profesional no es solamente:</p>
          <Dialogo>"¿Eliminé EC2?"</Dialogo>
          <p>Es:</p>
          <Dialogo>"¿Qué recursos quedaron asociados?"</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>26. ¿Para qué podríamos utilizar EC2?</h3>
          <Nota><p>Algunos ejemplos:</p></Nota>
          <p>🌐 servidores web; ⚙️ aplicaciones; 🧪 ambientes de prueba; 🛠️ herramientas internas; 🎮 determinados servidores de juegos; 🧮 procesamiento; 📊 ciertas cargas analíticas.</p>
          <Nota><p>EC2 es flexible, pero no significa que sea siempre la mejor solución para cualquier problema.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>27. EC2 no es "AWS"</h3>
          <Nota><p>Otro error frecuente: "AWS es EC2."</p></Nota>
          <ConceptBadge variant="danger"></ConceptBadge>
          <p>AWS ofrece muchos servicios. EC2 es solamente uno de ellos.</p>
          <RoleGrid roles={[
            { icon: 'server', label: 'EC2', desc: '' },
            { icon: 'package', label: 'S3', desc: '' },
            { icon: 'database', label: 'RDS', desc: '' },
            { icon: 'lock', label: 'IAM', desc: '' },
            { emoji: '➕', label: 'muchos otros', desc: '' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>28. Conectemos con IAM</h3>
          <Nota><p>En el módulo anterior aprendimos: 🔐 IAM controla identidades y permisos. Ahora tenemos: 🖥️ EC2.</p></Nota>
          <QaItem question="¿IAM y EC2 hacen lo mismo?" answer="No." />
          <CompareCols cols={[
            { icon: 'lock', title: 'IAM', items: ['Controla acceso y permisos.'] },
            { icon: 'server', title: 'EC2', items: ['Proporciona capacidad de cómputo.'] },
          ]} />
          <Nota><p>Los servicios se complementan.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>29. Recordemos los roles</h3>
          <Nota><p>En IAM vimos:</p></Nota>
          <Flow steps={[
            { icon: 'server', label: 'EC2' },
            { icon: 'users', label: 'IAM Role' },
            { icon: 'package', label: 'S3' },
          ]} />
          <Nota><p>Ahora finalmente sabemos qué representa: 🖥️ EC2. Más adelante podremos construir este escenario de verdad.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>30. ¿Dónde se crea EC2?</h3>
          <Nota><p>Recordemos el Módulo 1: 🌎 Regiones. Al crear una instancia EC2 debemos trabajar dentro de una Región AWS.</p></Nota>
          <Flow steps={[
            { icon: 'cloud', label: 'AWS' },
            { icon: 'map-pin', label: 'Región' },
            { icon: 'building', label: 'Zona de Disponibilidad' },
            { icon: 'server', label: 'EC2' },
          ]} />
          <Nota><p>Las instancias se ejecutan en una Zona de Disponibilidad dentro de la Región seleccionada.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>31. La Región importa</h3>
          <Nota><p>Cuando trabajemos en laboratorio debemos prestar atención a:</p></Nota>
          <Dialogo>¿En qué Región estoy?</Dialogo>
          <p>Porque podemos crear 🖥️ una instancia en una Región, cambiar a otra y pensar: "¡Desapareció mi servidor!" 😱</p>
          <p>No necesariamente. Quizás simplemente estamos mirando otra Región.</p>
        </section>

        <section className="lesson-section">
          <h3>32. Actividad: ¿EC2 o no?</h3>
          <Nota><p>Los estudiantes responden 🖥️ EC2 o ❌ OTRO SERVICIO/CONCEPTO.</p></Nota>
          <Quiz questions={QUIZ_EC2_O_NO} />
        </section>

        <section className="lesson-section">
          <h3>33. Actividad: arma tu computador virtual</h3>
          <Nota><p>Presentamos tres tarjetas.</p></Nota>
          <RoleGrid roles={[
            { icon: 'dot-success', label: 'Aplicación pequeña', desc: 'Pocos usuarios.' },
            { icon: 'dot-warning', label: 'Aplicación mediana', desc: 'Más usuarios y procesos.' },
            { icon: 'dot-danger', label: 'Aplicación exigente', desc: 'Mucho procesamiento.' },
          ]} />
          <QaItem question="¿Usarían exactamente el mismo computador para las tres?" answer="Probablemente no." />
          <Nota><p>Esa respuesta prepara la Clase 2.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>34. Analogía del supermercado</h3>
          <Nota><p>Si necesitamos transportar 🛍️ una bolsa, quizás basta un automóvil pequeño. Si necesitamos 📦📦📦 500 cajas, necesitamos otra capacidad.</p></Nota>
          <p>No elegimos el recurso más grande "por si acaso". Elegimos el recurso adecuado para la necesidad. Esto también conecta con: 💰 costos.</p>
        </section>

        <section className="lesson-section">
          <h3>35. Primera decisión profesional</h3>
          <Nota><p>Antes de crear EC2 preguntamos:</p></Nota>
          <Dialogo>¿Qué necesita ejecutar esta máquina?</Dialogo>
          <p>Luego: ¿Cuánto procesamiento? ¿Cuánta memoria? ¿Qué sistema operativo? ¿Cuánto almacenamiento? ¿Qué conectividad?</p>
          <Nota><p>No empezamos preguntando: "¿Dónde está el botón Launch Instance?" El botón viene después.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>36. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>37. Reto de la clase</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge>PizzaCloud</ConceptBadge>
          <p>Una pizzería tiene una página web. Actualmente recibe: 👥 200 visitas diarias. Quiere ejecutar su aplicación en AWS.</p>
          <p>Necesita: 🌐 ejecutar la aplicación; ⚙️ procesar solicitudes; 🐧 utilizar Linux; 💰 evitar comprar un servidor físico.</p>
          <QaItem question="1. ¿Qué servicio podría utilizar?" answer="🖥️ Amazon EC2." />
          <QaItem question="2. ¿Qué crearíamos dentro de EC2?" answer="🖥️ Una instancia." />
          <QaItem question="3. ¿Qué nos ayuda a elegir el sistema base?" answer="📀 Una AMI." />
          <QaItem question="4. ¿Necesitamos elegir capacidad?" answer="✅ Sí." />
          <QaItem question="5. ¿La instancia puede generar costos?" answer="✅ Sí." />
        </section>

        <section className="lesson-section">
          <h3>38. Reto nivel 2</h3>
          <Nota><p>El dueño dice:</p></Nota>
          <Dialogo>"Compremos la instancia más potente disponible. Así jamás tendremos problemas."</Dialogo>
          <ConceptBadge variant="danger">Mala estrategia</ConceptBadge>
          <Nota>
            <p>No estoy de acuerdo porque estaríamos seleccionando capacidad sin relacionarla con una necesidad real. Esto es lo que haría en su lugar: comenzar evaluando la carga de trabajo y elegir un tipo de instancia adecuado. El riesgo de su enfoque es pagar por recursos que probablemente no utilizaremos.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>39. Reto oral</h3>
          <Nota><p>Preguntamos:</p></Nota>
          <Dialogo>Explícame EC2 sin utilizar las palabras AWS, nube, servidor, virtual, computador ni máquina. 😈</Dialogo>
          <Reveal label="Ver una respuesta válida">
            <Dialogo>"Es un servicio que nos permite disponer bajo demanda de capacidad para ejecutar aplicaciones y procesar tareas."</Dialogo>
          </Reveal>
          <p style={{ marginTop: 'var(--space-4)' }}>Si pueden llegar a una explicación semejante, entendieron el concepto y no solo memorizaron "servidor virtual".</p>
        </section>

        <section className="lesson-section">
          <h3>40. Mapa mental de la clase</h3>
          <RoleGrid roles={[
            { icon: 'calculator', label: 'Cómputo', desc: 'Ejecutar apps' },
            { icon: 'disc', label: 'AMI', desc: 'Plantilla → Instancia' },
            { icon: 'settings', label: 'Capacidad', desc: 'CPU + memoria' },
          ]} />
          <Flow steps={[
            { icon: 'server', label: 'Instancia' },
          ]} />
          <RoleGrid roles={[
            { icon: 'map-pin', label: 'Región', desc: '' },
            { icon: 'dollar-sign', label: 'Costos', desc: '' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>41. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>☁️ Amazon EC2</td><td>Servicio de cómputo</td></tr>
              <tr><td>🖥️ Instancia</td><td>Servidor virtual</td></tr>
              <tr><td>🧮 Compute</td><td>Capacidad para procesar y ejecutar</td></tr>
              <tr><td>📀 AMI</td><td>Plantilla para lanzar una instancia</td></tr>
              <tr><td>⚙️ Tipo de instancia</td><td>Capacidad/configuración del servidor</td></tr>
              <tr><td>🌎 Región</td><td>Ubicación geográfica AWS seleccionada</td></tr>
              <tr><td>💰 Costos</td><td>Dependen de los recursos y uso</td></tr>
              <tr><td>🧹 Limpieza</td><td>Revisar y eliminar recursos innecesarios</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>42. Ticket de salida</h3>
          <Nota><p>Cada estudiante completa:</p></Nota>
          <Dialogo>"Amazon EC2 sirve para __________ y una instancia EC2 es __________."</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Amazon EC2 proporciona capacidad de cómputo en AWS y una instancia EC2 es un servidor virtual ejecutado mediante ese servicio.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 2</div>
          <Nota><p>Cerraría mostrando tres servidores:</p></Nota>
          <RoleGrid roles={[
            { icon: 'server', label: 'PEQUEÑO', desc: '2 vCPU · 2 GB RAM' },
            { icon: 'server', label: 'MEDIANO', desc: '4 vCPU · 16 GB RAM' },
            { icon: 'server', label: 'GRANDE', desc: 'muchos vCPU · mucha RAM' },
          ]} />
          <p>Y preguntaría:</p>
          <Dialogo>"Si AWS nos deja crear diferentes computadores, ¿cómo sabemos cuál elegir?"</Dialogo>
          <p>Además:</p>
          <Dialogo>"¿Cómo elegimos Linux, Windows o una configuración inicial?"</Dialogo>
          <p>Ahí aparecen las dos piezas de la siguiente clase:</p>
          <ConceptBadge>Módulo 3 · Clase 2 — AMI, tipos de instancia y recursos</ConceptBadge>
          <Nota>
            <p>En esa clase ya podemos acercarnos bastante más a la consola: familias de instancias, vCPU, RAM, AMI y criterios de selección, pero todavía sin lanzar nada. Así, cuando lleguemos a la Clase 3, cada clic tendrá una razón.</p>
          </Nota>
          <Link to="/aprendizaje/aws-desde-cero/modulo-3/clase-2" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 2: AMI, tipos de instancia y recursos →
          </Link>
        </div>

      </div>
    </div>
  );
}
