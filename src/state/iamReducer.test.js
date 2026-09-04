import { describe, it, expect } from 'vitest';
import {
  initialIamState, iamReducer,
  createUser, deleteUser, markCredentialsDownloaded, setMfaEnabled,
  createGroup, deleteGroup, addUserToGroup, removeUserFromGroup,
  createPolicy, updatePolicy, deletePolicy, attachPolicy, detachPolicy,
  createRole, deleteRole, assumeRole, clearRoleSession,
} from './iamReducer.js';

function withUser(state, overrides = {}) {
  return iamReducer(state, createUser({
    username: 'alumno-01', courseTag: 'curso=cloud', accessType: 'console',
    password: 'Verano2026!!', requirePasswordReset: true, ...overrides,
  }));
}

describe('createUser / deleteUser', () => {
  it('adds a console user with no groups, no policies, mfa off', () => {
    const state = withUser(initialIamState);
    const user = state.users['alumno-01'];
    expect(user.username).toBe('alumno-01');
    expect(user.accessType).toBe('console');
    expect(user.mfaEnabled).toBe(false);
    expect(user.groups).toEqual([]);
    expect(user.policies).toEqual([]);
    expect(user.credentialsDownloaded).toBe(false);
    expect(user.accessKey).toBeNull();
  });

  it('generates an access key for a programmatic user', () => {
    const state = iamReducer(initialIamState, createUser({
      username: 'app-01', courseTag: '', accessType: 'programmatic',
      password: null, requirePasswordReset: false,
    }));
    const user = state.users['app-01'];
    expect(user.accessKey).not.toBeNull();
    expect(typeof user.accessKey.accessKeyId).toBe('string');
    expect(typeof user.accessKey.secretAccessKey).toBe('string');
  });

  it('deleteUser removes the user and unlinks them from any group', () => {
    let state = withUser(initialIamState);
    state = iamReducer(state, createGroup({ name: 'practicas-lectura', desc: '' }));
    const groupId = Object.keys(state.groups)[0];
    state = iamReducer(state, addUserToGroup('alumno-01', groupId));
    state = iamReducer(state, deleteUser('alumno-01'));
    expect(state.users['alumno-01']).toBeUndefined();
    expect(state.groups[groupId].members).toEqual([]);
  });
});

describe('markCredentialsDownloaded / setMfaEnabled', () => {
  it('flips credentialsDownloaded to true', () => {
    let state = withUser(initialIamState);
    state = iamReducer(state, markCredentialsDownloaded('alumno-01'));
    expect(state.users['alumno-01'].credentialsDownloaded).toBe(true);
  });

  it('toggles mfaEnabled', () => {
    let state = withUser(initialIamState);
    state = iamReducer(state, setMfaEnabled('alumno-01', true));
    expect(state.users['alumno-01'].mfaEnabled).toBe(true);
    state = iamReducer(state, setMfaEnabled('alumno-01', false));
    expect(state.users['alumno-01'].mfaEnabled).toBe(false);
  });
});

describe('groups: create/delete/add-member/remove-member', () => {
  it('createGroup adds an entry with empty members and policies', () => {
    const state = iamReducer(initialIamState, createGroup({ name: 'practicas-lectura', desc: 'lectura' }));
    const group = Object.values(state.groups)[0];
    expect(group.name).toBe('practicas-lectura');
    expect(group.members).toEqual([]);
    expect(group.policies).toEqual([]);
  });

  it('addUserToGroup / removeUserFromGroup keep both sides in sync', () => {
    let state = withUser(initialIamState);
    state = iamReducer(state, createGroup({ name: 'practicas-lectura', desc: '' }));
    const groupId = Object.keys(state.groups)[0];

    state = iamReducer(state, addUserToGroup('alumno-01', groupId));
    expect(state.groups[groupId].members).toEqual(['alumno-01']);
    expect(state.users['alumno-01'].groups).toEqual([groupId]);

    state = iamReducer(state, removeUserFromGroup('alumno-01', groupId));
    expect(state.groups[groupId].members).toEqual([]);
    expect(state.users['alumno-01'].groups).toEqual([]);
  });

  it('deleteGroup removes the group and drops it from member lists', () => {
    let state = withUser(initialIamState);
    state = iamReducer(state, createGroup({ name: 'practicas-lectura', desc: '' }));
    const groupId = Object.keys(state.groups)[0];
    state = iamReducer(state, addUserToGroup('alumno-01', groupId));
    state = iamReducer(state, deleteGroup(groupId));
    expect(state.groups[groupId]).toBeUndefined();
    expect(state.users['alumno-01'].groups).toEqual([]);
  });
});

