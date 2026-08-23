import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, Flow, InfoBox, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué debemos crear primero para almacenar objetos en S3?', options: [{ text: 'Bucket', correct: true }, { text: 'EC2', correct: false }, { text: 'EBS', correct: false }, { text: 'Security Group', correct: false }] },
  { q: '¿Qué es una object key?', options: [{ text: 'Identificador del objeto dentro del bucket.', correct: true }, { text: 'Una contraseña.', correct: false }, { text: 'Un Key Pair EC2.', correct: false }, { text: 'Una Región.', correct: false }] },
  { q: '¿Las "carpetas" de S3 funcionan exactamente como las de Windows?', options: [{ text: 'Sí.', correct: false }, { text: 'No, S3 utiliza keys y prefijos.', correct: true }] },
  { q: '¿Qué operación usamos para enviar un objeto desde nuestro computador a S3?', options: [{ text: 'Upload', correct: true }, { text: 'Download', correct: false }, { text: 'Stop', correct: false }, { text: 'Launch', correct: false }] },
  { q: '¿Qué operación trae el objeto hacia nuestro equipo?', options: [{ text: 'Upload', correct: false }, { text: 'Download', correct: true }, { text: 'Terminate', correct: false }, { text: 'Attach', correct: false }] },
  { q: 'Si una URL de objeto muestra Access Denied, ¿debemos hacer público el bucket inmediatamente?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Mover un objeto puede implicar cambiar su key?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Eliminar un objeto siempre puede revertirse fácilmente?', options: [{ text: 'Sí.', correct: false }, { text: 'No, depende de la configuración y versión.', correct: true }] },
  { q: '¿Un bucket privado puede contener objetos correctamente?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿S3 puede generar costos por almacenamiento y uso?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
];

