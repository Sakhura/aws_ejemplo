import { Link } from 'react-router-dom';
import {
  Icon, Nota, Dialogo, ConceptBadge, RoleGrid, Flow, QaItem,
} from './lessonComponents.jsx';

export default function Modulo8Overview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero › Módulo 8</div>
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 8: Monitoreo, métricas y alertas con Amazon CloudWatch</h2>
      <p className="lesson-subtitle">
        Si no podemos observar el sistema, tampoco podemos saber con confianza cuándo está sano, cuándo está empeorando ni por qué falló.
      </p>

      <div className="lesson-body">

        <section className="lesson-section">
          <h3>Las 8 clases</h3>
          <table className="table lesson-summary-table">
            <thead><tr><th>Clase</th><th>Tema</th><th>Objetivo</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>¿Qué es CloudWatch? Métricas y observabilidad</td><td>Aprender qué estamos midiendo</td></tr>
              <tr><td>2</td><td>Métricas, estadísticas y períodos</td><td>Aprender a interpretar los números</td></tr>
              <tr><td>3</td><td>CloudWatch Alarms</td><td>Detectar condiciones importantes</td></tr>
              <tr><td>4</td><td>Alarmas + Amazon SNS</td><td>Recibir notificaciones cuando algo ocurre</td></tr>
              <tr><td>5</td><td>CloudWatch Logs</td><td>Investigar qué ocurrió dentro de la aplicación</td></tr>
              <tr><td>6</td><td>CloudWatch Agent</td><td>Obtener memoria, disco y métricas internas</td></tr>
              <tr><td>7</td><td>Dashboards y monitoreo de arquitectura</td><td>Visualizar EC2 + ALB + ASG + RDS</td></tr>
              <tr><td>8</td><td>Laboratorio integrador</td><td>Detectar, alertar y diagnosticar un incidente</td></tr>
            </tbody>
          </table>
        </section>

        <section className="lesson-section">
          <h3>Objetivo general del módulo</h3>
          <Nota><p>Al finalizar el Módulo 8, el estudiante podrá:</p></Nota>
          <ul className="plain-list">
            <li>Explicar qué significa monitorear infraestructura y comprender qué es Amazon CloudWatch.</li>
            <li>Diferenciar métrica, log y alarma, y reconocer métricas comunes de EC2, ALB, Auto Scaling y RDS.</li>
            <li>Comprender qué es un Namespace y qué es una Dimension.</li>
            <li>Interpretar estadísticas sencillas como Average, Maximum y Sum, y comprender períodos de observación.</li>
            <li>Crear conceptualmente una CloudWatch Alarm y diferenciar los estados OK, ALARM e INSUFFICIENT_DATA.</li>
            <li>Comprender thresholds y explicar cómo evitar reaccionar a picos aislados.</li>
            <li>Utilizar Amazon SNS para recibir notificaciones.</li>
            <li>Comprender qué son CloudWatch Logs, reconocer Log Groups y Log Streams.</li>
            <li>Comprender qué aporta CloudWatch Agent y reconocer que memoria y disco interno requieren telemetría adicional.</li>
            <li>Crear Dashboards conceptuales y relacionar CloudWatch con Auto Scaling.</li>
            <li>Diseñar monitoreo básico para una arquitectura completa.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>El problema que abre el módulo</h3>
          <Flow steps={[{ icon: 'globe', label: 'Usuarios' }, { icon: 'settings', label: 'ALB' }, { icon: 'server', label: 'EC2 × N' }, { icon: 'database', label: 'RDS' }]} />
          <p>Terminamos el Módulo 7 con Health Checks, Auto Scaling, Multi-AZ y Backups. Excelente. Hasta que llega un mensaje: "Profe, la página está lentísima."</p>
          <QaItem question="¿Qué está lento?" answer="Puede ser EC2, RDS, ALB, red, disco o la aplicación. Si no tenemos información, empezamos a adivinar — y adivinar infraestructura es una disciplina bastante cara." />
        </section>

        <section className="lesson-section">
          <h3>Aquí aparece monitoreo</h3>
          <ConceptBadge icon="bar-chart">Monitorear significa observar continuamente cómo se comporta un sistema utilizando información medible</ConceptBadge>
          <Dialogo>Un médico no pregunta solamente "¿está vivo?" También observa frecuencia, temperatura, oxígeno, presión. En infraestructura hacemos algo parecido: CPU, Network, Disk, Connections, Latency, Errors.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>¿Qué es Amazon CloudWatch?</h3>
          <p>Amazon CloudWatch es el servicio de observabilidad y monitoreo de AWS que permite trabajar con métricas, logs, alarmas y otras señales de infraestructura y aplicaciones. El CloudWatch Agent puede ampliar la información recopilada desde EC2 y otros servidores.</p>
          <ConceptBadge icon="bar-chart">CloudWatch es el tablero desde donde podemos observar qué está ocurriendo en nuestros sistemas</ConceptBadge>
        </section>

        <section className="lesson-section">
          <h3>Tres conceptos principales</h3>
          <RoleGrid roles={[
            { icon: 'bar-chart', label: 'Metric', desc: 'Un número medido en el tiempo' },
            { icon: 'file-text', label: 'Log', desc: 'Registros de eventos o mensajes' },
            { icon: 'alert-triangle', label: 'Alarm', desc: 'Una regla que vigila información y cambia de estado' },
          ]} />
          <Dialogo>Métrica: velocidad 100 km/h. Log: "15:32 motor encendido", "15:35 puerta abierta". Alarma: si temperatura supera el límite, avisar. Tres cosas distintas.</Dialogo>
        </section>

        <section className="lesson-section">
          <h3>Una métrica tiene historia</h3>
          <p>Una métrica no es solamente "CPU = 85%", sino una secuencia en el tiempo: 20% → 35% → 65% → 85% → 92%. Esto permite observar tendencias — una carga creciente cuenta una historia distinta a un pico aislado, y no debemos tratarlos igual.</p>
        </section>

        <section className="lesson-section">
          <h3>Tres preguntas que guiarán todo el módulo</h3>
          <Flow steps={[{ label: '¿Qué está ocurriendo?' }, { label: '¿Es normal?' }, { label: '¿Quién debe enterarse o actuar?' }]} />
        </section>

        <section className="lesson-section">
          <h3>Errores que atacaremos durante el módulo</h3>
          <ul className="plain-list">
            <li>"Como es monitoreo, todo es gratis." — CloudWatch puede generar costos por métricas personalizadas, logs, alarmas, dashboards y consultas.</li>
            <li>"Alarmamos por cualquier pico." — Un valor alto durante 2 segundos no es lo mismo que durante 20 minutos.</li>
            <li>"Más alarmas es mejor monitoreo." — Demasiadas alertas producen alarm fatigue: eventualmente nadie lee nada.</li>
            <li>"Dashboard y Alarm son lo mismo." — Un dashboard nos ayuda a mirar; una alarma vigila y cambia de estado.</li>
            <li>"CloudWatch sabe todo automáticamente." — Memoria y disco interno de una EC2 requieren el CloudWatch Agent.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>Arquitectura que deben entender al terminar</h3>
          <Flow steps={[
            { icon: 'globe', label: 'CloudShop' }, { icon: 'settings', label: 'ALB' }, { icon: 'server', label: 'EC2' }, { icon: 'database', label: 'RDS' },
            { icon: 'bar-chart', label: 'Metrics + Logs' }, { icon: 'cloud', label: 'CloudWatch' }, { icon: 'alert-triangle', label: 'Alarm' }, { icon: 'bell', label: 'SNS' }, { icon: 'user', label: 'Equipo' },
          ]} />
          <p>Si una persona no técnica logra explicar ese flujo — observar, medir, detectar, avisar, investigar — el módulo habrá cumplido su misión.</p>
        </section>

        <div className="bridge-callout">
          <div className="lesson-eyebrow"><Icon name="arrow-right" /> Empecemos</div>
          <ConceptBadge icon="bar-chart">Módulo 8 · Clase 1 — ¿Qué es Amazon CloudWatch? Métricas, observabilidad y cómo saber qué está ocurriendo en nuestra infraestructura</ConceptBadge>
          <Nota><p>Esa clase empieza con una situación muy sencilla: una usuaria dice "la página está lenta", y la respuesta es "¿qué evidencia tenemos?". Desde ahí introducimos Metric, Data Point, Namespace y Dimension, observamos EC2, ALB y RDS, y terminamos interpretando el primer gráfico de CloudWatch.</p></Nota>
          <Link to="/aprendizaje/aws-desde-cero/modulo-8/clase-1" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            Ir a Clase 1: ¿Qué es Amazon CloudWatch? →
          </Link>
        </div>

      </div>
    </div>
  );
}
