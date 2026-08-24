import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué decisión define MySQL o PostgreSQL?', options: [{ text: 'Motor', correct: true }, { text: 'Storage', correct: false }, { text: 'Security Group', correct: false }, { text: 'Subnet', correct: false }] },
  { q: '¿Qué determina principalmente una DB Instance Class?', options: [{ text: 'CPU y memoria disponibles.', correct: true }, { text: 'Nombre de las tablas.', correct: false }, { text: 'Usuarios de la base.', correct: false }, { text: 'CIDR.', correct: false }] },
  { q: '¿Qué significa right sizing?', options: [{ text: 'Elegir recursos acordes a la necesidad.', correct: true }, { text: 'Elegir siempre lo más grande.', correct: false }, { text: 'Elegir siempre lo más pequeño.', correct: false }, { text: 'Usar solo gratuito.', correct: false }] },
  { q: '¿Qué es gp3?', options: [{ text: 'Almacenamiento SSD de propósito general.', correct: true }, { text: 'Motor de base.', correct: false }, { text: 'Security Group.', correct: false }, { text: 'Región.', correct: false }] },
  { q: '¿Qué representan las IOPS?', options: [{ text: 'Operaciones de entrada/salida por segundo.', correct: true }, { text: 'Usuarios IAM.', correct: false }, { text: 'Cantidad de tablas.', correct: false }, { text: 'Regiones disponibles.', correct: false }] },
  { q: '¿Qué tipo de almacenamiento evaluamos para cargas de I/O muy exigentes?', options: [{ text: 'Provisioned IOPS SSD.', correct: true }, { text: 'S3 Glacier.', correct: false }, { text: 'EFS exclusivamente.', correct: false }, { text: 'Magnetic como nueva opción.', correct: false }] },
  { q: '¿Magnetic Storage sigue siendo una opción recomendada para nuevas RDS?', options: [{ text: 'Sí.', correct: false }, { text: 'No, está deprecado y ya no se ofrece para nuevas DB Instances.', correct: true }] },
  { q: '¿Storage Autoscaling puede aumentar automáticamente capacidad?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Autoscaling significa almacenamiento ilimitado?', options: [{ text: 'Sí.', correct: false }, { text: 'No, definimos un límite máximo.', correct: true }] },
  { q: '¿Más almacenamiento en GB siempre significa mayor rendimiento?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
];

