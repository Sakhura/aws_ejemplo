import { Link } from 'react-router-dom';
import { Nota, Dialogo, ConceptBadge, Flow, InfoBox, CompareCols } from './lessonComponents.jsx';

const ROADMAP = [
  { n: 1, emoji: '🖥️', tema: '¿Qué es Amazon EC2?', objetivo: 'Comprender qué es una instancia y para qué sirve' },
  { n: 2, emoji: '🧩', tema: 'AMI, tipos de instancia y recursos', objetivo: 'Entender cómo elegimos el "computador" que necesitamos' },
  { n: 3, emoji: '🚀', tema: 'Crear nuestra primera instancia EC2', objetivo: 'Lanzar una instancia paso a paso' },
  { n: 4, emoji: '🔐', tema: 'Security Groups y acceso', objetivo: 'Entender las reglas que permiten o bloquean conexiones' },
  { n: 5, emoji: '💾', tema: 'Almacenamiento en EC2', objetivo: 'Comprender EBS, volúmenes y persistencia de datos' },
  { n: 6, emoji: '⚙️', tema: 'Estados, monitoreo, costos y buenas prácticas', objetivo: 'Administrar correctamente una instancia' },
  { n: 7, emoji: '🏆', tema: 'Laboratorio integrador EC2', objetivo: 'Crear, proteger, probar y eliminar una solución completa' },
];

const CONCEPTOS = [
  { term: 'Instancia EC2 🖥️', def: 'Un servidor virtual que ejecutamos en AWS.' },
  { term: 'AMI 📀', def: 'La plantilla utilizada como punto de partida para crear una instancia.' },
  { term: 'Tipo de instancia ⚙️', def: 'La combinación de capacidad de CPU, memoria y otras características.' },
  { term: 'EBS 💾', def: 'Almacenamiento en bloques utilizado comúnmente con EC2.' },
  { term: 'Security Group 🔐', def: 'Reglas que controlan determinado tráfico hacia y desde recursos como instancias.' },
  { term: 'Key pair / métodos de conexión 🔑', def: 'Mecanismos utilizados en ciertos escenarios para conectarse de forma segura.' },
  { term: 'IP pública y privada 🌐', def: 'Direcciones utilizadas para comunicación según el contexto.' },
];

