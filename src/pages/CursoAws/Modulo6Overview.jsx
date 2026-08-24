import { Link } from 'react-router-dom';
import {
  Icon, Nota, ConceptBadge, RoleGrid, Flow, CompareCols,
} from './lessonComponents.jsx';

export default function Modulo6Overview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 6</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 6: Bases de datos en AWS</h2>
      <p className="lesson-subtitle">
        Ocho clases de 45 minutos: RDS parece sencillo al principio, pero en cuanto aparecen motores, VPC, backups, Multi-AZ y seguridad, la cosa empieza a echar raíces.
      </p>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>Las 8 clases</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Clase</th><th>Tema</th><th>Objetivo principal</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>¿Qué es una base de datos?</td><td>Comprender tablas, registros, campos y relaciones</td></tr>
              <tr><td>2</td><td>¿Qué es Amazon RDS?</td><td>Entender una base de datos administrada en AWS</td></tr>
              <tr><td>3</td><td>Motores, instancias y almacenamiento</td><td>Elegir motor y capacidad según necesidad</td></tr>
              <tr><td>4</td><td>RDS dentro de una VPC</td><td>Diseñar acceso privado y Security Groups</td></tr>
              <tr><td>5</td><td>Backups, snapshots y restauración</td><td>Proteger y recuperar información</td></tr>
              <tr><td>6</td><td>Multi-AZ y alta disponibilidad</td><td>Comprender redundancia y failover</td></tr>
              <tr><td>7</td><td>Amazon Aurora + vistazo a DynamoDB</td><td>Reconocer otras opciones de bases de datos AWS</td></tr>
              <tr><td>8</td><td>Laboratorio integrador</td><td>Diseñar EC2 + VPC + RDS completo</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>Objetivo general del módulo</h3>
          <Nota><p>Al finalizar el Módulo 6, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es una base de datos y diferenciar archivo, almacenamiento de objetos y base de datos.</li>
            <li>Comprender qué significa base de datos relacional y reconocer tablas, columnas y registros.</li>
            <li>Comprender qué es Amazon RDS, reconocer motores compatibles, y explicar qué administra AWS y qué sigue administrando el cliente.</li>
            <li>Elegir capacidad básica y ubicar una base de datos dentro de una VPC sin exposición pública innecesaria.</li>
            <li>Comprender backups automáticos, snapshots y recuperación a un punto en el tiempo.</li>
            <li>Explicar qué significa Multi-AZ y comprender failover.</li>
            <li>Reconocer Amazon Aurora y diferenciar de manera introductoria RDS y DynamoDB.</li>
            <li>Diseñar una arquitectura EC2 + RDS.</li>
          </ul>
          <Nota><p>Amazon RDS es un servicio administrado para bases de datos relacionales y actualmente admite motores como Db2, MariaDB, Microsoft SQL Server, MySQL, Oracle y PostgreSQL. AWS se encarga de muchas tareas operativas, como aprovisionamiento, backups, parches y detección de fallas.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>El cambio de mentalidad</h3>
          <CompareCols cols={[
            { emoji: '🖥️', title: 'EC2', items: ['¿Dónde ejecuto mi aplicación?'] },
            { emoji: '📦', title: 'S3', items: ['¿Dónde almaceno objetos?'] },
            { emoji: '🌐', title: 'VPC', items: ['¿Cómo se comunican mis recursos?'] },
          ]} />
          <Nota><p>Ahora aparece otra necesidad. Tenemos cliente, pedido, producto — y queremos responder preguntas como "¿qué pedidos hizo Ana?" o "¿cuántos productos quedan?".</p></Nota>
          <ConceptBadge icon="database">Ahí aparece: BASE DE DATOS</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>¿Por qué no usamos simplemente archivos?</h3>
          <Nota><p>clientes.txt, productos.txt, pedidos.txt puede funcionar para algo diminuto, pero rápidamente aparecen problemas: ¿cómo relaciono clientes con pedidos? ¿cómo busco rápidamente? ¿qué pasa si dos personas modifican a la vez? ¿cómo evito información duplicada? ¿cómo controlo quién puede modificar?</p></Nota>
          <p>Una base de datos está diseñada para resolver este tipo de problemas de forma estructurada.</p>
        </section>

        <section className="lesson-section">
          <h3>La analogía principal: un supermercado</h3>
          <RoleGrid roles={[
            { icon: 'users', label: 'Clientes', desc: '' },
            { icon: 'package', label: 'Productos', desc: '' },
            { icon: 'file-text', label: 'Ventas', desc: '' },
            { icon: 'car', label: 'Proveedores', desc: '' },
            { icon: 'dollar-sign', label: 'Pagos', desc: '' },
          ]} />
          <p>En una base de datos organizamos la información en tablas.</p>
        </section>

        <section className="lesson-section">
          <h3>Tabla, columna y registro</h3>
          <RoleGrid roles={[
            { icon: 'clipboard-list', label: 'Tabla', desc: 'Agrupa un tipo de información' },
            { icon: 'tag', label: 'Columna', desc: 'Describe una característica' },
            { icon: 'file-text', label: 'Registro', desc: 'Representa un elemento concreto' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>Relaciones</h3>
          <Nota><p>Una base de datos relacional permite relacionar información: Cliente (ID 25) y Pedido (ID 900, Cliente_ID 25).</p></Nota>
          <Flow steps={[{ icon: 'user', label: 'Ana' }, { icon: 'file-text', label: 'Pedido 900' }, { icon: 'file-text', label: 'Pedido 915' }, { icon: 'file-text', label: 'Pedido 940' }]} />
        </section>

        <section className="lesson-section">
          <h3>El modelo de responsabilidad</h3>
          <CompareCols cols={[
            { emoji: '☁️', title: 'AWS administra', items: ['Infraestructura', 'Parte de mantenimiento', 'Backups según configuración', 'Parches administrados', 'Detección/recuperación de fallas'] },
            { emoji: '👤', title: 'Nosotros seguimos administrando', items: ['Datos', 'Esquema', 'Usuarios', 'Consultas', 'Configuración', 'Acceso', 'Decisiones de arquitectura'] },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>Errores que atacaremos durante el módulo</h3>
          <ul className="plain-list">
            <li>"RDS es como S3." — No.</li>
            <li>"RDS es una base de datos específica." — Es un servicio que soporta distintos motores.</li>
            <li>"AWS administra todo, así que yo no hago nada." — No.</li>
            <li>"Si tengo backup, tengo alta disponibilidad." — Son problemas diferentes.</li>
            <li>"Si tengo Multi-AZ, ya no necesito backups." — Incorrecto.</li>
            <li>"Para conectarme fácilmente hago la base pública." — Mala estrategia por defecto.</li>
            <li>"Aurora reemplaza siempre a RDS tradicional." — Depende del caso.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>Arquitectura que deben entender al terminar</h3>
          <Flow steps={[
            { icon: 'user', label: 'Usuario' },
            { icon: 'globe', label: 'Aplicación' },
            { icon: 'shield', label: 'SG-App' },
            { icon: 'globe', label: 'Amazon VPC' },
            { icon: 'lock', label: 'DB Subnets' },
            { icon: 'shield', label: 'SG-RDS' },
            { icon: 'database', label: 'RDS — Storage + Backup + Multi-AZ' },
          ]} />
          <p>Si una persona no técnica logra explicar ese dibujo, el módulo habrá cumplido su misión.</p>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Empecemos</div>
          <ConceptBadge icon="database">Módulo 6 · Clase 1 — ¿Qué es una base de datos? De una lista de clientes a información relacionada</ConceptBadge>
          <Nota><p>Esa primera clase no toca AWS todavía. Empieza con clientes, productos y pedidos en papel, luego muestra por qué los archivos se vuelven insuficientes, y recién al final aparece el concepto de base de datos relacional.</p></Nota>
          <Link to="/aprendizaje/aws-desde-cero/modulo-6/clase-1" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 1: ¿Qué es una base de datos? →
          </Link>
        </div>

      </div>
    </div>
  );
}
