import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, InfoBox, CompareCols, QaItem, Reveal, Quiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  { q: '¿Qué significa Running?', options: [{ text: 'La instancia está ejecutándose.', correct: true }, { text: 'Está eliminada.', correct: false }, { text: 'Está detenida.', correct: false }, { text: 'Es un snapshot.', correct: false }] },
  { q: '¿Qué significa Stopped?', options: [{ text: 'La instancia fue eliminada.', correct: false }, { text: 'La instancia está detenida pero sigue existiendo.', correct: true }, { text: 'Está ejecutándose.', correct: false }, { text: 'No tiene EBS.', correct: false }] },
  { q: '¿Qué significa Terminated?', options: [{ text: 'La instancia fue terminada.', correct: true }, { text: 'Está temporalmente apagada.', correct: false }, { text: 'Está iniciándose.', correct: false }, { text: 'Está monitoreando.', correct: false }] },
  { q: '¿Qué servicio relacionamos con monitoreo?', options: [{ text: 'Amazon CloudWatch.', correct: true }, { text: 'IAM.', correct: false }, { text: 'Route 53.', correct: false }, { text: 'S3.', correct: false }] },
  { q: '¿Qué indica CPUUtilization?', options: [{ text: 'Uso de CPU.', correct: true }, { text: 'Espacio EBS.', correct: false }, { text: 'Cantidad de usuarios IAM.', correct: false }, { text: 'Precio exacto de la instancia.', correct: false }] },
  { q: 'CPU baja durante mucho tiempo puede ser:', options: [{ text: 'Una señal para investigar sobredimensionamiento.', correct: true }, { text: 'Prueba absoluta de que debemos eliminar EC2.', correct: false }, { text: 'Un error IAM.', correct: false }, { text: 'Una contraseña incorrecta.', correct: false }] },
  { q: '¿Una instancia Stopped garantiza costo cero?', options: [{ text: 'Sí.', correct: false }, { text: 'No.', correct: true }] },
  { q: '¿Qué modelo puede implicar capacidad interrumpible?', options: [{ text: 'Spot.', correct: true }, { text: 'IAM.', correct: false }, { text: 'EBS.', correct: false }, { text: 'DNS.', correct: false }] },
  { q: '¿AWS Budgets puede ayudarnos a vigilar gastos?', options: [{ text: 'Sí.', correct: true }, { text: 'No.', correct: false }] },
  { q: '¿Debemos eliminar un recurso desconocido apenas lo encontramos?', options: [{ text: 'Sí.', correct: false }, { text: 'No, primero debemos investigar su función y dependencias.', correct: true }] },
];

