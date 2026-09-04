import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué responde la identidad?', options: [{ text: '¿Quién eres?', correct: true }, { text: '¿Qué puedes hacer?', correct: false }, { text: '¿Puedes demostrarlo?', correct: false }, { text: '¿Cuánto cuesta?', correct: false }] },
  { q: '¿Qué responde la autenticación?', options: [{ text: '¿Puedes demostrar que eres quien dices ser?', correct: true }, { text: '¿Quién eres?', correct: false }, { text: '¿Qué puedes hacer?', correct: false }, { text: '¿Cuándo ocurrió?', correct: false }] },
  { q: '¿Qué responde la autorización?', options: [{ text: '¿Qué puedes hacer una vez dentro?', correct: true }, { text: '¿Quién eres?', correct: false }, { text: '¿Puedes demostrarlo?', correct: false }, { text: '¿Cuánto cuesta?', correct: false }] },
  { q: '¿Qué es MFA?', options: [{ text: 'Un segundo factor de verificación además de la contraseña.', correct: true }, { text: 'Un tipo de política IAM.', correct: false }, { text: 'Un servicio de almacenamiento.', correct: false }, { text: 'Un tipo de instancia EC2.', correct: false }] },
  { q: '¿Cuáles son los tres factores clásicos de autenticación?', options: [{ text: 'Algo que sabes, algo que tienes, algo que eres.', correct: true }, { text: 'Usuario, grupo, rol.', correct: false }, { text: 'Allow, Deny, Condition.', correct: false }, { text: 'CPU, RAM, disco.', correct: false }] },
  { q: '¿Qué es la cuenta root en AWS?', options: [{ text: 'La identidad creada al abrir la cuenta de AWS, con acceso total y sin restricciones posibles.', correct: true }, { text: 'Un usuario IAM más, igual a cualquier otro.', correct: false }, { text: 'Un rol temporal para EC2.', correct: false }, { text: 'Un grupo de administradores.', correct: false }] },
  { q: '¿Para qué debería usarse la cuenta root en el trabajo diario?', options: [{ text: 'Para casi nada — se reserva para tareas que exigen explícitamente root.', correct: true }, { text: 'Para todo, es más simple.', correct: false }, { text: 'Solo para crear buckets S3.', correct: false }, { text: 'Solo los fines de semana.', correct: false }] },
  { q: '¿Qué deberíamos activar en la cuenta root apenas se crea?', options: [{ text: 'MFA.', correct: true }, { text: 'Access Keys de uso diario.', correct: false }, { text: 'Un Security Group abierto.', correct: false }, { text: 'Una alarma de CPU.', correct: false }] },
  { q: '¿Tener una contraseña larga es suficiente para considerar protegida una identidad?', options: [{ text: 'Sí.', correct: false }, { text: 'No, una contraseña sigue siendo un único factor.', correct: true }] },
  { q: '¿Autenticarse exitosamente significa automáticamente tener permiso para hacer cualquier cosa?', options: [{ text: 'Sí.', correct: false }, { text: 'No — autenticación y autorización son preguntas distintas.', correct: true }] },
];

