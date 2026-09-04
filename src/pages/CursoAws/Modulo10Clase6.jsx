import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const ITEM_SIMPLE = `{
  "reviewId": "r-48213",
  "productId": "p-7791",
  "rating": 2,
  "comment": "Empaque dañado"
}`;

const ITEMS_SORT_KEY = `// Partition Key: productId   Sort Key: reviewId
{ "productId": "p-7791", "reviewId": "r-48213", "rating": 2 }
{ "productId": "p-7791", "reviewId": "r-50110", "rating": 5 }
{ "productId": "p-7791", "reviewId": "r-51987", "rating": 4 }`;

const QUIZ_QUESTIONS = [
  { q: '¿Qué es la Partition Key en DynamoDB?', options: [{ text: 'El atributo (o combinación de atributos) que determina cómo se distribuyen y ubican los items.', correct: true }, { text: 'El nombre de la tabla.', correct: false }, { text: 'Un índice secundario opcional.', correct: false }, { text: 'El runtime de la función que la consulta.', correct: false }] },
  { q: '¿Para qué sirve agregar una Sort Key a una Partition Key?', options: [{ text: 'Para permitir varios items relacionados bajo la misma Partition Key, ordenados y consultables por ese segundo valor.', correct: true }, { text: 'Para cifrar la tabla.', correct: false }, { text: 'Para definir el runtime.', correct: false }, { text: 'Para eliminar la necesidad de un rol IAM.', correct: false }] },
  { q: 'Con Partition Key = productId y Sort Key = reviewId, ¿qué consulta es natural y eficiente?', options: [{ text: 'Obtener todas las reseñas de un producto específico.', correct: true }, { text: 'Obtener todas las reseñas de todos los productos sin ningún criterio.', correct: false }, { text: 'Calcular el promedio de calificación de toda la tienda con un solo JOIN.', correct: false }, { text: 'Ninguna, DynamoDB no permite consultar por Partition Key.', correct: false }] },
  { q: '¿Por qué elegir bien la Partition Key importa para el rendimiento?', options: [{ text: 'Porque una mala elección puede concentrar demasiadas solicitudes en una sola partición (hot partition).', correct: true }, { text: 'No importa, DynamoDB distribuye igual sin importar la clave elegida.', correct: false }, { text: 'Solo afecta el costo, nunca el rendimiento.', correct: false }, { text: 'Solo importa si se usa RDS, no DynamoDB.', correct: false }] },
  { q: '¿Por qué DynamoDB combina especialmente bien con AWS Lambda?', options: [{ text: 'Ambos son servicios administrados, sin servidores que dimensionar, con modelo de pago por uso.', correct: true }, { text: 'Porque DynamoDB solo puede ser consultada desde Lambda.', correct: false }, { text: 'Porque Lambda administra automáticamente las tablas de DynamoDB.', correct: false }, { text: 'No tienen ninguna relación particular.', correct: false }] },
  { q: '¿DynamoDB reemplaza siempre a RDS/Aurora en cualquier escenario?', options: [{ text: 'Sí, siempre es mejor.', correct: false }, { text: 'No — depende del patrón de acceso y de si los datos requieren relaciones complejas.', correct: true }] },
];

