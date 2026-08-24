import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Para qué sirve un backup?', options: [{ text: 'Recuperar información después de pérdida o problemas.', correct: true }, { text: 'Crear usuarios.', correct: false }, { text: 'Abrir Internet.', correct: false }, { text: 'Aumentar CPU.', correct: false }] },
  { q: '¿Qué es un automated backup?', options: [{ text: 'Mecanismo automático de respaldo administrado por RDS.', correct: true }, { text: 'Security Group.', correct: false }, { text: 'Subnet.', correct: false }, { text: 'Motor.', correct: false }] },
  { q: '¿Qué es un snapshot manual?', options: [{ text: 'Copia creada deliberadamente en un punto determinado.', correct: true }, { text: 'Una IP.', correct: false }, { text: 'Un puerto.', correct: false }, { text: 'IAM Policy.', correct: false }] },
  { q: '¿Qué significa PITR?', options: [{ text: 'Restaurar a un punto específico en el tiempo.', correct: true }, { text: 'Cambiar Security Group.', correct: false }, { text: 'Crear VPC.', correct: false }, { text: 'Escalar CPU.', correct: false }] },
  { q: '¿Una restauración modifica directamente la misma instancia original?', options: [{ text: 'Sí.', correct: false }, { text: 'No, se crea una nueva instancia.', correct: true }] },
  { q: '¿Qué es la retención?', options: [{ text: 'Cuánto tiempo conservamos el historial de recuperación.', correct: true }, { text: 'Cantidad de CPU.', correct: false }, { text: 'Número de usuarios.', correct: false }, { text: 'Puerto DB.', correct: false }] },
  { q: '¿Un snapshot manual puede mantenerse después de eliminar la DB original?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Qué representa RPO?', options: [{ text: 'Cuánta pérdida de datos podemos tolerar.', correct: true }, { text: 'Cuánta RAM.', correct: false }, { text: 'Tiempo de CPU.', correct: false }, { text: 'Región.', correct: false }] },
  { q: '¿Qué representa RTO?', options: [{ text: 'Cuánto tiempo podemos tolerar el servicio detenido.', correct: true }, { text: 'Cantidad de registros.', correct: false }, { text: 'Tamaño de subnet.', correct: false }, { text: 'Puerto.', correct: false }] },
  { q: '¿Multi-AZ elimina la necesidad de backups?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
];

