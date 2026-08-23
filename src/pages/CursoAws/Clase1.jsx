import { Link } from 'react-router-dom';
import { Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, QaItem, Reveal, Quiz } from './lessonComponents.jsx';

const QUIZ_QUESTIONS = [
  {
    q: '¿Qué es un servidor?',
    options: [
      { text: 'Un programa para navegar', correct: false },
      { text: 'Un computador/sistema que entrega información o servicios', correct: true },
      { text: 'Internet', correct: false },
      { text: 'Una dirección web', correct: false },
    ],
  },
  {
    q: '¿Qué herramienta usamos normalmente para visualizar páginas web?',
    options: [
      { text: 'Navegador', correct: true },
      { text: 'Servidor', correct: false },
      { text: 'Router', correct: false },
      { text: 'Base de datos', correct: false },
    ],
  },
  {
    q: '¿Qué analogía podemos utilizar para comprender una dirección IP?',
    options: [
      { text: 'Una contraseña', correct: false },
      { text: 'Una dirección postal', correct: true },
      { text: 'Una fotografía', correct: false },
      { text: 'Un documento', correct: false },
    ],
  },
  {
    q: '¿Para qué sirve DNS en nuestra explicación simplificada?',
    options: [
      { text: 'Para apagar servidores', correct: false },
      { text: 'Para crear contraseñas', correct: false },
      { text: 'Para relacionar nombres con direcciones', correct: true },
      { text: 'Para almacenar fotografías', correct: false },
    ],
  },
  {
    q: 'Internet y la nube son exactamente lo mismo.',
    options: [
      { text: 'Verdadero', correct: false },
      { text: 'Falso', correct: true },
    ],
  },
];

