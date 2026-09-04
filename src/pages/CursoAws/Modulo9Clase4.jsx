import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const KEY_POLICY_SNIPPET = `{
  "Effect": "Allow",
  "Principal": { "AWS": "arn:aws:iam::111122223333:role/RolAppReportes" },
  "Action": ["kms:Decrypt", "kms:GenerateDataKey"],
  "Resource": "*"
}`;

const QUIZ_QUESTIONS = [
  { q: '¿Qué es cifrado en reposo?', options: [{ text: 'Proteger datos mientras están almacenados (disco, bucket, base de datos).', correct: true }, { text: 'Proteger datos mientras viajan por la red.', correct: false }, { text: 'Un tipo de backup.', correct: false }, { text: 'Un Security Group.', correct: false }] },
  { q: '¿Qué es cifrado en tránsito?', options: [{ text: 'Proteger datos mientras viajan de un punto a otro.', correct: true }, { text: 'Proteger datos mientras están guardados en un disco.', correct: false }, { text: 'Un snapshot.', correct: false }, { text: 'Una política IAM.', correct: false }] },
  { q: '¿Qué es AWS KMS?', options: [{ text: 'El servicio administrado de AWS para crear y controlar claves de cifrado.', correct: true }, { text: 'Un servicio de monitoreo.', correct: false }, { text: 'Un tipo de instancia EC2.', correct: false }, { text: 'Un balanceador de carga.', correct: false }] },
  { q: '¿Qué diferencia principal hay entre una AWS managed key y una customer managed key?', options: [{ text: 'La customer managed key permite controlar su key policy y rotación con más detalle.', correct: true }, { text: 'No hay ninguna diferencia real.', correct: false }, { text: 'La AWS managed key cuesta siempre más.', correct: false }, { text: 'Solo una de las dos puede cifrar S3.', correct: false }] },
  { q: '¿Qué controla quién puede usar una clave de KMS?', options: [{ text: 'Su key policy.', correct: true }, { text: 'El nombre del bucket.', correct: false }, { text: 'El Security Group de la instancia.', correct: false }, { text: 'La Región donde se creó el usuario.', correct: false }] },
  { q: 'Si alguien copia el archivo físico de un disco EBS cifrado, sin las credenciales ni permiso para usar la clave, ¿puede leer su contenido?', options: [{ text: 'No, el contenido permanece protegido sin acceso a la clave.', correct: true }, { text: 'Sí, siempre puede leerlo con cualquier editor de texto.', correct: false }] },
  { q: '¿Cifrar un bucket S3 reemplaza la necesidad de políticas de acceso (IAM/Bucket Policy)?', options: [{ text: 'Sí, basta con cifrarlo.', correct: false }, { text: 'No — son controles distintos y complementarios.', correct: true }] },
];

