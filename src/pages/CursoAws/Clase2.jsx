import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, StrikeChip, Flow, InfoBox, CompareCols,
  CapacityRow, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  {
    q: '¿Qué es Cloud Computing en términos sencillos?',
    options: [
      { text: 'Guardar todo en nuestro computador.', correct: false },
      { text: 'Utilizar recursos tecnológicos a través de Internet.', correct: true },
      { text: 'Comprar servidores.', correct: false },
      { text: 'Instalar Wi-Fi.', correct: false },
    ],
  },
  {
    q: '¿Dónde se encuentran físicamente los servidores utilizados por los proveedores cloud?',
    options: [
      { text: 'En Internet.', correct: false },
      { text: 'En satélites.', correct: false },
      { text: 'En centros de datos.', correct: true },
      { text: 'Dentro de nuestro navegador.', correct: false },
    ],
  },
  {
    q: '¿Qué ventaja ofrece Cloud cuando aumenta repentinamente la cantidad de usuarios?',
    options: [
      { text: 'Permite adaptar los recursos.', correct: true },
      { text: 'Elimina Internet.', correct: false },
      { text: 'Apaga automáticamente todos los computadores.', correct: false },
      { text: 'Convierte computadores en servidores.', correct: false },
    ],
  },
  {
    q: '¿Cuál de estas afirmaciones es correcta?',
    options: [
      { text: 'Cloud siempre es gratuito.', correct: false },
      { text: 'Cloud siempre es más barato.', correct: false },
      { text: 'Muchos servicios cloud utilizan modelos relacionados con el consumo.', correct: true },
      { text: 'Cloud no utiliza servidores físicos.', correct: false },
    ],
  },
  {
    q: '¿Cuál es un proveedor de servicios Cloud?',
    options: [
      { text: 'Amazon Web Services.', correct: true },
      { text: 'Microsoft Word.', correct: false },
      { text: 'WhatsApp.', correct: false },
      { text: 'Windows Explorer.', correct: false },
    ],
  },
];

const TF_STATEMENTS = [
  { text: 'La nube significa que los servidores dejaron de existir.', correct: false },
  { text: 'Los servicios cloud funcionan sobre infraestructura física.', correct: true },
  { text: 'Para utilizar Cloud siempre debemos comprar servidores físicos.', correct: false },
  { text: 'Cloud puede permitir aumentar recursos cuando aumenta la demanda.', correct: true },
  { text: 'Cloud siempre será más barato que tener infraestructura propia.', correct: false },
];

