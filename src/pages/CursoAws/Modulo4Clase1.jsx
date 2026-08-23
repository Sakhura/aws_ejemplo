import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, CompareCols, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué significa S3?', options: [{ text: 'Simple Storage Service', correct: true }, { text: 'Secure Server System', correct: false }, { text: 'Storage Server Service', correct: false }, { text: 'Simple System Storage', correct: false }] },
  { q: '¿Qué modelo utiliza S3?', options: [{ text: 'Almacenamiento de objetos.', correct: true }, { text: 'Solo almacenamiento de bloques.', correct: false }, { text: 'Memoria RAM.', correct: false }, { text: 'Procesamiento.', correct: false }] },
  { q: '¿Qué es un bucket?', options: [{ text: 'Un contenedor de objetos.', correct: true }, { text: 'Una instancia EC2.', correct: false }, { text: 'Una base de datos.', correct: false }, { text: 'Una política IAM.', correct: false }] },
  { q: '¿Qué es un objeto?', options: [{ text: 'Una unidad almacenada en S3 con sus datos e información asociada.', correct: true }, { text: 'Una Región.', correct: false }, { text: 'Un usuario.', correct: false }, { text: 'Un Security Group.', correct: false }] },
  { q: '¿Qué es una object key?', options: [{ text: 'El identificador del objeto dentro del bucket.', correct: true }, { text: 'Una contraseña AWS.', correct: false }, { text: 'Un Key Pair EC2.', correct: false }, { text: 'Una política.', correct: false }] },
  { q: '¿S3 y EBS son exactamente lo mismo?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Cuál utiliza almacenamiento de bloques?', options: [{ text: 'S3.', correct: false }, { text: 'EBS.', correct: true }] },
  { q: '¿Cuál utiliza almacenamiento de objetos?', options: [{ text: 'S3.', correct: true }, { text: 'EBS.', correct: false }] },
  { q: '¿Un bucket debe hacerse público para almacenar objetos?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿S3 puede generar costos?', options: [{ text: 'Sí.', correct: true }, { text: 'Nunca.', correct: false }] },
];