export default function Clase1() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 0 · Clase 1</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 0 · Clase 1: ¿Qué pasa cuando entramos a una página web?</h2>
      <p className="lesson-subtitle">
        Clase teórico-práctica de introducción absoluta, pensada para personas sin conocimientos técnicos: qué ocurre, paso a paso, desde que escribimos una dirección hasta que vemos una página en pantalla.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial absoluto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas sin conocimientos técnicos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración sugerida</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Teórico-práctica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Ninguno</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de la clase</h3>
          <Nota>
            <p>Al finalizar la clase, el estudiante debería ser capaz de explicar con sus propias palabras:</p>
          </Nota>
          <Dialogo>“Cuando entro a una página web, mi dispositivo solicita información a otro computador llamado servidor, el servidor responde y mi navegador muestra el resultado.”</Dialogo>
          <p>Ese será nuestro gran triunfo de la clase. No necesitamos más jerga todavía.</p>
        </section>

        <section className="lesson-section">
          <h3>2. Comencemos con algo cotidiano</h3>
          <Nota><p>Yo iniciaría la clase preguntando:</p></Nota>
          <Dialogo>“Cuando escribimos www.google.com en nuestro navegador, ¿dónde creen que está Google?”</Dialogo>
          <p>Deja que respondan. Probablemente aparecerán respuestas como:</p>
          <ul className="plain-list">
            <li>“En Internet.”</li>
            <li>“En Google.”</li>
            <li>“En la nube.”</li>
            <li>“En algún computador.”</li>
          </ul>
          <p>Entonces viene la revelación:</p>
          <Nota>
            <p>Una página web no vive mágicamente dentro de Internet. Su información está almacenada y procesada en computadores preparados para entregar información a otros dispositivos.</p>
          </Nota>
          <p>A esos computadores los llamamos:</p>
          <ConceptBadge>SERVIDORES</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>3. La analogía del restaurante</h3>
          <Nota><p>Esta será nuestra analogía principal durante la clase.</p></Nota>
          <p>Imaginemos que entramos a un restaurante.</p>
          <RoleGrid roles={[
            { icon: 'user', label: 'Cliente', desc: 'nosotros' },
            { icon: 'clipboard-list', label: 'Carta', desc: 'navegador' },
            { icon: 'user', label: 'Cocina', desc: 'servidor' },
            { emoji: '🍔', label: 'Comida', desc: 'información solicitada' },
          ]} />
          <p>Cuando queremos una hamburguesa:</p>
          <Flow steps={[
            { n: 1, label: 'La pedimos.' },
            { n: 2, label: 'El pedido llega a la cocina.' },
            { n: 3, label: 'La cocina procesa el pedido.' },
            { n: 4, label: 'La cocina entrega el resultado.' },
            { n: 5, label: 'Recibimos nuestra hamburguesa.' },
          ]} />
          <Nota><p>En Internet ocurre algo conceptualmente parecido.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>4. Ahora llevemos el restaurante a Internet</h3>
          <p>Cuando escribimos una dirección en el navegador:</p>
          <p className="mono" style={{ fontSize: 14 }}>www.ejemplo.com</p>
          <p>podemos simplificar el proceso así:</p>
          <Flow steps={[
            { icon: 'user', label: 'Usuario' },
            { icon: 'globe', label: 'Navegador' },
            { icon: 'radio', label: 'Internet' },
            { icon: 'server', label: 'Servidor' },
            { icon: 'radio', label: 'Internet' },
            { icon: 'globe', label: 'Navegador' },
            { icon: 'user', label: 'Usuario', caption: 've la página' },
          ]} />
          <Nota>
            <p>Aquí introduciría solo dos palabras técnicas:</p>
          </Nota>
          <div className="guide-defs" style={{ marginBottom: 'var(--space-4)' }}>
            <div><strong>Cliente</strong> — es quien solicita algo. Por ejemplo: 💻 notebook, 📱 teléfono, 📺 smart TV.</div>
            <div><strong>Servidor</strong> — es un computador preparado para recibir solicitudes y entregar información o servicios.</div>
          </div>
        </section>

        <section className="lesson-section">
          <h3>5. Hagamos un ejemplo</h3>
          <Nota>
            <p>Supongamos que una estudiante entra a una plataforma educativa para revisar sus notas. Escribe la dirección en Chrome.</p>
          </Nota>
          <Flow steps={[
            { n: 1, icon: 'globe', label: 'El navegador solicita:', caption: '“Quiero entrar a la plataforma.”' },
            { n: 2, icon: 'radio', label: 'La solicitud viaja por Internet.' },
            { n: 3, icon: 'server', label: 'El servidor recibe la solicitud.' },
            { n: 4, icon: 'database', label: 'El sistema busca la información necesaria.' },
            { n: 5, icon: 'server', label: 'El servidor responde.' },
            { n: 6, icon: 'globe', label: 'Chrome recibe la información y muestra la página.' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>6. Primera idea que deben llevarse</h3>
          <Nota>
            <p>Internet permite que diferentes dispositivos se comuniquen entre sí.</p>
            <p>Y: un servidor es un computador que entrega información o servicios a otros dispositivos.</p>
          </Nota>
          <p>Todavía no necesitamos hablar de protocolos, puertos, TCP/IP, HTTP headers ni arquitectura distribuida. Esos monstruillos pueden quedarse durmiendo. 🐲💤</p>
        </section>

        <section className="lesson-section">
          <h3>7. Pero ¿cómo encuentra Internet al servidor?</h3>
          <Nota><p>Aquí podemos introducir suavemente la dirección IP. Haz esta pregunta:</p></Nota>
          <Dialogo>“Si quiero enviar una encomienda, ¿qué información necesito?”</Dialogo>
          <p>Probablemente responderán:</p>
          <Dialogo>“La dirección.”</Dialogo>
          <p>Exactamente. Los dispositivos conectados a una red también necesitan identificarse. Una dirección IP funciona, de manera simplificada, como una dirección que permite identificar un dispositivo dentro de una red. Por ejemplo:</p>
          <p className="mono" style={{ fontSize: 14 }}>192.168.1.10</p>
          <Nota>
            <p>No explicaría todavía IPv4, IPv6, IP pública, IP privada, máscaras ni subnetting. Solo necesitamos que recuerden:</p>
          </Nota>
          <ConceptBadge>IP = dirección</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>8. Entonces, ¿por qué escribimos google.com y no números?</h3>
          <Nota><p>Aquí aparece otro concepto muy sencillo. Sería horrible tener que recordar:</p></Nota>
          <Dialogo>“Para entrar a mi página favorita tengo que escribir 142.xxx.xxx.xxx…”</Dialogo>
          <p>Los seres humanos recordamos nombres mucho mejor. Por eso utilizamos nombres como:</p>
          <ul className="plain-list">
            <li>google.com</li>
            <li>youtube.com</li>
            <li>amazon.com</li>
          </ul>
          <Nota>
            <p>Existe un sistema llamado DNS que ayuda a relacionar esos nombres con las direcciones que necesitan los computadores. La analogía:</p>
          </Nota>
          <ConceptBadge>DNS = contactos del teléfono</ConceptBadge>
          <p>Nosotros buscamos:</p>
          <Dialogo>“Mamá”</Dialogo>
          <p>El teléfono sabe qué número marcar. En Internet buscamos:</p>
          <Dialogo>“ejemplo.com”</Dialogo>
          <p>DNS ayuda a encontrar la dirección correspondiente.</p>
        </section>

        <section className="lesson-section">
          <h3>9. Nuestro primer mapa completo</h3>
          <Nota><p>Ahora podemos ampliar nuestro esquema:</p></Nota>
          <Flow steps={[
            { icon: 'user', label: 'USUARIO' },
            { icon: 'globe', label: 'NAVEGADOR' },
            { icon: 'book-open', label: 'DNS', caption: 'Busca la dirección' },
            { icon: 'radio', label: 'INTERNET' },
            { icon: 'server', label: 'SERVIDOR', caption: 'Recibe la solicitud' },
            { icon: 'settings', label: 'PROCESA' },
            { icon: 'upload', label: 'RESPONDE' },
            { icon: 'globe', label: 'NAVEGADOR' },
            { icon: 'user', label: 'USUARIO', caption: 've la página' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>10. Hagamos que ellos sean Internet</h3>
          <Nota>
            <p>Para un público no técnico, una actividad física puede fijar mucho mejor los conceptos que diez diapositivas.</p>
          </Nota>
          <p>Necesitamos cuatro estudiantes.</p>
          <ul className="plain-list">
            <li>Estudiante 1: 👩 Usuario</li>
            <li>Estudiante 2: 📖 DNS</li>
            <li>Estudiante 3: 📡 Internet</li>
            <li>Estudiante 4: 🖥️ Servidor</li>
          </ul>
          <p>El usuario dice:</p>
          <Dialogo>“Quiero entrar a tienda.cl.”</Dialogo>
          <p>DNS indica dónde encontrarla. Internet transporta la solicitud. El servidor recibe:</p>
          <Dialogo>“Quieren ver mi página.”</Dialogo>
          <p>Y responde entregando una hoja que diga:</p>
          <Dialogo>🛍️ “Bienvenido a Tienda.cl”</Dialogo>
          <p>El mensaje vuelve hasta el usuario.</p>
          <Nota>
            <p>Acaban de representar, de forma extremadamente simplificada, una comunicación cliente-servidor.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>11. Actividad práctica — Caso: Banco en línea</h3>
          <p>Presenta esta situación:</p>
          <Dialogo>Carolina abre su notebook, entra al navegador y visita el sitio web de su banco para consultar su saldo.</Dialogo>
          <p>Los estudiantes deben identificar (haz la pregunta primero y deja que respondan antes de mostrar la respuesta):</p>
          <QaItem question="¿Quién es el usuario?" answer="Carolina." />
          <QaItem question="¿Cuál podría ser el cliente?" answer="Su navegador/dispositivo." />
          <QaItem question="¿Qué permite transportar la información?" answer="Internet." />
          <QaItem question="¿Dónde se procesa la solicitud?" answer="En los sistemas/servidores del banco." />
          <QaItem question="¿Qué recibe finalmente Carolina?" answer="La información solicitada presentada en su navegador." />
        </section>

        <section className="lesson-section">
          <h3>12. Error conceptual importante</h3>
          <Nota><p>Preguntaría:</p></Nota>
          <Dialogo>“Entonces Internet y la nube son lo mismo, ¿verdadero o falso?”</Dialogo>
          <p>Respuesta:</p>
          <ConceptBadge variant="danger">FALSO</ConceptBadge>
          <Nota>
            <p>Internet permite la comunicación entre dispositivos y redes. La nube utiliza Internet para permitirnos acceder a recursos informáticos remotos, como almacenamiento, servidores, bases de datos y aplicaciones.</p>
          </Nota>
          <p>Esta diferencia nos prepara perfectamente para la próxima clase.</p>
        </section>

        <section className="lesson-section">
          <h3>13. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>14. Desafío final</h3>
          <Nota>
            <p>En lugar de pedir una definición memorizada, cerraría con esta pregunta:</p>
          </Nota>
          <Dialogo>“Explícale a una persona de 10 años qué ocurre cuando escribe una página web en su navegador.”</Dialogo>
          <p>Una respuesta satisfactoria podría ser:</p>
          <Reveal>
            <Dialogo>“El navegador busca dónde está la página, envía una solicitud por Internet a un servidor y el servidor responde enviando la información necesaria para mostrarla.”</Dialogo>
          </Reveal>
          <p style={{ marginTop: 'var(--space-4)' }}>Si pueden explicar eso sin mirar los apuntes, Clase 1 superada. 🏆</p>
        </section>

        <section className="lesson-section">
          <h3>15. Resumen para el estudiante</h3>
          <Nota><p>Solo deben salir de esta clase recordando cinco conceptos:</p></Nota>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>🌐 Internet</td><td>Permite comunicar dispositivos y redes</td></tr>
              <tr><td>💻 Cliente</td><td>Solicita información o servicios</td></tr>
              <tr><td>🖥️ Servidor</td><td>Responde solicitudes y entrega servicios</td></tr>
              <tr><td>📍 IP</td><td>Identifica una ubicación/dispositivo en una red</td></tr>
              <tr><td>📖 DNS</td><td>Ayuda a encontrar direcciones usando nombres</td></tr>
            </tbody>
          </table>
          <p>El mapa mental de la Clase 1:</p>
          <Flow steps={[
            { n: '·', label: 'Yo quiero algo' },
            { n: '·', label: 'Mi dispositivo lo solicita' },
            { n: '·', label: 'Internet lleva la solicitud' },
            { n: '·', label: 'Un servidor responde' },
            { n: '·', label: 'Mi dispositivo muestra el resultado' },
          ]} />
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 2</div>
          <Nota><p>Cerraría mostrando una sola pregunta en pantalla:</p></Nota>
          <Dialogo>🖥️ “Si necesitamos servidores para que todo esto funcione… ¿tenemos que comprar nuestros propios servidores?”</Dialogo>
          <p>Que discutan un minuto. Y entonces:</p>
          <p style={{ fontSize: 15, fontWeight: 500 }}>No necesariamente. Podemos alquilarlos.</p>
          <p>☁️ Y ahí comienza nuestra historia con la nube.</p>
          <Link to="/aprendizaje/aws-desde-cero/clase-2" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 2: ¿Qué es la nube y por qué existe? →
          </Link>
        </div>

      </div>
    </div>
  );
}