export default function Modulo9Clase4() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 9 · Clase 4</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 9 · Clase 4: Cifrado y AWS KMS — proteger datos en reposo y comprender claves</h2>
      <p className="lesson-subtitle">
        IAM controla quién llega hasta la puerta. El cifrado protege lo que hay adentro incluso si alguien se salta la puerta por completo.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + analogías + casos + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 9 · Clases 1 a 3</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Diferenciar cifrado en tránsito y cifrado en reposo.</li>
            <li>Explicar en términos sencillos qué hace una clave de cifrado.</li>
            <li>Explicar qué es AWS KMS y qué problema resuelve.</li>
            <li>Diferenciar una AWS managed key de una customer managed key.</li>
            <li>Comprender qué es una key policy y por qué se parece a lo visto en la Clase 2.</li>
            <li>Reconocer dónde aparece el cifrado en S3, EBS y RDS.</li>
            <li>Explicar por qué el cifrado no reemplaza a IAM, sino que lo complementa.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-3. Recordemos dónde quedamos, y una promesa pendiente</h3>
          <Flow steps={[{ label: 'Identidad' }, { label: 'Autenticación' }, { label: 'Autorización' }, { label: 'Roles' }, { label: '¿Y los datos en sí?', n: '?' }]} />
          <p>En los Módulos 3 y 6 vimos, de pasada, que tanto EBS como RDS &quot;admiten cifrado&quot; y que &quot;no entraríamos todavía en AWS KMS en profundidad&quot;. Esa promesa se cumple hoy.</p>
        </section>

        <section className="lesson-section">
          <h3>4-5. El problema que abre la clase</h3>
          <p>CloudShop ya protegió el acceso: MFA en root, políticas de mínimo privilegio, roles en vez de Access Keys. Pero alguien pregunta: &quot;¿y si alguien obtiene una copia física del disco, o un snapshot mal compartido, sin pasar por ninguna de nuestras políticas de IAM?&quot;</p>
          <ConceptBadge icon="alert-triangle">IAM protege las puertas. No dice nada sobre qué pasa si alguien se lleva la caja completa.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>6-8. ¿Qué es el cifrado?</h3>
          <p>Cifrar significa transformar información legible en un formato ilegible, de modo que solo pueda volver a leerse con la <strong>clave</strong> correcta.</p>
          <Dialogo>Es como guardar un documento dentro de una caja fuerte con clave: cualquiera puede llevarse la caja, pero sin la combinación correcta, lo que hay adentro sigue siendo inútil para quien la robó.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>9-11. Dos momentos distintos para proteger datos</h3>
          <RoleGrid roles={[
            { icon: 'globe', label: 'En tránsito', desc: 'Mientras los datos viajan de un punto a otro (por ejemplo, HTTPS)' },
            { icon: 'hard-drive', label: 'En reposo', desc: 'Mientras los datos están guardados: un disco EBS, un bucket S3, una base RDS' },
          ]} />
          <Nota><p>Esta clase se enfoca en cifrado <strong>en reposo</strong> — proteger lo que ya está guardado. El cifrado en tránsito (HTTPS/TLS) ya lo rozamos indirectamente al hablar del ALB en el Módulo 7.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>12-13. ¿Qué es una clave?</h3>
          <p>Una <strong>clave de cifrado</strong> es la pieza de información necesaria para cifrar y, después, descifrar los datos. Sin ella, los datos cifrados son básicamente ruido.</p>
          <Flow steps={[{ label: 'Datos originales' }, { icon: 'key', label: 'Clave' }, { label: 'Datos cifrados' }]} />
          <QaItem question="Si alguien tiene los datos cifrados pero no tiene la clave, ¿puede leer la información original?" answer="No, en condiciones normales. Los datos cifrados sin la clave correspondiente permanecen ilegibles." />
        </section>

        <section className="lesson-section">
          <h3>14-16. Aparece AWS KMS</h3>
          <p><strong>AWS KMS (Key Management Service)</strong> es el servicio administrado de AWS para crear, almacenar y controlar el uso de claves de cifrado. En vez de que cada equipo invente su propio sistema para guardar claves, AWS ofrece un servicio central diseñado específicamente para eso.</p>
          <ConceptBadge icon="lock">KMS no guarda tus datos. Guarda y protege las claves que cifran tus datos.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>17-19. Dos tipos de clave que conviene distinguir</h3>
          <RoleGrid roles={[
            { icon: 'cloud', label: 'AWS managed key', desc: 'AWS la crea y administra automáticamente para un servicio (por ejemplo, S3 o EBS)' },
            { icon: 'key', label: 'Customer managed key', desc: 'La crea el propio equipo, con control detallado sobre su key policy y rotación' },
          ]} />
          <Nota><p>Para empezar a usar cifrado, una AWS managed key suele bastar: es simple y ya viene lista. Cuando se necesita control más fino sobre quién puede usar la clave, aparece la customer managed key.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>20-21. ¿Quién puede usar una clave? La key policy</h3>
          <p>Igual que un bucket tiene una Bucket Policy y un rol tiene permisos asociados, una clave de KMS tiene su propia <strong>key policy</strong>: un documento que define quién puede usarla para cifrar o descifrar.</p>
          <pre className="codeblock">{KEY_POLICY_SNIPPET}</pre>
          <p>¿Reconoces la forma? Es la misma estructura Effect / Principal / Action / Resource que ya leímos en la Clase 3 para las trust policies. En español: <em>&quot;Permitir que el rol RolAppReportes descifre datos y genere claves de datos usando esta clave.&quot;</em></p>
        </section>

        <section className="lesson-section">
          <h3>22-23. Tener acceso al dato no es lo mismo que tener acceso a la clave</h3>
          <Dialogo>Un usuario puede tener permiso IAM para leer un objeto de S3 (Clase 2), pero si ese objeto está cifrado con una clave de KMS y ese mismo usuario no tiene permiso sobre la clave, de todos modos no podrá leer el contenido real.</Dialogo>
          <ConceptBadge icon="shield">El cifrado agrega una segunda capa de control, independiente de la política del recurso.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>24-26. Dónde aparece el cifrado en lo que ya construimos</h3>
          <RoleGrid roles={[
            { icon: 'package', label: 'Amazon S3', desc: 'Cifrado del lado del servidor (SSE) sobre los objetos de un bucket' },
            { icon: 'hard-drive', label: 'Amazon EBS', desc: 'Volúmenes cifrados — lo vimos en el Módulo 3, ahora entendemos qué hay detrás' },
            { icon: 'database', label: 'Amazon RDS', desc: 'Cifrado de la base de datos y de sus snapshots automáticos — Módulo 6' },
          ]} />
          <Nota><p>En los tres casos, la idea de fondo es la misma: los datos se guardan cifrados con una clave de KMS, y solo quien tiene permiso IAM sobre el recurso <em>y</em> permiso sobre la clave puede acceder al contenido real.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>27-28. Snapshots y copias: el cifrado viaja con los datos</h3>
          <p>Recordemos la Clase 5 del Módulo 6: un snapshot de una base cifrada mantiene esa protección. Copiar los datos no los vuelve automáticamente legibles — la copia sigue dependiendo de la misma clave (o de permisos explícitos para usar una distinta).</p>
        </section>

        <section className="lesson-section">
          <h3>29-30. Rotación de claves</h3>
          <p>Igual que las contraseñas conviene renovarlas, las claves de KMS pueden rotarse periódicamente. Para una customer managed key, AWS puede rotar automáticamente el material criptográfico subyacente sin que sea necesario volver a cifrar todos los datos existentes.</p>
          <Nota><p>Para el nivel de esta clase basta con reconocer que la rotación existe y por qué importa: reduce el tiempo de vida útil de una clave concreta si alguna vez quedara expuesta.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>31-32. Volvamos a CloudShop</h3>
          <p>CloudShop guarda comprobantes de pago de clientes en un bucket S3 y datos de clientes en RDS. Apliquemos lo aprendido:</p>
          <QaItem question="¿Alcanza con que solo IAM controle quién accede al bucket de comprobantes?" answer="No necesariamente. Cifrar el bucket con KMS agrega una capa adicional: incluso si alguien obtiene una copia de los objetos por fuera de S3, sin la clave no puede leer su contenido." />
          <QaItem question="¿Todos los desarrolladores de CloudShop deberían tener permiso sobre la clave que cifra los comprobantes de pago?" answer="No — mínimo privilegio aplica también aquí. Solo los roles o usuarios que realmente necesitan leer ese contenido deberían tener kms:Decrypt sobre esa clave." />
        </section>

        <section className="lesson-section">
          <h3>33-34. RETO DE LA CLASE</h3>
          <Nota><p>CloudShop va a almacenar los comprobantes de pago (PDF) de sus clientes en un bucket S3 nuevo llamado <code>cloudshop-comprobantes</code>. Solo el rol <code>RolFacturacion</code> debería poder leer esos archivos. Diseña, en términos generales, la protección completa.</p></Nota>
          <Reveal label="Ver la solución esperada">
            <p>Cifrar el bucket con una customer managed key de KMS. En la key policy, permitir <code>kms:Decrypt</code> únicamente al rol <code>RolFacturacion</code> (y, según el caso, a administradores de la clave). Además, mantener una Bucket Policy / IAM Policy de S3 que también restrinja el acceso de lectura a ese mismo rol — dos capas independientes: quién puede llegar al objeto (IAM/S3) y quién puede leer su contenido real (KMS).</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>35-36. Retos nivel 2 y 3</h3>
          <QaItem question="Un usuario tiene permiso de S3 para descargar un objeto cifrado con KMS, pero no tiene permiso sobre la clave. ¿Qué obtiene al descargarlo?" answer="El archivo cifrado, ilegible sin acceso a la clave — la descarga no equivale a poder leer el contenido." />
          <QaItem question="Alguien propone: 'ya que ciframos el bucket, podemos hacerlo público sin problema.' ¿Estás de acuerdo?" answer="No. El cifrado protege el contenido si alguien obtiene los bytes por fuera de los controles normales, pero no reemplaza restringir quién puede siquiera acceder al objeto. Son capas distintas y ambas importan." />
        </section>

        <section className="lesson-section">
          <h3>37-38. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El gerente propone: &quot;con tener MFA y roles bien configurados ya no necesitamos cifrar nada, sería redundante.&quot; No estoy de acuerdo porque IAM y cifrado protegen contra amenazas distintas: IAM controla quién puede pedir el dato a través de AWS; el cifrado protege el dato incluso si alguien lo obtiene por fuera de ese camino (un snapshot mal compartido, un disco robado, un backup expuesto). Esto es lo que haría en su lugar: mantener ambas capas activas. El riesgo de su enfoque es asumir que un solo control basta para todos los escenarios posibles.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: &quot;démosle a todo el equipo de desarrollo permiso sobre todas las claves de KMS, así nadie se bloquea nunca por un permiso faltante.&quot; No estoy de acuerdo porque repite, ahora sobre las claves, el mismo error de mínimo privilegio que ya corregimos con políticas y roles. Esto es lo que haría en su lugar: otorgar <code>kms:Decrypt</code> solo a las identidades que realmente necesitan leer ese contenido específico. El riesgo de su enfoque es que cualquier credencial de desarrollo comprometida obtenga acceso a datos cifrados que nunca debió poder leer.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>39. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'El cifrado en reposo protege datos mientras están guardados, no mientras viajan por la red.', correct: true },
            { text: 'AWS KMS almacena directamente los datos de la aplicación, no solo las claves.', correct: false },
            { text: 'Una key policy define quién puede usar una clave de KMS.', correct: true },
            { text: 'Tener permiso IAM para leer un objeto S3 garantiza poder leer su contenido si está cifrado con una clave a la que no se tiene acceso.', correct: false },
            { text: 'Un snapshot de una base de datos cifrada mantiene esa protección.', correct: true },
            { text: 'El cifrado reemplaza la necesidad de políticas IAM o Bucket Policies.', correct: false },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>40. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>41. Reto oral</h3>
          <Dialogo>Explícame qué hace AWS KMS sin usar las palabras clave, cifrado, KMS, dato, permiso ni AWS.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>&quot;Es el servicio que guarda y controla, bajo llave, la combinación necesaria para volver legible algo que se guardó de forma ilegible a propósito.&quot;</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>42. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Cifrado en tránsito</td><td>Protege datos mientras viajan</td></tr>
              <tr><td>Cifrado en reposo</td><td>Protege datos mientras están guardados</td></tr>
              <tr><td>Clave</td><td>Lo necesario para cifrar/descifrar</td></tr>
              <tr><td>AWS KMS</td><td>Servicio que crea y controla claves</td></tr>
              <tr><td>AWS managed key</td><td>Clave administrada automáticamente por AWS</td></tr>
              <tr><td>Customer managed key</td><td>Clave con control detallado del equipo</td></tr>
              <tr><td>Key policy</td><td>Quién puede usar la clave</td></tr>
              <tr><td>Rotación</td><td>Renovar el material criptográfico periódicamente</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>43. Ticket de salida</h3>
          <Dialogo>Un compañero dice: &quot;nuestro bucket de comprobantes ya tiene una IAM Policy que solo deja entrar a Facturación, así que cifrarlo con KMS es trabajo extra innecesario.&quot; ¿Qué le responderías?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Que IAM controla el acceso a través de los caminos normales de AWS, pero el cifrado protege el contenido incluso si alguien obtiene los datos por otra vía — un snapshot compartido por error, un backup expuesto, una copia fuera de S3. Son capas independientes y complementarias, no una alternativa a la otra.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 5</div>
          <p>Ya protegimos el acceso (IAM) y los datos guardados (KMS). Pero todavía queda un punto débil clásico: la contraseña de la base de datos, el token de una API externa, la credencial que alguien termina escribiendo en un archivo de configuración porque &quot;solo por ahora&quot;.</p>
          <ConceptBadge icon="key">Módulo 9 · Clase 5 — AWS Secrets Manager: proteger contraseñas, tokens y secretos</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-9/clase-5" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 5: AWS Secrets Manager →
          </Link>
        </div>

      </div>
    </div>
  );
}
