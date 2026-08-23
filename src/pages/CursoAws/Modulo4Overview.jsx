import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, CompareCols,
} from './lessonComponents.jsx';

export default function Modulo4Overview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 4</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 4: Amazon S3</h2>
      <p className="lesson-subtitle">
        Seis clases de 45 minutos: de "¿qué es un bucket?" hasta diseñar, proteger, versionar y administrar un repositorio de objetos completo.
      </p>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>Por qué 6 clases</h3>
          <Nota><p>S3 tiene suficiente profundidad para trabajar almacenamiento, seguridad, versionado, costos y un laboratorio completo sin convertirlo en una maratón de botones.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>Las 6 clases</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Clase</th><th>Tema</th><th>Objetivo principal</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>¿Qué es Amazon S3? Buckets y objetos</td><td>Comprender el modelo de almacenamiento de objetos</td></tr>
              <tr><td>2</td><td>Crear un bucket y trabajar con objetos</td><td>Crear S3, subir, descargar, organizar y eliminar objetos</td></tr>
              <tr><td>3</td><td>Permisos y acceso en S3</td><td>Acceso público/privado, IAM, bucket policies y Block Public Access</td></tr>
              <tr><td>4</td><td>Versionado y recuperación</td><td>Versiones, eliminación y recuperación de objetos</td></tr>
              <tr><td>5</td><td>Clases de almacenamiento y Lifecycle</td><td>Elegir almacenamiento según frecuencia de acceso y controlar costos</td></tr>
              <tr><td>6</td><td>Laboratorio integrador S3</td><td>Diseñar, proteger, versionar y administrar un repositorio de objetos</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>Objetivo general del módulo</h3>
          <Nota><p>Al finalizar el Módulo 4, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es Amazon S3 y diferenciarlo de EC2 y EBS.</li>
            <li>Crear y configurar un bucket, subir y administrar objetos.</li>
            <li>Comprender qué es una key y que los buckets son privados por defecto.</li>
            <li>Administrar acceso mediante IAM, políticas y Block Public Access.</li>
            <li>Utilizar versionado y recuperar información ante determinados errores.</li>
            <li>Reconocer clases de almacenamiento y reglas de Lifecycle.</li>
            <li>Relacionar almacenamiento con costos y limpiar correctamente los recursos.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>La idea central de S3</h3>
          <Nota><p>Hasta ahora trabajamos con EC2 + EBS, que se parecía a un disco conectado a un servidor.</p></Nota>
          <Flow steps={[{ icon: 'server', label: 'EC2' }, { icon: 'hard-drive', label: 'EBS' }]} />
          <p>Ahora cambiamos el modelo: en S3 almacenamos información como <strong>objetos</strong>, dentro de contenedores llamados <strong>buckets</strong>.</p>
          <RoleGrid roles={[
            { icon: 'camera', label: 'foto.jpg', desc: '' },
            { icon: 'file-text', label: 'informe.pdf', desc: '' },
            { icon: 'package', label: 'clase.mp4', desc: '' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>Bucket y Object</h3>
          <RoleGrid roles={[
            { icon: 'package', label: 'Bucket', desc: 'Contenedor lógico donde almacenamos objetos' },
            { icon: 'file-text', label: 'Object', desc: 'Archivo/dato almacenado en S3 junto con sus metadatos y una key' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>Primera diferencia con EBS</h3>
          <Nota><p>Este cuadro debería aparecer muy temprano en el módulo:</p></Nota>
          <table className="table lesson-summary-table">
            <thead><tr><th></th><th>EBS</th><th>S3</th></tr></thead>
            <tbody>
              <tr><td>Modelo</td><td>Bloques</td><td>Objetos</td></tr>
              <tr><td>Analogía</td><td>Disco</td><td>Bodega de objetos</td></tr>
              <tr><td>Uso típico</td><td>Disco de EC2</td><td>Archivos, imágenes, backups, datos</td></tr>
              <tr><td>Acceso</td><td>Almacenamiento de bloque</td><td>APIs/servicios web</td></tr>
              <tr><td>Organización</td><td>Sistema de archivos sobre volumen</td><td>Buckets + objetos + keys</td></tr>
            </tbody>
          </table>
          <Nota>
            <p>No estoy de acuerdo con enseñar que S3 reemplaza a EBS, porque resuelven necesidades diferentes. Esto es lo que haría en su lugar: enseñar primero el problema que cada uno resuelve. El riesgo de mezclarlos es que después el estudiante intente elegir servicios por nombre en vez de por arquitectura.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>Progresión del módulo</h3>
          <Flow steps={[
            { n: 1, label: '¿Qué es S3?', caption: 'Bucket + objeto' },
            { n: 2, label: '¿Cómo almaceno?', caption: 'Crear + subir + descargar' },
            { n: 3, label: '¿Quién puede acceder?', caption: 'IAM + políticas + acceso público' },
            { n: 4, label: '¿Qué ocurre si modifico o elimino?', caption: 'Versionado' },
            { n: 5, label: '¿Cómo optimizo almacenamiento?', caption: 'Storage Classes + Lifecycle' },
            { n: 6, label: 'Lo construyo completo', caption: 'Laboratorio integrador' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>Cambio importante respecto de EC2</h3>
          <CompareCols cols={[
            { emoji: '🖥️', title: 'En EC2 preguntábamos', items: ['¿Qué computador necesito?'] },
            { emoji: '📦', title: 'En S3 preguntaremos', items: ['¿Qué información necesito almacenar?', '¿Quién debe acceder?', '¿Durante cuánto tiempo?'] },
          ]} />
          <p>Ese cambio de pregunta define todo el módulo.</p>
        </section>

        <section className="lesson-section">
          <h3>Costos desde el primer día</h3>
          <Nota><p>S3 puede generar costos relacionados con: cantidad de datos almacenados, clase de almacenamiento, solicitudes, recuperación, transferencia y características adicionales utilizadas.</p></Nota>
          <Dialogo>Guardar también cuesta.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>Meta del módulo</h3>
          <Nota><p>Al terminar, el estudiante debería mirar 50.000 fotografías, 10.000 PDF y 500 videos y pensar: "esto podría ser un problema de almacenamiento de objetos", y luego preguntarse quién debe acceder, si necesita versiones, con qué frecuencia se usarán, cuánto tiempo debe conservarlos y cuánto costará.</p></Nota>
          <p>Memorizar que "S3 significa Simple Storage Service" será apenas la cáscara.</p>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Empecemos</div>
          <ConceptBadge icon="package">Módulo 4 · Clase 1 — ¿Qué es Amazon S3? Buckets, objetos y almacenamiento de objetos</ConceptBadge>
          <Nota><p>Esa clase comienza comparando S3 versus el EBS que acabamos de aprender, para conectar conocimientos en vez de reiniciar desde cero.</p></Nota>
          <Link to="/aprendizaje/aws-desde-cero/modulo-4/clase-1" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 1: ¿Qué es Amazon S3? →
          </Link>
        </div>

      </div>
    </div>
  );
}