export default function Modulo6Clase5() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 6 · Clase 5</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 6 · Clase 5: Backups, snapshots y Point-in-Time Recovery, cómo volver atrás cuando algo sale mal</h2>
      <p className="lesson-subtitle">
        Backup no evita que algo salga mal; nos da una forma de recuperarnos cuando ocurre.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + recuperación + comparación + actividades + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 6 · Clases 1 a 4</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar por qué una base necesita backups y diferenciar disponibilidad y recuperación.</li>
            <li>Comprender qué es un backup automático en RDS y qué es un snapshot manual, diferenciándolos.</li>
            <li>Comprender qué significa retención y explicar conceptualmente Point-in-Time Recovery.</li>
            <li>Comprender que una restauración crea una nueva instancia, y reconocer qué es una ventana de backup.</li>
            <li>Comprender qué ocurre al eliminar una instancia RDS y reconocer la opción de snapshot final.</li>
            <li>Comprender que los snapshots manuales pueden conservarse después de eliminar la DB Instance.</li>
            <li>Diseñar una política sencilla de recuperación y diferenciar RPO y RTO de manera introductoria.</li>
          </ul>
          <p>La frase que debe sobrevivir será:</p>
          <Dialogo>Backup no evita que algo salga mal; nos da una forma de recuperarnos cuando ocurre.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Empecemos con un desastre</h3>
          <Nota><p>CloudShop funciona perfectamente. Un administrador intenta eliminar un pedido de prueba, pero ejecuta accidentalmente algo equivalente a <code>DELETE FROM pedidos;</code>. Resultado: 0 registros. Silencio administrativo.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>3. ¿Security Group o IAM nos salvan?</h3>
          <Nota><p>No. El usuario estaba autorizado, podía conectarse, tenía permisos — pero cometió un error. Security Group controla quién puede llegar por red, no si la consulta que ejecuta es una buena idea. IAM puede decidir quién administra el recurso RDS, pero dentro de la base un usuario autorizado todavía puede cometer errores.</p></Nota>
          <p>Necesitamos otra capa: Recuperación. Analogía del extintor: un edificio tiene cerraduras, alarmas y guardias, pero también extintores — porque prevenir no elimina completamente la posibilidad de incidentes.</p>
        </section>

        <section className="lesson-section">
          <h3>4. ¿Qué es un backup?</h3>
          <Dialogo>Es una copia o mecanismo de recuperación que nos permite volver a obtener información después de una pérdida o problema.</Dialogo>
          <Nota><p>Backup no significa copiar un archivo una vez. En una base activa los datos cambian constantemente — una copia de enero de 2024 no ayuda mucho para recuperar agosto de 2026. Necesitamos una estrategia de respaldo acorde al negocio.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>5. RDS ofrece mecanismos integrados</h3>
          <RoleGrid roles={[
            { icon: 'refresh', label: 'Automated Backups', desc: '' },
            { icon: 'camera', label: 'Manual Snapshots', desc: '' },
            { icon: 'clock', label: 'Point-in-Time Recovery', desc: '' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>6. Automated Backups</h3>
          <Dialogo>AWS crea y administra automáticamente la información necesaria para recuperar nuestra base dentro de un período de retención configurado.</Dialogo>
          <p>No necesitamos presionar "Backup" todos los días — esa es una de las ventajas del servicio administrado. No dependemos de "Pedro acordándose todos los viernes".</p>
        </section>

        <section className="lesson-section">
          <h3>7. Retención</h3>
          <Dialogo>Retención significa cuánto tiempo mantenemos disponible el historial de recuperación.</Dialogo>
          <p>7 días significa: puedo recuperar dentro de la ventana disponible correspondiente a esos siete días.</p>
          <QaItem question="Retención de 1 día, pero el problema ocurrió hace 4 días. ¿Qué pasa?" answer="Probablemente el punto que necesitábamos ya quedó fuera de nuestra ventana de recuperación automática." />
          <Nota><p>¿Entonces ponemos retención infinita? No. Más retención implica más almacenamiento de backup, posibles costos, políticas de conservación y gestión. La pregunta es: ¿cuánto historial necesita realmente el negocio? Una clínica puede necesitar conservar información por períodos específicos; una tienda de pruebas puede necesitar mucho menos.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>8. Backup Window</h3>
          <Dialogo>Un período preferido en el que RDS realiza determinadas tareas relacionadas con el backup automático.</Dialogo>
          <p>No significa que la base desaparece durante horas necesariamente — es una ventana operativa. Analogía: un supermercado decide hacer tareas de mantenimiento de 03:00 a 04:00 porque hay menos actividad. Si sabemos que nuestra tienda tiene máxima actividad a las 12:00, probablemente preferiremos un período más tranquilo.</p>
        </section>

        <section className="lesson-section">
          <h3>9. Manual Snapshot</h3>
          <Dialogo>Una copia manual del estado de nuestra base en un momento determinado.</Dialogo>
          <p>Analogía de la fotografía: viernes 18:00 → Snapshot: estado viernes 18:00. Después la base sigue cambiando. Hacemos snapshot manual antes de: una actualización importante, una migración, cambios de esquema, pruebas riesgosas, eliminar una instancia, cambios significativos.</p>
        </section>

        <section className="lesson-section">
          <h3>10. Automated Backup vs Snapshot</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th></th><th>Automated Backup</th><th>Manual Snapshot</th></tr></thead>
            <tbody>
              <tr><td>Creación</td><td>Automática</td><td>Manual</td></tr>
              <tr><td>Retención</td><td>Según período configurado</td><td>Hasta que decidamos eliminarlo</td></tr>
              <tr><td>PITR</td><td>Asociado al mecanismo automático</td><td>No funciona como historial continuo</td></tr>
              <tr><td>Uso</td><td>Recuperación operativa</td><td>Punto concreto/conservación</td></tr>
            </tbody>
          </table>
          <p>Analogía del video y la foto: Automated Backup + logs permite recuperar dentro de una línea temporal (video); Snapshot representa un punto específico (foto).</p>
        </section>

        <section className="lesson-section">
          <h3>11. Point-in-Time Recovery (PITR)</h3>
          <Dialogo>Restaurar la base al estado que tenía en un momento específico dentro de la ventana disponible.</Dialogo>
          <Nota><p>10:42 todo bien, 10:43 DELETE FROM pedidos, 10:44 desastre. ¿Queremos recuperar el estado de ayer? No necesariamente — queremos 10:42, justo antes del problema. Elegimos: Restore to: 10:42.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>12. Restaurar no rebobina mágicamente la misma instancia</h3>
          <ConceptBadge icon="alert-triangle" variant="warning">Cuando restauramos RDS desde backup o snapshot, RDS crea una NUEVA DB Instance</ConceptBadge>
          <Flow steps={[{ icon: 'database', label: 'DB original — dañada, sigue existiendo' }, { icon: 'refresh', label: 'Backup' }, { icon: 'database', label: 'Nueva DB restaurada' }]} />
          <p>La nueva instancia restaurada tendrá su propio endpoint. Por lo tanto nuestra aplicación podría necesitar DB_HOST actualizado — eso explica otra vez por qué arquitectura y recuperación van juntas.</p>
        </section>

        <section className="lesson-section">
          <h3>13. Recuperar no significa usar inmediatamente</h3>
          <Flow steps={[
            { n: 1, label: 'Verificar que la nueva base esté disponible' },
            { n: 2, label: 'Revisar datos' },
            { n: 3, label: 'Validar consistencia' },
            { n: 4, label: 'Probar aplicación' },
            { n: 5, label: 'Cambiar conexión si corresponde' },
            { n: 6, label: 'Mantener o retirar la antigua de forma controlada' },
          ]} />
          <Nota><p>No eliminamos la base dañada inmediatamente: si ocurre un incidente, no reaccionamos borrando todo. Primero conservar evidencia si corresponde → restaurar → validar → cambiar → limpiar después. Analogía del almacén: no demolemos primero y vemos si había inventario — primero creamos una bodega recuperada, validamos, después decidimos.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>14. Uso de snapshot para pruebas</h3>
          <p>Producción → Snapshot → restauramos una copia para pruebas. Si contiene datos sensibles, igualmente debemos aplicar controles y políticas apropiadas — una copia de producción sigue conteniendo información de producción.</p>
          <Nota><p>Snapshot no vuelve inocuos los datos: si la base contiene clientes, pagos y datos sensibles, el snapshot contiene una copia de esa información y necesita protección adecuada. Si trabajamos con bases cifradas, los backups y snapshots asociados mantienen consideraciones de cifrado — no profundizaremos todavía en AWS KMS.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>15. Eliminación y Final Snapshot</h3>
          <Nota><p>Cuando eliminamos una instancia RDS, AWS nos permite tomar decisiones relacionadas con la conservación de información, incluyendo crear un Final Snapshot antes de eliminarla — una última fotografía antes de destruir el recurso.</p></Nota>
          <p>Durante eliminación podemos encontrar "Skip final snapshot" — si los datos son totalmente desechables, puede ser apropiado en laboratorio; en producción requiere una decisión consciente.</p>
          <QaItem question="¿Si borro esta base hoy, mañana alguien puede pedirme recuperar algo?" answer="Si la respuesta puede ser sí, crear snapshot final puede ser crucial." />
        </section>

        <section className="lesson-section">
          <h3>16. Los snapshots manuales sobreviven a la DB</h3>
          <Nota><p>Un snapshot manual puede conservarse aunque eliminemos la DB Instance original, hasta que decidamos eliminar ese snapshot. Pero siguen generando almacenamiento: el recurso principal puede desaparecer, pero los snapshots siguen ocupando almacenamiento — pueden seguir teniendo costo. La limpieza incluye también backups antiguos.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>17. El cementerio de snapshots</h3>
          <Nota><p>En muchas cuentas terminamos con final-final, final2, old-db, backup-2023, prueba, prueba2, no-borrar, backup-final-ahora-si. Sin política de retención, nadie sabe qué puede eliminar.</p></Nota>
          <InfoBox items={['¿Cada cuánto respaldo?', '¿Cuánto tiempo conservo?', '¿Quién puede restaurar?', '¿Cuándo hago snapshots manuales?', '¿Cuándo elimino copias antiguas?', '¿Dónde documento el proceso?']} />
        </section>

        <section className="lesson-section">
          <h3>18. Backup sin restauración probada es una promesa</h3>
          <Dialogo>No basta saber que existe un backup. Debemos saber que podemos restaurarlo.</Dialogo>
          <p>Una copia que nunca hemos probado nos da confianza teórica, no necesariamente recuperación real. Una organización puede periódicamente: Backup → restaurar ambiente de prueba → verificar datos — eso confirma que el proceso funciona.</p>
        </section>

        <section className="lesson-section">
          <h3>19. RPO: Recovery Point Objective</h3>
          <Dialogo>¿Cuántos datos estamos dispuestos a perder como máximo?</Dialogo>
          <p>RPO = 1 hora significa: el negocio acepta perder como máximo aproximadamente una hora de datos en un escenario de recuperación. Un blog personal puede aceptar 24 horas; un sistema de pagos quizá necesite muchísimo menos. No existe un RPO universal.</p>
        </section>

        <section className="lesson-section">
          <h3>20. RTO: Recovery Time Objective</h3>
          <Dialogo>¿Cuánto tiempo podemos permitir que el sistema esté fuera de servicio mientras lo recuperamos?</Dialogo>
          <p>RTO = 4 horas significa: queremos recuperar el servicio dentro de aproximadamente cuatro horas.</p>
          <RoleGrid roles={[
            { icon: 'bar-chart', label: 'RPO', desc: '¿Cuánta información puedo perder?' },
            { icon: 'clock', label: 'RTO', desc: '¿Cuánto tiempo puedo estar detenido?' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>21. Backup no garantiza RTO bajo</h3>
          <Nota><p>Podemos tener un backup perfecto, pero si restaurarlo tarda 8 horas y nuestro negocio solo tolera 10 minutos, tenemos un problema. Por eso más adelante aparece alta disponibilidad.</p></Nota>
          <RoleGrid roles={[
            { icon: 'refresh', label: 'Backup / Restore', desc: 'Recuperación de datos' },
            { icon: 'building', label: 'Multi-AZ', desc: 'Continuidad ante fallos de infraestructura' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>22. Dos ideas equivocadas</h3>
          <Dialogo>"Tenemos Multi-AZ, así que no necesitamos backups." — un gerente</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque Multi-AZ está orientado a disponibilidad, no a conservar estados históricos frente a borrados o corrupción lógica. Esto es lo que haría en su lugar: mantener una estrategia de backups además de alta disponibilidad. El riesgo de su enfoque es replicar rápidamente un error y no tener un punto anterior al cual regresar.</p>
          </Nota>
          <Dialogo>"Tenemos backups, así que no necesitamos Multi-AZ." — otro gerente</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque restaurar desde backup puede tomar tiempo. Esto es lo que haría en su lugar: separar objetivos de recuperación y disponibilidad. El riesgo es sufrir una interrupción prolongada aunque los datos estén respaldados.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>23. Caso clásico: Multi-AZ no es máquina del tiempo</h3>
          <Nota><p>Tenemos Multi-AZ. Usuario ejecuta <code>DROP TABLE CLIENTES;</code> El cambio puede propagarse al entorno redundante — resultado: Primaria sin tabla, Standby sin tabla. Alta disponibilidad no es máquina del tiempo. Ahí necesitamos backup.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>24. Laboratorio conceptual: revisar backups</h3>
          <Nota><p>Seleccionamos nuestra RDS y buscamos Maintenance & backups: Backup retention, Backup window, Latest restorable time, Snapshots.</p></Nota>
          <InfoBox items={['DB: ____________________', 'Automated backups: ____________________', 'Retention: ____________________', 'Backup window: ____________________', 'Manual snapshots: ____________________', 'Latest restorable time: ____________________']} />
        </section>

        <section className="lesson-section">
          <h3>25. Laboratorio: crear snapshot manual y restaurar</h3>
          <Nota><p>Creamos <code>cloudshop-pre-cambio</code>, no <code>snapshot1</code>. Un nombre descriptivo ayuda a entender por qué existe la copia — <code>cloudshop-before-schema-update-2026-08</code> nos cuenta una historia, mientras <code>test3-final</code> nos entrega arqueología digital.</p></Nota>
          <p>RDS → Snapshots → Seleccionar → Restore snapshot. Creamos <code>cloudshop-restored</code>.</p>
          <Nota><p>No sustituye automáticamente la anterior: ahora tenemos <code>cloudshop-original</code> y <code>cloudshop-restored</code>, dos recursos distintos. La aplicación seguirá apuntando al endpoint original hasta que hagamos cambios — la base restaurada tendrá un nuevo endpoint, por eso revisamos DB_HOST en la configuración de la aplicación.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>26. Flujo de recuperación</h3>
          <Flow steps={[
            { icon: 'alert-triangle', label: 'Problema' },
            { icon: 'shield', label: 'Evitar más daño' },
            { icon: 'clock', label: 'Elegir punto' },
            { icon: 'database', label: 'Restaurar nueva DB' },
            { icon: 'search', label: 'Validar' },
            { icon: 'link', label: 'Actualizar aplicación' },
            { icon: 'check-circle', label: 'Recuperar servicio' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>27. Actividad: backup o snapshot / RPO o RTO</h3>
          <QaItem question="Se genera automáticamente / permite PITR" answer="Automated Backup." />
          <QaItem question="Lo creo antes de una migración / quiero conservar una copia específica" answer="Snapshot." />
          <QaItem question='"Puedo perder como máximo 15 minutos de información." / "No puedo perder más de un día."' answer="RPO." />
          <QaItem question='"El servicio debe volver en una hora." / "Podemos estar detenidos cuatro horas."' answer="RTO." />
        </section>

        <section className="lesson-section">
          <h3>28. Actividad: ¿qué harías?</h3>
          <QaItem question="Antes de una actualización grande." answer="Snapshot manual." />
          <QaItem question="Después de eliminar datos accidentalmente." answer="PITR / restauración apropiada." />
          <QaItem question="Antes de borrar definitivamente la RDS." answer="Evaluar Final Snapshot." />
          <QaItem question="Necesitamos recuperar operación después de una falla de infraestructura con mínimo tiempo." answer="Eso nos lleva hacia Multi-AZ." />
        </section>

        <section className="lesson-section">
          <h3>29. Caso ClínicaCloud</h3>
          <Nota><p>PostgreSQL RDS, Backup retention 7 días. Lunes 11:30 se eliminan registros incorrectamente; el problema se detecta a las 11:45.</p></Nota>
          <QaItem question="¿Qué queremos recuperar?" answer="Aproximadamente 11:29, según el último momento restaurable disponible. No necesitamos volver siete días atrás — PITR permite elegir un punto mucho más cercano al problema." />
          <Reveal label="Ver procedimiento conceptual">
            <Flow steps={[
              { n: 1, label: 'Identificar hora del incidente' },
              { n: 2, label: 'Elegir punto anterior' },
              { n: 3, label: 'Restaurar nueva RDS' },
              { n: 4, label: 'Validar datos' },
              { n: 5, label: 'Cambiar aplicación' },
              { n: 6, label: 'Investigar el incidente' },
            ]} />
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>30. Reto de la clase: AulaCloud</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge icon="trophy">AulaCloud</ConceptBadge>
          <p>Base de estudiantes, notas, asistencia. Cambios diarios, errores humanos posibles, no quieren perder más de 30 minutos de información, antes de una actualización semestral quieren una copia específica, necesitan conservarla por seis meses.</p>
          <Reveal label="Ver solución esperada">
            <InfoBox items={['Recuperación cotidiana: Automated Backups + PITR con retención acorde al negocio', 'Antes de actualización: Manual Snapshot', 'Conservación seis meses: mantener ese snapshot según política']} />
            <p>Para el requisito RPO de 30 minutos debemos validar que la estrategia y capacidades del servicio satisfagan realmente ese objetivo, no asumirlo solo por activar backups.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>31. Retos nivel 2 y 3</h3>
          <QaItem question="Backup retention 7 días. El usuario pide 'recupere la base de hace 3 meses'. ¿Podemos garantizarlo mediante automated backup?" answer="No. El punto está fuera de la ventana de retención. Necesitaríamos otra estrategia, por ejemplo snapshots conservados de acuerdo con la política." />
          <QaItem question="Snapshot 2025-01, la RDS original se elimina. En 2026 el snapshot todavía existe. ¿Puede seguir generando costos?" answer="Sí. Eliminar la DB Instance no elimina automáticamente todos los snapshots manuales que decidimos conservar." />
        </section>

        <section className="lesson-section">
          <h3>32. Reto de diagnóstico y pregunta trampa</h3>
          <QaItem question='"Restauré el snapshot pero la aplicación sigue mostrando los datos malos." ¿Qué investigamos?' answer="Una posibilidad muy probable: la aplicación sigue conectada al endpoint de la base original. Restaurar no cambia automáticamente la configuración de nuestra aplicación." />
          <QaItem question='"Hice un snapshot hace un año, así que estoy protegido contra cualquier pérdida actual." ¿Correcto?' answer="No. Una copia antigua puede proteger información antigua, no necesariamente todos los cambios desde entonces. La estrategia de backup debe corresponder al ritmo de cambio." />
        </section>

        <section className="lesson-section">
          <h3>33. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>34. Reto oral</h3>
          <Dialogo>Explícame una estrategia de respaldo sin utilizar las palabras backup, snapshot, RDS, datos, restaurar, copia, tiempo, base, guardar ni recuperar.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Mantendría estados anteriores de la información para poder reconstruir el servicio después de errores, definiendo cuánto historial conservar y cuánto podemos permitirnos perder."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>35. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Backup</td><td>Permite recuperación</td></tr>
              <tr><td>Automated Backup</td><td>Respaldo automático</td></tr>
              <tr><td>Snapshot</td><td>Copia en un punto concreto</td></tr>
              <tr><td>Retention</td><td>Tiempo que conservamos recuperación</td></tr>
              <tr><td>PITR</td><td>Volver a un momento específico</td></tr>
              <tr><td>Restore</td><td>Crea una nueva DB</td></tr>
              <tr><td>Endpoint</td><td>La restaurada tendrá uno nuevo</td></tr>
              <tr><td>Final Snapshot</td><td>Copia antes de eliminar</td></tr>
              <tr><td>RPO</td><td>Cuánto dato podemos perder</td></tr>
              <tr><td>RTO</td><td>Cuánto tiempo podemos estar fuera</td></tr>
              <tr><td>Multi-AZ</td><td>Disponibilidad, no historial</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>36. Ticket de salida</h3>
          <Dialogo>A las 15:10 alguien elimina accidentalmente una tabla y detectamos el error a las 15:20. Tenemos backups automáticos activos. ¿Qué estrategia evaluarías?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Identificaría un punto restaurable anterior al error, restauraría RDS a una nueva instancia, validaría que la información esté correcta y luego modificaría de manera controlada la conexión de la aplicación hacia la instancia restaurada.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 6</div>
          <Nota><p>Cerraría mostrando dos escenarios:</p></Nota>
          <Flow steps={[{ icon: 'database', label: 'Escenario A — Usuario borra datos' }, { icon: 'refresh', label: 'Necesitamos: Backup' }]} />
          <Flow steps={[{ icon: 'database', label: 'Escenario B — Availability Zone falla' }, { icon: 'alert-triangle', label: 'Los datos están correctos, pero la infraestructura no está disponible' }]} />
          <Dialogo>"¿Tenemos que esperar a restaurar manualmente un backup cada vez que falla infraestructura?"</Dialogo>
          <p>Para aplicaciones críticas, quisiéramos algo mejor.</p>
          <ConceptBadge icon="building">Módulo 6 · Clase 6 — Multi-AZ y Failover: mantener la base disponible cuando una zona falla</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-6/clase-6" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 6: Multi-AZ y Failover →
          </Link>
        </div>

      </div>
    </div>
  );
}
