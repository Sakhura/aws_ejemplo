// Sample data ported verbatim from design_handoff_panel_iam/Consola IAM.dc.html

export const providers = [
  { name: 'idp-universidad', type: 'SAML 2.0', role: 'rol-auditoria-curso', status: { text: 'Activo', variant: 'accent' } },
  { name: 'github-acciones', type: 'OIDC', role: 'rol-lambda-informes', status: { text: 'Activo', variant: 'accent' } },
  { name: 'idp-pruebas-2025', type: 'SAML 2.0', role: 'Sin rol', status: { text: 'Certificado caducado', variant: 'outline' } },
];

export const labs = [
  { number: '01', duration: '15 min', title: 'Crear tu primer usuario IAM', body: 'Configura nombre, contraseña que cumpla la política y descarga el .csv de credenciales.', progress: 100, meta: 'Completado · 5 de 5 comprobaciones', locked: false },
  { number: '02', duration: '20 min', title: 'Permisos por grupo, no por persona', body: 'Crea el grupo practicas-lectura, adjunta LecturaS3 y mete dos usuarios dentro.', progress: 60, meta: 'En curso · 3 de 5 comprobaciones', locked: false },
  { number: '03', duration: '25 min', title: 'Escribir una política desde cero', body: 'Redacta el JSON que permite leer un bucket y deniega el borrado, y pruébalo con el simulador.', progress: 0, meta: 'Sin empezar', locked: false },
  { number: '04', duration: '20 min', title: 'Asumir un rol temporal', body: 'Configura la política de confianza de un rol y asúmelo desde la CLI con credenciales que caducan.', progress: 0, meta: 'Bloqueado · requiere el laboratorio 03', locked: true },
  { number: '05', duration: '30 min', title: 'Depurar un acceso denegado', body: 'Un usuario no puede subir archivos. Encuentra el Deny explícito que se lo impide.', progress: 0, meta: 'Bloqueado · requiere el laboratorio 03', locked: true },
  { number: '06', duration: '15 min', title: 'Activar la verificación en dos pasos', body: 'Añade MFA a tu usuario y comprueba qué operaciones deja de permitir sin ella.', progress: 0, meta: 'Sin empezar', locked: false },
];

export const commonErrors = [
  { severity: 'danger', title: 'Contraseña demasiado débil: debe incluir mayúsculas y números', body: 'La contraseña no cumple la política de la cuenta. Usa 12 caracteres o más con mayúscula, número y símbolo; el usuario no se crea hasta entonces.', metaTop: 'Bloquea la creación', metaBottom: 'Paso 1 · Detalles' },
  { severity: 'danger', title: 'AccessDenied: no tienes permiso para realizar esta operación', body: 'Ninguna política adjunta permite esa acción, o hay un Deny explícito que gana. Revisa las políticas del usuario y de sus grupos, en ese orden.', metaTop: 'Bloquea la operación', metaBottom: 'Políticas' },
  { severity: 'danger', title: 'MalformedPolicyDocument: el JSON de la política no es válido', body: 'Suele ser una coma de más, un corchete sin cerrar o un nombre de acción mal escrito. Valida el documento antes de guardarlo.', metaTop: 'Bloquea el guardado', metaBottom: 'Políticas' },
  { severity: 'warning', title: 'Las credenciales solo se muestran una vez', body: 'Si cierras la pantalla sin descargar el .csv, la clave secreta no se puede recuperar: hay que crear una nueva y desactivar la anterior.', metaTop: 'Advertencia', metaBottom: 'Paso 3 · Revisar' },
  { severity: 'warning', title: 'Permisos demasiado amplios en este usuario', body: 'Has adjuntado AdministradorTotal. Aplica el mínimo privilegio: concede solo las acciones que el ejercicio necesita.', metaTop: 'Advertencia', metaBottom: 'Paso 2 · Permisos' },
];

export const glossary = [
  { term: 'Usuario IAM', def: 'Identidad permanente con credenciales propias. Representa a una persona o a una aplicación concreta.' },
  { term: 'Grupo', def: 'Conjunto de usuarios que comparten permisos. No tiene credenciales ni puede iniciar sesión.' },
  { term: 'Rol', def: 'Permisos que se asumen temporalmente. Entrega credenciales que caducan en lugar de claves fijas.' },
  { term: 'Política', def: 'Documento JSON que permite o deniega acciones sobre recursos. Se adjunta a usuarios, grupos y roles.' },
  { term: 'ARN', def: 'Identificador único de un recurso, como arn:aws:s3:::practicas-curso. Es lo que va en Resource.' },
  { term: 'Principal', def: 'Quien realiza la acción: un usuario, un rol o un servicio. Aparece en la política de confianza.' },
  { term: 'Mínimo privilegio', def: 'Conceder solo los permisos necesarios para la tarea, y nada más. Es el criterio con el que se corrigen los laboratorios.' },
  { term: 'MFA', def: 'Verificación en dos pasos. Añade un código temporal a la contraseña al iniciar sesión.' },
  { term: 'Clave de acceso', def: 'Par de identificador y clave secreta para la CLI y el SDK. La parte secreta se muestra una sola vez.' },
  { term: 'Federación', def: 'Entrar en la cuenta con una identidad externa, como la de la universidad, y recibir un rol temporal.' },
];