export default function Modulo4Clase1() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 4 · Clase 1</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 4 · Clase 1: ¿Qué es Amazon S3? Buckets, objetos y almacenamiento de objetos</h2>
      <p className="lesson-subtitle">
        Amazon S3 es un servicio de almacenamiento de objetos: nos permite guardar y recuperar archivos dentro de contenedores llamados buckets.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + actividades + preparación para laboratorio</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 3 completado</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es Amazon S3 y comprender qué significa almacenamiento de objetos.</li>
            <li>Diferenciar S3 de EBS.</li>
            <li>Explicar qué es un bucket, un objeto y una key.</li>
            <li>Reconocer ejemplos adecuados para S3.</li>
            <li>Comprender que S3 puede almacenar grandes cantidades de objetos.</li>
            <li>Reconocer que el almacenamiento tiene costos.</li>
            <li>Entender que guardar algo en S3 no significa hacerlo público.</li>
          </ul>
          <p>La frase que debe sobrevivir será:</p>
          <Dialogo>Amazon S3 es un servicio de almacenamiento de objetos.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Recordemos dónde venimos</h3>
          <Nota><p>En el módulo anterior trabajamos con EC2 + EBS:</p></Nota>
          <Flow steps={[{ icon: 'server', label: 'EC2', caption: 'Proporciona cómputo' }, { icon: 'hard-drive', label: 'EBS', caption: 'Proporciona almacenamiento en bloques' }]} />
          <p>Ahora imaginemos otra necesidad: 50.000 fotografías, 20.000 documentos PDF, 2.000 videos.</p>
          <QaItem question="¿Necesitamos conectar todo eso como si fuera el disco de un servidor?" answer="No necesariamente. Aquí aparece Amazon S3." />
        </section>

        <section className="lesson-section">
          <h3>3. ¿Qué significa S3?</h3>
          <Nota><p>S3 significa: Simple Storage Service — tres palabras que empiezan con S.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>4. ¿Qué es Amazon S3?</h3>
          <Dialogo>S3 nos permite guardar y recuperar archivos y otros datos como objetos dentro de contenedores llamados buckets.</Dialogo>
          <p>Ejemplos: foto.jpg, informe.pdf, clase.mp4, respaldo.zip, datos.csv.</p>
        </section>

        <section className="lesson-section">
          <h3>5. Analogía de la bodega</h3>
          <Nota><p>Imaginemos una enorme empresa de bodegaje. Dentro creamos espacios separados para diferentes clientes o propósitos:</p></Nota>
          <RoleGrid roles={[
            { icon: 'package', label: 'Materiales curso', desc: '' },
            { icon: 'camera', label: 'Imágenes tienda', desc: '' },
            { icon: 'refresh', label: 'Respaldos', desc: '' },
          ]} />
          <p>Y dentro guardamos objetos: clase1.pdf, clase2.pdf, bienvenida.mp4, arquitectura.png. Esta será nuestra analogía principal del módulo.</p>
        </section>

        <section className="lesson-section">
          <h3>6. ¿Qué es un bucket?</h3>
          <Dialogo>Un bucket es un contenedor lógico donde guardamos objetos.</Dialogo>
          <p>Ejemplo: <code>materiales-cloud</code>, con <code>modulo1.pdf</code>, <code>modulo2.pdf</code>, <code>introduccion.mp4</code> dentro.</p>
        </section>

        <section className="lesson-section">
          <h3>7. Bucket no significa carpeta</h3>
          <Nota><p>No debemos enseñar "bucket = carpeta", porque es una simplificación demasiado peligrosa.</p></Nota>
          <Dialogo>Bucket = contenedor principal de objetos en S3. Dentro podemos organizar objetos usando nombres y prefijos que visualmente pueden parecer carpetas, pero conceptualmente S3 trabaja con objetos y claves.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>8. ¿Qué es un objeto?</h3>
          <Nota><p>Un objeto es la unidad básica que almacenamos en S3. Incluye: los datos, una clave que lo identifica, metadatos y otra información asociada.</p></Nota>
          <ConceptBadge icon="file-text">Objeto = el contenido que almacenamos en S3 junto con información que permite identificarlo y describirlo</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>9. Ejemplos de objetos</h3>
          <p>foto.jpg, manual.pdf, video.mp4, backup.zip — cada uno puede ser un objeto.</p>
        </section>

        <section className="lesson-section">
          <h3>10. Aparece la Key</h3>
          <Dialogo>La key es el nombre o identificador del objeto dentro del bucket.</Dialogo>
          <p>Por ejemplo: <code>imagenes/productos/notebook.jpg</code> podría ser una key.</p>
        </section>

        <section className="lesson-section">
          <h3>11. Bucket + Key</h3>
          <Flow steps={[{ icon: 'package', label: 'materiales-curso', caption: 'en qué contenedor' }, { icon: 'key', label: 'modulo1/clase1.pdf', caption: 'qué objeto dentro de él' }]} />
        </section>

        <section className="lesson-section">
          <h3>12. ¿Y las carpetas?</h3>
          <Nota><p>En la consola podemos ver algo parecido a carpetas, pero S3 no necesita funcionar internamente como un sistema de carpetas tradicional. Podemos utilizar prefijos en las keys, por ejemplo: <code>modulo1/clase1.pdf</code>, <code>modulo1/clase2.pdf</code>, <code>modulo2/clase1.pdf</code>. La consola puede representarlos visualmente como carpetas.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>13. Analogía del número de casillero</h3>
          <p>Cada objeto tiene una ubicación lógica (<code>modulo1/clase1.pdf</code>) que ayuda a encontrarlo. No recorremos físicamente pasillos y estantes: S3 usa identificadores.</p>
        </section>

        <section className="lesson-section">
          <h3>14. Volvamos a EBS</h3>
          <CompareCols cols={[
            { emoji: '💾', title: 'EBS', items: ['EC2 → Volumen', 'Se parece a un disco conectado a una máquina'] },
            { emoji: '📦', title: 'S3', items: ['S3 → Bucket → objetos', 'Se parece a un servicio donde almacenamos objetos'] },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>15. S3 vs EBS</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Característica</th><th>EBS</th><th>S3</th></tr></thead>
            <tbody>
              <tr><td>Tipo</td><td>Bloques</td><td>Objetos</td></tr>
              <tr><td>Idea sencilla</td><td>Disco virtual</td><td>Almacén de objetos</td></tr>
              <tr><td>Relación con EC2</td><td>Frecuentemente asociado</td><td>Servicio independiente</td></tr>
              <tr><td>Organización</td><td>Sistema de archivos sobre volumen</td><td>Buckets + keys</td></tr>
              <tr><td>Ejemplo</td><td>Disco del servidor</td><td>Fotos, PDFs, backups</td></tr>
            </tbody>
          </table>
          <p>Ninguno es "mejor". Sirven para necesidades distintas.</p>
        </section>

        <section className="lesson-section">
          <h3>16. Error frecuente</h3>
          <QaItem question='"Tengo un servidor EC2. ¿Entonces todo debería guardarse en EBS?"' answer="No necesariamente. Una aplicación puede tener EC2 + EBS (sistema operativo) y también S3 (fotografías, PDFs, videos). Los servicios pueden trabajar juntos." />
        </section>

        <section className="lesson-section">
          <h3>17. Ejemplo: tienda online</h3>
          <Nota><p>La tienda necesita en EC2/EBS: sistema, aplicación, configuraciones. Pero también tiene 100.000 imágenes de productos.</p></Nota>
          <Flow steps={[{ icon: 'server', label: 'Aplicación' }, { icon: 'database', label: 'Datos' }, { icon: 'package', label: 'S3 — imágenes' }]} />
        </section>

        <section className="lesson-section">
          <h3>18. Ejemplo académico y de respaldo</h3>
          <p>Una institución puede almacenar apuntes PDF, clases grabadas, diagramas y archivos descargables en <code>materiales-academicos</code>. Una empresa puede almacenar respaldos como <code>backup-2026-08-20.zip</code> en <code>backups-empresa</code>. Más adelante aprenderemos que no todos los respaldos necesitan la misma clase de almacenamiento.</p>
        </section>

        <section className="lesson-section">
          <h3>19. ¿S3 tiene límite de objetos?</h3>
          <Nota><p>S3 está diseñado para almacenar cantidades enormes de objetos. No pensamos en S3 como un pendrive con 100 archivos: puede utilizarse a gran escala.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>20. Tamaño de los objetos</h3>
          <p>S3 admite objetos grandes, pero existen límites por objeto y distintas formas de carga para archivos de gran tamaño. No necesitamos memorizar números: S3 puede manejar desde pequeños archivos hasta objetos muy grandes.</p>
        </section>

        <section className="lesson-section">
          <h3>21. ¿Dónde se crea un bucket?</h3>
          <Flow steps={[{ icon: 'cloud', label: 'AWS' }, { icon: 'map-pin', label: 'Región' }, { icon: 'package', label: 'Bucket' }]} />
          <p>Debemos pensar en ubicación por razones como latencia, regulación, arquitectura, costo y residencia de datos.</p>
        </section>

        <section className="lesson-section">
          <h3>22. El nombre del bucket</h3>
          <Nota><p>Los nombres de buckets S3 deben ser únicos dentro del espacio de nombres correspondiente. No podemos asumir que cualquier nombre estará disponible — <code>mis-fotos</code> probablemente ya exista.</p></Nota>
          <p>En laboratorio podemos usar algo como <code>curso-aws-materiales-grupo01-2026</code>. Evitaríamos incluir datos personales, contraseñas o información sensible: el nombre del bucket no es un lugar secreto para esconder información.</p>
        </section>

        <section className="lesson-section">
          <h3>23. ¿Un bucket es público automáticamente?</h3>
          <Nota><p>No. Amazon S3 incorpora controles diseñados para ayudar a evitar exposición pública accidental.</p></Nota>
          <Dialogo>Nuestros buckets deberían partir privados salvo que exista una necesidad explícita y controlada de acceso público.</Dialogo>
          <p>Estar en S3 (accesible mediante Internet y APIs) no significa que cualquiera pueda ver los objetos: son conceptos diferentes. La bodega está conectada a una carretera, pero eso no significa que cualquiera pueda entrar a cualquier casillero. Ese será el foco de la Clase 3.</p>
        </section>

        <section className="lesson-section">
          <h3>24. Durabilidad</h3>
          <Nota><p>Amazon S3 está diseñado para ofrecer muy alta durabilidad de los objetos: AWS diseña S3 para reducir enormemente la probabilidad de perder un objeto almacenado debido a fallas de infraestructura.</p></Nota>
          <p>Pero durabilidad no significa "no necesito respaldos, controles ni versionado". No protege automáticamente contra todos los errores humanos o decisiones incorrectas. Si un usuario autorizado hace Delete, la alta durabilidad de S3 no significa que AWS ignorará la eliminación. Por eso más adelante existirá <strong>Versioning</strong> (Clase 4).</p>
        </section>

        <section className="lesson-section">
          <h3>25. ¿S3 es gratis?</h3>
          <Nota><p>No. Amazon S3 es un servicio con precios asociados. Los costos pueden depender de: cantidad almacenada, clase de almacenamiento, solicitudes, transferencia, recuperación y características utilizadas.</p></Nota>
          <p>10 archivos probablemente tendrá un impacto pequeño. 500.000 videos es otra historia. Cloud escala técnicamente — la factura también sabe escalar.</p>
        </section>

        <section className="lesson-section">
          <h3>26. La pregunta profesional</h3>
          <Nota><p>Antes de guardar algo en S3 preguntamos:</p></Nota>
          <InfoBox items={['¿Qué estoy almacenando?', '¿Cuánto?', '¿Quién necesita acceder?', '¿Con qué frecuencia?', '¿Durante cuánto tiempo?', '¿Qué costo tendrá?']} />
        </section>

        <section className="lesson-section">
          <h3>27. Caso práctico: materiales del curso</h3>
          <p>Creamos <code>curso-aws</code> y organizamos: <code>modulo1/01-introduccion.pdf</code>, <code>modulo3/02-ec2.pdf</code>, <code>videos/bienvenida.mp4</code>, <code>imagenes/arquitectura.png</code>.</p>
        </section>

        <section className="lesson-section">
          <h3>28. Identifiquemos las keys</h3>
          <p>En <code>videos/bienvenida.mp4</code>, esa cadena completa es la Object Key. La interfaz puede hacernos pensar en una carpeta "videos", pero conceptualmente es una key con un prefijo.</p>
        </section>

        <section className="lesson-section">
          <h3>29. Actividad: bucket, objeto o key</h3>
          <QaItem question="curso-aws-materiales como contenedor principal." answer="Bucket." />
          <QaItem question="clase1.pdf almacenado en S3." answer="Objeto." />
          <QaItem question="modulo1/clase1.pdf como identificador dentro del bucket." answer="Key." />
        </section>

        <section className="lesson-section">
          <h3>30. Actividad: S3 o EBS</h3>
          <QaItem question="Disco del sistema de una instancia EC2." answer="EBS." />
          <QaItem question="100.000 fotografías de productos." answer="S3 puede ser una excelente opción." />
          <QaItem question="Volumen conectado a EC2." answer="EBS." />
          <QaItem question="Repositorio de documentos PDF." answer="S3." />
          <QaItem question="Almacenamiento en bloques." answer="EBS." />
          <QaItem question="Almacenamiento de objetos." answer="S3." />
        </section>

        <section className="lesson-section">
          <h3>31. ¿Puede EC2 utilizar S3?</h3>
          <Nota><p>Sí, y aquí conectamos varios módulos:</p></Nota>
          <Flow steps={[{ icon: 'server', label: 'EC2' }, { icon: 'users', label: 'IAM Role' }, { icon: 'file-text', label: 'Permiso' }, { icon: 'package', label: 'S3' }]} />
          <p>¿Recuerdan IAM Roles? Ahora cobran todavía más sentido: una aplicación en EC2 puede leer imágenes almacenadas en S3 sin escribir Access Keys en el código, usando un IAM Role. Así conectamos Módulo 2 + Módulo 3 + Módulo 4.</p>
        </section>

        <section className="lesson-section">
          <h3>32. Nuestro sistema comienza a parecer real</h3>
          <Flow steps={[{ icon: 'user', label: 'Usuario' }, { icon: 'globe', label: 'Aplicación' }, { icon: 'server', label: 'EC2' }, { icon: 'database', label: 'Base de datos' }, { icon: 'package', label: 'S3' }]} />
          <p>Estamos dejando atrás los servicios aislados. Estamos comenzando a construir arquitectura.</p>
        </section>

        <section className="lesson-section">
          <h3>33. Tres errores conceptuales frecuentes</h3>
          <QaItem question='"¿Podemos pensar en un bucket S3 exactamente como la unidad C: de Windows?"' answer="No. S3 utiliza almacenamiento de objetos y se accede de forma diferente a un sistema de archivos de bloque tradicional." />
          <QaItem question='"Creé un bucket. ¿Ahora tengo una máquina?"' answer="No. Un bucket almacena objetos; una instancia EC2 ejecuta cómputo. No confundimos Storage con Compute." />
          <QaItem question="Un archivo CSV guardado en S3, ¿convierte a S3 en una base de datos relacional?" answer="No. Los servicios pueden trabajar juntos, pero cumplen funciones diferentes." />
        </section>

        <section className="lesson-section">
          <h3>34. Las tres categorías que ya conocemos</h3>
          <RoleGrid roles={[
            { icon: 'server', label: 'EC2', desc: 'Cómputo' },
            { icon: 'hard-drive', label: 'EBS', desc: 'Bloques' },
            { icon: 'package', label: 'S3', desc: 'Objetos' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>35. Caso empresarial: PhotoCloud</h3>
          <Nota><p>Una empresa administra fotografías de eventos: 2 millones de fotografías, 50.000 videos, clientes descargando contenido, crecimiento continuo.</p></Nota>
          <QaItem question="¿Qué servicio deberíamos evaluar para almacenar esos objetos?" answer="Amazon S3." />
          <p>Pero todavía falta información: ¿quién puede ver las fotografías?, ¿son públicas o privadas?, ¿cuánto tiempo se conservan?, ¿con qué frecuencia se descargan?, ¿necesitamos versiones?, ¿cuánto costará? Esas preguntas corresponden a las próximas clases.</p>
        </section>

        <section className="lesson-section">
          <h3>36. Primera regla de seguridad S3</h3>
          <ConceptBadge icon="lock">Privado por defecto</ConceptBadge>
          <p>No hacemos público "porque así puedo abrirlo fácilmente". Primero entendemos quién necesita acceso; luego configuramos.</p>
        </section>

        <section className="lesson-section">
          <h3>37. El desarrollador apurado</h3>
          <Dialogo>"No puedo abrir mi archivo desde el navegador. Hagamos público todo el bucket." — Pedro</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque está cambiando la seguridad de todo el contenedor para resolver una necesidad puntual. Esto es lo que haría en su lugar: identificar quién debe acceder, a qué objeto y mediante qué mecanismo. El riesgo de su enfoque es exponer información que nunca debió ser pública.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>38. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>39. Reto de la clase</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge icon="trophy">Instituto Cloud</ConceptBadge>
          <InfoBox items={['5.000 PDFs', '300 videos', '10.000 imágenes', 'Solo estudiantes autorizados deberían acceder']} />
          <QaItem question="¿Qué servicio evaluarían?" answer="Amazon S3." />
          <QaItem question="¿Qué crearíamos primero?" answer="Un bucket." />
          <QaItem question="¿Qué serían PDF, videos e imágenes?" answer="Objetos." />
          <QaItem question="¿Necesitamos hacer público el bucket?" answer="No." />
          <QaItem question="¿Qué deberíamos estudiar después?" answer="Cómo otorgar acceso solamente a quien corresponde." />
        </section>

        <section className="lesson-section">
          <h3>40. Reto nivel 2</h3>
          <Nota><p>Tenemos EC2 con 8 GiB EBS y queremos almacenar 5 TB de videos.</p></Nota>
          <QaItem question="¿Tiene sentido simplemente aumentar el volumen EBS porque ya estamos usando EC2?" answer="Podría hacerse técnicamente en determinados diseños, pero no elegiría la solución solo por comodidad. Evaluaría almacenamiento de objetos como S3 según los requisitos. El riesgo de ampliar EBS automáticamente es diseñar la arquitectura alrededor del recurso que ya conocemos y no del problema que necesitamos resolver." />
        </section>

        <section className="lesson-section">
          <h3>41. Reto oral</h3>
          <Dialogo>Explícame S3 sin utilizar las palabras AWS, almacenamiento, objeto, bucket, archivo, nube ni guardar.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Es un servicio que permite conservar grandes cantidades de contenido identificado individualmente y recuperarlo cuando una aplicación o persona autorizada lo necesita."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>42. Nuestro mapa de arquitectura crece</h3>
          <RoleGrid roles={[
            { icon: 'server', label: 'EC2', desc: 'Cómputo' },
            { icon: 'hard-drive', label: 'EBS', desc: 'Bloques' },
            { icon: 'package', label: 'S3', desc: 'Objetos' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>43. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Amazon S3</td><td>Almacenamiento de objetos</td></tr>
              <tr><td>Bucket</td><td>Contenedor de objetos</td></tr>
              <tr><td>Object</td><td>Contenido almacenado</td></tr>
              <tr><td>Object Key</td><td>Identificador del objeto</td></tr>
              <tr><td>Prefijo</td><td>Parte de la key usada para organización</td></tr>
              <tr><td>Región</td><td>Ubicación donde se crea el bucket</td></tr>
              <tr><td>Privado</td><td>Punto de partida recomendado</td></tr>
              <tr><td>EBS</td><td>Almacenamiento en bloques</td></tr>
              <tr><td>EC2</td><td>Cómputo</td></tr>
              <tr><td>Costos</td><td>Dependen del uso y configuración</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>44. Ticket de salida</h3>
          <Dialogo>¿Cuál es la diferencia principal entre Amazon EBS y Amazon S3?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>EBS proporciona almacenamiento en bloques utilizado como discos virtuales, mientras S3 almacena información como objetos dentro de buckets.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 2</div>
          <Nota><p>Cerraría mostrando:</p></Nota>
          <Flow steps={[{ icon: 'package', label: 'Amazon S3' }, { icon: 'package', label: 'materiales-curso' }, { n: '?', label: '¿?' }]} />
          <Dialogo>"Ya sabemos qué es un bucket. ¿Cómo lo creamos realmente y cómo subimos nuestro primer objeto?"</Dialogo>
          <Flow steps={[{ icon: 'package', label: 'Create bucket' }, { icon: 'upload', label: 'Upload' }, { icon: 'file-text', label: 'Object' }, { icon: 'upload', label: 'Download' }, { icon: 'trash', label: 'Delete' }]} />
          <ConceptBadge icon="rocket">Módulo 4 · Clase 2 — Crear nuestro primer bucket y trabajar con objetos</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-4/clase-2" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 2: Crear un bucket y trabajar con objetos →
          </Link>
        </div>

      </div>
    </div>
  );
}
