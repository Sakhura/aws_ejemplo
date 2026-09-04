import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, QaItem, Reveal, Quiz, TrueFalseQuiz,
} from './lessonComponents.jsx';

const GUARDDUTY_FINDING = `{
  "severity": 8.5,
  "type": "CryptoCurrency:EC2/BitcoinTool.B!DNS",
  "resource": { "instanceId": "i-0abc123def456" },
  "description": "La instancia i-0abc123def456 está consultando un dominio asociado a minería de criptomonedas.",
  "createdAt": "2026-09-04T04:02:11Z"
}`;

const QUIZ_QUESTIONS = [
  { q: '¿Qué es Amazon GuardDuty?', options: [{ text: 'Un servicio de detección de amenazas que analiza continuamente la actividad de la cuenta en busca de comportamiento sospechoso.', correct: true }, { text: 'Un servicio de backups automáticos.', correct: false }, { text: 'Un tipo de rol IAM.', correct: false }, { text: 'Un balanceador de carga.', correct: false }] },
  { q: '¿GuardDuty necesita instalar un agente dentro de cada EC2 para funcionar?', options: [{ text: 'No, analiza fuentes como CloudTrail, VPC Flow Logs y DNS logs sin agentes.', correct: true }, { text: 'Sí, requiere un agente pesado en cada instancia.', correct: false }] },
  { q: '¿Qué es un finding en GuardDuty?', options: [{ text: 'Un hallazgo: una alerta generada cuando se detecta actividad potencialmente sospechosa.', correct: true }, { text: 'Un tipo de bucket S3.', correct: false }, { text: 'Una política IAM.', correct: false }, { text: 'Un rol asumido.', correct: false }] },
  { q: '¿GuardDuty bloquea automáticamente la actividad sospechosa que detecta?', options: [{ text: 'No, detecta y genera un finding; actuar sigue siendo responsabilidad del equipo.', correct: true }, { text: 'Sí, siempre bloquea todo automáticamente.', correct: false }] },
  { q: '¿Qué hace principalmente AWS Security Hub?', options: [{ text: 'Centraliza y prioriza hallazgos de seguridad de varios servicios en un solo lugar.', correct: true }, { text: 'Reemplaza completamente a IAM.', correct: false }, { text: 'Cifra los datos en reposo.', correct: false }, { text: 'Genera credenciales temporales.', correct: false }] },
  { q: '¿Cómo se relacionan GuardDuty y Security Hub?', options: [{ text: 'GuardDuty genera hallazgos; Security Hub puede recibirlos y mostrarlos junto a los de otros servicios.', correct: true }, { text: 'Son exactamente el mismo servicio con dos nombres.', correct: false }, { text: 'Security Hub genera los hallazgos y GuardDuty los centraliza.', correct: false }, { text: 'No tienen ninguna relación.', correct: false }] },
  { q: '¿Cómo podríamos enterarnos casi de inmediato de un finding de severidad alta, conectando con lo visto en el Módulo 8?', options: [{ text: 'Con una CloudWatch Alarm o EventBridge que dispare una notificación por SNS.', correct: true }, { text: 'Revisando manualmente la consola una vez al mes.', correct: false }, { text: 'No es posible automatizarlo.', correct: false }, { text: 'Preguntando al equipo en la reunión semanal.', correct: false }] },
];

