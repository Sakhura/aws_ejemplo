import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, CompareCols, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué pregunta responde una IAM Policy?', options: [{ text: '¿Qué puede hacer una identidad?', correct: true }, { text: '¿Cuánta RAM tiene EC2?', correct: false }, { text: '¿Cuál es la IP?', correct: false }, { text: '¿Dónde está EBS?', correct: false }] },
  { q: '¿Qué es una Bucket Policy?', options: [{ text: 'Política basada en recursos asociada al bucket.', correct: true }, { text: 'Un Security Group.', correct: false }, { text: 'Una AMI.', correct: false }, { text: 'Un volumen.', correct: false }] },
  { q: '¿Qué representa Principal?', options: [{ text: 'Quién.', correct: true }, { text: 'Qué puerto.', correct: false }, { text: 'Cuánto almacenamiento.', correct: false }, { text: 'La Región.', correct: false }] },
  { q: '¿Qué representa Action?', options: [{ text: 'Qué operación se permite o deniega.', correct: true }, { text: 'El propietario del computador.', correct: false }, { text: 'El costo.', correct: false }, { text: 'La Región.', correct: false }] },
  { q: '¿Qué representa Resource?', options: [{ text: 'El recurso sobre el que se aplica la regla.', correct: true }, { text: 'El password.', correct: false }, { text: 'La CPU.', correct: false }, { text: 'El puerto.', correct: false }] },
  { q: '¿Qué significa s3:GetObject?', options: [{ text: 'Leer/obtener un objeto.', correct: true }, { text: 'Eliminar bucket.', correct: false }, { text: 'Crear EC2.', correct: false }, { text: 'Crear IAM user.', correct: false }] },
  { q: '¿Qué significa s3:PutObject?', options: [{ text: 'Subir/escribir objeto.', correct: true }, { text: 'Leer objeto.', correct: false }, { text: 'Crear Región.', correct: false }, { text: 'Detener EC2.', correct: false }] },
  { q: '¿Debemos desactivar Block Public Access porque aparece AccessDenied?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Los nuevos buckets S3 tienen ACL habilitadas por defecto?', options: [{ text: 'Sí.', correct: false }, { text: 'No. Con Bucket owner enforced, las ACL están deshabilitadas por defecto.', correct: true }] },
  { q: '¿Principal:"*" merece revisión especial?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
];

