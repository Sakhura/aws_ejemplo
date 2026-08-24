import { Link } from 'react-router-dom';
import { Icon } from './lessonComponents.jsx';

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
  {
    to: '/aprendizaje/aws-desde-cero/modulo-2/clase-6',
    numero: 6,
    duracion: '45 min',
    titulo: 'Laboratorio y desafío final de IAM',
    resumen: 'Clase de cierre del módulo: resolvemos el caso completo de NovaCloud aplicando usuarios, grupos, roles, políticas, MFA y mínimo privilegio.',
    requisito: 'Clases 1 a 5 de este módulo',
  },
];

const MODULO_3 = [
  {
    to: '/aprendizaje/aws-desde-cero/modulo-3/clase-1',
    numero: 1,
    duracion: '45 min',
    titulo: '¿Qué es Amazon EC2 y para qué sirve?',
    resumen: 'Por qué comprar un servidor físico es incómodo, y cómo EC2 nos deja obtener capacidad de cómputo bajo demanda, con la analogía del hotel.',
    requisito: 'Módulos 0, 1 y 2',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-3/clase-2',
    numero: 2,
    duracion: '45 min',
    titulo: 'AMI, tipos de instancia y recursos',
    resumen: 'Las dos grandes decisiones antes de lanzar un servidor: con qué plantilla parte y cuánta capacidad (vCPU y RAM) tendrá.',
    requisito: 'Módulo 3 · Clase 1',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-3/clase-3',
    numero: 3,
    duracion: '45 min',
    titulo: 'Crear nuestra primera instancia EC2',
    resumen: 'Laboratorio guiado paso a paso: nombre, AMI, tipo de instancia, key pair, red, Security Group y almacenamiento, hasta ver Running.',
    requisito: 'Módulo 3 · Clases 1 y 2',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-3/clase-4',
    numero: 4,
    duracion: '45 min',
    titulo: 'Security Groups, puertos y control del tráfico',
    resumen: 'Quién puede llegar hasta nuestra instancia y por qué puerta: inbound, outbound, puertos 22/80/443 y 0.0.0.0/0 sin recetas mágicas.',
    requisito: 'Módulo 3 · Clases 1 a 3',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-3/clase-5',
    numero: 5,
    duracion: '45 min',
    titulo: 'Amazon EBS, volúmenes y snapshots',
    resumen: 'EC2 procesa; EBS guarda. Qué persiste al detener una instancia, Delete on termination, y por qué un snapshot no es "otro disco".',
    requisito: 'Módulo 3 · Clases 1 a 4',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-3/clase-6',
    numero: 6,
    duracion: '45 min',
    titulo: 'Estados, monitoreo, costos y buenas prácticas de EC2',
    resumen: 'Crear un recurso es solo el comienzo: estados de instancia, CloudWatch, CPUUtilization, modelos de compra y la disciplina de limpieza.',
    requisito: 'Módulo 3 · Clases 1 a 5',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-3/clase-7',
    numero: 7,
    duracion: '45-60 min',
    titulo: 'Laboratorio integrador: publica tu primera página web con Amazon EC2',
    resumen: 'Cierre práctico del módulo: AMI, Security Group, EBS, acceso, Apache y monitoreo se conectan en una sola solución, hasta ver la página en el navegador.',
    requisito: 'Módulo 3 · Clases 1 a 6',
  },
];

const MODULO_4 = [
  {
    to: '/aprendizaje/aws-desde-cero/modulo-4/clase-1',
    numero: 1,
    duracion: '45 min',
    titulo: '¿Qué es Amazon S3? Buckets, objetos y almacenamiento de objetos',
    resumen: 'De discos conectados a servidores a almacenamiento de objetos: qué es un bucket, un objeto y una key, y en qué se diferencia S3 de EBS.',
    requisito: 'Módulo 3 completado',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-4/clase-2',
    numero: 2,
    duracion: '45 min',
    titulo: 'Crear nuestro primer bucket y trabajar con objetos',
    resumen: 'Primer laboratorio S3 completo: crear bucket, subir, descargar, copiar y eliminar objetos, comprendiendo keys y prefijos.',
    requisito: 'Módulo 4 · Clase 1',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-4/clase-3',
    numero: 3,
    duracion: '45 min',
    titulo: 'Permisos, Bucket Policies y acceso público en Amazon S3',
    resumen: 'IAM Policies vs. Bucket Policies, Principal/Action/Resource/Effect, Block Public Access y por qué "privado" no significa "inutilizable".',
    requisito: 'Módulo 4 · Clases 1 y 2',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-4/clase-4',
    numero: 4,
    duracion: '45 min',
    titulo: 'Versioning, recuperación y protección frente a errores',
    resumen: 'Version ID, Current vs. Noncurrent, Delete Marker, recuperación de versiones y por qué Versioning no es un backup perfecto.',
    requisito: 'Módulo 4 · Clases 1 a 3',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-4/clase-5',
    numero: 5,
    duracion: '45 min',
    titulo: 'Storage Classes y Lifecycle, almacenar de forma inteligente',
    resumen: 'Standard, IA, One Zone-IA, Intelligent-Tiering y Glacier, más reglas de Lifecycle para mover o eliminar datos automáticamente.',
    requisito: 'Módulo 4 · Clases 1 a 4',
  },
];

