import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, CompareCols, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_EC2_O_EBS = [
  { q: 'Ejecutar una aplicación.', options: [{ text: '🖥️ EC2', correct: true }, { text: '💾 EBS', correct: false }] },
  { q: 'Guardar archivos persistentemente.', options: [{ text: '🖥️ EC2', correct: false }, { text: '💾 EBS', correct: true }] },
  { q: 'Seleccionar vCPU.', options: [{ text: '🖥️ EC2', correct: true }, { text: '💾 EBS', correct: false }] },
  { q: 'Crear un volumen.', options: [{ text: '🖥️ EC2', correct: false }, { text: '💾 EBS', correct: true }] },
  { q: 'Tener memoria RAM.', options: [{ text: '🖥️ EC2', correct: true }, { text: '💾 EBS', correct: false }] },
  { q: 'Crear snapshot.', options: [{ text: '🖥️ EC2', correct: false }, { text: '💾 EBS', correct: true }] },
];

const QUIZ_QUESTIONS = [
  { q: '¿Qué significa EBS?', options: [{ text: 'Elastic Block Store', correct: true }, { text: 'Elastic Backup Server', correct: false }, { text: 'External Block System', correct: false }, { text: 'EC2 Base Storage', correct: false }] },
  { q: '¿Cuál es la función principal de EBS?', options: [{ text: 'Administrar usuarios.', correct: false }, { text: 'Proporcionar almacenamiento en bloques.', correct: true }, { text: 'Crear Security Groups.', correct: false }, { text: 'Administrar DNS.', correct: false }] },
  { q: '¿EC2 y EBS son lo mismo?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Qué es un volumen EBS?', options: [{ text: 'Una unidad de almacenamiento virtual.', correct: true }, { text: 'Un usuario.', correct: false }, { text: 'Una Región.', correct: false }, { text: 'Una política IAM.', correct: false }] },
  { q: '¿Qué puede ocurrir con los datos EBS cuando detenemos una instancia?', options: [{ text: 'Siempre desaparecen.', correct: false }, { text: 'Pueden persistir.', correct: true }, { text: 'Se convierten en IAM.', correct: false }, { text: 'Cambian de Región.', correct: false }] },
  { q: '¿Stopped garantiza que no haya costos de almacenamiento?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Qué controla Delete on termination?', options: [{ text: 'Si un volumen se elimina junto con la instancia terminada.', correct: true }, { text: 'Si EC2 puede utilizar Internet.', correct: false }, { text: 'Si un usuario puede entrar.', correct: false }, { text: 'El tamaño de RAM.', correct: false }] },
  { q: '¿Qué es un snapshot?', options: [{ text: 'Una copia puntual de datos de un volumen EBS.', correct: true }, { text: 'Un servidor.', correct: false }, { text: 'Un Security Group.', correct: false }, { text: 'Una contraseña.', correct: false }] },
  { q: '¿Snapshot y volumen son exactamente lo mismo?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Los snapshots pueden seguir existiendo después de eliminar EC2?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
];

export default function Modulo3Clase5() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 3 · Clase 5</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 3 · Clase 5: Amazon EBS, volúmenes y snapshots</h2>
      <p className="lesson-subtitle">
        EC2 procesa; EBS guarda. Qué persiste cuando detenemos una instancia, qué controla Delete on termination, y por qué un snapshot no es "otro disco".
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + laboratorio guiado + actividades + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 3 · Clases 1 a 4</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es Amazon EBS.</li>
            <li>Diferenciar EC2 y EBS.</li>
            <li>Comprender qué es un volumen EBS.</li>
            <li>Reconocer el volumen raíz de una instancia.</li>
            <li>Comprender que los datos de EBS pueden persistir aunque una instancia se detenga.</li>
            <li>Diferenciar Stop y Terminate en relación con el almacenamiento.</li>
            <li>Comprender qué significa Delete on termination.</li>
            <li>Explicar qué es un snapshot.</li>
            <li>Comprender que un snapshot no es simplemente "otro disco".</li>
            <li>Reconocer que volúmenes y snapshots pueden generar costos.</li>
            <li>Identificar volúmenes asociados a una instancia EC2.</li>
          </ul>
          <p>La idea que debe sobrevivir será:</p>
          <Dialogo>💾 EC2 procesa; EBS guarda.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Recordemos nuestro servidor</h3>
          <Nota><p>Hasta ahora tenemos:</p></Nota>
          <Flow steps={[{ icon: 'map-pin', label: 'Usuario' }, { icon: 'shield', label: 'Security Group' }, { icon: 'server', label: 'EC2' }]} />
          <p>Nuestra instancia puede ejecutar: 🐧 sistema operativo, 🌐 servidor web, ⚙️ aplicaciones. Pero aparece una pregunta:</p>
          <Dialogo>¿Dónde está guardado todo eso?</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>3. Pensemos en un computador normal</h3>
          <Nota><p>Nuestro notebook tiene componentes diferentes:</p></Nota>
          <InfoBox title="💻 COMPUTADOR" items={['🧠 CPU', '🧮 RAM', '💾 Disco']} />
          <p>La CPU procesa. La RAM ayuda mientras estamos trabajando. El disco guarda información. No son la misma cosa.</p>
        </section>

        <section className="lesson-section">
          <h3>4. En AWS ocurre algo parecido</h3>
          <ConceptBadge>EC2 (Cómputo) + 💾 EBS (Almacenamiento)</ConceptBadge>
          <Flow steps={[{ icon: 'server', label: 'EC2' }, { icon: 'hard-drive', label: 'EBS' }]} />
        </section>

        <section className="lesson-section">
          <h3>5. ¿Qué significa EBS?</h3>
          <Nota><p>EBS significa: Elastic Block Store. Su nombre completo es: Amazon Elastic Block Store.</p></Nota>
          <p>EBS proporciona almacenamiento en bloques que puede utilizarse con cargas como instancias EC2.</p>
          <Dialogo>EBS funciona conceptualmente como un disco virtual que podemos utilizar con nuestra instancia.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>6. La analogía de la maleta</h3>
          <Nota><p>Pensemos en una persona viajando.</p></Nota>
          <CompareCols cols={[
            { icon: 'user', title: 'Persona = EC2', items: ['La persona realiza actividades.'] },
            { icon: 'briefcase', title: 'Maleta = EBS', items: ['La maleta guarda sus cosas.'] },
          ]} />
          <p>Si la persona se sienta y deja de moverse 🛑, la maleta no desaparece automáticamente.</p>
          <Nota><p>Esta analogía nos ayudará cuando hablemos de detener una instancia.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>7. Otra analogía: computador y disco</h3>
          <Flow steps={[{ icon: 'server', label: 'Computador' }, { icon: 'hard-drive', label: 'Disco' }]} />
          <p>Si apagamos el computador 🖥️ OFF...</p>
          <QaItem question="¿Los archivos del disco desaparecen?" answer="❌ No. Cuando volvemos a encenderlo: 📄 nuestros archivos siguen ahí." />
        </section>

        <section className="lesson-section">
          <h3>8. Esto nos ayuda a entender EC2 + EBS</h3>
          <Nota><p>Una instancia EC2 respaldada por EBS puede detenerse y luego volver a iniciarse, manteniendo la información almacenada en los volúmenes EBS persistentes asociados.</p></Nota>
          <Flow steps={[{ icon: 'dot-success', label: 'EC2 Running' }, { icon: 'hard-drive', label: 'EBS', caption: '📄 Archivos' }]} />
          <p>Detenemos:</p>
          <Flow steps={[{ icon: 'dot-danger', label: 'EC2 Stopped' }, { icon: 'hard-drive', label: 'EBS', caption: '📄 Archivos siguen almacenados' }]} />
        </section>

        <section className="lesson-section">
          <h3>9. Y aquí aparece una consecuencia importante</h3>
          <Nota><p>Si el volumen EBS sigue existiendo, puede seguir generando cargos de almacenamiento aunque EC2 esté detenida.</p></Nota>
          <p>Por eso: Stopped no significa "todo desapareció". Y tampoco significa "costo cero garantizado".</p>
        </section>

        <section className="lesson-section">
          <h3>10. EC2 y EBS son recursos diferentes</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Recurso</th><th>Función sencilla</th></tr></thead>
            <tbody>
              <tr><td>🖥️ EC2</td><td>Cómputo</td></tr>
              <tr><td>💾 EBS</td><td>Almacenamiento</td></tr>
            </tbody>
          </table>
          <Nota><p>Una instancia puede utilizar uno o más volúmenes según su configuración y las capacidades correspondientes.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>11. ¿Qué es un volumen EBS?</h3>
          <Dialogo>Es una unidad de almacenamiento virtual que podemos asociar a una instancia compatible.</Dialogo>
          <Flow steps={[{ icon: 'server', label: 'EC2' }]} />
          <RoleGrid roles={[{ icon: 'hard-drive', label: 'Volumen A', desc: '' }, { icon: 'hard-drive', label: 'Volumen B', desc: '' }]} />
        </section>

        <section className="lesson-section">
          <h3>12. Ejemplo sencillo</h3>
          <p>Nuestra instancia tiene: 🖥️ servidor-web. Y un volumen: 💾 20 GiB.</p>
          <ConceptBadge>Puede almacenar: 🐧 sistema operativo, 🌐 archivos web, ⚙️ programas, 📄 configuraciones</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>13. El volumen raíz</h3>
          <Nota><p>Al lanzar una instancia EC2 normalmente encontramos un: Root Volume.</p></Nota>
          <Dialogo>Es el volumen que contiene el sistema desde el cual arranca la instancia.</Dialogo>
          <p>Analogía: es como el disco principal donde está instalado Windows o Linux en un computador.</p>
        </section>

        <section className="lesson-section">
          <h3>14. Ejemplo</h3>
          <Flow steps={[{ icon: 'server', label: 'EC2' }, { icon: 'hard-drive', label: 'Root Volume', caption: '🐧 Sistema operativo · ⚙️ Configuración · 📄 Archivos' }]} />
          <p>Sin ese almacenamiento correspondiente, nuestro sistema no tendría ese punto de inicio persistente.</p>
        </section>

        <section className="lesson-section">
          <h3>15. También podemos tener volúmenes adicionales</h3>
          <Flow steps={[{ icon: 'server', label: 'EC2' }]} />
          <RoleGrid roles={[
            { icon: 'hard-drive', label: 'Root Volume', desc: 'Sistema' },
            { icon: 'hard-drive', label: 'Data Volume', desc: 'Datos' },
          ]} />
          <p>Así podemos separar conceptualmente 🐧 sistema de 📊 datos.</p>
        </section>

        <section className="lesson-section">
          <h3>16. Analogía del archivador</h3>
          <Nota><p>Tenemos una oficina.</p></Nota>
          <InfoBox items={['Cajón 1 — 📂 Sistema y documentos principales.', 'Cajón 2 — 📊 información adicional.']} />
          <p>Podemos organizar almacenamiento en diferentes unidades según las necesidades.</p>
        </section>

        <section className="lesson-section">
          <h3>17. ¿Cómo medimos el tamaño?</h3>
          <Nota><p>En AWS veremos tamaños expresados habitualmente en GiB.</p></Nota>
          <Dialogo>Indica cuánto espacio de almacenamiento estamos aprovisionando.</Dialogo>
          <p>Por ejemplo: 8 GiB, 20 GiB, 100 GiB.</p>
          <Nota><p>Más espacio no significa automáticamente una mejor decisión. También puede significar 💰 más costo.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>18. Aplicamos otra vez right sizing</h3>
          <Nota><p>Igual que con EC2: no aprovisionamos almacenamiento gigantesco "por si acaso".</p></Nota>
          <p>Preguntamos: ¿cuánto necesitamos? ¿Cómo crecerán los datos? ¿Qué rendimiento requiere la aplicación?</p>
        </section>

        <section className="lesson-section">
          <h3>19. EBS no tiene un solo tipo</h3>
          <Nota><p>EBS ofrece diferentes tipos de volumen con características de rendimiento y costo distintas. Para un curso inicial no necesitamos memorizar todo el catálogo.</p></Nota>
          <RoleGrid roles={[{ icon: 'hard-drive', label: 'Propósito general', desc: '' }, { icon: 'zap', label: 'Rendimiento especializado', desc: '' }]} />
          <p>La elección depende de la carga de trabajo.</p>
        </section>

        <section className="lesson-section">
          <h3>20. SSD y HDD</h3>
          <Nota><p>Entre las opciones de EBS existen volúmenes basados en tecnologías como SSD y HDD para diferentes necesidades.</p></Nota>
          <CompareCols cols={[
            { icon: 'zap', title: 'SSD', items: ['Orientado a cargas donde importan determinadas características de rendimiento y operaciones frecuentes.'] },
            { icon: 'disc', title: 'HDD', items: ['Orientado a ciertas cargas secuenciales y de gran volumen.'] },
          ]} />
          <p>No elegiría tipos de volumen solo por "SSD es mejor". La pregunta sigue siendo: ¿qué necesita nuestra aplicación?</p>
        </section>

        <section className="lesson-section">
          <h3>21. ¿Qué pasa cuando detenemos EC2?</h3>
          <Flow steps={[{ icon: 'dot-success', label: 'EC2 Running' }, { icon: 'hard-drive', label: 'EBS' }]} />
          <p>Presionamos: Stop. La instancia pasa a: 🔴 Stopped. Pero el volumen EBS: 💾 sigue existiendo.</p>
        </section>

        <section className="lesson-section">
          <h3>22. Entonces nuestros datos pueden permanecer</h3>
          <Nota><p>Si escribimos hola.txt en un volumen persistente, detenemos la instancia y posteriormente la iniciamos de nuevo: esperamos que el contenido persistente de EBS siga disponible.</p></Nota>
          <p>Eso es precisamente una diferencia importante entre 🧮 memoria temporal y 💾 almacenamiento persistente.</p>
        </section>

        <section className="lesson-section">
          <h3>23. RAM vs EBS</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th></th><th>RAM 🧮</th><th>EBS 💾</th></tr></thead>
            <tbody>
              <tr><td>Tipo</td><td>Memoria de trabajo</td><td>Almacenamiento</td></tr>
              <tr><td>Uso</td><td>Procesos activos</td><td>Datos persistentes</td></tr>
              <tr><td>Al detener</td><td>No la pensamos como almacenamiento persistente</td><td>Datos pueden mantenerse</td></tr>
              <tr><td>Ejemplo</td><td>Programa en ejecución</td><td>Archivo guardado</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>24. Volvamos al automóvil</h3>
          <CompareCols cols={[
            { icon: 'car', title: 'EC2 Running', items: ['Motor encendido.'] },
            { icon: 'car', title: 'EC2 Stopped', items: ['Motor apagado.'] },
            { icon: 'briefcase', title: 'EBS', items: ['Cosas guardadas dentro del automóvil.'] },
          ]} />
          <p>Apagar el motor: no vacía automáticamente el maletero.</p>
        </section>

        <section className="lesson-section">
          <h3>25. ¿Y si terminamos EC2?</h3>
          <Nota><p>Aquí cambia la historia. Cuando hacemos Terminate, la instancia se elimina.</p></Nota>
          <Dialogo>¿Qué ocurre con los volúmenes?</Dialogo>
          <p>La respuesta: depende de su configuración.</p>
        </section>

        <section className="lesson-section">
          <h3>26. Delete on termination</h3>
          <Nota><p>Al configurar un volumen podemos encontrar: Delete on termination.</p></Nota>
          <Dialogo>¿Este volumen debe eliminarse automáticamente cuando la instancia sea terminada?</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>27. Si está activado</h3>
          <Flow steps={[{ icon: 'server', label: 'EC2' }, { icon: 'hard-drive', label: 'Volumen', caption: 'Delete on termination = Yes' }]} />
          <p>Terminamos EC2: 🗑️ EC2 + 🗑️ Volumen correspondiente, según esa configuración.</p>
        </section>

        <section className="lesson-section">
          <h3>28. Si no está activado</h3>
          <Nota><p>Puede ocurrir: 🗑️ EC2 terminada pero 💾 Volumen permanece.</p></Nota>
          <p>Y si permanece: 💰 puede continuar generando cargos.</p>
        </section>

        <section className="lesson-section">
          <h3>29. Primer gran error de costos</h3>
          <Nota><p>Un estudiante piensa:</p></Nota>
          <Dialogo>"Eliminé la instancia, así que no queda nada."</Dialogo>
          <p>Pero encontramos: 💾 Volumen EBS — State: available. Ese volumen todavía existe.</p>
          <Nota><p>La pregunta correcta después de eliminar recursos es: ¿qué quedó?</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>30. Estado Available</h3>
          <CompareCols cols={[
            { icon: 'hard-drive', title: 'In-use', items: ['Conectado y siendo utilizado.'] },
            { icon: 'hard-drive', title: 'Available', items: ['Existe, pero está libre.'] },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>31. "Available" no significa gratis</h3>
          <Nota><p>Available significa disponible para utilizar, no "gratis". Si el volumen está aprovisionado: 💾 sigue siendo un recurso. Y debemos revisar sus costos.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>32. Attach y Detach</h3>
          <Nota><p>En escenarios compatibles, podemos: Attach — asociar un volumen a una instancia. Y Detach — desasociarlo.</p></Nota>
          <Flow steps={[{ icon: 'server', label: 'Notebook' }, { icon: 'power', label: 'Disco externo' }]} />
          <p>Conectamos. Desconectamos. El disco sigue existiendo.</p>
        </section>

        <section className="lesson-section">
          <h3>33. No desconectamos discos alegremente</h3>
          <Nota><p>Desasociar almacenamiento mientras está siendo utilizado puede causar problemas si no seguimos un procedimiento correcto.</p></Nota>
          <p>No hacemos: "Detach porque quiero ver qué ocurre." 😈</p>
          <p>Primero debemos saber: qué datos contiene; si está montado; si una aplicación lo utiliza; si podemos retirarlo de forma segura.</p>
        </section>

        <section className="lesson-section">
          <h3>34. Aparece el snapshot</h3>
          <Nota><p>Ahora tenemos información importante dentro de 💾 EBS. Y queremos crear una copia de respaldo. Aquí aparece: EBS Snapshot.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>35. ¿Qué es un snapshot?</h3>
          <Dialogo>Un snapshot es una copia puntual de los datos de un volumen EBS que podemos utilizar para respaldo y recuperación, entre otros escenarios.</Dialogo>
          <Flow steps={[{ icon: 'hard-drive', label: 'Volumen' }, { icon: 'camera', label: 'Snapshot' }]} />
        </section>

        <section className="lesson-section">
          <h3>36. Analogía de la fotografía</h3>
          <Nota><p>Imaginemos una habitación. Hoy está así: 🛏️ cama, 🪑 silla, 📚 libros. Tomamos: 📸 una fotografía. Después movemos cosas. La fotografía conserva una imagen de cómo estaba en aquel momento.</p></Nota>
          <p>Un snapshot representa conceptualmente un punto en el tiempo del almacenamiento.</p>
        </section>

        <section className="lesson-section">
          <h3>37. Snapshot no es lo mismo que volumen</h3>
          <Nota><p>No debemos enseñar: "Snapshot = otro disco." No.</p></Nota>
          <CompareCols cols={[
            { icon: 'hard-drive', title: 'Volumen', items: ['Puede estar asociado y utilizado por una instancia.'] },
            { icon: 'camera', title: 'Snapshot', items: ['Es una copia puntual almacenada por AWS que puede utilizarse, por ejemplo, para crear nuevos volúmenes.'] },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>38. Del volumen al snapshot</h3>
          <Flow steps={[{ icon: 'hard-drive', label: 'Volumen original' }, { icon: 'camera', label: 'Snapshot' }]} />
          <p>Y posteriormente:</p>
          <Flow steps={[{ icon: 'camera', label: 'Snapshot' }, { icon: 'hard-drive', label: 'Nuevo volumen' }]} />
          <Nota><p>Esto nos da capacidad de recuperación y clonación de datos según el escenario.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>39. Caso desastre pequeño</h3>
          <Nota><p>Pedro modifica un archivo importante. Antes: version-correcta. Después: version-rota. 😱</p></Nota>
          <p>Si teníamos una estrategia de respaldo adecuada con snapshots: podemos tener un punto desde el cual recuperar información.</p>
        </section>

        <section className="lesson-section">
          <h3>40. Pero snapshot no significa "seguridad perfecta"</h3>
          <p>Tener un snapshot no elimina la necesidad de: planificar respaldos; controlar permisos; verificar recuperación; proteger información; gestionar costos; mantener varias estrategias según criticidad.</p>
          <p>Un backup que nunca hemos probado restaurar es más una promesa optimista que un plan. 🫠</p>
        </section>

        <section className="lesson-section">
          <h3>41. Los snapshots también pueden costar dinero</h3>
          <Nota><p>Podemos tener 🖥️ EC2 eliminada, 💾 EBS eliminado, pero 📸 Snapshot existente. Ese snapshot sigue siendo un recurso almacenado.</p></Nota>
          <p>Por eso nuevamente: eliminar la instancia no significa que toda la infraestructura asociada desapareció.</p>
        </section>

        <section className="lesson-section">
          <h3>42. Nuestra revisión crece</h3>
          <Nota><p>Después de un laboratorio EC2 ahora comprobamos:</p></Nota>
          <InfoBox items={['🖥️ Instancias', '💾 Volúmenes', '📸 Snapshots', '🌐 Recursos relacionados']} />
          <Dialogo>¿Necesito conservar cada uno?</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>43. Cifrado</h3>
          <Nota><p>EBS admite cifrado.</p></Nota>
          <Dialogo>🔐 El cifrado ayuda a proteger los datos almacenados utilizando mecanismos criptográficos.</Dialogo>
          <p>En la consola podemos encontrar información como: Encrypted: Yes / No.</p>
          <Nota><p>No entraremos todavía en AWS KMS en profundidad. Solo reconocemos: el almacenamiento también necesita protección.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>44. Seguridad no es solamente el Security Group</h3>
          <Nota><p>En la clase anterior protegíamos 🌐 conexiones. Ahora tenemos que pensar también en 💾 datos.</p></Nota>
          <CompareCols cols={[
            { icon: 'shield', title: 'Security Group', items: ['Protege acceso de red'] },
            { icon: 'lock', title: 'Cifrado', items: ['Protege datos almacenados'] },
          ]} />
          <p>Son controles diferentes.</p>
        </section>

        <section className="lesson-section">
          <h3>45. EBS y Zona de Disponibilidad</h3>
          <Nota><p>Los volúmenes EBS están asociados a una Zona de Disponibilidad. Esto es importante porque una instancia debe tener compatibilidad de ubicación para asociar determinados volúmenes EBS.</p></Nota>
          <Flow steps={[{ icon: 'map-pin', label: 'Región' }, { icon: 'building', label: 'AZ A', caption: '🖥️ EC2 · 💾 EBS' }]} />
          <Nota><p>No pensamos en EBS como un disco que simplemente arrastramos libremente entre cualquier ubicación sin considerar la arquitectura.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>46. Laboratorio: encontrar el volumen de nuestra instancia</h3>
          <Nota><p>Volvemos a nuestra instancia de Clase 3.</p></Nota>
          <Flow steps={[{ icon: 'server', label: 'EC2' }, { icon: 'clipboard-list', label: 'Instances' }, { icon: 'target', label: 'Seleccionar instancia' }, { icon: 'hard-drive', label: 'Storage' }]} />
          <p>Buscamos: Block devices / Volumes.</p>
        </section>

        <section className="lesson-section">
          <h3>47. Detective EBS</h3>
          <Nota><p>Cada estudiante debe identificar:</p></Nota>
          <InfoBox items={['💾 Volume ID: ____________________', '📏 Size: ____________________', '📍 Availability Zone: ____________________', '🔐 Encrypted: ____________________', '🗑️ Delete on termination: ____________________']} />
          <Nota><p>No modificamos todavía. Primero comprendemos.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>48. Entrar a Volumes</h3>
          <Nota><p>Desde EC2 podemos navegar a: Elastic Block Store → Volumes. Buscamos el volumen asociado a nuestra instancia.</p></Nota>
          <p>Observamos propiedades como: Volume ID; tamaño; estado; tipo; Zona de Disponibilidad; cifrado; instancia asociada.</p>
        </section>

        <section className="lesson-section">
          <h3>49. Actividad: EC2 o EBS</h3>
          <Quiz questions={QUIZ_EC2_O_EBS} />
        </section>

        <section className="lesson-section">
          <h3>50. Actividad: ¿qué queda?</h3>
          <QaItem question="Caso A — EC2 → Stop. ¿Qué ocurre conceptualmente con EBS?" answer="✅ El volumen puede seguir existiendo." />
          <QaItem question="Caso B — EC2 → Terminate, Delete on termination = Yes. ¿Qué esperamos?" answer="✅ Ese volumen configurado puede eliminarse junto con la instancia." />
          <QaItem question="Caso C — EC2 → Terminate, Delete on termination = No. ¿Qué puede quedar?" answer="💾 El volumen." />
          <QaItem question="Caso D — Terminamos EC2 y eliminamos EBS, pero dejamos 📸 Snapshot. ¿Todo desapareció?" answer="❌ No." />
        </section>

        <section className="lesson-section">
          <h3>51. El estudiante optimista</h3>
          <Nota><p>Carolina dice:</p></Nota>
          <Dialogo>"Detuve todas mis instancias. Mi factura será $0."</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque detener EC2 no elimina automáticamente volúmenes EBS, snapshots ni otros recursos. Esto es lo que haría en su lugar: revisar todos los recursos activos y su modelo de cobro. El riesgo de su enfoque es acumular almacenamiento olvidado durante semanas o meses.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>52. Caso CloudShop</h3>
          <Nota><p>Nuestra tienda tiene:</p></Nota>
          <Flow steps={[{ icon: 'server', label: 'EC2 Web' }, { icon: 'hard-drive', label: 'EBS 20 GiB', caption: '🐧 sistema · 🌐 página · ⚙️ configuración' }]} />
          <p>Antes de una actualización importante creamos: 📸 Snapshot. La actualización falla.</p>
          <QaItem question="¿Qué utilidad podría tener el snapshot?" answer="Ayudarnos a recuperar un estado anterior mediante un nuevo volumen u otro proceso adecuado." />
        </section>

        <section className="lesson-section">
          <h3>53. Copia no significa versión mágica</h3>
          <Nota><p>El snapshot corresponde al estado capturado en un momento. Si hacemos Lunes → Snapshot y cambiamos datos martes, miércoles, jueves, el snapshot del lunes no contiene mágicamente los cambios posteriores.</p></Nota>
          <p>Por eso las estrategias de respaldo deben tener frecuencia y planificación.</p>
        </section>

        <section className="lesson-section">
          <h3>54. Estrategia de respaldo sencilla</h3>
          <InfoBox title="💾 Datos" items={['📸 Snapshot lunes', '📸 Snapshot martes', '📸 Snapshot miércoles']} />
          <Nota><p>Más snapshots también implican recursos que debemos administrar y pueden generar costos. No hacemos copias infinitas "por si acaso".</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>55. Ciclo de vida</h3>
          <Nota><p>Una estrategia madura pregunta: ¿qué respaldo necesito? ¿Durante cuánto tiempo? ¿Cuándo puedo eliminarlo?</p></Nota>
          <ConceptBadge>Ciclo de vida de los datos</ConceptBadge>
          <p>No profundizaremos todavía, pero dejamos la semilla.</p>
        </section>

        <section className="lesson-section">
          <h3>56. Buenas prácticas básicas</h3>
          <Nota><p>Para este nivel enseñaría:</p></Nota>
          <ol className="plain-list">
            <li>💾 Aprovisionar el almacenamiento necesario.</li>
            <li>🔐 Considerar cifrado según los requisitos.</li>
            <li>📸 Mantener respaldos apropiados.</li>
            <li>🧪 Probar procesos de recuperación.</li>
            <li>🧹 Eliminar volúmenes que ya no se necesitan.</li>
            <li>🧹 Eliminar snapshots innecesarios según políticas.</li>
            <li>💰 Revisar costos.</li>
            <li>🔎 Verificar Delete on termination.</li>
          </ol>
        </section>

        <section className="lesson-section">
          <h3>57. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>58. Reto de la clase</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge>AulaCloud</ConceptBadge>
          <Flow steps={[{ icon: 'server', label: 'EC2' }, { icon: 'hard-drive', label: 'EBS 30 GiB', caption: '📄 materiales · ⚙️ configuración · 🌐 aplicación' }]} />
          <p>La docente quiere realizar una actualización importante.</p>
          <QaItem question="1. ¿Qué podría crear antes de modificar el sistema?" answer="📸 Un snapshot apropiado del volumen." />
          <QaItem question="2. Si detiene EC2, ¿el volumen necesariamente desaparece?" answer="❌ No." />
          <QaItem question="3. ¿Puede EBS seguir generando costos?" answer="✅ Sí." />
          <QaItem question="4. Si termina EC2, ¿qué debe revisar?" answer="La configuración de eliminación de los volúmenes y los recursos que permanezcan." />
          <QaItem question="5. ¿El snapshot desaparecerá automáticamente porque eliminó EC2?" answer="❌ No necesariamente." />
        </section>

        <section className="lesson-section">
          <h3>59. Reto nivel 2</h3>
          <Nota><p>Después de varios laboratorios encontramos:</p></Nota>
          <InfoBox items={['🖥️ Instancias: 0', '💾 Volúmenes: 7', '📸 Snapshots: 12']} />
          <Dialogo>"No hay ninguna instancia, así que está todo limpio."</Dialogo>
          <ConceptBadge variant="danger">Incorrecto</ConceptBadge>
          <p>Todavía existen: 💾 volúmenes; 📸 snapshots. Debemos determinar cuáles son necesarios, cuáles pueden eliminarse, qué costos pueden estar asociados.</p>
        </section>

        <section className="lesson-section">
          <h3>60. Reto: encuentra el recurso huérfano</h3>
          <InfoBox items={['EC2 A → Terminated', 'EBS A → Deleted', 'EC2 B → Terminated', 'EBS B → Available', 'Snapshot A → Exists']} />
          <QaItem question="¿Qué recursos todavía existen?" answer="💾 EBS B y 📸 Snapshot A." />
        </section>

        <section className="lesson-section">
          <h3>61. Reto oral</h3>
          <Dialogo>Explícame EBS sin utilizar las palabras disco, almacenamiento, volumen, bloque, EC2 ni guardar. 😈</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Es un servicio que conserva información persistente para que una máquina pueda seguir encontrándola incluso después de haber sido detenida."</Dialogo>
          </Reveal>
          <p style={{ marginTop: 'var(--space-4)' }}>Si llegan a algo parecido, entendieron la función.</p>
        </section>

        <section className="lesson-section">
          <h3>62. Nuestro mapa ahora está más completo</h3>
          <Flow steps={[
            { icon: 'map-pin', label: 'Usuario' },
            { icon: 'shield', label: 'Security Group' },
            { icon: 'server', label: 'EC2' },
            { icon: 'hard-drive', label: 'EBS' },
            { icon: 'camera', label: 'Snapshot' },
          ]} />
          <p>Cada pieza responde una pregunta distinta.</p>
        </section>

        <section className="lesson-section">
          <h3>63. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>🖥️ EC2</td><td>Cómputo</td></tr>
              <tr><td>💾 EBS</td><td>Almacenamiento en bloques</td></tr>
              <tr><td>📦 Volumen</td><td>Unidad de almacenamiento EBS</td></tr>
              <tr><td>💾 Root Volume</td><td>Almacenamiento principal del sistema</td></tr>
              <tr><td>🛑 Stop</td><td>Detiene EC2, no necesariamente EBS</td></tr>
              <tr><td>🗑️ Terminate</td><td>Termina la instancia</td></tr>
              <tr><td>Delete on termination</td><td>Controla eliminación asociada del volumen</td></tr>
              <tr><td>📸 Snapshot</td><td>Copia puntual de datos del volumen</td></tr>
              <tr><td>🔐 Encryption</td><td>Protección criptográfica de datos</td></tr>
              <tr><td>💰 Costos</td><td>Volúmenes y snapshots pueden generar cargos</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>64. Ticket de salida</h3>
          <Dialogo>Una instancia EC2 está Stopped. ¿Podemos asumir que ya no queda ningún recurso facturable? ¿Por qué?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>No. Pueden seguir existiendo volúmenes EBS, snapshots u otros recursos asociados que continúen generando costos.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 6</div>
          <Nota><p>Cerraría mostrando todo lo que nuestra instancia ya tiene:</p></Nota>
          <Flow steps={[{ icon: 'map-pin', label: 'Internet' }, { icon: 'shield', label: 'Security Group' }, { icon: 'server', label: 'EC2' }, { icon: 'hard-drive', label: 'EBS' }]} />
          <Dialogo>"Ya sabemos crear el servidor, controlar conexiones y guardar información. ¿Cómo sabemos si está trabajando bien, si está usando demasiados recursos o si estamos pagando por algo que nadie utiliza?"</Dialogo>
          <p>Ahí aparecen tres nuevas preguntas: 📊 ¿qué está ocurriendo? 💰 ¿cuánto me está costando? 🧹 ¿qué debo apagar o eliminar?</p>
          <ConceptBadge>Módulo 3 · Clase 6 — Estados, monitoreo, costos y buenas prácticas de EC2</ConceptBadge>
          <Nota>
            <p>Esa clase integrará estados de instancia, métricas básicas con CloudWatch, utilización de CPU, revisión de recursos y disciplina de costos, manteniendo exactamente este mismo formato.</p>
          </Nota>
          <Link to="/aprendizaje/aws-desde-cero/modulo-3/clase-6" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 6: Estados, monitoreo, costos y buenas prácticas →
          </Link>
        </div>

      </div>
    </div>
  );
}
