import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué significa realmente "serverless"?', options: [{ text: 'Que el servidor deja de ser nuestro problema, no que haya dejado de existir.', correct: true }, { text: 'Que el código corre sin ningún hardware detrás.', correct: false }, { text: 'Que ya no se necesita ningún proveedor de nube.', correct: false }, { text: 'Que es gratis siempre.', correct: false }] },
  { q: '¿Qué es AWS Lambda?', options: [{ text: 'Un servicio de cómputo que ejecuta código en respuesta a eventos, sin administrar servidores.', correct: true }, { text: 'Un tipo de base de datos.', correct: false }, { text: 'Un balanceador de carga.', correct: false }, { text: 'Un servicio de almacenamiento de objetos.', correct: false }] },
  { q: '¿Cómo se cobra principalmente el uso de Lambda?', options: [{ text: 'Por invocaciones y por el tiempo que dura cada ejecución.', correct: true }, { text: 'Por hora, esté ejecutándose o no, igual que EC2.', correct: false }, { text: 'Por cantidad de líneas de código.', correct: false }, { text: 'Un monto fijo mensual sin importar el uso.', correct: false }] },
  { q: '¿Qué dispara la ejecución de una función Lambda?', options: [{ text: 'Un evento — una solicitud HTTP, un archivo nuevo, un mensaje, un horario, entre otros.', correct: true }, { text: 'Nada, corre todo el tiempo como un servidor tradicional.', correct: false }, { text: 'Solo puede dispararla otra instancia EC2.', correct: false }, { text: 'Solo un clic manual en la consola.', correct: false }] },
  { q: '¿Con EC2, quién decide cuántos servidores mantener encendidos?', options: [{ text: 'Nosotros (directamente o mediante Auto Scaling, Módulo 7).', correct: true }, { text: 'AWS lo decide sin que podamos influir.', correct: false }] },
  { q: '¿Lambda es la mejor opción para cualquier tipo de carga de trabajo?', options: [{ text: 'Sí, siempre.', correct: false }, { text: 'No — funciona mejor para tareas cortas y basadas en eventos que para procesos largos o con estado persistente.', correct: true }] },
  { q: '¿Quién administra el sistema operativo y el parcheo del servidor donde corre una función Lambda?', options: [{ text: 'AWS.', correct: true }, { text: 'El equipo de desarrollo, igual que con EC2.', correct: false }, { text: 'Nadie, no existe ningún sistema operativo detrás.', correct: false }] },
];