const MODULO_5 = [
  {
    to: '/aprendizaje/aws-desde-cero/modulo-5/clase-1',
    numero: 1,
    duracion: '45 min',
    titulo: '¿Qué es una red? IP pública, IP privada y cómo viaja la información',
    resumen: 'Cero AWS todavía: Wi-Fi de casa, direcciones y routers antes de tocar una sola sigla de VPC.',
    requisito: 'Módulos 0 a 4',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-5/clase-2',
    numero: 2,
    duracion: '45 min',
    titulo: '¿Qué es Amazon VPC? Nuestra red privada dentro de AWS',
    resumen: 'Nuestro propio terreno dentro de AWS: rango de direcciones, CIDR introductorio, Región y Default vs. Custom VPC.',
    requisito: 'Módulo 5 · Clase 1',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-5/clase-3',
    numero: 3,
    duracion: '45 min',
    titulo: 'Subnets públicas y privadas, dividiendo nuestra VPC en zonas',
    resumen: 'La ciudad necesita barrios: qué convierte una subnet en pública, disponibilidad por AZ y por qué el nombre no define nada.',
    requisito: 'Módulo 5 · Clases 1 y 2',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-5/clase-4',
    numero: 4,
    duracion: '45 min',
    titulo: 'Route Tables e Internet Gateway, enseñándole a nuestra red por dónde ir',
    resumen: 'Destination, Target, la ruta local, 0.0.0.0/0 y por qué tener puerta y permiso no basta sin un camino.',
    requisito: 'Módulo 5 · Clases 1 a 3',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-5/clase-5',
    numero: 5,
    duracion: '45 min',
    titulo: 'NAT Gateway, salida a Internet desde una subnet privada',
    resumen: 'Cómo un recurso privado puede iniciar conexiones hacia Internet sin volverse públicamente accesible, y por qué Internet no puede iniciar la conversación.',
    requisito: 'Módulo 5 · Clases 1 a 4',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-5/clase-6',
    numero: 6,
    duracion: '45 min',
    titulo: 'Security Groups vs Network ACLs, seguridad en dos niveles diferentes',
    resumen: 'Nivel de recurso vs. nivel de subnet, stateful vs. stateless, y por qué un Allow del SG no anula un Deny de la NACL.',
    requisito: 'Módulo 5 · Clases 1 a 5',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-5/clase-7',
    numero: 7,
    duracion: '45-60 min',
    titulo: 'Diseñando nuestra primera arquitectura VPC completa',
    resumen: 'De los requisitos de negocio a la red: qué debe ser público, qué privado, y cómo justificar cada componente en el caso CloudShop.',
    requisito: 'Módulo 5 · Clases 1 a 6',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-5/clase-8',
    numero: 8,
    duracion: '60 min',
    titulo: 'Laboratorio integrador: construye y diagnostica una arquitectura VPC completa',
    resumen: 'Cierre práctico del módulo: crear la VPC, subnets, rutas, IGW y NAT reales, diagnosticar 10 arquitecturas rotas, y limpiar todo correctamente.',
    requisito: 'Módulo 5 · Clases 1 a 7',
  },
];