export default function Clase2() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 0 · Clase 2</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 0 · Clase 2: ¿Qué es la nube y por qué existe?</h2>
      <p className="lesson-subtitle">
        Por qué las empresas dejaron de comprar todos sus propios servidores, y qué significa realmente "usar la nube".
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial absoluto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas sin conocimientos técnicos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración sugerida</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Teórico-práctica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisito</div><div className="lesson-meta-value">Clase 1, conceptos básicos de cliente, servidor e Internet.</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de la clase</h3>
          <Nota><p>Al finalizar, el estudiante debería ser capaz de explicar:</p></Nota>
          <Dialogo>“La nube permite utilizar recursos tecnológicos a través de Internet sin tener que comprar, instalar y mantener toda la infraestructura física nosotros mismos.”</Dialogo>
          <p>Además, deberá reconocer tres ideas:</p>
          <ul className="plain-list">
            <li>Comprar infraestructura 🖥️ vs. arrendar recursos tecnológicos ☁️</li>
            <li>Capacidad fija 📦 vs. capacidad adaptable 📈📉</li>
            <li>Gran inversión inicial 💰 vs. pago según utilización 💳</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2. Recordemos la Clase 1</h3>
          <Nota><p>Comenzaría dibujando esto:</p></Nota>
          <Flow steps={[
            { icon: 'user', label: 'USUARIO' },
            { icon: 'globe', label: 'INTERNET' },
            { icon: 'server', label: 'SERVIDOR' },
            { icon: 'upload', label: 'RESPUESTA' },
          ]} />
          <p>Y preguntaría:</p>
          <Dialogo>¿Dónde está físicamente ese servidor?</Dialogo>
          <p>Esa pregunta abre toda nuestra Clase 2.</p>
        </section>

        <section className="lesson-section">
          <h3>3. Antes de la nube</h3>
          <Nota><p>Imaginemos que tenemos una empresa llamada:</p></Nota>
          <ConceptBadge>SabinaStore</ConceptBadge>
          <p>Nuestra empresa quiere vender productos por Internet. Necesitamos una página web. Pero recordemos la clase anterior: una página necesita computadores que entreguen información a los usuarios.</p>
          <p>Por lo tanto necesitamos:</p>
          <ul className="plain-list">
            <li>🖥️ Servidores</li>
            <li>🌐 Conexión a Internet</li>
            <li>🔌 Electricidad</li>
            <li>❄️ Refrigeración</li>
            <li>🔐 Seguridad</li>
            <li>💾 Almacenamiento</li>
            <li>👩‍💻 Personal que administre todo</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>4. Primera alternativa: comprarlo nosotros</h3>
          <Nota><p>Tradicionalmente, una empresa podía comprar sus propios servidores.</p></Nota>
          <InfoBox title="🏢 SALA DE SERVIDORES" items={['🖥️🖥️🖥️🖥️ 🖥️🖥️🖥️🖥️', '❄️ Refrigeración', '🔌 Electricidad', '🌐 Internet', '🔐 Seguridad']} />
          <Nota><p>El problema no termina al comprar los servidores.</p></Nota>
          <p>Hay que:</p>
          <ul className="plain-list">
            <li>comprarlos</li>
            <li>instalarlos</li>
            <li>configurarlos</li>
            <li>mantenerlos</li>
            <li>actualizarlos</li>
            <li>protegerlos</li>
            <li>reemplazarlos cuando fallen</li>
          </ul>
          <p>Y además pagar electricidad y refrigeración.</p>
        </section>

        <section className="lesson-section">
          <h3>5. Aparece nuestro primer problema</h3>
          <Nota><p>SabinaStore normalmente recibe:</p></Nota>
          <ConceptBadge>1.000 visitas diarias</ConceptBadge>
          <p>Compramos servidores capaces de atender:</p>
          <ConceptBadge>5.000 visitas</ConceptBadge>
          <p>Todo funciona perfectamente. Hasta que llega:</p>
          <ConceptBadge variant="warning">CYBER MONDAY</ConceptBadge>
          <p>Y aparecen:</p>
          <ConceptBadge variant="danger">30.000 visitantes 😱</ConceptBadge>
          <p>¿Qué hacemos? Nuestros servidores tienen una capacidad limitada.</p>
        </section>

        <section className="lesson-section">
          <h3>6. ¿Compramos más servidores?</h3>
          <Nota><p>Podríamos hacerlo. Compramos suficientes servidores para soportar 30.000 usuarios. Problema solucionado.</p></Nota>
          <p>Pero Cyber Monday termina. Al día siguiente volvemos a 1.000 usuarios. Ahora tenemos una sala llena de servidores utilizando una pequeña parte de su capacidad.</p>
          <p>Es como comprar:</p>
          <ConceptBadge>un bus para 50 personas</ConceptBadge>
          <p>para transportar normalmente:</p>
          <ConceptBadge>dos pasajeros</ConceptBadge>
          <p>Funciona. Pero económicamente no es muy brillante.</p>
        </section>

        <section className="lesson-section">
          <h3>7. Aquí aparece la nube</h3>
          <Nota>
            <p>Ahora cambiemos el modelo. En lugar de comprar todos nuestros servidores, podemos utilizar infraestructura proporcionada por otra empresa. Esa empresa posee enormes instalaciones llenas de equipos. Nosotros podemos utilizar los recursos que necesitamos.</p>
          </Nota>
          <p>Y ahí llegamos al concepto:</p>
          <ConceptBadge>CLOUD COMPUTING</ConceptBadge>
          <Nota>
            <p>En términos sencillos: Cloud Computing permite utilizar recursos tecnológicos a través de Internet sin tener que poseer toda la infraestructura física que los hace funcionar.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>8. La analogía del hotel</h3>
          <Nota><p>Esta analogía funciona especialmente bien para explicar cloud.</p></Nota>
          <p>Imaginemos que viajamos durante tres días. Tenemos dos opciones.</p>
          <CompareCols cols={[
            { icon: 'home', title: 'Opción A · Comprar una casa', items: ['💰 comprarla', '🧹 mantenerla', '🔧 repararla', '💡 pagar servicios', '🔐 preocuparnos de su seguridad'] },
            { emoji: '🏨', title: 'Opción B · Arrendar una habitación', items: ['🏢 el hotel ya posee el edificio', '🔌 electricidad', '💧 agua', '🔐 seguridad', '🧹 mantenimiento'] },
          ]} />
          <p>Pero solamente estaremos allí 3 días: comprar una casa es absurdo. En el hotel simplemente utilizamos el servicio durante el tiempo necesario.</p>
          <Nota>
            <p>La nube sigue una idea parecida. No necesitamos construir un centro de datos para utilizar un servidor. Podemos arrendar capacidad informática.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>9. ¿Dónde están realmente esos computadores?</h3>
          <Nota><p>Aquí derribaría un mito:</p></Nota>
          <Dialogo>“La nube no está flotando en el cielo.” ☁️😄</Dialogo>
          <p>La nube sigue dependiendo de computadores físicos. Esos computadores están ubicados en instalaciones especializadas llamadas:</p>
          <ConceptBadge>Centros de datos</ConceptBadge>
          <p>Un centro de datos contiene infraestructura como:</p>
          <ul className="plain-list">
            <li>🖥️ servidores</li>
            <li>💾 almacenamiento</li>
            <li>🌐 redes</li>
            <li>🔌 sistemas eléctricos</li>
            <li>❄️ refrigeración</li>
            <li>🔐 controles de seguridad</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>10. Entonces, ¿qué cambia con Cloud?</h3>
          <Nota><p>Principalmente cambia quién administra la infraestructura y cómo nosotros accedemos a ella.</p></Nota>
          <p style={{ fontWeight: 500 }}>Modelo tradicional</p>
          <Flow steps={[
            { icon: 'building', label: 'NUESTRA EMPRESA', caption: 'Compra' },
            { icon: 'server', label: 'Servidores', caption: 'Mantiene' },
            { emoji: '🔧', label: 'Electricidad · Refrigeración · Seguridad física · Hardware' },
          ]} />
          <p style={{ fontWeight: 500, marginTop: 'var(--space-4)' }}>Modelo Cloud</p>
          <Flow steps={[
            { icon: 'building', label: 'NUESTRA EMPRESA', caption: 'solicita recursos' },
            { icon: 'cloud', label: 'PROVEEDOR CLOUD' },
            { icon: 'building', label: 'CENTROS DE DATOS' },
            { icon: 'server', label: 'Servidores' },
          ]} />
          <p>No significa que desaparezca toda responsabilidad de la empresa. Significa que parte importante de la infraestructura física pasa a ser responsabilidad del proveedor.</p>
        </section>

        <section className="lesson-section">
          <h3>11. Una gran ventaja: crecer cuando necesitamos</h3>
          <Nota><p>Volvamos a SabinaStore.</p></Nota>
          <p>Normalmente necesitamos capacidad para 👥 1.000 usuarios. Durante Cyber Monday necesitamos 👥👥👥 30.000 usuarios. Con Cloud podemos adaptar los recursos a las necesidades.</p>
          <CapacityRow label="Día normal" filled={1} total={5} />
          <CapacityRow label="Cyber Monday" filled={5} total={5} />
          <CapacityRow label="Termina Cyber Monday" filled={1} total={5} />
          <Nota>
            <p>A esta capacidad de aumentar o disminuir recursos según la necesidad la iremos relacionando con conceptos como elasticidad y escalabilidad. Para esta clase basta con:</p>
          </Nota>
          <p>“Necesito más → aumento recursos.” — “Necesito menos → reduzco recursos.”</p>
        </section>

        <section className="lesson-section">
          <h3>12. Segunda gran idea: pago por uso</h3>
          <Nota><p>Otra característica importante del modelo cloud es que muchos servicios se cobran según los recursos utilizados.</p></Nota>
          <p>La analogía más sencilla:</p>
          <ConceptBadge>Electricidad</ConceptBadge>
          <p>No construimos una central eléctrica cada vez que queremos encender una lámpara. Utilizamos electricidad. Luego pagamos según las condiciones y el consumo del servicio.</p>
          <p>Cloud puede entenderse de forma parecida:</p>
          <Flow steps={[
            { icon: 'help-circle', label: 'Necesito recursos' },
            { icon: 'cloud', label: 'Los utilizo' },
            { icon: 'bar-chart', label: 'Se mide utilización' },
            { icon: 'credit-card', label: 'Pago correspondiente' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>13. Pero cuidado con esta idea</h3>
          <Nota><p>No enseñaría:</p></Nota>
          <StrikeChip>❌ “Cloud siempre es más barato.”</StrikeChip>
          <p>Eso es incorrecto.</p>
          <Nota>
            <p>Cloud puede ayudar a optimizar costos, pero una mala administración también puede producir gastos innecesarios.</p>
          </Nota>
          <p>Por ejemplo: creamos un servidor, lo usamos durante una clase, terminamos, y nos olvidamos de apagarlo 🖥️💤. El servidor sigue funcionando, y determinados recursos pueden continuar generando cargos.</p>
          <p>Este concepto será importantísimo cuando hagamos laboratorios reales.</p>
        </section>

        <section className="lesson-section">
          <h3>14. ¿Quién ofrece estos servicios?</h3>
          <Nota><p>Existen diferentes proveedores de Cloud Computing. Entre los más conocidos encontramos:</p></Nota>
          <ul className="plain-list">
            <li>☁️ Amazon Web Services</li>
            <li>☁️ Microsoft Azure</li>
            <li>☁️ Google Cloud</li>
          </ul>
          <Nota><p>Nuestro curso estará centrado en:</p></Nota>
          <ConceptBadge>Amazon Web Services (AWS)</ConceptBadge>
          <p>Pero todavía no necesitamos conocer sus servicios. Primero entendemos el problema. Después conoceremos las herramientas.</p>
        </section>

        <section className="lesson-section">
          <h3>15. Comparación sencilla</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Infraestructura propia 🏢</th><th>Cloud ☁️</th></tr></thead>
            <tbody>
              <tr><td>Compramos servidores</td><td>Utilizamos recursos del proveedor</td></tr>
              <tr><td>Tenemos infraestructura física</td><td>El proveedor opera la infraestructura física</td></tr>
              <tr><td>Capacidad inicialmente planificada</td><td>Podemos adaptar capacidad</td></tr>
              <tr><td>Inversión inicial en hardware</td><td>Modelo de consumo según servicio</td></tr>
              <tr><td>Mantenemos hardware</td><td>El proveedor mantiene el hardware subyacente</td></tr>
              <tr><td>Crecer puede requerir compras</td><td>Podemos aprovisionar recursos rápidamente</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>16. Actividad de clase: ¿Comprar o usar Cloud?</h3>
          <Nota><p>Dividiría a los estudiantes en pequeños grupos y presentaría tres casos.</p></Nota>

          <p style={{ fontWeight: 500 }}>🏪 Caso A: pequeña tienda</p>
          <p>Una tienda quiere crear una página web. Tiene: 👥 pocos clientes, 💰 presupuesto limitado, 📈 posibilidad de crecer.</p>
          <div className="qa-item">
            <div className="qa-question">¿Comprarían servidores físicos o evaluarían Cloud? ¿Por qué?</div>
            <div className="qa-answer" style={{ borderTop: 'none', paddingTop: 0 }}>Discusión abierta — no hay una única respuesta correcta.</div>
          </div>

          <p style={{ fontWeight: 500, marginTop: 'var(--space-4)' }}>🎮 Caso B: videojuego nuevo</p>
          <p>Una empresa lanzará un videojuego. No sabe si tendrá 100 jugadores o 1.000.000 de jugadores.</p>
          <QaItem question="¿Qué ventaja podría tener Cloud?" answer="Poder adaptar recursos dependiendo de la demanda." answerLabel="Respuesta esperada" />

          <p style={{ fontWeight: 500, marginTop: 'var(--space-4)' }}>🏫 Caso C: universidad</p>
          <p>Una universidad tiene un sistema utilizado intensamente durante 📅 matrículas, 📅 inscripción de asignaturas y 📅 publicación de notas. Durante otros periodos tiene mucho menos tráfico.</p>
          <QaItem question="¿Qué característica de Cloud podría ser útil?" answer="Ajustar capacidad según la demanda." answerLabel="Respuesta esperada" />
        </section>

        <section className="lesson-section">
          <h3>17. Verdadero o falso</h3>
          <Nota><p>Haría esta actividad rápidamente con toda la clase.</p></Nota>
          <TrueFalseQuiz statements={TF_STATEMENTS} />
          <p>La última afirmación es importante.</p>
        </section>

        <section className="lesson-section">
          <h3>18. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>19. Desafío final</h3>
          <Nota><p>Les plantearía:</p></Nota>
          <Dialogo>Tu jefe te dice: “¿Por qué vamos a usar la nube si podemos comprar un computador potente y dejarlo en la oficina?” Explícale en 30 segundos qué ventaja podría ofrecer Cloud.</Dialogo>
          <p>No buscamos que memoricen una definición. Buscamos que sean capaces de explicar ideas como:</p>
          <Reveal>
            <Dialogo>“Con Cloud podemos utilizar infraestructura de un proveedor, aumentar o disminuir recursos cuando sea necesario y evitar tener que comprar y mantener todo el hardware nosotros mismos.”</Dialogo>
          </Reveal>
          <p style={{ marginTop: 'var(--space-4)' }}>Si pueden explicarlo con sus propias palabras, entendieron la clase.</p>
        </section>

        <section className="lesson-section">
          <h3>20. Lo que deben recordar</h3>
          <Nota><p>Reduciría toda la Clase 2 a estas cinco ideas:</p></Nota>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Qué recordar</th></tr></thead>
            <tbody>
              <tr><td>🖥️ Servidor</td><td>Sigue siendo un computador físico</td></tr>
              <tr><td>🏢 Centro de datos</td><td>Lugar que alberga infraestructura tecnológica</td></tr>
              <tr><td>☁️ Cloud</td><td>Recursos tecnológicos disponibles como servicios</td></tr>
              <tr><td>📈 Elasticidad</td><td>Adaptamos recursos según necesidad</td></tr>
              <tr><td>💳 Pago por uso</td><td>El costo puede depender del consumo</td></tr>
            </tbody>
          </table>
          <p>Y una frase:</p>
          <ConceptBadge>“La nube no elimina los servidores. Cambia la forma en que los utilizamos.”</ConceptBadge>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 3</div>
          <Nota><p>Cerraría la clase con una pequeña provocación:</p></Nota>
          <Dialogo>“Ya sabemos que podemos arrendar infraestructura en lugar de comprarla. Pero… ¿qué podemos arrendar exactamente?”</Dialogo>
          <p>¿Un servidor? Sí. 🖥️</p>
          <p>¿Espacio para guardar archivos? También. 📦</p>
          <p>¿Una base de datos? También. 🗄️</p>
          <p>¿Programas completos? También. 😈</p>
          <p>Y entonces aparecen tres conceptos que suelen parecer horribles por sus nombres:</p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', margin: 'var(--space-3) 0' }}>
            <span className="tag tag-accent">IaaS</span>
            <span className="tag tag-accent">PaaS</span>
            <span className="tag tag-accent">SaaS</span>
          </div>
          <Link to="/aprendizaje/aws-desde-cero/clase-3" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 3: IaaS, PaaS y SaaS →
          </Link>
        </div>

      </div>
    </div>
  );
}
