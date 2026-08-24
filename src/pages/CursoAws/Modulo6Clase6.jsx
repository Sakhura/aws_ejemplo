import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, CompareCols, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Cuál es el objetivo principal de Multi-AZ?', options: [{ text: 'Alta disponibilidad.', correct: true }, { text: 'Guardar archivos.', correct: false }, { text: 'Crear usuarios.', correct: false }, { text: 'Distribuir imágenes.', correct: false }] },
  { q: '¿Multi-AZ reemplaza backups?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Qué es una Primary?', options: [{ text: 'Instancia que normalmente atiende la base.', correct: true }, { text: 'Snapshot.', correct: false }, { text: 'Security Group.', correct: false }, { text: 'Bucket.', correct: false }] },
  { q: '¿Qué es una standby en Multi-AZ tradicional?', options: [{ text: 'Infraestructura redundante preparada para failover.', correct: true }, { text: 'Archivo S3.', correct: false }, { text: 'Usuario de lectura.', correct: false }, { text: 'NAT Gateway.', correct: false }] },
  { q: '¿Qué es failover?', options: [{ text: 'Pasar el servicio hacia infraestructura redundante disponible.', correct: true }, { text: 'Eliminar un backup.', correct: false }, { text: 'Cambiar contraseña.', correct: false }, { text: 'Crear VPC.', correct: false }] },
  { q: '¿Qué debería usar la aplicación para conectarse a RDS?', options: [{ text: 'Endpoint DNS.', correct: true }, { text: 'Una IP fija escrita para siempre.', correct: false }, { text: 'Bucket S3.', correct: false }, { text: 'Availability Zone.', correct: false }] },
  { q: '¿La standby tradicional Multi-AZ se utiliza normalmente para repartir lecturas?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Qué característica se orienta principalmente a escalar lecturas?', options: [{ text: 'Read Replica.', correct: true }, { text: 'Snapshot.', correct: false }, { text: 'Security Group.', correct: false }, { text: 'IAM User.', correct: false }] },
  { q: '¿Multi-AZ puede aumentar el costo?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: 'Si eliminamos datos accidentalmente, ¿qué herramienta es más apropiada para volver a un estado anterior?', options: [{ text: 'Backup/PITR.', correct: true }, { text: 'Multi-AZ solamente.', correct: false }, { text: 'IGW.', correct: false }, { text: 'Route Table.', correct: false }] },
];

