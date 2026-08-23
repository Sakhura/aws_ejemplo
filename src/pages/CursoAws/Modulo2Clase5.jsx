import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, CompareCols, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const CODE_LEAK = `ACCESS_KEY = "ABC123..."
SECRET_KEY = "SUPERSECRETO..."

git push`;

const CODE_WILDCARD = `Action: *
Resource: *`;

const QUIZ_SEGURO_PELIGROSO = [
  { q: 'Activar MFA.', options: [{ text: '🟢 Seguro', correct: true }, { text: '🔴 Peligroso', correct: false }] },
  { q: 'Compartir contraseña por WhatsApp.', options: [{ text: '🟢 Seguro', correct: false }, { text: '🔴 Peligroso', correct: true }] },
  { q: 'Subir una Secret Access Key a GitHub público.', options: [{ text: '🟢 Seguro', correct: false }, { text: '🔴 Peligroso', correct: true }] },
  { q: 'Aplicar mínimo privilegio.', options: [{ text: '🟢 Seguro', correct: true }, { text: '🔴 Peligroso', correct: false }] },
  { q: 'Usar root para todas las actividades.', options: [{ text: '🟢 Seguro', correct: false }, { text: '🔴 Peligroso', correct: true }] },
  { q: 'Usar un rol apropiado para que EC2 acceda a S3.', options: [{ text: '🟢 Seguro', correct: true }, { text: '🔴 Peligroso', correct: false }] },
  { q: 'Dar AdministratorAccess a todos "por comodidad".', options: [{ text: '🟢 Seguro', correct: false }, { text: '🔴 Peligroso', correct: true }] },
];

const QUIZ_QUESTIONS = [
  { q: '¿Qué agrega MFA?', options: [{ text: 'Almacenamiento.', correct: false }, { text: 'Una verificación adicional.', correct: true }, { text: 'Una Región.', correct: false }, { text: 'Una base de datos.', correct: false }] },
  { q: '¿Deberíamos publicar una Secret Access Key?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Es recomendable utilizar root diariamente?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Qué es una Access Key?', options: [{ text: 'Una credencial para acceso programático.', correct: true }, { text: 'Un servidor.', correct: false }, { text: 'Un bucket.', correct: false }, { text: 'Una Región.', correct: false }] },
  { q: 'Una aplicación EC2 necesita acceder a S3. ¿Qué deberíamos considerar?', options: [{ text: 'Escribir credenciales permanentes en el código.', correct: false }, { text: 'Utilizar un rol IAM apropiado.', correct: true }, { text: 'Compartir root.', correct: false }, { text: 'Desactivar IAM.', correct: false }] },
  { q: '¿Qué hacemos si creemos que una credencial fue expuesta?', options: [{ text: 'Esperar.', correct: false }, { text: 'Publicarla nuevamente.', correct: false }, { text: 'Revocarla o deshabilitarla y revisar actividad.', correct: true }, { text: 'Ignorarla si todavía funciona.', correct: false }] },
];

