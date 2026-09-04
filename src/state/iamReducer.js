import { generateId, nowIso } from './iamLogic.js';

export const initialIamState = { users: {}, groups: {}, policies: {}, roles: {}, labs: {} };

// --- Action creators -------------------------------------------------

export function createUser({ username, courseTag, accessType, password, requirePasswordReset }) {
  return { type: 'CREATE_USER', payload: { username, courseTag, accessType, password, requirePasswordReset } };
}
export function deleteUser(username) {
  return { type: 'DELETE_USER', payload: { username } };
}
export function markCredentialsDownloaded(username) {
  return { type: 'MARK_CREDENTIALS_DOWNLOADED', payload: { username } };
}
export function setMfaEnabled(username, mfaEnabled) {
  return { type: 'SET_MFA_ENABLED', payload: { username, mfaEnabled } };
}
export function createGroup({ name, desc }) {
  return { type: 'CREATE_GROUP', payload: { name, desc } };
}
export function deleteGroup(id) {
  return { type: 'DELETE_GROUP', payload: { id } };
}
export function addUserToGroup(username, groupId) {
  return { type: 'ADD_USER_TO_GROUP', payload: { username, groupId } };
}
export function removeUserFromGroup(username, groupId) {
  return { type: 'REMOVE_USER_FROM_GROUP', payload: { username, groupId } };
}
export function createPolicy({ name, type, document }) {
  return { type: 'CREATE_POLICY', payload: { name, type, document } };
}
export function updatePolicy(id, { name, type, document }) {
  return { type: 'UPDATE_POLICY', payload: { id, name, type, document } };
}
export function deletePolicy(id) {
  return { type: 'DELETE_POLICY', payload: { id } };
}
export function attachPolicy(targetType, targetId, policyId) {
  return { type: 'ATTACH_POLICY', payload: { targetType, targetId, policyId } };
}
export function detachPolicy(targetType, targetId, policyId) {
  return { type: 'DETACH_POLICY', payload: { targetType, targetId, policyId } };
}
export function createRole({ name, trustPolicy, maxDurationMinutes }) {
  return { type: 'CREATE_ROLE', payload: { name, trustPolicy, maxDurationMinutes } };
}
export function deleteRole(id) {
  return { type: 'DELETE_ROLE', payload: { id } };
}
export function assumeRole(id) {
  return { type: 'ASSUME_ROLE', payload: { id } };
}
export function clearRoleSession(id) {
  return { type: 'CLEAR_ROLE_SESSION', payload: { id } };
}

// --- Helpers -----------------------------------------------------------

function collectionKeyFor(targetType) {
  if (targetType === 'user') return 'users';
  if (targetType === 'group') return 'groups';
  if (targetType === 'role') return 'roles';
  throw new Error(`Unknown targetType: ${targetType}`);
}

function fakeAccessKey() {
  return {
    accessKeyId: generateId('AKIA').toUpperCase(),
    secretAccessKey: generateId('secret') + generateId('key'),
  };
}

// --- Reducer -------------------------------------------------------------

