import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué permite S3 Versioning?', options: [{ text: 'Mantener múltiples versiones de un objeto.', correct: true }, { text: 'Crear EC2.', correct: false }, { text: 'Crear usuarios.', correct: false }, { text: 'Abrir puertos.', correct: false }] },
  { q: '¿Qué identifica una versión concreta?', options: [{ text: 'Version ID.', correct: true }, { text: 'Security Group.', correct: false }, { text: 'IP.', correct: false }, { text: 'Key Pair.', correct: false }] },
  { q: 'Si subimos una nueva versión con la misma key en un bucket versionado, ¿la anterior puede permanecer?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Qué crea normalmente un Delete simple en un bucket con Versioning Enabled?', options: [{ text: 'Delete Marker.', correct: true }, { text: 'EC2.', correct: false }, { text: 'Snapshot.', correct: false }, { text: 'IAM Role.', correct: false }] },
  { q: '¿Delete Marker contiene los datos completos del objeto?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Eliminar el Delete Marker puede hacer reaparecer una versión anterior?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Eliminar una versión específica mediante su Version ID puede ser permanente?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Cada versión es solamente la diferencia respecto de la anterior?', options: [{ text: 'Sí.', correct: false }, { text: 'No. Cada versión se almacena como objeto completo.', correct: true }] },
  { q: '¿Suspender Versioning elimina automáticamente las versiones anteriores?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Versioning puede aumentar costos de almacenamiento?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
];

