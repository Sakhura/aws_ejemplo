import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, CompareCols, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  {
    q: '¿Qué representa un usuario IAM?',
    options: [
      { text: 'Una identidad.', correct: true },
      { text: 'Una Región.', correct: false },
      { text: 'Un centro de datos.', correct: false },
      { text: 'Un archivo.', correct: false },
    ],
  },
  {
    q: '¿Para qué sirve un grupo IAM?',
    options: [
      { text: 'Para almacenar imágenes.', correct: false },
      { text: 'Para agrupar usuarios y facilitar permisos comunes.', correct: true },
      { text: 'Para crear servidores.', correct: false },
      { text: 'Para reemplazar Internet.', correct: false },
    ],
  },
  {
    q: '¿Qué significa mínimo privilegio?',
    options: [
      { text: 'Dar acceso administrador a todos.', correct: false },
      { text: 'Dar únicamente los permisos necesarios.', correct: true },
      { text: 'No utilizar contraseñas.', correct: false },
      { text: 'Compartir cuentas.', correct: false },
    ],
  },
  {
    q: 'Tenemos 20 personas de Marketing con necesidades de acceso similares. ¿Qué puede facilitar la administración?',
    options: [
      { text: 'Grupo IAM.', correct: true },
      { text: 'Dirección IP.', correct: false },
      { text: 'DNS.', correct: false },
      { text: 'EC2.', correct: false },
    ],
  },
  {
    q: '¿Es recomendable utilizar el usuario root para las tareas diarias?',
    options: [
      { text: 'Sí.', correct: false },
      { text: 'No.', correct: true },
    ],
  },
  {
    q: '¿Qué agrega MFA?',
    options: [
      { text: 'Una segunda forma de verificación.', correct: true },
      { text: 'Más almacenamiento.', correct: false },
      { text: 'Una dirección IP.', correct: false },
      { text: 'Un servidor.', correct: false },
    ],
  },
];