export default function Modulo2Clase5() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 2 · Clase 5</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 2 · Clase 5: Credenciales, contraseñas, MFA y buenas prácticas</h2>
      <p className="lesson-subtitle">
        Cómo proteger las identidades que construimos en las clases anteriores: contraseñas, MFA, Access Keys y los errores más comunes.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + casos + actividad práctica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 2, Clases 1 a 4</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar la clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué son las credenciales.</li>
            <li>Diferenciar contraseña y Access Key.</li>
            <li>Comprender qué es MFA y por qué agrega protección.</li>
            <li>Reconocer el riesgo de compartir credenciales.</li>
            <li>Comprender por qué no debemos guardar credenciales en código.</li>
            <li>Reconocer la importancia de proteger el usuario root.</li>
            <li>Aplicar buenas prácticas básicas de seguridad.</li>
            <li>Relacionar seguridad con mínimo privilegio y roles.</li>
          </ul>
          <p>La idea que debe sobrevivir:</p>
          <Dialogo>🔐 Una credencial es una llave digital. Si alguien obtiene la llave, puede intentar utilizarla como si fuera su dueño.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Empecemos con una casa</h3>
          <Nota><p>Imaginemos que tenemos una casa. La puerta tiene 🔐 cerradura. Para abrirla necesitamos 🔑 llave. Ahora tenemos tres posibilidades.</p></Nota>
          <ul className="plain-list">
            <li>Situación A — Guardamos la llave. 👍</li>
            <li>Situación B — Prestamos copias a todas las personas que conocemos. 😬</li>
            <li>Situación C — Pegamos una copia de la llave afuera de la puerta. 🚨</li>
          </ul>
          <Dialogo>¿Cuál parece más peligrosa?</Dialogo>
          <p>Evidentemente C.</p>
          <Nota><p>Sin embargo, digitalmente hacemos cosas sorprendentemente parecidas.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>3. ¿Qué es una credencial?</h3>
          <Nota><p>Una credencial permite demostrar o utilizar una identidad frente a un sistema.</p></Nota>
          <p>Ejemplos cotidianos: 👤 usuario + contraseña, 📱 código de autenticación, 🔑 claves de acceso.</p>
          <Dialogo>Una credencial es algo utilizado para demostrar que estamos autorizados a acceder como una determinada identidad.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>4. Acceso de una persona</h3>
          <Nota><p>Una persona puede ingresar a AWS mediante una experiencia de inicio de sesión autorizada para ella.</p></Nota>
          <Flow steps={[
            { icon: 'user', label: 'Camila' },
            { icon: 'key', label: 'Autenticación' },
            { icon: 'lock', label: 'AWS' },
          ]} />
          <p>AWS necesita comprobar:</p>
          <Dialogo>¿Realmente eres Camila?</Dialogo>
          <p>Recordemos la Clase 1: 🪪 Autenticación.</p>
        </section>

        <section className="lesson-section">
          <h3>5. Contraseña</h3>
          <Nota><p>Una contraseña es una forma de autenticación basada en: algo que conoces.</p></Nota>
          <p>Ejemplo: 👩 Camila + 🔑 Contraseña. Pero aparece un problema.</p>
          <Dialogo>¿Qué ocurre si otra persona descubre esa contraseña?</Dialogo>
          <p>Ahora también conoce: 🔑 algo que Camila conoce.</p>
        </section>

        <section className="lesson-section">
          <h3>6. Una contraseña puede ser comprometida</h3>
          <Nota><p>Puede ocurrir por:</p></Nota>
          <ul className="plain-list">
            <li>🎣 phishing</li>
            <li>👀 exposición accidental</li>
            <li>📝 almacenamiento inseguro</li>
            <li>🔁 reutilización de contraseñas</li>
            <li>🤝 compartirla con otra persona</li>
          </ul>
          <p>Por eso no queremos depender exclusivamente de una contraseña.</p>
        </section>

        <section className="lesson-section">
          <h3>7. Aparece MFA</h3>
          <Nota>
            <p>MFA significa: Multi-Factor Authentication. En español: Autenticación multifactor. La idea es utilizar más de un factor para verificar la identidad.</p>
          </Nota>
          <Flow steps={[
            { icon: 'key', label: 'Contraseña' },
            { icon: 'smartphone', label: 'Segundo factor' },
            { icon: 'lock', label: 'Acceso' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>8. Analogía bancaria</h3>
          <Nota><p>Pensemos en una operación bancaria. Podemos necesitar 🔑 nuestra contraseña y además 📱 una segunda comprobación.</p></Nota>
          <p>Entonces, conocer solamente la contraseña puede no ser suficiente.</p>
          <Nota><p>MFA agrega una barrera adicional.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>9. MFA no significa invulnerable</h3>
          <Nota><p>No enseñaría: "Con MFA nadie puede entrar." Eso sería falso.</p></Nota>
          <Nota><p>MFA reduce significativamente ciertos riesgos, pero no elimina todos los posibles ataques o errores.</p></Nota>
          <p>Nuestra frase será:</p>
          <ConceptBadge>MFA agrega una capa adicional de protección.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>10. Recordemos al usuario root</h3>
          <Nota><p>Existe una identidad especialmente sensible:</p></Nota>
          <ConceptBadge variant="warning">AWS account root user</ConceptBadge>
          <p>Tiene acceso completo a la cuenta. Por eso necesita especial protección.</p>
          <p>La analogía: es la llave maestra del edificio.</p>
        </section>

        <section className="lesson-section">
          <h3>11. ¿Usamos root todos los días?</h3>
          <p>❌ No.</p>
          <Nota><p>AWS recomienda no utilizar el usuario root para las tareas cotidianas. Se reserva para tareas que requieren específicamente sus capacidades.</p></Nota>
          <InfoBox title="👑 ROOT" items={['🔐 Proteger', '📱 MFA', '🚫 No usar diariamente']} />
        </section>

        <section className="lesson-section">
          <h3>12. Primera regla importante</h3>
          <Dialogo>No compartimos las credenciales del usuario root.</Dialogo>
          <p>Ni: 👩 compañero, 👨 jefe, 👩‍💻 desarrollador, 👨‍🎓 estudiante.</p>
          <p>Cada persona debería utilizar el mecanismo de acceso que corresponda.</p>
        </section>

        <section className="lesson-section">
          <h3>13. Ahora aparece otro tipo de credencial</h3>
          <Nota><p>No todas las interacciones con AWS ocurren entrando visualmente a la consola. También podemos acceder programáticamente mediante herramientas o aplicaciones.</p></Nota>
          <p>Aquí pueden aparecer:</p>
          <ConceptBadge>Access Keys</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>14. ¿Qué es una Access Key?</h3>
          <Nota><p>Para este nivel: es una credencial utilizada para acceso programático a AWS.</p></Nota>
          <p>Tradicionalmente incluye elementos como:</p>
          <ConceptBadge>Access Key ID + Secret Access Key</ConceptBadge>
          <Nota><p>No necesitamos aprender todavía a generarlas. Primero debemos aprender: a no tratarlas como texto inofensivo.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>15. La Secret Access Key es un secreto</h3>
          <Nota><p>El nombre ya intenta darnos una pista bastante generosa. 😄</p></Nota>
          <p>Una Secret Access Key:</p>
          <ul className="plain-list">
            <li>❌ no debería publicarse;</li>
            <li>❌ no debería enviarse por chat;</li>
            <li>❌ no debería pegarse en una presentación;</li>
            <li>❌ no debería subirse a un repositorio público.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>16. El error clásico</h3>
          <Nota><p>Imaginemos este código ficticio:</p></Nota>
          <pre className="codeblock">{CODE_LEAK}</pre>
          <p>Repositorio público. 🌎 Ahora las credenciales pueden quedar expuestas.</p>
        </section>

        <section className="lesson-section">
          <h3>17. ¿Qué podría pasar?</h3>
          <Nota><p>Depende de los permisos de esas credenciales. Si tienen permisos excesivos, alguien podría intentar:</p></Nota>
          <ul className="plain-list">
            <li>🖥️ crear recursos;</li>
            <li>📦 acceder a información;</li>
            <li>🗑️ modificar o eliminar recursos;</li>
            <li>💰 generar costos;</li>
            <li>🔍 explorar la cuenta.</li>
          </ul>
          <Nota><p>Aquí entendemos por qué las clases anteriores importaban.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>18. Credencial + permisos</h3>
          <p>Una credencial comprometida es preocupante. Pero una credencial comprometida con:</p>
          <pre className="codeblock">{CODE_WILDCARD}</pre>
          <p>puede ser muchísimo más peligrosa. Por eso combinamos:</p>
          <ConceptBadge>Protección de credenciales + 🎯 Mínimo privilegio</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>19. Analogía del hotel</h3>
          <Nota><p>Imaginemos que alguien roba una tarjeta.</p></Nota>
          <CompareCols cols={[
            { icon: 'door', title: 'Tarjeta A', items: ['Solo abre: habitación 302.', '⚠️ Problema importante, pero limitado.'] },
            { icon: 'key', title: 'Tarjeta B', items: ['Abre: todas las habitaciones, caja fuerte, administración, instalaciones.', '🚨 Problema mucho mayor.'] },
          ]} />
          <Nota><p>Los permisos determinan cuánto puede hacer una identidad comprometida.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>20. ¿Recuerdan los roles?</h3>
          <Nota><p>En la Clase 4 vimos:</p></Nota>
          <Flow steps={[
            { icon: 'server', label: 'EC2' },
            { icon: 'users', label: 'IAM Role' },
            { icon: 'package', label: 'S3' },
          ]} />
          <Nota><p>Cuando un servicio AWS necesita acceder a otro, frecuentemente podemos utilizar roles en vez de guardar credenciales permanentes en el código.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>21. Evitemos esto</h3>
          <Flow steps={[
            { icon: 'server', label: 'Aplicación' },
            { icon: 'key', label: 'Access Key', caption: 'guardada en código' },
            { icon: 'package', label: 'S3' },
          ]} />
          <Nota>
            <p>No estoy de acuerdo con ese diseño porque expone credenciales de largo plazo innecesariamente. Esto es lo que haría en su lugar: cuando el escenario lo permita, utilizar un rol IAM con los permisos mínimos necesarios. El riesgo de guardar secretos en código es que terminen filtrados mediante repositorios, respaldos, logs o copias.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>22. Preferimos esto cuando corresponde</h3>
          <Flow steps={[
            { icon: 'server', label: 'EC2' },
            { icon: 'users', label: 'Rol IAM' },
            { icon: 'file-text', label: 'Permiso necesario' },
            { icon: 'package', label: 'S3' },
          ]} />
          <p>Sin una Access Key permanente escrita dentro de nuestra aplicación. Mucho más saludable. 🌱</p>
        </section>

        <section className="lesson-section">
          <h3>23. ¿Qué significa rotar una credencial?</h3>
          <Nota><p>Supongamos que tenemos una llave. Después de cierto escenario necesitamos 🔑 dejar de utilizarla y 🗝️ utilizar otra.</p></Nota>
          <Dialogo>Rotar una credencial significa reemplazarla de forma controlada.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>24. Pero no confundamos la prioridad</h3>
          <p>La solución no es:</p>
          <Dialogo>"Crear Access Keys para todo y cambiarlas constantemente."</Dialogo>
          <p>Primero preguntamos:</p>
          <Dialogo>¿Necesitamos realmente una credencial de largo plazo?</Dialogo>
          <p>Si podemos utilizar una alternativa temporal apropiada: 🎭 puede ser preferible.</p>
        </section>

        <section className="lesson-section">
          <h3>25. No compartir cuentas</h3>
          <Nota><p>Otra mala práctica:</p></Nota>
          <Flow steps={[
            { icon: 'users', label: 'Camila, Pedro, Daniela, Carlos' },
            { icon: 'user', label: 'usuario-compartido' },
            { icon: 'key', label: 'misma contraseña' },
          ]} />
          <p>Problemas: ❌ menor trazabilidad; ❌ difícil revocar a una sola persona; ❌ credencial ampliamente conocida; ❌ mayor superficie de riesgo.</p>
        </section>

        <section className="lesson-section">
          <h3>26. Mejor</h3>
          <Nota><p>Cada persona utiliza una identidad apropiada:</p></Nota>
          <ul className="plain-list">
            <li>👩 Camila → identidad Camila</li>
            <li>👨 Pedro → identidad Pedro</li>
            <li>👩 Daniela → identidad Daniela</li>
          </ul>
          <p>Así podemos administrar accesos individualmente.</p>
        </section>

        <section className="lesson-section">
          <h3>27. Seguridad tiene capas</h3>
          <Nota><p>Mostraría este esquema:</p></Nota>
          <RoleGrid roles={[
            { icon: 'lock', label: 'Credenciales', desc: '' },
            { icon: 'smartphone', label: 'MFA', desc: '' },
            { icon: 'target', label: 'Mínimo privilegio', desc: '' },
            { icon: 'users', label: 'Roles', desc: '' },
          ]} />
          <Nota><p>Ninguna medida trabaja completamente sola.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>28. Caso: correo sospechoso</h3>
          <Nota><p>Camila recibe:</p></Nota>
          <Dialogo>"AWS URGENTE: su cuenta será eliminada. Ingrese ahora." (con un enlace)</Dialogo>
          <QaItem question="¿Qué debería hacer?" answer="No debería introducir inmediatamente sus credenciales." />
          <Nota><p>Debemos desconfiar de solicitudes inesperadas y verificar que estamos utilizando los canales legítimos.</p></Nota>
          <p>Aquí presentamos:</p>
          <ConceptBadge variant="danger">Phishing</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>29. ¿Qué es phishing?</h3>
          <Nota><p>Es un intento de engañar a una persona para obtener información sensible o conseguir que realice una acción perjudicial.</p></Nota>
          <p>Puede buscar: 🔑 contraseñas; 💳 datos; 📱 códigos; 🗝️ credenciales.</p>
          <Nota><p>La tecnología puede tener veinte cerraduras, pero si entregamos voluntariamente las llaves al impostor, tenemos un problema.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>30. Nunca compartimos códigos MFA</h3>
          <Nota><p>Un código o aprobación MFA forma parte del proceso de autenticación. Si alguien llama diciendo:</p></Nota>
          <Dialogo>"Soy soporte de AWS, dime el código que apareció en tu teléfono." 🚨</Dialogo>
          <p>No deberíamos compartirlo.</p>
        </section>

        <section className="lesson-section">
          <h3>31. Juego: seguro o peligroso</h3>
          <Nota><p>Los estudiantes levantan 🟢 SEGURO o 🔴 PELIGROSO.</p></Nota>
          <Quiz questions={QUIZ_SEGURO_PELIGROSO} />
        </section>

        <section className="lesson-section">
          <h3>32. Actividad: encuentra los errores</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge variant="danger">Empresa CloudLoca</ConceptBadge>
          <p>Tiene estas reglas:</p>
          <ol className="plain-list">
            <li>Todos utilizan root.</li>
            <li>La contraseña está escrita en una pizarra.</li>
            <li>MFA está desactivado.</li>
            <li>Las Access Keys están en GitHub.</li>
            <li>Todos tienen permisos administrativos.</li>
            <li>EC2 utiliza credenciales permanentes guardadas en código.</li>
          </ol>
          <QaItem question="¿Cuántos problemas encuentran?" answer="🔥 Básicamente hemos construido un museo de malas decisiones. Los estudiantes deben corregir cada punto." />
        </section>

        <section className="lesson-section">
          <h3>33. Solución</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Problema</th><th>Mejora</th></tr></thead>
            <tbody>
              <tr><td>Uso diario de root</td><td>Reservarlo para tareas que lo requieran</td></tr>
              <tr><td>Contraseña compartida</td><td>Accesos individuales</td></tr>
              <tr><td>Sin MFA</td><td>Activar MFA</td></tr>
              <tr><td>Keys públicas</td><td>No exponer secretos</td></tr>
              <tr><td>Todos administradores</td><td>Mínimo privilegio</td></tr>
              <tr><td>Keys en EC2</td><td>Usar rol cuando corresponda</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>34. ¿Qué hago si expongo una Access Key?</h3>
          <Nota><p>Aquí sí debemos darles un procedimiento claro. Si creemos que una credencial fue expuesta: no esperamos a comprobar si alguien la utilizó. Debemos actuar.</p></Nota>
          <Flow steps={[
            { icon: 'bell', label: 'Detecto exposición' },
            { icon: 'lock', label: 'Deshabilitar/revocar credencial' },
            { icon: 'search', label: 'Revisar actividad' },
            { icon: 'settings', label: 'Corregir origen' },
            { icon: 'key', label: 'Crear reemplazo solo si es necesario' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>35. ¿Por qué revisar actividad?</h3>
          <Nota><p>Porque necesitamos determinar si la credencial comprometida fue utilizada. Más adelante conoceremos herramientas de AWS para auditoría y monitoreo.</p></Nota>
          <Dialogo>Una filtración no termina simplemente cambiando la contraseña o la clave. También debemos investigar qué ocurrió.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>36. Nuestro checklist de seguridad</h3>
          <Nota><p>Los estudiantes pueden guardar esta lista:</p></Nota>
          <ol className="plain-list">
            <li>🔐 No compartir credenciales.</li>
            <li>📱 Utilizar MFA.</li>
            <li>👑 Proteger especialmente root.</li>
            <li>🎯 Aplicar mínimo privilegio.</li>
            <li>🎭 Preferir roles y credenciales temporales cuando corresponda.</li>
            <li>🚫 No guardar secretos en código.</li>
            <li>🌎 No publicar Access Keys.</li>
            <li>🔍 Revisar accesos y permisos.</li>
            <li>🧹 Eliminar accesos que ya no sean necesarios.</li>
            <li>🚨 Actuar rápidamente ante una exposición.</li>
          </ol>
        </section>

        <section className="lesson-section">
          <h3>37. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>38. Reto de la clase</h3>
          <Nota><p>Presentamos este escenario:</p></Nota>
          <ConceptBadge variant="danger">"El desarrollador apurado"</ConceptBadge>
          <p>Pedro está desarrollando una aplicación. Necesita que EC2 lea archivos desde S3. Hace esto:</p>
          <ol className="plain-list">
            <li>Crea un usuario IAM.</li>
            <li>Le entrega permisos muy amplios.</li>
            <li>Genera Access Keys.</li>
            <li>Copia las claves dentro del código.</li>
            <li>Sube el proyecto a un repositorio público.</li>
            <li>No utiliza MFA en su acceso personal.</li>
          </ol>
          <p>😬</p>
          <Dialogo>¿Qué cambiarían?</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>39. Respuesta esperada</h3>
          <Reveal label="Ver respuesta esperada">
            <ul className="plain-list">
              <li>🚫 no guardar credenciales permanentes en código;</li>
              <li>🎭 considerar un rol para EC2;</li>
              <li>🎯 limitar permisos;</li>
              <li>🚫 no publicar secretos;</li>
              <li>📱 proteger las identidades humanas con MFA;</li>
              <li>🔍 si las claves ya fueron publicadas, tratarlas como comprometidas y actuar.</li>
            </ul>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>40. Reto nivel 2</h3>
          <Nota><p>Pedro dice:</p></Nota>
          <Dialogo>"Ya borré la Access Key de GitHub. Problema resuelto."</Dialogo>
          <p>¿Estamos tranquilos?</p>
          <ConceptBadge variant="danger">No</ConceptBadge>
          <Nota>
            <p>Una credencial publicada debe considerarse potencialmente comprometida aunque después se elimine del archivo visible. Puede permanecer en historial, copias o haber sido capturada mientras estuvo expuesta.</p>
          </Nota>
          <p>Por eso: debe revocarse o deshabilitarse y revisarse la actividad relacionada.</p>
        </section>

        <section className="lesson-section">
          <h3>41. La frase incómoda</h3>
          <Dialogo>Una contraseña excelente no arregla una arquitectura de permisos terrible.</Dialogo>
          <p>Podríamos tener 🔐 contraseña excelente, 📱 MFA, pero también 👑 permisos innecesariamente enormes. Seguimos teniendo riesgo.</p>
          <p>La seguridad necesita varias capas.</p>
        </section>

        <section className="lesson-section">
          <h3>42. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Idea sencilla</th></tr></thead>
            <tbody>
              <tr><td>🔑 Credencial</td><td>Llave digital</td></tr>
              <tr><td>🔐 Contraseña</td><td>Algo que conocemos</td></tr>
              <tr><td>📱 MFA</td><td>Verificación adicional</td></tr>
              <tr><td>🗝️ Access Key</td><td>Credencial programática</td></tr>
              <tr><td>👑 Root</td><td>Identidad especialmente poderosa</td></tr>
              <tr><td>🎭 Rol</td><td>Acceso mediante credenciales temporales</td></tr>
              <tr><td>🎯 Mínimo privilegio</td><td>Solo lo necesario</td></tr>
              <tr><td>🎣 Phishing</td><td>Engaño para obtener información o acciones</td></tr>
              <tr><td>🚨 Credencial filtrada</td><td>Revocar + investigar</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>43. Ticket de salida</h3>
          <Nota><p>Antes de salir, cada estudiante responde:</p></Nota>
          <Dialogo>Encuentras una Access Key dentro de un repositorio público. ¿Qué haces?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>La considero comprometida, la deshabilito o revoco cuanto antes, reviso la actividad asociada y corrijo la causa de la exposición.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 6</div>
          <Nota><p>Ahora ya conocemos las piezas:</p></Nota>
          <Flow steps={[
            { icon: 'lock', label: 'IAM' },
            { icon: 'user', label: 'Identidades · Roles · Políticas' },
            { icon: 'target', label: 'Permisos' },
            { icon: 'cloud', label: 'Recursos AWS' },
          ]} />
          <p>Y sabemos protegerlas con: 🔐 buenas prácticas, 📱 MFA, 🎯 mínimo privilegio, 🎭 acceso temporal cuando corresponde.</p>
          <p>Ahora falta comprobar si el estudiante realmente puede tomar decisiones de seguridad, no simplemente repetir definiciones.</p>
          <ConceptBadge>Módulo 2 · Clase 6 — Laboratorio y desafío final de IAM</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-2/clase-6" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 6: Laboratorio y desafío final de IAM →
          </Link>
        </div>

      </div>
    </div>
  );
}