describe('policies: create/update/delete/attach/detach', () => {
  const doc = { Version: '2012-10-17', Statement: [{ Effect: 'Allow', Action: 's3:GetObject', Resource: '*' }] };

  it('createPolicy stores the document as-is', () => {
    const state = iamReducer(initialIamState, createPolicy({ name: 'LecturaS3', type: 'Propia del curso', document: doc }));
    const policy = Object.values(state.policies)[0];
    expect(policy.name).toBe('LecturaS3');
    expect(policy.document).toEqual(doc);
  });

  it('updatePolicy replaces name/type/document by id', () => {
    let state = iamReducer(initialIamState, createPolicy({ name: 'LecturaS3', type: 'Propia del curso', document: doc }));
    const id = Object.keys(state.policies)[0];
    const newDoc = { Version: '2012-10-17', Statement: [] };
    state = iamReducer(state, updatePolicy(id, { name: 'LecturaS3v2', type: 'Propia del curso', document: newDoc }));
    expect(state.policies[id].name).toBe('LecturaS3v2');
    expect(state.policies[id].document).toEqual(newDoc);
  });

  it('attachPolicy/detachPolicy work for user, group and role targets', () => {
    let state = withUser(initialIamState);
    state = iamReducer(state, createGroup({ name: 'g', desc: '' }));
    const groupId = Object.keys(state.groups)[0];
    state = iamReducer(state, createRole({ name: 'r', trustPolicy: {}, maxDurationMinutes: 60 }));
    const roleId = Object.keys(state.roles)[0];
    state = iamReducer(state, createPolicy({ name: 'LecturaS3', type: 'Propia del curso', document: doc }));
    const policyId = Object.keys(state.policies)[0];

    state = iamReducer(state, attachPolicy('user', 'alumno-01', policyId));
    state = iamReducer(state, attachPolicy('group', groupId, policyId));
    state = iamReducer(state, attachPolicy('role', roleId, policyId));
    expect(state.users['alumno-01'].policies).toEqual([policyId]);
    expect(state.groups[groupId].policies).toEqual([policyId]);
    expect(state.roles[roleId].policies).toEqual([policyId]);

    state = iamReducer(state, detachPolicy('user', 'alumno-01', policyId));
    state = iamReducer(state, detachPolicy('group', groupId, policyId));
    state = iamReducer(state, detachPolicy('role', roleId, policyId));
    expect(state.users['alumno-01'].policies).toEqual([]);
    expect(state.groups[groupId].policies).toEqual([]);
    expect(state.roles[roleId].policies).toEqual([]);
  });

  it('deletePolicy detaches it from every user, group and role that had it', () => {
    let state = withUser(initialIamState);
    state = iamReducer(state, createPolicy({ name: 'LecturaS3', type: 'Propia del curso', document: doc }));
    const policyId = Object.keys(state.policies)[0];
    state = iamReducer(state, attachPolicy('user', 'alumno-01', policyId));
    state = iamReducer(state, deletePolicy(policyId));
    expect(state.policies[policyId]).toBeUndefined();
    expect(state.users['alumno-01'].policies).toEqual([]);
  });
});

describe('roles: create/delete/assume/clear session', () => {
  it('createRole starts with no active session and empty policies', () => {
    const state = iamReducer(initialIamState, createRole({ name: 'RolLectura', trustPolicy: { Effect: 'Allow' }, maxDurationMinutes: 30 }));
    const role = Object.values(state.roles)[0];
    expect(role.name).toBe('RolLectura');
    expect(role.policies).toEqual([]);
    expect(role.activeSession).toBeNull();
  });

  it('assumeRole creates a session that expires maxDurationMinutes from now', () => {
    let state = iamReducer(initialIamState, createRole({ name: 'RolLectura', trustPolicy: {}, maxDurationMinutes: 30 }));
    const roleId = Object.keys(state.roles)[0];
    const before = Date.now();
    state = iamReducer(state, assumeRole(roleId));
    const session = state.roles[roleId].activeSession;
    expect(session).not.toBeNull();
    expect(typeof session.accessKeyId).toBe('string');
    expect(typeof session.sessionToken).toBe('string');
    const expiresAt = new Date(session.expiresAt).getTime();
    expect(expiresAt).toBeGreaterThan(before);
    expect(expiresAt).toBeLessThanOrEqual(before + 30 * 60 * 1000 + 1000);
  });

  it('clearRoleSession sets activeSession back to null', () => {
    let state = iamReducer(initialIamState, createRole({ name: 'RolLectura', trustPolicy: {}, maxDurationMinutes: 30 }));
    const roleId = Object.keys(state.roles)[0];
    state = iamReducer(state, assumeRole(roleId));
    state = iamReducer(state, clearRoleSession(roleId));
    expect(state.roles[roleId].activeSession).toBeNull();
  });

  it('deleteRole removes the role', () => {
    let state = iamReducer(initialIamState, createRole({ name: 'RolLectura', trustPolicy: {}, maxDurationMinutes: 30 }));
    const roleId = Object.keys(state.roles)[0];
    state = iamReducer(state, deleteRole(roleId));
    expect(state.roles[roleId]).toBeUndefined();
  });
});