export default function Modulo2Clase2() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 2 · Clase 2</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 2 · Clase 2: Usuarios, grupos y mínimo privilegio</h2>
      <p className="lesson-subtitle">
        Por qué no todas las personas de una empresa deberían tener los mismos permisos, y cómo IAM organiza eso con usuarios y grupos.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + actividad guiada</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisito ideal</div><div className="lesson-meta-value">Introducción a IAM de la Clase 1</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar la clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Comprender qué es un usuario IAM.</li>
            <li>Comprender qué es un grupo de usuarios.</li>
            <li>Diferenciar usuario y grupo.</li>
            <li>Entender por qué no todas las personas deben tener los mismos permisos.</li>
            <li>Aplicar el principio de mínimo privilegio.</li>
            <li>Diseñar conceptualmente accesos para una empresa sencilla.</li>
          </ul>
          <p>La gran idea será:</p>
          <Dialogo>🔐 Cada persona debería tener solamente los permisos que necesita para realizar su trabajo.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Nuestra empresa tiene un problema</h3>
          <Nota><p>Comenzaría con una empresa ficticia:</p></Nota>
          <ConceptBadge>CloudStore</ConceptBadge>
          <p>Tenemos cinco trabajadores:</p>
          <RoleGrid roles={[
            { icon: 'user', label: 'Carolina', desc: 'Gerente' },
            { icon: 'user', label: 'Pedro', desc: 'Informática' },
            { icon: 'user', label: 'Camila', desc: 'Marketing' },
            { icon: 'user', label: 'Andrés', desc: 'Finanzas' },
            { icon: 'user', label: 'Daniela', desc: 'Desarrollo' },
          ]} />
          <p>Todos necesitan utilizar diferentes recursos tecnológicos. Y alguien propone:</p>
          <Dialogo>"Hagamos una sola cuenta y compartamos la contraseña." 🚨</Dialogo>
          <p>Preguntamos a la clase:</p>
          <Dialogo>¿Les parece una buena idea?</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>3. Una contraseña para todos</h3>
          <Nota>
            <p>No estoy de acuerdo porque compartir una misma identidad elimina gran parte de nuestra capacidad de controlar y rastrear quién realizó una acción. Esto es lo que haría en su lugar: cada persona debería tener su propia identidad.</p>
          </Nota>
          <p>El riesgo del enfoque compartido es muy concreto. Supongamos que alguien elimina:</p>
          <ConceptBadge variant="danger">clientes.xlsx</ConceptBadge>
          <p>Preguntamos:</p>
          <Dialogo>"¿Quién lo eliminó?"</Dialogo>
          <p>Respuesta: 🤷 Todos utilizaron la misma cuenta.</p>
        </section>

        <section className="lesson-section">
          <h3>4. Aparece el usuario</h3>
          <Nota><p>En IAM podemos trabajar con usuarios que representan identidades con las que se interactúa con AWS.</p></Nota>
          <p>Para nuestro nivel inicial:</p>
          <Dialogo>Usuario IAM = identidad individual dentro de AWS a la que podemos asignar permisos.</Dialogo>
          <p>Ejemplo:</p>
          <RoleGrid roles={[
            { icon: 'user', label: 'Carolina', desc: '' },
            { icon: 'user', label: 'Pedro', desc: '' },
            { icon: 'user', label: 'Camila', desc: '' },
            { icon: 'user', label: 'Andrés', desc: '' },
            { icon: 'user', label: 'Daniela', desc: '' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>5. Analogía de la credencial</h3>
          <Nota><p>Imaginemos una universidad. Cada trabajador tiene una credencial.</p></Nota>
          <ConceptBadge>Sabina — 👩‍🏫 Docente</ConceptBadge>
          <p>Esa credencial identifica quién soy. Pero la credencial también puede determinar a qué lugares puedo entrar. Por ejemplo:</p>
          <table className="table lesson-summary-table">
            <thead><tr><th>Lugar</th><th>Acceso</th></tr></thead>
            <tbody>
              <tr><td>Sala docentes</td><td>✅</td></tr>
              <tr><td>Biblioteca</td><td>✅</td></tr>
              <tr><td>Sala servidores</td><td>❌</td></tr>
              <tr><td>Oficina rectoría</td><td>❌</td></tr>
            </tbody>
          </table>
          <Nota><p>Aquí aparecen dos conceptos diferentes:</p></Nota>
          <CompareCols cols={[
            { icon: 'user', title: 'Identidad', items: ['¿Quién eres?'] },
            { icon: 'tag', title: 'Permiso', items: ['¿Qué puedes hacer?'] },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>6. Identidad no significa permiso total</h3>
          <Nota><p>Crear un usuario no significa "puede hacer todo."</p></Nota>
          <p>Podemos tener a 👤 Camila (Marketing) y decidir que puede trabajar solamente con determinados recursos necesarios para Marketing. Mientras que 👨‍💻 Pedro (Informática) podría necesitar permisos diferentes.</p>
        </section>

        <section className="lesson-section">
          <h3>7. Primera regla de seguridad</h3>
          <Nota><p>Preguntaría:</p></Nota>
          <Dialogo>¿Todos los trabajadores necesitan acceso a todo?</Dialogo>
          <p>Normalmente: ❌ No.</p>
          <p>La persona de Marketing probablemente no necesita administrar bases de datos de producción. Finanzas probablemente no necesita eliminar servidores. Y un desarrollador no necesariamente necesita administrar la facturación de AWS.</p>
        </section>

        <section className="lesson-section">
          <h3>8. El hotel de las llaves</h3>
          <Nota><p>Imaginemos un hotel. Tenemos diferentes trabajadores: 👩 Recepción, 👨 Cocina, 👩 Limpieza, 👨 Administración.</p></Nota>
          <Dialogo>¿Le entregamos a cada trabajador una llave maestra? 🔑🔑🔑🔑</Dialogo>
          <p>No sería una gran estrategia. En cambio:</p>
          <table className="table lesson-summary-table">
            <thead><tr><th>Trabajador</th><th>Llave</th></tr></thead>
            <tbody>
              <tr><td>👩 Recepción</td><td>🔑 Recepción</td></tr>
              <tr><td>👨 Cocina</td><td>🔑 Cocina</td></tr>
              <tr><td>👩 Limpieza</td><td>🔑 Habitaciones necesarias</td></tr>
              <tr><td>👨 Administración</td><td>🔑 Oficinas administrativas</td></tr>
            </tbody>
          </table>
          <p>Cada persona recibe las llaves necesarias.</p>
        </section>

        <section className="lesson-section">
          <h3>9. Principio de mínimo privilegio</h3>
          <Nota><p>Llegamos a uno de los conceptos de seguridad más importantes del curso:</p></Nota>
          <ConceptBadge>Principle of Least Privilege — Principio de mínimo privilegio</ConceptBadge>
          <p>Significa: dar solamente los permisos necesarios para realizar una tarea. Ni más. Ni menos.</p>
        </section>

        <section className="lesson-section">
          <h3>10. Analogía del videojuego</h3>
          <Nota><p>Pensemos en diferentes personajes:</p></Nota>
          <RoleGrid roles={[
            { emoji: '⚔️', label: 'Guerrero', desc: '' },
            { emoji: '🧙', label: 'Mago', desc: '' },
            { emoji: '🏹', label: 'Arquero', desc: '' },
          ]} />
          <p>Cada personaje tiene habilidades diferentes. No todos necesitan: ⚔️ espada, 🪄 magia, 🏹 arco.</p>
          <Nota><p>En AWS ocurre algo parecido. Cada usuario debería tener los permisos apropiados para su función.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>11. Volvamos a CloudStore</h3>
          <CompareCols cols={[
            { icon: 'user', title: 'Camila — Marketing', items: ['📸 subir imágenes', '👀 ver imágenes', '❌ no necesita eliminar servidores'] },
            { icon: 'user', title: 'Pedro — Infraestructura', items: ['🖥️ administrar determinados servidores', '❌ no necesariamente administra facturación'] },
            { icon: 'user', title: 'Andrés — Finanzas', items: ['💰 consultar información de costos', '❌ no necesita modificar aplicaciones'] },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>12. Aparece otro problema</h3>
          <Nota><p>Ahora nuestra empresa crece. Tenemos: 👥 100 trabajadores. 20 pertenecen a Marketing.</p></Nota>
          <p>Tenemos que configurar los mismos permisos para Marketing01, Marketing02, Marketing03... hasta Marketing20.</p>
          <p>Hacerlo individualmente puede convertirse rápidamente en una pequeña fábrica de errores.</p>
        </section>

        <section className="lesson-section">
          <h3>13. Aparecen los grupos</h3>
          <Nota><p>Los grupos de usuarios IAM permiten agrupar usuarios y facilitar la administración de permisos comunes.</p></Nota>
          <p>Para nuestro nivel:</p>
          <Dialogo>Grupo = conjunto de usuarios que necesitan permisos similares.</Dialogo>
          <InfoBox title="👥 MARKETING" items={['👤 Camila', '👤 Andrea', '👤 Juan', '👤 María']} />
        </section>

        <section className="lesson-section">
          <h3>14. Los permisos se pueden administrar mediante el grupo</h3>
          <Nota><p>Conceptualmente podemos establecer:</p></Nota>
          <Flow steps={[
            { icon: 'users', label: 'MARKETING' },
            { icon: 'tag', label: 'Permisos Marketing', caption: '👀 Ver imágenes · ⬆️ Subir imágenes' },
          ]} />
          <p>Los miembros del grupo obtienen los permisos asociados al grupo. Esto simplifica la administración.</p>
        </section>

        <section className="lesson-section">
          <h3>15. Analogía académica</h3>
          <Nota><p>Pensemos en una institución.</p></Nota>
          <InfoBox title="👥 DOCENTES" items={['👩 Sabina', '👨 Pedro', '👩 Daniela', '👨 Carlos']} />
          <p>Todos los docentes necesitan: 📚 acceder a materiales, 📝 trabajar con recursos académicos.</p>
          <p>En lugar de administrar repetidamente los mismos permisos:</p>
          <Flow steps={[
            { icon: 'users', label: 'DOCENTES' },
            { icon: 'tag', label: 'Permisos docentes' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>16. ¿Qué pasa cuando llega un nuevo docente?</h3>
          <Nota><p>Supongamos que llega: 👩 Fernanda. No necesitamos reconstruir todos los permisos desde cero.</p></Nota>
          <Flow steps={[
            { icon: 'user', label: 'Fernanda' },
            { icon: 'users', label: 'DOCENTES' },
            { icon: 'tag', label: 'Permisos docentes' },
          ]} />
          <p>Mucho más ordenado.</p>
        </section>

        <section className="lesson-section">
          <h3>17. ¿Y si cambia de departamento?</h3>
          <Nota><p>Supongamos que Camila pasa de 🎨 Marketing a 💰 Finanzas. Podemos cambiar su pertenencia a grupos según corresponda.</p></Nota>
          <CompareCols cols={[
            { icon: 'user', title: 'Antes', items: ['Camila → 👥 Marketing'] },
            { icon: 'user', title: 'Después', items: ['Camila → 👥 Finanzas'] },
          ]} />
          <Nota><p>Esto ayuda a administrar accesos conforme cambian las funciones.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>18. Usuario vs. Grupo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th></th><th>Usuario 👤</th><th>Grupo 👥</th></tr></thead>
            <tbody>
              <tr><td>Representa</td><td>Una identidad</td><td>Conjunto de usuarios</td></tr>
              <tr><td>Puede iniciar sesión</td><td>Puede corresponder según configuración</td><td>No</td></tr>
              <tr><td>Facilita permisos comunes</td><td>Individualmente</td><td>Sí</td></tr>
              <tr><td>Ejemplo</td><td>Camila</td><td>Marketing</td></tr>
            </tbody>
          </table>
          <p>La frase para recordar:</p>
          <p>👤 Usuario = persona/identidad — 👥 Grupo = personas con necesidades de permisos similares</p>
        </section>

        <section className="lesson-section">
          <h3>19. El usuario más poderoso</h3>
          <Nota><p>Aquí introduciría una advertencia importante. Cuando se crea una cuenta AWS existe una identidad especialmente poderosa:</p></Nota>
          <ConceptBadge variant="warning">Root user</ConceptBadge>
          <p>El usuario raíz tiene acceso completo a la cuenta.</p>
          <Nota><p>Por eso no debería utilizarse para las tareas cotidianas.</p></Nota>
          <p>Analogía: es la llave maestra del edificio. No caminaríamos todo el día con ella colgando del cuello mientras vamos al supermercado. 🔑😅</p>
        </section>

        <section className="lesson-section">
          <h3>20. Root no es un usuario normal de IAM</h3>
          <Nota><p>Esta diferencia es importante:</p></Nota>
          <CompareCols cols={[
            { icon: 'crown', title: 'ROOT USER', items: ['Cuenta AWS', 'Acceso extremadamente poderoso'] },
            { icon: 'user', title: 'IAM USER', items: ['Identidad administrada mediante IAM', 'Permisos definidos'] },
          ]} />
          <Nota><p>No debemos confundirlos.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>21. Protección adicional</h3>
          <Nota><p>También comenzaría a introducir:</p></Nota>
          <ConceptBadge>MFA — Multi-Factor Authentication (autenticación multifactor)</ConceptBadge>
          <p>Explicación sencilla:</p>
          <Dialogo>No basta solamente con conocer una contraseña. Se solicita una segunda comprobación.</Dialogo>
          <p>Ejemplo: 🔑 Contraseña + 📱 Código/dispositivo.</p>
        </section>

        <section className="lesson-section">
          <h3>22. Analogía bancaria</h3>
          <Nota><p>Muchos estudiantes ya conocen algo parecido. Para realizar ciertas operaciones:</p></Nota>
          <ol className="plain-list">
            <li>ingresamos contraseña;</li>
            <li>recibimos o generamos una segunda validación;</li>
            <li>confirmamos.</li>
          </ol>
          <p>La idea:</p>
          <Dialogo>Si alguien obtiene solamente nuestra contraseña, todavía existe otra barrera.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>23. Actividad: ¿quién debería tener acceso?</h3>
          <Nota><p>Presentamos cuatro trabajadores y cuatro acciones. Los estudiantes deben relacionarlos.</p></Nota>
          <p>👩 Camila (Marketing) · 👨 Pedro (Infraestructura) · 👩 Daniela (Desarrollo) · 👨 Andrés (Finanzas)</p>
          <p>📸 subir imágenes · 🖥️ administrar servidores · 💰 consultar costos · 👨‍💻 trabajar con aplicación</p>
          <Reveal label="Ver una solución simplificada (probable)">
            <table className="table lesson-summary-table">
              <thead><tr><th>Usuario</th><th>Necesidad principal</th></tr></thead>
              <tbody>
                <tr><td>Camila</td><td>📸 Imágenes</td></tr>
                <tr><td>Pedro</td><td>🖥️ Servidores</td></tr>
                <tr><td>Daniela</td><td>👨‍💻 Aplicación</td></tr>
                <tr><td>Andrés</td><td>💰 Costos</td></tr>
              </tbody>
            </table>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>24. Ahora aparece el jefe</h3>
          <Nota><p>El gerente dice:</p></Nota>
          <Dialogo>"Para evitar problemas, démosles acceso de administrador a todos."</Dialogo>
          <p>Pregunta: ¿Buena idea?</p>
          <ConceptBadge variant="danger">No</ConceptBadge>
          <Nota>
            <p>No estoy de acuerdo porque entregar permisos innecesarios aumenta el impacto potencial de errores, credenciales comprometidas o acciones no deseadas. Esto es lo que haría en su lugar: aplicar mínimo privilegio. El riesgo del enfoque del gerente es que una cuenta que jamás necesitó administrar recursos termine teniendo capacidad para modificarlos o eliminarlos.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>25. Ejemplo</h3>
          <p>Camila solamente necesita: 📸 subir imágenes. Pero le entregamos: 👑 permisos administrativos.</p>
          <p>Un día selecciona accidentalmente: 🗑️ eliminar.</p>
          <p>El problema no fue necesariamente Camila.</p>
          <QaItem question="¿Cuál fue realmente el problema?" answer="¿Por qué tenía permiso para hacerlo?" />
        </section>

        <section className="lesson-section">
          <h3>26. Cambio de mentalidad</h3>
          <Nota><p>Seguridad no significa solamente "evitar hackers." También significa reducir:</p></Nota>
          <ul className="plain-list">
            <li>⚠️ errores humanos</li>
            <li>⚠️ accesos innecesarios</li>
            <li>⚠️ configuraciones incorrectas</li>
            <li>⚠️ impacto de cuentas comprometidas</li>
          </ul>
          <p>Por eso mínimo privilegio es tan importante.</p>
        </section>

        <section className="lesson-section">
          <h3>27. Actividad grupal: Hospital Cloud</h3>
          <Nota><p>Tenemos:</p></Nota>
          <ConceptBadge>Hospital CloudCare</ConceptBadge>
          <p>Trabajan: 👩‍⚕️ Médicos, 👩‍💼 Administración, 👨‍💻 Informática, 💰 Finanzas.</p>
          <p>Los estudiantes deben proponer grupos: MEDICOS, ADMINISTRACION, INFORMATICA, FINANZAS.</p>
          <QaItem question="¿Todos deberían tener los mismos permisos?" answer="No, porque realizan funciones diferentes." />
        </section>

        <section className="lesson-section">
          <h3>28. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>29. Reto de la clase</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge>Universidad Cloud</ConceptBadge>
          <p>Tenemos seis trabajadores: 👩 Ana (Docente), 👨 Pedro (Docente), 👩 Carla (Finanzas), 👨 Diego (Informática), 👩 Sofía (Informática), 👨 Luis (Marketing).</p>
          <p>Deben diseñar los grupos.</p>
          <Reveal label="Ver posible solución">
            <InfoBox title="👥 DOCENTES" items={['👩 Ana', '👨 Pedro']} />
            <InfoBox title="👥 FINANZAS" items={['👩 Carla']} />
            <InfoBox title="👥 INFORMATICA" items={['👨 Diego', '👩 Sofía']} />
            <InfoBox title="👥 MARKETING" items={['👨 Luis']} />
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>30. Segunda parte del reto</h3>
          <Nota><p>Ahora deben decidir qué grupo debería poder:</p></Nota>
          <table className="table lesson-summary-table">
            <thead><tr><th>Acción</th><th>Docentes</th><th>Finanzas</th><th>Informática</th><th>Marketing</th></tr></thead>
            <tbody>
              <tr><td>Material académico</td><td>✅</td><td>❌</td><td>según necesidad</td><td>❌</td></tr>
              <tr><td>Costos/facturación</td><td>❌</td><td>✅</td><td>según función</td><td>❌</td></tr>
              <tr><td>Administrar infraestructura</td><td>❌</td><td>❌</td><td>✅</td><td>❌</td></tr>
              <tr><td>Recursos de marketing</td><td>❌</td><td>❌</td><td>❌</td><td>✅</td></tr>
            </tbody>
          </table>
          <Nota>
            <p>Lo importante no es que esta matriz sea universalmente perfecta. Queremos que argumenten: "Esta persona necesita este permiso por esta razón."</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>31. Pregunta trampa</h3>
          <Nota><p>Preguntaría:</p></Nota>
          <Dialogo>"Si confío completamente en una persona, ¿debería darle acceso administrador?"</Dialogo>
          <ConceptBadge variant="danger">No necesariamente</ConceptBadge>
          <Nota>
            <p>Mínimo privilegio no es una declaración de desconfianza. Es una forma de limitar qué puede ocurrir si existe un error o una cuenta es comprometida.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>32. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>👤 Usuario IAM</td><td>Identidad individual</td></tr>
              <tr><td>👥 Grupo</td><td>Conjunto de usuarios</td></tr>
              <tr><td>🎫 Permiso</td><td>Qué puede hacer</td></tr>
              <tr><td>🔐 Mínimo privilegio</td><td>Solo permisos necesarios</td></tr>
              <tr><td>👑 Root</td><td>Identidad principal y altamente privilegiada de la cuenta</td></tr>
              <tr><td>📱 MFA</td><td>Segunda comprobación de identidad</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>33. Ticket de salida</h3>
          <Nota><p>Cada estudiante responde:</p></Nota>
          <Dialogo>Camila trabaja en Marketing y solamente necesita subir y visualizar imágenes. ¿Le darías acceso administrador? ¿Por qué?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>No. Le daría solamente los permisos necesarios para realizar su trabajo, aplicando mínimo privilegio.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 3</div>
          <Nota><p>Cerraría escribiendo:</p></Nota>
          <Flow steps={[
            { icon: 'user', label: 'Camila' },
            { icon: 'users', label: 'Marketing' },
            { n: '?', label: '¿PERMISOS?' },
          ]} />
          <p>Y preguntaría:</p>
          <Dialogo>"Ya sabemos quién es Camila y a qué grupo pertenece. Pero ¿cómo le decimos realmente a AWS qué puede y qué no puede hacer?"</Dialogo>
          <p>Ahí aparece el siguiente gran concepto:</p>
          <ConceptBadge>POLÍTICAS IAM</ConceptBadge>
          <p>Y esta vez ya tendrá sentido.</p>
          <Link to="/aprendizaje/aws-desde-cero/modulo-2/clase-3" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 3: Políticas IAM, las reglas de acceso →
          </Link>
        </div>

      </div>
    </div>
  );
}