export default function Modulo10Clase1() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 10 · Clase 1</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 10 · Clase 1: ¿Qué es Serverless? Introducción a AWS Lambda — de administrar servidores a solo traer código</h2>
      <p className="lesson-subtitle">
        No es que el servidor haya desaparecido. Es que, por primera vez en el curso, dejó de ser nuestro problema.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + comparación con EC2 + casos + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulos 0, 3 y 7</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué significa &quot;serverless&quot; sin caer en la idea de que no hay ningún servidor.</li>
            <li>Comparar el modelo de EC2 (Módulos 3 y 7) con el modelo de AWS Lambda.</li>
            <li>Explicar el modelo de ejecución por eventos.</li>
            <li>Reconocer tipos comunes de eventos que pueden disparar una función Lambda.</li>
            <li>Explicar cómo se cobra Lambda y por qué eso cambia cómo diseñamos soluciones.</li>
            <li>Reconocer para qué tipo de tareas Lambda es una buena opción, y para cuáles no tanto.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-3. Recordemos el problema del Overview</h3>
          <p>CloudShop necesita algo pequeño: cuando un cliente termina de escribir una reseña de producto, notificar al equipo de calidad. Ocurre unas cincuenta veces al día, y cada notificación toma un instante.</p>
          <QaItem question="¿Qué implicaría resolver esto con una EC2 dedicada, como aprendimos en los Módulos 3 y 7?" answer="Mantener un servidor encendido, parcheado, monitoreado y potencialmente con Auto Scaling las 24 horas, para un trabajo que ocurre en ráfagas breves durante el día." />
          <ConceptBadge icon="alert-triangle">Pagar por un servidor completo, 24/7, para usarlo unos segundos al día.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>4-6. Aparece el modelo serverless</h3>
          <p>En vez de mantener un servidor esperando, subimos únicamente el código, y ese código se ejecuta solo cuando algo lo necesita. Cuando nadie lo dispara, no hay nada corriendo — y no se paga nada.</p>
          <Dialogo>Es la diferencia entre pagar el alquiler de un local los 365 días del año para atender dos horas diarias, y pagar solamente esas dos horas de uso real. El trabajo se realiza igual; cambia quién asume el costo del tiempo ocioso.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>7-8. &quot;Serverless&quot; no significa &quot;sin servidor&quot;</h3>
          <QaItem question="Si Lambda ejecuta código, ¿en qué corre físicamente ese código?" answer="En un servidor, igual que cualquier otro cómputo — solo que ese servidor lo aprovisiona, parchea, escala y administra AWS, sin que nosotros tengamos que verlo." />
          <ConceptBadge icon="server">Serverless significa: el servidor deja de ser nuestro problema, no que haya dejado de existir.</ConceptBadge>
          <Nota><p>Recordemos el Shared Responsibility Model del Módulo 9: con EC2, nosotros somos responsables del sistema operativo hacia arriba. Con Lambda, AWS se hace cargo de una capa mucho mayor — nosotros solo traemos el código y su configuración.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>9-11. AWS Lambda, presentado</h3>
          <p><strong>AWS Lambda</strong> es el servicio de cómputo de AWS que ejecuta código en respuesta a eventos, sin que sea necesario aprovisionar ni administrar servidores. Subimos una función; Lambda la ejecuta cuando algo la dispara, con la capacidad necesaria, y se detiene cuando termina.</p>
          <Flow steps={[{ label: 'Evento' }, { icon: 'zap', label: 'AWS Lambda ejecuta el código' }, { label: 'Resultado' }, { label: 'Se detiene' }]} />
        </section>

        <section className="lesson-section">
          <h3>12-14. EC2 vs. Lambda: dos preguntas distintas</h3>
          <RoleGrid roles={[
            { icon: 'server', label: 'EC2 (Módulos 3 y 7)', desc: '¿Cuántos servidores mantengo encendidos, y cómo los escalo?' },
            { icon: 'zap', label: 'Lambda', desc: '¿Qué evento dispara mi código, y cuánto tarda en ejecutarse?' },
          ]} />
          <p>No son opuestos que compiten en todo — son dos modelos distintos para necesidades distintas. CloudShop sigue teniendo EC2 para su aplicación web principal (Módulo 7); Lambda entra para piezas puntuales como esta notificación.</p>
        </section>

        <section className="lesson-section">
          <h3>15-17. El modelo de ejecución por eventos</h3>
          <p>Una función Lambda no corre &quot;todo el tiempo esperando peticiones&quot; como una EC2 con su aplicación siempre encendida (Módulo 3). Corre únicamente cuando un <strong>evento</strong> la invoca.</p>
          <RoleGrid roles={[
            { icon: 'globe', label: 'Solicitud HTTP', desc: 'Vía Amazon API Gateway (lo veremos en la Clase 3)' },
            { icon: 'package', label: 'Archivo nuevo en S3', desc: 'Por ejemplo, procesar una imagen recién subida' },
            { icon: 'bell', label: 'Mensaje en una cola', desc: 'Un sistema de mensajería dispara la función' },
            { icon: 'clock', label: 'Horario programado', desc: 'Ejecutar una tarea cada noche, por ejemplo' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>18-20. Cómo se cobra, y por qué eso importa</h3>
          <p>EC2 se cobra principalmente por el tiempo que la instancia permanece encendida (Módulo 3), esté recibiendo tráfico o no. Lambda se cobra por <strong>invocaciones</strong> y por el <strong>tiempo que dura cada ejecución</strong> — nada más.</p>
          <ConceptBadge icon="zap">Pagas por lo que se ejecuta, no por lo que está encendido esperando.</ConceptBadge>
          <QaItem question="La función de notificación de reseñas se ejecuta 50 veces al día, cada vez durante 200 milisegundos. ¿Cómo se compara ese costo con una EC2 encendida 24 horas?" answer="Drásticamente menor — se paga por unos pocos segundos totales de cómputo al día, no por 24 horas de un servidor completo." />
        </section>

        <section className="lesson-section">
          <h3>21-23. Lambda no es la respuesta a todo</h3>
          <p>Antes de entusiasmarnos demasiado, seamos honestos sobre los límites:</p>
          <ul className="plain-list">
            <li>Cada ejecución tiene un tiempo máximo — no sirve para procesos que corren horas sin parar.</li>
            <li>No mantiene estado propio entre ejecuciones — no es el lugar para &quot;recordar&quot; algo entre una invocación y la siguiente sin ayuda de otro servicio.</li>
            <li>Para una aplicación web completa con tráfico constante y sostenido, EC2 con Auto Scaling (Módulo 7) puede seguir siendo más apropiado.</li>
          </ul>
          <Nota><p>La pregunta correcta no es &quot;¿Lambda o EC2, cuál es mejor?&quot;, sino &quot;¿qué modelo encaja con esta tarea específica?&quot; — la misma disciplina que ya aplicamos al elegir entre RDS y DynamoDB, tema que retomaremos en la Clase 6.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>24-25. Volvamos a CloudShop</h3>
          <QaItem question="¿La notificación de reseñas es una buena candidata para Lambda?" answer="Sí — es una tarea breve, disparada por un evento puntual (una reseña nueva), sin necesidad de mantener estado ni de correr continuamente." />
          <QaItem question="¿La aplicación web principal de CloudShop, con tráfico constante todo el día, debería migrar completa a Lambda?" answer="No necesariamente — para tráfico sostenido y continuo, la arquitectura EC2 + ALB + Auto Scaling del Módulo 7 sigue siendo un diseño razonable. Ambos modelos pueden convivir en la misma cuenta." />
        </section>

        <section className="lesson-section">
          <h3>26-27. RETO DE LA CLASE</h3>
          <Nota><p>CloudShop tiene tres necesidades nuevas: (1) redimensionar automáticamente cada imagen de producto apenas se sube a S3; (2) servir la tienda en línea con tráfico constante las 24 horas; (3) generar un reporte de ventas una vez cada noche a las 2 a.m. ¿Cuál de las tres encaja mejor con Lambda, y cuál con EC2?</p></Nota>
          <Reveal label="Ver la respuesta esperada">
            <p>Redimensionar imágenes (1) y generar el reporte nocturno (3) encajan bien con Lambda: son tareas puntuales, disparadas por un evento (archivo nuevo en S3) o por un horario, de corta duración. Servir la tienda con tráfico constante (2) encaja mejor con el modelo EC2 + ALB + Auto Scaling ya construido — es carga sostenida, no eventos esporádicos.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>28-29. Retos nivel 2 y 3</h3>
          <QaItem question="Alguien dice: 'con Lambda ya no necesitamos preocuparnos por seguridad, porque no hay servidor.' ¿Estás de acuerdo?" answer="No — sigue habiendo código, permisos y datos que proteger. El Módulo 9 completo sigue aplicando: cada función necesitará su propio rol IAM con mínimo privilegio, tema de la Clase 4." />
          <QaItem question="Una función Lambda necesita ejecutar un proceso de análisis que tarda 40 minutos ininterrumpidos. ¿Es Lambda la elección natural?" answer="Probablemente no, dado el límite de tiempo por ejecución — valdría más considerar otra alternativa de cómputo, como EC2 o un servicio orientado a procesos largos." />
        </section>

        <section className="lesson-section">
          <h3>30-31. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El gerente propone: &quot;migremos toda nuestra aplicación de CloudShop a Lambda, así dejamos de pagar por EC2 para siempre.&quot; No estoy de acuerdo porque el tráfico constante y sostenido de la tienda en línea no encaja con el modelo de ejecución por eventos de corta duración — probablemente terminaría siendo más complejo y no necesariamente más barato. Esto es lo que haría en su lugar: usar Lambda para las piezas puntuales y basadas en eventos, manteniendo EC2 para la carga principal sostenida. El riesgo de su enfoque es forzar una herramienta a un problema para el que no fue pensada.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: &quot;como Lambda no tiene servidor, no hace falta pensar en permisos ni en seguridad.&quot; No estoy de acuerdo porque cada función sigue necesitando acceso controlado a otros recursos de AWS, y sigue ejecutando código que puede tener errores o vulnerabilidades. Esto es lo que haría en su lugar: aplicar exactamente el mismo criterio de mínimo privilegio del Módulo 9 a cada función Lambda. El riesgo de su enfoque es asumir que &quot;sin servidor visible&quot; equivale a &quot;sin superficie de riesgo&quot;.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>32. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'Serverless significa que no existe ningún servidor detrás del código.', correct: false },
            { text: 'AWS Lambda ejecuta código en respuesta a eventos.', correct: true },
            { text: 'Lambda se cobra principalmente por invocaciones y duración de ejecución.', correct: true },
            { text: 'Una función Lambda puede dispararse por un archivo nuevo en S3.', correct: true },
            { text: 'Lambda es siempre la mejor opción, sin importar el tipo de carga de trabajo.', correct: false },
            { text: 'AWS administra el sistema operativo y el parcheo del servidor donde corre Lambda.', correct: true },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>33. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>34. Reto oral</h3>
          <Dialogo>Explícame qué es serverless sin usar las palabras servidor, Lambda, AWS, nube ni evento.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>&quot;Es escribir solamente el trabajo que quieres que se haga, y dejar que alguien más se encargue de tener todo listo para hacerlo, exactamente cuando haga falta y ni un momento antes.&quot;</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>35. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Serverless</td><td>El servidor deja de ser nuestro problema</td></tr>
              <tr><td>AWS Lambda</td><td>Ejecuta código en respuesta a eventos</td></tr>
              <tr><td>Evento</td><td>Lo que dispara la ejecución de una función</td></tr>
              <tr><td>Cobro por invocación</td><td>Pagas por lo que se ejecuta, no por lo que espera encendido</td></tr>
              <tr><td>EC2 vs. Lambda</td><td>Servidores propios vs. código disparado por eventos</td></tr>
              <tr><td>Límite de Lambda</td><td>No apto para procesos muy largos o con estado persistente</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>36. Ticket de salida</h3>
          <Dialogo>Un compañero te dice: &quot;serverless significa que ya no hay ningún servidor, así que ya no tenemos que preocuparnos de nada relacionado con infraestructura.&quot; ¿Qué le responderías?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Que sigue existiendo un servidor detrás — solo que AWS lo administra en nuestro lugar. Nosotros seguimos siendo responsables del código, de la configuración, de los permisos de cada función y de diseñar correctamente qué eventos la disparan.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Próximamente</div>
          <p>Ya entendemos el modelo. Ahora toca escribir código de verdad: crear nuestra primera función Lambda y entender las tres piezas que aparecen en cualquier función, sin importar el lenguaje que usemos.</p>
          <ConceptBadge icon="zap">Módulo 10 · Clase 2 — Nuestra primera función Lambda: runtime, handler, event y context</ConceptBadge>
          <span className="tag tag-outline">Módulo 10 · Clase 2 · próximamente</span>
        </div>

      </div>
    </div>
  );
}
