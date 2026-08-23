import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, StrikeChip, RoleGrid, Flow, InfoBox, CompareCols, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué seleccionamos mediante una AMI?', options: [{ text: 'Una plantilla para la instancia.', correct: true }, { text: 'Una contraseña.', correct: false }, { text: 'Un usuario.', correct: false }, { text: 'Un grupo.', correct: false }] },
  { q: '¿Qué seleccionamos con Instance Type?', options: [{ text: 'Capacidad de cómputo.', correct: true }, { text: 'Usuario IAM.', correct: false }, { text: 'Región DNS.', correct: false }, { text: 'Contraseña.', correct: false }] },
  { q: '¿Qué debemos hacer con una clave privada?', options: [{ text: 'Publicarla.', correct: false }, { text: 'Compartirla.', correct: false }, { text: 'Protegerla.', correct: true }, { text: 'Subirla a GitHub.', correct: false }] },
  { q: '¿Qué significa Running?', options: [{ text: 'La instancia está ejecutándose.', correct: true }, { text: 'Está eliminada.', correct: false }, { text: 'Está siendo creada como usuario.', correct: false }, { text: 'No existe.', correct: false }] },
  { q: '¿Qué significa Stopped?', options: [{ text: 'La instancia fue eliminada.', correct: false }, { text: 'Está detenida pero sigue existiendo.', correct: true }, { text: 'Está ejecutándose.', correct: false }, { text: 'Cambió de Región.', correct: false }] },
  { q: '¿Stopped garantiza costo cero?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Qué significa Terminated?', options: [{ text: 'Instancia terminada.', correct: true }, { text: 'Instancia pausada.', correct: false }, { text: 'Usuario bloqueado.', correct: false }, { text: 'Región eliminada.', correct: false }] },
  { q: '¿Qué debemos comprobar antes de crear?', options: [{ text: 'Solo el nombre.', correct: false }, { text: 'Configuración y posibles costos.', correct: true }, { text: 'Solo el color de la consola.', correct: false }, { text: 'Nada.', correct: false }] },
];

