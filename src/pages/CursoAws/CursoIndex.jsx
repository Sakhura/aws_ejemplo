import { Link } from 'react-router-dom';

const CLASES = [
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
];

export default function CursoIndex() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › AWS desde cero</div>
      <div className="lesson-eyebrow">☁️ AWS desde Cero</div>
      <h2 style={{ margin: '0 0 4px' }}>Módulo 0 · Fundamentos antes de tocar la consola</h2>
      <p className="view-intro">
        Una serie de clases teórico-prácticas pensadas para personas sin conocimientos técnicos: qué ocurre realmente detrás de una página web, y por qué existe la nube, antes de entrar a practicar en la consola de IAM.
      </p>

      <div className="course-grid">
        {CLASES.map((c) => (
          <Link key={c.to} to={c.to} className="card elev-sm" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card-kicker">Clase {c.numero} · {c.duracion}</div>
            <div className="card-title">{c.titulo}</div>
            <p className="card-body">{c.resumen}</p>
            <div className="course-card-req">Requisito: {c.requisito}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