export default function Modulo4Clase2() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 4 · Clase 2</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 4 · Clase 2: Crear nuestro primer bucket y trabajar con objetos</h2>
      <p className="lesson-subtitle">
        Primer laboratorio S3 completo: crear bucket, subir, descargar, copiar y eliminar objetos, comprendiendo keys y prefijos.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Laboratorio guiado + reconocimiento + actividades + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 4 · Clase 1</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Crear un bucket de Amazon S3 y elegir correctamente una Región.</li>
            <li>Comprender por qué el nombre del bucket debe ser válido y único.</li>
            <li>Reconocer configuraciones básicas al crear un bucket.</li>
            <li>Subir, descargar, copiar, mover conceptualmente y eliminar objetos.</li>
            <li>Identificar la key de un objeto y usar prefijos para organizar contenido.</li>
            <li>Comprender que eliminar un objeto no siempre significa que desaparece para siempre si existe versionado.</li>
            <li>Aplicar una rutina de limpieza al terminar el laboratorio.</li>
          </ul>
          <p>La frase que debe sobrevivir será:</p>
          <Dialogo>En S3 no guardamos "archivos en carpetas" como en Windows; almacenamos objetos identificados por keys dentro de buckets.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Recordemos la Clase 1</h3>
          <Flow steps={[{ icon: 'package', label: 'Amazon S3' }, { icon: 'package', label: 'Bucket' }, { icon: 'file-text', label: 'Objetos' }]} />
          <p>Y cada objeto tiene una Object Key, por ejemplo: <code>modulo4/clase2/ejemplo.pdf</code>. Hoy vamos a construirlo de verdad.</p>
        </section>

        <section className="lesson-section">
          <h3>3. Nuestro mapa del laboratorio</h3>
          <Flow steps={[
            { icon: 'package', label: 'Amazon S3' },
            { icon: 'package', label: 'Create bucket' },
            { icon: 'map-pin', label: 'Región' },
            { icon: 'lock', label: 'Seguridad básica' },
            { icon: 'rocket', label: 'Crear' },
            { icon: 'upload', label: 'Upload' },
            { icon: 'file-text', label: 'Object' },
            { icon: 'key', label: 'Key' },
            { icon: 'upload', label: 'Download' },
            { icon: 'trash', label: 'Delete' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>4. Regla de costos antes de empezar</h3>
          <Nota><p>Aunque el laboratorio utilizará objetos pequeños, S3 es un servicio con precios asociados. El costo puede depender de cantidad almacenada, solicitudes, transferencia, clase de almacenamiento y otras funciones.</p></Nota>
          <Dialogo>Crear → probar → revisar → limpiar.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>5. Paso 1: comprobar la Región</h3>
          <Nota><p>Al crear un bucket debemos elegir una Región. Importa por aspectos como: ubicación de datos, latencia, costos, requisitos legales o regulatorios y arquitectura.</p></Nota>
          <p>No elegimos una Región por decoración. En laboratorio, todos usarán la Región indicada por la docente.</p>
        </section>

        <section className="lesson-section">
          <h3>6. Paso 2: Create bucket</h3>
          <QaItem question="¿Qué vamos a crear?" answer="Un contenedor lógico para objetos. No un servidor, no un volumen EBS, no una base de datos." />
        </section>

        <section className="lesson-section">
          <h3>7. Paso 3: nombre del bucket</h3>
          <Nota><p>Debemos elegir un nombre válido, único dentro del espacio de nombres aplicable. Ejemplo: <code>curso-aws-modulo4-grupo01-2026</code>.</p></Nota>
          <p>Evitamos nombres demasiado genéricos como <code>fotos</code>, <code>documentos</code> o <code>backup</code> — probablemente no estén disponibles. Y no ponemos secretos en el nombre: no es una caja fuerte, es un identificador.</p>
        </section>

        <section className="lesson-section">
          <h3>8. Paso 4: Object Ownership</h3>
          <Nota><p>Veremos configuraciones relacionadas con propiedad de objetos y ACL. AWS ofrece mecanismos modernos para administrar propiedad y permisos sin depender necesariamente de ACL tradicionales.</p></Nota>
          <p>En laboratorio utilizaremos la configuración recomendada por AWS y la docente. La seguridad detallada será la Clase 3.</p>
        </section>

        <section className="lesson-section">
          <h3>9. Paso 5: Block Public Access</h3>
          <Nota><p>No lo desactivaremos "para que funcione". Para esta clase mantendremos el bucket privado.</p></Nota>
          <ConceptBadge icon="lock">No desactivar Block Public Access solo porque no podemos abrir un objeto en el navegador</ConceptBadge>
          <p>Si algo no es accesible, eso puede ser exactamente lo esperado. La seguridad se configura según necesidad, no según frustración.</p>
        </section>

        <section className="lesson-section">
          <h3>10. Paso 6: Versioning, Tags y Encryption</h3>
          <p>También encontraremos <strong>Bucket Versioning</strong> (solo lo reconoceremos hoy; la Clase 4 estará dedicada a versionado), <strong>Tags</strong> (por ejemplo <code>Curso = AWSDesdeCero</code>) y <strong>Encryption</strong> (S3 ofrece cifrado del lado del servidor, con opciones predeterminadas y configurables; no profundizamos todavía en KMS).</p>
          <Dialogo>Almacenar también implica proteger.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>11. Checklist antes de crear</h3>
          <InfoBox items={['Nombre correcto', 'Región correcta', 'Block Public Access revisado', 'Versioning revisado', 'Cifrado revisado', 'Tags opcionales', 'Costos entendidos']} />
          <p>Ahora sí: Create bucket.</p>
        </section>

        <section className="lesson-section">
          <h3>12. Paso 7: subir nuestro primer objeto</h3>
          <p>Entramos al bucket, buscamos Upload y seleccionamos un archivo pequeño de laboratorio, por ejemplo <code>clase2.txt</code> con el contenido "Hola S3".</p>
          <Flow steps={[{ icon: 'server', label: 'Mi computador' }, { icon: 'upload', label: 'Upload' }, { icon: 'cloud', label: 'Amazon S3' }, { icon: 'package', label: 'Bucket' }, { icon: 'file-text', label: 'clase2.txt' }]} />
        </section>

        <section className="lesson-section">
          <h3>13. ¿Cuál es la key?</h3>
          <p>Si subimos directamente <code>clase2.txt</code>, la key puede ser <code>clase2.txt</code>. Si lo organizamos bajo un prefijo, la key será <code>modulo4/clase2.txt</code>.</p>
        </section>

        <section className="lesson-section">
          <h3>14. Prefijos, no carpetas reales</h3>
          <Nota><p>La consola puede permitir "Create folder", por ejemplo <code>modulo4</code>. Pero recordamos: S3 no funciona internamente como un sistema de carpetas tradicional.</p></Nota>
          <p>Supongamos que tenemos <code>modulo4/clase1.pdf</code>, <code>modulo4/clase2.pdf</code>, <code>modulo4/video.mp4</code>. La parte <code>modulo4/</code> es un prefijo común que la consola puede mostrar como carpeta.</p>
          <Dialogo>La interfaz usa prefijos de keys para representar una organización similar a carpetas.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>15. Subamos varios objetos</h3>
          <p>Para el laboratorio: <code>clase1.pdf</code>, <code>clase2.pdf</code>, <code>arquitectura.png</code>, organizados como <code>modulo4/documentos/clase1.pdf</code>, <code>modulo4/documentos/clase2.pdf</code>, <code>modulo4/imagenes/arquitectura.png</code>.</p>
        </section>

        <section className="lesson-section">
          <h3>16. Paso 8: propiedades del objeto</h3>
          <Nota><p>Podemos revisar información como: tamaño, tipo de almacenamiento, fecha de modificación, key, URL, cifrado, tags, metadatos.</p></Nota>
          <Dialogo>S3 almacena más que los bytes del archivo. También existe información asociada (metadata).</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>17. Paso 9: descargar un objeto</h3>
          <Flow steps={[{ icon: 'cloud', label: 'S3' }, { icon: 'file-text', label: 'Object' }, { icon: 'upload', label: 'Download' }, { icon: 'server', label: 'Mi computador' }]} />
          <p>Esto demuestra que S3 no solo guarda: también permite recuperar objetos.</p>
        </section>

        <section className="lesson-section">
          <h3>18. Access Denied no siempre es un error</h3>
          <Nota><p>Si nuestro bucket es privado y un usuario no autorizado intenta abrir la URL de un objeto, podemos obtener Access Denied — y eso puede ser correcto.</p></Nota>
          <p>Si un objeto existe pero el acceso público está deshabilitado, son dos preguntas diferentes: ¿existe? y ¿quién puede verlo? No necesitamos "arreglarlo" haciendo todo público.</p>
        </section>

        <section className="lesson-section">
          <h3>19. El estudiante impaciente</h3>
          <Dialogo>"No abre con la URL. Desactivemos Block Public Access." — Pedro</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque está cambiando la seguridad del bucket para resolver un problema de acceso que todavía no hemos analizado. Esto es lo que haría en su lugar: determinar quién necesita acceso y utilizar el mecanismo correcto. El riesgo de su enfoque es exponer todos los objetos accidentalmente.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>20. Paso 10: copiar y mover un objeto</h3>
          <Flow steps={[{ icon: 'file-text', label: 'Original' }, { icon: 'refresh', label: 'Copy' }, { icon: 'key', label: 'Nueva key' }]} />
          <p>S3 puede realizar operaciones de copia dentro de AWS. "Mover" conceptualmente puede implicar copiar y luego eliminar el original — no pensamos en mover como arrastrar físicamente un archivo entre carpetas.</p>
          <Nota><p>Si cambiamos <code>imagenes/logo.png</code> a <code>logos/logo.png</code>, una aplicación que dependía de la key anterior puede dejar de encontrar el objeto si no actualizamos la referencia. Organizar S3 también tiene consecuencias para las aplicaciones.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>21. Paso 11: eliminar un objeto</h3>
          <Nota><p>En un bucket sin versionado, eliminar un objeto puede significar perderlo de forma difícil o imposible de recuperar mediante S3. No hacemos Delete "para ver qué pasa".</p></Nota>
          <p>Si el bucket tiene versionado habilitado, la historia cambia (Clase 4). Hoy solo recordamos: eliminar puede comportarse distinto según la configuración de versionado.</p>
        </section>

        <section className="lesson-section">
          <h3>22. Eliminar muchos objetos y buckets llenos</h3>
          <p>Si un bucket contiene 1 objeto es sencillo; si contiene 1.000.000, la administración cambia mucho — en sistemas reales usamos automatización, lifecycle, herramientas y políticas, no clic uno por uno. Además, un bucket debe estar vacío antes de eliminarlo mediante procesos comunes: primero gestionamos su contenido.</p>
        </section>

        <section className="lesson-section">
          <h3>23. Nuestro laboratorio debe quedar limpio</h3>
          <InfoBox items={['Objetos innecesarios', 'Versiones, si existieran', 'Bucket', 'Región', 'Recursos asociados']} />
          <p>No dejamos buckets "test", "test2", "test-final", "prueba-ultima" flotando eternamente en AWS.</p>
        </section>

        <section className="lesson-section">
          <h3>24. Actividad: Bucket, Object o Key</h3>
          <QaItem question="curso-aws-s3-2026 como contenedor." answer="Bucket." />
          <QaItem question="imagen.png almacenada en S3." answer="Object." />
          <QaItem question="modulo4/imagenes/imagen.png" answer="Key." />
        </section>

        <section className="lesson-section">
          <h3>25. Actividad: ¿qué operación?</h3>
          <QaItem question="Quiero traer el objeto a mi computador." answer="Download." />
          <QaItem question="Quiero crear otra copia con una key diferente." answer="Copy." />
          <QaItem question="Quiero eliminarlo." answer="Delete." />
          <QaItem question="Quiero enviar un archivo desde mi computador a S3." answer="Upload." />
        </section>

        <section className="lesson-section">
          <h3>26. Laboratorio guiado: estructura del curso</h3>
          <Nota><p>Cada estudiante crea dentro de su bucket una estructura lógica: <code>modulo4/documentos/</code>, <code>modulo4/imagenes/</code>, <code>modulo4/videos/</code>, y sube al menos un objeto en documentos e imágenes.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>27. Detective S3</h3>
          <InfoBox items={['Bucket: ____________________', 'Región: ____________________', 'Cantidad de objetos: ____________________', 'Key objeto 1: ____________________', 'Tamaño: ____________________', 'Acceso público: ____________________', 'Versioning: ____________________', 'Encryption: ____________________']} />
          <QaItem question="¿Qué diferencia existe entre nombre del bucket y key?" answer="El bucket identifica el contenedor; la key identifica el objeto dentro de ese bucket." />
        </section>

        <section className="lesson-section">
          <h3>28. Tamaño, costo y transferencia</h3>
          <Nota><p>Bucket A de 10 KB y Bucket B de 100 TB no tendrán el mismo costo. Dos buckets pueden almacenar la misma cantidad de datos pero recibir 10 solicitudes al mes uno y 100 millones el otro — el patrón de uso también afecta costos.</p></Nota>
          <Dialogo>Guardar y usar son dimensiones distintas.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>29. Seguridad: hoy no hacemos público nada</h3>
          <p>El laboratorio de hoy debe funcionar completamente con el bucket privado. El objetivo es crear y manipular objetos desde una identidad autorizada.</p>
        </section>

        <section className="lesson-section">
          <h3>30. Conectemos con IAM</h3>
          <Flow steps={[{ icon: 'user', label: 'Usuario' }, { icon: 'lock', label: 'IAM' }, { icon: 'file-text', label: 'Permiso S3' }, { icon: 'package', label: 'Bucket' }]} />
          <p>¿Por qué nosotros podemos subir? Porque nuestra identidad tiene permisos apropiados. S3 no está separado de IAM: la seguridad del curso empieza a conectarse.</p>
          <Nota><p>Si no tenemos permiso podríamos recibir AccessDenied — eso significa que la identidad actual no está autorizada para esa operación, no necesariamente que S3 esté fallando.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>31. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>32. Reto de la clase</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge icon="trophy">AulaCloud</ConceptBadge>
          <p>Diseñar un repositorio para documentos, diagramas y videos con estructura <code>documentos/</code>, <code>imagenes/</code>, <code>videos/</code>: subir un documento y una imagen, identificar sus keys, descargar uno, copiar uno bajo otra key, eliminar el objeto de prueba y comprobar que el bucket sigue privado.</p>
        </section>

        <section className="lesson-section">
          <h3>33. Reto nivel 2 y trampas frecuentes</h3>
          <QaItem question="Pedro quiere mover documentos/informe.pdf a historico/informe.pdf. ¿Qué cambia?" answer="La key del objeto. Conceptualmente podemos copiarlo a la nueva key y eliminar el original." />
          <QaItem question='"Como el bucket está privado, no puede generar costos." ¿Correcto?' answer="Incorrecto. Privacidad controla acceso; costos dependen del almacenamiento y uso. Son dimensiones distintas." />
          <QaItem question='"Si borro el archivo de mi computador después de subirlo, también desaparece de S3." ¿Correcto?' answer="No. S3 mantiene su propia copia del objeto. Después del upload son ubicaciones diferentes." />
        </section>

        <section className="lesson-section">
          <h3>34. Buenas prácticas básicas</h3>
          <InfoBox items={['Usar nombres claros', 'Revisar Región', 'Mantener privado por defecto', 'Organizar keys de forma consistente', 'Usar tags cuando aporten valor', 'Revisar cifrado', 'Pensar en costos', 'Limpiar objetos y buckets de laboratorio', 'No desactivar seguridad "porque no abre"', 'Entender la operación antes de ejecutarla']} />
        </section>

        <section className="lesson-section">
          <h3>35. Limpieza del laboratorio</h3>
          <p>Si este bucket es solo para la clase: primero eliminamos los objetos, después el bucket. Pero antes comprobamos si tiene versionado, porque si existen versiones, vaciar puede requerir administrar también esas versiones. Y verificamos nombre, contenido, Región y propósito antes de eliminar — no hacemos clic en Delete porque "es el primero de la lista".</p>
        </section>

        <section className="lesson-section">
          <h3>36. Reto oral</h3>
          <Dialogo>Explícame qué hiciste hoy sin usar las palabras S3, bucket, objeto, archivo, upload, download, key ni nube.</Dialogo>
          <Reveal label="Ver una buena respuesta">
            <Dialogo>"Creé un contenedor remoto, envié contenido a él, organicé cada elemento mediante identificadores, recuperé una copia y eliminé lo que ya no necesitaba."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>37. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Bucket</td><td>Contenedor de objetos</td></tr>
              <tr><td>Object</td><td>Contenido almacenado</td></tr>
              <tr><td>Key</td><td>Identificador del objeto</td></tr>
              <tr><td>Prefijo</td><td>Organización lógica de keys</td></tr>
              <tr><td>Upload</td><td>Enviar contenido a S3</td></tr>
              <tr><td>Download</td><td>Recuperar contenido</td></tr>
              <tr><td>Copy</td><td>Crear otra copia/key</td></tr>
              <tr><td>Delete</td><td>Eliminar objeto</td></tr>
              <tr><td>Block Public Access</td><td>Ayuda a evitar exposición pública</td></tr>
              <tr><td>Región</td><td>Ubicación del bucket</td></tr>
              <tr><td>Encryption</td><td>Protección de datos almacenados</td></tr>
              <tr><td>Costos</td><td>Dependen de almacenamiento y uso</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>38. Ticket de salida</h3>
          <Dialogo>Tengo el objeto modulo4/documentos/clase2.pdf. ¿Qué parte representa la key y qué función cumple?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>modulo4/documentos/clase2.pdf es la key y sirve para identificar ese objeto dentro del bucket.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 3</div>
          <Nota><p>Cerraría mostrando:</p></Nota>
          <Flow steps={[{ icon: 'user', label: 'Camila' }, { icon: 'lock', label: 'Bucket privado' }, { icon: 'file-text', label: 'informe.pdf' }]} />
          <Dialogo>"Camila necesita descargar este documento, pero Pedro no debería verlo. ¿Cómo le decimos a S3 quién puede hacer qué?"</Dialogo>
          <p>Ahí vuelven varias piezas del Módulo 2 (IAM, Policies, mínimo privilegio) y aparecen otras nuevas: Bucket Policy, Block Public Access, acceso público.</p>
          <ConceptBadge icon="lock">Módulo 4 · Clase 3 — Permisos, Bucket Policies y acceso público en Amazon S3</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-4/clase-3" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 3: Permisos y acceso en S3 →
          </Link>
        </div>

      </div>
    </div>
  );
}
