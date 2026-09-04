import { evaluate } from '../state/policyEngine.js';
import { createGroup, createPolicy, createUser } from '../state/iamReducer.js';

const LAB05_SEED_MARKER_GROUP_NAME = 'lab05-soporte';

function findByName(collection, name) {
  return Object.values(collection).find((item) => item.name === name);
}

export const labDefinitions = [
  {
    id: '01',
    title: 'Crear tu primer usuario IAM',
    duration: '15 min',
    requires: [],
    intro: 'Ve a Usuarios → Crear usuario y completa el asistente de tres pasos: nombre, contraseña que cumpla la política de la cuenta, y descarga de credenciales.',
    steps: [
      { title: 'Configura el usuario', body: 'Elige un nombre de usuario válido y una contraseña de al menos 12 caracteres con mayúscula, número y símbolo.' },
      { title: 'Activa el cambio de contraseña obligatorio', body: 'Marca la casilla "Requerir cambio de contraseña en el primer inicio de sesión".' },
      { title: 'Crea el usuario y descarga sus credenciales', body: 'Confirma la creación y descarga el archivo .csv desde la barra inferior — solo se muestra una vez.' },
    ],
    checks: [
      { id: 'existe', label: 'El usuario existe', verify: (state) => Object.keys(state.users).length > 0 },
      { id: 'nombre-valido', label: 'Su nombre de usuario tiene un formato válido', verify: (state) => Object.values(state.users).some((u) => /^[A-Za-z0-9+=,.@_-]+$/.test(u.username)) },
      { id: 'password-valida', label: 'Su contraseña cumple la política de la cuenta', verify: (state) => Object.values(state.users).some((u) => u.accessType === 'console' && typeof u.password === 'string' && u.password.length >= 12 && /[A-Z]/.test(u.password) && /[0-9]/.test(u.password) && /[^A-Za-z0-9]/.test(u.password)) },
      { id: 'reset-activado', label: '"Requerir cambio de contraseña" está activado', verify: (state) => Object.values(state.users).some((u) => u.requirePasswordReset) },
      { id: 'credenciales-descargadas', label: 'Descargaste sus credenciales', verify: (state) => Object.values(state.users).some((u) => u.credentialsDownloaded) },
    ],
  },

  {
    id: '02',
    title: 'Permisos por grupo, no por persona',
    duration: '20 min',
    requires: [],
    intro: 'Crea el grupo practicas-lectura, adjúntale la política LecturaS3, y mete dentro al menos dos usuarios — sin adjuntarles esa política directamente a ninguno.',
    steps: [
      { title: 'Crea el grupo', body: 'En Grupos, crea uno llamado exactamente practicas-lectura.' },
      { title: 'Crea y adjunta la política', body: 'En Políticas, crea LecturaS3 (Allow sobre s3:GetObject/s3:ListBucket) y adjúntala al grupo desde "Gestionar".' },
      { title: 'Añade dos usuarios', body: 'Desde "Gestionar" en el grupo, añade al menos dos usuarios como miembros.' },
    ],
    checks: [
      { id: 'grupo-existe', label: 'Existe el grupo practicas-lectura', verify: (state) => Boolean(findByName(state.groups, 'practicas-lectura')) },
      {
        id: 'politica-en-grupo',
        label: 'LecturaS3 está adjunta al grupo',
        verify: (state) => {
          const group = findByName(state.groups, 'practicas-lectura');
          const policy = findByName(state.policies, 'LecturaS3');
          return Boolean(group && policy && group.policies.includes(policy.id));
        },
      },
      {
        id: 'dos-miembros',
        label: 'El grupo tiene al menos dos usuarios',
        verify: (state) => {
          const group = findByName(state.groups, 'practicas-lectura');
          return Boolean(group && group.members.length >= 2);
        },
      },
      {
        id: 'sin-politica-directa',
        label: 'Ningún usuario tiene LecturaS3 adjunta directamente',
        verify: (state) => {
          const policy = findByName(state.policies, 'LecturaS3');
          if (!policy) return false;
          return Object.values(state.users).every((u) => !u.policies.includes(policy.id));
        },
      },
      {
        id: 'acceso-por-grupo',
        label: 'Un miembro del grupo puede leer el bucket a través del grupo',
        verify: (state) => {
          const group = findByName(state.groups, 'practicas-lectura');
          if (!group || group.members.length === 0) return false;
          return group.members.some((username) => evaluate({ principal: { type: 'user', id: username }, action: 's3:GetObject', resource: 'arn:aws:s3:::practicas-curso/x.txt', state }).effect === 'Allow');
        },
      },
    ],
  },

  {
    id: '03',
    title: 'Escribir una política desde cero',
    duration: '25 min',
    requires: [],
    intro: 'Redacta el JSON de una política llamada AccesoControladoS3 que permita leer el bucket de prácticas y deniegue explícitamente su borrado. Pruébala en el Simulador antes de darla por buena.',
    steps: [
      { title: 'Escribe el Allow de lectura', body: 'Effect Allow, Action s3:GetObject y s3:ListBucket, Resource sobre arn:aws:s3:::practicas-curso y su contenido.' },
      { title: 'Añade el Deny explícito', body: 'Un segundo Statement con Effect Deny sobre s3:DeleteObject en el mismo bucket.' },
      { title: 'Pruébala en el Simulador', body: 'Ve a Políticas → Simular sobre esta política. Prueba primero s3:GetObject (debe dar Allow) y luego s3:DeleteObject (debe dar Deny).' },
    ],
    checks: [
      {
        id: 'json-valido',
        label: 'La política AccesoControladoS3 existe (su JSON es válido — Políticas rechaza guardar uno inválido)',
        verify: (state) => Boolean(findByName(state.policies, 'AccesoControladoS3')),
      },
      {
        id: 'allow-lectura',
        label: 'La política tiene un Allow de lectura sobre el bucket de prácticas',
        verify: (state) => {
          const policy = findByName(state.policies, 'AccesoControladoS3');
          if (!policy) return false;
          return evaluateAgainstPolicy(policy, 's3:GetObject', 'arn:aws:s3:::practicas-curso/archivo.txt').effect === 'Allow';
        },
      },
      {
        id: 'deny-borrado',
        label: 'La política tiene un Deny explícito sobre el borrado',
        verify: (state) => {
          const policy = findByName(state.policies, 'AccesoControladoS3');
          if (!policy) return false;
          const result = evaluateAgainstPolicy(policy, 's3:DeleteObject', 'arn:aws:s3:::practicas-curso/archivo.txt');
          return result.effect === 'Deny' && result.reason === 'explicit-deny';
        },
      },
      {
        id: 'simulado-allow',
        label: 'Simulador: la acción de lectura da Allow (misma condición que el paso anterior, confirmada desde el Simulador)',
        verify: (state) => {
          const policy = findByName(state.policies, 'AccesoControladoS3');
          if (!policy) return false;
          return evaluateAgainstPolicy(policy, 's3:GetObject', 'arn:aws:s3:::practicas-curso/archivo.txt').effect === 'Allow';
        },
      },
      {
        id: 'simulado-deny',
        label: 'Simulador: la acción de borrado da Deny',
        verify: (state) => {
          const policy = findByName(state.policies, 'AccesoControladoS3');
          if (!policy) return false;
          return evaluateAgainstPolicy(policy, 's3:DeleteObject', 'arn:aws:s3:::practicas-curso/archivo.txt').effect === 'Deny';
        },
      },
    ],
  },

  {
    id: '04',
    title: 'Asumir un rol temporal',
    duration: '20 min',
    requires: [],
    intro: 'Crea un rol con una política de confianza válida, adjúntale al menos una política de permisos, y asúmelo para obtener credenciales temporales.',
    steps: [
      { title: 'Crea el rol', body: 'En Roles, crea uno con la política de confianza por defecto (o la tuya propia) y una duración máxima razonable.' },
      { title: 'Adjunta una política de permisos', body: 'Desde "Gestionar", adjunta al menos una política — un rol sin políticas no puede hacer nada al asumirse.' },
      { title: 'Asume el rol', body: 'Pulsa "Asumir rol" y observa las credenciales temporales y su cuenta regresiva.' },
    ],
    checks: [
      { id: 'rol-existe', label: 'El rol existe', verify: (state) => Object.keys(state.roles).length > 0 },
      {
        id: 'trust-correcta',
        label: 'Su política de confianza tiene Principal y sts:AssumeRole',
        verify: (state) => Object.values(state.roles).some((r) => r.trustPolicy && r.trustPolicy.Principal && r.trustPolicy.Action === 'sts:AssumeRole'),
      },
      { id: 'permisos-adjuntos', label: 'Tiene al menos una política de permisos adjunta', verify: (state) => Object.values(state.roles).some((r) => r.policies.length > 0) },
      { id: 'asumido', label: 'El rol fue asumido', verify: (state) => Object.values(state.roles).some((r) => r.activeSession) },
      {
        id: 'expira',
        label: 'La sesión tiene una fecha de expiración futura',
        verify: (state) => Object.values(state.roles).some((r) => r.activeSession && new Date(r.activeSession.expiresAt).getTime() > Date.now()),
      },
    ],
  },

  {
    id: '05',
    title: 'Depurar un acceso denegado',
    duration: '30 min',
    requires: ['03'],
    intro: 'Un usuario de soporte no puede subir archivos al bucket de prácticas. Usa el Simulador para encontrar el Deny explícito que se lo impide, y corrígelo.',
    steps: [
      { title: 'Reproduce el problema', body: 'Ve al Simulador y prueba s3:PutObject sobre arn:aws:s3:::practicas-curso/reportes/x.txt para el usuario lab05-usuario-soporte. Confirma que da Deny.' },
      { title: 'Encuentra el statement responsable', body: 'El resultado del Simulador indica qué política decidió. Ábrela en Políticas.' },
      { title: 'Corrígela', body: 'Elimina o ajusta el Deny bloqueante, sin ampliar el resto de los permisos del usuario más de lo necesario.' },
    ],
    seed: (dispatch, state) => {
      if (findByName(state.groups, LAB05_SEED_MARKER_GROUP_NAME)) return; // idempotent: ya sembrado
      dispatch(createUser({ username: 'lab05-usuario-soporte', courseTag: 'lab=05', accessType: 'console', password: 'Soporte2026!!', requirePasswordReset: true }));
      dispatch(createGroup({ name: LAB05_SEED_MARKER_GROUP_NAME, desc: 'Precargado por el Laboratorio 05' }));
      dispatch(createPolicy({
        name: 'Lab05-DenegarSubida',
        type: 'Propia del curso',
        document: { Version: '2012-10-17', Statement: [{ Effect: 'Deny', Action: 's3:PutObject', Resource: 'arn:aws:s3:::practicas-curso/*' }] },
      }));
      // Nota: las dos últimas dispatch de este seed asumen que el reducer ya
      // procesó las anteriores en el mismo ciclo de render (React 18+ agrupa
      // dispatches síncronos y aplica cada reducer sobre el resultado del
      // anterior dentro del mismo batch, por lo que el grupo y la política
      // recién creados ya existen para las líneas siguientes).
    },
    checks: [
      {
        id: 'diagnosticado',
        label: 'Localizaste el Deny explícito con el Simulador',
        verify: (state) => Boolean(findByName(state.policies, 'Lab05-DenegarSubida')),
      },
      {
        id: 'corregido',
        label: 'El Deny bloqueante fue corregido o eliminado',
        verify: (state) => {
          const user = state.users['lab05-usuario-soporte'];
          if (!user) return false;
          return evaluate({ principal: { type: 'user', id: user.username }, action: 's3:PutObject', resource: 'arn:aws:s3:::practicas-curso/reportes/x.txt', state }).effect === 'Allow';
        },
      },
      {
        id: 'confirmado-simulador',
        label: 'El Simulador confirma ahora Allow para subir archivos',
        verify: (state) => {
          const user = state.users['lab05-usuario-soporte'];
          if (!user) return false;
          return evaluate({ principal: { type: 'user', id: user.username }, action: 's3:PutObject', resource: 'arn:aws:s3:::practicas-curso/reportes/x.txt', state }).effect === 'Allow';
        },
      },
      {
        id: 'sin-sobre-ampliar',
        label: 'No se le adjuntó una política de administrador total para "arreglarlo"',
        verify: (state) => {
          const user = state.users['lab05-usuario-soporte'];
          if (!user) return true;
          return user.policies.every((pid) => {
            const policy = state.policies[pid];
            if (!policy) return true;
            return !policy.document.Statement.some((s) => s.Effect === 'Allow' && toArrayLocal(s.Action).includes('*') && toArrayLocal(s.Resource).includes('*'));
          });
        },
      },
    ],
  },

  {
    id: '06',
    title: 'Activar la verificación en dos pasos',
    duration: '15 min',
    requires: [],
    intro: 'Activa MFA en un usuario y crea una política que solo permita una acción sensible cuando MFA está presente. Compruébalo en el Simulador con y sin MFA.',
    steps: [
      { title: 'Activa MFA', body: 'En Usuarios, activa la casilla de MFA para uno de tus usuarios.' },
      { title: 'Crea una política condicionada a MFA', body: 'En Políticas, crea EliminarUsuarioConMFA: Allow sobre iam:DeleteUser con Condition aws:MultiFactorAuthPresent: true, y adjúntala al usuario.' },
      { title: 'Compruébalo en el Simulador', body: 'Prueba iam:DeleteUser para ese usuario. Luego desactiva su MFA y vuelve a probar: debe cambiar a Deny.' },
    ],
    checks: [
      { id: 'mfa-activo', label: 'Un usuario tiene MFA activado', verify: (state) => Object.values(state.users).some((u) => u.mfaEnabled) },
      {
        id: 'deny-sin-mfa',
        label: 'La acción sensible da Deny para un usuario sin MFA',
        verify: (state) => {
          const policy = findByName(state.policies, 'EliminarUsuarioConMFA');
          const withoutMfa = Object.values(state.users).find((u) => !u.mfaEnabled && policy && u.policies.includes(policy.id));
          if (!withoutMfa) return false;
          return evaluate({ principal: { type: 'user', id: withoutMfa.username }, action: 'iam:DeleteUser', resource: '*', state }).effect === 'Deny';
        },
      },
      {
        id: 'allow-con-mfa',
        label: 'La misma acción da Allow para un usuario con MFA activo',
        verify: (state) => {
          const policy = findByName(state.policies, 'EliminarUsuarioConMFA');
          const withMfa = Object.values(state.users).find((u) => u.mfaEnabled && policy && u.policies.includes(policy.id));
          if (!withMfa) return false;
          return evaluate({ principal: { type: 'user', id: withMfa.username }, action: 'iam:DeleteUser', resource: '*', state }).effect === 'Allow';
        },
      },
      {
        id: 'otra-accion-no-cambia',
        label: 'Confirmaste que otra acción sin Condition no depende de MFA',
        verify: (state) => Object.values(state.policies).some((p) => p.document.Statement.some((s) => s.Effect === 'Allow' && !s.Condition)),
      },
    ],
  },
];

export const labDefinitionsById = Object.fromEntries(labDefinitions.map((lab) => [lab.id, lab]));

// --- local helpers used only inside this file's check functions ---------

function toArrayLocal(value) {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function evaluateAgainstPolicy(policy, action, resource) {
  const fakeState = { users: {}, groups: {}, roles: {}, labs: {}, policies: { [policy.id]: policy } };
  return evaluate({ principal: { type: 'user', id: '__lab-check__' }, action, resource, state: { ...fakeState, users: { '__lab-check__': { username: '__lab-check__', groups: [], policies: [policy.id], mfaEnabled: false } } } });
}