export default function Modulo9Clase7() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 9 · Clase 7</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 9 · Clase 7: GuardDuty y Security Hub — detectar actividad sospechosa y centralizar hallazgos</h2>
      <p className="lesson-subtitle">
        CloudTrail responde preguntas cuando ya sabemos qué buscar. GuardDuty avisa incluso cuando no sabíamos que había algo que buscar.
      </p>

      <div className="lesson-meta">
        <div className="lesson-meta-item"><div className="lesson-meta-label">Nivel</div><div className="lesson-meta-value">Inicial</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Público</div><div className="lesson-meta-value">Personas con poca o ninguna experiencia técnica</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Duración</div><div className="lesson-meta-value">45 minutos</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Modalidad</div><div className="lesson-meta-value">Conceptual + lectura de findings + caso + reto</div></div>
        <div className="lesson-meta-item"><div className="lesson-meta-label">Requisitos</div><div className="lesson-meta-value">Módulo 9 · Clases 1 a 6</div></div>
      </div>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>1. Objetivo de aprendizaje</h3>
          <Nota><p>Al finalizar esta clase, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué es Amazon GuardDuty y qué problema resuelve.</li>
            <li>Comprender qué es un finding y leer su estructura básica.</li>
            <li>Reconocer que GuardDuty detecta pero no bloquea por sí solo.</li>
            <li>Explicar qué es AWS Security Hub y en qué se diferencia de GuardDuty.</li>
            <li>Relacionar GuardDuty con CloudWatch, Alarms y SNS (Módulo 8) para responder rápido.</li>
            <li>Aplicar ambos servicios a un caso de investigación de CloudShop.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>2-3. El problema que abre la clase</h3>
          <p>En la Clase 6, CloudShop resolvió su incidente revisando CloudTrail — pero solo porque alguien notó primero que algo andaba mal y decidió buscar. ¿Y si nadie nota nada? ¿Y si una instancia comprometida está enviando datos a un servidor malicioso todas las noches, en silencio, durante semanas?</p>
          <ConceptBadge icon="search">Revisar registros manualmente no escala. Necesitamos algo que vigile por nosotros.</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>4-6. Aparece Amazon GuardDuty</h3>
          <p><strong>Amazon GuardDuty</strong> es el servicio de detección de amenazas de AWS: analiza continuamente fuentes como CloudTrail, los registros de red (VPC Flow Logs) y consultas DNS, buscando patrones de comportamiento sospechoso — sin que sea necesario instalar ningún agente dentro de las instancias.</p>
          <Dialogo>Es como un guardia de seguridad que no necesita que nadie lo llame: observa las cámaras, el libro de visitas y el tráfico del edificio todo el tiempo, y avisa apenas nota algo fuera de lo normal.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>7-9. ¿Qué tipo de cosas detecta?</h3>
          <RoleGrid roles={[
            { icon: 'globe', label: 'IP maliciosa conocida', desc: 'Una llamada a la API proveniente de una IP en listas de amenazas' },
            { icon: 'server', label: 'Minería de criptomonedas', desc: 'Una EC2 comunicándose con dominios asociados a cripto-minado' },
            { icon: 'map-pin', label: 'Ubicación inusual', desc: 'Acceso desde una geolocalización atípica para esa cuenta' },
            { icon: 'alert-triangle', label: 'Intento de ocultar rastro', desc: 'Un intento de deshabilitar CloudTrail (Clase 6), por ejemplo' },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>10-12. Leamos un finding</h3>
          <pre className="codeblock">{GUARDDUTY_FINDING}</pre>
          <table className="table lesson-summary-table">
            <thead><tr><th>Campo</th><th>Traducción</th></tr></thead>
            <tbody>
              <tr><td className="mono">severity</td><td>Qué tan grave parece (escala de gravedad)</td></tr>
              <tr><td className="mono">type</td><td>Categoría de la amenaza detectada</td></tr>
              <tr><td className="mono">resource</td><td>Qué recurso está involucrado</td></tr>
              <tr><td className="mono">description</td><td>Explicación en texto de lo observado</td></tr>
            </tbody>
          </table>
          <p>En español: <em>&quot;La instancia i-0abc123def456 está consultando un dominio asociado a minería de criptomonedas, con severidad alta.&quot;</em> Esto no prueba con certeza absoluta que la instancia está comprometida — pero es una pista lo bastante fuerte como para investigar de inmediato.</p>
        </section>

        <section className="lesson-section">
          <h3>13-14. GuardDuty detecta. No bloquea por sí solo</h3>
          <ConceptBadge icon="eye">Un finding es evidencia, no una acción automática.</ConceptBadge>
          <Nota><p>GuardDuty no apaga la instancia, no revoca el rol ni cierra el acceso por su cuenta. Genera el hallazgo; decidir y actuar sigue siendo trabajo del equipo — apoyado, eso sí, en información mucho mejor que &quot;nadie notó nada&quot;.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>15-17. Enterarse rápido: conectando con el Módulo 8</h3>
          <p>Un finding que nadie revisa hasta dentro de tres semanas no sirve de mucho. GuardDuty puede integrarse con CloudWatch Events/EventBridge para disparar una notificación —usando el mismo patrón de CloudWatch Alarms + Amazon SNS que ya construimos en el Módulo 8— apenas aparece un finding de severidad alta.</p>
          <Flow steps={[{ icon: 'search', label: 'GuardDuty', caption: 'Genera el finding' }, { icon: 'bell', label: 'EventBridge + SNS', caption: 'Notifica al equipo' }, { icon: 'user', label: 'Persona responde' }]} />
        </section>

        <section className="lesson-section">
          <h3>18-20. Muchas fuentes, un solo tablero: aparece Security Hub</h3>
          <p>GuardDuty no es el único servicio de seguridad de AWS que genera hallazgos — existen otros, como Amazon Inspector (vulnerabilidades) o IAM Access Analyzer (permisos demasiado amplios). Revisar cada uno por separado, en su propia consola, se vuelve tedioso rápido.</p>
          <p><strong>AWS Security Hub</strong> centraliza los hallazgos de estos servicios en un solo lugar, con un puntaje general de postura de seguridad y prioridades sugeridas — el mostrador único donde llegan todas las alertas, en vez de tener que visitar oficina por oficina.</p>
        </section>

        <section className="lesson-section">
          <h3>21-22. GuardDuty vs. Security Hub</h3>
          <RoleGrid roles={[
            { icon: 'search', label: 'GuardDuty', desc: 'Detecta actividad sospechosa específica' },
            { icon: 'shield', label: 'Security Hub', desc: 'Centraliza y prioriza hallazgos de varios servicios' },
          ]} />
          <Nota><p>No compiten entre sí — GuardDuty es una de las fuentes que Security Hub puede mostrar junto a las demás, del mismo modo en que un Dashboard de CloudWatch (Módulo 8) reunía varias métricas sin reemplazar a las alarmas que las vigilaban.</p></Nota>
        </section>

        <section className="lesson-section">
          <h3>23-24. Volvamos a CloudShop</h3>
          <p>Una madrugada, GuardDuty genera el finding que leímos antes: la instancia de la aplicación de reportes está consultando un dominio de minería de criptomonedas.</p>
          <QaItem question="¿Qué NO deberíamos asumir automáticamente que hizo GuardDuty?" answer="No detuvo la instancia ni bloqueó nada — solo generó la alerta. La acción sigue siendo nuestra." />
          <QaItem question="¿Qué revisaríamos primero, conectando con la Clase 6?" answer="CloudTrail, para ver qué acciones se realizaron con las credenciales de esa instancia (su rol) alrededor de la hora del finding, y si hubo algo inusual antes de que apareciera el comportamiento sospechoso." />
        </section>

        <section className="lesson-section">
          <h3>25-26. RETO DE LA CLASE</h3>
          <Nota><p>Security Hub muestra tres hallazgos esta semana para CloudShop: (1) un finding de GuardDuty de severidad alta sobre una IP maliciosa conectándose a una EC2; (2) un finding de IAM Access Analyzer indicando que un rol tiene permisos más amplios de los que usa; (3) un finding de severidad baja sobre una consulta DNS poco común, ya explicada por el equipo de desarrollo. ¿En qué orden los atenderías, y por qué?</p></Nota>
          <Reveal label="Ver la respuesta esperada">
            <p>Primero, el finding de severidad alta de GuardDuty: podría indicar un compromiso activo y requiere investigación inmediata (revisar CloudTrail, aislar el recurso si corresponde). Segundo, el hallazgo de IAM Access Analyzer: no es una emergencia activa, pero corregirlo reduce el mínimo privilegio pendiente (Clase 2) y el riesgo futuro. Tercero, el finding de severidad baja ya explicado: puede documentarse y cerrarse, pero no antes de haber atendido los dos anteriores.</p>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>27-28. Retos nivel 2 y 3</h3>
          <QaItem question="Alguien dice: 'con GuardDuty activo ya no necesitamos revisar CloudTrail manualmente nunca más.' ¿Estás de acuerdo?" answer="No del todo — GuardDuty detecta patrones que ya conoce o infiere como sospechosos, pero investigar un finding específico (como en la Clase 6) sigue apoyándose en revisar CloudTrail para reconstruir exactamente qué ocurrió." />
          <QaItem question="Un finding de GuardDuty resulta ser un falso positivo (una prueba legítima del equipo de desarrollo). ¿Deberíamos desactivar GuardDuty para evitar más falsos positivos?" answer="No — la respuesta razonable es documentar el caso y, si aplica, ajustar reglas específicas, no apagar la herramienta que en la mayoría de los casos sí aporta señal real." />
        </section>

        <section className="lesson-section">
          <h3>29-30. Dos propuestas que rechazar</h3>
          <Nota>
            <p>El gerente propone: &quot;activemos GuardDuty y ya, con eso la cuenta queda protegida.&quot; No estoy de acuerdo porque GuardDuty detecta y alerta, pero no corrige nada por sí mismo — sin un proceso claro de quién revisa los findings y qué hace con ellos, las alertas simplemente se acumulan sin generar ninguna mejora real. Esto es lo que haría en su lugar: activar GuardDuty y definir, además, un flujo de notificación y respuesta (EventBridge + SNS, como en el Módulo 8). El riesgo de su enfoque es confundir &quot;tener la herramienta encendida&quot; con &quot;estar protegidos&quot;.</p>
          </Nota>
          <Nota>
            <p>Otra propuesta: &quot;revisemos manualmente cada consola de seguridad por separado cada mañana, así no necesitamos Security Hub.&quot; No estoy de acuerdo porque a medida que se agregan más servicios de seguridad, revisar cada consola por separado se vuelve lento y propenso a que algo se pase por alto. Esto es lo que haría en su lugar: centralizar en Security Hub y usarlo como punto de entrada diario. El riesgo de su enfoque es perder tiempo (y hallazgos importantes) navegando entre consolas distintas en vez de un solo lugar priorizado.</p>
          </Nota>
        </section>

        <section className="lesson-section">
          <h3>31. Verdadero o falso</h3>
          <TrueFalseQuiz statements={[
            { text: 'GuardDuty requiere instalar un agente en cada instancia EC2 para funcionar.', correct: false },
            { text: 'Un finding de GuardDuty es un hallazgo generado ante actividad potencialmente sospechosa.', correct: true },
            { text: 'GuardDuty bloquea automáticamente cualquier actividad que detecta como sospechosa.', correct: false },
            { text: 'Security Hub puede centralizar hallazgos de GuardDuty junto a los de otros servicios.', correct: true },
            { text: 'Un finding de severidad alta merece la misma prioridad que uno de severidad baja.', correct: false },
            { text: 'Conectar GuardDuty con SNS permite enterarse casi de inmediato de un finding importante.', correct: true },
          ]} />
        </section>

        <section className="lesson-section">
          <h3>32. Mini evaluación</h3>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <section className="lesson-section">
          <h3>33. Reto oral</h3>
          <Dialogo>Explícame la diferencia entre GuardDuty y Security Hub sin usar las palabras GuardDuty, Security Hub, detectar, centralizar ni AWS.</Dialogo>
          <Reveal label="Ver una respuesta posible">
            <Dialogo>&quot;Uno vigila constantemente y avisa cuando algo parece raro. El otro reúne esos avisos, junto con los de otras vigilancias distintas, en un solo tablero para que nadie tenga que ir a revisar cada rincón por separado.&quot;</Dialogo>
          </Reveal>
        </section>

        <section className="lesson-section">
          <h3>34. Resumen de bolsillo</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Concepto</th><th>Explicación sencilla</th></tr></thead>
            <tbody>
              <tr><td>Amazon GuardDuty</td><td>Detecta actividad sospechosa automáticamente</td></tr>
              <tr><td>Finding</td><td>Un hallazgo/alerta generado por GuardDuty</td></tr>
              <tr><td>Severity</td><td>Qué tan grave parece el hallazgo</td></tr>
              <tr><td>AWS Security Hub</td><td>Centraliza hallazgos de varios servicios de seguridad</td></tr>
              <tr><td>GuardDuty ≠ bloqueo automático</td><td>Detecta y alerta; actuar sigue siendo del equipo</td></tr>
              <tr><td>EventBridge + SNS</td><td>Camino para notificar findings casi en tiempo real</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>35. Ticket de salida</h3>
          <Dialogo>Un compañero dice: &quot;GuardDuty marcó una instancia como sospechosa, pero como no la apagó automáticamente, seguro no era nada grave.&quot; ¿Qué le responderías?</Dialogo>
          <Reveal label="Ver respuesta esperada">
            <p>Que GuardDuty nunca apaga nada automáticamente — su función es detectar y generar el finding, no actuar por su cuenta. Que no haya bloqueado la instancia no dice nada sobre la gravedad real; el finding debe investigarse (por ejemplo, revisando CloudTrail) antes de descartarlo.</p>
          </Reveal>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Puente hacia la Clase 8</div>
          <p>Recorrimos identidad, autenticación, autorización, roles, cifrado, secretos, auditoría y detección de amenazas. Falta cerrar el módulo de la forma en que cerramos todos los anteriores: con las manos en la arquitectura completa de CloudShop, diseñando y auditando su seguridad de punta a punta.</p>
          <ConceptBadge icon="shield">Módulo 9 · Clase 8 — Laboratorio integrador de seguridad: diseñar y auditar CloudShop segura</ConceptBadge>
          <Link to="/aprendizaje/aws-desde-cero/modulo-9/clase-8" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 8: Laboratorio integrador de seguridad →
          </Link>
        </div>

      </div>
    </div>
  );
}
