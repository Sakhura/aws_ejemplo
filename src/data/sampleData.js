// Sample data ported verbatim from design_handoff_panel_iam/Consola IAM.dc.html

export const providers = [
  { name: 'idp-universidad', type: 'SAML 2.0', role: 'rol-auditoria-curso', status: { text: 'Activo', variant: 'accent' } },
  { name: 'github-acciones', type: 'OIDC', role: 'rol-lambda-informes', status: { text: 'Activo', variant: 'accent' } },
  { name: 'idp-pruebas-2025', type: 'SAML 2.0', role: 'Sin rol', status: { text: 'Certificado caducado', variant: 'outline' } },
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
