import { describe, it, expect } from 'vitest';
import { labDefinitionsById } from './labDefinitions.js';
import { computeLabProgress } from '../state/iamLogic.js';
import {
  initialIamState, iamReducer,
  createUser, markCredentialsDownloaded,
  createGroup, addUserToGroup,
  createPolicy, deletePolicy, attachPolicy,
  createRole, assumeRole,
  setMfaEnabled,
} from '../state/iamReducer.js';

// One test per lab: starting from initialIamState, apply the exact sequence
// of reducer actions a student following that lab's own numbered steps
// would produce (running the lab's seed() first, where one exists), then
// assert the lab reaches 'completado'. This is the regression guard for C1
// and C3 — if a fix regresses, one of these tests goes red.

function dispatcherOver(getState, setState) {
  return (action) => setState(iamReducer(getState(), action));
}

describe('Lab 01 — Crear tu primer usuario IAM', () => {
  it('reaches completado by following the documented steps', () => {
    let state = initialIamState;
    state = iamReducer(state, createUser({
      username: 'alumno-01', courseTag: 'curso=cloud-2026', accessType: 'console',
      password: 'Verano2026!!', requirePasswordReset: true,
    }));
    state = iamReducer(state, markCredentialsDownloaded('alumno-01'));

    const progress = computeLabProgress(labDefinitionsById['01'], state);
    expect(progress.status).toBe('completado');
  });
});

describe('Lab 02 — Permisos por grupo, no por persona', () => {
  it('reaches completado by following the documented steps', () => {
    let state = initialIamState;
    state = iamReducer(state, createUser({
      username: 'alumno-02a', courseTag: '', accessType: 'console',
      password: 'Verano2026!!', requirePasswordReset: true,
    }));
    state = iamReducer(state, createUser({
      username: 'alumno-02b', courseTag: '', accessType: 'console',
      password: 'Verano2026!!', requirePasswordReset: true,
    }));
    state = iamReducer(state, createGroup({ name: 'practicas-lectura', desc: 'Acceso de lectura' }));
    const groupId = Object.values(state.groups).find((g) => g.name === 'practicas-lectura').id;
    state = iamReducer(state, createPolicy({
      name: 'LecturaS3',
      type: 'Propia del curso',
      document: {
        Version: '2012-10-17',
        Statement: [{
          Effect: 'Allow',
          Action: ['s3:GetObject', 's3:ListBucket'],
          Resource: ['arn:aws:s3:::practicas-curso', 'arn:aws:s3:::practicas-curso/*'],
        }],
      },
    }));
    const policyId = Object.values(state.policies).find((p) => p.name === 'LecturaS3').id;
    state = iamReducer(state, attachPolicy('group', groupId, policyId));
    state = iamReducer(state, addUserToGroup('alumno-02a', groupId));
    state = iamReducer(state, addUserToGroup('alumno-02b', groupId));

    const progress = computeLabProgress(labDefinitionsById['02'], state);
    expect(progress.status).toBe('completado');
  });
});

describe('Lab 03 — Escribir una política desde cero', () => {
  it('reaches completado by following the documented steps', () => {
    let state = initialIamState;
    state = iamReducer(state, createPolicy({
      name: 'AccesoControladoS3',
      type: 'Propia del curso',
      document: {
        Version: '2012-10-17',
        Statement: [
          { Effect: 'Allow', Action: ['s3:GetObject', 's3:ListBucket'], Resource: ['arn:aws:s3:::practicas-curso', 'arn:aws:s3:::practicas-curso/*'] },
          { Effect: 'Deny', Action: 's3:DeleteObject', Resource: 'arn:aws:s3:::practicas-curso/*' },
        ],
      },
    }));
    // Paso 3 ("pruébala en el Simulador") no cambia estado: los checks
    // 'simulado-allow'/'simulado-deny' reevalúan el mismo documento.

    const progress = computeLabProgress(labDefinitionsById['03'], state);
    expect(progress.status).toBe('completado');
  });
});

describe('Lab 04 — Asumir un rol temporal', () => {
  it('reaches completado by following the documented steps', () => {
    let state = initialIamState;
    state = iamReducer(state, createPolicy({
      name: 'PermisosDelRol',
      type: 'Propia del curso',
      document: { Version: '2012-10-17', Statement: [{ Effect: 'Allow', Action: 's3:GetObject', Resource: 'arn:aws:s3:::practicas-curso/*' }] },
    }));
    const policyId = Object.values(state.policies).find((p) => p.name === 'PermisosDelRol').id;
    state = iamReducer(state, createRole({
      name: 'RolPracticas',
      trustPolicy: { Effect: 'Allow', Principal: { AWS: 'arn:aws:iam::111111111111:root' }, Action: 'sts:AssumeRole' },
      maxDurationMinutes: 60,
    }));
    const roleId = Object.values(state.roles).find((r) => r.name === 'RolPracticas').id;
    state = iamReducer(state, attachPolicy('role', roleId, policyId));
    state = iamReducer(state, assumeRole(roleId));

    const progress = computeLabProgress(labDefinitionsById['04'], state);
    expect(progress.status).toBe('completado');
  });
});

describe('Lab 05 — Depurar un acceso denegado', () => {
  it('reaches completado by following the documented steps (seed, then fix the Deny)', () => {
    let state = initialIamState;
    const dispatch = dispatcherOver(() => state, (s) => { state = s; });

    // Paso 0 (implícito): el laboratorio siembra el escenario al entrar.
    labDefinitionsById['05'].seed(dispatch, state);

    // Antes de corregir nada, el problema debe reproducirse: Deny.
    const before = computeLabProgress(labDefinitionsById['05'], state);
    expect(before.status).not.toBe('completado');

    // Paso 3: "Elimina o ajusta el Deny bloqueante" — se elimina la política
    // Lab05-DenegarSubida, que estaba adjunta al grupo sembrado.
    const denyPolicy = Object.values(state.policies).find((p) => p.name === 'Lab05-DenegarSubida');
    expect(denyPolicy).toBeTruthy();
    state = iamReducer(state, deletePolicy(denyPolicy.id));

    const progress = computeLabProgress(labDefinitionsById['05'], state);
    expect(progress.status).toBe('completado');
  });
});

describe('Lab 06 — Activar la verificación en dos pasos', () => {
  it('reaches completado by following the documented steps', () => {
    let state = initialIamState;
    state = iamReducer(state, createUser({
      username: 'alumno-06', courseTag: '', accessType: 'console',
      password: 'Verano2026!!', requirePasswordReset: true,
    }));
    // Paso 1: activa MFA.
    state = iamReducer(state, setMfaEnabled('alumno-06', true));
    // Paso 2: crea la política condicionada a MFA y adjúntala al usuario.
    state = iamReducer(state, createPolicy({
      name: 'EliminarUsuarioConMFA',
      type: 'Propia del curso',
      document: {
        Version: '2012-10-17',
        Statement: [{ Effect: 'Allow', Action: 'iam:DeleteUser', Resource: '*', Condition: { 'aws:MultiFactorAuthPresent': true } }],
      },
    }));
    const policyId = Object.values(state.policies).find((p) => p.name === 'EliminarUsuarioConMFA').id;
    state = iamReducer(state, attachPolicy('user', 'alumno-06', policyId));
    // Paso 3 ("pruébalo con y sin MFA en el Simulador") no cambia estado:
    // los checks reevalúan el mismo documento con mfaPresent true y false.

    const progress = computeLabProgress(labDefinitionsById['06'], state);
    expect(progress.status).toBe('completado');
  });
});