export default function Modulo3Overview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 3</div>
      <div className="lesson-eyebrow">🖥️ Módulo 3: Amazon EC2</div>
      <h2 style={{ margin: '0 0 4px' }}>Hoja de ruta del módulo</h2>
      <p className="lesson-subtitle">
        Siete clases de 45 minutos, de "¿qué es EC2?" hasta publicar tu primera página web desde un servidor que creaste tú mismo en AWS. Las clases individuales todavía no están publicadas.
      </p>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>🗺️ Las 7 clases</h3>
          <Nota><p>Lo estructuraría en 7 clases de 45 minutos.</p></Nota>
          <table className="table lesson-summary-table" style={{ maxWidth: 900 }}>
            <thead><tr><th>Clase</th><th>Tema</th><th>Objetivo</th></tr></thead>
            <tbody>
              {ROADMAP.map((c) => (
                <tr key={c.n}><td>{c.n}</td><td>{c.emoji} {c.tema}</td><td>{c.objetivo}</td></tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>🔄 La progresión</h3>
          <Flow steps={[
            { n: 1, label: '¿Qué es EC2?' },
            { n: 2, label: '¿Qué servidor necesito?' },
            { n: 3, label: '¿Cómo lo creo?' },
            { n: 4, label: '¿Quién puede entrar?' },
            { n: 5, label: '¿Dónde quedan mis datos?' },
            { n: 6, label: '¿Cómo lo administro y controlo costos?' },
            { n: 7, label: '🏆 Lo hago completo' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>🎯 Objetivo general del módulo</h3>
          <Nota><p>Al finalizar el Módulo 3, el estudiante debería poder explicar y realizar un flujo como este:</p></Nota>
          <Flow steps={[
            { emoji: '☁️', label: 'AWS' },
            { emoji: '🖥️', label: 'EC2' },
          ]} />
          <InfoBox items={['Elegir sistema', 'Elegir capacidad', 'Crear instancia', 'Configurar acceso', 'Conectarse', 'Almacenar datos', 'Revisar estado', 'Detener o eliminar']} />
          <Nota><p>Y, sobre todo, entender que:</p></Nota>
          <Dialogo>EC2 es capacidad de cómputo bajo demanda en AWS.</Dialogo>
          <p>Para nuestro público lo traducimos inicialmente como:</p>
          <Dialogo>"EC2 nos permite crear computadores virtuales en AWS."</Dialogo>
          <p>Después refinamos el concepto.</p>
        </section>

        <section className="lesson-section">
          <h3>🧠 Conceptos que aparecerán</h3>
          <Nota><p>Durante las siete clases introduciríamos progresivamente:</p></Nota>
          <div className="glossary-grid">
            {CONCEPTOS.map((c) => (
              <div key={c.term} className="glossary-entry">
                <div className="glossary-term">{c.term}</div>
                <div className="glossary-def">{c.def}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="lesson-section">
          <h3>🧑‍🏫 Cambio de metodología</h3>
          <Nota><p>Desde este módulo reduciría la proporción de teoría.</p></Nota>
          <CompareCols cols={[
            { emoji: '📖', title: 'Clases anteriores', items: ['60% explicación', '25% actividad', '15% evaluación'] },
            { emoji: '🧪', title: 'Desde EC2', items: ['30% explicación', '50% práctica', '20% reto/evaluación'] },
          ]} />
          <Nota>
            <p>Porque aquí ya no basta decir "una instancia es un servidor virtual." Ahora deben ser capaces de entrar a AWS y reconocer qué están haciendo.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>🧪 Filosofía de los laboratorios</h3>
          <Nota><p>Cada laboratorio seguirá exactamente este patrón:</p></Nota>
          <Flow steps={[
            { n: 1, label: '¿Qué queremos lograr?' },
            { n: 2, label: '¿Qué recurso necesitamos?' },
            { n: 3, label: 'Configuración' },
            { n: 4, label: 'Prueba' },
            { n: 5, label: '¿Funcionó?' },
            { n: 6, label: 'Revisar costo' },
            { n: 7, label: 'LIMPIAR RECURSOS' },
          ]} />
          <Nota>
            <p>El último punto será obligatorio. Crear → probar → verificar → eliminar cuando ya no sea necesario. Eso nos ayuda a enseñar AWS y disciplina de costos al mismo tiempo. 💸</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>🏆 Proyecto final del módulo</h3>
          <Nota><p>En la Clase 7 plantearía:</p></Nota>
          <ConceptBadge>🌐 "Publica tu primera página desde EC2"</ConceptBadge>
          <p>El estudiante tendría que:</p>
          <ol className="plain-list">
            <li>Elegir una imagen de sistema.</li>
            <li>Elegir un tipo de instancia adecuado.</li>
            <li>Crear la instancia.</li>
            <li>Configurar un Security Group.</li>
            <li>Conectarse.</li>
            <li>Instalar un servidor web sencillo.</li>
            <li>Publicar una página.</li>
            <li>Acceder desde el navegador.</li>
            <li>Identificar almacenamiento e IP.</li>
            <li>Detener o eliminar los recursos.</li>
          </ol>
          <p>El resultado:</p>
          <Flow steps={[
            { emoji: '👩', label: 'Usuario' },
            { emoji: '🌐', label: 'Navegador' },
            { emoji: '📡', label: 'Internet' },
            { emoji: '🔐', label: 'Security Group' },
            { emoji: '🖥️', label: 'EC2' },
            { emoji: '🌐', label: 'Mi primera página' },
          ]} />
          <Nota>
            <p>Ahí conectaríamos elegantemente con el Módulo 0, porque el estudiante finalmente verá funcionando aquella historia inicial de: navegador → Internet → servidor → respuesta.</p>
          </Nota>
          <p>Solo que ahora: el servidor lo creó él mismo en AWS. ☁️🖥️</p>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow">🔗 Siguiente paso</div>
          <p>El siguiente paso es desarrollar <strong>Módulo 3 · Clase 1: "¿Qué es Amazon EC2 y para qué sirve?"</strong>, todavía muy sencilla, preparando el terreno para que en la Clase 3 lancemos la primera instancia.</p>
          <Link to="/aprendizaje/aws-desde-cero/modulo-3/clase-1" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 1: ¿Qué es Amazon EC2 y para qué sirve? →
          </Link>
        </div>

      </div>
    </div>
  );
}