export default function Modulo4Clase3() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 4 · Clase 3</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 4 · Clase 3: Permisos, Bucket Policies y acceso público en Amazon S3</h2>
      <p className="lesson-subtitle">
        En S3 no preguntamos "¿cómo hago público el archivo?", sino "¿quién necesita acceder, a qué objeto y para hacer qué?".
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + lectura de políticas + laboratorio guiado + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 4 · Clases 1 y 2</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Comprender que un bucket S3 no debe hacerse público por comodidad.</li>
            <li>Diferenciar acceso privado y público, y relacionar S3 con IAM.</li>
            <li>Comprender qué es una IAM Policy y qué es una Bucket Policy.</li>
            <li>Diferenciar políticas basadas en identidad y políticas basadas en recursos.</li>
            <li>Comprender para qué sirve Block Public Access.</li>
            <li>Reconocer Principal, Action, Resource y Effect.</li>
            <li>Aplicar mínimo privilegio y leer una Bucket Policy sencilla.</li>
            <li>Detectar políticas peligrosamente amplias.</li>
            <li>Comprender que las ACL están deshabilitadas por defecto en nuevos buckets con Bucket owner enforced.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2. Recordemos dónde quedamos</h3>
          <Flow steps={[{ icon: 'user', label: 'Camila' }, { icon: 'package', label: 'Bucket' }, { icon: 'file-text', label: 'informe.pdf' }]} />
          <p>El bucket existe. El objeto existe. Pero aparece una pregunta: ¿Camila puede verlo? Eso ya no es un problema de almacenamiento — es un problema de <strong>Acceso</strong>.</p>
        </section>

        <section className="lesson-section">
          <h3>3. Volvamos al edificio</h3>
          <Nota><p>Imaginemos una empresa con documentos, fotografías e información financiera. Que una persona trabaje en la empresa no significa que pueda acceder a todo. Necesitamos reglas.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>4. Las cuatro preguntas de seguridad</h3>
          <InfoBox items={['¿Quién solicita acceso?', '¿Qué quiere hacer? (leer, subir, eliminar, listar)', '¿Sobre qué? (bucket completo, grupo de objetos, un objeto)', '¿Está permitido? (Allow o Deny)']} />
        </section>

        <section className="lesson-section">
          <h3>5. Recordemos IAM</h3>
          <Flow steps={[{ icon: 'user', label: 'Identidad' }, { icon: 'file-text', label: 'Política IAM' }, { icon: 'tag', label: 'Permisos' }]} />
          <p>Ahora podemos utilizar esos conocimientos con S3: Camila → IAM Policy → S3.</p>
        </section>

        <section className="lesson-section">
          <h3>6. IAM Policy</h3>
          <Dialogo>Es una regla asociada a una identidad que dice qué puede hacer esa identidad.</Dialogo>
          <p>Ejemplo: Camila → Política → ✅ Ver objetos, ✅ Subir objetos.</p>
        </section>

        <section className="lesson-section">
          <h3>7. Ejemplo de mínimo privilegio</h3>
          <Nota><p>Camila trabaja en Marketing. Necesita ver y subir imágenes. No necesita eliminar backups, leer documentos financieros ni administrar otros buckets.</p></Nota>
          <Dialogo>Solo damos acceso a lo necesario.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>8. Pero S3 tiene otra herramienta: Bucket Policy</h3>
          <Nota><p>AWS define una Bucket Policy como una política basada en recursos que puede otorgar permisos sobre el bucket y sus objetos.</p></Nota>
          <Dialogo>La Bucket Policy son reglas colocadas en el propio bucket.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>9. Analogía de la puerta</h3>
          <CompareCols cols={[
            { emoji: '👤', title: 'IAM Policy', items: ['La tarjeta que lleva Camila', '"Puede entrar a Marketing"'] },
            { emoji: '🚪', title: 'Bucket Policy', items: ['La regla instalada en la puerta', '"Camila puede entrar"'] },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>10. Identidad vs recurso</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Política</th><th>Se asocia a</th><th>Pregunta</th></tr></thead>
            <tbody>
              <tr><td>IAM Policy</td><td>Identidad</td><td>¿Qué puede hacer esta identidad?</td></tr>
              <tr><td>Bucket Policy</td><td>Bucket</td><td>¿Quién puede hacer qué sobre este recurso?</td></tr>
            </tbody>
          </table>
          <p>Ambas pueden participar en la decisión final de acceso. No son competidoras: son herramientas distintas.</p>
        </section>

        <section className="lesson-section">
          <h3>11. Los elementos de una Bucket Policy</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Elemento</th><th>Pregunta</th></tr></thead>
            <tbody>
              <tr><td>Effect</td><td>¿Permitir o denegar?</td></tr>
              <tr><td>Principal</td><td>¿A quién?</td></tr>
              <tr><td>Action</td><td>¿Qué puede hacer?</td></tr>
              <tr><td>Resource</td><td>¿Sobre qué recurso?</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>12. Principal, Action y las acciones comunes</h3>
          <Nota><p>Principal identifica quién recibe o está sujeto al permiso: puede ser una identidad, un rol, otra cuenta AWS o un servicio AWS.</p></Nota>
          <RoleGrid roles={[
            { icon: 'eye', label: 'GetObject', desc: 'Leer/obtener un objeto' },
            { icon: 'upload', label: 'PutObject', desc: 'Subir o escribir un objeto' },
            { icon: 'trash', label: 'DeleteObject', desc: 'Eliminar un objeto' },
            { icon: 'clipboard-list', label: 'ListBucket', desc: 'Listar objetos del bucket' },
          ]} />
          <p>No agregamos DeleteObject automáticamente solo porque alguien necesita leer y subir: mínimo privilegio.</p>
        </section>

        <section className="lesson-section">
          <h3>13. Bucket y objetos son recursos diferentes</h3>
          <p>ListBucket se relaciona con el bucket, mientras GetObject se relaciona con los objetos. Esto será importante al construir Resource.</p>
        </section>

        <section className="lesson-section">
          <h3>14. Resource y el comodín *</h3>
          <p><code>arn:aws:s3:::mi-bucket</code> representa el bucket. <code>arn:aws:s3:::mi-bucket/*</code> representa objetos bajo ese bucket — el asterisco actúa como comodín: todos los objetos que coincidan con ese patrón.</p>
          <Nota><p>Pero cuidado: <code>Action: "*"</code> + <code>Resource: "*"</code> significa un alcance enormemente amplio. No lo usamos simplemente "para asegurarnos de que funcione".</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>15. Primera Bucket Policy humana</h3>
          <Nota><p>Queremos: permitir que una identidad autorizada lea los objetos del bucket de Marketing.</p></Nota>
          <pre className="codeblock">{`{
  "Effect": "Allow",
  "Principal": {
    "AWS": "arn:aws:iam::123456789012:role/Marketing"
  },
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::imagenes-marketing/*"
}`}</pre>
        </section>

        <section className="lesson-section">
          <h3>16. Traduzcámosla</h3>
          <InfoBox items={['Effect = Allow → Permitir', 'Principal = role/Marketing → al rol Marketing', 'Action = s3:GetObject → leer objetos', 'Resource = imagenes-marketing/* → objetos del bucket indicado']} />
          <Dialogo>"Permitir al rol Marketing leer los objetos del bucket imagenes-marketing." Eso es muchísimo más importante que memorizar dónde van las comas.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>17. Ahora aparece Block Public Access</h3>
          <Nota><p>Amazon S3 incluye Block Public Access para ayudar a administrar y evitar exposición pública. Los nuevos buckets, objetos y access points no permiten acceso público de forma predeterminada.</p></Nota>
          <ConceptBadge icon="shield" variant="warning">Es una barrera diseñada para evitar que hagamos público contenido accidentalmente</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>18. Seguridad doble y configuración más restrictiva</h3>
          <p>Primera barrera: la política. Segunda barrera: Block Public Access. Aunque alguien configure algo demasiado abierto, Block Public Access puede impedir determinados accesos públicos según la configuración efectiva. Block Public Access puede configurarse a nivel de cuenta y de bucket, y AWS aplica la combinación efectiva más restrictiva.</p>
        </section>

        <section className="lesson-section">
          <h3>19. No desactivamos por reflejo</h3>
          <Dialogo>"Mi web no abre. Desactiva todo." — error habitual</Dialogo>
          <QaItem question="¿Este contenido realmente debe ser público?" answer="Si no, mantenemos el bloqueo. Público debe ser una decisión de arquitectura, no una solución de emergencia." />
        </section>

        <section className="lesson-section">
          <h3>20. Privado es diferente de inaccesible</h3>
          <Flow steps={[{ icon: 'x-circle', label: 'Público — no' }, { icon: 'check-circle', label: 'Aplicación autorizada — sí' }, { icon: 'lock', label: 'S3 privado' }]} />
          <Dialogo>Privado no significa inutilizable. Significa: solo las identidades autorizadas pueden acceder.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>21. Bucket público con información privada</h3>
          <Nota><p>Bucket "documentos-empleados" con contratos, informes y antecedentes internos.</p></Nota>
          <QaItem question="¿Lo hacemos público porque compartir es más fácil?" answer="No. El riesgo es exponer información a personas que nunca debieron acceder." />
          <p>Mejor: solo RRHH con permisos específicos sobre ese bucket.</p>
        </section>

        <section className="lesson-section">
          <h3>22. Podemos limitar por prefijos</h3>
          <p>Bucket "empresa" con <code>marketing/</code>, <code>finanzas/</code>, <code>rrhh/</code>. Podemos diseñar permisos que afecten solo ciertos prefijos: Camila → <code>marketing/*</code> y no <code>finanzas/*</code>. No necesitamos crear siempre un bucket distinto por persona — mínimo privilegio también puede aplicarse a nivel de recursos.</p>
        </section>

        <section className="lesson-section">
          <h3>23. Principal: "*" merece una alerta</h3>
          <Nota><p>Una Bucket Policy puede conceder acceso muy amplio si usamos un Principal público: <code>"Principal": "*"</code> conceptualmente significa cualquier principal, sujeto al resto de condiciones y controles aplicables.</p></Nota>
          <pre className="codeblock">{`{
  "Effect": "Allow",
  "Principal": "*",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::documentos-internos/*"
}`}</pre>
          <QaItem question="¿La usamos para documentos internos?" answer="No." />
          <Nota>
            <p>No estoy de acuerdo porque convertiríamos datos internos en contenido potencialmente accesible públicamente. Esto es lo que haría en su lugar: autorizar identidades específicas. El riesgo es una exposición de información difícil de revertir una vez que los datos han sido descargados.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>24. Explicit Deny</h3>
          <p>Recordemos IAM: un Deny explícito tiene prioridad cuando aplica. Esto también importa en la evaluación de acceso de S3 — podemos usar condiciones y Deny para imponer determinadas restricciones.</p>
        </section>

        <section className="lesson-section">
          <h3>25. ACL y Object Ownership</h3>
          <Nota><p>Históricamente S3 dispone de ACLs, pero para nuevos buckets AWS configura por defecto Object Ownership: Bucket owner enforced, con las ACL deshabilitadas. AWS recomienda mantenerlas deshabilitadas para la mayoría de casos modernos y usar políticas para gestionar acceso.</p></Nota>
          <p>Nuestra progresión: 1) IAM Policies, 2) Bucket Policies, 3) Block Public Access. Solo reconocemos que ACL existe, pero hoy suele estar deshabilitada en nuevos buckets — el bucket utiliza un modelo moderno centrado en políticas.</p>
        </section>

        <section className="lesson-section">
          <h3>26. Laboratorio: revisar seguridad del bucket</h3>
          <Nota><p>Volvemos al bucket de Clase 2. Ruta conceptual: S3 → Bucket → Permissions. Buscamos Block Public Access, Bucket Policy, Object Ownership, ACL.</p></Nota>
          <InfoBox items={['Block Public Access: _________________', 'Bucket Policy: _________________', 'Object Ownership: _________________', 'ACL: _________________']} />
          <p>En un bucket nuevo típico veremos: Block Public Access habilitado, Bucket Policy ninguna, Object Ownership "Bucket owner enforced", ACL deshabilitada.</p>
        </section>

        <section className="lesson-section">
          <h3>27. Crear una política de lectura controlada</h3>
          <Nota><p>Supongamos un rol autorizado <code>LectorS3</code> que debe leer objetos de <code>curso-aws-materiales</code>:</p></Nota>
          <pre className="codeblock">{`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789012:role/LectorS3"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::curso-aws-materiales/*"
    }
  ]
}`}</pre>
          <Dialogo>"Permitir al rol LectorS3 leer los objetos de curso-aws-materiales." Nada más: no puede subir, borrar ni administrar el bucket, salvo que otros permisos se lo permitan. Esto es mínimo privilegio.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>28. Actividad: construye la política humana</h3>
          <Nota><p>Camila necesita leer y subir imágenes, pero no borrar.</p></Nota>
          <Reveal label="Ver solución">
            <InfoBox items={['Principal: Marketing', 'Effect: Allow', 'Actions: GetObject, PutObject', 'Resource: Objetos de Marketing']} />
            <p>No añadimos DeleteObject porque no es necesario.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>29. Actividad: IAM Policy o Bucket Policy</h3>
          <QaItem question='"El rol Marketing puede leer ciertos objetos."' answer="IAM Policy." />
          <QaItem question='"Este bucket permite acceso a un rol de otra cuenta."' answer="Bucket Policy puede ser una herramienta apropiada." />
          <QaItem question='"Quiero administrar permisos que acompañen directamente a una identidad."' answer="IAM Policy." />
          <QaItem question='"Quiero definir quién puede acceder a este bucket."' answer="Bucket Policy." />
        </section>

        <section className="lesson-section">
          <h3>30. Actividad: seguro o peligroso</h3>
          <QaItem question="Bucket privado, solo rol autorizado." answer="Razonable." />
          <QaItem question='Documentos internos con Principal: "*".' answer="Peligroso." />
          <QaItem question="Marketing solo puede leer su prefijo." answer="Mínimo privilegio." />
          <QaItem question="Todos tienen s3:* sobre *." answer="Excesivo." />
          <QaItem question="Block Public Access se desactiva sin comprender la razón." answer="Mala práctica." />
        </section>

        <section className="lesson-section">
          <h3>31. El error favorito del apuro</h3>
          <Dialogo>"Pongamos s3:* y Resource:*. Si funciona, después lo arreglamos." — Pedro</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque estamos aumentando el alcance de permisos sin saber si es necesario. Esto es lo que haría en su lugar: empezar por las acciones y recursos mínimos requeridos. El riesgo es que una configuración temporal termine convirtiéndose en permanente y permita modificaciones o eliminación no previstas.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>32. Diagnóstico de AccessDenied</h3>
          <Nota><p>Cuando aparece AccessDenied no hacemos Action:*, Resource:*, Principal:*.</p></Nota>
          <Flow steps={[
            { label: '¿Quién eres?' },
            { label: '¿Qué acción?' },
            { label: '¿Qué recurso?' },
            { label: '¿Existe permiso?' },
            { label: '¿Existe Deny?' },
            { label: '¿Hay controles públicos?' },
          ]} />
          <p>Ese árbol vale más que copiar políticas desde Internet.</p>
        </section>

        <section className="lesson-section">
          <h3>33. Público no significa inseguro automáticamente</h3>
          <Nota><p>Una página destinada a ser pública necesita contenido accesible públicamente de alguna forma.</p></Nota>
          <Dialogo>El problema no es "público". El problema es "público sin intención o sin control".</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>34. Dos casos opuestos</h3>
          <CompareCols cols={[
            { emoji: '🔒', title: 'ClínicaCloud — examenes-medicos', items: ['Informes, imágenes, documentos internos', 'No lo hacemos público', 'Acceso solo para identidades autorizadas'] },
            { emoji: '🌎', title: 'PortalNoticias — imagenes-publicas-web', items: ['Imágenes destinadas a mostrarse públicamente', 'Podría existir una necesidad de acceso público', 'Solo para el contenido y mecanismo apropiados'] },
          ]} />
          <p>La tecnología puede ser la misma. La necesidad de negocio cambia la política.</p>
        </section>

        <section className="lesson-section">
          <h3>35. Buenas prácticas S3</h3>
          <InfoBox items={['Mantener privado por defecto', 'Aplicar mínimo privilegio', 'Mantener Block Public Access cuando no se necesita exposición pública', 'Revisar IAM y Bucket Policies', 'Evitar Principal:* sin necesidad deliberada', 'Evitar Action:* sin justificación', 'Limitar recursos', 'Revisar permisos periódicamente', 'Mantener ACLs deshabilitadas en casos modernos', 'Tratar exposición accidental como incidente']} />
        </section>

        <section className="lesson-section">
          <h3>36. ¿Qué pasa si hicimos público algo sensible?</h3>
          <Flow steps={[
            { icon: 'search', label: 'Detectar exposición' },
            { icon: 'lock', label: 'Cerrar acceso' },
            { icon: 'search', label: 'Investigar' },
            { icon: 'clipboard-list', label: 'Determinar qué estuvo expuesto' },
            { icon: 'settings', label: 'Corregir configuración' },
            { icon: 'lightbulb', label: 'Evitar repetición' },
          ]} />
          <Nota><p>Una vez que alguien descargó información, volverla privada no borra las copias externas.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>37. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>38. Reto de la clase</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge icon="trophy">CloudCompany</ConceptBadge>
          <p>Bucket <code>empresa-documentos</code> con <code>marketing/</code>, <code>finanzas/</code>, <code>publico/</code>. Camila (Marketing), Andrés (Finanzas) y acceso público solo a <code>publico/</code>.</p>
          <Reveal label="Ver diseño esperado">
            <Flow steps={[{ icon: 'user', label: 'Camila → marketing/*' }, { icon: 'user', label: 'Andrés → finanzas/*' }, { icon: 'globe', label: 'Público → publico/*' }]} />
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>39. Reto nivel 2 y de diagnóstico</h3>
          <QaItem question={'Pedro propone {"Effect":"Allow","Principal":"*","Action":"s3:*","Resource":"*"}. Encuentra los problemas.'} answer="Principal excesivamente amplio, acciones excesivamente amplias, recursos sin limitar, viola mínimo privilegio, puede producir exposición o modificación no deseada." />
          <QaItem question="Camila recibe AccessDenied al subir marketing/banner.jpg. Tiene s3:GetObject pero no s3:PutObject. ¿Cuál es el problema probable?" answer="Tiene permiso para leer, pero no para subir. No necesitamos abrir el bucket al mundo." />
        </section>

        <section className="lesson-section">
          <h3>40. Reto oral</h3>
          <Dialogo>Explícame la seguridad de S3 sin usar las palabras S3, bucket, IAM, política, permiso, público, privado, usuario ni acceso.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Es decidir quién puede realizar determinadas acciones sobre determinada información y evitar que otras personas hagan cosas que no necesitan."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>41. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>IAM Policy</td><td>Permisos asociados a una identidad</td></tr>
              <tr><td>Bucket Policy</td><td>Permisos asociados al bucket</td></tr>
              <tr><td>Principal</td><td>Quién</td></tr>
              <tr><td>Action</td><td>Qué puede hacer</td></tr>
              <tr><td>Resource</td><td>Sobre qué</td></tr>
              <tr><td>Effect</td><td>Allow / Deny</td></tr>
              <tr><td>GetObject / PutObject / DeleteObject</td><td>Leer / Subir / Eliminar objeto</td></tr>
              <tr><td>Block Public Access</td><td>Ayuda a impedir exposición pública</td></tr>
              <tr><td>ACL</td><td>Mecanismo antiguo, deshabilitado por defecto</td></tr>
              <tr><td>Mínimo privilegio</td><td>Solo el acceso necesario</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>42. Ticket de salida</h3>
          <Dialogo>Camila necesita leer y subir imágenes en marketing/, pero no debe poder eliminar objetos ni acceder a finanzas/. ¿Qué principio estamos aplicando?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Mínimo privilegio, porque recibe solamente las acciones y recursos necesarios para su trabajo.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 4</div>
          <Nota><p>Cerraría mostrando:</p></Nota>
          <Flow steps={[{ icon: 'user', label: 'Camila' }, { icon: 'file-text', label: 'informe.pdf' }]} />
          <p>Camila modifica accidentalmente el documento. Antes decía "Versión correcta"; ahora dice "versión equivocada".</p>
          <Dialogo>"¿Podemos volver atrás? ¿Y si alguien lo eliminó?"</Dialogo>
          <ConceptBadge icon="clock">Módulo 4 · Clase 4 — Versioning, recuperación y protección frente a errores</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-4/clase-4" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 4: Versionado y recuperación →
          </Link>
        </div>

      </div>
    </div>
  );
}