export default function Modulo3Clase3() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 3 · Clase 3</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 3 · Clase 3: Crear nuestra primera instancia EC2</h2>
      <p className="lesson-subtitle">
        Laboratorio guiado paso a paso: nombre, AMI, tipo de instancia, key pair, red, Security Group y almacenamiento, hasta ver nuestro primer servidor en Running.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Laboratorio guiado + reconocimiento + reto práctico</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 3 · Clases 1 y 2</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Acceder al servicio Amazon EC2.</li>
            <li>Reconocer la Región seleccionada.</li>
            <li>Iniciar el proceso de creación de una instancia.</li>
            <li>Asignar un nombre a la instancia.</li>
            <li>Seleccionar una AMI apropiada.</li>
            <li>Elegir un tipo de instancia.</li>
            <li>Comprender para qué sirve un key pair.</li>
            <li>Reconocer la configuración básica de red.</li>
            <li>Identificar un Security Group.</li>
            <li>Reconocer el almacenamiento asociado.</li>
            <li>Lanzar una instancia.</li>
            <li>Identificar su estado.</li>
            <li>Reconocer IP pública, IP privada, ID y Zona de Disponibilidad.</li>
            <li>Detener y terminar una instancia de laboratorio.</li>
          </ul>
          <p>La frase que debe sobrevivir será:</p>
          <Dialogo>🚀 Crear una instancia EC2 significa tomar varias decisiones sobre sistema, capacidad, acceso, red, seguridad y almacenamiento.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Antes de entrar a AWS</h3>
          <Nota><p>Antes de tocar un botón, recordamos:</p></Nota>
          <Flow steps={[
            { icon: 'disc', label: 'AMI', caption: '¿Qué plantilla?' },
            { icon: 'settings', label: 'Instance Type', caption: '¿Qué capacidad?' },
            { icon: 'server', label: 'Instancia EC2' },
          ]} />
          <p>Hoy agregaremos: 🔑 Acceso, 🌐 Red, 🔐 Seguridad, 💾 Almacenamiento.</p>
        </section>

        <section className="lesson-section">
          <h3>3. Nuestro mapa del laboratorio</h3>
          <Nota><p>Escribiría este flujo en la pizarra:</p></Nota>
          <Flow steps={[
            { icon: 'cloud', label: 'AWS' },
            { icon: 'map-pin', label: 'Región' },
            { icon: 'server', label: 'EC2' },
            { icon: 'rocket', label: 'Launch Instance' },
            { icon: 'tag', label: 'Nombre' },
            { icon: 'disc', label: 'AMI' },
            { icon: 'settings', label: 'Tipo de instancia' },
            { icon: 'key', label: 'Key Pair' },
            { icon: 'globe', label: 'Red' },
            { icon: 'lock', label: 'Security Group' },
            { icon: 'hard-drive', label: 'Storage' },
            { icon: 'search', label: 'Revisar' },
            { icon: 'rocket', label: 'Launch' },
          ]} />
          <Nota><p>Cada estudiante debe saber en qué punto está durante el laboratorio.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>4. Antes del laboratorio: regla de costos</h3>
          <Nota><p>No asumiría que una opción específica es gratuita. AWS puede modificar: precios; créditos; Free Tier; tipos elegibles; promociones; condiciones de las cuentas.</p></Nota>
          <ConceptBadge>Antes de crear, revisar la información de precio que muestra la cuenta y los recursos seleccionados.</ConceptBadge>
          <p>Y al terminar: 🧹 Crear → probar → limpiar.</p>
        </section>

        <section className="lesson-section">
          <h3>5. Paso 1: comprobar la Región</h3>
          <Nota><p>Antes de entrar a EC2 preguntamos:</p></Nota>
          <Dialogo>¿En qué Región estoy?</Dialogo>
          <p>La Región seleccionada aparece en la consola.</p>
          <Flow steps={[{ icon: 'cloud', label: 'AWS' }, { icon: 'map-pin', label: 'Región seleccionada' }, { icon: 'server', label: 'EC2' }]} />
        </section>

        <section className="lesson-section">
          <h3>6. ¿Por qué importa la Región?</h3>
          <Nota><p>Recordemos: una instancia se ejecutará en una Zona de Disponibilidad perteneciente a una Región.</p></Nota>
          <p>Si creamos una instancia en una Región y después cambiamos a otra, podríamos pensar: "¡Mi servidor desapareció!" 😱</p>
          <Nota><p>No necesariamente. Quizás estamos mirando otra Región.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>7. Mini actividad antes de continuar</h3>
          <QaItem question="¿Qué Región aparece seleccionada en su consola?" answer="No avanzamos hasta que todos sepan dónde están trabajando. Esto parece pequeño. No lo es." />
        </section>

        <section className="lesson-section">
          <h3>8. Paso 2: buscar EC2</h3>
          <Nota><p>Utilizamos el buscador de servicios de AWS. Buscamos: EC2. Entramos a: Amazon EC2. Aquí encontraremos el panel de administración del servicio.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>9. EC2 Dashboard</h3>
          <Nota><p>En el panel podemos encontrar acceso a elementos como:</p></Nota>
          <p>🖥️ Instances, 💾 Volumes, 📸 Snapshots, 🔐 Security Groups, 🔑 Key Pairs, 🌐 recursos relacionados con red.</p>
          <p>No necesitamos aprender todo hoy. Nuestro destino es: Instances.</p>
        </section>

        <section className="lesson-section">
          <h3>10. Paso 3: Launch instance</h3>
          <Nota><p>Entramos a Instances y buscamos Launch instances. Antes de presionarlo preguntaría:</p></Nota>
          <QaItem question="¿Qué estamos a punto de crear?" answer="🖥️ Una instancia EC2. No: ❌ una cuenta AWS; ❌ una Región; ❌ un usuario IAM; ❌ una AMI." />
        </section>

        <section className="lesson-section">
          <h3>11. Paso 4: nombre de la instancia</h3>
          <Nota><p>Encontraremos: Name and tags. Podemos utilizar:</p></Nota>
          <ConceptBadge>servidor-curso-aws — o — ec2-clase3</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>12. ¿El nombre cambia la potencia?</h3>
          <p>❌ No. Llamarla SUPER-MEGA-SERVIDOR-9000 no le entrega 128 GB de RAM. 😄</p>
          <p>El nombre nos ayuda a: 🔎 identificar; 🗂️ organizar; 📋 administrar recursos.</p>
        </section>

        <section className="lesson-section">
          <h3>13. ¿Qué son los tags?</h3>
          <Nota><p>AWS permite utilizar etiquetas o tags para organizar recursos.</p></Nota>
          <ConceptBadge>EC2 — Curso = AWSDesdeCero</ConceptBadge>
          <ConceptBadge>Ambiente = Laboratorio</ConceptBadge>
          <Nota><p>No profundizaremos todavía, pero comenzamos desde ahora con el hábito de nombrar y etiquetar recursos de manera clara.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>14. Paso 5: seleccionar AMI</h3>
          <Nota><p>Ahora encontraremos: Application and OS Images, o una sección equivalente para seleccionar la imagen. Aquí conectamos inmediatamente con la Clase 2.</p></Nota>
          <QaItem question="¿Qué es una AMI?" answer="📀 Una plantilla utilizada para lanzar una instancia." />
        </section>

        <section className="lesson-section">
          <h3>15. AMI para nuestro laboratorio</h3>
          <Nota><p>Para un laboratorio inicial podemos utilizar una opción Linux apropiada disponible en la cuenta, por ejemplo una imagen oficial de Amazon Linux.</p></Nota>
          <p>Antes de seleccionarla revisamos: 🐧 sistema; 🏢 proveedor; 🏗️ arquitectura; 💰 información de precio/elegibilidad; 📄 descripción.</p>
        </section>

        <section className="lesson-section">
          <h3>16. No elegimos cualquier imagen</h3>
          <Nota><p>Si aparecen muchas opciones, no hacemos "esta tiene un logo bonito." 😎</p></Nota>
          <p>Elegimos según: los requisitos de nuestra carga de trabajo.</p>
        </section>

        <section className="lesson-section">
          <h3>17. ¿Quién publicó la imagen?</h3>
          <Nota><p>Este detalle merece atención. Cuando seleccionamos imágenes debemos verificar el origen/proveedor. Para nuestro primer laboratorio buscaremos una imagen oficial o de una fuente confiable apropiada para el ejercicio.</p></Nota>
          <p>No deberíamos ejecutar imágenes desconocidas simplemente porque aparecen disponibles.</p>
        </section>

        <section className="lesson-section">
          <h3>18. Nuestra decisión hasta ahora</h3>
          <Flow steps={[
            { icon: 'tag', label: 'Nombre', caption: 'ec2-clase3' },
            { icon: 'disc', label: 'AMI', caption: 'Linux apropiado' },
            { icon: 'server', label: 'Nuestro futuro servidor' },
          ]} />
          <p>Pero todavía falta: ¿cuánta capacidad tendrá?</p>
        </section>

        <section className="lesson-section">
          <h3>19. Paso 6: Instance Type</h3>
          <Nota><p>Encontraremos: Instance type. Aquí elegimos la combinación de recursos.</p></Nota>
          <InfoBox title="⚙️ Instance Type" items={['🧠 vCPU', '🧮 Memoria', '🌐 capacidades asociadas', 'otras características']} />
        </section>

        <section className="lesson-section">
          <h3>20. Para el laboratorio</h3>
          <Nota><p>Elegiremos un tipo de instancia pequeño que sea suficiente para el ejercicio y adecuado a las condiciones de nuestra cuenta.</p></Nota>
          <StrikeChip>❌ "Usen siempre X porque es gratis."</StrikeChip>
          <p>En su lugar: seleccionen el tipo indicado por el docente después de comprobar las condiciones actuales de la cuenta.</p>
        </section>

        <section className="lesson-section">
          <h3>21. Antes de seleccionar</h3>
          <Nota><p>Revisamos: vCPU; memoria; arquitectura compatible; información de precio; elegibilidad o créditos si corresponde.</p></Nota>
          <QaItem question="¿Necesitamos una máquina enorme para nuestro laboratorio?" answer="❌ No. Aplicamos: 🎯 Right sizing." />
        </section>

        <section className="lesson-section">
          <h3>22. Paso 7: Key Pair</h3>
          <Nota><p>Ahora aparecerá: Key pair. Aquí debemos ir despacio. No quiero que el estudiante piense "es otra contraseña." No exactamente.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>23. ¿Qué es un Key Pair?</h3>
          <Nota><p>Un par de claves utiliza criptografía de clave pública.</p></Nota>
          <Dialogo>🔑 Es un mecanismo que puede utilizarse para demostrar que estamos autorizados a conectarnos a una instancia.</Dialogo>
          <Flow steps={[{ icon: 'lock', label: 'Clave pública' }, { icon: 'lock', label: 'Clave privada' }]} />
        </section>

        <section className="lesson-section">
          <h3>24. Analogía de cerradura y llave</h3>
          <CompareCols cols={[
            { icon: 'server', title: 'Instancia', items: ['🔓 información pública'] },
            { icon: 'user', title: 'Usuario', items: ['🔐 clave privada'] },
          ]} />
          <Nota><p>La clave privada debe protegerse.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>25. Regla de oro</h3>
          <ConceptBadge variant="danger">LA CLAVE PRIVADA NO SE COMPARTE</ConceptBadge>
          <p>No: ❌ WhatsApp; ❌ correo público; ❌ GitHub; ❌ presentación; ❌ "grupo del curso". Es una credencial sensible.</p>
        </section>

        <section className="lesson-section">
          <h3>26. Si AWS entrega un archivo de clave</h3>
          <Nota><p>Dependiendo del método seleccionado, podemos recibir un archivo como: mi-clave.pem. Debemos almacenarlo de manera segura.</p></Nota>
          <p>En determinados escenarios, AWS no nos permitirá simplemente descargar nuevamente la misma clave privada después. Por eso: no la tratamos como un archivo cualquiera.</p>
        </section>

        <section className="lesson-section">
          <h3>27. ¿Siempre necesitaremos Key Pair?</h3>
          <Nota><p>No necesariamente. AWS ofrece diferentes mecanismos y escenarios de conexión. Por ejemplo, existen alternativas administradas como AWS Systems Manager Session Manager cuando la arquitectura está preparada para ello.</p></Nota>
          <p>Pero para esta clase: aprendemos a reconocer el Key Pair y su función.</p>
        </section>

        <section className="lesson-section">
          <h3>28. Paso 8: Network Settings</h3>
          <Nota><p>Ahora veremos varios conceptos juntos: VPC, Subnet, Public IP, Security Group. Puede parecer un zoológico de siglas. 🦒 No necesitamos dominarlo hoy.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>29. Analogía de la ciudad</h3>
          <Flow steps={[
            { icon: 'map-pin', label: 'AWS' },
            { icon: 'building', label: 'VPC' },
            { icon: 'building', label: 'Subnet' },
            { icon: 'home', label: 'EC2' },
          ]} />
          <p>Para esta clase: VPC — nuestra red virtual en AWS. Subnet — una sección de esa red.</p>
          <Nota><p>Profundizaremos redes en otro módulo.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>30. Public IP</h3>
          <Dialogo>🌎 Una dirección pública puede permitir que el recurso sea alcanzable desde Internet cuando la red y las reglas de seguridad también lo permiten.</Dialogo>
          <Nota><p>Muy importante: tener IP pública no significa automáticamente que todo esté permitido. También existen: 🔐 Security Groups; 🌐 rutas; 🛡️ otras configuraciones de red.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>31. Private IP</h3>
          <Dialogo>🏠 Es una dirección utilizada para comunicación dentro de la red privada correspondiente.</Dialogo>
          <Flow steps={[
            { icon: 'map-pin', label: 'Internet' },
            { icon: 'globe', label: 'IP pública' },
            { icon: 'lock', label: 'Seguridad' },
            { icon: 'server', label: 'EC2' },
            { icon: 'home', label: 'IP privada' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>32. Paso 9: Security Group</h3>
          <Nota><p>Aquí aparece una pieza importantísima: Security Group.</p></Nota>
          <Dialogo>Es un firewall virtual que ayuda a controlar qué tráfico puede entrar y salir de recursos asociados.</Dialogo>
          <p>La próxima clase estará dedicada completamente a esto.</p>
        </section>

        <section className="lesson-section">
          <h3>33. Analogía de las puertas</h3>
          <Flow steps={[{ icon: 'server', label: 'EC2' }]} />
          <RoleGrid roles={[
            { icon: 'door', label: 'Puerto 22', desc: 'SSH' },
            { icon: 'door', label: 'Puerto 80', desc: 'HTTP' },
            { icon: 'door', label: 'Puerto 443', desc: 'HTTPS' },
          ]} />
          <p>El Security Group decide qué tráfico está permitido.</p>
        </section>

        <section className="lesson-section">
          <h3>34. Aquí no hacemos clic alegremente</h3>
          <Nota><p>Algunas opciones pueden permitir "Traffic from anywhere" o rangos muy amplios. No seleccionamos eso automáticamente.</p></Nota>
          <Dialogo>¿Quién necesita conectarse y para qué?</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>35. Si necesitamos administración</h3>
          <Nota><p>Dependiendo del laboratorio y método de conexión, podríamos necesitar permitir determinado acceso administrativo. Si utilizamos SSH, por ejemplo:</p></Nota>
          <ConceptBadge>SSH — Puerto 22</ConceptBadge>
          <StrikeChip>❌ "Siempre abran SSH a todo Internet."</StrikeChip>
          <p>La regla será: limitar el origen tanto como sea razonablemente posible.</p>
        </section>

        <section className="lesson-section">
          <h3>36. ¿Y HTTP?</h3>
          <Nota><p>Todavía no estamos publicando nuestra web. Eso llegará en el laboratorio integrador. Pero podemos introducir:</p></Nota>
          <ConceptBadge>HTTP — Puerto 80</ConceptBadge>
          <ConceptBadge>HTTPS — Puerto 443</ConceptBadge>
          <p>La Clase 4 explicará exactamente qué significa cada uno.</p>
        </section>

        <section className="lesson-section">
          <h3>37. Paso 10: Configure Storage</h3>
          <Nota><p>Ahora encontraremos almacenamiento. Nuestra instancia necesita un lugar donde mantener elementos como: 🐧 sistema operativo; 📁 archivos; ⚙️ software; 📄 configuraciones.</p></Nota>
          <p>Aquí aparece: Amazon EBS.</p>
        </section>

        <section className="lesson-section">
          <h3>38. ¿Qué es EBS?</h3>
          <Dialogo>EBS proporciona almacenamiento en bloques que podemos utilizar con EC2.</Dialogo>
          <p>Analogía:</p>
          <Flow steps={[{ icon: 'server', label: 'Computador' }, { icon: 'hard-drive', label: 'Disco' }]} />
          <p>En AWS:</p>
          <Flow steps={[{ icon: 'server', label: 'EC2' }, { icon: 'hard-drive', label: 'EBS' }]} />
          <Nota><p>La Clase 5 estará dedicada a este tema.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>39. Tamaño del almacenamiento</h3>
          <Nota><p>Encontraremos un tamaño expresado normalmente en GiB. No aumentamos el almacenamiento sin motivo.</p></Nota>
          <p>Recordemos: más recursos pueden significar más costos. Para el laboratorio utilizaremos únicamente lo necesario.</p>
        </section>

        <section className="lesson-section">
          <h3>40. Antes de lanzar: DETENERSE</h3>
          <Nota><p>Antes de presionar Launch instance, hacemos una revisión.</p></Nota>
          <InfoBox items={['🌎 Región correcta', '🏷️ Nombre correcto', '📀 AMI correcta', '⚙️ Tipo correcto', '🔑 Acceso revisado', '🌐 Red revisada', '🔐 Security Group revisado', '💾 Storage revisado', '💰 Costos revisados']} />
          <Nota><p>Esta lista será parte permanente del curso.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>41. Paso 11: Launch Instance</h3>
          <Nota><p>Ahora sí: Launch instance. AWS comienza a preparar nuestra instancia. 🎉 Pero todavía no celebramos con fuegos artificiales digitales. Primero verificamos.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>42. Estado Pending</h3>
          <Dialogo>Pending significa: AWS está preparando/iniciando la instancia.</Dialogo>
          <Flow steps={[{ icon: 'rocket', label: 'Launch' }, { icon: 'clock', label: 'Pending' }]} />
        </section>

        <section className="lesson-section">
          <h3>43. Estado Running</h3>
          <Dialogo>Running significa: la instancia está ejecutándose.</Dialogo>
          <Flow steps={[{ icon: 'clock', label: 'Pending' }, { icon: 'dot-success', label: 'Running' }]} />
          <p>Tenemos nuestro primer servidor virtual funcionando en AWS. 🎉🖥️</p>
        </section>

        <section className="lesson-section">
          <h3>44. Paso 12: conocer nuestra instancia</h3>
          <Nota><p>Seleccionamos la instancia. Ahora vamos a buscar información. No modificaremos nada. Haremos una: 🔎 Cacería de datos EC2.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>45. Instance ID</h3>
          <Nota><p>Encontraremos algo parecido a: i-xxxxxxxxxxxxxxxxx.</p></Nota>
          <Dialogo>Es un identificador único de la instancia.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>46. Instance Type</h3>
          <QaItem question="¿Qué representa el Instance Type que vemos aquí?" answer="Esta es la capacidad que elegimos. Conectamos con Clase 2." />
        </section>

        <section className="lesson-section">
          <h3>47. AMI</h3>
          <QaItem question="¿Qué representa la AMI utilizada?" answer="La plantilla desde la que lanzamos nuestra instancia." />
        </section>

        <section className="lesson-section">
          <h3>48. Availability Zone</h3>
          <Nota><p>Encontramos: Availability Zone.</p></Nota>
          <Flow steps={[{ icon: 'map-pin', label: 'Región' }, { icon: 'building', label: 'Availability Zone' }, { icon: 'server', label: 'EC2' }]} />
          <p>La instancia se ejecuta en una Zona de Disponibilidad dentro de la Región.</p>
        </section>

        <section className="lesson-section">
          <h3>49. Public IPv4</h3>
          <Dialogo>Es una dirección pública asociada a nuestra instancia para determinados escenarios de comunicación.</Dialogo>
          <p>No significa "mi página ya está funcionando." Todavía no tenemos necesariamente un servidor web instalado.</p>
        </section>

        <section className="lesson-section">
          <h3>50. Private IPv4</h3>
          <p>También encontraremos: Private IPv4 address. Está relacionada con la comunicación dentro de la red privada.</p>
          <RoleGrid roles={[{ icon: 'globe', label: 'Public IP', desc: '' }, { icon: 'home', label: 'Private IP', desc: '' }]} />
        </section>

        <section className="lesson-section">
          <h3>51. Security Group</h3>
          <QaItem question="¿Qué controla el Security Group asociado?" answer="El tráfico permitido hacia y desde el recurso según sus reglas." />
        </section>

        <section className="lesson-section">
          <h3>52. Storage</h3>
          <p>Buscamos: Storage. Identificamos: 💾 volumen; 📏 tamaño; 🔗 relación con la instancia. No lo modificamos todavía.</p>
        </section>

        <section className="lesson-section">
          <h3>53. Actividad: detective EC2</h3>
          <Nota><p>Cada estudiante debe completar:</p></Nota>
          <InfoBox items={['🏷️ Nombre: ________________', '🆔 Instance ID: ________________', '📀 AMI: ________________', '⚙️ Instance Type: ________________', '🌎 Región: ________________', '🏢 Availability Zone: ________________', '🌐 Public IPv4: ________________', '🏠 Private IPv4: ________________', '🔐 Security Group: ________________', '💾 Storage: ________________']} />
          <Nota><p>El objetivo no es copiar. Después deberán explicar qué significa cada elemento.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>54. Pregunta importante</h3>
          <QaItem
            question="¿Quién administra el hardware físico donde está nuestra instancia?"
            answer="AWS administra la infraestructura física subyacente. Nosotros administramos elementos de nuestra instancia y configuración según el modelo de responsabilidad compartida. Esto conecta con módulos anteriores."
          />
        </section>

        <section className="lesson-section">
          <h3>55. ¿Qué ocurre si ya terminamos?</h3>
          <Nota><p>Aquí debemos enseñar desde el primer laboratorio: no abandonamos una instancia Running porque terminó la clase.</p></Nota>
          <p>Tenemos que decidir: ¿la necesitamos después? Quizás 🛑 detener. ¿El laboratorio terminó y no la necesitaremos? Podríamos 🗑️ terminarla. Pero antes entendamos la diferencia.</p>
        </section>

        <section className="lesson-section">
          <h3>56. Stop Instance</h3>
          <Dialogo>Stop significa detener la instancia.</Dialogo>
          <Flow steps={[{ icon: 'dot-success', label: 'Running' }, { icon: 'dot-warning', label: 'Stopping' }, { icon: 'dot-danger', label: 'Stopped' }]} />
          <p>La instancia sigue existiendo.</p>
        </section>

        <section className="lesson-section">
          <h3>57. Analogía del automóvil</h3>
          <CompareCols cols={[
            { icon: 'car', title: 'Running', items: ['Motor encendido.'] },
            { icon: 'car', title: 'Stopped', items: ['Motor apagado.'] },
          ]} />
          <p>El automóvil todavía existe. Lo mismo: Stopped no significa eliminado.</p>
        </section>

        <section className="lesson-section">
          <h3>58. Stopped tampoco significa automáticamente costo cero</h3>
          <Nota><p>Aunque determinados cargos de cómputo dejan de aplicarse cuando una instancia compatible está detenida, otros recursos pueden seguir generando costos.</p></Nota>
          <p>Por ejemplo: 💾 almacenamiento EBS; 🌐 determinados recursos de red; 📸 snapshots; otros servicios asociados.</p>
          <p>Por eso: Stopped ≠ todo gratis.</p>
        </section>

        <section className="lesson-section">
          <h3>59. Terminate Instance</h3>
          <Dialogo>Terminate significa terminar la instancia.</Dialogo>
          <Flow steps={[{ icon: 'dot-success', label: 'Running' }, { icon: 'trash', label: 'Terminate' }, { icon: 'dot-muted', label: 'Shutting-down' }, { icon: 'x-circle', label: 'Terminated' }]} />
          <Nota><p>Esa instancia no podrá simplemente volver a iniciarse.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>60. Terminate es una acción importante</h3>
          <StrikeChip>❌ "Veamos qué pasa si presiono esto." 😈</StrikeChip>
          <p>Antes debemos comprobar: 📁 información necesaria; 💾 comportamiento de volúmenes; 📸 respaldos si fueran necesarios; 🔗 recursos relacionados.</p>
          <p>Para nuestro laboratorio desechable: podremos terminarla siguiendo las instrucciones del docente.</p>
        </section>

        <section className="lesson-section">
          <h3>61. La regla de limpieza</h3>
          <Nota><p>Desde esta clase, todo laboratorio termina con:</p></Nota>
          <Flow steps={[{ icon: 'rocket', label: 'CREAR' }, { icon: 'flask', label: 'PROBAR' }, { icon: 'search', label: 'VERIFICAR' }, { icon: 'trash', label: 'LIMPIAR' }]} />
          <Nota><p>Un laboratorio no termina cuando "funcionó". Termina cuando sabemos qué recursos dejamos activos.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>62. Actividad: ¿qué estado es?</h3>
          <QaItem question="Caso 1 — AWS está preparando la instancia." answer="➡️ Pending" />
          <QaItem question="Caso 2 — La instancia está funcionando." answer="➡️ Running" />
          <QaItem question="Caso 3 — La instancia está apagada pero sigue existiendo." answer="➡️ Stopped" />
          <QaItem question="Caso 4 — La instancia fue eliminada." answer="➡️ Terminated" />
        </section>

        <section className="lesson-section">
          <h3>63. Actividad: encuentra el error</h3>
          <Nota><p>Pedro realiza:</p></Nota>
          <ol className="plain-list">
            <li>Launch Instance</li>
            <li>Selecciona cualquier AMI</li>
            <li>Elige la instancia más grande</li>
            <li>Abre todo el tráfico</li>
            <li>No revisa costos</li>
            <li>Se va a almorzar 😬</li>
          </ol>
          <QaItem question="¿Cuántos problemas encuentran?" answer="Cinco: AMI aleatoria, instancia sin necesidad, acceso demasiado amplio, no revisar costos, dejar recursos sin supervisión." />
        </section>

        <section className="lesson-section">
          <h3>64. Corrección</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Problema</th><th>Mejora</th></tr></thead>
            <tbody>
              <tr><td>AMI aleatoria.</td><td>Elegir según requisitos.</td></tr>
              <tr><td>Instancia enorme sin necesidad.</td><td>Right sizing.</td></tr>
              <tr><td>Acceso demasiado amplio.</td><td>Solo tráfico necesario.</td></tr>
              <tr><td>No revisar costos.</td><td>Revisar antes de crear.</td></tr>
              <tr><td>Dejar recursos sin supervisión.</td><td>Monitorear y limpiar.</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>65. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>66. Reto de la clase</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge>BurgerCloud</ConceptBadge>
          <p>Necesita crear un servidor de laboratorio. Requisitos: 🐧 Linux; 🌐 aplicación pequeña; 💰 controlar costos; 🔐 acceso restringido; 💾 almacenamiento básico; 🌎 Región definida.</p>
          <p>Los estudiantes deben ordenar: Security Group, AMI, Launch, Instance Type, Storage, Name, Region, Key Pair.</p>
        </section>

        <section className="lesson-section">
          <h3>67. Solución esperada</h3>
          <Reveal label="Ver el orden correcto">
            <Flow steps={[
              { n: 1, label: 'Región' },
              { n: 2, label: 'Nombre' },
              { n: 3, label: 'AMI' },
              { n: 4, label: 'Instance Type' },
              { n: 5, label: 'Key Pair / método de acceso' },
              { n: 6, label: 'Red' },
              { n: 7, label: 'Security Group' },
              { n: 8, label: 'Storage' },
              { n: 9, label: 'Revisar' },
              { n: 10, label: 'Launch' },
            ]} />
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>68. Reto nivel 2</h3>
          <Nota><p>Después de crearla tenemos:</p></Nota>
          <InfoBox items={['State: 🟢 Running', 'Public IPv4: 54.x.x.x', 'Private IPv4: 10.x.x.x', 'Security Group: sg-curso', 'Storage: 8 GiB']} />
          <QaItem question="¿Está ejecutándose?" answer="✅ Sí." />
          <QaItem question="¿Tiene dirección pública?" answer="✅ Sí." />
          <QaItem question="¿Tiene dirección privada?" answer="✅ Sí." />
          <QaItem question="¿Qué controla sg-curso?" answer="🔐 Reglas de tráfico." />
          <QaItem question="¿Qué representa 8 GiB?" answer="💾 Almacenamiento configurado." />
        </section>

        <section className="lesson-section">
          <h3>69. Reto oral</h3>
          <Dialogo>"Explícame cómo crear EC2 sin decir Launch Instance, AMI, Instance Type, Security Group ni EBS."</Dialogo>
          <Reveal label="Ver una buena respuesta">
            <Dialogo>"Primero decido dónde trabajaré, luego elijo la plantilla del servidor, su capacidad, cómo accederé, su red, qué conexiones permitiré y cuánto almacenamiento tendrá. Reviso todo y recién entonces lo creo."</Dialogo>
          </Reveal>
          <p style={{ marginTop: 'var(--space-4)' }}>🎯 Si pueden explicar eso, dejaron de seguir botones y comenzaron a entender infraestructura.</p>
        </section>

        <section className="lesson-section">
          <h3>70. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Pregunta sencilla</th></tr></thead>
            <tbody>
              <tr><td>🌎 Región</td><td>¿Dónde lo crearé?</td></tr>
              <tr><td>🏷️ Name</td><td>¿Cómo lo identificaré?</td></tr>
              <tr><td>📀 AMI</td><td>¿Con qué plantilla partirá?</td></tr>
              <tr><td>⚙️ Instance Type</td><td>¿Cuánta capacidad tendrá?</td></tr>
              <tr><td>🔑 Key Pair</td><td>¿Cómo podré autenticarme en ciertos accesos?</td></tr>
              <tr><td>🌐 Network</td><td>¿En qué red estará?</td></tr>
              <tr><td>🔐 Security Group</td><td>¿Qué tráfico permitiremos?</td></tr>
              <tr><td>💾 Storage</td><td>¿Dónde almacenará datos?</td></tr>
              <tr><td>🟢 Running</td><td>Está ejecutándose</td></tr>
              <tr><td>🔴 Stopped</td><td>Está detenida</td></tr>
              <tr><td>❌ Terminated</td><td>Fue terminada</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>71. Ticket de salida</h3>
          <Dialogo>Antes de presionar Launch Instance, menciona cinco decisiones que deberías revisar.</Dialogo>
          <Reveal label="Ver una respuesta correcta">
            <p>Región, AMI, tipo de instancia, acceso, red, Security Group, almacenamiento y costos. Con cinco basta.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 4</div>
          <Nota><p>Cerraría mostrando nuestra nueva instancia:</p></Nota>
          <Flow steps={[{ icon: 'map-pin', label: 'Internet' }, { n: '?', label: '???' }, { icon: 'server', label: 'EC2' }]} />
          <Dialogo>"Nuestra instancia existe. ¿Significa que cualquier persona de Internet puede conectarse a cualquier cosa que tenga?"</Dialogo>
          <p>❌ No debería. Necesitamos decidir: 🚪 qué puertas estarán disponibles; 🌎 desde dónde se podrá llegar; 📥 qué tráfico puede entrar; 📤 qué tráfico puede salir.</p>
          <p>Y ahí aparece nuestro próximo guardia:</p>
          <Flow steps={[{ icon: 'map-pin', label: 'Internet' }, { icon: 'shield', label: 'SECURITY GROUP' }, { icon: 'server', label: 'EC2' }]} />
          <ConceptBadge>Módulo 3 · Clase 4 — Security Groups, puertos y control del tráfico</ConceptBadge>
          <Nota>
            <p>En esa clase mantendremos el mismo nivel de desarrollo, pero introduciremos puertos 22, 80 y 443, inbound/outbound, protocolos, IP, 0.0.0.0/0 y CIDR con analogías simples antes de tocar las reglas reales de nuestra instancia.</p>
          </Nota>
          <Link to="/aprendizaje/aws-desde-cero/modulo-3/clase-4" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 4: Security Groups, puertos y control del tráfico →
          </Link>
        </div>

      </div>
    </div>
  );
}