export default function Modulo6Clase3() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 6 · Clase 3</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 6 · Clase 3: Motores, DB Instances y almacenamiento, elegir el tamaño correcto sin pagar de más</h2>
      <p className="lesson-subtitle">
        Elegir una base RDS significa decidir qué tecnología usamos, cuánta potencia necesita y qué almacenamiento requiere.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + comparación + dimensionamiento + actividades + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 6 · Clases 1 y 2</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Diferenciar motor, DB Instance y almacenamiento, comprendiendo que son tres decisiones diferentes.</li>
            <li>Reconocer los principales motores disponibles en Amazon RDS.</li>
            <li>Comprender qué es una DB Instance Class y relacionar CPU y memoria con el rendimiento de una base.</li>
            <li>Reconocer clases de propósito general, burstable y optimizadas para memoria.</li>
            <li>Comprender qué es el almacenamiento SSD de propósito general y reconocer gp3 como opción actual recomendada.</li>
            <li>Comprender conceptualmente qué son las IOPS y cuándo evaluar Provisioned IOPS.</li>
            <li>Comprender qué es Storage Autoscaling.</li>
            <li>Aplicar right sizing y relacionar tamaño y rendimiento con costos.</li>
          </ul>
          <p>La frase que debe sobrevivir será:</p>
          <Dialogo>Elegir una base RDS significa decidir qué tecnología usamos, cuánta potencia necesita y qué almacenamiento requiere.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Tenemos tres decisiones</h3>
          <Nota><p>CloudShop necesita una base. No basta decir "quiero RDS". Debemos responder: ¿qué motor? ¿qué capacidad? ¿qué almacenamiento?</p></Nota>
          <Flow steps={[{ icon: 'cloud', label: 'Amazon RDS' }, { icon: 'settings', label: 'Motor' }, { icon: 'server', label: 'Instance' }, { icon: 'hard-drive', label: 'Storage' }]} />
          <p>Analogía del automóvil: primero elegimos tipo (auto, camioneta, furgón), después potencia (motor pequeño, mediano, grande), después capacidad (cuánto puede transportar). No son la misma decisión.</p>
        </section>

        <section className="lesson-section">
          <h3>3. Primera decisión: motor</h3>
          <Nota><p>Amazon RDS soporta actualmente motores como MySQL, PostgreSQL, MariaDB, Microsoft SQL Server, Oracle e IBM Db2.</p></Nota>
          <QaItem question="¿Cuál es el mejor?" answer="Ninguno universalmente. La pregunta correcta es: ¿cuál necesita nuestra aplicación?" />
          <Nota><p>Si un sistema empresarial utiliza SQL Server, decir "PostgreSQL es gratuito, cambiémoslo hoy" puede implicar cambios en consultas, cambios de código, migración, pruebas e incompatibilidades. Elegir motor es una decisión tecnológica, no cosmética.</p></Nota>
          <p>Para personas nuevas en RDS, AWS utiliza frecuentemente MySQL y PostgreSQL como opciones iniciales por su amplio uso y ecosistema. Para nuestro laboratorio podemos utilizar MySQL para mantener los ejemplos sencillos — no porque sea "el mejor", sino porque nos sirve para aprender.</p>
        </section>

        <section className="lesson-section">
          <h3>4. CloudShop: primera decisión resuelta</h3>
          <ConceptBadge icon="check-circle">Engine: MySQL ✅. Ahora: ¿cuánta potencia necesita?</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>5. Segunda decisión: DB Instance Class</h3>
          <Dialogo>Es el tamaño del computador que ejecutará nuestra base.</Dialogo>
          <p>AWS indica que la clase de instancia define la capacidad de procesamiento y memoria asignada.</p>
          <Flow steps={[{ icon: 'server', label: 'DB Instance' }, { icon: 'settings', label: 'CPU' }, { icon: 'lightbulb', label: 'RAM' }, { icon: 'globe', label: 'Capacidad de red' }]} />
          <p>Más capacidad puede soportar mayor carga, pero también puede costar más. Analogía de la caja de supermercado: 5 clientes puede bastar con una caja; 5.000 clientes simultáneos probablemente necesitan más capacidad.</p>
        </section>

        <section className="lesson-section">
          <h3>6. CPU y memoria</h3>
          <RoleGrid roles={[
            { icon: 'settings', label: 'CPU', desc: 'Ayuda a procesar consultas, cálculos, actualizaciones' },
            { icon: 'lightbulb', label: 'Memoria', desc: 'Mantiene información y estructuras usadas frecuentemente disponibles con rapidez' },
          ]} />
          <p>Analogía del escritorio: un escritorio pequeño solo tiene lugar para pocos documentos y hay que ir constantemente al archivador; un escritorio grande permite tener más cosas a mano — eso es memoria.</p>
        </section>

        <section className="lesson-section">
          <h3>7. Familias de clases</h3>
          <Nota><p>Amazon RDS dispone actualmente de clases orientadas a distintos usos: propósito general, optimizadas para memoria, optimizadas para cómputo, rendimiento burstable, y Optimized Reads. Trabajaremos principalmente con tres ideas.</p></Nota>
          <RoleGrid roles={[
            { icon: 'target', label: 'General Purpose', desc: 'Equilibrio entre recursos, para cargas sin necesidad extremadamente especializada' },
            { icon: 'lightbulb', label: 'Memory Optimized', desc: 'Cargas que necesitan mayor capacidad de memoria: grandes conjuntos activos, consultas intensivas' },
            { icon: 'zap', label: 'Burstable Performance', desc: 'Cargas intermitentes: bajo, bajo, pico, bajo — en vez de alto todo el tiempo' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>8. Burstable no significa potencia infinita</h3>
          <Nota><p>No enseñamos "es pequeña pero cuando quiere se transforma eternamente en Hulk". Estas clases tienen un modelo de rendimiento específico. Para cargas constantemente altas, puede ser mejor evaluar otro tipo de instancia.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>9. Right sizing, otra vez</h3>
          <Dialogo>Elegir recursos de acuerdo con la necesidad real.</Dialogo>
          <RoleGrid roles={[
            { icon: 'x-circle', label: 'Demasiado pequeña', desc: 'Consultas lentas, falta de memoria, CPU alta, saturación' },
            { icon: 'dollar-sign', label: 'Demasiado grande', desc: 'Funciona, pero con capacidad sin utilizar y costo innecesario' },
          ]} />
          <Flow steps={[{ icon: 'bar-chart', label: 'Estimar' }, { icon: 'server', label: 'Implementar' }, { icon: 'search', label: 'Medir' }, { icon: 'settings', label: 'Ajustar' }]} />
        </section>

        <section className="lesson-section">
          <h3>10. Dos casos opuestos</h3>
          <p>CloudShop pequeña (500 clientes, 50 productos, 20 pedidos diarios): no elegimos automáticamente una DB enorme, podemos comenzar con una configuración pequeña apropiada para desarrollo/laboratorio.</p>
          <p>BankCloud (millones de operaciones, miles de usuarios concurrentes): requiere una evaluación completamente diferente. El tamaño de la empresa por sí solo tampoco basta — importa el patrón real de carga.</p>
        </section>

        <section className="lesson-section">
          <h3>11. Tercera decisión: almacenamiento</h3>
          <p>Una base puede necesitar 20 GB, 500 GB o varios TB dependiendo del caso. Pero cantidad no es la única pregunta: también importa qué tan rápido debe responder el almacenamiento.</p>
        </section>

        <section className="lesson-section">
          <h3>12. Aparece IOPS</h3>
          <Dialogo>IOPS (Input/Output Operations Per Second) representa cuántas operaciones de lectura/escritura puede realizar el almacenamiento por segundo.</Dialogo>
          <p>Analogía del cajero: una ventanilla puede atender 10 operaciones por minuto, otra 500 — ambas almacenan información, pero su capacidad de trabajo es diferente.</p>
        </section>

        <section className="lesson-section">
          <h3>13. General Purpose SSD (gp3)</h3>
          <Nota><p>Amazon RDS ofrece actualmente almacenamiento SSD de propósito general en variantes gp2 y gp3, siendo gp3 la generación recomendada actualmente por AWS.</p></Nota>
          <Dialogo>gp3 es una opción SSD equilibrada y económica para muchas cargas generales.</Dialogo>
          <p>Para laboratorio, desarrollo y curso, una opción General Purpose SSD suele ser apropiada para comenzar. Una característica importante de gp3 es que permite configurar ciertas características de rendimiento independientemente de la capacidad — tener más GB no tiene por qué ser lo mismo que necesitar más velocidad.</p>
          <p>Analogía: una biblioteca enorme con pocas personas consultando, o una biblioteca pequeña con cientos de personas buscando libros al mismo tiempo — cantidad almacenada es una cosa, velocidad requerida es otra.</p>
        </section>

        <section className="lesson-section">
          <h3>14. Provisioned IOPS</h3>
          <Nota><p>Amazon RDS también ofrece Provisioned IOPS SSD, orientado a cargas de I/O intensivo que requieren rendimiento más consistente y baja latencia (io1, io2 Block Express según motor/configuración).</p></Nota>
          <Dialogo>Reservamos una capacidad de operaciones de almacenamiento específica para cargas exigentes.</Dialogo>
          <p>Un sistema transaccional crítico con muchísimas lecturas, muchísimas escrituras y baja tolerancia a latencia podría justificar evaluar Provisioned IOPS — pero no lo elegimos automáticamente.</p>
        </section>

        <section className="lesson-section">
          <h3>15. Rendimiento cuesta</h3>
          <ConceptBadge icon="dollar-sign">Más capacidad + más rendimiento + más características = mayor costo potencial</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>16. Magnetic Storage está deprecado</h3>
          <Nota><p>Históricamente RDS ofrecía almacenamiento magnético, pero esto ha cambiado. AWS ha deprecado el almacenamiento magnético para RDS y ya no permite crear nuevas DB Instances utilizándolo. Desde el 1 de julio de 2026 tampoco se restauran snapshots hacia almacenamiento magnético. AWS dirige los nuevos usos hacia gp3 o Provisioned IOPS.</p></Nota>
          <p>No lo enseñamos como una opción vigente de creación.</p>
        </section>

        <section className="lesson-section">
          <h3>17. ¿Cuánto almacenamiento asignamos?</h3>
          <Nota><p>¿Cuánto tengo hoy? + ¿cuánto crecerá? + ¿qué retención necesito? + ¿qué backups existen? No ponemos 10 TB porque "suena seguro".</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>18. Storage Autoscaling</h3>
          <Nota><p>RDS puede aumentar automáticamente el almacenamiento cuando detecta que se necesita más espacio, hasta un límite máximo configurado.</p></Nota>
          <p>Analogía de la bodega: comienza pequeña, se llena; en vez de esperar "sin espacio", podemos autorizar ampliar hasta determinado máximo (Maximum storage threshold). No significa espacio infinito.</p>
          <Nota><p>Autoscaling tampoco elimina costos: más almacenamiento usado significa más costo potencial. Y no debemos usarlo para ignorar una aplicación defectuosa — si un error genera 1 millón de registros innecesarios por hora, Storage Autoscaling puede darnos más espacio, pero el problema sigue existiendo.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>19. ¿Qué debemos monitorear?</h3>
          <InfoBox items={['¿CPU está constantemente alta?', '¿Hay memoria suficiente?', '¿El almacenamiento se está llenando?', '¿La base responde lentamente?', '¿Tenemos demasiadas conexiones?', '¿El crecimiento es normal?']} />
          <Flow steps={[{ n: 1, label: 'Estimar' }, { n: 2, label: 'Implementar' }, { n: 3, label: 'Medir' }, { n: 4, label: 'Ajustar' }]} />
        </section>

        <section className="lesson-section">
          <h3>20. Nuestra configuración tiene tres capas</h3>
          <Flow steps={[{ icon: 'cloud', label: 'Amazon RDS' }, { icon: 'settings', label: 'Engine — MySQL' }, { icon: 'server', label: 'DB Instance Class — capacidad' }, { icon: 'hard-drive', label: 'Storage — tamaño + rendimiento' }]} />
        </section>

        <section className="lesson-section">
          <h3>21. Actividad: motor, instance o storage</h3>
          <QaItem question="MySQL" answer="Motor." />
          <QaItem question="CPU y memoria" answer="Instance." />
          <QaItem question="100 GB" answer="Storage." />
          <QaItem question="IOPS" answer="Storage." />
        </section>

        <section className="lesson-section">
          <h3>22. Actividad: pequeña, mediana o grande</h3>
          <QaItem question="Curso con 50 estudiantes, pocas consultas." answer="Capacidad pequeña puede ser suficiente." />
          <QaItem question="Sistema empresarial con 5.000 usuarios concurrentes." answer="Necesitamos evaluar más capacidad." />
          <QaItem question="Laboratorio de 45 minutos." answer="No desplegamos una instancia monstruosa." />
        </section>

        <section className="lesson-section">
          <h3>23. Actividad: ¿qué almacenamiento?</h3>
          <QaItem question="Base de laboratorio, carga normal." answer="General Purpose SSD puede ser apropiado." />
          <QaItem question="Base transaccional crítica, alta actividad de lectura/escritura." answer="Evaluar Provisioned IOPS." />
        </section>

        <section className="lesson-section">
          <h3>24. Diseñemos CloudShop</h3>
          <Nota><p>Motor MySQL, 2.000 clientes, 100 pedidos diarios, ambiente de desarrollo, carga baja/moderada.</p></Nota>
          <Reveal label="Ver decisiones">
            <ol className="plain-list">
              <li>Engine: MySQL, porque nuestra aplicación lo requiere.</li>
              <li>Clase: para un ambiente pequeño de desarrollo, comenzaríamos evaluando una clase pequeña/burstable compatible con el motor y Región. No fijamos un nombre exacto porque las generaciones disponibles cambian — comprendemos la familia y revisamos las opciones vigentes en la consola.</li>
              <li>Storage: General Purpose SSD gp3 puede ser razonable para desarrollo.</li>
              <li>Capacidad: pequeña, compatible con los mínimos del motor/configuración — no 500 GB.</li>
              <li>Autoscaling: para laboratorio puede no ser necesario activarla; para producción se evalúa según crecimiento y estrategia.</li>
            </ol>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>25. Caso ClínicaCloud</h3>
          <Nota><p>Motor PostgreSQL, muchos usuarios, consultas complejas, datos críticos.</p></Nota>
          <QaItem question="¿Qué debemos investigar?" answer="CPU, memoria, concurrencia, almacenamiento, IOPS, crecimiento, alta disponibilidad." />
          <Dialogo>No respondemos "use la instancia más grande". Una decisión profesional requiere medición + crecimiento esperado + rendimiento + presupuesto.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>26. Costos y disponibilidad</h3>
          <p>RDS Cost depende de: DB Instance, Storage, rendimiento/IOPS, backups según uso, transferencias, disponibilidad, motor/licenciamiento. Cambiar un elemento puede afectar costo: db pequeña → db grande, gp3 → Provisioned IOPS, Single-AZ → Multi-AZ. No es malo pagar más — es malo pagar más sin saber por qué.</p>
          <Nota><p>No todas las clases de DB Instance están disponibles con todos los motores, versiones o Regiones. Nuestro proceso: Necesidad → Familia → Consola AWS → Opciones disponibles. No enseñamos "siempre seleccione exactamente db.xxxxxx" porque las generaciones evolucionan — enseñamos cómo decidir.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>27. Checklist de dimensionamiento</h3>
          <InfoBox items={['¿Qué motor necesita la aplicación?', '¿Cuántos usuarios espero?', '¿Cuántas consultas?', '¿La carga es estable o tiene picos?', '¿Necesito mucha memoria?', '¿Cuánto almacenaré y cuánto crecerá?', '¿Necesito IOPS consistentes?', '¿Necesito autoscaling?', '¿Cuál es mi presupuesto?']} />
        </section>

        <section className="lesson-section">
          <h3>28. Dos extremos equivocados</h3>
          <Dialogo>"Contratemos la instancia más grande disponible. Así jamás tendremos problemas." — el gerente</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque capacidad excesiva no corrige consultas deficientes ni un mal diseño, pero sí puede aumentar sustancialmente el costo. Esto es lo que haría en su lugar: dimensionar según carga inicial, medir y escalar cuando los datos lo justifiquen. El riesgo de su enfoque es pagar permanentemente por recursos sin utilizar.</p>
          </Nota>
          <Dialogo>"Siempre usemos la más pequeña porque Cloud permite escalar después." — Pedro</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque una instancia demasiado pequeña puede producir mala experiencia o fallas bajo carga. Esto es lo que haría en su lugar: elegir un tamaño inicial razonable con margen apropiado. El riesgo es descubrir el problema cuando usuarios reales ya están siendo afectados.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>29. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>30. Retos de diagnóstico</h3>
          <QaItem question="RDS funciona lentamente. CPU: 98% constantemente. ¿Qué revisamos?" answer="¿La clase de instancia es suficiente? Pero también: ¿las consultas están optimizadas? No resolvemos automáticamente todo escalando." />
          <QaItem question="Storage 100 GB, libre 2 GB. ¿Qué revisamos?" answer="Crecimiento, espacio utilizado, autoscaling, consultas/logs, límite máximo, posibilidad de aumentar almacenamiento." />
          <QaItem question="10 usuarios, base de 2 GB, pero DB Instance enorme y Provisioned IOPS muy altos. ¿Problema?" answer="Sobredimensionamiento. El sistema probablemente funciona estupendo. La factura también está haciendo ejercicio." />
        </section>

        <section className="lesson-section">
          <h3>31. Reto de la clase: AulaCloud Database</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge icon="trophy">AulaCloud Database</ConceptBadge>
          <p>5.000 estudiantes, 200 docentes, 100 asignaturas, notas, asistencia, evaluaciones. Aplicación PostgreSQL. Carga moderada normalmente, alta durante inscripción y cierre de notas. Datos iniciales: 30 GB, crecimiento 10 GB/año.</p>
          <Reveal label="Ver las cinco decisiones">
            <ol className="plain-list">
              <li>Motor: PostgreSQL, porque es el requerido por la aplicación.</li>
              <li>Clase: equilibrada o compatible con el patrón variable de carga — ni la mínima ni la máxima disponible.</li>
              <li>Almacenamiento: General Purpose SSD gp3 es razonable para un escenario general sin requisitos extremos.</li>
              <li>Capacidad: 30 GB actuales + crecimiento, con margen razonable — no 30 GB exactos.</li>
              <li>Autoscaling: Enabled, con un máximo coherente con la política de costos y crecimiento.</li>
            </ol>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>32. Retos nivel 2 y 3</h3>
          <QaItem question="Storage gp3, espacio libre 70%, CPU 15%, memoria sobrada, muy pocos usuarios, pero DB Instance enorme. ¿Qué evaluaríamos?" answer="Right sizing. Posiblemente reducir capacidad, después de confirmar métricas y riesgos." />
          <QaItem question="Espacio libre 80%, CPU 40%, I/O saturado. ¿Aumentar almacenamiento en GB necesariamente resuelve el problema?" answer="No necesariamente. El problema puede estar relacionado con rendimiento de I/O — eso demuestra por qué capacidad no es lo mismo que rendimiento." />
        </section>

        <section className="lesson-section">
          <h3>33. Reto oral</h3>
          <Dialogo>Explícame cómo dimensionar RDS sin usar las palabras RDS, base de datos, CPU, memoria, almacenamiento, motor, instancia, IOPS, AWS ni costo.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>"Primero elijo la tecnología compatible con mi aplicación, después determino cuánta capacidad de trabajo necesito y finalmente cuánto espacio y velocidad requiere la información, ajustándolo según el uso real."</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>34. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Engine</td><td>Tecnología de la base</td></tr>
              <tr><td>DB Instance</td><td>Capacidad de cómputo</td></tr>
              <tr><td>CPU</td><td>Procesamiento</td></tr>
              <tr><td>RAM</td><td>Memoria de trabajo</td></tr>
              <tr><td>Storage</td><td>Espacio para datos</td></tr>
              <tr><td>IOPS</td><td>Operaciones de almacenamiento por segundo</td></tr>
              <tr><td>gp3</td><td>SSD de propósito general recomendado actualmente</td></tr>
              <tr><td>Provisioned IOPS</td><td>Almacenamiento para cargas exigentes</td></tr>
              <tr><td>Storage Autoscaling</td><td>Aumenta capacidad dentro de un máximo</td></tr>
              <tr><td>Right sizing</td><td>Elegir lo necesario según uso</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>35. Ticket de salida</h3>
          <Dialogo>Una empresa tiene una base pequeña con pocos usuarios, pero contrató una DB Instance enorme y Provisioned IOPS muy altos. ¿Cuál podría ser el problema?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>La infraestructura podría estar sobredimensionada. Deberíamos revisar métricas reales y aplicar right sizing para elegir capacidad y rendimiento acordes con la carga.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 4</div>
          <ConceptBadge icon="check-circle">Engine: MySQL ✅ · DB Instance: tamaño adecuado ✅ · Storage: gp3 ✅</ConceptBadge>
          <p>Ya sabemos qué tecnología, cuánta potencia, cuánto almacenamiento. Pero aparece una pregunta mucho más delicada.</p>
          <Flow steps={[{ icon: 'user', label: 'Usuario' }, { n: '?', label: '¿?' }, { icon: 'database', label: 'RDS' }]} />
          <Dialogo>"¿Quién debería poder conectarse a nuestra base? Y, sobre todo, ¿deberíamos permitir que cualquiera desde Internet intente llegar directamente a ella?"</Dialogo>
          <ConceptBadge icon="lock">Módulo 6 · Clase 4 — RDS dentro de una VPC: subnets privadas, Security Groups y acceso seguro</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-6/clase-4" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 4: RDS dentro de una VPC →
          </Link>
        </div>

      </div>
    </div>
  );
}
