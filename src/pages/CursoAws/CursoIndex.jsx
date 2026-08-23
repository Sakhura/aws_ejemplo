import { Link } from 'react-router-dom';

const MODULO_0 = [
  {
    to: '/aprendizaje/aws-desde-cero/clase-1',
    numero: 1,
    duracion: '45 min',
    titulo: '¿Qué pasa cuando entramos a una página web?',
    resumen: 'Cliente, servidor, Internet, IP y DNS explicados con la analogía de un restaurante.',
    requisito: 'Ninguno',
  },
  {
    to: '/aprendizaje/aws-desde-cero/clase-2',
    numero: 2,
    duracion: '45 min',
    titulo: '¿Qué es la nube y por qué existe?',
    resumen: 'Por qué las empresas dejan de comprar sus propios servidores: elasticidad y pago por uso, con la analogía del hotel.',
    requisito: 'Clase 1',
  },
  {
    to: '/aprendizaje/aws-desde-cero/clase-3',
    numero: 3,
    duracion: '45 min',
    titulo: 'IaaS, PaaS y SaaS',
    resumen: 'Qué podemos arrendar exactamente en la nube: infraestructura, plataforma o software, con la analogía de una pizzería.',
    requisito: 'Clases 1 y 2',
  },
  {
    to: '/aprendizaje/aws-desde-cero/clase-4',
    numero: 4,
    duracion: '45 min',
    titulo: 'Archivos, almacenamiento y bases de datos',
    resumen: 'La diferencia entre guardar un archivo y organizar información consultable, antes de conocer Amazon S3 y Amazon RDS.',
    requisito: 'Clases 1, 2 y 3',
  },
  {
    to: '/aprendizaje/aws-desde-cero/clase-5',
    numero: 5,
    duracion: '45 min',
    titulo: 'Centros de datos, disponibilidad y continuidad',
    resumen: 'Por qué no conviene depender de un único servidor ni de un único lugar: redundancia, disponibilidad y la analogía de los huevos.',
    requisito: 'Clases 1 a 4',
  },
  {
    to: '/aprendizaje/aws-desde-cero/clase-6',
    numero: 6,
    duracion: '45 min',
    titulo: 'Cómo se conecta todo',
    resumen: 'Clase de integración y evaluación final del módulo: reconstruimos el recorrido completo, desde el navegador hasta la respuesta.',
    requisito: 'Clases 1 a 5',
  },
];

const MODULO_2 = [
  {
    to: '/aprendizaje/aws-desde-cero/modulo-2/clase-1',
    numero: 1,
    duracion: '45 min',
    titulo: 'Introducción a IAM, ¿quién puede entrar y qué puede hacer?',
    resumen: 'Autenticación vs. autorización, y una primera mirada a usuarios, grupos, roles y políticas, con la analogía del guardia de edificio.',
    requisito: 'Módulos 0 y 1',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-2/clase-2',
    numero: 2,
    duracion: '45 min',
    titulo: 'Usuarios, grupos y mínimo privilegio',
    resumen: 'Por qué no todas las personas deben tener los mismos permisos, y cómo IAM organiza eso con usuarios y grupos.',
    requisito: 'Clase 1 de este módulo',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-2/clase-3',
    numero: 3,
    duracion: '45 min',
    titulo: 'Políticas IAM, las reglas de acceso',
    resumen: 'Cómo le decimos a AWS qué puede hacer un usuario o grupo, leyendo la primera política en JSON sin que dé miedo.',
    requisito: 'Clases 1 y 2 de este módulo',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-2/clase-4',
    numero: 4,
    duracion: '45 min',
    titulo: 'Roles IAM, permisos temporales sin compartir credenciales',
    resumen: 'Qué hacer cuando quien necesita permiso es un servidor y no una persona: roles, confianza y credenciales temporales.',
    requisito: 'Clases 1 a 3 de este módulo',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-2/clase-5',
    numero: 5,
    duracion: '45 min',
    titulo: 'Credenciales, contraseñas, MFA y buenas prácticas',
    resumen: 'Cómo proteger las identidades que construimos en las clases anteriores: contraseñas, MFA, Access Keys y los errores más comunes.',
    requisito: 'Clases 1 a 4 de este módulo',
  },
];

function ClassGrid({ classes }) {
  return (
    <div className="course-grid">
      {classes.map((c) => (
        <Link key={c.to} to={c.to} className="card elev-sm" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card-kicker">Clase {c.numero} · {c.duracion}</div>
          <div className="card-title">{c.titulo}</div>
          <p className="card-body">{c.resumen}</p>
          <div className="course-card-req">Requisito: {c.requisito}</div>
        </Link>
      ))}
    </div>
  );
}

export default function CursoIndex() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero</div>
      <div className="lesson-eyebrow">☁️ AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Fundamentos antes de tocar la consola</h2>
      <p className="view-intro">
        Una serie de clases teórico-prácticas pensadas para personas sin conocimientos técnicos: qué ocurre realmente detrás de una página web, por qué existe la nube, y cómo AWS organiza el acceso a sus recursos.
      </p>

      <h3 style={{ marginBottom: 4 }}>Módulo 0 · Fundamentos de Cloud</h3>
      <p className="view-intro" style={{ marginBottom: 'var(--space-6)' }}>
        Qué pasa cuando abrimos una página web, qué problema resuelve la nube, y cómo se organiza: cómputo, almacenamiento, bases de datos y disponibilidad.
      </p>
      <ClassGrid classes={MODULO_0} />

      <h3 style={{ margin: 'var(--space-8) 0 4px' }}>Módulo 2 · Seguridad e IAM</h3>
      <p className="view-intro" style={{ marginBottom: 'var(--space-6)' }}>
        Quién puede entrar a la cuenta de AWS y qué puede hacer una vez dentro: usuarios, grupos y el principio de mínimo privilegio.
      </p>
      <ClassGrid classes={MODULO_2} />
    </div>
  );
}