const MODULO_6 = [
  {
    to: '/aprendizaje/aws-desde-cero/modulo-6/clase-1',
    numero: 1,
    duracion: '45 min',
    titulo: '¿Qué es una base de datos? De una lista de clientes a información relacionada',
    resumen: 'Cero AWS todavía: tablas, columnas, registros e IDs con clientes, productos y pedidos, antes de tocar RDS.',
    requisito: 'Ninguno técnico específico',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-6/clase-2',
    numero: 2,
    duracion: '45 min',
    titulo: 'Amazon RDS, cuando AWS administra gran parte del trabajo pesado',
    resumen: 'Servicio administrado vs. instalar MySQL en EC2: qué sigue siendo tuyo (datos, tablas, accesos) y qué administra AWS.',
    requisito: 'Módulo 6 · Clase 1',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-6/clase-3',
    numero: 3,
    duracion: '45 min',
    titulo: 'Motores, DB Instances y almacenamiento, elegir el tamaño correcto sin pagar de más',
    resumen: 'Tres decisiones distintas: motor, capacidad de cómputo y storage (gp3 vs. Provisioned IOPS), con right sizing como hilo conductor.',
    requisito: 'Módulo 6 · Clases 1 y 2',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-6/clase-4',
    numero: 4,
    duracion: '45 min',
    titulo: 'RDS dentro de una VPC, subnets privadas, Security Groups y acceso seguro',
    resumen: 'DB Subnet Group, Public access = No, SG-RDS con origen SG-App, y por qué el endpoint DNS reemplaza a la IP interna.',
    requisito: 'Módulo 6 · Clases 1 a 3 + Módulo 5',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-6/clase-5',
    numero: 5,
    duracion: '45 min',
    titulo: 'Backups, snapshots y Point-in-Time Recovery, cómo volver atrás cuando algo sale mal',
    resumen: 'Automated Backup vs. Manual Snapshot, retención, PITR y por qué restaurar siempre crea una base nueva.',
    requisito: 'Módulo 6 · Clases 1 a 4',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-6/clase-6',
    numero: 6,
    duracion: '45 min',
    titulo: 'Multi-AZ y Failover, disponibilidad no es lo mismo que backup',
    resumen: 'Primary/Standby, replicación síncrona, failover automático, y por qué Multi-AZ no reemplaza a los backups.',
    requisito: 'Módulo 6 · Clases 1 a 5',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-6/clase-7',
    numero: 7,
    duracion: '45 min',
    titulo: 'Amazon Aurora y DynamoDB, cuando una sola tecnología no alcanza',
    resumen: 'Aurora como relacional nativo de AWS, DynamoDB como NoSQL por claves, y la idea de Polyglot Persistence.',
    requisito: 'Módulo 6 · Clases 1 a 6',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-6/clase-8',
    numero: 8,
    duracion: '60 min',
    titulo: 'Laboratorio integrador: diseña, protege y recupera la base de datos de CloudShop',
    resumen: 'Cierre práctico del módulo: clasificar datos, crear una RDS privada, configurar backups, simular un incidente y recuperarlo, y diagnosticar 10 escenarios rotos.',
    requisito: 'Módulo 6 · Clases 1 a 7',
  },
];