export default function Modulo4Clase4() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 4 · Clase 4</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 4 · Clase 4: Versioning, recuperación y protección frente a errores</h2>
      <p className="lesson-subtitle">
        Con Versioning, S3 puede conservar distintas versiones de un mismo objeto para ayudarnos a volver atrás cuando algo sale mal.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + laboratorio guiado + recuperación + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 4 · Clases 1 a 3</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es S3 Versioning y qué significa una versión de un objeto.</li>
            <li>Diferenciar versión actual y versiones anteriores, y reconocer un Version ID.</li>
            <li>Comprender qué ocurre al sobrescribir o eliminar un objeto en un bucket con Versioning.</li>
            <li>Explicar qué es un Delete Marker y recuperar conceptualmente una versión anterior.</li>
            <li>Diferenciar eliminación lógica y eliminación permanente.</li>
            <li>Reconocer que las versiones consumen almacenamiento y pueden generar costos.</li>
            <li>Comprender qué ocurre al suspender Versioning y relacionarlo con Lifecycle.</li>
            <li>Reconocer que Versioning no reemplaza todas las estrategias de respaldo.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2. Comencemos con un accidente</h3>
          <Nota><p>Tenemos <code>materiales-curso/evaluaciones/evaluacion.pdf</code> con fecha correcta "30 de agosto". Camila modifica accidentalmente el archivo, ahora dice "30 de diciembre", y vuelve a subirlo usando la misma key.</p></Nota>
          <Dialogo>¿Qué ocurrió con el archivo anterior?</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>3. Sin Versioning</h3>
          <Nota><p>En un bucket sin versionado habilitado, una nueva escritura sobre la misma key puede reemplazar el objeto anterior desde la perspectiva normal de uso.</p></Nota>
          <Flow steps={[{ icon: 'file-text', label: 'evaluacion.pdf — versión correcta' }, { icon: 'refresh', label: 'sobrescribir' }, { icon: 'file-text', label: 'evaluacion.pdf — versión equivocada' }]} />
          <p>La anterior puede no quedar disponible para recuperar mediante Versioning.</p>
        </section>

        <section className="lesson-section">
          <h3>4. Aquí aparece S3 Versioning</h3>
          <Nota><p>S3 Versioning permite conservar múltiples variantes de un objeto dentro del mismo bucket. Puede utilizarse para recuperar objetos frente a sobrescrituras o eliminaciones accidentales.</p></Nota>
          <Dialogo>Versioning guarda el historial de distintas versiones de un objeto.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>5. En S3</h3>
          <Flow steps={[{ icon: 'key', label: 'informe.pdf' }, { icon: 'file-text', label: 'Versión A' }, { icon: 'file-text', label: 'Versión B' }, { icon: 'file-text', label: 'Versión C' }]} />
          <p>Una sola key puede tener varias versiones asociadas cuando Versioning está habilitado. No necesitamos crear <code>informe-v1.pdf</code>, <code>informe-v2.pdf</code>, <code>informe-v3-final-final.pdf</code> — S3 puede gestionar versiones bajo la misma key.</p>
        </section>

        <section className="lesson-section">
          <h3>6. Version ID</h3>
          <Dialogo>Es un identificador que permite distinguir una versión de otra.</Dialogo>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Función</th></tr></thead>
            <tbody>
              <tr><td>Key</td><td>Identifica el objeto lógico</td></tr>
              <tr><td>Version ID</td><td>Identifica una versión concreta</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>7. Estados de Versioning</h3>
          <Nota><p>Un bucket S3 puede encontrarse en: nunca versionado, Versioning habilitado, Versioning suspendido. AWS señala que Versioning está deshabilitado inicialmente y debe habilitarse explícitamente.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>8. Habilitamos Versioning</h3>
          <p>A partir de entonces, nuevas escrituras sobre la misma key pueden generar nuevas versiones en lugar de reemplazar físicamente las anteriores.</p>
          <Flow steps={[{ icon: 'upload', label: 'Version A — informe.txt' }, { icon: 'refresh', label: 'sobrescribimos' }, { icon: 'upload', label: 'Version B — actual' }]} />
          <p>AWS conserva ambas versiones.</p>
        </section>

        <section className="lesson-section">
          <h3>9. Current Version y Noncurrent Versions</h3>
          <RoleGrid roles={[
            { icon: 'trophy', label: 'Current Version', desc: 'La que S3 entrega por defecto sin especificar Version ID' },
            { icon: 'refresh', label: 'Noncurrent Versions', desc: 'Versiones anteriores que siguen almacenadas' },
          ]} />
          <p>Si descubrimos que la versión actual está mal, podemos recuperar una anterior y utilizarla nuevamente — una máquina del tiempo parcial.</p>
        </section>

        <section className="lesson-section">
          <h3>10. Ahora viene Delete</h3>
          <Nota><p>En una eliminación simple sin especificar Version ID, S3 normalmente no elimina permanentemente las versiones existentes. Inserta un <strong>Delete Marker</strong>, que pasa a ser la versión actual.</p></Nota>
          <Flow steps={[{ icon: 'file-text', label: 'Version A' }, { icon: 'file-text', label: 'Version B' }, { icon: 'x-circle', label: 'Delete Marker — actual' }]} />
        </section>

        <section className="lesson-section">
          <h3>11. El archivo parece desaparecer</h3>
          <Nota><p>Como el Delete Marker es la versión actual, una solicitud GET sin Version ID puede responder 404 Not Found. Para el estudiante parece eliminado, pero debajo las versiones anteriores pueden seguir existiendo.</p></Nota>
          <Dialogo>Cerramos una puerta con "NO DISPONIBLE", pero los documentos siguen detrás.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>12. ¿Podemos "deseliminar" el objeto?</h3>
          <QaItem question="¿Podemos deshacer un Delete Marker?" answer="Sí, en determinados casos. Si eliminamos el Delete Marker actual, una versión anterior puede volver a aparecer como la versión actual visible. La versión nunca había sido destruida." />
        </section>

        <section className="lesson-section">
          <h3>13. Eliminación lógica vs permanente</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Operación</th><th>Efecto</th></tr></thead>
            <tbody>
              <tr><td>Delete simple en bucket versionado</td><td>Normalmente crea Delete Marker</td></tr>
              <tr><td>Delete con Version ID específico</td><td>Puede eliminar esa versión permanentemente</td></tr>
            </tbody>
          </table>
          <Nota><p>No hacemos "voy a borrar una versión para ver qué pasa" — esa versión puede desaparecer de verdad. Versioning ayuda frente a errores. No nos hace inmortales.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>14. Permisos diferentes para eliminar</h3>
          <p>En S3 existen acciones diferentes: <code>s3:DeleteObject</code> y <code>s3:DeleteObjectVersion</code>. Esto permite aplicar mínimo privilegio también a la gestión de versiones — Camila puede necesitar leer y subir nuevas versiones, pero no borrar versiones históricas permanentemente.</p>
        </section>

        <section className="lesson-section">
          <h3>15. Ahora aparece el costo</h3>
          <Nota><p>Cada versión almacenada es el objeto completo. Las tarifas normales de S3 aplican a cada versión almacenada y transferida.</p></Nota>
          <p>Un <code>informe.pdf</code> de 100 MB con 5 versiones no es 100 MB almacenados, sino aproximadamente 500 MB. Con videos de 10 GB y 10 versiones podemos terminar conservando una cantidad considerable de información.</p>
          <Dialogo>Versioning necesita administración.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>16. Aquí aparece Lifecycle</h3>
          <Nota><p>En la próxima clase veremos S3 Lifecycle, que puede ayudarnos a automatizar qué hacer con versiones actuales, versiones no actuales, objetos antiguos y delete markers.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>17. ¿Podemos desactivar Versioning?</h3>
          <p>Una vez habilitado, normalmente no volvemos al estado "nunca versionado"; podemos <strong>Suspend</strong> el Versioning. AWS distingue entre buckets no versionados, versionados y con versionado suspendido.</p>
          <Nota><p>Suspender no elimina las versiones existentes. La suspensión afecta el comportamiento futuro — no es una máquina trituradora retroactiva.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>18. No usamos Suspend para "ahorrar inmediatamente"</h3>
          <Dialogo>"Tenemos muchas versiones. Suspendamos Versioning y desaparecen." — Pedro</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque suspender Versioning no elimina las versiones antiguas que ya existen. Esto es lo que haría en su lugar: revisar las versiones existentes y diseñar reglas Lifecycle apropiadas. El riesgo de su enfoque es pensar que redujo almacenamiento cuando las versiones continúan almacenadas y potencialmente facturándose.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>19. Versioning no reemplaza un backup completo</h3>
          <Nota><p>Versioning es muy útil frente a sobrescrituras accidentales, eliminaciones accidentales y determinados fallos de aplicaciones. Pero una estrategia de protección de datos puede requerir además: separación de cuentas, replicación, retención, Object Lock, políticas de respaldo, pruebas de restauración.</p></Nota>
          <p>No enseñamos "Versioning = backup perfecto".</p>
        </section>

        <section className="lesson-section">
          <h3>20. Protección adicional: Object Lock</h3>
          <p>Más adelante existen mecanismos como S3 Object Lock, que pueden ayudar a impedir que determinadas versiones sean eliminadas o sobrescritas durante períodos configurados.</p>
          <Dialogo>Versioning conserva versiones. Object Lock agrega otro tipo de protección.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>21. Laboratorio: habilitar Versioning</h3>
          <Nota><p>Ruta conceptual: S3 → Bucket → Properties → Bucket Versioning → Edit → Enable.</p></Nota>
          <QaItem question="Antes de habilitar, ¿qué preguntamos?" answer="¿Es el bucket correcto? ¿Entendemos que las futuras versiones consumirán almacenamiento? ¿Es un laboratorio?" />
        </section>

        <section className="lesson-section">
          <h3>22. Crear versiones y recuperar</h3>
          <p>Creamos <code>versiones.txt</code> con "Esta es la versión 1", lo subimos, modificamos a "Esta es la versión 2" y lo volvemos a subir con la misma key. En la consola activamos <strong>Show versions</strong> para ver ambas asociadas a la misma key.</p>
        </section>

        <section className="lesson-section">
          <h3>23. Detective de versiones</h3>
          <InfoBox items={['Key: ________________', 'Version ID 1: ________________', 'Version ID 2: ________________', 'Versión actual: ________________', 'Fecha versión anterior: ________________']} />
        </section>

        <section className="lesson-section">
          <h3>24. Actividad: error humano</h3>
          <Nota><p>Modificamos el objeto a "VERSIÓN EQUIVOCADA" y lo subimos: Version 1, Version 2, Version 3 (incorrecta).</p></Nota>
          <QaItem question="¿Perdimos Version 2?" answer="No. Podemos tomar Version 2 y restaurarla mediante un procedimiento adecuado, creando nuevamente una versión actual correcta (por ejemplo Version 4)." />
        </section>

        <section className="lesson-section">
          <h3>25. Laboratorio de Delete Marker</h3>
          <p>Eliminamos el objeto usando el flujo normal de S3: en el bucket aparentará desaparecer. Activamos Show versions y observamos el Delete Marker junto a las versiones anteriores.</p>
          <QaItem question="¿Desaparecieron las versiones anteriores?" answer="No. El objeto parece eliminado porque el Delete Marker es actual." />
          <p>En el laboratorio, eliminamos cuidadosamente el Delete Marker (no las versiones del objeto) y una versión anterior puede volver a aparecer como actual. No seleccionamos todo y presionamos Delete — podríamos eliminar versiones reales.</p>
        </section>

        <section className="lesson-section">
          <h3>26. Pedro quiere limpiar</h3>
          <Dialogo>Pedro selecciona Version 1, Version 2, Version 3 y Delete Marker: "Los borremos todos."</Dialogo>
          <Nota><p>Eso elimina justamente aquello que Versioning estaba protegiendo. Primero debemos entender qué queremos conservar.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>27. Actividad: ¿qué ocurre?</h3>
          <QaItem question="Versioning Enabled. Subo mismo archivo dos veces." answer="Dos versiones." />
          <QaItem question="Versioning Enabled. Delete normal." answer="Delete Marker." />
          <QaItem question="Elimino Delete Marker." answer="Una versión anterior puede volver a ser visible." />
          <QaItem question="Elimino una versión especificando su Version ID." answer="Esa versión puede eliminarse permanentemente." />
          <QaItem question="Suspend Versioning." answer="Las versiones antiguas no desaparecen automáticamente." />
        </section>

        <section className="lesson-section">
          <h3>28. Actividad de costos</h3>
          <Nota><p>video.mp4 = 5 GB. Creamos Version A, B y C, cada una de 5 GB.</p></Nota>
          <QaItem question="¿Cuánto contenido estamos conservando conceptualmente?" answer="≈ 15 GB. Cada versión completa cuenta para almacenamiento." />
        </section>

        <section className="lesson-section">
          <h3>29. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>30. Reto de la clase</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge icon="trophy">Empresa CloudDocs</ConceptBadge>
          <p>Bucket <code>documentos-empresa</code> con <code>contrato.pdf</code>: Version A → correcta, Version B → corregida, Version C → error, Delete Marker.</p>
          <QaItem question="¿Cuál aparece actualmente?" answer="El objeto puede aparecer eliminado porque el Delete Marker es actual." />
          <QaItem question="¿Se perdieron A, B y C?" answer="No necesariamente. Siguen como versiones anteriores." />
          <QaItem question="¿Cómo recuperarías B?" answer="Eliminando cuidadosamente el Delete Marker, o recuperando/copiando la versión B mediante un procedimiento controlado." />
          <QaItem question="¿Eliminarías A y B inmediatamente?" answer="No. Primero debemos conocer la política de retención." />
        </section>

        <section className="lesson-section">
          <h3>31. Reto nivel 2 y de diagnóstico</h3>
          <QaItem question="backup.zip de 20 GB con 50 versiones. ¿Tenemos solamente 20 GB almacenados?" answer="No. Las versiones completas consumen almacenamiento. Necesitamos revisar necesidad, costos y Lifecycle." />
          <QaItem question="documentos/manual.pdf no aparece, pero Show versions muestra Version A, Version B y Delete Marker. ¿Qué ocurrió?" answer="El objeto fue eliminado mediante una operación que creó un Delete Marker." />
        </section>

        <section className="lesson-section">
          <h3>32. Reto oral</h3>
          <Dialogo>Explícame Versioning sin usar las palabras versión, S3, historial, objeto, archivo, recuperar, copia, bucket ni eliminar.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Es conservar distintos estados de la misma información a medida que cambia, para poder volver a uno anterior si ocurre un error."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>33. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Versioning</td><td>Conserva múltiples estados del mismo objeto</td></tr>
              <tr><td>Version ID</td><td>Identifica una versión</td></tr>
              <tr><td>Current Version</td><td>Versión actual</td></tr>
              <tr><td>Noncurrent Version</td><td>Versión anterior</td></tr>
              <tr><td>Delete Marker</td><td>Hace que el objeto parezca eliminado</td></tr>
              <tr><td>Recovery</td><td>Volver a una versión anterior</td></tr>
              <tr><td>Delete Version</td><td>Puede eliminar permanentemente una versión</td></tr>
              <tr><td>Suspend</td><td>Detiene nuevo versionado normal, no borra historial</td></tr>
              <tr><td>Costos</td><td>Cada versión almacenada cuenta</td></tr>
              <tr><td>Lifecycle</td><td>Ayuda a gestionar versiones con el tiempo</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>34. Ticket de salida</h3>
          <Dialogo>Eliminé accidentalmente un objeto de un bucket con Versioning habilitado. ¿Significa necesariamente que todas sus versiones fueron destruidas?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>No. Una eliminación normal puede crear un Delete Marker mientras las versiones anteriores permanecen almacenadas y pueden recuperarse.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 5</div>
          <Nota><p>Cerraría mostrando todo lo que ya sabemos:</p></Nota>
          <RoleGrid roles={[
            { icon: 'file-text', label: 'Versión actual', desc: '' },
            { icon: 'refresh', label: 'Versiones anteriores', desc: '' },
            { icon: 'x-circle', label: 'Delete Marker', desc: '' },
          ]} />
          <Dialogo>"¿Tenemos que revisar manualmente cada objeto durante los próximos diez años para decidir qué conservar?"</Dialogo>
          <p>No. Además aparece otro problema: datos usados diariamente vs. datos casi nunca consultados. ¿Deberían costar y almacenarse exactamente de la misma manera?</p>
          <ConceptBadge icon="dollar-sign">Módulo 4 · Clase 5 — Storage Classes y Lifecycle: almacenar de forma inteligente</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-4/clase-5" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 5: Storage Classes y Lifecycle →
          </Link>
        </div>

      </div>
    </div>
  );
}