export default function Modulo9Clase1() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 9 · Clase 1</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 9 · Clase 1: Identidad, autenticación, autorización, MFA y la cuenta root — quién puede entrar a AWS y cómo protegemos ese acceso</h2>
      <p className="lesson-subtitle">
        Identidad, autenticación y autorización no son sinónimos: son tres preguntas distintas, y confundirlas es donde empiezan la mayoría de los incidentes de seguridad.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + analogías + casos + actividades + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulos 0 a 8</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Diferenciar identidad, autenticación y autorización como tres preguntas distintas.</li>
            <li>Explicar los tres factores clásicos de autenticación: algo que sabes, algo que tienes, algo que eres.</li>
            <li>Comprender qué es MFA y por qué una contraseña sola no basta.</li>
            <li>Explicar qué es la cuenta root de AWS y en qué se diferencia de un usuario IAM.</li>
            <li>Reconocer por qué la cuenta root no debe usarse para el trabajo diario.</li>
            <li>Aplicar buenas prácticas para proteger la cuenta root: MFA, sin Access Keys, credenciales resguardadas.</li>
            <li>Reconocer que autenticarse no equivale a estar autorizado para todo.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-3. Empecemos con un problema</h3>
          <Flow steps={[{ icon: 'globe', label: 'Usuarios' }, { icon: 'settings', label: 'ALB' }, { icon: 'server', label: 'EC2 × N' }, { icon: 'database', label: 'RDS' }]} />
          <p>CloudShop ya tiene S3, Auto Scaling, CloudWatch, Alarms y Logs. Todo funciona. Hasta que alguien pregunta: &quot;¿quién puede entrar a todo esto?&quot; Y otra persona responde: &quot;todos somos Administrator para no complicarnos, y compartimos la contraseña de la cuenta root en un chat interno cuando alguien la necesita.&quot;</p>
          <ConceptBadge icon="alert-triangle">Esa respuesta suena práctica hoy. Es exactamente el tipo de decisión que un incidente de seguridad hace muy cara mañana.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>4-6. Tres preguntas que no son la misma pregunta</h3>
          <p>Antes de hablar de contraseñas o de MFA, necesitamos separar tres ideas que solemos mezclar en una sola: identidad, autenticación y autorización.</p>
          <RoleGrid roles={[
            { icon: 'id-card', label: 'Identidad', desc: '¿Quién eres? (un nombre, un usuario, una cuenta)' },
            { icon: 'key', label: 'Autenticación', desc: '¿Puedes demostrar que realmente eres quien dices ser?' },
            { icon: 'shield', label: 'Autorización', desc: '¿Qué puedes hacer una vez que entraste?' },
          ]} />
          <Dialogo>En un aeropuerto: el pasaporte dice quién eres (identidad). El oficial compara tu cara con la foto y verifica el documento (autenticación). El tipo de boleto determina si entras a primera clase o a clase económica (autorización). Las tres cosas son necesarias, y ninguna reemplaza a las otras dos.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>7-9. Identidad: ¿quién eres?</h3>
          <p>Una identidad es simplemente un &quot;alguien&quot; o un &quot;algo&quot; reconocible dentro de un sistema: una persona, un usuario IAM, un rol, incluso una aplicación. AWS necesita saber qué identidad está intentando hacer algo antes de decidir cualquier otra cosa.</p>
          <Nota><p>Tener una identidad no significa nada por sí solo. Un carnet con tu nombre no te abre ninguna puerta si nadie lo verifica. La identidad es el punto de partida, no el punto de llegada.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>10-13. Autenticación: demostrar que eres quien dices ser</h3>
          <p>Autenticarse es el proceso de probar una identidad. Cuando iniciamos sesión con un usuario y una contraseña, no estamos anunciando quiénes somos — estamos demostrándolo con algo que, en teoría, solo nosotros conocemos.</p>
          <p>Existen tres factores clásicos de autenticación, y no son intercambiables:</p>
          <RoleGrid roles={[
            { icon: 'lightbulb', label: 'Algo que sabes', desc: 'Una contraseña, un PIN' },
            { icon: 'smartphone', label: 'Algo que tienes', desc: 'Un teléfono, una llave física, un dispositivo MFA' },
            { icon: 'user', label: 'Algo que eres', desc: 'Huella digital, reconocimiento facial' },
          ]} />
          <Dialogo>Una contraseña es como la llave de tu casa: si alguien la copia, esa persona puede entrar exactamente igual que tú, y la puerta nunca se entera de la diferencia.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>14-16. Por qué un solo factor no alcanza</h3>
          <p>Una contraseña, sin importar cuán larga o compleja sea, sigue siendo un único factor: algo que sabes. Si esa contraseña se filtra en una brecha de datos, se adivina, se reutiliza en otro sitio comprometido o queda escrita en un post-it, cualquiera que la obtenga puede autenticarse exactamente como si fuera nosotros.</p>
          <ConceptBadge icon="key">Una contraseña prueba que alguien conoce un secreto. No prueba que ese alguien seas tú.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>17-20. Aquí aparece MFA</h3>
          <p><strong>MFA (Multi-Factor Authentication)</strong> significa exigir más de un factor para autenticarse. En AWS, lo habitual es combinar &quot;algo que sabes&quot; (la contraseña) con &quot;algo que tienes&quot; (un dispositivo que genera un código temporal, como una app de autenticación en el teléfono).</p>
          <Flow steps={[{ label: 'Usuario + Contraseña' }, { label: '+ Código MFA del teléfono' }, { label: 'Autenticación completa' }]} />
          <Nota><p>Aunque alguien robe la contraseña, sin el segundo factor no puede completar la autenticación. Eso no vuelve la cuenta &quot;imposible de vulnerar&quot;, pero cierra la puerta que se abre con más frecuencia en incidentes reales: contraseñas filtradas o reutilizadas.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>21-22. Autorización: lo que puedes hacer una vez dentro</h3>
          <p>Superar la autenticación no significa tener permiso para hacer cualquier cosa. La autorización es la pregunta siguiente, y en AWS la resuelven las <strong>IAM Policies</strong> — que veremos con detalle en la Clase 2.</p>
          <QaItem question="Un usuario se autentica correctamente con contraseña y MFA. ¿Puede automáticamente eliminar cualquier recurso en AWS?" answer="No necesariamente. Autenticarse confirma identidad; lo que puede hacer después depende de las políticas de autorización asociadas a ese usuario." />
        </section>

        <section className="lesson-section">
          <h3>23-25. Ahora sí: la cuenta root</h3>
          <p>Cuando alguien crea una cuenta de AWS por primera vez, esa cuenta viene con una identidad especial llamada <strong>cuenta root</strong>. No es un usuario IAM: es la identidad original de la cuenta completa, con acceso irrestricto a absolutamente todo — facturación incluida.</p>
          <ConceptBadge icon="crown" variant="warning">La cuenta root no tiene un techo de permisos. No existe una política que la limite.</ConceptBadge>
          <Dialogo>Piensa en la llave maestra de un edificio completo, la que abre cada habitación, la sala de servidores, la caja fuerte y la oficina de administración a la vez. Existe porque alguien tiene que poder abrir todo el edificio el primer día. Eso no significa que deba llevarse en el bolsillo todos los días.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>26-28. Por qué NO usamos root para el trabajo diario</h3>
          <p>Root puede cambiar métodos de pago, cerrar la cuenta completa, modificar cualquier configuración de seguridad y eliminar cualquier recurso, sin que ninguna política pueda restringirla. Usarla para tareas cotidianas — crear un bucket, revisar una instancia, subir un archivo — significa exponer ese nivel de poder a errores comunes: un clic equivocado, una sesión abierta en una computadora compartida, una credencial guardada donde no debía.</p>
          <Nota><p>AWS recomienda explícitamente evitar el uso diario de la cuenta root y trabajar con usuarios IAM (y, más adelante en el módulo, roles) que reciben exactamente los permisos necesarios — ni más, ni menos.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>29-32. Buenas prácticas para proteger la cuenta root</h3>
          <RoleGrid roles={[
            { icon: 'smartphone', label: 'Activar MFA', desc: 'En la cuenta root, desde el primer día' },
            { icon: 'x-circle', label: 'Sin Access Keys', desc: 'La cuenta root no debería tener claves de acceso programático activas' },
            { icon: 'user', label: 'Crear un usuario IAM admin', desc: 'Para el trabajo diario, en lugar de usar root' },
            { icon: 'lock', label: 'Contraseña única y robusta', desc: 'Que no se reutilice en ningún otro sitio' },
          ]} />
          <p>La idea central: usar root para encender la cuenta, activar sus protecciones, y luego guardarla — no para trabajar con ella todos los días.</p>
        </section>

        <section className="lesson-section">
          <h3>33-35. Volvamos a CloudShop</h3>
          <p>El equipo de CloudShop compartía la contraseña de la cuenta root en un chat interno. Apliquemos lo aprendido:</p>
          <QaItem question="¿Cuál es el primer riesgo evidente de compartir la contraseña de root por chat?" answer="Cualquier persona con acceso a ese chat (incluso alguien que ya no debería tenerlo) puede autenticarse como root, con poder total sobre la cuenta." />
          <QaItem question="¿MFA en root habría evitado completamente el problema?" answer="Lo habría reducido significativamente: aunque alguien obtuviera la contraseña filtrada, seguiría necesitando el segundo factor. Pero el problema de fondo — usar root para tareas diarias y compartir su contraseña — seguiría sin resolverse." answerLabel="Reflexión" />
          <QaItem question="¿Qué deberían hacer en su lugar?" answer="Activar MFA en root, dejar de usarla a diario, y crear usuarios IAM individuales para cada persona del equipo, cada uno con su propia autenticación." />
        </section>

        <section className="lesson-section">
          <h3>36-38. Identidad, autenticación y autorización en AWS: el mapa completo</h3>
          <Flow steps={[
            { label: 'Identidad', caption: 'Usuario, rol, cuenta root' },
            { label: 'Autenticación', caption: 'Contraseña + MFA' },
            { label: 'Autorización', caption: 'IAM Policies (Clase 2)' },
          ]} />
          <p>Esta clase resolvió las dos primeras preguntas: quién eres y cómo lo demuestras. La Clase 2 entra de lleno en la tercera: qué puedes hacer una vez dentro, leyendo nuestra primera política IAM en JSON.</p>
        </section>

        <section className="lesson-section">
          <h3>39-40. Actividades</h3>
          <QaItem question="Nombre de usuario / Contraseña + MFA / Permiso para crear una EC2: ¿identidad, autenticación o autorización?" answer="Identidad / Autenticación / Autorización." />
          <QaItem question="Un empleado renuncia pero sigue conociendo la contraseña de root compartida en el equipo. ¿Qué riesgo concreto existe?" answer="Podría seguir autenticándose como root con acceso total, incluyendo facturación y eliminación de recursos, mucho después de dejar la empresa." />
        </section>

        <section className="lesson-section">
          <h3>41-42. RETO DE LA CLASE</h3>
          <Nota><p>NovaCloud (la empresa del Módulo 2) tiene una cuenta de AWS creada hace dos años. Nadie recuerda si la cuenta root tiene MFA activo. Tres personas del equipo conocen su contraseña, y la usan ocasionalmente &quot;porque a veces algo con permisos normales no funciona&quot;. ¿Qué le recomendarías a NovaCloud, en orden?</p></Nota>
          <Reveal label="Ver la respuesta esperada">
            <p>Primero, verificar y activar MFA en la cuenta root de inmediato. Segundo, cambiar la contraseña de root a una nueva, única y robusta, y dejar de compartirla. Tercero, dejar de usar root para tareas rutinarias: crear usuarios IAM individuales con los permisos necesarios (tema de la Clase 2) para cada persona del equipo. Cuarto, confirmar que root no tiene Access Keys activas.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>43-44. Retos nivel 2 y 3</h3>
          <QaItem question="Un usuario IAM se autentica correctamente con MFA, pero recibe un error 'Access Denied' al intentar crear un bucket S3. ¿Qué falló: autenticación o autorización?" answer="Autorización. La autenticación fue exitosa; el problema es que las políticas asociadas a ese usuario no permiten esa acción." />
          <QaItem question="Alguien propone: 'da igual usar root para todo, total solo yo tengo la contraseña.' ¿Qué le responderías?" answer="Que el riesgo no es solo que otra persona la use — un solo error propio con permisos ilimitados (borrar el recurso equivocado, exponer la cuenta) ya es suficiente motivo para no operar a diario con ese nivel de poder." />
        </section>

        <section className="lesson-section">
          <h3>45-46. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El gerente propone: &quot;usemos siempre la cuenta root, así nunca tenemos problemas de permisos.&quot; No estoy de acuerdo porque root no tiene límites y cualquier error se vuelve automáticamente catastrófico, sin ninguna política que lo contenga. Esto es lo que haría en su lugar: crear usuarios IAM con exactamente los permisos que cada persona necesita. El riesgo de su enfoque es que un solo clic equivocado puede afectar toda la cuenta, incluyendo facturación.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: &quot;la contraseña es suficientemente larga, no necesitamos MFA.&quot; No estoy de acuerdo porque la longitud de la contraseña no protege contra filtraciones, phishing o reutilización en otros sitios comprometidos. Esto es lo que haría en su lugar: activar MFA como segundo factor obligatorio, especialmente en root. El riesgo de su enfoque es depender de un único factor que puede filtrarse sin que nadie lo note.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>47. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'Identidad, autenticación y autorización son la misma cosa.', correct: false },
            { text: 'MFA combina al menos dos factores distintos de autenticación.', correct: true },
            { text: 'La cuenta root es un usuario IAM como cualquier otro.', correct: false },
            { text: 'AWS recomienda usar la cuenta root únicamente para tareas que la requieren explícitamente.', correct: true },
            { text: 'Autenticarse correctamente garantiza permiso para hacer cualquier acción.', correct: false },
            { text: 'Una contraseña robusta por sí sola ya cuenta como múltiples factores.', correct: false },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>48. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>49. Reto oral</h3>
          <Dialogo>Explícame la diferencia entre autenticación y autorización sin usar las palabras autenticación, autorización, identidad, contraseña, permiso, MFA, AWS ni cuenta.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>&quot;Una cosa es demostrar que realmente eres quien dices ser. Otra, completamente distinta, es que te dejen hacer algo específico una vez que ya te dejaron entrar.&quot;</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>50. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Identidad</td><td>¿Quién eres?</td></tr>
              <tr><td>Autenticación</td><td>¿Puedes demostrarlo?</td></tr>
              <tr><td>Autorización</td><td>¿Qué puedes hacer?</td></tr>
              <tr><td>MFA</td><td>Más de un factor para autenticarte</td></tr>
              <tr><td>Algo que sabes</td><td>Contraseña, PIN</td></tr>
              <tr><td>Algo que tienes</td><td>Teléfono, dispositivo MFA</td></tr>
              <tr><td>Algo que eres</td><td>Huella, rostro</td></tr>
              <tr><td>Cuenta root</td><td>Identidad original, sin límites de permisos</td></tr>
              <tr><td>Buena práctica de root</td><td>MFA activo, sin Access Keys, sin uso diario</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>51. Ticket de salida</h3>
          <Dialogo>Un compañero te dice: &quot;ya activé MFA en mi usuario IAM, entonces ahora puedo hacer lo que quiera en la cuenta.&quot; ¿Qué le responderías?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>MFA fortalece la autenticación — demuestra con más solidez que es quien dice ser — pero no otorga permisos por sí sola. Lo que puede hacer depende de las políticas de autorización asociadas a su usuario, que es exactamente el tema de la próxima clase.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 2</div>
          <p>Ya sabemos quién entra (identidad) y cómo lo demuestra (autenticación + MFA). Falta la pregunta más importante del módulo: una vez dentro, ¿quién decide qué puede hacer cada quién, y cómo se lo decimos a AWS?</p>
          <ConceptBadge icon="key">Módulo 9 · Clase 2 — IAM Policies y mínimo privilegio: cómo controlar qué puede hacer cada identidad</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-9/clase-2" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 2: IAM Policies y mínimo privilegio →
          </Link>
        </div>

      </div>
    </div>
  );
}
