import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, CompareCols, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué es una Storage Class?', options: [{ text: 'Una opción de almacenamiento orientada a distintos patrones de uso.', correct: true }, { text: 'Un usuario IAM.', correct: false }, { text: 'Un servidor.', correct: false }, { text: 'Un Security Group.', correct: false }] },
  { q: '¿Qué clase relacionamos inicialmente con acceso frecuente?', options: [{ text: 'S3 Standard.', correct: true }, { text: 'Deep Archive exclusivamente.', correct: false }, { text: 'EBS.', correct: false }, { text: 'EC2.', correct: false }] },
  { q: '¿Qué significa IA?', options: [{ text: 'Intelligent AWS.', correct: false }, { text: 'Infrequent Access.', correct: true }, { text: 'Internal Access.', correct: false }, { text: 'Instance Allocation.', correct: false }] },
  { q: '¿Qué opción puede ser útil cuando el patrón de acceso es difícil de predecir?', options: [{ text: 'Intelligent-Tiering.', correct: true }, { text: 'IAM.', correct: false }, { text: 'EC2.', correct: false }, { text: 'EBS Snapshot.', correct: false }] },
  { q: '¿Qué familia se orienta a archivo de largo plazo?', options: [{ text: 'S3 Glacier.', correct: true }, { text: 'IAM.', correct: false }, { text: 'EC2.', correct: false }, { text: 'Security Groups.', correct: false }] },
  { q: '¿Qué hace una transición Lifecycle?', options: [{ text: 'Cambia el objeto a otra Storage Class.', correct: true }, { text: 'Crea un usuario.', correct: false }, { text: 'Cambia la Región automáticamente.', correct: false }, { text: 'Abre el bucket.', correct: false }] },
  { q: '¿Qué puede hacer una expiración Lifecycle?', options: [{ text: 'Eliminar automáticamente objetos según la regla.', correct: true }, { text: 'Aumentar CPU.', correct: false }, { text: 'Crear EC2.', correct: false }, { text: 'Configurar MFA.', correct: false }] },
  { q: '¿Lifecycle puede administrar versiones no actuales?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿La clase más barata siempre es la mejor opción?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Debemos considerar tiempos y costos de recuperación?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
];