const MODULO_7 = [
  {
    to: '/aprendizaje/aws-desde-cero/modulo-7/clase-1',
    numero: 1,
    duracion: '45 min',
    titulo: '¿Qué es Elastic Load Balancing? De una sola caja a múltiples servidores',
    resumen: 'Punto único de falla, escalado vertical vs. horizontal, y el Load Balancer como coordinador que reparte solicitudes entre servidores.',
    requisito: 'Módulos 0 a 6',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-7/clase-2',
    numero: 2,
    duracion: '45 min',
    titulo: 'Application Load Balancer, Listeners y Target Groups',
    resumen: 'El Listener recibe, la regla decide y el Target Group define hacia dónde enviamos la solicitud. Laboratorio guiado: creamos un ALB real.',
    requisito: 'Módulo 7 · Clase 1',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-7/clase-3',
    numero: 3,
    duracion: '45 min',
    titulo: 'Health Checks, cómo detectar servidores saludables antes de enviarles usuarios',
    resumen: 'Running no es lo mismo que Healthy: Path, Interval, Timeout, Healthy/Unhealthy Threshold, y por qué el ALB nunca repara la aplicación.',
    requisito: 'Módulo 7 · Clases 1 y 2',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-7/clase-4',
    numero: 4,
    duracion: '45 min',
    titulo: 'Amazon EC2 Auto Scaling, mantener automáticamente la cantidad correcta de servidores',
    resumen: 'Minimum, Desired y Maximum Capacity, cómo el ASG reemplaza instancias no saludables, y la diferencia entre Scale Out y Scale In.',
    requisito: 'Módulo 7 · Clases 1 a 3',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-7/clase-5',
    numero: 5,
    duracion: '45 min',
    titulo: 'Launch Templates, la receta que permite a Auto Scaling crear servidores iguales una y otra vez',
    resumen: 'AMI, Instance Type, Security Group, Storage y User Data: cómo automatizar el nacimiento de una nueva EC2 sin intervención manual.',
    requisito: 'Módulo 7 · Clases 1 a 4',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-7/clase-6',
    numero: 6,
    duracion: '45 min',
    titulo: 'Políticas de escalado, Scale Out, Scale In y Target Tracking',
    resumen: 'CloudWatch, CPU objetivo, Instance Warmup y elasticidad: cómo Auto Scaling decide cuándo crecer y cuándo reducir capacidad.',
    requisito: 'Módulo 7 · Clases 1 a 5',
  },
  {
    to: '/aprendizaje/aws-desde-cero/modulo-7/clase-7',
    numero: 7,
    duracion: '45 min',
    titulo: 'ALB + Auto Scaling + Multi-AZ, construir una aplicación que distribuya carga, reemplace fallas y crezca automáticamente',
    resumen: 'Integramos todas las piezas: ALB, Health Checks, Auto Scaling y Multi-AZ, más Security Groups por capas para conectar de forma segura con RDS.',
    requisito: 'Módulo 7 · Clases 1 a 6',
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
      <div className="lesson-eyebrow"><Icon name="cloud" /> AWS desde Cero</div>
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

      <h3 style={{ margin: 'var(--space-8) 0 4px' }}>Módulo 3 · Amazon EC2</h3>
      <p className="view-intro" style={{ marginBottom: 'var(--space-4)' }}>
        Servidores virtuales en AWS: elegir, crear, proteger y administrar una instancia EC2, hasta publicar tu propia página web.
      </p>
      <ClassGrid classes={MODULO_3} />

      <h3 style={{ margin: 'var(--space-8) 0 4px' }}>Módulo 4 · Amazon S3</h3>
      <p className="view-intro" style={{ marginBottom: 'var(--space-4)' }}>
        Almacenamiento de objetos: buckets, keys, permisos, versionado, clases de almacenamiento y Lifecycle.
      </p>
      <Link to="/aprendizaje/aws-desde-cero/modulo-4" className="btn btn-ghost" style={{ marginBottom: 'var(--space-4)', display: 'inline-block' }}>
        Ver la hoja de ruta completa del módulo (6 clases planificadas) →
      </Link>
      <ClassGrid classes={MODULO_4} />

      <h3 style={{ margin: 'var(--space-8) 0 4px' }}>Módulo 5 · Redes y Amazon VPC</h3>
      <p className="view-intro" style={{ marginBottom: 'var(--space-4)' }}>
        Cómo se comunican los recursos que ya sabemos crear: redes, direcciones IP, VPC, subnets, rutas y gateways.
      </p>
      <ClassGrid classes={MODULO_5} />

      <h3 style={{ margin: 'var(--space-8) 0 4px' }}>Módulo 6 · Bases de datos en AWS</h3>
      <p className="view-intro" style={{ marginBottom: 'var(--space-4)' }}>
        De archivos sueltos a información relacionada: tablas, Amazon RDS, motores, seguridad de red, backups y alta disponibilidad.
      </p>
      <ClassGrid classes={MODULO_6} />

      <h3 style={{ margin: 'var(--space-8) 0 4px' }}>Módulo 7 · Elastic Load Balancing y Auto Scaling</h3>
      <p className="view-intro" style={{ marginBottom: 'var(--space-4)' }}>
        Qué ocurre cuando una sola EC2 ya no alcanza o deja de funcionar: distribuir tráfico entre servidores y ajustar cuántos tenemos disponibles.
      </p>
      <Link to="/aprendizaje/aws-desde-cero/modulo-7" className="btn btn-ghost" style={{ marginBottom: 'var(--space-4)', display: 'inline-block' }}>
        Ver la hoja de ruta completa del módulo (8 clases planificadas) →
      </Link>
      <ClassGrid classes={MODULO_7} />
    </div>
  );
}
