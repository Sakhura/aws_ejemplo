import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, CompareCols, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué es una AMI?', options: [{ text: 'Una contraseña.', correct: false }, { text: 'Una plantilla para lanzar instancias.', correct: true }, { text: 'Un grupo IAM.', correct: false }, { text: 'Un puerto.', correct: false }] },
  { q: '¿Qué define un tipo de instancia?', options: [{ text: 'Una combinación de recursos de cómputo.', correct: true }, { text: 'El nombre del usuario.', correct: false }, { text: 'La contraseña.', correct: false }, { text: 'La política IAM.', correct: false }] },
  { q: '¿Qué representa vCPU?', options: [{ text: 'Capacidad de procesamiento virtual.', correct: true }, { text: 'Almacenamiento.', correct: false }, { text: 'Contraseña.', correct: false }, { text: 'Región.', correct: false }] },
  { q: '¿RAM y almacenamiento son lo mismo?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: 'Una carga necesita mucha memoria. ¿Qué tipo de recurso debemos observar especialmente?', options: [{ text: 'RAM.', correct: true }, { text: 'MFA.', correct: false }, { text: 'IAM.', correct: false }, { text: 'DNS.', correct: false }] },
  { q: '¿La instancia más grande siempre es la mejor?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Qué significa right sizing?', options: [{ text: 'Elegir la capacidad adecuada para la carga.', correct: true }, { text: 'Elegir siempre la instancia más barata.', correct: false }, { text: 'Crear usuarios.', correct: false }, { text: 'Eliminar la AMI.', correct: false }] },
];