export default function Modulo4Clase5() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 4 · Clase 5</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 4 · Clase 5: Storage Classes y Lifecycle, almacenar de forma inteligente</h2>
      <p className="lesson-subtitle">
        En S3 no solo preguntamos cuánto queremos guardar, sino cuánto lo utilizaremos y durante cuánto tiempo.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + comparación + laboratorio guiado + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 4 · Clases 1 a 4</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Comprender qué es una Storage Class de S3 y por qué no todos los objetos deberían almacenarse igual.</li>
            <li>Reconocer las principales clases de almacenamiento de S3.</li>
            <li>Diferenciar acceso frecuente, poco frecuente y archivo.</li>
            <li>Comprender la función de S3 Intelligent-Tiering y las familias S3 Glacier.</li>
            <li>Explicar qué es una regla de Lifecycle: transición y expiración.</li>
            <li>Aplicar Lifecycle a versiones actuales y no actuales.</li>
            <li>Relacionar decisiones de almacenamiento con costos.</li>
            <li>Detectar configuraciones que pueden encarecer o dificultar la recuperación de datos.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2. Comencemos con dos archivos</h3>
          <Nota><p><code>ventas-hoy.csv</code> se consulta todos los días. <code>respaldo-2018.zip</code> posiblemente no lo consultemos durante años.</p></Nota>
          <QaItem question="¿Tiene sentido tratar ambos exactamente igual?" answer="No necesariamente." />
        </section>

        <section className="lesson-section">
          <h3>3. Analogía de la casa</h3>
          <Nota><p>Teléfono, llaves y billetera los usamos constantemente y los dejamos a mano. Decoración navideña, documentos antiguos y recuerdos no necesitan estar sobre la mesa del comedor todo el año — podemos guardarlos en una bodega.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>4. La comodidad tiene un costo</h3>
          <CompareCols cols={[
            { emoji: '⚡', title: 'Acceso muy rápido', items: ['Mayor costo'] },
            { emoji: '🧊', title: 'Archivo de largo plazo', items: ['Recuperación más lenta'] },
          ]} />
          <Dialogo>No significa que "más barato sea mejor". Significa: elegir la opción adecuada según la necesidad.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>5. ¿Qué es una Storage Class?</h3>
          <Nota><p>Una Storage Class de Amazon S3 define características de almacenamiento orientadas a distintos patrones de acceso, resiliencia y costos.</p></Nota>
          <Dialogo>Es como elegir en qué tipo de bodega queremos guardar nuestros objetos.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>6. S3 Standard</h3>
          <Dialogo>Pensada para datos de acceso frecuente que necesitan alta disponibilidad y baja latencia.</Dialogo>
          <p>Ejemplos: contenido de aplicaciones, imágenes utilizadas constantemente, documentos descargados frecuentemente, datos activos. En una tienda online, las imágenes de productos que un cliente visita necesitan acceso frecuente — S3 Standard puede ser una alternativa apropiada.</p>
        </section>

        <section className="lesson-section">
          <h3>7. Pero no todo necesita Standard</h3>
          <Nota><p><code>backup-2015.zip</code>, que nadie ha consultado en años. Mantenerlo en una clase diseñada para acceso frecuente puede no ser la opción más económica.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>8. S3 Standard-IA</h3>
          <Dialogo>Datos que queremos mantener disponibles, pero que consultamos con poca frecuencia.</Dialogo>
          <p>Ejemplos: respaldos, documentos antiguos, información que debe conservarse pero se consulta ocasionalmente. Con acceso poco frecuente podemos obtener menor costo de almacenamiento que Standard, pero pueden existir cargos de recuperación y requisitos mínimos asociados — no movemos objetos a IA solamente porque "es más barato".</p>
        </section>

        <section className="lesson-section">
          <h3>9. S3 One Zone-IA</h3>
          <Nota><p>A diferencia de clases que almacenan datos de forma redundante en múltiples Zonas de Disponibilidad, One Zone-IA almacena los datos en una sola AZ.</p></Nota>
          <p>Puede ser apropiada para datos poco utilizados que pueden recrearse o para los que aceptamos ese nivel diferente de resiliencia. No la usamos para un único documento legal irremplazable: costos y criticidad deben evaluarse juntos.</p>
        </section>

        <section className="lesson-section">
          <h3>10. S3 Intelligent-Tiering</h3>
          <Nota><p>No sabemos si los objetos se usarán mucho o poco: hoy utilizados constantemente, el próximo mes casi nunca.</p></Nota>
          <Dialogo>Está diseñado para optimizar automáticamente costos moviendo objetos entre niveles de acceso cuando cambian sus patrones, sin impacto en rendimiento para los niveles correspondientes.</Dialogo>
          <p>No siempre lo usamos: tiene cargos de monitoreo/automatización a considerar. Si conocemos perfectamente el patrón, otra clase puede ser más apropiada. Si es impredecible, Intelligent-Tiering puede ser muy útil.</p>
        </section>

        <section className="lesson-section">
          <h3>11. La familia S3 Glacier</h3>
          <Nota><p>Datos que prácticamente nunca utilizamos: históricos legales, respaldos antiguos, material archivado, información regulatoria.</p></Nota>
          <RoleGrid roles={[
            { icon: 'zap', label: 'Glacier Instant Retrieval', desc: 'Archivo poco accedido con recuperación inmediata' },
            { icon: 'clock', label: 'Glacier Flexible Retrieval', desc: 'Tiempos de recuperación variables' },
            { icon: 'lock', label: 'Glacier Deep Archive', desc: 'Muy largo plazo, acceso extremadamente infrecuente' },
          ]} />
          <Nota><p>Un objeto en una clase de archivo sigue almacenado, pero según la clase puede existir tiempo de recuperación, costo de recuperación y duración mínima de almacenamiento. No archivamos todo sin pensar.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>12. Mapa simplificado</h3>
          <Flow steps={[
            { icon: 'zap', label: 'S3 Standard', caption: 'Frecuente' },
            { icon: 'clock', label: 'Standard-IA / One Zone-IA', caption: 'Poco frecuente' },
            { icon: 'settings', label: 'Intelligent-Tiering', caption: 'Impredecible' },
            { icon: 'lock', label: 'Glacier / Deep Archive', caption: 'Archivo' },
          ]} />
          <p>No es una escala rígida donde siempre tengamos que pasar por todas. Es un mapa conceptual.</p>
        </section>

        <section className="lesson-section">
          <h3>13. Actividad: ¿dónde lo guardarías?</h3>
          <QaItem question="Imágenes de una tienda visitadas miles de veces al día." answer="Standard puede ser apropiada." />
          <QaItem question="Backup mensual que rara vez se recupera." answer="Evaluar clases de acceso infrecuente o archivo." />
          <QaItem question="Archivo legal que quizá se consulte una vez en varios años." answer="Glacier/Deep Archive podría ser una alternativa." />
          <QaItem question="No sabemos si las fotografías serán populares o ignoradas." answer="Intelligent-Tiering puede ser una alternativa." />
        </section>

        <section className="lesson-section">
          <h3>14. Pregunta trampa</h3>
          <Dialogo>"Deep Archive es más barato, así que pongamos todo ahí." — mala decisión</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque el costo de almacenamiento es solo una parte del problema. Esto es lo que haría en su lugar: revisar frecuencia de acceso y necesidad de recuperación. El riesgo de su enfoque es necesitar un dato urgentemente y descubrir que elegimos una clase con tiempos y costos de recuperación incompatibles con el negocio.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>15. Los datos cambian con el tiempo</h3>
          <Nota><p><code>factura-2026.pdf</code>: hoy muy utilizada, en 2027 poco consultada, en 2032 probablemente archivo.</p></Nota>
          <QaItem question="¿Vamos a moverla manualmente entre 10.000.000 objetos?" answer="No vamos a revisar uno por uno. Aquí aparece S3 Lifecycle." />
        </section>

        <section className="lesson-section">
          <h3>16. ¿Qué es Lifecycle?</h3>
          <Dialogo>Le decimos a S3 qué debe hacer con los objetos cuando cumplen determinadas condiciones de edad o estado.</Dialogo>
          <p>Analogía: "Primer año → archivo activo. Después de 1 año → archivo histórico. Después de 7 años → eliminar." Una persona no necesita revisar cada documento — tenemos una política de conservación.</p>
        </section>

        <section className="lesson-section">
          <h3>17. Transition y Expiration</h3>
          <RoleGrid roles={[
            { icon: 'refresh', label: 'Transition', desc: 'Mover un objeto a otra clase de almacenamiento' },
            { icon: 'trash', label: 'Expiration', desc: 'Definir cuándo un objeto debe expirar/eliminarse' },
          ]} />
          <Flow steps={[{ icon: 'zap', label: 'S3 Standard' }, { icon: 'clock', label: 'Standard-IA', caption: '30 días' }, { icon: 'lock', label: 'Glacier', caption: '180 días' }]} />
        </section>

        <section className="lesson-section">
          <h3>18. Lifecycle puede borrar datos</h3>
          <ConceptBadge icon="alert-triangle" variant="danger">Una regla Lifecycle mal diseñada puede eliminar información automáticamente</ConceptBadge>
          <p>No hacemos "Expire after 1 day" para contratos legales solo para "probar".</p>
        </section>

        <section className="lesson-section">
          <h3>19. Las reglas necesitan alcance</h3>
          <Nota><p>Podemos aplicar Lifecycle a todo el bucket, a determinados prefijos, a objetos con tags, u otras condiciones compatibles. No necesariamente afecta todo.</p></Nota>
          <p>Ejemplo: <code>temporales/*</code> se elimina después de cierto período, pero <code>activos/*</code> no. Podemos etiquetar objetos como <code>Retencion = 7años</code> y usar esos atributos en la estrategia.</p>
        </section>

        <section className="lesson-section">
          <h3>20. Conectemos Versioning</h3>
          <p>Con Versioning, Lifecycle puede administrar también <strong>Noncurrent versions</strong> — versiones que dejaron de ser actuales. Por ejemplo: la versión actual (V4) en Standard, y V1-V3 después de cierto tiempo a otra clase o eliminadas.</p>
          <Nota><p>Si la empresa dice "debemos conservar todas las versiones durante 7 años", no creamos "Delete noncurrent versions after 30 days" — hay un conflicto directo con el negocio. La tecnología sigue requisitos, no al revés.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>21. Lifecycle y costos</h3>
          <Nota><p>10 TB de datos que ya casi no se utilizan, mantenidos en una clase de acceso frecuente durante años, puede no ser eficiente. Una regla Lifecycle podría moverlos automáticamente a clases apropiadas.</p></Nota>
          <p>Pero si un objeto sigue siendo utilizado diariamente después de cinco años, archivarlo automáticamente solo porque es antiguo sería absurdo. Antigüedad y frecuencia de acceso no son exactamente lo mismo.</p>
        </section>

        <section className="lesson-section">
          <h3>22. Lifecycle no lee nuestra mente</h3>
          <Dialogo>AWS ejecutará la regla que configuramos. No la regla que queríamos configurar.</Dialogo>
          <p>Antes de habilitar una Lifecycle Rule debemos comprobar: alcance, días, versiones, clase destino, expiración.</p>
        </section>

        <section className="lesson-section">
          <h3>23. Laboratorio: revisar Storage Class</h3>
          <Nota><p>Entramos a uno de nuestros objetos y buscamos Storage class — probablemente veamos S3 Standard según cómo fue cargado.</p></Nota>
          <InfoBox items={['Bucket: ____________________', 'Object: ____________________', 'Key: ____________________', 'Storage Class: ____________________', 'Size: ____________________', 'Versioning: ____________________']} />
        </section>

        <section className="lesson-section">
          <h3>24. Laboratorio: crear una regla Lifecycle</h3>
          <Nota><p>Ruta conceptual: S3 → Bucket → Management → Lifecycle rules → Create lifecycle rule.</p></Nota>
          <p>Nombre descriptivo, por ejemplo <code>archivar-documentos-antiguos</code> (no <code>regla1</code>). Alcance: usamos un prefijo específico como <code>laboratorio-lifecycle/</code> para evitar afectar accidentalmente otros objetos — el laboratorio debe ser desechable por diseño.</p>
        </section>

        <section className="lesson-section">
          <h3>25. Configurar transición y expiración</h3>
          <p>Configuramos: 1) seleccionar alcance, 2) elegir acción, 3) establecer período, 4) identificar clase destino. El objeto no cambiará durante los siguientes cinco minutos si configuramos "Transition after 30 days" — la actividad es de diseño y comprensión.</p>
          <ConceptBadge icon="alert-triangle" variant="warning">Expire current versions puede producir eliminación automática — no configuramos expiraciones peligrosas sobre objetos que necesitemos conservar</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>26. Actividad: diseña Lifecycle</h3>
          <Nota><p>Requisitos para <code>logs/</code>: primeros 30 días uso frecuente, después consulta ocasional, después de 1 año archivo, después de 7 años eliminar.</p></Nota>
          <Reveal label="Ver diseño esperado">
            <Flow steps={[
              { icon: 'zap', label: 'Standard' },
              { icon: 'clock', label: 'IA', caption: '30 días' },
              { icon: 'lock', label: 'Archive', caption: '365 días' },
              { icon: 'trash', label: 'Expire', caption: '7 años' },
            ]} />
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>27. El jefe quiere ahorrar inmediatamente</h3>
          <Dialogo>"Muevan todos los datos a Deep Archive esta noche."</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque no sabemos qué objetos necesitan acceso rápido. Esto es lo que haría en su lugar: clasificar datos por patrón de acceso y requisitos de recuperación. El riesgo de su enfoque es ahorrar almacenamiento mientras bloqueamos operativamente a quienes necesitan datos con rapidez.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>28. Otro error: Lifecycle sin filtro</h3>
          <Dialogo>Pedro quiere configurar "All objects → Expire after 30 days" en documentos-empresa.</Dialogo>
          <Nota><p>Una regla sobre todo el bucket puede afectar millones de objetos. Primero debemos comprobar qué objetos pretende administrar realmente.</p></Nota>
          <ConceptBadge icon="target">Primero define qué objetos. Después define qué acción. Finalmente define cuándo.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>29. Seguridad y versioning siguen importando</h3>
          <p>Cambiar Storage Class no cambia automáticamente quién tiene acceso al objeto: un dato en Deep Archive puede seguir siendo privado. Storage Class y permisos son problemas diferentes. Y mover la versión actual a otra clase no significa que todas las versiones antiguas sigan el mismo tratamiento — configuramos current y noncurrent versions por separado.</p>
        </section>

        <section className="lesson-section">
          <h3>30. El costo total tiene varias piezas</h3>
          <InfoBox items={['Almacenamiento', 'Recuperación', 'Solicitudes', 'Transferencia', 'Duración']} />
          <p>No es "solo precio por GB". Algunas clases tienen duraciones mínimas y cargos asociados — subir hoy, archivar mañana y eliminar pasado mañana puede ser económicamente poco eficiente.</p>
        </section>

        <section className="lesson-section">
          <h3>31. No existe una clase "correcta" universal</h3>
          <Nota><p>Dos empresas pueden guardar <code>factura.pdf</code> y necesitar cosas completamente distintas: Empresa A la consulta diariamente, Empresa B la conserva únicamente por obligación legal. Mismo tipo de archivo, distinto patrón, distinta decisión.</p></Nota>
          <Dialogo>Si no conocemos el uso, debemos medir o utilizar herramientas apropiadas. No adivinamos.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>32. Checklists antes de decidir</h3>
          <InfoBox title="Storage Class" items={['¿Con qué frecuencia se accede?', '¿Qué tan rápido debe recuperarse?', '¿Puede recrearse?', '¿Cuánto tiempo debe conservarse?', '¿Qué nivel de resiliencia necesita?', '¿Cuánto cuesta almacenarlo y recuperarlo?']} />
          <InfoBox title="Lifecycle" items={['¿Qué objetos afectará?', '¿Prefijo o tags?', '¿Versioning está habilitado?', '¿Afectará versiones antiguas?', '¿Qué transición realizará y cuándo?', '¿Eliminará datos?', '¿Cumple retención del negocio?']} />
        </section>

        <section className="lesson-section">
          <h3>33. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>34. Reto de la clase</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge icon="trophy">Universidad Cloud</ConceptBadge>
          <InfoBox items={['material-actual/ — uso diario', 'grabaciones-antiguas/ — pocas veces al año', 'documentos-legales/ — conservar 10 años, consulta excepcional', 'temporales/ — eliminar después de 90 días']} />
          <Reveal label="Ver posible solución">
            <ul className="plain-list">
              <li>material-actual/ → clase de acceso frecuente</li>
              <li>grabaciones-antiguas/ → acceso infrecuente o archivo según recuperación requerida</li>
              <li>documentos-legales/ → archivo de largo plazo apropiado</li>
              <li>temporales/ → Lifecycle con Expiration a 90 días</li>
            </ul>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>35. Reto nivel 2 y de diagnóstico</h3>
          <QaItem question="Bucket con manual.pdf V1-V5 (actual). Necesitan versión actual rápida, versiones anteriores un año, versiones antiguas poco consultadas. ¿Qué diseñarías?" answer="Mantener la versión actual en una clase apropiada para uso activo y configurar Lifecycle para las versiones no actuales según la política de retención y acceso." />
          <QaItem question="Prefix contratos/ con Transition a Deep Archive after 1 day. Al día siguiente Finanzas necesita abrir contratos constantemente. ¿Problema?" answer="La regla no corresponde al patrón real de acceso. Solución: revisar requisitos y corregir Lifecycle, no culpar a S3." />
        </section>

        <section className="lesson-section">
          <h3>36. Pregunta trampa final</h3>
          <Dialogo>"Si uso Lifecycle ya no tengo que administrar S3."</Dialogo>
          <Nota><p>Lifecycle automatiza reglas. Nosotros seguimos necesitando: revisar políticas, validar resultados, monitorear costos, actualizar requisitos, verificar retención.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>37. Reto oral</h3>
          <Dialogo>Explícame Lifecycle sin usar las palabras S3, automático, objeto, almacenamiento, clase, regla, tiempo, mover ni eliminar.</Dialogo>
          <Reveal label="Ver una buena respuesta">
            <Dialogo>"Es definir de antemano qué debe ocurrir con nuestra información cuando envejece o deja de utilizarse de la misma manera."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>38. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>S3 Standard</td><td>Acceso frecuente</td></tr>
              <tr><td>Standard-IA</td><td>Acceso poco frecuente</td></tr>
              <tr><td>One Zone-IA</td><td>Poco frecuente en una AZ</td></tr>
              <tr><td>Intelligent-Tiering</td><td>Ajusta niveles según uso</td></tr>
              <tr><td>Glacier</td><td>Archivo</td></tr>
              <tr><td>Deep Archive</td><td>Archivo de muy largo plazo</td></tr>
              <tr><td>Lifecycle</td><td>Administra el ciclo de vida</td></tr>
              <tr><td>Transition</td><td>Cambia Storage Class</td></tr>
              <tr><td>Expiration</td><td>Expira/elimina según regla</td></tr>
              <tr><td>Noncurrent</td><td>Versiones anteriores</td></tr>
              <tr><td>Costo</td><td>Depende de almacenamiento y uso</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>39. Ticket de salida</h3>
          <Dialogo>Tengo un respaldo que casi nunca consulto, pero debo conservar durante siete años. ¿Qué preguntas debería responder antes de elegir una Storage Class?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Con qué frecuencia se utilizará, cuánto puedo esperar para recuperarlo, cuánto tiempo debo conservarlo, qué nivel de protección necesita y cuáles son los costos de almacenamiento y recuperación.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 6</div>
          <Nota><p>Cerraría mostrando todo lo que ya sabemos:</p></Nota>
          <RoleGrid roles={[
            { icon: 'package', label: 'Objetos', desc: '' },
            { icon: 'key', label: 'Keys', desc: '' },
            { icon: 'lock', label: 'Permisos', desc: '' },
            { icon: 'clock', label: 'Versioning', desc: '' },
            { icon: 'dollar-sign', label: 'Storage Classes', desc: '' },
            { icon: 'refresh', label: 'Lifecycle', desc: '' },
          ]} />
          <Dialogo>"¿Podemos crear ahora un repositorio S3 completo y tomar todas estas decisiones sin seguir una receta paso a paso?"</Dialogo>
          <p>Ese será el desafío final.</p>
          <ConceptBadge icon="trophy">Módulo 4 · Clase 6 — Laboratorio integrador: diseña y administra un repositorio completo en Amazon S3</ConceptBadge>
          <Nota>
            <p>Esa última clase debería integrar creación del bucket, organización por keys, permisos, versionado, recuperación, Storage Classes, Lifecycle, costos y limpieza, con un caso práctico completo en lugar de agregar teoría nueva.</p>
          </Nota>
          <span className="tag tag-outline">Módulo 4 · Clase 6 · próximamente</span>
        </div>

      </div>
    </div>
  );
}