export default function Modulo10Clase6() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 10 · Clase 6</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 10 · Clase 6: Amazon DynamoDB — la base de datos NoSQL administrada y serverless</h2>
      <p className="lesson-subtitle">
        Si Lambda es cómputo sin servidor, DynamoDB es la base de datos que le hace juego: nada que dimensionar, nada que mantener encendido.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + diseño de claves + casos + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 10 · Clases 1 a 5, Módulo 6</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Recordar y profundizar los conceptos de Tabla, Item y Attribute introducidos en el Módulo 6.</li>
            <li>Explicar qué es una Partition Key y qué es una Sort Key.</li>
            <li>Diseñar una clave primaria adecuada según el patrón de acceso de una aplicación.</li>
            <li>Reconocer el riesgo de una mala elección de Partition Key (hot partition).</li>
            <li>Explicar por qué DynamoDB encaja naturalmente con el modelo serverless de Lambda.</li>
            <li>Decidir, con criterio, cuándo DynamoDB es preferible a RDS/Aurora y cuándo no.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-3. Recordemos dónde quedamos</h3>
          <p>La función de reseñas de CloudShop notifica al equipo de calidad (Clase 4), pero no guarda nada — cada reseña se pierde apenas termina la ejecución. Necesitamos un lugar donde persistir esa información.</p>
          <QaItem question="¿Por qué no usamos directamente la RDS de CloudShop que ya conocemos del Módulo 6?" answer="Podríamos, pero mezclaríamos un modelo de cómputo sin servidor (Lambda) con una base de datos que sigue requiriendo una instancia encendida permanentemente (RDS) — perdiendo parte de la ventaja de costo y simplicidad que buscamos con serverless." />
        </section>

        <section className="lesson-section">
          <h3>4-5. Recordemos lo que ya sabemos de DynamoDB</h3>
          <p>En el Módulo 6 conocimos Amazon DynamoDB como una base de datos NoSQL completamente administrada, con Table, Item y Attribute como equivalentes aproximados a tabla, fila y columna, sin &quot;DB Instance&quot; que dimensionar, y con capacidad On-Demand que se paga por solicitud.</p>
          <RoleGrid roles={[
            { icon: 'file-text', label: 'Table', desc: '≈ Tabla' },
            { icon: 'package', label: 'Item', desc: '≈ Fila' },
            { icon: 'tag', label: 'Attribute', desc: '≈ Columna' },
          ]} />
          <ConceptBadge icon="zap">DynamoDB se cobra por uso, igual que Lambda — dos servicios pensados con la misma filosofía.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>6-8. La clave primaria: el corazón del diseño</h3>
          <p>Toda tabla de DynamoDB necesita una <strong>clave primaria</strong>, y existen dos formas de definirla.</p>
          <RoleGrid roles={[
            { icon: 'key', label: 'Partition Key simple', desc: 'Un único atributo identifica de forma única cada item' },
            { icon: 'key', label: 'Partition Key + Sort Key', desc: 'La combinación de ambos identifica cada item; varios items pueden compartir la misma Partition Key' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>9-11. Una tabla simple: Reseñas por ID</h3>
          <pre className="codeblock">{ITEM_SIMPLE}</pre>
          <p>Con Partition Key = <code>reviewId</code>, DynamoDB puede encontrar exactamente esta reseña de inmediato — ideal si nuestro único patrón de acceso es &quot;dame la reseña con este ID&quot;.</p>
          <QaItem question="¿Qué pasa si necesitamos, además, 'dame todas las reseñas de este producto'?" answer="Con solo reviewId como clave, esa consulta no es natural — tendríamos que revisar toda la tabla. Necesitamos repensar el diseño de la clave." />
        </section>

        <section className="lesson-section">
          <h3>12-14. Agreguemos una Sort Key</h3>
          <pre className="codeblock">{ITEMS_SORT_KEY}</pre>
          <p>Con Partition Key = <code>productId</code> y Sort Key = <code>reviewId</code>, todas las reseñas de un mismo producto quedan agrupadas bajo la misma partición, y podemos pedir &quot;dame todas las reseñas de p-7791&quot; de forma directa y eficiente.</p>
          <Dialogo>Es como organizar un archivero: la Partition Key es la gaveta correcta, y la Sort Key es el orden dentro de esa gaveta. Sin la gaveta correcta, buscar se vuelve revisar todo el mueble.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>15-16. El patrón de acceso manda el diseño</h3>
          <Nota><p>Como ya adelantamos en el Módulo 6: en DynamoDB no empezamos preguntando &quot;¿qué relaciones tienen mis datos?&quot; como en el modelo relacional — empezamos preguntando &quot;¿cómo va a consultar esta información mi aplicación?&quot;, y diseñamos la clave alrededor de esa respuesta.</p></Nota>
          <QaItem question="Si la aplicación de CloudShop casi siempre pregunta 'dame las reseñas de este producto' y casi nunca 'dame esta reseña específica sin conocer su producto', ¿qué diseño de clave conviene?" answer="Partition Key = productId, Sort Key = reviewId — exactamente el diseño que armamos arriba, alineado al patrón de acceso real." />
        </section>

        <section className="lesson-section">
          <h3>17-19. El riesgo de una mala Partition Key: hot partition</h3>
          <p>Si eligiéramos, por ejemplo, un único valor fijo como Partition Key para todas las reseñas de toda la tienda (&quot;todas las reseñas van bajo la partición &apos;GLOBAL&apos;&quot;), todas las solicitudes recaerían sobre la misma partición física — un cuello de botella conocido como <strong>hot partition</strong>.</p>
          <ConceptBadge icon="alert-triangle" variant="danger">Una buena Partition Key distribuye la carga; una mala la concentra toda en un solo punto.</ConceptBadge>
          <QaItem question="¿productId como Partition Key distribuye razonablemente bien la carga entre miles de productos distintos?" answer="Sí, en general — hay muchos productos distintos, así que las solicitudes se reparten entre muchas particiones en vez de concentrarse en una sola." />
        </section>

        <section className="lesson-section">
          <h3>20-21. Por qué DynamoDB y Lambda combinan tan bien</h3>
          <Flow steps={[{ icon: 'zap', label: 'Lambda' }, { label: 'Pago por invocación' }, { icon: 'database', label: 'DynamoDB' }, { label: 'Pago por solicitud' }]} />
          <p>Ninguno de los dos exige mantener un servidor encendido esperando tráfico. Ambos escalan automáticamente con la demanda, y ambos se cobran proporcionalmente al uso real — la misma filosofía de la Clase 1 aplicada ahora también a los datos.</p>
        </section>

        <section className="lesson-section">
          <h3>22-23. ¿DynamoDB reemplaza a RDS/Aurora en CloudShop?</h3>
          <p>No completamente. CloudShop sigue teniendo clientes, pedidos, productos y pagos con relaciones complejas y reportes variados (Módulo 6) — ese territorio sigue perteneciendo naturalmente a RDS/Aurora. DynamoDB entra para piezas específicas, como las reseñas, con un patrón de acceso simple y predecible.</p>
          <Nota><p>Recordamos la idea del Módulo 6, Clase 7: una aplicación puede usar varias bases de datos a la vez, cada una resolviendo el problema para el que fue pensada.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>24-25. RETO DE LA CLASE</h3>
          <Nota><p>CloudShop quiere guardar el historial de eventos de cada pedido (creado, pagado, enviado, entregado). La aplicación casi siempre pregunta &quot;dame todos los eventos de este pedido, en orden&quot;, y rara vez busca un evento aislado sin saber a qué pedido pertenece. Diseña la Partition Key y la Sort Key.</p></Nota>
          <Reveal label="Ver la solución esperada">
            <p>Partition Key = orderId (agrupa todos los eventos de un mismo pedido bajo la misma partición). Sort Key = un valor que permita ordenarlos cronológicamente, como un timestamp o un número de secuencia del evento. Así, &quot;dame todos los eventos del pedido X, en orden&quot; se vuelve una consulta natural y eficiente sobre esa única partición.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>26-27. Retos nivel 2 y 3</h3>
          <QaItem question="Un equipo usa 'fecha de hoy' como Partition Key para todos los eventos del sistema, sin importar de qué pedido sean. ¿Qué problema anticipas?" answer="Hot partition: durante el día actual, todas las escrituras del sistema entero recaerían sobre esa misma partición, concentrando toda la carga ahí." />
          <QaItem question="CloudShop necesita generar reportes complejos que combinan clientes, pedidos y pagos con múltiples condiciones variables. ¿Migrarías eso a DynamoDB porque 'escala más'?" answer="No — ese patrón de consultas ad hoc y relaciones variadas encaja mejor con el modelo relacional (RDS/Aurora), como ya vimos en el Módulo 6. Escalabilidad no es el único criterio." />
        </section>

        <section className="lesson-section">
          <h3>28-29. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El desarrollador propone: &quot;usemos siempre un ID aleatorio como Partition Key para todo, así nunca hay hot partitions.&quot; No estoy de acuerdo porque, aunque distribuir bien la carga es importante, una clave que ignora el patrón de acceso real obliga a revisar toda la tabla para las consultas más comunes de la aplicación — resolvemos un problema de rendimiento y creamos otro. Esto es lo que haría en su lugar: diseñar la clave a partir de cómo la aplicación realmente consulta los datos, cuidando también que la carga se distribuya razonablemente. El riesgo de su enfoque es optimizar para un problema que no es el más frecuente.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: &quot;migremos toda la base de datos de CloudShop de RDS a DynamoDB, así todo queda serverless y consistente.&quot; No estoy de acuerdo porque los datos de negocio de CloudShop —clientes, pedidos, pagos— tienen relaciones y patrones de consulta variables que encajan mejor con un modelo relacional, como ya concluimos en el Módulo 6. Esto es lo que haría en su lugar: usar DynamoDB donde el patrón de acceso es simple y predecible, y mantener RDS/Aurora donde las relaciones y reportes lo justifican. El riesgo de su enfoque es forzar un modelo de datos a una herramienta que no fue pensada para ese problema.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>30. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'La Partition Key determina cómo se distribuyen los items dentro de DynamoDB.', correct: true },
            { text: 'Una Sort Key permite que varios items compartan la misma Partition Key, ordenados por ese segundo valor.', correct: true },
            { text: 'En DynamoDB, el diseño de la clave debería basarse principalmente en el patrón de acceso de la aplicación.', correct: true },
            { text: 'Una Partition Key mal elegida puede concentrar toda la carga en una sola partición (hot partition).', correct: true },
            { text: 'DynamoDB siempre es la mejor opción, sin importar qué tan complejas sean las relaciones entre los datos.', correct: false },
            { text: 'DynamoDB y Lambda comparten la misma filosofía de pago por uso, sin servidores que dimensionar.', correct: true },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>31. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>32. Reto oral</h3>
          <Dialogo>Explícame qué es una Partition Key sin usar las palabras clave, partición, DynamoDB, tabla ni AWS.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>&quot;Es el criterio que decide en qué grupo queda guardado cada dato, pensado para que cuando preguntes por ese grupo, la respuesta llegue de inmediato en vez de tener que revisar todo lo que existe.&quot;</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>33. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Partition Key</td><td>Determina cómo se distribuyen los items</td></tr>
              <tr><td>Sort Key</td><td>Ordena/agrupa items bajo la misma Partition Key</td></tr>
              <tr><td>Patrón de acceso</td><td>Guía principal para diseñar la clave</td></tr>
              <tr><td>Hot partition</td><td>Carga concentrada por una mala elección de clave</td></tr>
              <tr><td>DynamoDB + Lambda</td><td>Ambos serverless, ambos pago por uso</td></tr>
              <tr><td>DynamoDB vs. RDS/Aurora</td><td>Acceso simple por clave vs. relaciones y reportes complejos</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>34. Ticket de salida</h3>
          <Dialogo>Un compañero diseña una tabla de DynamoDB para guardar los mensajes de un chat, con Partition Key = &quot;chat&quot; fijo para todos los mensajes de la aplicación entera. ¿Qué le dirías?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Que esa elección concentraría todos los mensajes de todos los chats de la aplicación en una sola partición, generando un hot partition severo. Sería preferible usar algo como chatId como Partition Key (agrupando los mensajes de cada chat) y un timestamp o número de secuencia como Sort Key para mantenerlos en orden.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 7</div>
          <p>Ya sabemos diseñar la tabla. Ahora falta la pieza final: conectar nuestra función Lambda con DynamoDB para leer y escribir datos de verdad, cerrando el ciclo completo de la función de reseñas de CloudShop.</p>
          <ConceptBadge icon="database">Módulo 10 · Clase 7 — Lambda + DynamoDB: integrar cómputo y datos sin administrar ningún servidor</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-10/clase-7" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 7: Lambda + DynamoDB →
          </Link>
        </div>

      </div>
    </div>
  );
}