export default function Modulo3Clase6() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 3 · Clase 6</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 3 · Clase 6: Estados, monitoreo, costos y buenas prácticas de EC2</h2>
      <p className="lesson-subtitle">
        Crear un recurso es solo el comienzo. Estados de instancia, CloudWatch, CPUUtilization, modelos de compra y la disciplina de limpieza.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + revisión de consola + actividades + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 3 · Clases 1 a 5</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Reconocer los principales estados de una instancia EC2.</li>
            <li>Diferenciar Running, Stopped y Terminated.</li>
            <li>Comprender qué significa monitorear una instancia.</li>
            <li>Reconocer Amazon CloudWatch.</li>
            <li>Interpretar de manera básica la utilización de CPU.</li>
            <li>Comprender que monitorear ayuda a tomar decisiones.</li>
            <li>Relacionar capacidad utilizada con costos.</li>
            <li>Reconocer recursos que pueden seguir generando cargos.</li>
            <li>Aplicar buenas prácticas de administración.</li>
            <li>Realizar una revisión básica antes de abandonar un laboratorio.</li>
          </ul>
          <p>La idea que debe sobrevivir será:</p>
          <Dialogo>📊 Crear un recurso es solo el comienzo. Después debemos observarlo, administrarlo y eliminarlo cuando ya no sea necesario.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>2. Recordemos nuestra arquitectura</h3>
          <Nota><p>Hasta ahora construimos:</p></Nota>
          <Flow steps={[{ icon: 'map-pin', label: 'Usuario' }, { icon: 'shield', label: 'Security Group' }, { icon: 'server', label: 'EC2' }, { icon: 'hard-drive', label: 'EBS' }]} />
          <p>Ya sabemos: 🖥️ crear una instancia; 🔐 controlar conexiones; 💾 comprender su almacenamiento. Ahora aparece una nueva pregunta:</p>
          <Dialogo>¿Cómo sabemos si nuestra instancia está funcionando correctamente y utilizando los recursos adecuados?</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>3. Administrar no significa solamente crear</h3>
          <Nota><p>Imaginemos que compramos un automóvil. No hacemos "comprar → olvidar". Tenemos que observar:</p></Nota>
          <p>⛽ combustible; 🌡️ temperatura; ⚠️ alertas; 🔧 mantenimiento; 📊 kilometraje.</p>
          <Nota><p>Con infraestructura ocurre algo parecido.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>4. Nuestra instancia cambia de estado</h3>
          <Nota><p>Una instancia EC2 puede pasar por diferentes estados durante su ciclo de vida. Para nuestro nivel nos concentraremos en:</p></Nota>
          <RoleGrid roles={[
            { icon: 'clock', label: 'Pending', desc: '' },
            { icon: 'dot-success', label: 'Running', desc: '' },
            { icon: 'dot-warning', label: 'Stopping', desc: '' },
            { icon: 'dot-danger', label: 'Stopped', desc: '' },
            { icon: 'dot-muted', label: 'Shutting-down', desc: '' },
            { icon: 'x-circle', label: 'Terminated', desc: '' },
          ]} />
          <p>No necesitamos memorizar una novela de estados. Necesitamos comprender qué representa cada uno.</p>
        </section>

        <section className="lesson-section">
          <h3>5. Pending</h3>
          <Dialogo>Pending significa: AWS está preparando la instancia para comenzar a ejecutarla.</Dialogo>
          <Flow steps={[{ icon: 'rocket', label: 'Launch' }, { icon: 'clock', label: 'Pending' }]} />
          <p>Es un estado de transición.</p>
        </section>

        <section className="lesson-section">
          <h3>6. Running</h3>
          <Flow steps={[{ icon: 'clock', label: 'Pending' }, { icon: 'dot-success', label: 'Running' }]} />
          <Dialogo>El computador virtual está encendido y funcionando.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>7. Analogía del automóvil</h3>
          <ConceptBadge>Running — 🚗💨 Motor encendido, listo para utilizarse</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>8. Running y costos</h3>
          <Nota><p>Mientras una instancia está ejecutándose pueden generarse cargos según: tipo de instancia; modelo de compra; Región; sistema operativo; tiempo de utilización; recursos asociados.</p></Nota>
          <Dialogo>Si no necesitamos una instancia ejecutándose, debemos preguntarnos por qué sigue Running.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>9. Stopping</h3>
          <Dialogo>Stopping significa: la instancia está en proceso de detenerse.</Dialogo>
          <Flow steps={[{ icon: 'dot-success', label: 'Running' }, { icon: 'dot-warning', label: 'Stopping' }]} />
          <p>Es otro estado transitorio.</p>
        </section>

        <section className="lesson-section">
          <h3>10. Stopped</h3>
          <Flow steps={[{ icon: 'dot-success', label: 'Running' }, { icon: 'dot-warning', label: 'Stopping' }, { icon: 'dot-danger', label: 'Stopped' }]} />
          <Nota><p>Importante: Stopped no significa eliminada.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>11. El automóvil sigue existiendo</h3>
          <p>🚗 Motor apagado. El automóvil sigue: 🚗 ocupando espacio; 🔑 siendo nuestro; 📦 teniendo cosas dentro.</p>
          <Flow steps={[{ icon: 'dot-danger', label: 'EC2 Stopped' }, { icon: 'hard-drive', label: 'EBS puede seguir existiendo' }]} />
        </section>

        <section className="lesson-section">
          <h3>12. Stopped no significa factura cero</h3>
          <Nota><p>Una instancia detenida puede dejar de generar determinados cargos de cómputo asociados a su ejecución, pero pueden seguir existiendo otros recursos facturables.</p></Nota>
          <p>Por ejemplo: 💾 EBS; 📸 snapshots; 🌐 determinados recursos de red; otros servicios relacionados.</p>
          <p>Por eso: Stopped ≠ $0 garantizado.</p>
        </section>

        <section className="lesson-section">
          <h3>13. Start</h3>
          <Nota><p>Una instancia detenida compatible puede volver a iniciarse.</p></Nota>
          <Flow steps={[{ icon: 'dot-danger', label: 'Stopped' }, { icon: 'play', label: 'Start' }, { icon: 'clock', label: 'Pending' }, { icon: 'dot-success', label: 'Running' }]} />
          <p>Esto es distinto de terminarla.</p>
        </section>

        <section className="lesson-section">
          <h3>14. Shutting-down</h3>
          <Nota><p>Cuando solicitamos terminar una instancia puede pasar por: Shutting-down.</p></Nota>
          <Flow steps={[{ icon: 'server', label: 'EC2' }, { icon: 'trash', label: 'Terminate' }, { icon: 'dot-muted', label: 'Shutting-down' }]} />
          <p>Está en proceso de terminarse.</p>
        </section>

        <section className="lesson-section">
          <h3>15. Terminated</h3>
          <Dialogo>Terminated significa: la instancia fue terminada.</Dialogo>
          <Flow steps={[{ icon: 'dot-muted', label: 'Shutting-down' }, { icon: 'x-circle', label: 'Terminated' }]} />
          <p>No podremos simplemente volver a encender esa misma instancia.</p>
        </section>

        <section className="lesson-section">
          <h3>16. Diferencia fundamental</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Estado</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>🟢 Running</td><td>Está ejecutándose</td></tr>
              <tr><td>🔴 Stopped</td><td>Está detenida pero existe</td></tr>
              <tr><td>❌ Terminated</td><td>Fue terminada</td></tr>
            </tbody>
          </table>
          <p>Esta tabla debe quedar tatuada metafóricamente en la memoria. 🧠</p>
        </section>

        <section className="lesson-section">
          <h3>17. Actividad rápida: ¿qué estado?</h3>
          <QaItem question="Caso 1 — El servidor está funcionando." answer="➡️ Running" />
          <QaItem question="Caso 2 — Lo apagamos, pero queremos volver a utilizarlo mañana." answer="➡️ Stopped" />
          <QaItem question="Caso 3 — Terminó el laboratorio y eliminamos la instancia." answer="➡️ Terminated" />
          <QaItem question="Caso 4 — AWS todavía la está preparando." answer="➡️ Pending" />
        </section>

        <section className="lesson-section">
          <h3>18. Ahora aparece el monitoreo</h3>
          <Nota><p>Tenemos nuestra instancia, pero no podemos mirarla físicamente. No vemos: 🔥 si está "sufriendo"; 😴 si está prácticamente sin utilizar; 🚀 si está trabajando intensamente. Necesitamos información.</p></Nota>
          <ConceptBadge>MONITOREO</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>19. ¿Qué significa monitorear?</h3>
          <Dialogo>Monitorear significa observar el comportamiento de un sistema utilizando información y métricas.</Dialogo>
          <p>Por ejemplo: 📈 cuánto utiliza CPU; 🌐 cuánto tráfico recibe; ✅ si determinados controles están funcionando; ⚠️ si algo se sale de lo esperado.</p>
        </section>

        <section className="lesson-section">
          <h3>20. Analogía del médico</h3>
          <Nota><p>Cuando vamos al médico no basta con preguntar "¿estoy vivo?" 😄 Puede revisar: ❤️ pulso; 🌡️ temperatura; 🩸 presión; otros indicadores.</p></Nota>
          <p>El sistema funciona, pero necesitamos conocer cómo está funcionando.</p>
        </section>

        <section className="lesson-section">
          <h3>21. Aparece Amazon CloudWatch</h3>
          <Dialogo>📊 CloudWatch permite recopilar y observar métricas y otros datos de monitoreo de servicios y aplicaciones.</Dialogo>
          <p>No profundizaremos todavía en logs, dashboards y alarmas avanzadas. Primero: CloudWatch nos ayuda a mirar qué está ocurriendo.</p>
        </section>

        <section className="lesson-section">
          <h3>22. EC2 + CloudWatch</h3>
          <Flow steps={[{ icon: 'server', label: 'EC2', caption: 'genera métricas' }, { icon: 'bar-chart', label: 'CloudWatch' }, { icon: 'user', label: 'Nosotros observamos' }]} />
          <p>Ahora podemos tomar decisiones usando información.</p>
        </section>

        <section className="lesson-section">
          <h3>23. Primera métrica: CPUUtilization</h3>
          <Dialogo>Indica qué porcentaje de capacidad de CPU está utilizando la instancia durante determinados períodos.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>24. CPU alta</h3>
          <Nota><p>Supongamos: CPU 95%, 95%, 98%, 96% durante períodos sostenidos.</p></Nota>
          <QaItem question="¿Qué significa?" answer="La instancia está utilizando gran parte de su capacidad de CPU. Pero no saltamos inmediatamente a '¡necesitamos una instancia gigantesca!'. Primero investigamos." />
        </section>

        <section className="lesson-section">
          <h3>25. Preguntas antes de escalar</h3>
          <Nota><p>Si observamos CPU elevada preguntamos:</p></Nota>
          <p>¿Es temporal? ¿Es normal para la aplicación? ¿Hay un proceso incorrecto? ¿La aplicación puede optimizarse? ¿Necesitamos más capacidad? ¿Necesitamos otra arquitectura?</p>
          <Nota><p>Una métrica no es una orden. Es información.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>26. CPU extremadamente baja</h3>
          <Nota><p>Ahora tenemos: CPU 1%, 2%, 1%, 3% durante largos períodos.</p></Nota>
          <QaItem question="¿Podría nuestra instancia estar sobredimensionada?" answer="Sí, podría ser una señal. Pero debemos revisar más información antes de decidir." />
        </section>

        <section className="lesson-section">
          <h3>27. El servidor gigante dormido</h3>
          <Nota><p>Tenemos 🐘 instancia enorme pero utiliza CPU: 2% durante semanas.</p></Nota>
          <p>Es como contratar 🚚 un camión de 20 toneladas para transportar 🍎 una manzana. Funciona. Pero quizás no es una decisión eficiente.</p>
        </section>

        <section className="lesson-section">
          <h3>28. Volvemos a Right Sizing</h3>
          <Nota><p>En Clase 2 aprendimos: Right Sizing — elegir recursos apropiados para la carga. Ahora CloudWatch nos ayuda a aportar evidencia para revisar esa decisión.</p></Nota>
          <Flow steps={[{ icon: 'settings', label: 'Elegimos capacidad' }, { icon: 'bar-chart', label: 'Monitoreamos' }, { icon: 'search', label: 'Analizamos' }, { icon: 'target', label: 'Ajustamos' }]} />
        </section>

        <section className="lesson-section">
          <h3>29. Monitoreo y costos se conectan</h3>
          <CompareCols cols={[
            { icon: 'server', title: 'Servidor A', items: ['💰 costoso', '📊 CPU promedio muy baja'] },
            { icon: 'server', title: 'Servidor B', items: ['💰 menor costo', '📊 capacidad suficiente'] },
          ]} />
          <Nota><p>Después de evaluar correctamente la carga, B podría ser una mejor elección.</p></Nota>
          <p>La idea es: no pagamos por capacidad solamente porque podemos.</p>
        </section>

        <section className="lesson-section">
          <h3>30. ¿CloudWatch muestra RAM automáticamente?</h3>
          <Nota><p>Las métricas estándar de EC2 no incluyen necesariamente métricas de memoria del sistema operativo de la misma forma que CPU. Para obtener determinadas métricas adicionales, como memoria, podemos necesitar instalar y configurar agentes o mecanismos adicionales.</p></Nota>
          <p>Para esta clase: no asumimos que todo aparece automáticamente en CloudWatch.</p>
        </section>

        <section className="lesson-section">
          <h3>31. Esto también es una lección importante</h3>
          <Nota><p>Un gráfico no sabe mágicamente todo.</p></Nota>
          <ConceptBadge>AWS + 🖥️ Sistema operativo + ⚙️ Aplicación</ConceptBadge>
          <p>Algunos datos vienen automáticamente. Otros necesitan: 🛠️ configuración adicional.</p>
        </section>

        <section className="lesson-section">
          <h3>32. Laboratorio: revisar métricas EC2</h3>
          <Nota><p>Volvemos a nuestra instancia.</p></Nota>
          <Flow steps={[{ icon: 'server', label: 'EC2' }, { icon: 'clipboard-list', label: 'Instances' }, { icon: 'target', label: 'Seleccionar instancia' }, { icon: 'bar-chart', label: 'Monitoring' }]} />
          <p>La posición exacta puede cambiar con la interfaz, pero buscamos: Monitoring.</p>
        </section>

        <section className="lesson-section">
          <h3>33. Buscar CPUUtilization</h3>
          <Nota><p>Observamos el gráfico de CPU utilization.</p></Nota>
          <QaItem question="¿Está utilizando mucha o poca CPU?" answer="En un laboratorio recién creado probablemente observaremos muy poco uso. Eso está bien." />
        </section>

        <section className="lesson-section">
          <h3>34. Leer un gráfico</h3>
          <Nota><p>Enseñaría solo tres elementos:</p></Nota>
          <p>Eje horizontal — ⏰ tiempo. Eje vertical — 📊 porcentaje o valor. Línea/gráfico — 📈 comportamiento de la métrica.</p>
          <p>No necesitamos una clase de estadística disfrazada.</p>
        </section>

        <section className="lesson-section">
          <h3>35. La ventana de tiempo importa</h3>
          <Nota><p>No es lo mismo observar últimos 5 minutos que últimos 7 días. Un pico muy corto puede parecer enorme de cerca. Pero quizá sea insignificante en una perspectiva más larga.</p></Nota>
          <p>Las métricas necesitan contexto.</p>
        </section>

        <section className="lesson-section">
          <h3>36. ¿Qué es una alarma?</h3>
          <Dialogo>Una alarma permite evaluar una métrica y reaccionar cuando cumple determinadas condiciones configuradas.</Dialogo>
          <Flow steps={[{ icon: 'bar-chart', label: 'CPU' }, { label: 'CPU > determinado nivel' }, { icon: 'bell', label: 'Alarma' }]} />
        </section>

        <section className="lesson-section">
          <h3>37. Analogía del despertador</h3>
          <Nota><p>No miramos el reloj toda la noche preguntando "¿ya son las 7?". Configuramos: ⏰ alarma.</p></Nota>
          <p>Con monitoreo podemos hacer algo parecido: "avísame o ejecuta una acción configurada cuando ocurra determinada condición."</p>
        </section>

        <section className="lesson-section">
          <h3>38. Una alarma no significa automáticamente un problema</h3>
          <Nota><p>Si configuramos CPU {'>'} 80% y se activa 🚨, significa: la condición configurada se cumplió. No necesariamente "el servidor está destruido."</p></Nota>
          <p>Tenemos que interpretar la situación.</p>
        </section>

        <section className="lesson-section">
          <h3>39. Ahora hablemos de costos</h3>
          <Nota><p>Amazon EC2 puede generar costos a través de diferentes componentes y usos. Para nuestro nivel debemos revisar al menos:</p></Nota>
          <p>🖥️ cómputo; 💾 EBS; 📸 snapshots; 🌐 transferencia de datos y otros recursos de red; 💳 modelo de compra; 📍 Región; 📄 software/licencias.</p>
        </section>

        <section className="lesson-section">
          <h3>40. La factura no dice simplemente "EC2"</h3>
          <Flow steps={[{ icon: 'server', label: 'EC2' }, { icon: 'hard-drive', label: 'EBS' }, { icon: 'camera', label: 'Snapshot' }, { icon: 'globe', label: 'Red' }]} />
          <p>Por eso debemos pensar en el conjunto de recursos, no solamente en la instancia.</p>
        </section>

        <section className="lesson-section">
          <h3>41. Analogía del restaurante</h3>
          <Nota><p>Pedimos 🍔 hamburguesa. Pero la cuenta también incluye: 🥤 bebida; 🍟 papas; 🍰 postre.</p></Nota>
          <Dialogo>"La hamburguesa costaba $8. ¿Por qué pagué $20?" 😄</Dialogo>
          <p>Porque había más componentes. En AWS ocurre algo parecido.</p>
        </section>

        <section className="lesson-section">
          <h3>42. Modelo On-Demand</h3>
          <Dialogo>Permite utilizar capacidad sin un compromiso de uso de largo plazo, pagando según las condiciones del servicio.</Dialogo>
          <p>Puede ser útil para: 🧪 pruebas; 📈 cargas variables; 🚀 necesidades nuevas; pero no siempre será la opción más económica para cargas estables y previsibles.</p>
        </section>

        <section className="lesson-section">
          <h3>43. Savings Plans</h3>
          <Nota><p>AWS ofrece mecanismos como Savings Plans, donde asumimos un compromiso de uso determinado para obtener descuentos en escenarios aplicables.</p></Nota>
          <p>Mayor compromiso puede permitir mejores precios, pero reduce flexibilidad contractual/económica. No necesitamos calcularlos todavía.</p>
        </section>

        <section className="lesson-section">
          <h3>44. Spot</h3>
          <Dialogo>Permiten utilizar capacidad disponible a precios reducidos, pero esa capacidad puede ser interrumpida por AWS.</Dialogo>
          <p>Por lo tanto no son apropiadas automáticamente para todas las cargas.</p>
        </section>

        <section className="lesson-section">
          <h3>45. Analogía de Spot</h3>
          <Nota><p>Imaginemos: 🎟️ asiento disponible de último minuto. Es mucho más barato. Pero la condición es: puede no estar disponible cuando quieras mantenerlo.</p></Nota>
          <p>Si nuestra aplicación no tolera interrupciones, debemos pensar cuidadosamente antes de utilizar ese modelo.</p>
        </section>

        <section className="lesson-section">
          <h3>46. Tres modelos, tres ideas</h3>
          <RoleGrid roles={[
            { icon: 'dot-success', label: 'On-Demand', desc: 'Flexibilidad' },
            { icon: 'dot-success', label: 'Savings Plans', desc: 'Compromiso de uso' },
            { icon: 'dot-warning', label: 'Spot', desc: 'Ahorro + posible interrupción' },
          ]} />
          <p>No aprenderemos todavía todos los detalles de precios. Solo la lógica.</p>
        </section>

        <section className="lesson-section">
          <h3>47. "Free Tier" no es magia</h3>
          <Nota><p>Si la cuenta tiene créditos u ofertas gratuitas, estas tienen condiciones. No enseñamos: "crea todo lo que quieras porque es Free Tier."</p></Nota>
          <p>Eso sería una receta para una factura sorpresa con aroma a tragedia. 💸</p>
        </section>

        <section className="lesson-section">
          <h3>48. ¿Dónde revisamos costos?</h3>
          <Nota><p>AWS proporciona herramientas de facturación y gestión de costos. Para nuestro nivel podemos mencionar: Billing and Cost Management y herramientas como AWS Budgets.</p></Nota>
          <p>El objetivo será: tener visibilidad del consumo y establecer controles.</p>
        </section>

        <section className="lesson-section">
          <h3>49. AWS Budgets</h3>
          <Dialogo>AWS Budgets permite definir presupuestos y alertas relacionadas con costos o uso según la configuración.</Dialogo>
          <Flow steps={[{ icon: 'dollar-sign', label: 'Presupuesto' }, { icon: 'bar-chart', label: 'Consumo' }, { icon: 'bell', label: 'Alerta' }]} />
        </section>

        <section className="lesson-section">
          <h3>50. Analogía bancaria</h3>
          <Nota><p>Podemos decir: "si mis gastos del mes superan cierto nivel, quiero enterarme." No necesitamos revisar obsesivamente la cuenta cada cinco minutos. Utilizamos alertas.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>51. Una alerta no detiene automáticamente todo</h3>
          <Nota><p>No enseñamos: "puse un budget, entonces AWS jamás gastará más." No necesariamente.</p></Nota>
          <p>Una alerta de presupuesto puede avisarnos, pero no significa por sí sola que todos los servicios se detengan cuando se alcanza un monto. La acción depende de la configuración y del mecanismo utilizado.</p>
        </section>

        <section className="lesson-section">
          <h3>52. La disciplina de limpieza</h3>
          <Nota><p>Después de cada laboratorio debemos revisar:</p></Nota>
          <InfoBox items={['🖥️ EC2', '💾 EBS', '📸 Snapshots', '🌐 Recursos de red', '🔐 Security Groups', '🔑 Key Pairs que ya no necesitamos', '💰 Costos']} />
          <Nota><p>Algunos recursos no generan cargos por sí mismos, pero igual deben administrarse para evitar desorden.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>53. Recurso olvidado = deuda técnica y posiblemente económica</h3>
          <Nota><p>Supongamos que cada clase dejamos: Semana 1 → 💾 volumen, Semana 2 → 📸 snapshot, Semana 3 → 🖥️ instancia, Semana 4 → 💾 volumen. Después de meses, nadie sabe qué sirve, quién lo creó, qué podemos borrar.</p></Nota>
          <p>Eso es mala administración.</p>
        </section>

        <section className="lesson-section">
          <h3>54. Aquí los tags empiezan a tener sentido</h3>
          <Nota><p>Podemos utilizar etiquetas para ayudar a organizar recursos. Por ejemplo:</p></Nota>
          <ConceptBadge>Curso = AWSDesdeCero · Clase = EC2 · Ambiente = Laboratorio · Owner = GrupoA</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>55. Etiquetar no sustituye limpiar</h3>
          <Nota><p>Tener Ambiente = laboratorio no apaga ni elimina el recurso. Simplemente ayuda a organizarlo.</p></Nota>
          <p>Todavía necesitamos: administrar su ciclo de vida.</p>
        </section>

        <section className="lesson-section">
          <h3>56. Checklist diario de EC2</h3>
          <InfoBox title="Antes" items={['¿Necesito crear este recurso?', '¿Qué tamaño necesito?', '¿Cuánto podría costar?']} />
          <InfoBox title="Durante" items={['¿Está funcionando?', '¿Qué métricas observo?', '¿Está sobredimensionado?']} />
          <InfoBox title="Después" items={['¿Debo conservarlo?', '¿Debo detenerlo?', '¿Debo terminarlo?', '¿Qué recursos asociados quedan?']} />
        </section>

        <section className="lesson-section">
          <h3>57. Actividad: Running, Stopped o Terminated</h3>
          <QaItem question="Caso A — Necesitamos el servidor nuevamente mañana y queremos conservar su configuración." answer="➡️ Podríamos evaluar Stopped, según el caso." />
          <QaItem question="Caso B — Terminó el laboratorio y no necesitaremos la instancia nuevamente." answer="➡️ Terminate, después de revisar lo que debe conservarse." />
          <QaItem question="Caso C — La aplicación debe seguir atendiendo usuarios." answer="➡️ Running." />
        </section>

        <section className="lesson-section">
          <h3>58. Actividad: ¿qué investigarías?</h3>
          <QaItem question="CPU = 98% durante 3 horas. ¿Qué hacemos?" answer="❌ Comprar inmediatamente la instancia más grande. ✅ Investigar la causa y evaluar capacidad." />
          <QaItem question="CPU = 1% durante 30 días. ¿Qué podríamos investigar?" answer="✅ Si la instancia está sobredimensionada." />
          <QaItem question={'EC2 = Stopped, EBS = 500 GiB, Snapshots = 20. ¿Podemos decir "no estamos gastando porque EC2 está apagada"?'} answer="❌ No." />
        </section>

        <section className="lesson-section">
          <h3>59. Caso: el servidor fantasma</h3>
          <Nota><p>El administrador encuentra:</p></Nota>
          <InfoBox items={['Name: test-final-final2', 'State: Running', 'CPU promedio: 0-1%', 'Owner: desconocido', 'Creado: hace meses']} />
          <QaItem question="¿Lo eliminamos inmediatamente?" answer="❌ Tampoco." />
          <Nota>
            <p>No estoy de acuerdo porque primero debemos determinar si alguien depende del recurso y qué información contiene. Esto es lo que haría en su lugar: identificar propietario, función y dependencias antes de detener o eliminar. El riesgo de borrarlo por impulso es interrumpir un servicio legítimo.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>60. Optimizar no significa borrar todo</h3>
          <Nota><p>Buena administración significa:</p></Nota>
          <Flow steps={[{ icon: 'search', label: 'Identificar' }, { icon: 'bar-chart', label: 'Analizar' }, { icon: 'lightbulb', label: 'Decidir' }, { icon: 'settings', label: 'Actuar' }, { icon: 'check-circle', label: 'Verificar' }]} />
          <p>No: 💰 Caro → 🗑️ BORRAR TODO. 😄</p>
        </section>

        <section className="lesson-section">
          <h3>61. Laboratorio: revisar nuestra instancia</h3>
          <Nota><p>Cada estudiante selecciona la instancia del curso y completa:</p></Nota>
          <InfoBox items={['🏷️ Nombre: ____________________', '🟢 Estado: ____________________', '⚙️ Tipo: ____________________', '📊 CPU: ____________________', '💾 EBS: ____________________', '📸 Snapshots: ____________________', '🌎 Región: ____________________', '🏢 Zona de disponibilidad: ____________________']} />
        </section>

        <section className="lesson-section">
          <h3>62. Interpretación</h3>
          <Nota><p>Ahora deben responder:</p></Nota>
          <p>¿La instancia está Running? ¿La necesitamos en este momento? ¿Qué uso de CPU tiene? ¿El tipo parece enorme para el laboratorio? ¿Existe almacenamiento asociado? ¿Tenemos snapshots?</p>
          <p>No estamos buscando respuestas perfectas. Estamos desarrollando: mentalidad operativa.</p>
        </section>

        <section className="lesson-section">
          <h3>63. Reto de la clase</h3>
          <Nota><p>Presentamos:</p></Nota>
          <ConceptBadge>CloudShop</ConceptBadge>
          <InfoBox items={['🖥️ EC2 — Tipo: muy grande, State: Running', '📊 CPU: 2% promedio', '💾 EBS: 500 GiB', '📸 Snapshots: 15', '👥 Usuarios: pocos']} />
          <Dialogo>"Todo funciona, no toquemos nada." — el gerente</Dialogo>
          <p>Los estudiantes deben indicar qué investigarían.</p>
        </section>

        <section className="lesson-section">
          <h3>64. Respuesta esperada</h3>
          <Reveal label="Ver respuesta esperada">
            <ul className="plain-list">
              <li>revisar si EC2 está sobredimensionada;</li>
              <li>analizar métricas;</li>
              <li>revisar requerimientos reales;</li>
              <li>verificar si 500 GiB son necesarios;</li>
              <li>revisar snapshots antiguos;</li>
              <li>comprobar costos;</li>
              <li>no modificar nada sin conocer dependencias;</li>
              <li>evaluar right sizing.</li>
            </ul>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>65. Reto nivel 2</h3>
          <CompareCols cols={[
            { icon: 'server', title: 'Servidor A', items: ['Running', 'CPU: 70%', 'Usuarios activos'] },
            { icon: 'server', title: 'Servidor B', items: ['Running', 'CPU: 0%', 'Sin propietario conocido'] },
          ]} />
          <QaItem question="¿Cuál eliminamos?" answer="No tenemos información suficiente para eliminar ninguno inmediatamente. Servidor B requiere investigación prioritaria porque parece potencialmente ocioso." />
          <Nota><p>Esta respuesta es mejor que "el que usa 0%", porque administrar infraestructura requiere contexto.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>66. El jefe quiere ahorrar 50%</h3>
          <Dialogo>"Bajen todas las instancias a la mitad."</Dialogo>
          <Nota>
            <p>No estoy de acuerdo porque las cargas no tienen los mismos requisitos. Esto es lo que haría en su lugar: utilizar métricas y requisitos para evaluar cada recurso. El riesgo de su enfoque es ahorrar dinero a costa de degradar o interrumpir servicios críticos.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>67. El equilibrio</h3>
          <ConceptBadge>Rendimiento — 🎯 EQUILIBRIO — 💰 Costo</ConceptBadge>
          <p>No buscamos "lo más barato". Ni "lo más potente". Buscamos: lo apropiado.</p>
        </section>

        <section className="lesson-section">
          <h3>68. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>69. Reto final de la clase</h3>
          <Nota><p>Presentamos este escenario:</p></Nota>
          <ConceptBadge>Plataforma EduCloud</ConceptBadge>
          <InfoBox items={['🖥️ EC2 A — Running, CPU: 75%', '🖥️ EC2 B — Running, CPU: 1%', '💾 EBS A — 20 GiB', '💾 EBS B — 300 GiB', '📸 Snapshots — 10', '💰 Costos aumentando']} />
          <p>Los estudiantes deben crear un plan en cinco pasos.</p>
        </section>

        <section className="lesson-section">
          <h3>70. Posible respuesta</h3>
          <Reveal label="Ver plan en 5 pasos">
            <ol className="plain-list">
              <li>📊 Revisar métricas y período analizado.</li>
              <li>🔎 Identificar para qué sirve cada instancia.</li>
              <li>🎯 Evaluar right sizing.</li>
              <li>💾 Revisar volúmenes y snapshots.</li>
              <li>💰 Comprobar costos y eliminar recursos realmente innecesarios de forma controlada.</li>
            </ol>
          </Reveal>
          <p style={{ marginTop: 'var(--space-4)' }}>Esa es exactamente la mentalidad que buscamos.</p>
        </section>

        <section className="lesson-section">
          <h3>71. Reto oral</h3>
          <Dialogo>Explícame monitoreo sin utilizar las palabras CloudWatch, métrica, CPU, gráfico, observar ni servidor. 😈</Dialogo>
          <Reveal label="Ver una buena respuesta">
            <Dialogo>"Es revisar información sobre cómo se está comportando nuestro sistema para tomar mejores decisiones."</Dialogo>
          </Reveal>
          <p style={{ marginTop: 'var(--space-4)' }}>Si pueden llegar a esa idea, comprendieron el propósito.</p>
        </section>

        <section className="lesson-section">
          <h3>72. Nuestro mapa del módulo</h3>
          <RoleGrid roles={[
            { icon: 'shield', label: 'SG', desc: 'Acceso' },
            { icon: 'hard-drive', label: 'EBS', desc: 'Datos' },
            { icon: 'bar-chart', label: 'CloudWatch', desc: 'Comportamiento' },
          ]} />
          <p>Ahora ya podemos: 🚀 crear; 🔐 proteger; 💾 almacenar; 📊 observar; 💰 administrar.</p>
        </section>

        <section className="lesson-section">
          <h3>73. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>⏳ Pending</td><td>Iniciándose</td></tr>
              <tr><td>🟢 Running</td><td>Ejecutándose</td></tr>
              <tr><td>🔴 Stopped</td><td>Detenida, pero existe</td></tr>
              <tr><td>❌ Terminated</td><td>Terminada</td></tr>
              <tr><td>📊 CloudWatch</td><td>Monitoreo</td></tr>
              <tr><td>CPUUtilization</td><td>Uso de CPU</td></tr>
              <tr><td>🎯 Right sizing</td><td>Capacidad adecuada</td></tr>
              <tr><td>💰 Costos</td><td>Revisar infraestructura completa</td></tr>
              <tr><td>🚨 Budgets</td><td>Ayuda a controlar/alertar sobre gasto</td></tr>
              <tr><td>🧹 Limpieza</td><td>Eliminar lo que realmente ya no necesitamos</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>74. Ticket de salida</h3>
          <Dialogo>Una instancia está Stopped. ¿Qué tres cosas revisarías antes de afirmar que ya no genera costos?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Volúmenes EBS, snapshots y otros recursos asociados que puedan seguir existiendo y generar cargos.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 7</div>
          <Nota><p>Cerraría mostrando:</p></Nota>
          <Flow steps={[
            { icon: 'disc', label: 'AMI' },
            { icon: 'settings', label: 'Instance Type' },
            { icon: 'lock', label: 'Security Group' },
            { icon: 'hard-drive', label: 'EBS' },
            { icon: 'bar-chart', label: 'CloudWatch' },
            { n: '?', label: '¿?' },
          ]} />
          <Dialogo>"Tenemos todas las piezas. ¿Podemos construir ahora un servidor real que entregue una página web a un navegador?"</Dialogo>
          <p>La respuesta debería ser: 🚀 Sí. La última clase del módulo será donde todo se conecta.</p>
          <ConceptBadge>Módulo 3 · Clase 7 — Laboratorio integrador: publica tu primera página web con Amazon EC2</ConceptBadge>
          <Nota>
            <p>Esa clase debe ser prácticamente un proyecto guiado completo: crear EC2, revisar AMI y tamaño, configurar acceso, Security Group, conectarse a Linux, instalar un servidor web, modificar el HTML, acceder desde navegador, revisar CloudWatch y finalmente limpiar los recursos.</p>
          </Nota>
          <Link to="/aprendizaje/aws-desde-cero/modulo-3/clase-7" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 7: Laboratorio integrador — publica tu primera página web con Amazon EC2 →
          </Link>
        </div>

      </div>
    </div>
  );
}