export default function Modulo3Clase2() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 3 · Clase 2</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 3 · Clase 2: AMI, tipos de instancia y recursos</h2>
      <p className="lesson-subtitle">
        Las dos grandes decisiones antes de lanzar un servidor: con qué plantilla parte (AMI) y cuánta capacidad tendrá (tipo de instancia).
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + ejercicios + preparación para laboratorio</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 3 · Clase 1</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es una AMI.</li>
            <li>Comprender para qué sirve una AMI.</li>
            <li>Explicar qué es un tipo de instancia.</li>
            <li>Reconocer vCPU y memoria RAM.</li>
            <li>Comprender por qué existen distintas familias y tamaños de instancias.</li>
            <li>Relacionar una necesidad con recursos de cómputo.</li>
            <li>Comprender que más capacidad suele implicar más costo.</li>
            <li>Evitar elegir recursos "por si acaso".</li>
            <li>Prepararse para lanzar una instancia en la siguiente clase.</li>
          </ul>
          <p>La frase central será:</p>
          <Dialogo>Antes de crear un servidor debemos decidir qué queremos ejecutar y cuánta capacidad necesitamos.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Recordemos la Clase 1</h3>
          <Nota><p>En la clase anterior aprendimos:</p></Nota>
          <Flow steps={[
            { icon: 'cloud', label: 'AWS' },
            { icon: 'server', label: 'Amazon EC2' },
            { icon: 'server', label: 'Instancia' },
          ]} />
          <Dialogo>Una instancia EC2 es: un servidor virtual creado mediante Amazon EC2.</Dialogo>
          <QaItem question="¿Todas las instancias son iguales?" answer="❌ No." />
        </section>

        <section className="lesson-section">
          <h3>3. Vamos a comprar un computador</h3>
          <Nota><p>Imaginemos tres computadores:</p></Nota>
          <RoleGrid roles={[
            { icon: 'server', label: 'Equipo A', desc: 'Procesador básico · 4 GB RAM · 128 GB' },
            { icon: 'server', label: 'Equipo B', desc: 'Procesador medio · 16 GB RAM · 512 GB' },
            { icon: 'rocket', label: 'Equipo C', desc: 'Procesador potente · 64 GB RAM · 2 TB' },
          ]} />
          <QaItem question="¿Cuál es el mejor?" answer="Depende de para qué lo necesito." />
        </section>

        <section className="lesson-section">
          <h3>4. El "mejor computador" depende de la tarea</h3>
          <p>📝 Escribir documentos — no necesitamos una máquina gigantesca. 🎬 Editar video — probablemente necesitaremos más recursos. 🌐 Publicar una web sencilla — podemos comenzar con una máquina más pequeña.</p>
          <Nota><p>Esto nos lleva a una regla: la capacidad debe elegirse según la carga de trabajo.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>5. Las dos grandes decisiones</h3>
          <Nota><p>Antes de lanzar una instancia necesitamos responder:</p></Nota>
          <Flow steps={[
            { icon: 'help-circle', label: 'Quiero crear EC2' },
            { icon: 'disc', label: 'AMI', caption: '¿Qué plantilla?' },
            { icon: 'settings', label: 'Tipo de instancia', caption: '¿Cuánta capacidad?' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>6. ¿Qué es una AMI?</h3>
          <Nota><p>AMI significa: Amazon Machine Image.</p></Nota>
          <Dialogo>Una AMI es una plantilla utilizada como punto de partida para crear una instancia EC2.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>7. Analogía de la receta</h3>
          <Flow steps={[{ icon: 'book-open', label: 'Receta' }, { emoji: '🎂', label: 'Pastel' }]} />
          <p>En EC2:</p>
          <Flow steps={[{ icon: 'disc', label: 'AMI' }, { icon: 'server', label: 'Instancia' }]} />
          <p>La receta no es el pastel. La AMI tampoco es la instancia.</p>
        </section>

        <section className="lesson-section">
          <h3>8. Analogía del plano</h3>
          <Nota><p>Pensemos en un plano de vivienda: podemos construir varias viviendas desde el mismo diseño.</p></Nota>
          <Flow steps={[{ icon: 'disc', label: 'AMI' }]} />
          <RoleGrid roles={[
            { icon: 'server', label: 'Instancia 1', desc: '' },
            { icon: 'server', label: 'Instancia 2', desc: '' },
            { icon: 'server', label: 'Instancia 3', desc: '' },
          ]} />
          <Nota><p>Una misma AMI puede utilizarse para lanzar varias instancias.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>9. ¿Qué puede incluir una AMI?</h3>
          <Nota><p>Una AMI puede incluir elementos como: sistema operativo; configuraciones; software; información necesaria para iniciar la instancia.</p></Nota>
          <Dialogo>La AMI determina gran parte del punto de partida del servidor.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>10. Ejemplos de sistemas operativos</h3>
          <Nota><p>Podemos encontrar AMI basadas en:</p></Nota>
          <p>🐧 Amazon Linux, 🐧 Ubuntu, 🐧 Red Hat, 🪟 Windows Server, 🐧 otras distribuciones Linux.</p>
          <Dialogo>¿Qué necesita nuestra aplicación?</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>11. AMI no significa exactamente "sistema operativo"</h3>
          <Nota>
            <p>No estoy de acuerdo con enseñar "AMI = sistema operativo" porque una AMI puede contener más cosas que eso. Esto es lo que haría en su lugar: AMI = plantilla de inicio para crear una instancia. El riesgo de simplificarla demasiado es que después el estudiante no entienda por qué dos AMI con el mismo sistema operativo pueden ser diferentes.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>12. ¿Cómo elegimos una AMI?</h3>
          <Nota><p>Miraremos al menos: sistema operativo; arquitectura compatible; proveedor de la imagen; descripción; software incluido; posibles costos de licencia.</p></Nota>
          <p>No elegimos simplemente: "la primera que aparece."</p>
        </section>

        <section className="lesson-section">
          <h3>13. No todas las AMI tienen el mismo costo</h3>
          <Nota><p>Algunas imágenes pueden incluir software comercial o licencias.</p></Nota>
          <Dialogo>Antes de seleccionar una AMI debemos revisar sus condiciones y precios.</Dialogo>
          <p>La palabra "imagen" no significa "gratuita".</p>
        </section>

        <section className="lesson-section">
          <h3>14. Actividad: elige una AMI</h3>
          <QaItem question="Caso A — Una aplicación fue desarrollada para Linux. ¿Qué buscaríamos?" answer="✅ Una AMI Linux compatible." />
          <QaItem question="Caso B — Una aplicación requiere específicamente Windows Server. ¿Qué consideraríamos?" answer="✅ Una AMI Windows adecuada." />
          <QaItem question={'Caso C — "No sé qué ejecutaré, pero seleccionaré cualquier AMI." ¿Buena decisión?'} answer="❌ No. Primero debemos saber qué necesitamos." />
        </section>

        <section className="lesson-section">
          <h3>15. Segunda gran decisión: tipo de instancia</h3>
          <Nota><p>Una vez elegida la plantilla aparece: ¿cuánta capacidad necesitamos? Aquí entra: Instance Type o Tipo de instancia.</p></Nota>
          <Dialogo>Es como elegir el tamaño y potencia del computador que vamos a arrendar.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>16. ¿Qué recursos aparecen?</h3>
          <Nota><p>Encontraremos características como: 🧠 vCPU, 🧮 memoria RAM, 🌐 rendimiento de red, y otras capacidades específicas.</p></Nota>
          <p>Hoy nos centraremos principalmente en: vCPU + RAM.</p>
        </section>

        <section className="lesson-section">
          <h3>17. ¿Qué es vCPU?</h3>
          <Nota><p>vCPU significa: Virtual CPU.</p></Nota>
          <Dialogo>Representa capacidad virtual de procesamiento asignada a la instancia.</Dialogo>
          <p>No necesitamos entrar todavía en: ❌ sockets, ❌ threads, ❌ núcleos físicos, ❌ arquitectura profunda de CPU.</p>
          <Dialogo>Más capacidad de CPU permite afrontar determinadas cargas de procesamiento más exigentes.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>18. ¿Qué es memoria RAM?</h3>
          <Nota><p>La memoria RAM permite mantener información que las aplicaciones necesitan mientras están funcionando.</p></Nota>
          <p>Analogía: 🧑‍🍳 la mesa del cocinero. Un cocinero tiene una mesa pequeña, puede trabajar con pocos ingredientes. Si necesita preparar 30 platos al mismo tiempo: 😵 una mesa más grande permite tener más cosas disponibles mientras trabaja.</p>
          <Nota><p>La RAM funciona conceptualmente como un espacio de trabajo temporal.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>19. RAM no es almacenamiento</h3>
          <Nota><p>Este error aparecerá mucho.</p></Nota>
          <CompareCols cols={[
            { icon: 'calculator', title: 'RAM', items: ['Memoria de trabajo temporal.', 'Aplicaciones trabajando ahora'] },
            { icon: 'hard-drive', title: 'Almacenamiento', items: ['Conserva información.', 'Archivos guardados'] },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>20. Analogía del escritorio y el archivador</h3>
          <CompareCols cols={[
            { icon: 'calculator', title: 'RAM — El escritorio', items: ['Tenemos sobre él: 📄 documentos que estamos utilizando.'] },
            { icon: 'hard-drive', title: 'Almacenamiento — El archivador', items: ['Guardamos: 📁 documentos para utilizarlos posteriormente.'] },
          ]} />
          <Nota><p>Si necesitamos trabajar con muchas cosas simultáneamente, un escritorio más grande puede ayudar. Pero eso no significa que tengamos más espacio permanente de almacenamiento.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>21. Instancia pequeña</h3>
          <InfoBox title="🖥️ PEQUEÑA" items={['🧠 Menos procesamiento', '🧮 Menos memoria', '💰 Menor costo potencial']} />
          <p>Puede ser suficiente para: 🧪 pruebas; 🌐 servicios pequeños; 🛠️ aprendizaje.</p>
        </section>

        <section className="lesson-section">
          <h3>22. Instancia grande</h3>
          <InfoBox title="🖥️ GRANDE" items={['🧠 Más procesamiento', '🧮 Más memoria', '💰 Mayor costo potencial']} />
          <p>Puede ser necesaria para cargas más exigentes. Pero: más grande no significa automáticamente mejor decisión.</p>
        </section>

        <section className="lesson-section">
          <h3>23. Analogía del camión</h3>
          <Nota><p>Necesitamos transportar: 📦 una caja. ¿Arrendamos 🚚 un camión enorme? Podemos. Pero probablemente estamos pagando por capacidad que no utilizamos.</p></Nota>
          <p>Ahora necesitamos transportar 📦📦📦📦📦📦📦📦. Un automóvil pequeño tal vez no sea suficiente.</p>
          <p>La elección correcta depende de la carga.</p>
        </section>

        <section className="lesson-section">
          <h3>24. Tamaño y costo</h3>
          <Flow steps={[{ label: 'Más recursos' }, { label: 'Mayor capacidad' }, { label: 'Mayor costo potencial' }]} />
          <p>Por eso no usamos "la instancia más potente por si acaso". Usamos "la instancia adecuada para la necesidad".</p>
        </section>

        <section className="lesson-section">
          <h3>25. Familias de instancias</h3>
          <Nota><p>AWS ofrece distintas familias orientadas a diferentes tipos de carga. Para principiantes utilizaremos categorías conceptuales.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>26. Propósito general</h3>
          <p>Ofrecen un equilibrio entre distintos recursos. Pueden utilizarse para cargas como: 🌐 servidores web; 🛠️ aplicaciones generales; 🧪 desarrollo y pruebas.</p>
          <ConceptBadge>"Necesito un poco de todo."</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>27. Cómputo optimizado</h3>
          <p>Diseñadas para cargas que necesitan relativamente más capacidad de procesamiento. Ejemplos: 🧮 cálculos; ⚙️ procesamiento intensivo; 🎮 determinadas cargas de juego.</p>
          <ConceptBadge>"Mi aplicación trabaja mucho con CPU."</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>28. Memoria optimizada</h3>
          <p>Orientadas a cargas que necesitan cantidades importantes de memoria. Ejemplos: 🗄️ determinadas bases de datos; 📊 procesamiento de grandes conjuntos de datos en memoria; ⚙️ aplicaciones que consumen mucha RAM.</p>
          <ConceptBadge>"Necesito mucha memoria."</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>29. Almacenamiento optimizado</h3>
          <p>Diseñadas para cargas que requieren determinadas características intensivas de almacenamiento local.</p>
          <ConceptBadge>"Mi aplicación necesita trabajar intensamente con almacenamiento."</ConceptBadge>
          <p>No profundizamos todavía.</p>
        </section>

        <section className="lesson-section">
          <h3>30. Cómputo acelerado</h3>
          <Nota><p>Existen familias que incorporan aceleradores especializados. Por ejemplo, ciertas cargas relacionadas con: 🤖 inteligencia artificial; 🎨 procesamiento gráfico; 🧮 cálculos especializados.</p></Nota>
          <p>No entraremos técnicamente en GPU todavía. Solo reconoceremos que: no todas las cargas necesitan el mismo tipo de hardware.</p>
        </section>

        <section className="lesson-section">
          <h3>31. Nuestro mapa de familias</h3>
          <RoleGrid roles={[
            { emoji: '⚖️', label: 'General', desc: '' },
            { icon: 'lightbulb', label: 'Cómputo', desc: '' },
            { icon: 'calculator', label: 'Memoria', desc: '' },
            { icon: 'hard-drive', label: 'Almacen.', desc: '' },
            { icon: 'rocket', label: 'Acelerado', desc: '' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>32. ¿Y esos nombres extraños?</h3>
          <Nota><p>Cuando entremos a AWS veremos nombres parecidos a: t..., m..., c..., r..., y combinaciones con números y tamaños. No quiero que memoricen todo eso.</p></Nota>
          <ConceptBadge>familia → generación → tamaño</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>33. Un ejemplo de nombre</h3>
          <Nota><p>Supongamos que vemos algo como:</p></Nota>
          <ConceptBadge>t3.micro — t3: familia/generación · micro: tamaño</ConceptBadge>
          <Nota><p>No necesitamos memorizar hoy las características exactas de t3.micro. Las especificaciones pueden variar según familia y generación, y las revisaremos en AWS cuando corresponda.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>34. Tamaños</h3>
          <Nota><p>Dentro de una familia podemos encontrar tamaños como: nano, micro, small, medium, large, xlarge...</p></Nota>
          <Flow steps={[{ emoji: '🐭', label: 'pequeño' }, { emoji: '🐕', label: 'mediano' }, { emoji: '🐘', label: 'grande' }]} />
          <p>Normalmente aumenta la capacidad disponible.</p>
        </section>

        <section className="lesson-section">
          <h3>35. Los nombres no sustituyen la revisión</h3>
          <Nota><p>No debemos asumir: "micro siempre tiene exactamente X memoria." Las características dependen de la familia y generación.</p></Nota>
          <p>Por eso, en la consola o documentación revisamos: 🧠 vCPU, 🧮 memoria, 🌐 red, 💰 precio, antes de elegir.</p>
        </section>

        <section className="lesson-section">
          <h3>36. Actividad: ¿qué priorizarías?</h3>
          <QaItem question="Caso 1 — Blog pequeño. ¿Qué considerarías primero?" answer="⚖️ Propósito general puede ser un punto de partida razonable." />
          <QaItem question="Caso 2 — Aplicación que realiza cálculos intensivos. ¿Qué recurso será especialmente importante?" answer="🧠 CPU." />
          <QaItem question="Caso 3 — Aplicación que mantiene grandes cantidades de información activa en memoria. ¿Qué necesitamos observar especialmente?" answer="🧮 RAM." />
          <QaItem question="Caso 4 — Aplicación de aprendizaje con pocas visitas. ¿Elegirías automáticamente una instancia enorme?" answer="❌ No." />
        </section>

        <section className="lesson-section">
          <h3>37. Caso CloudShop</h3>
          <Nota><p>Nuestra tienda tiene: 👥 pocos visitantes; 🐧 aplicación Linux; 🌐 servidor web sencillo; 💰 presupuesto limitado.</p></Nota>
          <QaItem question="¿Necesitamos una instancia optimizada para cálculos científicos?" answer="No." />
          <QaItem question="¿Necesitamos 128 GB de RAM?" answer="Probablemente no." />
          <Nota><p>Podríamos comenzar evaluando una opción de propósito general o adecuada para cargas pequeñas, según disponibilidad y precios actuales.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>38. ¿Y si CloudShop crece?</h3>
          <Flow steps={[{ label: 'HOY', caption: '👥 100 usuarios' }, { label: 'MAÑANA', caption: '👥 10.000 usuarios' }]} />
          <Nota><p>Una de las ventajas del modelo Cloud es poder cambiar y adaptar la arquitectura según las necesidades.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>39. Right sizing</h3>
          <ConceptBadge>Right Sizing</ConceptBadge>
          <Dialogo>Elegir el tamaño adecuado para la carga de trabajo. Ni demasiado pequeño. Ni exageradamente grande.</Dialogo>
          <p>La palabra clave: adecuado.</p>
        </section>

        <section className="lesson-section">
          <h3>40. El jefe quiere la instancia más grande</h3>
          <Nota><p>El gerente dice:</p></Nota>
          <Dialogo>"Quiero la más potente porque así nunca tendremos problemas."</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque está eligiendo recursos antes de comprender la carga. Esto es lo que haría en su lugar: estimar necesidades, comenzar con una configuración razonable, monitorear y ajustar. El riesgo de su enfoque es pagar capacidad ociosa sin obtener un beneficio proporcional.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>41. ¿Cómo sabremos si elegimos correctamente?</h3>
          <Nota><p>Más adelante utilizaremos monitoreo. Por ejemplo: 📈 utilización de CPU; 🧮 consumo de memoria mediante herramientas apropiadas; 🌐 tráfico; ⚙️ comportamiento de la aplicación.</p></Nota>
          <p>Elegir una instancia no es "una decisión escrita en piedra". Podemos observar y ajustar.</p>
        </section>

        <section className="lesson-section">
          <h3>42. Cuidado con el costo</h3>
          <Nota><p>Antes de seleccionar un tipo de instancia debemos revisar información actual de precios. El costo puede depender de: tipo; Región; sistema operativo; modelo de compra; tiempo de ejecución; otros recursos asociados.</p></Nota>
          <Dialogo>Nunca enseñamos un precio fijo como si fuera eterno.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>43. Actividad grupal: arma el servidor</h3>
          <Nota><p>Cada grupo recibe un caso.</p></Nota>
          <p><strong>🟢 Caso A: Blog</strong> — 🌐 pocas visitas, 🐧 Linux, 💰 bajo presupuesto.</p>
          <Reveal label="Ver respuesta esperada — Caso A">
            <p>AMI Linux compatible y una instancia de capacidad moderada/pequeña apropiada para empezar.</p>
          </Reveal>
          <p style={{ marginTop: 'var(--space-4)' }}><strong>🟡 Caso B: Aplicación de análisis</strong> — 🧮 muchos cálculos, 📊 procesamiento intensivo.</p>
          <QaItem question="¿Qué recurso se vuelve más importante?" answer="🧠 CPU." />
          <p style={{ marginTop: 'var(--space-4)' }}><strong>🔵 Caso C: Aplicación intensiva en memoria</strong> — 🧮 mantiene mucha información activa.</p>
          <QaItem question="¿Qué debemos observar especialmente?" answer="RAM." />
        </section>

        <section className="lesson-section">
          <h3>44. Segunda actividad: detecta la decisión mala</h3>
          <ul className="plain-list">
            <li>✅ "Elegí Linux porque la aplicación funciona en Linux." — Razonable.</li>
            <li>❌ "Elegí Windows porque me gusta más, aunque la aplicación requiere Linux." — Incorrecto.</li>
            <li>❌ "Elegí la máquina más grande porque estaba al principio de la lista." — Incorrecto.</li>
            <li>✅ "Revisé CPU, RAM, necesidad y costo antes de decidir." — Correcto.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>45. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>46. Reto de la clase</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge>AulaCloud</ConceptBadge>
          <p>Una plataforma educativa quiere ejecutar su aplicación. Características: 👥 300 usuarios normalmente; 🐧 la aplicación funciona en Linux; 🌐 uso web general; 💰 quiere controlar gastos; 📈 podría crecer posteriormente.</p>
          <QaItem question="1. ¿Qué tipo de AMI buscarían?" answer="Una AMI Linux compatible." />
          <QaItem question="2. ¿Elegirían automáticamente la instancia más grande?" answer="No." />
          <QaItem question="3. ¿Qué recursos revisarían?" answer="vCPU, memoria, red y características relevantes." />
          <QaItem question="4. ¿Qué tipo conceptual parece razonable para comenzar?" answer="Una opción equilibrada para propósito general, dependiendo de los requisitos concretos." />
          <QaItem question="5. ¿La decisión puede revisarse después?" answer="Sí." />
        </section>

        <section className="lesson-section">
          <h3>47. Reto nivel 2</h3>
          <Nota><p>Tenemos dos propuestas:</p></Nota>
          <CompareCols cols={[
            { icon: 'dot-danger', title: 'Propuesta A', items: ['Aplicación pequeña → Instancia enorme → Uso CPU: 2%'] },
            { icon: 'dot-success', title: 'Propuesta B', items: ['Aplicación pequeña → Instancia adecuada → Monitoreamos → Ajustamos si crece'] },
          ]} />
          <QaItem question="¿Cuál representa mejor una estrategia Cloud razonable?" answer="✅ B. Porque elegimos recursos de acuerdo con la necesidad y luego medimos." />
        </section>

        <section className="lesson-section">
          <h3>48. Reto oral</h3>
          <Dialogo>Explícame la diferencia entre AMI y tipo de instancia sin usar esas dos expresiones.</Dialogo>
          <Reveal label="Ver una buena respuesta">
            <Dialogo>"Una decide con qué plantilla parte mi servidor y la otra cuánta capacidad tendrá."</Dialogo>
          </Reveal>
          <p style={{ marginTop: 'var(--space-4)' }}>Si pueden decir eso, comprendieron la diferencia.</p>
        </section>

        <section className="lesson-section">
          <h3>49. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>📀 AMI</td><td>Plantilla para crear una instancia</td></tr>
              <tr><td>🖥️ Instancia</td><td>Servidor virtual creado</td></tr>
              <tr><td>⚙️ Tipo de instancia</td><td>Configuración de capacidad</td></tr>
              <tr><td>🧠 vCPU</td><td>Capacidad de procesamiento</td></tr>
              <tr><td>🧮 RAM</td><td>Memoria de trabajo</td></tr>
              <tr><td>⚖️ Propósito general</td><td>Equilibrio de recursos</td></tr>
              <tr><td>🧠 Cómputo optimizado</td><td>Prioriza procesamiento</td></tr>
              <tr><td>🧮 Memoria optimizada</td><td>Prioriza memoria</td></tr>
              <tr><td>🎯 Right sizing</td><td>Elegir capacidad adecuada</td></tr>
              <tr><td>💰 Costo</td><td>Debe considerarse al elegir</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>50. Ticket de salida</h3>
          <Dialogo>"Antes de lanzar una instancia EC2 debo elegir ________ para definir su punto de partida y ________ para definir su capacidad."</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Una AMI y un tipo de instancia.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 3</div>
          <Nota><p>Cerraría mostrando:</p></Nota>
          <Flow steps={[
            { icon: 'disc', label: 'Qué plantilla usar' },
            { icon: 'settings', label: 'Cuánta capacidad necesitamos' },
            { icon: 'server', label: '' },
          ]} />
          <p>Y preguntaría:</p>
          <Dialogo>"Perfecto. Entonces, ¿cómo transformamos estas decisiones en un servidor funcionando realmente en AWS?"</Dialogo>
          <p>Ahí dejamos la teoría y entramos por primera vez al proceso completo de creación.</p>
          <ConceptBadge>Módulo 3 · Clase 3 — Crear nuestra primera instancia EC2</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-3/clase-3" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 3: Crear nuestra primera instancia EC2 →
          </Link>
        </div>

      </div>
    </div>
  );
}