export function iamReducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER': {
      const { username, courseTag, accessType, password, requirePasswordReset } = action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          [username]: {
            username, courseTag, accessType, password,
            requirePasswordReset: Boolean(requirePasswordReset),
            mfaEnabled: false,
            accessKey: accessType === 'programmatic' ? fakeAccessKey() : null,
            credentialsDownloaded: false,
            groups: [],
            policies: [],
            createdAt: nowIso(),
          },
        },
      };
    }

    case 'DELETE_USER': {
      const { username } = action.payload;
      const { [username]: removed, ...restUsers } = state.users;
      if (!removed) return state;
      const groups = Object.fromEntries(
        Object.entries(state.groups).map(([id, g]) => [id, { ...g, members: g.members.filter((m) => m !== username) }]),
      );
      return { ...state, users: restUsers, groups };
    }

    case 'MARK_CREDENTIALS_DOWNLOADED': {
      const { username } = action.payload;
      if (!state.users[username]) return state;
      return { ...state, users: { ...state.users, [username]: { ...state.users[username], credentialsDownloaded: true } } };
    }

    case 'SET_MFA_ENABLED': {
      const { username, mfaEnabled } = action.payload;
      if (!state.users[username]) return state;
      return { ...state, users: { ...state.users, [username]: { ...state.users[username], mfaEnabled } } };
    }

    case 'CREATE_GROUP': {
      const { name, desc } = action.payload;
      const id = generateId('grp');
      return { ...state, groups: { ...state.groups, [id]: { id, name, desc, policies: [], members: [], createdAt: nowIso() } } };
    }

    case 'DELETE_GROUP': {
      const { id } = action.payload;
      const { [id]: removed, ...restGroups } = state.groups;
      if (!removed) return state;
      const users = Object.fromEntries(
        Object.entries(state.users).map(([u, user]) => [u, { ...user, groups: user.groups.filter((g) => g !== id) }]),
      );
      return { ...state, groups: restGroups, users };
    }

    case 'ADD_USER_TO_GROUP': {
      const { username, groupId } = action.payload;
      const user = state.users[username];
      const group = state.groups[groupId];
      if (!user || !group) return state;
      if (group.members.includes(username)) return state;
      return {
        ...state,
        users: { ...state.users, [username]: { ...user, groups: [...user.groups, groupId] } },
        groups: { ...state.groups, [groupId]: { ...group, members: [...group.members, username] } },
      };
    }

    case 'REMOVE_USER_FROM_GROUP': {
      const { username, groupId } = action.payload;
      const user = state.users[username];
      const group = state.groups[groupId];
      if (!user || !group) return state;
      return {
        ...state,
        users: { ...state.users, [username]: { ...user, groups: user.groups.filter((g) => g !== groupId) } },
        groups: { ...state.groups, [groupId]: { ...group, members: group.members.filter((m) => m !== username) } },
      };
    }

    case 'CREATE_POLICY': {
      const { name, type, document } = action.payload;
      const id = generateId('pol');
      return { ...state, policies: { ...state.policies, [id]: { id, name, type, document, createdAt: nowIso() } } };
    }

    case 'UPDATE_POLICY': {
      const { id, name, type, document } = action.payload;
      if (!state.policies[id]) return state;
      return { ...state, policies: { ...state.policies, [id]: { ...state.policies[id], name, type, document } } };
    }

    case 'DELETE_POLICY': {
      const { id } = action.payload;
      const { [id]: removed, ...restPolicies } = state.policies;
      if (!removed) return state;
      const detach = (list) => list.filter((p) => p !== id);
      return {
        ...state,
        policies: restPolicies,
        users: Object.fromEntries(Object.entries(state.users).map(([u, user]) => [u, { ...user, policies: detach(user.policies) }])),
        groups: Object.fromEntries(Object.entries(state.groups).map(([g, group]) => [g, { ...group, policies: detach(group.policies) }])),
        roles: Object.fromEntries(Object.entries(state.roles).map(([r, role]) => [r, { ...role, policies: detach(role.policies) }])),
      };
    }

    case 'ATTACH_POLICY': {
      const { targetType, targetId, policyId } = action.payload;
      const key = collectionKeyFor(targetType);
      const target = state[key][targetId];
      if (!target || !state.policies[policyId]) return state;
      if (target.policies.includes(policyId)) return state;
      return { ...state, [key]: { ...state[key], [targetId]: { ...target, policies: [...target.policies, policyId] } } };
    }

    case 'DETACH_POLICY': {
      const { targetType, targetId, policyId } = action.payload;
      const key = collectionKeyFor(targetType);
      const target = state[key][targetId];
      if (!target) return state;
      return { ...state, [key]: { ...state[key], [targetId]: { ...target, policies: target.policies.filter((p) => p !== policyId) } } };
    }

    case 'CREATE_ROLE': {
      const { name, trustPolicy, maxDurationMinutes } = action.payload;
      const id = generateId('rol');
      return { ...state, roles: { ...state.roles, [id]: { id, name, trustPolicy, maxDurationMinutes, policies: [], activeSession: null } } };
    }

    case 'DELETE_ROLE': {
      const { id } = action.payload;
      const { [id]: removed, ...restRoles } = state.roles;
      if (!removed) return state;
      return { ...state, roles: restRoles };
    }

    case 'ASSUME_ROLE': {
      const { id } = action.payload;
      const role = state.roles[id];
      if (!role) return state;
      const expiresAt = new Date(Date.now() + role.maxDurationMinutes * 60 * 1000).toISOString();
      const session = { accessKeyId: generateId('ASIA').toUpperCase(), secretAccessKey: generateId('secret'), sessionToken: generateId('token') + generateId('token'), expiresAt };
      return { ...state, roles: { ...state.roles, [id]: { ...role, activeSession: session } } };
    }

    case 'CLEAR_ROLE_SESSION': {
      const { id } = action.payload;
      if (!state.roles[id]) return state;
      return { ...state, roles: { ...state.roles, [id]: { ...state.roles[id], activeSession: null } } };
    }

    default:
      return state;
  }
}