export default function Modulo6Clase6() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 6 · Clase 6</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 6 · Clase 6: Multi-AZ y Failover, mantener la base disponible cuando una zona falla</h2>
      <p className="lesson-subtitle">
        Multi-AZ no intenta volver al pasado; intenta mantener el servicio disponible cuando falla parte de la infraestructura.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + alta disponibilidad + arquitectura + diagnóstico + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 6 · Clases 1 a 5</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué significa alta disponibilidad y comprender qué problema resuelve Multi-AZ.</li>
            <li>Diferenciar backup y alta disponibilidad.</li>
            <li>Explicar qué es una instancia primaria y comprender qué es una instancia standby.</li>
            <li>Entender conceptualmente la replicación síncrona y explicar qué es un failover.</li>
            <li>Comprender que la aplicación utiliza un endpoint de RDS y por qué no debemos depender de una IP fija.</li>
            <li>Reconocer escenarios que pueden provocar failover.</li>
            <li>Comprender que Multi-AZ puede aumentar costos.</li>
            <li>Diferenciar Multi-AZ y Read Replica de manera introductoria.</li>
            <li>Relacionar Multi-AZ con RTO y disponibilidad.</li>
          </ul>
          <p>La frase que debe sobrevivir será:</p>
          <Dialogo>Multi-AZ no intenta volver al pasado; intenta mantener el servicio disponible cuando falla parte de la infraestructura.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Tenemos otro problema</h3>
          <Nota><p>CloudShop está funcionando, la información está correcta. No hubo DELETE ni DROP TABLE. Esta vez ocurre otra cosa: nuestra base está funcionando en Availability Zone A y ocurre una falla relevante.</p></Nota>
          <QaItem question="¿De qué sirve tener todos los datos correctos si la aplicación no puede acceder a ellos?" answer="Aquí aparece disponibilidad." />
        </section>

        <section className="lesson-section">
          <h3>3. Disponibilidad</h3>
          <Dialogo>¿El servicio está funcionando cuando los usuarios lo necesitan?</Dialogo>
          <p>Una base puede tener datos correctos pero servicio no disponible, y para el usuario sigue siendo un problema. Analogía del supermercado: todos los productos están perfectamente almacenados, pero la única puerta de entrada se rompe — los productos no desaparecieron, pero los clientes tampoco pueden comprar. Ese es un problema de disponibilidad.</p>
        </section>

        <section className="lesson-section">
          <h3>4. Dos problemas, dos herramientas</h3>
          <RoleGrid roles={[
            { icon: 'refresh', label: 'Backup', desc: '¿Puedo recuperar información anterior?' },
            { icon: 'building', label: 'Multi-AZ', desc: '¿Puede seguir funcionando el servicio ante determinados fallos?' },
          ]} />
          <p>No son equivalentes.</p>
        </section>

        <section className="lesson-section">
          <h3>5. ¿Qué significa Multi-AZ?</h3>
          <Dialogo>RDS mantiene capacidad redundante en otra zona para poder continuar operando si la principal presenta un problema.</Dialogo>
          <p>Analogía de dos hoteles: si alojamos a todos nuestros trabajadores en el Hotel A y este queda inutilizable, todos tienen problemas. Hotel A + Hotel B permite tener una alternativa.</p>
        </section>

        <section className="lesson-section">
          <h3>6. Implementación tradicional Multi-AZ</h3>
          <Flow steps={[{ icon: 'building', label: 'AZ A — Primary' }, { icon: 'refresh', label: 'sincronización' }, { icon: 'building', label: 'AZ B — Standby' }]} />
          <RoleGrid roles={[
            { icon: 'settings', label: 'Primary', desc: 'La instancia que normalmente atiende las operaciones de nuestra aplicación' },
            { icon: 'shield', label: 'Standby', desc: 'Instancia redundante mantenida por RDS en otra AZ, la reemplazante preparada por si la principal falla' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>7. Standby no es "servidor de lectura gratis"</h3>
          <Nota><p>En el despliegue tradicional Multi-AZ con una standby, esta existe principalmente para alta disponibilidad, no como una réplica de lectura para repartir consultas. No enseñamos "como ya tengo dos bases, leo desde las dos" — eso corresponde a otro concepto: Read Replicas, que veremos más adelante.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>8. Replicación síncrona</h3>
          <Dialogo>Cuando se confirma un cambio, la copia de respaldo de alta disponibilidad también se mantiene actualizada.</Dialogo>
          <Flow steps={[{ icon: 'database', label: 'Primary — cambio' }, { icon: 'database', label: 'Standby' }]} />
          <p>No necesitamos entrar en protocolos internos. Solo entender: no estamos copiando los datos una vez al día — la standby se mantiene preparada.</p>
        </section>

        <section className="lesson-section">
          <h3>9. Pero el error humano también se replica</h3>
          <Nota><p>Pedro ejecuta <code>DELETE FROM pedidos;</code> El cambio es técnicamente válido, la base principal acepta, y el cambio también se propaga a la infraestructura redundante. Resultado: Primary sin pedidos, Standby sin pedidos.</p></Nota>
          <ConceptBadge icon="x-circle" variant="danger">Multi-AZ ≠ Backup</ConceptBadge>
          <p>Multi-AZ intenta mantener una copia coherente y disponible del estado actual. Pero si el estado actual es "datos borrados", la alta disponibilidad no sabe "Pedro se equivocó" — para eso necesitábamos la Clase 5.</p>
        </section>

        <section className="lesson-section">
          <h3>10. Failover</h3>
          <Dialogo>Failover es el proceso de pasar el servicio desde la instancia que falló hacia la infraestructura redundante disponible.</Dialogo>
          <Flow steps={[{ icon: 'x-circle', label: 'Primary — falla' }, { icon: 'refresh', label: 'Failover' }, { icon: 'check-circle', label: 'Nueva Primary' }]} />
          <p>Analogía de la rueda de repuesto: pinchamos, no necesitamos construir un automóvil nuevo — tenemos una rueda de repuesto preparada, la cambiamos y continuamos. Representa infraestructura preparada antes del problema.</p>
        </section>

        <section className="lesson-section">
          <h3>11. La gran diferencia con restore</h3>
          <CompareCols cols={[
            { emoji: '💾', title: 'Backup Restore', items: ['Problema', 'Buscar respaldo', 'Crear nueva base', 'Validar', 'Reconectar'] },
            { emoji: '🏢', title: 'Multi-AZ Failover', items: ['Infraestructura falla', 'Failover', 'Infraestructura redundante toma el rol'] },
          ]} />
          <p>Mucho más orientado a continuidad. Aquí vuelve RTO: si nuestro RTO es 8 horas, restaurar desde un backup puede ser aceptable; si nuestro RTO es muy bajo, una estrategia de alta disponibilidad cobra mucha más importancia.</p>
        </section>

        <section className="lesson-section">
          <h3>12. El endpoint vuelve a ser importante</h3>
          <Nota><p>Nuestra aplicación no debería depender de <code>10.0.20.15</code> como si esa dirección fuera eterna. Utiliza el Endpoint DNS. Durante un failover, la infraestructura que atiende la base puede cambiar, y RDS actualiza la resolución DNS del endpoint para apuntar al nuevo destino correspondiente.</p></Nota>
          <p>Analogía de recepción: llamamos a "Recepción del Hotel Cloud", no a "la persona que hoy está sentada en la silla 7". Si cambia el recepcionista, seguimos llamando al mismo número.</p>
        </section>

        <section className="lesson-section">
          <h3>13. ¿Qué puede provocar un failover?</h3>
          <Nota><p>Dependiendo del despliegue, RDS puede realizar failover ante: pérdida de disponibilidad de la zona, fallos de infraestructura, determinados problemas de la DB Instance, ciertos mantenimientos, reinicios con failover iniciados deliberadamente.</p></Nota>
          <p>En determinados despliegues podemos realizar "Reboot with failover" para probar el comportamiento — alta disponibilidad que nunca probamos sigue siendo parcialmente una teoría. Queremos saber: ¿la aplicación se reconecta? ¿el DNS se actualiza correctamente? ¿cuánto tarda? ¿hay errores? ¿tenemos timeouts adecuados?</p>
        </section>

        <section className="lesson-section">
          <h3>14. La aplicación también debe estar preparada</h3>
          <Nota><p>Multi-AZ mejora la infraestructura, pero la aplicación debe manejar: conexión perdida → espera → reconexión. Un failover puede provocar una interrupción temporal de conexiones existentes.</p></Nota>
          <ConceptBadge icon="clock" variant="warning">Multi-AZ no significa cero segundos. Alta disponibilidad significa reducir impacto y automatizar recuperación, no violar las leyes del tiempo.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>15. Single-AZ vs Multi-AZ y sus costos</h3>
          <Flow steps={[{ icon: 'building', label: 'Single-AZ — AZ A → RDS' }, { icon: 'building', label: 'Multi-AZ — AZ A Primary + AZ B Standby' }]} />
          <Nota><p>Multi-AZ normalmente implica mayor costo que Single-AZ porque estamos utilizando infraestructura adicional. Más resiliencia suele implicar más recursos.</p></Nota>
          <p>¿Entonces usamos Multi-AZ siempre? No necesariamente: ¿qué tan crítica es la aplicación? ¿cuánto downtime toleramos? ¿cuánto cuesta una interrupción? ¿cuál es nuestro presupuesto? ¿es producción o laboratorio?</p>
        </section>

        <section className="lesson-section">
          <h3>16. Laboratorio vs producción crítica</h3>
          <CompareCols cols={[
            { emoji: '🧪', title: 'Ambiente de laboratorio', items: ['Curso, práctica, datos desechables', 'Single-AZ puede ser suficiente'] },
            { emoji: '🏥', title: 'Producción crítica', items: ['Sistema clínico, plataforma de pagos, comercio importante', 'Multi-AZ puede ser mucho más justificable'] },
          ]} />
          <p>Si una hora caída cuesta $100.000.000, pagar por redundancia puede ser sencillo de justificar. Si es un blog de pruebas que nadie visita, quizá no. Arquitectura es: Necesidad + Riesgo + Costo.</p>
        </section>

        <section className="lesson-section">
          <h3>17. Multi-AZ no es escalabilidad de lectura</h3>
          <QaItem question="Tenemos muchísimas consultas SELECT. ¿Añadir una standby Multi-AZ tradicional significa que ahora repartiremos las lecturas entre ambas?" answer="No. Para eso existe otro concepto: Read Replica." />
          <Dialogo>Una Read Replica es una copia diseñada para recibir principalmente consultas de lectura y ayudar a escalar ese tipo de carga.</Dialogo>
          <Flow steps={[{ icon: 'database', label: 'Primary' }, { icon: 'eye', label: 'Reader 1' }, { icon: 'eye', label: 'Reader 2' }]} />
        </section>

        <section className="lesson-section">
          <h3>18. Multi-AZ vs Read Replica</h3>
          <RoleGrid roles={[
            { icon: 'building', label: 'Multi-AZ', desc: 'Disponibilidad' },
            { icon: 'eye', label: 'Read Replica', desc: 'Escalabilidad de lectura y otros escenarios' },
          ]} />
          <p>Analogía del supermercado: Multi-AZ es tener una segunda tienda preparada por si la principal falla; Read Replica es abrir más cajas para atender más consultas. Una cosa es continuidad, otra es capacidad.</p>
          <Nota><p>Una Read Replica tampoco es backup: si datos erróneos se replican, la réplica puede recibir también esos cambios. HA ≠ Backup, Replica ≠ Backup. El backup sigue teniendo su función.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>19. Tres problemas diferentes</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Herramienta</th><th>Pregunta</th></tr></thead>
            <tbody>
              <tr><td>Backup</td><td>¿Puedo recuperar un estado anterior?</td></tr>
              <tr><td>Multi-AZ</td><td>¿Puedo seguir funcionando ante una falla?</td></tr>
              <tr><td>Read Replica</td><td>¿Puedo distribuir más lecturas?</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>20. Nuestra arquitectura CloudShop</h3>
          <Flow steps={[
            { icon: 'user', label: 'Usuarios' },
            { icon: 'globe', label: 'Aplicación' },
            { icon: 'shield', label: 'SG' },
            { icon: 'link', label: 'RDS Endpoint' },
            { icon: 'building', label: 'AZ A Primary ⇄ AZ B Standby — sincronización' },
          ]} />
          <Nota><p>Ambas siguen dentro de nuestra arquitectura privada: Multi-AZ no significa "ahora una copia es pública". Seguimos manteniendo Public access: No si esa es nuestra necesidad — la redundancia y la exposición son problemas diferentes.</p></Nota>
          <p>Security Group sigue existiendo: SG-RDS con MySQL 3306, Source: SG-App. El failover no significa "abramos todo nuevamente" — la arquitectura de seguridad continúa aplicándose.</p>
        </section>

        <section className="lesson-section">
          <h3>21. Aplicación no necesita saber cuál es Primary</h3>
          <Nota><p>Ese es justamente uno de los beneficios del endpoint. La aplicación usa DB_HOST = rds-endpoint, no "if AZ-A works: connect A, else: connect B". RDS gestiona gran parte de ese mecanismo.</p></Nota>
          <Flow steps={[{ icon: 'globe', label: 'App' }, { icon: 'link', label: 'Endpoint' }, { icon: 'database', label: 'Primary A' }]} />
          <p>Al fallar Primary A, RDS inicia Failover, y después la App sigue usando el mismo endpoint, ahora apuntando a la nueva Primary B.</p>
        </section>

        <section className="lesson-section">
          <h3>22. DNS cache puede importar</h3>
          <Nota><p>Como el endpoint depende de DNS, aplicaciones mal configuradas que cachean direcciones durante demasiado tiempo pueden retrasar la reconexión. Usamos el endpoint y permitimos que la aplicación resuelva DNS apropiadamente — no necesitamos entrar en TTL avanzados hoy.</p></Nota>
          <p>Nuestra aplicación debería: manejar desconexiones, reintentar cuando corresponda, utilizar timeouts adecuados, no depender de una IP fija, monitorear errores. No delegamos todo a RDS.</p>
        </section>

        <section className="lesson-section">
          <h3>23. Monitoreo</h3>
          <InfoBox items={['Disponibilidad', 'Conexiones', 'CPU', 'Almacenamiento', 'Eventos']} />
          <p>Si ocurre failover, queremos saberlo. Alta disponibilidad automática no significa administración ciega.</p>
        </section>

        <section className="lesson-section">
          <h3>24. Laboratorio conceptual: revisar y convertir a Multi-AZ</h3>
          <InfoBox items={['DB: ____________________', 'Deployment: ____________________', 'Region: ____________________', 'Endpoint: ____________________', 'Backup enabled: ____________________', 'Security Group: ____________________']} />
          <Nota><p>En escenarios compatibles, una DB Instance puede modificarse: RDS → Database → Modify → Availability → Multi-AZ. Antes de hacer cambios reales revisamos costo, compatibilidad, impacto, ventana/aplicación de cambios.</p></Nota>
          <p>AWS puede permitir aplicar cambios "Immediately" o durante la Maintenance Window. No seleccionamos "Immediately" por reflejo — preguntamos qué impacto puede tener este cambio.</p>
        </section>

        <section className="lesson-section">
          <h3>25. Actividad: Backup o Multi-AZ / Multi-AZ o Read Replica</h3>
          <QaItem question="Usuario elimina una tabla / Necesito volver a ayer" answer="Backup." />
          <QaItem question="Falla la AZ principal / Necesito continuidad ante falla de infraestructura" answer="Multi-AZ." />
          <QaItem question="Quiero alta disponibilidad / quiero failover administrado" answer="Multi-AZ." />
          <QaItem question="Tengo muchísimas consultas de lectura / quiero distribuir SELECT" answer="Read Replica." />
        </section>

        <section className="lesson-section">
          <h3>26. Actividad: verdadero o falso</h3>
          <QaItem question='"Multi-AZ reemplaza backups."' answer="Falso." />
          <QaItem question='"La standby tradicional se usa principalmente para lecturas."' answer="Falso." />
          <QaItem question='"La aplicación debería utilizar el endpoint RDS."' answer="Verdadero." />
          <QaItem question='"Multi-AZ puede aumentar costos."' answer="Verdadero." />
        </section>

        <section className="lesson-section">
          <h3>27. Caso ClínicaCloud</h3>
          <Nota><p>"Si la base se cae durante dos horas, las atenciones se ven seriamente afectadas." Eso significa: disponibilidad importa mucho. Evaluamos Multi-AZ.</p></Nota>
          <Flow steps={[
            { icon: 'globe', label: 'Aplicación' },
            { icon: 'link', label: 'Endpoint' },
            { icon: 'building', label: 'AZ A Primary ⇄ AZ B Standby' },
          ]} />
          <QaItem question="Falla AZ A. ¿Qué ocurre?" answer="Standby B se promueve a nueva Primary. La aplicación continúa utilizando el endpoint." />
        </section>

        <section className="lesson-section">
          <h3>28. Reto de la clase: AulaCloud</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge icon="trophy">AulaCloud</ConceptBadge>
          <p>RDS PostgreSQL con 50.000 estudiantes, 1.000 docentes. Debe funcionar durante períodos críticos de matrícula. No pueden permitirse una interrupción larga; deben poder recuperar datos borrados accidentalmente; no necesitan distribuir gran cantidad de lecturas todavía.</p>
          <Reveal label="Ver solución razonada">
            <p>¿Backup? Sí. ¿Multi-AZ? Probablemente sí, según los objetivos de disponibilidad. ¿Read Replica? No necesariamente.</p>
            <ConceptBadge>Automated Backups + snapshots según política + Multi-AZ, porque tenemos dos objetivos distintos: Recuperación de datos y Alta disponibilidad</ConceptBadge>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>29. Retos nivel 2 y 3</h3>
          <QaItem question="AulaCloud tiene Multi-AZ ✅ pero Backup retention = 0. Pedro elimina accidentalmente todos los estudiantes. ¿Multi-AZ recuperará la información anterior?" answer="No. La redundancia mantiene disponibilidad del estado actual, no un historial de recuperación." />
          <QaItem question="Backups ✅, Single-AZ. La AZ falla. ¿Los datos están necesariamente perdidos?" answer="No. Pero podemos necesitar un proceso de recuperación que implique más tiempo que un failover Multi-AZ. Eso puede afectar nuestro RTO." />
        </section>

        <section className="lesson-section">
          <h3>30. Retos de diagnóstico</h3>
          <QaItem question="Ocurrió un failover, la base está disponible nuevamente, pero la aplicación no reconecta. Encontramos DB_HOST = 10.0.20.15. ¿Problema?" answer="La aplicación está usando una IP fija en vez del endpoint RDS." />
          <QaItem question="Multi-AZ ✅, pero la aplicación tiene connection timeout enorme y sin reintentos. ¿Puede la experiencia ser mala igual?" answer="Sí. Un failover puede existir perfectamente y aun así la experiencia de la aplicación ser mala. Alta disponibilidad requiere diseño de extremo a extremo." />
        </section>

        <section className="lesson-section">
          <h3>31. Dos preguntas del gerente</h3>
          <Dialogo>"Si habilito Multi-AZ, ¿mi sistema nunca se caerá?"</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque Multi-AZ reduce el impacto de determinados fallos, pero no elimina todos los posibles puntos de falla. Esto es lo que haría en su lugar: combinar alta disponibilidad con backups, monitoreo, aplicaciones resilientes y pruebas. El riesgo de su enfoque es asumir que una sola característica convierte todo el sistema en invulnerable.</p>
          </Nota>
          <Dialogo>"Si Multi-AZ cuesta más, mejor hacemos backups cada cinco minutos y listo."</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque backup y failover tienen objetivos distintos. Esto es lo que haría en su lugar: definir RPO y RTO y escoger mecanismos que respondan a ambos. El riesgo es tener los datos recuperables, pero sufrir una interrupción demasiado larga para el negocio.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>32. Matriz de decisión</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Necesidad</th><th>Solución principal a evaluar</th></tr></thead>
            <tbody>
              <tr><td>Recuperar datos borrados</td><td>Backup/PITR</td></tr>
              <tr><td>Sobrevivir mejor a falla de AZ</td><td>Multi-AZ</td></tr>
              <tr><td>Reducir tiempo de interrupción</td><td>Alta disponibilidad</td></tr>
              <tr><td>Aumentar capacidad de lectura</td><td>Read Replica</td></tr>
              <tr><td>Volver a un estado anterior</td><td>Backup</td></tr>
              <tr><td>Probar recuperación</td><td>Restore / failover testing</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>33. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>34. Reto oral</h3>
          <Dialogo>Explícame Multi-AZ sin utilizar las palabras AWS, RDS, base, disponibilidad, zona, failover, copia, primaria, standby, servidor ni backup.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Mantengo infraestructura redundante en ubicaciones separadas para que, si la que atiende normalmente deja de funcionar, otra preparada pueda asumir su función con una interrupción menor."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>35. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Multi-AZ</td><td>Alta disponibilidad entre AZ</td></tr>
              <tr><td>Primary</td><td>Atiende normalmente la base</td></tr>
              <tr><td>Standby</td><td>Infraestructura redundante</td></tr>
              <tr><td>Failover</td><td>Cambio hacia infraestructura disponible</td></tr>
              <tr><td>Endpoint</td><td>Nombre usado por la aplicación</td></tr>
              <tr><td>Backup</td><td>Recupera estados anteriores</td></tr>
              <tr><td>Read Replica</td><td>Escala principalmente lecturas</td></tr>
              <tr><td>RPO</td><td>Cuánto dato podemos perder</td></tr>
              <tr><td>RTO</td><td>Cuánto tiempo podemos estar fuera</td></tr>
              <tr><td>Multi-AZ (costo)</td><td>Mayor resiliencia, mayor costo potencial</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>36. Ticket de salida</h3>
          <Dialogo>Una empresa tiene Multi-AZ. Un administrador elimina accidentalmente todos los pedidos. ¿La standby resolverá el problema?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>No. Multi-AZ mantiene disponibilidad y replica el estado de la base, por lo que el borrado puede propagarse. Para regresar a un estado anterior necesitamos una estrategia de backups o Point-in-Time Recovery.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 7</div>
          <Flow steps={[{ icon: 'database', label: 'Amazon RDS' }, { icon: 'settings', label: 'MySQL / PostgreSQL' }, { icon: 'server', label: 'Capacidad' }, { icon: 'hard-drive', label: 'Almacenamiento' }, { icon: 'lock', label: 'VPC + SG' }, { icon: 'refresh', label: 'Backups' }, { icon: 'building', label: 'Multi-AZ' }]} />
          <Dialogo>"¿RDS tradicional es la única forma de trabajar con bases de datos en AWS?"</Dialogo>
          <p>No. AWS también ofrece una base relacional diseñada específicamente para la nube: Amazon Aurora. Y existen bases que ni siquiera siguen el modelo relacional tradicional: Amazon DynamoDB.</p>
          <ConceptBadge icon="rocket">Módulo 6 · Clase 7 — Amazon Aurora y DynamoDB: cuando no todas las bases de datos resuelven el mismo problema</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-6/clase-7" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 7: Amazon Aurora y DynamoDB →
          </Link>
        </div>

      </div>
    </div>
  );
}
